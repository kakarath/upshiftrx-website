import { NextRequest, NextResponse } from 'next/server';
import { rateLimiter, strictRateLimiter } from './lib/rate-limiter';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Apply strict rate limiting to heavy operations
    const isHeavyOp = request.nextUrl.pathname.includes('/jobs');
    const limiter = isHeavyOp ? strictRateLimiter : rateLimiter;
    
    if (!limiter.isAllowed(ip)) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429, headers: { 'Retry-After': '60' } }
      );
    }
    
    const response = NextResponse.next();
    
    // Add rate limit headers
    response.headers.set('X-RateLimit-Remaining', limiter.getRemainingRequests(ip).toString());
    response.headers.set('X-Request-Timeout', '8000');
    response.headers.set('X-Request-ID', crypto.randomUUID());
    
    return response;
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/api/:path*'
};