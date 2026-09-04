import React, { useState, useMemo } from 'react';
import { AdBanner } from '../../components/layout/AdBanner';
import { 
  Type, 
  ArrowLeft, 
  Copy, 
  Check, 
  Sparkles, 
  Hash, 
  Smile, 
  Share2, 
  Sliders, 
  Flame,
  MessageSquare
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Unicode transformation maps
const UNICODE_STYLES = [
  {
    name: 'Bold Sans',
    transform: (text: string) => {
      const normal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const bold = '𝗮𝗯𝗰𝗱𝗲𝗳𝗴𝗵𝗶𝗷𝗸𝗹𝗺𝗻𝗼𝗽𝗾𝗿𝘀𝘁𝘂𝘃𝘄𝘅𝘆𝘇𝗔𝗕𝗖𝗗𝗘𝗙𝗚𝗛𝗜𝗝𝗞𝗟𝗠𝗡𝗢𝗣𝗤𝗥𝗦𝗧𝗨𝗩𝗪𝗫𝗬𝗭𝟬𝟭𝟮𝟯𝟰𝟱𝟲𝟳𝟴𝟵';
      return text.split('').map(c => {
        const i = normal.indexOf(c);
        return i !== -1 ? bold.slice(i * 2, i * 2 + 2) || c : c;
      }).join('');
    }
  },
  {
    name: 'Italic Serif',
    transform: (text: string) => {
      const normal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const italic = '𝑎𝑏𝑐𝑑𝑒𝑓𝑔ℎ𝑖𝑗𝑘𝑙𝑚𝑛𝑜𝑝𝑞𝑟𝑠𝑡𝑢𝑣𝑤𝑥𝑦𝑧𝐴𝐵𝐶𝐷𝐸𝐹𝐺𝐻𝐼𝐽𝐾𝐿𝑀𝑁𝑂𝑃𝑄𝑅𝑆𝑇𝑈𝑉𝑊𝑋𝑌𝑍';
      return text.split('').map(c => {
        const i = normal.indexOf(c);
        return i !== -1 ? italic.slice(i * 2, i * 2 + 2) || c : c;
      }).join('');
    }
  },
  {
    name: 'Gothic / Fraktur',
    transform: (text: string) => {
      const normal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const gothic = '𝖆𝖇𝖈𝖉𝖊𝖋𝖌𝖍𝖎𝖏𝖐𝖑𝖒𝖓𝖔𝖕𝖖𝖗𝖘𝖙𝖚𝖛𝖜𝖝𝖞𝖟𝕬𝕭𝕮𝕯𝕰𝕱𝕲𝕳𝕴𝕵𝕶𝕷𝕸𝕹𝕺𝕻𝕼𝕽𝕾𝕿𝖀𝖁𝖂𝖃𝖄𝖅';
      return text.split('').map(c => {
        const i = normal.indexOf(c);
        return i !== -1 ? gothic.slice(i * 2, i * 2 + 2) || c : c;
      }).join('');
    }
  },
  {
    name: 'Double-Struck / Outline',
    transform: (text: string) => {
      const normal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const ds = '𝕒𝕓𝕔𝕕𝕖𝕗𝕘𝕙𝕚𝕛𝕜𝕝𝕞𝕟𝕠𝕡𝕢𝕣𝕤𝕥𝕦𝕧𝕨𝕩𝕪𝕫𝔸𝔹ℂ𝔻𝔼𝔽𝔾ℍ𝕀𝕁𝕂𝕃𝕄ℕ𝕆ℙℚℝ𝕊𝕋𝕌𝕍𝕎𝕏𝕐ℤ𝟘𝟙𝟚𝟛𝟜𝟝𝟞𝟟𝟠𝟡';
      return text.split('').map(c => {
        const i = normal.indexOf(c);
        return i !== -1 ? ds.slice(i * 2, i * 2 + 2) || c : c;
      }).join('');
    }
  },
  {
    name: 'Circled / Bubble',
    transform: (text: string) => {
      const normal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const circled = 'ⓐⓑⓒⓓⓔⓕⓖⓗⓘⓙⓚⓛⓜⓝⓞⓟⓠⓡⓢⓣⓤⓥⓦⓧⓨⓩⒶⒷⒸⒹⒺⒻⒼⒽⒾⒿⓀⓁⓂⓃⓄⓅⓆⓇⓈⓉⓊⓋⓌⓍⓎⓏ⓪①②③④⑤⑥⑦⑧⑨';
      return text.split('').map(c => {
        const i = normal.indexOf(c);
        return i !== -1 ? circled.slice(i, i + 1) || c : c;
      }).join('');
    }
  },
  {
    name: 'Monospace Code',
    transform: (text: string) => {
      const normal = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      const mono = '𝚊𝚋𝚌𝚍𝚎𝚏𝚐𝚑𝚒𝚓𝚔𝚕𝚖𝚗𝚘𝚙𝚚𝚛𝚜𝚝𝚞𝚟𝚠𝚡𝚢𝚣𝙰𝙱𝙲𝙳𝙴𝙵𝙶𝙷𝙸𝙹𝙺𝙻𝙼𝙽𝙾𝙿𝚀𝚁𝚂𝚃𝚄𝚅𝚆𝚇𝚈𝚉𝟶𝟷𝟸𝟹𝟺𝟻𝟼𝟽𝟾𝟿';
      return text.split('').map(c => {
        const i = normal.indexOf(c);
        return i !== -1 ? mono.slice(i * 2, i * 2 + 2) || c : c;
      }).join('');
    }
  },
  {
    name: 'Small Caps',
    transform: (text: string) => {
      const normal = 'abcdefghijklmnopqrstuvwxyz';
      const smallCaps = 'ᴀʙᴄᴅᴇғɢʜɪᴊᴋʟᴍɴᴏᴘǫʀsᴛᴜᴠᴡxʏᴢ';
      return text.split('').map(c => {
        const i = normal.indexOf(c.toLowerCase());
        return i !== -1 ? smallCaps[i] : c;
      }).join('');
    }
  },
  {
    name: 'Strikethrough',
    transform: (text: string) => {
      return text.split('').map(c => `${c}\u0336`).join('');
    }
  }
];

const PLATFORMS = [
  { name: 'X / Twitter', max: 280, color: 'text-sky-400', border: 'border-sky-500/40' },
  { name: 'Instagram Bio', max: 150, color: 'text-pink-400', border: 'border-pink-500/40' },
  { name: 'TikTok Bio', max: 80, color: 'text-[#00A3AD]', border: 'border-cyan-500/40' },
  { name: 'LinkedIn Post', max: 3000, color: 'text-blue-400', border: 'border-blue-500/40' },
  { name: 'Threads', max: 500, color: 'text-violet-400', border: 'border-violet-500/40' }
];

export const SocialStudioPage: React.FC = () => {
  const [inputText, setInputText] = useState('Building in the browser with FileTools Kit');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const viralHooks = [
    'Stop scrolling. If you are building with AI in 2026, you need this:',
    'Here is the exact framework I used to automate 80% of my workflow:',
    '99% of creators do this wrong. Here is how to fix it immediately:'
  ];

  return (
    <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-[#007A82] font-bold mb-1">
            <Link to="/" className="text-slate-500 hover:text-[#00A3AD] flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> All Tools
            </Link>
            <span>/</span>
            <span>Media & Graphics</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] flex items-center gap-2.5">
            <Type className="w-7 h-7 text-pink-400" />
            Social Typography & Bio Studio
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Convert bios and captions to Unicode font styles. Starter hooks are static lists.
          </p>
        </div>
      </div>

      <div className="my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Input & Platform Character Limits */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-[#0A2540] uppercase tracking-wider">
                Raw Bio / Caption Input
              </label>
              <span className="text-xs font-mono text-[#007A82] font-bold">
                {inputText.length} characters • {inputText.trim().split(/\s+/).filter(Boolean).length} words
              </span>
            </div>

            <textarea
              rows={5}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type your caption, tweet, or bio..."
              className="w-full p-4 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-sm text-[#0A2540] focus:outline-none focus:border-[#00A3AD] leading-relaxed font-sans"
            />

            {/* Quick Hooks Injection */}
            <div className="space-y-2 pt-2">
              <span className="text-[11px] text-slate-400 flex items-center gap-1 font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-400" />
                <span>Starter hooks (static lists)</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {viralHooks.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => setInputText(h)}
                    className="text-left text-[11px] px-3 py-1.5 rounded-xl bg-[#F4F8FA] hover:bg-slate-100 border border-slate-200 text-slate-700 truncate max-w-full transition-colors"
                  >
                    "{h.slice(0, 45)}..."
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Platform Meter Cards */}
          <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4">
            <h3 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider">
              Character limits by platform
            </h3>

            <div className="space-y-3">
              {PLATFORMS.map((p) => {
                const percent = Math.min(100, Math.round((inputText.length / p.max) * 100));
                const isOver = inputText.length > p.max;

                return (
                  <div key={p.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-semibold text-slate-700">{p.name}</span>
                      <span className={`font-mono ${isOver ? 'text-rose-600 font-bold' : 'text-slate-400'}`}>
                        {inputText.length} / {p.max} {isOver && `(+${inputText.length - p.max})`}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#F4F8FA] overflow-hidden">
                      <div
                        style={{ width: `${percent}%` }}
                        className={`h-full transition-all duration-300 ${
                          isOver ? 'bg-rose-500' : percent > 85 ? 'bg-amber-400' : 'bg-cyan-500'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Unicode Typography Grid */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-[#0A2540] uppercase tracking-wider">
              Generated Unicode Styles ({UNICODE_STYLES.length})
            </h3>
          </div>

          <div className="space-y-3">
            {UNICODE_STYLES.map((style, idx) => {
              const transformed = style.transform(inputText || 'FileTools Kit');
              return (
                <div
                  key={style.name}
                  className="rounded-2xl bg-white border border-slate-200 p-4 flex items-center justify-between gap-4 hover:border-slate-200 transition-all group"
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] text-slate-500 uppercase font-mono block mb-1">
                      {style.name}
                    </span>
                    <p className="text-sm text-[#0A2540] break-words leading-relaxed select-all">
                      {transformed}
                    </p>
                  </div>

                  <button
                    onClick={() => handleCopy(transformed, idx)}
                    className="p-2.5 rounded-xl bg-[#F4F8FA] hover:bg-slate-100 text-slate-400 hover:text-[#00A3AD] border border-slate-200 shrink-0 transition-all"
                  >
                    {copiedIndex === idx ? (
                      <Check className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <AdBanner type="leaderboard" />
    </div>
  );
};
