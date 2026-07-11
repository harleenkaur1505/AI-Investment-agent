import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="text-center max-w-2xl mx-auto py-16 px-6">
      <div className="inline-flex items-center gap-2 bg-primary-accent/10 text-primary-accent text-xs font-semibold px-3 py-1.5 rounded-full border border-primary-accent/20 mb-5 animate-pulse">
        <Sparkles className="w-3.5 h-3.5" />
        SEC Fact-Checked Investment Intelligence
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-tight">
        AI Investment <br className="hidden sm:inline" />
        <span className="bg-linear-to-r from-primary-accent via-secondary-accent to-highlight-accent bg-clip-text text-transparent">
          Research Terminal
        </span>
      </h1>
      <p className="mt-5 text-sm md:text-base text-text-secondary leading-relaxed font-medium">
        Submit any publicly listed company ticker or name (e.g. MSFT or Apple). Our agent coordinates Alpha Vantage and news indices to extract financial indicators, compiling a comprehensive SWOT, Risk, and Investment Report.
      </p>
    </div>
  );
}

