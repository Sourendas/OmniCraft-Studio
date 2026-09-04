import { jsPDF } from 'jspdf';
import type { ResumeData } from '../types';

export type ResumeTemplateId =
  | 'classic'
  | 'ivy'
  | 'elegant'
  | 'modern'
  | 'banner'
  | 'executive'
  | 'slate'
  | 'sidebar'
  | 'timeline'
  | 'swiss'
  | 'editorial'
  | 'compact';

export type ResumeTemplateMeta = {
  id: ResumeTemplateId;
  name: string;
  blurb: string;
  group: 'Traditional' | 'Contemporary' | 'Layout';
  header: string;
  accent: string;
  ink: string;
};

export const RESUME_TEMPLATES: ResumeTemplateMeta[] = [
  { id: 'classic', name: 'Classic', blurb: 'Centered header, thin rules — recruiter default.', group: 'Traditional', header: '#0A2540', accent: '#0A2540', ink: '#0A2540' },
  { id: 'ivy', name: 'Ivy', blurb: 'Times serif, small-caps section titles.', group: 'Traditional', header: '#1C1917', accent: '#57534E', ink: '#1C1917' },
  { id: 'elegant', name: 'Elegant', blurb: 'Centered serif with gold rules.', group: 'Traditional', header: '#0A2540', accent: '#B45309', ink: '#0A2540' },
  { id: 'modern', name: 'Modern Teal', blurb: 'Teal spine, left-aligned tech look.', group: 'Contemporary', header: '#0A2540', accent: '#00A3AD', ink: '#0A2540' },
  { id: 'banner', name: 'Teal Banner', blurb: 'Full-width teal name band.', group: 'Contemporary', header: '#007A82', accent: '#00A3AD', ink: '#0A2540' },
  { id: 'executive', name: 'Executive', blurb: 'Navy masthead, white name.', group: 'Contemporary', header: '#0A2540', accent: '#00A3AD', ink: '#0A2540' },
  { id: 'slate', name: 'Slate', blurb: 'Charcoal header and skill chips.', group: 'Contemporary', header: '#334155', accent: '#0F172A', ink: '#0F172A' },
  { id: 'sidebar', name: 'Sidebar', blurb: 'Navy left column for contact and skills.', group: 'Layout', header: '#0A2540', accent: '#00A3AD', ink: '#0A2540' },
  { id: 'timeline', name: 'Timeline', blurb: 'Dates sit in a left gutter.', group: 'Layout', header: '#0A2540', accent: '#00A3AD', ink: '#0A2540' },
  { id: 'swiss', name: 'Swiss', blurb: 'Large name, strict horizontal grid.', group: 'Layout', header: '#0A2540', accent: '#0A2540', ink: '#0A2540' },
  { id: 'editorial', name: 'Editorial', blurb: 'Magazine-scale name, thin job line.', group: 'Layout', header: '#0A2540', accent: '#BE123C', ink: '#0A2540' },
  { id: 'compact', name: 'Compact', blurb: 'Dense packing to hold one page.', group: 'Layout', header: '#0A2540', accent: '#00A3AD', ink: '#0A2540' }
];

const PAGE_W = 612;
const PAGE_H = 792;

const hex = (h: string): [number, number, number] => {
  const n = h.replace('#', '');
  return [parseInt(n.slice(0, 2), 16), parseInt(n.slice(2, 4), 16), parseInt(n.slice(4, 6), 16)];
};

function contactBits(data: ResumeData): string[] {
  return [data.email, data.phone, data.location, data.linkedin, data.github, data.website]
    .map((s) => s.trim())
    .filter(Boolean);
}

function dateRange(exp: ResumeData['experience'][number]): string {
  const end = exp.current ? 'Present' : exp.endDate;
  return [exp.startDate, end].filter(Boolean).join(' – ');
}

function face(id: ResumeTemplateId): 'helvetica' | 'times' {
  return id === 'classic' || id === 'ivy' || id === 'elegant' ? 'times' : 'helvetica';
}

type Doc = jsPDF;

function drawResume(doc: Doc, data: ResumeData, id: ResumeTemplateId) {
  const meta = RESUME_TEMPLATES.find((t) => t.id === id) || RESUME_TEMPLATES[3];
  const accent = hex(meta.accent);
  const navy = hex(meta.header);
  const ink = hex(meta.ink);
  const slate: [number, number, number] = [71, 85, 105];
  const font = face(id);
  const isSidebar = id === 'sidebar';
  const isCompact = id === 'compact';
  const isTimeline = id === 'timeline';
  const sideW = isSidebar ? 176 : 0;
  const dateCol = isTimeline ? 78 : 0;
  const marginX = isSidebar ? sideW + 22 : id === 'modern' ? 44 : isCompact ? 38 : 48;
  const right = PAGE_W - (isCompact ? 38 : 48);
  const contentW = right - marginX - dateCol;
  const bodySize = isCompact ? 8.7 : id === 'swiss' ? 9 : 9.5;
  const lead = isCompact ? 10.6 : 12.2;
  const nameSize = id === 'editorial' || id === 'swiss' ? 26 : id === 'banner' || id === 'executive' ? 20 : isCompact ? 16 : 21;
  let y = 44;

  const chrome = () => {
    if (id === 'modern') {
      doc.setFillColor(...accent);
      doc.rect(0, 0, 8, PAGE_H, 'F');
    }
    if (isSidebar) {
      doc.setFillColor(...navy);
      doc.rect(0, 0, sideW, PAGE_H, 'F');
      doc.setFillColor(...accent);
      doc.rect(sideW, 0, 4, PAGE_H, 'F');
    }
  };

  chrome();

  const ensure = (need: number) => {
    if (y + need > PAGE_H - 36) {
      doc.addPage();
      chrome();
      y = 44;
      return true;
    }
    return false;
  };

  const wrap = (text: string, width: number, size: number, style: 'normal' | 'bold' | 'italic' = 'normal') => {
    doc.setFont(font, style);
    doc.setFontSize(size);
    return doc.splitTextToSize(text, width) as string[];
  };

  const section = (label: string) => {
    ensure(26);
    y += isCompact ? 5 : 8;
    doc.setFont(font, 'bold');
    doc.setFontSize(id === 'ivy' || id === 'elegant' ? 9.5 : 10);
    doc.setTextColor(...accent);
    const title = id === 'ivy' || id === 'elegant' || id === 'classic' ? label.toUpperCase() : label.toUpperCase();
    doc.text(title, marginX + dateCol, y);
    y += 4;
    if (id !== 'swiss') {
      doc.setDrawColor(...accent);
      doc.setLineWidth(id === 'elegant' ? 0.9 : id === 'editorial' ? 1.4 : 0.7);
      doc.line(marginX + dateCol, y, right, y);
    } else {
      doc.setDrawColor(15, 23, 42);
      doc.setLineWidth(1.6);
      doc.line(marginX, y, right, y);
    }
    y += isCompact ? 9 : 11;
  };

  const contacts = contactBits(data);
  const name = (data.fullName || 'Your Name').trim();

  if (id === 'executive' || id === 'banner' || id === 'slate') {
    const hh = id === 'slate' ? 96 : 108;
    doc.setFillColor(...navy);
    doc.rect(0, 0, PAGE_W, hh, 'F');
    if (id === 'banner') {
      doc.setFillColor(...accent);
      doc.rect(0, hh - 6, PAGE_W, 6, 'F');
    }
    doc.setTextColor(255, 255, 255);
    doc.setFont(font, 'bold');
    doc.setFontSize(nameSize);
    doc.text(name, 48, 44);
    if (data.jobTitle.trim()) {
      doc.setFont(font, 'normal');
      doc.setFontSize(11);
      doc.setTextColor(...(id === 'executive' ? accent : [226, 232, 240] as [number, number, number]));
      doc.text(data.jobTitle.trim(), 48, 62);
    }
    doc.setFont(font, 'normal');
    doc.setFontSize(8.2);
    doc.setTextColor(226, 232, 240);
    const cl = wrap(contacts.join('   ·   '), PAGE_W - 96, 8.2);
    let cy = 80;
    cl.forEach((line) => {
      doc.text(line, 48, cy);
      cy += 10;
    });
    y = hh + 22;
  } else if (isSidebar) {
    y = 36;
    doc.setTextColor(255, 255, 255);
    doc.setFont(font, 'bold');
    doc.setFontSize(14);
    const nameLines = wrap(name, sideW - 28, 14, 'bold');
    let sy = 40;
    nameLines.forEach((ln) => {
      doc.setTextColor(255, 255, 255);
      doc.setFont(font, 'bold');
      doc.setFontSize(14);
      doc.text(ln, 16, sy);
      sy += 16;
    });
    if (data.jobTitle.trim()) {
      doc.setFont(font, 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(...accent);
      wrap(data.jobTitle.trim(), sideW - 28, 8.5).forEach((ln) => {
        doc.text(ln, 16, sy);
        sy += 11;
      });
    }
    sy += 14;
    doc.setFont(font, 'bold');
    doc.setFontSize(8);
    doc.setTextColor(...accent);
    doc.text('CONTACT', 16, sy);
    sy += 12;
    doc.setFont(font, 'normal');
    doc.setFontSize(7.6);
    doc.setTextColor(226, 232, 240);
    contacts.forEach((c) => {
      wrap(c, sideW - 28, 7.6).forEach((ln) => {
        doc.text(ln, 16, sy);
        sy += 10;
      });
      sy += 3;
    });
    if (data.skills.length) {
      sy += 10;
      doc.setFont(font, 'bold');
      doc.setFontSize(8);
      doc.setTextColor(...accent);
      doc.text('SKILLS', 16, sy);
      sy += 12;
      doc.setFont(font, 'normal');
      doc.setFontSize(7.6);
      doc.setTextColor(255, 255, 255);
      data.skills.forEach((s) => {
        wrap(s, sideW - 28, 7.6).forEach((ln) => {
          doc.text(`•  ${ln}`, 16, sy);
          sy += 10;
        });
      });
    }
    y = 44;
    doc.setTextColor(...ink);
  } else {
    const centered = id === 'classic' || id === 'elegant' || id === 'ivy';
    doc.setFont(font, 'bold');
    doc.setFontSize(nameSize);
    doc.setTextColor(...ink);
    if (centered) doc.text(name, PAGE_W / 2, y, { align: 'center' });
    else doc.text(name, marginX, y);
    y += nameSize * 0.9 + 4;
    if (id === 'editorial') {
      doc.setDrawColor(...accent);
      doc.setLineWidth(2.4);
      doc.line(marginX, y, marginX + 64, y);
      y += 12;
    }
    if (data.jobTitle.trim()) {
      doc.setFont(font, id === 'modern' ? 'bold' : 'italic');
      doc.setFontSize(id === 'swiss' ? 10 : 11);
      doc.setTextColor(...accent);
      if (centered) doc.text(data.jobTitle.trim(), PAGE_W / 2, y, { align: 'center' });
      else doc.text(data.jobTitle.trim(), marginX, y);
      y += 14;
    }
    if (contacts.length && !isSidebar) {
      doc.setFont(font, 'normal');
      doc.setFontSize(8.3);
      doc.setTextColor(...slate);
      wrap(contacts.join('   ·   '), contentW + dateCol, 8.3).forEach((line) => {
        if (centered) doc.text(line, PAGE_W / 2, y, { align: 'center' });
        else doc.text(line, marginX, y);
        y += 11;
      });
    }
    y += 6;
    doc.setDrawColor(...accent);
    doc.setLineWidth(id === 'elegant' ? 1.1 : 0.7);
    doc.line(marginX, y, right, y);
    y += 8;
  }

  const writeParas = (text: string, x: number, width: number) => {
    const lines = wrap(text, width, bodySize);
    doc.setFont(font, 'normal');
    doc.setFontSize(bodySize);
    doc.setTextColor(...ink);
    lines.forEach((line) => {
      ensure(lead);
      doc.text(line, x, y);
      y += lead;
    });
  };

  if (data.summary.trim()) {
    section('Professional Summary');
    writeParas(data.summary.trim(), marginX + dateCol, contentW);
  }

  if (data.experience.length) {
    section('Experience');
    data.experience.forEach((exp) => {
      const bullets = exp.bullets.map((b) => b.trim()).filter(Boolean);
      const dates = dateRange(exp);
      ensure(34 + bullets.length * lead);
      const x0 = marginX + dateCol;
      if (isTimeline && dates) {
        doc.setFont(font, 'bold');
        doc.setFontSize(8);
        doc.setTextColor(...accent);
        wrap(dates, dateCol - 8, 8, 'bold').forEach((ln, i) => {
          doc.text(ln, marginX, y + i * 10);
        });
      }
      doc.setFont(font, 'bold');
      doc.setFontSize(isCompact ? 10 : 10.5);
      doc.setTextColor(...ink);
      const title = exp.position.trim() || 'Role';
      doc.text(title, x0, y);
      if (!isTimeline && dates) {
        doc.setFont(font, 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(...slate);
        doc.text(dates, right, y, { align: 'right' });
      }
      y += 12;
      const meta = [exp.company, exp.location].map((s) => s.trim()).filter(Boolean).join('  ·  ');
      if (meta) {
        doc.setFont(font, 'italic');
        doc.setFontSize(9);
        doc.setTextColor(...accent);
        doc.text(meta, x0, y);
        y += 12;
      }
      doc.setFont(font, 'normal');
      doc.setFontSize(bodySize);
      doc.setTextColor(...ink);
      bullets.forEach((b) => {
        const lines = wrap(b, contentW - 14, bodySize);
        ensure(lines.length * lead + 2);
        doc.text('•', x0, y);
        lines.forEach((line, i) => {
          doc.text(line, x0 + 12, y);
          y += lead;
          if (i < lines.length - 1) ensure(lead);
        });
      });
      y += isCompact ? 5 : 8;
    });
  }

  if (data.education.length) {
    section('Education');
    data.education.forEach((edu) => {
      ensure(28);
      const x0 = marginX + dateCol;
      const left = [edu.degree, edu.field].map((s) => s.trim()).filter(Boolean).join(' — ');
      doc.setFont(font, 'bold');
      doc.setFontSize(10);
      doc.setTextColor(...ink);
      if (left) doc.text(left, x0, y);
      if (edu.graduationYear.trim()) {
        doc.setFont(font, 'normal');
        doc.setFontSize(9);
        doc.setTextColor(...slate);
        doc.text(edu.graduationYear.trim(), right, y, { align: 'right' });
      }
      y += 12;
      const schoolLine = [edu.school, edu.gpa ? `GPA ${edu.gpa}` : ''].map((s) => s.trim()).filter(Boolean).join('  ·  ');
      if (schoolLine) {
        doc.setFont(font, 'italic');
        doc.setFontSize(9);
        doc.setTextColor(...slate);
        doc.text(schoolLine, x0, y);
        y += 12;
      }
      y += 3;
    });
  }

  if (data.skills.length && !isSidebar) {
    section('Skills');
    if (id === 'slate' || id === 'banner') {
      let x = marginX + dateCol;
      const rowH = 16;
      data.skills.forEach((s) => {
        doc.setFont(font, 'bold');
        doc.setFontSize(8);
        const w = doc.getTextWidth(s) + 14;
        if (x + w > right) {
          x = marginX + dateCol;
          y += rowH + 4;
        }
        ensure(rowH + 4);
        doc.setDrawColor(...accent);
        doc.setFillColor(232, 248, 249);
        doc.roundedRect(x, y - 10, w, rowH, 2, 2, 'FD');
        doc.setTextColor(...ink);
        doc.text(s, x + 7, y + 1);
        x += w + 6;
      });
      y += 18;
    } else {
      writeParas(data.skills.filter(Boolean).join('    ·    '), marginX + dateCol, contentW);
    }
  }

  if (data.certifications.length) {
    section('Certifications');
    data.certifications.filter(Boolean).forEach((c) => {
      ensure(lead);
      doc.setFont(font, 'normal');
      doc.setFontSize(bodySize);
      doc.setTextColor(...ink);
      doc.text(`•  ${c}`, marginX + dateCol, y);
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
