import type { GuideArticle } from './guides';

const PRIVACY =
  'The PDF is read and processed in this browser tab; FileTools Kit does not upload it to a processing server. Ordinary page hosting, browser, and third-party asset behavior is covered by the site privacy and cookie policies. This is not an air-gap or compliance certification.';

export const PDF_TOOL_GUIDES: GuideArticle[] = [
  {
    slug: 'pdf-to-jpg-in-browser',
    title: 'How to turn PDF pages into JPG or PNG images',
    summary: 'Render PDF pages as JPG or PNG in your browser, choose a resolution, and download one image or a ZIP. The images do not keep selectable text.',
    toolRoute: '/pdf-to-jpg',
    toolLabel: 'Open PDF to JPG',
    updated: '25 September 2026',
    wordCount: 640,
    intro:
      'Sometimes a form, chat app, or slide deck accepts pictures but not PDFs. PDF to JPG draws each page you pick with PDF.js in this browser tab, saves it as a JPG or PNG, and downloads the result. A single page arrives as one image; several pages arrive as a ZIP of numbered files.',
    figures: [],
    lead: [
      'Pick the format for the job: JPG for scans and photos, PNG for crisp text and diagrams.',
      'Pick a resolution that matches where the image will be seen. Screen is enough for chat and web pages; Print is for documents you will print.',
      'Remember that an image is a picture of the page. Keep the PDF if anyone needs to copy the text.'
    ],
    whenToUse: [
      'Use it to post one page of a PDF where only images are accepted, or to drop pages into slides.',
      'Do not use it to extract editable text. Rendering turns text into pixels.',
      'For long documents, export the pages you actually need rather than all of them at Print resolution.'
    ],
    steps: [
      { title: 'Open PDF to JPG', body: 'Open the tool at /pdf-to-jpg. Nothing is processed until you choose a file.' },
      { title: 'Choose a PDF', body: 'Pick one PDF. The page count appears once it has been read. Password-protected PDFs need the password removed first.' },
      { title: 'Set format and resolution', body: 'Choose JPG or PNG, then Screen (108 DPI), Standard (144 DPI), or Print (216 DPI).' },
      { title: 'List pages', body: 'All pages are filled in. Edit the range, for example 2-4,7, to export only those pages.' },
      { title: 'Export and check', body: 'Press Export. Open an image or the ZIP and check that the pages look right before you share them.' }
    ],
    sections: [
      {
        heading: 'Choosing a resolution',
        paragraphs: [
          'PDF pages are measured in points, 72 to the inch. Screen renders at 1.5 times that, Standard at 2 times, and Print at 3 times. Higher resolution means sharper text and much bigger files, roughly four times the pixels each time the scale doubles.',
          'If an image is only going into a chat or a web page, Screen or Standard is usually plenty.'
        ]
      },
      {
        heading: 'What the ZIP contains',
        paragraphs: [
          'Files are named after the PDF with the page number padded, such as report-page-03.jpg, so they sort in page order. The images are stored in the ZIP without extra compression because JPG and PNG are already compressed.'
        ]
      }
    ],
    cannot: [
      'Does not keep selectable text, links, or form fields.',
      'Does not run OCR.',
      'Does not open password-protected PDFs.',
      'Very large page counts at Print resolution can exhaust memory on phones.'
    ],
    privacy: [PRIVACY],
    notes: ['Author: Souren Das, FileTools Kit, Bengaluru.', 'To go the other way, use JPG to PDF.'],
    relatedGuides: [
      { slug: 'compress-images-in-browser', label: 'Compress images for email or a website' },
      { slug: 'what-stays-in-the-tab', label: 'What stays in the tab' }
    ]
  },
  {
    slug: 'organize-pdf-pages-in-browser',
    title: 'How to reorder, rotate, and delete PDF pages',
    summary: 'Use page thumbnails to fix page order, turn sideways scans upright, remove blank pages, and export a new PDF in your browser.',
    toolRoute: '/organize-pdf',
    toolLabel: 'Open Organize PDF',
    updated: '25 September 2026',
    wordCount: 620,
    intro:
      'Scanners and phone apps often produce PDFs with pages out of order, upside down, or padded with blank sheets. Organize PDF shows every page as a thumbnail drawn with PDF.js in this tab, lets you rearrange, rotate, and delete pages, and then copies the pages into a new PDF with pdf-lib. Your original file is left as it was.',
    figures: [],
    lead: [
      'Work on one PDF at a time. If you need pages from several files, merge them first and then organize the result.',
      'Thumbnails appear one by one; you can start reordering while the rest are still drawing.',
      'Nothing is saved until you export, so you can experiment freely.'
    ],
    whenToUse: [
      'Use it to fix a scan order, rotate sideways pages, or drop blank and duplicate pages before sending a file.',
      'Do not use it to edit text on a page. Pages are moved and turned, not changed.',
      'For extracting a page range quickly, Split PDF is faster than deleting pages one by one.'
    ],
    steps: [
      { title: 'Open Organize PDF', body: 'Open the tool at /organize-pdf and choose one PDF.' },
      { title: 'Reorder pages', body: 'Drag a card onto the position you want, or use the left and right arrows on each card. The arrows work with a keyboard and on touch screens.' },
      { title: 'Rotate pages', body: 'Use the rotate icon on a card, or select several cards and press Rotate selected. Each press turns the page 90 degrees clockwise.' },
      { title: 'Delete pages', body: 'Use the trash icon, or select cards and press Delete selected. At least one page must remain.' },
      { title: 'Export', body: 'Press Export organized PDF. Check the new file before you delete or replace anything.' }
    ],
    sections: [
      {
        heading: 'Reading the page cards',
        paragraphs: [
          'Each card shows its position in the new file first, then the original page number in brackets, such as 3 (p.7). That makes it easy to see where a page came from after several moves.'
        ]
      },
      {
        heading: 'What is kept',
        paragraphs: [
          'Pages are copied, not re-rendered, so text stays selectable and quality does not change. Document-level extras such as bookmarks may not carry over to the new file.'
        ]
      }
    ],
    cannot: [
      'Does not edit page content or text.',
      'Does not combine several PDFs; use Merge PDF first.',
      'Does not open password-protected PDFs.',
      'May be slow on very large documents.'
    ],
    privacy: [PRIVACY],
    notes: ['Author: Souren Das, FileTools Kit, Bengaluru.'],
    relatedGuides: [
      { slug: 'merge-pdf-in-browser', label: 'Merge PDFs in the browser' },
      { slug: 'split-pdf-pages', label: 'Extract selected PDF pages' }
    ]
  },
  {
    slug: 'password-protect-pdf-in-browser',
    title: 'How to password protect a PDF in your browser',
    summary: 'Encrypt a PDF with AES-256 in this tab so it opens only with your password, and learn what a PDF password does and does not protect.',
    toolRoute: '/password-protect-pdf',
    toolLabel: 'Open Password protect PDF',
    updated: '25 September 2026',
    wordCount: 700,
    intro:
      'A password on a PDF means the file cannot be opened without it. Password protect PDF encrypts the file with AES-256 using the Web Crypto API in this browser tab. The file and the password stay on your device; FileTools Kit never receives either.',
    figures: [],
    lead: [
      'Choose a long passphrase, not a short word. AES-256 is strong, so the password is the part an attacker would guess.',
      'Send the password through a different channel than the file, for example by phone or a separate message.',
      'Keep the unprotected original. There is no way to recover a forgotten password.'
    ],
    whenToUse: [
      'Use it before emailing statements, contracts, payslips, or ID scans.',
      'Do not rely on it to stop someone who already has the password from sharing the contents.',
      'It is not a digital signature and does not prove who sent the file.'
    ],
    steps: [
      { title: 'Open the tool', body: 'Open /password-protect-pdf and choose one PDF. A file that already has a password is refused.' },
      { title: 'Type a password twice', body: 'Use at least 6 characters; longer is much better. Use Show to check what you typed.' },
      { title: 'Protect', body: 'Press Protect PDF. The encrypted copy downloads with -protected in its name.' },
      { title: 'Test the file', body: 'Open the new PDF. Your reader should ask for the password before showing any page.' }
    ],
    sections: [
      {
        heading: 'What AES-256 protects',
        paragraphs: [
          'The page content is encrypted, so someone who gets the file without the password cannot read it. Modern PDF readers, including current Adobe Acrobat Reader and the viewers in Chrome, Edge, and Firefox, open AES-256 files once the password is entered. Very old readers may not.',
          'This tool sets the same password for opening the file and as the owner password, and does not offer separate print or copy permissions. Permission flags are easy to bypass anyway once a file is open.'
        ]
      },
      {
        heading: 'Choosing a strong password',
        paragraphs: [
          'Four or five random words are easier to remember and harder to guess than a short word with symbols. Do not reuse a password from an email or bank account.'
        ]
      }
    ],
    cannot: [
      'Cannot recover a forgotten password.',
      'Does not remove passwords from PDFs.',
      'Does not add a digital signature or certificate.',
      'Does not stop people who know the password from copying or sharing the content.'
    ],
    privacy: [
      'The PDF and the password are processed in this browser tab; FileTools Kit does not upload either to a server. Ordinary page hosting, browser, and third-party asset behavior is covered by the site privacy and cookie policies. This is not an air-gap or compliance certification.'
    ],
    notes: ['Author: Souren Das, FileTools Kit, Bengaluru.'],
    relatedGuides: [{ slug: 'what-stays-in-the-tab', label: 'What stays in the tab' }]
  }
];
