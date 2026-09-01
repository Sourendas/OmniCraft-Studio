import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  ArrowLeftRight, 
  Trash2, 
  Sparkles, 
  Code2, 
  FileText, 
  Layers, 
  Download, 
  ShieldCheck, 
  Settings2,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import * as Diff from 'diff';
import { useSubscription } from '../../context/SubscriptionContext';

interface DiffStat {
  addedLines: number;
  removedLines: number;
  unchangedLines: number;
  totalLinesOriginal: number;
  totalLinesModified: number;
  charDelta: number;
  wordDelta: number;
}

const SAMPLE_ORIGINAL = `{
  "name": "OmniCraft Studio",
  "version": "1.0.0",
  "privacy": "client-side",
  "features": [
    "pdf-organizer",
    "image-optimizer",
    "resume-builder"
  ],
  "telemetry": false
}`;

const SAMPLE_MODIFIED = `{
  "name": "OmniCraft Studio",
  "version": "2.1.0",
  "privacy": "100%-client-side-wasm",
  "features": [
    "pdf-organizer",
    "image-optimizer",
    "resume-builder",
    "svg-studio",
    "text-diff-comparator"
  ],
  "telemetry": false,
  "airGapped": true
}`;

export const TextDiffPage: React.FC = () => {
  const { isPro } = useSubscription();

  const [originalText, setOriginalText] = useState<string>(SAMPLE_ORIGINAL);
  const [modifiedText, setModifiedText] = useState<string>(SAMPLE_MODIFIED);
  const [viewMode, setViewMode] = useState<'split' | 'unified'>('split');
  const [ignoreWhitespace, setIgnoreWhitespace] = useState<boolean>(false);
  const [ignoreCase, setIgnoreCase] = useState<boolean>(false);
  const [copiedPatch, setCopiedPatch] = useState<boolean>(false);

  // Compute Line Diff
  const lineDiffs = useMemo(() => {
    const text1 = ignoreCase ? originalText.toLowerCase() : originalText;
    const text2 = ignoreCase ? modifiedText.toLowerCase() : modifiedText;
    return Diff.diffLines(text1, text2, {
      ignoreWhitespace
    });
  }, [originalText, modifiedText, ignoreWhitespace, ignoreCase]);

  // Compute Detailed Line-by-Line paired structures for Split View
  const splitDiffRows = useMemo(() => {
    const origLines = originalText.split('\n');
    const modLines = modifiedText.split('\n');

    const patch = Diff.structuredPatch(
      'original.txt',
      'modified.txt',
      originalText,
      modifiedText,
      '',
      '',
      { context: 1000 }
    );

    const rows: Array<{
      origLineNum?: number;
      origContent?: string;
      modLineNum?: number;
      modContent?: string;
      type: 'added' | 'removed' | 'modified' | 'unchanged';
      origCharDiff?: Diff.Change[];
      modCharDiff?: Diff.Change[];
    }> = [];

    // Process structured diff
    lineDiffs.forEach((part) => {
      const lines = part.value.replace(/\n$/, '').split('\n');
      lines.forEach((line) => {
        if (part.added) {
          rows.push({
            modContent: line,
            type: 'added'
          });
        } else if (part.removed) {
          rows.push({
            origContent: line,
            type: 'removed'
          });
        } else {
          rows.push({
            origContent: line,
            modContent: line,
            type: 'unchanged'
          });
        }
      });
    });

    return rows;
  }, [originalText, modifiedText, lineDiffs]);

  // Generate Git Unified Patch string
  const unifiedPatchString = useMemo(() => {
    return Diff.createTwoFilesPatch(
      'original.txt',
      'modified.txt',
      originalText,
      modifiedText,
      'Original Content',
      'Modified Content'
    );
  }, [originalText, modifiedText]);

  // Compute Statistics
  const stats: DiffStat = useMemo(() => {
    let added = 0;
    let removed = 0;
    let unchanged = 0;

    lineDiffs.forEach((part) => {
      const count = part.count || 0;
      if (part.added) added += count;
      else if (part.removed) removed += count;
      else unchanged += count;
    });

    const origWords = originalText.trim() ? originalText.trim().split(/\s+/).length : 0;
    const modWords = modifiedText.trim() ? modifiedText.trim().split(/\s+/).length : 0;

    return {
      addedLines: added,
      removedLines: removed,
      unchangedLines: unchanged,
      totalLinesOriginal: originalText ? originalText.split('\n').length : 0,
      totalLinesModified: modifiedText ? modifiedText.split('\n').length : 0,
      charDelta: modifiedText.length - originalText.length,
      wordDelta: modWords - origWords
    };
  }, [lineDiffs, originalText, modifiedText]);

  const handleSwap = () => {
    const temp = originalText;
    setOriginalText(modifiedText);
    setModifiedText(temp);
  };

  const handleClear = () => {
    setOriginalText('');
    setModifiedText('');
  };

  const copyPatchToClipboard = async () => {
    await navigator.clipboard.writeText(unifiedPatchString);
    setCopiedPatch(true);
    setTimeout(() => setCopiedPatch(false), 2000);
  };

  const downloadPatchFile = () => {
    const blob = new Blob([unifiedPatchString], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'omnicraft-diff.patch';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen">
      {/* Header */}
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
              100% Client-Side Myers Algorithm
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight">
            Text Diff & Code Comparator
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Side-by-side text and code comparator with line-by-line & character difference highlights, patch generation, and live diff metrics.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleSwap}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold shadow-2xs transition-all cursor-pointer"
            title="Swap Original and Modified texts"
          >
            <ArrowLeftRight className="w-3.5 h-3.5 text-[#00A3AD]" />
            <span>Swap Panes</span>
          </button>

          <button
            onClick={copyPatchToClipboard}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E6F8F9] hover:bg-[#D0F2F5] text-[#007A82] text-xs font-bold transition-all cursor-pointer"
          >
            {copiedPatch ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedPatch ? 'Copied Unified Patch!' : 'Copy Unified Patch'}</span>
          </button>

          <button
            onClick={downloadPatchFile}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00A3AD] hover:bg-[#008C95] text-white text-xs font-black shadow-md shadow-teal-500/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .patch</span>
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 mb-6">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Added Lines</span>
          <span className="text-lg font-black text-emerald-600 font-mono">+{stats.addedLines}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Removed Lines</span>
          <span className="text-lg font-black text-rose-600 font-mono">-{stats.removedLines}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Unchanged</span>
          <span className="text-lg font-black text-slate-700 font-mono">{stats.unchangedLines}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Char Delta</span>
          <span className={`text-lg font-black font-mono ${stats.charDelta >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {stats.charDelta >= 0 ? `+${stats.charDelta}` : stats.charDelta}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Word Delta</span>
          <span className={`text-lg font-black font-mono ${stats.wordDelta >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {stats.wordDelta >= 0 ? `+${stats.wordDelta}` : stats.wordDelta}
          </span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Match Status</span>
            <span className="text-xs font-black text-[#007A82]">
              {stats.addedLines === 0 && stats.removedLines === 0 ? 'Identical' : 'Differences Found'}
            </span>
          </div>
        </div>
      </div>

      {/* Inputs Section (Editable) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left: Original Text */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <h3 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
                Original Text (Before)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {stats.totalLinesOriginal} lines • {originalText.length} chars
            </span>
          </div>
          <textarea
            value={originalText}
            onChange={(e) => setOriginalText(e.target.value)}
            rows={10}
            className="w-full p-4 rounded-2xl bg-[#F8FBFC] text-slate-800 font-mono text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00A3AD] focus:bg-white leading-relaxed resize-y"
            placeholder="Paste original text or code snippet here..."
          />
        </div>

        {/* Right: Modified Text */}
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <h3 className="text-xs font-black text-[#0A2540] uppercase tracking-wider">
                Modified Text (After)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              {stats.totalLinesModified} lines • {modifiedText.length} chars
            </span>
          </div>
          <textarea
            value={modifiedText}
            onChange={(e) => setModifiedText(e.target.value)}
            rows={10}
            className="w-full p-4 rounded-2xl bg-[#F8FBFC] text-slate-800 font-mono text-xs border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00A3AD] focus:bg-white leading-relaxed resize-y"
            placeholder="Paste modified text or code snippet here..."
          />
        </div>
      </div>

      {/* Comparison View Toolbar */}
      <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-2xs mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('split')}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
              viewMode === 'split'
                ? 'bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF]'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Side-by-Side View
          </button>
          <button
            onClick={() => setViewMode('unified')}
            className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
              viewMode === 'unified'
                ? 'bg-[#E6F8F9] text-[#007A82] border border-[#B3EAEF]'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Unified Git Patch
          </button>
        </div>

        <div className="flex items-center gap-4 text-xs font-bold text-slate-600 flex-wrap">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreWhitespace}
              onChange={(e) => setIgnoreWhitespace(e.target.checked)}
              className="accent-[#00A3AD] rounded"
            />
            <span>Ignore Whitespace</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={ignoreCase}
              onChange={(e) => setIgnoreCase(e.target.checked)}
              className="accent-[#00A3AD] rounded"
            />
            <span>Ignore Case</span>
          </label>
        </div>
      </div>

      {/* Diff Result Rendering Box */}
      <div className="rounded-3xl bg-white border border-slate-200 shadow-2xs overflow-hidden">
        <div className="p-4 bg-[#F8FBFC] border-b border-slate-100 flex items-center justify-between text-xs font-black text-[#0A2540]">
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4 text-[#00A3AD]" />
            <span>Interactive Visual Diff Inspector</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-emerald-100 border border-emerald-300" />
              <span>Added</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-rose-100 border border-rose-300" />
              <span>Removed</span>
            </span>
          </div>
        </div>

        {viewMode === 'split' ? (
          <div className="p-0 overflow-x-auto max-h-[600px] overflow-y-auto divide-y divide-slate-100 text-xs font-mono">
            {lineDiffs.map((part, idx) => {
              const lines = part.value.replace(/\n$/, '').split('\n');
              const isAdd = part.added;
              const isRem = part.removed;

              return lines.map((line, lineIdx) => (
                <div
                  key={`${idx}-${lineIdx}`}
                  className={`flex items-start transition-colors ${
                    isAdd
                      ? 'bg-emerald-50/70 hover:bg-emerald-50 text-emerald-950 font-medium'
                      : isRem
                      ? 'bg-rose-50/70 hover:bg-rose-50 text-rose-950 font-medium'
                      : 'hover:bg-slate-50/80 text-slate-700'
                  }`}
                >
                  <div className="w-12 py-1.5 px-3 text-right text-slate-400 select-none border-r border-slate-200 shrink-0 font-mono text-[11px]">
                    {isAdd ? '+' : isRem ? '-' : ' '}
                  </div>
                  <div className="py-1.5 px-4 whitespace-pre-wrap break-all flex-1 font-mono">
                    {line || ' '}
                  </div>
                </div>
              ));
            })}
          </div>
        ) : (
          <div className="p-4 bg-[#0A2540] overflow-x-auto max-h-[600px] overflow-y-auto font-mono text-xs leading-relaxed">
            <pre className="text-slate-300">
              {unifiedPatchString.split('\n').map((line, idx) => {
                let colorClass = 'text-slate-300';
                if (line.startsWith('+')) colorClass = 'text-emerald-400 font-bold bg-emerald-950/40 px-1 rounded';
                else if (line.startsWith('-')) colorClass = 'text-rose-400 font-bold bg-rose-950/40 px-1 rounded';
                else if (line.startsWith('@@')) colorClass = 'text-cyan-400 font-bold';

                return (
                  <div key={idx} className={colorClass}>
                    {line}
                  </div>
                );
              })}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
