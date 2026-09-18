import React from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowLeft } from 'lucide-react';
import { AdBanner } from '../../components/layout/AdBanner';

/** Temporary stub: full PdfSuitePage body could not be pushed via MCP in this session (payload size). */
export const PdfSuitePage: React.FC = () => {
  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-2 text-xs font-mono text-[#C2410C] mb-1 font-bold">
        <Link to="/" className="text-slate-500 hover:text-[#EA580C] flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> All Tools
        </Link>
        <span>/</span><span>Documents</span>
      </div>
      <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] flex items-center gap-2.5">
        <Layers className="w-7 h-7 text-[#EA580C]" /> PDF Suite
      </h1>
      <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
        Full merge/rotate/split/watermark UI is being restored. Use the Compress PDF tool for shrinking PDFs in this tab.
      </p>
      <p className="text-xs text-slate-500 mt-2 font-medium">
        Guides:{' '}
        <Link to="/guides/merge-pdf-in-browser" className="text-[#C2410C] font-black underline underline-offset-2">merge ~20 PDFs</Link>
        {' · '}
        <Link to="/guides/split-pdf-pages" className="text-[#C2410C] font-black underline underline-offset-2">extract pages 2–4</Link>
        {' · '}
        <Link to="/guides/what-stays-in-the-tab" className="text-[#C2410C] font-black underline underline-offset-2">what stays in the tab</Link>
        {' · '}
        <Link to="/guides/compress-pdf-in-browser" className="text-[#C2410C] font-black underline underline-offset-2">compress a PDF</Link>
        {' · '}
        <Link to="/compress-pdf" className="text-[#C2410C] font-black underline underline-offset-2">Compress PDF tool</Link>
      </p>
      <div className="mt-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
        Stub page — replace with full PdfSuitePage.tsx from ship-next-5/impl (local NEED_PUSH_PdfSuitePage.tsx).
      </div>
      <div className="mt-6"><AdBanner type="sidebar" /></div>
    </div>
  );
};
