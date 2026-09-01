import React from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { Check, Sparkles, ShieldCheck, Zap, Tag, ArrowRight, Lock } from 'lucide-react';

export const PricingSection: React.FC = () => {
  const { isPro, openUpgradeModal, toggleProTestMode, selectedPlan } = useSubscription();

  return (
    <section id="pricing" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] text-xs font-black text-[#007A82] mb-3">
          <Sparkles className="w-3.5 h-3.5 text-[#00A3AD]" />
          <span className="uppercase tracking-wider">Plans (preview until checkout)</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#0A2540] tracking-tight">
          Simple, Honest Plans for Every Workflow
        </h2>
        <p className="text-sm text-slate-600 mt-2 font-medium">
          File tools run in your browser. Checkout is not live — Pro preview is a local demo flag. 30-day refund language applies when paid billing launches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
        {/* Tier 1: Free Community */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-[0_4px_25px_rgba(10,37,64,0.03)] hover:border-slate-300 transition-all">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-black text-[#0A2540]">Free Community</h3>
                <p className="text-xs text-slate-500 font-medium">Core in-browser tools</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                INCLUDED
              </span>
            </div>

            <div className="my-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-[#0A2540]">$0</span>
                <span className="text-xs text-slate-500 font-bold">/ forever</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-medium">No credit card or account needed.</p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 mb-6 font-medium">
              {[
                'Standard image & WAV conversions',
                'PDF merge, rotate, and page-range split',
                'Dev workbench & SHA hashes',
                'QR, SVG, markdown, and text diff'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-700 font-bold">
            Free Standard Access Included
          </div>
        </div>

        {/* Tier 2: Pro Monthly ($7/mo) */}
        <div className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-[0_4px_25px_rgba(10,37,64,0.03)] hover:border-[#00A3AD] transition-all relative">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-black text-[#0A2540] flex items-center gap-1.5">
                  <span>Pro Monthly</span>
                </h3>
                <p className="text-xs text-slate-500 font-medium">Flexible month-to-month</p>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF]">
                MONTHLY
              </span>
            </div>

            <div className="my-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-[#008C95]">$7</span>
                <span className="text-xs font-bold text-slate-600">/ month</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Billed monthly. Cancel anytime.</p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 mb-6 font-medium">
              {[
                'Everything in Free Community',
                'PDF text watermark & metadata export',
                'Resume PDF downloads',
                'Pro preview until payments launch'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="p-0.5 rounded-full bg-[#E6F8F9] text-[#007A82] shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-bold text-[#0A2540]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {isPro ? (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-center font-bold text-xs flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pro Active</span>
            </div>
          ) : (
            <button
              id="pricing-monthly-btn"
              onClick={() => openUpgradeModal('Pricing Monthly Tier', 'monthly')}
              className="w-full py-3 px-4 rounded-full bg-[#0A2540] hover:bg-[#007A82] text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
            >
              <span>Get Monthly — $7/mo</span>
            </button>
          )}
        </div>

        {/* Tier 3: Pro Yearly ($70/yr) */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#E6F8F9]/80 via-white to-[#E6F8F9]/40 border-2 border-[#00A3AD] p-6 flex flex-col justify-between shadow-[0_12px_35px_rgba(0,163,173,0.14)] overflow-hidden">
          <div className="absolute top-0 right-0 bg-[#FA6400] text-white text-[9px] font-black px-3 py-1 rounded-bl-xl tracking-wider uppercase shadow-2xs flex items-center gap-1">
            <Tag className="w-2.5 h-2.5" /> SAVE 16%
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-black text-[#0A2540] flex items-center gap-1.5">
                  <span>Pro Yearly</span>
                  <Sparkles className="w-3.5 h-3.5 text-[#00A3AD]" />
                </h3>
                <p className="text-xs text-[#007A82] font-bold">Annual plan</p>
              </div>
            </div>

            <div className="my-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-[#008C95]">$70</span>
                <span className="text-xs font-bold text-slate-600">/ year</span>
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] text-[#007A82] font-bold bg-[#E6F8F9] px-2 py-0.5 rounded-full border border-[#B3EAEF]">
                  $5.83 / month equivalent
                </span>
              </div>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-700 mb-6 font-medium">
              {[
                'Everything in Pro Monthly',
                'One year of Pro when billing launches',
                'About 16% savings vs monthly',
                'Outputs you generate are yours'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="p-0.5 rounded-full bg-[#E6F8F9] text-[#007A82] shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-bold text-[#0A2540]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {isPro ? (
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-center font-bold text-xs flex items-center justify-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pro Active</span>
            </div>
          ) : (
            <button
              id="pricing-yearly-btn"
              onClick={() => openUpgradeModal('Pricing Yearly Plan', 'yearly')}
              className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-[#00A3AD] to-[#008C95] hover:from-[#00B5B8] hover:to-[#00A3AD] text-white font-black text-xs shadow-md shadow-teal-500/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Yearly — $70/yr</span>
            </button>
          )}
        </div>

        {/* Tier 4: Pro Lifetime ($130 one-time) - Best Value */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#0A2540] via-[#0E355A] to-[#0A2540] text-white border-2 border-slate-700 p-6 flex flex-col justify-between shadow-[0_15px_45px_rgba(10,37,64,0.25)] overflow-hidden">
          <div className="absolute top-0 right-0 bg-gradient-to-l from-emerald-500 to-teal-600 text-white text-[9px] font-black px-3 py-1 rounded-bl-xl tracking-wider uppercase shadow-2xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" /> BEST VALUE
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-1.5">
                  <span>Pro Lifetime</span>
                </h3>
                <p className="text-xs text-teal-300 font-medium">One-time payment forever</p>
              </div>
            </div>

            <div className="my-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-black text-white">$130</span>
                <span className="text-xs font-bold text-teal-300">/ one-time</span>
              </div>
              <p className="text-[11px] text-slate-300 mt-1 font-medium">Never pay again. Lifetime updates.</p>
            </div>

            <ul className="space-y-2.5 text-xs text-slate-200 mb-6 font-medium">
              {[
                'Permanent access when billing launches',
                'No recurring fee after purchase',
                'Same Pro tools as yearly',
                '30-day refund window from purchase date'
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="p-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shrink-0">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="font-bold text-white">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {isPro ? (
            <div className="space-y-2">
              <div className="p-3 rounded-2xl bg-emerald-900/50 border border-emerald-500 text-emerald-300 text-center font-bold text-xs flex items-center justify-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pro Active ({selectedPlan})</span>
              </div>
              <button
                onClick={toggleProTestMode}
                className="w-full text-center text-[10px] text-slate-400 hover:text-slate-200 underline transition-colors cursor-pointer"
              >
                (Toggle off for testing)
              </button>
            </div>
          ) : (
            <button
              id="pricing-lifetime-btn"
              onClick={() => openUpgradeModal('Pricing Lifetime Plan', 'lifetime')}
              className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-[#0A2540] font-black text-xs shadow-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99]"
            >
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span>GET LIFETIME — $130</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};
