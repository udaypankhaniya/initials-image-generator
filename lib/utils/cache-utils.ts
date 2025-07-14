interface CacheEntry {
  data: any;
  timestamp: number;
  expiresAt: number;
}

export class CacheUtils {
  private static cache = new Map<string, CacheEntry>();
  private static readonly DEFAULT_TTL = 24 * 60 * 60 * 1000; // 24 hours

  static set(key: string, data: any, ttl: number = this.DEFAULT_TTL): void {
    const now = Date.now();
    const entry: CacheEntry = {
      data,
      timestamp: now,
      expiresAt: now + ttl,
    };
    
    this.cache.set(key, entry);
    this.cleanup();
  }

  static get(key: string): any | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }
    
    if (Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      return null;
    }
    
    return entry.data;
  }

  static has(key: string): boolean {
    return this.get(key) !== null;
  }

  static delete(key: string): boolean {
    return this.cache.delete(key);
  }

  static clear(): void {
    this.cache.clear();
  }

  static generateKey(config: any): string {
    // Create a deterministic key from configuration
    const configString = JSON.stringify(config, Object.keys(config).sort());
    return this.hash(configString);
  }

  private static hash(str: string): string {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
  }

  private static cleanup(): void {
    const now = Date.now();
    this.cache.forEach((entry, key) => {
      if (now > entry.expiresAt) {
        this.cache.delete(key);
      }
    });
  }

  static getStats() {
    const now = Date.now();
    let activeEntries = 0;
    let expiredEntries = 0;

    this.cache.forEach((entry) => {
      if (now > entry.expiresAt) {
        expiredEntries++;
      } else {
        activeEntries++;
      }
    });

    return {
      total: this.cache.size,
      active: activeEntries,
      expired: expiredEntries,
    };
  }
}