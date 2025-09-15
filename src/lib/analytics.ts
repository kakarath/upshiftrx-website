declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: Record<string, unknown>) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || '';

export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

export const trackDemoUsage = (drug: string) => {
  trackEvent('demo_search', 'engagement', drug);
};

export const trackNetworkInteraction = (action: 'zoom' | 'drag' | 'hover') => {
  trackEvent('network_graph', 'interaction', action);
};

export const trackExport = (format: string) => {
  trackEvent('export_data', 'conversion', format);
};

export const trackNewsletterSignup = () => {
  trackEvent('newsletter_signup', 'conversion');
};