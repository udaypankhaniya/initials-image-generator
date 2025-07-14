export class AvatarError extends Error {
  public code: string;
  public statusCode: number;
  public details?: object;

  constructor(code: string, message: string, statusCode: number = 400, details?: object) {
    super(message);
    this.name = 'AvatarError';
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
  }
}

export class ValidationError extends AvatarError {
  constructor(message: string, details?: object) {
    super('VALIDATION_ERROR', message, 400, details);
  }
}

export class RateLimitError extends AvatarError {
  constructor(message: string = 'Rate limit exceeded') {
    super('RATE_LIMIT_EXCEEDED', message, 429);
  }
}

export class ProcessingError extends AvatarError {
  constructor(message: string, details?: object) {
    super('PROCESSING_ERROR', message, 500, details);
  }
}

export class FontLoadError extends AvatarError {
  constructor(fontFamily: string) {
    super('FONT_LOAD_ERROR', `Failed to load font: ${fontFamily}`, 400);
  }
}

export class ImageGenerationError extends AvatarError {
  constructor(message: string, details?: object) {
    super('IMAGE_GENERATION_ERROR', message, 500, details);
  }
}

export function formatErrorResponse(error: AvatarError) {
  return {
    error: {
      code: error.code,
      message: error.message,
      details: error.details,
    },
  };
}