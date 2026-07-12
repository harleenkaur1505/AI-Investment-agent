import React, { useState } from 'react';
import { Search, Loader2 } from 'lucide-react';

export default function SearchInput({ onSearch, isLoading }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!query.trim()) {
      setError('Please enter a company name or stock ticker (e.g., AAPL).');
      return;
    }

    onSearch(query.trim());
  };

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      <form onSubmit={handleSubmit} className="relative flex items-stretch gap-2.5">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-text-secondary">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            placeholder="Enter company name or ticker (e.g., AAPL, Microsoft)"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              if (e.target.value.trim()) setError('');
            }}
            disabled={isLoading}
            className="w-full pl-11 pr-4 py-3 bg-[#09151B] border border-[#1b2d35] rounded-xl text-text-primary placeholder-text-secondary focus:outline-hidden focus:border-[#33bfae] focus:ring-2 focus:ring-[#33bfae]/15 transition-all-300 disabled:bg-[#050C0F] disabled:text-text-secondary text-xs shadow-xs"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#33bfae] hover:bg-[#2cb2a2] text-black font-bold px-5 py-3 rounded-xl flex items-center gap-1.5 cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed transition-all-300 text-xs shrink-0 font-sans"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <span>Analyze</span>
          )}
        </button>
      </form>
      {error && (
        <p className="text-error-red text-[11px] mt-2 ml-2 font-medium">
          {error}
        </p>
      )}
    </div>
  );
}

