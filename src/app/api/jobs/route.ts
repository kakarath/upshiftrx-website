import { NextRequest, NextResponse } from 'next/server';
import { jobQueue } from '../../../lib/queue';

export async function POST(request: NextRequest) {
  try {
    const { type, payload } = await request.json();
    const jobId = await jobQueue.enqueue(type, payload);
    
    return NextResponse.json({ jobId, status: 'queued' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to queue job' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const jobId = searchParams.get('id');
  
  if (!jobId) {
    return NextResponse.json({ error: 'Job ID required' }, { status: 400 });
  }
  
  const job = await jobQueue.getJob(jobId);
  if (!job) {
    return NextResponse.json({ error: 'Job not found' }, { status: 404 });
  }
  
  return NextResponse.json(job);
}