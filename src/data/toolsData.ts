import { ToolItem, FaqItem } from '../types';

export const TOOLS_DATA: ToolItem[] = [
  {
    id: 'resume-builder',
    name: 'ATS Resume Builder',
    category: 'Document & Career',
    description: 'Multi-step wizard with local keyword-overlap scoring, heuristic bullet rewriter, and Pro PDF export.',
    detailedDescription: 'Build a resume in the browser. Compare a pasted job description against a keyword list (overlap score, not an employer ATS), rewrite bullets with local action-verb templates, and export a PDF. Files stay in this tab. PDF download is a Pro-preview feature.',
    route: '/resume-builder',
    iconName: 'FileText',
    badge: 'Pro $7/mo',
    gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
    highlights: ['Keyword overlap score', 'Heuristic bullet rewriter', 'Live preview', 'Pro PDF export'],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'ATS Resume Builder and keyword overlap interface',
    howItWorks: [
      'Enter career history in the form',
      'Paste a job description to see keyword overlap %',
      'Rewrite bullets locally and download PDF (Pro preview)'
    ]
  },
  {
    id: 'pdf-suite',
    name: 'PDF Power Suite',
    category: 'Document & Career',
    description: 'Merge, rotate, split by page range, add a text watermark, and edit metadata — in the browser.',
    detailedDescription: 'Load PDFs in this tab with pdf-lib. Free: merge and rotate. Free split exports a new file for pages you list (e.g. 1-3,5). Pro preview: text watermark plus document metadata on export. Preview tiles are placeholders, not rendered PDF pages. No encryption or redaction.',
    route: '/pdf-suite',
    iconName: 'Layers',
    badge: 'Pro $7/mo',
    gradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
    highlights: ['Merge & rotate', 'Page-range split', 'Text watermark', 'Metadata editor'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'PDF merge, split, and watermark workspace',
    howItWorks: [
      'Drop PDF files into the page',
      'Merge or rotate for free; enter a page range to split',
      'Pro preview: text watermark and metadata, then export'
    ]
  },
  {
    id: 'file-converter',
    name: 'Universal File Converter',
    category: 'Productivity & Utility',
    description: 'Images PNG/JPG/WebP via canvas, audio decode to WAV, DOCX to text PDF or TXT — in the browser.',
    detailedDescription: 'Convert images between WebP, PNG, and JPEG with the Canvas API. Decode browser-supported audio to WAV. Extract DOCX text with mammoth and write PDF or TXT. Unsupported types are rejected rather than renamed. No AVIF/MP3/OGG encoding.',
    route: '/file-converter',
    iconName: 'RefreshCw',
    badge: 'Free',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
    highlights: ['PNG / JPG / WebP', 'Audio → WAV', 'DOCX to PDF or TXT', 'Runs in the browser'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'In-browser file converter queue',
    howItWorks: [
      'Drop images, audio, or Word DOCX files',
      'Pick a format this tool actually encodes',
      'Convert in the tab and download the result'
    ]
  },
  {
    id: 'image-optimizer',
    name: 'Smart Image Optimizer & WebP Compressor',
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
    howItWorks: [
      'Upload one or more images',
      'Tune quality and scale; sizes update in the list',
      'Download each optimized file'
    ]
  },
  {
    id: 'currency-crypto',
    name: 'Reference FX Worksheet',
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
    howItWorks: [
      'Pick source and destination from the example list',
      'Enter an amount to apply the fixed rate',
      'Read the illustration chart and hypothetical fee cards'
    ]
  },
  {
    id: 'dev-tools',
    name: 'Dev Utility Workbench',
    category: 'Developer & Data',
    description: 'JSON ↔ CSV for flat objects, keyword SQL line-breaks, regex tester, Base64, SHA-1/256/384/512.',
    detailedDescription: 'Offline helpers in the browser. JSON/CSV handles arrays of flat objects. SQL helper inserts line breaks before common keywords (not a full formatter). Regex tester uses the JS engine. Hashes use Web Crypto (SHA family; no MD5).',
    route: '/dev-tools',
    iconName: 'Terminal',
    badge: 'Free',
    gradient: 'from-teal-500/20 via-emerald-500/10 to-green-500/20',
    highlights: ['JSON / CSV (flat)', 'SQL keyword line-breaks', 'RegEx tester', 'SHA hashes'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Developer converters and hash tools',
    howItWorks: [
      'Paste JSON, CSV, SQL, or a regex',
      'Run the transform in this tab',
      'Copy the result'
    ]
  },
  {
    id: 'qr-generator',
    name: 'Custom Branded QR Code Studio',
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
    howItWorks: [
      'Choose data type and enter content',
      'Adjust colors',
      'Export PNG or SVG'
    ]
  },
  {
    id: 'social-studio',
    name: 'Social Studio & Unicode Typography',
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
    howItWorks: [
      'Type a caption or bio',
      'Copy a Unicode style',
      'Optionally copy a starter hashtag list'
    ]
  },
  {
    id: 'health-calc',
    name: 'Health & Macro Nutrition Engine',
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
    howItWorks: [
      'Enter age, sex, height, weight, and activity',
      'Pick cut / maintain / bulk',
      'Read calorie and gram estimates (not medical advice)'
    ]
  },
  {
    id: 'markdown-editor',
    name: 'Markdown & Rich Doc Editor',
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
    howItWorks: [
      'Type or paste Markdown',
      'Use the toolbar for headings and lists',
      'Export HTML or Markdown'
    ]
  },
  {
    id: 'svg-editor',
    name: 'SVG & Vector Icon Studio',
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
    howItWorks: [
      'Paste SVG, upload, or pick a preset',
      'Adjust stroke, fill, and canvas',
      'Download SVG, JSX, or PNG'
    ]
  },
  {
    id: 'text-diff',
    name: 'Text Diff & Code Comparator',
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
    howItWorks: [
      'Paste original text on the left and changed text on the right',
      'Toggle split or unified view',
      'Copy or download a unified patch'
    ]
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    category: 'Privacy & Security',
    question: 'Are my files and documents uploaded to any remote server?',
    answer: 'OmniCraft does not run a server that receives your documents. Conversions, PDF edits, image compression, SVG work, and hashes run in this browser tab. The website host still serves the app’s HTML, CSS, and JavaScript (and tool-card images may load from Unsplash).'
  },
  {
    category: 'Billing & Plans',
    question: 'What is included in the Pro Membership ($7/mo, $70/yr, or $130 Lifetime)?',
    answer: 'When paid billing launches, Pro is intended to unlock annotated PDF export (text watermark + metadata) and ATS resume PDF download. Image conversion and compression are already unlimited on the free tier. Checkout is not live: “Activate Free Pro Preview” only sets a localStorage flag in this browser. Prices: $7/month, $70/year (save about 16%), or $130 lifetime.'
  },
  {
    category: 'Commercial Use',
    question: 'Can I use generated assets (SVGs, resumes, QR codes, images) for commercial purposes?',
    answer: 'Outputs you generate belong to you, subject to third-party rights in any content you paste in. OmniCraft does not claim a license fee on those files.'
  },
  {
    category: 'Cancellation & Billing',
    question: 'Can I cancel my subscription anytime?',
    answer: 'No subscription is billed today. When paid monthly or yearly billing launches, we intend cancellation at period end with no extra penalty. Lifetime would be a one-time fee with no recurring charge.'
  },
  {
    category: 'Refund Policy',
    question: 'Is there a money-back guarantee for the Pro Membership?',
    answer: 'No payment is taken now. When paid billing launches, we intend a 30-day refund from the purchase date on monthly, yearly, and lifetime plans. Email support@omnicraft.studio.'
  }
];
