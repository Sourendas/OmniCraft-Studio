import React from 'react';
import { AdBanner } from '../../components/layout/AdBanner';
import {
  Layers, Upload, RotateCw, Download, Trash2, Stamp, FileText, ArrowLeft, Split, Merge, ShieldCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePdfSuite } from './usePdfSuite';

export const PdfSuitePage: React.FC = () => {
  const {
    files, setFiles, activeTab, setActiveTab, isProcessing, statusMessage, setStatusMessage,
    watermarkText, setWatermarkText, watermarkOpacity, setWatermarkOpacity, watermarkSize, setWatermarkSize,
    metaTitle, setMetaTitle, metaAuthor, setMetaAuthor, metaSubject, setMetaSubject, metaKeywords, setMetaKeywords,
    splitRange, setSplitRange,
    loadDemoPdf, handleFileUpload, rotateFile, removeFile, handleMergeOnly, handleSplit, handleExportAnnotatedPdf,
  } = usePdfSuite();

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
          <p className="text-xs text-slate-500 mt-2 font-medium">
            Guides:{' '}
            <Link to="/guides/merge-pdf-in-browser" className="text-[#C2410C] font-black underline underline-offset-2">merge ~20 PDFs</Link>
            {' · '}
            <Link to="/guides/split-pdf-pages" className="text-[#C2410C] font-black underline underline-offset-2">extract pages 2–4</Link>
            {' · '}
            <Link to="/guides/what-stays-in-the-tab" className="text-[#C2410C] font-black underline underline-offset-2">what stays in the tab</Link>
            {' · '}
            <Link to="/guides/compress-pdf-in-browser" className="text-[#C2410C] font-black underline underline-offset-2">compress a PDF</Link>
            {' · '}
            <Link to="/compress-pdf" className="text-[#C2410C] font-black underline underline-offset-2">Compress PDF tool</Link>
          </p>
          <p className="text-xs text-slate-500 mt-1 font-medium">
            More PDF tools:{' '}
            <Link to="/organize-pdf" className="text-[#C2410C] font-black underline underline-offset-2">Organize pages</Link>
            {' · '}
            <Link to="/pdf-to-jpg" className="text-[#C2410C] font-black underline underline-offset-2">PDF to JPG/PNG</Link>
            {' · '}
            <Link to="/page-numbers" className="text-[#C2410C] font-black underline underline-offset-2">Page numbers</Link>
            {' · '}
            <Link to="/password-protect-pdf" className="text-[#C2410C] font-black underline underline-offset-2">Password protect</Link>
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
          <button onClick={() => setStatusMessage(null)} className="text-slate-400">✕</button>
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
                          <p className="text-[10px] text-slate-500 font-mono">{file.pageCount} page(s) • {(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      </div>
                      <button onClick={() => removeFile(file.id)} className="text-slate-400 hover:text-rose-600"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                    <div style={{ transform: `rotate(${file.rotation}deg)` }} className="w-full h-28 rounded-2xl bg-[#FFF7ED] border border-slate-200 flex flex-col items-center justify-center">
                      <div className="w-12 h-16 rounded-lg bg-white border border-slate-200 flex flex-col items-center justify-center text-[9px] text-slate-500 font-mono font-bold"><span>DOC</span><span className="text-[8px] text-[#C2410C]">p.1-{file.pageCount}</span></div>
                      <span className="text-[10px] text-slate-500 mt-2 font-mono font-bold">Rotation: {file.rotation}° · placeholder tile</span>
                    </div>
                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono font-bold">Order #{idx + 1}</span>
                      <button onClick={() => rotateFile(file.id)} className="flex items-center gap-1 text-xs font-bold text-[#C2410C] px-2.5 py-1 rounded-full bg-[#FFEDD5] border border-[#FDBA74]"><RotateCw className="w-3.5 h-3.5" /><span>Rotate +90°</span></button>
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
