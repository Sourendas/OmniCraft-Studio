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
    title: 'FileTools Kit | Free PDF, image, and resume tools in your browser',
    description:
      'Merge PDFs, convert images, build a resume PDF, and more in this tab. Free tools operated by Souren Das in Bengaluru. No file-upload API.'
  },
  '/about': {
    path: '/about',
    title: 'About FileTools Kit | Souren Das, Bengaluru',
    description: 'FileTools Kit is a free set of 12 in-browser file tools. Operator: Souren Das, Bengaluru, India.'
  },
  '/guides': {
    path: '/guides',
    title: 'Guides | How FileTools Kit PDF, image, and resume tools work',
    description: 'Step-by-step guides for merging PDFs, converting images, building a resume PDF, QR codes, and hashing text in the browser.'
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
  '/resume-builder': tool('/resume-builder', 'Resume Builder', 'Fill a resume in the browser and download a PDF. Keyword overlap is local, not an employer ATS.'),
  '/pdf-suite': tool('/pdf-suite', 'PDF Suite', 'Merge, split, rotate, and watermark PDFs in this tab with pdf-lib. Encrypted files may fail.'),
  '/file-converter': tool('/file-converter', 'File Converter', 'Convert PNG, JPG, and WebP in the browser canvas. Audio to WAV. DOCX to text or a simple PDF.'),
  '/image-optimizer': tool('/image-optimizer', 'Image Optimizer', 'Compress and resize images in this tab. Download WebP, JPEG, or PNG with before and after sizes.'),
  '/qr-generator': tool('/qr-generator', 'QR Generator', 'Create a QR code for a URL, Wi-Fi network, or vCard and export PNG or SVG in the browser.'),
  '/dev-tools': tool('/dev-tools', 'Dev Tools', 'JSON to CSV, regex tester, Base64, and SHA-256 in the browser. No MD5.'),
  '/markdown-editor': tool('/markdown-editor', 'Markdown Editor', 'Write Markdown with a live preview and export HTML or .md in this tab.'),
  '/svg-editor': tool('/svg-editor', 'SVG Studio', 'Edit SVG stroke and fill, then export SVG, React JSX, or PNG in the browser.'),
  '/text-diff': tool('/text-diff', 'Text Diff', 'Compare two texts side by side and download a unified patch in the browser.'),
  '/social-studio': tool('/social-studio', 'Social Studio', 'Unicode text styles, caption length meters, and starter hashtag lists. Not trending data.'),
  '/health-calc': tool('/health-calc', 'Health Calculator', 'Mifflin-St Jeor BMR and TDEE estimates. Not medical advice.'),
  '/currency-crypto': tool('/currency-crypto', 'Currency Worksheet', 'Static September 2026 example FX rates. Not live market data or financial advice.')
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
