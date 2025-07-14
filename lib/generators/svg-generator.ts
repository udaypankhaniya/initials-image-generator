import { AvatarConfig } from '../schemas/avatar';
import { TextProcessor } from '../processors/text-processor';
import { ShapeProcessor } from '../processors/shape-processor';
import { BackgroundProcessor } from '../processors/background-processor';
import { EffectProcessor } from '../processors/effect-processor';

export class SVGGenerator {
  static generate(config: AvatarConfig): string {
    const size = parseInt(config.export.size);
    const displayText = TextProcessor.getDisplayText(config.name, config.displayMode);
    const fontSize = TextProcessor.calculateFontSize(displayText, size, config.typography);
    const fontFamily = TextProcessor.getFontFamily(config.typography.fontFamily);

    // Generate background
    const backgroundFill = BackgroundProcessor.generateBackground(config.background, size, size);
    
    // Generate shape
    const shapeElement = ShapeProcessor.generateShapeElement(config.shape, size, size);
    
    // Generate text effects
    const textEffects = EffectProcessor.generateTextEffects(
      config.typography.shadow,
      config.typography.outline
    );
    
    // Generate image filters
    const imageFilters = EffectProcessor.generateImageFilters(config.filters);

    // Text alignment
    let textAnchor = 'middle';
    let textX = size / 2;
    
    if (config.typography.alignment === 'left') {
      textAnchor = 'start';
      textX = size * 0.1;
    } else if (config.typography.alignment === 'right') {
      textAnchor = 'end';
      textX = size * 0.9;
    }

    // Font style
    const fontStyle = config.typography.style === 'italic' ? 'italic' : 'normal';
    const fontWeight = config.typography.weight;

    const svg = `
      <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        ${textEffects.definition}
        ${imageFilters}
        
        <!-- Background -->
        <rect width="100%" height="100%" ${backgroundFill} ${imageFilters ? `filter="url(#image-filters-${Date.now()})"` : ''} />
        
        <!-- Shape -->
        <g>
          ${shapeElement}
        </g>
        
        <!-- Text -->
        <text x="${textX}" y="${size / 2}" 
              font-family="${fontFamily}" 
              font-size="${fontSize}" 
              font-weight="${fontWeight}"
              font-style="${fontStyle}"
              text-anchor="${textAnchor}" 
              dominant-baseline="central"
              fill="#000000"
              ${textEffects.filterAttribute}>
          ${displayText}
        </text>
      </svg>
    `;

    return svg.replace(/\s+/g, ' ').trim();
  }

  static generateFavicon(config: AvatarConfig): { [size: string]: string } {
    const sizes = ['64', '128', '256', '512'] as const;
    const favicons: { [size: string]: string } = {};

    sizes.forEach(size => {
      const faviconConfig = {
        ...config,
        export: { ...config.export, size: size }
      };
      favicons[size] = this.generate(faviconConfig);
    });

    return favicons;
  }
}