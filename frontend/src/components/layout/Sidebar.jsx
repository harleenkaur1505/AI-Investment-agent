import React, { useState } from 'react';
import { Search, History, Star, Shield, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export default function Sidebar({ 
  onSearch, 
  isLoading, 
  recentSearches, 
  selectedSymbol,
  onSelectSymbol,
  watchlist = []
}) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    onSearch(query.trim());
    setQuery('');
  };

  return (
    <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-border-dark bg-[#0E171C]/25 backdrop-blur-md flex flex-col shrink-0">
      
      {/* Sidebar Search Section */}
      <div className="p-4 border-b border-border-dark">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            placeholder="Search symbol..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={isLoading}
            className="w-full pl-9 pr-3 py-2 bg-bg-dark border border-border-dark rounded-xl text-text-primary placeholder-text-secondary focus:outline-hidden focus:border-primary-accent transition-all-300 text-xs disabled:opacity-50"
          />
          <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-text-secondary" />
        </form>
      </div>

      {/* Watchlist Section */}
      <div className="flex-1 p-4 space-y-5">
        {watchlist && watchlist.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-3">
              <Star className="w-3.5 h-3.5 text-primary-accent fill-primary-accent/10" />
              <span>Terminal Watchlist</span>
            </div>
            
            <div className="space-y-2.5">
              {watchlist.map((item) => {
                const isSelected = selectedSymbol?.toUpperCase() === item.symbol;
                return (
                  <button
                    key={item.symbol}
                    onClick={() => onSelectSymbol(item.symbol)}
                    disabled={isLoading}
                    className={`w-full text-left p-3 rounded-xl border transition-all-300 flex flex-col gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'border-primary-accent bg-primary-accent/5'
                        : 'border-border-dark hover:border-text-secondary bg-bg-dark/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-sm tracking-tight text-text-primary">
                        {item.symbol}
                      </span>
                      <span className="text-[10px] text-text-secondary font-semibold max-w-[100px] truncate text-right">
                        {item.name}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-semibold text-text-primary">
                        {item.price}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-xs font-bold flex items-center ${
                          item.isPositive ? 'text-success-green' : 'text-error-red'
                        }`}>
                          {item.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                          {item.change}
                        </span>
                        <span className="text-[9px] bg-secondary-accent/10 text-secondary-accent border border-secondary-accent/20 px-1.5 py-0.5 rounded-md font-semibold tracking-wider flex items-center gap-0.5">
                          <Shield className="w-2.5 h-2.5" />
                          <span className="font-mono">{item.confidence}%</span>
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Recent Searches Section */}
        {recentSearches && recentSearches.length > 0 && (
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-3">
              <History className="w-3.5 h-3.5" />
              <span>Recent Searches</span>
            </div>
            
            <div className="space-y-1.5">
              {recentSearches.map((searchSymbol) => {
                const isSelected = selectedSymbol?.toUpperCase() === searchSymbol.toUpperCase();
                return (
                  <button
                    key={searchSymbol}
                    onClick={() => onSelectSymbol(searchSymbol)}
                    disabled={isLoading}
                    className={`w-full text-left px-3 py-2 rounded-lg border text-xs font-mono font-semibold transition-all-300 cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-primary-accent text-primary-accent bg-primary-accent/5'
                        : 'border-border-dark hover:border-text-secondary bg-bg-dark/20 text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    <span>{searchSymbol.toUpperCase()}</span>
                    <ArrowUpRight className="w-3 h-3 opacity-30 group-hover:opacity-100" />
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

    </aside>
  );
}
