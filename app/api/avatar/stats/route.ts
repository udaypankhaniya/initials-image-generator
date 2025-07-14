import { NextRequest, NextResponse } from 'next/server';
import { CacheUtils } from '@/lib/utils/cache-utils';
import { RateLimiter } from '@/lib/utils/rate-limiter';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const cacheStats = CacheUtils.getStats();
    const rateLimitStats = RateLimiter.getStats();

    const stats = {
      cache: cacheStats,
      rateLimit: rateLimitStats,
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats error:', error);
    return NextResponse.json({ error: 'Failed to get stats' }, { status: 500 });
  }
}