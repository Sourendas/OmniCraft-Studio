import React, { useState } from 'react';
import { AdBanner } from '../../components/layout/AdBanner';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import { downloadBlob } from '../../lib/utils';
import {
  Layers,
  Upload,
  RotateCw,
  Download,
  Trash2,
  Stamp,
  FileText,
  ArrowLeft,
  Split,
  Merge,
  ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface PdfFileItem {
  id: string;
  name: string;
  size: number;
  arrayBuffer: ArrayBuffer;
  pageCount: number;
  rotation: number;
}

export const PdfSuitePage: React.FC = () => {
  const [files, setFiles] = useState<PdfFileItem[]>([]);
  const [activeTab, setActiveTab] = useState<'watermark' | 'metadata' | 'split'>('watermark');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.3);
  const [watermarkSize, setWatermarkSize] = useState(36);
  const [metaTitle, setMetaTitle] = useState('Processed document');
  const [metaAuthor, setMetaAuthor] = useState('FileTools Kit');
  const [metaSubject, setMetaSubject] = useState('Edited in browser');
  const [metaKeywords, setMetaKeywords] = useState('pdf, filetoolskit');
  const [splitRange, setSplitRange] = useState('1');

  const loadDemoPdf = async () => {
    setIsProcessing(true);
    setStatusMessage('Generating sample document...');
    try {
      const pdfDoc = await PDFDocument.create();
      const page1 = pdfDoc.addPage([600, 400]);
      page1.drawText('FileTools Kit PDF', { x: 50, y: 320, size: 20, color: rgb(0.918, 0.345, 0.047) });
      page1.drawText('Page 1 \u2014 sample document', { x: 50, y: 280, size: 12, color: rgb(0.04, 0.15, 0.25) });
      page1.drawText('You can merge, rotate, split, and watermark this page in the browser.', { x: 50, y: 250, size: 10, color: rgb(0.4, 0.45, 0.55) });
      const page2 = pdfDoc.addPage([600, 400]);
      page2.drawText('Page 2 \u2014 sample page', { x: 50, y: 320, size: 18, color: rgb(0.06, 0.3, 0.5) });
      page2.drawText('This sample was created in this tab.', { x: 50, y: 280, size: 11, color: rgb(0.04, 0.15, 0.25) });
      const pdfBytes = await pdfDoc.save();
      setFiles([{
        id: Date.now().toString(),
        name: 'sample.pdf',
        size: pdfBytes.byteLength,
        arrayBuffer: pdfBytes.buffer as ArrayBuffer,
        pageCount: 2,
        rotation: 0
      }]);
      setStatusMessage('Sample document loaded.');
    } catch (e) {
      console.error(e);
      setStatusMessage('Error loading sample PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded || uploaded.length === 0) return;
    setIsProcessing(true);
    setStatusMessage('Reading PDF in this tab...');
    try {
      const newItems: PdfFileItem[] = [];
      for (let i = 0; i < uploaded.length; i++) {
        const file = uploaded[i];
        if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) continue;
        const buffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        newItems.push({ id: `${Date.now()}-${i}`, name: file.name, size: file.size, arrayBuffer: buffer, pageCount: pdfDoc.getPageCount(), rotation: 0 });
      }
      setFiles(prev => [...prev, ...newItems]);
      setStatusMessage(`Loaded ${newItems.length} PDF(s).`);
    } catch (err) {
      console.error(err);
      setStatusMessage('Could not read that PDF. Encrypted files may fail.');
    } finally {
      setIsProcessing(false);
    }
  };

  const rotateFile = (id: string) => setFiles(prev => prev.map(f => (f.id === id ? { ...f, rotation: (f.rotation + 90) % 360 } : f)));
  const removeFile = (id: string) => setFiles(prev => prev.filter(f => f.id !== id));

  const handleMergeOnly = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setStatusMessage('Merging PDF pages in this tab...');
    try {
      const mergedPdf = await PDFDocument.create();
      for (const item of files) {
        const doc = await PDFDocument.load(item.arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
        copiedPages.forEach((page) => {
          if (item.rotation) page.setRotation(degrees(page.getRotation().angle + item.rotation));
          mergedPdf.addPage(page);
        });
      }
      const mergedBytes = await mergedPdf.save();
      downloadBlob(new Blob([mergedBytes.buffer as ArrayBuffer], { type: 'application/pdf' }), 'merged.pdf');
      setStatusMessage('Merged PDF downloaded.');
    } catch (e) {
      console.error(e);
      setStatusMessage('Merge failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  const parsePageRange = (input: string, pageCount: number): number[] => {
    const pages = new Set<number>();
    for (const part of input.split(',').map((s) => s.trim()).filter(Boolean)) {
      if (part.includes('-')) {
        const [rawA, rawB] = part.split('-');
        const a = parseInt(rawA.trim(), 10);
        const b = parseInt(rawB.trim(), 10);
        if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
        for (let p = Math.min(a, b); p <= Math.max(a, b); p++) {
          if (p >= 1 && p <= pageCount) pages.add(p);
        }
      } else {
        const p = parseInt(part, 10);
        if (p >= 1 && p <= pageCount) pages.add(p);
      }
    }
    return Array.from(pages).sort((x, y) => x - y);
  };

  const handleSplit = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setStatusMessage('Extracting selected pages...');
    try {
      const source = files[0];
      const pageNumbers = parsePageRange(splitRange, source.pageCount);
      if (pageNumbers.length === 0) {
        setStatusMessage('No valid pages in that range. Use e.g. 1-3,5 (first loaded file).');
        return;
      }
      const doc = await PDFDocument.load(source.arrayBuffer);
      const outputPdf = await PDFDocument.create();
      const copied = await outputPdf.copyPages(doc, pageNumbers.map((n) => n - 1));
      copied.forEach((page) => outputPdf.addPage(page));
      const bytes = await outputPdf.save();
      downloadBlob(new Blob([bytes.buffer as ArrayBuffer], { type: 'application/pdf' }), 'split-pages.pdf');
      setStatusMessage(`Split complete: ${pageNumbers.length} page(s) from ${source.name}.`);
    } catch (e) {
      console.error(e);
      setStatusMessage('Split failed. Encrypted PDFs may fail.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExportAnnotatedPdf = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setStatusMessage('Building watermarked PDF...');
    try {
      const outputPdf = await PDFDocument.create();
      const helveticaFont = await outputPdf.embedFont(StandardFonts.HelveticaBold);
      outputPdf.setTitle(metaTitle);
      outputPdf.setAuthor(metaAuthor);
      outputPdf.setSubject(metaSubject);
      outputPdf.setKeywords(metaKeywords.split(',').map(k => k.trim()));
      outputPdf.setProducer('FileTools Kit');
      for (const item of files) {
        const doc = await PDFDocument.load(item.arrayBuffer);
        const pages = await outputPdf.copyPages(doc, doc.getPageIndices());
        pages.forEach((page) => {
          if (item.rotation) page.setRotation(degrees(page.getRotation().angle + item.rotation));
          if (watermarkText.trim()) {
            const { width, height } = page.getSize();
            page.drawText(watermarkText, {
              x: width / 2 - (watermarkText.length * watermarkSize) / 4.5,
              y: height / 2,
              size: watermarkSize,
              font: helveticaFont,
              color: rgb(0.918, 0.345, 0.047),
              opacity: watermarkOpacity,
              rotate: degrees(45)
            });
          }
          outputPdf.addPage(page);
        });
      }
      const finalBytes = await outputPdf.save();
      downloadBlob(new Blob([finalBytes.buffer as ArrayBuffer], { type: 'application/pdf' }), 'annotated.pdf');
      setStatusMessage('Annotated PDF downloaded.');
    } catch (e) {
      console.error(e);
      setStatusMessage('Export failed.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#C2410C] mb-1 font-bold">
            <Link to="/" className="text-slate-500 hover:text-[#EA580C] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> All Tools
            </Link>
            <span>/</span><span>Documents</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-[#EA580C]" /> PDF Suite
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Merge, rotate, split by page range, add a text watermark, and edit metadata in this tab. Preview tiles are placeholders, not rendered PDF pages. Encrypted PDFs may fail.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={loadDemoPdf} className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700">Load Sample PDF</button>
          <button onClick={handleExportAnnotatedPdf} disabled={files.length === 0 || isProcessing} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#EA580C] to-[#C2410C] text-white text-xs font-black disabled:opacity-50">
            <Download className="w-4 h-4" /><span>Export annotated PDF</span>
          </button>
        </div>
      </div>

      <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
        Encrypted PDFs may fail. Page tiles are placeholders, not a live render of your pages. Work runs in this tab with pdf-lib.
      </div>

      {statusMessage && (
        <div className="my-4 p-3.5 rounded-2xl bg-[#FFEDD5] border border-[#FDBA74] text-xs text-[#C2410C] font-bold flex items-center justify-between">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)} className="text-slate-400">\u2715</button>
        </div>
      )}

      <div className="my-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="relative rounded-3xl border-2 border-dashed border-[#FDBA74] hover:border-[#EA580C] bg-white p-8 text-center">
            <input type="file" accept=".pdf,application/pdf" multiple onChange={handleFileUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#FFEDD5] border border-[#FDBA74] flex items-center justify-center"><Upload className="w-7 h-7 text-[#EA580C]" /></div>
            <h3 className="text-base font-black text-[#0A2540] mb-1">Drop PDF documents here or click to browse</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">Multi-file merge supported. Files are read in this tab with pdf-lib. Encrypted PDFs may fail.</p>
          </div>

          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-[#C2410C] uppercase tracking-wider">Loaded documents ({files.length})</h3>
                <div className="flex items-center gap-2">
                  <button onClick={handleMergeOnly} className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-black text-emerald-800"><Merge className="w-3.5 h-3.5" /><span>Merge PDFs</span></button>
                  <button onClick={() => setFiles([])} className="text-xs text-slate-500 font-bold">Clear All</button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {files.map((file, idx) => (
                  <div key={file.id} className="rounded-3xl bg-white border border-slate-200 p-5">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="p-2 rounded-xl bg-[#FFEDD5] border border-[#FDBA74] text-[#C2410C]"><FileText className="w-5 h-5" /></div>
                        <div>
                          <h4 className="text-xs font-black text-[#0A2540] truncate max-w-[170px]" title={file.name}>{file.name}</h4>
                          <p className="text-[10px] text-slate-500 font-mono">{file.pageCount} page(s) \u2022 {(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button onClick={() => removeFile(file.id)} className="text-slate-400 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                    <div style={{ transform: `rotate(${file.rotation}deg)` }} className="w-full h-28 rounded-2xl bg-[#FFF7ED] border border-slate-200 flex flex-col items-center justify-center">
                      <div className="w-12 h-16 rounded-lg bg-white border border-slate-200 flex flex-col items-center justify-center text-[9px] text-slate-500 font-mono font-bold"><span>DOC</span><span className="text-[8px] text-[#C2410C]">p.1-{file.pageCount}</span></div>
                      <span className="text-[10px] text-slate-500 mt-2 font-mono font-bold">Rotation: {file.rotation}\u00b0 \u00b7 placeholder tile</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono font-bold">Order #{idx + 1}</span>
                      <button onClick={() => rotateFile(file.id)} className="flex items-center gap-1 text-xs font-bold text-[#C2410C] px-2.5 py-1 rounded-full bg-[#FFEDD5] border border-[#FDBA74]"><RotateCw className="w-3.5 h-3.5" /><span>Rotate +90\u00b0</span></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-black text-[#0A2540] uppercase tracking-wider flex items-center gap-2"><Stamp className="w-4 h-4 text-[#EA580C]" /><span>PDF tools</span></h3>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#FFEDD5] text-[#C2410C] font-mono font-bold border border-[#FDBA74]">pdf-lib</span>
            </div>
            <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-[#FFF7ED] border border-slate-200 text-center text-xs">
              {(['watermark','metadata','split'] as const).map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`py-1.5 rounded-xl font-bold ${activeTab === tab ? 'bg-white text-[#C2410C]' : 'text-slate-500'}`}>{tab === 'split' ? 'Split / Range' : tab[0].toUpperCase()+tab.slice(1)}</button>
              ))}
            </div>
            {activeTab === 'watermark' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Watermark text</label>
                  <input type="text" value={watermarkText} onChange={(e) => setWatermarkText(e.target.value)} className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFF7ED] border border-slate-200" />
                </div>
                <div>
                  <div className="flex justify-between text-slate-700 font-bold mb-1"><span>Opacity</span><span className="font-mono text-[#C2410C]">{Math.round(watermarkOpacity * 100)}%</span></div>
                  <input type="range" min="0.05" max="0.8" step="0.05" value={watermarkOpacity} onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))} className="w-full accent-[#EA580C]" />
                </div>
                <div>
                  <div className="flex justify-between text-slate-700 font-bold mb-1"><span>Font size</span><span className="font-mono text-[#C2410C]">{watermarkSize} pt</span></div>
                  <input type="range" min="18" max="64" step="2" value={watermarkSize} onChange={(e) => setWatermarkSize(parseInt(e.target.value))} className="w-full accent-[#EA580C]" />
                </div>
              </div>
            )}
            {activeTab === 'metadata' && (
              <div className="space-y-3 text-xs">
                <div><label className="block text-slate-700 font-bold mb-1">Title</label><input type="text" value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} className="w-full px-3.5 py-2 rounded-xl bg-[#FFF7ED] border border-slate-200" /></div>
                <div><label className="block text-slate-700 font-bold mb-1">Author</label><input type="text" value={metaAuthor} onChange={(e) => setMetaAuthor(e.target.value)} className="w-full px-3.5 py-2 rounded-xl bg-[#FFF7ED] border border-slate-200" /></div>
                <div><label className="block text-slate-700 font-bold mb-1">Subject</label><input type="text" value={metaSubject} onChange={(e) => setMetaSubject(e.target.value)} className="w-full px-3.5 py-2 rounded-xl bg-[#FFF7ED] border border-slate-200" /></div>
                <div><label className="block text-slate-700 font-bold mb-1">Keywords</label><input type="text" value={metaKeywords} onChange={(e) => setMetaKeywords(e.target.value)} className="w-full px-3.5 py-2 rounded-xl bg-[#FFF7ED] border border-slate-200" /></div>
              </div>
            )}
            {activeTab === 'split' && (
              <div className="space-y-3 text-xs">
                <label className="block text-slate-700 font-bold">Page range (first loaded file)</label>
                <input type="text" value={splitRange} onChange={(e) => setSplitRange(e.target.value)} placeholder="e.g. 1-3, 5" className="w-full px-3.5 py-2.5 rounded-2xl bg-[#FFF7ED] border border-slate-200" />
                <p className="text-[11px] text-slate-500 font-medium">1-based pages, comma-separated. Example: 1-3,5. Uses the first loaded file.</p>
                <button type="button" onClick={handleSplit} disabled={files.length === 0 || isProcessing} className="w-full flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full bg-emerald-50 border border-emerald-300 text-xs font-black text-emerald-800 disabled:opacity-50"><Split className="w-3.5 h-3.5" /><span>Export split PDF</span></button>
              </div>
            )}
            <div className="p-3.5 rounded-2xl bg-[#FFF7ED] border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>All page work runs in this tab with pdf-lib. Split uses the first file in the list.</span>
            </div>
          </div>
          <AdBanner type="sidebar" />
        </div>
      </div>
    </div>
  );
};
