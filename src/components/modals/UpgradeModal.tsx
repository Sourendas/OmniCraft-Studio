import React, { useState } from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { 
  X, 
  Check, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  CreditCard, 
  Lock, 
  Star,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const UpgradeModal: React.FC = () => {
  const { isPro, isUpgradeModalOpen, upgradeFeatureName, closeUpgradeModal, activatePro, deactivatePro } = useSubscription();
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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
        onClick={closeUpgradeModal}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-xl my-8 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl shadow-cyan-500/10 p-6 sm:p-8 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Neon Glow accents */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-60 h-60 bg-gradient-to-bl from-cyan-500/20 to-violet-600/20 blur-3xl pointer-events-none rounded-full" />
          <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-60 h-60 bg-gradient-to-tr from-violet-600/20 to-pink-500/10 blur-3xl pointer-events-none rounded-full" />

          {/* Close button */}
          <button
            id="close-upgrade-modal-btn"
            onClick={closeUpgradeModal}
            className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="text-center sm:text-left mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>OmniCraft Pro Lifetime Pass</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Unlock Pro Power — Only <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">$7 Deal</span>
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              You selected <span className="text-cyan-300 font-medium font-mono">[{upgradeFeatureName}]</span>. Upgrade once to unlock all pro capabilities forever.
            </p>
          </div>

          {/* Value Checklist */}
          <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4 sm:p-5 mb-6 space-y-2.5">
            {[
              { title: 'Uncapped High-Res AI Downloads', desc: 'Uncompressed Flux generation with zero watermark' },
              { title: 'Full PDF Editor & Annotation Suite', desc: 'Unlimited split, merge, rotate, watermark & PDF export' },
              { title: 'ATS Resume PDF Direct Exports', desc: 'Tailored ATS keyword optimization & executive templates' },
              { title: '100% Zero Advertisements', desc: 'Clean, distraction-free environment across all 10 tools' },
              { title: '100% Client-Side Privacy Guarantee', desc: 'No files or documents ever touch remote servers' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="mt-0.5 rounded-full p-1 bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-slate-200">{item.title}</p>
                  <p className="text-[11px] text-slate-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Test Mode Quick Activator */}
          <div className="mb-6 p-3.5 rounded-xl bg-gradient-to-r from-amber-500/10 via-cyan-500/10 to-violet-500/10 border border-amber-500/30 flex items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-bold text-amber-300">Live Client Review Mode</span>
              </div>
              <p className="text-[11px] text-slate-400">Instantly test all Pro export and download gateways.</p>
            </div>
            <button
              id="instant-activate-pro-btn"
              type="button"
              onClick={activatePro}
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-xs font-bold transition-all shrink-0 active:scale-95"
            >
              ⚡ Instant 1-Click Pro
            </button>
          </div>

          {/* Simulated Checkout Form */}
          <form onSubmit={handleSimulatedCheckout} className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-400 pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                256-Bit Encrypted Stripe & LemonSqueezy Checkout
              </span>
              <span className="text-cyan-400 font-bold">$7.00 USD</span>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-slate-800 border-cyan-500/60 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <CreditCard className="w-4 h-4" />
                Credit Card
              </button>
              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`py-2 px-3 rounded-xl border text-xs font-medium flex items-center justify-center gap-2 transition-all ${
                  paymentMethod === 'apple_pay'
                    ? 'bg-slate-800 border-cyan-500/60 text-cyan-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="font-bold"> Pay / G Pay</span>
              </button>
            </div>

            {paymentMethod === 'card' ? (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/60"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Card Information</label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono focus:outline-none focus:border-cyan-500/60"
                    placeholder="4242 4242 4242 4242"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1">Expires (MM/YY)</label>
                    <input
                      type="text"
                      value={expiry}
                      onChange={(e) => setExpiry(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono focus:outline-none focus:border-cyan-500/60"
                      placeholder="12/28"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1">CVC</label>
                    <input
                      type="text"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 font-mono focus:outline-none focus:border-cyan-500/60"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-center text-xs text-slate-400">
                Express 1-touch checkout with Apple Pay, Google Pay, or Link.
              </div>
            )}

            <button
              id="pay-and-unlock-btn"
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 hover:from-cyan-400 hover:via-blue-500 hover:to-violet-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 active:scale-[0.99] disabled:opacity-70 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Authorizing $7 Lifetime Access...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pay $7 & Unlock Pro Lifetime</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
              <span>30-Day Refund Policy</span>
              <span>•</span>
              <span>Cancel Anytime</span>
              <span>•</span>
              <span>Zero Automatic Renewals</span>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
