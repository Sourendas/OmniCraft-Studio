import React, { useMemo, useState } from 'react';
import { Check, ChevronDown, LayoutTemplate, X } from 'lucide-react';
import { RESUME_TEMPLATES, ResumeTemplateId, ResumeTemplateMeta } from '../../lib/resumePdf';

function Thumb({ t, selected }: { t: ResumeTemplateMeta; selected: boolean }) {
  const isSidebar = t.id === 'sidebar';
  const isBanner = t.id === 'banner' || t.id === 'executive' || t.id === 'slate';
  return (
    <div className={`relative h-36 w-full overflow-hidden rounded-xl border bg-white ${
      selected ? 'border-[#00A3AD] ring-2 ring-[#00A3AD]/30' : 'border-slate-200'
    }`}>
      {t.id === 'modern' && <div className="absolute inset-y-0 left-0 w-1.5" style={{ background: t.accent }} />}
      {isSidebar && <div className="absolute inset-y-0 left-0 w-[32%]" style={{ background: t.header }} />}
      {isBanner && <div className="absolute inset-x-0 top-0 h-9" style={{ background: t.header }} />}
      {t.id === 'timeline' && <div className="absolute top-10 bottom-3 left-6 w-px" style={{ background: t.accent }} />}
      <div className={`absolute ${isSidebar ? 'left-[38%] right-2' : 'left-3 right-3'} ${isBanner ? 'top-11' : 'top-3'}`}>
        <div className={`h-2 w-16 rounded-sm ${t.id === 'classic' || t.id === 'elegant' || t.id === 'ivy' ? 'mx-auto' : ''}`} style={{ background: isBanner ? '#fff' : t.ink }} />
        <div className={`mt-1 h-1.5 w-12 rounded-sm ${t.id === 'classic' || t.id === 'elegant' || t.id === 'ivy' ? 'mx-auto' : ''}`} style={{ background: t.accent }} />
        <div className="mt-3 space-y-1.5">
          <div className="h-1 w-10 rounded-sm" style={{ background: t.accent }} />
          <div className="h-1 w-full rounded-sm bg-slate-200" />
          <div className="h-1 w-5/6 rounded-sm bg-slate-200" />
          <div className="h-1 w-10 rounded-sm mt-2" style={{ background: t.accent }} />
          <div className="h-1 w-full rounded-sm bg-slate-200" />
          <div className="h-1 w-2/3 rounded-sm bg-slate-200" />
        </div>
      </div>
      {selected && (
        <span className="absolute bottom-1.5 right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#00A3AD] text-white">
          <Check className="h-3 w-3" />
        </span>
      )}
    </div>
  );
}

export const TemplatePicker: React.FC<{
  value: ResumeTemplateId;
  onChange: (id: ResumeTemplateId) => void;
}> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const current = useMemo(() => RESUME_TEMPLATES.find((t) => t.id === value) || RESUME_TEMPLATES[0], [value]);
  const groups = ['Traditional', 'Contemporary', 'Layout'] as const;

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
        <label className="text-xs font-black uppercase tracking-wider text-[#007A82] shrink-0">Template</label>
        <div className="relative flex-1 min-w-0">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value as ResumeTemplateId)}
            className="w-full appearance-none rounded-full border border-slate-200 bg-white py-2.5 pl-4 pr-10 text-sm font-bold text-[#0A2540]"
            aria-label="Resume template"
          >
            {RESUME_TEMPLATES.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name} — {t.blurb}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-[#0A2540] min-h-11"
        >
          <LayoutTemplate className="h-4 w-4 text-[#00A3AD]" /> Preview templates
        </button>
      </div>
      <p className="text-[11px] text-slate-500 font-medium">{current.name}: {current.blurb} Live preview on the right uses this layout. PDF matches the selected template.</p>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0A2540]/50 p-0 sm:p-4" onClick={() => setOpen(false)}>
          <div className="relative w-full max-w-4xl max-h-[92dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-white p-5 sm:p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-3 mb-4">
              <div>
                <h2 className="text-lg font-black text-[#0A2540]">Choose a template</h2>
                <p className="text-xs text-slate-600 mt-1">12 layouts. Click one to apply it to the live preview and PDF.</p>
              </div>
              <button type="button" onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-slate-100" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
            </div>
            {groups.map((g) => (
              <div key={g} className="mb-5">
                <h3 className="text-[10px] font-black uppercase tracking-wider text-[#007A82] mb-2">{g}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {RESUME_TEMPLATES.filter((t) => t.group === g).map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => {
                        onChange(t.id);
                        setOpen(false);
                      }}
                      className="text-left"
                    >
                      <Thumb t={t} selected={value === t.id} />
                      <div className="mt-1.5 text-xs font-black text-[#0A2540]">{t.name}</div>
                      <div className="text-[10px] text-slate-500 leading-snug">{t.blurb}</div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export const LiveResumePreview: React.FC<{
  template: ResumeTemplateId;
  name: string;
  title: string;
  contacts: string;
  summary: string;
  children: React.ReactNode;
}> = ({ template, name, title, contacts, summary, children }) => {
  const t = RESUME_TEMPLATES.find((x) => x.id === template) || RESUME_TEMPLATES[0];
  const sidebar = template === 'sidebar';
  const banner = template === 'banner' || template === 'executive' || template === 'slate';
  const centered = template === 'classic' || template === 'elegant' || template === 'ivy';
  const serif = template === 'classic' || template === 'elegant' || template === 'ivy';

  return (
    <div className={`sticky top-20 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm ${template === 'modern' ? 'border-l-4' : ''}`} style={template === 'modern' ? { borderLeftColor: t.accent } : undefined}>
      <div className={`flex min-h-[28rem] ${sidebar ? 'flex-row' : 'flex-col'}`}>
        {sidebar && (
          <aside className="w-[34%] p-4 text-white" style={{ background: t.header }}>
            <p className="text-sm font-black leading-tight">{name || 'Your name'}</p>
            <p className="text-[10px] mt-1 font-bold" style={{ color: t.accent }}>{title}</p>
            <p className="text-[9px] mt-3 leading-relaxed text-white/80">{contacts}</p>
          </aside>
        )}
        <div className="flex-1 min-w-0">
          {banner && (
            <div className="px-5 py-4 text-white" style={{ background: t.header }}>
              <p className="text-xl font-black">{name || 'Your name'}</p>
              <p className="text-xs font-bold mt-0.5" style={{ color: template === 'executive' ? t.accent : '#e2e8f0' }}>{title}</p>
              <p className="text-[10px] mt-2 text-white/80">{contacts}</p>
            </div>
          )}
          {!banner && !sidebar && (
            <div className={`px-6 pt-6 pb-3 border-b ${centered ? 'text-center' : ''}`} style={{ borderColor: t.accent, fontFamily: serif ? 'Georgia, Times, serif' : undefined }}>
              <p className={`${template === 'editorial' || template === 'swiss' ? 'text-2xl' : 'text-xl'} font-black text-[#0A2540]`}>{name || 'Your name'}</p>
              {template === 'editorial' && <div className="mt-2 h-0.5 w-12" style={{ background: t.accent }} />}
              <p className="text-sm font-bold mt-1" style={{ color: t.accent }}>{title}</p>
              <p className="text-[11px] text-slate-500 mt-2">{contacts}</p>
            </div>
          )}
          <div className="px-5 py-4 space-y-3 text-[12px] text-[#0A2540] max-h-[62vh] overflow-y-auto" style={{ fontFamily: serif ? 'Georgia, Times, serif' : undefined }}>
            {summary && (
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-wider mb-1" style={{ color: t.accent }}>Summary</h3>
                <p className="leading-relaxed">{summary}</p>
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
