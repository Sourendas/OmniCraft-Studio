import React from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { 
  Sparkles, 
  Lock, 
  Star, 
  ArrowRight, 
  Search,
  CheckCircle2,
  Layers,
  Zap
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

  const categories = ['All Categories', 'Document & AI', 'Media & Graphics', 'Developer & Data', 'Productivity & Utility'];

  return (
    <section className="relative pt-8 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Col: Hero Title & Badges */}
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-800 text-xs font-semibold text-cyan-300 mb-3 shadow-sm"
          >
            <span className="flex h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Sovereign Browser Suite</span>
            <span className="text-slate-600">•</span>
            <span className="text-slate-400 font-mono text-[10px]">Zero Cloud Uploads</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.15]"
          >
            10 Superpower Browser Utilities
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed"
          >
            100% Private, Zero Cloud Uploads. Convert, edit, and optimize everything right inside your browser.
          </motion.p>

          {/* Micro Trust Indicators from Bento Theme */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex flex-wrap items-center gap-4 mt-3"
          >
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1">
              <span className="text-yellow-400">★★★★★</span> 4.9/5 RATING
            </span>
            <span className="text-[10px] uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1">
              <Lock className="w-3 h-3 text-cyan-400" /> 100% CLIENT-SIDE ENCRYPTION
            </span>
          </motion.div>
        </div>

        {/* Right Col: Quick CTA & Pro Upgrade */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 shrink-0"
        >
          {!isPro ? (
            <button
              onClick={() => openUpgradeModal('Hero Lifetime Pass')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>UPGRADE TO PRO ($7 LIFETIME)</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          ) : (
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 font-bold text-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Pro Lifetime Unlocked</span>
            </div>
          )}

          <a
            href="#tools-grid"
            className="px-4 py-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-xs border border-slate-800 transition-all flex items-center justify-center gap-1.5"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Explore Bento Grid</span>
          </a>
        </motion.div>
      </div>

      {/* Interactive Search & Filter Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="mt-6 rounded-2xl bg-slate-900/40 border border-slate-800/90 p-2 sm:p-2.5 backdrop-blur-xl shadow-xl shadow-black/20"
      >
        <div className="relative flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
          <input
            id="hero-tool-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter bento tools (e.g. ATS Resume, PDF Suite, Flux AI, DOCX, WebP, Hash, QR, Fitness)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950/80 border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>

        {/* Category Filter Pills */}
        <div className="mt-2 flex items-center gap-1.5 overflow-x-auto pb-0.5 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'bg-slate-950/40 text-slate-400 hover:text-slate-200 border border-slate-800/80'
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

