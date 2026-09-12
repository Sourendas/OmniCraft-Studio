import React, { useState } from 'react';
import { FAQ_DATA } from '../../data/toolsData';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const toggleFaq = (idx: number) => setOpenIdx(openIdx === idx ? null : idx);
  return (
    <section id="faq" className="py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFEDD5] border border-[#FDBA74] text-xs font-black text-[#C2410C] mb-3">
          <HelpCircle className="w-3.5 h-3.5 text-[#EA580C]" />
          <span className="uppercase tracking-wider">Frequently Asked Questions</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-[#1C1917] tracking-tight">Common questions</h2>
        <p className="text-xs sm:text-sm text-stone-600 mt-2 font-medium">How the tools run, what we host, and how to reach us.</p>
      </div>
      <div className="space-y-3.5">
        {FAQ_DATA.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className={`rounded-3xl border transition-all overflow-hidden ${isOpen ? 'bg-white border-[#F97316] shadow-[0_8px_30px_rgba(249,115,22,0.14)]' : 'bg-white/90 border-orange-100 hover:border-orange-200'}`}>
              <button type="button" onClick={() => toggleFaq(idx)} className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#FFEDD5] text-[#C2410C] border border-[#FDBA74]">{faq.category}</span>
                  <h3 className="text-sm sm:text-base font-black text-[#1C1917]">{faq.question}</h3>
                </div>
                <div className={`p-2 rounded-full transition-transform ${isOpen ? 'bg-[#FFEDD5] text-[#C2410C] rotate-180' : 'text-stone-400'}`}>
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-orange-100 font-medium">{faq.answer}</div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
