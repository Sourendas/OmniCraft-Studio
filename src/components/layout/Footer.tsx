import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShieldCheck, 
  Lock, 
  Cpu, 
  HardDrive
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-slate-950/90 border-t border-slate-800 text-slate-400 text-xs">
      {/* Trust & Guarantee Bento Row */}
      <div className="border-b border-slate-800/80 py-6 bg-slate-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/30 border border-slate-800/60">
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
              <Lock className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-xs mb-0.5">100% Zero-Server Uploads</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Files and media process in private browser memory.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/30 border border-slate-800/60">
            <div className="p-1.5 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-xs mb-0.5">GDPR & CCPA Sovereign</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Zero telemetry logs, zero trackers, 100% privacy.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/30 border border-slate-800/60">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-xs mb-0.5">WASM & Canvas Powered</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                Hardware-accelerated processing in modern browsers.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/30 border border-slate-800/60">
            <div className="p-1.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 shrink-0">
              <HardDrive className="w-3.5 h-3.5" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-200 text-xs mb-0.5">Commercial Grade</h4>
              <p className="text-[10px] text-slate-400 leading-relaxed">
                All generated assets belong 100% to you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Col 1: Brand */}
          <div className="md:col-span-2 space-y-3">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-white text-sm tracking-tight">
                OmniCraft <span className="text-cyan-400 font-mono text-[10px]">STUDIO</span>
              </span>
            </Link>
            <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
              The premier sovereign web utility suite. 10 superpower tools engineered for professionals, creators, and developers seeking speed without sacrificing privacy.
            </p>
            <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
              <span className="text-emerald-400">● 100% Operational</span>
              <span>•</span>
              <span>AES-256 Client WASM</span>
            </div>
          </div>

          {/* Col 2: Document & AI */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-300 text-[11px] uppercase tracking-wider">
              Document & AI
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link to="/resume-builder" className="hover:text-cyan-400 transition-colors">
                  AI Resume & ATS Optimizer
                </Link>
              </li>
              <li>
                <Link to="/pdf-suite" className="hover:text-cyan-400 transition-colors">
                  Advanced PDF Studio
                </Link>
              </li>
              <li>
                <Link to="/ai-studio" className="hover:text-cyan-400 transition-colors">
                  AI Image Gen & Remix
                </Link>
              </li>
              <li>
                <Link to="/social-studio" className="hover:text-cyan-400 transition-colors">
                  Social Typography Studio
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Media & Dev */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-300 text-[11px] uppercase tracking-wider">
              Media & Dev Tools
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link to="/file-converter" className="hover:text-cyan-400 transition-colors">
                  Universal File Converter
                </Link>
              </li>
              <li>
                <Link to="/image-optimizer" className="hover:text-cyan-400 transition-colors">
                  Smart Image Compressor
                </Link>
              </li>
              <li>
                <Link to="/dev-tools" className="hover:text-cyan-400 transition-colors">
                  Developer Powerstation
                </Link>
              </li>
              <li>
                <Link to="/qr-generator" className="hover:text-cyan-400 transition-colors">
                  Branded QR Code Studio
                </Link>
              </li>
              <li>
                <Link to="/currency-crypto" className="hover:text-cyan-400 transition-colors">
                  Currency & Remittance
                </Link>
              </li>
              <li>
                <Link to="/health-calc" className="hover:text-cyan-400 transition-colors">
                  Fitness & Macro Targeter
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Legal & Compliance Hub */}
          <div className="space-y-2">
            <h4 className="font-bold text-slate-300 text-[11px] uppercase tracking-wider">
              Legal & Trust Hub
            </h4>
            <ul className="space-y-1.5 text-[11px]">
              <li>
                <Link to="/privacy-policy" className="hover:text-cyan-400 transition-colors">
                  Privacy Policy (0-Log)
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="hover:text-cyan-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookie-policy" className="hover:text-cyan-400 transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-cyan-400 transition-colors">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-cyan-400 transition-colors">
                  Contact & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright from Bento theme */}
        <div className="mt-8 pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-slate-500 uppercase tracking-tight">
          <div>© {new Date().getFullYear()} OmniCraft Studio. Client-side processing guaranteed.</div>
          <div className="flex gap-4">
            <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
            <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookies</Link>
            <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

