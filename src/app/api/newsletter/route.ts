import { NextRequest, NextResponse } from 'next/server';

// Email validation helper
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Sanitize input for logging
const sanitizeForLog = (input: string): string => {
  return input.replace(/[\r\n\t]/g, '').slice(0, 100);
};

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    if (!process.env.MAILERLITE_API_KEY) {
      console.error('MAILERLITE_API_KEY environment variable is missing');
      return NextResponse.json({ error: 'Service configuration error' }, { status: 500 });
    }

    // MailerLite API integration
    const response = await fetch('https://connect.mailerlite.com/api/subscribers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.MAILERLITE_API_KEY}`,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        ...(process.env.MAILERLITE_GROUP_ID && {
          groups: [process.env.MAILERLITE_GROUP_ID]
        })
      }),
    });

    if (!response.ok) {
      // Sanitize error data before logging
      console.error('MailerLite API Error:', response.status, 'for email:', sanitizeForLog(email));
      return NextResponse.json({ 
        error: response.status === 422 ? 'Email already subscribed' : 'Failed to subscribe' 
      }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Newsletter API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}