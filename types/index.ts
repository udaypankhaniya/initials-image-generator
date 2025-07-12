export interface ImageGenerationParams {
  name: string;
  height?: number;
  width?: number;
  color?: string;
  bcolor?: string;
  radius?: number;
  gradient?: boolean;
  gradientDirection?: string;
  gradientColor?: string;
  imageType?: string;
}

export interface ValidatedImageParams {
  name: string;
  height: number;
  width: number;
  color: string;
  bcolor: string;
  initials: string;
  radius: number;
  gradient: boolean;
  gradientDirection: string;
  gradientColor: string;
  imageType: string;
}

export interface FormData {
  name: string;
  height: number;
  width: number;
  textColor: string;
  backgroundColor: string;
  radius: number;
  gradient: boolean;
  gradientDirection: string;
  gradientColor: string;
  imageType: string;
}

export interface ApiError {
  error: string;
  details?: string;
}