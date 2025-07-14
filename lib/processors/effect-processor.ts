import { FilterConfig, TextShadowConfig, TextOutlineConfig } from '../schemas/avatar';

export class EffectProcessor {
  static generateTextEffects(shadow?: TextShadowConfig, outline?: TextOutlineConfig): { definition: string; filterAttribute: string } {
    let effects = '';
    const filterId = `text-effects-${Date.now()}`;

    if (shadow?.enabled || outline?.enabled) {
      let filterContent = '';

      if (shadow?.enabled) {
        filterContent += `
          <feDropShadow dx="${shadow.offsetX}" dy="${shadow.offsetY}" 
                       stdDeviation="${shadow.blur}" 
                       flood-color="${this.colorToString(shadow.color)}" 
                       flood-opacity="${shadow.color.alpha || 1}"/>
        `;
      }

      if (outline?.enabled) {
        filterContent += `
          <feMorphology operator="dilate" radius="${outline.width}"/>
          <feFlood flood-color="${this.colorToString(outline.color)}"/>
          <feComposite in="SourceGraphic" operator="over"/>
        `;
      }

      effects = `
        <defs>
          <filter id="${filterId}" x="-50%" y="-50%" width="200%" height="200%">
            ${filterContent}
          </filter>
        </defs>
      `;
    }

    return {
      definition: effects,
      filterAttribute: shadow?.enabled || outline?.enabled ? `filter="url(#${filterId})"` : ''
    };
  }

  static generateImageFilters(filters: FilterConfig): string {
    if (this.isDefaultFilters(filters)) {
      return '';
    }

    const filterId = `image-filters-${Date.now()}`;
    let filterContent = '';

    if (filters.grayscale > 0) {
      filterContent += `<feColorMatrix type="saturate" values="${1 - filters.grayscale / 100}"/>`;
    }

    if (filters.sepia > 0) {
      const sepiaValue = filters.sepia / 100;
      filterContent += `
        <feColorMatrix type="matrix" values="
          ${0.393 + 0.607 * (1 - sepiaValue)} ${0.769 - 0.769 * (1 - sepiaValue)} ${0.189 - 0.189 * (1 - sepiaValue)} 0 0
          ${0.349 - 0.349 * (1 - sepiaValue)} ${0.686 + 0.314 * (1 - sepiaValue)} ${0.168 - 0.168 * (1 - sepiaValue)} 0 0
          ${0.272 - 0.272 * (1 - sepiaValue)} ${0.534 - 0.534 * (1 - sepiaValue)} ${0.131 + 0.869 * (1 - sepiaValue)} 0 0
          0 0 0 1 0
        "/>
      `;
    }

    if (filters.blur > 0) {
      filterContent += `<feGaussianBlur stdDeviation="${filters.blur}"/>`;
    }

    if (filters.brightness !== 100) {
      const brightnessValue = filters.brightness / 100;
      filterContent += `<feComponentTransfer><feFuncA type="discrete" tableValues="${brightnessValue}"/></feComponentTransfer>`;
    }

    if (!filterContent) return '';

    return `
      <defs>
        <filter id="${filterId}" x="0%" y="0%" width="100%" height="100%">
          ${filterContent}
        </filter>
      </defs>
      filter="url(#${filterId})"
    `;
  }

  private static isDefaultFilters(filters: FilterConfig): boolean {
    return filters.grayscale === 0 && 
           filters.sepia === 0 && 
           filters.blur === 0 && 
           filters.brightness === 100;
  }

  private static colorToString(color: any): string {
    if (color.alpha !== undefined && color.alpha < 1) {
      const r = parseInt(color.hex.slice(1, 3), 16);
      const g = parseInt(color.hex.slice(3, 5), 16);
      const b = parseInt(color.hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${color.alpha})`;
    }
    return color.hex;
  }
}