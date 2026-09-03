import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black text-[#007A82] hover:text-[#00A3AD] mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to tools
      </Link>
      <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_8px_30px_rgba(10,37,64,0.04)] space-y-5 text-slate-700 text-sm leading-relaxed">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00A3AD] to-[#0F4C81] flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">About File Tools Kit</h1>
        </div>
        <p className="font-medium">
          File Tools Kit is a client-side utility suite. Convert, merge, compress, format, and export files in your browser tab using libraries such as pdf-lib, jsPDF, and the HTML5 Canvas API.
        </p>
        <p className="font-medium">
          File Tools Kit does not run a server that receives your documents or images. The website host still serves HTML, CSS, and JavaScript. Tool-card photos may load from Unsplash.
        </p>
        <p className="font-medium">
          Operator: <strong>Souren Das</strong>, Bengaluru, Karnataka, India.
        </p>
        <p className="font-medium">
          Site: <a className="text-[#007A82] underline font-bold" href="https://filetoolskit.com">filetoolskit.com</a>
        </p>
        <p className="font-medium">
          Support: <a className="text-[#007A82] underline font-bold" href="mailto:support@filetoolskit.com">support@filetoolskit.com</a>
        </p>
        <p className="text-xs text-slate-500 font-medium">
          There is no paid upgrade on this site. All 12 tools are free to use in the browser.
        </p>
      </div>
    </div>
  );
};
