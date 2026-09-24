import { useState, type ChangeEvent } from 'react';
import { PDFDocument, rgb, degrees, StandardFonts } from 'pdf-lib';
import { downloadBlob } from '../../lib/utils';

export interface PdfFileItem {
  id: string;
  name: string;
  size: number;
  arrayBuffer: ArrayBuffer;
  pageCount: number;
  rotation: number;
}

export function usePdfSuite() {

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

  const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
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

  return {
    files, setFiles, activeTab, setActiveTab, isProcessing, statusMessage, setStatusMessage,
    watermarkText, setWatermarkText, watermarkOpacity, setWatermarkOpacity, watermarkSize, setWatermarkSize,
    metaTitle, setMetaTitle, metaAuthor, setMetaAuthor, metaSubject, setMetaSubject, metaKeywords, setMetaKeywords,
    splitRange, setSplitRange,
    loadDemoPdf, handleFileUpload, rotateFile, removeFile, handleMergeOnly, handleSplit, handleExportAnnotatedPdf,
  };
}
