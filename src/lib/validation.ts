import { z } from 'zod';

// Input validation schemas
export const searchSchema = z.object({
  drug: z.string().min(1).max(100).optional(),
  disease: z.string().min(1).max(100).optional(),
  searchMode: z.enum(['drug', 'disease']),
}).refine(data => data.drug || data.disease, {
  message: "Either drug or disease must be provided"
});

export const emailSchema = z.object({
  email: z.string().email().max(254),
});

// Sanitization helpers
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>\"'&]/g, '')
    .trim()
    .slice(0, 100);
};

export const sanitizeForLog = (input: string): string => {
  return input
    .replace(/[\r\n\t]/g, '')
    .slice(0, 100);
};

// Rate limiting helper
export const createRateLimiter = (limit: number, windowMs: number) => {
  const requests = new Map();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    for (const [key, timestamp] of requests.entries()) {
      if (timestamp < windowStart) {
        requests.delete(key);
      }
    }
    
    // Check current requests
    const userRequests = Array.from(requests.entries())
      .filter(([key]) => key.startsWith(identifier))
      .length;
    
    if (userRequests >= limit) {
      return false;
    }
    
    requests.set(`${identifier}_${now}`, now);
    return true;
  };
};