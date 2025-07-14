import { BackgroundConfig, GradientConfig, ColorConfig } from '../schemas/avatar';

export class BackgroundProcessor {
  static generateBackground(background: BackgroundConfig, width: number, height: number): string {
    switch (background.type) {
      case 'solid':
        return this.generateSolidBackground(background.color);
      
      case 'gradient':
        return this.generateGradientBackground(background.gradient!, width, height);
      
      case 'image':
        return this.generateImageBackground(background.imageUrl!);
      
      case 'texture':
        return this.generateTextureBackground(background.texture!, width, height);
      
      default:
        return this.generateSolidBackground({
          hex: '#ffffff',
          alpha: 0
        });
    }
  }

  private static generateSolidBackground(color?: ColorConfig): string {
    if (!color) return 'fill="transparent"';
    return `fill="${this.colorToString(color)}"`;
  }

  private static generateGradientBackground(gradient: GradientConfig, width: number, height: number): string {
    const gradientId = `gradient-${Date.now()}`;
    let gradientDef = '';
    let gradientElement = '';

    const stops = gradient.stops.map(stop => 
      `<stop offset="${stop.position}%" stop-color="${this.colorToString(stop.color)}" />`
    ).join('');

    switch (gradient.type) {
      case 'linear':
        const angle = gradient.angle;
        const x1 = 50 + 50 * Math.cos((angle - 90) * Math.PI / 180);
        const y1 = 50 + 50 * Math.sin((angle - 90) * Math.PI / 180);
        const x2 = 50 - 50 * Math.cos((angle - 90) * Math.PI / 180);
        const y2 = 50 - 50 * Math.sin((angle - 90) * Math.PI / 180);
        
        gradientElement = `<linearGradient id="${gradientId}" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">${stops}</linearGradient>`;
        break;

      case 'radial':
        gradientElement = `<radialGradient id="${gradientId}" cx="${gradient.centerX}%" cy="${gradient.centerY}%" r="${gradient.radius}%">${stops}</radialGradient>`;
        break;

      case 'conic':
        // SVG doesn't natively support conic gradients, so we'll approximate with radial
        gradientElement = `<radialGradient id="${gradientId}" cx="${gradient.centerX}%" cy="${gradient.centerY}%" r="50%">${stops}</radialGradient>`;
        break;
    }

    gradientDef = `<defs>${gradientElement}</defs>`;
    
    return `${gradientDef} fill="url(#${gradientId})"`;
  }

  private static generateImageBackground(imageUrl: string): string {
    const patternId = `image-pattern-${Date.now()}`;
    return `
      <defs>
        <pattern id="${patternId}" patternUnits="userSpaceOnUse" width="100%" height="100%">
          <image href="${imageUrl}" width="100%" height="100%" preserveAspectRatio="xMidYMid slice"/>
        </pattern>
      </defs>
      fill="url(#${patternId})"
    `;
  }

  private static generateTextureBackground(texture: string, width: number, height: number): string {
    const patternId = `texture-${texture}-${Date.now()}`;
    let patternContent = '';

    switch (texture) {
      case 'dots':
        patternContent = `
          <pattern id="${patternId}" patternUnits="userSpaceOnUse" width="20" height="20">
            <circle cx="10" cy="10" r="2" fill="rgba(0,0,0,0.1)"/>
          </pattern>
        `;
        break;

      case 'lines':
        patternContent = `
          <pattern id="${patternId}" patternUnits="userSpaceOnUse" width="20" height="20">
            <line x1="0" y1="10" x2="20" y2="10" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
          </pattern>
        `;
        break;

      case 'grid':
        patternContent = `
          <pattern id="${patternId}" patternUnits="userSpaceOnUse" width="20" height="20">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0,0,0,0.1)" stroke-width="1"/>
          </pattern>
        `;
        break;

      case 'noise':
        // Simple noise approximation with random circles
        const noiseElements = Array.from({ length: 50 }, (_, i) => {
          const x = Math.random() * 20;
          const y = Math.random() * 20;
          const r = Math.random() * 0.5;
          return `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(0,0,0,${Math.random() * 0.1})"/>`;
        }).join('');
        
        patternContent = `
          <pattern id="${patternId}" patternUnits="userSpaceOnUse" width="20" height="20">
            ${noiseElements}
          </pattern>
        `;
        break;
    }

    return `<defs>${patternContent}</defs> fill="url(#${patternId})"`;
  }

  private static colorToString(color: ColorConfig): string {
    if (color.alpha !== undefined && color.alpha < 1) {
      const r = parseInt(color.hex.slice(1, 3), 16);
      const g = parseInt(color.hex.slice(3, 5), 16);
      const b = parseInt(color.hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${color.alpha})`;
    }
    return color.hex;
  }
}