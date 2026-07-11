import React from 'react';
import { ThumbsUp, ThumbsDown, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function RecommendationCard({ recommendation, companyName }) {
  const { decision, confidence, summary } = recommendation;
  const isInvest = decision?.toLowerCase() === 'invest';

  // SVG parameters for circular confidence indicator
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (confidence / 100) * circumference;

  return (
    <div className={`relative overflow-hidden rounded-2xl border p-6 md:p-8 bg-surface transition-all-300 ${
      isInvest 
        ? 'border-primary-accent/40' 
        : 'border-border-dark'
    }`}>
      {/* Decorative accent gradient (subtle, non-neon, dark) */}
      <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-[0.03] pointer-events-none -mr-20 -mt-20 ${
        isInvest ? 'bg-primary-accent' : 'bg-highlight-accent'
      }`} />

      <div className="flex flex-col md:flex-row items-stretch gap-6 md:gap-8 relative z-10">
        
        {/* Recommendation Badge & Company Info */}
        <div className="flex flex-col items-center md:items-start justify-between shrink-0 text-center md:text-left gap-4">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-text-secondary block mb-1">
              AI Recommendation
            </span>
            {companyName && (
              <span className="text-xs font-semibold text-text-secondary block truncate max-w-[200px]">
                {companyName}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${
              isInvest ? 'bg-primary-accent text-bg-dark' : 'bg-error-red text-text-primary'
            }`}>
              {isInvest ? <ThumbsUp className="w-5 h-5" /> : <ThumbsDown className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-2xl font-black tracking-tight text-text-primary uppercase">
                {decision}
              </div>
              <div className="flex items-center gap-1 text-text-secondary text-[10px] font-medium mt-0.5">
                <ShieldCheck className="w-3 h-3 text-primary-accent" />
                <span>Fact-Checked Metrics</span>
              </div>
            </div>
          </div>
        </div>

        {/* Vertical Divider (Desktop Only) */}
        <div className="hidden md:block w-[1px] bg-border-dark shrink-0" />

        {/* Summary Text */}
        <div className="flex-1 text-center md:text-left flex flex-col justify-center">
          <span className="hidden md:inline-block text-[10px] uppercase tracking-widest font-bold text-text-secondary mb-1">
            Executive Summary
          </span>
          <p className="text-sm md:text-base leading-relaxed text-text-primary font-medium">
            {summary}
          </p>
        </div>

        {/* Circular Confidence Donut */}
        <div className="flex flex-col items-center justify-center shrink-0">
          <div className="relative w-20 h-20 flex items-center justify-center">
            {/* Background Circle */}
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="40"
                cy="40"
                r={radius}
                className="stroke-border-dark"
                strokeWidth="5"
                fill="transparent"
              />
              {/* Foreground Animated Progress Circle */}
              <circle
                cx="40"
                cy="40"
                r={radius}
                className={`transition-all-300 ${
                  isInvest ? 'stroke-primary-accent' : 'stroke-error-red'
                }`}
                strokeWidth="5"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-base font-black tracking-tight text-text-primary font-mono">
                {confidence}%
              </span>
              <span className="text-[8px] text-text-secondary font-bold uppercase tracking-wider">
                Certainty
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimers & Advice Warning */}
      <div className="border-t border-border-dark mt-6 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-text-secondary relative z-10">
        <div className="flex items-center gap-1.5 font-bold text-warning-amber bg-warning-amber/10 px-2 py-0.5 rounded-md border border-warning-amber/20">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Not Financial Advice</span>
        </div>
        <p className="text-center sm:text-right font-medium">
          This AI-generated analysis is for educational purposes only. Always conduct independent research.
        </p>
      </div>
    </div>
  );
}

