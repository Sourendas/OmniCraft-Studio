export interface GuideArticle {
  slug: string;
  title: string;
  summary: string;
  toolRoute: string;
  toolLabel: string;
  updated: string;
  intro: string;
  whenToUse: string[];
  steps: { title: string; body: string }[];
  cannot: string[];
  privacy: string[];
  notes: string[];
}

export const GUIDES: GuideArticle[] = [
  {
    slug: 'merge-pdf-in-browser',
    title: 'How to merge PDF files in your browser',
    summary: 'Combine PDFs in this tab with pdf-lib. Nothing is uploaded to FileTools Kit.',
    toolRoute: '/pdf-suite',
    toolLabel: 'Open PDF Suite',
    updated: '3 September 2026',
    intro: 'Merging PDFs is a common chore: a cover sheet, an appendix, and a form that need to travel as one file. FileTools Kit does that merge in the tab you already have open. The PDF Suite reads each file with the browser File API, copies pages into a new document with pdf-lib, and lets you download the result. FileTools Kit does not run an upload API that receives those PDFs.',
    whenToUse: [
      'Use merge when you have two or more PDFs and want one file to send, print, or archive.',
      'Skip merge if you only need a subset of pages — that is split. Skip it if the PDFs are password-protected; encrypted files often fail in the browser.',
    ],
    steps: [
      { title: 'Open the PDF Suite', body: 'From the home page, open PDF Suite. Until you choose files, nothing leaves your computer except the request that loaded the website.' },
      { title: 'Drop or pick the PDFs', body: 'The browser stores them as File objects in this tab. If a file does not appear, it may not be a PDF, it may be corrupt, or it may be encrypted.' },
      { title: 'Order the files', body: 'Merged output follows the list order. Merge copies pages; it does not redesign them.' },
      { title: 'Merge and download', body: 'The tool builds a new PDF in memory and starts a download. Originals on disk are not modified.' },
      { title: 'Optional watermark', body: 'You can stamp text such as CONFIDENTIAL. That is overlay text, not redaction or encryption.' },
    ],
    cannot: ['Encrypted PDFs may fail.', 'Preview tiles are placeholders, not rendered pages.', 'Very large files can exhaust tab memory.', 'Merge does not OCR scans.'],
    privacy: ['Processing uses pdf-lib in this tab. Vercel may log that you loaded the page (IP, browser, time). That log is not your PDF.'],
    notes: ['Keep source files until you have opened the merged PDF.', 'This guide is a how-to, not legal advice about which documents you may combine.'],
  },
  {
    slug: 'split-pdf-pages',
    title: 'How to split a PDF by page range',
    summary: 'Copy a page list such as 1-3,5 into a new PDF in this tab.',
    toolRoute: '/pdf-suite',
    toolLabel: 'Open PDF Suite',
    updated: '3 September 2026',
    intro: 'Splitting a PDF means copying some pages into a new file. FileTools Kit does this in the browser with pdf-lib. You type a range such as 1-3,5 and download a new PDF. The original file on disk is not rewritten.',
    whenToUse: ['Split when a packet is larger than you need to send.', 'Split is not redaction — it copies whole pages.'],
    steps: [
      { title: 'Add one PDF', body: 'Wait until the tool has a page count. If parsing fails, the file may be encrypted or damaged.' },
      { title: 'Enter a page range', body: '1-3,5 means pages 1, 2, 3, and 5. Page numbers are 1-based.' },
      { title: 'Split and download', body: 'A new PDF is built in memory. Open it in a reader and confirm the pages.' },
    ],
    cannot: ['Encrypted PDFs may fail.', 'Split does not extract images as separate files.', 'Preview tiles are placeholders.'],
    privacy: ['Pages are copied in this tab. FileTools Kit does not receive the PDF on an upload API.'],
    notes: ['Split makes a new file. It does not punch pages out of the original on disk.'],
  },
  {
    slug: 'convert-images-png-jpg-webp',
    title: 'Convert PNG, JPG, and WebP without uploading',
    summary: 'Re-encode images with the Canvas API in this tab.',
    toolRoute: '/file-converter',
    toolLabel: 'Open File Converter',
    updated: '3 September 2026',
    intro: 'The File Converter draws a PNG, JPEG, or WebP onto an HTML canvas and exports a new file. There is no upload to a conversion farm. Unsupported types are rejected, not renamed.',
    whenToUse: ['Convert when a form insists on JPEG, or when you want WebP for a smaller still image.', 'This is not a RAW camera pipeline or an AVIF factory.'],
    steps: [
      { title: 'Add images the browser can decode', body: 'PNG, JPEG, and WebP are the everyday cases.' },
      { title: 'Pick an output the tool encodes', body: 'Canvas export targets PNG, JPEG, or WebP. JPEG has no transparency.' },
      { title: 'Download the results', body: 'Keep originals until you have opened the new files.' },
    ],
    cannot: ['No AVIF, TIFF, or PSD encoding.', 'No CMYK print pipeline.', 'Animated GIFs are not a multi-frame pipeline here.'],
    privacy: ['Image bytes stay in this tab. The host may log that you loaded the converter page.'],
    notes: ['Screenshots of UI usually want PNG, not heavy JPEG.'],
  },
  {
    slug: 'compress-images-in-browser',
    title: 'Compress images in the browser',
    summary: 'Scale and re-encode images in canvas with before/after sizes.',
    toolRoute: '/image-optimizer',
    toolLabel: 'Open Image Optimizer',
    updated: '3 September 2026',
    intro: 'Compression on FileTools Kit is canvas re-encoding. The Image Optimizer scales and re-saves pictures in this tab and shows before-and-after sizes. Savings vary by source.',
    whenToUse: ['Compress when an upload form has a size cap.', 'Do not expect archival lossless RAW compression.'],
    steps: [
      { title: 'Add images', body: 'A long list of huge photos can strain memory. Start with a handful.' },
      { title: 'Tune quality and scale', body: 'Reducing width often saves more than shaving a few quality points.' },
      { title: 'Download each file', body: 'This optimizer does not promise a ZIP of all results.' },
    ],
    cannot: ['No guaranteed ZIP bundle.', 'No comparison slider.', 'No professional print RIP.'],
    privacy: ['Pixels are re-encoded in this tab. When ads are eventually enabled, ad networks still would not receive your image files from our servers.'],
    notes: ['Always start from the first-generation original when you can. Running JPEG compression twice stacks artifacts.'],
  },
  {
    slug: 'build-resume-pdf',
    title: 'Build a resume PDF in your browser',
    summary: 'Fill a form and download a PDF with jsPDF. Keyword overlap is not an employer ATS.',
    toolRoute: '/resume-builder',
    toolLabel: 'Open Resume Builder',
    updated: '3 September 2026',
    intro: 'The Resume Builder is a form, a preview, and a PDF download. You can paste a job description to see a local keyword-overlap percentage. That percentage is not an employer applicant-tracking system. Bullet rewrite is a local action-verb template, not a remote model. PDF export uses jsPDF in this tab and is included.',
    whenToUse: ['Use it when you want a clean PDF quickly without creating an account.', 'Do not treat the overlap score as a prediction of interviews.'],
    steps: [
      { title: 'Replace the sample copy', body: 'Sample names are fiction. Use an email you monitor.' },
      { title: 'Add roles and bullets', body: 'Rewrite runs a local verb template. Read it before you keep it.' },
      { title: 'Optionally paste a job description', body: 'The score counts terms from a short list. It is not Greenhouse, Lever, or Workday.' },
      { title: 'Download PDF', body: 'Open the file in a reader. If a line overflows, shorten the source text.' },
    ],
    cannot: ['Not an employer ATS.', 'Not generative AI.', 'No LinkedIn import.', 'Layout is utilitarian, not InDesign.'],
    privacy: ['Resume text stays in this tab. Hosting logs are not a copy of your CV.'],
    notes: ['Truth beats keyword stuffing. Souren Das built this as a local utility in Bengaluru, not a recruiting agency.'],
  },
  {
    slug: 'create-qr-code',
    title: 'Create a QR code and export PNG or SVG',
    summary: 'Encode a URL, Wi-Fi, vCard, or text in this tab.',
    toolRoute: '/qr-generator',
    toolLabel: 'Open QR Generator',
    updated: '3 September 2026',
    intro: 'A QR code is a drawing of data. FileTools Kit encodes a URL, Wi-Fi payload, vCard, or text in the browser and exports PNG or SVG. There is no scan-analytics dashboard on our server.',
    whenToUse: ['Use it for a poster URL, a Wi-Fi card, or a simple vCard.', 'Do not use it as a payment terminal.'],
    steps: [
      { title: 'Choose the data type', body: 'URL, Wi-Fi, vCard, or text.' },
      { title: 'Enter the content', body: 'Include https:// for websites. Anyone who photographs a Wi-Fi code gets that password.' },
      { title: 'Export and scan a test', body: 'Confirm the destination before you print.' },
    ],
    cannot: ['Does not count scans.', 'Does not shorten URLs.', 'Very long payloads fail at small print sizes.'],
    privacy: ['The string is encoded in this tab. Whoever scans a URL visits that destination, not FileTools Kit.'],
    notes: ['Leave a quiet-zone margin around the code. Glossy laminate can break scans.'],
  },
  {
    slug: 'what-stays-in-the-tab',
    title: 'What “files stay in this tab” actually means',
    summary: 'File bytes live in page memory. Hosting logs, fonts, card photos, and future ads are a different channel.',
    toolRoute: '/privacy',
    toolLabel: 'Read the privacy policy',
    updated: '3 September 2026',
    intro: 'FileTools Kit says work happens in this tab. That sentence is precise, not an air-gap. This guide separates file bytes in memory, Vercel hosting logs, Unsplash and font requests, and advertising cookies that may appear only after Google AdSense is approved.',
    whenToUse: ['Read this before you process a confidential PDF, and again if you review the site for advertising programs.'],
    steps: [
      { title: 'File bytes in memory', body: 'Dropped files live as File or ArrayBuffer objects in the tab. pdf-lib, jsPDF, and Canvas read that memory. Closing the tab lets the engine discard it. We do not operate an upload API.' },
      { title: 'Vercel serves the app', body: 'Loading a tool page is a normal HTTPS request. Hosts commonly log IP, user agent, URL, and time. That is not a copy of your document.' },
      { title: 'Unsplash and fonts', body: 'Tool cards may load photographs from Unsplash. Fonts may load from Google Fonts. Those requests are for assets, not your PDF.' },
      { title: 'Advertising, later', body: 'The AdSense script is not embedded today. After approval, Google may use cookies to serve ads. Ad networks still would not receive your file bytes from our servers, because those files are not uploaded to us. Until the script is on, FileTools Kit does not set an ad cookie.' },
      { title: 'First-party keys', body: 'UI prefs and optional A/B keys (ftk_ab_*) stay in this browser. Clear site data to delete them.' },
    ],
    cannot: ['This is not an air-gapped device.', 'This is not a GDPR, CCPA, HIPAA, or COPPA certification.', 'Browser extensions you installed can read a page.'],
    privacy: ['Operator: Souren Das, Bengaluru. privacy@filetoolskit.com. support@filetoolskit.com.'],
    notes: ['The accurate line is: no FileTools Kit file-upload API; hosting and third-party assets still exist.'],
  },
  {
    slug: 'hash-text-sha256',
    title: 'Hash text with SHA-256 in the browser',
    summary: 'Web Crypto SHA family. No MD5.',
    toolRoute: '/dev-tools',
    toolLabel: 'Open Dev Tools',
    updated: '3 September 2026',
    intro: 'A hash is a fingerprint of bytes, not encryption. Dev Tools uses the Web Cryptography API to compute SHA-1, SHA-256, SHA-384, and SHA-512. There is no MD5. The text you paste is not sent to a hashing API we run.',
    whenToUse: ['Hash when you want to check whether two blobs of text match.', 'Do not paste production secrets into any website if your threat model forbids it.'],
    steps: [
      { title: 'Paste the text', body: 'A trailing newline changes SHA-256. Copy the payload the same way the publisher hashed it.' },
      { title: 'Choose SHA-256 unless you have a reason not to', body: 'SHA-1 is older and not appropriate for new security designs.' },
      { title: 'Copy the digest', body: 'Matching hashes mean the same bytes went in. They do not prove who wrote the text.' },
    ],
    cannot: ['No MD5.', 'No HMAC helper with a hosted key.', 'You cannot decrypt SHA-256. This page does not implement AES-256 PDF encryption.'],
    privacy: ['The string is hashed in this tab with Web Crypto.'],
    notes: ['UTF-8 text is not the same as UTF-16. Check encoding if a published checksum does not match.'],
  },
];

export function getGuide(slug: string | undefined) {
  if (!slug) return undefined;
  return GUIDES.find((g) => g.slug === slug);
}
