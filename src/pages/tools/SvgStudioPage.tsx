import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Download, 
  Copy, 
  Check, 
  Upload, 
  Sparkles, 
  Code2, 
  Layers, 
  Palette, 
  Sliders, 
  RotateCw, 
  Maximize2, 
  FileCode, 
  ShieldCheck, 
  RefreshCw,
  Eye,
  CheckCircle2,
  Trash2,
  Lock
} from 'lucide-react';
import { useSubscription } from '../../context/SubscriptionContext';

const PRESET_SVGS: { name: string; icon: string; svg: string }[] = [
  {
    name: 'Shield Lock',
    icon: '🛡️',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
  <path d="m9 12 2 2 4-4"/>
</svg>`
  },
  {
    name: 'Lightning Zap',
    icon: '⚡',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
</svg>`
  },
  {
    name: 'Rocket Launch',
    icon: '🚀',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
  <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
</svg>`
  },
  {
    name: 'Heart Pulse',
    icon: '❤️',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
  <path d="M3.22 12H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"/>
</svg>`
  },
  {
    name: 'Code Terminal',
    icon: '💻',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polyline points="4 17 10 11 4 5"/>
  <line x1="12" y1="19" x2="20" y2="19"/>
</svg>`
  },
  {
    name: 'Star Badge',
    icon: '⭐',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
</svg>`
  },
  {
    name: 'Microchip CPU',
    icon: '⚡',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <rect width="16" height="16" x="4" y="4" rx="2"/>
  <rect width="6" height="6" x="9" y="9" rx="1"/>
  <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3"/>
</svg>`
  },
  {
    name: 'Globe World',
    icon: '🌐',
    svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"/>
  <line x1="2" y1="12" x2="22" y2="12"/>
  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
</svg>`
  }
];

export const SvgStudioPage: React.FC = () => {
  const { isPro, openUpgradeModal } = useSubscription();

  // SVG Source State
  const [rawSvg, setRawSvg] = useState<string>(PRESET_SVGS[0].svg);
  const [svgName, setSvgName] = useState<string>('vector-icon');

  // Customization controls
  const [strokeColor, setStrokeColor] = useState<string>('#00A3AD');
  const [fillColor, setFillColor] = useState<string>('transparent');
  const [strokeWidth, setStrokeWidth] = useState<number>(2);
  const [canvasSize, setCanvasSize] = useState<number>(256);
  const [padding, setPadding] = useState<number>(32);
  const [rotation, setRotation] = useState<number>(0);
  const [borderRadius, setBorderRadius] = useState<number>(24);
  const [dropShadow, setDropShadow] = useState<boolean>(true);
  
  // Background Styling
  const [bgType, setBgType] = useState<'transparent' | 'solid' | 'gradient' | 'dark'>('gradient');
  const [bgColor, setBgColor] = useState<string>('#FFFFFF');
  const [gradientStart, setGradientStart] = useState<string>('#E6F8F9');
  const [gradientEnd, setGradientEnd] = useState<string>('#FFFFFF');

  // Active view tab
  const [activeTab, setActiveTab] = useState<'visual' | 'code' | 'react'>('visual');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Hidden file input ref
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);

  // Parse and sanitize SVG markup with our user styles applied
  const getRenderableSvg = () => {
    try {
      let cleaned = rawSvg.trim();
      if (!cleaned.includes('<svg')) {
        return `<svg viewBox="0 0 24 24" fill="none"><text x="2" y="15" fill="#e11d48" font-size="3">Invalid SVG</text></svg>`;
      }

      // Modify stroke and fill if not none/specified
      cleaned = cleaned.replace(/stroke="[^"]*"/g, `stroke="${strokeColor}"`);
      cleaned = cleaned.replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`);
      if (fillColor !== 'transparent') {
        cleaned = cleaned.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);
      }

      return cleaned;
    } catch {
      return rawSvg;
    }
  };

  // Generate Minified Clean SVG
  const getMinifiedSvg = () => {
    let svg = getRenderableSvg();
    // remove comments, xml declarations, extra spaces
    svg = svg
      .replace(/<!--[\s\S]*?-->/g, '')
      .replace(/<\?xml[\s\S]*?\?>/g, '')
      .replace(/\s+/g, ' ')
      .replace(/> </g, '><')
      .trim();
    return svg;
  };

  // Generate React JSX Component
  const getReactJsxComponent = () => {
    const componentName = svgName
      .replace(/[^a-zA-Z0-9]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join('') || 'CustomIcon';

    // Convert SVG attributes to camelCase for JSX
    let jsxBody = getRenderableSvg()
      .replace(/stroke-width/g, 'strokeWidth')
      .replace(/stroke-linecap/g, 'strokeLinecap')
      .replace(/stroke-linejoin/g, 'strokeLinejoin')
      .replace(/fill-rule/g, 'fillRule')
      .replace(/clip-rule/g, 'clipRule')
      .replace(/class=/g, 'className=');

    // Add {...props} to opening tag
    jsxBody = jsxBody.replace(/<svg([^>]*)>/, `<svg$1 className={className} {...props}>`);

    return `import React from 'react';

export interface ${componentName}Props extends React.SVGProps<SVGSVGElement> {
  className?: string;
}

export const ${componentName}: React.FC<${componentName}Props> = ({ className = "w-6 h-6", ...props }) => (
  ${jsxBody}
);

export default ${componentName};`;
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const content = evt.target?.result as string;
      if (content && content.includes('<svg')) {
        setRawSvg(content);
        setSvgName(file.name.replace(/\.svg$/i, ''));
      }
    };
    reader.readAsText(file);
  };

  const copyToClipboard = async (text: string, type: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const downloadSvgFile = () => {
    const blob = new Blob([getMinifiedSvg()], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${svgName || 'vector-icon'}.svg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadPngRaster = (scaleMultiplier: number = 2) => {
    const exportWidth = canvasSize * scaleMultiplier;
    const exportHeight = canvasSize * scaleMultiplier;

    const canvas = document.createElement('canvas');
    canvas.width = exportWidth;
    canvas.height = exportHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Draw background
    if (bgType === 'solid') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, exportWidth, exportHeight);
    } else if (bgType === 'gradient') {
      const grad = ctx.createLinearGradient(0, 0, exportWidth, exportHeight);
      grad.addColorStop(0, gradientStart);
      grad.addColorStop(1, gradientEnd);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, exportWidth, exportHeight);
    } else if (bgType === 'dark') {
      ctx.fillStyle = '#0A2540';
      ctx.fillRect(0, 0, exportWidth, exportHeight);
    }

    // Convert SVG to data url and draw onto canvas
    const svgString = getMinifiedSvg();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    const img = new Image();

    img.onload = () => {
      ctx.save();
      // Center and rotate
      const cx = exportWidth / 2;
      const cy = exportHeight / 2;
      ctx.translate(cx, cy);
      ctx.rotate((rotation * Math.PI) / 180);

      const drawSize = exportWidth - (padding * 2 * scaleMultiplier);
      ctx.drawImage(img, -drawSize / 2, -drawSize / 2, drawSize, drawSize);
      ctx.restore();

      URL.revokeObjectURL(url);

      const pngUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = pngUrl;
      a.download = `${svgName || 'vector-icon'}-${exportWidth}x${exportHeight}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };

    img.src = url;
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-3 mb-1.5">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#00A3AD] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Studio Tools</span>
            </Link>
            <span className="text-slate-300">•</span>
            <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF]">
              100% Client-Side Vector Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight">
            SVG & Vector Icon Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Paste, customize, recolor, and export vector graphics to clean minified SVG, React JSX components, or high-res PNGs.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".svg,image/svg+xml"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            <Upload className="w-3.5 h-3.5 text-[#00A3AD]" />
            <span>Upload SVG</span>
          </button>

          <button
            onClick={downloadSvgFile}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00A3AD] hover:bg-[#008C95] text-white text-xs font-black shadow-md shadow-teal-500/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download SVG</span>
          </button>

          <button
            onClick={() => downloadPngRaster(isPro ? 4 : 2)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0A2540] hover:bg-[#153A5E] text-white text-xs font-black shadow-md shadow-slate-900/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export PNG ({isPro ? '4x Retina' : '2x HD'})</span>
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Controls & Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Quick Presets Picker */}
          <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
                Preset Vector Templates
              </span>
              <span className="text-[11px] text-slate-500 font-medium">Click to load</span>
            </div>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
              {PRESET_SVGS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    setRawSvg(preset.svg);
                    setSvgName(preset.name.toLowerCase().replace(/\s+/g, '-'));
                  }}
                  className="p-2.5 rounded-2xl bg-[#F8FBFC] hover:bg-[#E6F8F9] border border-slate-200/80 hover:border-[#00A3AD] transition-all flex flex-col items-center gap-1 cursor-pointer group text-center"
                  title={preset.name}
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">{preset.icon}</span>
                  <span className="text-[9px] font-bold text-slate-600 truncate w-full group-hover:text-[#007A82]">
                    {preset.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Tab Navigation: Visual Controls vs Code Editor vs React JSX */}
          <div className="rounded-3xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
            <div className="flex items-center border-b border-slate-100 bg-[#F8FBFC] p-1.5">
              <button
                onClick={() => setActiveTab('visual')}
                className={`flex-1 py-2.5 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'visual'
                    ? 'bg-white text-[#0A2540] shadow-2xs border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Sliders className="w-3.5 h-3.5 text-[#00A3AD]" />
                <span>Visual Styling</span>
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`flex-1 py-2.5 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'code'
                    ? 'bg-white text-[#0A2540] shadow-2xs border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <FileCode className="w-3.5 h-3.5 text-[#00A3AD]" />
                <span>Raw SVG Code</span>
              </button>
              <button
                onClick={() => setActiveTab('react')}
                className={`flex-1 py-2.5 px-4 rounded-2xl text-xs font-black flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  activeTab === 'react'
                    ? 'bg-white text-[#0A2540] shadow-2xs border border-slate-200/60'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-[#00A3AD]" />
                <span>React Component</span>
              </button>
            </div>

            <div className="p-6">
              {activeTab === 'visual' && (
                <div className="space-y-5">
                  {/* Colors Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-black text-[#0A2540] mb-1.5">
                        Stroke Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={strokeColor}
                          onChange={(e) => setStrokeColor(e.target.value)}
                          className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5 bg-white shrink-0"
                        />
                        <input
                          type="text"
                          value={strokeColor}
                          onChange={(e) => setStrokeColor(e.target.value)}
                          className="w-full text-xs font-mono px-3 py-2 rounded-xl bg-[#F8FBFC] border border-slate-200 font-bold text-slate-700"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-[#0A2540] mb-1.5">
                        Fill Color
                      </label>
                      <div className="flex items-center gap-2">
                        <input
                          type="color"
                          value={fillColor === 'transparent' ? '#FFFFFF' : fillColor}
                          onChange={(e) => setFillColor(e.target.value)}
                          className="w-9 h-9 rounded-xl border border-slate-200 cursor-pointer p-0.5 bg-white shrink-0"
                        />
                        <div className="flex items-center gap-1.5 w-full">
                          <input
                            type="text"
                            value={fillColor}
                            onChange={(e) => setFillColor(e.target.value)}
                            className="w-full text-xs font-mono px-3 py-2 rounded-xl bg-[#F8FBFC] border border-slate-200 font-bold text-slate-700"
                          />
                          <button
                            onClick={() => setFillColor('transparent')}
                            className="px-2.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-[10px] font-mono font-bold text-slate-600 shrink-0"
                          >
                            None
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sliders: Stroke Width, Rotation, Padding */}
                  <div className="space-y-4 pt-2 border-t border-slate-100">
                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#0A2540] mb-1">
                        <span>Stroke Width</span>
                        <span className="font-mono text-[#007A82]">{strokeWidth}px</span>
                      </div>
                      <input
                        type="range"
                        min="0.5"
                        max="8"
                        step="0.5"
                        value={strokeWidth}
                        onChange={(e) => setStrokeWidth(parseFloat(e.target.value))}
                        className="w-full accent-[#00A3AD] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#0A2540] mb-1">
                        <span>Inner Padding</span>
                        <span className="font-mono text-[#007A82]">{padding}px</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="80"
                        value={padding}
                        onChange={(e) => setPadding(parseInt(e.target.value))}
                        className="w-full accent-[#00A3AD] cursor-pointer"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#0A2540] mb-1">
                        <span>Rotation Angle</span>
                        <span className="font-mono text-[#007A82]">{rotation}°</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        step="15"
                        value={rotation}
                        onChange={(e) => setRotation(parseInt(e.target.value))}
                        className="w-full accent-[#00A3AD] cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Canvas Background Settings */}
                  <div className="pt-4 border-t border-slate-100 space-y-3">
                    <label className="block text-xs font-black text-[#0A2540]">
                      Canvas Backdrop Style
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'gradient', label: 'Cyan Glow' },
                        { id: 'transparent', label: 'Transparent' },
                        { id: 'solid', label: 'Solid White' },
                        { id: 'dark', label: 'Dark Slate' }
                      ].map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setBgType(b.id as any)}
                          className={`p-2.5 rounded-2xl text-xs font-bold border transition-all cursor-pointer ${
                            bgType === b.id
                              ? 'bg-[#E6F8F9] border-[#00A3AD] text-[#007A82]'
                              : 'bg-[#F8FBFC] border-slate-200 text-slate-600 hover:bg-white'
                          }`}
                        >
                          {b.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'code' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Edit or paste raw SVG markup:</span>
                    <button
                      onClick={() => copyToClipboard(getMinifiedSvg(), 'svg')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E6F8F9] hover:bg-[#D0F2F5] text-[#007A82] text-xs font-bold transition-all cursor-pointer"
                    >
                      {copiedType === 'svg' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedType === 'svg' ? 'Copied Clean SVG!' : 'Copy Minified SVG'}</span>
                    </button>
                  </div>
                  <textarea
                    value={rawSvg}
                    onChange={(e) => setRawSvg(e.target.value)}
                    rows={12}
                    className="w-full p-4 rounded-2xl bg-[#0A2540] text-cyan-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#00A3AD] leading-relaxed resize-y"
                    placeholder="<svg ...></svg>"
                  />
                </div>
              )}

              {activeTab === 'react' && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">Ready-to-use TypeScript JSX component:</span>
                    <button
                      onClick={() => copyToClipboard(getReactJsxComponent(), 'react')}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E6F8F9] hover:bg-[#D0F2F5] text-[#007A82] text-xs font-bold transition-all cursor-pointer"
                    >
                      {copiedType === 'react' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedType === 'react' ? 'Copied Component!' : 'Copy React Component'}</span>
                    </button>
                  </div>
                  <pre className="p-4 rounded-2xl bg-[#0A2540] text-emerald-400 font-mono text-xs overflow-x-auto leading-relaxed max-h-[350px]">
                    {getReactJsxComponent()}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Live Canvas & Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-2xs">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
                Live Render Stage
              </span>
              <span className="text-[11px] font-mono font-bold text-[#007A82]">
                {canvasSize} × {canvasSize} px
              </span>
            </div>

            {/* Canvas Stage */}
            <div 
              ref={previewContainerRef}
              className={`w-full aspect-square rounded-3xl flex items-center justify-center p-8 transition-all overflow-hidden relative ${
                dropShadow ? 'shadow-xl' : ''
              } ${
                bgType === 'transparent'
                  ? 'bg-[linear-gradient(45deg,#f0f0f0_25%,transparent_25%),linear-gradient(-45deg,#f0f0f0_25%,transparent_25%),linear-gradient(45deg,transparent_75%,#f0f0f0_75%),linear-gradient(-45deg,transparent_75%,#f0f0f0_75%)] bg-[size:20px_20px] bg-[position:0_0,0_10px,10px_-10px,-10px_0px] border border-slate-200'
                  : bgType === 'gradient'
                  ? 'bg-gradient-to-br from-[#E6F8F9] via-white to-[#E6F8F9] border border-[#B3EAEF]'
                  : bgType === 'dark'
                  ? 'bg-[#0A2540] border border-slate-800'
                  : 'bg-white border border-slate-200'
              }`}
            >
              <div
                style={{
                  transform: `rotate(${rotation}deg)`,
                  padding: `${padding}px`,
                  transition: 'transform 0.2s ease'
                }}
                className="w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ __html: getRenderableSvg() }}
              />
            </div>

            {/* Quick Actions Footer */}
            <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Rendered 100% In-Browser</span>
              </div>

              <button
                onClick={() => {
                  setStrokeColor('#00A3AD');
                  setFillColor('transparent');
                  setStrokeWidth(2);
                  setRotation(0);
                  setPadding(32);
                  setBgType('gradient');
                }}
                className="flex items-center gap-1 text-[11px] font-bold text-slate-400 hover:text-slate-700 transition-colors"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset Defaults</span>
              </button>
            </div>
          </div>

          {/* Export Formats Breakdown Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0A2540] to-[#0D3052] text-white shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#00A3AD]" />
              <span>Multi-Format Output Hub</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Export pixel-perfect vector and raster assets instantly. Minified SVG for zero-payload web bundles, React TSX for codebases, and Canvas PNG for marketing banners.
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2">
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-cyan-300 font-bold block">Vector SVG</span>
                <span className="text-[10px] text-slate-400">Zero Loss / Scalable</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                <span className="text-cyan-300 font-bold block">Canvas PNG</span>
                <span className="text-[10px] text-slate-400">Up to 4x Retina</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
