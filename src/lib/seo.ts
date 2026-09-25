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
    path: '/about',
    title: 'About FileTools Kit | Souren Das, Bengaluru',
    description: 'FileTools Kit is a free set of 12 in-browser file tools. Operator: Souren Das, Bengaluru, India.'
  },
  '/guides': {
    path: '/guides',
    title: 'How to merge PDFs and convert images | FileTools Kit',
    description: 'Guides for merging and splitting PDFs, converting PNG/JPG/WebP, compressing images, and building a resume PDF in your browser.'
  },
  '/privacy': {
    path: '/privacy',
    title: 'Privacy Policy | FileTools Kit',
    description: 'How FileTools Kit handles browser-only files, hosting and analytics data, third-party assets, Google AdSense advertising, and privacy requests.'
  },
  '/privacy-policy': {
    path: '/privacy',
    title: 'Privacy Policy | FileTools Kit',
    description: 'Canonical privacy policy for FileTools Kit, including browser-only file processing, analytics, third-party assets, and Google AdSense advertising.'
  },
  '/terms': {
    path: '/terms',
    title: 'Terms of Service | FileTools Kit',
    description: 'Terms for using FileTools Kit. Free in-browser tools, no checkout, operated by Souren Das in Bengaluru.'
  },
  '/terms-of-service': {
    path: '/terms',
    title: 'Terms of Service | FileTools Kit',
    description: 'Canonical terms of service for FileTools Kit. Free in-browser tools, no checkout.'
  },
  '/cookie-policy': {
    path: '/cookie-policy',
    title: 'Cookie & Storage Policy | FileTools Kit',
    description: 'How FileTools Kit uses browser storage, Vercel Analytics, third-party assets, and Google AdSense advertising technologies.'
  },
  '/disclaimer': {
    path: '/disclaimer',
    title: 'Disclaimer | FileTools Kit',
    description: 'Currency rates are static examples. Health numbers are not medical advice. Resume match % is not an employer ATS.'
  },
  '/contact': {
    path: '/contact',
    title: 'Contact | FileTools Kit',
    description: 'Email support@filetoolskit.com or privacy@filetoolskit.com. Operator: Souren Das, Bengaluru, India.'
  },
  '/resume-builder': tool('/resume-builder', 'Build a job-ready resume PDF in your browser', 'Turn your experience into a clean resume PDF with local keyword checks and browser export. Free to use.'),
  '/pdf-suite': tool('/pdf-suite', 'Merge PDF in your browser', 'Merge, split, rotate, and watermark PDFs in this tab with pdf-lib. Encrypted files may fail.'),
  '/compress-pdf': tool(
    '/compress-pdf',
    'Compress PDF in your browser',
    'Rewrite a PDF in this browser tab to trim wasted structure and compare before-and-after sizes. No upload API. Image-heavy or already-compressed PDFs may not shrink.'
  ),
  '/guides/compress-pdf-in-browser': {
    path: '/guides/compress-pdf-in-browser',
    title: 'How to compress a PDF in your browser | FileTools Kit',
    description:
      'Rewrite a PDF locally, compare its size before and after, and keep the smaller copy. Scanned or already-compressed PDFs may barely shrink.'
  },
  '/file-converter': tool('/file-converter', 'Convert JPG, PNG, and WebP in your browser', 'Convert supported images, audio to WAV, and DOCX to text or a simple PDF in the browser. Free, no account.'),
  '/image-optimizer': tool('/image-optimizer', 'Compress images in your browser', 'Reduce image size with quality and scale controls, compare before and after, and download WebP, JPEG, or PNG.'),
  '/qr-generator': tool('/qr-generator', 'Create a QR code for a URL, Wi-Fi, or vCard', 'Make a QR code for a URL, Wi-Fi network, or vCard and export PNG or SVG in this tab.'),
  '/dev-tools': tool('/dev-tools', 'Format JSON, test regex, and hash text in your browser', 'Format flat JSON or CSV, test JavaScript regex, Base64, and SHA hashes in the browser. No MD5.'),
  '/markdown-editor': tool('/markdown-editor', 'Write and preview Markdown in your browser', 'Write Markdown with a live preview and export HTML or .md in this tab.'),
  '/svg-editor': tool('/svg-editor', 'Edit SVG colors and export PNG or JSX', 'Edit SVG stroke and fill, then export SVG, React JSX, or PNG in the browser.'),
  '/text-diff': tool('/text-diff', 'Compare two texts and export a patch', 'Compare original and changed text side by side and download a unified patch in the browser.'),
  '/social-studio': tool('/social-studio', 'Write social captions and bios faster', 'Draft captions and bios with Unicode styles, length meters, and starter hashtag lists you can copy.'),
  '/health-calc': tool('/health-calc', 'Estimate calories, macros, and TDEE', 'Estimate BMR and TDEE with Mifflin-St Jeor. Educational estimates, not medical advice.'),
  '/currency-crypto': tool('/currency-crypto', 'Calculate currency conversions with a worksheet', 'Run a quick currency worksheet with example rates. Rates are illustrative, not live markets.'),

  '/guides/merge-pdf-in-browser': {
    path: '/guides/merge-pdf-in-browser',
    title: 'How to merge 20 PDFs in your browser | FileTools Kit',
    description:
      'Practical workflow for ordering and merging many PDFs in the tab, including limits for encrypted files.'
  },
  '/guides/split-pdf-pages': {
    path: '/guides/split-pdf-pages',
    title: 'How to extract pages 2–4 from a PDF | FileTools Kit',
    description:
      'Extract a page range from a PDF in the browser and download the smaller file.'
  },
  '/guides/convert-images-png-jpg-webp': {
    path: '/guides/convert-images-png-jpg-webp',
    title: 'How to convert JPG, PNG, and WebP for the job | FileTools Kit',
    description:
      'Choose the right image format, then convert and download it in the browser.'
  },
  '/guides/compress-images-in-browser': {
    path: '/guides/compress-images-in-browser',
    title: 'How to compress images for email or a website | FileTools Kit',
    description:
      'Reduce dimensions and file size in the browser while checking quality and before-and-after bytes.'
  },
  '/guides/build-resume-pdf': {
    path: '/guides/build-resume-pdf',
    title: 'How to turn your work history into a resume PDF | FileTools Kit',
    description:
      'Build a focused resume from career notes, check it against a job description, and download a PDF.'
  },
  '/guides/create-qr-code': {
    path: '/guides/create-qr-code',
    title: 'How to create a QR code for Wi-Fi or a link | FileTools Kit',
    description:
      'Make a scannable QR code for a URL, Wi-Fi details, vCard, or text and export PNG or SVG.'
  },
  '/guides/what-stays-in-the-tab': {
    path: '/guides/what-stays-in-the-tab',
    title: 'What “files stay in this tab” actually means | FileTools Kit',
    description:
      'What browser memory, hosting logs, fonts, and ads can and cannot see when a tool runs locally.'
  },
  '/guides/hash-text-sha256': {
    path: '/guides/hash-text-sha256',
    title: 'How to hash text with SHA-256 and verify a checksum | FileTools Kit',
    description:
      'Paste text, calculate a SHA-family hash in the browser, and compare the output without sending text to an API.'
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

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${SITE}/#website`,
        url: SITE,
        name: SITE_NAME,
        description: 'Free PDF, image, resume, and file tools that run in your browser.',
        inLanguage: 'en',
        publisher: { '@id': `${SITE}/#person` }
      },
      {
        '@type': 'Person',
        '@id': `${SITE}/#person`,
        name: OPERATOR,
        url: `${SITE}/about`,
        email: 'mailto:support@filetoolskit.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bengaluru',
          addressRegion: 'Karnataka',
          addressCountry: 'IN'
        }
      },
      {
        '@type': 'SoftwareApplication',
        name: SITE_NAME,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web browser',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: SITE
      }
    ]
  };
}
