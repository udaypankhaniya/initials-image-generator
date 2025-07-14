import { AvatarConfig } from '../schemas/avatar';
import { SVGGenerator } from './svg-generator';

export class QRGenerator {
  static generateWithAvatar(config: AvatarConfig, qrData: string): string {
    const size = parseInt(config.export.size);
    const qrSize = size * 0.8;
    const avatarSize = size * 0.3;
    const centerOffset = (size - avatarSize) / 2;

    // Generate QR code pattern (simplified - in production, use a proper QR library)
    const qrPattern = this.generateQRPattern(qrData, qrSize);
    
    // Generate avatar for center
    // Ensure avatarSize is one of the allowed sizes: "64", "128", "256", "512"
    const allowedSizes = [64, 128, 256, 512];
    const closestSize = allowedSizes.reduce((prev, curr) =>
      Math.abs(curr - avatarSize) < Math.abs(prev - avatarSize) ? curr : prev
    );
    const avatarConfig = {
      ...config,
      export: { ...config.export, size: String(closestSize) as "64" | "128" | "256" | "512" }
    };
    const avatar = SVGGenerator.generate(avatarConfig);

    const svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <!-- QR Code Background -->
        <rect width="100%" height="100%" fill="white"/>
        
        <!-- QR Pattern -->
        <g transform="translate(${(size - qrSize) / 2}, ${(size - qrSize) / 2})">
          ${qrPattern}
        </g>
        
        <!-- Avatar in center -->
        <g transform="translate(${centerOffset}, ${centerOffset})">
          ${avatar.replace(/<svg[^>]*>|<\/svg>/g, '')}
        </g>
      </svg>
    `;

    return svg;
  }

  private static generateQRPattern(data: string, size: number): string {
    // This is a simplified QR pattern generator
    // In production, use a proper QR code library like 'qrcode' or 'node-qr-image'
    const moduleSize = size / 25; // 25x25 grid
    let pattern = '';

    for (let row = 0; row < 25; row++) {
      for (let col = 0; col < 25; col++) {
        // Skip center area for avatar
        if (row >= 8 && row <= 16 && col >= 8 && col <= 16) {
          continue;
        }

        // Simple pattern based on data hash and position
        const hash = this.simpleHash(data + row + col);
        if (hash % 2 === 0) {
          const x = col * moduleSize;
          const y = row * moduleSize;
          pattern += `<rect x="${x}" y="${y}" width="${moduleSize}" height="${moduleSize}" fill="black"/>`;
        }
      }
    }

    // Add finder patterns (corners)
    pattern += this.generateFinderPattern(0, 0, moduleSize);
    pattern += this.generateFinderPattern(18 * moduleSize, 0, moduleSize);
    pattern += this.generateFinderPattern(0, 18 * moduleSize, moduleSize);

    return pattern;
  }

  private static generateFinderPattern(x: number, y: number, moduleSize: number): string {
    return `
      <rect x="${x}" y="${y}" width="${7 * moduleSize}" height="${7 * moduleSize}" fill="black"/>
      <rect x="${x + moduleSize}" y="${y + moduleSize}" width="${5 * moduleSize}" height="${5 * moduleSize}" fill="white"/>
      <rect x="${x + 2 * moduleSize}" y="${y + 2 * moduleSize}" width="${3 * moduleSize}" height="${3 * moduleSize}" fill="black"/>
    `;
  }

  private static simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}