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
        className={`flex items-center justify-center gap-2 py-2 px-4 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 my-4 shadow-2xs ${className}`}
      >
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="font-black">OmniCraft Pro Active</span>
        <span className="text-emerald-300">•</span>
        <span className="font-bold">100% Ad-Free Experience</span>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
      </div>
    );
  }

  if (type === 'leaderboard') {
    return (
      <div
        id="ad-banner-leaderboard"
        className={`w-full max-w-[728px] mx-auto rounded-3xl bg-white border border-slate-200/90 p-4 my-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left transition-all shadow-[0_4px_20px_rgba(10,37,64,0.03)] hover:border-[#00A3AD] ${className}`}
      >
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#E6F8F9] border border-[#B3EAEF] flex items-center justify-center shrink-0">
            <Zap className="w-5 h-5 text-[#00A3AD]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase border border-slate-200">
                SPONSORED
              </span>
              <span className="text-xs font-black text-[#0A2540]">
                Cloud-Native Workflows for Modern Teams
              </span>
            </div>
            <p className="text-[11px] text-slate-600 mt-0.5 font-medium">
              Accelerate developer velocity with zero-config preview environments.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => openUpgradeModal('Ad-Free Experience')}
            className="text-[11px] text-slate-500 hover:text-[#00A3AD] px-2 py-1 transition-colors font-bold cursor-pointer"
          >
            Remove ($6.99/mo)
          </button>
          <a
            href="#pricing"
            className="text-xs font-black px-4 py-2 rounded-full bg-[#F4F8FA] hover:bg-[#E6F8F9] text-[#0A2540] hover:text-[#007A82] border border-slate-200 transition-colors"
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
        className={`w-full max-w-[300px] rounded-3xl bg-white border border-slate-200/90 p-5 flex flex-col justify-between text-center my-4 shadow-[0_4px_20px_rgba(10,37,64,0.03)] ${className}`}
      >
        <div>
          <span className="text-[9px] font-mono font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase border border-slate-200">
            SPONSOR SPOTLIGHT
          </span>
          <div className="w-12 h-12 mx-auto my-3.5 rounded-2xl bg-[#E6F8F9] border border-[#B3EAEF] flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-[#00A3AD]" />
          </div>
          <h4 className="text-xs font-black text-[#0A2540] mb-1">Scale Without Server Limits</h4>
          <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
            Deploy ultra-fast edge workers and client-side utilities with instantaneous global distribution.
          </p>
        </div>

        <div className="pt-3.5 border-t border-slate-100 mt-4">
          <button
            onClick={() => openUpgradeModal('Ad-Free Experience')}
            className="w-full py-2.5 px-3 rounded-full bg-[#E6F8F9] hover:bg-[#D0F2F3] border border-[#B3EAEF] text-xs font-black text-[#007A82] transition-all mb-2 cursor-pointer"
          >
            Remove Ads ($6.99 / Month)
          </button>
          <span className="text-[10px] text-slate-400 font-mono">Verified Ad Partner</span>
        </div>
      </div>
    );
  }

  // in-content
  return (
    <div
      id="ad-banner-incontent"
      className={`w-full max-w-[320px] sm:max-w-[400px] mx-auto rounded-3xl bg-white border border-slate-200/90 p-4 my-6 flex flex-col justify-between text-center shadow-[0_4px_20px_rgba(10,37,64,0.03)] ${className}`}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 uppercase border border-slate-200">
          ADVERTISEMENT
        </span>
        <button
          onClick={() => openUpgradeModal('Ad-Free Experience')}
          className="text-[11px] text-slate-400 hover:text-[#00A3AD] transition-colors font-bold cursor-pointer"
        >
          Remove ads
        </button>
      </div>
      <p className="text-xs text-slate-700 font-medium">
        ⚡ Need high-speed file storage? Try our recommended zero-knowledge encryption partner.
      </p>
      <div className="mt-3 flex justify-center">
        <span className="text-[10px] text-[#008C95] font-mono font-bold">Client Verified Ad Placement</span>
      </div>
    </div>
  );
};
