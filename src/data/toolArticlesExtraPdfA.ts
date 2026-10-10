import type { ToolArticleExtra } from './toolArticlesExtra';

export const EXTRA_PDF_A: Record<string, ToolArticleExtra> = {
  'pdf-suite': {
    sections: [
      {
        heading: 'What each part of the page does',
        paragraphs: [
          "The file list at the top holds every PDF you add. Each card shows the first page, the page count, and a Rotate +90° button. Merge PDFs joins every card into merged.pdf in list order. The Split / Range tab copies a page range out of the first file into split-pages.pdf.",
          "The Watermark tab draws your text diagonally across every page in orange Helvetica Bold. You choose the words, the opacity (5 to 80 percent), and the font size (18 to 64 points). The Metadata tab sets the Title, Author, Subject, and Keywords fields that a PDF reader shows under document properties. Export annotated PDF applies rotation, watermark, and metadata together and joins every loaded file into annotated.pdf.",
        ],
      },
      {
        heading: 'When to use PDF Suite instead of a single tool',
        paragraphs: [
          "Use PDF Suite when one job needs more than one step: rotate two sideways scans, stamp DRAFT on every page, and send one file. If you only need to join files, Merge PDF opens the same page with less to read. If you need to move single pages around, Organize PDF shows every page as a thumbnail, which PDF Suite does not.",
        ],
      },
    ],
    tips: [
      "Press Load Sample PDF once to see what each button produces before you use a real document.",
      "Leave the watermark text empty if you only want rotation or metadata in the annotated export.",
      "Metadata is visible to anyone who opens document properties. Do not put private notes in Keywords.",
      "Keep the originals. Every export is a new file, and nothing on this page edits the file on your disk.",
    ],
    faq: [
      { q: "Does the watermark stop people copying the text?", a: "No. It is drawn on top of the page. The original text underneath can still be selected and copied. For that you need a password, and even then a reader who opens the file can copy it." },
      { q: "Why does annotated.pdf contain all my files?", a: "Export annotated PDF works on everything in the list, the same way merge does. Remove the files you do not want before you export." },
    ],
    guides: [
      { slug: 'watermark-versus-password', label: 'Watermark, password, and redaction are different' },
      { slug: 'merge-scanned-documents', label: 'Merge scanned documents into one PDF' },
    ],
  },
  'merge-pdf': {
    sections: [
      {
        heading: 'How the merge works',
        paragraphs: [
          "Merge copies every page of every file into a new PDF called merged.pdf. Pages are not re-rendered, so text stays selectable and images keep the quality they had. Each file card shows its first page so you can confirm you picked the right document. If you rotated a card, that rotation is added to its pages in the output.",
          "Files that are not PDFs are skipped when you add them. A file that is encrypted, damaged, or only pretends to be a PDF usually fails at the add step with a message, so you find out before you press merge.",
        ],
      },
      {
        heading: 'Getting the order right',
        paragraphs: [
          "There is no drag-to-reorder in the list. Output order is the order the cards appear. The simplest way to control it is to add files one at a time in the order you want. If a file lands in the wrong place, remove it and add it again so it moves to the end. For page-level ordering inside one document, merge first and then fix pages in Organize PDF.",
        ],
      },
    ],
    tips: [
      "For a job application, a common order is cover letter, resume, then certificates, newest first. Follow the employer's instructions if they give one.",
      "If the merged file is too big for a portal, read the size guide before you try another site.",
      "Rename merged.pdf to something the reader understands, such as FirstName-LastName-Application.pdf.",
    ],
    faq: [
      { q: "Can I merge scanned images and PDFs together?", a: "Not directly on this page. Turn the images into a PDF with JPG to PDF first, then add that PDF here with the others." },
      { q: "Will links and bookmarks survive?", a: "Page content, including links drawn on the page, is copied. Document-level extras such as the bookmark outline may not carry over." },
    ],
    guides: [
      { slug: 'merge-scanned-documents', label: 'Merge scanned documents into one PDF' },
      { slug: 'reduce-pdf-size-for-upload-portals', label: 'Get a PDF under 1 MB or 200 KB' },
    ],
  },
  'split-pdf': {
    sections: [
      {
        heading: 'How ranges are read',
        paragraphs: [
          "Type page numbers separated by commas, and use a hyphen for a run. 1-3,5 keeps pages 1, 2, 3, and 5. A reversed run such as 5-2 is read as 2-5. Numbers past the end of the file are ignored, and a page typed twice appears once. Page numbers count from the first page of the file, not from any number printed in the footer.",
          "The output is split-pages.pdf, built from the first file in the list. Pages are copied as they are, so text stays selectable. The status line tells you how many pages were copied and from which file.",
        ],
      },
      {
        heading: 'Splitting one file into several parts',
        paragraphs: [
          "The page makes one output file per click. To cut a 30-page packet into three documents, run 1-10, then 11-20, then 21-30, and rename each download before the next one so the browser does not number them for you. If you need every page as its own file, repeat with single numbers, or use PDF to JPG if images are acceptable.",
        ],
      },
    ],
    tips: [
      "Open the source in a reader first and note the page numbers the reader shows. Those are the numbers this tool uses.",
      "If an office asked for only the signature page, split that page out rather than sending the whole contract.",
      "To change page order, not just remove pages, use Organize PDF.",
    ],
    faq: [
      { q: "Can I split a password-protected PDF?", a: "Usually not. Encrypted files fail to load. Open the file in a reader that knows the password, save an unprotected copy, and split that." },
      { q: "Does split make the file smaller?", a: "Usually, because fewer pages are kept. Shared resources such as embedded fonts may still be included, so size does not always drop in proportion." },
    ],
    guides: [
      { slug: 'page-numbers-for-thesis', label: 'Number a thesis without numbering the title page' },
      { slug: 'organize-pdf-pages-in-browser', label: 'Reorder, rotate, and delete PDF pages' },
    ],
  },
  'compress-pdf': {
    sections: [
      {
        heading: 'What “light rewrite” means',
        paragraphs: [
          "Compress PDF copies every page into a new document and saves it with object streams, a PDF feature that packs the file's internal structure more tightly. Files exported by some office suites or edited many times carry a lot of unused structure, and those can shrink noticeably. The status line shows the size before and after so you can judge.",
          "The tool does not touch the images inside the PDF. A scanned document is mostly images, so it often shrinks very little or not at all. That is the honest limit of doing this in a browser tab with pdf-lib. Server tools that promise large percentages usually get them by re-encoding images at lower quality.",
        ],
      },
      {
        heading: 'What to do when a scan will not shrink',
        paragraphs: [
          "For a scan that must fit a portal limit, the route that works is to rebuild the PDF from smaller images: export the pages with PDF to JPG at Screen resolution, shrink them in Image Optimizer, and join them again with JPG to PDF. The result is image-only, so text is no longer selectable, which is usually acceptable for a scanned form.",
        ],
      },
    ],
    tips: [
      "Run compress after merging, not before. One rewrite of the final file is enough.",
      "If the output is larger than the input, keep the original. The tool still downloads the result so you can compare.",
      "Check that form fields and signatures still look right after a rewrite. Digital signatures do not survive it.",
    ],
    faq: [
      { q: "Can it get my PDF under 200 KB?", a: "Only if the file was mostly wasted structure. For scans, use the image route described above. The portal size guide walks through it." },
      { q: "Is quality reduced?", a: "No. Text, fonts, vectors, and images are copied as they are. That is also why scans do not shrink." },
    ],
    guides: [
      { slug: 'reduce-pdf-size-for-upload-portals', label: 'Get a PDF under 1 MB or 200 KB for a portal' },
      { slug: 'when-browser-pdf-tools-fail', label: 'When browser PDF tools fail' },
    ],
  },
  'jpg-to-pdf': {
    sections: [
      {
        heading: 'How the PDF is built',
        paragraphs: [
          "Each JPEG or PNG becomes one page, and the page is exactly the size of the image: one pixel becomes one point, which is 1/72 of an inch. A 3000 by 4000 pixel phone photo therefore makes a page about 42 by 56 inches. Screens scale it to fit, so it looks normal, but it can print oddly. Resize photos first if the PDF will be printed.",
          "JPEG files are placed into the PDF without being re-encoded, so the PDF is roughly the size of the photos added together. PNG files are stored losslessly, which makes photos saved as PNG very large. The download is called images.pdf.",
        ],
      },
      {
        heading: 'Page order',
        paragraphs: [
          "Pages follow the order the file picker returns, which on most systems is the order you selected or alphabetical order. Name files 01, 02, 03 before you pick them if order matters. You can also fix order afterwards in Organize PDF.",
        ],
      },
    ],
    tips: [
      "Shrink phone photos in Image Optimizer (scale around 50 percent, JPEG quality around 70 percent) before you build the PDF. It is the single biggest size saving.",
      "HEIC photos from an iPhone are not accepted here. Set the camera to Most Compatible, or export as JPEG first.",
      "Crop the edges of document photos before converting so the table or floor is not on every page.",
    ],
    faq: [
      { q: "Why do I see “Use JPEG or PNG only”?", a: "One of the files could not be read as JPEG or PNG. WebP, HEIC, or a file renamed to .jpg without being converted will fail. Convert it in File Converter first." },
      { q: "Can I make A4 pages?", a: "Not on this page. Pages match the image size. Most portals accept that, but if A4 is required, ask the office whether a scan at A4 size is acceptable instead." },
    ],
    guides: [
      { slug: 'jpg-to-pdf-for-online-forms', label: 'Turn phone photos of documents into a PDF for a form' },
      { slug: 'reduce-pdf-size-for-upload-portals', label: 'Get a PDF under 1 MB or 200 KB' },
    ],
  },
};
