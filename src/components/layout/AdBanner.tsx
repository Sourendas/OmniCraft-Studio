import React from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { Sparkles, ShieldCheck, Zap, ArrowRight, Lock } from 'lucide-react';

interface AdBannerProps {
  type: 'leaderboard' | 'sidebar' | 'in-content';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ type, className = '' }) => {
  const { isPro, openUpgradeModal } = useSubscription();

  if (isPro) {
    return (
      <div
        id={`ad-pro-pill-${type}`}
        className={`flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 my-4 shadow-2xs ${className}`}
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-black">OmniCraft Pro Active</span>
        <span className="text-emerald-300">•</span>
        <span className="font-bold">Uncapped High-Throughput Mode</span>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
      </div>
    );
  }

  if (type === 'leaderboard') {
    return (
      <div
        id="ad-banner-leaderboard"
        className={`w-full max-w-[728px] mx-auto rounded-3xl bg-gradient-to-r from-[#E6F8F9] via-white to-[#E6F8F9]/60 border border-[#B3EAEF] p-4 my-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left transition-all shadow-[0_4px_20px_rgba(0,163,173,0.06)] hover:border-[#00A3AD] ${className}`}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-white border border-[#B3EAEF] flex items-center justify-center shrink-0 shadow-2xs">
            <Sparkles className="w-5 h-5 text-[#00A3AD]" />
          </div>
          <div>
            <div className="flex items-center gap-2 justify-center sm:justify-start">
              <span className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#00A3AD] text-white uppercase">
                PRO SPOTLIGHT
              </span>
              <span className="text-xs font-black text-[#0A2540]">
                OmniCraft Pro Spotlight: Resume PDF & PDF watermark export
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
              Accelerate in-browser exports: resume PDF download and text watermark plus metadata.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => openUpgradeModal('OmniCraft Pro Spotlight')}
            className="text-xs font-black px-4 py-2 rounded-full bg-[#00A3AD] hover:bg-[#00B5B8] text-white transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <span>Learn More</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div
        id="ad-banner-sidebar"
        className={`w-full max-w-[300px] rounded-3xl bg-gradient-to-b from-[#E6F8F9] via-white to-[#F4F8FA] border border-[#B3EAEF] p-5 flex flex-col justify-between text-center my-4 shadow-[0_4px_20px_rgba(0,163,173,0.06)] ${className}`}
      >
        <div>
          <span className="text-[9px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-[#00A3AD] text-white uppercase">
            FEATURE SPOTLIGHT
          </span>
          <div className="w-12 h-12 mx-auto my-3.5 rounded-2xl bg-white border border-[#B3EAEF] flex items-center justify-center shadow-xs">
            <Lock className="w-6 h-6 text-[#00A3AD]" />
          </div>
          <h4 className="text-xs font-black text-[#0A2540] mb-1">Text watermark & resume PDF</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
            Merge and split PDFs for free. Pro preview unlocks text watermark, metadata, and resume PDF download.
          </p>
        </div>

        <div className="pt-3.5 border-t border-slate-100 mt-4">
          <button
            onClick={() => openUpgradeModal('Feature Spotlight')}
            className="w-full py-2.5 px-3 rounded-full bg-[#00A3AD] hover:bg-[#00B5B8] text-white text-xs font-black transition-all mb-2 cursor-pointer shadow-xs"
          >
            Explore OmniCraft Pro
          </button>
          <span className="text-[10px] text-slate-500 font-mono">100% In-Browser Privacy</span>
        </div>
      </div>
    );
  }

  // in-content
  return (
    <div
      id="ad-banner-incontent"
      className={`w-full max-w-[340px] sm:max-w-[440px] mx-auto rounded-3xl bg-[#E6F8F9]/50 border border-[#B3EAEF] p-4 my-6 flex flex-col justify-between text-center shadow-xs ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#00A3AD] text-white uppercase">
          PRO SPOTLIGHT
        </span>
        <button
          onClick={() => openUpgradeModal('Pro Features')}
          className="text-[11px] text-[#007A82] hover:text-[#00A3AD] transition-colors font-bold cursor-pointer"
        >
          View Plans
        </button>
      </div>
      <p className="text-xs text-slate-700 font-medium">
        ⚡ Unlock text PDF watermarking, metadata export, and resume PDF download.
      </p>
      <div className="mt-3 flex justify-center">
        <span className="text-[10px] text-[#008C95] font-mono font-bold">100% Client-Side Engine Guarantee</span>
      </div>
    </div>
  );
};
