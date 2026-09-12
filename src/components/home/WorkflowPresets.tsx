import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Workflow,
  ArrowRight,
  Code2,
  Briefcase,
  Palette,
  Globe2
} from 'lucide-react';

interface WorkflowPipeline {
  id: string;
  title: string;
  shortTitle: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
  steps: Array<{
    name: string;
    route: string;
    action: string;
    tag: string;
  }>;
  primaryAction: {
    label: string;
    route: string;
  };
}

export const WorkflowPresets: React.FC = () => {
  const workflows: WorkflowPipeline[] = [
    {
      id: 'executive-career',
      title: 'Resume, PDF, and convert',
      shortTitle: 'Resume, PDF, convert',
      badge: 'Document & Career',
      icon: Briefcase,
      description: 'Build a resume PDF, merge or watermark pages, then convert an image or DOCX in this tab.',
      steps: [
        { name: 'Resume Builder', route: '/resume-builder', action: 'Keyword overlap and PDF export', tag: 'Step 1' },
        { name: 'PDF Suite', route: '/pdf-suite', action: 'Merge, split, watermark', tag: 'Step 2' },
        { name: 'File Converter', route: '/file-converter', action: 'Image / DOCX in the browser', tag: 'Step 3' }
      ],
      primaryAction: { label: 'Open Resume Builder', route: '/resume-builder' }
    },
    {
      id: 'developer-data',
      title: 'Dev tools path',
      shortTitle: 'Dev tools path',
      badge: 'Developer & Data',
      icon: Code2,
      description: 'Compare text, run hashes or JSON helpers, then draft Markdown — all in this tab.',
      steps: [
        { name: 'Text Diff', route: '/text-diff', action: 'Compare two texts and export a unified patch', tag: 'Step 1' },
        { name: 'Dev Tools', route: '/dev-tools', action: 'JSON/CSV, regex tester, and SHA hashes', tag: 'Step 2' },
        { name: 'Markdown Editor', route: '/markdown-editor', action: 'Write Markdown and export MD or HTML', tag: 'Step 3' }
      ],
      primaryAction: { label: 'Open Text Diff', route: '/text-diff' }
    },
    {
      id: 'creative-marketing',
      title: 'SVG and QR',
      shortTitle: 'SVG and QR',
      badge: 'Media & Graphics',
      icon: Palette,
      description: 'Edit an SVG, compress images, then export a QR code.',
      steps: [
        { name: 'SVG Studio', route: '/svg-editor', action: 'Adjust stroke and fill, export SVG, JSX, or PNG', tag: 'Step 1' },
        { name: 'Image Optimizer', route: '/image-optimizer', action: 'Resize and re-encode WebP, JPEG, or PNG', tag: 'Step 2' },
        { name: 'QR Generator', route: '/qr-generator', action: 'Export PNG or SVG QR codes with colors', tag: 'Step 3' }
      ],
      primaryAction: { label: 'Open SVG Studio', route: '/svg-editor' }
    },
    {
      id: 'global-commerce',
      title: 'Currency and images',
      shortTitle: 'Currency and images',
      badge: 'Productivity & Utility',
      icon: Globe2,
      description: 'Example FX worksheet (static rates), then compress images or format captions in this tab.',
      steps: [
        { name: 'Currency Worksheet', route: '/currency-crypto', action: 'Static example rates — not a live market feed', tag: 'Step 1' },
        { name: 'Image Optimizer', route: '/image-optimizer', action: 'Compress and re-encode images in canvas', tag: 'Step 2' },
        { name: 'Social Studio', route: '/social-studio', action: 'Unicode styles and starter hashtag lists', tag: 'Step 3' }
      ],
      primaryAction: { label: 'Open Currency Worksheet', route: '/currency-crypto' }
    }
  ];

  const [activeWorkflowId, setActiveWorkflowId] = useState('executive-career');
  const activeWorkflow = workflows.find(w => w.id === activeWorkflowId) || workflows[0];

  return (
    <section id="workflows" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFEDD5] border border-[#FDBA74] text-xs font-black text-[#C2410C] mb-3">
            <Workflow className="w-3.5 h-3.5 text-[#C2410C]" />
            <span className="uppercase tracking-wider">Suggested paths</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A2540] tracking-tight">Suggested paths</h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-2 font-medium">Open two or three tools in order. Each tool still runs in this tab.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        {workflows.map((wf) => {
          const Icon = wf.icon;
          const isActive = wf.id === activeWorkflowId;
          return (
            <button
              key={wf.id}
              onClick={() => setActiveWorkflowId(wf.id)}
              className={`p-4 rounded-3xl text-left border transition-all cursor-pointer flex items-center gap-3.5 ${
                isActive
                  ? 'bg-white border-[#EA580C] shadow-[0_4px_20px_rgba(234,88,12,0.12)] ring-2 ring-[#EA580C]/20'
                  : 'bg-[#FFF7ED] border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className={`p-2.5 rounded-2xl shrink-0 ${
                isActive ? 'bg-[#FFEDD5] text-[#C2410C] border border-[#FDBA74]' : 'bg-white text-slate-600 border border-slate-200'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-black truncate ${isActive ? 'text-[#0A2540]' : 'text-slate-700'}`}>{wf.shortTitle}</p>
                <p className="text-[10px] text-slate-600 font-mono font-medium truncate">{wf.badge}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-[0_4px_20px_rgba(10,37,64,0.04)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#FFEDD5] text-[#C2410C] border border-[#FDBA74]">{activeWorkflow.badge}</span>
              <span className="text-xs text-slate-600 font-medium">3 tools in this tab</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0A2540]">{activeWorkflow.title}</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium max-w-2xl">{activeWorkflow.description}</p>
          </div>
          <Link
            to={activeWorkflow.primaryAction.route}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#F97316] hover:to-[#EA580C] text-white text-xs font-black shadow-lg shadow-orange-500/20 transition-all shrink-0 self-start lg:self-center"
          >
            <span>{activeWorkflow.primaryAction.label}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 relative">
          {activeWorkflow.steps.map((step) => (
            <Link
              key={step.name}
              to={step.route}
              className="group p-5 rounded-2xl bg-[#FFF7ED] border border-slate-200/80 hover:bg-white hover:border-[#EA580C] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200 group-hover:border-[#EA580C] group-hover:text-[#C2410C]">{step.tag}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[#C2410C] group-hover:translate-x-0.5 transition-all" />
                </div>
                <h4 className="text-sm font-black text-[#0A2540] group-hover:text-[#C2410C] transition-colors mb-1">{step.name}</h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{step.action}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-[#C2410C] font-bold">
                <span>Open tool</span>
                <span className="font-mono text-slate-600">In this tab</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
