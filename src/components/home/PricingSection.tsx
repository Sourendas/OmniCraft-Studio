import React from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { Check, Sparkles, ShieldCheck, X } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { isPro, openUpgradeModal, toggleProTestMode } = useSubscription();

  return (
    <section id="pricing" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-violet-400 mb-2">
            <Sparkles className="w-3 h-3 text-violet-400" />
            <span className="uppercase tracking-wider font-bold">Monetization & Freedom</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            One Lifetime Pass. Unlimited In-Browser Power.
          </h2>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Single $7 Payment • Zero Recurring Subs
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
        {/* Plan 1: Free Community */}
        <div className="rounded-2xl bg-slate-900/30 border border-slate-800 p-6 flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-white">Free Community</h3>
                <p className="text-xs text-slate-400">Essential utilities for casual browser tasks</p>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
                ACTIVE TIER
              </span>
            </div>

            <div className="my-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-white">$0</span>
                <span className="text-xs text-slate-400">/ forever</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">Zero credit card required.</p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-300 mb-6">
              {[
                'Standard Image & Audio Conversions',
                'Basic PDF Merge & Splitting',
                'Standard AI Image Previews',
                'Developer Tools & Hash Generator',
                'QR Generator & Unicode Typography',
                'Macro & Fitness Calculator'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
              <li className="flex items-center gap-2 text-slate-500">
                <X className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>High-Resolution Uncapped AI Exports</span>
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <X className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>ATS Resume PDF Direct Downloads</span>
              </li>
              <li className="flex items-center gap-2 text-slate-500">
                <X className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                <span>Ad-Free Clean Workspace</span>
              </li>
            </ul>
          </div>

          <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center text-xs text-slate-400 font-medium">
            Standard Community Access Included
          </div>
        </div>

        {/* Plan 2: Pro Lifetime ($7) */}
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border-2 border-cyan-500/50 p-6 flex flex-col justify-between backdrop-blur-md shadow-xl shadow-cyan-500/10 overflow-hidden">
          {/* Top highlight ribbon */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-cyan-500 to-violet-600 text-white text-[9px] font-extrabold px-3 py-1 rounded-bl-xl tracking-wider uppercase">
            BEST VALUE LIFETIME
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-1.5">
                  <span>OmniCraft Pro</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </h3>
                <p className="text-xs text-slate-400">Complete, uncapped sovereign power suite</p>
              </div>
            </div>

            <div className="my-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400">
                  $7
                </span>
                <span className="text-xs font-semibold text-slate-300">one-time payment</span>
                <span className="text-[11px] text-slate-500 line-through">$49 value</span>
              </div>
              <p className="text-[11px] text-cyan-300/90 mt-0.5 font-medium">
                ⚡ Lifetime access — No monthly recurring charges.
              </p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-200 mb-6">
              {[
                'Everything in Free Community Tier',
                'Uncapped High-Res AI Image Downloads (Flux 1024px+)',
                'ATS-Optimized Resume PDF Direct Exports',
                'Full PDF Suite (Watermark, Annotate, Reorder, Split & Export)',
                '100% Ad-Free Clean UI Across All 10 Tools',
                'Multi-File Batch Conversion Acceleration',
                'Direct Developer Feature Request Access',
                '30-Day Unconditional Money-Back Guarantee'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="p-0.5 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {isPro ? (
            <div className="space-y-2">
              <div className="w-full py-2.5 px-4 rounded-xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-center font-bold text-xs flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>You Have Active Pro Lifetime Access</span>
              </div>
              <button
                onClick={toggleProTestMode}
                className="w-full text-center text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
              >
                (Toggle Off for Testing)
              </button>
            </div>
          ) : (
            <button
              id="pricing-upgrade-btn"
              onClick={() => openUpgradeModal('Pricing Section')}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 text-white font-extrabold text-xs shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
              <span>GET PRO LIFETIME FOR $7</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

