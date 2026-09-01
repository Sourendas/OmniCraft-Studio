import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOOLS_DATA } from '../../data/toolsData';
import { 
  Search, 
  Command, 
  ArrowRight, 
  Layers, 
  FileText, 
  Sparkles, 
  RefreshCw, 
  Image as ImageIcon, 
  Coins, 
  Code2, 
  QrCode, 
  Type, 
  HeartPulse, 
  ShieldCheck, 
  X,
  Zap
} from 'lucide-react';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  Layers,
  Sparkles,
  RefreshCw,
  Image: ImageIcon,
  Coins,
  Code2,
  QrCode,
  Type,
  HeartPulse,
  ShieldCheck
};

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Trigger open via custom event or parent
          window.dispatchEvent(new CustomEvent('toggle-command-palette'));
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredTools = TOOLS_DATA.filter(t =>
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.description.toLowerCase().includes(query.toLowerCase()) ||
    t.category.toLowerCase().includes(query.toLowerCase())
  );

  const quickShortcuts = [
    { label: 'Security Architecture Audit', path: '/#architecture', icon: ShieldCheck },
    { label: 'Curated Workflows', path: '/#workflows', icon: Zap },
    { label: 'Pricing & Pro Plans ($6.99/mo & $69.99/yr)', path: '/#pricing', icon: Command }
  ];

  const handleSelect = (path: string) => {
    onClose();
    if (path.startsWith('/#')) {
      const id = path.replace('/#', '');
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      else navigate(path);
    } else {
      navigate(path);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-[#0A2540]/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
      >
        {/* Search Bar */}
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-[#F8FBFC]">
          <Search className="w-5 h-5 text-[#00A3AD] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools, workflows, or architectural specifications... (e.g. PDF, ATS, JSON, WebP)"
            className="w-full text-sm text-[#0A2540] bg-transparent focus:outline-none placeholder:text-slate-400 font-medium"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Tools List */}
          <div>
            <div className="text-[11px] font-black text-[#007A82] uppercase tracking-wider px-3 mb-2">
              Sovereign Tools ({filteredTools.length})
            </div>
            <div className="space-y-1">
              {filteredTools.map((tool) => {
                const IconComponent = ICON_MAP[tool.iconName] || Zap;
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelect(tool.route)}
                    className="w-full p-3 rounded-2xl flex items-center justify-between text-left hover:bg-[#E6F8F9] group transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-white border border-slate-200 text-[#007A82] group-hover:border-[#B3EAEF] shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-[#0A2540] group-hover:text-[#007A82] truncate">
                            {tool.name}
                          </span>
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 group-hover:bg-white text-slate-600 border border-slate-200">
                            {tool.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 truncate max-w-md font-medium">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#00A3AD] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Hub Shortcuts */}
          <div className="pt-3 border-t border-slate-100">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-wider px-3 mb-2">
              System Shortcuts
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {quickShortcuts.map((s) => {
                const Icon = s.icon;
                return (
                  <button
                    key={s.label}
                    onClick={() => handleSelect(s.path)}
                    className="p-2.5 rounded-xl bg-[#F8FBFC] hover:bg-[#E6F8F9] border border-slate-200/80 text-left flex items-center gap-2 group transition-all text-xs font-bold text-[#0A2540] group-hover:text-[#007A82] cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#00A3AD] shrink-0" />
                    <span className="truncate">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#F8FBFC] border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Navigate with mouse or Tab / Enter</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
