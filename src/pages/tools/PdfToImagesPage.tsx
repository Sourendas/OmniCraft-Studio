import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck } from 'lucide-react';
import { downloadBlob } from '../../lib/utils';
import { canvasToBlob, isPasswordError, openPdf, parsePageList, renderPageToCanvas } from '../../lib/pdfRender';
import { buildZip, type ZipEntry } from '../../lib/zipStore';

type Format = 'jpg' | 'png';

const SCALES = [
  { id: 'screen', label: 'Screen (108 DPI)', scale: 1.5 },
  { id: 'standard', label: 'Standard (144 DPI)', scale: 2 },
  { id: 'print', label: 'Print (216 DPI)', scale: 3 },
] as const;

type ScaleId = (typeof SCALES)[number]['id'];

const LARGE_PAGE_COUNT = 50;

export const PdfToImagesPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [format, setFormat] = useState<Format>('jpg');
  const [scaleId, setScaleId] = useState<ScaleId>('standard');
  const [range, setRange] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    e.target.value = '';
    if (!picked) return;
    if (picked.type !== 'application/pdf' && !picked.name.toLowerCase().endsWith('.pdf')) {
      setStatus('Please choose a PDF file.');
      return;
    }
    setBusy(true);
    setStatus('Reading PDF in this tab...');
    try {
      const doc = await openPdf(await picked.arrayBuffer());
      setFile(picked);
      setPageCount(doc.numPages);
      setRange(doc.numPages > 1 ? `1-${doc.numPages}` : '1');
      setStatus(
        `${picked.name}: ${doc.numPages} page(s).` +
          (doc.numPages > LARGE_PAGE_COUNT ? ' Large documents take a while and use a lot of memory; consider a smaller page range.' : '')
      );
      await doc.destroy();
    } catch (err) {
      console.error(err);
      setFile(null);
      setPageCount(0);
      setStatus(
        isPasswordError(err)
          ? 'This PDF is password-protected. Remove the password in your PDF reader, then try again.'
          : 'Could not read this PDF. It may be damaged or not a PDF.'
      );
    } finally {
      setBusy(false);
    }
  };

  const onExport = async () => {
    if (!file) return;
    const pages = parsePageList(range, pageCount);
    if (pages.length === 0) {
      setStatus(`No valid pages in that range. Use e.g. 1-3,5 (this PDF has ${pageCount} page(s)).`);
      return;
    }
    const scale = SCALES.find((s) => s.id === scaleId)?.scale ?? 2;
    const mime = format === 'jpg' ? 'image/jpeg' : 'image/png';
    const base = file.name.replace(/\.pdf$/i, '') || 'document';
    const pad = String(pageCount).length;
    setBusy(true);
    try {
      const doc = await openPdf(await file.arrayBuffer());
      const entries: ZipEntry[] = [];
      for (let i = 0; i < pages.length; i++) {
        setStatus(`Rendering page ${i + 1} of ${pages.length}...`);
        const canvas = await renderPageToCanvas(doc, pages[i], scale);
        const blob = await canvasToBlob(canvas, mime, format === 'jpg' ? 0.9 : undefined);
        canvas.width = 0;
        canvas.height = 0;
        entries.push({
          name: `${base}-page-${String(pages[i]).padStart(pad, '0')}.${format}`,
          data: new Uint8Array(await blob.arrayBuffer()),
        });
      }
      await doc.destroy();
      if (entries.length === 1) {
        downloadBlob(new Blob([entries[0].data as BlobPart], { type: mime }), entries[0].name);
        setStatus(`Downloaded ${entries[0].name}.`);
      } else {
        const zip = buildZip(entries);
        downloadBlob(zip, `${base}-${format}.zip`);
        setStatus(`Downloaded ${base}-${format}.zip with ${entries.length} images (${(zip.size / 1024).toFixed(0)} KB).`);
      }
    } catch (err) {
      console.error(err);
      setStatus('Could not render these pages. Try a lower quality or a smaller page range.');
    } finally {
      setBusy(false);
    }
  };

  const optionClass = (active: boolean) =>
    `px-3.5 py-2 rounded-full text-xs font-black border ${
      active ? 'bg-[#FFEDD5] border-[#FDBA74] text-[#C2410C]' : 'bg-white border-slate-200 text-slate-600'
    }`;

  return (
    <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#EA580C] mb-4">
        <ArrowLeft className="w-3.5 h-3.5" /> All tools
      </Link>
      <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">PDF to JPG or PNG</h1>
      <p className="mt-2 text-sm text-slate-600 font-medium">
        Render PDF pages as images with PDF.js in this tab. One page downloads as an image; several pages download as a ZIP. The images are
        pictures of the pages, so text is no longer selectable.
      </p>
      <p className="mt-2 text-xs text-slate-500">
        Related: <Link className="text-[#C2410C] font-bold underline" to="/jpg-to-pdf">JPG to PDF</Link>
        {' · '}
        <Link className="text-[#C2410C] font-bold underline" to="/organize-pdf">Organize PDF</Link>
        {' · '}
        <Link className="text-[#C2410C] font-bold underline" to="/guides/pdf-to-jpg-in-browser">Guide</Link>
      </p>
      {status && (
        <div role="status" className="mt-4 p-3.5 rounded-2xl bg-[#FFEDD5] border border-[#FDBA74] text-xs text-[#C2410C] font-bold">
          {status}
        </div>
      )}
      <div className="mt-6 rounded-3xl bg-white border border-slate-200 p-6 space-y-5">
        <label className="block cursor-pointer">
          <span className="flex items-center justify-center w-full py-3 rounded-full bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white text-xs font-black">
            {busy ? 'Working...' : file ? 'Choose a different PDF' : 'Choose a PDF'}
          </span>
          <input type="file" accept="application/pdf,.pdf" className="hidden" disabled={busy} onChange={onPick} data-testid="pdf-input" />
        </label>

        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700">Format</p>
          <div className="flex flex-wrap gap-2">
            <button type="button" className={optionClass(format === 'jpg')} onClick={() => setFormat('jpg')} disabled={busy}>
              JPG (smaller)
            </button>
            <button type="button" className={optionClass(format === 'png')} onClick={() => setFormat('png')} disabled={busy}>
              PNG (sharper, larger)
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-bold text-slate-700">Resolution</p>
          <div className="flex flex-wrap gap-2">
            {SCALES.map((s) => (
              <button key={s.id} type="button" className={optionClass(scaleId === s.id)} onClick={() => setScaleId(s.id)} disabled={busy}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <label className="block text-xs font-bold text-slate-700">
          Pages{pageCount ? ` (1-${pageCount})` : ''}
          <input
            type="text"
            value={range}
            onChange={(e) => setRange(e.target.value)}
            placeholder="e.g. 1-3, 5"
            disabled={!file || busy}
            className="mt-1 w-full px-3.5 py-2 rounded-xl bg-[#FFF7ED] border border-slate-200"
          />
        </label>

        <button
          type="button"
          onClick={onExport}
          disabled={!file || busy}
          className="w-full py-3 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-black text-emerald-800 disabled:opacity-50"
        >
          {busy ? 'Working...' : `Export ${format.toUpperCase()}`}
        </button>

        <p className="text-[11px] text-slate-600 flex items-start gap-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          Pages are rendered in this tab. FileTools Kit does not run an upload API for these documents.
        </p>
      </div>
    </div>
  );
};
