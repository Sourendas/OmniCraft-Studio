import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  ShieldCheck, 
  Zap, 
  RefreshCw, 
  CheckCircle2, 
  WifiOff, 
  Sparkles,
  Gauge
} from 'lucide-react';

export const LiveSystemDiagnostics: React.FC = () => {
  const [heapSizeMb, setHeapSizeMb] = useState<number>(32);
  const [wasmOpsPerSec, setWasmOpsPerSec] = useState<number | null>(null);
  const [isBenchmarking, setIsBenchmarking] = useState(false);
  const [browserHardwareConcurrency, setBrowserHardwareConcurrency] = useState<number>(8);

  useEffect(() => {
    if (typeof navigator !== 'undefined' && navigator.hardwareConcurrency) {
      setBrowserHardwareConcurrency(navigator.hardwareConcurrency);
    }
    // Estimate baseline memory if performance.memory is available, else simulated dynamic client heap
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

    // Run intensive in-browser mathematical & hashing calculations
    let sum = 0;
    for (let i = 0; i < iterations; i++) {
      sum += Math.sqrt(i) * Math.sin(i);
    }
    
    const testBytes = new TextEncoder().encode('OmniCraft-Benchmark-' + sum);
    await crypto.subtle.digest('SHA-256', testBytes);

    const elapsed = performance.now() - start;
    const opsPerSec = Math.round((iterations / elapsed) * 1000);
    setWasmOpsPerSec(opsPerSec);
    setIsBenchmarking(false);
  };

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="rounded-3xl bg-gradient-to-br from-[#0A2540] via-[#0D3052] to-[#0A2540] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
        {/* Ambient subtle glow */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#00A3AD]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#0F4C81]/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold mb-2">
                <Activity className="w-4 h-4 text-[#00A3AD]" />
                <span className="uppercase tracking-wider">Engine Status & Live Metrics</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Browser Hardware & Engine Diagnostics
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-medium">
                Live inspection of your client machine's processing capabilities and memory isolation sandbox.
              </p>
            </div>

            <button
              id="run-engine-benchmark-btn"
              onClick={runBenchmark}
              disabled={isBenchmarking}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#00A3AD] hover:bg-[#00B5B8] text-white text-xs font-black transition-all cursor-pointer disabled:opacity-50 shadow-lg shadow-teal-900/40 shrink-0"
            >
              {isBenchmarking ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Benchmarking CPU Engine...</span>
                </>
              ) : (
                <>
                  <Gauge className="w-4 h-4" />
                  <span>Test JavaScript compute sample</span>
                </>
              )}
            </button>
          </div>

          {/* 4 Live Diagnostic Metric Tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
            <div className="p-4.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold">JS runtime</span>
                <Cpu className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-xl font-black text-white font-mono flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>READY</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                {browserHardwareConcurrency} CPU Threads Available
              </p>
            </div>

            <div className="p-4.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold">JS compute sample</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-xl font-black text-white font-mono">
                {wasmOpsPerSec ? `${(wasmOpsPerSec / 1000).toFixed(0)}k loops/sec` : 'Not run yet'}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                {wasmOpsPerSec ? 'JS loop + SHA-256 sample' : 'Click the button to sample'}
              </p>
            </div>

            <div className="p-4.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold">Client Heap Allocation</span>
                <HardDrive className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-xl font-black text-white font-mono">
                {heapSizeMb >= 0 ? `${heapSizeMb} MB` : 'Not exposed'}
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                {heapSizeMb >= 0 ? 'performance.memory (Chromium)' : 'Not exposed in this browser'}
              </p>
            </div>

            <div className="p-4.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
              <div className="flex items-center justify-between text-slate-400 mb-2">
                <span className="text-xs font-bold">File tools</span>
                <WifiOff className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-xl font-black text-emerald-400 font-mono flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Local tab</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                File tools run locally in this tab
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
