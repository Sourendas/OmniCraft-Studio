# How I Built a 100% In-Browser PDF & Media Suite with Zero Server Costs (React 19 + pdf-lib + WebAssembly)

*Published by Souren Das · Bengaluru, India*  
*Live Site: [filetoolskit.com](https://www.filetoolskit.com) · Source Code: [GitHub](https://github.com/Sourendas/OmniCraft-Studio)*

---

Every time someone needs to merge two confidential PDF contracts, compress a medical scan, or convert an image, they do the same thing: they Google *"merge pdf online free"* and drag their private documents onto an unknown server.

Most popular online file conversion utilities (like Smallpdf or iLovePDF) upload your document to remote backend processing servers before returning a download. Even with strict retention policies, uploading personal tax returns, medical records, or government ID cards to a cloud server introduces unnecessary exposure.

A few months ago, I asked myself a question:

> **Why are we sending megabytes of sensitive documents across the wire in 2026 when modern browsers have multi-core CPUs, WebAssembly, and Canvas hardware acceleration?**

That question led to **[FileTools Kit](https://www.filetoolskit.com)**: a suite of 12+ document, image, and career utilities that run **100% inside your browser tab**. 

Here is the engineering breakdown of how it works, how we achieved zero server compute costs, and the technical hurdles of running heavy PDF tasks in client-side memory.

---

## 1. The Core Architecture: Zero-Upload File Pipelines

Instead of a traditional `Client -> Multipart POST -> Node/Python Server -> S3 -> Client` pipeline, FileTools Kit eliminates the server completely:

```
[ User File (Disk) ]
        │ (HTML5 File / Drag & Drop API)
        ▼
[ ArrayBuffer in Browser Memory ]
        │
   ┌────┴──────────────────────────────┐
   │ Client-Side In-Memory Engines     │
   ├───────────────────────────────────┤
   │ • PDF Suite: pdf-lib (Wasm/ESM)   │
   │ • PDF-to-JPG: PDF.js Canvas API   │
   │ • Images: HTML5 OffscreenCanvas   │
   │ • Audio: Web Audio API (WAV)      │
   │ • Hashes: Web Crypto API (SHA256) │
   └────┬──────────────────────────────┘
        ▼
[ Blob Object URL / Direct Download ]
```

### Advantages:
1. **Absolute Privacy:** Files never traverse the internet. No database, no S3 buckets, no cloud leaks.
2. **Infinite Scaling & Zero Server Costs:** Because all compute runs on the client machine, serving 1 user costs the exact same as serving 1,000,000 users—just static hosting bandwidth on Vercel's Edge CDN.
3. **Instant Latency:** No upload latency over slow connections. Merging two 20MB PDFs happens in milliseconds in local RAM.

---

## 2. In-Tab PDF Merging & Structural Rewriting with `pdf-lib`

For document manipulation, we use `pdf-lib` loaded dynamically on demand:

```typescript
import { PDFDocument } from 'pdf-lib';

async function mergePdfsInTab(files: File[]): Promise<Blob> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const arrayBuffer = await file.arrayBuffer();
    const doc = await PDFDocument.load(arrayBuffer);
    const copiedPages = await mergedPdf.copyPages(doc, doc.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  // Save using Object Streams to compress PDF structure
  const pdfBytes = await mergedPdf.save({ useObjectStreams: true });
  return new Blob([pdfBytes.buffer], { type: 'application/pdf' });
}
```

### The Compression Insight: Object Streams
Traditional PDF compressors often downscale images to 50% quality. But many bloated PDFs are text-heavy documents created with unoptimized generators. By re-encoding with `useObjectStreams: true`, `pdf-lib` bundles loose PDF dictionary references into compressed object streams, stripping away 20% to 60% of metadata overhead **without touching vector shapes or making text blurry**.

---

## 3. High-Quality Canvas Image Optimization

For JPEG, PNG, and WebP compression, we leverage browser canvas rendering directly:

```typescript
function compressImageInBrowser(img: HTMLImageElement, quality: number, format: 'image/webp' | 'image/jpeg'): Promise<Blob> {
  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.drawImage(img, 0, 0);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob!), format, quality);
  });
}
```

By allowing users to export directly to modern WebP, we regularly see 70–80% reductions in file size compared to original camera JPEGs, without sending a single pixel over the network.

---

## 4. Solving the Memory Limits of Mobile Browsers

Client-side file processing comes with one significant constraint: **RAM limits**. While a desktop MacBook or Windows workstation can allocate gigabytes of heap memory, Safari on iOS and Chrome on low-end Android devices will terminate tabs that consume more than 200–300 MB of RAM.

To keep FileTools Kit stable across mobile devices:
1. **Dynamic Chunk Loading:** `pdf-lib`, `jspdf`, `mammoth`, and `pdfjs-dist` are completely code-split via React `lazy()` and dynamic `import()`. The initial page load is lightweight (under 80 KB gzipped).
2. **Buffer Lifecycle Cleanup:** In-memory `ArrayBuffer` and `Blob` URL handles (`URL.createObjectURL`) are revoked immediately after the user triggers a download.
3. **Batch Merging Recommendations:** When users need to merge large 50+ page documents on mobile, the UI automatically prompts them to run smaller 10-page batches to keep heap usage well below mobile OS limits.

---

## 5. What’s Next & Open Source

FileTools Kit is completely open source under MIT. We just added:
- **Targeted portal compression:** Specialized tools for strict limits like `/compress-pdf-to-200kb` and `/compress-pdf-to-100kb`.
- **A Manifest V3 Chrome Extension** allowing 1-click access directly from your browser toolbar.
- **Workflow continuity** to help users organize, paginate, and protect their files in a single sitting.

If you’d like to try it out or contribute:
* **Web App:** [https://www.filetoolskit.com](https://www.filetoolskit.com)
* **GitHub Repository:** [https://github.com/Sourendas/OmniCraft-Studio](https://github.com/Sourendas/OmniCraft-Studio)

Star the repo or drop your feedback in the comments!
