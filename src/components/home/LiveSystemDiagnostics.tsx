import React, { useState, useEffect } from 'react';
import {
  Activity,
  Cpu,
  HardDrive,
  ShieldCheck,
  Zap,
  RefreshCw,
  WifiOff,
  Gauge
} from 'lucide-react';

export const LiveSystemDiagnostics: React.FC = () => {
  const [heapSizeMb, setHeapSizeMb] = useState<number>(32);
  const [jsLoopsPerSec, setJsLoopsPerSec] = useState<number | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [browserHardwareConcurrency, setBrowserHardwareConcurrency] = useState<number>(8);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
      setBrowserHardwareConcurrency(navigator.hardwareConcurrency);
    }
    const mem = (performance as unknown as { memory?: { usedJSHeapSize?: number } }).memory;
    if (mem && mem.usedJSHeapSize) {
      setHeapSizeMb(Math.round(mem.usedJSHeapSize / (1024 * 1024)));
    } else {
      setHeapSizeMb(-1);
    }
  }, []);

  const runBenchmark = async () => {
    setIsBenchmarking(true);
    const start = performance.now();
    const iterations = 50000;
    let sum = 0;
    for (let i = 0; i < iterations; i++) {
      sum += Math.sqrt(i) * Math.sin(i);
    }
    const testBytes = new TextEncoder().encode('FileToolsKit-Benchmark-' + sum);
    await crypto.subtle.digest('SHA-256', testBytes);
    const elapsed = performance.now() - start;
    setJsLoopsPerSec(Math.round((iterations / elapsed) * 1000));
    setIsBenchmarking(false);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="rounded-3xl bg-gradient-to-br from-[#1C1917] via-[#292524] to-[#1C1917] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#EA580C]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#7C3AED]/30 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-orange-200 font-bold mb-2">
                <Activity className="w-4 h-4 text-[#FDBA74]" />
                <span className="uppercase tracking-wider">Browser check</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Browser check</h2>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-xl font-medium">Runs a short JavaScript sample in this tab. Not a security audit.</p>
            </div>
            <button id="run-engine-benchmark-btn" onClick={runBenchmark} disabled={isBenchmarking} className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#EA580C] hover:bg-[#F97316] text-white text-xs font-black transition-all cursor-pointer disabled:opacity-50 shadow-lg shadow-orange-900/40 shrink-0">
              {isBenchmarking ? (<><RefreshCw className="w-4 h-4 animate-spin" /><span>Sampling JavaScript...</span></>) : (<><Gauge className="w-4 h-4" /><span>Run sample</span></>)}
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
            <div className="p-4.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-slate-200 mb-2"><span className="text-xs font-bold">JS runtime</span><Cpu className="w-4 h-4 text-orange-200" /></div>
              <div className="text-xl font-black text-white font-mono flex items-center gap-2"><span>This tab</span></div>
              <p className="text-[11px] text-slate-200 mt-1 font-mono">{browserHardwareConcurrency} CPU Threads Available</p>
            </div>
            <div className="p-4.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-slate-200 mb-2"><span className="text-xs font-bold">JS compute sample</span><Zap className="w-4 h-4 text-amber-300" /></div>
              <div className="text-xl font-black text-white font-mono">{jsLoopsPerSec ? `${(jsLoopsPerSec / 1000).toFixed(0)}k loops/sec` : 'Not run yet'}</div>
              <p className="text-[11px] text-slate-200 mt-1 font-mono">{jsLoopsPerSec ? 'JS loop + SHA-256 sample' : 'Click the button to sample'}</p>
            </div>
            <div className="p-4.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-slate-200 mb-2"><span className="text-xs font-bold">Tab memory</span><HardDrive className="w-4 h-4 text-orange-200" /></div>
              <div className="text-xl font-black text-white font-mono">{heapSizeMb >= 0 ? `${heapSizeMb} MB` : 'Not exposed'}</div>
              <p className="text-[11px] text-slate-200 mt-1 font-mono">This tab (performance.memory if the browser exposes it)</p>
            </div>
            <div className="p-4.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-slate-200 mb-2"><span className="text-xs font-bold">File tools</span><WifiOff className="w-4 h-4 text-emerald-300" /></div>
              <div className="text-xl font-black text-emerald-300 font-mono flex items-center gap-2"><ShieldCheck className="w-5 h-5 text-emerald-300" /><span>Local tab</span></div>
              <p className="text-[11px] text-slate-200 mt-1 font-mono">File tools run locally in this tab</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
