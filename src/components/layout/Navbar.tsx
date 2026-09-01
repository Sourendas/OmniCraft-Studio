import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSubscription } from '../../context/SubscriptionContext';
import { 
  Sparkles, 
  Menu, 
  X, 
  CheckCircle2,
  ChevronDown,
  Zap,
  Search,
  Command
} from 'lucide-react';
import { TOOLS_DATA } from '../../data/toolsData';
import { CommandPalette } from './CommandPalette';

export const Navbar: React.FC = () => {
  const { isPro, openUpgradeModal, toggleProTestMode } = useSubscription();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsDropdownOpen, setToolsDropdownOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleToggleEvent = () => setCommandPaletteOpen(prev => !prev);
    window.addEventListener('toggle-command-palette', handleToggleEvent);
    return () => window.removeEventListener('toggle-command-palette', handleToggleEvent);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all shadow-[0_2px_15px_rgba(10,37,64,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo - Solutionreach Clean Rounded Styling */}
        <Link 
          to="/" 
          id="navbar-brand-logo"
          className="flex items-center gap-2.5 group shrink-0"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-[#00A3AD] via-[#0FB5BA] to-[#0F4C81] flex items-center justify-center shadow-[0_3px_12px_rgba(0,163,173,0.35)] transition-all group-hover:scale-105 group-hover:shadow-[0_4px_16px_rgba(0,163,173,0.45)]">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-black tracking-tight text-[#0A2540] group-hover:text-[#00A3AD] transition-colors">
              OmniCraft
            </span>
            <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E6F8F9] text-[#008C95] border border-[#B3EAEF]">
              STUDIO
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          {/* Tools Dropdown */}
          <div className="relative">
            <button
              id="nav-tools-dropdown-btn"
              onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)}
              onMouseEnter={() => setToolsDropdownOpen(true)}
              className="flex items-center gap-1.5 hover:text-[#00A3AD] transition-colors py-1 cursor-pointer font-bold text-slate-700"
            >
              <span>All 12 Power Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform text-slate-400 ${toolsDropdownOpen ? 'rotate-180 text-[#00A3AD]' : ''}`} />
            </button>

            {toolsDropdownOpen && (
              <div 
                onMouseLeave={() => setToolsDropdownOpen(false)}
                className="absolute top-full left-0 mt-2 w-84 p-2 rounded-3xl bg-white/98 border border-slate-200/90 shadow-[0_15px_50px_rgba(10,37,64,0.12)] backdrop-blur-2xl grid grid-cols-1 gap-1 z-50 max-h-[75vh] overflow-y-auto"
              >
                <div className="px-3.5 py-2 text-[10px] font-black uppercase tracking-wider text-[#008C95]">
                  100% In-Browser Workstation Directory
                </div>
                {TOOLS_DATA.map((t) => (
                  <Link
                    key={t.id}
                    to={t.route}
                    onClick={() => setToolsDropdownOpen(false)}
                    className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs text-slate-700 hover:text-[#007A82] hover:bg-[#E6F8F9] transition-all group"
                  >
                    <span className="font-bold">{t.name}</span>
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold ${
                      t.badge.includes('Pro') 
                        ? 'bg-amber-100 text-amber-900 border border-amber-300' 
                        : t.badge.includes('AI')
                        ? 'bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF]'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {t.badge}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a 
            href={isHome ? "#workflows" : "/#workflows"}
            className="hover:text-[#00A3AD] transition-colors font-bold text-slate-700"
          >
            Workflows
          </a>
          <a 
            href={isHome ? "#architecture" : "/#architecture"}
            className="hover:text-[#00A3AD] transition-colors font-bold text-slate-700"
          >
            Security & Specs
          </a>
          <a 
            href={isHome ? "#pricing" : "/#pricing"}
            className="hover:text-[#00A3AD] transition-colors font-bold text-slate-700"
          >
            Pricing ($7/mo)
          </a>
          <a 
            href={isHome ? "#faq" : "/#faq"}
            className="hover:text-[#00A3AD] transition-colors font-bold text-slate-700"
          >
            FAQ
          </a>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Quick Command Launcher Pill */}
          <button
            id="quick-command-launcher-btn"
            onClick={() => setCommandPaletteOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4F8FA] hover:bg-[#E6F8F9] border border-slate-200 text-slate-500 hover:text-[#007A82] text-xs font-bold transition-all cursor-pointer shadow-2xs"
            title="Search tools (Cmd+K / Ctrl+K)"
          >
            <Search className="w-3.5 h-3.5 text-[#00A3AD]" />
            <span className="hidden sm:inline">Search Tools</span>
            <kbd className="hidden sm:inline-flex items-center gap-0.5 text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-slate-400">
              <Command className="w-2.5 h-2.5" /> K
            </kbd>
          </button>

          {/* Pro Status / Test Switcher */}
          {isPro ? (
            <div 
              onClick={toggleProTestMode}
              title="Click to toggle test status"
              className="cursor-pointer flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-black shadow-xs hover:bg-emerald-100 transition-all"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span className="hidden sm:inline">PRO ACTIVE</span>
              <span className="sm:hidden">PRO</span>
            </div>
          ) : (
            <button
              id="upgrade-nav-cta-btn"
              onClick={() => openUpgradeModal('Global Pro Subscription')}
              className="relative px-4 sm:px-5 py-2.5 bg-gradient-to-r from-[#00A3AD] to-[#008C95] hover:from-[#00B5B8] hover:to-[#00A3AD] text-white rounded-full font-black text-xs shadow-md shadow-teal-500/20 transition-all overflow-hidden group cursor-pointer active:scale-95 flex items-center gap-1.5 tracking-tight"
            >
              <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
              <span className="hidden sm:inline">UPGRADE TO PRO ($7/MO)</span>
              <span className="sm:hidden">PRO ($7)</span>
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-2xl text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white/98 p-4 space-y-3 backdrop-blur-xl max-h-[80vh] overflow-y-auto shadow-xl">
          <div className="font-black text-xs text-[#008C95] uppercase tracking-wider px-2">
            12 Sovereign Tools
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {TOOLS_DATA.map((t) => (
              <Link
                key={t.id}
                to={t.route}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 hover:bg-[#E6F8F9] hover:text-[#007A82] transition-colors"
              >
                <span className="font-bold">{t.name}</span>
                <span className="text-[10px] text-[#008C95] font-mono font-bold">{t.badge}</span>
              </Link>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2">
            <a
              href="#workflows"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-slate-800 font-bold py-2.5 px-3 hover:bg-[#E6F8F9] rounded-xl"
            >
              Curated Workflows
            </a>
            <a
              href="#architecture"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-slate-800 font-bold py-2.5 px-3 hover:bg-[#E6F8F9] rounded-xl"
            >
              Security Architecture & Specs
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-slate-800 font-bold py-2.5 px-3 hover:bg-[#E6F8F9] rounded-xl"
            >
              Pricing ($7/mo, $70/yr, $130)
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-xs text-slate-800 font-bold py-2.5 px-3 hover:bg-[#E6F8F9] rounded-xl"
            >
              Frequently Asked Questions
            </a>
          </div>
        </div>
      )}

      {/* Global Command Palette Modal */}
      <CommandPalette 
        isOpen={commandPaletteOpen} 
        onClose={() => setCommandPaletteOpen(false)} 
      />
    </header>
  );
};
