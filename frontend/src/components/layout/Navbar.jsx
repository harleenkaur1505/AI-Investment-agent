import React, { useEffect, useState } from 'react';
import { TrendingUp, RefreshCw, Calendar, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar({ onRefresh, currentSymbol, isSidebarOpen, onToggleSidebar }) {
  const [marketStatus, setMarketStatus] = useState({ open: false, label: 'US Market Closed' });
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    // 1. Dynamic US Market Status calculation (NYSE 9:30 AM - 4:00 PM EST, Mon-Fri)
    const updateMarketStatus = () => {
      try {
        const options = { timeZone: 'America/New_York', hour12: false, weekday: 'short', hour: '2-digit', minute: '2-digit' };
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const formattedParts = formatter.formatToParts(new Date());
        
        let weekday = '';
        let hour = 0;
        let minute = 0;
        
        for (const part of formattedParts) {
          if (part.type === 'weekday') weekday = part.value;
          if (part.type === 'hour') hour = parseInt(part.value, 10);
          if (part.type === 'minute') minute = parseInt(part.value, 10);
        }
        
        const isWeekend = weekday === 'Sat' || weekday === 'Sun';
        const timeInMinutes = hour * 60 + minute;
        const isOpenTime = timeInMinutes >= (9 * 60 + 30) && timeInMinutes < (16 * 60);
        
        if (isWeekend) {
          setMarketStatus({ open: false, label: 'US Market Closed' });
        } else if (isOpenTime) {
          setMarketStatus({ open: true, label: 'US Market Open' });
        } else {
          setMarketStatus({ open: false, label: 'US Market Closed' });
        }
      } catch {
        setMarketStatus({ open: false, label: 'US Market Closed' });
      }
    };

    // 2. Format Current Date
    const updateDate = () => {
      const dateStr = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
      setCurrentDate(dateStr);
    };

    updateMarketStatus();
    updateDate();

    // Check status every minute
    const interval = setInterval(updateMarketStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border-dark px-4 md:px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Mobile Sidebar Hamburger Toggle */}
        <button
          onClick={onToggleSidebar}
          className="md:hidden p-1.5 text-text-secondary hover:text-text-primary hover:bg-bg-dark rounded-lg transition-all-300 cursor-pointer"
          title="Toggle Navigation Menu"
        >
          {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        <div className="bg-primary-accent/10 p-1.5 rounded-lg text-primary-accent border border-primary-accent/20">
          <TrendingUp className="w-4 h-4" />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-text-primary tracking-tight text-sm md:text-base">
            AI Investment Research Terminal
          </span>
          <span className="hidden lg:inline-flex items-center gap-1 bg-secondary-accent/10 text-secondary-accent text-[10px] font-bold px-2 py-0.5 rounded-full border border-secondary-accent/20">
            <ShieldCheck className="w-3 h-3" />
            SEC FACT-CHECKED
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Dynamic US Market Status Badge */}
        <div className="flex items-center gap-1.5">
          <span className={`w-2 h-2 rounded-full ${marketStatus.open ? 'bg-success-green animate-pulse' : 'bg-error-red'}`} />
          <span className="text-[10px] text-text-secondary font-bold uppercase tracking-wider hidden sm:inline-block">
            {marketStatus.label}
          </span>
        </div>

        {/* Current Date Display */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-text-secondary font-medium">
          <Calendar className="w-3.5 h-3.5" />
          <span className="font-mono">{currentDate}</span>
        </div>

        {/* Refresh Current Ticker Button */}
        <button
          onClick={onRefresh}
          disabled={!currentSymbol}
          className="p-1.5 text-text-secondary hover:text-text-primary hover:bg-bg-dark rounded-lg transition-all-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer border border-transparent hover:border-border-dark"
          title="Refresh Analysis"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}

