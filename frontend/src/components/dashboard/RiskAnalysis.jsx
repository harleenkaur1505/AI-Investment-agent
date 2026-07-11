import React from 'react';
import { Percent, TrendingDown, Scale, ShieldAlert } from 'lucide-react';

export default function RiskAnalysis({ riskAnalysis }) {
  const { financialRisk, marketRisk, businessRisk } = riskAnalysis;

  const risks = [
    {
      title: 'Financial Risk',
      description: financialRisk,
      icon: Percent,
      iconColor: 'bg-error-red/10 text-error-red border-error-red/20',
      borderColor: 'border-error-red/10'
    },
    {
      title: 'Market Risk',
      description: marketRisk,
      icon: TrendingDown,
      iconColor: 'bg-warning-amber/10 text-warning-amber border-warning-amber/20',
      borderColor: 'border-warning-amber/10'
    },
    {
      title: 'Business Risk',
      description: businessRisk,
      icon: Scale,
      iconColor: 'bg-secondary-accent/10 text-secondary-accent border-secondary-accent/20',
      borderColor: 'border-secondary-accent/10'
    }
  ];

  return (
    <div className="bg-surface border border-border-dark rounded-2xl p-5 md:p-6 shadow-md text-left">
      <div className="flex items-center gap-2.5 border-b border-border-dark pb-4 mb-5">
        <div className="bg-primary-accent/10 p-1.5 rounded-lg text-primary-accent border border-primary-accent/20">
          <ShieldAlert className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-text-primary tracking-wider uppercase m-0">Risk Assessment</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {risks.map((risk, idx) => {
          const Icon = risk.icon;
          return (
            <div 
              key={idx}
              className={`p-4 rounded-xl border border-border-dark bg-bg-dark/20 flex flex-col justify-start transition-all-300 hover:border-text-secondary`}
            >
              <div className="flex items-center gap-2 border-b border-border-dark pb-3 mb-3">
                <div className={`p-1 rounded-md border ${risk.iconColor}`}>
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-bold text-text-primary text-xs">{risk.title}</h3>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed font-medium">
                {risk.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

