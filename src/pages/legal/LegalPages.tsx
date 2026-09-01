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
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">Last updated: September 2026</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">1. Operator</h2>
          <p className="font-medium">
            OmniCraft Studio is operated by <strong>Souren Das</strong>, Bengaluru, Karnataka, India.
            Questions: <a href="mailto:privacy@omnicraft.studio" className="text-[#007A82] underline font-bold">privacy@omnicraft.studio</a>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">2. How file tools work (browser-local processing)</h2>
          <p className="font-medium">
            The 12 utilities — document conversion, PDF merge/split/watermark, image compression, SVG editing, text diff, QR generation, hashing, and health estimates — run <strong>inside your browser</strong> using Web APIs, Canvas, and (where used) WebAssembly. OmniCraft does not operate a server that receives, stores, or inspects your documents, resumes, images, or code.
          </p>
          <p className="font-medium text-emerald-800 bg-emerald-50 p-3 rounded-2xl border border-emerald-200">
            <strong>What this means:</strong> files and resume text are processed in this tab and are not sent to OmniCraft servers or third-party AI. Hosting the website itself (HTML, CSS, JavaScript, and remote images on tool cards) is separate from file processing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">3. What we do not collect from the tools</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 font-medium">
            <li>We do not upload your PDFs, DOCX, images, or audio to OmniCraft servers.</li>
            <li>Resume text and job descriptions stay in browser memory unless you download a PDF.</li>
            <li>Currency figures on the FX worksheet are static examples, not a market data feed.</li>
            <li>We do not run advertising or analytics scripts today. If that changes, this policy will be updated first.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">4. Local storage</h2>
          <p className="font-medium">
            We use browser <code className="text-[#007A82] bg-[#E6F8F9] px-2 py-0.5 rounded-md font-mono border border-[#B3EAEF]">localStorage</code> only for UI preferences and a local Pro-preview flag:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 font-medium">
            <li><code className="font-mono text-xs">omnicraft_pro_member_v1</code> — whether Pro preview is on in this browser</li>
            <li><code className="font-mono text-xs">omnicraft_pro_plan_v1</code> — selected plan in the preview modal</li>
          </ul>
          <p className="font-medium">Clear this site’s data in your browser to delete it. This flag is not a paid license.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">5. Third-party content on the website</h2>
          <p className="font-medium">
            Tool cards may load photographs from Unsplash or other public CDNs. Your browser requests those images directly. The static app files are served by whatever host we use for the site (for example a static-file host). Those hosts may see standard web-server logs (IP, user agent) as any website does.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">6. Children</h2>
          <p className="font-medium">
            OmniCraft Studio is not directed at children under 13. We do not knowingly collect personal information from children.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">7. Access and deletion</h2>
          <p className="font-medium">
            Because we do not store your files on our servers, there is no OmniCraft account database of documents to access or erase. Delete files from your device and clear this site’s browser data. For questions, email <a href="mailto:privacy@omnicraft.studio" className="text-[#007A82] underline font-bold">privacy@omnicraft.studio</a>.
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
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">Last updated: September 2026</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">1. Operator and acceptance</h2>
          <p className="font-medium">
            These terms are between you and <strong>Souren Das</strong> (Bengaluru, Karnataka, India) for the OmniCraft Studio website. By using the tools you agree to these terms. If you do not agree, do not use the site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">2. Plans and checkout status</h2>
          <p className="font-medium">Intended paid tiers when billing launches:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 font-medium">
            <li><strong>Free:</strong> core in-browser tools at no charge.</li>
            <li><strong>Pro Monthly ($7 / month)</strong></li>
            <li><strong>Pro Yearly ($70 / year)</strong> — about 16% less than 12 × $7</li>
            <li><strong>Pro Lifetime ($130 one-time)</strong></li>
          </ul>
          <p className="font-medium text-amber-900 bg-amber-50 p-3 rounded-2xl border border-amber-200">
            Checkout is not live. “Activate Free Pro Preview” turns on a local <code className="font-mono">localStorage</code> flag in this browser. It is not a paid license and does not charge a card.
          </p>
          <p className="font-medium">
            Files, images, QR codes, and SVGs you generate are yours to use personally or commercially, subject to third-party rights in content you paste in.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">3. Acceptable use</h2>
          <p className="font-medium">
            Do not use the tools for unlawful content or to infringe others’ rights. You are responsible for the files you process and the outputs you download.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">4. Disclaimer of warranties</h2>
          <p className="font-medium">
            OmniCraft Studio is provided “AS IS” and “AS AVAILABLE” without warranties of any kind. We are not liable for indirect, incidental, or consequential damages from use or inability to use the tools.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">5. Refunds (when paid billing launches)</h2>
          <p className="font-medium">
            No money is collected today. When paid billing launches, we intend a 30-day refund from the purchase date for monthly, yearly, and lifetime plans if you are not satisfied, requested at <a href="mailto:support@omnicraft.studio" className="text-[#007A82] underline font-bold">support@omnicraft.studio</a>. Lifetime is a one-time fee at launch; the same 30-day window would run from that purchase date.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">6. Governing law</h2>
          <p className="font-medium">These terms are governed by the laws of India.</p>
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
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">Last updated: September 2026</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">1. No tracking cookies today</h2>
          <p className="font-medium">
            OmniCraft Studio does not set advertising or analytics cookies. Advertising cookies are not used now.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">2. Essential local storage</h2>
          <p className="font-medium">
            We use browser localStorage (not third-party cookies) for:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-slate-600 font-medium">
            <li><code className="font-mono text-xs">omnicraft_pro_member_v1</code> — Pro preview on/off</li>
            <li><code className="font-mono text-xs">omnicraft_pro_plan_v1</code> — selected plan in the demo modal</li>
          </ul>
          <p className="font-medium">You can delete these by clearing site data for this origin.</p>
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
            <h1 className="text-2xl sm:text-3xl font-black text-[#0A2540]">Disclaimer</h1>
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">Financial, health & resume scoring</p>
          </div>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">1. Currency worksheet</h2>
          <p className="font-medium">
            Figures in the Currency & Crypto worksheet are <strong>static reference numbers for illustration</strong>, authored around September 2026. They are not live quotes, not a market data feed, and not financial, investment, or trading advice.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">2. Health calculations</h2>
          <p className="font-medium">
            BMR, TDEE, and macros use published formulas such as Mifflin-St Jeor. Outputs are estimates only and are <strong>not medical advice</strong>. They do not replace a clinician or registered dietitian.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-[#0A2540]">3. Resume keyword overlap</h2>
          <p className="font-medium">
            The match percentage is a <strong>local keyword-overlap heuristic</strong> against a list of common terms found in the job description you paste. It is not an employer applicant-tracking system and does not guarantee interviews or jobs.
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
            <p className="text-xs text-slate-500 font-mono mt-0.5 font-bold">Email Souren Das · Bengaluru, India</p>
          </div>
        </div>

        {submitted ? (
          <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-black text-[#0A2540]">Open your email app</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto font-medium">
              Your email app should open with a draft to <span className="text-[#007A82] font-mono font-bold">support@omnicraft.studio</span>. If nothing opens, email that address directly.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="mt-4 px-5 py-2 rounded-full bg-[#00A3AD] text-white text-xs font-black cursor-pointer hover:bg-[#00B5B8]"
            >
              Compose another
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
                  placeholder="Your name"
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
                  placeholder="you@example.com"
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
                placeholder="How can we help with OmniCraft Studio?"
                className="w-full p-4 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs text-[#0A2540] font-medium focus:outline-none focus:border-[#00A3AD] focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              className="flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#00A3AD] to-[#008C95] hover:from-[#00B5B8] hover:to-[#00A3AD] text-white font-black text-xs shadow-lg shadow-teal-500/20 transition-all cursor-pointer active:scale-95 tracking-tight"
            >
              <Send className="w-4 h-4" />
              <span>Open email draft</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
