import React from 'react';
import { 
  TrendingUp, TrendingDown, Clock, ShieldAlert, 
  Lightbulb, CheckCircle2, Loader2, Sparkles 
} from 'lucide-react';

export default function AIResearchPanel({ data, isLoading, activeStep }) {
  // 1. Loading State
  if (isLoading) {
    return (
      <aside className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-border-dark bg-[#0E171C]/25 backdrop-blur-md pt-3 pb-3 px-4 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-hidden flex flex-col justify-between">
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-border-dark pb-4">
            <h3 className="font-bold text-text-primary text-sm tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-accent" />
              AI Research Panel
            </h3>
            <span className="text-[10px] bg-secondary-accent/10 text-secondary-accent border border-secondary-accent/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider animate-pulse">
              Running
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Analysis Status</span>
              <div className="mt-1 flex items-center gap-2 text-xs text-text-primary font-medium">
                <Loader2 className="w-3.5 h-3.5 text-primary-accent animate-spin" />
                <span>Pipeline Step {activeStep}/5</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">AI Recommendation</span>
              <p className="text-sm font-semibold text-text-secondary mt-1">Synthesizing...</p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Confidence Level</span>
              <p className="text-sm font-semibold text-text-secondary mt-1">Calculating...</p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Top Positive Drivers</span>
              <p className="text-xs text-text-secondary mt-1">Reading financial metrics...</p>
            </div>

            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Top Risk Factors</span>
              <p className="text-xs text-text-secondary mt-1">Evaluating geopolitical exposure...</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-border-dark">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Final AI Verdict</span>
          <p className="text-xs text-text-secondary leading-relaxed mt-1 animate-pulse">
            Gemini is compiling market news and balance sheet records...
          </p>
        </div>
      </aside>
    );
  }

  // 2. Completed State
  if (data) {
    const { decision, confidence, summary } = data.recommendation;
    const isInvest = decision?.toLowerCase() === 'invest';
    const strengths = data.swotAnalysis?.strengths || [];
    const weaknesses = data.swotAnalysis?.weaknesses || [];

    return (
      <aside className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-border-dark bg-[#0E171C]/25 backdrop-blur-md pt-3 pb-3 px-4 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-hidden flex flex-col justify-between text-left">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between border-b border-border-dark pb-4">
            <h3 className="font-bold text-text-primary text-sm tracking-tight flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-accent" />
              AI Research Panel
            </h3>
            <span className="text-[10px] bg-success-green/10 text-success-green border border-success-green/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
              Completed
            </span>
          </div>

          <div className="space-y-5">
            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Analysis Status</span>
              <div className="mt-1 flex items-center gap-1.5 text-xs text-success-green font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Active Core Insights</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">AI Recommendation</span>
              <div className="mt-1 flex items-center gap-2">
                <span className={`text-lg font-black uppercase tracking-wide px-3 py-1 rounded-lg ${
                  isInvest 
                    ? 'bg-success-green/10 text-success-green border border-success-green/20' 
                    : 'bg-error-red/10 text-error-red border border-error-red/20'
                }`}>
                  {decision}
                </span>
                {isInvest ? (
                  <TrendingUp className="w-5 h-5 text-success-green" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-error-red" />
                )}
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Confidence Level</span>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="font-mono text-2xl font-black text-text-primary">{confidence}%</span>
                <span className="text-[10px] text-text-secondary font-semibold">probability score</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-2">Top Positive Drivers</span>
              <ul className="space-y-1.5">
                {strengths.slice(0, 2).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-text-primary font-medium leading-relaxed">
                    <Lightbulb className="w-3.5 h-3.5 text-primary-accent shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-2">Top Risk Factors</span>
              <ul className="space-y-1.5">
                {weaknesses.slice(0, 2).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-text-primary font-medium leading-relaxed">
                    <ShieldAlert className="w-3.5 h-3.5 text-error-red shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-border-dark">
          <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider block mb-1">Final AI Verdict</span>
          <p className="text-xs text-text-secondary leading-relaxed font-medium">
            {summary}
          </p>
        </div>
      </aside>
    );
  }

  // 3. Idle / Empty State
  return (
    <aside className="w-full lg:w-80 shrink-0 border-t lg:border-t-0 lg:border-l border-border-dark bg-[#0E171C]/25 backdrop-blur-md pt-3 pb-3 px-4 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-hidden flex flex-col justify-between text-left">
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-border-dark pb-4">
          <h3 className="font-bold text-text-primary text-sm tracking-tight flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-text-secondary" />
            AI Research Panel
          </h3>
          <span className="text-[10px] bg-border-dark text-text-secondary border border-border-dark px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Idle
          </span>
        </div>

        <div className="space-y-4">
          <div>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Analysis Status</span>
            <div className="mt-1 flex items-center gap-1.5 text-xs text-text-secondary font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>Awaiting Search Query</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">AI Recommendation</span>
            <p className="text-sm font-bold text-text-secondary mt-1">--</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Confidence Level</span>
            <p className="text-sm font-bold text-text-secondary mt-1">--</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Top Positive Drivers</span>
            <p className="text-xs text-text-secondary mt-1">--</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Top Risk Factors</span>
            <p className="text-xs text-text-secondary mt-1">--</p>
          </div>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-border-dark">
        <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">Final AI Verdict</span>
        <p className="text-xs text-text-secondary leading-relaxed mt-1">
          Submit a ticker query in the search field or click a watchlist company to compute immediate agent reasoning.
        </p>
      </div>
    </aside>
  );
}
