import { ColorConfig } from '../schemas/avatar';

export class ColorUtils {
  static hexToRgb(hex: string): { r: number; g: number; b: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
  }

  static rgbToHex(r: number, g: number, b: number): string {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  static getDominantColor(colors: ColorConfig[]): string {
    if (colors.length === 0) return '#000000';
    
    // Simple implementation - return first color
    // In production, you might want to analyze actual color frequency
    return colors[0].hex;
  }

  static getContrastRatio(color1: string, color2: string): number {
    const rgb1 = this.hexToRgb(color1);
    const rgb2 = this.hexToRgb(color2);
    
    const l1 = this.getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = this.getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    
    return (lighter + 0.05) / (darker + 0.05);
  }

  private static getLuminance(r: number, g: number, b: number): number {
    const [rs, gs, bs] = [r, g, b].map(c => {
      c = c / 255;
      return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  }

  static generateColorThemes() {
    return {
      pastel: [
        { hex: '#FFB3BA', alpha: 1 },
        { hex: '#BAFFC9', alpha: 1 },
        { hex: '#BAE1FF', alpha: 1 },
        { hex: '#FFFFBA', alpha: 1 },
        { hex: '#FFDFBA', alpha: 1 },
      ],
      neon: [
        { hex: '#FF073A', alpha: 1 },
        { hex: '#39FF14', alpha: 1 },
        { hex: '#0080FF', alpha: 1 },
        { hex: '#FFFF00', alpha: 1 },
        { hex: '#FF8C00', alpha: 1 },
      ],
      brand: [
        { hex: '#1DA1F2', alpha: 1 }, // Twitter Blue
        { hex: '#4267B2', alpha: 1 }, // Facebook Blue
        { hex: '#E60023', alpha: 1 }, // Pinterest Red
        { hex: '#25D366', alpha: 1 }, // WhatsApp Green
        { hex: '#FF5722', alpha: 1 }, // Material Orange
      ],
    };
  }
}