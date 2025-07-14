
import { z } from 'zod';

// Color schema
export const ColorSchema = z.object({
  hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
  alpha: z.number().min(0).max(1).optional().default(1),
});

// Gradient stop schema
export const GradientStopSchema = z.object({
  color: ColorSchema,
  position: z.number().min(0).max(100),
});

// Gradient schemas
export const LinearGradientSchema = z.object({
  type: z.literal('linear'),
  angle: z.number().min(0).max(360).default(0),
  stops: z.array(GradientStopSchema).min(2).max(5),
});

export const RadialGradientSchema = z.object({
  type: z.literal('radial'),
  centerX: z.number().min(0).max(100).default(50),
  centerY: z.number().min(0).max(100).default(50),
  radius: z.number().min(0).max(100).default(50),
  stops: z.array(GradientStopSchema).min(2).max(5),
});

export const ConicGradientSchema = z.object({
  type: z.literal('conic'),
  centerX: z.number().min(0).max(100).default(50),
  centerY: z.number().min(0).max(100).default(50),
  angle: z.number().min(0).max(360).default(0),
  stops: z.array(GradientStopSchema).min(2).max(5),
});

export const GradientSchema = z.discriminatedUnion('type', [
  LinearGradientSchema,
  RadialGradientSchema,
  ConicGradientSchema,
]);

// Text effect schemas
export const TextShadowSchema = z.object({
  enabled: z.boolean().default(false),
  offsetX: z.number().min(-20).max(20).default(2),
  offsetY: z.number().min(-20).max(20).default(2),
  blur: z.number().min(0).max(20).default(4),
  color: ColorSchema.default({ hex: '#000000', alpha: 0.5 }),
});

export const TextOutlineSchema = z.object({
  enabled: z.boolean().default(false),
  width: z.number().min(0).max(10).default(1),
  color: ColorSchema.default({ hex: '#000000' }),
});

// Typography schema
export const TypographySchema = z.object({
  fontFamily: z.string().default('Inter'),
  weight: z.number().min(300).max(900).step(100).default(600),
  style: z.enum(['normal', 'italic']).default('normal'),
  alignment: z.enum(['left', 'center', 'right']).default('center'),
  shadow: TextShadowSchema.optional(),
  outline: TextOutlineSchema.optional(),
});

// Shape schemas
export const BorderSchema = z.object({
  width: z.number().min(0).max(10).default(0),
  color: ColorSchema.default({ hex: '#000000' }),
  style: z.enum(['solid', 'dashed']).default('solid'),
});

export const GlowSchema = z.object({
  enabled: z.boolean().default(false),
  type: z.enum(['inner', 'outer']).default('outer'),
  blur: z.number().min(0).max(20).default(5),
  spread: z.number().min(0).max(10).default(2),
  color: ColorSchema.default({ hex: '#ffffff', alpha: 0.5 }),
});

export const ShapeSchema = z.object({
  type: z.enum(['circle', 'square', 'rounded-rectangle', 'hexagon']).default('circle'),
  radius: z.number().min(0).max(50).default(0), // For rounded-rectangle
  border: BorderSchema.optional(),
  glow: GlowSchema.optional(),
});

// Background schema
export const BackgroundSchema = z.object({
  type: z.enum(['solid', 'gradient', 'image', 'texture']).default('solid'),
  color: ColorSchema.optional(),
  gradient: GradientSchema.optional(),
  imageUrl: z.string().url().optional(),
  texture: z.enum(['dots', 'lines', 'grid', 'noise']).optional(),
  transparency: z.boolean().default(false),
});

// Display mode schema
export const DisplayModeSchema = z.object({
  type: z.enum(['initials', 'truncated', 'emoji']).default('initials'),
  maxWords: z.number().min(1).max(3).default(2),
  emoji: z.string().optional(),
});

// Export options schema
export const ExportOptionsSchema = z.object({
  format: z.enum(['png', 'jpeg', 'webp', 'svg']).default('png'),
  quality: z.number().min(0).max(100).default(90),
  size: z.enum(['64', '128', '256', '512']).default('256'),
  transparency: z.boolean().default(false),
});

// Filter schema
export const FilterSchema = z.object({
  grayscale: z.number().min(0).max(100).default(0),
  sepia: z.number().min(0).max(100).default(0),
  blur: z.number().min(0).max(10).default(0),
  brightness: z.number().min(0).max(200).default(100),
});

// Main avatar configuration schema
export const AvatarConfigSchema = z.object({
  // Basic info
  name: z.string().min(1).max(100),
  
  // Visual configuration
  shape: ShapeSchema.default({}),
  background: BackgroundSchema.default({}),
  typography: TypographySchema.default({}),
  displayMode: DisplayModeSchema.default({}),
  
  // Export settings
  export: ExportOptionsSchema.default({}),
  filters: FilterSchema.default({}),
  
  // Additional features
  generateFavicon: z.boolean().default(false),
  generateQR: z.boolean().default(false),
  qrData: z.string().optional(),
});

// API request schema
export const AvatarRequestSchema = z.object({
  config: AvatarConfigSchema,
  apiKey: z.string().optional(),
  cacheKey: z.string().optional(),
});

// Exported types
export type ColorConfig = z.infer<typeof ColorSchema>;
export type GradientStopConfig = z.infer<typeof GradientStopSchema>;
export type LinearGradientConfig = z.infer<typeof LinearGradientSchema>;
export type RadialGradientConfig = z.infer<typeof RadialGradientSchema>;
export type ConicGradientConfig = z.infer<typeof ConicGradientSchema>;
export type GradientConfig = z.infer<typeof GradientSchema>;
export type TextShadowConfig = z.infer<typeof TextShadowSchema>;
export type TextOutlineConfig = z.infer<typeof TextOutlineSchema>;
export type TypographyConfig = z.infer<typeof TypographySchema>;
export type BorderConfig = z.infer<typeof BorderSchema>;
export type GlowConfig = z.infer<typeof GlowSchema>;
export type ShapeConfig = z.infer<typeof ShapeSchema>;
export type BackgroundConfig = z.infer<typeof BackgroundSchema>;
export type DisplayModeConfig = z.infer<typeof DisplayModeSchema>;
export type ExportConfig = z.infer<typeof ExportOptionsSchema>;
export type FilterConfig = z.infer<typeof FilterSchema>;
export type AvatarConfig = z.infer<typeof AvatarConfigSchema>;
export type AvatarRequest = z.infer<typeof AvatarRequestSchema>;