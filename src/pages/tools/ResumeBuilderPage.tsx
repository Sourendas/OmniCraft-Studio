import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Plus, Trash2, Download, ArrowLeft, Eye, Edit3 } from 'lucide-react';
import { ResumeData } from '../../types';
import { AdBanner } from '../../components/layout/AdBanner';
import { downloadResumePdf, RESUME_TEMPLATES, ResumeTemplateId } from '../../lib/resumePdf';
import { LiveResumePreview, TemplatePicker } from '../../components/resume/TemplatePicker';

const STORAGE_KEY = 'ftk_resume_v1';
const ACTION_VERBS = /^(built|led|shipped|improved|designed|created|developed|managed|migrated|mentored|added|implemented|owned|launched|reduced|increased)\b/i;

const SAMPLE: ResumeData = {
  fullName: 'Alex Mercer',
  jobTitle: 'Senior Full Stack Engineer',
  email: 'alex.mercer@devmail.io',
  phone: '+1 (555) 234-8901',
  location: 'San Francisco, CA',
  linkedin: 'linkedin.com/in/alex-mercer',
  github: 'github.com/alexmercer',
  website: 'alexmercer.dev',
  summary:
    'Full-stack engineer with 6+ years building React applications and in-browser utilities. Focused on TypeScript, performance, and shipping tools that run on the client.',
  experience: [
    {
      id: '1',
      company: 'Vanguard Cloud Systems',
      position: 'Staff Frontend Engineer',
      startDate: '2022',
      endDate: 'Present',
      current: true,
      location: 'San Francisco, CA',
      bullets: [
        'Built client-side document tools in the browser, reducing server compute costs.',
        'Migrated a legacy application to React 19 and Vite.',
        'Mentored 8 engineers on TypeScript and testing.'
      ]
    },
    {
      id: '2',
      company: 'Apex Digital Labs',
      position: 'Software Engineer',
      startDate: '2019',
      endDate: '2022',
      current: false,
      location: 'Austin, TX',
      bullets: [
        'Designed shared UI components used by 14 teams.',
        'Added offline-first caching with IndexedDB.'
      ]
    }
  ],
  education: [
    {
      id: '1',
      school: 'University of California, Berkeley',
      degree: 'B.S. in Computer Science',
      field: 'Software Engineering',
      graduationYear: '2019',
      gpa: '3.89'
    }
  ],
  skills: ['TypeScript', 'React 19', 'Vite', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
  certifications: [],
  targetJobDescription: 'Senior Software Engineer with TypeScript, React, and modern frontend architecture.'
};

const field =
  'w-full px-3 py-2.5 rounded-xl bg-[#F4F8FA] border border-slate-200 text-sm text-[#0A2540]';

export const ResumeBuilderPage: React.FC = () => {
  const [tab, setTab] = useState<'edit' | 'preview'>('edit');
  const [template, setTemplate] = useState<ResumeTemplateId>('modern');
  const [data, setData] = useState<ResumeData>(SAMPLE);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { data?: ResumeData; template?: ResumeTemplateId };
        if (parsed.data?.fullName) setData({ ...SAMPLE, ...parsed.data });
        if (parsed.template && RESUME_TEMPLATES.some((t) => t.id === parsed.template)) setTemplate(parsed.template);
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ data, template }));
    } catch {
      /* ignore */
    }
  }, [data, template]);

  const overlap = useMemo(() => {
    if (!data.targetJobDescription.trim()) return { score: 0, matched: [] as string[], missing: [] as string[] };
    const job = data.targetJobDescription.toLowerCase();
    const keys = ['react', 'typescript', 'javascript', 'node.js', 'python', 'sql', 'docker', 'frontend', 'backend', 'full stack', 'performance', 'architecture', 'api', 'testing', 'vite'];
    const wanted = keys.filter((k) => job.includes(k));
    const hay = [data.jobTitle, data.summary, ...data.skills, ...data.experience.flatMap((e) => [e.company, e.position, ...e.bullets])].join(' ').toLowerCase();
    const matched = wanted.filter((k) => hay.includes(k));
    const missing = wanted.filter((k) => !hay.includes(k));
    const score = wanted.length ? Math.round((matched.length / wanted.length) * 100) : 0;
    return { score, matched, missing };
  }, [data]);

  const patch = (partial: Partial<ResumeData>) => setData((prev) => ({ ...prev, ...partial }));

  const rewriteBullet = (expId: string, idx: number, text: string) => {
    const body = text.trim().replace(/^[\u2022\-*]\s*/, '');
    if (ACTION_VERBS.test(body)) return;
    const stripped = body.replace(/^(i\s+|we\s+)?(was\s+responsible\s+for|responsible\s+for|worked\s+on|helped\s+with)\s+/i, '');
    const verbs = ['Built', 'Led', 'Shipped', 'Improved', 'Designed'];
    const verb = verbs[(text.length + idx) % verbs.length];
    let next = `${verb} ${stripped.charAt(0).toLowerCase()}${stripped.slice(1)}`;
    if (!next.endsWith('.')) next += '.';
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((e) => {
        if (e.id !== expId) return e;
        const bullets = [...e.bullets];
        bullets[idx] = next;
        return { ...e, bullets };
      })
    }));
  };

  const handleDownload = () => downloadResumePdf(data, template);
  const contacts = [data.email, data.phone, data.location, data.linkedin, data.github, data.website].filter(Boolean).join(' · ');
  const currentName = RESUME_TEMPLATES.find((t) => t.id === template)?.name || 'Modern Teal';

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 min-w-0">
      <div className="flex flex-col gap-4 pb-5 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs font-mono text-[#007A82] mb-1 font-bold">
              <Link to="/" className="text-slate-500 hover:text-[#00A3AD] flex items-center gap-1">
                <ArrowLeft className="w-3.5 h-3.5" /> All Tools
              </Link>
              <span>/</span>
              <span>Documents</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] flex items-center gap-2.5">
              <FileText className="w-7 h-7 text-[#00A3AD] shrink-0" /> Resume Builder
            </h1>
            <p className="text-sm text-slate-600 mt-1 font-medium">
              12 layouts. Pick one, fill the form, download a PDF. Keyword overlap is local, not an ATS. Rewrite is a local verb helper.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <div className="flex bg-white border border-slate-200 rounded-full p-1">
              <button onClick={() => setTab('edit')} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold ${tab === 'edit' ? 'bg-[#00A3AD] text-white' : 'text-slate-600'}`}>
                <Edit3 className="w-3.5 h-3.5" /> Editor
              </button>
              <button onClick={() => setTab('preview')} className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold ${tab === 'preview' ? 'bg-[#00A3AD] text-white' : 'text-slate-600'}`}>
                <Eye className="w-3.5 h-3.5" /> Preview
              </button>
            </div>
            <button id="download-resume-pdf-btn" type="button" onClick={handleDownload} className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00A3AD] to-[#008C95] text-white text-sm font-black min-h-11">
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>
        <TemplatePicker value={template} onChange={setTemplate} />
      </div>

      <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
        PDF uses the current form and the selected template. Empty fields are skipped. Fonts are Helvetica or Times (built into the PDF, no extra download).
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-start">
        <div className={`lg:col-span-7 space-y-5 ${tab === 'preview' ? 'hidden lg:block' : ''}`}>
          <section className="rounded-3xl bg-white border border-slate-200 p-5 space-y-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#007A82]">Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="text-xs font-bold">Full name<input className={field} value={data.fullName} onChange={(e) => patch({ fullName: e.target.value })} /></label>
              <label className="text-xs font-bold">Job title<input className={field} value={data.jobTitle} onChange={(e) => patch({ jobTitle: e.target.value })} /></label>
              <label className="text-xs font-bold">Email<input className={field} value={data.email} onChange={(e) => patch({ email: e.target.value })} /></label>
              <label className="text-xs font-bold">Phone<input className={field} value={data.phone} onChange={(e) => patch({ phone: e.target.value })} /></label>
              <label className="text-xs font-bold">Location<input className={field} value={data.location} onChange={(e) => patch({ location: e.target.value })} /></label>
              <label className="text-xs font-bold">LinkedIn<input className={field} value={data.linkedin} onChange={(e) => patch({ linkedin: e.target.value })} /></label>
              <label className="text-xs font-bold">GitHub<input className={field} value={data.github} onChange={(e) => patch({ github: e.target.value })} /></label>
              <label className="text-xs font-bold">Website<input className={field} value={data.website} onChange={(e) => patch({ website: e.target.value })} /></label>
            </div>
          </section>

          <section className="rounded-3xl bg-white border border-slate-200 p-5">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#007A82] mb-2">Summary</h2>
            <textarea rows={5} className={field} value={data.summary} onChange={(e) => patch({ summary: e.target.value })} />
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#007A82]">Experience</h2>
              <button type="button" onClick={() => setData((prev) => ({ ...prev, experience: [{ id: Date.now().toString(), company: '', position: '', startDate: '', endDate: '', current: false, location: '', bullets: [''] }, ...prev.experience] }))} className="text-xs font-bold text-[#007A82] flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add role
              </button>
            </div>
            {data.experience.map((exp) => (
              <div key={exp.id} className="rounded-3xl bg-white border border-slate-200 p-5 space-y-3">
                <div className="flex justify-between gap-2">
                  <input className={`${field} font-bold`} placeholder="Job title" value={exp.position} onChange={(e) => setData((p) => ({ ...p, experience: p.experience.map((x) => (x.id === exp.id ? { ...x, position: e.target.value } : x)) }))} />
                  <button type="button" onClick={() => setData((p) => ({ ...p, experience: p.experience.filter((x) => x.id !== exp.id) }))} aria-label="Remove role"><Trash2 className="w-4 h-4 text-rose-500" /></button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input className={field} placeholder="Company" value={exp.company} onChange={(e) => setData((p) => ({ ...p, experience: p.experience.map((x) => (x.id === exp.id ? { ...x, company: e.target.value } : x)) }))} />
                  <input className={field} placeholder="Location" value={exp.location} onChange={(e) => setData((p) => ({ ...p, experience: p.experience.map((x) => (x.id === exp.id ? { ...x, location: e.target.value } : x)) }))} />
                  <input className={field} placeholder="Start (e.g. 2022)" value={exp.startDate} onChange={(e) => setData((p) => ({ ...p, experience: p.experience.map((x) => (x.id === exp.id ? { ...x, startDate: e.target.value } : x)) }))} />
                  <input className={field} placeholder="End" disabled={exp.current} value={exp.current ? 'Present' : exp.endDate} onChange={(e) => setData((p) => ({ ...p, experience: p.experience.map((x) => (x.id === exp.id ? { ...x, endDate: e.target.value } : x)) }))} />
                </div>
                <label className="flex items-center gap-2 text-xs font-bold text-slate-600">
                  <input type="checkbox" checked={exp.current} onChange={(e) => setData((p) => ({ ...p, experience: p.experience.map((x) => (x.id === exp.id ? { ...x, current: e.target.checked } : x)) }))} /> Current role
                </label>
                {exp.bullets.map((b, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <textarea rows={2} className={field} value={b} onChange={(e) => setData((p) => ({ ...p, experience: p.experience.map((x) => { if (x.id !== exp.id) return x; const bullets = [...x.bullets]; bullets[i] = e.target.value; return { ...x, bullets }; }) }))} />
                    <button type="button" onClick={() => rewriteBullet(exp.id, i, b)} className="text-[10px] font-bold text-[#007A82] shrink-0 pt-2">Rewrite</button>
                    <button type="button" onClick={() => setData((p) => ({ ...p, experience: p.experience.map((x) => (x.id === exp.id ? { ...x, bullets: x.bullets.filter((_, j) => j !== i) } : x)) }))} className="pt-2" aria-label="Remove bullet"><Trash2 className="w-3.5 h-3.5 text-slate-400" /></button>
                  </div>
                ))}
                <button type="button" onClick={() => setData((p) => ({ ...p, experience: p.experience.map((x) => (x.id === exp.id ? { ...x, bullets: [...x.bullets, ''] } : x)) }))} className="text-[11px] font-bold text-slate-500">Add bullet</button>
              </div>
            ))}
          </section>

          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#007A82]">Education</h2>
              <button type="button" onClick={() => setData((p) => ({ ...p, education: [...p.education, { id: Date.now().toString(), school: '', degree: '', field: '', graduationYear: '', gpa: '' }] }))} className="text-xs font-bold text-[#007A82] flex items-center gap-1">
                <Plus className="w-3.5 h-3.5" /> Add school
              </button>
            </div>
            {data.education.map((edu) => (
              <div key={edu.id} className="rounded-3xl bg-white border border-slate-200 p-5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <input className={field} placeholder="School" value={edu.school} onChange={(e) => setData((p) => ({ ...p, education: p.education.map((x) => (x.id === edu.id ? { ...x, school: e.target.value } : x)) }))} />
                <input className={field} placeholder="Degree" value={edu.degree} onChange={(e) => setData((p) => ({ ...p, education: p.education.map((x) => (x.id === edu.id ? { ...x, degree: e.target.value } : x)) }))} />
                <input className={field} placeholder="Field" value={edu.field} onChange={(e) => setData((p) => ({ ...p, education: p.education.map((x) => (x.id === edu.id ? { ...x, field: e.target.value } : x)) }))} />
                <input className={field} placeholder="Year" value={edu.graduationYear} onChange={(e) => setData((p) => ({ ...p, education: p.education.map((x) => (x.id === edu.id ? { ...x, graduationYear: e.target.value } : x)) }))} />
                <input className={field} placeholder="GPA (optional)" value={edu.gpa || ''} onChange={(e) => setData((p) => ({ ...p, education: p.education.map((x) => (x.id === edu.id ? { ...x, gpa: e.target.value } : x)) }))} />
                <button type="button" className="text-xs font-bold text-rose-600" onClick={() => setData((p) => ({ ...p, education: p.education.filter((x) => x.id !== edu.id) }))}>Remove</button>
              </div>
            ))}
          </section>

          <section className="rounded-3xl bg-white border border-slate-200 p-5 space-y-3">
            <h2 className="text-xs font-black uppercase tracking-wider text-[#007A82]">Skills & certifications</h2>
            <label className="text-xs font-bold block">Skills (comma separated)<input className={field} value={data.skills.join(', ')} onChange={(e) => patch({ skills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} /></label>
            <label className="text-xs font-bold block">Certifications (comma separated)<input className={field} value={data.certifications.join(', ')} onChange={(e) => patch({ certifications: e.target.value.split(',').map((s) => s.trim()).filter(Boolean) })} /></label>
          </section>

          <section className="rounded-3xl bg-white border border-slate-200 p-5 space-y-3">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xs font-black uppercase tracking-wider text-[#007A82]">Keyword overlap (optional)</h2>
              <span className="text-sm font-black text-[#007A82]">{overlap.score}%</span>
            </div>
            <textarea rows={5} className={field} placeholder="Paste a job description to see local keyword overlap" value={data.targetJobDescription} onChange={(e) => patch({ targetJobDescription: e.target.value })} />
            <p className="text-[11px] text-slate-500 font-medium">{overlap.matched.length} matched · {overlap.missing.length} missing. Not an employer ATS.</p>
          </section>

          <button type="button" onClick={handleDownload} className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#00A3AD] to-[#008C95] text-white text-sm font-black min-h-12">
            <Download className="w-4 h-4" /> Download {currentName} PDF
          </button>
          <AdBanner type="in-content" />
        </div>

        <div className={`lg:col-span-5 ${tab === 'edit' ? 'hidden lg:block' : ''}`}>
          <LiveResumePreview template={template} name={data.fullName} title={data.jobTitle} contacts={contacts} summary={data.summary}>
            {data.experience.length > 0 && (
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-wider text-[#007A82] mb-1">Experience</h3>
                {data.experience.map((exp) => (
                  <div key={exp.id} className="mt-2">
                    <div className="flex justify-between gap-2 font-bold">
                      <span>{exp.position}</span>
                      <span className="text-slate-500 font-normal shrink-0">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                    </div>
                    <p className="text-slate-500 italic">{[exp.company, exp.location].filter(Boolean).join(' · ')}</p>
                    <ul className="list-disc ml-4 mt-1 space-y-0.5">{exp.bullets.filter(Boolean).map((b, i) => <li key={i}>{b}</li>)}</ul>
                  </div>
                ))}
              </div>
            )}
            {data.education.length > 0 && (
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-wider text-[#007A82] mb-1">Education</h3>
                {data.education.map((edu) => (
                  <div key={edu.id} className="mt-1">
                    <div className="flex justify-between gap-2 font-bold"><span>{[edu.degree, edu.field].filter(Boolean).join(' — ')}</span><span className="font-normal text-slate-500">{edu.graduationYear}</span></div>
                    <p className="text-slate-500 italic">{edu.school}{edu.gpa ? ` · GPA ${edu.gpa}` : ''}</p>
                  </div>
                ))}
              </div>
            )}
            {data.skills.length > 0 && template !== 'sidebar' && (
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-wider text-[#007A82] mb-1">Skills</h3>
                <p>{data.skills.join(' · ')}</p>
              </div>
            )}
            {data.certifications.length > 0 && (
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-wider text-[#007A82] mb-1">Certifications</h3>
                <p>{data.certifications.join(' · ')}</p>
              </div>
            )}
          </LiveResumePreview>
          <button type="button" onClick={handleDownload} className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#00A3AD] text-white text-sm font-black">
            <Download className="w-4 h-4" /> Download {currentName} PDF
          </button>
        </div>
      </div>
    </div>
  );
};
