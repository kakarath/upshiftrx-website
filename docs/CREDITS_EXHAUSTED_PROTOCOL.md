# Credits Exhausted Protocol

## When Free Credits Run Out

### Immediate Actions (5 minutes)

1. **Update Status Page**
   ```bash
   # Edit .env.local
   echo "API_STATUS_OVERRIDE=maintenance" >> .env.local
   ```

2. **Deploy Maintenance Mode**
   ```bash
   # Quick deploy with status override
   npm run build && npm run start
   ```

3. **Update User-Facing Messages**
   - Status page shows "Scheduled Maintenance"
   - Search interface shows "API temporarily unavailable"
   - Newsletter signup remains functional

### Technical Implementation

#### 1. Environment Variable Override
```bash
# Add to .env.local when credits exhausted
API_STATUS_OVERRIDE=maintenance
MAINTENANCE_MESSAGE="API services temporarily unavailable due to usage limits. Restoring shortly."
```

#### 2. Status Check Modification
```typescript
// In src/app/api/status/route.ts
async function checkService(service: ServiceCheck) {
  // Check for override first
  if (service.name === 'AI API' && process.env.API_STATUS_OVERRIDE) {
    return {
      name: service.name,
      status: process.env.API_STATUS_OVERRIDE,
      responseTime: 0,
      lastChecked: new Date().toISOString(),
      message: process.env.MAINTENANCE_MESSAGE
    };
  }
  // ... rest of function
}
```

#### 3. Search Interface Fallback
```typescript
// In SearchInterface component
const isMaintenanceMode = process.env.API_STATUS_OVERRIDE === 'maintenance';

if (isMaintenanceMode) {
  return (
    <div className="maintenance-banner">
      <h3>Service Temporarily Unavailable</h3>
      <p>Our AI API is undergoing maintenance. Please check back shortly.</p>
      <p>Expected restoration: Within 24 hours</p>
    </div>
  );
}
```

### Communication Strategy

#### 1. Status Page Updates
- Clear maintenance message
- Expected restoration time
- Alternative contact methods

#### 2. User Notifications
- Email subscribers about temporary downtime
- Social media update (if applicable)
- Website banner notification

#### 3. Stakeholder Communication
```
Subject: UpShiftRx API Maintenance - Temporary Service Interruption

Dear [Stakeholder],

Our AI API services are temporarily unavailable due to scheduled maintenance.

- Duration: Up to 24 hours
- Affected: Drug/disease search functionality
- Unaffected: Website, newsletter, documentation
- Restoration: [Expected time]

We apologize for any inconvenience.

Best regards,
UpShiftRx Team
```

### Recovery Checklist

#### When Credits Restore
1. **Remove Overrides**
   ```bash
   # Remove from .env.local
   sed -i '' '/API_STATUS_OVERRIDE/d' .env.local
   sed -i '' '/MAINTENANCE_MESSAGE/d' .env.local
   ```

2. **Test API Functionality**
   ```bash
   curl "https://idyllic-salmiakki-7b5539.netlify.app/.netlify/functions/health"
   ```

3. **Verify Status Page**
   - Check `/status` shows all green
   - Test search functionality
   - Monitor for 30 minutes

4. **Update Communications**
   - Status page: "All systems operational"
   - Remove maintenance banners
   - Send restoration notification

### Prevention Strategies

#### 1. Usage Monitoring
```typescript
// Add to API functions
const logUsage = () => {
  console.log(`API call at ${new Date().toISOString()}`);
  // Track daily usage
};
```

#### 2. Credit Alerts
- Set up monitoring at 80% usage
- Daily usage reports
- Automatic scaling triggers

#### 3. Graceful Degradation
- Cache recent results
- Provide sample data during outages
- Queue requests for later processing

### Emergency Contacts

- **Primary**: [Your contact]
- **Technical**: [Technical lead]
- **Business**: [Business contact]
- **Hosting**: Netlify support

### Backup Plans

1. **Alternative API Endpoints**
   - Backup Netlify deployment
   - Local development server
   - Partner API access

2. **Static Fallbacks**
   - Pre-generated sample results
   - Cached popular searches
   - Demo mode with sample data

3. **Communication Channels**
   - Status page updates
   - Email notifications
   - Social media updates