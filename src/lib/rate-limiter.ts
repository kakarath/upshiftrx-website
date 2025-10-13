interface RateLimitEntry {
  count: number;
  resetTime: number;
}

class RateLimiter {
  private store = new Map<string, RateLimitEntry>();
  
  constructor(
    private limit = 100, // requests per window
    private windowMs = 60000 // 1 minute
  ) {}
  
  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const entry = this.store.get(identifier);
    
    if (!entry || now > entry.resetTime) {
      this.store.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      });
      return true;
    }
    
    if (entry.count >= this.limit) {
      return false;
    }
    
    entry.count++;
    return true;
  }
  
  getRemainingRequests(identifier: string): number {
    const entry = this.store.get(identifier);
    if (!entry || Date.now() > entry.resetTime) {
      return this.limit;
    }
    return Math.max(0, this.limit - entry.count);
  }
}

export const rateLimiter = new RateLimiter(100, 60000); // 100 req/min
export const strictRateLimiter = new RateLimiter(10, 60000); // 10 req/min for heavy ops