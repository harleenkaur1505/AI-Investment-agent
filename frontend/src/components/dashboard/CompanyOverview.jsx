import React from 'react';
import { Building, Globe, MapPin, User, Tag, Landmark } from 'lucide-react';

export default function CompanyOverview({ companyOverview }) {
  const {
    name,
    symbol,
    industry,
    sector,
    ceo,
    headquarters,
    description,
    website,
    exchange
  } = companyOverview;

  return (
    <div className="bg-surface border border-border-dark rounded-2xl p-5 md:p-6 shadow-md text-left">
      <div className="flex items-center gap-2.5 border-b border-border-dark pb-4 mb-5">
        <div className="bg-primary-accent/10 p-1.5 rounded-lg text-primary-accent border border-primary-accent/20">
          <Building className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-text-primary tracking-wider uppercase m-0">Company Overview</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Key Metadata Stats List */}
        <div className="lg:col-span-1 space-y-3.5">
          <div className="flex items-start gap-3">
            <Tag className="w-3.5 h-3.5 text-text-secondary mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Company / Ticker</p>
              <p className="text-xs font-semibold text-text-primary mt-0.5">
                {name} <span className="font-mono text-primary-accent font-bold">({symbol})</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Landmark className="w-3.5 h-3.5 text-text-secondary mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Exchange</p>
              <p className="text-xs font-semibold text-text-primary mt-0.5">{exchange}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Building className="w-3.5 h-3.5 text-text-secondary mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Industry & Sector</p>
              <p className="text-xs font-semibold text-text-primary mt-0.5">
                {industry} <span className="text-text-secondary text-[11px] font-normal">| {sector}</span>
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <User className="w-3.5 h-3.5 text-text-secondary mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">CEO</p>
              <p className="text-xs font-semibold text-text-primary mt-0.5">{ceo}</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <MapPin className="w-3.5 h-3.5 text-text-secondary mt-0.5 shrink-0" />
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Headquarters</p>
              <p className="text-xs font-semibold text-text-primary mt-0.5 leading-relaxed">{headquarters}</p>
            </div>
          </div>

          {website && website !== 'Data Not Available' ? (
            <div className="flex items-start gap-3">
              <Globe className="w-3.5 h-3.5 text-text-secondary mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Website</p>
                <a
                  href={website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-primary-accent hover:underline mt-0.5 inline-block break-all"
                >
                  {website}
                </a>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-3">
              <Globe className="w-3.5 h-3.5 text-text-secondary mt-0.5 shrink-0" />
              <div>
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Website</p>
                <p className="text-xs font-semibold text-text-secondary mt-0.5">Data Not Available</p>
              </div>
            </div>
          )}
        </div>

        {/* Business Description */}
        <div className="lg:col-span-2 bg-bg-dark/40 p-4 rounded-xl border border-border-dark flex flex-col justify-start">
          <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2.5">Business Profile Description</p>
          <p className="text-xs text-text-secondary leading-relaxed font-medium">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

