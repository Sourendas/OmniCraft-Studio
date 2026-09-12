import React, { useState, useEffect, useRef } from 'react';
import { AdBanner } from '../../components/layout/AdBanner';
import QRCode from 'qrcode';
import { 
  QrCode, 
  ArrowLeft, 
  Download, 
  Wifi, 
  Globe, 
  User, 
  Mail, 
  MessageSquare, 
  FileText, 
  Palette, 
  Sliders, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const QrGeneratorPage: React.FC = () => {
  const [qrType, setQrType] = useState<'url' | 'wifi' | 'vcard' | 'text' | 'email'>('url');

  // Input states
  const [urlValue, setUrlValue] = useState('https://www.filetoolskit.com');
  const [wifiSsid, setWifiSsid] = useState('Home-WiFi');
  const [wifiPass, setWifiPass] = useState('example-password');
  const [wifiType, setWifiType] = useState('WPA');
  const [vcardName, setVcardName] = useState('Alex Mercer');
  const [vcardPhone, setVcardPhone] = useState('+1 (555) 923-4567');
  const [vcardEmail, setVcardEmail] = useState('alex@example.com');
  const [vcardOrg, setVcardOrg] = useState('Example Company');
  const [plainText, setPlainText] = useState('Hello from FileTools Kit');

  // Styling states
  const [fgColor, setFgColor] = useState('#0A2540');
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [eccLevel, setEccLevel] = useState<'L' | 'M' | 'Q' | 'H'>('H');
  const [marginSize, setMarginSize] = useState(2);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [svgString, setSvgString] = useState<string>('');

  // Compute final payload string based on active type
  const qrPayload = React.useMemo(() => {
    switch (qrType) {
      case 'url':
        return urlValue.startsWith('http') ? urlValue : `https://${urlValue}`;
      case 'wifi':
        return `WIFI:T:${wifiType};S:${wifiSsid};P:${wifiPass};;`;
      case 'vcard':
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardName}\nORG:${vcardOrg}\nTEL:${vcardPhone}\nEMAIL:${vcardEmail}\nEND:VCARD`;
      case 'email':
        return `mailto:${vcardEmail}?subject=Contact`;
      default:
        return plainText;
    }
  }, [qrType, urlValue, wifiSsid, wifiPass, wifiType, vcardName, vcardPhone, vcardEmail, vcardOrg, plainText]);

  // Render QR Code onto canvas and generate SVG string
  useEffect(() => {
    if (canvasRef.current) {
      QRCode.toCanvas(
        canvasRef.current,
        qrPayload,
        {
          width: 320,
          margin: marginSize,
          errorCorrectionLevel: eccLevel,
          color: {
            dark: fgColor,
            light: bgColor
          }
        },
        (error) => {
          if (error) console.error(error);
        }
      );

      QRCode.toString(
        qrPayload,
        {
          type: 'svg',
          margin: marginSize,
          errorCorrectionLevel: eccLevel,
          color: {
            dark: fgColor,
            light: bgColor
          }
        },
        (err, str) => {
          if (!err && str) setSvgString(str);
        }
      );
    }
  }, [qrPayload, fgColor, bgColor, eccLevel, marginSize]);

  const downloadPng = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `filetoolskit-qr.png`;
    a.click();
  };

  const downloadSvg = () => {
    if (!svgString) return;
    const blob = new Blob([svgString], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `filetoolskit-qr.svg`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#C2410C] font-bold mb-1">
            <Link to="/" className="text-slate-500 hover:text-[#EA580C] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> All Tools
            </Link>
            <span>/</span>
            <span>Media & Graphics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] flex items-center gap-2.5">
            <QrCode className="w-7 h-7 text-[#EA580C]" />
            QR Generator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1 font-medium">
            Encode a URL, Wi-Fi network, vCard, or text. Export PNG or SVG. Work stays in this tab.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={downloadPng}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-[#0A2540] text-xs font-bold border border-slate-200 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-[#EA580C]" />
            <span>Download PNG</span>
          </button>
          <button
            onClick={downloadSvg}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#EA580C] to-[#C2410C] hover:from-[#F97316] hover:to-[#EA580C] text-white text-xs font-bold shadow-lg shadow-[#EA580C]/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Vector SVG</span>
          </button>
        </div>
      </div>

      <div className="my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: QR Configuration Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* QR Type Selector */}
          <div className="grid grid-cols-5 gap-1 p-1 rounded-xl bg-white border border-slate-200 text-center text-xs">
            {[
              { id: 'url' as const, label: 'Website URL', icon: Globe },
              { id: 'wifi' as const, label: 'Wi-Fi Network', icon: Wifi },
              { id: 'vcard' as const, label: 'vCard Contact', icon: User },
              { id: 'email' as const, label: 'Email Draft', icon: Mail },
              { id: 'text' as const, label: 'Plain Text', icon: FileText }
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => setQrType(t.id)}
                  className={`py-2 px-1 rounded-lg font-semibold flex flex-col items-center gap-1 transition-all ${
                    qrType === t.id
                      ? 'bg-[#FFEDD5] text-[#C2410C] border border-[#FDBA74] shadow-sm'
                      : 'text-slate-500 hover:text-[#0A2540]'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="truncate text-[11px]">{t.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form inputs per type */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 backdrop-blur-xl">
            {qrType === 'url' && (
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Target Website URL</label>
                <input
                  type="url"
                  value={urlValue}
                  onChange={(e) => setUrlValue(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FFF7ED] border border-slate-200 text-xs text-[#C2410C] font-mono focus:border-[#EA580C]"
                />
              </div>
            )}

            {qrType === 'wifi' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="sm:col-span-2">
                  <label className="block text-slate-600 mb-1">Network SSID Name</label>
                  <input
                    type="text"
                    value={wifiSsid}
                    onChange={(e) => setWifiSsid(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FFF7ED] border border-slate-200 text-[#0A2540]"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Password</label>
                  <input
                    type="text"
                    value={wifiPass}
                    onChange={(e) => setWifiPass(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FFF7ED] border border-slate-200 text-[#0A2540] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Encryption Protocol</label>
                  <select
                    value={wifiType}
                    onChange={(e) => setWifiType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#FFF7ED] border border-slate-200 text-[#0A2540]"
                  >
                    <option value="WPA">WPA / WPA2 / WPA3</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">Open (No Password)</option>
                  </select>
                </div>
              </div>
            )}

            {qrType === 'vcard' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-600 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={vcardName}
                    onChange={(e) => setVcardName(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#FFF7ED] border border-slate-200 text-[#0A2540]"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Company / Org</label>
                  <input
                    type="text"
                    value={vcardOrg}
                    onChange={(e) => setVcardOrg(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#FFF7ED] border border-slate-200 text-[#0A2540]"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Phone</label>
                  <input
                    type="text"
                    value={vcardPhone}
                    onChange={(e) => setVcardPhone(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#FFF7ED] border border-slate-200 text-[#0A2540]"
                  />
                </div>
                <div>
                  <label className="block text-slate-600 mb-1">Email</label>
                  <input
                    type="email"
                    value={vcardEmail}
                    onChange={(e) => setVcardEmail(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg bg-[#FFF7ED] border border-slate-200 text-[#0A2540]"
                  />
                </div>
              </div>
            )}

            {qrType === 'text' && (
              <div>
                <label className="block text-xs font-bold text-slate-600 mb-1">Text Content</label>
                <textarea
                  rows={4}
                  value={plainText}
                  onChange={(e) => setPlainText(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#FFF7ED] border border-slate-200 text-xs text-[#0A2540]"
                />
              </div>
            )}
          </div>

          {/* Color & Aesthetic Parameters */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 backdrop-blur-xl">
            <h3 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider flex items-center gap-2">
              <Palette className="w-4 h-4 text-[#EA580C]" />
              <span>Palette & Error Correction</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div>
                <label className="block text-slate-600 mb-1">Foreground</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="font-mono text-[11px] text-slate-600">{fgColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 mb-1">Background</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <span className="font-mono text-[11px] text-slate-600">{bgColor}</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-600 mb-1">Error Correction</label>
                <select
                  value={eccLevel}
                  onChange={(e) => setEccLevel(e.target.value as any)}
                  className="w-full px-2 py-1.5 rounded-lg bg-[#FFF7ED] border border-slate-200 text-[#0A2540]"
                >
                  <option value="L">L (7%)</option>
                  <option value="M">M (15%)</option>
                  <option value="Q">Q (25%)</option>
                  <option value="H">H (30% High)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-600 mb-1">Quiet Margin</label>
                <input
                  type="number"
                  min="0"
                  max="6"
                  value={marginSize}
                  onChange={(e) => setMarginSize(parseInt(e.target.value) || 0)}
                  className="w-full px-2 py-1.5 rounded-lg bg-[#FFF7ED] border border-slate-200 text-[#0A2540]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Live QR Canvas */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl bg-white border border-slate-200 p-8 flex flex-col items-center justify-center text-center shadow-2xl shadow-sm">
            <div className="p-4 rounded-2xl bg-[#FFF7ED] border border-slate-200 shadow-xl mb-4">
              <canvas ref={canvasRef} className="rounded-lg max-w-full" />
            </div>

            <div className="text-xs text-slate-400 font-mono mt-2">
              Payload: {qrPayload.length} characters
            </div>

            <div className="mt-6 flex items-center justify-center gap-3 w-full">
              <button
                onClick={downloadPng}
                className="flex-1 py-2.5 px-3 rounded-xl bg-white hover:bg-slate-50 text-[#0A2540] font-bold text-xs border border-slate-200 transition-all cursor-pointer"
              >
                PNG Export
              </button>
              <button
                onClick={downloadSvg}
                className="flex-1 py-2.5 px-3 rounded-xl bg-[#EA580C] hover:bg-[#C2410C] text-white font-bold text-xs transition-all cursor-pointer"
              >
                Vector SVG
              </button>
            </div>
          </div>

          <AdBanner type="sidebar" />
        </div>
      </div>
    </div>
  );
};
