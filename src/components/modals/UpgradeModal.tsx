import React from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const UpgradeModal: React.FC = () => {
  const { 
    isUpgradeModalOpen, 
    upgradeFeatureName, 
    closeUpgradeModal, 
    activatePro,
    selectedPlan,
    setSelectedPlan 
  } = useSubscription();

  if (!isUpgradeModalOpen) return null;

  const getPlanPriceDisplay = () => {
    if (selectedPlan === 'yearly') return '$70 / Year';
    if (selectedPlan === 'lifetime') return '$130 Lifetime';
    return '$7 / Month';
  };

  return (
    <AnimatePresence>
      <div 
        id="upgrade-modal-overlay"
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A2540]/60 backdrop-blur-sm overflow-y-auto"
        onClick={closeUpgradeModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-xl my-8 rounded-3xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 overflow-hidden text-[#0A2540]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle cyan glow aura */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-[#00A3AD]/10 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-60 h-60 bg-[#0F4C81]/10 blur-3xl pointer-events-none rounded-full" />

          {/* Close button */}
          <button
            id="close-upgrade-modal-btn"
            onClick={closeUpgradeModal}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Close upgrade modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center sm:text-left mb-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] text-xs font-black text-[#007A82] mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#00A3AD]" />
              <span>OmniCraft Pro Access</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight">
              Unlock all 12 tools — <span className="text-[#008C95]">{getPlanPriceDisplay()}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              You selected <span className="text-[#007A82] font-bold font-mono">[{upgradeFeatureName}]</span>. Select your plan below to unlock unlimited in-browser processing.
            </p>
          </div>

          {/* 3-Tier Plan Selection Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {/* Monthly Plan */}
            <button
              type="button"
              id="select-monthly-plan-btn"
              onClick={() => setSelectedPlan('monthly')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative ${
                selectedPlan === 'monthly'
                  ? 'bg-[#E6F8F9]/80 border-[#00A3AD] shadow-sm ring-1 ring-[#00A3AD]'
                  : 'bg-[#F8FBFC] border-slate-200 hover:bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-[#0A2540]">Monthly</span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedPlan === 'monthly' ? 'border-[#00A3AD] bg-[#00A3AD] text-white' : 'border-slate-300'
                }`}>
                  {selectedPlan === 'monthly' && <Check className="w-3 h-3" />}
                </span>
              </div>
              <div className="text-lg font-black text-[#008C95]">$7 <span className="text-xs font-bold text-slate-500">/ mo</span></div>
              <div className="text-[10px] text-slate-500 font-medium mt-0.5">Flexible monthly billing</div>
            </button>

            {/* Yearly Plan (Save 16%) */}
            <button
              type="button"
              id="select-yearly-plan-btn"
              onClick={() => setSelectedPlan('yearly')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                selectedPlan === 'yearly'
                  ? 'bg-[#E6F8F9]/90 border-[#00A3AD] shadow-sm ring-1 ring-[#00A3AD]'
                  : 'bg-[#F8FBFC] border-slate-200 hover:bg-white'
              }`}
            >
              <div className="absolute top-0 right-0 bg-[#FA6400] text-white text-[9px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-tight flex items-center gap-0.5">
                <Tag className="w-2.5 h-2.5" /> Save 16%
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-[#0A2540]">Yearly</span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedPlan === 'yearly' ? 'border-[#00A3AD] bg-[#00A3AD] text-white' : 'border-slate-300'
                }`}>
                  {selectedPlan === 'yearly' && <Check className="w-3 h-3" />}
                </span>
              </div>
              <div className="text-lg font-black text-[#008C95]">$70 <span className="text-xs font-bold text-slate-500">/ yr</span></div>
              <div className="text-[10px] text-[#007A82] font-bold mt-0.5">$5.83 / mo equivalent</div>
            </button>

            {/* Lifetime Plan (Best Value) */}
            <button
              type="button"
              id="select-lifetime-plan-btn"
              onClick={() => setSelectedPlan('lifetime')}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                selectedPlan === 'lifetime'
                  ? 'bg-[#E6F8F9]/90 border-[#00A3AD] shadow-sm ring-1 ring-[#00A3AD]'
                  : 'bg-[#F8FBFC] border-slate-200 hover:bg-white'
              }`}
            >
              <div className="absolute top-0 right-0 bg-[#00A3AD] text-white text-[9px] font-black px-2 py-0.5 rounded-bl-lg uppercase tracking-tight flex items-center gap-0.5">
                <Sparkles className="w-2.5 h-2.5" /> Best Value
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-black text-[#0A2540]">Lifetime</span>
                <span className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  selectedPlan === 'lifetime' ? 'border-[#00A3AD] bg-[#00A3AD] text-white' : 'border-slate-300'
                }`}>
                  {selectedPlan === 'lifetime' && <Check className="w-3 h-3" />}
                </span>
              </div>
              <div className="text-lg font-black text-[#008C95]">$130 <span className="text-xs font-bold text-slate-500">once</span></div>
              <div className="text-[10px] text-[#007A82] font-bold mt-0.5">Pay once, own forever</div>
            </button>
          </div>

          {/* Value Checklist */}
          <div className="rounded-3xl bg-[#F4F8FA] border border-slate-200/80 p-4 sm:p-5 mb-5 space-y-2">
            {[
              { title: 'PDF watermark & metadata export', desc: 'Text watermark plus title/author metadata on Pro export' },
              { title: 'Resume PDF downloads', desc: 'Keyword overlap score, heuristic rewriter, letter PDF' },
              { title: 'Free converters stay free', desc: 'Image compress and PNG/JPG/WebP convert are already unlimited' },
              { title: 'Browser-local file processing', desc: 'No OmniCraft server receives your documents' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full p-1 bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF] shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-[#0A2540]">{item.title}</p>
                  <p className="text-[11px] text-slate-500 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Activation Button (Demo / Preview Mode) */}
          <div className="space-y-3">
            <button
              id="instant-activate-pro-btn"
              type="button"
              onClick={() => activatePro(selectedPlan)}
              className="w-full py-4 px-5 rounded-full bg-gradient-to-r from-[#00A3AD] via-[#0FB5BA] to-[#0F4C81] hover:from-[#00B5B8] hover:via-[#00A3AD] hover:to-[#0F4C81] text-white font-black text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 active:scale-[0.99] cursor-pointer tracking-tight"
            >
              <Zap className="w-4 h-4 text-amber-300" />
              <span>⚡ Activate Free Pro Preview (Demo Mode)</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-xs text-slate-500 text-center font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Payment processing will be securely handled by Stripe / Lemon Squeezy upon public launch.</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
