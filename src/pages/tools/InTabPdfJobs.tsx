import React, { useState } from 'react';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { downloadBlob } from '../../lib/utils';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

type Job = 'compress' | 'jpg' | 'numbers';
type NumberPosition = 'bottom-center' | 'bottom-right' | 'top-center';
type NumberFormat = 'n' | 'n-of-total' | 'page-n-of-total';

const POSITIONS: { id: NumberPosition; label: string }[] = [
  { id: 'bottom-center', label: 'Bottom centre' },
  { id: 'bottom-right', label: 'Bottom right' },
  { id: 'top-center', label: 'Top centre' },
];

const FORMATS: { id: NumberFormat; label: string }[] = [
  { id: 'n', label: '1' },
  { id: 'n-of-total', label: '1 / N' },
  { id: 'page-n-of-total', label: 'Page 1 of N' },
];

function formatNumber(format: NumberFormat, n: number, last: number): string {
  if (format === 'n-of-total') return `${n} / ${last}`;
  if (format === 'page-n-of-total') return `Page ${n} of ${last}`;
  return String(n);
}

const TITLES: Record<Job, { h1: string; lead: string }> = {
  compress: {
    h1: 'Compress PDF',
    lead: 'Light rewrite in this tab: pages are copied into a new file and saved with object streams. Image-heavy scans often barely shrink. Keep the original.',
  },
  jpg: {
    h1: 'JPG to PDF',
    lead: 'Each JPEG or PNG becomes one PDF page at its pixel size. Work runs with pdf-lib in this tab.',
  },
  numbers: {
    h1: 'Add page numbers',
    lead: 'Numbers are drawn on every page of the files you add, in the order the file picker returns them. Choose the position and format first. The numbers are an overlay on the existing pages.',
  },
};

export const InTabPdfJobs: React.FC<{ job: Job }> = ({ job }) => {
  const [status, setStatus] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [startAt, setStartAt] = useState(1);
  const [position, setPosition] = useState<NumberPosition>('bottom-center');
  const [numberFormat, setNumberFormat] = useState<NumberFormat>('n');
  const copy = TITLES[job];

  const onCompress = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setBusy(true);
    setStatus('Rewriting PDF in this tab...');
    try {
      const buf = await file.arrayBuffer();
      const doc = await PDFDocument.load(buf);
      const out = await PDFDocument.create();
      const pages = await out.copyPages(doc, doc.getPageIndices());
      pages.forEach((p) => out.addPage(p));
      const bytes = await out.save({ useObjectStreams: true });
      downloadBlob(new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' }), 'compressed.pdf');
      setStatus(file.name + ': ' + (file.size / 1024).toFixed(0) + ' KB -> ' + (bytes.byteLength / 1024).toFixed(0) + ' KB. Light rewrite only.');
    } catch {
      setStatus('Could not compress that file. Encrypted PDFs often fail.');
    } finally {
      setBusy(false);
    }
  };

  const onImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Copy the files before clearing the input: clearing it empties the live FileList.
    const list = e.target.files ? Array.from(e.target.files as ArrayLike<File>) : [];
    e.target.value = '';
    if (list.length === 0) return;
    setBusy(true);
    setStatus('Building PDF from images...');
    try {
      const pdf = await PDFDocument.create();
      for (const file of list) {
        const bytes = new Uint8Array(await file.arrayBuffer());
        const png = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');
        const image = png ? await pdf.embedPng(bytes) : await pdf.embedJpg(bytes);
        const page = pdf.addPage([image.width, image.height]);
        page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
      }
      const out = await pdf.save();
      downloadBlob(new Blob([out.buffer as ArrayBuffer], { type: 'application/pdf' }), 'images.pdf');
      setStatus('Built a ' + list.length + '-page PDF.');
    } catch {
      setStatus('Use JPEG or PNG only.');
    } finally {
      setBusy(false);
    }
  };

  const onNumbers = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // Copy the files before clearing the input: clearing it empties the live FileList.
    const list = e.target.files ? Array.from(e.target.files as ArrayLike<File>) : [];
    e.target.value = '';
    if (list.length === 0) return;
    setBusy(true);
    setStatus('Adding page numbers...');
    try {
      const out = await PDFDocument.create();
      const font = await out.embedFont(StandardFonts.Helvetica);
      const size = 10;
      const margin = 18;
      const docs: PDFDocument[] = [];
      for (const file of list) {
        docs.push(await PDFDocument.load(await file.arrayBuffer()));
      }
      const total = docs.reduce((sum, doc) => sum + doc.getPageCount(), 0);
      const last = startAt + total - 1;
      let n = startAt;
      for (const doc of docs) {
        const pages = await out.copyPages(doc, doc.getPageIndices());
        pages.forEach((page) => {
          const { width, height } = page.getSize();
          const label = formatNumber(numberFormat, n, last);
          const textWidth = font.widthOfTextAtSize(label, size);
          const x = position === 'bottom-right' ? width - margin - textWidth : (width - textWidth) / 2;
          const y = position === 'top-center' ? height - margin - size : margin;
          page.drawText(label, { x, y, size, font, color: rgb(0.2, 0.2, 0.2) });
          out.addPage(page);
          n += 1;
        });
      }
      const bytes = await out.save();
      downloadBlob(new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' }), 'page-numbers.pdf');
      setStatus(`Numbered ${total} page(s), ${formatNumber(numberFormat, startAt, last)} to ${formatNumber(numberFormat, last, last)}.`);
    } catch {
      setStatus('Could not add page numbers. Encrypted PDFs often fail.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#EA580C] mb-4">
        <ArrowLeft className="w-3.5 h-3.5" /> All tools
      </Link>
      <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">{copy.h1}</h1>
      <p className="mt-2 text-sm text-slate-600 font-medium">{copy.lead}</p>
      <p className="mt-2 text-xs text-slate-500">
        Related: <Link className="text-[#C2410C] font-bold underline" to="/pdf-suite">PDF Suite</Link>
        {' · '}
        <Link className="text-[#C2410C] font-bold underline" to="/merge-pdf">Merge PDF</Link>
        {' · '}
        <Link className="text-[#C2410C] font-bold underline" to="/split-pdf">Split PDF</Link>
        {' · '}
        <Link className="text-[#C2410C] font-bold underline" to="/organize-pdf">Organize PDF</Link>
        {' · '}
        <Link className="text-[#C2410C] font-bold underline" to="/pdf-to-jpg">PDF to JPG</Link>
      </p>
      {status && (
        <div className="mt-4 p-3.5 rounded-2xl bg-[#FFEDD5] border border-[#FDBA74] text-xs text-[#C2410C] font-bold">{status}</div>
      )}
      <div className="mt-6 rounded-3xl bg-white border border-slate-200 p-6 space-y-4">
        {job === 'compress' && (
          <label className="block cursor-pointer">
            <span className="flex items-center justify-center w-full py-3 rounded-full bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white text-xs font-black">
              {busy ? 'Working...' : 'Choose a PDF to compress'}
            </span>
            <input type="file" accept="application/pdf,.pdf" className="hidden" disabled={busy} onChange={onCompress} />
          </label>
        )}
        {job === 'jpg' && (
          <label className="block cursor-pointer">
            <span className="flex items-center justify-center w-full py-3 rounded-full bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white text-xs font-black">
              {busy ? 'Working...' : 'Choose JPEG or PNG files'}
            </span>
            <input type="file" accept="image/jpeg,image/png,.jpg,.jpeg,.png" multiple className="hidden" disabled={busy} onChange={onImages} />
          </label>
        )}
        {job === 'numbers' && (
          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              Start at
              <input type="number" min={1} value={startAt} onChange={(e) => setStartAt(parseInt(e.target.value, 10) || 1)} className="mt-1 w-full px-3.5 py-2 rounded-xl bg-[#FFF7ED] border border-slate-200" />
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="block text-xs font-bold text-slate-700">
                Position
                <select value={position} onChange={(e) => setPosition(e.target.value as NumberPosition)} className="mt-1 w-full px-3.5 py-2 rounded-xl bg-[#FFF7ED] border border-slate-200">
                  {POSITIONS.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
              </label>
              <label className="block text-xs font-bold text-slate-700">
                Format
                <select value={numberFormat} onChange={(e) => setNumberFormat(e.target.value as NumberFormat)} className="mt-1 w-full px-3.5 py-2 rounded-xl bg-[#FFF7ED] border border-slate-200">
                  {FORMATS.map((f) => (
                    <option key={f.id} value={f.id}>{f.label}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="block cursor-pointer">
              <span className="flex items-center justify-center w-full py-3 rounded-full bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white text-xs font-black">
                {busy ? 'Working...' : 'Choose PDF files'}
              </span>
              <input type="file" accept="application/pdf,.pdf" multiple className="hidden" disabled={busy} onChange={onNumbers} />
            </label>
          </div>
        )}
        <p className="text-[11px] text-slate-600 flex items-start gap-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          Files stay in this tab. FileTools Kit does not run an upload API for these documents.
        </p>
      </div>
    </div>
  );
};
