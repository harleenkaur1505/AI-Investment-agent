import React from 'react';
import { Target, CheckCircle2, XCircle, ArrowUpRight, Flame } from 'lucide-react';

export default function SWOTAnalysis({ swotAnalysis }) {
  const { strengths, weaknesses, opportunities, threats } = swotAnalysis;

  const quadrants = [
    {
      title: 'Strengths',
      items: strengths || [],
      icon: CheckCircle2,
      style: 'border-success-green/20 bg-success-green/[0.01]',
      iconStyle: 'bg-success-green/10 text-success-green border-success-green/20',
      badge: 'Internal / Helpful',
      bulletColor: 'text-success-green'
    },
    {
      title: 'Weaknesses',
      items: weaknesses || [],
      icon: XCircle,
      style: 'border-error-red/20 bg-error-red/[0.01]',
      iconStyle: 'bg-error-red/10 text-error-red border-error-red/20',
      badge: 'Internal / Harmful',
      bulletColor: 'text-error-red'
    },
    {
      title: 'Opportunities',
      items: opportunities || [],
      icon: ArrowUpRight,
      style: 'border-secondary-accent/20 bg-secondary-accent/[0.01]',
      iconStyle: 'bg-secondary-accent/10 text-secondary-accent border-secondary-accent/20',
      badge: 'External / Helpful',
      bulletColor: 'text-secondary-accent'
    },
    {
      title: 'Threats',
      items: threats || [],
      icon: Flame,
      style: 'border-warning-amber/20 bg-warning-amber/[0.01]',
      iconStyle: 'bg-warning-amber/10 text-warning-amber border-warning-amber/20',
      badge: 'External / Harmful',
      bulletColor: 'text-warning-amber'
    }
  ];

  return (
    <div className="bg-surface border border-border-dark rounded-2xl p-5 md:p-6 shadow-md text-left">
      <div className="flex items-center gap-2.5 border-b border-border-dark pb-4 mb-5">
        <div className="bg-primary-accent/10 p-1.5 rounded-lg text-primary-accent border border-primary-accent/20">
          <Target className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-text-primary tracking-wider uppercase m-0">SWOT Analysis</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {quadrants.map((quad, idx) => {
          const Icon = quad.icon;
          return (
            <div 
              key={idx}
              className={`relative overflow-hidden rounded-xl border p-4 transition-all-300 ${quad.style}`}
            >
              <div className="flex items-center justify-between border-b border-border-dark pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded-md border ${quad.iconStyle}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                  <h3 className="font-bold text-text-primary text-xs">{quad.title}</h3>
                </div>
                <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${quad.iconStyle}`}>
                  {quad.badge}
                </span>
              </div>
              <ul className="space-y-2">
                {quad.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2 text-xs leading-relaxed text-text-secondary font-medium">
                    <span className={`${quad.bulletColor} font-black`}>•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

