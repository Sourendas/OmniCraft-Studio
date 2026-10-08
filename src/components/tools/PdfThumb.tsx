import React, { useEffect, useState } from 'react';
import { openPdf, renderPageToCanvas } from '../../lib/pdfRender';

// Renders the first page of a PDF that is already in memory, using the same
// PDF.js loader as PDF to JPG and Organize PDF. Nothing leaves the tab.
export const PdfThumb: React.FC<{ data: ArrayBuffer; name: string }> = ({ data, name }) => {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    setSrc(null);
    setFailed(false);
    (async () => {
      try {
        const doc = await openPdf(data);
        const canvas = await renderPageToCanvas(doc, 1, 0.4);
        const url = canvas.toDataURL('image/jpeg', 0.8);
        await doc.destroy();
        if (alive) setSrc(url);
      } catch {
        if (alive) setFailed(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, [data]);

  if (src) {
    return <img src={src} alt={`First page of ${name}`} className="h-24 w-auto rounded-md border border-slate-200 bg-white shadow-sm" />;
  }
  return (
    <div className="h-24 w-16 rounded-md bg-white border border-slate-200 flex items-center justify-center text-[10px] text-slate-600 font-mono font-bold text-center px-1">
      {failed ? 'No preview' : 'Loading'}
    </div>
  );
};
