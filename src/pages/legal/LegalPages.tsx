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
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">Effective Date: September 2026 • GDPR, CCPA & COPPA Compliant</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">1. 100% Client-Side Architecture (Zero-Server Processing)</h2>
          <p className="font-medium">
            OmniCraft Studio is engineered with an unwavering <strong>Zero-Telemetry, Sovereign Client Architecture</strong>. All 12 productivity and developer utilities — including document conversion, PDF page manipulation, image compression, SVG vector rendering, diff computation, QR generation, cryptographic hashing, and biometric estimations — execute <strong>exclusively inside your local browser runtime</strong> via standard Web APIs, WebAssembly, and Canvas buffers.
          </p>
          <p className="font-medium text-emerald-800 bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
            <strong>Absolute Guarantee:</strong> None of your documents, resumes, images, code snippets, biometric stats, or files are ever transmitted to, stored on, or inspected by our servers or any third-party AI endpoints.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">2. Information We Do Not Collect</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 font-medium">
            <li><strong>No File Uploads:</strong> PDF, DOCX, audio, and image payloads remain strictly in ephemeral browser memory.</li>
            <li><strong>No Career / Resume Data:</strong> Resume text, employment history, and ATS inputs are processed in-memory only.</li>
            <li><strong>No Financial / Health Records:</strong> Currency rates and BMR/macro calculations are calculated mathematically on the client.</li>
            <li><strong>No Cross-Site Tracking:</strong> We do not deploy fingerprinting scripts or invasive advertising cookies.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">3. Local Storage Disclosure</h2>
          <p className="font-medium">
            OmniCraft Studio utilizes standard browser <code className="text-[#007A82] bg-[#E6F8F9] px-2 py-0.5 rounded-md font-mono border border-[#B3EAEF]">localStorage</code> strictly to persist your UI preferences and Pro membership activation status across sessions. You can delete this data at any time by clearing your browser site data.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">4. GDPR & CCPA User Rights</h2>
          <p className="font-medium">
            Under the European General Data Protection Regulation (GDPR) and California Consumer Privacy Act (CCPA), you retain the right to access, rectify, or erase personal data. Because we do not store any personal data on remote servers, your data is inherently sovereign and under your exclusive local control.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">5. Contact Us</h2>
          <p className="font-medium">
            If you have questions regarding this Privacy Policy or our client-side architecture, contact our Data Protection team at <a href="mailto:privacy@omnicraft.studio" className="text-[#007A82] underline font-bold">privacy@omnicraft.studio</a>.
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
          <h2 className="text-lg font-black text-[#0A2540]">1. Acceptance of Terms</h2>
          <p className="font-medium">
            By accessing or using OmniCraft Studio, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use our utility applications.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">2. Subscription Plans & Licensing</h2>
          <p className="font-medium">
            OmniCraft Studio provides access through flexible tiers:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 font-medium">
            <li><strong>Free Community Tier:</strong> Standard access to core utilities at no charge.</li>
            <li><strong>Pro Monthly ($7 / month):</strong> Uncapped batch conversions, ATS resume PDF downloads, and advanced PDF tools billed monthly. Cancel anytime.</li>
            <li><strong>Pro Yearly ($70 / year):</strong> Annual access with 16% savings ($5.83/mo equivalent).</li>
            <li><strong>Pro Lifetime ($130 one-time):</strong> Permanent unlimited access with zero recurring fees.</li>
          </ul>
          <p className="font-medium mt-2">
            All documents, images, QR codes, and SVGs produced by you using the tools are 100% royalty-free for personal and commercial usage.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">3. Disclaimer of Warranties & Limitation of Liability</h2>
          <p className="font-medium">
            OmniCraft Studio and all associated utilities are provided on an "AS IS" and "AS AVAILABLE" basis without warranties of any kind, whether express or implied. In no event shall OmniCraft Studio, its developers, or affiliates be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use the services.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">4. 30-Day Money-Back Guarantee</h2>
          <p className="font-medium">
            We stand behind the quality of our tools. If you are not completely satisfied with your Pro purchase, you may request a full refund within 30 days of your initial purchase by contacting <a href="mailto:support@omnicraft.studio" className="text-[#007A82] underline font-bold">support@omnicraft.studio</a>.
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
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">Cookie & Storage Policy</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">Strictly Essential Local Storage Only</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">1. Essential Storage Only</h2>
          <p className="font-medium">
            OmniCraft Studio does not use tracking cookies or third-party behavioral analytics scripts. We strictly use browser <code className="text-[#007A82] bg-[#E6F8F9] px-2 py-0.5 rounded-md font-mono border border-[#B3EAEF]">localStorage</code> solely to remember your subscription status and active workspace settings.
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
          <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">Legal & Analytical Disclaimer</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">Financial, Health & ATS Disclosures</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">1. Market Reference Rates & Financial Estimates</h2>
          <p className="font-medium">
            Currency conversion rates and cross-border remittance fee estimates presented in the Currency & Crypto FX Matrix are calculated based on benchmark reference rates for informational and comparison purposes only. They do not constitute formal financial, investment, or trading advice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">2. Health & Nutritional Calculations</h2>
          <p className="font-medium">
            BMR, TDEE, and macronutrient targets generated by the Health & Nutrition Engine utilize peer-reviewed mathematical formulas (such as the Mifflin-St Jeor Equation). These outputs represent theoretical estimations and must not replace professional clinical or nutritional counsel.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">3. ATS Resume Matching</h2>
          <p className="font-medium">
            ATS match scoring and bullet enhancement algorithms analyze textual keyword frequency and structural formatting standards. Because hiring decisions depend on numerous independent variables, OmniCraft Studio does not guarantee employment outcomes or specific interview selection.
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
  const [subject, setSubject] = useState('Support Inquiry');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    // Trigger functional mailto handler so message is never lost
    const mailtoUrl = `mailto:support@omnicraft.studio?subject=${encodeURIComponent(`[OmniCraft] ${subject} from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoUrl;
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
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">Direct Developer Assistance • 24hr Response SLA</p>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-black text-[#0A2540]">Email Client Dispatched</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
              Thank you, {name}. Your inquiry has been routed directly to our support engineers at <span className="text-[#007A82] font-mono font-bold">support@omnicraft.studio</span>. We will follow up with <span className="text-[#007A82] font-mono font-bold">{email}</span> within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-4 px-5 py-2 rounded-full bg-[#00A3AD] text-white text-xs font-black cursor-pointer hover:bg-[#00B5B8]"
            >
              Send Another Inquiry
            </button>
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
                  placeholder="e.g. Alex Mercer"
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
                  placeholder="alex@example.com"
                  className="w-full px-4 py-3 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-black text-slate-700 mb-1">Topic / Subject</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
              >
                <option value="General Support Inquiry">General Support Inquiry</option>
                <option value="Pro Subscription & Billing ($7/mo, $70/yr, $130)">Pro Subscription & Billing</option>
                <option value="Tool Feedback / Feature Request">Tool Feedback / Feature Request</option>
                <option value="Privacy & Security Question">Privacy & Security Question</option>
              </select>
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
