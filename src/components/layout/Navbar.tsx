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

  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsDropdownOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 w-full min-w-0 border-b border-orange-100 bg-white/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-2 min-w-0">
        <Link to="/" className="min-w-0 shrink group" aria-label="FileTools Kit home">
          <BrandLockup />
        </Link>
        <nav className="hidden lg:flex items-center gap-6 text-sm font-semibold text-stone-600">
          <div className="relative">
            <button onClick={() => setToolsDropdownOpen(!toolsDropdownOpen)} onMouseEnter={() => setToolsDropdownOpen(true)} className="flex items-center gap-1.5 hover:text-[#EA580C] font-bold text-stone-800">
              <span>Tools</span>
              <ChevronDown className={`w-3.5 h-3.5 ${toolsDropdownOpen ? 'rotate-180' : ''}`} />
            </button>
            {toolsDropdownOpen && (
              <div onMouseLeave={() => setToolsDropdownOpen(false)} className="absolute top-full left-0 mt-2 w-80 p-2 rounded-3xl bg-white border border-orange-100 shadow-xl z-50 max-h-[75vh] overflow-y-auto">
                {TOOLS_DATA.map((t) => (
                  <Link key={t.id} to={t.route} onClick={() => setToolsDropdownOpen(false)} className="flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs text-stone-700 hover:bg-[#FFEDD5]">
                    <span className="font-bold">{t.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FFEDD5] text-[#C2410C]">Free</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link to="/about" className="hover:text-[#EA580C] font-bold text-stone-800">About</Link>
          <Link to="/guides" className="hover:text-[#EA580C] font-bold text-stone-800">Guides</Link>
          <Link to="/privacy" className="hover:text-[#EA580C] font-bold text-stone-800">Privacy</Link>
          <a href={isHome ? '#faq' : '/#faq'} className="hover:text-[#EA580C] font-bold text-stone-800">FAQ</a>
          <Link to="/contact" className="hover:text-[#EA580C] font-bold text-stone-800">Contact</Link>
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
          <button onClick={() => setCommandPaletteOpen(true)} className="flex items-center justify-center sm:gap-2 w-10 h-10 sm:w-auto sm:h-auto sm:px-3 sm:py-1.5 rounded-full bg-[#FFF7ED] border border-orange-100 text-xs font-bold" aria-label="Search tools">
            <Search className="w-4 h-4 text-[#EA580C]" />
            <span className="hidden sm:inline">Search tools</span>
            <kbd className="hidden sm:inline-flex items-center text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white border border-orange-100"><Command className="w-2.5 h-2.5" /> K</kbd>
          </button>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 rounded-2xl text-stone-600 min-w-10 min-h-10 flex items-center justify-center" aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}>{mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
      </div>
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-orange-100 bg-white p-4 space-y-3 max-h-[min(80vh,32rem)] overflow-y-auto overscroll-contain">
          <div className="grid grid-cols-1 gap-1.5">
            {TOOLS_DATA.map((t) => (
              <Link key={t.id} to={t.route} onClick={() => setMobileMenuOpen(false)} className="p-3 rounded-2xl bg-[#FFF7ED] border border-orange-100 text-sm font-bold">{t.name}</Link>
            ))}
          </div>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold py-2 px-3">About</Link>
          <Link to="/guides" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold py-2 px-3">Guides</Link>
          <Link to="/privacy" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold py-2 px-3">Privacy</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="block text-sm font-bold py-2 px-3">Contact</Link>
        </div>
      )}
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
    </header>
  );
};
