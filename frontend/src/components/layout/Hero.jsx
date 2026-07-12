import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <div className="text-center max-w-2xl mx-auto py-16 px-6">
      <div className="inline-flex items-center gap-2 bg-[#13323e]/50 text-[#3ab7c9] text-xs font-semibold px-3 py-1.5 rounded-full border border-[#1b4352] mb-5">
        <Sparkles className="w-3.5 h-3.5" />
        SEC Fact-Checked Investment Intelligence
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-text-primary tracking-tight leading-tight">
        Investra
        <span className="bg-linear-to-r from-[#33bfae] to-[#4fd1c5] bg-clip-text text-transparent">
          AI
        </span>
      </h1>
      <p className="mt-5 text-sm md:text-base text-text-secondary leading-relaxed font-medium">
        Analyze any publicly listed company in seconds. InvestraAI combines real-time financial data, relevant market news, and advanced AI reasoning to generate investment recommendations, SWOT analysis, risk insights, and comprehensive research reports—all in one place.
      </p>
    </div>
  );
}

