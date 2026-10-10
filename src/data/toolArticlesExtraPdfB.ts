import type { ToolArticleExtra } from './toolArticlesExtra';

export const EXTRA_PDF_B: Record<string, ToolArticleExtra> = {
  'page-numbers': {
    sections: [
      {
        heading: 'How numbering is counted',
        paragraphs: [
          "If you pick several PDFs at once, they are joined into one file, page-numbers.pdf, and numbered as one continuous run in the order the file picker returns them. The first page gets the Start at number and each page after it adds one. In the 1 / N and Page 1 of N formats, N is the last number printed, not the page count. Start at 5 on a 10-page file and the pages read Page 5 of 14 through Page 14 of 14.",
          "Every page gets a number. The tool cannot skip a cover page or switch to roman numerals for front matter. The way around that is to split the pages you want numbered into their own file, number that file, and merge it back behind the unnumbered pages.",
        ],
      },
      {
        heading: 'Where the number lands',
        paragraphs: [
          "Bottom centre and Top centre put the label in the middle of the page edge. Bottom right aligns it to the right margin. The label sits 18 points from the edge in 10-point Helvetica, dark grey. If a page already has a footer there, the two will overlap, so check a page with a full footer before you send.",
        ],
      },
    ],
    tips: [
      "Number last. Merge, split, and reorder first, because numbers drawn on a page move with it.",
      "For a thesis whose chapters start at page 1 after the front matter, set Start at to 1 on the chapter file and merge the front matter in front afterwards.",
      "Page 1 of N reads well on a printed packet. A plain number is quieter for a report.",
    ],
    faq: [
      { q: "Can I change the font or size?", a: "No. The label is fixed at 10-point Helvetica so it stays small and readable on A4 and Letter pages." },
      { q: "Why does the total look wrong?", a: "N is the last number printed. If Start at is not 1, N is Start at plus the page count minus one." },
    ],
    guides: [
      { slug: 'page-numbers-for-thesis', label: 'Number a thesis or project report' },
      { slug: 'page-numbers-pdf', label: 'Add page numbers to a PDF' },
    ],
  },
  'pdf-to-jpg': {
    sections: [
      {
        heading: 'Choosing format and resolution',
        paragraphs: [
          "JPG is smaller and fine for photos and most scans. PNG keeps sharp edges on text and line drawings and makes larger files. Resolution sets how many pixels each page gets: Screen is 108 DPI, Standard is 144 DPI, and Print is 216 DPI. An A4 page at Standard comes out about 1190 by 1684 pixels. Pick Screen when the images only need to be read on a phone or uploaded to a form with a size cap.",
          "JPG pages are saved at 90 percent quality. One page downloads as a single image. Several pages download as a ZIP named after your file, with each image named by page number so they sort in order.",
        ],
      },
      {
        heading: 'Large documents',
        paragraphs: [
          "Every page is drawn on a canvas in memory before it is saved. Above 50 pages the page warns you, because Print resolution on a long document can use a lot of memory, especially on a phone. Export in ranges such as 1-20 and 21-40 if the tab slows down.",
        ],
      },
    ],
    tips: [
      "To shrink a scanned PDF for a portal, export at Screen as JPG, compress the images, and rebuild the PDF with JPG to PDF.",
      "Password-protected PDFs are detected and refused with a clear message. Remove the password in your reader first.",
      "Images of pages lose selectable text and links. Keep the PDF if the reader needs to search it.",
    ],
    faq: [
      { q: "Can I export just one page?", a: "Yes. Type that page number in the Pages box and you get a single image instead of a ZIP." },
      { q: "Is the text recognised (OCR)?", a: "No. The output is a picture of each page. This site does not do OCR." },
    ],
    guides: [
      { slug: 'reduce-pdf-size-for-upload-portals', label: 'Get a PDF under 1 MB or 200 KB' },
      { slug: 'svg-vs-png', label: 'SVG vs PNG: which image format to use' },
    ],
  },
  'organize-pdf': {
    sections: [
      {
        heading: 'Working with the thumbnails',
        paragraphs: [
          "After you choose a PDF, every page is drawn as a thumbnail in output order. Each thumbnail has buttons to move the page earlier or later, rotate it by 90 degrees, or delete it. Tap thumbnails to select several, then use Rotate selected or Delete selected to change them together. Select all and Clear selection help on long files. The counter shows how many pages are in the list and how many are selected.",
          "Export organized PDF builds a new file named after the original with -organized added. Pages are copied, not re-rendered, so text stays selectable. Your original file is never changed.",
        ],
      },
      {
        heading: 'Typical jobs',
        paragraphs: [
          "Drop the blank backs from a double-sided scan. Fix a page that the scanner fed upside down. Move an annexure to the end. Put a signed page back where it belongs after printing and scanning it separately. For joining several files, merge first, then organize the merged file.",
        ],
      },
    ],
    tips: [
      "At least one page must remain, so Delete selected is disabled when every page is selected.",
      "Rotation adds to any rotation the page already had. Rotate four times to return to the start.",
      "On a phone, long PDFs take a while to draw. Wait for the status line to finish before reordering.",
    ],
    faq: [
      { q: "Can I organize a password-protected PDF?", a: "No. Encrypted PDFs cannot be reorganized here. Save an unprotected copy in your reader first." },
      { q: "Can I add pages from another file?", a: "Merge the two files first with Merge PDF, then open the merged file here to place the pages." },
    ],
    guides: [
      { slug: 'merge-scanned-documents', label: 'Merge scanned documents into one PDF' },
      { slug: 'organize-pdf-pages-in-browser', label: 'Reorder, rotate, and delete PDF pages' },
    ],
  },
  'password-protect-pdf': {
    sections: [
      {
        heading: 'What the password does',
        paragraphs: [
          "The file is encrypted with AES-256, the strongest option the PDF format offers. Without the password, a reader cannot show the pages. The same password is set as both the open password and the owner password, so there are no separate print or copy permissions to configure. Anyone who has the password can open, print, and copy the document.",
          "Encryption runs in this tab with the browser's Web Crypto. The PDF and the password are not sent to FileTools Kit. The download is named after the original with -protected added, and the original stays unprotected on your disk.",
        ],
      },
      {
        heading: 'Choosing and sharing the password',
        paragraphs: [
          "The minimum is six characters, but longer is much stronger. A short phrase of four unrelated words is easier to say on the phone and harder to guess than a short code. Send the password by a different route from the file: if the PDF goes by email, give the password by phone or a messaging app. Sending both in the same email protects very little.",
        ],
      },
    ],
    tips: [
      "Open the protected file in a second reader, such as your phone's PDF viewer, before you send it.",
      "A PDF that already has a password is refused. Remove the old password in your reader, then protect it again.",
      "Write the password down somewhere safe. There is no recovery from FileTools Kit or anyone else.",
    ],
    faq: [
      { q: "Can I remove a password here?", a: "No. This page only adds one. To remove a password you know, open the file in a reader and save or print an unprotected copy." },
      { q: "Will an old PDF reader open it?", a: "Very old readers may not support AES-256. Current Acrobat Reader and the viewers built into Chrome, Edge, Firefox, and phones do." },
    ],
    guides: [
      { slug: 'password-protect-pdf-in-browser', label: 'Password-protect a PDF before emailing it' },
      { slug: 'watermark-versus-password', label: 'Watermark, password, and redaction are different' },
    ],
  },
};
