import React, { useRef, useState } from 'react';
import { AdBanner } from '../../components/layout/AdBanner';
import { compressPdfBytes, type CompressPreset } from '../../lib/compressPdf';
import { downloadBlob, formatBytes } from '../../lib/utils';
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Download,
  FileText,
  Loader2,
  Minimize2,
  Upload,
} from 'lucide-react';
import { Link } from 'react-router-dom';

type Status = 'idle' | 'working' | 'done' | 'error';

const PRESET_META: Record<CompressPreset, { label: string; helper: string }> = {
  low: {
    label: 'Low',
    helper: 'Smallest file target. More visible JPEG loss; text may look softer.',
  },
  medium: {
    label: 'Medium',
    helper: 'Balanced starting point for most PDFs.',
  },
  high: {
    label: 'High',
    helper: 'Higher detail. Output may be larger than Medium.',
  },
};

export const CompressPdfPage: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preset, setPreset] = useState<CompressPreset>('medium');
  const [sourceFile, setSourceFile] = useState<File | null>(null);
  const [originalSize, setOriginalSize] = useState(0);
  const [resultBytes, setResultBytes] = useState<Uint8Array | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('');
  const [note, setNote] = useState<string | undefined>();
  const [error, setError] = useState('');

  const resetForNewFile = () => {
    setResultBytes(null);
    setError('');
    setNote(undefined);
    setProgress(0);
    setStatus('idle');
    setStatusText('');
    setSourceFile(null);
    setOriginalSize(0);
    if (inputRef.current) inputRef.current.value = '';
  };

  const acceptFile = async (file: File, activePreset: CompressPreset) => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setError('Please choose a PDF file.');
      setStatus('error');
      return;
    }
    setSourceFile(file);
    setResultBytes(null);
    setError('');
    setNote(undefined);
    setProgress(0);
    setStatus('working');
    setStatusText('Reading PDF in this tab…');

    try {
      const input = await file.arrayBuffer();
      setOriginalSize(input.byteLength);
      setStatusText('Please keep this tab open while the PDF is processed.');
      const result = await compressPdfBytes(input, activePreset, ({ ratio, current, total }) => {
        setProgress(ratio);
        setStatusText(`Rendering page ${current} of ${total}…`);
      });
      setStatusText('Building compressed PDF…');
      setResultBytes(result.bytes);
      setNote(result.note);
      setStatus('done');
    } catch (cause) {
      console.error(cause);
      setError(
        'Could not read this PDF. Encrypted or damaged PDFs may fail in this browser tool. Try opening and re-saving the file in a desktop PDF reader, then try again.'
      );
      setStatus('error');
    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) void acceptFile(file, preset);
  };

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (status === 'working') return;
    const file = e.dataTransfer.files?.[0];
    if (file) void acceptFile(file, preset);
  };

  const downloadResult = () => {
    if (!resultBytes || !sourceFile) return;
    const base = sourceFile.name.replace(/\.pdf$/i, '') || 'document';
    const name = note ? `${base}.pdf` : `${base}_compressed.pdf`;
    const copy = new Uint8Array(resultBytes.byteLength);
    copy.set(resultBytes);
    downloadBlob(new Blob([copy], { type: 'application/pdf' }), name);
  };

  const noSavings = Boolean(note);
  const outputSize = resultBytes?.byteLength ?? 0;

  return (
    <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen">
      <AdBanner />

      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#C2410C] mb-1 font-bold">
            <Link to="/" className="text-slate-500 hover:text-[#EA580C] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> All Tools
            </Link>
            <span>/</span>
            <span>Documents &amp; Career</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] flex items-center gap-2.5">
            <Minimize2 className="w-7 h-7 text-[#EA580C]" />
            Compress PDF in your browser
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Shrink a PDF in this tab. Files are not uploaded to our servers.
          </p>
          <p className="text-xs text-slate-500 mt-2 font-medium">
            <Link
              to="/guides/compress-pdf-in-browser"
              className="text-[#C2410C] font-black underline underline-offset-2"
            >
              Read the browser PDF compression guide
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-orange-200 bg-orange-50 p-4 text-sm text-[#0A2540] font-medium flex gap-3">
        <AlertTriangle className="w-5 h-5 text-[#EA580C] shrink-0 mt-0.5" />
        <p>
          This v1 rasterizes every page into a JPEG image. Text, links, forms, and vector content may not stay
          selectable or editable. Text-heavy or already-compressed PDFs may grow or barely shrink.
        </p>
      </div>

      <div className="mt-6 rounded-3xl bg-white border border-slate-200 p-6 shadow-sm space-y-4">
        <div>
          <h2 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">Compression level</h2>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            Savings depend on the source PDF; there is no guaranteed percentage.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3" role="radiogroup" aria-label="Compression level">
          {(Object.keys(PRESET_META) as CompressPreset[]).map((key) => {
            const active = preset === key;
            return (
              <button
                key={key}
                type="button"
                role="radio"
                aria-checked={active}
                disabled={status === 'working'}
                onClick={() => setPreset(key)}
                className={`text-left rounded-2xl border px-4 py-3 transition-all disabled:opacity-60 ${
                  active
                    ? 'bg-[#FFEDD5] border-[#EA580C] text-[#C2410C]'
                    : 'bg-[#FFF7ED] border-slate-200 text-slate-700 hover:bg-white'
                }`}
              >
                <div className="text-sm font-black">{PRESET_META[key].label}</div>
                <div className="text-[11px] font-medium mt-1 opacity-90">{PRESET_META[key].helper}</div>
              </button>
            );
          })}
        </div>
      </div>

      <label
        htmlFor="compress-pdf-input"
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className={`relative mt-6 block rounded-3xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
          status === 'working'
            ? 'border-slate-200 bg-slate-50 cursor-not-allowed'
            : 'border-[#FDBA74] hover:border-[#EA580C] bg-white'
        }`}
      >
        <input
          ref={inputRef}
          id="compress-pdf-input"
          type="file"
          accept=".pdf,application/pdf"
          onChange={onInputChange}
          disabled={status === 'working'}
          className="sr-only"
        />
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#FFEDD5] border border-[#FDBA74] flex items-center justify-center">
          {status === 'working' ? (
            <Loader2 className="w-7 h-7 text-[#EA580C] animate-spin" />
          ) : (
            <Upload className="w-7 h-7 text-[#EA580C]" />
          )}
        </div>
        <h3 className="text-base font-black text-[#0A2540] mb-1">Drop one PDF here or click to browse</h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
          One PDF at a time. Files are read and processed in this browser tab.
        </p>
        <p className="text-[11px] text-slate-500 mt-2 font-medium">
          For a smoother run, try a PDF with fewer than 50 pages.
        </p>
      </label>

      <p className="mt-4 text-xs text-slate-500 font-medium">
        Your PDF stays in this browser tab while this tool works. FileTools Kit does not upload it to a processing
        server.
      </p>

      {status === 'working' && (
        <div className="mt-6 rounded-3xl bg-white border border-slate-200 p-5 space-y-3" aria-live="polite">
          <div className="flex items-center gap-2 text-sm font-bold text-[#0A2540]">
            <Loader2 className="w-4 h-4 animate-spin text-[#EA580C]" />
            {statusText || 'Reading PDF in this tab…'}
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#EA580C] to-[#C2410C] transition-all"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 font-medium">
            Please keep this tab open while the PDF is processed.
          </p>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 rounded-3xl bg-rose-50 border border-rose-200 p-5 text-sm text-rose-900 font-medium">
          {error}
          <div className="mt-3">
            <button
              type="button"
              onClick={resetForNewFile}
              className="text-xs font-black text-[#C2410C] underline underline-offset-2"
            >
              Try another PDF
            </button>
          </div>
        </div>
      )}

      {status === 'done' && resultBytes && sourceFile && (
        <div className="mt-6 rounded-3xl bg-white border border-slate-200 p-6 space-y-4">
          <div className="flex items-start gap-3">
            {noSavings ? (
              <AlertTriangle className="w-6 h-6 text-amber-600 shrink-0" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
            )}
            <div>
              <h3 className="text-base font-black text-[#0A2540]">
                {noSavings ? 'Already optimized' : 'Compression complete'}
              </h3>
              {noSavings ? (
                <p className="text-xs text-slate-600 mt-1 font-medium">
                  This PDF did not get smaller at the selected setting. We kept the original bytes, so your download is
                  not a needlessly re-encoded copy.
                </p>
              ) : (
                <p className="text-xs text-slate-600 mt-1 font-medium flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> {sourceFile.name}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl bg-[#FFF7ED] border border-slate-200 p-4">
              <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Original</div>
              <div className="text-lg font-black text-slate-700">{formatBytes(originalSize)}</div>
            </div>
            <div className="rounded-2xl bg-[#FFF7ED] border border-slate-200 p-4">
              <div className="text-[10px] uppercase font-mono font-bold text-slate-400">Output</div>
              <div className={`text-lg font-black ${noSavings ? 'text-amber-700' : 'text-emerald-700'}`}>
                {formatBytes(outputSize)}
              </div>
            </div>
          </div>

          {note && <p className="text-xs font-bold text-amber-800">{note}</p>}

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={downloadResult}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white text-xs font-black"
            >
              <Download className="w-4 h-4" />
              {noSavings ? 'Download original PDF' : 'Download compressed PDF'}
            </button>
            <button
              type="button"
              onClick={resetForNewFile}
              className="px-4 py-2.5 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700"
            >
              Try another PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
