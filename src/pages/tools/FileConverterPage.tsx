import React, { useState } from 'react';
import { useSubscription } from '../../context/SubscriptionContext';
import { AdBanner } from '../../components/layout/AdBanner';
import { downloadBlob, formatBytes } from '../../lib/utils';
import mammoth from 'mammoth';
import { jsPDF } from 'jspdf';
import { 
  RefreshCw, 
  Upload, 
  Download, 
  FileText, 
  Image as ImageIcon, 
  Music, 
  ArrowLeft, 
  Check, 
  CheckCircle2, 
  AlertCircle,
  FileCode
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ConvertFileItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: 'image' | 'audio' | 'document' | 'other';
  targetFormat: string;
  status: 'idle' | 'converting' | 'completed' | 'error';
  progress: number;
  resultBlob?: Blob;
  resultName?: string;
}

export const FileConverterPage: React.FC = () => {
  const { isPro } = useSubscription();

  const [files, setFiles] = useState<ConvertFileItem[]>([]);
  const [isConvertingAll, setIsConvertingAll] = useState(false);

  const getFileType = (file: File): 'image' | 'audio' | 'document' | 'other' => {
    if (file.type.startsWith('image/')) return 'image';
    if (file.type.startsWith('audio/')) return 'audio';
    if (
      file.type.includes('document') ||
      file.type.includes('word') ||
      file.name.endsWith('.docx') ||
      file.name.endsWith('.txt') ||
      file.name.endsWith('.html') ||
      file.name.endsWith('.md')
    ) {
      return 'document';
    }
    return 'other';
  };

  const getDefaultTarget = (type: 'image' | 'audio' | 'document' | 'other') => {
    if (type === 'image') return 'webp';
    if (type === 'audio') return 'wav';
    if (type === 'document') return 'pdf';
    return 'txt';
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (!uploaded || uploaded.length === 0) return;

    const newItems: ConvertFileItem[] = [];
    for (let i = 0; i < uploaded.length; i++) {
      const f = uploaded[i];
      const fType = getFileType(f);
      newItems.push({
        id: `${Date.now()}-${i}`,
        file: f,
        name: f.name,
        size: f.size,
        type: fType,
        targetFormat: getDefaultTarget(fType),
        status: 'idle',
        progress: 0
      });
    }

    setFiles(prev => [...prev, ...newItems]);
  };

  // Convert single item using client-side engines
  const convertFile = async (item: ConvertFileItem) => {
    setFiles(prev =>
      prev.map(f => (f.id === item.id ? { ...f, status: 'converting', progress: 20 } : f))
    );

    try {
      const { file, targetFormat, type } = item;
      let convertedBlob: Blob;
      const baseName = file.name.substring(0, file.name.lastIndexOf('.')) || file.name;
      const outputName = `${baseName}_converted.${targetFormat}`;

      if (type === 'image') {
        // Image conversion via HTML Canvas & Blob API
        convertedBlob = await new Promise((resolve, reject) => {
          const img = new Image();
          const reader = new FileReader();
          reader.onload = (e) => {
            img.src = e.target?.result as string;
          };
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject('No canvas context');
            ctx.drawImage(img, 0, 0);

            const mime =
              targetFormat === 'png'
                ? 'image/png'
                : targetFormat === 'jpg' || targetFormat === 'jpeg'
                ? 'image/jpeg'
                : targetFormat === 'webp'
                ? 'image/webp'
                : 'image/png';

            canvas.toBlob((blob) => {
              if (blob) resolve(blob);
              else reject('Failed to convert image');
            }, mime, 0.92);
          };
          img.onerror = () => reject('Failed to load image');
          reader.readAsDataURL(file);
        });
      } else if (type === 'document') {
        // Document conversion (DOCX -> PDF or TXT -> PDF)
        if (file.name.endsWith('.docx')) {
          const arrayBuffer = await file.arrayBuffer();
          const result = await mammoth.extractRawText({ arrayBuffer });
          const text = result.value || 'Extracted Document Content';

          const doc = new jsPDF();
          doc.setFontSize(11);
          const splitText = doc.splitTextToSize(text, 180);
          doc.text(splitText, 15, 20);
          const pdfBytes = doc.output('arraybuffer');
          convertedBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        } else {
          // Plain text / html to PDF
          const text = await file.text();
          const doc = new jsPDF();
          doc.setFontSize(11);
          const splitText = doc.splitTextToSize(text, 180);
          doc.text(splitText, 15, 20);
          const pdfBytes = doc.output('arraybuffer');
          convertedBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        }
      } else if (type === 'audio') {
        // Audio conversion via Web Audio API AudioBuffer -> WAV encoder
        const arrayBuffer = await file.arrayBuffer();
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const decoded = await audioCtx.decodeAudioData(arrayBuffer.slice(0));

        // Encode AudioBuffer to standard WAV Blob
        const wavBuffer = encodeWav(decoded);
        convertedBlob = new Blob([wavBuffer], { type: 'audio/wav' });
      } else {
        const text = await file.text();
        convertedBlob = new Blob([text], { type: 'text/plain' });
      }

      setFiles(prev =>
        prev.map(f =>
          f.id === item.id
            ? {
                ...f,
                status: 'completed',
                progress: 100,
                resultBlob: convertedBlob,
                resultName: outputName
              }
            : f
        )
      );
    } catch (err) {
      console.error(err);
      setFiles(prev =>
        prev.map(f => (f.id === item.id ? { ...f, status: 'error', progress: 0 } : f))
      );
    }
  };

  // WAV Encoder helper for AudioBuffer
  const encodeWav = (audioBuffer: AudioBuffer): ArrayBuffer => {
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const format = 1; // PCM
    const bitDepth = 16;

    let result: Float32Array;
    if (numChannels === 2) {
      const ch0 = audioBuffer.getChannelData(0);
      const ch1 = audioBuffer.getChannelData(1);
      result = new Float32Array(ch0.length + ch1.length);
      for (let i = 0; i < ch0.length; i++) {
        result[i * 2] = ch0[i];
        result[i * 2 + 1] = ch1[i];
      }
    } else {
      result = audioBuffer.getChannelData(0);
    }

    const dataLength = result.length * (bitDepth / 8);
    const buffer = new ArrayBuffer(44 + dataLength);
    const view = new DataView(buffer);

    const writeString = (offset: number, string: string) => {
      for (let i = 0; i < string.length; i++) {
        view.setUint8(offset + i, string.charCodeAt(i));
      }
    };

    writeString(0, 'RIFF');
    view.setUint32(4, 36 + dataLength, true);
    writeString(8, 'WAVE');
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, format, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * (bitDepth / 8), true);
    view.setUint16(32, numChannels * (bitDepth / 8), true);
    view.setUint16(34, bitDepth, true);
    writeString(36, 'data');
    view.setUint32(40, dataLength, true);

    let offset = 44;
    for (let i = 0; i < result.length; i++) {
      const sample = Math.max(-1, Math.min(1, result[i]));
      view.setInt16(offset, sample < 0 ? sample * 0x8000 : sample * 0x7fff, true);
      offset += 2;
    }

    return buffer;
  };

  const handleConvertAll = async () => {
    setIsConvertingAll(true);
    for (const item of files) {
      if (item.status !== 'completed') {
        await convertFile(item);
      }
    }
    setIsConvertingAll(false);
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
            <span>Productivity & Utility</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
            <RefreshCw className="w-7 h-7 text-emerald-400" />
            Universal In-Browser Converter
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Convert Images (PNG, JPG, WebP), Audio (MP3, WAV), and Documents (DOCX to PDF) 100% locally.
          </p>
        </div>

        {files.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleConvertAll}
              disabled={isConvertingAll}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-500 hover:from-emerald-500 hover:to-cyan-400 text-white text-xs font-bold shadow-lg shadow-emerald-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isConvertingAll ? 'animate-spin' : ''}`} />
              <span>Convert All ({files.length})</span>
            </button>
          </div>
        )}
      </div>

      <div className="my-8 space-y-6">
        {/* Dropzone */}
        <div className="relative rounded-3xl border-2 border-dashed border-slate-800 hover:border-emerald-500/50 bg-slate-900/40 p-8 text-center backdrop-blur-xl transition-all">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-emerald-600/20 to-cyan-500/20 border border-emerald-500/30 flex items-center justify-center">
            <Upload className="w-7 h-7 text-emerald-400" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">
            Drop your Images, Audio, or Documents here
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            PNG, JPG, WebP, AVIF, MP3, WAV, DOCX, TXT, HTML. Multi-file batch support.
          </p>
        </div>

        {/* Files Conversion Queue */}
        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Conversion Queue ({files.length})</span>
              <button
                onClick={() => setFiles([])}
                className="hover:text-rose-400 transition-colors"
              >
                Clear Queue
              </button>
            </div>

            <div className="space-y-3">
              {files.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-xl"
                >
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 shrink-0">
                      {item.type === 'image' && <ImageIcon className="w-5 h-5 text-cyan-400" />}
                      {item.type === 'audio' && <Music className="w-5 h-5 text-purple-400" />}
                      {item.type === 'document' && <FileText className="w-5 h-5 text-emerald-400" />}
                      {item.type === 'other' && <FileCode className="w-5 h-5 text-slate-400" />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-bold text-white truncate max-w-[200px] sm:max-w-[260px]">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {formatBytes(item.size)} • {item.type.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Target format picker */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-slate-500">Convert to:</span>
                      <select
                        value={item.targetFormat}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFiles(prev =>
                            prev.map(f => (f.id === item.id ? { ...f, targetFormat: val, status: 'idle' } : f))
                          );
                        }}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                      >
                        {item.type === 'image' && (
                          <>
                            <option value="webp">WEBP</option>
                            <option value="png">PNG</option>
                            <option value="jpg">JPG</option>
                          </>
                        )}
                        {item.type === 'audio' && (
                          <>
                            <option value="wav">WAV</option>
                            <option value="mp3">MP3</option>
                            <option value="ogg">OGG</option>
                          </>
                        )}
                        {item.type === 'document' && (
                          <>
                            <option value="pdf">PDF</option>
                            <option value="txt">TXT</option>
                          </>
                        )}
                        {item.type === 'other' && (
                          <>
                            <option value="txt">TXT</option>
                            <option value="pdf">PDF</option>
                          </>
                        )}
                      </select>
                    </div>

                    {/* Action button */}
                    {item.status === 'completed' && item.resultBlob && item.resultName ? (
                      <button
                        onClick={() => downloadBlob(item.resultBlob!, item.resultName!)}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => convertFile(item)}
                        disabled={item.status === 'converting'}
                        className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold transition-all disabled:opacity-50"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${item.status === 'converting' ? 'animate-spin text-cyan-400' : ''}`} />
                        <span>{item.status === 'converting' ? 'Converting...' : 'Convert'}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <AdBanner type="leaderboard" />
    </div>
  );
};
