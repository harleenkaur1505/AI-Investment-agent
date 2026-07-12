

import React from 'react';
import { MessagesSquare, Lightbulb } from 'lucide-react';

export default function AIReasoning({ aiReasoning }) {
  const { reasoning } = aiReasoning;
  const paragraphs = reasoning || [];

  return (
    <div className="bg-surface border border-border-dark rounded-2xl p-5 md:p-6 shadow-md text-left">
      <div className="flex items-center gap-2.5 border-b border-border-dark pb-4 mb-5">
        <div className="bg-primary-accent/10 p-1.5 rounded-lg text-primary-accent border border-primary-accent/20">
          <MessagesSquare className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-text-primary tracking-wider uppercase m-0">AI Reasoning & Synthesis</h2>
      </div>

      <div className="space-y-3.5">
        {paragraphs.map((paragraph, idx) => (
          <div 
            key={idx}
            className="flex items-start gap-4 p-4 hover:border-primary-accent/30 rounded-xl border border-border-dark/40 bg-bg-dark/20 transition-all-300"
          >
            <div className="bg-primary-accent/10 text-primary-accent p-2 rounded-xl shrink-0 mt-0.5 border border-primary-accent/20">
              <Lightbulb className="w-4 h-4" />
            </div>
            <p className="text-xs md:text-sm text-text-secondary leading-relaxed font-medium">
              {paragraph}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
