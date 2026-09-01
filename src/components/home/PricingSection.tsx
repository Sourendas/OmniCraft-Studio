import React from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { Check, Sparkles, ShieldCheck, X, Zap } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { isPro, openUpgradeModal, toggleProTestMode } = useSubscription();

  return (
    <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] text-xs font-black text-[#007A82] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#00A3AD]" />
            <span className="uppercase tracking-wider">Transparent Subscription</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A2540] tracking-tight">
            Simple, Transparent Pricing — $7 / Month
          </h2>
        </div>
        <div className="text-xs text-slate-600 font-mono font-bold bg-white px-4 py-2 rounded-full border border-slate-200 shadow-2xs">
          Cancel Anytime • 30-Day Money Back Guarantee
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
        {/* Plan 1: Free Community */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-8 flex flex-col justify-between shadow-[0_4px_25px_rgba(10,37,64,0.04)]">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-black text-[#0A2540]">Free Community</h3>
                <p className="text-xs text-slate-600 font-medium">Essential utilities for casual browser workflows</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                ACTIVE TIER
              </span>
            </div>

            <div className="my-6">
              <div className="flex items-baseline gap-1.5">
                <span className="text-5xl font-black text-[#0A2540]">$0</span>
                <span className="text-sm text-slate-600 font-bold">/ forever</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">Zero credit card required.</p>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-slate-700 mb-8 font-medium">
              {[
                'Standard Image & Audio Conversions',
                'Basic PDF Merge & Splitting',
                'Developer Tools & Hash Generator',
                'QR Generator & Unicode Typography',
                'Macro & Fitness Target Calculator'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
              <li className="flex items-center gap-3 text-slate-400">
                <X className="w-4 h-4 text-slate-400 shrink-0" />
                <span>High-Resolution Uncapped AI Exports</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <X className="w-4 h-4 text-slate-400 shrink-0" />
                <span>ATS Resume PDF Direct Downloads</span>
              </li>
              <li className="flex items-center gap-3 text-slate-400">
                <X className="w-4 h-4 text-slate-400 shrink-0" />
                <span>100% Ad-Free Clean UI</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-700 font-bold">
            Standard Community Access Included
          </div>
        </div>

        {/* Plan 2: Pro Subscription ($7/month) */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#E6F8F9]/70 via-white to-[#E6F8F9]/40 border-2 border-[#00A3AD] p-8 flex flex-col justify-between shadow-[0_15px_45px_rgba(0,163,173,0.14)] overflow-hidden">
          {/* Top highlight ribbon */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-[#00A3AD] to-[#0F4C81] text-white text-[10px] font-black px-5 py-2 rounded-bl-2xl tracking-wider uppercase shadow-xs">
            POPULAR SUBSCRIPTION
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-black text-[#0A2540] flex items-center gap-2">
                  <span>OmniCraft Pro</span>
                  <Sparkles className="w-5 h-5 text-[#00A3AD]" />
                </h3>
                <p className="text-xs text-slate-600 font-medium">Complete, uncapped sovereign power suite</p>
              </div>
            </div>

            <div className="my-6">
              <div className="flex items-baseline gap-2">
                <span className="text-5xl sm:text-6xl font-black text-[#008C95]">
                  $7
                </span>
                <span className="text-base font-bold text-slate-700">/ month</span>
                <span className="text-xs text-slate-500 font-mono font-bold">billed monthly</span>
              </div>
              <p className="text-xs text-[#007A82] mt-2 font-bold flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#00A3AD]" />
                <span>Cancel anytime with 1 click. Zero locked-in contracts.</span>
              </p>
            </div>

            <ul className="space-y-3.5 text-xs sm:text-sm text-[#0A2540] mb-8 font-medium">
              {[
                'Everything in Free Community Tier',
                'Uncapped High-Res AI Image Downloads (Flux 1024px+)',
                'Direct PDF & DOCX ATS Resume Vector Exports',
                'Full PDF Suite (Watermark, Annotate, Reorder, Split & Export)',
                '100% Ad-Free Clean UI Across All 10 Tools',
                'Multi-File Batch Conversion Acceleration',
                'Priority Feature Requests & Developer Support',
                '30-Day Unconditional Money-Back Guarantee'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3">
                  <div className="p-1 rounded-full bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF] shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {isPro ? (
            <div className="space-y-2">
              <div className="w-full py-4 px-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-center font-bold text-xs flex items-center justify-center gap-2 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>You Have Active Pro Subscription ($7/mo)</span>
              </div>
              <button
                onClick={toggleProTestMode}
                className="w-full text-center text-[11px] text-slate-500 hover:text-slate-800 underline transition-colors cursor-pointer py-1 font-bold"
              >
                (Click to toggle off for testing)
              </button>
            </div>
          ) : (
            <button
              id="pricing-upgrade-btn"
              onClick={() => openUpgradeModal('Pricing Section')}
              className="w-full py-4 px-4 rounded-full bg-gradient-to-r from-[#00A3AD] via-[#0FB5BA] to-[#0F4C81] hover:from-[#00B5B8] hover:via-[#00A3AD] hover:to-[#0F4C81] text-white font-black text-xs sm:text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] tracking-tight"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>SUBSCRIBE TO PRO — $7 / MONTH</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
