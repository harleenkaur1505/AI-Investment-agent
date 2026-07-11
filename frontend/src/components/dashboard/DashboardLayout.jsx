import React from 'react';
import RecommendationCard from './RecommendationCard.jsx';
import CompanyOverview from './CompanyOverview.jsx';
import FinancialSnapshot from './FinancialSnapshot.jsx';
import FinancialCharts from './FinancialCharts.jsx';
import NewsSection from './NewsSection.jsx';
import SWOTAnalysis from './SWOTAnalysis.jsx';
import RiskAnalysis from './RiskAnalysis.jsx';

export default function DashboardLayout({ data }) {
  if (!data) return null;

  return (
    <div className="w-full mx-auto flex flex-col gap-6 animate-fade-in text-left">
      
      {/* 1. Recommendation Card (prominent hero) */}
      <RecommendationCard recommendation={data.recommendation} companyName={data.companyOverview?.name} />

      {/* 2. Company Profile Description */}
      <CompanyOverview companyOverview={data.companyOverview} />

      {/* 3. Financial Metrics Grid */}
      <FinancialSnapshot financialSnapshot={data.financialSnapshot} />

      {/* 4. Financial Charts visual trends */}
      <FinancialCharts 
        revenueTrend={data.financialCharts?.revenueTrend} 
        financialSnapshot={data.financialSnapshot}
        confidence={data.recommendation?.confidence}
      />

      {/* 5. Latest Company News (exactly 5 cards) */}
      <NewsSection latestNews={data.latestNews} />

      {/* 6. SWOT Quadrant Cards */}
      <SWOTAnalysis swotAnalysis={data.swotAnalysis} />

      {/* 7. Risk Assessment Categories */}
      <RiskAnalysis riskAnalysis={data.riskAnalysis} />
      
    </div>
  );
}

