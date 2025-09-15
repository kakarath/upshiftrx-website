import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
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
      console.error('MailerLite API Error:', response.status);
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