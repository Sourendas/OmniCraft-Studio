import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Layers, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';
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
    <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] text-xs font-black text-[#007A82] mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00A3AD]" />
            <span>Free tools · files stay in this tab</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.12]">
            Merge, convert, and export files without uploading them.
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-3.5 text-base sm:text-lg text-slate-600 max-w-xl font-medium">
            PDF merge and split, image convert, resume PDF, QR, SVG, hashes, and more. Work runs in this browser tab. FileTools Kit hosts the site.
          </motion.p>
        </div>
        <div className="flex flex-col gap-3.5">
          <a href="#tools-grid" onClick={() => track('click')} className="px-6 py-3 rounded-full bg-[#00A3AD] text-white font-bold text-xs flex items-center justify-center gap-2">
            <Layers className="w-4 h-4" /> {ctaLabel}
          </a>
          <Link to="/about" className="px-6 py-3 rounded-full bg-white text-[#0A2540] font-bold text-xs border border-slate-200 text-center">How it works</Link>
        </div>
      </div>
      <div className="mt-8 rounded-3xl bg-white border border-slate-200 p-3.5">
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#00A3AD] absolute left-4 pointer-events-none" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search tools (PDF, resume, image, QR, SVG...)" className="w-full pl-11 pr-4 py-3 rounded-full bg-[#F4F8FA] border border-slate-200 text-sm text-[#0A2540]" />
        </div>
        <div className="mt-3 flex items-center gap-2 overflow-x-auto">
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap ${selectedCategory === cat ? 'bg-[#00A3AD] text-white' : 'bg-[#F0F6F9] text-slate-700'}`}>{cat}</button>
          ))}
        </div>
      </div>
    </section>
  );
};
