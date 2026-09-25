import type { PDFDocumentProxy } from 'pdfjs-dist';

type PdfJs = typeof import('pdfjs-dist');

let pdfjsPromise: Promise<PdfJs> | null = null;

/** Loads PDF.js and its worker only when a tool actually needs to render pages. */
export function loadPdfjs(): Promise<PdfJs> {
  if (!pdfjsPromise) {
    pdfjsPromise = Promise.all([import('pdfjs-dist'), import('pdfjs-dist/build/pdf.worker.min.mjs?url')]).then(
      ([pdfjs, worker]) => {
        pdfjs.GlobalWorkerOptions.workerSrc = worker.default;
        return pdfjs;
      }
    );
  }
  return pdfjsPromise;
}

export async function openPdf(data: ArrayBuffer): Promise<PDFDocumentProxy> {
  const pdfjs = await loadPdfjs();
  // PDF.js may transfer the buffer to its worker, so hand it a copy.
  return pdfjs.getDocument({ data: new Uint8Array(data.slice(0)) }).promise;
}

/** Renders one page (1-based) to a canvas at the given scale (1 = 72 DPI). */
export async function renderPageToCanvas(doc: PDFDocumentProxy, pageNumber: number, scale: number): Promise<HTMLCanvasElement> {
  const page = await doc.getPage(pageNumber);
  const viewport = page.getViewport({ scale });
  const canvas = document.createElement('canvas');
  canvas.width = Math.max(1, Math.floor(viewport.width));
  canvas.height = Math.max(1, Math.floor(viewport.height));
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas is not available in this browser.');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  await page.render({ canvasContext: ctx, viewport }).promise;
  page.cleanup();
  return canvas;
}

export function canvasToBlob(canvas: HTMLCanvasElement, type: 'image/jpeg' | 'image/png', quality?: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => (blob ? resolve(blob) : reject(new Error('Could not encode the page image.'))), type, quality);
  });
}

export function isPasswordError(err: unknown): boolean {
  const name = (err as { name?: string } | null)?.name ?? '';
  const message = (err as { message?: string } | null)?.message ?? '';
  return name === 'PasswordException' || /encrypt|password/i.test(message);
}

/** Parses a 1-based page list such as "1-3,5" into sorted unique page numbers within 1..pageCount. */
export function parsePageList(input: string, pageCount: number): number[] {
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
}
