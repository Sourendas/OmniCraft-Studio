import React, { useState, useMemo } from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { AdBanner } from '../../components/layout/AdBanner';
import { jsPDF } from 'jspdf';
import { 
  FileText, 
  Sparkles, 
  Check, 
  Plus, 
  Trash2, 
  Download, 
  Target, 
  CheckCircle2, 
  AlertCircle, 
  Wand2, 
  ArrowLeft,
  ChevronRight,
  Eye,
  Edit3
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResumeData } from '../../types';

export const ResumeBuilderPage: React.FC = () => {
  const { isPro, openUpgradeModal } = useSubscription();

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
    summary: 'High-velocity full-stack software engineer with 6+ years of experience architecting client-side WASM pipelines, scalable React applications, and enterprise microservices. Proven track record boosting core web vitals by 45% and leading cross-functional teams to deliver zero-latency browser utilities.',
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
          'Architected high-throughput client-side document processing engine utilizing WebAssembly, reducing server compute costs by $180,000 annually.',
          'Spearheaded the migration of legacy monolith to React 19 and Vite, achieving a 99.8% Lighthouse performance rating and cutting bundle size by 54%.',
          'Mentored 8 mid-level software engineers on modern TypeScript patterns, automated CI/CD testing, and state management optimization.'
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
          'Designed modular design system components adopted by 14 cross-functional development teams, cutting sprint delivery times by 30%.',
          'Engineered resilient offline-first caching mechanisms using IndexedDB, allowing seamless multi-device drafting without network drops.'
        ]
      }
    ],
    education: [
      {
        id: '1',
        school: 'University of California, Berkeley',
        degree: 'B.S. in Computer Science',
        field: 'Software Engineering & AI Systems',
        graduationYear: '2019',
        gpa: '3.89'
      }
    ],
    skills: [
      'TypeScript', 'React 19', 'Next.js', 'Vite', 'Tailwind CSS', 'WebAssembly (WASM)', 
      'Node.js', 'GraphQL', 'REST APIs', 'PostgreSQL', 'Docker', 'CI/CD Pipelines', 
      'Jest', 'Vitest', 'Performance Optimization', 'ATS Optimization'
    ],
    certifications: [],
    targetJobDescription: 'Looking for a Senior Software Engineer with strong experience in TypeScript, React, WebAssembly, performance profiling, and modern frontend architecture to build zero-latency browser applications.'
  });

  const steps = [
    { title: 'Personal Info', desc: 'Contact & Links' },
    { title: 'Summary', desc: 'Executive Pitch' },
    { title: 'Experience', desc: 'Work History' },
    { title: 'Education & Skills', desc: 'Qualifications' },
    { title: 'ATS Target Scanner', desc: 'Keyword Alignment' }
  ];

  // ATS Keyword analysis
  const atsAnalysis = useMemo(() => {
    if (!resumeData.targetJobDescription.trim()) {
      return { score: 0, matched: [], missing: [], density: 'No JD' };
    }

    const jobText = resumeData.targetJobDescription.toLowerCase();
    const commonKeywords = [
      'react', 'typescript', 'javascript', 'node.js', 'webassembly', 'wasm', 
      'python', 'sql', 'postgresql', 'docker', 'kubernetes', 'aws', 'cloud', 
      'ci/cd', 'frontend', 'backend', 'full stack', 'performance', 'architecture', 
      'api', 'graphql', 'rest', 'agile', 'leadership', 'collaboration', 'testing',
      'security', 'encryption', 'scalable', 'microservices', 'vite', 'next.js'
    ];

    const targetKeywords = commonKeywords.filter(kw => jobText.includes(kw));

    const fullResumeText = [
      resumeData.fullName,
      resumeData.jobTitle,
      resumeData.summary,
      ...resumeData.skills,
      ...resumeData.experience.flatMap(e => [e.company, e.position, ...e.bullets]),
      ...resumeData.education.map(ed => `${ed.degree} ${ed.field}`)
    ].join(' ').toLowerCase();

    const matched = targetKeywords.filter(kw => fullResumeText.includes(kw));
    const missing = targetKeywords.filter(kw => !fullResumeText.includes(kw));

    const score = targetKeywords.length > 0
      ? Math.round((matched.length / targetKeywords.length) * 100)
      : 0;

    return { score, matched, missing, density: score > 80 ? 'Optimal' : score > 60 ? 'Moderate' : 'Low' };
  }, [resumeData]);

  // 100% Local Client-Side ATS Bullet Enhancer (Zero Network Calls, Zero Data Leakage)
  const enhanceBullet = (expId: string, bulletIdx: number, currentText: string) => {
    const key = `${expId}-${bulletIdx}`;
    setIsEnhancingBullet(key);

    setTimeout(() => {
      // Clean leading weak verbs and filler phrases
      const cleanBody = currentText
        .trim()
        .replace(/^[•\-\*]\s*/, '')
        .replace(/^(i\s+|we\s+)?(was\s+responsible\s+for|responsible\s+for|tasked\s+with|worked\s+on|helped\s+with|assisted\s+in|did|handled|made|built|developed|managed|created|supported)\s+/i, '');

      // Curated executive action verbs based on category heuristics
      const actionVerbs = [
        'Architected and deployed',
        'Spearheaded the engineering of',
        'Orchestrated and scaled',
        'Streamlined and automated',
        'Pioneered the development of',
        'Engineered high-throughput',
        'Modernized enterprise-grade',
        'Overhauled and accelerated',
        'Standardized and optimized'
      ];

      // High-impact measurable ATS metric conclusions
      const impactClauses = [
        'driving a 35% boost in system efficiency and reducing latency by 120ms',
        'resulting in a 40% reduction in operational cycle times across cross-functional teams',
        'yielding a 28% increase in pipeline throughput while maintaining 99.99% reliability',
        'cutting deployment overhead by 45% and saving 12+ engineering hours weekly',
        'enhancing overall user retention by 22% with zero downtime compliance'
      ];

      // Deterministic yet varied selection
      const hash = (currentText.length + bulletIdx * 7) % actionVerbs.length;
      const metricHash = (currentText.length * 3 + bulletIdx * 11) % impactClauses.length;

      const chosenVerb = actionVerbs[hash];
      const chosenImpact = impactClauses[metricHash];

      // Formulate enhanced ATS bullet
      let enhanced = `${chosenVerb} ${cleanBody.charAt(0).toLowerCase() + cleanBody.slice(1)}`;
      if (!enhanced.endsWith('.')) {
        enhanced += `, ${chosenImpact}.`;
      }

      updateBullet(expId, bulletIdx, enhanced);
      setIsEnhancingBullet(null);
    }, 250);
  };

  const updateBullet = (expId: string, bulletIdx: number, newText: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp;
        const newBullets = [...exp.bullets];
        newBullets[bulletIdx] = newText;
        return { ...exp, bullets: newBullets };
      })
    }));
  };

  const addBullet = (expId: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp;
        return { ...exp, bullets: [...exp.bullets, 'Delivered key cross-functional initiative increasing velocity by 25%.'] };
      })
    }));
  };

  const removeBullet = (expId: string, bulletIdx: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp => {
        if (exp.id !== expId) return exp;
        return { ...exp, bullets: exp.bullets.filter((_, idx) => idx !== bulletIdx) };
      })
    }));
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: 'New Company Inc',
      position: 'Senior Engineer',
      startDate: '2023',
      endDate: '2024',
      current: false,
      location: 'Remote',
      bullets: ['Led development of core features delivering 20% operational efficiency gain.']
    };
    setResumeData(prev => ({ ...prev, experience: [newExp, ...prev.experience] }));
  };

  const removeExperience = (id: string) => {
    setResumeData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  };

  // PDF Export Gateway
  const handleDownloadPdf = () => {
    if (!isPro) {
      openUpgradeModal('ATS-Optimized Resume PDF Export');
      return;
    }

    // Generate clean ATS-compliant PDF using jsPDF
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: 'letter'
    });

    const margin = 40;
    let y = 45;

    // Header
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(18);
    doc.setTextColor(20, 24, 33);
    doc.text(resumeData.fullName.toUpperCase(), margin, y);
    y += 18;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(11);
    doc.setTextColor(60, 70, 90);
    doc.text(resumeData.jobTitle, margin, y);
    y += 14;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(90, 100, 120);
    const contactLine = [
      resumeData.email,
      resumeData.phone,
      resumeData.location,
      resumeData.linkedin,
      resumeData.github
    ].filter(Boolean).join('  |  ');
    doc.text(contactLine, margin, y);
    y += 12;

    // Divider
    doc.setDrawColor(200, 205, 215);
    doc.line(margin, y, 572, y);
    y += 16;

    // Professional Summary
    if (resumeData.summary) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(20, 24, 33);
      doc.text('PROFESSIONAL SUMMARY', margin, y);
      y += 12;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(50, 55, 65);
      const splitSummary = doc.splitTextToSize(resumeData.summary, 532);
      doc.text(splitSummary, margin, y);
      y += splitSummary.length * 11 + 8;
    }

    // Experience
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(20, 24, 33);
    doc.text('WORK EXPERIENCE', margin, y);
    y += 12;

    resumeData.experience.forEach((exp) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 35, 45);
      doc.text(exp.position, margin, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(90, 100, 120);
      const dateText = `${exp.company}  |  ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}  |  ${exp.location}`;
      doc.text(dateText, 572 - doc.getTextWidth(dateText), y);
      y += 12;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(50, 55, 65);
      exp.bullets.forEach((b) => {
        const bulletText = `•  ${b}`;
        const lines = doc.splitTextToSize(bulletText, 520);
        doc.text(lines, margin + 8, y);
        y += lines.length * 10.5;
      });
      y += 6;
    });

    // Education
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(20, 24, 33);
    doc.text('EDUCATION', margin, y);
    y += 12;

    resumeData.education.forEach((edu) => {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(30, 35, 45);
      doc.text(`${edu.degree} — ${edu.field}`, margin, y);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(90, 100, 120);
      const eduInfo = `${edu.school} (${edu.graduationYear})${edu.gpa ? ` - GPA: ${edu.gpa}` : ''}`;
      doc.text(eduInfo, 572 - doc.getTextWidth(eduInfo), y);
      y += 12;
    });

    // Skills
    y += 4;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(20, 24, 33);
    doc.text('TECHNICAL SKILLS', margin, y);
    y += 12;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(50, 55, 65);
    const skillsText = resumeData.skills.join('  •  ');
    const splitSkills = doc.splitTextToSize(skillsText, 532);
    doc.text(splitSkills, margin, y);

    doc.save(`${resumeData.fullName.replace(/\s+/g, '_')}_ATS_Resume.pdf`);
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#007A82] mb-1 font-bold">
            <Link to="/" className="text-slate-500 hover:text-[#00A3AD] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> All Tools
            </Link>
            <span>/</span>
            <span>Documents</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] flex items-center gap-2.5">
            <FileText className="w-7 h-7 text-[#00A3AD]" />
            ATS Resume Builder
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Build a resume with local keyword-overlap scoring and a heuristic bullet rewriter. PDF export is Pro preview.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2.5">
          <div className="flex bg-white border border-slate-200 rounded-full p-1 shadow-xs">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'edit'
                  ? 'bg-[#00A3AD] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                activeTab === 'preview'
                  ? 'bg-[#00A3AD] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Preview</span>
            </button>
          </div>

          <button
            id="download-ats-pdf-btn"
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00A3AD] to-[#008C95] hover:from-[#00B5B8] hover:to-[#00A3AD] text-white text-xs font-black shadow-lg shadow-teal-500/20 transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download ATS PDF {!isPro && '(Pro Plan)'}</span>
          </button>
        </div>
      </div>

      {/* ATS Score Overview Ribbon */}
      <div className="my-6 p-4.5 rounded-3xl bg-white border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4 shadow-[0_4px_20px_rgba(10,37,64,0.03)]">
        <div className="flex items-center gap-4">
          <div className="relative w-14 h-14 rounded-2xl bg-[#E6F8F9] border border-[#B3EAEF] flex flex-col items-center justify-center">
            <span className="text-lg font-black text-[#007A82]">
              {atsAnalysis.score}%
            </span>
            <span className="text-[9px] text-[#008C95] uppercase font-mono font-bold">Overlap</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs sm:text-sm font-black text-[#0A2540]">Keyword overlap</h4>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                {atsAnalysis.density}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5 font-medium">
              {atsAnalysis.matched.length} keywords matched • {atsAnalysis.missing.length} missing from target job description.
            </p>
          </div>
        </div>

        {atsAnalysis.missing.length > 0 && (
          <div className="flex items-center gap-1.5 flex-wrap justify-end">
            <span className="text-[11px] text-slate-500 font-medium">Missing recommendations:</span>
            {atsAnalysis.missing.slice(0, 4).map((kw, i) => (
              <span key={i} className="text-[11px] px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-mono font-bold">
                +{kw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Main Workspace Layout: Editor / Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Step-by-Step Form Controls */}
        <div className={`lg:col-span-7 space-y-6 ${activeTab === 'preview' ? 'hidden lg:block' : ''}`}>
          {/* Step Selector Tabs */}
          <div className="grid grid-cols-5 gap-1.5 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-xs text-center">
            {steps.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeStep === idx
                    ? 'bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF] shadow-xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <div className="font-mono text-[10px] text-slate-400">0{idx + 1}</div>
                <div className="truncate">{s.title}</div>
              </button>
            ))}
          </div>

          {/* Step 0: Personal Details */}
          {activeStep === 0 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(10,37,64,0.03)] space-y-4">
              <h3 className="text-xs font-black text-[#007A82] uppercase tracking-wider">
                Personal Contact Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Full Name</label>
                  <input
                    type="text"
                    value={resumeData.fullName}
                    onChange={(e) => setResumeData({ ...resumeData, fullName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Target Job Title</label>
                  <input
                    type="text"
                    value={resumeData.jobTitle}
                    onChange={(e) => setResumeData({ ...resumeData, jobTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Email</label>
                  <input
                    type="email"
                    value={resumeData.email}
                    onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Phone</label>
                  <input
                    type="text"
                    value={resumeData.phone}
                    onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Location (City, State / Remote)</label>
                  <input
                    type="text"
                    value={resumeData.location}
                    onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">LinkedIn Profile</label>
                  <input
                    type="text"
                    value={resumeData.linkedin}
                    onChange={(e) => setResumeData({ ...resumeData, linkedin: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Summary */}
          {activeStep === 1 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(10,37,64,0.03)] space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-[#007A82] uppercase tracking-wider">
                  Executive Pitch & Summary
                </h3>
              </div>
              <textarea
                rows={5}
                value={resumeData.summary}
                onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                placeholder="Briefly state your core expertise, years of experience, and signature career achievements..."
                className="w-full p-4 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white leading-relaxed"
              />
            </div>
          )}

          {/* Step 2: Work Experience */}
          {activeStep === 2 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(10,37,64,0.03)] space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-[#007A82] uppercase tracking-wider">
                  Work Experience
                </h3>
                <button
                  onClick={addExperience}
                  className="flex items-center gap-1.5 text-xs font-black text-[#007A82] hover:text-[#00A3AD] px-3.5 py-1.5 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Role</span>
                </button>
              </div>

              {resumeData.experience.map((exp, expIdx) => (
                <div key={exp.id} className="p-4.5 rounded-2xl bg-[#F4F8FA] border border-slate-200/80 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#0A2540]">Position #{expIdx + 1}</span>
                    <button
                      onClick={() => removeExperience(exp.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Position / Title</label>
                      <input
                        type="text"
                        value={exp.position}
                        onChange={(e) => {
                          const val = e.target.value;
                          setResumeData(prev => ({
                            ...prev,
                            experience: prev.experience.map(x => x.id === exp.id ? { ...x, position: val } : x)
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-[#0A2540] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const val = e.target.value;
                          setResumeData(prev => ({
                            ...prev,
                            experience: prev.experience.map(x => x.id === exp.id ? { ...x, company: val } : x)
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-[#0A2540] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Start</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => {
                          const val = e.target.value;
                          setResumeData(prev => ({
                            ...prev,
                            experience: prev.experience.map(x => x.id === exp.id ? { ...x, startDate: val } : x)
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-[#0A2540] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">End</label>
                      <input
                        type="text"
                        value={exp.current ? 'Present' : exp.endDate}
                        disabled={exp.current}
                        onChange={(e) => {
                          const val = e.target.value;
                          setResumeData(prev => ({
                            ...prev,
                            experience: prev.experience.map(x => x.id === exp.id ? { ...x, endDate: val, current: false } : x)
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-[#0A2540] font-medium disabled:bg-slate-100"
                      />
                      <label className="mt-1.5 flex items-center gap-1.5 text-[11px] text-slate-600 font-bold">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => {
                            const checked = e.target.checked;
                            setResumeData(prev => ({
                              ...prev,
                              experience: prev.experience.map(x => x.id === exp.id ? { ...x, current: checked } : x)
                            }));
                          }}
                        />
                        Current role
                      </label>
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Location</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => {
                          const val = e.target.value;
                          setResumeData(prev => ({
                            ...prev,
                            experience: prev.experience.map(x => x.id === exp.id ? { ...x, location: val } : x)
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-white border border-slate-200 text-[#0A2540] font-medium"
                      />
                    </div>
                  </div>

                  {/* Bullet points */}
                  <div className="space-y-2 pt-2">
                    <label className="block text-[11px] font-bold text-slate-600 uppercase">
                      Accomplishments & Impact Bullets
                    </label>
                    {exp.bullets.map((b, bIdx) => {
                      const isEnhancing = isEnhancingBullet === `${exp.id}-${bIdx}`;
                      return (
                        <div key={bIdx} className="flex items-start gap-2">
                          <textarea
                            rows={2}
                            value={b}
                            onChange={(e) => updateBullet(exp.id, bIdx, e.target.value)}
                            className="flex-1 p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#0A2540] font-medium focus:border-[#00A3AD] focus:outline-none"
                          />
                          <button
                            title="Local heuristic rewriter (action verbs + stock metrics)"
                            disabled={isEnhancing}
                            onClick={() => enhanceBullet(exp.id, bIdx, b)}
                            className="p-2.5 rounded-xl bg-[#E6F8F9] hover:bg-[#D0F2F3] text-[#007A82] border border-[#B3EAEF] shrink-0 text-xs flex items-center gap-1 cursor-pointer disabled:opacity-50 font-bold"
                          >
                            <Wand2 className={`w-3.5 h-3.5 ${isEnhancing ? 'animate-spin text-[#00A3AD]' : ''}`} />
                            <span className="hidden sm:inline">Rewrite bullet</span>
                          </button>
                          <button
                            onClick={() => removeBullet(exp.id, bIdx)}
                            className="p-2.5 text-slate-400 hover:text-rose-600 shrink-0 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      );
                    })}
                    <button
                      onClick={() => addBullet(exp.id)}
                      className="text-xs text-[#007A82] hover:text-[#00A3AD] flex items-center gap-1 mt-1 font-bold cursor-pointer"
                    >
                      <Plus className="w-3 h-3" /> Add bullet point
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Step 3: Education & Skills */}
          {activeStep === 3 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(10,37,64,0.03)] space-y-6">
              <h3 className="text-xs font-black text-[#007A82] uppercase tracking-wider">
                Skills & Technical Competencies
              </h3>

              <div>
                <label className="block text-xs text-slate-700 font-bold mb-1.5">
                  Skills (comma separated)
                </label>
                <textarea
                  rows={3}
                  value={resumeData.skills.join(', ')}
                  onChange={(e) => {
                    const arr = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                    setResumeData({ ...resumeData, skills: arr });
                  }}
                  className="w-full p-3.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-medium focus:border-[#00A3AD] focus:bg-white"
                />
              </div>

              <div className="pt-4 border-t border-slate-100">
                <h4 className="text-xs font-black text-[#0A2540] mb-2">Education</h4>
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Degree & Major</label>
                      <input
                        type="text"
                        value={`${edu.degree} in ${edu.field}`}
                        onChange={(e) => {
                          const val = e.target.value;
                          setResumeData(prev => ({
                            ...prev,
                            education: prev.education.map(ed => ed.id === edu.id ? { ...ed, field: val } : ed)
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-700 font-bold mb-1">Institution & Year</label>
                      <input
                        type="text"
                        value={`${edu.school} (${edu.graduationYear})`}
                        onChange={(e) => {
                          const val = e.target.value;
                          setResumeData(prev => ({
                            ...prev,
                            education: prev.education.map(ed => ed.id === edu.id ? { ...ed, school: val } : ed)
                          }));
                        }}
                        className="w-full px-3 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: ATS Target Job Scanner */}
          {activeStep === 4 && (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-[0_4px_20px_rgba(10,37,64,0.03)] space-y-4">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-[#00A3AD]" />
                <h3 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
                  Target Job Description Analyzer
                </h3>
              </div>
              <p className="text-xs text-slate-600 font-medium">
                The scanner compares a small keyword list to your resume text. It is overlap %, not an employer ATS.
              </p>
              <textarea
                rows={6}
                value={resumeData.targetJobDescription}
                onChange={(e) => setResumeData({ ...resumeData, targetJobDescription: e.target.value })}
                placeholder="Paste full job posting here..."
                className="w-full p-4 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-medium focus:border-[#00A3AD] focus:bg-white leading-relaxed font-mono"
              />
            </div>
          )}

          {/* Step Navigation Buttons */}
          <div className="flex items-center justify-between pt-2">
            <button
              disabled={activeStep === 0}
              onClick={() => setActiveStep(prev => Math.max(0, prev - 1))}
              className="px-5 py-2.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-600 hover:text-slate-900 disabled:opacity-40 cursor-pointer shadow-xs"
            >
              Previous Step
            </button>
            <button
              disabled={activeStep === steps.length - 1}
              onClick={() => setActiveStep(prev => Math.min(steps.length - 1, prev + 1))}
              className="px-6 py-2.5 rounded-full bg-[#00A3AD] hover:bg-[#00B5B8] text-xs font-black text-white flex items-center gap-1.5 disabled:opacity-40 cursor-pointer shadow-sm shadow-teal-500/20"
            >
              <span>Next Step</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Side: Live Resume Document Sheet */}
        <div className={`lg:col-span-5 ${activeTab === 'edit' ? 'hidden lg:block' : ''}`}>
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-500 flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Document Render
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Standard ATS Letter Format</span>
            </div>

            {/* Simulated Paper Sheet */}
            <div 
              id="resume-live-sheet"
              className="rounded-3xl bg-white text-slate-900 p-6 sm:p-8 border border-slate-200/90 shadow-[0_8px_30px_rgba(10,37,64,0.06)] text-[11px] leading-snug font-sans min-h-[600px] overflow-hidden"
            >
              <div className="border-b-2 border-slate-900 pb-3 mb-3">
                <h2 className="text-xl font-black tracking-tight text-slate-950 uppercase">
                  {resumeData.fullName || 'YOUR NAME'}
                </h2>
                <div className="text-xs font-bold text-slate-700 mt-0.5">
                  {resumeData.jobTitle}
                </div>
                <div className="text-[10px] text-slate-600 mt-1 flex flex-wrap gap-x-2 gap-y-0.5">
                  <span>{resumeData.email}</span>
                  <span>•</span>
                  <span>{resumeData.phone}</span>
                  <span>•</span>
                  <span>{resumeData.location}</span>
                  {resumeData.linkedin && <span>• {resumeData.linkedin}</span>}
                </div>
              </div>

              {resumeData.summary && (
                <div className="mb-3">
                  <h4 className="font-black text-[10px] text-slate-900 uppercase tracking-wider mb-1">
                    Professional Summary
                  </h4>
                  <p className="text-[10px] text-slate-700 leading-relaxed font-medium">
                    {resumeData.summary}
                  </p>
                </div>
              )}

              <div className="mb-3">
                <h4 className="font-black text-[10px] text-slate-900 uppercase tracking-wider mb-1 border-b border-slate-200 pb-0.5">
                  Experience
                </h4>
                {resumeData.experience.map((exp) => (
                  <div key={exp.id} className="mb-2.5">
                    <div className="flex justify-between font-bold text-[10.5px] text-slate-900">
                      <span>{exp.position}</span>
                      <span className="text-slate-600 font-normal text-[10px]">
                        {exp.company} ({exp.startDate} - {exp.current ? 'Present' : exp.endDate})
                      </span>
                    </div>
                    <ul className="list-disc ml-3.5 text-[9.5px] text-slate-700 space-y-0.5 mt-0.5 font-medium">
                      {exp.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mb-3">
                <h4 className="font-black text-[10px] text-slate-900 uppercase tracking-wider mb-1 border-b border-slate-200 pb-0.5">
                  Education & Credentials
                </h4>
                {resumeData.education.map((edu) => (
                  <div key={edu.id} className="flex justify-between text-[10px] text-slate-800 font-medium">
                    <span className="font-bold">{edu.degree} in {edu.field}</span>
                    <span className="text-slate-600">{edu.school}</span>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-black text-[10px] text-slate-900 uppercase tracking-wider mb-1 border-b border-slate-200 pb-0.5">
                  Skills & Tools
                </h4>
                <p className="text-[9.5px] text-slate-700 font-medium">
                  {resumeData.skills.join(' • ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <AdBanner type="leaderboard" />
      </div>
    </div>
  );
};
