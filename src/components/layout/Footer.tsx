import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShieldCheck, 
  Lock, 
  Cpu, 
  HardDrive,
  Zap
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-white/95 border-t border-slate-200 text-slate-600 text-xs">
      {/* Trust & Guarantee Bento Row - Solutionreach Clean Rounded Styling */}
      <div className="border-b border-slate-200/80 py-8 bg-[#F4F8FA]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-start gap-3.5 p-4.5 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_15px_rgba(10,37,64,0.03)]">
            <div className="p-2.5 rounded-2xl bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF] shrink-0">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-black text-[#0A2540] text-xs mb-0.5">100% Zero-Server Uploads</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Files and media process purely in private browser memory.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4.5 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_15px_rgba(10,37,64,0.03)]">
            <div className="p-2.5 rounded-2xl bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF] shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-black text-[#0A2540] text-xs mb-0.5">GDPR & CCPA Sovereign</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Zero telemetry logs, zero trackers, absolute confidentiality.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4.5 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_15px_rgba(10,37,64,0.03)]">
            <div className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-black text-[#0A2540] text-xs mb-0.5">WASM & Canvas Engine</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                Hardware-accelerated processing inside modern browsers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5 p-4.5 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_15px_rgba(10,37,64,0.03)]">
            <div className="p-2.5 rounded-2xl bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF] shrink-0">
              <HardDrive className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-black text-[#0A2540] text-xs mb-0.5">Commercial Grade</h4>
              <p className="text-[11px] text-slate-600 leading-relaxed font-medium">
                All generated assets and outputs belong 100% to you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-[#00A3AD] via-[#0FB5BA] to-[#0F4C81] flex items-center justify-center shadow-xs">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="font-black text-[#0A2540] text-base tracking-tight">
                OmniCraft <span className="text-[#008C95] font-mono text-xs font-bold">STUDIO</span>
              </span>
            </Link>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm font-medium">
              The premier sovereign web utility workstation. 10 superpower tools engineered for creators, marketers, and developers demanding instant speed without data compromise.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-slate-500 font-mono pt-1">
              <span className="text-emerald-600 font-bold">● 100% Operational</span>
              <span>•</span>
              <span>Hardware-Accelerated Client Engine</span>
            </div>
          </div>

          {/* Col 2: Document & AI */}
          <div className="space-y-2.5">
            <h4 className="font-black text-[#0A2540] text-xs uppercase tracking-wider">
              Document & AI
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/resume-builder" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  AI Resume & ATS Optimizer
                </Link>
              </li>
              <li>
                <Link to="/pdf-suite" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  Advanced PDF Studio
                </Link>
              </li>
              <li>
                <Link to="/ai-studio" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  AI Image Gen & Remix
                </Link>
              </li>
              <li>
                <Link to="/social-studio" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  Social Typography Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Media & Dev */}
          <div className="space-y-2.5">
            <h4 className="font-black text-[#0A2540] text-xs uppercase tracking-wider">
              Media & Dev Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/file-converter" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  Universal File Converter
                </Link>
              </li>
              <li>
                <Link to="/image-optimizer" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  Smart Image Compressor
                </Link>
              </li>
              <li>
                <Link to="/dev-tools" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  Developer Powerstation
                </Link>
              </li>
              <li>
                <Link to="/qr-generator" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  Branded QR Code Studio
                </Link>
              </li>
              <li>
                <Link to="/currency-crypto" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  Currency & Crypto Tracker
                </Link>
              </li>
              <li>
                <Link to="/health-calc" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  Fitness & Macro Targeter
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance Hub */}
          <div className="space-y-2.5">
            <h4 className="font-black text-[#0A2540] text-xs uppercase tracking-wider">
              Legal & Trust Hub
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/privacy-policy" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  Privacy Policy (0-Log)
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  Terms of Service ($7/mo)
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-[#00A3AD] transition-colors font-bold">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>© {new Date().getFullYear()} OmniCraft Studio. 100% Client-side sovereign architecture.</div>
          <div className="flex gap-4 font-bold text-slate-600">
            <Link to="/privacy-policy" className="hover:text-[#00A3AD] transition-colors">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-[#00A3AD] transition-colors">Terms</Link>
            <Link to="/cookie-policy" className="hover:text-[#00A3AD] transition-colors">Cookies</Link>
            <Link to="/contact" className="hover:text-[#00A3AD] transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
