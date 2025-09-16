import { trackExport } from './analytics';

export interface ExportData {
  drug: string;
  timestamp: string;
  results: {
    applications: Array<{ disease: string; confidence: number }>;
    papersAnalyzed: number;
    connections: number;
    analysisTime: string;
  };
}

export const exportToJSON = (data: ExportData) => {
  trackExport('json');
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  downloadFile(blob, `upshiftrx-analysis-${data.drug}-${Date.now()}.json`);
};

export const exportToCSV = (data: ExportData) => {
  trackExport('csv');
  const csvData = [
    ['Drug', 'Disease', 'Confidence (%)', 'Papers Analyzed', 'Connections', 'Analysis Time'],
    ...data.results.applications.map(app => [
      data.drug,
      app.disease,
      app.confidence.toString(),
      data.results.papersAnalyzed.toString(),
      data.results.connections.toString(),
      data.results.analysisTime
    ])
  ];
  
  const csv = csvData.map(row => row.map(field => `"${field}"`).join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  downloadFile(blob, `upshiftrx-analysis-${data.drug}-${Date.now()}.csv`);
};

export const exportToPDF = async (data: ExportData) => {
  trackExport('pdf');
  // Simple text-based PDF for now (no dependencies needed)
  const content = `
UpShiftRx Analysis Report
Drug: ${data.drug}
Generated: ${new Date(data.timestamp).toLocaleString()}

Potential Applications:
${data.results.applications.map(app => 
  `• ${app.disease}: ${app.confidence}% confidence`
).join('\n')}

Research Evidence:
• Papers analyzed: ${data.results.papersAnalyzed}
• Connections found: ${data.results.connections}
• Analysis time: ${data.results.analysisTime}
`;
  
  const blob = new Blob([content], { type: 'text/plain' });
  downloadFile(blob, `upshiftrx-analysis-${data.drug}-${Date.now()}.txt`);
};

const downloadFile = (blob: Blob, filename: string) => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
