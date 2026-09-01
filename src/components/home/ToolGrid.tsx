import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Layers, 
  Sparkles, 
  RefreshCw, 
  Minimize2, 
  Coins, 
  Terminal, 
  QrCode, 
  Type, 
  Flame,
  ArrowRight,
  Zap,
  Info,
  CheckCircle2,
  X,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { TOOLS_DATA } from '../../data/toolsData';
import { ToolItem } from '../../types';
import { motion, AnimatePresence } from 'motion/react';

interface ToolGridProps {
  searchQuery: string;
  selectedCategory: string;
}

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
      case 'FileText':
        return <FileText {...iconProps} className="w-4 h-4 text-amber-400" />;
      case 'Layers':
        return <Layers {...iconProps} className="w-4 h-4 text-violet-400" />;
      case 'Sparkles':
        return <Sparkles {...iconProps} className="w-4 h-4 text-pink-400" />;
      case 'RefreshCw':
        return <RefreshCw {...iconProps} className="w-4 h-4 text-emerald-400" />;
      case 'Minimize2':
        return <Minimize2 {...iconProps} className="w-4 h-4 text-amber-400" />;
      case 'Coins':
        return <Coins {...iconProps} className="w-4 h-4 text-blue-400" />;
      case 'Terminal':
        return <Terminal {...iconProps} className="w-4 h-4 text-teal-400" />;
      case 'QrCode':
        return <QrCode {...iconProps} className="w-4 h-4 text-indigo-400" />;
      case 'Type':
        return <Type {...iconProps} className="w-4 h-4 text-fuchsia-400" />;
      case 'Flame':
        return <Flame {...iconProps} className="w-4 h-4 text-rose-400" />;
      default:
        return <Sparkles {...iconProps} className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <section id="tools-grid" className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-3 border-b border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300">
              10 Enterprise-Grade Browser Tools
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any feature image or card for full architectural preview & workflows.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-amber-300/90">
            {filteredTools.length} of 10 Ready In-Browser
          </span>
        </div>
      </div>

      {filteredTools.length === 0 ? (
        <div className="text-center py-16 rounded-2xl bg-slate-900/40 border border-slate-800 backdrop-blur-md">
          <p className="text-slate-400 text-sm">No tools matching your search criteria.</p>
        </div>
      ) : (
        /* Responsive Grid with High-Quality Feature Images */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTools.map((tool) => {
            return (
              <div
                key={tool.id}
                id={`tool-card-${tool.id}`}
                className="group rounded-2xl bg-slate-900/60 hover:bg-slate-900/90 border border-slate-800/90 hover:border-amber-500/40 transition-all duration-300 flex flex-col overflow-hidden shadow-lg hover:shadow-amber-500/10 backdrop-blur-md"
              >
                {/* Visual Image Preview with overlay & Quick View badge */}
                <div 
                  className="relative h-44 w-full overflow-hidden bg-slate-950 cursor-pointer"
                  onClick={() => setActivePreviewTool(tool)}
                >
                  <img
                    src={tool.image}
                    alt={tool.screenshotAlt || tool.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/80 text-[10px] font-semibold text-slate-200 shadow-sm">
                    {getToolIcon(tool.iconName)}
                    <span>{tool.category}</span>
                  </div>

                  {/* Badge */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold font-mono shadow-sm ${
                      tool.badge.includes('Pro')
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-md'
                        : tool.badge.includes('AI')
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 backdrop-blur-md'
                        : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 backdrop-blur-md'
                    }`}>
                      {tool.badge}
                    </span>
                  </div>

                  {/* Hover Quick Preview Action */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-slate-950/40 backdrop-blur-[2px]">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActivePreviewTool(tool);
                      }}
                      className="px-3.5 py-1.5 rounded-full bg-slate-900/90 hover:bg-amber-500 text-slate-200 hover:text-slate-950 text-xs font-bold border border-slate-700 transition-all flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Quick Details & Guide</span>
                    </button>
                  </div>
                </div>

                {/* Content Block */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-base text-white group-hover:text-amber-300 transition-colors flex items-center justify-between">
                      <span>{tool.name}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">
                      {tool.description}
                    </p>

                    {/* Highlights */}
                    <div className="mt-3.5 flex flex-wrap gap-1.5">
                      {tool.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded-md bg-slate-950/80 border border-slate-800 text-slate-300 font-mono"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Bar */}
                  <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setActivePreviewTool(tool)}
                      className="text-xs font-semibold text-slate-400 hover:text-amber-300 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" />
                      <span>Learn More</span>
                    </button>

                    <Link
                      to={tool.route}
                      id={`open-tool-btn-${tool.id}`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all active:scale-95 cursor-pointer"
                    >
                      <span>Launch App</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Feature Deep-Dive Preview Modal */}
      <AnimatePresence>
        {activePreviewTool && (
          <div
            id="tool-preview-modal-overlay"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
            onClick={() => setActivePreviewTool(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl my-8 rounded-3xl bg-slate-900 border border-slate-700/80 shadow-2xl shadow-amber-500/10 p-6 sm:p-8 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                id="close-tool-preview-btn"
                onClick={() => setActivePreviewTool(null)}
                className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors z-20"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-mono font-bold">
                  {activePreviewTool.badge}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {activePreviewTool.category}
                </span>
              </div>

              <h2 className="text-2xl font-extrabold text-white">
                {activePreviewTool.name}
              </h2>

              {/* High-Resolution Feature Screenshot / Diagram */}
              <div className="mt-4 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-inner">
                <img
                  src={activePreviewTool.image}
                  alt={activePreviewTool.screenshotAlt || activePreviewTool.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-56 object-cover object-center"
                />
              </div>

              {/* Detailed Description */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-1.5">
                  About This Engine
                </h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {activePreviewTool.detailedDescription || activePreviewTool.description}
                </p>
              </div>

              {/* How it Works Step-by-Step */}
              {activePreviewTool.howItWorks && (
                <div className="mt-5 rounded-2xl bg-slate-950/70 border border-slate-800 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>How It Works In-Browser (Zero Cloud Uploads)</span>
                  </h4>
                  <div className="space-y-2.5">
                    {activePreviewTool.howItWorks.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5 font-mono">
                          {idx + 1}
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Key Capabilities */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Key Capabilities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activePreviewTool.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 border border-slate-700/60 text-xs text-slate-200"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Modal CTA */}
              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => setActivePreviewTool(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Close Preview
                </button>
                <Link
                  to={activePreviewTool.route}
                  id="modal-launch-tool-btn"
                  onClick={() => setActivePreviewTool(null)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold text-xs shadow-lg shadow-amber-500/25 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <span>Launch {activePreviewTool.name}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
