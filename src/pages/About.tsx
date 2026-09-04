import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black text-[#007A82] hover:text-[#00A3AD] mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to tools
      </Link>
      <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 space-y-5 text-slate-700 text-sm leading-relaxed">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00A3AD] to-[#0F4C81] flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">About FileTools Kit</h1>
        </div>
        <p>FileTools Kit is a free set of 12 utilities that run in your browser tab. Merge and split PDFs, convert and compress images, build a resume PDF, make a QR code, hash text, edit Markdown and SVG, and compare two texts. Libraries include pdf-lib, jsPDF, and the HTML5 Canvas API.</p>
        <p>FileTools Kit does not run a server that receives your documents. The website host (Vercel) still serves HTML, CSS, and JavaScript, and may log ordinary page requests. Tool-card photos may load from Unsplash. Fonts may load from Google Fonts.</p>
        <p>Operator: <strong>Souren Das</strong>, Bengaluru, Karnataka, India. Site: <a className="text-[#007A82] underline font-bold" href="https://www.filetoolskit.com">filetoolskit.com</a>. Support: <a className="text-[#007A82] underline font-bold" href="mailto:support@filetoolskit.com">support@filetoolskit.com</a>. Privacy: <a className="text-[#007A82] underline font-bold" href="mailto:privacy@filetoolskit.com">privacy@filetoolskit.com</a>.</p>
        <p>There is no paid upgrade. Google AdSense may be added after approval; the script is not embedded today.</p>
        <h2 className="text-lg font-black text-[#0A2540]">Tools</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><Link className="text-[#007A82] underline font-bold" to="/pdf-suite">PDF Suite</Link> — merge, split, watermark</li>
          <li><Link className="text-[#007A82] underline font-bold" to="/resume-builder">Resume Builder</Link> — form plus PDF, twelve layouts</li>
          <li><Link className="text-[#007A82] underline font-bold" to="/file-converter">File Converter</Link> and <Link className="text-[#007A82] underline font-bold" to="/image-optimizer">Image Optimizer</Link></li>
          <li><Link className="text-[#007A82] underline font-bold" to="/qr-generator">QR Generator</Link>, <Link className="text-[#007A82] underline font-bold" to="/dev-tools">Dev Tools</Link>, Markdown, SVG, Text Diff</li>
        </ul>
        <p>How-to: <Link to="/guides" className="text-[#007A82] underline font-bold">Guides</Link>. Policy: <Link to="/privacy" className="text-[#007A82] underline font-bold">Privacy</Link>, <Link to="/terms" className="text-[#007A82] underline font-bold">Terms</Link>, <Link to="/cookie-policy" className="text-[#007A82] underline font-bold">Cookies</Link>, <Link to="/contact" className="text-[#007A82] underline font-bold">Contact</Link>.</p>
      </div>
    </div>
  );
};
