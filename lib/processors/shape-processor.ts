import { ShapeConfig, ColorConfig } from '../schemas/avatar';

export class ShapeProcessor {
  static generateShapePath(shape: ShapeConfig, width: number, height: number): string {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2;

    switch (shape.type) {
      case 'circle':
        return `M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 1 0 ${centerX + radius} ${centerY} A ${radius} ${radius} 0 1 0 ${centerX - radius} ${centerY}`;
      
      case 'square':
        return `M 0 0 L ${width} 0 L ${width} ${height} L 0 ${height} Z`;
      
      case 'rounded-rectangle':
        const r = Math.min(shape.radius || 0, Math.min(width, height) / 2);
        return `M ${r} 0 L ${width - r} 0 Q ${width} 0 ${width} ${r} L ${width} ${height - r} Q ${width} ${height} ${width - r} ${height} L ${r} ${height} Q 0 ${height} 0 ${height - r} L 0 ${r} Q 0 0 ${r} 0 Z`;
      
      case 'hexagon':
        const hexRadius = radius * 0.9;
        const points = [];
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const x = centerX + hexRadius * Math.cos(angle);
          const y = centerY + hexRadius * Math.sin(angle);
          points.push(`${x} ${y}`);
        }
        return `M ${points[0]} L ${points.slice(1).join(' L ')} Z`;
      
      default:
        return this.generateShapePath({ ...shape, type: 'circle' }, width, height);
    }
  }

  static generateShapeElement(shape: ShapeConfig, width: number, height: number): string {
    const path = this.generateShapePath(shape, width, height);
    
    let strokeProps = '';
    if (shape.border && shape.border.width > 0) {
      const strokeColor = this.colorToString(shape.border.color);
      strokeProps = `stroke="${strokeColor}" stroke-width="${shape.border.width}" stroke-dasharray="${shape.border.style === 'dashed' ? '5,5' : 'none'}"`;
    }

    let filter = '';
    if (shape.glow && shape.glow.enabled) {
      const glowId = `glow-${Date.now()}`;
      const glowColor = this.colorToString(shape.glow.color);
      
      filter = `
        <defs>
          <filter id="${glowId}" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="${shape.glow.blur}" result="coloredBlur"/>
            <feMorphology operator="dilate" radius="${shape.glow.spread}"/>
            <feFlood flood-color="${glowColor}" flood-opacity="${shape.glow.color.alpha || 1}"/>
            <feComposite in="SourceGraphic" in2="coloredBlur" operator="${shape.glow.type === 'inner' ? 'atop' : 'over'}"/>
          </filter>
        </defs>
      `;
    }

    const filterAttr = shape.glow?.enabled ? `filter="url(#glow-${Date.now()})"` : '';

    return `
      ${filter}
      <path d="${path}" ${strokeProps} ${filterAttr} />
    `;
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