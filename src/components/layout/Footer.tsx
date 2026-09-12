import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Cpu, HardDrive } from 'lucide-react';
import { BrandLockup } from './BrandLockup';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-white/95 border-t border-slate-200 text-slate-600 text-xs">
      <div className="border-b border-slate-200/80 py-8 bg-[#FFF7ED]/60">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-start gap-3 p-4 rounded-3xl bg-white border border-slate-200">
            <Lock className="w-4 h-4 text-[#C2410C] mt-0.5" />
            <div><h4 className="font-black text-[#1C1917] text-xs mb-0.5">Files processed in the browser</h4><p className="text-[11px]">No File Tools Kit server receives your documents.</p></div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-3xl bg-white border border-slate-200">
            <ShieldCheck className="w-4 h-4 text-[#C2410C] mt-0.5" />
            <div><h4 className="font-black text-[#1C1917] text-xs mb-0.5">Local execution</h4><p className="text-[11px]">Google AdSense may display ads; see our privacy and cookie policies.</p></div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-3xl bg-white border border-slate-200">
            <Cpu className="w-4 h-4 text-emerald-700 mt-0.5" />
            <div><h4 className="font-black text-[#1C1917] text-xs mb-0.5">Canvas and Web APIs</h4><p className="text-[11px]">Processing happens in this tab.</p></div>
          </div>
          <div className="flex items-start gap-3 p-4 rounded-3xl bg-white border border-slate-200">
            <HardDrive className="w-4 h-4 text-[#C2410C] mt-0.5" />
            <div><h4 className="font-black text-[#1C1917] text-xs mb-0.5">Active client build</h4><p className="text-[11px]">Generated files belong to you.</p></div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-3">
          <Link to="/" aria-label="FileTools Kit home"><BrandLockup compact /></Link>
          <p className="text-xs font-medium">12 in-browser tools. Operated by Souren Das, Bengaluru, India.</p>
          <p className="text-[11px]"><a className="text-[#C2410C] underline font-bold" href="mailto:support@filetoolskit.com">support@filetoolskit.com</a></p>
          <p className="text-[11px]"><a className="text-[#C2410C] underline font-bold" href="mailto:privacy@filetoolskit.com">privacy@filetoolskit.com</a></p>
        </div>
        <div className="space-y-2">
          <h4 className="font-black text-[#1C1917] text-xs uppercase">Document</h4>
          <ul className="space-y-2">
            <li><Link to="/resume-builder" className="font-bold hover:text-[#EA580C]">Resume Builder</Link></li>
            <li><Link to="/pdf-suite" className="font-bold hover:text-[#EA580C]">PDF Suite</Link></li>
            <li><Link to="/markdown-editor" className="font-bold hover:text-[#EA580C]">Markdown Editor</Link></li>
            <li><Link to="/social-studio" className="font-bold hover:text-[#EA580C]">Social Studio</Link></li>
            <li><Link to="/health-calc" className="font-bold hover:text-[#EA580C]">Health Calculator</Link></li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-black text-[#1C1917] text-xs uppercase">Media and dev</h4>
          <ul className="space-y-2">
            <li><Link to="/file-converter" className="font-bold hover:text-[#EA580C]">File Converter</Link></li>
            <li><Link to="/image-optimizer" className="font-bold hover:text-[#EA580C]">Image Optimizer</Link></li>
            <li><Link to="/svg-editor" className="font-bold hover:text-[#EA580C]">SVG Studio</Link></li>
            <li><Link to="/dev-tools" className="font-bold hover:text-[#EA580C]">Dev Tools</Link></li>
            <li><Link to="/text-diff" className="font-bold hover:text-[#EA580C]">Text Diff</Link></li>
            <li><Link to="/qr-generator" className="font-bold hover:text-[#EA580C]">QR Generator</Link></li>
            <li><Link to="/currency-crypto" className="font-bold hover:text-[#EA580C]">FX Worksheet</Link></li>
          </ul>
        </div>
        <div className="space-y-2">
          <h4 className="font-black text-[#1C1917] text-xs uppercase">Site</h4>
          <ul className="space-y-2">
            <li><Link to="/#tools-grid" className="font-bold hover:text-[#EA580C]">Tools</Link></li>
            <li><Link to="/about" className="font-bold hover:text-[#EA580C]">About</Link></li>
            <li><Link to="/guides" className="font-bold hover:text-[#EA580C]">Guides</Link></li>
            <li><Link to="/privacy" className="font-bold hover:text-[#EA580C]">Privacy</Link></li>
            <li><Link to="/terms" className="font-bold hover:text-[#EA580C]">Terms</Link></li>
            <li><Link to="/cookie-policy" className="font-bold hover:text-[#EA580C]">Cookie policy</Link></li>
            <li><Link to="/disclaimer" className="font-bold hover:text-[#EA580C]">Disclaimer</Link></li>
            <li><Link to="/contact" className="font-bold hover:text-[#EA580C]">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-8 text-slate-500">© 2026 FileTools Kit · Souren Das · Bengaluru</div>
    </footer>
  );
};
