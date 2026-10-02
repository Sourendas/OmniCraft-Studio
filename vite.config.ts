import fs from 'fs';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig, type Plugin} from 'vite';

const SITE = 'https://www.filetoolskit.com';

type Shell = {title: string; description: string; h1: string; paragraphs: string[]};

const shells: Record<string, Shell> = {
  '/pdf-suite': {
    title: 'PDF Suite — merge, split, rotate, and watermark in your browser | FileTools Kit',
    description: 'Merge, split, rotate, and watermark PDFs in this tab with pdf-lib. Files stay on your device. Encrypted PDFs often fail. Operated by Souren Das in Bengaluru.',
    h1: 'PDF Suite — merge, split, rotate, and watermark in this tab',
    paragraphs: [
      'PDF Suite is the combined workspace for ordinary PDF jobs: combine files, pull a page range, rotate a sideways scan, or stamp overlay text. The page reads each file with the browser File API and edits it with pdf-lib. FileTools Kit does not run an upload API that receives those PDFs.',
      'Use merge when a cover sheet and an appendix must travel as one file. Use split when a portal asked for pages 2–4 only. A watermark here is drawn text, not encryption and not redaction. Password-protected PDFs often fail in the browser; unlock them in a reader you trust before you retry.',
      'Work happens in this tab. A reload drops the in-memory file. Downloads you saved stay in your downloads folder. Operator: Souren Das, Bengaluru. The written limits are in the guides, not in a percent claim.',
    ],
  },
  '/merge-pdf': {
    title: 'Merge PDF files into one in your browser | FileTools Kit',
    description: 'Combine PDFs in the order you choose. pdf-lib copies pages in this tab. No upload API. Encrypted files often fail. Free tool by Souren Das, Bengaluru.',
    h1: 'Merge PDF files into one in your browser',
    paragraphs: [
      'Merge PDF stacks two or more PDFs into one download. You set the order. The tool copies pages into a new document with pdf-lib and leaves the originals on disk untouched. Nothing is posted to a FileTools Kit processing server.',
      'A typical job is a cover letter, a resume, and a certificate that a form wants as one attachment. Put the cover first. If a page is sideways, rotate it before you merge, or use Organize PDF after. Encrypted files usually fail here. A watermark is optional overlay text, not a password.',
      'Large packs can run out of tab memory. If the browser tab stalls, merge in smaller batches and then merge those results. Guide: how to merge PDF files in your browser.',
    ],
  },
  '/split-pdf': {
    title: 'Split a PDF and extract pages in your browser | FileTools Kit',
    description: 'Extract pages such as 1-3,5 and download a new PDF. The original is not rewritten. Runs in this tab with pdf-lib. No upload API.',
    h1: 'Split a PDF and extract pages in your browser',
    paragraphs: [
      'Split PDF copies the pages you name into a new file. A range like 1-3,5 keeps those pages and drops the rest from the download. The file you picked is not overwritten.',
      'Use this when an office asked for the signature page only, or when a scan mixed two documents. Page numbers are the order in the file, not printed labels. Encrypted PDFs often fail. This tool does not OCR a scan.',
      'The new file is built in tab memory and offered as a download. Reload clears the source. Operator: Souren Das, Bengaluru.',
    ],
  },
  '/compress-pdf': {
    title: 'Compress a PDF in your browser | FileTools Kit',
    description: 'Rewrite a PDF in this tab and compare before-and-after size. No upload API. Scanned or already-compressed files may not shrink.',
    h1: 'Compress a PDF in your browser',
    paragraphs: [
      'Compress PDF rewrites the document in this tab and shows the size before and after. It is a structural rewrite with pdf-lib, not a server that downsamples every image to a promised percent.',
      'Text-heavy files sometimes shrink. A phone scan that is already a JPEG inside the PDF often does not. If a portal rejects the file for size, shrink the images first, then build the PDF again, instead of expecting this button to invent a smaller scan.',
      'Keep the original until you open the download and check that pages still look right. FileTools Kit does not store either copy.',
    ],
  },
  '/jpg-to-pdf': {
    title: 'Convert JPG and PNG images to PDF in your browser | FileTools Kit',
    description: 'Turn JPEG or PNG images into a PDF with one page per image. Built in this tab. Photos are not uploaded.',
    h1: 'Convert JPG and PNG images to a PDF in your browser',
    paragraphs: [
      'JPG to PDF places each image on its own page, in the order you set, and downloads one PDF. The photos stay in this tab. There is no upload step and no account.',
      'Use it for rent receipts, ID scans, or whiteboard photos that a form will only accept as PDF. HEIC from a newer iPhone is not a pipeline here; export JPEG from the phone first. Very large photos make a heavy PDF. Shrink them in Image Optimizer if a portal caps the upload.',
      'The PDF is a picture of each image. Text in the photo is not selectable unless it already was. No OCR runs on this page.',
    ],
  },
  '/pdf-to-jpg': {
    title: 'Convert PDF pages to JPG or PNG in your browser | FileTools Kit',
    description: 'Render PDF pages as JPG or PNG and download one image or a ZIP. Runs in this tab with PDF.js. No upload API. No OCR.',
    h1: 'Convert PDF pages to JPG or PNG in your browser',
    paragraphs: [
      'PDF to JPG draws each page to an image and lets you download one picture or a ZIP. Rendering uses PDF.js in this tab. The PDF is not sent to a FileTools Kit server.',
      'Use it when a form wants a photo of a page, or when you need a slide image. The result is a picture. You cannot select the text in the JPG. This is not OCR and it will not recover a password-protected file.',
      'Higher scale makes a sharper image and a larger file. Check the first page before you export a long document.',
    ],
  },
  '/organize-pdf': {
    title: 'Reorder, rotate, and delete PDF pages in your browser | FileTools Kit',
    description: 'Thumbnails, drag to reorder, rotate or delete pages, then export a new PDF. Runs in this tab. No upload API.',
    h1: 'Reorder, rotate, and delete PDF pages in your browser',
    paragraphs: [
      'Organize PDF shows page thumbnails so you can drag a packet into the right order, rotate a sideways scan, or drop a blank page. Export writes a new PDF. The file you opened is not edited on disk.',
      'Do this before you add page numbers. Numbers stamped first will be wrong after you move pages. Encrypted files often fail to open. A deleted page is gone from the download only; your original remains until you delete it yourself.',
      'Long documents use more tab memory because each thumbnail is drawn here. If the tab slows, split the file first.',
    ],
  },
  '/password-protect-pdf': {
    title: 'Password protect a PDF with AES-256 in your browser | FileTools Kit',
    description: 'Encrypt a PDF with AES-256 so it opens only with your password. The file and password stay in this tab. They are not uploaded.',
    h1: 'Password protect a PDF in your browser',
    paragraphs: [
      'Password Protect encrypts a PDF with AES-256 so another reader asks for the password you chose. The password and the file stay in this tab. FileTools Kit does not keep a copy and cannot reset a forgotten password.',
      'Test the download in a second PDF reader before you send it. A watermark is not this. A stamp can be covered. Encryption is the lock. This page does not redact text underneath a box.',
      'Already-encrypted files often cannot be re-saved here. Unlock them in a reader you trust, then protect the unlocked copy if you still need a password.',
    ],
  },
  '/page-numbers': {
    title: 'Add page numbers to a PDF in your browser | FileTools Kit',
    description: 'Stamp page labels at the bottom or top, as 1, 1 / N, or Page 1 of N. Runs in this tab with pdf-lib. No upload API.',
    h1: 'Add page numbers to a PDF in your browser',
    paragraphs: [
      'Page Numbers draws a label on each page from a starting number you choose. Formats are a plain number, 1 / N, or Page 1 of N, at the top or bottom. The stamp is added with pdf-lib in this tab.',
      'Number the file after you merge, split, or reorder. If you number first and then move pages, the labels lie. The tool does not read numbers that are already printed in the scan. It counts pages in the file.',
      'The download is a new PDF. Open it and check the first and last page before you send it. A reload drops the source from the tab.',
    ],
  },
  '/resume-builder': {
    title: 'Build a resume PDF in your browser | FileTools Kit',
    description: 'Fill a form, pick a layout, and download a resume PDF with jsPDF in this tab. The match percentage is local keyword overlap, not an employer ATS.',
    h1: 'Build a resume PDF in your browser',
    paragraphs: [
      'Resume Builder turns the form you fill into a PDF with jsPDF. Twelve layouts. The file is built in this tab. FileTools Kit does not store the draft on a server you do not control. A local key may keep a draft on this device until you clear it.',
      'The match percentage compares words in your draft with words you pasted from a job post. It is not an employer applicant-tracking system and it does not predict an interview. Do not leave sample copy in the file you send.',
      'Open the download and confirm the text is selectable. A photo of a resume is a worse file than this export. Operator: Souren Das, Bengaluru.',
    ],
  },
  '/file-converter': {
    title: 'Convert JPG, PNG, and WebP in your browser | FileTools Kit',
    description: 'Change PNG, JPEG, or WebP via canvas in this tab. Not a DOCX, video, or audio suite. No upload API.',
    h1: 'Convert JPG, PNG, and WebP in your browser',
    paragraphs: [
      'File Converter re-encodes a PNG, JPEG, or WebP through the canvas in this tab and downloads the result. It is not a pipeline for video, audio, or HEIC. A DOCX can be read toward text or a simple PDF where the page says so. It will not preserve every Word layout.',
      'Pick the format the receiver asked for. PNG keeps a flat graphic sharper. JPEG is smaller for a photo. WebP is a good middle when the site accepts it. Converting does not add quality that was not in the source.',
      'The image stays in the tab. A reload clears it. There is no account.',
    ],
  },
  '/image-optimizer': {
    title: 'Compress images in your browser | FileTools Kit',
    description: 'Resize and recompress a photo in this tab. Keep the original. JPEG and WebP are usually lossy. No guaranteed percent.',
    h1: 'Compress images in your browser',
    paragraphs: [
      'Image Optimizer resizes and recompresses a photo in this tab so an email or form will take it. You set scale and quality and you can compare the size. There is no promised percent, because a screenshot and a raw photo do not shrink the same way.',
      'Keep the original. JPEG and WebP throws are lossy. A second pass on an already-small JPEG mostly adds blur. PNG screenshots often shrink more from resizing than from quality alone.',
      'Nothing is uploaded to a FileTools Kit processing server. The download is the file you send. The source stays where you picked it.',
    ],
  },
  '/qr-generator': {
    title: 'Create a QR code for a URL or line of text | FileTools Kit',
    description: 'Encode a URL or short text and export PNG or SVG in this tab. No short-link is hosted here. No scan analytics.',
    h1: 'Create a QR code in your browser',
    paragraphs: [
      'QR Generator encodes a URL or a short line and exports PNG or SVG. The code is drawn in this tab. FileTools Kit does not host a redirect behind it and does not count scans.',
      'Use a URL you have already opened. A long payload makes a dense code that a phone camera misses. If the address changes later, a printed code still points at the old one. SVG is the better export for a print shop. PNG is enough for a slide.',
      'Scan the export with your own phone before you print a stack of flyers.',
    ],
  },
  '/dev-tools': {
    title: 'Hash and encode text locally | FileTools Kit',
    description: 'SHA-256 via Web Crypto in this tab. Base64 is not encryption. The string is not sent to a hashing server.',
    h1: 'Hash and encode text in your browser',
    paragraphs: [
      'Dev Tools hashes text with Web Crypto and can encode or decode Base64 in this tab. The string is not posted to a FileTools Kit hashing server. SHA-256 is a one-way digest. Base64 is encoding, not a lock.',
      'Use a hash to compare a line you already have, not as a password store. This page does not offer MD5. Do not paste a live password on a shared screen.',
      'The result is hex you can copy. A reload clears the box. Operator: Souren Das, Bengaluru.',
    ],
  },
};

function esc(s: string) {
  return s.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>').replace(/"/g, '"');
}

function bootHtml(route: string, page: Shell) {
  const paras = page.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('');
  return `<div class="pill">Free tools · files stay in this tab</div><h1>${esc(page.h1)}</h1>${paras}<p><a href="/guides.html">Guides</a> · <a href="/about.html">About</a> · <a href="/privacy.html">Privacy</a> · <a href="${route}">This tool</a></p>`;
}

function routeShells(): Plugin {
  return {
    name: 'route-shells',
    apply: 'build',
    closeBundle() {
      const dist = path.resolve(__dirname, 'dist');
      const indexPath = path.join(dist, 'index.html');
      if (!fs.existsSync(indexPath)) return;
      const html = fs.readFileSync(indexPath, 'utf8');
      for (const [route, page] of Object.entries(shells)) {
        let out = html
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(page.title)}</title>`)
          .replace(
            /<meta name="description" content="[^"]*"\s*\/?>/,
            `<meta name="description" content="${esc(page.description)}" />`,
          )
          .replace(
            /<link rel="canonical" href="[^"]*"\s*\/?>/,
            `<link rel="canonical" href="${SITE}${route}" />`,
          );
        out = out.replace(/<div id="boot">[\s\S]*?<\/div>/, `<div id="boot">${bootHtml(route, page)}</div>`);
        const dir = path.join(dist, route.slice(1));
        fs.mkdirSync(dir, {recursive: true});
        fs.writeFileSync(path.join(dir, 'index.html'), out);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), routeShells()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            if (!id.includes('node_modules')) return;
            if (id.includes('pdf-lib') || id.includes('jspdf')) return 'pdf';
            if (id.includes('motion')) return 'motion';
            if (id.includes('react-dom') || id.includes('/react/')) return 'react';
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
