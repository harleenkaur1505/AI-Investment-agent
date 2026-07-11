import React from 'react';
import { PulseLoader } from 'react-spinners';
import { CheckCircle, Circle, Loader2 } from 'lucide-react';

export default function LoadingProgress({ activeStep }) {
  const steps = [
    { id: 1, label: 'Fetching Company Information' },
    { id: 2, label: 'Retrieving Financial Data' },
    { id: 3, label: 'Retrieving Latest News' },
    { id: 4, label: 'AI is Analyzing Data' },
    { id: 5, label: 'Preparing Investment Report' },
  ];

  return (
    <div className="w-full max-w-md mx-auto mt-12 p-6 bg-surface border border-border-dark rounded-2xl shadow-md text-left">
      <div className="flex items-center justify-between border-b border-border-dark pb-4 mb-5">
        <h3 className="font-bold text-text-primary text-xs tracking-wider uppercase">AI Agent Execution Pipeline</h3>
        <PulseLoader size={4} color="#00E5A0" speedMultiplier={0.8} />
      </div>
      
      <div className="space-y-3.5">
        {steps.map((step) => {
          const isCompleted = step.id < activeStep;
          const isActive = step.id === activeStep;

          return (
            <div
              key={step.id}
              className={`flex items-center gap-3 transition-all-300 ${
                isActive ? 'opacity-100 font-semibold scale-[1.01]' : isCompleted ? 'opacity-90' : 'opacity-30'
              }`}
            >
              {isCompleted ? (
                <CheckCircle className="w-4 h-4 text-success-green fill-success-green/10" />
              ) : isActive ? (
                <Loader2 className="w-4 h-4 text-primary-accent animate-spin" />
              ) : (
                <Circle className="w-4 h-4 text-border-dark" />
              )}
              <span
                className={`text-xs ${
                  isActive ? 'text-primary-accent font-bold' : isCompleted ? 'text-text-primary' : 'text-text-secondary'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

