import { NextRequest, NextResponse } from 'next/server';
import { getDrugByName, getDrugsForDisease } from '../../../lib/demo-drugs';
import { apiCircuitBreaker } from '../../../lib/circuit-breaker';

// Input sanitization helper
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>"'&]/g, '').trim().slice(0, 100);
};

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  
  try {
    // Early timeout check
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Request timeout')), 8000)
    );
    
    const processRequest = async () => {
    const body = await request.json();
    const { drug, disease, searchMode } = body;

    if (!drug && !disease) {
      return NextResponse.json({ error: 'Drug or disease name is required' }, { status: 400 });
    }

    // Sanitize inputs
    const sanitizedDrug = drug ? sanitizeInput(drug) : null;
    const sanitizedDisease = disease ? sanitizeInput(disease) : null;

    // Handle disease-to-drug search
    if (searchMode === 'disease' || sanitizedDisease) {
      const results = getDrugsForDisease(sanitizedDisease || sanitizedDrug!);
      if (results) {
        return NextResponse.json({
          ...results,
          applications: results.applications?.map(app => ({
            disease: sanitizeInput(app.disease || ''),
            confidence: app.confidence
          }))
        });
      }
    }

    // Handle drug-to-disease search (existing logic)
    const demoDrug = getDrugByName(sanitizedDrug!);
    if (demoDrug) {
      return NextResponse.json({
        applications: demoDrug.applications.map(app => ({
          disease: sanitizeInput(app.disease),
          confidence: app.confidence
        })),
        papersAnalyzed: Math.floor(Math.random() * 10000) + 5000,
        connections: Math.floor(Math.random() * 500) + 200,
        analysisTime: `${(Math.random() * 2 + 0.3).toFixed(1)}s`
      });
    }

    // Validate API URL to prevent SSRF
    const apiUrl = process.env.UPSHIFTRX_API_URL;
    if (!apiUrl || !apiUrl.startsWith('https://')) {
      return NextResponse.json({ error: 'Invalid API configuration' }, { status: 500 });
    }

    // Fallback to demo drug database
    const fallbackDrug = getDrugByName(sanitizedDrug || 'aspirin');
    if (fallbackDrug) {
      return NextResponse.json({
        applications: fallbackDrug.applications.map(app => ({
          disease: sanitizeInput(app.disease),
          confidence: app.confidence
        })),
        papersAnalyzed: Math.floor(Math.random() * 10000) + 5000,
        connections: Math.floor(Math.random() * 500) + 200,
        analysisTime: `${(Math.random() * 2 + 0.3).toFixed(1)}s`
      });
    }

    return NextResponse.json({ error: 'No analysis results found' }, { status: 404 });
    };
    
    // Execute with circuit breaker and timeout
    const result = await Promise.race([
      apiCircuitBreaker.execute(processRequest),
      timeoutPromise
    ]);
    
    return result;
  } catch (error) {
    const duration = Date.now() - startTime;
    console.error(`Demo API Error (${duration}ms):`, error);
    
    if (error instanceof Error && error.message === 'Request timeout') {
      return NextResponse.json({ error: 'Request timeout' }, { status: 408 });
    }
    
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}