# API Status Troubleshooting Guide

## Common Issues & Solutions

### "AI API" Shows as Degraded

**Problem**: Status page shows AI API as degraded or down

**Root Causes & Fixes**:

1. **Wrong Endpoint URL** ✅ FIXED
   - **Issue**: Status check was hitting `/functions` instead of `/functions/health`
   - **Fix**: Updated `src/app/api/status/route.ts` to use correct endpoint
   - **Test**: `curl -I "https://idyllic-salmiakki-7b5539.netlify.app/.netlify/functions/health"`

2. **Environment Variable Missing**
   - **Check**: Verify `UPSHIFTRX_API_URL` in `.env.local`
   - **Should be**: `https://idyllic-salmiakki-7b5539.netlify.app/.netlify/functions`
   - **Fix**: Add/update the variable and restart dev server

3. **Netlify Function Cold Start**
   - **Issue**: First request after inactivity takes >5s (timeout)
   - **Fix**: Increase timeout or warm the function
   - **Code**: Change timeout in `SERVICES` array

4. **API Rate Limiting**
   - **Issue**: Too many status checks hitting the API
   - **Fix**: Reduce check frequency or implement caching

## Manual Testing Commands

```bash
# Test AI API health endpoint
curl "https://idyllic-salmiakki-7b5539.netlify.app/.netlify/functions/health"

# Test with timeout
curl --max-time 5 "https://idyllic-salmiakki-7b5539.netlify.app/.netlify/functions/health"

# Test status page locally
curl "http://localhost:3000/api/status"
```

## Environment Variables Checklist

```bash
# Required in .env.local
UPSHIFTRX_API_URL=https://idyllic-salmiakki-7b5539.netlify.app/.netlify/functions
MAILERLITE_API_KEY=your_key_here
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Quick Fixes When Credits Run Out

### 1. Disable AI API Checks Temporarily
```typescript
// In src/app/api/status/route.ts
const SERVICES: ServiceCheck[] = [
  { name: 'Web Application', timeout: 1000 },
  // { name: 'AI API', url: `${process.env.UPSHIFTRX_API_URL}/health`, timeout: 5000 }, // DISABLED
  { name: 'Newsletter Service', url: 'https://connect.mailerlite.com/api/subscribers', timeout: 3000 },
  { name: 'Database', timeout: 500 },
];
```

### 2. Mock AI API Response
```typescript
// Add to checkService function
if (service.name === 'AI API' && !process.env.UPSHIFTRX_API_URL) {
  return {
    name: service.name,
    status: 'maintenance',
    responseTime: 0,
    lastChecked: new Date().toISOString()
  };
}
```

### 3. Update Status Messages
```typescript
// In status page component
const getStatusMessage = (status: string) => {
  switch (status) {
    case 'operational': return 'All systems operational';
    case 'degraded': return 'Some services experiencing issues';
    case 'maintenance': return 'Scheduled maintenance - API credits exhausted';
    case 'down': return 'Service unavailable';
    default: return 'Unknown status';
  }
};
```

## Monitoring & Alerts

### Set Up Uptime Monitoring
- Use UptimeRobot or similar for external monitoring
- Monitor: `https://idyllic-salmiakki-7b5539.netlify.app/.netlify/functions/health`
- Alert when response time > 10s or status != 200

### Log Analysis
```bash
# Check Netlify function logs
netlify functions:log health

# Check Next.js logs
npm run dev 2>&1 | grep -i error
```

## Emergency Contacts & Resources

- **Netlify Dashboard**: https://app.netlify.com/sites/idyllic-salmiakki-7b5539
- **API Documentation**: `/docs/API.md`
- **Status Page**: `/status`
- **Health Endpoint**: `/.netlify/functions/health`