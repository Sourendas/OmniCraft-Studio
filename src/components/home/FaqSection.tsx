import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldCheck, Lock } from 'lucide-react';
import { FAQ_DATA } from '../../data/toolsData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-300 mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
          <span>Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Everything You Need to Know
        </h2>
        <p className="text-sm text-slate-400 mt-2">
          Transparency regarding our client-side architecture, lifetime pass, and security model.
        </p>
      </div>

      <div className="space-y-3">
        {FAQ_DATA.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen
                  ? 'bg-slate-900/80 border-cyan-500/40 shadow-lg shadow-cyan-500/5'
                  : 'bg-slate-900/40 border-slate-800 hover:border-slate-700/80'
              }`}
            >
              <button
                onClick={() => toggleAccordion(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                    {item.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-100">
                    {item.question}
                  </h4>
                </div>
                <div
                  className={`p-1.5 rounded-full bg-slate-800/80 text-slate-300 transition-transform ${
                    isOpen ? 'rotate-180 text-cyan-400 bg-cyan-950/60' : ''
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 mt-1">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Security Seal Bottom Note */}
      <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-violet-950/40 border border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h5 className="text-xs font-bold text-white">Have a technical compliance question?</h5>
            <p className="text-[11px] text-slate-400">
              Read our zero-log architecture whitepaper in the legal section.
            </p>
          </div>
        </div>
        <a
          href="/privacy-policy"
          className="text-xs font-semibold text-cyan-300 hover:text-cyan-200 underline underline-offset-4"
        >
          View Privacy Architecture →
        </a>
      </div>
    </section>
  );
};
