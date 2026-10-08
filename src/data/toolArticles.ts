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
      { title: 'Check the order and rotate', body: 'Files are merged in the order they appear in the list, which is the order you added them. To change it, remove a file and add it again. Rotate sideways scans. Rotation is applied on export.' },
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
    title: 'File Converter — images, audio, and DOCX text in the browser',
    lede:
      'File Converter handles three kinds of file in this tab. Images (PNG, JPEG, WebP, and other types your browser can open) are drawn to a canvas and saved as PNG, JPEG, or WebP. Audio your browser can play is decoded and saved as an uncompressed WAV. A DOCX, TXT, HTML, or Markdown file can be saved as plain text, and a DOCX can also become a simple text-only PDF. Nothing is sent to a FileTools Kit server.',
    forWho: [
      'Anyone who has a PNG and needs a JPEG for email size, or WebP for a web page.',
      'Someone who needs the words out of a Word file, or a WAV for an editor that will not open the original audio.',
    ],
    notFor: [
      'Video, HEIC from newer iPhones in most browsers, or RAW camera files.',
      'Keeping a Word layout. The DOCX to PDF path keeps the text only: no images, tables, fonts, or headers.',
    ],
    steps: [
      { title: 'Add the files', body: 'Drop or pick one or more files. The page picks a default output: WebP for images, WAV for audio, PDF for a DOCX, and TXT for other text files. Files it cannot convert are marked Unsupported.' },
      { title: 'Pick the output format', body: 'Change the format per file. JPEG is smaller and lossy, PNG keeps sharp edges and transparency, WebP is usually smallest. JPEG output gets a white background where the image was transparent.' },
      { title: 'Convert and download', body: 'Convert, then open the result next to the original before you delete anything.' },
    ],
    limits: [
      'Image exports use quality 0.92. A JPEG saved again is not a lossless copy.',
      'WAV files are large because they are uncompressed.',
      'Image metadata such as camera details and GPS is not copied into the new file.',
    ],
    faq: [
      { q: 'Does the original change on disk?', a: 'No. You download a new file. The source stays where you picked it.' },
      { q: 'Can I convert a PDF here?', a: 'No. Use PDF to JPG to turn pages into images, or PDF Suite for page work.' },
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
      { title: 'Read the example rate', body: 'Treat it as an example only. Replace it in your own notes with a rate from your bank if you need accuracy.' },
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
    title: 'Dev Tools — JSON and CSV, regex, Base64, and hashes in the tab',
    lede:
      'Dev Tools has five small helpers that run in this tab: flat JSON to CSV and back, a SQL line-break formatter, a JavaScript regex tester, Base64 encode and decode of UTF-8 text, and SHA-1, SHA-256, SHA-384, and SHA-512 hashes through the Web Crypto API. Use it when you need a digest or a quick conversion without pasting text into a stranger’s server form.',
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
    title: 'QR Generator — links, Wi-Fi, contact cards, and text',
    lede:
      'QR Generator turns a URL, Wi-Fi details, a contact card, an email address, or a short line of text into a scannable code, and exports PNG or SVG. You can change colors, margin, and error correction. The code is drawn in this tab. FileTools Kit does not host a redirect short-link behind the code.',
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
    title: 'Social Studio — Unicode text styles and length checks for posts and bios',
    lede:
      'Social Studio turns a line you type into Unicode letter styles such as bold sans, italic serif, double-struck, circled, and monospace, and shows how long the text is against common limits for X, Instagram and TikTok bios, LinkedIn, and Threads. It is a copy helper. It does not post anywhere and it does not schedule anything.',
    forWho: ['Someone writing a short bio or caption who wants a styled name or heading to paste into an app.'],
    notFor: [
      'Long paragraphs. Screen readers often read styled Unicode letter by letter or skip it, so keep styles to a word or two.',
      'Account management, scheduling, or analytics.',
    ],
    steps: [
      { title: 'Type your text', body: 'Start with the plain words. The styles are generated from that one input.' },
      { title: 'Check the length meters', body: 'Each meter counts characters against a common limit. Apps count some symbols differently, so leave a little room.' },
      { title: 'Copy a style', body: 'Press copy on the style you want and paste it into the app. Check how it looks on your phone before you publish.' },
    ],
    limits: [
      'Styled letters are separate Unicode symbols, not a font. Search inside an app may not match them to plain words.',
      'Some older phones show empty boxes for rare symbols.',
      'Starter hooks are a fixed list shipped with the page, not generated for you.',
    ],
    faq: [
      { q: 'Will this post for me?', a: 'No. You copy the text and post it yourself.' },
      { q: 'Is the text sent anywhere?', a: 'No. The styles are computed in this tab. Ordinary website logs only show that the page loaded.' },
    ],
  },
  'health-calc': {
    slug: 'health-calc',
    title: 'Health calculator — calorie and macro estimates, not medical advice',
    lede:
      'Health Calculator estimates resting energy (BMR) with the Mifflin-St Jeor formula, multiplies it by an activity level to get daily energy (TDEE), adjusts for a cut, maintain, or bulk goal, and splits the target into protein, carbs, and fat. It also shows BMI. Every figure is arithmetic on the numbers you type. It is not a diagnosis or a diet plan from a clinician.',
    forWho: ['Adults who want a rough starting estimate for daily calories and macros from height, weight, age, and activity.'],
    notFor: [
      'Children, pregnancy, eating-disorder recovery, or any medical condition that changes energy needs.',
      'Anyone told by a clinician to follow a specific plan.',
    ],
    steps: [
      { title: 'Pick metric or imperial', body: 'Enter height, weight, age, and sex in the units shown. Mixed units give a wrong number.' },
      { title: 'Choose activity and goal', body: 'Activity levels are broad bands. Most people overestimate theirs. A cut subtracts 500 kcal from TDEE and a bulk adds 350.' },
      { title: 'Read or export the estimate', body: 'The result card shows BMR, TDEE, target intake, and macro grams. Export estimate PDF saves the same numbers as a file in this tab.' },
    ],
    limits: [
      'Mifflin-St Jeor is a population formula. Real needs can differ by hundreds of calories.',
      'BMI ignores muscle mass, bone density, and body shape.',
      'Nothing typed here is sent to a medical record, because FileTools Kit does not operate one.',
    ],
    faq: [
      { q: 'Is this medical advice?', a: 'No. See the site disclaimer. Do not start or stop treatment from this calculator.' },
      { q: 'Why does my result differ from another site?', a: 'Calculators use different formulas, activity multipliers, and goal adjustments. Treat any single number as a rough start.' },
    ],
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
