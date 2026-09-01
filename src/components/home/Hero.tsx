import React from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { 
  Sparkles, 
  ArrowRight, 
  Search,
  CheckCircle2,
  Layers,
  Zap,
  ShieldCheck
} from 'lucide-react';
import { motion } from 'motion/react';

interface HeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory
}) => {
  const { isPro, openUpgradeModal } = useSubscription();

  const categories = ['All Categories', 'Document & Career', 'Media & Graphics', 'Developer & Data', 'Productivity & Utility'];

  return (
    <section className="relative pt-12 pb-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Left Col: Hero Title & Badges */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] text-xs font-black text-[#007A82] mb-4 shadow-xs"
          >
            <span className="flex h-2 w-2 rounded-full bg-[#00A3AD] animate-pulse" />
            <Zap className="w-3.5 h-3.5 text-[#00A3AD]" />
            <span>Sovereign In-Browser Studio</span>
            <span className="text-[#84D8DF]">•</span>
            <span className="text-[#0A2540] font-mono text-[10px] font-bold">100% Client-Side Privacy</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A2540] tracking-tight leading-[1.12]"
          >
            12 Sovereign Browser Power Utilities
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-3.5 text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed font-medium"
          >
            Convert, design, compress, and compute in milliseconds. Zero server uploads, zero telemetry — hardware-accelerated processing directly in your browser.
          </motion.p>

          {/* Micro Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap items-center gap-5 mt-5"
          >
            <span className="text-xs uppercase tracking-wider text-slate-700 font-bold flex items-center gap-1.5">
              <span className="text-[#FA6400]">★★★★★</span> 4.92 / 5.0 TRUST SCORE
            </span>
            <span className="text-xs uppercase tracking-wider text-slate-700 font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% PRIVATE IN-MEMORY
            </span>
          </motion.div>
        </div>

        {/* Right Col: Quick CTA & Pro Upgrade */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3.5 shrink-0"
        >
          {!isPro ? (
            <button
              onClick={() => openUpgradeModal('Hero Pro Subscription')}
              className="px-7 py-3.5 rounded-full bg-gradient-to-r from-[#00A3AD] via-[#0FB5BA] to-[#0F4C81] hover:from-[#00B5B8] hover:via-[#00A3AD] hover:to-[#0F4C81] text-white font-black text-xs sm:text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2.5 group cursor-pointer active:scale-95 tracking-tight"
            >
              <Sparkles className="w-4 h-4 text-white animate-pulse" />
              <span>UPGRADE TO PRO ($7/MO)</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : (
            <div className="flex items-center gap-2 px-5 py-3 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 font-bold text-xs shadow-xs">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Pro Subscription Active ($7/mo)</span>
            </div>
          )}

          <a
            href="#tools-grid"
            className="px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-[#0A2540] hover:text-[#00A3AD] font-bold text-xs border border-slate-200 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Layers className="w-4 h-4 text-[#00A3AD]" />
            <span>Explore All 12 Power Tools</span>
          </a>
        </motion.div>
      </div>

      {/* Interactive Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="mt-8 rounded-3xl bg-white/95 border border-slate-200/90 p-3 sm:p-3.5 backdrop-blur-xl shadow-[0_10px_35px_rgba(10,37,64,0.06)]"
      >
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-[#00A3AD] absolute left-4 pointer-events-none" />
          <input
            id="hero-tool-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all 12 tools (e.g. ATS Resume, PDF Suite, SVG Studio, Text Diff, Markdown, Image Optimizer, Dev Tools, QR, FX Matrix)..."
            className="w-full pl-11 pr-4 py-3 rounded-full bg-[#F4F8FA] border border-slate-200/80 text-xs sm:text-sm text-[#0A2540] font-medium placeholder-slate-400 focus:outline-none focus:border-[#00A3AD] focus:bg-white focus:ring-2 focus:ring-[#00A3AD]/20 transition-all"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="mt-3 flex items-center gap-2 overflow-x-auto pb-0.5 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#00A3AD] text-white shadow-sm shadow-teal-500/20'
                  : 'bg-[#F0F6F9] text-slate-700 hover:text-[#0A2540] hover:bg-[#E2EEF2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
