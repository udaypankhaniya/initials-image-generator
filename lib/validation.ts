import { ImageGenerationParams, ValidatedImageParams } from '@/types';

export function extractInitials(name: string): string {
  const trimmedName = name.trim();
  if (!trimmedName) return '';
  
  const words = trimmedName.split(/\s+/);
  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase();
  }
  
  const firstInitial = words[0].charAt(0).toUpperCase();
  const lastInitial = words[words.length - 1].charAt(0).toUpperCase();
  return firstInitial + lastInitial;
}

export function isValidHexColor(color: string): boolean {
  // Handle URL-encoded hex colors (e.g., %23000000 -> #000000)
  const decodedColor = decodeURIComponent(color);
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  return hexRegex.test(decodedColor);
}

export function validateImageParams(params: ImageGenerationParams): {
  isValid: boolean;
  errors: string[];
  validatedParams?: ValidatedImageParams;
} {
  const errors: string[] = [];
  
  // Validate name
  if (!params.name || typeof params.name !== 'string') {
    errors.push('Name is required and must be a string');
  }
  
  const trimmedName = params.name?.trim() || '';
  if (trimmedName.length === 0) {
    errors.push('Name cannot be empty');
  }
  
  // Validate dimensions
  const height = params.height ? Number(params.height) : 200;
  const width = params.width ? Number(params.width) : 200;
  

  
  // Validate colors
  const color = params.color || '#000000';
  const bcolor = params.bcolor || '#FFFFFF';
  
  if (!isValidHexColor(color)) {
    errors.push('Text color must be a valid hex color (e.g., #000000)');
  }
  
  if (!isValidHexColor(bcolor)) {
    errors.push('Background color must be a valid hex color (e.g., #FFFFFF)');
  }
  
  // Validate radius
  const radius = params.radius ? Number(params.radius) : 0;
  if (isNaN(radius) || radius < 0 || radius > 50) {
    errors.push('Radius must be a number between 0 and 50');
  }
  
  // Validate gradient
  const gradient = params.gradient === true ;
  const gradientDirection = params.gradientDirection || 'to bottom';
  const gradientColor = params.gradientColor || color;
  
  if (gradient && !isValidHexColor(gradientColor)) {
    errors.push('Gradient color must be a valid hex color (e.g., #FF0000)');
  }
  
  if (errors.length > 0) {
    return { isValid: false, errors };
  }
  
  const initials = extractInitials(trimmedName);
  if (!initials) {
    errors.push('Unable to extract initials from the provided name');
    return { isValid: false, errors };
  }
  
  return {
    isValid: true,
    errors: [],
    validatedParams: {
      name: trimmedName,
      height: Math.round(height),
      width: Math.round(width),
      color,
      bcolor,
      initials,
      radius: Math.round(radius),
      gradient,
      gradientDirection,
      gradientColor,
      imageType: params.imageType || 'png'
        }
  };
}