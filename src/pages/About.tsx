import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black text-[#C2410C] hover:text-[#EA580C] mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to tools
      </Link>
      <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 space-y-5 text-slate-700 text-sm leading-relaxed">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#EA580C] to-[#7C3AED] flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">About FileTools Kit</h1>
        </div>
        <p>FileTools Kit is a free set of 12 utilities that run in your browser tab. The site exists so you can merge a PDF, compress an image, or export a resume without creating an account or sending the file to a processing server we operate.</p>
        <p>Libraries include pdf-lib, jsPDF, and the HTML5 Canvas API. JavaScript is required for the tools.</p>
        <p>FileTools Kit does not run a server that receives your documents. The website host (Vercel) still serves HTML, CSS, and JavaScript, and may log ordinary page requests. Tool-card photos may load from Unsplash. Fonts may load from Google Fonts.</p>
        <p>Operator: <strong>Souren Das</strong>, Bengaluru, Karnataka, India. Site: <a className="text-[#C2410C] underline font-bold" href="https://www.filetoolskit.com">filetoolskit.com</a>. Support: <a className="text-[#C2410C] underline font-bold" href="mailto:support@filetoolskit.com">support@filetoolskit.com</a>. Privacy: <a className="text-[#C2410C] underline font-bold" href="mailto:privacy@filetoolskit.com">privacy@filetoolskit.com</a>.</p>
        <p>There is no paid upgrade. All 12 tools are free. FileTools Kit uses Google AdSense Auto ads to support the service. The AdSense publisher script is included on the site (pub-4409273905876536). Google may display ads and use advertising or measurement technologies, subject to your choices. Ads do not receive file bytes from a FileTools Kit upload API. Details: <Link to="/privacy" className="text-[#C2410C] underline font-bold">Privacy</Link> and <Link to="/cookie-policy" className="text-[#C2410C] underline font-bold">Cookies</Link>.</p>
        <h2 className="text-lg font-black text-[#0A2540]">Tools</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li><Link className="text-[#C2410C] underline font-bold" to="/pdf-suite">PDF Suite</Link> — merge, rotate, split, text watermark</li>
          <li><Link className="text-[#C2410C] underline font-bold" to="/resume-builder">Resume Builder</Link> — form plus PDF, twelve layouts</li>
          <li><Link className="text-[#C2410C] underline font-bold" to="/file-converter">File Converter</Link> and <Link className="text-[#C2410C] underline font-bold" to="/image-optimizer">Image Optimizer</Link></li>
          <li><Link className="text-[#C2410C] underline font-bold" to="/qr-generator">QR Generator</Link>, <Link className="text-[#C2410C] underline font-bold" to="/svg-editor">SVG Studio</Link></li>
          <li><Link className="text-[#C2410C] underline font-bold" to="/dev-tools">Dev Tools</Link>, <Link className="text-[#C2410C] underline font-bold" to="/markdown-editor">Markdown Editor</Link>, <Link className="text-[#C2410C] underline font-bold" to="/text-diff">Text Diff</Link></li>
          <li><Link className="text-[#C2410C] underline font-bold" to="/social-studio">Social Studio</Link>, <Link className="text-[#C2410C] underline font-bold" to="/health-calc">Health Calculator</Link>, <Link className="text-[#C2410C] underline font-bold" to="/currency-crypto">Currency Worksheet</Link></li>
        </ul>
        <p>How-to: <Link to="/guides" className="text-[#C2410C] underline font-bold">Guides</Link>. Policy: <Link to="/privacy" className="text-[#C2410C] underline font-bold">Privacy</Link>, <Link to="/terms" className="text-[#C2410C] underline font-bold">Terms</Link>, <Link to="/cookie-policy" className="text-[#C2410C] underline font-bold">Cookies</Link>, <Link to="/disclaimer" className="text-[#C2410C] underline font-bold">Disclaimer</Link>, <Link to="/contact" className="text-[#C2410C] underline font-bold">Contact</Link>.</p>
      </div>
    </div>
  );
};
