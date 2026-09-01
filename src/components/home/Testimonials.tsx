import React from 'react';
import { TESTIMONIALS_DATA } from '../../data/toolsData';
import { ShieldCheck, Star, Sparkles } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] text-xs font-black text-[#007A82] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#00A3AD]" />
            <span className="uppercase tracking-wider">Verified User Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A2540] tracking-tight">
            Trusted by 84,000+ Creators & Engineers
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-700 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-2xs">
            Overall Rating: <span className="text-[#FA6400]">4.92 / 5.0</span> (1,420+ Reviews)
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TESTIMONIALS_DATA.map((t) => (
          <div
            key={t.id}
            className="rounded-3xl bg-white border border-slate-200/90 p-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(10,37,64,0.04)] hover:shadow-[0_12px_35px_rgba(0,163,173,0.10)] hover:border-[#00A3AD] transition-all"
          >
            <div>
              {/* Star Rating & Verified Pill */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1 text-[#FA6400]">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                {t.verified && (
                  <span className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    <span>Verified User</span>
                  </span>
                )}
              </div>

              {/* Quote */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic font-medium">
                "{t.quote}"
              </p>
            </div>

            {/* Author details */}
            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF] font-bold text-xs flex items-center justify-center font-mono">
                  {t.avatarText}
                </div>
                <div>
                  <h4 className="text-xs font-black text-[#0A2540]">{t.name}</h4>
                  <p className="text-[11px] text-slate-500 font-medium">{t.role} • {t.company}</p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold text-[#008C95] bg-[#F4F8FA] px-2.5 py-1 rounded-full border border-slate-200">
                {t.toolUsed}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
