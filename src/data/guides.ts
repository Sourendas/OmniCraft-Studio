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
  relatedGuides?: { slug: string; label: string }[];
}

export const GUIDES: GuideArticle[] = [
  {
    slug: 'merge-pdf-in-browser',
    title: 'How to merge 20 PDFs in your browser',
    summary:
      'Combine a cover letter, resume, certificates, and scans into one ordered PDF in this tab. FileTools Kit does not upload those files to a processing API.',
    toolRoute: '/pdf-suite',
    toolLabel: 'Open PDF Suite',
    updated: '17 September 2026',
    wordCount: 1100,
    intro:
      'You have a cover letter, a resume, a few certificates, and a stack of scanned pages. The job is one ordered PDF you can attach—not a lecture about PDF formats. FileTools Kit’s PDF Suite reads each file in this tab with the browser File API, copies pages into a new document with pdf-lib, and starts a download. There is no FileTools Kit upload API in the middle of that copy.',
    figures: [
      {
        src: '/guides/img/merge-pdf.png',
        alt: 'Screenshot of FileTools Kit PDF Suite drop zone and merge controls',
        caption:
          'Live PDF Suite UI. Preview tiles are placeholders, not rendered PDF pages.'
      }
    ],
    lead: [
      'Name the outcome first: for example, Application-Packet-Souren-Das.pdf with cover, resume, then certificates in the order a recruiter asked for. Merged output follows the list order in the tool.',
      'A merge is a page copy, not a redesign. Fonts, images, form fields, and page size come from the sources. If one file is A4 and another is US Letter, the merged file keeps those sizes per page.',
      'Very large scans can exhaust a phone tab. On a small device, merge in batches of a few files, download, then merge those results on a desktop browser if you need the full pack.'
    ],
    whenToUse: [
      'Use merge when you have two or more PDFs and need one file to send, print, or archive.',
      'Skip merge if you only need a subset of pages—that is split. Skip it if files are password-protected; encrypted PDFs often fail in the browser. Skip it if you need redaction. A text watermark is overlay text, not a black box that removes words.'
    ],
    steps: [
      {
        title: 'Open PDF Suite',
        body: 'From the home page, open PDF Suite. Until you choose files, nothing leaves your computer except the request that loaded the website.'
      },
      {
        title: 'Drop or pick every PDF',
        body: 'Add the cover, resume, certificates, and scans. The browser stores them as File objects in this tab. If a file does not appear, it may not be a PDF, it may be corrupt, or it may be encrypted.'
      },
      {
        title: 'Reorder before you merge',
        body: 'Drag or use the move controls so the list matches the packet you want. Use rotate if a scan is sideways. Rotation is applied on export, not as a live pixel preview.'
      },
      {
        title: 'Merge and download',
        body: 'Run merge. The tool builds a new PDF in memory and starts a download (typically merged.pdf—rename it before you send). Originals on disk are not modified.'
      },
      {
        title: 'Spot-check the result',
        body: 'Open the download in a reader. Check the first page, a middle certificate, and the last scan. If order is wrong, fix the list and merge again from the sources.'
      },
      {
        title: 'Optional watermark',
        body: 'You can stamp text such as CONFIDENTIAL. That is a visible overlay. It is not encryption and it is not redaction.'
      }
    ],
    sections: [
      {
        heading: 'Can you merge about 20 files?',
        paragraphs: [
          'Yes, if the browser tab has enough memory. Twenty small text PDFs is usually fine on a laptop. Twenty multi-page phone scans may stall a phone tab. If merge fails, try fewer files, close other tabs, or merge in two passes.',
          'pdf-lib parses each PDF in JavaScript and copies page objects. Encrypted files often fail because the library cannot read the page stream. ignoreEncryption is a best effort and still does not unlock every file.'
        ]
      },
      {
        heading: 'Troubleshooting',
        paragraphs: [
          'If merge fails, try one file at a time. A single damaged PDF can stop the batch. If a file opens in Adobe but not here, it may use features pdf-lib does not implement.',
          'WhatsApp and some mail apps recompress attachments. If a recipient says the file is blank, ask them to open the downloaded PDF rather than a preview thumbnail.'
        ]
      }
    ],
    cannot: [
      'Encrypted PDFs may fail.',
      'Preview tiles are placeholders, not rendered pages.',
      'Very large packs can exhaust tab memory.',
      'Merge does not OCR scans.',
      'No digital-signature preservation guarantee.'
    ],
    privacy: [
      'Processing uses pdf-lib in this tab. FileTools Kit does not provide a file-upload API for your PDFs. Hosting may log that you loaded the page (IP, browser, time). That log is not your PDF.',
      'Google AdSense may show ads on the site. Ad networks do not receive your PDF bytes from our servers, because those files are not uploaded to us. Details live in the privacy and cookie policies—this guide states the privacy point once.'
    ],
    notes: [
      'Author: Souren Das, FileTools Kit, Bengaluru.',
      'Next: extract only some pages with the split guide, or attach certificates after you export a resume PDF.'
    ],
    relatedGuides: [
      { slug: 'split-pdf-pages', label: 'Extract selected PDF pages' },
      { slug: 'build-resume-pdf', label: 'Build a resume PDF' },
      { slug: 'what-stays-in-the-tab', label: 'What stays in the tab' }
    ]
  },
  {
    slug: 'split-pdf-pages',
    title: 'How to extract pages 2–4 from a PDF',
    summary:
      'Copy a page range such as 2-4 into a new PDF in this tab. The original file on disk is not rewritten.',
    toolRoute: '/pdf-suite',
    toolLabel: 'Open PDF Suite',
    updated: '17 September 2026',
    wordCount: 980,
    intro:
      'A recruiter asked for the signed page and the two pages that follow—not the whole handout. Splitting here means copying that range into a new PDF in this tab with pdf-lib, then downloading the smaller file.',
    figures: [
      {
        src: '/guides/img/split-pdf.png',
        alt: 'Screenshot of FileTools Kit PDF Suite page-range split controls',
        caption: 'Page numbers are 1-based. Split copies whole pages. It does not crop a region inside a page.'
      }
    ],
    lead: [
      'The range parser accepts commas and hyphens. 2-4 means pages 2, 3, and 4 of the first loaded file. 1-3,5 means pages 1, 2, 3, and 5. Out-of-range numbers are ignored.',
      'Split is not redaction. If a page contains a name you wanted gone, copying other pages still leaves that name on the pages you kept.'
    ],
    whenToUse: [
      'Split when you need a smaller packet and you know the page numbers.',
      'Do not split if you need to extract images as separate PNG files, or if the PDF is encrypted.'
    ],
    steps: [
      {
        title: 'Add one PDF',
        body: 'Wait until the tool shows a page count. If parsing fails, the file may be encrypted or damaged.'
      },
      {
        title: 'Open Split / Range',
        body: 'The range field applies to the first loaded file. Extra files in the list are ignored for split.'
      },
      {
        title: 'Enter the range',
        body: 'Example: 2-4 for pages two through four. Page numbers are 1-based, the way people count in a reader.'
      },
      {
        title: 'Download and verify',
        body: 'Open the new PDF and confirm the page count and content before you send it.'
      }
    ],
    sections: [
      {
        heading: 'Split versus merge',
        paragraphs: [
          'Merge walks every file in list order and builds one packet. Split copies pages from the first document only. If you meant to split the second file, remove the first or load only the file you care about.',
          'This limit keeps the UI honest. A silent split of the wrong file is worse than asking you to load one PDF.'
        ]
      },
      {
        heading: 'Troubleshooting',
        paragraphs: [
          'If the download has fewer pages than you expected, the range may have been invalid. Use digits, commas, and hyphens only.',
          'Scanned pages stay as images. Split will not make them searchable. That would be OCR, which this suite does not run.'
        ]
      }
    ],
    cannot: [
      'Encrypted PDFs may fail.',
      'Split does not extract images as separate files.',
      'Preview tiles are placeholders.',
      'No OCR.'
    ],
    privacy: [
      'Pages are copied in this tab. FileTools Kit does not receive the PDF on an upload API. See the privacy policy for hosting logs and ads.'
    ],
    notes: ['Author: Souren Das, FileTools Kit, Bengaluru.'],
    relatedGuides: [
      { slug: 'merge-pdf-in-browser', label: 'Merge PDFs in the browser' },
      { slug: 'what-stays-in-the-tab', label: 'What stays in the tab' }
    ]
  },
  {
    slug: 'convert-images-png-jpg-webp',
    title: 'How to convert JPG, PNG, and WebP for the job',
    summary:
      'Re-encode images with the canvas API in this tab. Unsupported types are rejected, not renamed.',
    toolRoute: '/file-converter',
    toolLabel: 'Open File Converter',
    updated: '17 September 2026',
    wordCount: 1000,
    intro:
      'The upload form rejected your hero image, or the CMS wants WebP. The File Converter draws a PNG, JPEG, or WebP onto an HTML canvas and exports a new file in this tab. There is no conversion farm. AVIF, TIFF, and PSD are refused instead of renamed.',
    figures: [
      {
        src: '/guides/img/convert.png',
        alt: 'Screenshot of FileTools Kit File Converter drop zone',
        caption:
          'File Converter UI. JPEG has no transparency — pick PNG or WebP if you need an alpha channel.'
      }
    ],
    lead: [
      'Pick the format for the destination: WebP for modern web delivery, JPG for photographs and broad compatibility, PNG when lossless detail or transparency matters.',
      'Canvas conversion is a redraw. Colour profiles, EXIF, and animation frames are not a full professional pipeline.'
    ],
    whenToUse: [
      'Convert when a form insists on JPEG, or when you want WebP for a smaller still image.',
      'This is not a RAW camera pipeline, an AVIF factory, or a CMYK print RIP.'
    ],
    steps: [
      {
        title: 'Add images the browser can decode',
        body: 'PNG, JPEG, and WebP are the everyday cases. If the thumbnail never appears, the browser could not decode the file. Convert HEIC on the phone to JPEG first if needed.'
      },
      {
        title: 'Choose the output format',
        body: 'Canvas export targets PNG, JPEG, or WebP. JPEG flattens transparency to a background.'
      },
      {
        title: 'Download and compare',
        body: 'Check dimensions and file size. Rename with a meaningful filename before you upload to the site or form. Keep originals until you have opened the new files.'
      }
    ],
    sections: [
      {
        heading: 'JPG to WebP for a website',
        paragraphs: [
          'Select your JPG photos, choose WebP, export, and compare visual quality against the byte size. If the destination CMS does not accept WebP, keep JPG.',
          'If you also need a smaller file at the same format, use Image Optimizer after conversion—or optimize first when you only need compression.'
        ]
      },
      {
        heading: 'Troubleshooting',
        paragraphs: [
          'HEIC from iPhones is not a guaranteed decode in every browser.',
          'Animated GIFs are not a multi-frame pipeline here. You will get a still frame at best.'
        ]
      }
    ],
    cannot: [
      'No AVIF, TIFF, or PSD encoding.',
      'No CMYK print pipeline.',
      'Animated GIFs are not a multi-frame pipeline.',
      'HEIC support depends on the browser.'
    ],
    privacy: [
      'Image bytes stay in this tab. The host may log that you loaded the converter page. See the privacy policy for ads and third-party assets.'
    ],
    notes: ['Author: Souren Das, FileTools Kit, Bengaluru.'],
    relatedGuides: [
      { slug: 'compress-images-in-browser', label: 'Compress images for email' },
      { slug: 'what-stays-in-the-tab', label: 'What stays in the tab' }
    ]
  },
  {
    slug: 'compress-images-in-browser',
    title: 'How to compress images for email or a website',
    summary:
      'Scale and re-encode images in canvas with before and after sizes. Savings vary by source.',
    toolRoute: '/image-optimizer',
    toolLabel: 'Open Image Optimizer',
    updated: '17 September 2026',
    wordCount: 960,
    intro:
      'Thirty phone photos will not fit in one email, but the recipient still needs readable pictures. Compression on FileTools Kit is canvas re-encoding in this tab: scale, re-save, and download with before-and-after sizes. It is not a promise that every photo shrinks by a fixed percent.',
    figures: [
      {
        src: '/guides/img/compress.png',
        alt: 'Screenshot of FileTools Kit image compressor with quality controls',
        caption: 'Image Optimizer UI. Reducing width often saves more than a tiny quality change.'
      }
    ],
    lead: [
      'A phone photo is often thousands of pixels wide. Few email clients need that. Dropping the long edge to around 1600–1920 pixels usually beats a tiny quality change.',
      'Use Image Optimizer when the job is size. Use File Converter when the job is primarily format (for example JPG to WebP).'
    ],
    whenToUse: [
      'Compress when an upload form has a size cap, or when a chat app refuses a large JPEG.',
      'Do not expect archival lossless RAW compression. Prefer the first-generation original if you re-export.'
    ],
    steps: [
      {
        title: 'Add a batch you can finish',
        body: 'A long list of huge photos can strain memory. Start with a handful, especially on a phone.'
      },
      {
        title: 'Tune quality and scale',
        body: 'Watch the listed sizes. If the after size barely moves, scale is the lever that is left.'
      },
      {
        title: 'Download and spot-check',
        body: 'Check one portrait, one text-heavy image, and one detailed photo. If results look too soft, raise quality or scale and export again from the originals.'
      }
    ],
    sections: [
      {
        heading: 'What savings means',
        paragraphs: [
          'A PNG screenshot of UI often shrinks less than a photo going to JPEG. A photo that is already a small WhatsApp JPEG may not shrink at all and can look worse.',
          'WebP can be smaller than JPEG at a similar look, but only if the destination accepts WebP.'
        ]
      }
    ],
    cannot: [
      'No guaranteed ZIP bundle.',
      'No comparison slider overlay.',
      'No professional print RIP.',
      'No guaranteed percent saving.'
    ],
    privacy: [
      'Pixels are re-encoded in this tab. Ad networks do not receive your image files from our servers. See the privacy policy for hosting and ads.'
    ],
    notes: ['Author: Souren Das, FileTools Kit, Bengaluru.'],
    relatedGuides: [
      { slug: 'convert-images-png-jpg-webp', label: 'Convert JPG / PNG / WebP' },
      { slug: 'what-stays-in-the-tab', label: 'What stays in the tab' }
    ]
  },
  {
    slug: 'build-resume-pdf',
    title: 'How to turn your work history into a resume PDF',
    summary:
      'Fill a form, pick a layout, download a PDF. Keyword overlap is local—not an employer ATS.',
    toolRoute: '/resume-builder',
    toolLabel: 'Open Resume Builder',
    updated: '17 September 2026',
    wordCount: 1050,
    intro:
      'Start with messy inputs: dates, projects, skills, and a job description copied from an application form. The Resume Builder is a form, a live preview, several layouts, and a PDF download in this tab. You can paste a job description to see a local keyword-overlap percentage. That percentage is not Greenhouse, Lever, Workday, or any employer applicant-tracking system.',
    figures: [
      {
        src: '/guides/img/resume.png',
        alt: 'Screenshot of FileTools Kit Resume Builder form and preview',
        caption: 'Resume Builder UI. Download PDF uses the current form; empty fields are skipped.'
      }
    ],
    lead: [
      'Sample copy on first load is fiction. Replace it. Use an email you monitor. A draft may stay in this browser under a localStorage key; clearing site data deletes that draft.',
      'Aim for one page when you can. Keep dates consistent. Do not invent metrics. After export, reopen the PDF and confirm text is selectable.'
    ],
    whenToUse: [
      'Use it when you want a clean resume PDF without creating an account.',
      'Do not treat the overlap score as a prediction of interviews. Do not paste secrets you would not put in a CV.'
    ],
    steps: [
      {
        title: 'Replace the sample',
        body: 'Name, title, contact, summary, roles, education, skills. Certifications are optional.'
      },
      {
        title: 'Paste the target job text (optional)',
        body: 'The score counts a short keyword list in this tab. Missing terms are a hint, not a verdict.'
      },
      {
        title: 'Shorten bullets to outcomes',
        body: 'Prefer what you shipped over duties lists. Local rewrite helpers are templates, not a remote model.'
      },
      {
        title: 'Pick a template and download',
        body: 'Preview the layout, export PDF, reopen it, and use a clear filename such as Souren-Das-Resume-Data-Analyst.pdf.'
      }
    ],
    sections: [
      {
        heading: 'What ATS is not',
        paragraphs: [
          'Employers parse resumes with their own software. FileTools Kit does not speak to those systems. Overlap % is a local count of whether words appear in both the pasted job text and your form.',
          'After you have a resume PDF, use PDF Suite if you need to merge a cover letter or certificates into one packet.'
        ]
      }
    ],
    cannot: [
      'Not an employer ATS.',
      'Not generative AI.',
      'No LinkedIn import.',
      'No uploaded custom fonts.'
    ],
    privacy: [
      'Resume text stays in this tab plus optional localStorage on this device. Hosting logs are not a copy of your CV. See the privacy policy for ads.'
    ],
    notes: ['Author: Souren Das, FileTools Kit, Bengaluru.'],
    relatedGuides: [
      { slug: 'merge-pdf-in-browser', label: 'Merge cover letter and certificates' },
      { slug: 'what-stays-in-the-tab', label: 'What stays in the tab' }
    ]
  },
  {
    slug: 'create-qr-code',
    title: 'How to create a QR code for Wi-Fi or a link',
    summary:
      'Encode a URL, Wi-Fi payload, vCard, or text in this tab. There is no scan-analytics dashboard.',
    toolRoute: '/qr-generator',
    toolLabel: 'Open QR Generator',
    updated: '17 September 2026',
    wordCount: 900,
    intro:
      'You need a QR for a hostel Wi-Fi card, a classroom handout, or a shop menu link. FileTools Kit encodes a URL, Wi-Fi payload, vCard, or text in the browser and exports PNG or SVG. Whoever photographs the code gets that payload. We do not count scans.',
    figures: [
      {
        src: '/guides/img/qr.png',
        alt: 'Screenshot of FileTools Kit QR Generator with a generated code',
        caption: 'QR Generator UI. Test the code with a second phone before you print handouts.'
      }
    ],
    lead: [
      'Keep strong contrast. Light grey on white is a pretty way to print a code nobody can scan.',
      'Do not put a Wi-Fi password on a public poster unless you intend that. A QR code also does not prove that its destination is safe.'
    ],
    whenToUse: [
      'Use it for URL, Wi-Fi, vCard, or short text you control.',
      'Skip it if you need scan analytics or dynamic QR redirect hosting—this tool does not provide those.'
    ],
    steps: [
      { title: 'Choose the data type', body: 'URL, Wi-Fi, vCard, or text.' },
      {
        title: 'Enter the exact content',
        body: 'Type the real destination or Wi-Fi details. A missing https:// still encodes, but phones may not open it as a site.'
      },
      {
        title: 'Adjust colours carefully',
        body: 'Foreground and background need enough contrast for cameras.'
      },
      {
        title: 'Export and test',
        body: 'PNG or SVG. Scan from a second device before you print.'
      }
    ],
    sections: [
      {
        heading: 'Wi-Fi cards',
        paragraphs: [
          'Double-check SSID and password spelling. One wrong character means a room full of failed joins.',
          'If the network is for guests only, say so on the card so people do not treat it as a private network promise.'
        ]
      }
    ],
    cannot: ['No scan analytics.', 'No dynamic redirect hosting.', 'Does not validate that a URL is safe.'],
    privacy: [
      'The string is encoded in this tab. Whoever scans a URL visits that destination, not FileTools Kit.'
    ],
    notes: ['Author: Souren Das, FileTools Kit, Bengaluru.'],
    relatedGuides: [{ slug: 'what-stays-in-the-tab', label: 'What stays in the tab' }]
  },
  {
    slug: 'what-stays-in-the-tab',
    title: 'What “files stay in this tab” actually means',
    summary:
      'File bytes can live as File objects in page memory. Hosting logs, fonts, and ads are separate channels. This is not an air gap.',
    toolRoute: '/privacy',
    toolLabel: 'Read privacy policy',
    updated: '17 September 2026',
    wordCount: 1000,
    intro:
      'FileTools Kit says work happens in this tab. That sentence is precise, not an air-gap claim. Dropped bytes can be held as File or ArrayBuffer objects in page memory while tools run. Hosting logs, third-party fonts or images, and advertising cookies are different channels. This guide states that once; the privacy and cookie policies carry the full legal detail.',
    figures: [
      {
        src: '/guides/img/tab-privacy.svg',
        alt: 'Diagram separating in-tab file bytes from hosting logs and ad cookies',
        caption:
          'Accurate line: no FileTools Kit file-upload API for tool files. Hosting and third-party assets still exist. This is not a compliance certification.'
      }
    ],
    lead: [
      'Closing the tab discards in-memory File objects for that page. It does not erase Vercel access logs for the page view, and it does not uninstall browser extensions that can read a page.',
      'If a document is highly sensitive under your policy, use a reviewed vendor workflow or a locked-down machine—not a random tab with extensions.'
    ],
    whenToUse: [
      'Read this when you want an honest picture of browser-side tools before you drop a file.',
      'Do not treat this page as GDPR, CCPA, HIPAA, or COPPA certification.'
    ],
    steps: [
      {
        title: 'File bytes in memory',
        body: 'Dropped files live in the tab while you work. Tools do not POST them to FileTools Kit as an upload API.'
      },
      {
        title: 'Hosting still serves the app',
        body: 'Opening a tool route is a page view. Expect ordinary host logs such as IP, user agent, and time.'
      },
      {
        title: 'Third-party assets',
        body: 'Marketing cards or fonts may load from third parties. Those requests are for assets, not your PDF or photo bytes.'
      },
      {
        title: 'Advertising',
        body: 'Google AdSense may show ads. Ad networks do not receive your file bytes from our servers. Cookie and consent details are in the cookie and privacy policies.'
      },
      {
        title: 'First-party keys',
        body: 'UI prefs and optional drafts (for example resume localStorage) stay in this browser. Clear site data to delete them.'
      }
    ],
    sections: [
      {
        heading: 'What we do not claim',
        paragraphs: [
          '“Local in the browser” is not a promise that nobody can ever see anything about your visit. It means FileTools Kit does not operate a file-processing upload API for these tools.',
          'Questions: support@filetoolskit.com or privacy@filetoolskit.com. Operator: Souren Das, Bengaluru, India.'
        ]
      }
    ],
    cannot: [
      'Not an air-gapped environment.',
      'Not a compliance certification.',
      'Cannot block browser extensions you installed.'
    ],
    privacy: [
      'This article is the plain-language map. The privacy policy and cookie policy are authoritative for ads, logs, and requests.'
    ],
    notes: ['Author: Souren Das, FileTools Kit, Bengaluru.'],
    relatedGuides: [
      { slug: 'merge-pdf-in-browser', label: 'Merge PDFs' },
      { slug: 'compress-images-in-browser', label: 'Compress images' }
    ]
  },
  {
    slug: 'hash-text-sha256',
    title: 'How to hash text with SHA-256 and verify a checksum',
    summary:
      'Paste text, calculate a SHA-family digest in the browser, and compare it. This is not a file-picker integrity tool.',
    toolRoute: '/dev-tools',
    toolLabel: 'Open Dev Tools',
    updated: '17 September 2026',
    wordCount: 880,
    intro:
      'You want to check copied text or a published checksum string—not verify a downloaded installer by selecting the file. Dev Tools hashes pasted text with the Web Crypto SHA family in this tab. It does not offer a dedicated file-hash workflow.',
    figures: [
      {
        src: '/guides/img/hash.svg',
        alt: 'Diagram of a text box, SHA-256 choice, and hex digest output',
        caption: 'Whitespace and line breaks matter. Hashing visible text is not the same as hashing a file’s bytes.'
      }
    ],
    lead: [
      'Prefer SHA-256 for new work. SHA-1 may exist for old checklists; it is not appropriate for new security designs.',
      'Do not call this a file integrity verifier. Publish a “hash a file” guide only after a real file-picker hash exists.'
    ],
    whenToUse: [
      'Hash when you need a digest of exact pasted text.',
      'Skip this if you need to hash a file from disk—that is a different tool we do not ship yet.'
    ],
    steps: [
      {
        title: 'Paste the exact text',
        body: 'Encoding matters. UTF-8 text is not the same as UTF-16. A trailing space is a different input.'
      },
      {
        title: 'Choose SHA-256 unless you have a reason not to',
        body: 'Run the hash in this tab.'
      },
      {
        title: 'Compare the digest',
        body: 'Compare lowercase hex with the published value character-for-character. Some publishers wrap a hash in a file; hashing the file is not the same as hashing the visible text.'
      }
    ],
    sections: [
      {
        heading: 'Related checks',
        paragraphs: [
          'If two strings look alike but hashes differ, use Text Diff to find the change.',
          'This page does not implement AES PDF encryption or MD5.'
        ]
      }
    ],
    cannot: ['Not a file-picker hasher.', 'No MD5.', 'Not AES encryption.'],
    privacy: ['Text is hashed in this tab. See the privacy policy for page logs and ads.'],
    notes: ['Author: Souren Das, FileTools Kit, Bengaluru.'],
    relatedGuides: [{ slug: 'what-stays-in-the-tab', label: 'What stays in the tab' }]
  }
];

export function getGuide(slug: string | undefined) {
  if (!slug) return undefined;
  return GUIDES.find((g) => g.slug === slug);
}
