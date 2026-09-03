import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Search, Command } from 'lucide-react';
import { TOOLS_DATA } from '../../data/toolsData';
import { CommandPalette } from './CommandPalette';
import { BrandLockup } from './BrandLockup';

export const Navbar: React.FC = () => {
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="shrink-0 group" aria-label="FileTools Kit home">
          <BrandLockup />
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-slate-600">
          <div className="relative">
            <button onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)} onMouseEnter={() => setToolsDropdownOpen(true)} className="flex items-center gap-1.5 hover:text-[#00A3AD] font-bold text-slate-700">
              <span>Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {toolsDropdownOpen && (
              <div onMouseLeave={() => setToolsDropdownOpen(false)} className="absolute top-full left-0 mt-2 w-80 p-2 rounded-3xl bg-white border border-slate-200 shadow-xl z-50 max-h-[75vh] overflow-y-auto">
                {TOOLS_DATA.map((t) => (
                  <Link key={t.id} to={t.route} onClick={() => setToolsDropdownOpen(false)} className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs text-slate-700 hover:bg-[#E6F8F9]">
                    <span className="font-bold">{t.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100">Free</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/about" className="hover:text-[#00A3AD] font-bold text-slate-700">About</Link>
          <Link to="/guides" className="hover:text-[#00A3AD] font-bold text-slate-700">Guides</Link>
          <Link to="/privacy" className="hover:text-[#00A3AD] font-bold text-slate-700">Privacy</Link>
          <a href={isHome ? '#faq' : '/#faq'} className="hover:text-[#00A3AD] font-bold text-slate-700">FAQ</a>
          <Link to="/contact" className="hover:text-[#00A3AD] font-bold text-slate-700">Contact</Link>
        </nav>
        <div className="flex items-center gap-2.5">
          <button onClick={() => setCommandPaletteOpen(true)} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F4F8FA] border border-slate-200 text-xs font-bold">
            <Search className="w-3.5 h-3.5 text-[#00A3AD]" />
            <span className="hidden sm:inline">Search tools</span>
            <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white border border-slate-200"><Command className="w-2.5 h-2.5" /> K</kbd>
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-2xl text-slate-600">{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white p-4 space-y-3 max-h-[80vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
            {TOOLS_DATA.map((t) => (
              <Link key={t.id} to={t.route} onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs font-bold">{t.name}</Link>
            ))}
          </div>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold py-2 px-3">About</Link>
          <Link to="/guides" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold py-2 px-3">Guides</Link>
          <Link to="/privacy" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold py-2 px-3">Privacy</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-xs font-bold py-2 px-3">Contact</Link>
        </div>
      )}
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
    </header>
  );
};
