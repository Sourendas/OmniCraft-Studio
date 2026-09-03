import React, { useState, useMemo } from 'react';
import { AdBanner } from '../../components/layout/AdBanner';
import { jsPDF } from 'jspdf';
import { FileText, Plus, Trash2, Download, ArrowLeft, Eye, Edit3 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResumeData } from '../../types';

export const ResumeBuilderPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isEnhancingBullet, setIsEnhancingBullet] = useState<string | null>(null);

  const [resumeData, setResumeData] = useState<ResumeData>({
    fullName: 'Alex Mercer',
    jobTitle: 'Senior Full Stack & AI Applications Engineer',
    email: 'alex.mercer@devmail.io',
    phone: '+1 (555) 234-8901',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/alex-mercer',
    github: 'github.com/alexmercer',
    website: 'alexmercer.dev',
    summary: 'Full-stack software engineer with 6+ years of experience building React applications and browser utilities.',
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
          'Migrated a legacy app to React 19 and Vite.',
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
      { id: '1', school: 'University of California, Berkeley', degree: 'B.S. in Computer Science', field: 'Software Engineering', graduationYear: '2019', gpa: '3.89' }
    ],
    skills: ['TypeScript', 'React 19', 'Vite', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
    certifications: [],
    targetJobDescription: 'Looking for a Senior Software Engineer with TypeScript, React, and modern frontend architecture.'
  });

  const steps = [
    { title: 'Personal Info', desc: 'Contact & Links' },
    { title: 'Summary', desc: 'Pitch' },
    { title: 'Experience', desc: 'Work History' },
    { title: 'Education & Skills', desc: 'Qualifications' },
    { title: 'Keyword overlap', desc: 'Local match' }
  ];

  const atsAnalysis = useMemo(() => {
    if (!resumeData.targetJobDescription.trim()) {
      return { score: 0, matched: [] as string[], missing: [] as string[], density: 'No JD' };
    }
    const jobText = resumeData.targetJobDescription.toLowerCase();
    const commonKeywords = ['react', 'typescript', 'javascript', 'node.js', 'python', 'sql', 'docker', 'frontend', 'backend', 'full stack', 'performance', 'architecture', 'api', 'testing', 'vite'];
    const targetKeywords = commonKeywords.filter(kw => jobText.includes(kw));
    const fullResumeText = [resumeData.fullName, resumeData.jobTitle, resumeData.summary, ...resumeData.skills, ...resumeData.experience.flatMap(e => [e.company, e.position, ...e.bullets]), ...resumeData.education.map(ed => `${ed.degree} ${ed.field}`)].join(' ').toLowerCase();
    const matched = targetKeywords.filter(kw => fullResumeText.includes(kw));
    const missing = targetKeywords.filter(kw => !fullResumeText.includes(kw));
    const score = targetKeywords.length > 0 ? Math.round((matched.length / targetKeywords.length) * 100) : 0;
    return { score, matched, missing, density: score > 80 ? 'High overlap' : score > 60 ? 'Moderate' : 'Low' };
  }, [resumeData]);

  const enhanceBullet = (expId: string, bulletIdx: number, currentText: string) => {
    const key = `${expId}-${bulletIdx}`;
    setIsEnhancingBullet(key);
    setTimeout(() => {
      const cleanBody = currentText.trim().replace(/^[\u2022\-\*]\s*/, '').replace(/^(i\s+|we\s+)?(was\s+responsible\s+for|responsible\s+for|worked\s+on|helped\s+with|built|developed|managed|created)\s+/i, '');
      const verbs = ['Built', 'Led', 'Shipped', 'Improved', 'Designed'];
      const chosen = verbs[(currentText.length + bulletIdx) % verbs.length];
      let enhanced = `${chosen} ${cleanBody.charAt(0).toLowerCase() + cleanBody.slice(1)}`;
      if (!enhanced.endsWith('.')) enhanced += '.';
      updateBullet(expId, bulletIdx, enhanced);
      setIsEnhancingBullet(null);
    }, 150);
  };

  const updateBullet = (expId: string, bulletIdx: number, newText: string) => {
    setResumeData(prev => ({ ...prev, experience: prev.experience.map(exp => {
      if (exp.id !== expId) return exp;
      const newBullets = [...exp.bullets];
      newBullets[bulletIdx] = newText;
      return { ...exp, bullets: newBullets };
    })}));
  };

  const addBullet = (expId: string) => setResumeData(prev => ({ ...prev, experience: prev.experience.map(exp => exp.id !== expId ? exp : { ...exp, bullets: [...exp.bullets, 'Shipped a project that improved delivery time.'] }) }));
  const removeBullet = (expId: string, bulletIdx: number) => setResumeData(prev => ({ ...prev, experience: prev.experience.map(exp => exp.id !== expId ? exp : { ...exp, bullets: exp.bullets.filter((_, idx) => idx !== bulletIdx) }) }));
  const addExperience = () => setResumeData(prev => ({ ...prev, experience: [{ id: Date.now().toString(), company: 'New Company', position: 'Engineer', startDate: '2023', endDate: '2024', current: false, location: 'Remote', bullets: ['Delivered a core feature.'] }, ...prev.experience] }));
  const removeExperience = (id: string) => setResumeData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));

  const handleDownloadPdf = () => {
    const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter' });
    const margin = 40;
    let y = 45;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(20, 24, 33);
    doc.text(resumeData.fullName.toUpperCase(), margin, y);
    y += 18;
    doc.setFontSize(11);
    doc.setTextColor(60, 70, 90);
    doc.text(resumeData.jobTitle, margin, y);
    y += 14;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(90, 100, 120);
    doc.text([resumeData.email, resumeData.phone, resumeData.location, resumeData.linkedin].filter(Boolean).join('  |  '), margin, y);
    y += 12;
    doc.setDrawColor(200, 205, 215);
    doc.line(margin, y, 572, y);
    y += 16;
    if (resumeData.summary) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(20, 24, 33);
      doc.text('PROFESSIONAL SUMMARY', margin, y);
      y += 12;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const splitSummary = doc.splitTextToSize(resumeData.summary, 532);
      doc.text(splitSummary, margin, y);
      y += splitSummary.length * 11 + 8;
    }
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('WORK EXPERIENCE', margin, y);
    y += 12;
    resumeData.experience.forEach((exp) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.text(exp.position, margin, y);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      const dateText = `${exp.company}  |  ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`;
      doc.text(dateText, 572 - doc.getTextWidth(dateText), y);
      y += 12;
      exp.bullets.forEach((b) => {
        const lines = doc.splitTextToSize(`\u2022  ${b}`, 520);
        doc.text(lines, margin + 8, y);
        y += lines.length * 10.5;
      });
      y += 6;
    });
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('EDUCATION', margin, y);
    y += 12;
    resumeData.education.forEach((edu) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(`${edu.degree} \u2014 ${edu.field}`, margin, y);
      doc.setFont('helvetica', 'normal');
      const eduInfo = `${edu.school} (${edu.graduationYear})`;
      doc.text(eduInfo, 572 - doc.getTextWidth(eduInfo), y);
      y += 12;
    });
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('SKILLS', margin, y);
    y += 12;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.text(doc.splitTextToSize(resumeData.skills.join('  \u2022  '), 532), margin, y);
    doc.save(`${resumeData.fullName.replace(/\s+/g, '_')}_Resume.pdf`);
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#007A82] mb-1 font-bold">
            <Link to="/" className="text-slate-500 hover:text-[#00A3AD] flex items-center gap-1"><ArrowLeft className="w-3.5 h-3.5" /> All Tools</Link>
            <span>/</span><span>Documents</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-[#00A3AD]" /> Resume Builder
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Match % is local keyword overlap, not an employer ATS. Bullet rewrite is a local template. PDF export is included.
          </p>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex bg-white border border-slate-200 rounded-full p-1">
            <button onClick={() => setActiveTab('edit')} className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold ${activeTab === 'edit' ? 'bg-[#00A3AD] text-white' : 'text-slate-600'}`}><Edit3 className="w-3.5 h-3.5" /><span>Editor</span></button>
            <button onClick={() => setActiveTab('preview')} className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold ${activeTab === 'preview' ? 'bg-[#00A3AD] text-white' : 'text-slate-600'}`}><Eye className="w-3.5 h-3.5" /><span>Preview</span></button>
          </div>
          <button id="download-ats-pdf-btn" onClick={handleDownloadPdf} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00A3AD] to-[#008C95] text-white text-xs font-black">
            <Download className="w-4 h-4" /><span>Download PDF</span>
          </button>
        </div>
      </div>

      <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
        Match % is local keyword overlap against a short list. It is not an employer ATS score. Bullet rewrite is a local template, not AI.
      </div>

      <div className="my-6 p-4.5 rounded-3xl bg-white border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#E6F8F9] border border-[#B3EAEF] flex flex-col items-center justify-center">
            <span className="text-lg font-black text-[#007A82]">{atsAnalysis.score}%</span>
            <span className="text-[9px] text-[#008C95] uppercase font-mono font-bold">Overlap</span>
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-black text-[#0A2540]">Keyword overlap</h4>
            <p className="text-xs text-slate-600 mt-0.5">{atsAnalysis.matched.length} keywords matched • {atsAnalysis.missing.length} missing from the pasted job text.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className={`lg:col-span-7 space-y-6 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
          <div className="grid grid-cols-5 gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200 text-center">
            {steps.map((s, idx) => (
              <button key={idx} onClick={() => setActiveStep(idx)} className={`py-2 px-1 rounded-xl text-xs font-bold ${activeStep === idx ? 'bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF]' : 'text-slate-500'}`}>{s.title}</button>
            ))}
          </div>
          {activeStep === 0 && (
            <div className="rounded-3xl bg-white border border-slate-200 p-6 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div><label className="block font-bold mb-1">Full Name</label><input value={resumeData.fullName} onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200" /></div>
              <div><label className="block font-bold mb-1">Job Title</label><input value={resumeData.jobTitle} onChange={(e) => setResumeData({ ...resumeData, jobTitle: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200" /></div>
              <div><label className="block font-bold mb-1">Email</label><input value={resumeData.email} onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200" /></div>
              <div><label className="block font-bold mb-1">Phone</label><input value={resumeData.phone} onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200" /></div>
            </div>
          )}
          {activeStep === 1 && (
            <div className="rounded-3xl bg-white border border-slate-200 p-6 text-xs">
              <label className="block font-bold mb-1">Summary</label>
              <textarea rows={6} value={resumeData.summary} onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200" />
            </div>
          )}
          {activeStep === 2 && (
            <div className="space-y-4">
              <button onClick={addExperience} className="text-xs font-bold text-[#007A82] flex items-center gap-1"><Plus className="w-3.5 h-3.5" /> Add role</button>
              {resumeData.experience.map((exp) => (
                <div key={exp.id} className="rounded-3xl bg-white border border-slate-200 p-5 space-y-2 text-xs">
                  <div className="flex justify-between"><input value={exp.position} onChange={(e) => setResumeData(prev => ({ ...prev, experience: prev.experience.map(x => x.id === exp.id ? { ...x, position: e.target.value } : x) }))} className="px-2 py-1 rounded-lg bg-[#F4F8FA] border border-slate-200 font-bold" /><button onClick={() => removeExperience(exp.id)}><Trash2 className="w-3.5 h-3.5 text-rose-500" /></button></div>
                  {exp.bullets.map((b, i) => (
                    <div key={i} className="flex gap-2">
                      <textarea rows={2} value={b} onChange={(e) => updateBullet(exp.id, i, e.target.value)} className="flex-1 px-2 py-1 rounded-lg bg-[#F4F8FA] border border-slate-200" />
                      <button onClick={() => enhanceBullet(exp.id, i, b)} className="text-[10px] font-bold text-[#007A82]">{isEnhancingBullet === `${exp.id}-${i}` ? '...' : 'Rewrite'}</button>
                    </div>
                  ))}
                  <button onClick={() => addBullet(exp.id)} className="text-[10px] font-bold text-slate-500">Add bullet</button>
                </div>
              ))}
            </div>
          )}
          {activeStep === 3 && (
            <div className="rounded-3xl bg-white border border-slate-200 p-6 text-xs space-y-3">
              <div><label className="block font-bold mb-1">Skills (comma separated)</label><input value={resumeData.skills.join(', ')} onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value.split(',').map(s => s.trim()).filter(Boolean) })} className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200" /></div>
            </div>
          )}
          {activeStep === 4 && (
            <div className="rounded-3xl bg-white border border-slate-200 p-6 text-xs">
              <label className="block font-bold mb-1">Paste a job description</label>
              <textarea rows={8} value={resumeData.targetJobDescription} onChange={(e) => setResumeData({ ...resumeData, targetJobDescription: e.target.value })} className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200" />
            </div>
          )}
          <AdBanner type="in-content" />
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 text-xs text-[#0A2540]">
            <h2 className="text-xl font-black">{resumeData.fullName}</h2>
            <p className="text-slate-600">{resumeData.jobTitle}</p>
            <p className="text-slate-500 mt-1">{resumeData.email} · {resumeData.phone}</p>
            <h3 className="mt-4 font-black text-[11px] uppercase">Summary</h3>
            <p>{resumeData.summary}</p>
            <h3 className="mt-4 font-black text-[11px] uppercase">Experience</h3>
            {resumeData.experience.map(exp => (
              <div key={exp.id} className="mt-2">
                <div className="font-bold">{exp.position} — {exp.company}</div>
                <ul className="list-disc ml-4">{exp.bullets.map((b, i) => <li key={i}>{b}</li>)}</ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
