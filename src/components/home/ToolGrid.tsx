import React from 'react';
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
  Lock
} from 'lucide-react';
import { TOOLS_DATA } from '../../data/toolsData';

interface ToolGridProps {
  searchQuery: string;
  selectedCategory: string;
}

export const ToolGrid: React.FC<ToolGridProps> = ({ searchQuery, selectedCategory }) => {
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
    const iconProps = { className: 'w-5 h-5' };
    switch (iconName) {
      case 'FileText':
        return <FileText {...iconProps} className="w-5 h-5 text-violet-400" />;
      case 'Layers':
        return <Layers {...iconProps} className="w-5 h-5 text-cyan-400" />;
      case 'Sparkles':
        return <Sparkles {...iconProps} className="w-5 h-5 text-cyan-400" />;
      case 'RefreshCw':
        return <RefreshCw {...iconProps} className="w-5 h-5 text-teal-400" />;
      case 'Minimize2':
        return <Minimize2 {...iconProps} className="w-5 h-5 text-amber-400" />;
      case 'Coins':
        return <Coins {...iconProps} className="w-5 h-5 text-emerald-400" />;
      case 'Terminal':
        return <Terminal {...iconProps} className="w-5 h-5 text-cyan-400" />;
      case 'QrCode':
        return <QrCode {...iconProps} className="w-5 h-5 text-indigo-400" />;
      case 'Type':
        return <Type {...iconProps} className="w-5 h-5 text-fuchsia-400" />;
      case 'Flame':
        return <Flame {...iconProps} className="w-5 h-5 text-rose-400" />;
      default:
        return <Sparkles {...iconProps} className="w-5 h-5 text-cyan-400" />;
    }
  };

  const isFeatured = (id: string) => id === 'resume-builder' || id === 'ai-studio';

  return (
    <section id="tools-grid" className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header bar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Bento Grid Utility Matrix
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-500">
          {filteredTools.length} Active Engines
        </span>
      </div>

      {filteredTools.length === 0 ? (
        <div className="text-center py-16 rounded-2xl bg-slate-900/30 border border-slate-800">
          <p className="text-slate-400 text-sm">No tools matching your search criteria.</p>
        </div>
      ) : (
        /* Bento Grid: 12-column responsive layout adhering to Bento Grid theme */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3.5">
          {filteredTools.map((tool) => {
            const featured = isFeatured(tool.id) && searchQuery === '' && selectedCategory === 'All Categories';

            if (tool.id === 'resume-builder' && featured) {
              return (
                <div
                  key={tool.id}
                  id={`tool-card-${tool.id}`}
                  className="lg:col-span-4 bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between group hover:border-violet-500/50 transition-all shadow-lg hover:shadow-violet-500/5 relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center text-violet-400 border border-violet-500/30 group-hover:scale-105 transition-transform">
                      {getToolIcon(tool.iconName)}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-cyan-500/10 text-cyan-400 font-bold border border-cyan-500/20 font-mono">
                      AI POWERED
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-violet-300 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {tool.description}
                    </p>

                    <div className="mt-4 space-y-1">
                      {tool.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <div className="w-1 h-1 rounded-full bg-violet-400" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={tool.route}
                      id={`open-tool-btn-${tool.id}`}
                      className="mt-5 w-full py-2 bg-slate-800 hover:bg-violet-600/90 text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>BUILD RESUME</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            }

            if (tool.id === 'ai-studio' && featured) {
              return (
                <div
                  key={tool.id}
                  id={`tool-card-${tool.id}`}
                  className="lg:col-span-4 bg-slate-900/40 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-500/5 group relative overflow-hidden"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center text-cyan-400 border border-cyan-500/30 group-hover:scale-105 transition-transform">
                      {getToolIcon(tool.iconName)}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-violet-500/10 text-violet-400 font-bold border border-violet-500/20 font-mono">
                      PRO $7
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {tool.description}
                    </p>

                    <div className="mt-4 space-y-1">
                      {tool.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                          <div className="w-1 h-1 rounded-full bg-cyan-400" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <Link
                      to={tool.route}
                      id={`open-tool-btn-${tool.id}`}
                      className="mt-5 w-full py-2 bg-slate-800 hover:bg-cyan-600/90 text-white rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span>GENERATE IMAGE</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            }

            // Standard Bento Utility Tile
            return (
              <div
                key={tool.id}
                id={`tool-card-${tool.id}`}
                className={`${
                  featured ? 'lg:col-span-4' : 'lg:col-span-4'
                } bg-slate-900/30 border border-slate-800/90 rounded-2xl p-4 flex flex-col justify-between hover:bg-slate-900/70 hover:border-slate-700 transition-all duration-200 group relative`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-center group-hover:scale-105 transition-transform">
                      {getToolIcon(tool.iconName)}
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-950/80 text-slate-400 border border-slate-800">
                      {tool.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-500 font-mono">
                    {tool.category.split(' ')[0]}
                  </span>
                  <Link
                    to={tool.route}
                    id={`open-tool-btn-${tool.id}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-slate-300 hover:text-white px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-cyan-600 transition-all group-hover:translate-x-0.5"
                  >
                    <span>Launch</span>
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

