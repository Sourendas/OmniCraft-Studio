import React from 'react';
import { Link } from 'react-router-dom';
import { TOOLS_DATA } from '../../data/toolsData';
import { ArrowRight, Layers, FileText, RefreshCw, Minimize2, QrCode, Code, Wrench, Shield, FileCheck, Hash } from 'lucide-react';

const ICON_MAP: Record<string, React.ElementType> = {
  Layers,
  FileText,
  RefreshCw,
  Minimize2,
  QrCode,
  Code,
  Shield,
  FileCheck,
  Hash,
};

// Direct recommendations for high-intent workflows
const WORKFLOW_PAIRS: Record<string, string[]> = {
  'merge-pdf': ['compress-pdf', 'organize-pdf', 'page-numbers', 'password-protect-pdf'],
  'split-pdf': ['merge-pdf', 'organize-pdf', 'compress-pdf', 'pdf-to-jpg'],
  'compress-pdf': ['merge-pdf', 'jpg-to-pdf', 'image-optimizer', 'organize-pdf'],
  'jpg-to-pdf': ['merge-pdf', 'compress-pdf', 'image-optimizer', 'pdf-to-jpg'],
  'pdf-to-jpg': ['image-optimizer', 'file-converter', 'compress-pdf', 'split-pdf'],
  'organize-pdf': ['merge-pdf', 'split-pdf', 'page-numbers', 'compress-pdf'],
  'password-protect-pdf': ['merge-pdf', 'compress-pdf', 'pdf-suite', 'organize-pdf'],
  'page-numbers': ['merge-pdf', 'organize-pdf', 'pdf-suite', 'compress-pdf'],
  'pdf-suite': ['compress-pdf', 'merge-pdf', 'resume-builder', 'pdf-to-jpg'],
  'image-optimizer': ['file-converter', 'jpg-to-pdf', 'svg-studio', 'qr-generator'],
  'file-converter': ['image-optimizer', 'pdf-to-jpg', 'jpg-to-pdf', 'dev-tools'],
  'resume-builder': ['pdf-suite', 'markdown-editor', 'dev-tools', 'merge-pdf'],
  'qr-generator': ['svg-studio', 'social-studio', 'dev-tools', 'image-optimizer'],
  'dev-tools': ['text-diff', 'markdown-editor', 'qr-generator', 'svg-studio'],
  'markdown-editor': ['text-diff', 'dev-tools', 'resume-builder', 'file-converter'],
  'svg-studio': ['image-optimizer', 'file-converter', 'qr-generator', 'social-studio'],
  'text-diff': ['dev-tools', 'markdown-editor', 'file-converter', 'social-studio'],
  'social-studio': ['qr-generator', 'image-optimizer', 'svg-studio', 'dev-tools'],
  'health-calc': ['currency-crypto', 'dev-tools', 'resume-builder', 'qr-generator'],
  'currency-crypto': ['health-calc', 'dev-tools', 'qr-generator', 'file-converter'],
};

export const RelatedTools: React.FC<{ currentSlug: string }> = ({ currentSlug }) => {
  const currentRoute = `/${currentSlug}`;
  const currentTool = TOOLS_DATA.find((t) => t.route === currentRoute || t.id === currentSlug);

  // Get targeted recommendations or fallback to same category
  const targetIds = WORKFLOW_PAIRS[currentSlug] || [];
  let suggested = TOOLS_DATA.filter((t) => targetIds.includes(t.id) && t.id !== currentSlug);

  if (suggested.length < 4 && currentTool) {
    const sameCategory = TOOLS_DATA.filter(
      (t) => t.category === currentTool.category && t.id !== currentSlug && !suggested.some((s) => s.id === t.id)
    );
    suggested = [...suggested, ...sameCategory];
  }

  // Fill up to 4 with most popular tools
  const popularIds = ['merge-pdf', 'compress-pdf', 'resume-builder', 'image-optimizer'];
  for (const pid of popularIds) {
    if (suggested.length >= 4) break;
    const pop = TOOLS_DATA.find((t) => t.id === pid && t.id !== currentSlug && !suggested.some((s) => s.id === t.id));
    if (pop) suggested.push(pop);
  }

  const finalTools = suggested.slice(0, 4);
  if (finalTools.length === 0) return null;

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-16" aria-label="Related tools">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 mb-6 border-b border-orange-100 pb-4">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-[#EA580C]">Continue Your Workflow</span>
          <h2 className="text-xl sm:text-2xl font-black text-[#1C1917] tracking-tight mt-1">
            Related In-Browser Tools
          </h2>
        </div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#EA580C] hover:text-[#C2410C] transition-colors"
        >
          View all 12+ free tools <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {finalTools.map((tool) => {
          const IconComponent = (tool.iconName && ICON_MAP[tool.iconName]) || Wrench;
          return (
            <Link
              key={tool.id}
              to={tool.route}
              className="group relative flex flex-col justify-between p-4 rounded-2xl bg-white border border-orange-100/80 shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-200"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center text-[#EA580C] group-hover:bg-[#EA580C] group-hover:text-white transition-colors">
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-[#C2410C] border border-orange-100">
                    Free · In-Tab
                  </span>
                </div>
                <h3 className="font-bold text-sm text-stone-900 group-hover:text-[#EA580C] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-[11px] font-bold text-[#EA580C]">
                <span>Open tool</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};
