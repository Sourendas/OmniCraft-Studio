import React, { useState, useMemo } from 'react';
import { AdBanner } from '../../components/layout/AdBanner';
import { 
  Terminal, 
  ArrowLeft, 
  Copy, 
  Check, 
  Code, 
  Database, 
  Hash, 
  Lock, 
  FileJson, 
  Sparkles,
  RefreshCw
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const DevToolsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'json-csv' | 'sql' | 'regex' | 'base64' | 'hashes'>('json-csv');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // --- JSON <-> CSV state ---
  const [jsonInput, setJsonInput] = useState(
    JSON.stringify([
      { id: 101, name: "Alice Developer", role: "Frontend Lead", country: "US" },
      { id: 102, name: "Bob Engineer", role: "Backend Architect", country: "DE" },
      { id: 103, name: "Charlie Designer", role: "UI/UX Specialist", country: "CA" }
    ], null, 2)
  );
  const [csvOutput, setCsvOutput] = useState('');
  const [jsonCsvError, setJsonCsvError] = useState<string | null>(null);

  const convertJsonToCsv = () => {
    try {
      setJsonCsvError(null);
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        throw new Error('Input must be a non-empty array of objects');
      }
      const headers = Object.keys(parsed[0]);
      const rows = parsed.map(obj =>
        headers.map(h => JSON.stringify(obj[h] ?? '')).join(',')
      );
      setCsvOutput([headers.join(','), ...rows].join('\n'));
    } catch (e: any) {
      setJsonCsvError(e.message || 'Invalid JSON format');
    }
  };

  const convertCsvToJson = () => {
    try {
      setJsonCsvError(null);
      const lines = csvOutput.trim().split('\n');
      if (lines.length < 2) throw new Error('CSV must have at least a header and 1 row');
      const headers = lines[0].split(',').map(h => h.trim().replace(/^["']|["']$/g, ''));
      const result = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/^["']|["']$/g, ''));
        const obj: Record<string, any> = {};
        headers.forEach((h, i) => {
          obj[h] = values[i] ?? '';
        });
        return obj;
      });
      setJsonInput(JSON.stringify(result, null, 2));
    } catch (e: any) {
      setJsonCsvError(e.message || 'Invalid CSV format');
    }
  };

  // --- SQL Formatter state ---
  const [sqlInput, setSqlInput] = useState(
    "select u.id, u.name, o.total_amount, o.status from users u inner join orders o on u.id = o.user_id where o.created_at >= '2024-01-01' and o.status in ('completed', 'shipped') group by u.id order by o.total_amount desc limit 50;"
  );
  const [sqlOutput, setSqlOutput] = useState('');

  const formatSql = () => {
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'LEFT JOIN', 'RIGHT JOIN', 
      'INNER JOIN', 'JOIN', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 
      'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'AS', 'IN', 'DESC', 'ASC'
    ];
    let formatted = sqlInput;
    keywords.forEach(kw => {
      const regex = new RegExp(`\\b${kw}\\b`, 'gi');
      formatted = formatted.replace(regex, `\n${kw}`);
    });
    setSqlOutput(formatted.trim());
  };

  // --- RegEx Live Tester ---
  const [regexPattern, setRegexPattern] = useState('([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})');
  const [regexFlags, setRegexFlags] = useState('g');
  const [regexTestString, setRegexTestString] = useState(
    'Contact our team at support@filetoolskit.com for questions about FileTools Kit.'
  );

  const regexMatches = useMemo(() => {
    try {
      if (!regexPattern) return [];
      const re = new RegExp(regexPattern, regexFlags);
      const matches = [];
      let match;
      if (regexFlags.includes('g')) {
        while ((match = re.exec(regexTestString)) !== null) {
          matches.push({ full: match[0], index: match.index, groups: match.slice(1) });
        }
      } else {
        const single = re.exec(regexTestString);
        if (single) matches.push({ full: single[0], index: single.index, groups: single.slice(1) });
      }
      return matches;
    } catch {
      return [];
    }
  }, [regexPattern, regexFlags, regexTestString]);

  // --- Base64 / URL Encoder ---
  const [base64Text, setBase64Text] = useState('FileTools Kit browser suite');
  const [base64Encoded, setBase64Encoded] = useState('');

  const handleBase64Encode = () => {
    try {
      setBase64Encoded(btoa(encodeURIComponent(base64Text)));
    } catch (e) {
      setBase64Encoded('Encoding error');
    }
  };

  const handleBase64Decode = () => {
    try {
      setBase64Text(decodeURIComponent(atob(base64Encoded)));
    } catch (e) {
      setBase64Text('Invalid base64 string');
    }
  };

  // --- Hashes Generator (Web Crypto API) ---
  const [hashInput, setHashInput] = useState('SecretToken2026!#');
  const [hashes, setHashes] = useState<Record<string, string>>({});

  const computeHashes = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(hashInput);

    const getHex = (buf: ArrayBuffer) => {
      return Array.from(new Uint8Array(buf))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
    };

    const sha1 = await crypto.subtle.digest('SHA-1', data);
    const sha256 = await crypto.subtle.digest('SHA-256', data);
    const sha384 = await crypto.subtle.digest('SHA-384', data);
    const sha512 = await crypto.subtle.digest('SHA-512', data);

    setHashes({
      'SHA-1': getHex(sha1),
      'SHA-256': getHex(sha256),
      'SHA-384': getHex(sha384),
      'SHA-512': getHex(sha512)
    });
  };

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
            <span>Developer & Data</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] flex items-center gap-2.5">
            <Terminal className="w-7 h-7 text-[#007A82]" />
            Developer Powerstation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            JSON/CSV (flat objects), SQL keyword line-breaks, regex tester, Base64, SHA hashes.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="my-6 flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto scrollbar-none">
        {[
          { id: 'json-csv' as const, label: 'JSON ↔ CSV', icon: FileJson },
          { id: 'sql' as const, label: 'SQL line-breaks', icon: Database },
          { id: 'regex' as const, label: 'RegEx Live Tester', icon: Code },
          { id: 'base64' as const, label: 'Base64 & URL', icon: Lock },
          { id: 'hashes' as const, label: 'Hash Generator', icon: Hash }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF] shadow-sm'
                  : 'bg-white text-slate-400 hover:text-[#0A2540] border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: JSON <-> CSV */}
      {activeTab === 'json-csv' && (
        <div className="space-y-6">
          {jsonCsvError && (
            <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-800 text-xs text-rose-300">
              {jsonCsvError}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-bold">JSON Input / Output</span>
                <button
                  onClick={convertJsonToCsv}
                  className="px-3 py-1 rounded-lg bg-[#00A3AD] hover:bg-[#00B5B8] text-white font-bold text-xs"
                >
                  Convert JSON → CSV
                </button>
              </div>
              <textarea
                rows={12}
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                className="w-full p-4 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-mono focus:border-[#00A3AD] focus:outline-none"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-300">
                <span className="font-bold">CSV Input / Output</span>
                <button
                  onClick={convertCsvToJson}
                  className="px-3 py-1 rounded-lg bg-white hover:bg-slate-50 text-[#0A2540] font-bold text-xs border border-slate-200"
                >
                  Convert CSV → JSON
                </button>
              </div>
              <textarea
                rows={12}
                value={csvOutput}
                onChange={(e) => setCsvOutput(e.target.value)}
                placeholder="Click Convert JSON → CSV or paste CSV here..."
                className="w-full p-4 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-mono focus:border-[#00A3AD] focus:outline-none"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: SQL Formatter */}
      {activeTab === 'sql' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold">Raw SQL Query</span>
              <button
                onClick={formatSql}
                className="px-3 py-1 rounded-lg bg-[#00A3AD] hover:bg-[#00B5B8] text-white font-bold text-xs"
              >
                Insert line breaks
              </button>
            </div>
            <textarea
              rows={12}
              value={sqlInput}
              onChange={(e) => setSqlInput(e.target.value)}
              className="w-full p-4 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-mono focus:border-[#00A3AD] focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold">Beautified SQL Result</span>
              <button
                onClick={() => copyToClipboard(sqlOutput, 'sql')}
                className="text-xs text-[#007A82] hover:text-[#00A3AD] flex items-center gap-1"
              >
                {copiedKey === 'sql' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>Copy</span>
              </button>
            </div>
            <textarea
              rows={12}
              readOnly
              value={sqlOutput}
              placeholder="Formatted output appears here..."
              className="w-full p-4 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#007A82] font-mono"
            />
          </div>
        </div>
      )}

      {/* Tab 3: RegEx Live Tester */}
      {activeTab === 'regex' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
            <div className="sm:col-span-9">
              <label className="block text-xs font-bold text-slate-300 mb-1">Regular Expression Pattern</label>
              <input
                type="text"
                value={regexPattern}
                onChange={(e) => setRegexPattern(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F4F8FA] border border-slate-200 text-xs font-mono text-[#007A82] focus:outline-none focus:border-[#00A3AD]"
              />
            </div>
            <div className="sm:col-span-3">
              <label className="block text-xs font-bold text-slate-300 mb-1">Flags (e.g. g, i, m)</label>
              <input
                type="text"
                value={regexFlags}
                onChange={(e) => setRegexFlags(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-[#F4F8FA] border border-slate-200 text-xs font-mono text-[#0A2540]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">Test String Content</label>
            <textarea
              rows={5}
              value={regexTestString}
              onChange={(e) => setRegexTestString(e.target.value)}
              className="w-full p-4 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-mono focus:border-[#00A3AD]"
            />
          </div>

          <div className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#0A2540]">
                Detected Matches ({regexMatches.length})
              </span>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {regexMatches.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F4F8FA] border border-slate-200 text-xs font-mono">
                  <div className="text-[#007A82] font-bold">Match #{idx + 1}: "{m.full}" (Index: {m.index})</div>
                  {m.groups.length > 0 && (
                    <div className="text-slate-400 text-[11px] mt-1">
                      Groups: {m.groups.map((g, gi) => `$${gi + 1}: "${g}"`).join('  |  ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Base64 */}
      {activeTab === 'base64' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold">Decoded Plain Text</span>
              <button
                onClick={handleBase64Encode}
                className="px-3 py-1 rounded-lg bg-[#00A3AD] hover:bg-[#00B5B8] text-white font-bold text-xs"
              >
                Encode to Base64 →
              </button>
            </div>
            <textarea
              rows={8}
              value={base64Text}
              onChange={(e) => setBase64Text(e.target.value)}
              className="w-full p-4 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-mono"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-300">
              <span className="font-bold">Base64 Encoded Output</span>
              <button
                onClick={handleBase64Decode}
                className="px-3 py-1 rounded-lg bg-white hover:bg-slate-50 text-[#0A2540] font-bold text-xs border border-slate-200"
              >
                ← Decode from Base64
              </button>
            </div>
            <textarea
              rows={8}
              value={base64Encoded}
              onChange={(e) => setBase64Encoded(e.target.value)}
              placeholder="Base64 output..."
              className="w-full p-4 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#007A82] font-mono"
            />
          </div>
        </div>
      )}

      {/* Tab 5: Hashes Generator */}
      {activeTab === 'hashes' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300">Input String for Cryptographic Hashing</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={hashInput}
                onChange={(e) => setHashInput(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-mono"
              />
              <button
                onClick={computeHashes}
                className="px-5 py-2.5 rounded-xl bg-[#00A3AD] hover:bg-[#00B5B8] text-white font-bold text-xs shrink-0"
              >
              Generate hashes
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {Object.entries(hashes).map(([algo, hashVal]) => (
              <div key={algo} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF] uppercase">
                    {algo}
                  </span>
                  <p className="text-xs font-mono text-slate-300 break-all mt-1.5">{String(hashVal)}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(String(hashVal), algo)}
                  className="text-slate-400 hover:text-[#007A82] p-2 shrink-0"
                >
                  {copiedKey === algo ? <Check className="w-4 h-4 text-emerald-700" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <AdBanner type="leaderboard" />
      </div>
    </div>
  );
};
