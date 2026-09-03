import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { getGuide } from '../../data/guides';

export const GuideArticlePage: React.FC = () => {
  const { slug } = useParams();
  const guide = getGuide(slug);
  if (!guide) return <Navigate to="/guides" replace />;
  return (
    <article className="relative z-10 max-w-3xl mx-auto px-4 py-12">
      <Link to="/guides" className="inline-flex items-center gap-1.5 text-xs font-black text-[#007A82] mb-6"><ArrowLeft className="w-3.5 h-3.5" /> All guides</Link>
      <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-6 text-sm text-slate-700">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">{guide.title}</h1>
        <p>{guide.intro}</p>
        <p className="text-xs text-slate-500">Last updated: {guide.updated} · Souren Das, FileTools Kit, Bengaluru</p>
        <h2 className="text-lg font-black text-[#0A2540]">When to use this tool</h2>
        {guide.whenToUse.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
        <h2 className="text-lg font-black text-[#0A2540]">Step-by-step</h2>
        <ol className="list-decimal pl-5 space-y-3">
          {guide.steps.map((s) => <li key={s.title}><strong>{s.title}.</strong> {s.body}</li>)}
        </ol>
        <h2 className="text-lg font-black text-[#0A2540]">What the tool cannot do</h2>
        <ul className="list-disc pl-5 space-y-1">{guide.cannot.map((c) => <li key={c.slice(0, 40)}>{c}</li>)}</ul>
        <h2 className="text-lg font-black text-[#0A2540]">Privacy</h2>
        {guide.privacy.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
        <p>Files you open in a tool are not uploaded to FileTools Kit. Vercel still serves this page.</p>
        <h2 className="text-lg font-black text-[#0A2540]">Notes</h2>
        {guide.notes.map((p) => <p key={p.slice(0, 40)}>{p}</p>)}
        <div className="flex gap-3 pt-2">
          <Link to={guide.toolRoute} className="px-5 py-2.5 rounded-full bg-[#00A3AD] text-white text-xs font-black">{guide.toolLabel}</Link>
          <Link to="/guides" className="px-5 py-2.5 rounded-full border border-slate-200 text-xs font-black">Back to guides</Link>
        </div>
      </div>
    </article>
  );
};
