import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Layers, Sparkles, RefreshCw, Minimize2, Coins, Terminal, QrCode, Type, Flame,
  ArrowRight, Info, CheckCircle2, X, ExternalLink, ShieldCheck, FileEdit, Code2
} from 'lucide-react';
import { TOOLS_DATA } from '../../data/toolsData';
import { ToolItem } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface ToolGridProps {
  searchQuery: string;
  selectedCategory: string;
}

const optimizeUnsplash = (url: string) =>
  url.includes('images.unsplash.com')
    ? url.replace(/w=\d+&q=\d+/, 'w=640&q=55&fm=webp')
    : url;

const TitleTablet: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span className={`inline-flex max-w-full items-center px-3 py-1 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] text-[#007A82] font-black tracking-wider uppercase ${className}`}>
    <span className="truncate">{children}</span>
  </span>
);

export const ToolGrid: React.FC<ToolGridProps> = ({ searchQuery, selectedCategory }) => {
  const [activePreviewTool, setActivePreviewTool] = useState<ToolItem | null>(null);

  const filteredTools = TOOLS_DATA.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory =
      selectedCategory === 'All Categories' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getToolIcon = (iconName: string) => {
    const iconProps = { className: 'w-4 h-4' };
    switch (iconName) {
      case 'FileText': return <FileText {...iconProps} className="w-4 h-4 text-[#00A3AD]" />;
      case 'Layers': return <Layers {...iconProps} className="w-4 h-4 text-[#0F4C81]" />;
      case 'Sparkles': return <Sparkles {...iconProps} className="w-4 h-4 text-[#00A3AD]" />;
      case 'RefreshCw': return <RefreshCw {...iconProps} className="w-4 h-4 text-emerald-600" />;
      case 'Minimize2': return <Minimize2 {...iconProps} className="w-4 h-4 text-[#00A3AD]" />;
      case 'Coins': return <Coins {...iconProps} className="w-4 h-4 text-[#0F4C81]" />;
      case 'Terminal': return <Terminal {...iconProps} className="w-4 h-4 text-[#008C95]" />;
      case 'QrCode': return <QrCode {...iconProps} className="w-4 h-4 text-[#0F4C81]" />;
      case 'Type': return <Type {...iconProps} className="w-4 h-4 text-purple-600" />;
      case 'Flame': return <Flame {...iconProps} className="w-4 h-4 text-[#FA6400]" />;
      case 'FileEdit': return <FileEdit {...iconProps} className="w-4 h-4 text-[#00A3AD]" />;
      case 'Code2': return <Code2 {...iconProps} className="w-4 h-4 text-indigo-600" />;
      default: return <Sparkles {...iconProps} className="w-4 h-4 text-[#00A3AD]" />;
    }
  };

  return (
    <section id="tools-grid" className="py-8 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10 min-w-0">
      <div className="mb-6 sm:mb-8 pb-4 border-b border-slate-200/80">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#00A3AD] animate-pulse" />
          <h2 className="text-base font-black uppercase tracking-wider text-[#00A3AD]">Tools</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">Open a tool. Work happens in this tab.</p>
      </div>

      {filteredTools.length === 0 ? (
        <div className="text-center py-16 rounded-3xl bg-white border border-slate-200 shadow-sm">
          <p className="text-slate-600 text-sm font-medium">No tools matching your search criteria.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-6">
          {filteredTools.map((tool, index) => (
            <div key={tool.id} id={`tool-card-${tool.id}`} className="group rounded-3xl bg-white border border-slate-200/90 hover:border-[#00A3AD] transition-all duration-300 flex flex-col overflow-hidden shadow-[0_4px_20px_rgba(10,37,64,0.04)] hover:shadow-[0_12px_35px_rgba(0,163,173,0.12)] sm:hover:-translate-y-0.5">
              <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-slate-100 cursor-pointer" onClick={() => setActivePreviewTool(tool)}>
                <img
                  src={optimizeUnsplash(tool.image)}
                  alt={tool.screenshotAlt || tool.name}
                  width={640}
                  height={352}
                  loading={index < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (!target.src.includes('photo-1607604276583-eef5d076aa5f')) {
                      target.src = 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=640&q=55&fm=webp';
                    }
                  }}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A2540]/60 via-transparent to-black/10" />
                <div className="absolute top-3 left-3 max-w-[70%] flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-[11px] font-bold text-[#0A2540] shadow-xs">
                  {getToolIcon(tool.iconName)}<span className="truncate">{tool.category}</span>
                </div>
                <div className="absolute top-3 right-3"><span className={`px-3 py-1 rounded-full text-[10px] font-black font-mono shadow-xs ${tool.badge.includes('Pro') ? 'bg-amber-100 text-amber-900 border border-amber-300' : 'bg-emerald-100 text-emerald-900 border border-emerald-300'}`}>{tool.badge}</span></div>
                <div className="absolute inset-0 hidden sm:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-[#0A2540]/35 backdrop-blur-[2px]">
                  <button type="button" onClick={(e) => { e.stopPropagation(); setActivePreviewTool(tool); }} className="px-4.5 py-2 rounded-full bg-white hover:bg-[#E6F8F9] text-[#0A2540] text-xs font-bold border border-slate-200 transition-all flex items-center gap-1.5 shadow-lg cursor-pointer active:scale-95">
                    <Info className="w-3.5 h-3.5 text-[#00A3AD]" /><span>Quick Details & Guide</span>
                  </button>
                </div>
              </div>
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm sm:text-base">
                    <TitleTablet>{tool.name}</TitleTablet>
                  </h3>
                  <p className="text-sm text-slate-600 mt-2 leading-relaxed line-clamp-2 font-medium">{tool.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">{tool.highlights.map((h, i) => (<span key={i} className="text-[11px] px-3 py-1 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] text-[#007A82] font-bold">{h}</span>))}</div>
                </div>
                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button type="button" onClick={() => setActivePreviewTool(tool)} className="text-xs font-bold text-slate-600 hover:text-[#007A82] transition-colors flex items-center gap-1 cursor-pointer min-h-10">
                    <Info className="w-3.5 h-3.5" /><span>Learn more</span>
                  </button>
                  <Link to={tool.route} id={`open-tool-btn-${tool.id}`} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-gradient-to-r from-[#00A3AD] to-[#008C95] text-white font-black text-xs shadow-md shadow-teal-500/20 transition-all active:scale-95 cursor-pointer min-h-10">
                    <span>Open tool</span><ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {activePreviewTool && (
          <div id="tool-preview-modal-overlay" className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-[#0A2540]/60 backdrop-blur-sm overflow-y-auto" onClick={() => setActivePreviewTool(null)}>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.2 }} className="relative w-full max-w-2xl max-h-[92dvh] overflow-y-auto overscroll-contain rounded-t-3xl sm:rounded-3xl bg-white border border-slate-200 shadow-2xl p-5 sm:p-8 text-[#0A2540]" onClick={(e) => e.stopPropagation()}>
              <button id="close-tool-preview-btn" onClick={() => setActivePreviewTool(null)} className="absolute top-3 right-3 p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors z-20 cursor-pointer min-w-10 min-h-10" aria-label="Close"><X className="w-5 h-5" /></button>
              <div className="flex items-center gap-2 mb-2 pr-10">
                <span className="px-3 py-1 rounded-full bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF] text-xs font-mono font-bold">{activePreviewTool.badge}</span>
                <span className="text-xs text-slate-600 font-mono font-bold truncate">{activePreviewTool.category}</span>
              </div>
              <h3 className="text-lg sm:text-2xl pr-8">
                <TitleTablet className="text-sm sm:text-lg normal-case tracking-tight">{activePreviewTool.name}</TitleTablet>
              </h3>
              <div className="mt-4 rounded-2xl sm:rounded-3xl overflow-hidden border border-slate-200 bg-slate-50 shadow-inner">
                <img src={optimizeUnsplash(activePreviewTool.image)} alt={activePreviewTool.screenshotAlt || activePreviewTool.name} width={640} height={360} decoding="async" referrerPolicy="no-referrer" className="w-full h-44 sm:h-60 object-cover object-center" />
              </div>
              <div className="mt-5">
                <h4 className="text-xs font-black uppercase tracking-wider text-[#007A82] mb-1.5">About this tool</h4>
                <p className="text-sm text-slate-600 leading-relaxed font-medium">{activePreviewTool.detailedDescription || activePreviewTool.description}</p>
              </div>
              {activePreviewTool.howItWorks && (
                <div className="mt-5 rounded-2xl sm:rounded-3xl bg-[#E6F8F9]/60 border border-[#B3EAEF] p-4 sm:p-5">
                  <h4 className="text-xs font-black uppercase tracking-wider text-[#007A82] mb-3.5 flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-700" /><span>How it works in this tab</span></h4>
                  <div className="space-y-3">{activePreviewTool.howItWorks.map((step, idx) => (<div key={idx} className="flex items-start gap-3"><div className="w-6 h-6 rounded-full bg-[#00A3AD] text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5 font-mono">{idx + 1}</div><p className="text-sm text-[#0A2540] leading-relaxed font-bold">{step}</p></div>))}</div>
                </div>
              )}
              <div className="mt-5">
                <h4 className="text-xs font-black uppercase tracking-wider text-slate-600 mb-2">Key capabilities</h4>
                <div className="flex flex-wrap gap-2">{activePreviewTool.highlights.map((h, i) => (<div key={i} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] text-xs text-[#007A82] font-bold"><CheckCircle2 className="w-3.5 h-3.5 text-[#007A82] shrink-0" /><span>{h}</span></div>))}</div>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <button type="button" onClick={() => setActivePreviewTool(null)} className="px-5 py-3 rounded-full text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer min-h-11">Close</button>
                <Link to={activePreviewTool.route} id="modal-launch-tool-btn" onClick={() => setActivePreviewTool(null)} className="px-6 py-3 rounded-full bg-gradient-to-r from-[#00A3AD] to-[#008C95] text-white font-black text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer min-h-11">
                  <span>Open {activePreviewTool.name}</span><ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
