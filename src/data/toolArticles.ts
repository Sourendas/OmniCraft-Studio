export interface ToolArticle {
  slug: string;
  title: string;
  lede: string;
  forWho: string[];
  notFor: string[];
  steps: { title: string; body: string }[];
  limits: string[];
  faq: { q: string; a: string }[];
}

export const TOOL_ARTICLES: Record<string, ToolArticle> = {
  'pdf-suite': {
    slug: 'pdf-suite',
    title: 'PDF Suite — merge, split, rotate, and watermark in this tab',
    lede:
      'PDF Suite is for people who already have PDF files and need a single packet, a page range, a rotation, or a visible text stamp. It reads those files with the browser File API and edits them with pdf-lib in this tab. FileTools Kit does not run an upload API that stores your PDFs.',
    forWho: [
      'Job applicants combining a cover letter, resume, and certificates into one attachment.',
      'Students or clerks who need pages 3–7 of a longer scan.',
      'Anyone who only needs a visible CONFIDENTIAL overlay, not encryption.',
    ],
    notFor: [
      'Password-protected or encrypted PDFs — those often fail in the browser.',
      'True redaction. A text watermark does not black out or delete words.',
      'Very large scan packs on a phone. Merge in batches on a desktop if the tab runs out of memory.',
    ],
    steps: [
      { title: 'Open PDF Suite', body: 'From the home page choose PDF Suite. Until you pick files, nothing leaves your computer except the request that loaded this website.' },
      { title: 'Add every PDF', body: 'Drop or pick the files. If one does not appear, it may not be a PDF, it may be corrupt, or it may be encrypted.' },
      { title: 'Order and rotate', body: 'Move files so the list matches the packet you want. Rotate sideways scans. Rotation is applied on export.' },
      { title: 'Merge, split, or watermark', body: 'Merge copies pages into one file. Split uses a 1-based range on the first file (example: 1-3,5). Watermark draws overlay text; it is not a password.' },
      { title: 'Download and check', body: 'Open the download in a reader. Check the first page, a middle page, and the last page before you send it.' },
    ],
    limits: [
      'Output follows source page sizes. A4 and Letter pages stay those sizes in a merge.',
      'Form fields, fonts, and images come from the source files. This is a page copy, not a redesign.',
      'Split always uses the first file in the list.',
    ],
    faq: [
      { q: 'Does merge upload my PDFs?', a: 'No. The files stay as File objects in this tab. The site host still serves the page itself.' },
      { q: 'Can I merge 20 files?', a: 'Often yes on a desktop. On a phone, do smaller batches, download, then merge those results.' },
      { q: 'Is the watermark secure?', a: 'No. It is visible text. Anyone can still copy or screenshot the page.' },
    ],
  },
  'resume-builder': {
    slug: 'resume-builder',
    title: 'Resume Builder — fill a form and download a PDF',
    lede:
      'Resume Builder is a form plus twelve layouts. You type name, work history, education, and skills, pick a layout, and download a PDF built in this tab with jsPDF. There is no account and no employer submission from this page.',
    forWho: [
      'People who need a clean one- or two-page PDF tonight.',
      'Applicants who want to try more than one layout on the same text.',
    ],
    notFor: [
      'People who need a real employer Applicant Tracking System. The match percentage on this page is a local keyword overlap, not an ATS.',
      'Complex designs with custom fonts you must embed yourself.',
    ],
    steps: [
      { title: 'Open Resume Builder', body: 'Use the form on the left. Start with your name and the role you are applying for.' },
      { title: 'Fill sections', body: 'Add work history with dates and outcomes. Keep bullets short. Add education and a skills list that matches the posting.' },
      { title: 'Pick a layout', body: 'Twelve templates change spacing and headers. They do not invent new content.' },
      { title: 'Download the PDF', body: 'Export and open the file. Check margins and that nothing is cut off at the page edge.' },
    ],
    limits: [
      'The PDF is generated in the tab. Refreshing the page can clear unsaved form text — copy a backup if you need it later.',
      'FileTools Kit does not send this resume to employers.',
    ],
    faq: [
      { q: 'Is the match score an ATS?', a: 'No. It counts overlapping words between your text and a job description you paste. Employers use different software.' },
      { q: 'Who owns the PDF?', a: 'You do, subject to any third-party text you pasted in. There is no license fee from FileTools Kit.' },
    ],
  },
  'file-converter': {
    slug: 'file-converter',
    title: 'File Converter — change image formats in the browser',
    lede:
      'File Converter reads an image you choose, draws it to a canvas, and exports another format such as PNG, JPEG, or WebP. The conversion happens in this tab. It is not a server transcoder for video, Office documents, or archives.',
    forWho: [
      'Anyone who has a PNG and needs a JPEG for email size.',
      'Anyone who needs WebP for a web page from a local photo.',
    ],
    notFor: [
      'DOCX to PDF, video, or audio. Those formats are not handled here.',
      'RAW camera files that the browser cannot decode.',
    ],
    steps: [
      { title: 'Choose the image', body: 'Pick a file the browser can display. If the preview is blank, the type is unsupported.' },
      { title: 'Pick the output format', body: 'JPEG is smaller and lossy. PNG keeps sharp edges. WebP is often smaller than JPEG at a similar look.' },
      { title: 'Download', body: 'Save the result and open it. Compare it next to the original before you delete anything.' },
    ],
    limits: [
      'Quality sliders change file size and artifacts. JPEG 100 is not a lossless copy of a PNG.',
      'Transparency in PNG can become a solid background in JPEG.',
    ],
    faq: [
      { q: 'Does the original change on disk?', a: 'No. You download a new file. The source stays where you picked it.' },
      { q: 'Can I convert a PDF here?', a: 'Use PDF Suite for PDF page work. This page is for bitmap images.' },
    ],
  },
  'image-optimizer': {
    slug: 'image-optimizer',
    title: 'Image Optimizer — shrink photos before you send them',
    lede:
      'Image Optimizer resizes and recompresses pictures in this tab so they are easier to email or upload elsewhere. It uses the canvas API. FileTools Kit does not keep a copy of the photo on a processing server.',
    forWho: [
      'People sending photos that bounce on email size limits.',
      'People who need a smaller JPEG or WebP for a form that caps megabytes.',
    ],
    notFor: [
      'Print-quality masters. Recompression throws detail away.',
      'Batch folders of hundreds of RAW files.',
    ],
    steps: [
      { title: 'Add images', body: 'Drop one or more photos the browser can decode.' },
      { title: 'Set max width and quality', body: 'A max width of 1600px is enough for most screens. Quality around 0.7–0.85 is a usual JPEG tradeoff.' },
      { title: 'Download', body: 'Check the new file size and that faces or text are still readable.' },
    ],
    limits: [
      'You cannot recover detail after a heavy compress. Keep the original.',
      'Very large phone panoramas can stall a tab. Try one file at a time.',
    ],
    faq: [
      { q: 'Is this lossless?', a: 'Usually no. JPEG and WebP recompression is lossy. PNG can stay lossless if you only resize carefully.' },
      { q: 'Do ads receive the photo?', a: 'No. Ads load as a separate channel. The photo bytes stay in this tab unless you download them yourself.' },
    ],
  },
  'currency-crypto': {
    slug: 'currency-crypto',
    title: 'Currency worksheet — example rates, not a live feed',
    lede:
      'This page is a worksheet for multiplying an amount by a rate you can see on screen. The figures shipped with the page are static examples. They are not a live bank or exchange feed and they are not investment advice.',
    forWho: ['Someone who wants a quick multiply-and-compare layout.'],
    notFor: ['Trading, tax filings, or payroll. Use a live rate source your bank accepts.'],
    steps: [
      { title: 'Enter an amount', body: 'Type the number you want to convert.' },
      { title: 'Read the example rate', body: 'Treat it as a placeholder. Replace it in your own notes with a rate from your bank if you need accuracy.' },
      { title: 'Do not treat the result as a quote', body: 'Screenshots from this page are not a contract.' },
    ],
    limits: ['Rates on this page can be days or weeks out of date.', 'Crypto rows are examples only.'],
    faq: [
      { q: 'Where do the rates come from?', a: 'They are static numbers bundled with the page, not a paid market data API.' },
      { q: 'Can I rely on this for a transfer?', a: 'No. Ask your bank or licensed exchange for the rate that will actually apply.' },
    ],
  },
  'dev-tools': {
    slug: 'dev-tools',
    title: 'Dev Tools — hash, encode, and inspect text locally',
    lede:
      'Dev Tools hashes text with the Web Crypto API, encodes or decodes Base64, and runs small format helpers in this tab. Use it when you need a SHA-256 digest or a quick encode without pasting secrets into a stranger’s server form.',
    forWho: ['Developers checking a checksum or encoding a string.'],
    notFor: [
      'Password storage design. Hashing a password once in a browser tab is not a full auth system.',
      'Secret material you should not have on a shared screen.',
    ],
    steps: [
      { title: 'Paste or type the input', body: 'Keep secrets off shared machines.' },
      { title: 'Pick the operation', body: 'SHA-256 produces a hex digest. Base64 is encoding, not encryption.' },
      { title: 'Copy the output', body: 'Compare it to the value you expected. A single changed character changes a hash completely.' },
    ],
    limits: ['Base64 is reversible. Do not treat it as hiding data.', 'Hashing here is for checksums and demos, not for storing user passwords.'],
    faq: [
      { q: 'Is SHA-256 computed on your server?', a: 'No. The browser Web Crypto API runs it in this tab.' },
      { q: 'Can I hash a file?', a: 'This page is built for text. File hashing would need a separate file reader path.' },
    ],
  },
  'qr-generator': {
    slug: 'qr-generator',
    title: 'QR Generator — encode a URL or line of text',
    lede:
      'QR Generator turns a URL or short string into a scannable code and lets you export PNG or SVG. The pixels are drawn in this tab. FileTools Kit does not host a redirect short-link behind the code.',
    forWho: ['People putting a menu URL, Wi-Fi note, or portfolio link on a flyer.'],
    notFor: ['Payment QR schemes that need a licensed provider.', 'Very long documents. QR density rises and cheap cameras fail.'],
    steps: [
      { title: 'Type the payload', body: 'Prefer a short https URL. Test it in a browser first.' },
      { title: 'Generate', body: 'A preview appears on the page. Print size depends on how large you export.' },
      { title: 'Export PNG or SVG', body: 'SVG scales for print. PNG is fine for slides. Scan the export with your phone before you print 200 copies.' },
    ],
    limits: ['If the URL changes later, printed codes still point at the old address.', 'Styling options do not change the encoded bytes, only how the modules look.'],
    faq: [
      { q: 'Do you log the URL I encode?', a: 'The string stays in this tab. Ordinary website logs may still record that you loaded this page.' },
      { q: 'Can I encode a vCard?', a: 'Short text works. Long vCards can make a dense code that some cameras miss.' },
    ],
  },
  'social-studio': {
    slug: 'social-studio',
    title: 'Social Studio — resize a canvas for common post sizes',
    lede:
      'Social Studio is a local canvas helper for common social image sizes. You add text or an image and export a PNG. It is not a scheduler, analytics suite, or publisher that posts to any network.',
    forWho: ['Someone who needs a 1080×1080 or story-sized PNG quickly.'],
    notFor: ['Managing accounts, captions calendars, or ads manager work.'],
    steps: [
      { title: 'Pick a size', body: 'Square, portrait, and landscape presets match common feed frames.' },
      { title: 'Add your words or image', body: 'Keep text large enough to read on a phone.' },
      { title: 'Export PNG', body: 'Download and preview on your phone before you post elsewhere.' },
    ],
    limits: ['Platforms crop previews differently. Always check the live preview on that app.', 'This page does not upload the PNG to Instagram, X, or LinkedIn.'],
    faq: [{ q: 'Will this post for me?', a: 'No. You download a file and post it yourself.' }],
  },
  'health-calc': {
    slug: 'health-calc',
    title: 'Health calculator — numbers only, not medical advice',
    lede:
      'Health Calculator runs simple formulas such as BMI from height and weight you type. The result is arithmetic. It is not a diagnosis, prescription, or a substitute for a clinician.',
    forWho: ['People who want a BMI or similar figure from numbers they already know.'],
    notFor: ['Treatment decisions, eating-disorder recovery planning, or anyone told by a clinician to ignore BMI.'],
    steps: [
      { title: 'Enter height and weight', body: 'Use the units shown on the form. Mixing cm and inches will produce a wrong number.' },
      { title: 'Read the figure', body: 'BMI is weight divided by height squared. Categories are general labels, not a full health exam.' },
      { title: 'Talk to a professional for decisions', body: 'If the number worries you, use a qualified clinician, not this page.' },
    ],
    limits: ['BMI ignores muscle mass, bone density, and many conditions.', 'No data from this form is sent to a medical record we operate, because we do not operate one.'],
    faq: [{ q: 'Is this medical advice?', a: 'No. See the site disclaimer. Do not start or stop treatment from this calculator.' }],
  },
  'markdown-editor': {
    slug: 'markdown-editor',
    title: 'Markdown Editor — write and preview in the tab',
    lede:
      'Markdown Editor is a split view: you type Markdown on one side and see a preview on the other. Rendering happens in the browser. It is not a CMS and it does not publish to a blog host.',
    forWho: ['People drafting README text or notes with headings and lists.'],
    notFor: ['Collaborative docs with comments and version history in the cloud.'],
    steps: [
      { title: 'Type Markdown', body: 'Headings use #. Lists use - or numbers. Links use [label](url).' },
      { title: 'Check the preview', body: 'If a heading looks wrong, you probably missed a space after #.' },
      { title: 'Copy the source', body: 'Save the raw Markdown yourself. Refreshing the tab can clear unsaved text.' },
    ],
    limits: ['Not every Markdown extension exists here. GitHub-flavored extras may differ.', 'There is no FileTools Kit document account. Copy your work out if it matters.'],
    faq: [{ q: 'Where is my file stored?', a: 'In this tab until you copy or download it. We do not host a docs folder for you.' }],
  },
  'svg-studio': {
    slug: 'svg-studio',
    title: 'SVG Studio — edit simple vector markup locally',
    lede:
      'SVG Studio lets you inspect and tweak SVG markup in the browser and preview the result. It is a small editor, not Adobe Illustrator and not a full drawing suite.',
    forWho: ['People who have an SVG file and need to change a color or viewBox.'],
    notFor: ['Print-ready branding systems, auto-tracing photos, or animation timelines.'],
    steps: [
      { title: 'Paste or load SVG', body: 'If the preview is blank, the markup may be invalid or use features this preview does not draw.' },
      { title: 'Edit attributes', body: 'Change fill, stroke, or viewBox. Keep a copy of the original.' },
      { title: 'Export', body: 'Download the SVG and open it in a browser or design tool to confirm.' },
    ],
    limits: ['Embedded rasters inside SVG still depend on those image bytes.', 'Scripts inside SVG are not a feature we encourage. Treat unknown SVG as untrusted markup.'],
    faq: [{ q: 'Can I convert a photo to SVG here?', a: 'No auto-trace. Start from real SVG markup.' }],
  },
  'text-diff': {
    slug: 'text-diff',
    title: 'Text Diff — compare two strings side by side',
    lede:
      'Text Diff highlights insertions and deletions between a left and right string. Use it for copy edits, policy drafts, or two versions of a paragraph. Comparison runs in this tab.',
    forWho: ['Editors checking what changed between two drafts.', 'Developers comparing two config snippets.'],
    notFor: ['Binary files or multi-megabyte dumps that freeze a tab.'],
    steps: [
      { title: 'Paste version A and version B', body: 'Keep both sides in the same order of sections so the diff stays readable.' },
      { title: 'Read the marks', body: 'Added and removed spans are colored. A moved paragraph may look like a delete plus an insert.' },
      { title: 'Copy the winner', body: 'This page does not save a third merged file unless you copy it yourself.' },
    ],
    limits: ['Whitespace-only changes can look noisy. Normalize line endings if the result is messy.', 'There is no account history. Refreshing clears the boxes.'],
    faq: [{ q: 'Do you store the drafts?', a: 'No. Both sides live in this tab until you close or refresh it.' }],
  },
};

export function getToolArticle(slug: string): ToolArticle | undefined {
  return TOOL_ARTICLES[slug];
}
