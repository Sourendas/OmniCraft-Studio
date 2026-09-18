import * as pdfjsLib from 'pdfjs-dist';
import workerUrl from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import { PDFDocument } from 'pdf-lib';

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

export type CompressPreset = 'low' | 'medium' | 'high';

type PresetConfig = { scale: number; quality: number };

const PRESETS: Record<CompressPreset, PresetConfig> = {
  low: { scale: 0.6, quality: 0.5 },
  medium: { scale: 1, quality: 0.7 },
  high: { scale: 1.5, quality: 0.85 },
};

function blobFromCanvas(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('Could not encode page'))),
      'image/jpeg',
      quality
    );
  });
}

export async function compressPdfBytes(
  input: ArrayBuffer,
  preset: CompressPreset,
  onProgress?: (info: { ratio: number; current: number; total: number }) => void
): Promise<{ bytes: Uint8Array; note?: string }> {
  const { scale, quality } = PRESETS[preset];
  const data = new Uint8Array(input.slice(0));
  const source = await pdfjsLib.getDocument({ data }).promise;
  const output = await PDFDocument.create();

  try {
    const total = source.numPages;
    for (let index = 1; index <= total; index += 1) {
      const page = await source.getPage(index);
      const baseViewport = page.getViewport({ scale: 1 });
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.ceil(viewport.width));
      canvas.height = Math.max(1, Math.ceil(viewport.height));
      const context = canvas.getContext('2d');
      if (!context) throw new Error('Canvas is not available in this browser');

      // pdfjs types vary by version; cast keeps Vite/tsc happy across minor releases
      await (
        page.render({
          canvasContext: context,
          viewport,
          canvas,
        } as Parameters<typeof page.render>[0])
      ).promise;

      const jpgBlob = await blobFromCanvas(canvas, quality);
      const jpgBytes = new Uint8Array(await jpgBlob.arrayBuffer());
      const image = await output.embedJpg(jpgBytes);
      const outPage = output.addPage([baseViewport.width, baseViewport.height]);
      outPage.drawImage(image, {
        x: 0,
        y: 0,
        width: baseViewport.width,
        height: baseViewport.height,
      });

      onProgress?.({ ratio: index / total, current: index, total });
      canvas.width = 1;
      canvas.height = 1;
      page.cleanup();
    }

    const rebuilt = await output.save();
    const original = new Uint8Array(input);
    if (rebuilt.byteLength >= original.byteLength) {
      return { bytes: original, note: 'Already optimized — downloaded original' };
    }
    return { bytes: rebuilt };
  } finally {
    await source.destroy();
  }
}
