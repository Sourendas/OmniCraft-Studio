import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Layers, ShieldCheck } from 'lucide-react';
import { HERO_CTA_COPY, useExperiment } from '../../experiments';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) => {
  const categories = ['All Categories', 'Document & Career', 'Media & Graphics', 'Developer & Data', 'Productivity & Utility'];
  const { variant, track } = useExperiment('hero_cta');
  const ctaLabel = HERO_CTA_COPY[variant] ?? HERO_CTA_COPY.a;

  useEffect(() => {
    track('expose');
  }, [track]);

  return (
    <section className="relative pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10 min-w-0">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 min-w-0">
        <div className="max-w-2xl min-w-0 w-full">
          <div className="inline-flex max-w-full items-center gap-2 px-3 py-1.5 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] text-[11px] sm:text-xs font-black text-[#006066] mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#006066] shrink-0" />
            <span className="truncate">Free tools · files stay in this tab</span>
          </div>
          <h1 className="text-[1.65rem] sm:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.25] text-pretty break-words">
            Merge, convert, and export files without uploading them.
          </h1>
          <p className="mt-3.5 text-sm sm:text-lg text-slate-700 max-w-xl font-medium leading-relaxed text-pretty break-words">
            PDF merge and split, image convert, resume PDF, QR, SVG, hashes, and more. Work runs in this browser tab. FileTools Kit hosts the site.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
          <a href="#tools-grid" onClick={() => track('click')} className="px-6 py-3 rounded-full bg-[#0A2540] text-white font-bold text-sm flex items-center justify-center gap-2 min-h-11">
            <Layers className="w-4 h-4" /> {ctaLabel}
          </a>
          <Link to="/about" className="px-6 py-3 rounded-full bg-white text-[#0A2540] font-bold text-sm border border-slate-300 text-center min-h-11 flex items-center justify-center">How it works</Link>
        </div>
      </div>
      <div className="mt-6 rounded-2xl sm:rounded-3xl bg-white border border-slate-200 p-3 sm:p-3.5 min-w-0">
        <div className="relative flex items-center min-w-0">
          <Search className="w-4 h-4 text-[#006066] absolute left-4 pointer-events-none" />
          <input
            type="search"
            enterKeyHint="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools (PDF, resume, image, QR…)"
            className="w-full min-w-0 pl-11 pr-4 py-3 rounded-full bg-[#F4F8FA] border border-slate-200 text-base text-[#0A2540]"
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap min-h-9 ${
                selectedCategory === cat ? 'bg-[#0A2540] text-white' : 'bg-[#F0F6F9] text-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
