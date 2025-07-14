import { TypographyConfig, DisplayModeConfig } from '../schemas/avatar';

export class TextProcessor {
  static extractInitials(name: string): string {
    const trimmedName = name.trim();
    if (!trimmedName) return '';
    
    const words = trimmedName.split(/\s+/).filter(word => word.length > 0);
    
    if (words.length === 1) {
      return words[0].charAt(0).toUpperCase();
    }
    
    // Take first letter of first word and first letter of last word
    const firstInitial = words[0].charAt(0).toUpperCase();
    const lastInitial = words[words.length - 1].charAt(0).toUpperCase();
    return firstInitial + lastInitial;
  }

  static truncateName(name: string, maxWords: number = 2): string {
    const words = name.trim().split(/\s+/).filter(word => word.length > 0);
    return words.slice(0, maxWords).join(' ');
  }

  static getDisplayText(name: string, displayMode: DisplayModeConfig): string {
    switch (displayMode.type) {
      case 'initials':
        return this.extractInitials(name);
      case 'truncated':
        return this.truncateName(name, displayMode.maxWords);
      case 'emoji':
        return displayMode.emoji || '👤';
      default:
        return this.extractInitials(name);
    }
  }

  static calculateFontSize(text: string, containerSize: number, typography: TypographyConfig): number {
    // Base font size calculation based on container size and text length
    const baseSize = containerSize * 0.4;
    const lengthFactor = Math.max(0.5, 1 - (text.length - 1) * 0.15);
    
    // Adjust for font weight (heavier fonts appear larger)
    const weightFactor = 1 - (typography.weight - 400) / 2000;
    
    return Math.round(baseSize * lengthFactor * weightFactor);
  }

  static getFontFamily(fontFamily: string): string {
    // Map common font names to web-safe alternatives
    const fontMap: Record<string, string> = {
      'Inter': 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      'Roboto': 'Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      'Open Sans': '"Open Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      'Lato': 'Lato, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      'Montserrat': 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      'Poppins': 'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    };

    return fontMap[fontFamily] || `${fontFamily}, sans-serif`;
  }

  static getGoogleFontUrl(fontFamily: string, weights: number[] = [400, 600]): string {
    const family = fontFamily.replace(/\s+/g, '+');
    const weightString = weights.join(',');
    return `https://fonts.googleapis.com/css2?family=${family}:wght@${weightString}&display=swap`;
  }
}