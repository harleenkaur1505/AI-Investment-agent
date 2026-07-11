import React from 'react';
import { Newspaper, Calendar, ArrowUpRight } from 'lucide-react';

export default function NewsSection({ latestNews }) {
  const hasNews = latestNews && latestNews.length > 0;
  // Limit to maximum 5 news cards as per guidelines
  const newsList = hasNews ? latestNews.slice(0, 5) : [];

  return (
    <div className="bg-surface border border-border-dark rounded-2xl p-5 md:p-6 shadow-md text-left">
      <div className="flex items-center gap-2.5 border-b border-border-dark pb-4 mb-5">
        <div className="bg-primary-accent/10 p-1.5 rounded-lg text-primary-accent border border-primary-accent/20">
          <Newspaper className="w-4 h-4" />
        </div>
        <h2 className="text-sm font-bold text-text-primary tracking-wider uppercase m-0">Latest Company News</h2>
      </div>

      {!hasNews ? (
        <div className="p-8 text-center bg-bg-dark/45 rounded-xl border border-dashed border-border-dark">
          <p className="text-[10px] text-text-secondary font-bold uppercase tracking-widest">No Recent News Found</p>
          <p className="text-xs text-text-secondary mt-1">There are no recent articles indexed for this company.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {newsList.map((article, idx) => (
            <a
              key={idx}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 border border-border-dark bg-bg-dark/20 hover:border-text-secondary rounded-xl transition-all-300"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1.5 flex-1 min-w-0">
                  <h3 className="font-semibold text-text-primary group-hover:text-primary-accent transition-colors duration-300 text-xs md:text-sm leading-snug">
                    {article.headline}
                  </h3>
                  <div className="flex items-center gap-3 text-[10px] text-text-secondary font-semibold uppercase tracking-wider">
                    <span className="bg-surface text-text-secondary px-2 py-0.5 rounded-md border border-border-dark">
                      {article.source}
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Calendar className="w-3.5 h-3.5 text-text-secondary" />
                      {article.publishedDate}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary leading-relaxed font-medium mt-2 pt-1 line-clamp-2">
                    {article.summary}
                  </p>
                </div>
                <div className="bg-surface group-hover:bg-primary-accent text-text-secondary group-hover:text-bg-dark p-2 rounded-lg border border-border-dark group-hover:border-primary-accent transition-all-300 shrink-0">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

