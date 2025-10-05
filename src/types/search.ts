export type SearchType = 'drug' | 'disease';

export interface SearchResult {
  name: string;
  diseases?: string[];
  drugs?: string[];
  confidence: number;
  references: string[];
}

export interface SearchResponse {
  results: SearchResult[];
  error?: string;
}