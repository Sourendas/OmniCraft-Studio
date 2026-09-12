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
    { label: 'Privacy policy', path: '/privacy', icon: Command }
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
        <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-100 bg-[#FFF7ED]">
          <Search className="w-5 h-5 text-[#EA580C] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools or workflows (e.g. PDF, resume, JSON, WebP)"
            className="w-full text-sm text-[#0A2540] bg-transparent focus:outline-none placeholder:text-slate-400 font-medium"
          />
          <button 
            onClick={onClose}
            className="p-1 rounded-xl hover:bg-slate-200/60 text-slate-400 hover:text-slate-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          <div>
            <div className="text-[11px] font-black text-[#C2410C] uppercase tracking-wider px-3 mb-2">
              Tools ({filteredTools.length})
            </div>
            <div className="space-y-1">
              {filteredTools.map((tool) => {
                const IconComponent = ICON_MAP[tool.iconName] || Zap;
                return (
                  <button
                    key={tool.id}
                    onClick={() => handleSelect(tool.route)}
                    className="w-full p-3 rounded-2xl flex items-center justify-between text-left hover:bg-[#FFEDD5] group transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-xl bg-white border border-slate-200 text-[#C2410C] group-hover:border-[#FDBA74] shrink-0">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-[#0A2540] group-hover:text-[#C2410C] truncate">
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
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#EA580C] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                  </button>
                );
              })}
            </div>
          </div>

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
                    className="p-2.5 rounded-xl bg-[#FFF7ED] hover:bg-[#FFEDD5] border border-slate-200/80 text-left flex items-center gap-2 group transition-all text-xs font-bold text-[#0A2540] group-hover:text-[#C2410C] cursor-pointer"
                  >
                    <Icon className="w-3.5 h-3.5 text-[#EA580C] shrink-0" />
                    <span className="truncate">{s.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="px-6 py-3 bg-[#FFF7ED] border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Navigate with mouse or Tab / Enter</span>
          <span>Press ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
