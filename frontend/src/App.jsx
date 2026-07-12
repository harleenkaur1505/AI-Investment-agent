import React, { useState } from 'react';
import Navbar from './components/layout/Navbar.jsx';
import Sidebar from './components/layout/Sidebar.jsx';
import Hero from './components/layout/Hero.jsx';
import SearchInput from './components/common/SearchInput.jsx';
import LoadingProgress from './components/common/LoadingProgress.jsx';
import ErrorMessage from './components/common/ErrorMessage.jsx';
import DashboardLayout from './components/dashboard/DashboardLayout.jsx';
import AIResearchPanel from './components/dashboard/AIResearchPanel.jsx';
import { analyzeCompany } from './services/analysisService.js';
import './App.css';

function App() {
  const [loading, setLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const stored = localStorage.getItem('recentSearches');
      return stored ? JSON.parse(stored).slice(0, 6) : [];
    } catch {
      return [];
    }
  });
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const stored = localStorage.getItem('terminalWatchlist');
      if (stored) return JSON.parse(stored).slice(0, 3);
      
      const defaultWatchlist = [
        { symbol: 'AAPL', name: 'Apple Inc.', price: '$215.80', change: '+1.25%', isPositive: true, confidence: 88 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$442.20', change: '-0.40%', isPositive: false, confidence: 92 }
      ];
      localStorage.setItem('terminalWatchlist', JSON.stringify(defaultWatchlist));
      return defaultWatchlist;
    } catch {
      return [
        { symbol: 'AAPL', name: 'Apple Inc.', price: '$215.80', change: '+1.25%', isPositive: true, confidence: 88 },
        { symbol: 'MSFT', name: 'Microsoft Corp.', price: '$442.20', change: '-0.40%', isPositive: false, confidence: 92 }
      ];
    }
  });

  const handleSearch = async (query) => {
    const cleanQuery = query.trim();
    if (!cleanQuery) return;

    setLoading(true);
    setError(null);
    setData(null);
    setActiveStep(1);

    // Dynamic timer to increment the loading steps (up to step 4) during the active request
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev < 4) return prev + 1;
        return prev;
      });
    }, 1000);

    try {
      loggerDebug(`Initiating backend query for: "${cleanQuery}"`);
      const result = await analyzeCompany(cleanQuery);
      
      clearInterval(interval);

      if (result && result.success === false) {
        setError(result.message || 'Company not found. Please enter a valid publicly listed company.');
        setData(null);
        setLoading(false);
        return;
      }
      
      setActiveStep(5);

      // Save to recent searches if search was successful
      const symbolUpper = (result.companyOverview?.symbol || cleanQuery).toUpperCase();
      setRecentSearches((prev) => {
        const filtered = prev.filter((s) => s.toUpperCase() !== symbolUpper);
        const updated = [symbolUpper, ...filtered].slice(0, 6);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
        return updated;
      });

      // Update watchlist dynamically
      const latestPriceVal = result.revenueTrend && result.revenueTrend.length > 0 
        ? `$${result.revenueTrend[result.revenueTrend.length - 1].price.toFixed(2)}` 
        : '$0.00';
        
      let changeStr = '+0.00%';
      let isPositive = true;
      if (result.revenueTrend && result.revenueTrend.length >= 2) {
        const prevPrice = result.revenueTrend[result.revenueTrend.length - 2].price;
        const currentPrice = result.revenueTrend[result.revenueTrend.length - 1].price;
        if (prevPrice > 0) {
          const changeVal = ((currentPrice - prevPrice) / prevPrice) * 100;
          isPositive = changeVal >= 0;
          changeStr = `${isPositive ? '+' : ''}${changeVal.toFixed(2)}%`;
        }
      }

      setWatchlist((prev) => {
        const newItem = {
          symbol: symbolUpper,
          name: result.companyOverview?.name || symbolUpper,
          price: latestPriceVal,
          change: changeStr,
          isPositive: isPositive,
          confidence: result.recommendation?.confidence || 50
        };
        const filtered = prev.filter((item) => item.symbol.toUpperCase() !== symbolUpper);
        const updated = [newItem, ...filtered].slice(0, 3);
        localStorage.setItem('terminalWatchlist', JSON.stringify(updated));
        return updated;
      });

      // Brief visual pause at completed checklist before transitioning to dashboard
      setTimeout(() => {
        setData(result);
        setLoading(false);
      }, 500);

    } catch (err) {
      clearInterval(interval);
      setLoading(false);
      
      const errMsg = err.response?.data?.error || err.response?.data?.message || err.message || 'An error occurred during company analysis.';
      setError(errMsg);
      console.error('API integration failure:', err);
    }
  };

  const handleSelectSymbol = (symbol) => {
    setIsSidebarOpen(false); // Close sidebar drawer on mobile
    handleSearch(symbol);
  };

  const handleRefresh = () => {
    const activeSymbol = data?.companyOverview?.symbol;
    if (activeSymbol) {
      handleSearch(activeSymbol);
    }
  };

  const handleLogoClick = () => {
    setLoading(false);
    setError(null);
    setData(null);
    setActiveStep(1);
    setIsSidebarOpen(false);
  };

  const loggerDebug = (msg) => {
    console.log(`[App] ${msg}`);
  };

  return (
    <div className="h-screen bg-transparent text-text-primary flex flex-col font-sans relative overflow-hidden">
      {/* Animated Network Background Layer */}
      <div className="fixed -inset-10 z-0 pointer-events-none bg-cover bg-center bg-no-repeat bg-network-animate" />
      {/* Top Fixed Navbar */}
      <Navbar 
        onRefresh={handleRefresh} 
        currentSymbol={data?.companyOverview?.symbol} 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        onLogoClick={handleLogoClick}
      />
      
      {/* App Body Layout Container */}
      <div className="flex flex-1 relative z-10 overflow-hidden flex-col md:flex-row h-[calc(100vh-4rem)]">
        
        {/* Left Sidebar Drawer */}
        <div className={`
          fixed md:static inset-y-0 left-0 z-40 transition-transform duration-300 flex pt-16 md:pt-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}>
          <Sidebar 
            onSearch={handleSearch} 
            isLoading={loading} 
            recentSearches={recentSearches} 
            selectedSymbol={data?.companyOverview?.symbol} 
            onSelectSymbol={handleSelectSymbol} 
            watchlist={watchlist}
          />
        </div>

        {/* Mobile Sidebar Overlay Backdrop */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/60 z-30 md:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main Center content and Right AI Summary panel */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          
          {/* Main Dashboard (Middle Panel) */}
          <main className="flex-1 px-4 py-6 md:p-6 space-y-6 max-w-4xl w-full mx-auto overflow-y-auto h-full">
            {/* Empty State: Prompt search first */}
            {!loading && !error && !data && (
              <div className="py-8">
                <Hero />
                <SearchInput onSearch={handleSearch} isLoading={loading} />
              </div>
            )}

            {/* Active Loading Checklist */}
            {loading && (
              <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] w-full">
                <LoadingProgress activeStep={activeStep} />
              </div>
            )}

            {/* Verification Failures & Errors */}
            {error && (
              <div className="space-y-6 py-8">
                <ErrorMessage message={error} />
                <div className="max-w-md mx-auto">
                  <SearchInput onSearch={handleSearch} isLoading={loading} />
                </div>
              </div>
            )}

            {/* Dashboard Display */}
            {!loading && !error && data && <DashboardLayout data={data} />}
          </main>

          {/* Right AI Research Panel */}
          <AIResearchPanel 
            data={data} 
            isLoading={loading} 
            activeStep={activeStep} 
          />

        </div>
      </div>
    </div>
  );
}

export default App;

