import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { GUIDES } from '../data/guides';

export const GuidesPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black text-[#007A82] mb-6"><ArrowLeft className="w-3.5 h-3.5" /> Back to tools</Link>
    <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">Guides</h1>
      <p className="text-sm text-slate-700 font-medium">Short explainers for the tools. Work still happens in this tab.</p>
      <ul className="grid gap-4">
        {GUIDES.map((g) => (
          <li key={g.slug}>
            <Link to={`/guides/${g.slug}`} className="block p-5 rounded-2xl border border-slate-200 bg-[#F4F8FA] hover:bg-[#E6F8F9]">
              <h2 className="font-black text-[#0A2540]">{g.title}</h2>
              <p className="text-sm text-slate-600 mt-1">{g.summary}</p>
              <span className="inline-flex items-center gap-1 text-xs font-black text-[#007A82] mt-2">Read guide <ArrowRight className="w-3.5 h-3.5" /></span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
