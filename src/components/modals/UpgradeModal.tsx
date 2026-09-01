import React, { useState } from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  Lock
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const UpgradeModal: React.FC = () => {
  const { isUpgradeModalOpen, upgradeFeatureName, closeUpgradeModal, activatePro } = useSubscription();
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple_pay'>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvc, setCvc] = useState('888');
  const [cardName, setCardName] = useState('Alex Developer');

  if (!isUpgradeModalOpen) return null;

  const handleSimulatedCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      activatePro();
    }, 900);
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
          {/* Solutionreach subtle cyan glow aura */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-[#00A3AD]/10 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-60 h-60 bg-[#0F4C81]/10 blur-3xl pointer-events-none rounded-full" />

          {/* Close button */}
          <button
            id="close-upgrade-modal-btn"
            onClick={closeUpgradeModal}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center sm:text-left mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] text-xs font-black text-[#007A82] mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#00A3AD]" />
              <span>OmniCraft Pro Monthly Subscription</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight">
              Unlock All 10 Pro Engines — Just <span className="text-[#008C95]">$7 / Month</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
              You selected <span className="text-[#007A82] font-bold font-mono">[{upgradeFeatureName}]</span>. Subscribe for full uncapped capabilities across all tools. Cancel anytime.
            </p>
          </div>

          {/* Value Checklist */}
          <div className="rounded-3xl bg-[#F4F8FA] border border-slate-200/80 p-4 sm:p-5 mb-6 space-y-2.5">
            {[
              { title: 'Uncapped High-Res AI Downloads', desc: 'Uncompressed Flux generation with zero watermark' },
              { title: 'Full PDF Editor & Annotation Suite', desc: 'Unlimited split, merge, rotate, watermark & PDF export' },
              { title: 'ATS Resume PDF Direct Exports', desc: 'Tailored ATS keyword optimization & executive templates' },
              { title: '100% Zero Advertisements', desc: 'Clean, distraction-free environment across all 10 tools' },
              { title: '100% Client-Side Privacy Guarantee', desc: 'No files or documents ever touch remote servers' }
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

          {/* Test Mode Quick Activator */}
          <div className="mb-6 p-4 rounded-3xl bg-[#E6F8F9]/70 border border-[#B3EAEF] flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-[#00A3AD]" />
                <span className="text-xs font-black text-[#007A82]">Instant Review Mode</span>
              </div>
              <p className="text-[11px] text-slate-600 font-medium">Instantly activate Pro subscription to test all export gateways.</p>
            </div>
            <button
              id="instant-activate-pro-btn"
              type="button"
              onClick={activatePro}
              className="px-4 py-2 rounded-full bg-[#00A3AD] hover:bg-[#00B5B8] text-white text-xs font-black transition-all shrink-0 active:scale-95 cursor-pointer shadow-sm shadow-teal-500/20"
            >
              ⚡ Instant 1-Click Pro
            </button>
          </div>

          {/* Simulated Checkout Form */}
          <form onSubmit={handleSimulatedCheckout} className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-600 pb-2 border-b border-slate-100 font-medium">
              <span className="flex items-center gap-1.5 font-bold">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                256-Bit Encrypted Secure Checkout
              </span>
              <span className="text-[#008C95] font-black font-mono">$7.00 USD / month</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2.5 px-3 rounded-full border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'card'
                    ? 'bg-[#E6F8F9] border-[#00A3AD] text-[#007A82] shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`py-2.5 px-3 rounded-full border text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  paymentMethod === 'apple_pay'
                    ? 'bg-[#E6F8F9] border-[#00A3AD] text-[#007A82] shadow-xs'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <span> Pay / G Pay</span>
              </button>
            </div>

            {paymentMethod === 'card' ? (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Card Information</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-mono font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">Expires (MM/YY)</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-mono font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
                      placeholder="12/28"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-700 font-bold mb-1">CVC</label>
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-mono font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-600 font-medium">
                Express 1-touch subscription with Apple Pay, Google Pay, or Link.
              </div>
            )}

            <button
              id="pay-and-unlock-btn"
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-4 rounded-full bg-gradient-to-r from-[#00A3AD] via-[#0FB5BA] to-[#0F4C81] hover:from-[#00B5B8] hover:via-[#00A3AD] hover:to-[#0F4C81] text-white font-black text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authorizing $7/mo Subscription...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Start $7 / Month Subscription</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1 font-medium">
              <span>Cancel Anytime</span>
              <span>•</span>
              <span>30-Day Money-Back Guarantee</span>
              <span>•</span>
              <span>Encrypted Billing</span>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
