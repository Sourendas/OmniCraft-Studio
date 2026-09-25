import type { GuideArticle } from './guides';

export const COMPRESS_PDF_GUIDE: GuideArticle = {
    slug: 'compress-pdf-in-browser',
    title: 'How to compress a PDF in your browser',
    summary:
      'Rewrite one PDF locally, compare the sizes, and keep whichever copy is smaller. Image-heavy scans and already-compressed PDFs often barely shrink.',
    toolRoute: '/compress-pdf',
    toolLabel: 'Open Compress PDF',
    updated: '25 September 2026',
    wordCount: 820,
    intro:
      'You need a PDF small enough to email or upload, but you do not want to send it to a processing service. Compress PDF copies every page into a new file with pdf-lib in this browser tab and saves it with object streams, which can remove wasted structure. It then shows the original and output sizes. It is a light rewrite, not a promise that every PDF will shrink.',
    figures: [],
    lead: [
      'Start with the file you actually need to send and keep the original until you have opened the result. The tool accepts one PDF at a time.',
      'The rewrite keeps pages as PDF pages. Text, fonts, and images are copied from the source rather than re-rendered, so selectable text stays selectable.',
      'Compare the two sizes shown after the run. If the output is not meaningfully smaller, send the original.'
    ],
    whenToUse: [
      'Use this when a PDF was exported by software that wrote a bloated file structure and an upload form has a size limit.',
      'Do not expect large savings on scanned or photo-heavy PDFs. Their images are copied as they are, so the bytes mostly stay.',
      'For image-heavy files, shrinking the source images first with Image Optimizer and rebuilding the PDF usually saves far more.'
    ],
    steps: [
      {
        title: 'Open Compress PDF',
        body: 'Open the tool at /compress-pdf. Until you choose a file, no PDF bytes are processed.'
      },
      {
        title: 'Choose one PDF',
        body: 'Pick one PDF from your device. The browser reads it in this tab. Encrypted or damaged PDFs may fail.'
      },
      {
        title: 'Let the rewrite run',
        body: 'Pages are copied into a new document and saved with object streams. Most files finish in a few seconds; very large files take longer, so keep this tab open.'
      },
      {
        title: 'Compare the sizes',
        body: 'The status line shows the original size and the output size in KB. The rewritten file downloads as compressed.pdf.'
      },
      {
        title: 'Open the download',
        body: 'Spot-check the first, middle, and last pages. If the output is not smaller or something looks wrong, use the original.'
      }
    ],
    sections: [
      {
        heading: 'Why a PDF may not shrink',
        paragraphs: [
          'Most of the bytes in a typical PDF are embedded images and fonts. A light rewrite copies those as they are, so a scan or photo-heavy file often ends up about the same size. Savings come from cleaner structure, and they depend on how the source was written.',
          'There is no honest fixed percentage to promise. The tool reports the real before and after sizes so you can decide.'
        ]
      },
      {
        heading: 'What the rewrite keeps',
        paragraphs: [
          'Because pages are copied rather than rendered to images, text normally stays selectable and vector shapes stay sharp. Some document-level extras, such as bookmarks or form behaviour, may not carry over to the new file, so check anything that matters before you send it.'
        ]
      },
      {
        heading: 'Troubleshooting',
        paragraphs: [
          'Encrypted PDFs often fail because the file cannot be read without the required password or permissions. A damaged PDF can fail for the same reason. Try opening and re-saving it in a desktop PDF reader, then try again.',
          'If a large document stalls, close other heavy tabs. If you only need some pages, extract them with PDF Suite first and compress the smaller result.'
        ]
      }
    ],
    cannot: [
      'Does not guarantee a smaller file.',
      'Does not recompress or downsample embedded images.',
      'Does not OCR or guarantee bookmarks, forms, and accessibility metadata.',
      'Encrypted PDFs may fail.',
      'Handles one PDF at a time; no batch folders.'
    ],
    privacy: [
      'The PDF is read and processed in this browser tab; FileTools Kit does not upload it to a processing server. Ordinary page hosting, browser, and third-party asset behavior is covered by the site privacy and cookie policies. This is not an air-gap or compliance certification.'
    ],
    notes: [
      'Author: Souren Das, FileTools Kit, Bengaluru.',
      'If you need page selection first, use PDF Suite and then compress the resulting PDF.'
    ],
    relatedGuides: [
      { slug: 'merge-pdf-in-browser', label: 'Merge PDFs in the browser' },
      { slug: 'split-pdf-pages', label: 'Extract selected PDF pages' },
      { slug: 'what-stays-in-the-tab', label: 'What stays in the tab' }
    ]
  };
