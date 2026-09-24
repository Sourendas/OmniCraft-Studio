export const COMPRESS_PDF_GUIDE = {
    slug: 'compress-pdf-in-browser',
    title: 'How to compress a PDF in your browser',
    summary:
      'Render one PDF locally, compare the sizes, and download a smaller copy when the source allows it. Already-compressed PDFs may not shrink.',
    toolRoute: '/compress-pdf',
    toolLabel: 'Open Compress PDF',
    updated: '18 September 2026',
    wordCount: 1050,
    intro:
      'You need a PDF small enough to email or upload, but you do not want to send it to a processing service. Compress PDF renders each page in this browser tab, rebuilds a JPEG-image PDF, compares the bytes, and downloads the smaller result when there is a real saving. It is a practical raster conversion, not a promise that every PDF will shrink.',
    figures: [],
    lead: [
      'Start with the file you actually need to send and keep the original until you have opened the result. The tool accepts one PDF at a time.',
      'Begin with Medium. Use Low when byte size matters more than page detail, or High when a scan needs more visual detail and you can accept a larger result.',
      'If the output is not smaller, the tool keeps the original bytes instead of forcing a worse or larger re-encode.'
    ],
    whenToUse: [
      'Use this when an email or upload form has a PDF size limit and the PDF contains scans or photos.',
      'Do not use it when selectable text, links, form fields, vector diagrams, or searchable text must remain intact. Use the original in that case.',
      'For a large document, try fewer than 50 pages for a more comfortable browser-tab run.'
    ],
    steps: [
      {
        title: 'Open Compress PDF',
        body: 'Open the tool at /compress-pdf. Until you choose a file, no PDF bytes are processed.'
      },
      {
        title: 'Drop one PDF',
        body: 'Add one PDF from your device. The browser reads it as an ArrayBuffer for this tab. Encrypted or damaged PDFs may fail.'
      },
      {
        title: 'Choose a level',
        body: 'Medium is the balanced starting point. Low uses a smaller render and lower JPEG quality. High keeps more rendered detail but may produce a larger file.'
      },
      {
        title: 'Wait for page rendering',
        body: 'The tool renders pages one at a time and shows progress. Large page counts can be slow or memory-heavy, so keep this tab open.'
      },
      {
        title: 'Compare and download',
        body: 'Check Original and Output sizes. If output is smaller, download the compressed PDF. If it is not, the tool reports Already optimized and downloads the original bytes.'
      },
      {
        title: 'Open the download',
        body: 'Spot-check the first, middle, and last pages. Confirm that the visual detail is acceptable and remember that v1 output is rasterized.'
      }
    ],
    sections: [
      {
        heading: 'Why a PDF may not shrink',
        paragraphs: [
          'A PDF can already contain compressed JPEG scans, efficient fonts, or mostly text objects. Re-rendering those pages can save little, save nothing, or add bytes. That is why this tool compares the rebuilt file with the original and keeps the original when output is not smaller.',
          'Savings depend on page content, dimensions, and the selected preset. There is no honest fixed percentage to promise.'
        ]
      },
      {
        heading: 'Rasterization is the trade-off',
        paragraphs: [
          'The v1 method renders each page to a canvas and embeds a JPEG image in a new PDF. The page should look similar, but text is no longer guaranteed to be selectable or searchable. Links, form fields, vector shapes, accessibility structure, and some metadata are not preserved as editable PDF objects.',
          'If you need a searchable contract, an accessible report, a fillable form, or crisp vector artwork, keep and send the original instead.'
        ]
      },
      {
        heading: 'Troubleshooting',
        paragraphs: [
          'Encrypted PDFs may fail because the browser renderer cannot read the document without the required password or permissions. A damaged PDF can fail for the same reason. Try opening and re-saving it in a desktop PDF reader, then try again.',
          'If a large document stalls, close other heavy tabs and try a smaller page range with a separate tool. The v1 compressor is intentionally one PDF at a time and does not batch folders.'
        ]
      }
    ],
    cannot: [
      'Does not guarantee a smaller file.',
      'Rasterizes pages; text may not remain selectable or searchable.',
      'Does not OCR, preserve fillable forms, or guarantee links and accessibility metadata.',
      'Encrypted PDFs may fail.',
      'Not designed for large batch folders.'
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
  } as const;
