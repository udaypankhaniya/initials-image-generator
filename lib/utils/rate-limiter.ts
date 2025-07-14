interface RateLimitEntry {
  count: number;
  resetTime: number;
}

export class RateLimiter {
  private static requests = new Map<string, RateLimitEntry>();
  private static readonly DEFAULT_LIMIT = 100;
  private static readonly DEFAULT_WINDOW = 60 * 60 * 1000; // 1 hour

  static checkLimit(
    identifier: string, 
    limit: number = this.DEFAULT_LIMIT,
    windowMs: number = this.DEFAULT_WINDOW
  ): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const entry = this.requests.get(identifier);

    if (!entry || now > entry.resetTime) {
      // First request or window expired
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + windowMs,
      });
      
      return {
        allowed: true,
        remaining: limit - 1,
        resetTime: now + windowMs,
      };
    }

    if (entry.count >= limit) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: entry.resetTime,
      };
    }

    // Increment count
    entry.count++;
    this.requests.set(identifier, entry);

    return {
      allowed: true,
      remaining: limit - entry.count,
      resetTime: entry.resetTime,
    };
  }

  static getRemainingRequests(identifier: string, limit: number = this.DEFAULT_LIMIT): number {
    const entry = this.requests.get(identifier);
    if (!entry || Date.now() > entry.resetTime) {
      return limit;
    }
    return Math.max(0, limit - entry.count);
  }

  static getResetTime(identifier: string): number | null {
    const entry = this.requests.get(identifier);
    if (!entry || Date.now() > entry.resetTime) {
      return null;
    }
    return entry.resetTime;
  }

  static cleanup(): void {
    const now = Date.now();
    this.requests.forEach((entry, key) => {
      if (now > entry.resetTime) {
        this.requests.delete(key);
      }
    });
  }

  static getStats() {
    this.cleanup();
    return {
      activeKeys: this.requests.size,
      entries: Array.from(this.requests.entries()).map(([key, entry]) => ({
        key,
        count: entry.count,
        resetTime: entry.resetTime,
      })),
    };
  }
}