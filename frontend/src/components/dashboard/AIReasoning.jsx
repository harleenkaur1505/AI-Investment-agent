

import React from 'react';
import { MessagesSquare, Lightbulb } from 'lucide-react';

export default function AIReasoning({ aiReasoning }) {
  const { reasoning } = aiReasoning;
  const paragraphs = reasoning || [];

  return (
    <div className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xs text-left">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-4 mb-6">
        <div className="bg-blue-50 p-2 rounded-xl text-blue-600">
          <MessagesSquare className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight m-0">AI Reasoning & Synthesis</h2>
      </div>

      <div className="space-y-4">
        {paragraphs.map((paragraph, idx) => (
          <div 
            key={idx}
            className="flex items-start gap-4 p-4 hover:bg-slate-50/20 rounded-2xl border border-transparent hover:border-slate-100 transition-all-300"
          >
            <div className="bg-blue-500/10 text-blue-600 p-2 rounded-xl shrink-0 mt-0.5">
              <Lightbulb className="w-4 h-4" />
            </div>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed font-medium">
              {paragraph}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
