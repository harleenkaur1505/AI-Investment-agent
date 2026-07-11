import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function ErrorMessage({ message }) {
  const isNotFound = message?.toLowerCase().includes('not found') || message?.toLowerCase().includes('validate');
  const errorTitle = isNotFound ? 'Company Not Found' : 'Analysis Request Failed';
  const errorDesc = isNotFound 
    ? "We couldn't find a publicly listed company with this name. Please verify the stock ticker and search again."
    : (message || 'Unable to perform the analysis. Please check your network connection or try again later.');

  return (
    <div className="w-full max-w-lg mx-auto mt-8 p-5 bg-surface border border-error-red/40 rounded-xl flex gap-3.5 text-left shadow-lg">
      <div className="text-error-red mt-0.5 shrink-0">
        <AlertTriangle className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-text-primary text-sm tracking-tight">
          ⚠ {errorTitle}
        </h4>
        <p className="text-text-secondary text-xs mt-1.5 leading-relaxed font-medium">
          {errorDesc}
        </p>
      </div>
    </div>
  );
}

