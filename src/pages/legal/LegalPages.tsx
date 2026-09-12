import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, ArrowLeft, Mail, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Back = () => (
  <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black text-[#C2410C] mb-6">
    <ArrowLeft className="w-3.5 h-3.5" /> Back to tools
  </Link>
);

const box = 'rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-5 text-sm text-slate-700 leading-relaxed';
const h2 = 'text-lg font-black text-[#0A2540] pt-2';
const a = 'text-[#C2410C] underline font-bold';

export const PrivacyPolicyPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Back />
    <div className={box}>
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-8 h-8 text-[#EA580C] shrink-0" />
        <div>
          <h1 className="text-3xl font-black text-[#0A2540]">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Last updated: 12 September 2026</p>
        </div>
      </div>
      <p>This policy describes how FileTools Kit (filetoolskit.com) handles information. It is a description of practice, not a certification of GDPR, CCPA, HIPAA, DPDP, or COPPA compliance.</p>
      <h2 className={h2}>1. Who we are</h2>
      <p>FileTools Kit is operated by <strong>Souren Das</strong>, Bengaluru, Karnataka, India. Privacy: <a className={a} href="mailto:privacy@filetoolskit.com">privacy@filetoolskit.com</a>. Support: <a className={a} href="mailto:support@filetoolskit.com">support@filetoolskit.com</a>. Optional: <a className={a} href="mailto:hello@filetoolskit.com">hello@filetoolskit.com</a>.</p>
      <p>The public site is https://www.filetoolskit.com. The product is 12 browser tools. The site is supported by Google AdSense advertising. There is no paid plan.</p>
      <h2 className={h2}>2. Scope</h2>
      <p>This policy covers the website and the in-browser tools. It does not cover websites a QR code points to, or third-party readers used to open a downloaded file.</p>
      <h2 className={h2}>3. Information this site may process</h2>
      <ul className="list-disc pl-5 space-y-1">
        <li>Host request data: IP address, user agent, URL, referrer, timestamp.</li>
        <li>Vercel Web Analytics: path, referrer host, country, device type, OS, browser.</li>
        <li>Email you send us.</li>
        <li>First-party localStorage keys on your device.</li>
        <li>Google AdSense advertising and measurement data, described in section 8. File contents are not uploaded to us.</li>
      </ul>
      <p>We do not run an account database.</p>
      <h2 className={h2}>4. What the tools do not send us</h2>
      <p>The 12 utilities run in your browser with pdf-lib, jsPDF, qrcode, mammoth, Canvas, and Web Crypto. We do not operate an upload API that receives your files. Closing the tab discards the working copy unless you downloaded it or kept a localStorage draft.</p>
      <h2 className={h2}>5. Hosting and analytics</h2>
      <p>Hosted on Vercel. Vercel Web Analytics counts page views and is documented by Vercel as cookie-less. We do not use Google Analytics or Meta Pixel today. Vercel privacy: <a className={a} href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a>.</p>
      <h2 className={h2}>6. Third-party assets</h2>
      <p>Tool-card photos may load from Unsplash. Fonts may load from Google Fonts. Contact opens a mailto draft.</p>
      <h2 className={h2}>7. Advertising (Google AdSense)</h2>
      <p>FileTools Kit uses Google AdSense Auto ads. The publisher script is on the site (ca-pub-4409273905876536). ads.txt authorizes pub-4409273905876536. Google may use cookies, beacons, device information, or similar technologies to serve and measure ads, including personalized ads where permitted.</p>
      <p>Manage ads at <a className={a} href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>. Google privacy: <a className={a} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>. Partner sites: <a className={a} href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/partner-sites</a>.</p>
      <p>FileTools Kit does not sell file contents to advertisers. Ads do not receive PDF, image, or resume bytes from our servers.</p>
      <p>EEA/UK/Switzerland visitors may see a Google Privacy & messaging consent experience. US-state visitors may see a Google US-state notice when published in AdSense. That is not a CCPA certification by FileTools Kit.</p>
      <h2 className={h2}>8. Local storage, children, requests</h2>
      <p>localStorage may hold UI prefs, ftk_ab_* keys, and resume draft ftk_resume_v1. The site is not directed at children under 13. Email privacy@filetoolskit.com for mailbox requests. Operator is in India; hosting and ads may process data in other regions including the United States. We do not claim GDPR/CCPA/DPDP certification.</p>
      <p className="text-xs text-slate-500">See <Link className={a} to="/cookie-policy">Cookies</Link>, <Link className={a} to="/terms">Terms</Link>, <Link className={a} to="/disclaimer">Disclaimer</Link>.</p>
    </div>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Back />
    <div className={box}>
      <div className="flex items-center gap-3">
        <FileText className="w-8 h-8 text-[#EA580C]" />
        <div>
          <h1 className="text-3xl font-black text-[#0A2540]">Terms of Service</h1>
          <p className="text-xs text-slate-500">Last updated: 12 September 2026</p>
        </div>
      </div>
      <p>These terms are between you and Souren Das (Bengaluru, India) for filetoolskit.com. By using the site you agree to these terms and the <Link className={a} to="/privacy">privacy policy</Link>.</p>
      <h2 className={h2}>1. The service</h2>
      <p>Twelve free browser tools. JavaScript required. No file-upload API.</p>
      <h2 className={h2}>2. No payment</h2>
      <p>All tools are free. Supported by Google AdSense. No checkout.</p>
      <h2 className={h2}>3. Acceptable use</h2>
      <p>Do not use the tools for unlawful content. Do not disrupt the site. Do not click your own ads or ask others to click ads.</p>
      <h2 className={h2}>4. Your content</h2>
      <p>Outputs you generate belong to you, subject to third-party rights in content you paste in. We do not charge a license fee on those files.</p>
      <h2 className={h2}>5. Advertising</h2>
      <p>Pages may display Google AdSense ads. Personalized ads may appear where permitted. Ads do not receive file bytes from an upload API.</p>
      <h2 className={h2}>6. Limits and no warranty</h2>
      <p>Encrypted PDFs, unusual types, and large files may fail. Currency figures are static examples. Health numbers are not medical advice. Resume overlap % is not an employer ATS. The site is provided as-is, without warranty.</p>
      <h2 className={h2}>7. Liability</h2>
      <p>To the extent permitted by law, the operator is not liable for indirect or consequential damages or lost data. Some limits do not apply where the law forbids them.</p>
      <h2 className={h2}>8. Governing law</h2>
      <p>Laws of India, courts in Bengaluru, without limiting non-waivable consumer rights where you live. Questions: <a className={a} href="mailto:support@filetoolskit.com">support@filetoolskit.com</a>.</p>
    </div>
  </div>
);

export const CookiePolicyPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Back />
    <div className={box}>
      <div className="flex items-center gap-3">
        <Lock className="w-8 h-8 text-[#EA580C]" />
        <div>
          <h1 className="text-3xl font-black text-[#0A2540]">Cookie & Storage Policy</h1>
          <p className="text-xs text-slate-500">Last updated: 12 September 2026</p>
        </div>
      </div>
      <p>A cookie is a small text file stored in your browser. Similar technologies include localStorage and pixels. Read with the <Link className={a} to="/privacy">privacy policy</Link>.</p>
      <h2 className={h2}>Advertising cookies (Google AdSense)</h2>
      <p>The AdSense publisher script is on this site (ca-pub-4409273905876536). Google may use advertising and measurement cookies, including personalized ads where permitted. FileTools Kit does not control Google technologies.</p>
      <p>EEA/UK/Switzerland visitors may see a Google consent message. US-state visitors may see a Google US-state notice when published in AdSense.</p>
      <p>Opt out of personalized ads at <a className={a} href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>. Google privacy: <a className={a} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>. Partner sites: <a className={a} href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">how Google uses data on partner sites</a>.</p>
      <p>File bytes opened in a tool are not uploaded to us and are not sent to advertisers from our servers.</p>
      <h2 className={h2}>Analytics and first-party storage</h2>
      <p>Vercel Web Analytics is cookie-less per Vercel. Google Analytics is not installed. localStorage may hold UI prefs, ftk_ab_* keys, and resume draft ftk_resume_v1. Clear site data to delete them. Vercel, Google Fonts, and Unsplash may set their own cookies.</p>
    </div>
  </div>
);

export const DisclaimerPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Back />
    <div className={box}>
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-8 h-8 text-amber-700" />
        <div>
          <h1 className="text-3xl font-black text-[#0A2540]">Disclaimer</h1>
          <p className="text-xs text-slate-500">Last updated: 12 September 2026</p>
        </div>
      </div>
      <p>FileTools Kit is a free in-browser utility suite operated by Souren Das in Bengaluru. Outputs are not professional advice.</p>
      <p>Currency figures are static examples last authored September 2026, not live quotes or financial advice.</p>
      <p>Health numbers use formulas such as Mifflin-St Jeor and are not medical advice.</p>
      <p>Resume match percentage is a local keyword-overlap heuristic, not an employer ATS.</p>
      <p>Encrypted PDFs may fail. PDF preview tiles are placeholders. Very large files can exhaust tab memory.</p>
      <p>Google AdSense ads may appear. FileTools Kit is not responsible for advertiser sites. Do not click your own ads.</p>
      <p>See <Link className={a} to="/terms">Terms</Link> and <Link className={a} to="/privacy">Privacy</Link>.</p>
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
    const mailtoUrl = `mailto:support@filetoolskit.com?subject=${encodeURIComponent('[FileTools Kit] from ' + name)}&body=${encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message)}`;
    window.location.href = mailtoUrl;
    setSubmitted(true);
  };
  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
      <Back />
      <div className={box}>
        <div className="flex items-center gap-3">
          <Mail className="w-8 h-8 text-[#EA580C]" />
          <div>
            <h1 className="text-3xl font-black text-[#0A2540]">Contact</h1>
            <p className="text-xs text-slate-500">Souren Das · Bengaluru, Karnataka, India</p>
          </div>
        </div>
        <p>Mail is received by the operator. There is no ticket system. Write to <a className={a} href="mailto:support@filetoolskit.com">support@filetoolskit.com</a> or <a className={a} href="mailto:privacy@filetoolskit.com">privacy@filetoolskit.com</a>.</p>
        {submitted ? (
          <div className="p-6 rounded-3xl bg-[#FFEDD5] border border-[#FDBA74] text-center">
            <CheckCircle2 className="w-10 h-10 text-[#C2410C] mx-auto mb-2" />
            <p className="text-sm font-medium">Your email app should open a draft to support@filetoolskit.com.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-[#FFF7ED] border border-slate-200 text-sm" />
            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-[#FFF7ED] border border-slate-200 text-sm" />
            <textarea required rows={5} placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-[#FFF7ED] border border-slate-200 text-sm" />
            <button type="submit" className="px-6 py-3 rounded-full bg-[#EA580C] text-white text-xs font-black">Email support@filetoolskit.com</button>
          </form>
        )}
      </div>
    </div>
  );
};
