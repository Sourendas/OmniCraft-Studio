import {spawnSync} from 'child_process';
import fs from 'fs';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import {defineConfig, type Plugin} from 'vite';
import {SEO_PAGES} from './src/lib/seo';

const SITE = 'https://www.filetoolskit.com';

// Titles and descriptions come from SEO_PAGES in src/lib/seo.ts when a route has
// an entry there, so the raw HTML matches what the app sets after it loads.
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
    description: 'Combine PDFs in the order you add them. pdf-lib copies pages in this tab. No upload API. Encrypted files often fail. Free tool by Souren Das, Bengaluru.',
    h1: 'Merge PDF files into one in your browser',
    paragraphs: [
      'Merge PDF stacks two or more PDFs into one download, in the order the files appear in the list. The tool copies pages into a new document with pdf-lib and leaves the originals on disk untouched. Nothing is posted to a FileTools Kit processing server.',
      'A typical job is a cover letter, a resume, and a certificate that a form wants as one attachment. Add the cover first. If a page is sideways, rotate it before you merge, or use Organize PDF after. Encrypted files usually fail here. A watermark is optional overlay text, not a password.',
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
      'JPG to PDF places each image on its own page, in the order the file picker returns them, and downloads one PDF. The photos stay in this tab. There is no upload step and no account.',
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
    title: 'Convert images, audio, and DOCX files in your browser | FileTools Kit',
    description: 'Convert PNG, JPEG, and WebP images, decode audio to WAV, and turn a DOCX into plain text or a simple text PDF in this tab. No upload API.',
    h1: 'Convert images, audio, and DOCX files in your browser',
    paragraphs: [
      'File Converter re-encodes a PNG, JPEG, or WebP through the canvas in this tab, decodes audio your browser can play into a WAV file, and reads a DOCX into plain text or a simple text-only PDF. It does not handle video or HEIC, and a DOCX export keeps the words, not the Word layout, images, or tables.',
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
      'QR Generator encodes a URL, Wi-Fi details, a contact card (vCard), an email address, or a short line of text, and exports PNG or SVG. The code is drawn in this tab. FileTools Kit does not host a redirect behind it and does not count scans.',
      'Use a URL you have already opened. A long payload makes a dense code that a phone camera misses. If the address changes later, a printed code still points at the old one. SVG is the better export for a print shop. PNG is enough for a slide.',
      'Scan the export with your own phone before you print a stack of flyers.',
    ],
  },
  '/dev-tools': {
    title: 'Convert JSON and CSV, test regex, and hash text in your browser | FileTools Kit',
    description: 'Convert flat JSON to CSV and back, format SQL, test JavaScript regex, encode Base64, and make SHA hashes in this tab. No MD5.',
    h1: 'Developer text tools in your browser',
    paragraphs: [
      'Dev Tools has five small helpers: flat JSON to CSV and back, a SQL keyword formatter, a JavaScript regex tester, Base64 encode and decode, and SHA-1, SHA-256, SHA-384, and SHA-512 hashes through Web Crypto. Everything runs in this tab. The text is not posted to a FileTools Kit server. Base64 is encoding, not a lock.',
      'Use a hash to compare a line you already have, not as a password store. This page does not offer MD5. Do not paste a live password on a shared screen.',
      'The result is hex you can copy. A reload clears the box. Operator: Souren Das, Bengaluru.',
    ],
  },
};

function esc(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Shells for the smaller tools live in a JSON file so this config stays small.
const extraShellsPath = path.resolve(__dirname, 'scripts/route-shells-extra.json');
if (fs.existsSync(extraShellsPath)) {
  Object.assign(shells, JSON.parse(fs.readFileSync(extraShellsPath, 'utf8')) as Record<string, Shell>);
}

// Matches the whole boot block. The block contains a nested pill div, so the
// match must run to the closing div that sits right before the noscript note.
const BOOT_RE = /<div id="boot">[\s\S]*?<\/div>\s*(?=<noscript>)/;

function notFoundHtml(html: string) {
  const boot = '<div class="pill">HTTP 404</div><h1>Page not found</h1><p>That URL does not exist on FileTools Kit. It may have moved, or the link had a typo.</p><p><a href="/">All tools</a> · <a href="/guides.html">Guides</a> · <a href="/about.html">About</a> · <a href="/contact.html">Contact</a></p>';
  return html
    .replace(/<title>[\s\S]*?<\/title>/, '<title>Page not found | FileTools Kit</title>')
    .replace(/<meta name="description" content="[^"]*"\s*\/?>/, '<meta name="description" content="This page does not exist on FileTools Kit." />')
    .replace(/<meta name="robots" content="[^"]*"\s*\/?>/, '<meta name="robots" content="noindex,follow" />')
    .replace(/\s*<link rel="canonical" href="[^"]*"\s*\/?>/, '')
    .replace(BOOT_RE, `<div id="boot">${boot}</div>\n    `);
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
      for (const [route, shell] of Object.entries(shells)) {
        const seo = SEO_PAGES[route];
        const page = seo ? {...shell, title: seo.title, description: seo.description} : shell;
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
        out = out.replace(BOOT_RE, `<div id="boot">${bootHtml(route, page)}</div>\n    `);
        const dir = path.join(dist, route.slice(1));
        fs.mkdirSync(dir, {recursive: true});
        fs.writeFileSync(path.join(dir, 'index.html'), out);
      }
      // Keep the home page title and description in step with SEO_PAGES too.
      const home = SEO_PAGES['/'];
      if (home) {
        fs.writeFileSync(
          indexPath,
          html
            .replace(/<title>[\s\S]*?<\/title>/, `<title>${esc(home.title)}</title>`)
            .replace(/<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${esc(home.description)}" />`),
        );
      }
      // Vercel serves dist/404.html with a real 404 status for unknown paths.
      fs.writeFileSync(path.join(dist, '404.html'), notFoundHtml(html));
      const injector = path.resolve(__dirname, 'scripts/inject-schema.mjs');
      if (fs.existsSync(injector)) {
        const result = spawnSync(process.execPath, [injector], {stdio: 'inherit'});
        if (result.status !== 0) {
          throw new Error('inject-schema failed');
        }
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
      // The repository is public; source maps help debugging and Lighthouse.
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id: string) {
            // Keep Vite's preload helper and CommonJS shims out of the pdf chunk.
            // jsPDF uses dynamic imports, so without this the entry imports the
            // helper from the 1.4 MB pdf chunk and every page preloads it.
            if (id.includes('vite/preload-helper') || id.includes('commonjsHelpers') || id.includes('vite/modulepreload-polyfill')) return 'vite-runtime';
            if (!id.includes('node_modules')) return;
            // The encryption fork is only used on the password page; keep it apart.
            if (id.includes('@cantoo/pdf-lib')) return 'pdf-lib-encrypt';
            if (id.includes('/pdf-lib/') || id.includes('@pdf-lib/')) return 'pdf-lib';
            if (id.includes('jspdf')) return 'jspdf';
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
