import React from 'react';
import { DollarSign, Percent, TrendingUp, BarChart3, Scale, Activity } from 'lucide-react';

export default function FinancialSnapshot({ financialSnapshot }) {
  const {
    marketCap,
    revenue,
    revenueGrowth,
    eps,
    peRatio,
    dividendYield,
    fiftyTwoWeekHigh,
    fiftyTwoWeekLow,
    beta,
    profitMargin,
    operatingMargin,
    returnOnEquity
  } = financialSnapshot;

  const metrics = [
    { label: 'Market Cap', value: marketCap, icon: DollarSign, isPrimary: true },
    { label: 'Revenue (TTM)', value: revenue, icon: BarChart3, isPrimary: true },
    { label: 'Revenue Growth (YoY)', value: revenueGrowth, icon: TrendingUp, isPrimary: false },
    { label: 'P/E Ratio', value: peRatio, icon: Activity, isPrimary: false },
    { label: 'Earnings Per Share', value: eps, icon: DollarSign, isPrimary: false },
    { label: 'Dividend Yield', value: dividendYield || '0.00%', icon: Percent, isPrimary: false },
    { label: 'Beta (Volatility)', value: beta, icon: Scale, isPrimary: false },
    { label: 'Profit Margin', value: profitMargin, icon: Percent, isPrimary: false },
    { label: 'Operating Margin', value: operatingMargin, icon: Percent, isPrimary: false },
    { label: 'Return on Equity', value: returnOnEquity, icon: Percent, isPrimary: false },
    { label: '52 Week High', value: fiftyTwoWeekHigh, icon: DollarSign, isPrimary: false },
    { label: '52 Week Low', value: fiftyTwoWeekLow, icon: DollarSign, isPrimary: false }
  ];

  return (
    <div className="bg-surface border border-border-dark rounded-2xl p-5 md:p-6 shadow-md text-left">
      <div className="flex items-center gap-2.5 border-b border-border-dark pb-4 mb-5">
        <div className="bg-primary-accent/10 p-1.5 rounded-lg text-primary-accent border border-primary-accent/20">
          <BarChart3 className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-text-primary tracking-wider uppercase m-0">Financial Snapshot</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div 
              key={idx} 
              className={`p-3.5 border rounded-xl transition-all-300 flex flex-col justify-between ${
                metric.isPrimary 
                  ? 'border-primary-accent/20 bg-primary-accent/[0.02] hover:border-primary-accent/40' 
                  : 'border-border-dark bg-bg-dark/20 hover:border-text-secondary'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[9px] font-bold text-text-secondary uppercase tracking-widest">
                  {metric.label}
                </span>
                <div className={`p-1 rounded-md border ${
                  metric.isPrimary 
                    ? 'border-primary-accent/20 text-primary-accent bg-primary-accent/5' 
                    : 'border-border-dark text-text-secondary bg-bg-dark'
                }`}>
                  <Icon className="w-3 h-3" />
                </div>
              </div>
              <div className="text-sm md:text-base font-bold text-text-primary tracking-tight mt-1 font-mono">
                {metric.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

