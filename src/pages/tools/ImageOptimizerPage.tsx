import React, { useState } from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { AdBanner } from '../../components/layout/AdBanner';
import { downloadBlob, formatBytes } from '../../lib/utils';
import { 
  Minimize2, 
  Upload, 
  Download, 
  Sliders, 
  ArrowLeft, 
  Sparkles, 
  Check, 
  Trash2, 
  Image as ImageIcon,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface OptimizedImageItem {
  id: string;
  originalFile: File;
  name: string;
  originalSize: number;
  compressedSize: number;
  originalDataUrl: string;
  compressedDataUrl: string;
  compressedBlob: Blob;
  savingsPercentage: number;
  width: number;
  height: number;
}

export const ImageOptimizerPage: React.FC = () => {
  const { isPro } = useSubscription();

  const [images, setImages] = useState<OptimizedImageItem[]>([]);
  const [quality, setQuality] = useState<number>(0.75);
  const [scalePercent, setScalePercent] = useState<number>(100);
  const [format, setFormat] = useState<'image/webp' | 'image/jpeg' | 'image/png'>('image/webp');
  const [isCompressing, setIsCompressing] = useState<boolean>(false);

  const processFile = (file: File): Promise<OptimizedImageItem> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const img = new Image();
        img.onload = () => {
          const targetW = Math.round((img.width * scalePercent) / 100);
          const targetH = Math.round((img.height * scalePercent) / 100);

          const canvas = document.createElement('canvas');
          canvas.width = targetW;
          canvas.height = targetH;
          const ctx = canvas.getContext('2d');
          if (!ctx) return reject('No canvas context');

          ctx.drawImage(img, 0, 0, targetW, targetH);

          canvas.toBlob(
            (blob) => {
              if (!blob) return reject('Compression error');
              const compressedUrl = URL.createObjectURL(blob);
              const savings = Math.max(0, Math.round(((file.size - blob.size) / file.size) * 100));

              resolve({
                id: `${Date.now()}-${Math.random()}`,
                originalFile: file,
                name: file.name,
                originalSize: file.size,
                compressedSize: blob.size,
                originalDataUrl: dataUrl,
                compressedDataUrl: compressedUrl,
                compressedBlob: blob,
                savingsPercentage: savings,
                width: targetW,
                height: targetH
              });
            },
            format,
            quality
          );
        };
        img.onerror = () => reject('Image load failed');
        img.src = dataUrl;
      };
      reader.onerror = () => reject('File read failed');
      reader.readAsDataURL(file);
    });
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded || uploaded.length === 0) return;

    setIsCompressing(true);
    try {
      const processed: OptimizedImageItem[] = [];
      for (let i = 0; i < uploaded.length; i++) {
        if (!uploaded[i].type.startsWith('image/')) continue;
        const res = await processFile(uploaded[i]);
        processed.push(res);
      }
      setImages(prev => [...prev, ...processed]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCompressing(false);
    }
  };

  const recompressAll = async (newQuality = quality, newScale = scalePercent, newFormat = format) => {
    if (images.length === 0) return;
    setIsCompressing(true);
    try {
      const reprocessed: OptimizedImageItem[] = [];
      for (const item of images) {
        const res = await processFile(item.originalFile);
        reprocessed.push(res);
      }
      setImages(reprocessed);
    } catch (err) {
      console.error(err);
    } finally {
      setIsCompressing(false);
    }
  };

  const handleDownloadAll = () => {
    images.forEach((img) => {
      const ext = format === 'image/webp' ? 'webp' : format === 'image/jpeg' ? 'jpg' : 'png';
      const cleanName = img.name.substring(0, img.name.lastIndexOf('.')) || img.name;
      downloadBlob(img.compressedBlob, `${cleanName}_optimized.${ext}`);
    });
  };

  const totalOriginal = images.reduce((acc, i) => acc + i.originalSize, 0);
  const totalCompressed = images.reduce((acc, i) => acc + i.compressedSize, 0);
  const totalSavings = totalOriginal > 0 ? Math.round(((totalOriginal - totalCompressed) / totalOriginal) * 100) : 0;

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
            <Minimize2 className="w-7 h-7 text-amber-400" />
            Smart Bulk Image Compressor
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Reduce image payloads up to 90% in browser canvas without sacrificing visual fidelity.
          </p>
        </div>

        {images.length > 0 && (
          <button
            onClick={handleDownloadAll}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white text-xs font-bold shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>Download All ({images.length})</span>
          </button>
        )}
      </div>

      {/* Overview Stats Ribbon if images exist */}
      {images.length > 0 && (
        <div className="my-6 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-6">
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Original Total</span>
              <div className="text-sm font-bold text-slate-200">{formatBytes(totalOriginal)}</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Compressed Total</span>
              <div className="text-sm font-bold text-emerald-400">{formatBytes(totalCompressed)}</div>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-mono">Net Bandwidth Saved</span>
              <div className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                {totalSavings}% Less Data
              </div>
            </div>
          </div>

          <button
            onClick={() => setImages([])}
            className="text-xs text-slate-500 hover:text-rose-400 transition-colors"
          >
            Clear All Images
          </button>
        </div>
      )}

      <div className="my-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Parameters Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-6 backdrop-blur-xl space-y-5">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-400" />
              <span>Compression Tuning</span>
            </h3>

            {/* Quality Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                <span>Visual Quality</span>
                <span className="font-mono text-amber-300">{Math.round(quality * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.95"
                step="0.05"
                value={quality}
                onChange={(e) => {
                  const val = parseFloat(e.target.value);
                  setQuality(val);
                  recompressAll(val, scalePercent, format);
                }}
                className="w-full accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>Maximum Savings (10%)</span>
                <span>Lossless Quality (95%)</span>
              </div>
            </div>

            {/* Scale Resize Slider */}
            <div>
              <div className="flex justify-between text-xs text-slate-300 mb-1.5 font-medium">
                <span>Dimensions Scaling</span>
                <span className="font-mono text-cyan-300">{scalePercent}%</span>
              </div>
              <input
                type="range"
                min="25"
                max="100"
                step="5"
                value={scalePercent}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  setScalePercent(val);
                  recompressAll(quality, val, format);
                }}
                className="w-full accent-cyan-400"
              />
            </div>

            {/* Target Output Format */}
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-2">
                Output Format
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: 'WebP (Best)', val: 'image/webp' as const },
                  { label: 'JPEG', val: 'image/jpeg' as const },
                  { label: 'PNG', val: 'image/png' as const }
                ].map((f) => (
                  <button
                    key={f.val}
                    onClick={() => {
                      setFormat(f.val);
                      recompressAll(quality, scalePercent, f.val);
                    }}
                    className={`py-2 px-2 rounded-xl text-xs font-semibold border transition-all ${
                      format === f.val
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/60'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AdBanner type="sidebar" />
        </div>

        {/* Right Side: Dropzone & Gallery */}
        <div className="lg:col-span-8 space-y-6">
          <div className="relative rounded-3xl border-2 border-dashed border-slate-800 hover:border-amber-500/50 bg-slate-900/40 p-8 text-center backdrop-blur-xl transition-all">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-amber-600/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center">
              <Upload className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">
              Select or Drop Images to Compress
            </h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              PNG, JPG, WebP, AVIF up to 50MB. Instant canvas batch optimization.
            </p>
          </div>

          {images.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 flex flex-col justify-between backdrop-blur-xl"
                >
                  <div>
                    <div className="relative rounded-xl overflow-hidden bg-slate-950 border border-slate-800 h-40 flex items-center justify-center mb-3">
                      <img
                        src={item.compressedDataUrl}
                        alt="Optimized Preview"
                        className="max-h-full max-w-full object-contain"
                      />
                      <span className="absolute top-2 right-2 text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 font-mono">
                        -{item.savingsPercentage}%
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-white truncate" title={item.name}>
                      {item.name}
                    </h4>

                    <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1 font-mono">
                      <span>{formatBytes(item.originalSize)}</span>
                      <span>→</span>
                      <span className="text-emerald-400 font-bold">{formatBytes(item.compressedSize)}</span>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[10px] text-slate-500 font-mono">
                      {item.width}x{item.height}px
                    </span>
                    <button
                      onClick={() => {
                        const ext = format === 'image/webp' ? 'webp' : format === 'image/jpeg' ? 'jpg' : 'png';
                        downloadBlob(item.compressedBlob, `${item.name.replace(/\.[^/.]+$/, '')}_opt.${ext}`);
                      }}
                      className="flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-white px-2.5 py-1 rounded-lg bg-amber-950/60 border border-amber-700/50"
                    >
                      <Download className="w-3 h-3" />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
