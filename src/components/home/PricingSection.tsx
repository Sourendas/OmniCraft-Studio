import React, { useState } from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { Check, Sparkles, ShieldCheck, X, Zap, Tag } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { isPro, openUpgradeModal, toggleProTestMode, selectedPlan } = useSubscription();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');

  return (
    <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] text-xs font-black text-[#007A82] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#00A3AD]" />
            <span className="uppercase tracking-wider">Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A2540] tracking-tight">
            Simple, Honest Pricing — $6.99 / mo or $69.99 / yr
          </h2>
          <p className="text-sm text-slate-600 mt-1 font-medium">
            100% sovereign client-side workstation. No server data retention, cancel anytime.
          </p>
        </div>

        {/* Billing Cycle Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto bg-white p-1.5 rounded-full border border-slate-200 shadow-2xs">
          <button
            type="button"
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
              billingCycle === 'monthly'
                ? 'bg-[#0A2540] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Monthly Billing ($6.99)
          </button>
          <button
            type="button"
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              billingCycle === 'yearly'
                ? 'bg-[#00A3AD] text-white shadow-xs'
                : 'text-slate-600 hover:text-[#00A3AD]'
            }`}
          >
            <span>Annual Plan ($69.99)</span>
            <span className={`text-[10px] font-black px-1.5 py-0.2 rounded-full uppercase ${
              billingCycle === 'yearly' ? 'bg-[#FA6400] text-white' : 'bg-amber-100 text-amber-900'
            }`}>
              Save 16%
            </span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Plan 1: Free Community */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-7 flex flex-col justify-between shadow-[0_4px_25px_rgba(10,37,64,0.04)]">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-black text-[#0A2540]">Free Community</h3>
                <p className="text-xs text-slate-600 font-medium">Standard browser utilities</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                INCLUDED
              </span>
            </div>

            <div className="my-5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-[#0A2540]">$0</span>
                <span className="text-sm text-slate-600 font-bold">/ forever</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">No credit card or account needed.</p>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-slate-700 mb-8 font-medium">
              {[
                'Standard Image, Audio & Video Conversions',
                'Basic PDF Merging, Rotating & Splitting',
                'Developer Powerstation & Hash Tools',
                'Branded QR Code Studio & Typography',
                'Live SVG Vector Editor & Minifier',
                'Text & Code Diff Inspector'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
              <li className="flex items-center gap-2.5 text-slate-400">
                <X className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Uncapped AI & PDF Watermark Tools</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <X className="w-4 h-4 text-slate-400 shrink-0" />
                <span>ATS Resume Direct PDF Downloads</span>
              </li>
              <li className="flex items-center gap-2.5 text-slate-400">
                <X className="w-4 h-4 text-slate-400 shrink-0" />
                <span>100% Ad-Free Sovereign UI</span>
              </li>
            </ul>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-700 font-bold">
            Standard Community Access Included
          </div>
        </div>

        {/* Plan 2: Pro Monthly ($6.99 / month) */}
        <div className={`rounded-3xl bg-white border p-7 flex flex-col justify-between shadow-[0_4px_25px_rgba(10,37,64,0.04)] relative transition-all ${
          billingCycle === 'monthly' ? 'border-[#00A3AD] ring-2 ring-[#00A3AD]/20 bg-[#E6F8F9]/20' : 'border-slate-200/90'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-black text-[#0A2540] flex items-center gap-1.5">
                  <span>Pro Monthly</span>
                  <Sparkles className="w-4 h-4 text-[#00A3AD]" />
                </h3>
                <p className="text-xs text-slate-600 font-medium">Flexible month-to-month access</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF]">
                MONTHLY
              </span>
            </div>

            <div className="my-5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-[#008C95]">$6.99</span>
                <span className="text-sm font-bold text-slate-700">/ month</span>
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">Billed monthly. Cancel anytime with 1 click.</p>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-[#0A2540] mb-8 font-medium">
              {[
                'Everything in Free Community Tier',
                'Full PDF Suite (Watermark, Split, Rotate & Export)',
                'ATS Resume Direct PDF & Keyword Suite',
                '100% Ad-Free Across All 12 Sovereign Tools',
                'Batch File Conversions with Zero Limits',
                'Priority Feature Upgrades & Support',
                '30-Day Money-Back Guarantee'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <div className="p-0.5 rounded-full bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF] shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {isPro ? (
            <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-center font-bold text-xs flex items-center justify-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Pro Active ({selectedPlan === 'yearly' ? '$69.99/yr' : '$6.99/mo'})</span>
            </div>
          ) : (
            <button
              id="pricing-monthly-btn"
              onClick={() => openUpgradeModal('Pricing Monthly Tier', 'monthly')}
              className="w-full py-3.5 px-4 rounded-full bg-[#0A2540] hover:bg-[#007A82] text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>SUBSCRIBE — $6.99 / MO</span>
            </button>
          )}
        </div>

        {/* Plan 3: Pro Yearly ($69.99 / year) - Best Value */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#E6F8F9]/90 via-white to-[#E6F8F9]/50 border-2 border-[#00A3AD] p-7 flex flex-col justify-between shadow-[0_15px_45px_rgba(0,163,173,0.16)] overflow-hidden">
          {/* Top highlight ribbon */}
          <div className="absolute top-0 right-0 bg-gradient-to-l from-[#FA6400] to-[#E65100] text-white text-[10px] font-black px-4 py-1.5 rounded-bl-2xl tracking-wider uppercase shadow-xs flex items-center gap-1">
            <Tag className="w-3 h-3" /> BEST VALUE • SAVE 16%
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-xl font-black text-[#0A2540] flex items-center gap-1.5">
                  <span>Pro Yearly</span>
                  <Sparkles className="w-4 h-4 text-[#00A3AD]" />
                </h3>
                <p className="text-xs text-[#007A82] font-bold">Annual Sovereign License</p>
              </div>
            </div>

            <div className="my-5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-black text-[#008C95]">$69.99</span>
                <span className="text-sm font-bold text-slate-700">/ year</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-[#007A82] font-bold bg-[#E6F8F9] px-2.5 py-0.5 rounded-full border border-[#B3EAEF]">
                  $5.83 / month equivalent
                </span>
                <span className="text-xs text-slate-500 font-medium">Billed annually</span>
              </div>
            </div>

            <ul className="space-y-3 text-xs sm:text-sm text-[#0A2540] mb-8 font-medium">
              {[
                'Everything in Pro Monthly Tier',
                'Uncapped Access to All 12 Power Tools for 1 Full Year',
                '16% Annual Cost Savings ($69.99 vs $83.88)',
                'Priority WASM Engine Execution & Acceleration',
                'Full Commercial Royalty-Free Export Rights',
                'Direct Founder Support & Feature Roadmap Input',
                'Unconditional 30-Day Money-Back Guarantee'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <div className="p-0.5 rounded-full bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF] shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {isPro ? (
            <div className="space-y-2">
              <div className="w-full py-3.5 px-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-center font-bold text-xs flex items-center justify-center gap-2 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>You Have Active Pro Subscription</span>
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
              id="pricing-yearly-btn"
              onClick={() => openUpgradeModal('Pricing Yearly Best Value', 'yearly')}
              className="w-full py-4 px-4 rounded-full bg-gradient-to-r from-[#00A3AD] via-[#0FB5BA] to-[#0F4C81] hover:from-[#00B5B8] hover:via-[#00A3AD] hover:to-[#0F4C81] text-white font-black text-xs sm:text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] tracking-tight"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>GET PRO YEARLY — $69.99 / YEAR</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
