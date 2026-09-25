import type { ToolArticle } from './toolArticles';

type ArticleWithGuides = ToolArticle & { guides?: { slug: string; label: string }[] };

export const MORE_PDF_TOOL_ARTICLES: Record<string, ArticleWithGuides> = {
  'pdf-to-jpg': {
    slug: 'pdf-to-jpg',
    title: 'PDF to JPG or PNG — export pages as images in this tab',
    lede:
      'Choose a PDF, pick JPG or PNG and a resolution, and list the pages you want. PDF.js draws each page onto a canvas in this browser tab and saves it as an image. One page downloads as a single image; several pages download together as a ZIP. The PDF is not uploaded to FileTools Kit.',
    forWho: [
      'Anyone who needs a slide or page as a picture for a chat, post, or presentation.',
      'People attaching one page of a PDF where only images are accepted.',
    ],
    notFor: [
      'Getting editable or selectable text. The images are pictures of the pages; use the original PDF for text.',
      'Password-protected PDFs. Remove the password first.',
    ],
    steps: [
      { title: 'Choose a PDF', body: 'Press Choose a PDF. The page count appears once the file has been read.' },
      { title: 'Pick format and resolution', body: 'JPG is smaller; PNG is sharper and larger. Screen is 108 DPI, Standard 144 DPI, and Print 216 DPI.' },
      { title: 'List the pages', body: 'All pages are filled in. Change it to a range such as 1-3,5 if you only need some.' },
      { title: 'Export', body: 'Press Export. One page downloads as an image; more pages download as a ZIP of numbered files.' },
    ],
    limits: [
      'Output is a raster image. Text, links, and form fields are not kept.',
      'Large page counts at Print resolution take time and memory. Export in smaller ranges if the tab slows down.',
      'The ZIP stores the images without extra compression, because JPG and PNG are already compressed.',
    ],
    faq: [
      { q: 'Is my PDF uploaded?', a: 'No. Pages are rendered in this tab with PDF.js.' },
      { q: 'Which format should I pick?', a: 'JPG for photos and scans, PNG for sharp text or diagrams with flat colours.' },
      { q: 'Why is the text not selectable in the image?', a: 'An image is a picture of the page. Keep the PDF if you need to copy text.' },
    ],
    guides: [
      { slug: 'pdf-to-jpg-in-browser', label: 'How to turn PDF pages into JPG or PNG images' },
      { slug: 'compress-images-in-browser', label: 'How to compress images for email or a website' },
    ],
  },
  'organize-pdf': {
    slug: 'organize-pdf',
    title: 'Organize PDF — reorder, rotate, and delete pages in this tab',
    lede:
      'Choose one PDF and every page appears as a thumbnail drawn with PDF.js. Drag pages into a new order or use the arrow buttons, rotate sideways pages, delete pages you do not need, and export. pdf-lib builds the new PDF in this browser tab; the original file is not changed.',
    forWho: [
      'Anyone whose scanned pages came out in the wrong order or sideways.',
      'People removing blank pages or an unwanted cover before sending a file.',
    ],
    notFor: [
      'Combining several PDFs. Use Merge PDF first, then organize the result.',
      'Password-protected PDFs, which fail to load here.',
    ],
    steps: [
      { title: 'Choose a PDF', body: 'Press Choose a PDF. Thumbnails appear one by one as pages are drawn.' },
      { title: 'Reorder', body: 'Drag a card onto another position, or use the left and right arrows. The arrows work with a keyboard and on phones.' },
      { title: 'Rotate or delete', body: 'Use the icons on a card, or tap cards to select several and use Rotate selected or Delete selected.' },
      { title: 'Export', body: 'Press Export organized PDF. The file downloads with -organized added to the name.' },
    ],
    limits: [
      'Rotation is in 90 degree steps and is added to any rotation the page already had.',
      'At least one page must remain.',
      'Very large documents take a while to draw and use a lot of memory in the tab.',
      'Bookmarks and other document-level extras may not carry over to the new file.',
    ],
    faq: [
      { q: 'Is my PDF uploaded?', a: 'No. Thumbnails and the new file are both made in this tab.' },
      { q: 'Does it change the original file?', a: 'No. You download a new PDF and the original stays as it was.' },
      { q: 'Does reordering reduce quality?', a: 'No. Pages are copied as they are. Only the thumbnails are images.' },
    ],
    guides: [
      { slug: 'organize-pdf-pages-in-browser', label: 'How to reorder, rotate, and delete PDF pages' },
      { slug: 'merge-pdf-in-browser', label: 'How to merge 20 PDFs in your browser' },
    ],
  },
  'password-protect-pdf': {
    slug: 'password-protect-pdf',
    title: 'Password protect PDF — AES-256 encryption in this tab',
    lede:
      'Choose a PDF, type a password twice, and press Protect PDF. The file is encrypted with AES-256 using the browser Web Crypto API and a pdf-lib fork that supports encryption, all in this tab. The protected copy opens only after the password is entered. Neither the file nor the password is sent to FileTools Kit.',
    forWho: [
      'Anyone emailing a statement, contract, or ID scan who wants it to need a password to open.',
      'People who prefer not to upload a sensitive file to an online encryption service.',
    ],
    notFor: [
      'Stopping someone who already knows the password from copying, printing, or sharing the content.',
      'Removing a password from a PDF. This tool only adds one.',
      'Digital signatures or proof of who sent a file.',
    ],
    steps: [
      { title: 'Choose a PDF', body: 'Press Choose a PDF. Files that already have a password are refused so they are not double-encrypted.' },
      { title: 'Set a password', body: 'Use at least 6 characters; a longer passphrase is much stronger. Type it again to confirm.' },
      { title: 'Protect', body: 'Press Protect PDF. The encrypted copy downloads with -protected added to the name.' },
      { title: 'Test it', body: 'Open the new file, check that it asks for the password, and share the password through a different channel than the file.' },
    ],
    limits: [
      'There is no password recovery. Keep the unprotected original somewhere safe.',
      'The same password is used to open the file and as the owner password; no separate permission settings are offered.',
      'AES-256 needs a reasonably modern PDF reader. Very old readers may not open the file.',
    ],
    faq: [
      { q: 'Is the file or password uploaded?', a: 'No. Encryption runs in this tab. FileTools Kit never sees either.' },
      { q: 'How strong is the protection?', a: 'AES-256 is strong, so the weak point is the password. Use a long passphrase that is not reused elsewhere.' },
      { q: 'I forgot the password. Can you open it?', a: 'No. Nobody at FileTools Kit can recover it. Use your unprotected original.' },
    ],
    guides: [
      { slug: 'password-protect-pdf-in-browser', label: 'How to password protect a PDF in your browser' },
      { slug: 'what-stays-in-the-tab', label: 'What stays in the tab' },
    ],
  },
};
