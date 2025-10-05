import { NextRequest, NextResponse } from 'next/server';
import { getDrugByName, getDrugsForDisease } from '../../../lib/demo-drugs';

// Input sanitization helper
const sanitizeInput = (input: string): string => {
  return input.replace(/[<>"'&]/g, '').trim().slice(0, 100);
};

export async function POST(request: NextRequest) {
  try {
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
  } catch (error) {
    console.error('Demo API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}