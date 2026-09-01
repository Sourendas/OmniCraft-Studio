import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSubscription } from '../../context/SubscriptionContext';
import { 
  Sparkles, 
  Menu, 
  X, 
  CheckCircle2,
  ChevronDown,
  Zap
} from 'lucide-react';
import { TOOLS_DATA } from '../../data/toolsData';

export const Navbar: React.FC = () => {
  const { isPro, openUpgradeModal, toggleProTestMode } = useSubscription();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800 bg-slate-950/70 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link 
            to="/" 
            id="navbar-brand-logo"
            className="flex items-center gap-2.5 group shrink-0"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)] transition-transform group-hover:scale-105">
              <Zap className="w-4.5 h-4.5 text-slate-950" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-amber-300">
                OmniCraft Studio
              </span>
            </div>
          </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
          {/* Tools Dropdown */}
          <div className="relative">
            <button
              id="nav-tools-dropdown-btn"
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              onMouseEnter={() => setToolsDropdownOpen(true)}
              className="flex items-center gap-1 hover:text-cyan-400 transition-colors py-1 cursor-pointer"
            >
              <span>All Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {toolsDropdownOpen && (
              <div 
                onMouseLeave={() => setToolsDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-80 p-2 rounded-2xl bg-slate-900/95 border border-slate-800 shadow-2xl backdrop-blur-2xl grid grid-cols-1 gap-1 z-50 max-h-[75vh] overflow-y-auto"
              >
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Bento Tool Directory
                </div>
                {TOOLS_DATA.map((t) => (
                  <Link
                    key={t.id}
                    to={t.route}
                    onClick={() => setToolsDropdownOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors group"
                  >
                    <span className="font-medium group-hover:text-cyan-300">{t.name}</span>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      t.badge === 'Pro $7' 
                        ? 'bg-violet-950/80 text-violet-300 border border-violet-800/60' 
                        : t.badge === 'AI Powered'
                        ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-800/60'
                        : 'bg-slate-800 text-slate-400'
                    }`}>
                      {t.badge}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a 
            href={isHome ? "#pricing" : "/#pricing"}
            className="hover:text-cyan-400 transition-colors"
          >
            Pricing
          </a>
          <a 
            href={isHome ? "#reviews" : "/#reviews"}
            className="hover:text-cyan-400 transition-colors"
          >
            Reviews
          </a>
          <a 
            href={isHome ? "#faq" : "/#faq"}
            className="hover:text-cyan-400 transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-3">
          {/* Pro Status / Test Switcher */}
          {isPro ? (
            <div 
              onClick={toggleProTestMode}
              title="Click to toggle test status"
              className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-600/60 text-emerald-300 text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)]"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">PRO ACTIVE</span>
              <span className="sm:hidden">PRO</span>
            </div>
          ) : (
            <button
              id="upgrade-nav-cta-btn"
              onClick={() => openUpgradeModal('Global Pro Subscription')}
              className="relative px-4 py-1.5 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 rounded-full font-extrabold hover:brightness-110 transition-all shadow-[0_0_20px_rgba(245,158,11,0.3)] overflow-hidden group cursor-pointer"
            >
              <span className="relative z-10 text-xs tracking-tight flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-slate-950" />
                <span>UPGRADE TO PRO ($7/MO)</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-800 bg-slate-950/95 p-4 space-y-3 backdrop-blur-xl max-h-[80vh] overflow-y-auto">
          <div className="font-bold text-xs text-slate-500 uppercase tracking-wider px-2">
            10 Powerhouse Tools
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {TOOLS_DATA.map((t) => (
              <Link
                key={t.id}
                to={t.route}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900/60 border border-slate-800/80 text-xs text-slate-200"
              >
                <span>{t.name}</span>
                <span className="text-[10px] text-amber-400 font-mono">{t.badge}</span>
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800/80 flex flex-col gap-2">
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-slate-300 py-2 px-3 hover:bg-slate-900 rounded-lg"
            >
              Pricing ($7 / Month)
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-slate-300 py-2 px-3 hover:bg-slate-900 rounded-lg"
            >
              Customer Reviews
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-slate-300 py-2 px-3 hover:bg-slate-900 rounded-lg"
            >
              Frequently Asked Questions
            </a>
          </div>
        </div>
      )}
    </header>
  );
};

