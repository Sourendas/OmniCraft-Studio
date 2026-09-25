import type { ToolArticle } from './toolArticles';
import { MORE_PDF_TOOL_ARTICLES } from './toolArticlesPdfMore';

export type ToolArticleWithGuides = ToolArticle & {
  guides?: { slug: string; label: string }[];
};

export const PDF_TOOL_ARTICLES: Record<string, ToolArticleWithGuides> = {
  ...MORE_PDF_TOOL_ARTICLES,
  'merge-pdf': {
    slug: 'merge-pdf',
    title: 'Merge PDF — combine files into one PDF in this tab',
    lede:
      'This page opens PDF Suite for merging. You add two or more PDFs, rotate any sideways ones, and press Merge PDFs. pdf-lib copies every page into one new file in this browser tab and downloads it as merged.pdf. FileTools Kit does not run an upload API for these files.',
    forWho: [
      'Applicants combining a cover letter, resume, and certificates into one attachment.',
      'Anyone sending a single packet instead of several separate PDFs.',
    ],
    notFor: [
      'Password-protected or encrypted PDFs. Those often fail to merge in the browser.',
      'People who need bookmarks, a table of contents, or fillable forms preserved exactly.',
    ],
    steps: [
      { title: 'Add the PDFs in order', body: 'Drop the files or click to browse. Pages are merged in the order the files appear in the list, so add them in the order you want.' },
      { title: 'Fix the list', body: 'Use the trash icon to remove a file. To change the order, remove it and add it again. Rotate turns every page of that file by 90 degrees per click.' },
      { title: 'Merge', body: 'Press Merge PDFs. The new file downloads as merged.pdf.' },
      { title: 'Check the result', body: 'Open the download and check the first, a middle, and the last page before you send it.' },
    ],
    limits: [
      'Preview tiles are placeholders, not rendered pages.',
      'There is no drag-to-reorder. Order comes from the list.',
      'Pages keep their source sizes, so mixed A4 and Letter files stay mixed.',
      'Document-level extras such as bookmarks may not carry over.',
    ],
    faq: [
      { q: 'Are my PDFs uploaded?', a: 'No. They are read and merged in this tab. The site host still serves the page itself.' },
      { q: 'How many files can I merge?', a: 'There is no fixed limit. Large packs can run out of memory on a phone, so merge in smaller batches there.' },
      { q: 'Does merging reduce quality?', a: 'No. Pages are copied as they are, not re-rendered.' },
    ],
    guides: [
      { slug: 'merge-pdf-in-browser', label: 'How to merge 20 PDFs in your browser' },
      { slug: 'what-stays-in-the-tab', label: 'What stays in the tab' },
    ],
  },
  'split-pdf': {
    slug: 'split-pdf',
    title: 'Split PDF — extract a page range in this tab',
    lede:
      'This page opens PDF Suite for splitting. You load a PDF, open the Split / Range tab, type the pages you want, and press Export split PDF. pdf-lib copies those pages into one new file named split-pages.pdf, in this browser tab.',
    forWho: [
      'Anyone who needs pages 2 to 4 of a longer document.',
      'People trimming a scan down to the pages a form actually asks for.',
    ],
    notFor: [
      'Bursting a PDF into one file per page. Each run exports one file with the pages you listed.',
      'Encrypted PDFs, which often fail.',
    ],
    steps: [
      { title: 'Load the PDF', body: 'Drop the file or click to browse. Split always uses the first file in the list, so remove any others first.' },
      { title: 'Open Split / Range', body: 'In the PDF tools panel, choose the Split / Range tab.' },
      { title: 'Type the pages', body: 'Use 1-based numbers separated by commas, for example 1-3,5. Pages outside the document are ignored.' },
      { title: 'Export', body: 'Press Export split PDF. The file downloads as split-pages.pdf.' },
    ],
    limits: [
      'Pages are output in ascending order and duplicates are removed, whatever order you type them in.',
      'Only the first file in the list is split.',
      'The original PDF is not changed on disk.',
    ],
    faq: [
      { q: 'Is my PDF uploaded?', a: 'No. The pages are copied in this tab with pdf-lib.' },
      { q: 'Can I get every page as its own file?', a: 'Not in one step. Run the split once per page range you need.' },
      { q: 'Why did I get fewer pages than I typed?', a: 'Numbers above the page count, or text that is not a number, are skipped.' },
    ],
    guides: [
      { slug: 'split-pdf-pages', label: 'How to extract pages 2–4 from a PDF' },
      { slug: 'what-stays-in-the-tab', label: 'What stays in the tab' },
    ],
  },
  'jpg-to-pdf': {
    slug: 'jpg-to-pdf',
    title: 'JPG to PDF — turn photos into a PDF in this tab',
    lede:
      'Choose one or more JPEG or PNG images. Each image becomes one PDF page at its own pixel size, built with pdf-lib in this browser tab, and the result downloads as images.pdf. The images are not uploaded to FileTools Kit.',
    forWho: [
      'Anyone turning phone photos of receipts or documents into one PDF.',
      'People who need a PDF from a few screenshots.',
    ],
    notFor: [
      'WebP, HEIC, or GIF files. Only JPEG and PNG are accepted. Convert other formats first.',
      'Layouts that need A4 pages, margins, or several images per page.',
    ],
    steps: [
      { title: 'Choose images', body: 'Press Choose JPEG or PNG files and select one or more images.' },
      { title: 'Wait for the build', body: 'Each image is embedded as a full page. The status line confirms how many pages were built.' },
      { title: 'Download and check', body: 'The file downloads as images.pdf. Open it and check the page order and orientation.' },
    ],
    limits: [
      'Page size equals the image size, so large photos make large pages and large files.',
      'Pages follow the order the file picker returns. Name files 01, 02, 03 if order matters.',
      'Phone photos that rely on rotation metadata may appear sideways.',
    ],
    faq: [
      { q: 'Are my photos uploaded?', a: 'No. They are embedded into the PDF in this tab.' },
      { q: 'Why is the PDF so big?', a: 'Images are embedded as they are. Shrink them first with Image Optimizer if size matters.' },
      { q: 'What if a file is not JPEG or PNG?', a: 'The build stops with a message. Convert it with File Converter and try again.' },
    ],
    guides: [
      { slug: 'compress-images-in-browser', label: 'How to compress images for email or a website' },
      { slug: 'convert-images-png-jpg-webp', label: 'How to convert JPG, PNG, and WebP' },
    ],
  },
  'page-numbers': {
    slug: 'page-numbers',
    title: 'Add page numbers — number PDF pages in this tab',
    lede:
      'Pick a starting number, a position, and a format, then choose one or more PDFs. pdf-lib draws the number on every page in this browser tab and downloads the result as page-numbers.pdf. If you add several files, they are combined into one numbered PDF.',
    forWho: [
      'Anyone who needs simple page numbers on a report or application packet.',
      'People numbering a merged packet that continues from an earlier section.',
    ],
    notFor: [
      'Roman numerals, custom fonts, or free placement anywhere on the page.',
      'Encrypted PDFs, which often fail.',
    ],
    steps: [
      { title: 'Set Start at', body: 'Type the first number to print. The default is 1.' },
      { title: 'Pick position and format', body: 'Choose bottom centre, bottom right, or top centre, and a format of 1, 1 / N, or Page 1 of N. N is the last number printed.' },
      { title: 'Choose PDF files', body: 'Press Choose PDF files. With several files, pages are combined in the order the file picker returns and numbering continues across them.' },
      { title: 'Download and check', body: 'The file downloads as page-numbers.pdf. Check that the numbers do not cover existing footer text.' },
    ],
    limits: [
      'Numbers are 10 pt Helvetica in dark grey, 18 pt from the page edge. Size and colour are fixed.',
      'A number can overlap content that already sits at the bottom of a page.',
      'Rotated pages may show the number in an unexpected spot.',
    ],
    faq: [
      { q: 'Are my PDFs uploaded?', a: 'No. Numbers are drawn in this tab.' },
      { q: 'Can I skip the cover page?', a: 'Not here. Split off the cover in PDF Suite, number the rest, then merge them again.' },
      { q: 'Can I number only some pages?', a: 'Not in this version. Every page of the files you choose gets a number.' },
      { q: 'Does it change my original file?', a: 'No. You download a new PDF.' },
    ],
    guides: [
      { slug: 'merge-pdf-in-browser', label: 'How to merge 20 PDFs in your browser' },
      { slug: 'split-pdf-pages', label: 'How to extract pages 2–4 from a PDF' },
    ],
  },
  'compress-pdf': {
    slug: 'compress-pdf',
    title: 'Compress PDF — a light re-save in this tab',
    lede:
      'Choose one PDF. pdf-lib copies every page into a new file and saves it with object streams, which can trim wasted structure. The result downloads as compressed.pdf and the status line shows the size before and after. Nothing is uploaded to FileTools Kit.',
    forWho: [
      'People whose PDF was exported with a bloated structure and is just over an upload limit.',
      'Anyone who needs text in the result to stay selectable and searchable.',
    ],
    notFor: [
      'Scanned or photo-heavy PDFs. Images are copied as they are, so these may barely shrink.',
      'Encrypted PDFs, which often fail.',
    ],
    steps: [
      { title: 'Choose a PDF', body: 'Press Choose a PDF to compress and select one file.' },
      { title: 'Let it re-save', body: 'Pages are copied into a new document in this tab. Large files take longer.' },
      { title: 'Compare the sizes', body: 'The status line shows the original and new size in KB. The new file downloads as compressed.pdf.' },
      { title: 'Keep the smaller file', body: 'If the new file is not smaller, send the original instead.' },
    ],
    limits: [
      'Text, fonts, and vector shapes stay as they are, so text remains selectable.',
      'Embedded images are not recompressed or downsampled.',
      'The download happens even when the output is not smaller.',
      'Bookmarks and other document-level extras may not carry over.',
    ],
    faq: [
      { q: 'Is my PDF uploaded?', a: 'No. It is re-saved in this tab with pdf-lib.' },
      { q: 'Why did my scan barely shrink?', a: 'Most of its bytes are images, and this light re-save copies images unchanged.' },
      { q: 'Will the text still be selectable?', a: 'Yes. Pages are copied, not turned into pictures.' },
    ],
    guides: [
      { slug: 'compress-pdf-in-browser', label: 'How to compress a PDF in your browser' },
      { slug: 'compress-images-in-browser', label: 'How to compress images for email or a website' },
    ],
  },
};
