import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const GuidesPage: React.FC = () => {
  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black text-[#007A82] hover:text-[#00A3AD] mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to tools
      </Link>
      <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 space-y-8 text-slate-700 text-sm leading-relaxed">
        <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">How the tools work</h1>
        <section className="space-y-2">
          <h2 className="text-lg font-black text-[#0A2540]">PDF merge and split</h2>
          <p className="font-medium">Open <Link to="/pdf-suite" className="text-[#007A82] underline font-bold">PDF Suite</Link>. Merge and split run with pdf-lib in this tab.</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-lg font-black text-[#0A2540]">Image convert and compress</h2>
          <p className="font-medium">Use File Converter or Image Optimizer. Images are re-encoded on an HTML5 canvas.</p>
        </section>
        <section className="space-y-2">
          <h2 className="text-lg font-black text-[#0A2540]">Resume PDF</h2>
          <p className="font-medium">Resume Builder exports a PDF with jsPDF in this browser. Keyword overlap is not an employer ATS.</p>
        </section>
      </div>
    </div>
  );
};
