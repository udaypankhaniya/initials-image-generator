import { NextRequest, NextResponse } from 'next/server';
import { AvatarRequestSchema } from '@/lib/schemas/avatar';
import { SVGGenerator } from '@/lib/generators/svg-generator';
import { QRGenerator } from '@/lib/generators/qr-generator';
import { ColorUtils } from '@/lib/utils/color-utils';
import { CacheUtils } from '@/lib/utils/cache-utils';
import { RateLimiter } from '@/lib/utils/rate-limiter';
import { ValidationError, RateLimitError, ProcessingError, formatErrorResponse } from '@/lib/errors/avatar-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    // Rate limiting
    const rateLimitResult = RateLimiter.checkLimit(clientIP);
    if (!rateLimitResult.allowed) {
      throw new RateLimitError();
    }

    // Parse parameters
    const rawConfig = Object.fromEntries(searchParams.entries());
    
    // Basic parameter parsing for backward compatibility
    const config = {
      name: rawConfig.name || 'User',
      shape: {
        type: rawConfig.shape || 'circle',
        radius: rawConfig.radius ? parseInt(rawConfig.radius) : 0,
      },
      background: {
        type: rawConfig.gradient === 'true' ? 'gradient' : 'solid',
        color: rawConfig.bcolor ? { hex: rawConfig.bcolor } : { hex: '#ffffff' },
        gradient: rawConfig.gradient === 'true' ? {
          type: 'linear' as const,
          angle: 0,
          stops: [
            { color: { hex: rawConfig.bcolor || '#ffffff' }, position: 0 },
            { color: { hex: rawConfig.gradientColor || '#000000' }, position: 100 },
          ],
        } : undefined,
      },
      typography: {
        fontFamily: rawConfig.fontFamily || 'Inter',
        weight: rawConfig.fontWeight ? parseInt(rawConfig.fontWeight) : 600,
        style: rawConfig.fontStyle as 'normal' | 'italic' || 'normal',
        alignment: rawConfig.textAlign as 'left' | 'center' | 'right' || 'center',
      },
      displayMode: {
        type: 'initials' as const,
      },
      export: {
        format: rawConfig.format as 'png' | 'jpeg' | 'webp' | 'svg' || 'svg',
        size: rawConfig.size || '256',
        quality: rawConfig.quality ? parseInt(rawConfig.quality) : 90,
        transparency: rawConfig.transparency === 'true',
      },
      filters: {
        grayscale: rawConfig.grayscale ? parseInt(rawConfig.grayscale) : 0,
        sepia: rawConfig.sepia ? parseInt(rawConfig.sepia) : 0,
        blur: rawConfig.blur ? parseInt(rawConfig.blur) : 0,
        brightness: rawConfig.brightness ? parseInt(rawConfig.brightness) : 100,
      },
      generateFavicon: rawConfig.generateFavicon === 'true',
      generateQR: rawConfig.generateQR === 'true',
      qrData: rawConfig.qrData,
    };

    // Validate configuration
    const validation = AvatarRequestSchema.safeParse({ config });
    if (!validation.success) {
      throw new ValidationError('Invalid configuration', validation.error.errors);
    }

    const validatedConfig = validation.data.config;

    // Check cache
    const cacheKey = CacheUtils.generateKey(validatedConfig);
    const cachedResult = CacheUtils.get(cacheKey);
    if (cachedResult) {
      return new NextResponse(cachedResult.data, {
        status: 200,
        headers: {
          'Content-Type': cachedResult.contentType,
          'Cache-Control': 'public, max-age=86400',
          'X-Cache': 'HIT',
          'X-Rate-Limit-Remaining': rateLimitResult.remaining.toString(),
        },
      });
    }

    // Generate avatar
    let result: string;
    let contentType: string;

    if (validatedConfig.generateQR && validatedConfig.qrData) {
      result = QRGenerator.generateWithAvatar(validatedConfig, validatedConfig.qrData);
      contentType = 'image/svg+xml';
    } else if (validatedConfig.generateFavicon) {
      const favicons = SVGGenerator.generateFavicon(validatedConfig);
      result = JSON.stringify(favicons);
      contentType = 'application/json';
    } else {
      result = SVGGenerator.generate(validatedConfig);
      contentType = validatedConfig.export.format === 'svg' ? 'image/svg+xml' : 'image/png';
    }

    // Cache result
    CacheUtils.set(cacheKey, { data: result, contentType });

    // Generate metadata
    const metadata = {
      dominantColor: ColorUtils.getDominantColor([validatedConfig.background.color!]),
      contrastRatio: ColorUtils.getContrastRatio(
        validatedConfig.background.color?.hex || '#ffffff',
        '#000000'
      ),
    };

    const response = new NextResponse(result, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
        'X-Cache': 'MISS',
        'X-Rate-Limit-Remaining': rateLimitResult.remaining.toString(),
        'X-Metadata': JSON.stringify(metadata),
      },
    });

    return response;

  } catch (error) {
    console.error('Avatar generation error:', error);

    if (error instanceof ValidationError || error instanceof RateLimitError) {
      return NextResponse.json(formatErrorResponse(error), { status: error.statusCode });
    }

    const processingError = new ProcessingError('Failed to generate avatar');
    return NextResponse.json(formatErrorResponse(processingError), { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const clientIP = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    // Rate limiting
    const rateLimitResult = RateLimiter.checkLimit(clientIP);
    if (!rateLimitResult.allowed) {
      throw new RateLimitError();
    }

    // Validate request
    const validation = AvatarRequestSchema.safeParse(body);
    if (!validation.success) {
      throw new ValidationError('Invalid request body', validation.error.errors);
    }

    const { config } = validation.data;

    // Check cache
    const cacheKey = CacheUtils.generateKey(config);
    const cachedResult = CacheUtils.get(cacheKey);
    if (cachedResult) {
      return NextResponse.json({
        success: true,
        data: cachedResult.data,
        metadata: cachedResult.metadata,
        cached: true,
      });
    }

    // Generate avatar
    let result: string;
    let contentType: string;

    if (config.generateQR && config.qrData) {
      result = QRGenerator.generateWithAvatar(config, config.qrData);
      contentType = 'image/svg+xml';
    } else if (config.generateFavicon) {
      const favicons = SVGGenerator.generateFavicon(config);
      result = JSON.stringify(favicons);
      contentType = 'application/json';
    } else {
      result = SVGGenerator.generate(config);
      contentType = config.export.format === 'svg' ? 'image/svg+xml' : 'image/png';
    }

    // Generate metadata
    const metadata = {
      dominantColor: ColorUtils.getDominantColor([config.background.color!]),
      contrastRatio: ColorUtils.getContrastRatio(
        config.background.color?.hex || '#ffffff',
        '#000000'
      ),
      generatedAt: new Date().toISOString(),
      cacheKey,
    };

    // Cache result
    CacheUtils.set(cacheKey, { data: result, contentType, metadata });

    return NextResponse.json({
      success: true,
      data: result,
      metadata,
      cached: false,
    });

  } catch (error) {
    console.error('Avatar generation error:', error);

    if (error instanceof ValidationError || error instanceof RateLimitError) {
      return NextResponse.json(formatErrorResponse(error), { status: error.statusCode });
    }

    const processingError = new ProcessingError('Failed to generate avatar');
    return NextResponse.json(formatErrorResponse(processingError), { status: 500 });
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}