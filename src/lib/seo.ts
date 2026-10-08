export const SITE = 'https://www.filetoolskit.com';
export const SITE_NAME = 'FileTools Kit';
export const OPERATOR = 'Souren Das';

export type SeoPage = {
  title: string;
  description: string;
  path: string;
};

const tool = (path: string, name: string, description: string): SeoPage => ({
  path,
  title: `${name} | ${SITE_NAME}`,
  description
});

export const SEO_PAGES: Record<string, SeoPage> = {
  '/': {
    path: '/',
    title: 'Merge PDFs and convert images in your browser | FileTools Kit',
    description:
      'Merge PDFs, convert images, build a resume PDF, and more in this tab. Free tools by Souren Das in Bengaluru. Files stay in the tab; no upload API.'
  },
  '/about': {
    path: '/about.html',
    title: 'About FileTools Kit | Souren Das, Bengaluru',
    description: 'FileTools Kit is a free set of in-browser PDF, image, text, and resume tools. Built and operated by Souren Das in Bengaluru, India.'
  },
  '/guides': {
    path: '/guides.html',
    title: 'How to merge PDFs and convert images | FileTools Kit',
    description: 'Guides for merging and splitting PDFs, converting PNG/JPG/WebP, compressing images, and building a resume PDF in your browser.'
  },
  '/privacy': {
    path: '/privacy.html',
    title: 'Privacy Policy | FileTools Kit',
    description: 'How FileTools Kit handles browser-only files, hosting logs, cookieless analytics, Google AdSense advertising cookies, opt-out links, and privacy requests.'
  },
  '/privacy-policy': {
    path: '/privacy.html',
    title: 'Privacy Policy | FileTools Kit',
    description: 'How FileTools Kit handles browser-only files, hosting logs, cookieless analytics, Google AdSense advertising cookies, opt-out links, and privacy requests.'
  },
  '/terms': {
    path: '/terms.html',
    title: 'Terms of Service | FileTools Kit',
    description: 'Terms for using FileTools Kit. Free in-browser tools, no checkout, operated by Souren Das in Bengaluru.'
  },
  '/terms-of-service': {
    path: '/terms.html',
    title: 'Terms of Service | FileTools Kit',
    description: 'Canonical terms of service for FileTools Kit. Free in-browser tools, no checkout.'
  },
  '/cookie-policy': {
    path: '/cookie-policy.html',
    title: 'Cookie & Storage Policy | FileTools Kit',
    description: 'Which cookies and browser storage keys FileTools Kit and Google AdSense use, and how to clear them or opt out of personalized ads.'
  },
  '/disclaimer': {
    path: '/disclaimer.html',
    title: 'Disclaimer | FileTools Kit',
    description: 'Currency rates are static examples. Health numbers are not medical advice. Resume match % is not an employer ATS.'
  },
  '/contact': {
    path: '/contact.html',
    title: 'Contact | FileTools Kit',
    description: 'Email support@filetoolskit.com for bugs, questions, guide corrections, and privacy requests. Operator: Souren Das, Bengaluru, India.'
  },
  '/resume-builder': tool('/resume-builder', 'Build a job-ready resume PDF in your browser', 'Turn your experience into a clean resume PDF with local keyword checks and browser export. Free to use.'),
  '/pdf-suite': tool('/pdf-suite', 'PDF Suite — merge, split, rotate, and watermark in your browser', 'Merge, split, rotate, and watermark PDFs in this tab with pdf-lib. Files stay on your device. Encrypted PDFs often fail.'),
  '/merge-pdf': tool('/merge-pdf', 'Merge PDF files into one in your browser', 'Combine PDFs in the order you add them and rotate sideways pages with pdf-lib in this tab. No upload API. Encrypted PDFs may fail.'),
  '/split-pdf': tool('/split-pdf', 'Split a PDF and extract pages in your browser', 'Type a page range such as 1-3,5 and download just those pages as a new PDF. Runs in this tab; no upload API.'),
  '/jpg-to-pdf': tool('/jpg-to-pdf', 'Convert JPG and PNG images to PDF in your browser', 'Turn JPEG or PNG images into a PDF with one page per image, built in this tab. Your photos are not uploaded.'),
  '/page-numbers': tool('/page-numbers', 'Add page numbers to a PDF in your browser', 'Number every page from a starting number you choose, at the bottom or top, as 1, 1 / N, or Page 1 of N. Runs in this tab with pdf-lib; no upload API.'),
  '/pdf-to-jpg': tool('/pdf-to-jpg', 'Convert PDF pages to JPG or PNG in your browser', 'Render PDF pages as JPG or PNG images and download one image or a ZIP. Runs in this tab with PDF.js; no upload API.'),
  '/organize-pdf': tool('/organize-pdf', 'Reorder, rotate, and delete PDF pages in your browser', 'See page thumbnails, drag to reorder, rotate or delete pages, and export a new PDF. Runs in this tab; no upload API.'),
  '/password-protect-pdf': tool('/password-protect-pdf', 'Password protect a PDF with AES-256 in your browser', 'Encrypt a PDF with AES-256 so it opens only with your password. Runs in this tab; the file and password are not uploaded.'),
  '/compress-pdf': tool(
    '/compress-pdf',
    'Compress PDF in your browser',
    'Rewrite a PDF in this browser tab to trim wasted structure and compare before-and-after sizes. No upload API. Image-heavy or already-compressed PDFs may not shrink.'
  ),
  '/guides/compress-pdf-in-browser': {
    path: '/guides/compress-pdf-in-browser.html',
    title: 'How to compress a PDF in the browser | FileTools Kit',
    description:
      'Rewrite a PDF in this tab and compare size before and after. Not a server optimizer. Scans that are already JPEG often do not shrink.'
  },
  '/file-converter': tool('/file-converter', 'Convert images, audio, and DOCX files in your browser', 'Convert PNG, JPEG, and WebP images, decode audio to WAV, and turn a DOCX into plain text or a simple text PDF in this tab. No upload API.'),
  '/image-optimizer': tool('/image-optimizer', 'Compress images in your browser', 'Reduce image size with quality and scale controls, compare before and after, and download WebP, JPEG, or PNG.'),
  '/qr-generator': tool('/qr-generator', 'Create a QR code for a URL, Wi-Fi, or vCard', 'Make a QR code for a URL, Wi-Fi network, or vCard and export PNG or SVG in this tab.'),
  '/dev-tools': tool('/dev-tools', 'Convert JSON and CSV, test regex, and hash text in your browser', 'Convert flat JSON to CSV and back, format SQL, test JavaScript regex, encode Base64, and make SHA hashes in this tab. No MD5.'),
  '/markdown-editor': tool('/markdown-editor', 'Write and preview Markdown in your browser', 'Write Markdown with a live preview, download a .md file, or copy the HTML. Runs in this tab. Refreshing can clear unsaved text.'),
  '/svg-editor': tool('/svg-editor', 'Edit SVG colors and export PNG or JSX', 'Paste SVG markup, change stroke and fill, then download SVG or PNG, or copy minified SVG and a React JSX component. Runs in this tab.'),
  '/text-diff': tool('/text-diff', 'Compare two texts and export a patch', 'Paste an original and a changed text, see insertions and deletions side by side, and copy or download a unified .patch file. Runs in this tab.'),
  '/social-studio': tool('/social-studio', 'Unicode text styles and length checks for social posts', 'Turn a line into bold, italic, double-struck, circled, or monospace Unicode text and check length against common post and bio limits. Copy and paste.'),
  '/health-calc': tool('/health-calc', 'Estimate calories, macros, and TDEE', 'Estimate BMR with Mifflin-St Jeor, daily energy with an activity factor, and macro grams for a goal. Arithmetic only, not medical advice.'),
  '/currency-crypto': tool('/currency-crypto', 'Currency worksheet with example rates, not a live feed', 'Multiply an amount by a rate on a worksheet. Rates are static examples bundled with the page, not a live market or a bank quote.'),

  '/guides/pdf-to-jpg-in-browser': {
    path: '/guides/pdf-to-jpg-in-browser.html',
    title: 'How to turn PDF pages into JPG or PNG | FileTools Kit',
    description:
      'Rasterize PDF pages to JPG or PNG in this tab and download one image or a ZIP. No OCR. Text in the image is not selectable.'
  },
  '/guides/organize-pdf-pages-in-browser': {
    path: '/guides/organize-pdf-pages-in-browser.html',
    title: 'How to reorder, rotate, and delete PDF pages | FileTools Kit',
    description:
      'Use thumbnails to put a PDF in order, fix a sideways page, drop a blank, and export a new file in this tab.'
  },
  '/guides/password-protect-pdf-in-browser': {
    path: '/guides/password-protect-pdf-in-browser.html',
    title: 'How to password-protect a PDF in the browser | FileTools Kit',
    description:
      'Encrypt a PDF with AES-256 in this tab. The password is not stored. A watermark is not a lock. Test the download in a second reader.'
  },
  '/guides/merge-pdf-in-browser': {
    path: '/guides/merge-pdf-in-browser.html',
    title: 'How to merge PDF files in your browser | FileTools Kit',
    description:
      'Combine a cover sheet, resume, and certificates into one PDF in this tab. Page copy with pdf-lib. No upload API. Encrypted files often fail.'
  },
  '/guides/split-pdf-pages': {
    path: '/guides/split-pdf-pages.html',
    title: 'How to split a PDF by page range | FileTools Kit',
    description:
      'Copy pages such as 2-4 or 1-3,5 into a new PDF. The original is not rewritten. Runs in this tab. No upload API.'
  },
  '/guides/convert-images-png-jpg-webp': {
    path: '/guides/convert-images-png-jpg-webp.html',
    title: 'How to convert PNG, JPG, and WebP | FileTools Kit',
    description:
      'Re-encode PNG, JPEG, or WebP via canvas in this tab. Not HEIC, video, or a quality boost. No upload API.'
  },
  '/guides/compress-images-in-browser': {
    path: '/guides/compress-images-in-browser.html',
    title: 'How to compress images in the browser | FileTools Kit',
    description:
      'Resize and recompress a photo in this tab before email or a form. Keep the original. No guaranteed percent. JPEG and WebP are usually lossy.'
  },
  '/guides/build-resume-pdf': {
    path: '/guides/build-resume-pdf.html',
    title: 'Build a resume PDF in your browser | FileTools Kit',
    description:
      'Fill a form, pick a layout, download a PDF. The match percentage is local keyword overlap, not an employer ATS.'
  },
  '/guides/create-qr-code': {
    path: '/guides/create-qr-code.html',
    title: 'How to create a QR code and export PNG or SVG | FileTools Kit',
    description:
      'Make a QR code for a link, Wi-Fi network, contact card, email, or text and export PNG or SVG in this tab. No short-link and no scan analytics.'
  },
  '/guides/what-stays-in-the-tab': {
    path: '/guides/what-stays-in-the-tab.html',
    title: 'What “files stay in this tab” means | FileTools Kit',
    description:
      'A plain account of what FileTools Kit processes locally, what the host can still see, and what ads do not receive.'
  },
  '/guides/hash-text-sha256': {
    path: '/guides/hash-text-sha256.html',
    title: 'How to hash text with SHA-256 in the browser | FileTools Kit',
    description:
      'Hash a string with Web Crypto in this tab and copy the hex digest. Base64 is not encryption. The string is not sent to a hashing server.'
  },
};

export function seoForPath(pathname: string): SeoPage {
  if (SEO_PAGES[pathname]) return SEO_PAGES[pathname];
  if (pathname.startsWith('/guides/')) {
    return {
      path: pathname,
      title: `Guide | ${SITE_NAME}`,
      description: 'How a FileTools Kit tool works in your browser. Files are not uploaded to a FileTools Kit processing server.'
    };
  }
  return {
    path: pathname,
    title: SITE_NAME,
    description: 'Free PDF, image, resume, and file tools that run in your browser.'
  };
}

export const TOOL_PATHS = new Set<string>([
  '/resume-builder',
  '/pdf-suite',
  '/merge-pdf',
  '/split-pdf',
  '/jpg-to-pdf',
  '/page-numbers',
  '/pdf-to-jpg',
  '/organize-pdf',
  '/password-protect-pdf',
  '/compress-pdf',
  '/file-converter',
  '/image-optimizer',
  '/qr-generator',
  '/dev-tools',
  '/markdown-editor',
  '/svg-editor',
  '/text-diff',
  '/social-studio',
  '/health-calc',
  '/currency-crypto',
]);

export function pageName(title: string) {
  return title.replace(/\s*\|\s*FileTools Kit\s*$/, '').trim();
}

export function organizationWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE}/#organization`,
        name: SITE_NAME,
        url: SITE,
        logo: `${SITE}/logo.jpg`,
        email: 'support@filetoolskit.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bengaluru',
          addressRegion: 'Karnataka',
          addressCountry: 'IN',
        },
        founder: {'@id': SITE + '/#souren-das'},
      },
      {
        '@type': 'Person',
        '@id': `${SITE}/#souren-das`,
        name: OPERATOR,
        email: 'mailto:support@filetoolskit.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bengaluru',
          addressRegion: 'Karnataka',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: SITE,
        name: SITE_NAME,
        description:
          'Merge PDFs, convert images, build a resume PDF, and more in this tab. Free tools operated by Souren Das in Bengaluru. No file-upload API.',
        inLanguage: 'en',
        publisher: {'@id': SITE + '/#organization'},
      },
    ],
  };
}

export function websiteJsonLd() {
  return organizationWebSiteJsonLd();
}

export function breadcrumbJsonLd(items: {name: string; url: string}[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function softwareApplicationJsonLd(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web browser',
    isAccessibleForFree: true,
    provider: {'@id': SITE + '/#organization'},
  };
}
