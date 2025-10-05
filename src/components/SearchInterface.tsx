import React, { useState } from 'react';
import { SearchType } from '@/types/search';

interface SearchInterfaceProps {
  onSearch: (query: string, type: SearchType) => void;
  isLoading?: boolean;
}

export const SearchInterface: React.FC<SearchInterfaceProps> = ({ 
  onSearch, 
  isLoading = false 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<SearchType>('drug');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim(), searchType);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <select 
            value={searchType}
            onChange={(e) => setSearchType(e.target.value as SearchType)}
            className="rounded-md border border-gray-300 px-4 py-2 bg-white"
            aria-label="Search type"
          >
            <option value="drug">Search by Drug</option>
            <option value="disease">Search by Disease</option>
          </select>
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={`Enter ${searchType} name...`}
              className="w-full rounded-md border border-gray-300 px-4 py-2"
              aria-label={`Enter ${searchType} name`}
            />
          </div>
          <button 
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 rounded-md text-white ${
              isLoading 
                ? 'bg-blue-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isLoading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchInterface;