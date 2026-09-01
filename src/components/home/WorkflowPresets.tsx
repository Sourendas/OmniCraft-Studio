import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Workflow, 
  ArrowRight, 
  Code2, 
  Briefcase, 
  Palette, 
  Globe2, 
  Check, 
  Layers,
  Sparkles,
  Zap
} from 'lucide-react';

interface WorkflowPipeline {
  id: string;
  title: string;
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
      title: 'Executive & Career Application Suite',
      badge: 'Document & Career',
      icon: Briefcase,
      description: 'End-to-end applicant tracking optimization, document redaction, and executive PDF production pipeline.',
      steps: [
        {
          name: 'ATS AI Resume Builder',
          route: '/resume-builder',
          action: 'Scan job description & score ATS match density',
          tag: 'Step 1'
        },
        {
          name: 'PDF Power Suite',
          route: '/pdf-suite',
          action: 'Merge portfolios, rotate certificates & add watermark',
          tag: 'Step 2'
        },
        {
          name: 'Universal File Converter',
          route: '/file-converter',
          action: 'Transcode cover letters to pristine Letter PDF',
          tag: 'Step 3'
        }
      ],
      primaryAction: {
        label: 'Launch Resume Optimizer',
        route: '/resume-builder'
      }
    },
    {
      id: 'developer-data',
      title: 'Full-Stack Engineering & Code Ops',
      badge: 'Developer & CodeOps',
      icon: Code2,
      description: 'In-browser code diff comparison, cryptographic hash verification, and instant schema transformation without telemetry.',
      steps: [
        {
          name: 'Text Diff & Code Comparator',
          route: '/text-diff',
          action: 'Compare pull request diffs & export unified patches',
          tag: 'Step 1'
        },
        {
          name: 'Dev Utility Workbench',
          route: '/dev-tools',
          action: 'Format JSON/SQL, test RegEx & calculate SHA-256',
          tag: 'Step 2'
        },
        {
          name: 'Markdown & Rich Doc Editor',
          route: '/markdown-editor',
          action: 'Draft release specs & export formatted HTML/MD',
          tag: 'Step 3'
        }
      ],
      primaryAction: {
        label: 'Launch Text Diff Tool',
        route: '/text-diff'
      }
    },
    {
      id: 'creative-marketing',
      title: 'Vector Design & Brand Asset Pipeline',
      badge: 'Design & Visual',
      icon: Palette,
      description: 'SVG editing, canvas image compression, and branded QR export.',
      steps: [
        {
          name: 'SVG & Vector Icon Studio',
          route: '/svg-editor',
          action: 'Recolor SVG vectors & export React TSX components',
          tag: 'Step 1'
        },
        {
          name: 'Smart Image Optimizer',
          route: '/image-optimizer',
          action: 'Compress marketing assets in WebP / JPEG / PNG',
          tag: 'Step 2'
        },
        {
          name: 'Custom Branded QR Studio',
          route: '/qr-generator',
          action: 'Export vector QR codes with gradients & logos',
          tag: 'Step 3'
        }
      ],
      primaryAction: {
        label: 'Launch SVG Studio',
        route: '/svg-editor'
      }
    },
    {
      id: 'global-commerce',
      title: 'Global Commerce & Operations Stack',
      badge: 'Fintech & Productivity',
      icon: Globe2,
      description: 'Example FX worksheet, Unicode captions, and BMR estimates (not medical advice).',
      steps: [
        {
          name: 'Reference FX Worksheet',
          route: '/currency-crypto',
          action: 'Apply example rates and hypothetical remittance fees',
          tag: 'Step 1'
        },
        {
          name: 'Social Studio & Typography',
          route: '/social-studio',
          action: 'Format social headlines & viral unicode captions',
          tag: 'Step 2'
        },
        {
          name: 'Health & Macro Nutrition Engine',
          route: '/health-calc',
          action: 'Calculate BMR, TDEE, and optimal energy splits',
          tag: 'Step 3'
        }
      ],
      primaryAction: {
        label: 'Launch FX Matrix',
        route: '/currency-crypto'
      }
    }
  ];

  const [activeWorkflowId, setActiveWorkflowId] = useState('executive-career');
  const activeWorkflow = workflows.find(w => w.id === activeWorkflowId) || workflows[0];

  return (
    <section id="workflows" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] text-xs font-black text-[#007A82] mb-3">
            <Workflow className="w-3.5 h-3.5 text-[#00A3AD]" />
            <span className="uppercase tracking-wider">Productivity Pipelines</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0A2540] tracking-tight">
            Curated Professional Workflows
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl mt-2 font-medium">
            Connect multiple 100% client-side tools into streamlined workflows for development, design, documents, and operations.
          </p>
        </div>
      </div>

      {/* Workflow Navigation Pills */}
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
                  ? 'bg-white border-[#00A3AD] shadow-[0_4px_20px_rgba(0,163,173,0.12)] ring-2 ring-[#00A3AD]/20'
                  : 'bg-[#F8FBFC] border-slate-200 hover:bg-white hover:border-slate-300'
              }`}
            >
              <div className={`p-2.5 rounded-2xl shrink-0 ${
                isActive ? 'bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF]' : 'bg-white text-slate-500 border border-slate-200'
              }`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h4 className={`text-xs font-black truncate ${isActive ? 'text-[#0A2540]' : 'text-slate-700'}`}>
                  {wf.title.split(' ')[0]} {wf.title.split(' ')[1]}
                </h4>
                <p className="text-[10px] text-slate-500 font-mono font-medium truncate">{wf.badge}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Workflow Blueprint Card */}
      <div className="rounded-3xl bg-white border border-slate-200/90 p-6 sm:p-8 shadow-[0_4px_20px_rgba(10,37,64,0.04)]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF]">
                {activeWorkflow.badge}
              </span>
              <span className="text-xs text-slate-400 font-medium">• 3 Linked In-Browser Stages</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#0A2540]">
              {activeWorkflow.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium max-w-2xl">
              {activeWorkflow.description}
            </p>
          </div>

          <Link
            to={activeWorkflow.primaryAction.route}
            className="flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#00A3AD] to-[#008C95] hover:from-[#00B5B8] hover:to-[#00A3AD] text-white text-xs font-black shadow-lg shadow-teal-500/20 transition-all shrink-0 self-start lg:self-center"
          >
            <span>{activeWorkflow.primaryAction.label}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3 Steps Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 relative">
          {activeWorkflow.steps.map((step) => (
            <Link
              key={step.name}
              to={step.route}
              className="group p-5 rounded-2xl bg-[#F8FBFC] border border-slate-200/80 hover:bg-white hover:border-[#00A3AD] hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white text-slate-600 border border-slate-200 group-hover:border-[#00A3AD] group-hover:text-[#007A82]">
                    {step.tag}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#00A3AD] group-hover:translate-x-0.5 transition-all" />
                </div>
                <h4 className="text-sm font-black text-[#0A2540] group-hover:text-[#007A82] transition-colors mb-1">
                  {step.name}
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  {step.action}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-[#007A82] font-bold">
                <span>Launch Tool</span>
                <span className="font-mono text-slate-400">100% Local</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
