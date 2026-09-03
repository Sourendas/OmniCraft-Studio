import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, ArrowLeft, Mail, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Back = () => (
  <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black text-[#007A82] mb-6">
    <ArrowLeft className="w-3.5 h-3.5" /> Back to tools
  </Link>
);

export const PrivacyPolicyPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Back />
    <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-5 text-sm text-slate-700">
      <div className="flex items-center gap-3"><ShieldCheck className="w-8 h-8 text-[#007A82]" /><div><h1 className="text-3xl font-black text-[#0A2540]">Privacy Policy</h1><p className="text-xs text-slate-500">Last updated: 3 September 2026</p></div></div>
      <h2 className="text-lg font-black text-[#0A2540]">1. Who we are</h2>
      <p>FileTools Kit (filetoolskit.com) is operated by <strong>Souren Das</strong>, Bengaluru, Karnataka, India. Privacy contact: <a className="text-[#007A82] underline" href="mailto:privacy@filetoolskit.com">privacy@filetoolskit.com</a>. Support: <a className="text-[#007A82] underline" href="mailto:support@filetoolskit.com">support@filetoolskit.com</a>.</p>
      <h2 className="text-lg font-black text-[#0A2540]">2. What the tools do with your files</h2>
      <p>The 12 utilities run in your browser with libraries such as pdf-lib, jsPDF, and the Canvas API. We do not operate an upload API that receives your PDFs, images, resume text, or other files you open in a tool. Closing the tab discards that working copy unless you downloaded it.</p>
      <h2 className="text-lg font-black text-[#0A2540]">3. What the website host may see</h2>
      <p>The site is hosted on Vercel. Like most websites, the host may process technical request data (IP address, browser type, pages requested, timestamps) to serve pages and keep the service online. That is separate from opening a file inside a tool.</p>
      <h2 className="text-lg font-black text-[#0A2540]">4. Third-party content on pages</h2>
      <p>Tool-card photos may load from Unsplash. Google Fonts may load Outfit and related typefaces. Those providers receive a request from your browser for that asset. Contact form submit opens your own email app with a mailto: draft to support@filetoolskit.com; we do not run a message database.</p>
      <h2 className="text-lg font-black text-[#0A2540]">5. Advertising and analytics</h2>
      <p>This site does not run Google AdSense, Meta ads, or analytics scripts today. If advertising or measurement is added later, this policy will be updated first and the legal pages will describe the vendor.</p>
      <h2 className="text-lg font-black text-[#0A2540]">6. Local storage</h2>
      <p>The browser may keep UI preferences in localStorage. A first-party A/B helper may also store a random visitor id, experiment assignment, and click counts in this browser only. Those records are not sent to FileTools Kit or an analytics vendor. There is no paid account. Clear site data for filetoolskit.com to delete local items.</p>
      <h2 className="text-lg font-black text-[#0A2540]">7. Children</h2>
      <p>The site is not directed at children under 13.</p>
      <h2 className="text-lg font-black text-[#0A2540]">8. Your requests</h2>
      <p>Email privacy@filetoolskit.com for questions. We respond from Bengaluru, India. This policy is meant to describe current practice; it is not a certification of GDPR, CCPA, HIPAA, or COPPA compliance.</p>
    </div>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Back />
    <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-5 text-sm text-slate-700">
      <div className="flex items-center gap-3"><FileText className="w-8 h-8 text-[#007A82]" /><div><h1 className="text-3xl font-black text-[#0A2540]">Terms of Service</h1><p className="text-xs text-slate-500">Last updated: 3 September 2026</p></div></div>
      <p>These terms are between you and Souren Das (Bengaluru, India) for filetoolskit.com.</p>
      <p>All 12 tools are free to use in the browser. There is no paid upgrade or checkout on this site. Outputs you generate are yours, subject to third-party rights in content you paste in.</p>
      <p>Do not use the tools for unlawful content. Tools are provided as-is. Encrypted PDFs, unusual file types, and very large files may fail in the browser. Governed by the laws of India.</p>
    </div>
  </div>
);

export const CookiePolicyPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Back />
    <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-5 text-sm text-slate-700">
      <div className="flex items-center gap-3"><Lock className="w-8 h-8 text-[#007A82]" /><h1 className="text-3xl font-black text-[#0A2540]">Cookie & Storage Policy</h1></div>
      <p>FileTools Kit does not set advertising or analytics cookies today. The browser may store UI preferences and first-party A/B assignment keys (ftk_ab_visitor, ftk_ab_assign, ftk_ab_events) in localStorage. Those stay on your device. Vercel and font/image CDNs may set their own technical cookies when assets load. Clear site data for filetoolskit.com to delete first-party storage.</p>
    </div>
  </div>
);

export const DisclaimerPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Back />
    <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-5 text-sm text-slate-700">
      <div className="flex items-center gap-3"><AlertTriangle className="w-8 h-8 text-amber-700" /><h1 className="text-3xl font-black text-[#0A2540]">Disclaimer</h1></div>
      <p>Currency figures are static examples, not live quotes or financial advice.</p>
      <p>Health numbers use formulas such as Mifflin-St Jeor and are not medical advice.</p>
      <p>Resume match percentage is a local keyword-overlap heuristic, not an employer ATS.</p>
    </div>
  </div>
);

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:support@filetoolskit.com?subject=${encodeURIComponent('[File Tools Kit] from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
      <Back />
      <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-5">
        <div className="flex items-center gap-3"><Mail className="w-8 h-8 text-[#007A82]" /><div><h1 className="text-3xl font-black text-[#0A2540]">Contact</h1><p className="text-xs text-slate-500">Souren Das · Bengaluru</p></div></div>
        {submitted ? (
          <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-300 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
            <p className="text-sm font-medium">Your email app should open a draft to support@filetoolskit.com.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs" />
            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs" />
            <textarea required rows={5} placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-xs" />
            <button type="submit" className="px-6 py-3 rounded-full bg-[#00A3AD] text-white text-xs font-black">Email support@filetoolskit.com</button>
          </form>
        )}
      </div>
    </div>
  );
};
