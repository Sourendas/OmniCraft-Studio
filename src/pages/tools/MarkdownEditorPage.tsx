import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Copy, 
  Check, 
  Download, 
  FileText, 
  Eye, 
  Edit3, 
  Heading1, 
  Heading2, 
  Heading3, 
  Bold, 
  Italic, 
  Strikethrough, 
  List, 
  ListOrdered, 
  Code, 
  Quote, 
  Table, 
  Link2, 
  CheckSquare, 
  Sparkles,
  ShieldCheck,
  Columns
} from 'lucide-react';
import { useSubscription } from '../../context/SubscriptionContext';

const SAMPLE_MARKDOWN = `# OmniCraft Sovereign Studio — Architecture & Technical Spec

> **100% In-Browser Computation & Zero Server Payload Retention**

Welcome to **OmniCraft Studio**, a privacy-first web utility suite compiling native operations to **WebAssembly**, **Web Crypto API**, and **HTML5 Canvas**.

---

## ⚡ Core Client-Side Features

- **Document Processing**: Drag-and-drop PDF page manipulation and DOCX transcompilation.
- **Visual Optimization**: Lossless & lossy image compression up to 90% in WebP & AVIF.
- **Developer Workbench**: Bidirectional JSON / CSV parsing, RegEx validator, and SHA-256 hash engine.
- **Vector Graphics**: Live SVG styling, stroke/fill recoloring, and 4x Retina PNG rendering.

### 🛡️ Privacy & Compliance Matrix

| Standard | Status | Implementation Mechanism |
| :--- | :---: | :--- |
| **GDPR Art. 25** | ✅ Full Pass | Zero external data processing; memory garbage-collected |
| **HIPAA Safe Harbor** | ✅ Full Pass | No electronic Protected Health Information (ePHI) transmitted |
| **Air-Gapped Ready** | ✅ Full Pass | Functions offline with cached service worker assets |

---

### Code Implementation Example

\`\`\`typescript
import { crypto } from 'node:crypto';

export async function verifyIntegrity(data: Uint8Array): Promise<string> {
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}
\`\`\`

### Quick Checklist
- [x] WebAssembly linear memory sandbox active
- [x] Web Crypto API hardware acceleration verified
- [ ] Next feature update scheduled
`;

export const MarkdownEditorPage: React.FC = () => {
  const { isPro } = useSubscription();
  const [markdown, setMarkdown] = useState<string>(SAMPLE_MARKDOWN);
  const [activeView, setActiveView] = useState<'split' | 'edit' | 'preview'>('split');
  const [copiedType, setCopiedType] = useState<string | null>(null);

  // Compute Word / Character / Reading Time Statistics
  const stats = useMemo(() => {
    const text = markdown.trim();
    const words = text ? text.split(/\s+/).length : 0;
    const chars = text.length;
    const lines = text ? text.split('\n').length : 0;
    const readingTimeMinutes = Math.max(1, Math.ceil(words / 200));

    return { words, chars, lines, readingTimeMinutes };
  }, [markdown]);

  // Insert markdown helper syntax at cursor position
  const insertSyntax = (prefix: string, suffix: string = '', defaultText: string = '') => {
    const textarea = document.getElementById('markdown-textarea') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = markdown.substring(start, end) || defaultText;

    const newText = 
      markdown.substring(0, start) + 
      prefix + selectedText + suffix + 
      markdown.substring(end);

    setMarkdown(newText);

    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(
        start + prefix.length,
        start + prefix.length + selectedText.length
      );
    }, 50);
  };

  // Convert markdown to clean HTML string for preview and export
  const renderedHtml = useMemo(() => {
    let html = markdown
      // Escape script tags
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      // Headings
      .replace(/^### (.*$)/gim, '<h3 class="text-lg font-black text-[#0A2540] mt-5 mb-2">$1</h3>')
      .replace(/^## (.*$)/gim, '<h2 class="text-xl font-black text-[#0A2540] mt-6 mb-3 pb-1 border-b border-slate-200">$1</h2>')
      .replace(/^# (.*$)/gim, '<h1 class="text-2xl sm:text-3xl font-black text-[#0A2540] mt-4 mb-4 pb-2 border-b border-slate-200 tracking-tight">$1</h1>')
      // Blockquotes
      .replace(/^\> (.*$)/gim, '<blockquote class="p-3 my-3 rounded-2xl bg-[#E6F8F9] border-l-4 border-[#00A3AD] text-xs sm:text-sm text-[#007A82] font-medium">$1</blockquote>')
      // Horizontal Rule
      .replace(/^---$/gim, '<hr class="my-6 border-slate-200" />')
      // Bold & Italic
      .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
      .replace(/\*\*(.*?)\*\*/gim, '<strong class="font-black text-[#0A2540]">$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em class="italic">$1</em>')
      .replace(/~~(.*?)~~/gim, '<del class="line-through text-slate-400">$1</del>')
      // Task lists
      .replace(/^- \[x\] (.*$)/gim, '<div class="flex items-center gap-2 my-1 text-xs sm:text-sm text-slate-700 font-medium"><input type="checkbox" checked disabled class="accent-[#00A3AD] rounded" /><span>$1</span></div>')
      .replace(/^- \[ \] (.*$)/gim, '<div class="flex items-center gap-2 my-1 text-xs sm:text-sm text-slate-700 font-medium"><input type="checkbox" disabled class="rounded" /><span>$1</span></div>')
      // Unordered List Items
      .replace(/^- (.*$)/gim, '<li class="ml-4 list-disc text-xs sm:text-sm text-slate-700 my-1">$1</li>')
      // Code blocks (multi-line)
      .replace(/```([a-z]*)\n([\s\S]*?)```/gim, '<pre class="p-4 my-4 rounded-2xl bg-[#0A2540] text-cyan-300 font-mono text-xs overflow-x-auto leading-relaxed"><code>$2</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/gim, '<code class="px-1.5 py-0.5 rounded-md bg-slate-100 font-mono text-[11px] text-[#007A82] font-bold border border-slate-200">$1</code>')
      // Tables (basic parse)
      .replace(/\|(.+)\|/gim, (match) => {
        if (match.includes('---')) return '';
        const cells = match.split('|').filter(c => c.trim() !== '');
        const row = cells.map(c => `<td class="border border-slate-200 px-3 py-2 text-xs text-slate-700">${c.trim()}</td>`).join('');
        return `<tr class="hover:bg-slate-50">${row}</tr>`;
      });

    return html;
  }, [markdown]);

  const copyToClipboard = async (content: string, type: string) => {
    await navigator.clipboard.writeText(content);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const downloadFile = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
              100% Client-Side Rich Editor
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] tracking-tight">
            Markdown & Rich Doc Editor
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Live side-by-side Markdown writing workstation with instant formatting tools, word count metrics, and export to Markdown, HTML, or styled documents.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => copyToClipboard(markdown, 'markdown')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold shadow-2xs transition-all cursor-pointer"
          >
            {copiedType === 'markdown' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5 text-[#00A3AD]" />}
            <span>{copiedType === 'markdown' ? 'Copied MD!' : 'Copy Markdown'}</span>
          </button>

          <button
            onClick={() => copyToClipboard(renderedHtml, 'html')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E6F8F9] hover:bg-[#D0F2F5] text-[#007A82] text-xs font-bold transition-all cursor-pointer"
          >
            {copiedType === 'html' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedType === 'html' ? 'Copied HTML!' : 'Copy HTML'}</span>
          </button>

          <button
            onClick={() => downloadFile(markdown, 'document.md', 'text/markdown;charset=utf-8')}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#00A3AD] hover:bg-[#008C95] text-white text-xs font-black shadow-md shadow-teal-500/20 transition-all cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download .md</span>
          </button>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Words</span>
          <span className="text-lg font-black text-[#0A2540] font-mono">{stats.words}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Characters</span>
          <span className="text-lg font-black text-[#0A2540] font-mono">{stats.chars}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Lines</span>
          <span className="text-lg font-black text-[#0A2540] font-mono">{stats.lines}</span>
        </div>
        <div className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-2xs">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Est. Read Time</span>
          <span className="text-lg font-black text-[#007A82] font-mono">{stats.readingTimeMinutes} min</span>
        </div>
      </div>

      {/* Editor Formatting Toolbar */}
      <div className="p-3 rounded-3xl bg-white border border-slate-200 shadow-2xs mb-4 flex items-center justify-between gap-2 flex-wrap">
        {/* Quick Format Buttons */}
        <div className="flex items-center gap-1 flex-wrap">
          <button
            onClick={() => insertSyntax('# ', '', 'Heading 1')}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            title="Heading 1"
          >
            <Heading1 className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('## ', '', 'Heading 2')}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            title="Heading 2"
          >
            <Heading2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('### ', '', 'Heading 3')}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            title="Heading 3"
          >
            <Heading3 className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          <button
            onClick={() => insertSyntax('**', '**', 'bold text')}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            title="Bold"
          >
            <Bold className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('*', '*', 'italic text')}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            title="Italic"
          >
            <Italic className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('~~', '~~', 'strikethrough text')}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            title="Strikethrough"
          >
            <Strikethrough className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          <button
            onClick={() => insertSyntax('- ', '', 'List item')}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            title="Bullet List"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('1. ', '', 'Numbered item')}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            title="Numbered List"
          >
            <ListOrdered className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('- [ ] ', '', 'Task item')}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            title="Task Checkbox"
          >
            <CheckSquare className="w-4 h-4" />
          </button>

          <span className="w-px h-5 bg-slate-200 mx-1" />

          <button
            onClick={() => insertSyntax('> ', '', 'Quote block')}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            title="Blockquote"
          >
            <Quote className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('```typescript\n', '\n```', '// code here')}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            title="Code Block"
          >
            <Code className="w-4 h-4" />
          </button>
          <button
            onClick={() => insertSyntax('[', '](https://example.com)', 'link text')}
            className="p-2 rounded-xl hover:bg-slate-100 text-slate-700 transition-colors"
            title="Insert Link"
          >
            <Link2 className="w-4 h-4" />
          </button>
        </div>

        {/* View Layout Controls */}
        <div className="flex items-center gap-1 bg-[#F8FBFC] p-1 rounded-2xl border border-slate-200">
          <button
            onClick={() => setActiveView('split')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === 'split'
                ? 'bg-white text-[#0A2540] shadow-2xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Split View
          </button>
          <button
            onClick={() => setActiveView('edit')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === 'edit'
                ? 'bg-white text-[#0A2540] shadow-2xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Editor Only
          </button>
          <button
            onClick={() => setActiveView('preview')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeView === 'preview'
                ? 'bg-white text-[#0A2540] shadow-2xs border border-slate-200'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Preview Only
          </button>
        </div>
      </div>

      {/* Main Content Workspace */}
      <div className={`grid gap-6 ${activeView === 'split' ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
        {/* Editor Pane */}
        {(activeView === 'split' || activeView === 'edit') && (
          <div className="rounded-3xl bg-white border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
            <div className="p-4 bg-[#F8FBFC] border-b border-slate-100 flex items-center justify-between text-xs font-black text-[#0A2540]">
              <div className="flex items-center gap-2">
                <Edit3 className="w-4 h-4 text-[#00A3AD]" />
                <span>Raw Markdown Source</span>
              </div>
              <span className="text-[11px] font-mono text-slate-400">Live Auto-Saving to Memory</span>
            </div>
            <textarea
              id="markdown-textarea"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              rows={24}
              className="w-full p-6 text-slate-800 font-mono text-xs sm:text-sm focus:outline-none leading-relaxed resize-y min-h-[550px]"
              placeholder="Type your markdown here..."
            />
          </div>
        )}

        {/* Live Rendered Preview Pane */}
        {(activeView === 'split' || activeView === 'preview') && (
          <div className="rounded-3xl bg-white border border-slate-200 shadow-2xs overflow-hidden flex flex-col">
            <div className="p-4 bg-[#F8FBFC] border-b border-slate-100 flex items-center justify-between text-xs font-black text-[#0A2540]">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[#00A3AD]" />
                <span>Live Formatted Preview</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-[#007A82]">HTML5 Rendering</span>
            </div>
            <div 
              className="p-6 sm:p-8 overflow-y-auto max-h-[750px] leading-relaxed text-slate-800 space-y-4"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          </div>
        )}
      </div>
    </div>
  );
};
