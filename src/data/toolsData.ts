import { ToolItem, FaqItem } from '../types';

export const TOOLS_DATA: ToolItem[] = [
  {
    id: 'resume-builder',
    name: 'Resume Builder',
    category: 'Document & Career',
    description: 'Multi-step wizard with local keyword-overlap scoring, heuristic bullet rewriter, and PDF export.',
    detailedDescription: 'Build a resume in the browser. Compare a pasted job description against a keyword list (overlap score, not an employer ATS), rewrite bullets with local action-verb templates, and export a PDF. Files stay in this tab.',
    route: '/resume-builder',
    iconName: 'FileText',
    badge: 'Free',
    gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
    highlights: ['Keyword overlap score', 'Heuristic bullet rewriter', 'Live preview', 'PDF export'],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Resume Builder and keyword overlap interface',
    howItWorks: ['Enter career history in the form', 'Paste a job description to see keyword overlap %', 'Rewrite bullets locally and download PDF']
  },
  {
    id: 'pdf-suite',
    name: 'PDF Suite',
    category: 'Document & Career',
    description: 'Merge, rotate, split by page range, add a text watermark, and edit metadata in the browser.',
    detailedDescription: 'Load PDFs in this tab with pdf-lib. Merge, rotate, split by page list (e.g. 1-3,5), add a text watermark, and set metadata on export. Preview tiles are placeholders, not rendered PDF pages. No encryption or redaction.',
    route: '/pdf-suite',
    iconName: 'Layers',
    badge: 'Free',
    gradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
    highlights: ['Merge & rotate', 'Page-range split', 'Text watermark', 'Metadata editor'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'PDF merge, split, and watermark workspace',
    howItWorks: ['Drop PDF files into the page', 'Merge, rotate, or enter a page range to split', 'Add a text watermark and metadata, then export']
  },
  {
    id: 'file-converter',
    name: 'File Converter',
    category: 'Productivity & Utility',
    description: 'Images PNG/JPG/WebP via canvas, audio decode to WAV, DOCX to text PDF or TXT in the browser.',
    detailedDescription: 'Convert images between WebP, PNG, and JPEG with the Canvas API. Decode browser-supported audio to WAV. Extract DOCX text with mammoth and write PDF or TXT. Unsupported types are rejected rather than renamed. No AVIF/MP3/OGG encoding.',
    route: '/file-converter',
    iconName: 'RefreshCw',
    badge: 'Free',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
    highlights: ['PNG / JPG / WebP', 'Audio to WAV', 'DOCX to PDF or TXT', 'Runs in the browser'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'In-browser file converter queue',
    howItWorks: ['Drop images, audio, or Word DOCX files', 'Pick a format this tool actually encodes', 'Convert in the tab and download the result']
  },
  {
    id: 'image-optimizer',
    name: 'Image Optimizer',
    category: 'Media & Graphics',
    description: 'Compress and resize images in canvas; download WebP, JPEG, or PNG with before/after file sizes.',
    detailedDescription: 'Uses the browser canvas to scale and re-encode images. Adjust quality and dimensions, then download each file. Savings vary by source; there is no ZIP pack and no comparison slider.',
    route: '/image-optimizer',
    iconName: 'Minimize2',
    badge: 'Free',
    gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
    highlights: ['Quality & scale sliders', 'WebP / JPEG / PNG', 'Before/after sizes', 'Multi-file download'],
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Image compression with size comparison',
    howItWorks: ['Upload one or more images', 'Tune quality and scale; sizes update in the list', 'Download each optimized file']
  },
  {
    id: 'currency-crypto',
    name: 'Currency Worksheet',
    category: 'Productivity & Utility',
    description: 'Example FX worksheet with fixed reference rates (not live) and hypothetical remittance fee examples.',
    detailedDescription: 'Multiply amounts using a hardcoded rate table last authored September 2026. The chart is an illustration, not historical market data. Remittance cards are hypothetical fee examples, not quotes from banks or apps.',
    route: '/currency-crypto',
    iconName: 'Coins',
    badge: 'Free',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-cyan-500/20',
    highlights: ['Fixed example rates', 'Fiat & a few cryptos', 'Hypothetical fees', 'Not a live feed'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Reference currency conversion worksheet',
    howItWorks: ['Pick source and destination from the example list', 'Enter an amount to apply the fixed rate', 'Read the illustration chart and hypothetical fee cards']
  },
  {
    id: 'dev-tools',
    name: 'Dev Tools',
    category: 'Developer & Data',
    description: 'JSON to CSV for flat objects, keyword SQL line-breaks, regex tester, Base64, SHA-1/256/384/512.',
    detailedDescription: 'Offline helpers in the browser. JSON/CSV handles arrays of flat objects. SQL helper inserts line breaks before common keywords (not a full formatter). Regex tester uses the JS engine. Hashes use Web Crypto (SHA family; no MD5).',
    route: '/dev-tools',
    iconName: 'Terminal',
    badge: 'Free',
    gradient: 'from-teal-500/20 via-emerald-500/10 to-green-500/20',
    highlights: ['JSON / CSV (flat)', 'SQL keyword line-breaks', 'RegEx tester', 'SHA hashes'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Developer converters and hash tools',
    howItWorks: ['Paste JSON, CSV, SQL, or a regex', 'Run the transform in this tab', 'Copy the result']
  },
  {
    id: 'qr-generator',
    name: 'QR Generator',
    category: 'Media & Graphics',
    description: 'Create QR codes for URLs, Wi-Fi, and vCards with colors and PNG/SVG export.',
    detailedDescription: 'Encode URL, Wi-Fi, vCard, or text into a QR image in the browser. Adjust colors and export PNG or SVG.',
    route: '/qr-generator',
    iconName: 'QrCode',
    badge: 'Free',
    gradient: 'from-indigo-500/20 via-purple-500/10 to-pink-500/20',
    highlights: ['URL, Wi-Fi & vCard', 'Color styling', 'PNG & SVG export'],
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'QR code designer and exporter',
    howItWorks: ['Choose data type and enter content', 'Adjust colors', 'Export PNG or SVG']
  },
  {
    id: 'social-studio',
    name: 'Social Studio',
    category: 'Productivity & Utility',
    description: 'Unicode font styles plus caption length meters and starter hashtag lists.',
    detailedDescription: 'Map your text into Unicode letter styles and copy them. Hashtag chips are static starter lists, not research or trending data.',
    route: '/social-studio',
    iconName: 'Type',
    badge: 'Free',
    gradient: 'from-fuchsia-500/20 via-pink-500/10 to-rose-500/20',
    highlights: ['Unicode font styles', 'Caption length meters', 'Starter hashtag lists', 'One-click copy'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Unicode typography and caption formatter',
    howItWorks: ['Type a caption or bio', 'Copy a Unicode style', 'Optionally copy a starter hashtag list']
  },
  {
    id: 'health-calc',
    name: 'Health Calculator',
    category: 'Productivity & Utility',
    description: 'Mifflin-St Jeor BMR and TDEE estimates with macro sliders. Not medical advice.',
    detailedDescription: 'Estimates BMR with Mifflin-St Jeor and TDEE from an activity multiplier. Macro grams follow simple ratio sliders. Educational only — not medical advice.',
    route: '/health-calc',
    iconName: 'Flame',
    badge: 'Free',
    gradient: 'from-rose-500/20 via-red-500/10 to-orange-500/20',
    highlights: ['Mifflin-St Jeor BMR', 'TDEE multipliers', 'Macro sliders', 'Not medical advice'],
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'BMR and macro estimate calculator',
    howItWorks: ['Enter age, sex, height, weight, and activity', 'Pick cut / maintain / bulk', 'Read calorie and gram estimates (not medical advice)']
  },
  {
    id: 'markdown-editor',
    name: 'Markdown Editor',
    category: 'Developer & Data',
    description: 'Side-by-side Markdown writing with live preview, word count, and export to MD or HTML.',
    detailedDescription: 'Write Markdown in the browser with a live HTML preview, word count and reading-time estimate, and download as Markdown or HTML.',
    route: '/markdown-editor',
    iconName: 'FileEdit',
    badge: 'Free',
    gradient: 'from-sky-500/20 via-cyan-500/10 to-blue-500/20',
    highlights: ['Side-by-side preview', 'Formatting toolbar', 'Word & read time', 'HTML & MD export'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Markdown editor and HTML preview',
    howItWorks: ['Type or paste Markdown', 'Use the toolbar for headings and lists', 'Export HTML or Markdown']
  },
  {
    id: 'svg-editor',
    name: 'SVG Studio',
    category: 'Media & Graphics',
    description: 'Edit SVG stroke/fill, scale the canvas, and export SVG, React JSX, or PNG.',
    detailedDescription: 'Paste SVG markup or pick a preset, adjust stroke and fill, then download minified SVG, copy React JSX, or export a PNG.',
    route: '/svg-editor',
    iconName: 'Sparkles',
    badge: 'Free',
    gradient: 'from-teal-500/20 via-cyan-500/10 to-emerald-500/20',
    highlights: ['Color & stroke editor', 'Minified SVG', 'React JSX export', 'PNG export'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'SVG vector studio',
    howItWorks: ['Paste SVG, upload, or pick a preset', 'Adjust stroke, fill, and canvas', 'Download SVG, JSX, or PNG']
  },
  {
    id: 'text-diff',
    name: 'Text Diff',
    category: 'Developer & Data',
    description: 'Side-by-side text/code comparator with line highlights, stats, and unified patch export.',
    detailedDescription: 'Compare two texts in the browser, inspect line differences, and export a unified .patch file.',
    route: '/text-diff',
    iconName: 'Code2',
    badge: 'Free',
    gradient: 'from-indigo-500/20 via-blue-500/10 to-cyan-500/20',
    highlights: ['Split & unified views', 'Line highlights', 'Diff stats', 'Git .patch export'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Text diff comparator',
    howItWorks: ['Paste original text on the left and changed text on the right', 'Toggle split or unified view', 'Copy or download a unified patch']
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    category: 'Privacy',
    question: 'Are my files uploaded to your server?',
    answer: 'FileTools Kit does not run an upload API that receives your documents. PDF, image, resume, SVG, and hash work runs in this browser tab. Vercel still serves the website files, and tool-card photos may load from Unsplash.'
  },
  {
    category: 'Pricing',
    question: 'Is anything paid?',
    answer: 'No. All 12 tools are free in the browser. There is no checkout and no subscription on this site.'
  },
  {
    category: 'Commercial use',
    question: 'Can I use generated files commercially?',
    answer: 'Outputs you generate belong to you, subject to third-party rights in any content you paste in. FileTools Kit does not charge a license fee on those files.'
  },
  {
    category: 'Limits',
    question: 'What does not work?',
    answer: 'Encrypted PDFs may fail. Currency rates are static examples. Health numbers are not medical advice. Resume match % is a local keyword overlap, not a real employer ATS.'
  },
  {
    category: 'Contact',
    question: 'How do I reach you?',
    answer: 'Email support@filetoolskit.com or privacy@filetoolskit.com. Operator: Souren Das, Bengaluru, India.'
  }
];
