import React, { useState } from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { AdBanner } from '../../components/layout/AdBanner';
import { downloadDataUrl } from '../../lib/utils';
import { 
  Sparkles, 
  Download, 
  ArrowLeft, 
  Image as ImageIcon, 
  RefreshCw, 
  Wand2, 
  Sliders, 
  Copy, 
  Check, 
  ShieldCheck,
  Maximize2,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AiStudioPage: React.FC = () => {
  const { isPro, openUpgradeModal } = useSubscription();

  const [prompt, setPrompt] = useState('Cyberpunk neon metropolis with floating holographic interfaces, rain reflections, volumetric lighting, ultra-detailed 8k');
  const [negativePrompt, setNegativePrompt] = useState('blurry, low quality, distorted, watermark, bad anatomy');
  const [selectedRatio, setSelectedRatio] = useState<'1:1' | '16:9' | '9:16' | '4:3'>('1:1');
  const [selectedStyle, setSelectedStyle] = useState('Cinematic');
  const [seed, setSeed] = useState<number>(42891);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string>(
    'https://image.pollinations.ai/prompt/Cyberpunk%20neon%20metropolis%20with%20floating%20holographic%20interfaces,%20rain%20reflections,%20volumetric%20lighting,%20ultra-detailed%208k%20style%20cinematic?model=flux&width=1024&height=1024&nologo=true&seed=42891'
  );
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const stylePresets = [
    { name: 'Cinematic', modifier: 'cinematic lighting, 35mm photograph, depth of field, blockbuster movie still' },
    { name: 'Photorealistic', modifier: 'shot on Sony A7R V, 85mm f/1.4 lens, hyper-realistic, photorealistic textures, studio lighting' },
    { name: 'Anime / Manga', modifier: 'Makoto Shinkai aesthetic, vibrant anime illustration, detailed linework, studio ghibli lighting' },
    { name: 'Cyberpunk', modifier: 'cyberpunk aesthetic, synthwave neon glow, dark moody reflections, futuristic tech' },
    { name: '3D Render', modifier: 'Octane render, Unreal Engine 5.4, raytracing, Pixar lighting, smooth clay and glass materials' },
    { name: 'Oil Painting', modifier: 'textured impasto oil on canvas, classical Renaissance masterwork, dramatic chiaroscuro' }
  ];

  const ratioDimensions = {
    '1:1': { width: 1024, height: 1024, label: 'Square (1:1)' },
    '16:9': { width: 1280, height: 720, label: 'Landscape (16:9)' },
    '9:16': { width: 720, height: 1280, label: 'Story / Reel (9:16)' },
    '4:3': { width: 1024, height: 768, label: 'Standard (4:3)' }
  };

  const samplePrompts = [
    'A futuristic robotic astronaut observing bioluminescent crystal caves on an alien exoplanet',
    'Minimalist architectural villa surrounded by tranquil misty pine forest, golden hour light',
    'Mythical obsidian dragon with glowing cyan runes resting atop a snowy mountain summit',
    'Vintage 1980s retro-futuristic arcade with neon signs and CRT monitor glows'
  ];

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);

    const styleObj = stylePresets.find(s => s.name === selectedStyle);
    const fullPrompt = `${prompt.trim()}${styleObj ? `, ${styleObj.modifier}` : ''}`;
    const dims = ratioDimensions[selectedRatio];

    const finalUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(fullPrompt)}?model=flux&width=${dims.width}&height=${dims.height}&nologo=true&seed=${seed}`;

    // Preload image
    const img = new Image();
    img.src = finalUrl;
    img.onload = () => {
      setGeneratedImageUrl(finalUrl);
      setIsGenerating(false);
    };
    img.onerror = () => {
      // Still set url in case of partial stream
      setGeneratedImageUrl(finalUrl);
      setIsGenerating(false);
    };
  };

  const handleRandomPrompt = () => {
    const random = samplePrompts[Math.floor(Math.random() * samplePrompts.length)];
    setPrompt(random);
    setSeed(Math.floor(Math.random() * 999999));
  };

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(prompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // High-Res Download Gateway
  const handleDownloadHighRes = async () => {
    if (!isPro) {
      openUpgradeModal('High-Resolution Uncapped AI Image Download');
      return;
    }

    try {
      const response = await fetch(generatedImageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `OmniCraft_Flux_Gen_${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch {
      window.open(generatedImageUrl, '_blank');
    }
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
            <Link to="/" className="text-slate-400 hover:text-cyan-300 flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> All Tools
            </Link>
            <span>/</span>
            <span>Media & Graphics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <Sparkles className="w-7 h-7 text-pink-400" />
            AI Image Gen & Remix Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Free zero-key Text-to-Image engine powered by Flux with style presets and aspect ratio tuning.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="download-highres-ai-btn"
            onClick={handleDownloadHighRes}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 hover:from-pink-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-pink-500/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res {!isPro && '($7 Pro)'}</span>
          </button>
        </div>
      </div>

      <div className="my-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Prompt Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-xl space-y-5">
            {/* Prompt input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                  Text Prompt
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleRandomPrompt}
                    className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
                  >
                    <Wand2 className="w-3 h-3" />
                    <span>Surprise Me</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCopyPrompt}
                    className="text-[11px] text-slate-400 hover:text-white"
                  >
                    {copiedPrompt ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </div>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what you want to visualize..."
                className="w-full p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 leading-relaxed font-sans"
              />
            </div>

            {/* Aspect Ratio Selector */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Aspect Ratio
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(Object.keys(ratioDimensions) as Array<keyof typeof ratioDimensions>).map((ratio) => (
                  <button
                    key={ratio}
                    onClick={() => setSelectedRatio(ratio)}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      selectedRatio === ratio
                        ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/60 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>

            {/* Style Presets */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Style Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {stylePresets.map((style) => (
                  <button
                    key={style.name}
                    onClick={() => setSelectedStyle(style.name)}
                    className={`p-2.5 rounded-xl text-left border transition-all ${
                      selectedStyle === style.name
                        ? 'bg-purple-500/20 text-purple-300 border-purple-500/60'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div className="text-xs font-bold">{style.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Seed & Advanced */}
            <div className="flex items-center justify-between text-xs pt-2">
              <span className="text-slate-400 font-mono">Seed: #{seed}</span>
              <button
                type="button"
                onClick={() => setSeed(Math.floor(Math.random() * 999999))}
                className="text-cyan-400 hover:text-cyan-300 text-xs flex items-center gap-1 font-mono"
              >
                <RefreshCw className="w-3 h-3" /> Randomize
              </button>
            </div>

            {/* Generate CTA Button */}
            <button
              id="generate-ai-image-btn"
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-500 hover:from-pink-500 hover:to-cyan-400 text-white font-extrabold text-sm shadow-xl shadow-pink-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Synthesizing via Flux...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-pink-200" />
                  <span>Generate AI Image (Free)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right Side: Live Image Canvas Preview */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-xl flex flex-col items-center justify-center min-h-[480px] relative overflow-hidden">
            {isGenerating && (
              <div className="absolute inset-0 z-20 bg-slate-950/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                <div className="w-12 h-12 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin mb-4" />
                <h4 className="text-base font-bold text-white mb-1">Rendering Visual Latents</h4>
                <p className="text-xs text-slate-400 font-mono">Flux Diffusion Pipeline • 1024px</p>
              </div>
            )}

            <div className="relative max-w-full rounded-2xl overflow-hidden shadow-2xl border border-slate-800 group">
              <img
                src={generatedImageUrl}
                alt="AI Generated"
                className="max-h-[520px] w-auto object-contain rounded-2xl"
                loading="eager"
                referrerPolicy="no-referrer"
              />

              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2">
                <button
                  onClick={handleDownloadHighRes}
                  className="px-3 py-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 border border-slate-700 text-xs font-bold text-white backdrop-blur-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{isPro ? 'Save High-Res' : 'Get High-Res ($7)'}</span>
                </button>
              </div>
            </div>

            <div className="w-full mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="font-mono text-cyan-400">{ratioDimensions[selectedRatio].width}x{ratioDimensions[selectedRatio].height}</span>
                <span>•</span>
                <span>Flux Engine</span>
                <span>•</span>
                <span>Commercial Output</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.open(generatedImageUrl, '_blank')}
                  className="text-cyan-400 hover:text-cyan-300 text-xs flex items-center gap-1"
                >
                  <Maximize2 className="w-3 h-3" /> Full View
                </button>
              </div>
            </div>
          </div>

          <AdBanner type="in-content" />
        </div>
      </div>
    </div>
  );
};
