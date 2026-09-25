import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { degrees, PDFDocument } from 'pdf-lib';
import { ArrowLeft, ChevronLeft, ChevronRight, RotateCw, ShieldCheck, Trash2 } from 'lucide-react';
import { downloadBlob } from '../../lib/utils';
import { isPasswordError, openPdf, renderPageToCanvas } from '../../lib/pdfRender';

type PageCard = { id: string; source: number; rotation: number; thumb: string | null };

const THUMB_WIDTH = 140;
const LARGE_PAGE_COUNT = 150;

export const OrganizePdfPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pages, setPages] = useState<PageCard[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const dragId = useRef<string | null>(null);
  const loadToken = useRef(0);

  const onPick = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const picked = e.target.files?.[0];
    e.target.value = '';
    if (!picked) return;
    if (picked.type !== 'application/pdf' && !picked.name.toLowerCase().endsWith('.pdf')) {
      setStatus('Please choose a PDF file.');
      return;
    }
    const token = ++loadToken.current;
    setBusy(true);
    setSelected(new Set());
    setStatus('Reading PDF in this tab...');
    try {
      const doc = await openPdf(await picked.arrayBuffer());
      const count = doc.numPages;
      const cards: PageCard[] = Array.from({ length: count }, (_, i) => ({ id: `p${i + 1}-${token}`, source: i + 1, rotation: 0, thumb: null }));
      setFile(picked);
      setPages(cards);
      setBusy(false);
      for (let i = 0; i < count; i++) {
        if (loadToken.current !== token) break;
        setStatus(`Drawing thumbnail ${i + 1} of ${count}...`);
        const page = await doc.getPage(i + 1);
        const base = page.getViewport({ scale: 1 });
        const canvas = await renderPageToCanvas(doc, i + 1, THUMB_WIDTH / base.width);
        const thumb = canvas.toDataURL('image/jpeg', 0.7);
        canvas.width = 0;
        canvas.height = 0;
        setPages((prev) => prev.map((p) => (p.source === i + 1 && p.id.endsWith(`-${token}`) ? { ...p, thumb } : p)));
      }
      await doc.destroy();
      if (loadToken.current === token) {
        setStatus(
          `${picked.name}: ${count} page(s). Drag cards or use the arrows to reorder, then export.` +
            (count > LARGE_PAGE_COUNT ? ' Very large documents can be slow in a browser tab.' : '')
        );
      }
    } catch (err) {
      console.error(err);
      setFile(null);
      setPages([]);
      setBusy(false);
      setStatus(
        isPasswordError(err)
          ? 'This PDF is password-protected. Remove the password in your PDF reader, then try again.'
          : 'Could not read this PDF. It may be damaged or not a PDF.'
      );
    }
  };

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const move = (id: string, delta: number) =>
    setPages((prev) => {
      const from = prev.findIndex((p) => p.id === id);
      const to = from + delta;
      if (from < 0 || to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [card] = next.splice(from, 1);
      next.splice(to, 0, card);
      return next;
    });

  const dropOn = (targetId: string) => {
    const sourceId = dragId.current;
    dragId.current = null;
    if (!sourceId || sourceId === targetId) return;
    setPages((prev) => {
      const from = prev.findIndex((p) => p.id === sourceId);
      const to = prev.findIndex((p) => p.id === targetId);
      if (from < 0 || to < 0) return prev;
      const next = [...prev];
      const [card] = next.splice(from, 1);
      next.splice(to, 0, card);
      return next;
    });
  };

  const rotate = (ids: string[]) =>
    setPages((prev) => prev.map((p) => (ids.includes(p.id) ? { ...p, rotation: (p.rotation + 90) % 360 } : p)));

  const remove = (ids: string[]) => {
    setPages((prev) => prev.filter((p) => !ids.includes(p.id)));
    setSelected((prev) => new Set([...prev].filter((id) => !ids.includes(id))));
  };

  const onExport = async () => {
    if (!file || pages.length === 0) return;
    setBusy(true);
    setStatus('Building the new PDF in this tab...');
    try {
      const src = await PDFDocument.load(await file.arrayBuffer());
      const out = await PDFDocument.create();
      const copied = await out.copyPages(src, pages.map((p) => p.source - 1));
      copied.forEach((page, i) => {
        const extra = pages[i].rotation;
        if (extra) page.setRotation(degrees((page.getRotation().angle + extra) % 360));
        out.addPage(page);
      });
      const bytes = await out.save();
      const base = file.name.replace(/\.pdf$/i, '') || 'document';
      downloadBlob(new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' }), `${base}-organized.pdf`);
      setStatus(`Downloaded ${base}-organized.pdf with ${pages.length} page(s). Your original file is unchanged.`);
    } catch (err) {
      console.error(err);
      setStatus(isPasswordError(err) ? 'Encrypted PDFs cannot be reorganized here.' : 'Could not build the new PDF.');
    } finally {
      setBusy(false);
    }
  };

  const selectedIds = pages.filter((p) => selected.has(p.id)).map((p) => p.id);
  const smallBtn = 'inline-flex items-center justify-center w-7 h-7 rounded-full border border-slate-200 bg-white text-slate-600 hover:text-[#C2410C] disabled:opacity-40';
  const barBtn = 'px-3.5 py-1.5 rounded-full text-xs font-black border disabled:opacity-40';

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <Link to="/" className="inline-flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-[#EA580C] mb-4">
        <ArrowLeft className="w-3.5 h-3.5" /> All tools
      </Link>
      <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">Organize PDF pages</h1>
      <p className="mt-2 text-sm text-slate-600 font-medium">
        See every page as a thumbnail, then reorder, rotate, or delete pages and export a new PDF. Thumbnails are drawn with PDF.js and the new
        file is built with pdf-lib, all in this tab.
      </p>
      <p className="mt-2 text-xs text-slate-500">
        Related: <Link className="text-[#C2410C] font-bold underline" to="/merge-pdf">Merge PDF</Link>
        {' · '}
        <Link className="text-[#C2410C] font-bold underline" to="/split-pdf">Split PDF</Link>
        {' · '}
        <Link className="text-[#C2410C] font-bold underline" to="/guides/organize-pdf-pages-in-browser">Guide</Link>
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

        {pages.length > 0 && (
          <>
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className={`${barBtn} bg-white border-slate-200 text-slate-600`} onClick={() => setSelected(new Set(pages.map((p) => p.id)))}>
                Select all
              </button>
              <button type="button" className={`${barBtn} bg-white border-slate-200 text-slate-600`} onClick={() => setSelected(new Set())} disabled={selectedIds.length === 0}>
                Clear selection
              </button>
              <button type="button" className={`${barBtn} bg-[#FFEDD5] border-[#FDBA74] text-[#C2410C]`} onClick={() => rotate(selectedIds)} disabled={selectedIds.length === 0}>
                Rotate selected
              </button>
              <button
                type="button"
                className={`${barBtn} bg-rose-50 border-rose-200 text-rose-700`}
                onClick={() => remove(selectedIds)}
                disabled={selectedIds.length === 0 || selectedIds.length === pages.length}
              >
                Delete selected
              </button>
              <span className="text-xs text-slate-500 font-medium">
                {pages.length} page(s) · {selectedIds.length} selected
              </span>
            </div>

            <ol className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4" aria-label="Pages in output order">
              {pages.map((p, index) => (
                <li
                  key={p.id}
                  draggable
                  onDragStart={() => (dragId.current = p.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    dropOn(p.id);
                  }}
                  className={`rounded-2xl border p-2 bg-[#FFF7ED] cursor-grab ${selected.has(p.id) ? 'border-[#EA580C] ring-2 ring-[#FDBA74]' : 'border-slate-200'}`}
                  data-testid="page-card"
                >
                  <button type="button" onClick={() => toggle(p.id)} aria-pressed={selected.has(p.id)} className="block w-full" title="Select page">
                    <div className="h-40 flex items-center justify-center overflow-hidden rounded-xl bg-white">
                      {p.thumb ? (
                        <img src={p.thumb} alt={`Page ${p.source}`} className="max-h-36 max-w-full shadow-sm transition-transform" style={{ transform: `rotate(${p.rotation}deg)` }} />
                      ) : (
                        <span className="text-[10px] text-slate-400 font-bold">Loading...</span>
                      )}
                    </div>
                  </button>
                  <div className="mt-2 flex items-center justify-between gap-1">
                    <span className="text-[11px] font-black text-[#0A2540]">
                      {index + 1}
                      <span className="text-slate-400 font-bold"> (p.{p.source})</span>
                    </span>
                    <span className="flex gap-1">
                      <button type="button" className={smallBtn} onClick={() => move(p.id, -1)} disabled={index === 0} aria-label={`Move page ${index + 1} earlier`}>
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className={smallBtn} onClick={() => move(p.id, 1)} disabled={index === pages.length - 1} aria-label={`Move page ${index + 1} later`}>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className={smallBtn} onClick={() => rotate([p.id])} aria-label={`Rotate page ${index + 1}`}>
                        <RotateCw className="w-3.5 h-3.5" />
                      </button>
                      <button type="button" className={smallBtn} onClick={() => remove([p.id])} disabled={pages.length === 1} aria-label={`Delete page ${index + 1}`}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </span>
                  </div>
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={onExport}
              disabled={busy}
              className="w-full py-3 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-black text-emerald-800 disabled:opacity-50"
            >
              {busy ? 'Working...' : `Export organized PDF (${pages.length} pages)`}
            </button>
          </>
        )}

        <p className="text-[11px] text-slate-600 flex items-start gap-2 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          Pages are drawn and rebuilt in this tab. FileTools Kit does not run an upload API for these documents.
        </p>
      </div>
    </div>
  );
};
