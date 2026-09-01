import React, { useState, useMemo } from 'react';
import { AdBanner } from '../../components/layout/AdBanner';
import { 
  Coins, 
  ArrowLeft, 
  ArrowRightLeft, 
  TrendingUp, 
  ShieldCheck, 
  RefreshCw, 
  DollarSign, 
  Zap, 
  Layers,
  Percent,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RATES: Record<string, { name: string; rateInUsd: number; symbol: string; type: 'fiat' | 'crypto' }> = {
  USD: { name: 'US Dollar', rateInUsd: 1.0, symbol: '$', type: 'fiat' },
  EUR: { name: 'Euro', rateInUsd: 1.08, symbol: '€', type: 'fiat' },
  GBP: { name: 'British Pound', rateInUsd: 1.28, symbol: '£', type: 'fiat' },
  JPY: { name: 'Japanese Yen', rateInUsd: 0.0068, symbol: '¥', type: 'fiat' },
  CAD: { name: 'Canadian Dollar', rateInUsd: 0.74, symbol: 'CA$', type: 'fiat' },
  AUD: { name: 'Australian Dollar', rateInUsd: 0.66, symbol: 'AU$', type: 'fiat' },
  CHF: { name: 'Swiss Franc', rateInUsd: 1.13, symbol: 'CHF', type: 'fiat' },
  INR: { name: 'Indian Rupee', rateInUsd: 0.012, symbol: '₹', type: 'fiat' },
  SGD: { name: 'Singapore Dollar', rateInUsd: 0.76, symbol: 'S$', type: 'fiat' },
  AED: { name: 'UAE Dirham', rateInUsd: 0.272, symbol: 'AED', type: 'fiat' },
  
  BTC: { name: 'Bitcoin', rateInUsd: 64200.0, symbol: '₿', type: 'crypto' },
  ETH: { name: 'Ethereum', rateInUsd: 3480.0, symbol: 'Ξ', type: 'crypto' },
  SOL: { name: 'Solana', rateInUsd: 152.0, symbol: 'SOL', type: 'crypto' },
  BNB: { name: 'Binance Coin', rateInUsd: 585.0, symbol: 'BNB', type: 'crypto' },
  XRP: { name: 'Ripple XRP', rateInUsd: 0.58, symbol: 'XRP', type: 'crypto' },
  ADA: { name: 'Cardano', rateInUsd: 0.42, symbol: 'ADA', type: 'crypto' },
  DOGE: { name: 'Dogecoin', rateInUsd: 0.125, symbol: 'DOGE', type: 'crypto' },
  AVAX: { name: 'Avalanche', rateInUsd: 28.5, symbol: 'AVAX', type: 'crypto' },
  LINK: { name: 'Chainlink', rateInUsd: 14.2, symbol: 'LINK', type: 'crypto' },
  USDT: { name: 'Tether USD', rateInUsd: 1.0, symbol: '₮', type: 'crypto' }
};

export const CurrencyCryptoPage: React.FC = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState<number>(1000);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'1D' | '7D' | '1M' | '1Y'>('7D');
  const [lastUpdated, setLastUpdated] = useState<string>('Example rates · Sep 2026');

  const convertedValue = useMemo(() => {
    const fromRate = RATES[fromCurrency]?.rateInUsd || 1;
    const toRate = RATES[toCurrency]?.rateInUsd || 1;
    const inUsd = amount * fromRate;
    return (inUsd / toRate).toFixed(4);
  }, [amount, fromCurrency, toCurrency]);

  const exchangeRate = useMemo(() => {
    const fromRate = RATES[fromCurrency]?.rateInUsd || 1;
    const toRate = RATES[toCurrency]?.rateInUsd || 1;
    return (fromRate / toRate).toFixed(4);
  }, [fromCurrency, toCurrency]);

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  // Remittance comparison calculations
  const remittanceComparison = useMemo(() => {
    const amountNum = Number(amount) || 1000;
    const targetVal = Number(convertedValue) || 1000;

    return [
      {
        provider: 'Traditional Bank Wire',
        feePercent: '3.8% + $35 wire fee',
        feeAmount: `$${(amountNum * 0.038 + 35).toFixed(2)}`,
        recipientGets: `${(targetVal * 0.945).toFixed(2)} ${toCurrency}`,
        speed: '3 - 5 business days',
        badge: 'Expensive / Slow',
        badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
      },
      {
        provider: 'Wise / Peer-to-Peer Transfer',
        feePercent: '0.45% mid-market spread',
        feeAmount: `$${(amountNum * 0.0045 + 1.2).toFixed(2)}`,
        recipientGets: `${(targetVal * 0.993).toFixed(2)} ${toCurrency}`,
        speed: 'Instant - 4 hours',
        badge: 'Recommended Fiat',
        badgeColor: 'bg-cyan-950/60 text-[#007A82] border-cyan-800/60'
      },
      {
        provider: 'Crypto Settlement (USDT / SOL)',
        feePercent: '0.01% blockchain gas fee',
        feeAmount: `$0.05 - $0.80`,
        recipientGets: `${(targetVal * 0.999).toFixed(2)} ${toCurrency}`,
        speed: '~ 400 milliseconds',
        badge: 'Fastest & Lowest Cost',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      }
    ];
  }, [amount, convertedValue, toCurrency]);

  // Synthetic SVG Trend Chart generator based on selected timeframe
  const chartPoints = useMemo(() => {
    const pointsCount = 20;
    const base = Number(exchangeRate) || 1;
    const pts: { x: number; y: number; val: number }[] = [];
    for (let i = 0; i < pointsCount; i++) {
      const variation = (Math.sin(i * 0.7) * 0.05 + Math.cos(i * 0.3) * 0.03) * base;
      const val = base + variation;
      const x = (i / (pointsCount - 1)) * 500;
      const y = 140 - ((val - base * 0.9) / (base * 0.2)) * 100;
      pts.push({ x, y: Math.max(10, Math.min(130, y)), val });
    }
    return pts;
  }, [exchangeRate, selectedTimeframe]);

  const svgPath = chartPoints.map((p, idx) => (idx === 0 ? `M ${p.x},${p.y}` : `L ${p.x},${p.y}`)).join(' ');

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
            <span>Productivity & Utility</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540] flex items-center gap-2.5">
            <Coins className="w-7 h-7 text-blue-400" />
            Reference FX worksheet
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Static example rates (not live). Hypothetical remittance fees. Not investment advice.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Example rate: {lastUpdated}</span>
        </div>
      </div>

      <div className="mt-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
        Rates are hardcoded examples last authored September 2026 — not a live market feed. The chart is an illustration. Remittance cards are hypothetical fee examples, not quotes. Not financial advice.
      </div>

      <div className="my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Converter Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Send Amount
              </label>
              <div className="relative flex items-center">
                <input
                  type="number"
                  min="0.0001"
                  value={amount}
                  onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                  className="w-full pl-4 pr-24 py-3.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-lg font-bold text-[#0A2540] focus:outline-none focus:border-[#00A3AD]"
                />
                <div className="absolute right-3">
                  <select
                    value={fromCurrency}
                    onChange={(e) => setFromCurrency(e.target.value)}
                    className="px-2 py-1.5 rounded-xl bg-slate-900 border border-slate-200 text-xs font-bold text-[#007A82] focus:outline-none"
                  >
                    <optgroup label="Fiat Currencies">
                      {Object.entries(RATES)
                        .filter(([_, v]) => v.type === 'fiat')
                        .map(([k, v]) => (
                          <option key={k} value={k}>
                            {k} - {v.name}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Top Cryptos">
                      {Object.entries(RATES)
                        .filter(([_, v]) => v.type === 'crypto')
                        .map(([k, v]) => (
                          <option key={k} value={k}>
                            {k} - {v.name}
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>
              </div>
            </div>

            {/* Swap Button */}
            <div className="flex justify-center -my-2">
              <button
                onClick={swapCurrencies}
                className="p-2.5 rounded-full bg-white hover:bg-slate-50 text-[#00A3AD] border border-slate-200 transition-all hover:rotate-180 duration-300 shadow-md cursor-pointer"
              >
                <ArrowRightLeft className="w-4 h-4" />
              </button>
            </div>

            {/* Destination Currency */}
            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                Converted Recipient Value
              </label>
              <div className="relative flex items-center">
                <div className="w-full pl-4 pr-24 py-3.5 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-emerald-400">
                  {convertedValue}
                </div>
                <div className="absolute right-3">
                  <select
                    value={toCurrency}
                    onChange={(e) => setToCurrency(e.target.value)}
                    className="px-2 py-1.5 rounded-xl bg-slate-900 border border-slate-200 text-xs font-bold text-[#007A82] focus:outline-none"
                  >
                    <optgroup label="Fiat Currencies">
                      {Object.entries(RATES)
                        .filter(([_, v]) => v.type === 'fiat')
                        .map(([k, v]) => (
                          <option key={k} value={k}>
                            {k} - {v.name}
                          </option>
                        ))}
                    </optgroup>
                    <optgroup label="Top Cryptos">
                      {Object.entries(RATES)
                        .filter(([_, v]) => v.type === 'crypto')
                        .map(([k, v]) => (
                          <option key={k} value={k}>
                            {k} - {v.name}
                          </option>
                        ))}
                    </optgroup>
                  </select>
                </div>
              </div>
            </div>

            {/* Exchange rate footnote */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
              <span>Example mid-market (fixed table):</span>
              <span className="font-mono text-[#0A2540] font-bold">
                1 {fromCurrency} = {exchangeRate} {toCurrency}
              </span>
            </div>
          </div>
        </div>

        {/* Trend Chart & Market Context */}
        <div className="lg:col-span-6 space-y-6">
          <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#00A3AD]" />
                <h3 className="text-xs font-bold text-[#0A2540] uppercase tracking-wider">
                  {fromCurrency}/{toCurrency} illustration
                </h3>
              </div>

              <div className="flex gap-1 bg-[#F4F8FA] p-1 rounded-xl border border-slate-200">
                {(['1D', '7D', '1M', '1Y'] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold transition-all ${
                      selectedTimeframe === tf ? 'bg-cyan-500/20 text-[#007A82]' : 'text-slate-500'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* SVG Trend Line */}
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Illustration only — not historical market data</p>
            <div className="w-full h-40 bg-[#F4F8FA] rounded-2xl p-3 border border-slate-200 flex items-center justify-center relative overflow-hidden">
              <svg viewBox="0 0 500 150" className="w-full h-full">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.0" />
                  </linearGradient>
                </defs>
                <path
                  d={`${svgPath} L 500,150 L 0,150 Z`}
                  fill="url(#chartGradient)"
                />
                <path
                  d={svgPath}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Remittance Arbitrage Comparison Table */}
      <div className="my-8 space-y-4">
        <h3 className="text-base font-bold text-[#0A2540] flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#00A3AD]" />
          <span>Hypothetical remittance fee examples</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {remittanceComparison.map((r, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-white border border-slate-200 p-6 flex flex-col justify-between backdrop-blur-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${r.badgeColor}`}>
                    {r.badge}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-[#0A2540] mb-2">{r.provider}</h4>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Estimated Fee:</span>
                    <span className="font-mono text-rose-600 font-bold">{r.feeAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Recipient Receives:</span>
                    <span className="font-mono text-emerald-700 font-bold">{r.recipientGets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Transfer Duration:</span>
                    <span className="text-[#0A2540]">{r.speed}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200 text-[10px] text-slate-500">
                {r.feePercent}
              </div>
            </div>
          ))}
        </div>
      </div>

      <AdBanner type="leaderboard" />
    </div>
  );
};
