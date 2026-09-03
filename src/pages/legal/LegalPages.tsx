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
      <p>FileTools Kit (filetoolskit.com) is operated by <strong>Souren Das</strong>, Bengaluru, Karnataka, India. Privacy: <a className="text-[#007A82] underline" href="mailto:privacy@filetoolskit.com">privacy@filetoolskit.com</a>. Support: <a className="text-[#007A82] underline" href="mailto:support@filetoolskit.com">support@filetoolskit.com</a>.</p>
      <h2 className="text-lg font-black text-[#0A2540]">2. What the tools do with your files</h2>
      <p>The 12 utilities run in your browser with libraries such as pdf-lib, jsPDF, and the Canvas API. We do not operate an upload API that receives your PDFs, images, resume text, or other files you open in a tool. Closing the tab discards that working copy unless you downloaded it.</p>
      <h2 className="text-lg font-black text-[#0A2540]">3. What the website host may see</h2>
      <p>The site is hosted on Vercel. The host may process technical request data (IP address, browser type, pages requested, timestamps) to serve pages. That is separate from opening a file inside a tool.</p>
      <h2 className="text-lg font-black text-[#0A2540]">4. Third-party content on pages</h2>
      <p>Tool-card photos may load from Unsplash. Google Fonts may load Outfit. Those providers receive a request from your browser for that asset. Contact submit opens your email app with a mailto draft; we do not run a message database.</p>
      <h2 className="text-lg font-black text-[#0A2540]">5. Advertising (Google AdSense — not live yet)</h2>
      <p>FileTools Kit may display third-party ads through Google AdSense after Google approves the site. The AdSense script is not embedded until that approval. This section describes the ads and cookies that will apply when ads are turned on. The site is not already running AdSense today.</p>
      <p>Google, as a third-party vendor, may use cookies or similar storage to serve ads on this site and across the web, including ads based on visits to this site and other sites.</p>
      <p>FileTools Kit does not sell the contents of files you open in a tool to advertisers. Ad networks do not receive your PDF, image, or resume bytes from our servers because those files are not uploaded to us. Tools still run in this tab.</p>
      <p>Personalized ads: <a className="text-[#007A82] underline" href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. Google privacy policy: <a className="text-[#007A82] underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>. Partner sites: <a className="text-[#007A82] underline" href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">how Google uses data on partner sites</a>.</p>
      <p>Users in the EEA/UK may see a consent message from Google Privacy & messaging if that is enabled after approval. Until ads are live, no ad cookie is set by FileTools Kit.</p>
      <p>This page is a description of practice, not a certification of GDPR, CCPA, HIPAA, or COPPA compliance. Questions: privacy@filetoolskit.com.</p>
      <h2 className="text-lg font-black text-[#0A2540]">6. Local storage</h2>
      <p>The browser may keep UI preferences in localStorage. A first-party A/B helper may store ftk_ab_visitor, ftk_ab_assign, and ftk_ab_events on this device only. Those records are not sent to an analytics vendor. Clear site data for filetoolskit.com to delete them.</p>
      <h2 className="text-lg font-black text-[#0A2540]">7. Children</h2>
      <p>The site is not directed at children under 13.</p>
      <h2 className="text-lg font-black text-[#0A2540]">8. Your requests</h2>
      <p>Email privacy@filetoolskit.com. We respond from Bengaluru, India.</p>
    </div>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Back />
    <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-5 text-sm text-slate-700">
      <div className="flex items-center gap-3"><FileText className="w-8 h-8 text-[#007A82]" /><div><h1 className="text-3xl font-black text-[#0A2540]">Terms of Service</h1><p className="text-xs text-slate-500">Last updated: 3 September 2026</p></div></div>
      <p>These terms are between you and Souren Das (Bengaluru, India) for filetoolskit.com.</p>
      <p>All 12 tools are free in the browser. There is no paid upgrade or checkout on this site. Outputs you generate are yours, subject to third-party rights in content you paste in.</p>
      <p>Do not use the tools for unlawful content. Tools are provided as-is. Encrypted PDFs, unusual file types, and very large files may fail in the browser. Governed by the laws of India.</p>
    </div>
  </div>
);

export const CookiePolicyPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Back />
    <div className="rounded-3xl bg-white border border-slate-200 p-8 space-y-5 text-sm text-slate-700">
      <div className="flex items-center gap-3"><Lock className="w-8 h-8 text-[#007A82]" /><div><h1 className="text-3xl font-black text-[#0A2540]">Cookie & Storage Policy</h1><p className="text-xs text-slate-500">Last updated: 3 September 2026</p></div></div>
      <p>FileTools Kit does not set advertising or analytics cookies today. The AdSense script is not embedded. Until AdSense is enabled, no advertising cookie is set by FileTools Kit.</p>
      <p>After Google approves the site and the official snippet is added, Google may set advertising and measurement cookies (including historical DoubleClick / IDE-style cookies). Ads are third-party. File bytes are not uploaded to us and are not sent to advertisers from our servers.</p>
      <p>Manage ads at <a className="text-[#007A82] underline" href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>. Google privacy: <a className="text-[#007A82] underline" href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>.</p>
      <p>First-party keys may include UI prefs and ftk_ab_visitor, ftk_ab_assign, ftk_ab_events. Vercel, fonts, and Unsplash may set their own technical cookies. Clear site data for filetoolskit.com to delete first-party storage.</p>
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
        <p className="text-sm text-slate-700">Mail is received by the operator. There is no ticket system. Write to <a className="text-[#007A82] underline font-bold" href="mailto:support@filetoolskit.com">support@filetoolskit.com</a> or <a className="text-[#007A82] underline font-bold" href="mailto:privacy@filetoolskit.com">privacy@filetoolskit.com</a>.</p>
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
