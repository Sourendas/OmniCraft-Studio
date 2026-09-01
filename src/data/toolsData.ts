import { ToolItem, Testimonial, FaqItem } from '../types';

export const TOOLS_DATA: ToolItem[] = [
  {
    id: 'resume-builder',
    name: 'AI Resume & ATS Optimizer',
    category: 'Document & AI',
    description: 'Multi-step wizard with real-time ATS match scoring, AI bullet enhancer, and executive PDF generation.',
    route: '/resume-builder',
    iconName: 'FileText',
    badge: 'AI Powered',
    gradient: 'from-cyan-500/20 via-blue-500/10 to-indigo-500/20',
    highlights: ['ATS Keyword Scanner', 'AI Bullet Enhancer', 'Custom Layouts', 'Instant PDF Export']
  },
  {
    id: 'pdf-suite',
    name: 'Advanced PDF Studio',
    category: 'Document & AI',
    description: 'Visual drag-and-drop page organizer: Merge, split, rotate, watermark, and modify document metadata 100% locally.',
    route: '/pdf-suite',
    iconName: 'Layers',
    badge: 'Pro $7',
    gradient: 'from-violet-500/20 via-purple-500/10 to-fuchsia-500/20',
    highlights: ['Visual Page Reordering', 'Batch Merge & Split', 'Custom Watermarking', 'Metadata Editor']
  },
  {
    id: 'ai-studio',
    name: 'AI Image Gen & Remix',
    category: 'Media & Graphics',
    description: 'High-speed Text-to-Image and Remix generation powered by Flux with style presets and aspect ratio tuning.',
    route: '/ai-studio',
    iconName: 'Sparkles',
    badge: 'AI Powered',
    gradient: 'from-pink-500/20 via-rose-500/10 to-purple-500/20',
    highlights: ['Flux T2I Engine', 'Multiple Aspect Ratios', 'Style Presets', 'High-Res Download']
  },
  {
    id: 'file-converter',
    name: 'Universal In-Browser Converter',
    category: 'Productivity & Utility',
    description: 'Convert Images (PNG, JPG, WebP, AVIF), Audio (MP3, WAV, OGG), and Documents (DOCX to PDF, TXT) without server uploads.',
    route: '/file-converter',
    iconName: 'RefreshCw',
    badge: 'Free',
    gradient: 'from-emerald-500/20 via-teal-500/10 to-cyan-500/20',
    highlights: ['Image & Audio Engine', 'DOCX to PDF Converter', 'Zero Cloud Uploads', 'Batch Processing']
  },
  {
    id: 'image-optimizer',
    name: 'Smart Bulk Compressor',
    category: 'Media & Graphics',
    description: 'Compress images up to 90% with live side-by-side visual quality comparison, dimension resizing, and one-click bulk export.',
    route: '/image-optimizer',
    iconName: 'Minimize2',
    badge: 'Free',
    gradient: 'from-amber-500/20 via-orange-500/10 to-yellow-500/20',
    highlights: ['Up to 90% Size Reduction', 'Side-by-Side Quality Preview', 'Custom Resize & Formats', 'Bulk Download']
  },
  {
    id: 'currency-crypto',
    name: 'Live Rates & Remittance Calculator',
    category: 'Productivity & Utility',
    description: 'Real-time multi-currency fiat & crypto conversion paired with cross-border remittance fee comparison (Bank vs. Wise vs. Crypto).',
    route: '/currency-crypto',
    iconName: 'Coins',
    badge: 'Free',
    gradient: 'from-blue-500/20 via-indigo-500/10 to-cyan-500/20',
    highlights: ['Top 20 Cryptos & Fiats', 'Remittance Fee Estimator', 'Interactive SVG Trends', 'Real-Time Spreads']
  },
  {
    id: 'dev-tools',
    name: 'Developer Powerstation',
    category: 'Developer & Data',
    description: 'JSON <-> CSV bidirectional converter, SQL Formatter, RegEx Live Tester, Base64/URL encoders, and cryptographic hashes.',
    route: '/dev-tools',
    iconName: 'Terminal',
    badge: 'Free',
    gradient: 'from-teal-500/20 via-emerald-500/10 to-green-500/20',
    highlights: ['JSON / CSV Parser', 'SQL Beautifier', 'RegEx Live Tester', 'SHA-256 / Hash Generator']
  },
  {
    id: 'qr-generator',
    name: 'Custom Branded QR Studio',
    category: 'Media & Graphics',
    description: 'Create branded QR codes for URLs, Wi-Fi networks, and vCards with custom color gradients, corner styles, and vector SVG exports.',
    route: '/qr-generator',
    iconName: 'QrCode',
    badge: 'Free',
    gradient: 'from-indigo-500/20 via-purple-500/10 to-pink-500/20',
    highlights: ['URL, Wi-Fi & vCard', 'Gradient & Color Styling', 'Custom Corner Modules', 'PNG & SVG Export']
  },
  {
    id: 'social-studio',
    name: 'Social Typography & Bio Linker',
    category: 'Productivity & Utility',
    description: 'Unicode stylish font generator (Gothic, Script, Bubble) paired with Instagram/TikTok caption line breakers and hashtag curators.',
    route: '/social-studio',
    iconName: 'Type',
    badge: 'Free',
    gradient: 'from-fuchsia-500/20 via-pink-500/10 to-rose-500/20',
    highlights: ['12+ Unicode Font Styles', 'Clean Line-Break Formatter', 'Curated Hashtags Vault', 'One-Click Quick Copy']
  },
  {
    id: 'health-calc',
    name: 'Fitness & Macro Targeter',
    category: 'Productivity & Utility',
    description: 'Scientific BMR (Mifflin-St Jeor) and TDEE calorie calculator with interactive macro split sliders and visual doughnut chart.',
    route: '/health-calc',
    iconName: 'Flame',
    badge: 'Free',
    gradient: 'from-rose-500/20 via-red-500/10 to-orange-500/20',
    highlights: ['Mifflin-St Jeor BMR', 'TDEE Activity Multipliers', 'Interactive Macro Sliders', 'Visual Calorie Doughnut']
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: '1',
    name: 'Alex M***',
    role: 'Senior Frontend Engineer',
    company: 'Fintech Scaleup',
    avatarText: 'AM',
    avatarBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    stars: 5,
    quote: 'The client-side PDF editor and DOCX converter saved our team hours of compliance headaches. Not having to upload sensitive enterprise contracts to random third-party servers is huge.',
    toolUsed: 'PDF Studio & Converter',
    verified: true
  },
  {
    id: '2',
    name: 'Elena R***',
    role: 'Digital Marketer',
    company: 'Growth Agency',
    avatarText: 'ER',
    avatarBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    stars: 5,
    quote: 'The AI resume builder tailored my CV for ATS keywords and got me 4 interview callbacks in one week. The bullet point suggestions felt completely human and impactful.',
    toolUsed: 'AI Resume Builder',
    verified: true
  },
  {
    id: '3',
    name: 'Marcus V***',
    role: 'Content Creator',
    company: 'YouTube / 240k Subs',
    avatarText: 'MV',
    avatarBg: 'bg-pink-500/20 text-pink-300 border-pink-500/30',
    stars: 5,
    quote: 'T2I Flux image generation without API rate limits right in the browser is unbeatable. I mock up thumbnail backgrounds and social banners in seconds.',
    toolUsed: 'AI Image Studio',
    verified: true
  },
  {
    id: '4',
    name: 'Priya S***',
    role: 'Freelance Designer',
    company: 'Studio Craft',
    avatarText: 'PS',
    avatarBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    stars: 5,
    quote: 'The universal file converter handles my WebP to PNG and audio conversions without uploading private client files. The bulk compressor cut my web assets by 82% with zero artifacting.',
    toolUsed: 'Smart Image Compressor',
    verified: true
  },
  {
    id: '5',
    name: 'David K***',
    role: 'Startup Founder',
    company: 'SaaS Labs',
    avatarText: 'DK',
    avatarBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    stars: 5,
    quote: 'Worth every penny of the $7 lifetime pass. Clean, fast, zero ads on Pro, and having 10 powerhouse tools in a single pinned tab replaced 4 separate subscription apps.',
    toolUsed: 'OmniCraft Pro Member',
    verified: true
  },
  {
    id: '6',
    name: 'Sarah T***',
    role: 'Product Manager',
    company: 'Global Media',
    avatarText: 'ST',
    avatarBg: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    stars: 5,
    quote: 'The exact tool suite I keep pinned on my browser bar every single day. From developer JSON debugging to quick QR code assets and currency comparisons, it never lags.',
    toolUsed: 'Developer Powerstation',
    verified: true
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    category: 'Privacy & Security',
    question: 'Are my files and documents uploaded to any remote server?',
    answer: 'Absolutely not. OmniCraft Studio operates on a 100% client-side architecture. All file conversions, PDF operations, image compressions, and cryptography calculations execute strictly within your browser memory (WebAssembly, Web Audio API, Canvas, and Web Crypto API). Zero bytes leave your device.'
  },
  {
    category: 'Billing & Lifetime Pass',
    question: 'What is included in the $7 Pro Upgrade?',
    answer: 'The $7 Pro Pass gives you unlimited lifetime access to Pro features: Uncapped High-Resolution AI Image Downloads, Full PDF Studio export/watermarking, ATS-Optimized Resume PDF downloads, removal of all advertisements, and lifetime priority updates.'
  },
  {
    category: 'Commercial Use',
    question: 'Can I use generated assets (images, resumes, QR codes) for commercial purposes?',
    answer: 'Yes. All outputs generated through OmniCraft Studio belong 100% to you. There are zero licensing restrictions or royalty requirements for commercial or personal use.'
  },
  {
    category: 'Compatibility',
    question: 'Which browsers and devices are supported?',
    answer: 'OmniCraft Studio runs seamlessly on all modern desktop and mobile browsers including Google Chrome, Apple Safari, Mozilla Firefox, Microsoft Edge, and Brave. No desktop software or plugins required.'
  },
  {
    category: 'Refund Policy',
    question: 'Is there a money-back guarantee for the Pro Upgrade?',
    answer: 'Yes. We provide an unconditional 30-day money-back guarantee if you are not completely satisfied with your OmniCraft Studio Pro experience.'
  }
];
