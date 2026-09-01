import React from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { Sparkles, ShieldCheck, Zap } from 'lucide-react';

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
        className={`flex items-center justify-center gap-2 py-2 px-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 my-4 ${className}`}
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="font-medium text-slate-300">OmniCraft Pro Member</span>
        <span className="text-slate-500">•</span>
        <span className="text-cyan-400 font-medium">All Ads Removed</span>
        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
      </div>
    );
  }

  if (type === 'leaderboard') {
    return (
      <div
        id="ad-banner-leaderboard"
        className={`w-full max-w-[728px] mx-auto rounded-2xl bg-slate-900/30 border border-slate-800 p-4 my-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left transition-all hover:border-slate-700/80 ${className}`}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center shrink-0">
            <Zap className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-950 text-slate-500 uppercase border border-slate-800">
                SPONSORED
              </span>
              <span className="text-xs font-semibold text-slate-200">
                Cloud-Native Workflows for Modern Teams
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Accelerate developer velocity with zero-config preview environments.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => openUpgradeModal('Ad-Free Experience')}
            className="text-[10px] text-slate-400 hover:text-cyan-300 px-2 py-1 transition-colors font-mono"
          >
            Hide ($7)
          </button>
          <a
            href="#pricing"
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    );
  }

  if (type === 'sidebar') {
    return (
      <div
        id="ad-banner-sidebar"
        className={`w-full max-w-[300px] rounded-2xl bg-slate-900/30 border border-slate-800 p-4 flex flex-col justify-between text-center my-4 ${className}`}
      >
        <div>
          <span className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded bg-slate-950 text-slate-500 uppercase border border-slate-800">
            SPONSOR SPOTLIGHT
          </span>
          <div className="w-12 h-12 mx-auto my-3 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-violet-400" />
          </div>
          <h4 className="text-xs font-bold text-slate-200 mb-1">Scale Without Server Limits</h4>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Deploy ultra-fast edge workers and client-side utilities with instantaneous global distribution.
          </p>
        </div>

        <div className="pt-3 border-t border-slate-800 mt-4">
          <button
            onClick={() => openUpgradeModal('Ad-Free Experience')}
            className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-semibold text-amber-300 transition-all mb-2"
          >
            Remove Ads for $7 / Month
          </button>
          <span className="text-[9px] text-slate-500 font-mono">Google AdSense Verified</span>
        </div>
      </div>
    );
  }

  // in-content
  return (
    <div
      id="ad-banner-incontent"
      className={`w-full max-w-[320px] sm:max-w-[400px] mx-auto rounded-2xl bg-slate-900/30 border border-slate-800 p-4 my-6 flex flex-col justify-between text-center ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-mono font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-950 text-slate-500 uppercase border border-slate-800">
          ADVERTISEMENT
        </span>
        <button
          onClick={() => openUpgradeModal('Ad-Free Experience')}
          className="text-[10px] text-slate-500 hover:text-cyan-400 transition-colors font-mono"
        >
          Remove ads
        </button>
      </div>
      <p className="text-xs text-slate-300 font-medium">
        ⚡ Need high-speed file storage? Try our recommended zero-knowledge encryption partner.
      </p>
      <div className="mt-3 flex justify-center">
        <span className="text-[9px] text-cyan-400/80 font-mono">300x250 In-Content Placement</span>
      </div>
    </div>
  );
};

