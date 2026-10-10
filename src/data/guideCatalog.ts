// One list of every guide on the site. The guides themselves are plain HTML
// files in /public/guides so crawlers and no-JS visitors get the full text.
// This list drives the in-app guide route, categories, and SEO entries.

export type GuideCategoryId = 'pdf' | 'images' | 'resume' | 'text-data' | 'calculators' | 'site';

export const GUIDE_CATEGORIES: { id: GuideCategoryId; name: string }[] = [
  { id: 'pdf', name: 'PDF documents' },
  { id: 'images', name: 'Images and graphics' },
  { id: 'resume', name: 'Resumes and job applications' },
  { id: 'text-data', name: 'Text, code, and data' },
  { id: 'calculators', name: 'Everyday calculators' },
  { id: 'site', name: 'Privacy and how this site works' },
];

export interface GuideEntry {
  slug: string;
  title: string;
  category: GuideCategoryId;
  // Only guides added after the SEO_PAGES list was written carry a description here.
  description?: string;
}

export const GUIDE_CATALOG: GuideEntry[] = [
  // PDF documents
  { slug: 'merge-pdf-in-browser', title: 'How to merge PDF files in your browser', category: 'pdf' },
  { slug: 'merge-scanned-documents', title: 'How to merge scanned documents into one PDF', category: 'pdf', description: 'Combine scanned pages from a phone, a scanner, and older PDFs into one file in the right order, with sideways pages fixed. Runs in your browser.' },
  { slug: 'split-pdf-pages', title: 'How to split a PDF by page range', category: 'pdf' },
  { slug: 'compress-pdf-in-browser', title: 'How to compress a PDF in the browser', category: 'pdf' },
  { slug: 'reduce-pdf-size-for-upload-portals', title: 'How to get a PDF under 1 MB or 200 KB for an upload portal', category: 'pdf', description: 'Exam, job, and passport portals cap PDF size. What the in-tab compressor can and cannot shrink, and the image route that works for scans.' },
  { slug: 'jpg-to-pdf-in-browser', title: 'How to put JPG and PNG scans into one PDF', category: 'pdf' },
  { slug: 'jpg-to-pdf-for-online-forms', title: 'Turn phone photos of documents into a PDF for an online form', category: 'pdf', description: 'Photograph, crop, shrink, and combine document photos into one PDF an application form will accept. Steps, size limits, and mistakes to avoid.' },
  { slug: 'pdf-to-jpg-in-browser', title: 'How to turn PDF pages into JPG or PNG', category: 'pdf' },
  { slug: 'organize-pdf-pages-in-browser', title: 'How to reorder, rotate, and delete PDF pages', category: 'pdf' },
  { slug: 'page-numbers-pdf', title: 'How to add page numbers to a PDF', category: 'pdf' },
  { slug: 'page-numbers-for-thesis', title: 'How to add page numbers to a thesis or project report PDF', category: 'pdf', description: 'Number the chapters of a thesis while leaving the title page and front matter unnumbered, using split, page numbers, and merge in this tab.' },
  { slug: 'password-protect-pdf-in-browser', title: 'How to password-protect a PDF in the browser', category: 'pdf' },
  { slug: 'watermark-versus-password', title: 'Watermark, password, and redaction are different', category: 'pdf' },
  { slug: 'when-browser-pdf-tools-fail', title: 'When browser PDF tools fail', category: 'pdf' },
  // Images and graphics
  { slug: 'webp-images-for-websites', title: 'Compress images for a website: WebP explained', category: 'images', description: 'What WebP is, when to use it over JPEG or PNG, how large a web image should be, and how to resize and convert images in your browser.' },
  { slug: 'compress-images-in-browser', title: 'How to compress images in the browser', category: 'images' },
  { slug: 'convert-images-png-jpg-webp', title: 'How to convert PNG, JPG, and WebP', category: 'images' },
  { slug: 'jpg-png-webp-which-to-send', title: 'JPG, PNG, or WebP — which file to send', category: 'images' },
  { slug: 'svg-vs-png', title: 'SVG vs PNG: which image format to use', category: 'images', description: 'Vector versus raster, when an SVG is the right file, when a PNG is safer, and how to turn an SVG icon into a PNG in your browser.' },
  { slug: 'create-qr-code', title: 'How to create a QR code and export PNG or SVG', category: 'images' },
  { slug: 'wifi-qr-code', title: 'How to make a Wi-Fi QR code guests can scan', category: 'images', description: 'Create a QR code that joins a Wi-Fi network without typing the password. Security type, special characters, print size, and privacy.' },
  // Resumes and job applications
  { slug: 'ats-friendly-resume-for-freshers', title: 'Resume format for freshers: an ATS-friendly one-page PDF', category: 'resume', description: 'What a fresher resume should contain, how applicant tracking systems read a PDF, and how to build one in Resume Builder without padding.' },
  { slug: 'build-resume-pdf', title: 'Build a resume PDF in your browser', category: 'resume' },
  { slug: 'resume-pdf-checklist', title: 'Resume PDF checklist before you send', category: 'resume' },
  // Text, code, and data
  { slug: 'markdown-basics', title: 'Markdown basics: headings, lists, links, and tables', category: 'text-data', description: 'The Markdown you need for READMEs and notes, with a live preview in your browser, and the limits of a simple preview.' },
  { slug: 'compare-two-text-versions', title: 'How to compare two versions of a text and see what changed', category: 'text-data', description: 'Paste two drafts or config files and see added and removed lines side by side. Ignore case or spacing, and export a patch file.' },
  { slug: 'json-formatting-explained', title: 'JSON formatting explained: validate, pretty-print, and minify', category: 'text-data', description: 'What valid JSON looks like, the mistakes that break it, and how to format or minify JSON in your browser without sending it to a server.' },
  { slug: 'csv-to-json', title: 'How to convert CSV to JSON and back', category: 'text-data', description: 'Turn a spreadsheet export into JSON, or flat JSON into CSV, in your browser. The limits of a simple converter and how to avoid broken rows.' },
  { slug: 'base64-explained', title: 'Base64 explained: what it is and what it is not', category: 'text-data', description: 'Why Base64 exists, why it makes data about a third larger, why it is not encryption, and how to encode or decode UTF-8 text in your browser.' },
  { slug: 'hash-text-sha256', title: 'How to hash text with SHA-256 in the browser', category: 'text-data' },
  // Everyday calculators
  { slug: 'bmi-what-it-means', title: 'BMI explained: how it is calculated and what it does not tell you', category: 'calculators', description: 'The BMI formula, WHO adult categories, the lower cut-offs used for South Asian adults, and the limits of the number. Not medical advice.' },
  { slug: 'currency-conversion-basics', title: 'Currency conversion basics: rates, spreads, and fees', category: 'calculators', description: 'How exchange rates work, what the mid-market rate is, how spreads and transfer fees change what arrives, and how to check a quote yourself.' },
  // Privacy and how this site works
  { slug: 'what-stays-in-the-tab', title: 'What “files stay in this tab” means', category: 'site' },
];

export const STATIC_GUIDE_SLUGS = new Set(GUIDE_CATALOG.map((g) => g.slug));

export function guideCategoryName(slug: string): string | undefined {
  const entry = GUIDE_CATALOG.find((g) => g.slug === slug);
  return entry ? GUIDE_CATEGORIES.find((c) => c.id === entry.category)?.name : undefined;
}

// SEO entries for pages added in October 2026. Older guides keep their
// hand-written entries in src/lib/seo.ts.
export const CATALOG_SEO: Record<string, { path: string; title: string; description: string }> = {
  ...Object.fromEntries(
    GUIDE_CATALOG.filter((g) => g.description).map((g) => [
      `/guides/${g.slug}`,
      { path: `/guides/${g.slug}.html`, title: `${g.title} | FileTools Kit`, description: g.description as string },
    ]),
  ),
  '/whats-new': {
    path: '/whats-new.html',
    title: "What's new on FileTools Kit | Changelog",
    description: 'Dated changes to FileTools Kit from the project history: new tools, fixes, honest-copy rewrites, and new guides. Maintained by Souren Das.',
  },
  '/how-we-test': {
    path: '/how-we-test.html',
    title: 'How FileTools Kit tools are tested | FileTools Kit',
    description: 'How each tool and guide on FileTools Kit is checked before it ships: real files, phone-width checks, reader tests, and corrections by email.',
  },
};
