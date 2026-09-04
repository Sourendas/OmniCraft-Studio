import { jsPDF } from 'jspdf';
import type { ResumeData } from '../types';

export type ResumeTemplateId = 'classic' | 'modern' | 'compact';

const PAGE_W = 612;
const PAGE_H = 792;
const TEAL: [number, number, number] = [0, 163, 173];
const NAVY: [number, number, number] = [10, 37, 64];
const SLATE: [number, number, number] = [71, 85, 105];
const LINE: [number, number, number] = [203, 213, 225];

export const RESUME_TEMPLATES: { id: ResumeTemplateId; name: string; blurb: string }[] = [
  { id: 'classic', name: 'Classic', blurb: 'Centered name, clean rules — the recruiter default.' },
  { id: 'modern', name: 'Modern', blurb: 'Teal accent bar, left-aligned, tech-resume look.' },
  { id: 'compact', name: 'Compact', blurb: 'Tighter type and spacing to keep one page.' }
];

function contactBits(data: ResumeData): string[] {
  return [data.email, data.phone, data.location, data.linkedin, data.github, data.website].map((s) => s.trim()).filter(Boolean);
}

function dateRange(exp: ResumeData['experience'][number]): string {
  const end = exp.current ? 'Present' : exp.endDate;
  return [exp.startDate, end].filter(Boolean).join(' – ');
}

function drawResume(doc: jsPDF, data: ResumeData, template: ResumeTemplateId) {
  const isCompact = template === 'compact';
  const isModern = template === 'modern';
  const marginX = isModern ? 42 : isCompact ? 40 : 48;
  const marginTop = isCompact ? 36 : 44;
  const marginBottom = 40;
  const contentW = PAGE_W - marginX * 2;
  const nameSize = isCompact ? 18 : isModern ? 22 : 20;
  const bodySize = isCompact ? 9 : 9.5;
  const lead = isCompact ? 11 : 12.5;
  let y = marginTop;

  const chrome = () => {
    if (isModern) {
      doc.setFillColor(...TEAL);
      doc.rect(0, 0, 8, PAGE_H, 'F');
    }
  };
  chrome();

  const ensure = (need: number) => {
    if (y + need > PAGE_H - marginBottom) {
      doc.addPage();
      chrome();
      y = marginTop;
    }
  };

  const rule = () => {
    doc.setDrawColor(...(isModern ? TEAL : LINE));
    doc.setLineWidth(isModern ? 1.1 : 0.6);
    doc.line(marginX, y, PAGE_W - marginX, y);
    y += isCompact ? 10 : 12;
  };

  const section = (label: string) => {
    ensure(28);
    y += isCompact ? 6 : 8;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(isCompact ? 9 : 10);
    doc.setTextColor(...(isModern ? TEAL : NAVY));
    doc.text(label.toUpperCase(), marginX, y);
    y += 5;
    rule();
  };

  const wrapped = (text: string, width: number, size: number, font: 'normal' | 'bold' | 'italic' = 'normal') => {
    doc.setFont('helvetica', font);
    doc.setFontSize(size);
    return doc.splitTextToSize(text, width) as string[];
  };

  // Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(nameSize);
  doc.setTextColor(...NAVY);
  const name = (data.fullName || 'Your Name').trim();
  if (template === 'classic') {
    doc.text(name, PAGE_W / 2, y, { align: 'center' });
  } else {
    doc.text(name, marginX, y);
  }
  y += nameSize + 2;

  if (data.jobTitle.trim()) {
    doc.setFont('helvetica', isModern ? 'bold' : 'normal');
    doc.setFontSize(isCompact ? 10 : 11);
    doc.setTextColor(...(isModern ? TEAL : SLATE));
    if (template === 'classic') doc.text(data.jobTitle.trim(), PAGE_W / 2, y, { align: 'center' });
    else doc.text(data.jobTitle.trim(), marginX, y);
    y += 14;
  }

  const contacts = contactBits(data);
  if (contacts.length) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...SLATE);
    const joined = contacts.join('  ·  ');
    const lines = wrapped(joined, contentW, 8.5);
    lines.forEach((line: string) => {
      ensure(12);
      if (template === 'classic') doc.text(line, PAGE_W / 2, y, { align: 'center' });
      else doc.text(line, marginX, y);
      y += 11;
    });
  }

  y += 4;
  rule();

  if (data.summary.trim()) {
    section('Professional Summary');
    const lines = wrapped(data.summary.trim(), contentW, bodySize);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(bodySize);
    doc.setTextColor(...NAVY);
    lines.forEach((line: string) => {
      ensure(lead);
      doc.text(line, marginX, y);
      y += lead;
    });
  }

  if (data.experience.length) {
    section('Experience');
    data.experience.forEach((exp) => {
      const bullets = exp.bullets.map((b) => b.trim()).filter(Boolean);
      ensure(36 + bullets.length * lead);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(isCompact ? 10 : 10.5);
      doc.setTextColor(...NAVY);
      const title = exp.position.trim() || 'Role';
      const dates = dateRange(exp);
      doc.text(title, marginX, y);
      if (dates) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...SLATE);
        doc.text(dates, PAGE_W - marginX, y, { align: 'right' });
      }
      y += 13;
      const meta = [exp.company, exp.location].map((s) => s.trim()).filter(Boolean).join('  ·  ');
      if (meta) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(...(isModern ? TEAL : SLATE));
        doc.text(meta, marginX, y);
        y += 12;
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(bodySize);
      doc.setTextColor(...NAVY);
      bullets.forEach((b) => {
        const lines = wrapped(b, contentW - 16, bodySize);
        ensure(lines.length * lead + 2);
        doc.text('•', marginX + 2, y);
        lines.forEach((line: string, i: number) => {
          doc.text(line, marginX + 14, y);
          y += lead;
          if (i < lines.length - 1) ensure(lead);
        });
      });
      y += isCompact ? 6 : 8;
    });
  }

  if (data.education.length) {
    section('Education');
    data.education.forEach((edu) => {
      ensure(28);
      const left = [edu.degree, edu.field].map((s) => s.trim()).filter(Boolean).join(' — ');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...NAVY);
      if (left) doc.text(left, marginX, y);
      if (edu.graduationYear.trim()) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...SLATE);
        doc.text(edu.graduationYear.trim(), PAGE_W - marginX, y, { align: 'right' });
      }
      y += 13;
      const schoolLine = [edu.school, edu.gpa ? `GPA ${edu.gpa}` : ''].map((s) => s.trim()).filter(Boolean).join('  ·  ');
      if (schoolLine) {
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(9);
        doc.setTextColor(...SLATE);
        doc.text(schoolLine, marginX, y);
        y += 12;
      }
      y += 4;
    });
  }

  if (data.skills.length) {
    section('Skills');
    const skillLine = data.skills.filter(Boolean).join('   ·   ');
    const lines = wrapped(skillLine, contentW, bodySize);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(bodySize);
    doc.setTextColor(...NAVY);
    lines.forEach((line: string) => {
      ensure(lead);
      doc.text(line, marginX, y);
      y += lead;
    });
  }

  if (data.certifications.length) {
    section('Certifications');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(bodySize);
    doc.setTextColor(...NAVY);
    data.certifications.filter(Boolean).forEach((c) => {
      ensure(lead);
      doc.text(`•  ${c}`, marginX, y);
      y += lead;
    });
  }
}

export function downloadResumePdf(data: ResumeData, template: ResumeTemplateId = 'modern') {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'pt', format: 'letter', compress: true });
  doc.setProperties({
    title: `${data.fullName || 'Resume'} — Resume`,
    author: data.fullName || 'FileTools Kit',
    creator: 'FileTools Kit',
    subject: data.jobTitle || 'Resume'
  });
  drawResume(doc, data, template);
  const safe = (data.fullName || 'Resume').replace(/[^a-z0-9]+/gi, '_').replace(/^_|_$/g, '');
  doc.save(`${safe || 'Resume'}_${template}.pdf`);
}
