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
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
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
        const updated = [symbolUpper, ...filtered].slice(0, 5);
        localStorage.setItem('recentSearches', JSON.stringify(updated));
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

  const loggerDebug = (msg) => {
    console.log(`[App] ${msg}`);
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-primary flex flex-col font-sans">
      {/* Top Fixed Navbar */}
      <Navbar 
        onRefresh={handleRefresh} 
        currentSymbol={data?.companyOverview?.symbol} 
        isSidebarOpen={isSidebarOpen} 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
      />
      
      {/* App Body Layout Container */}
      <div className="flex flex-1 relative overflow-hidden flex-col md:flex-row">
        
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
        <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto">
          
          {/* Main Dashboard (Middle Panel) */}
          <main className="flex-1 px-4 py-6 md:p-6 space-y-6 max-w-4xl w-full mx-auto">
            {/* Empty State: Prompt search first */}
            {!loading && !error && !data && (
              <div className="py-8">
                <Hero />
                <SearchInput onSearch={handleSearch} isLoading={loading} />
              </div>
            )}

            {/* Active Loading Checklist */}
            {loading && <LoadingProgress activeStep={activeStep} />}

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

