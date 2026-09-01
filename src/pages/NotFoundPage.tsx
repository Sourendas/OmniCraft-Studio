import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass, Sparkles, Layers, FileText, Minimize2, QrCode } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] text-xs font-black text-[#007A82] mb-4">
        <Compass className="w-4 h-4 text-[#00A3AD]" />
        <span>HTTP 404 • Resource Not Found</span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-black text-[#0A2540] tracking-tight mb-3">
        Page Not Found
      </h1>
      <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto mb-8 font-medium">
        The requested URL does not exist. Try one of the 12 in-browser tools below.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#00A3AD] hover:bg-[#00B5B8] text-white font-black text-xs transition-all shadow-md active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Studio Directory</span>
        </Link>
      </div>

      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-[0_8px_30px_rgba(10,37,64,0.04)] text-left">
        <h3 className="text-xs font-black text-[#0A2540] uppercase tracking-wider mb-4">
          Popular tools
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <Link
            to="/resume-builder"
            className="p-3.5 rounded-2xl bg-[#F8FBFC] border border-slate-200 hover:border-[#00A3AD] hover:bg-white transition-all flex items-center gap-2.5"
          >
            <FileText className="w-4 h-4 text-[#00A3AD]" />
            <span className="text-xs font-bold text-[#0A2540]">ATS Resume</span>
          </Link>
          <Link
            to="/pdf-suite"
            className="p-3.5 rounded-2xl bg-[#F8FBFC] border border-slate-200 hover:border-[#00A3AD] hover:bg-white transition-all flex items-center gap-2.5"
          >
            <Layers className="w-4 h-4 text-[#00A3AD]" />
            <span className="text-xs font-bold text-[#0A2540]">PDF Suite</span>
          </Link>
          <Link
            to="/image-optimizer"
            className="p-3.5 rounded-2xl bg-[#F8FBFC] border border-slate-200 hover:border-[#00A3AD] hover:bg-white transition-all flex items-center gap-2.5"
          >
            <Minimize2 className="w-4 h-4 text-[#00A3AD]" />
            <span className="text-xs font-bold text-[#0A2540]">Image Optimizer</span>
          </Link>
          <Link
            to="/qr-generator"
            className="p-3.5 rounded-2xl bg-[#F8FBFC] border border-slate-200 hover:border-[#00A3AD] hover:bg-white transition-all flex items-center gap-2.5"
          >
            <QrCode className="w-4 h-4 text-[#00A3AD]" />
            <span className="text-xs font-bold text-[#0A2540]">QR Studio</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
