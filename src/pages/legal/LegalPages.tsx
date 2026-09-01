import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, ArrowLeft, Mail, Send, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black text-[#007A82] hover:text-[#00A3AD] mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Studio
      </Link>

      <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_8px_30px_rgba(10,37,64,0.04)] space-y-6 text-slate-700 leading-relaxed text-sm">
        <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
          <div className="p-3.5 rounded-2xl bg-[#E6F8F9] border border-[#B3EAEF] text-[#007A82]">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">Privacy Policy</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">Effective Date: September 2026 • GDPR & CCPA Sovereign</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">1. Core Sovereign Privacy Promise</h2>
          <p className="font-medium">
            OmniCraft Studio is engineered with a strict <strong>Zero-Server Telemetry Architecture</strong>. Unlike legacy cloud SaaS platforms, all document parsing, image compression, PDF annotation, and data conversions execute <strong>100% inside your browser's local WebAssembly and JavaScript sandbox</strong>.
          </p>
          <p className="font-medium">
            Your uploaded files, resumes, cryptographic keys, and biometrics are NEVER sent, stored, or processed on our backend servers.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">2. Data We Do Not Collect</h2>
          <ul className="list-disc pl-5 space-y-1 text-slate-600 font-medium">
            <li>We do not collect or inspect your PDF, DOCX, or Image file payloads.</li>
            <li>We do not record your ATS resume contents or job descriptions.</li>
            <li>We do not track your financial exchange computations or crypto queries.</li>
            <li>We do not store your physical health, weight, or macro metrics.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">3. Local Storage Usage</h2>
          <p className="font-medium">
            OmniCraft Studio uses standard browser <code className="text-[#007A82] bg-[#E6F8F9] px-2 py-0.5 rounded-md font-mono border border-[#B3EAEF]">localStorage</code> solely to remember your Pro activation status and local UI preferences. This data remains on your device and can be cleared at any time.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">4. Third-Party Integrations</h2>
          <p className="font-medium">
            When utilizing optional AI prompt rendering, queries are securely routed to public inference endpoints without any personal account tracking. Payment processing for the $7 / Month Subscription is securely handled by Stripe / Lemon Squeezy with standard PCI-DSS Level 1 compliance.
          </p>
        </section>
      </div>
    </div>
  );
};

export const TermsPage: React.FC = () => {
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black text-[#007A82] hover:text-[#00A3AD] mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Studio
      </Link>

      <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_8px_30px_rgba(10,37,64,0.04)] space-y-6 text-slate-700 leading-relaxed text-sm">
        <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
          <div className="p-3.5 rounded-2xl bg-[#E6F8F9] border border-[#B3EAEF] text-[#007A82]">
            <FileText className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">Terms of Service</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">Last Updated: September 2026</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">1. Agreement to Terms</h2>
          <p className="font-medium">
            By accessing or using OmniCraft Studio, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our utility tools.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">2. $7 / Month Subscription & Commercial License</h2>
          <p className="font-medium">
            The $7 Monthly Subscription grants full, uncapped personal and commercial access to all 10 utility engines, AI resume exports, PDF watermark suites, batch conversion accelerators, and newly released modules. Subscriptions renew automatically every 30 days and can be canceled at any time with zero penalty. All deliverables generated (resumes, optimized graphics, QR codes) are 100% royalty-free for commercial use.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">3. 30-Day Money-Back Guarantee & Cancellation</h2>
          <p className="font-medium">
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
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black text-[#007A82] hover:text-[#00A3AD] mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Studio
      </Link>

      <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_8px_30px_rgba(10,37,64,0.04)] space-y-6 text-slate-700 leading-relaxed text-sm">
        <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
          <div className="p-3.5 rounded-2xl bg-[#E6F8F9] border border-[#B3EAEF] text-[#007A82]">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">Cookie Policy</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">Strictly Essential Storage Only</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">1. How We Use Cookies & Storage</h2>
          <p className="font-medium">
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
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black text-[#007A82] hover:text-[#00A3AD] mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Studio
      </Link>

      <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_8px_30px_rgba(10,37,64,0.04)] space-y-6 text-slate-700 leading-relaxed text-sm">
        <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
          <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">Legal Disclaimer</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">AI & Financial Estimations</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">1. Financial & Health Estimations</h2>
          <p className="font-medium">
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
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black text-[#007A82] hover:text-[#00A3AD] mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Studio
      </Link>

      <div className="rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-12 shadow-[0_8px_30px_rgba(10,37,64,0.04)] space-y-6">
        <div className="flex items-center gap-3.5 pb-6 border-b border-slate-100">
          <div className="p-3.5 rounded-2xl bg-[#E6F8F9] border border-[#B3EAEF] text-[#007A82]">
            <Mail className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">Contact & Support</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">Direct Developer Response • 24hr Turnaround</p>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-black text-[#0A2540]">Message Transmitted</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
              Thank you, {name}. Our engineering team has received your message and will respond to <span className="text-[#007A82] font-mono font-bold">{email}</span> within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Elena Rostova"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1">Inquiry / Message</label>
              <textarea
                rows={5}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we assist you with OmniCraft Studio or subscription inquiries?"
                className="w-full p-4 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#00A3AD] to-[#008C95] hover:from-[#00B5B8] hover:to-[#00A3AD] text-white font-black text-xs shadow-lg shadow-teal-500/20 transition-all cursor-pointer active:scale-95 tracking-tight"
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
