export interface GuideFigure {
  src: string;
  alt: string;
  caption: string;
}

export interface GuideArticle {
  slug: string;
  title: string;
  summary: string;
  toolRoute: string;
  toolLabel: string;
  updated: string;
  intro: string;
  wordCount: number;
  figures: GuideFigure[];
  lead: string[];
  whenToUse: string[];
  steps: { title: string; body: string }[];
  sections: { heading: string; paragraphs: string[] }[];
  cannot: string[];
  privacy: string[];
  notes: string[];
}

export const GUIDES: GuideArticle[] = [
  {
    slug: 'merge-pdf-in-browser',
    title: 'How to merge PDF files in your browser',
    summary: 'Combine two or more PDFs in this tab with pdf-lib. FileTools Kit does not run an upload API for those files.',
    toolRoute: '/pdf-suite',
    toolLabel: 'Open PDF Suite',
    updated: '4 September 2026',
    wordCount: 920,
    intro:
      'Merging PDFs is usually a chore you do right before you send something: a cover sheet, a form, and an appendix that must travel as one attachment. FileTools Kit does that merge in the tab you already have open. The PDF Suite reads each file with the browser File API, copies pages into a new document with pdf-lib, and starts a download. There is no FileTools Kit server sitting in the middle of that copy.',
    figures: [
      {
        src: '/guides/img/merge-pdf.svg',
        alt: 'Diagram of the PDF Suite drop zone, two loaded files, and a Merge PDFs export panel',
        caption: 'Interface diagram of merge in PDF Suite. Preview tiles on the live tool are placeholders, not rendered PDF pages.'
      }
    ],
    lead: [
      'A merge is a page copy, not a redesign. Fonts, images, form fields, and page size come from the source files. If one file is A4 and another is US Letter, the merged file keeps those sizes per page. That is expected, not a bug.',
      'People look for an online merge because they do not want to install desktop software. The trade-off is memory. Very large scans can exhaust a phone tab. Start with a couple of files, download, and check the result in a reader before you delete sources.'
    ],
    whenToUse: [
      'Use merge when you have two or more PDFs and want one file to send, print, or archive.',
      'Skip merge if you only need a subset of pages — that is split. Skip it if the PDFs are password-protected; encrypted files often fail in the browser. Skip it if you need redaction. A watermark is overlay text, not a black box that removes words from the file.'
    ],
    steps: [
      { title: 'Open the PDF Suite', body: 'From the home page, open PDF Suite. Until you choose files, nothing leaves your computer except the request that loaded the website.' },
      { title: 'Drop or pick the PDFs', body: 'The browser stores them as File objects in this tab. If a file does not appear, it may not be a PDF, it may be corrupt, or it may be encrypted.' },
      { title: 'Check the order', body: 'Merged output follows the list order. Use rotate if a scan is sideways. Rotation is applied on export, not as a live pixel preview.' },
      { title: 'Merge and download', body: 'The tool builds a new PDF in memory and starts a download named merged.pdf. Originals on disk are not modified.' },
      { title: 'Optional watermark', body: 'You can stamp text such as CONFIDENTIAL. That is a visible overlay. It is not encryption and it is not redaction.' }
    ],
    sections: [
      {
        heading: 'What pdf-lib is doing',
        paragraphs: [
          'pdf-lib parses each PDF in JavaScript, copies page objects into a new document, and writes bytes you can save. That is why encrypted files often fail: the library cannot read the page stream. ignoreEncryption is used as a best effort and still does not unlock every file.',
          'Because the work is in the tab, a refresh or a crash throws away the working copy. Keep the source PDFs until you have opened the download on disk.'
        ]
      },
      {
        heading: 'Troubleshooting',
        paragraphs: [
          'If merge fails, try one file at a time. A single damaged PDF can stop the batch. If a file opens in Adobe but not here, it may use features pdf-lib does not implement.',
          'On a phone, close other tabs if the page becomes slow. Canvas and PDF parsing share the same memory budget. Desktop browsers handle bigger packs more comfortably.',
          'WhatsApp and some mail apps recompress attachments. If a recipient says the file is blank, ask them to open the downloaded PDF rather than a preview thumbnail.'
        ]
      }
    ],
    cannot: ['Encrypted PDFs may fail.', 'Preview tiles are placeholders, not rendered pages.', 'Very large files can exhaust tab memory.', 'Merge does not OCR scans.', 'No digital signature preservation guarantee.'],
    privacy: ['Processing uses pdf-lib in this tab. Vercel may log that you loaded the page (IP, browser, time). That log is not your PDF.', 'When Google AdSense is approved later, ads still would not receive PDF bytes from our servers, because those files are not uploaded to us.'],
    notes: ['Related: split a page range in the same suite. Operator: Souren Das, Bengaluru.']
  },
  {
    slug: 'split-pdf-pages',
    title: 'How to split a PDF by page range',
    summary: 'Copy a page list such as 1-3,5 into a new PDF in this tab. The original file on disk is not rewritten.',
    toolRoute: '/pdf-suite',
    toolLabel: 'Open PDF Suite',
    updated: '4 September 2026',
    wordCount: 880,
    intro:
      'Splitting a PDF means copying some pages into a new file. You do it when a packet is larger than you need to send, or when page 7 is the only page a clerk asked for. FileTools Kit does this in the browser with pdf-lib. You type a range such as 1-3,5 and download a new PDF.',
    figures: [
      {
        src: '/guides/img/split-pdf.svg',
        alt: 'Diagram of a 12-page PDF with pages 1-3 and 5 selected and a 1-3,5 range field',
        caption: 'Page numbers are 1-based. Split copies whole pages. It does not crop a region inside a page.'
      }
    ],
    lead: [
      'The range parser accepts commas and hyphens. 1-3,5 means pages 1, 2, 3, and 5 of the first loaded file. Out-of-range numbers are ignored. If nothing is valid, the tool tells you instead of writing an empty file.',
      'Split is not redaction. If a page contains a name you wanted gone, copying the rest of the document still leaves that name on the pages you kept. Use a dedicated redaction tool if that is the job.'
    ],
    whenToUse: [
      'Split when you need a smaller packet and you know the page numbers.',
      'Do not split if you need to extract images as separate PNG files, or if the PDF is encrypted.'
    ],
    steps: [
      { title: 'Add one PDF', body: 'Wait until the tool shows a page count. If parsing fails, the file may be encrypted or damaged.' },
      { title: 'Open Split / Range', body: 'The range field applies to the first loaded file. Extra files in the list are ignored for split.' },
      { title: 'Enter a page range', body: 'Example: 1-3,5. Page numbers are 1-based, the way people count in a reader.' },
      { title: 'Download', body: 'A new PDF is built in memory as split-pages.pdf. Open it and confirm the pages before you send it.' }
    ],
    sections: [
      {
        heading: 'First file only',
        paragraphs: [
          'Split uses the first document in the list. If you meant to split the second file, remove the first or load only the file you care about. Merge is the tool that walks every file in order.',
          'This limit keeps the UI honest. A silent split of the wrong file is worse than asking you to load one PDF.'
        ]
      },
      {
        heading: 'Troubleshooting',
        paragraphs: [
          'If the download has fewer pages than you expected, you probably typed a range the parser could not fully read. Use digits, commas, and hyphens only.',
          'Scanned pages stay as images. Split will not make them searchable. That would be OCR, which this suite does not run.'
        ]
      }
    ],
    cannot: ['Encrypted PDFs may fail.', 'Split does not extract images as separate files.', 'Preview tiles are placeholders.', 'No OCR.'],
    privacy: ['Pages are copied in this tab. FileTools Kit does not receive the PDF on an upload API.'],
    notes: ['Related: merge PDFs in the same suite. Watermark is optional overlay text.']
  },
  {
    slug: 'convert-images-png-jpg-webp',
    title: 'Convert PNG, JPG, and WebP without uploading',
    summary: 'Re-encode images with the Canvas API in this tab. Unsupported types are rejected, not renamed.',
    toolRoute: '/file-converter',
    toolLabel: 'Open File Converter',
    updated: '4 September 2026',
    wordCount: 900,
    intro:
      'The File Converter draws a PNG, JPEG, or WebP onto an HTML canvas and exports a new file. There is no conversion farm. That is why AVIF, TIFF, and PSD are not on the menu: the tool refuses types it cannot encode instead of changing the file extension and hoping.',
    figures: [
      {
        src: '/guides/img/convert.svg',
        alt: 'Diagram of a PNG going to a JPEG export through the File Converter',
        caption: 'JPEG has no transparency. If you start from a PNG with a clear background, pick PNG or WebP if you need the alpha channel.'
      }
    ],
    lead: [
      'Canvas conversion is a redraw. Colour profiles, EXIF, and animation frames are not a full professional pipeline. A screenshot usually wants PNG. A photo for a form that caps size often wants JPEG. WebP is a smaller still image for the web when the destination accepts it.',
      'Audio on this page is a separate path: the browser decodes a sound it already understands and writes WAV. Word DOCX is read with mammoth and exported as text or a simple PDF. Those paths are not image conversion with a different button.'
    ],
    whenToUse: [
      'Convert when a form insists on JPEG, or when you want WebP for a smaller still image.',
      'This is not a RAW camera pipeline, an AVIF factory, or a CMYK print RIP.'
    ],
    steps: [
      { title: 'Add images the browser can decode', body: 'PNG, JPEG, and WebP are the everyday cases. If the thumbnail never appears, the browser could not decode the file.' },
      { title: 'Pick an output the tool encodes', body: 'Canvas export targets PNG, JPEG, or WebP. JPEG flattens transparency to a background.' },
      { title: 'Download the results', body: 'Keep originals until you have opened the new files. Re-encoding JPEG twice stacks artefacts.' }
    ],
    sections: [
      {
        heading: 'Quality and colour',
        paragraphs: [
          'JPEG uses lossy compression. A once-through export at a high quality setting is usually fine for a form. Running the same JPEG through the converter again makes blocking more visible.',
          'Wide-gamut photos may look different after canvas because the browser converts to the canvas colour space. If you need a print-accurate TIFF, use desktop software.'
        ]
      },
      {
        heading: 'Troubleshooting',
        paragraphs: [
          'HEIC from iPhones is not a guaranteed decode in every browser. Convert HEIC on the phone to JPEG first, or use a desktop tool.',
          'Animated GIFs are not a multi-frame pipeline here. You will get a still frame at best. Do not expect a movie.'
        ]
      }
    ],
    cannot: ['No AVIF, TIFF, or PSD encoding.', 'No CMYK print pipeline.', 'Animated GIFs are not a multi-frame pipeline.', 'HEIC support depends on the browser.'],
    privacy: ['Image bytes stay in this tab. The host may log that you loaded the converter page. Unsplash photos on the marketing cards are a separate request from your files.'],
    notes: ['Related: Image Optimizer for scale and quality sliders.']
  },
  {
    slug: 'compress-images-in-browser',
    title: 'Compress images in the browser',
    summary: 'Scale and re-encode images in canvas with before and after sizes. Savings vary by source.',
    toolRoute: '/image-optimizer',
    toolLabel: 'Open Image Optimizer',
    updated: '4 September 2026',
    wordCount: 860,
    intro:
      'Compression on FileTools Kit is canvas re-encoding. The Image Optimizer scales and re-saves pictures in this tab and shows before-and-after sizes. It is not a promise that every photo will shrink by a fixed percent.',
    figures: [
      {
        src: '/guides/img/compress.svg',
        alt: 'Diagram comparing a 2.4 MB original with a 410 KB canvas export',
        caption: 'Example sizes only. Reducing width often saves more than shaving a few JPEG quality points.'
      }
    ],
    lead: [
      'A phone photo is often 4000 pixels wide. Few web forms need that. Dropping the long edge to 1600 or 1920 pixels usually beats a tiny quality change. The optimizer exposes both sliders so you can see the byte count update in the list.',
      'There is no ZIP of all results and no before/after slider overlay. Each file downloads on its own. That keeps the code honest about what canvas can do in a tab.'
    ],
    whenToUse: [
      'Compress when an upload form has a size cap, or when a chat app refuses a large JPEG.',
      'Do not expect archival lossless RAW compression. Do not run a JPEG through the tool twice if you still have the original.'
    ],
    steps: [
      { title: 'Add images', body: 'A long list of huge photos can strain memory. Start with a handful, especially on a phone.' },
      { title: 'Tune quality and scale', body: 'Watch the listed sizes. If the after size barely moves, scale is the lever that is left.' },
      { title: 'Download each file', body: 'Open the result. If it looks too soft, raise quality or scale and export again from the original.' }
    ],
    sections: [
      {
        heading: 'What “savings” means',
        paragraphs: [
          'A PNG screenshot of UI often shrinks when you switch to PNG still, but not as much as a photo going to JPEG. A photo that is already a small WhatsApp JPEG may not shrink at all and can look worse.',
          'WebP can be smaller than JPEG at a similar look, but only if the destination accepts WebP. Email clients and some government forms still want JPEG.'
        ]
      },
      {
        heading: 'Troubleshooting',
        paragraphs: [
          'If the page freezes, you dropped too many 12 megapixel files into a phone tab. Work in batches.',
          'If transparency vanishes, you exported JPEG. Switch to PNG or WebP.'
        ]
      }
    ],
    cannot: ['No guaranteed ZIP bundle.', 'No comparison slider overlay.', 'No professional print RIP.', 'No guaranteed percent saving.'],
    privacy: ['Pixels are re-encoded in this tab. When ads are eventually enabled, ad networks still would not receive your image files from our servers.'],
    notes: ['Always start from the first-generation original when you can.']
  },
  {
    slug: 'build-resume-pdf',
    title: 'Build a resume PDF in your browser',
    summary: 'Fill a form, pick a layout, download a PDF with jsPDF. Keyword overlap is not an employer ATS.',
    toolRoute: '/resume-builder',
    toolLabel: 'Open Resume Builder',
    updated: '4 September 2026',
    wordCount: 940,
    intro:
      'The Resume Builder is a form, a live preview, twelve layouts, and a PDF download. You can paste a job description to see a local keyword-overlap percentage. That percentage is not Greenhouse, Lever, Workday, or any employer applicant-tracking system. Bullet rewrite is a local action-verb helper, not a remote model.',
    figures: [
      {
        src: '/guides/img/resume.svg',
        alt: 'Diagram of the resume editor on the left and a Modern Teal PDF preview on the right',
        caption: 'Download PDF uses the current form. There is no separate generate step. Empty fields are skipped.'
      }
    ],
    lead: [
      'Sample copy on first load is fiction (Alex Mercer). Replace it. Use an email you monitor. The draft can stay in this browser under a localStorage key so a refresh does not wipe the form. Clearing site data for filetoolskit.com deletes that draft.',
      'Layouts are Classic, Ivy, Elegant, Modern Teal, Teal Banner, Executive, Slate, Sidebar, Timeline, Swiss, Editorial, and Compact. They use Helvetica or Times built into the PDF. They are not Microsoft Word’s photo templates. Pick Executive or Sidebar if you want a stronger masthead.'
    ],
    whenToUse: [
      'Use it when you want a clean one-page PDF without creating an account.',
      'Do not treat the overlap score as a prediction of interviews. Do not paste secrets you would not put in a CV.'
    ],
    steps: [
      { title: 'Replace the sample', body: 'Name, title, contact, summary, roles, education, skills. Certifications are optional.' },
      { title: 'Pick a template', body: 'Use the dropdown or Preview templates. The right pane follows the layout. PDF matches the selection.' },
      { title: 'Optional job text', body: 'Paste a description. The score counts a short keyword list. Missing terms are a hint, not a verdict.' },
      { title: 'Download PDF', body: 'Open the file in a reader. If a line collides, shorten the source text and export again.' }
    ],
    sections: [
      {
        heading: 'What “ATS” is not',
        paragraphs: [
          'Employers parse resumes with their own software. FileTools Kit does not speak to those systems. Overlap % is a local count of whether words such as react or typescript appear in both the pasted job text and your form. You can score 100% and still be a poor fit.',
          'Rewrite will not stack verbs. If a bullet already starts with Built or Migrated, it stays. If a bullet starts with “Responsible for”, the helper may swap in an action verb. Read it. Truth beats stuffing.'
        ]
      },
      {
        heading: 'Troubleshooting',
        paragraphs: [
          'If the PDF looks empty, you may still be on an old cached draft. Hard-refresh. If dates overlap a long job title, shorten the title or use Compact.',
          'jsPDF cannot load custom brand fonts without extra files. That is why the twelve layouts share Helvetica and Times.'
        ]
      }
    ],
    cannot: ['Not an employer ATS.', 'Not generative AI.', 'No LinkedIn import.', 'No uploaded custom fonts.', 'Not InDesign.'],
    privacy: ['Resume text stays in this tab plus optional localStorage on this device. Hosting logs are not a copy of your CV.'],
    notes: ['Related: PDF Suite if you need to merge a cover letter PDF with the resume.']
  },
  {
    slug: 'create-qr-code',
    title: 'Create a QR code and export PNG or SVG',
    summary: 'Encode a URL, Wi-Fi payload, vCard, or text in this tab. There is no scan-analytics dashboard.',
    toolRoute: '/qr-generator',
    toolLabel: 'Open QR Generator',
    updated: '4 September 2026',
    wordCount: 850,
    intro:
      'A QR code is a drawing of data. FileTools Kit encodes a URL, Wi-Fi payload, vCard, or text in the browser and exports PNG or SVG. Whoever photographs the code gets that payload. We do not count scans.',
    figures: [
      {
        src: '/guides/img/qr.svg',
        alt: 'Diagram of a URL field, type chips, and a QR preview with PNG and SVG export',
        caption: 'Include https:// for websites. Leave a quiet-zone margin when you print. Glossy laminate can break scans.'
      }
    ],
    lead: [
      'Wi-Fi codes are convenient and dangerous in the same way as writing the password on a whiteboard. Anyone who photographs the poster gets the network. vCard codes are a digital business card. Keep fields short; dense payloads fail at small print sizes.',
      'SVG is the better print original. PNG is the better chat attachment. Test-scan with a second phone before you order 500 stickers.'
    ],
    whenToUse: [
      'Use it for a poster URL, a Wi-Fi card at home, or a simple vCard.',
      'Do not use it as a payment terminal or a link shortener with analytics.'
    ],
    steps: [
      { title: 'Choose the data type', body: 'URL, Wi-Fi, vCard, or text.' },
      { title: 'Enter the content', body: 'Type the real destination. A missing https:// still encodes, but phones may not open it as a site.' },
      { title: 'Adjust colours', body: 'Keep strong contrast. Light grey on white is a pretty way to print a code nobody can scan.' },
      { title: 'Export and test', body: 'PNG or SVG. Scan it. Confirm the destination before you print.' }
    ],
    sections: [
      {
        heading: 'Print and contrast',
        paragraphs: [
          'Leave a quiet zone — empty margin — around the square. Cropping that margin in Canva is a common way to break a code.',
          'Very long URLs make dense modules. If the print is small, use a short destination page you control rather than a query-string monster.'
        ]
      },
      {
        heading: 'Troubleshooting',
        paragraphs: [
          'If nothing scans, increase size, darken the foreground, lighten the background, and reprint.',
          'If Wi-Fi fails, check hidden-network flags and the password. The code cannot invent a network that is offline.'
        ]
      }
    ],
    cannot: ['Does not count scans.', 'Does not shorten URLs.', 'Very long payloads fail at small print sizes.', 'Not a payment terminal.'],
    privacy: ['The string is encoded in this tab. Whoever scans a URL visits that destination, not FileTools Kit.'],
    notes: ['Related: SVG Studio if you want to restyle a downloaded SVG.' ]
  },
  {
    slug: 'what-stays-in-the-tab',
    title: 'What “files stay in this tab” actually means',
    summary: 'File bytes live in page memory. Hosting logs, fonts, card photos, and future ads are a different channel.',
    toolRoute: '/privacy',
    toolLabel: 'Read the privacy policy',
    updated: '4 September 2026',
    wordCount: 980,
    intro:
      'FileTools Kit says work happens in this tab. That sentence is precise, not an air-gap. This guide separates file bytes in memory, Vercel hosting logs, Unsplash and font requests, and advertising cookies that may appear only after Google AdSense is approved.',
    figures: [
      {
        src: '/guides/img/tab-privacy.svg',
        alt: 'Two-column diagram: in-tab file bytes versus network requests for hosting, fonts, Unsplash, and future ads',
        caption: 'The accurate line: no FileTools Kit file-upload API. Hosting and third-party assets still exist. This is not HIPAA or GDPR certification.'
      }
    ],
    lead: [
      'When you drop a PDF, the browser holds a File or ArrayBuffer in the page. pdf-lib, jsPDF, and Canvas read that memory. Closing the tab lets the engine discard it. We do not operate an upload API that receives those bytes.',
      'Loading the website is still a normal HTTPS request. Hosts commonly log IP address, user agent, URL, and time. That is not a copy of your document. It is how any site is served.'
    ],
    whenToUse: [
      'Read this before you process a confidential PDF, and again if you review the site for advertising programs.',
      'If your threat model forbids any network, download the page is not enough — you would need an air-gapped machine. This site is not that.'
    ],
    steps: [
      { title: 'File bytes in memory', body: 'Dropped files live in the tab. Tools never POST them to filetoolskit.com as an upload.' },
      { title: 'Vercel serves the app', body: 'Opening /pdf-suite is a page view. Expect ordinary host logs.' },
      { title: 'Unsplash and fonts', body: 'Tool cards may load photographs from Unsplash. Fonts may load Outfit from Google Fonts. Those requests are for assets, not your PDF.' },
      { title: 'Advertising, later', body: 'The AdSense script is not embedded today. After approval, Google may use cookies to serve ads. Ad networks still would not receive your file bytes from our servers.' },
      { title: 'First-party keys', body: 'UI prefs and optional A/B keys (ftk_ab_*) stay in this browser. Resume drafts may stay in localStorage. Clear site data to delete them.' }
    ],
    sections: [
      {
        heading: 'Extensions and other apps',
        paragraphs: [
          'A browser extension you installed can read a page. FileTools Kit cannot stop that. If a document is sensitive, use a profile without extensions or a dedicated machine.',
          'Screenshots, screen-sharing, and malware are outside this product. Client-side processing reduces our access. It does not make the device honest.'
        ]
      },
      {
        heading: 'What we will not claim',
        paragraphs: [
          'We will not say HIPAA aligned, air-gapped, AES-256 PDF encryption, or GDPR certified. The privacy policy describes practice. It is not a certification.',
          'Questions: privacy@filetoolskit.com. Operator: Souren Das, Bengaluru, Karnataka, India.'
        ]
      }
    ],
    cannot: ['This is not an air-gapped device.', 'This is not a GDPR, CCPA, HIPAA, or COPPA certification.', 'Browser extensions you installed can read a page.'],
    privacy: ['Operator: Souren Das, Bengaluru. privacy@filetoolskit.com. support@filetoolskit.com.'],
    notes: ['See also the cookie policy for what will change if AdSense is enabled.']
  },
  {
    slug: 'hash-text-sha256',
    title: 'Hash text with SHA-256 in the browser',
    summary: 'Web Crypto SHA family. No MD5. A hash is a fingerprint of bytes, not encryption.',
    toolRoute: '/dev-tools',
    toolLabel: 'Open Dev Tools',
    updated: '4 September 2026',
    wordCount: 870,
    intro:
      'A hash is a fingerprint of bytes, not encryption. Dev Tools uses the Web Cryptography API to compute SHA-1, SHA-256, SHA-384, and SHA-512. There is no MD5. The text you paste is not sent to a hashing API we run.',
    figures: [
      {
        src: '/guides/img/hash.svg',
        alt: 'Diagram of a text input and a SHA-256 digest computed in the browser',
        caption: 'A trailing newline changes SHA-256. Copy the payload the same way the publisher hashed it.'
      }
    ],
    lead: [
      'People confuse hashing with hiding. You cannot decrypt SHA-256 to get the original paragraph back. Matching hashes mean the same bytes went in. They do not prove who wrote the text and they do not replace a signature.',
      'SHA-1 is available because old checklists still mention it. Prefer SHA-256 for new work. This page does not implement AES-256 PDF encryption. That is a different problem in a different tool, and FileTools Kit does not offer it.'
    ],
    whenToUse: [
      'Hash when you want to check whether two blobs of text match, or to compare against a published digest.',
      'Do not paste production secrets into any website if your threat model forbids it — including this one. Prefer an offline tool for secrets.'
    ],
    steps: [
      { title: 'Paste the text', body: 'Encoding matters. UTF-8 text is not the same as UTF-16. A trailing space is a different input.' },
      { title: 'Choose SHA-256 unless you have a reason not to', body: 'SHA-1 is older and not appropriate for new security designs.' },
      { title: 'Copy the digest', body: 'Compare lowercase hex with the published value. Some publishers wrap SHA-256 in a file; hashing the file is not the same as hashing the visible text.' }
    ],
    sections: [
      {
        heading: 'JSON, Base64, and regex on the same page',
        paragraphs: [
          'Dev Tools also converts flat JSON arrays to CSV, inserts line breaks before SQL keywords, tests a JavaScript regular expression, and encodes Base64. Those helpers are local too. JSON/CSV is not a nested-object flattener for arbitrary trees.',
          'If CSV looks wrong, your JSON is probably nested. Flatten it first or use a different tool.'
        ]
      },
      {
        heading: 'Troubleshooting',
        paragraphs: [
          'If your digest disagrees with a website, check newlines and encoding before you assume a bug.',
          'Empty input still hashes. The digest of an empty string is a real SHA-256 value, not an error.'
        ]
      }
    ],
    cannot: ['No MD5.', 'No HMAC helper with a hosted key.', 'You cannot decrypt SHA-256.', 'This page does not implement AES-256 PDF encryption.'],
    privacy: ['The string is hashed in this tab with Web Crypto. Vercel may log that you opened Dev Tools.'],
    notes: ['Related: Text Diff if you need to see how two documents differ rather than a fingerprint.']
  }
];

export function getGuide(slug: string | undefined) {
  if (!slug) return undefined;
  return GUIDES.find((g) => g.slug === slug);
}
