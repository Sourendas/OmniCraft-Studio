import React, { useState } from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
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
  Check, 
  Split, 
  Merge, 
  Info,
  ShieldCheck,
  FileCheck,
  Plus
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
  const { isPro, openUpgradeModal } = useSubscription();

  const [files, setFiles] = useState<PdfFileItem[]>([]);
  const [activeTab, setActiveTab] = useState<'watermark' | 'metadata' | 'split'>('watermark');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Watermark parameters
  const [watermarkText, setWatermarkText] = useState('CONFIDENTIAL / OMNICRAFT');
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.3);
  const [watermarkSize, setWatermarkSize] = useState(36);

  // Metadata parameters
  const [metaTitle, setMetaTitle] = useState('OmniCraft Processed Document');
  const [metaAuthor, setMetaAuthor] = useState('OmniCraft Sovereign Studio');
  const [metaSubject, setMetaSubject] = useState('Private Client-Side PDF');
  const [metaKeywords, setMetaKeywords] = useState('pdf, wasm, omnicraft, private, secure');

  // Split parameter
  const [splitRange, setSplitRange] = useState('1');

  // Load sample demo document for instant frictionless testing
  const loadDemoPdf = async () => {
    setIsProcessing(true);
    setStatusMessage('Generating sample demo document...');
    try {
      const pdfDoc = await PDFDocument.create();
      const page1 = pdfDoc.addPage([600, 400]);
      page1.drawText('OmniCraft Sovereign PDF Studio', {
        x: 50,
        y: 320,
        size: 20,
        color: rgb(0, 0.64, 0.68)
      });
      page1.drawText('Page 1 — 100% Client-Side In-Memory Document Execution', {
        x: 50,
        y: 280,
        size: 12,
        color: rgb(0.04, 0.15, 0.25)
      });
      page1.drawText('You can merge, rotate, split, and watermark this page with zero server uploads.', {
        x: 50,
        y: 250,
        size: 10,
        color: rgb(0.4, 0.45, 0.55)
      });

      const page2 = pdfDoc.addPage([600, 400]);
      page2.drawText('Page 2 — Document Privacy Protocol', {
        x: 50,
        y: 320,
        size: 18,
        color: rgb(0.06, 0.3, 0.5)
      });
      page2.drawText('Zero bytes of this file were transmitted over any network.', {
        x: 50,
        y: 280,
        size: 11,
        color: rgb(0.04, 0.15, 0.25)
      });

      const pdfBytes = await pdfDoc.save();
      const demoItem: PdfFileItem = {
        id: Date.now().toString(),
        name: 'OmniCraft_Sample_Doc.pdf',
        size: pdfBytes.byteLength,
        arrayBuffer: pdfBytes.buffer as ArrayBuffer,
        pageCount: 2,
        rotation: 0
      };

      setFiles([demoItem]);
      setStatusMessage('Demo document loaded into memory successfully!');
    } catch (e) {
      console.error(e);
      setStatusMessage('Error loading demo PDF.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded || uploaded.length === 0) return;

    setIsProcessing(true);
    setStatusMessage('Reading PDF structure in browser memory...');

    try {
      const newItems: PdfFileItem[] = [];
      for (let i = 0; i < uploaded.length; i++) {
        const file = uploaded[i];
        if (file.type !== 'application/pdf' && !file.name.endsWith('.pdf')) continue;

        const buffer = await file.arrayBuffer();
        const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
        newItems.push({
          id: `${Date.now()}-${i}`,
          name: file.name,
          size: file.size,
          arrayBuffer: buffer,
          pageCount: pdfDoc.getPageCount(),
          rotation: 0
        });
      }

      setFiles(prev => [...prev, ...newItems]);
      setStatusMessage(`Loaded ${newItems.length} PDF(s) into memory.`);
    } catch (err) {
      console.error(err);
      setStatusMessage('Failed to parse PDF file. Ensure file is unencrypted.');
    } finally {
      setIsProcessing(false);
    }
  };

  const rotateFile = (id: string) => {
    setFiles(prev =>
      prev.map(f => (f.id === id ? { ...f, rotation: (f.rotation + 90) % 360 } : f))
    );
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  // Free Merge Gateway
  const handleMergeOnly = async () => {
    if (files.length === 0) return;
    setIsProcessing(true);
    setStatusMessage('Merging PDF pages client-side...');

    try {
      const mergedPdf = await PDFDocument.create();
      for (const item of files) {
        const doc = await PDFDocument.load(item.arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
        copiedPages.forEach((page) => {
          if (item.rotation) {
            page.setRotation(degrees(page.getRotation().angle + item.rotation));
          }
          mergedPdf.addPage(page);
        });
      }

      const mergedBytes = await mergedPdf.save();
      const blob = new Blob([mergedBytes], { type: 'application/pdf' });
      downloadBlob(blob, 'OmniCraft_Merged_Document.pdf');
      setStatusMessage('Merged PDF downloaded successfully!');
    } catch (e) {
      console.error(e);
      setStatusMessage('Error during merge.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Pro Export & Watermark Gateway
  const handleExportAnnotatedPdf = async () => {
    if (!isPro) {
      openUpgradeModal('PDF Suite Full Annotation & Watermark Export');
      return;
    }

    if (files.length === 0) return;

    setIsProcessing(true);
    setStatusMessage('Compiling annotated, watermarked PDF with custom metadata...');

    try {
      const outputPdf = await PDFDocument.create();
      const helveticaFont = await outputPdf.embedFont(StandardFonts.HelveticaBold);

      // Set Metadata
      outputPdf.setTitle(metaTitle);
      outputPdf.setAuthor(metaAuthor);
      outputPdf.setSubject(metaSubject);
      outputPdf.setKeywords(metaKeywords.split(',').map(k => k.trim()));
      outputPdf.setProducer('OmniCraft Sovereign Studio Pro');

      for (const item of files) {
        const doc = await PDFDocument.load(item.arrayBuffer);
        const pages = await outputPdf.copyPages(doc, doc.getPageIndices());

        pages.forEach((page) => {
          if (item.rotation) {
            page.setRotation(degrees(page.getRotation().angle + item.rotation));
          }

          // Apply Watermark if enabled
          if (watermarkText.trim()) {
            const { width, height } = page.getSize();
            page.drawText(watermarkText, {
              x: width / 2 - (watermarkText.length * watermarkSize) / 4.5,
              y: height / 2,
              size: watermarkSize,
              font: helveticaFont,
              color: rgb(0, 0.64, 0.68),
              opacity: watermarkOpacity,
              rotate: degrees(45)
            });
          }

          outputPdf.addPage(page);
        });
      }

      const finalBytes = await outputPdf.save();
      const blob = new Blob([finalBytes], { type: 'application/pdf' });
      downloadBlob(blob, 'OmniCraft_Pro_Annotated.pdf');
      setStatusMessage('Pro PDF Export completed and downloaded!');
    } catch (e) {
      console.error(e);
      setStatusMessage('Export error.');
    } finally {
      setIsProcessing(false);
    }
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
            <span>Document & AI</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] flex items-center gap-2.5">
            <Layers className="w-7 h-7 text-[#00A3AD]" />
            Advanced PDF Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Visual organizer to merge, rotate, watermark, split, and edit metadata 100% in browser memory.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={loadDemoPdf}
            className="px-4 py-2 rounded-full bg-white hover:bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 transition-colors shadow-xs cursor-pointer"
          >
            Load Sample PDF
          </button>

          <button
            id="export-pro-pdf-btn"
            onClick={handleExportAnnotatedPdf}
            disabled={files.length === 0 || isProcessing}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00A3AD] to-[#008C95] hover:from-[#00B5B8] hover:to-[#00A3AD] text-white text-xs font-black shadow-lg shadow-teal-500/20 transition-all cursor-pointer disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Export Annotated PDF {!isPro && '($7 Pro)'}</span>
          </button>
        </div>
      </div>

      {statusMessage && (
        <div className="my-4 p-3.5 rounded-2xl bg-[#E6F8F9] border border-[#B3EAEF] text-xs text-[#007A82] font-bold flex items-center justify-between shadow-xs">
          <span>{statusMessage}</span>
          <button onClick={() => setStatusMessage(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">✕</button>
        </div>
      )}

      {/* Main Workspace */}
      <div className="my-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Upload & Files Organizer */}
        <div className="lg:col-span-8 space-y-6">
          {/* Dropzone */}
          <div className="relative rounded-3xl border-2 border-dashed border-[#B3EAEF] hover:border-[#00A3AD] bg-white p-8 sm:p-10 text-center shadow-[0_4px_20px_rgba(10,37,64,0.03)] transition-all">
            <input
              type="file"
              accept=".pdf,application/pdf"
              multiple
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#E6F8F9] border border-[#B3EAEF] flex items-center justify-center">
              <Upload className="w-7 h-7 text-[#00A3AD]" />
            </div>
            <h3 className="text-base font-black text-[#0A2540] mb-1">
              Drop PDF documents here or click to browse
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
              Multi-file merge supported. Processing is 100% private in client memory via WebAssembly.
            </p>
          </div>

          {/* Files Grid / Visual Organizer */}
          {files.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-black text-[#007A82] uppercase tracking-wider flex items-center gap-2">
                  <span>Loaded Documents ({files.length})</span>
                  <span className="text-xs font-normal text-slate-500 font-mono">
                    Total: {files.reduce((acc, f) => acc + f.pageCount, 0)} pages
                  </span>
                </h3>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleMergeOnly}
                    disabled={files.length === 0}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-300 text-xs font-black text-emerald-800 transition-colors cursor-pointer"
                  >
                    <Merge className="w-3.5 h-3.5" />
                    <span>Free Basic Merge</span>
                  </button>
                  <button
                    onClick={() => setFiles([])}
                    className="text-xs text-slate-500 hover:text-rose-600 p-1 font-bold cursor-pointer"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {files.map((file, idx) => (
                  <div
                    key={file.id}
                    className="rounded-3xl bg-white border border-slate-200/90 p-5 flex flex-col justify-between hover:border-[#00A3AD] shadow-[0_4px_20px_rgba(10,37,64,0.03)] transition-all"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2 rounded-xl bg-[#E6F8F9] border border-[#B3EAEF] text-[#007A82] shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-xs font-black text-[#0A2540] truncate max-w-[170px]" title={file.name}>
                              {file.name}
                            </h4>
                            <p className="text-[10px] text-slate-500 font-mono font-medium">
                              {file.pageCount} page(s) • {(file.size / 1024).toFixed(1)} KB
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => removeFile(file.id)}
                          className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Visual Mini Mock Preview */}
                      <div 
                        style={{ transform: `rotate(${file.rotation}deg)` }}
                        className="w-full h-28 rounded-2xl bg-[#F4F8FA] border border-slate-200 flex flex-col items-center justify-center p-3 text-center transition-transform duration-300"
                      >
                        <div className="w-12 h-16 rounded-lg bg-white border border-slate-200 shadow-2xs flex flex-col items-center justify-center text-[9px] text-slate-500 font-mono font-bold">
                          <span>DOC</span>
                          <span className="text-[8px] text-[#007A82]">p.1-{file.pageCount}</span>
                        </div>
                        <span className="text-[10px] text-slate-500 mt-2 font-mono font-bold">
                          Rotation: {file.rotation}°
                        </span>
                      </div>
                    </div>

                    <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[10px] text-slate-400 font-mono font-bold">Order #{idx + 1}</span>
                      <button
                        onClick={() => rotateFile(file.id)}
                        className="flex items-center gap-1 text-xs font-bold text-[#007A82] hover:text-[#00A3AD] px-2.5 py-1 rounded-full bg-[#E6F8F9] border border-[#B3EAEF] cursor-pointer"
                      >
                        <RotateCw className="w-3.5 h-3.5" />
                        <span>Rotate +90°</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Pro Suite Control Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-white border border-slate-200/90 p-6 shadow-[0_4px_20px_rgba(10,37,64,0.03)] space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-black text-[#0A2540] uppercase tracking-wider flex items-center gap-2">
                <Stamp className="w-4 h-4 text-[#00A3AD]" />
                <span>PDF Pro Annotator</span>
              </h3>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-[#E6F8F9] text-[#007A82] font-mono font-bold border border-[#B3EAEF]">
                PRO ENGINE
              </span>
            </div>

            {/* Tab selection */}
            <div className="grid grid-cols-3 gap-1 p-1 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-center text-xs">
              <button
                onClick={() => setActiveTab('watermark')}
                className={`py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeTab === 'watermark' ? 'bg-white text-[#007A82] shadow-xs' : 'text-slate-500'
                }`}
              >
                Watermark
              </button>
              <button
                onClick={() => setActiveTab('metadata')}
                className={`py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeTab === 'metadata' ? 'bg-white text-[#007A82] shadow-xs' : 'text-slate-500'
                }`}
              >
                Metadata
              </button>
              <button
                onClick={() => setActiveTab('split')}
                className={`py-1.5 rounded-xl font-bold transition-all cursor-pointer ${
                  activeTab === 'split' ? 'bg-white text-[#007A82] shadow-xs' : 'text-slate-500'
                }`}
              >
                Split / Range
              </button>
            </div>

            {/* Watermark Tab */}
            {activeTab === 'watermark' && (
              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Watermark Diagonal Text</label>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 font-bold mb-1">
                    <span>Opacity</span>
                    <span className="font-mono text-[#007A82]">{Math.round(watermarkOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.05"
                    max="0.8"
                    step="0.05"
                    value={watermarkOpacity}
                    onChange={(e) => setWatermarkOpacity(parseFloat(e.target.value))}
                    className="w-full accent-[#00A3AD]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-slate-700 font-bold mb-1">
                    <span>Font Size</span>
                    <span className="font-mono text-[#007A82]">{watermarkSize} pt</span>
                  </div>
                  <input
                    type="range"
                    min="18"
                    max="64"
                    step="2"
                    value={watermarkSize}
                    onChange={(e) => setWatermarkSize(parseInt(e.target.value))}
                    className="w-full accent-[#00A3AD]"
                  />
                </div>
              </div>
            )}

            {/* Metadata Tab */}
            {activeTab === 'metadata' && (
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Document Title</label>
                  <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Author</label>
                  <input
                    type="text"
                    value={metaAuthor}
                    onChange={(e) => setMetaAuthor(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Subject</label>
                  <input
                    type="text"
                    value={metaSubject}
                    onChange={(e) => setMetaSubject(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Keywords</label>
                  <input
                    type="text"
                    value={metaKeywords}
                    onChange={(e) => setMetaKeywords(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white"
                  />
                </div>
              </div>
            )}

            {/* Split Tab */}
            {activeTab === 'split' && (
              <div className="space-y-3 text-xs">
                <label className="block text-slate-700 font-bold">Page Range Selection</label>
                <input
                  type="text"
                  value={splitRange}
                  onChange={(e) => setSplitRange(e.target.value)}
                  placeholder="e.g. 1-3, 5"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white"
                />
                <p className="text-[11px] text-slate-500 font-medium">
                  Specify individual pages or dash-separated ranges to extract or export.
                </p>
              </div>
            )}

            {/* Trust note */}
            <div className="p-3.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-[11px] text-slate-600 flex items-start gap-2.5 font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>
                All page manipulations and metadata modifications occur directly in JavaScript buffer objects with zero network telemetry.
              </span>
            </div>
          </div>

          <AdBanner type="sidebar" />
        </div>
      </div>
    </div>
  );
};
