import React from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { Check, Sparkles, ShieldCheck, X, Zap } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { isPro, openUpgradeModal, toggleProTestMode } = useSubscription();

  return (
    <section id="pricing" className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-[11px] font-semibold text-amber-300 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="uppercase tracking-wider font-bold">Transparent Subscription</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Simple, Transparent Pricing — $7 / Month
          </h2>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Cancel Anytime • 30-Day Money Back Guarantee
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
        {/* Plan 1: Free Community */}
        <div className="rounded-3xl bg-slate-900/50 border border-slate-800 p-6 sm:p-7 flex flex-col justify-between backdrop-blur-md">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-white">Free Community</h3>
                <p className="text-xs text-slate-400">Essential utilities for casual browser workflows</p>
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                ACTIVE TIER
              </span>
            </div>

            <div className="my-5">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-extrabold text-white">$0</span>
                <span className="text-xs text-slate-400">/ forever</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Zero credit card required.</p>
            </div>

            <ul className="space-y-3 text-xs text-slate-300 mb-6">
              {[
                'Standard Image & Audio Conversions',
                'Basic PDF Merge & Splitting',
                'Standard AI Image Previews',
                'Developer Tools & Hash Generator',
                'QR Generator & Unicode Typography',
                'Macro & Fitness Target Calculator'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
              <li className="flex items-center gap-2.5 text-slate-500">
                <X className="w-4 h-4 text-slate-600 shrink-0" />
                <span>High-Resolution Uncapped AI Exports</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-500">
                <X className="w-4 h-4 text-slate-600 shrink-0" />
                <span>ATS Resume PDF Direct Downloads</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-500">
                <X className="w-4 h-4 text-slate-600 shrink-0" />
                <span>100% Ad-Free Clean UI</span>
              </li>
            </ul>
          </div>

          <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-center text-xs text-slate-400 font-medium">
            Standard Community Access Included
          </div>
        </div>

        {/* Plan 2: Pro Subscription ($7/month) */}
        <div className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border-2 border-amber-500/60 p-6 sm:p-7 flex flex-col justify-between backdrop-blur-md shadow-2xl shadow-amber-500/10 overflow-hidden">
          {/* Top highlight ribbon */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-amber-500 to-amber-600 text-slate-950 text-[10px] font-black px-3.5 py-1 rounded-bl-xl tracking-wider uppercase">
            POPULAR SUBSCRIPTION
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                  <span>OmniCraft Pro</span>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                </h3>
                <p className="text-xs text-slate-400">Complete, uncapped sovereign power suite</p>
              </div>
            </div>

            <div className="my-5">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                  $7
                </span>
                <span className="text-sm font-semibold text-slate-300">/ month</span>
                <span className="text-xs text-slate-500 font-mono">billed monthly</span>
              </div>
              <p className="text-[11px] text-amber-300/90 mt-1 font-medium flex items-center gap-1">
                <Zap className="w-3 h-3 text-amber-400" />
                <span>Cancel anytime with 1 click. Zero locked-in contracts.</span>
              </p>
            </div>

            <ul className="space-y-3 text-xs text-slate-200 mb-6">
              {[
                'Everything in Free Community Tier',
                'Uncapped High-Res AI Image Downloads (Flux 1024px+)',
                'ATS-Optimized Resume PDF Direct Exports',
                'Full PDF Suite (Watermark, Annotate, Reorder, Split & Export)',
                '100% Ad-Free Clean UI Across All 10 Tools',
                'Multi-File Batch Conversion Acceleration',
                'Priority Feature Requests & Developer Support',
                '30-Day Unconditional Money-Back Guarantee'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <div className="p-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {isPro ? (
            <div className="space-y-2">
              <div className="w-full py-3 px-4 rounded-2xl bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-center font-bold text-xs flex items-center justify-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>You Have Active Pro Subscription ($7/mo)</span>
              </div>
              <button
                onClick={toggleProTestMode}
                className="w-full text-center text-[10px] text-slate-500 hover:text-slate-300 transition-colors"
              >
                (Click to toggle off for testing)
              </button>
            </div>
          ) : (
            <button
              id="pricing-upgrade-btn"
              onClick={() => openUpgradeModal('Pricing Section')}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <Sparkles className="w-3.5 h-3.5 text-slate-950" />
              <span>SUBSCRIBE TO PRO — $7 / MONTH</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};


