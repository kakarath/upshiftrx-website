interface QueueJob {
  id: string;
  type: 'drug-analysis' | 'disease-analysis';
  payload: any;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: number;
  completedAt?: number;
  result?: any;
  error?: string;
}

class JobQueue {
  private jobs = new Map<string, QueueJob>();
  private processing = new Set<string>();

  async enqueue(type: QueueJob['type'], payload: any): Promise<string> {
    const id = crypto.randomUUID();
    const job: QueueJob = {
      id,
      type,
      payload,
      status: 'pending',
      createdAt: Date.now()
    };
    
    this.jobs.set(id, job);
    this.processJob(id); // Start processing immediately
    return id;
  }

  async getJob(id: string): Promise<QueueJob | null> {
    return this.jobs.get(id) || null;
  }

  private async processJob(id: string) {
    if (this.processing.has(id)) return;
    
    const job = this.jobs.get(id);
    if (!job || job.status !== 'pending') return;

    this.processing.add(id);
    job.status = 'processing';

    try {
      // Simulate long-running analysis
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      job.result = {
        applications: [
          { disease: 'Sample Disease', confidence: 85 }
        ],
        papersAnalyzed: 15000,
        connections: 750,
        analysisTime: '3.2s'
      };
      
      job.status = 'completed';
      job.completedAt = Date.now();
    } catch (error) {
      job.status = 'failed';
      job.error = error instanceof Error ? error.message : 'Unknown error';
    } finally {
      this.processing.delete(id);
    }
  }
}

export const jobQueue = new JobQueue();