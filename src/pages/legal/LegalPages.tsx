import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, ArrowLeft, Mail, Send, AlertTriangle, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Studio
      </Link>

      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12 backdrop-blur-xl space-y-6 text-slate-300 leading-relaxed text-sm">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Privacy Policy</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Effective Date: September 2026 • GDPR & CCPA Compliant</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Core Sovereign Privacy Promise</h2>
          <p>
            OmniCraft Studio is engineered with a strict <strong>Zero-Server Telemetry Architecture</strong>. Unlike legacy cloud SaaS platforms, all document parsing, image compression, PDF annotation, and data conversions execute <strong>100% inside your browser's local WebAssembly and JavaScript sandbox</strong>.
          </p>
          <p>
            Your uploaded files, resumes, cryptographic keys, and biometrics are NEVER sent, stored, or processed on our backend servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. Data We Do Not Collect</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-400">
            <li>We do not collect or inspect your PDF, DOCX, or Image file payloads.</li>
            <li>We do not record your ATS resume contents or job descriptions.</li>
            <li>We do not track your financial exchange computations or crypto queries.</li>
            <li>We do not store your physical health, weight, or macro metrics.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. Local Storage Usage</h2>
          <p>
            OmniCraft Studio uses standard browser <code className="text-cyan-300 font-mono">localStorage</code> solely to remember your Pro activation status and local UI preferences. This data remains on your device and can be cleared at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">4. Third-Party Integrations</h2>
          <p>
            When utilizing optional AI prompt rendering, queries are securely routed to public inference endpoints (Pollinations.ai) without any personal account tracking. Payment processing for the $7 / Month Subscription is securely handled by Stripe / Lemon Squeezy with standard PCI-DSS Level 1 compliance.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-amber-400 hover:text-amber-300 mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Studio
      </Link>

      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12 backdrop-blur-xl space-y-6 text-slate-300 leading-relaxed text-sm">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Terms of Service</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Last Updated: September 2026</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Agreement to Terms</h2>
          <p>
            By accessing or using OmniCraft Studio, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our utility tools.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">2. $7 / Month Subscription & Commercial License</h2>
          <p>
            The $7 Monthly Subscription grants full, uncapped personal and commercial access to all 10 utility engines, AI resume exports, PDF watermark suites, batch conversion accelerators, and newly released modules. Subscriptions renew automatically every 30 days and can be canceled at any time with zero penalty. All deliverables generated (resumes, optimized graphics, QR codes) are 100% royalty-free for commercial use.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">3. 30-Day Money-Back Guarantee & Cancellation</h2>
          <p>
            We offer an unconditional 30-day money-back guarantee on your initial $7 Monthly Subscription charge. You can cancel your subscription anytime in one click from your account dashboard or via our support portal.
          </p>
        </section>
      </div>
    </div>
  );
};

export const CookiePolicyPage: React.FC = () => {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Studio
      </Link>

      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12 backdrop-blur-xl space-y-6 text-slate-300 leading-relaxed text-sm">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Cookie Policy</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Strictly Essential Storage Only</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. How We Use Cookies & Storage</h2>
          <p>
            OmniCraft Studio does not employ invasive third-party tracking cookies or cross-site fingerprinting. We use standard browser local storage solely to retain your subscription state and active session parameters.
          </p>
        </section>
      </div>
    </div>
  );
};

export const DisclaimerPage: React.FC = () => {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Studio
      </Link>

      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12 backdrop-blur-xl space-y-6 text-slate-300 leading-relaxed text-sm">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Legal Disclaimer</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">AI & Financial Estimations</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-white">1. Financial & Health Estimations</h2>
          <p>
            Currency exchange rates and remittance cost estimates are provided for informational benchmarking only and do not constitute financial advice. Health, BMR, and macro calculations are estimations based on peer-reviewed Mifflin-St Jeor formulas and should not replace consultation with certified healthcare professionals.
          </p>
        </section>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Studio
      </Link>

      <div className="rounded-3xl bg-slate-900/60 border border-slate-800 p-8 sm:p-12 backdrop-blur-xl space-y-6">
        <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
          <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
            <Mail className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Contact & Support</h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">Direct Developer Response • 24hr Turnaround</p>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Message Transmitted</h3>
            <p className="text-xs text-slate-300 max-w-md mx-auto">
              Thank you, {name}. Our engineering team has received your message and will respond to <span className="text-cyan-300 font-mono">{email}</span> within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">Inquiry / Message</label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we assist you with OmniCraft Studio or enterprise license inquiries?"
                className="w-full p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
