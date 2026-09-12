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
          <div className="inline-flex max-w-full items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFEDD5] border border-[#FDBA74] text-[11px] sm:text-xs font-black text-[#C2410C] mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
            <span className="truncate">Free tools · files stay in this tab</span>
          </div>
          <h1 className="text-[1.65rem] sm:text-4xl lg:text-5xl font-black text-[#1C1917] tracking-tight leading-[1.25] text-pretty break-words">
            Merge, convert, and export files without uploading them.
          </h1>
          <p className="mt-3.5 text-sm sm:text-lg text-stone-700 max-w-xl font-medium leading-relaxed text-pretty break-words">
            PDF merge and split, image convert, resume PDF, QR, SVG, hashes, and more. Work runs in this browser tab. FileTools Kit hosts the site.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0">
          <a href="#tools-grid" onClick={() => track('click')} className="px-6 py-3 rounded-full bg-gradient-to-r from-[#F97316] to-[#EA580C] text-white font-bold text-sm flex items-center justify-center gap-2 min-h-11 shadow-md shadow-orange-500/25">
            <Layers className="w-4 h-4" /> {ctaLabel}
          </a>
          <Link to="/about" className="px-6 py-3 rounded-full bg-white text-[#7C3AED] font-bold text-sm border border-[#DDD6FE] text-center min-h-11 flex items-center justify-center">How it works</Link>
        </div>
      </div>
      <div className="mt-6 rounded-2xl sm:rounded-3xl bg-white border border-orange-100 p-3 sm:p-3.5 min-w-0 shadow-sm">
        <div className="relative flex items-center min-w-0">
          <Search className="w-4 h-4 text-[#EA580C] absolute left-4 pointer-events-none" />
          <input
            type="search"
            enterKeyHint="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tools (PDF, resume, image, QR…)"
            className="w-full min-w-0 pl-11 pr-4 py-3 rounded-full bg-[#FFF7ED] border border-orange-100 text-base text-[#1C1917]"
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 sm:px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap min-h-9 ${
                selectedCategory === cat ? 'bg-[#7C3AED] text-white' : 'bg-[#FFEDD5] text-[#9A3412]'
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
