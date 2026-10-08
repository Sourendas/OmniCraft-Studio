import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Layers, FileText, Minimize2, QrCode } from 'lucide-react';

function setRobots(content: string) {
  let el = document.head.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.name = 'robots';
    document.head.appendChild(el);
  }
  el.content = content;
}

export const NotFoundPage: React.FC = () => {
  // Unknown URLs must not be indexed as thin duplicates (soft 404). Direct
  // visits get a real 404 status from Vercel via dist/404.html; this covers
  // in-app navigation too.
  useEffect(() => {
    document.title = 'Page not found | FileTools Kit';
    setRobots('noindex,follow');
    // Seo recreates the canonical link on the next route change.
    document.head.querySelector('link[rel="canonical"]')?.remove();
    return () => setRobots('index,follow');
  }, []);

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFEDD5] border border-[#FDBA74] text-xs font-black text-[#C2410C] mb-4">
        <Compass className="w-4 h-4 text-[#EA580C]" />
        <span>HTTP 404 · Page not found</span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-black text-[#0A2540] tracking-tight mb-3">
        Page not found
      </h1>
      <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mb-8 font-medium">
        That URL does not exist on FileTools Kit. It may have moved, or the link had a typo. Try one of the tools below or read the guides.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#EA580C] hover:bg-[#F97316] text-white font-black text-xs transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to tools</span>
        </Link>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(10,37,64,0.04)] text-left">
        <h3 className="text-xs font-black text-[#0A2540] uppercase tracking-wider mb-4">
          Popular tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link to="/resume-builder" className="p-3.5 rounded-2xl bg-[#FFF7ED] border border-slate-200 hover:border-[#EA580C] hover:bg-white transition-all flex items-center gap-2.5">
            <FileText className="w-4 h-4 text-[#EA580C]" />
            <span className="text-xs font-bold text-[#0A2540]">Resume Builder</span>
          </Link>
          <Link to="/pdf-suite" className="p-3.5 rounded-2xl bg-[#FFF7ED] border border-slate-200 hover:border-[#EA580C] hover:bg-white transition-all flex items-center gap-2.5">
            <Layers className="w-4 h-4 text-[#EA580C]" />
            <span className="text-xs font-bold text-[#0A2540]">PDF Suite</span>
          </Link>
          <Link to="/image-optimizer" className="p-3.5 rounded-2xl bg-[#FFF7ED] border border-slate-200 hover:border-[#EA580C] hover:bg-white transition-all flex items-center gap-2.5">
            <Minimize2 className="w-4 h-4 text-[#EA580C]" />
            <span className="text-xs font-bold text-[#0A2540]">Image Optimizer</span>
          </Link>
          <Link to="/qr-generator" className="p-3.5 rounded-2xl bg-[#FFF7ED] border border-slate-200 hover:border-[#EA580C] hover:bg-white transition-all flex items-center gap-2.5">
            <QrCode className="w-4 h-4 text-[#EA580C]" />
            <span className="text-xs font-bold text-[#0A2540]">QR Generator</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
