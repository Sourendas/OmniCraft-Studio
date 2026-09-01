import React from 'react';
import { Star, CheckCircle2, MessageSquare } from 'lucide-react';
import { TESTIMONIALS_DATA } from '../../data/toolsData';

export const Testimonials: React.FC = () => {
  return (
    <section id="reviews" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-semibold text-cyan-400 mb-2">
            <MessageSquare className="w-3 h-3 text-cyan-400" />
            <span className="uppercase tracking-wider font-bold">Verified Feedback</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Trusted by 14,000+ Engineers & Creators
          </h2>
        </div>
        <div className="text-xs text-slate-400 font-mono">
          Average Rating: <span className="text-yellow-400 font-bold">★ 4.92 / 5.0</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {TESTIMONIALS_DATA.map((item) => (
          <div
            key={item.id}
            id={`testimonial-card-${item.id}`}
            className="rounded-2xl bg-slate-900/30 border border-slate-800 p-5 flex flex-col justify-between hover:border-slate-700/90 transition-all shadow-sm group"
          >
            <div>
              {/* Top: Stars & Verified Badge */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex text-yellow-400 gap-0.5">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                {item.verified && (
                  <div className="flex items-center gap-1 text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded-full border border-cyan-800/40">
                    <CheckCircle2 className="w-2.5 h-2.5" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* Quote */}
              <p className="text-xs text-slate-300 leading-relaxed mb-4 italic">
                "{item.quote}"
              </p>
            </div>

            {/* User Details */}
            <div className="pt-3 border-t border-slate-800/70 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-7 h-7 rounded-lg border flex items-center justify-center font-bold text-[11px] ${item.avatarBg}`}
                >
                  {item.avatarText}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{item.name}</h4>
                  <p className="text-[10px] text-slate-400">
                    {item.role} {item.company ? `• ${item.company}` : ''}
                  </p>
                </div>
              </div>

              <span className="text-[9px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                {item.toolUsed}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-violet-500/10 border border-violet-500/20 rounded-xl text-center">
        <p className="text-xs text-violet-300 font-medium">Join 14,000+ professionals using client-side utilities today</p>
      </div>
    </section>
  );
};

