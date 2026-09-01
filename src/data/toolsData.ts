import { ToolItem, FaqItem } from '../types';

export const TOOLS_DATA: ToolItem[] = [
  {
    id: 'resume-builder',
    name: 'ATS AI Resume Builder',
    category: 'Document & Career',
    description: 'Multi-step wizard with real-time ATS keyword match scoring, bullet enhancer, and executive PDF generation.',
    detailedDescription: 'Build high-impact, ATS-optimized resumes tailored for modern applicant tracking systems. Analyze keyword match density against target job descriptions, enhance bullet points with action verbs, and export publication-ready PDF documents without data ever leaving your browser.',
    route: '/resume-builder',
    iconName: 'FileText',
    badge: 'Pro $7/mo',
    gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
    highlights: ['ATS Keyword Scanner', 'AI Bullet Enhancer', 'Custom Layouts', 'Instant PDF Export'],
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'AI Resume Builder and ATS Keyword Scoring Interface',
    howItWorks: [
      'Enter your career history or paste an existing resume',
      'Input target job description to calculate live ATS match %',
      'One-click AI bullet enhancer to maximize impact and download PDF'
    ]
  },
  {
    id: 'pdf-suite',
    name: 'PDF Power Suite',
    category: 'Document & Career',
    description: 'Visual drag-and-drop page organizer: Merge, split, rotate, watermark, and modify document metadata 100% locally.',
    detailedDescription: 'Comprehensive client-side PDF workstation. Drag, reorder, rotate, split, and merge multiple documents seamlessly. Embed custom text or image watermarks, redact sensitive fields, and update document metadata privately in browser memory.',
    route: '/pdf-suite',
    iconName: 'Layers',
    badge: 'Pro $7/mo',
    gradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
    highlights: ['Visual Page Reordering', 'Batch Merge & Split', 'Custom Watermarking', 'Metadata Editor'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Visual PDF Page Organizer and Reordering Workspace',
    howItWorks: [
      'Select or drop PDF files directly into the browser canvas',
      'Drag and drop pages visually to reorder, delete, or rotate',
      'Apply watermarks and export unified document in milliseconds'
    ]
  },
  {
    id: 'file-converter',
    name: 'Universal File Converter',
    category: 'Productivity & Utility',
    description: 'Convert Images (PNG, JPG, WebP, AVIF), Audio (MP3, WAV, OGG), and Documents (DOCX to PDF, TXT) without server uploads.',
    detailedDescription: 'Universal media and document transcoder running on WebAssembly. Convert images between WebP, PNG, JPG, and AVIF, audio between MP3, WAV, and OGG, and transform DOCX into clean PDF or TXT without third-party cloud transfers.',
    route: '/file-converter',
    iconName: 'RefreshCw',
    badge: 'Free',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
    highlights: ['Image & Audio Engine', 'DOCX to PDF Converter', 'Zero Cloud Uploads', 'Batch Processing'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Universal In-Browser File Converter Matrix',
    howItWorks: [
      'Drop your images, audio files, or Word DOCX documents',
      'Choose your destination format with quality preferences',
      'Transcode instantly in-browser and save to your local drive'
    ]
  },
  {
    id: 'image-optimizer',
    name: 'Smart Image Optimizer & WebP Compressor',
    category: 'Media & Graphics',
    description: 'Compress images up to 90% with live side-by-side visual quality comparison, dimension resizing, and one-click bulk export.',
    detailedDescription: 'High-efficiency lossless and lossy visual optimizer. Compress raw PNG, JPEG, and WebP assets by up to 90% with an interactive dual-pane comparison slider, custom dimension scaling, and instant batch ZIP packaging.',
    route: '/image-optimizer',
    iconName: 'Minimize2',
    badge: 'Free',
    gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
    highlights: ['Up to 90% Size Reduction', 'Side-by-Side Quality Preview', 'Custom Resize & Formats', 'Bulk Download'],
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Smart Image Compression and Quality Comparison Tool',
    howItWorks: [
      'Upload single or multiple image assets',
      'Adjust compression ratio slider while viewing side-by-side comparison',
      'Download individual optimized assets or batch ZIP archive'
    ]
  },
  {
    id: 'currency-crypto',
    name: 'Live Currency & Crypto FX Matrix',
    category: 'Productivity & Utility',
    description: 'Real-time multi-currency fiat & crypto conversion paired with cross-border remittance fee comparison (Bank vs. Wise vs. Crypto).',
    detailedDescription: 'Real-time financial exchange rate station. Track live prices for USD, EUR, GBP, JPY and top cryptos (BTC, ETH, SOL). Includes an interactive remittance cost calculator revealing hidden bank transfer spreads and fee comparisons.',
    route: '/currency-crypto',
    iconName: 'Coins',
    badge: 'Free',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-cyan-500/20',
    highlights: ['Top 20 Cryptos & Fiats', 'Remittance Fee Estimator', 'Interactive SVG Trends', 'Real-Time Spreads'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Live Currency Exchange and Remittance Comparison Station',
    howItWorks: [
      'Select source fiat or cryptocurrency and destination target',
      'Enter amount to get instant spot rates and historical 30-day chart',
      'Compare remittance cost breakdown across banks and modern providers'
    ]
  },
  {
    id: 'dev-tools',
    name: 'Dev Utility Workbench',
    category: 'Developer & Data',
    description: 'JSON <-> CSV bidirectional converter, SQL Formatter, RegEx Live Tester, Base64/URL encoders, and cryptographic hashes.',
    detailedDescription: 'The definitive offline developer utility box. Convert JSON trees to tabular CSV, beautify complex SQL queries, test regular expressions in real-time with capture group breakdowns, and generate SHA-256 / MD5 cryptographic hashes.',
    route: '/dev-tools',
    iconName: 'Terminal',
    badge: 'Free',
    gradient: 'from-teal-500/20 via-emerald-500/10 to-green-500/20',
    highlights: ['JSON / CSV Parser', 'SQL Beautifier', 'RegEx Live Tester', 'SHA-256 / Hash Generator'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Developer Code Formatter, JSON/CSV Converter, and Hash Station',
    howItWorks: [
      'Paste raw JSON, CSV, SQL, or RegEx patterns into the editor',
      'Choose format, minification, or extraction parameters',
      'Copy transformed syntax or download structured schema files'
    ]
  },
  {
    id: 'qr-generator',
    name: 'Custom Branded QR Code Studio',
    category: 'Media & Graphics',
    description: 'Create branded QR codes for URLs, Wi-Fi networks, and vCards with custom color gradients, corner styles, and vector SVG exports.',
    detailedDescription: 'Design bespoke vector QR codes for websites, Wi-Fi credentials, business vCards, and social handles. Personalize color gradients, eye shapes, corner radii, and embedded center icons, and export in razor-sharp SVG or high-res PNG.',
    route: '/qr-generator',
    iconName: 'QrCode',
    badge: 'Free',
    gradient: 'from-indigo-500/20 via-purple-500/10 to-pink-500/20',
    highlights: ['URL, Wi-Fi & vCard', 'Gradient & Color Styling', 'Custom Corner Modules', 'PNG & SVG Export'],
    image: 'https://images.unsplash.com/photo-1595079672139-62309736857b?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Branded QR Code Designer and Vector SVG Exporter',
    howItWorks: [
      'Select data type (URL, Wi-Fi, vCard contact, plain text)',
      'Customize foreground colors, gradient angles, and corner shapes',
      'Export high-resolution PNG or infinitely scalable vector SVG'
    ]
  },
  {
    id: 'social-studio',
    name: 'Social Studio & Unicode Typography',
    category: 'Productivity & Utility',
    description: 'Unicode stylish font generator (Gothic, Script, Bubble) paired with Instagram/TikTok caption line breakers and hashtag curators.',
    detailedDescription: 'Enhance your digital presence across Instagram, TikTok, LinkedIn, and X. Generate 12+ aesthetic Unicode font styles (Fraktur, Cursive, Double-Struck, Bold Serif), format clean spacing with invisible line breakers, and explore curated hashtag clusters.',
    route: '/social-studio',
    iconName: 'Type',
    badge: 'Free',
    gradient: 'from-fuchsia-500/20 via-pink-500/10 to-rose-500/20',
    highlights: ['12+ Unicode Font Styles', 'Clean Line-Break Formatter', 'Curated Hashtags Vault', 'One-Click Quick Copy'],
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Social Media Typography and Clean Caption Formatter',
    howItWorks: [
      'Type your caption, headline, or bio copy in the input box',
      'Preview real-time styled transformations in 12+ Unicode fonts',
      'One-click copy with perfect spacing for social posting'
    ]
  },
  {
    id: 'health-calc',
    name: 'Health & Macro Nutrition Engine',
    category: 'Productivity & Utility',
    description: 'Scientific BMR (Mifflin-St Jeor) and TDEE calorie calculator with interactive macro split sliders and visual doughnut chart.',
    detailedDescription: 'Evidence-based body composition and nutritional calculator. Calculates Basal Metabolic Rate via the validated Mifflin-St Jeor equation and Total Daily Energy Expenditure (TDEE). Customize protein/carb/fat macro ratios with interactive sliders and visual pie charts.',
    route: '/health-calc',
    iconName: 'Flame',
    badge: 'Free',
    gradient: 'from-rose-500/20 via-red-500/10 to-orange-500/20',
    highlights: ['Mifflin-St Jeor BMR', 'TDEE Activity Multipliers', 'Interactive Macro Sliders', 'Visual Calorie Doughnut'],
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Scientific Fitness BMR and Macro Nutrition Targeter',
    howItWorks: [
      'Input age, gender, height, weight, and weekly activity multiplier',
      'Select primary fitness objective (Cut, Maintain, Lean Bulk)',
      'Adjust macro ratio sliders and review visual daily gram targets'
    ]
  },
  {
    id: 'markdown-editor',
    name: 'Markdown & Rich Doc Editor',
    category: 'Developer & Data',
    description: 'Live side-by-side Markdown writing workstation with instant formatting tools, word count metrics, and export to MD or HTML.',
    detailedDescription: 'Distraction-free, full-featured client-side markdown workspace. Format headings, lists, tables, and code snippets with live rendering, calculate word count and estimated reading time, and export to formatted HTML or clean markdown files.',
    route: '/markdown-editor',
    iconName: 'FileEdit',
    badge: 'Free',
    gradient: 'from-sky-500/20 via-cyan-500/10 to-blue-500/20',
    highlights: ['Side-by-Side Live Preview', 'One-Click Syntax Injector', 'Word & Read Time Stats', 'HTML & MD Export'],
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Live Markdown Document Editor and Live HTML Preview',
    howItWorks: [
      'Type or paste Markdown notes in the editor pane',
      'Use the quick formatting toolbar for headings, tables, and quotes',
      'Export as formatted HTML, Markdown, or copy to clipboard'
    ]
  },
  {
    id: 'svg-editor',
    name: 'SVG & Vector Icon Studio',
    category: 'Media & Graphics',
    description: 'Live SVG & Vector Icon Studio: Customize stroke/fill colors, scale canvas, add gradients, and export minified SVG, React JSX, or PNG.',
    detailedDescription: 'Vector graphic editing and code generation powerhouse. Paste raw SVG markup or pick from curated icon templates, adjust stroke colors and line widths, configure background gradients, and export clean minified SVG, React TSX components, or 4x Retina PNGs.',
    route: '/svg-editor',
    iconName: 'Sparkles',
    badge: 'Free',
    gradient: 'from-teal-500/20 via-cyan-500/10 to-emerald-500/20',
    highlights: ['Live Color & Stroke Editor', 'Minified Clean SVG Output', 'React JSX Exporter', '4x Retina Canvas PNG'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Live SVG Vector Icon Studio and React JSX Exporter',
    howItWorks: [
      'Paste SVG code, upload a file, or pick a vector icon preset',
      'Adjust stroke, fill, padding, rotation, and canvas backdrop',
      'Download clean minified SVG, copy React JSX, or export Retina PNG'
    ]
  },
  {
    id: 'text-diff',
    name: 'Text Diff & Code Comparator',
    category: 'Developer & Data',
    description: 'Side-by-side text/code comparator with line-by-line and character-level difference highlighting, stats, and unified patch export.',
    detailedDescription: 'Client-side Myers diff algorithm engine for developers, technical writers, and analysts. Compare text and code snippets side-by-side or in unified git-diff format, inspect char/word deltas, and export standard unified .patch files.',
    route: '/text-diff',
    iconName: 'Code2',
    badge: 'Free',
    gradient: 'from-indigo-500/20 via-blue-500/10 to-cyan-500/20',
    highlights: ['Split & Unified Views', 'Line & Char Highlights', 'Diff Metrics & Deltas', 'Git .patch Export'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    screenshotAlt: 'Side-by-Side Text Diff and Code Comparator Tool',
    howItWorks: [
      'Paste original text in left pane and modified text in right pane',
      'Toggle split or unified view with optional whitespace/case ignore',
      'Review addition/deletion statistics and copy git-formatted patch'
    ]
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    category: 'Privacy & Security',
    question: 'Are my files and documents uploaded to any remote server?',
    answer: 'Absolutely not. OmniCraft Studio operates on a 100% client-side architecture. All file conversions, PDF operations, image compressions, SVG editing, and cryptography calculations execute strictly within your browser memory (WebAssembly, Web Audio API, Canvas, and Web Crypto API). Zero bytes leave your device.'
  },
  {
    category: 'Billing & Subscription',
    question: 'What is included in the $7/month Pro Subscription?',
    answer: 'The $7/month Pro Subscription gives you unlimited, uncapped access to Pro features: Full PDF Studio export/watermarking, ATS-Optimized Resume PDF downloads, high-res vector and image exports, removal of all advertisements across the app, and continuous priority feature updates. You can cancel your subscription at any time with one click.'
  },
  {
    category: 'Commercial Use',
    question: 'Can I use generated assets (SVGs, resumes, QR codes, images) for commercial purposes?',
    answer: 'Yes. All outputs generated through OmniCraft Studio belong 100% to you. There are zero licensing restrictions or royalty requirements for commercial or personal use.'
  },
  {
    category: 'Cancellation & Billing',
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your $7/month subscription at any time without any penalties or hidden fees. Your Pro benefits remain active until the end of your current monthly billing period.'
  },
  {
    category: 'Refund Policy',
    question: 'Is there a money-back guarantee for the Pro Subscription?',
    answer: 'Yes. We provide an unconditional 30-day money-back guarantee if you are not completely satisfied with your OmniCraft Studio Pro subscription.'
  }
];
