import React, { useState } from 'react';
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
        convertedBlob = await new Promise<Blob>((resolve, reject) => {
          const img = new Image();
          const url = URL.createObjectURL(file);
          img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error('Canvas context unavailable'));

            // Fill white background for jpg conversions from transparent pngs
            if (targetFormat === 'jpg' || targetFormat === 'jpeg') {
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(0, 0, canvas.width, canvas.height);
            }

            ctx.drawImage(img, 0, 0);
            URL.revokeObjectURL(url);

            const mimeMap: Record<string, string> = {
              webp: 'image/webp',
              png: 'image/png',
              jpg: 'image/jpeg',
              jpeg: 'image/jpeg'
            };

            canvas.toBlob(
              (blob) => {
                if (blob) resolve(blob);
                else reject(new Error('Blob creation failed'));
              },
              mimeMap[targetFormat] || 'image/png',
              0.92
            );
          };
          img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('Image failed to decode'));
          };
          img.src = url;
        });
      } else if (type === 'document' && file.name.endsWith('.docx') && targetFormat === 'pdf') {
        // DOCX -> Text Extract -> Clean PDF Render via mammoth + jsPDF
        const arrayBuffer = await file.arrayBuffer();
        const { value: rawText } = await mammoth.extractRawText({ arrayBuffer });

        const doc = new jsPDF({ unit: 'pt', format: 'letter' });
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(30, 35, 45);

        const splitText = doc.splitTextToSize(rawText || 'Empty document extracted.', 530);
        let cursorY = 40;
        const pageHeight = 750;

        splitText.forEach((line: string) => {
          if (cursorY > pageHeight) {
            doc.addPage();
            cursorY = 40;
          }
          doc.text(line, 40, cursorY);
          cursorY += 12;
        });

        const pdfOutput = doc.output('blob');
        convertedBlob = pdfOutput;
      } else if (type === 'document' && targetFormat === 'txt') {
        if (file.name.endsWith('.docx')) {
          const arrayBuffer = await file.arrayBuffer();
          const { value: rawText } = await mammoth.extractRawText({ arrayBuffer });
          convertedBlob = new Blob([rawText], { type: 'text/plain;charset=utf-8' });
        } else {
          const text = await file.text();
          convertedBlob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        }
      } else if (type === 'audio') {
        // Audio conversion via AudioContext Web Audio decoding & WAV encoder
        const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

        const wavBuffer = encodeWAV(audioBuffer);
        convertedBlob = new Blob([wavBuffer], { type: 'audio/wav' });
        await audioCtx.close();
      } else {
        throw new Error('Unsupported file type');
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
  const encodeWAV = (audioBuffer: AudioBuffer): ArrayBuffer => {
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#007A82] mb-1 font-bold">
            <Link to="/" className="text-slate-500 hover:text-[#00A3AD] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> All Tools
            </Link>
            <span>/</span>
            <span>Productivity & Utility</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] flex items-center gap-2.5">
            <RefreshCw className="w-7 h-7 text-[#00A3AD]" />
            File Converter
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Convert Images (PNG, JPG, WebP), Audio → WAV, and DOCX to PDF/TXT in this browser.
          </p>
        </div>

        {files.length > 0 && (
          <div className="flex items-center gap-3">
            <button
              onClick={handleConvertAll}
              disabled={isConvertingAll}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#00A3AD] to-[#008C95] hover:from-[#00B5B8] hover:to-[#00A3AD] text-white text-xs font-black shadow-lg shadow-teal-500/20 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isConvertingAll ? 'animate-spin' : ''}`} />
              <span>Convert All ({files.length})</span>
            </button>
          </div>
        )}
      </div>

      <div className="my-8 space-y-6">
        {/* Dropzone */}
        <div className="relative rounded-3xl border-2 border-dashed border-[#B3EAEF] hover:border-[#00A3AD] bg-white p-8 sm:p-10 text-center shadow-[0_4px_20px_rgba(10,37,64,0.03)] transition-all">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-[#E6F8F9] border border-[#B3EAEF] flex items-center justify-center">
            <Upload className="w-7 h-7 text-[#00A3AD]" />
          </div>
          <h3 className="text-base font-black text-[#0A2540] mb-1">
            Drop your Images, Audio, or Documents here
          </h3>
          <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
            PNG, JPG, WebP, MP3/WAV (decode → WAV), DOCX, TXT. Unsupported types are rejected.
          </p>
        </div>

        {/* Files Conversion Queue */}
        {files.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
              <span>Conversion Queue ({files.length})</span>
              <button
                onClick={() => setFiles([])}
                className="hover:text-rose-600 transition-colors cursor-pointer"
              >
                Clear Queue
              </button>
            </div>

            <div className="space-y-3">
              {files.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-white border border-slate-200/90 p-4.5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-[0_4px_20px_rgba(10,37,64,0.03)]"
                >
                  <div className="flex items-center gap-3.5 w-full sm:w-auto">
                    <div className="p-2.5 rounded-2xl bg-[#E6F8F9] border border-[#B3EAEF] shrink-0">
                      {item.type === 'image' && <ImageIcon className="w-5 h-5 text-[#007A82]" />}
                      {item.type === 'audio' && <Music className="w-5 h-5 text-[#0F4C81]" />}
                      {item.type === 'document' && <FileText className="w-5 h-5 text-emerald-600" />}
                      {item.type === 'other' && <FileCode className="w-5 h-5 text-slate-600" />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-xs font-black text-[#0A2540] truncate max-w-[200px] sm:max-w-[260px]">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-slate-500 font-mono font-medium">
                        {formatBytes(item.size)} • {item.type.toUpperCase()}
                      </p>
                    </div>
                  </div>

                  {/* Target format picker */}
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-1.5 text-xs">
                      <span className="text-slate-500 font-bold">Convert to:</span>
                      <select
                        value={item.targetFormat}
                        onChange={(e) => {
                          const val = e.target.value;
                          setFiles(prev =>
                            prev.map(f => (f.id === item.id ? { ...f, targetFormat: val, status: 'idle' } : f))
                          );
                        }}
                        className="px-3 py-1.5 rounded-xl bg-[#F4F8FA] border border-slate-200 text-xs font-mono font-bold text-[#007A82] focus:outline-none focus:border-[#00A3AD]"
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
                            <option value="">Unsupported</option>
                          </>
                        )}
                      </select>
                    </div>

                    {/* Action button */}
                    {item.status === 'completed' && item.resultBlob && item.resultName ? (
                      <button
                        onClick={() => downloadBlob(item.resultBlob!, item.resultName!)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-black transition-all cursor-pointer shadow-xs"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    ) : (
                      <button
                        onClick={() => convertFile(item)}
                        disabled={item.status === 'converting' || item.type === 'other'}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00A3AD] hover:bg-[#00B5B8] text-white text-xs font-black transition-all disabled:opacity-50 cursor-pointer shadow-xs"
                      >
                        <RefreshCw className={`w-3.5 h-3.5 ${item.status === 'converting' ? 'animate-spin' : ''}`} />
                        <span>{item.type === 'other' ? 'Unsupported' : item.status === 'converting' ? 'Converting...' : 'Convert'}</span>
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
