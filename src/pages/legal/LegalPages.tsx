import React, { useState } from 'react';
import { ShieldCheck, Lock, FileText, CheckCircle2, ArrowLeft, Mail, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Back = () => (
  <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black text-[#007A82] mb-6">
    <ArrowLeft className="w-3.5 h-3.5" /> Back to tools
  </Link>
);

const box = 'rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 space-y-5 text-sm text-slate-700 leading-relaxed';
const h2 = 'text-lg font-black text-[#0A2540] pt-2';
const a = 'text-[#007A82] underline font-bold';

export const PrivacyPolicyPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Back />
    <div className={box}>
      <div className="flex items-center gap-3">
        <ShieldCheck className="w-8 h-8 text-[#007A82] shrink-0" />
        <div>
          <h1 className="text-3xl font-black text-[#0A2540]">Privacy Policy</h1>
          <p className="text-xs text-slate-500">Last updated: 10 September 2026</p>
        </div>
      </div>
      <p>This policy describes how FileTools Kit (filetoolskit.com) handles information. It is a description of practice, not a certification of GDPR, CCPA, HIPAA, DPDP, or COPPA compliance.</p>

      <h2 className={h2}>1. Who we are</h2>
      <p>FileTools Kit is operated by <strong>Souren Das</strong>, Bengaluru, Karnataka, India. Privacy: <a className={a} href="mailto:privacy@filetoolskit.com">privacy@filetoolskit.com</a>. Support: <a className={a} href="mailto:support@filetoolskit.com">support@filetoolskit.com</a>. Optional: <a className={a} href="mailto:hello@filetoolskit.com">hello@filetoolskit.com</a>.</p>
      <p>The public site is https://www.filetoolskit.com (also reachable at https://filetoolskit.com). The product is a set of 12 browser tools for PDFs, images, resumes, QR codes, hashes, markdown, SVG, diffs, and related utilities.</p>

      <h2 className={h2}>2. Scope</h2>
      <p>This policy covers the website and the in-browser tools. It does not cover websites you open because a QR code pointed there, or third-party readers you use to view a downloaded PDF.</p>

      <h2 className={h2}>3. What the tools do not send us</h2>
      <p>The 12 utilities run in your browser with libraries such as pdf-lib, jsPDF, qrcode, mammoth, and the Canvas and Web Crypto APIs. We do not operate an upload API that receives your PDFs, images, resume text, hashes, or other files you open in a tool. Closing the tab discards that working copy unless you downloaded it or your browser kept a localStorage draft (see section 8).</p>
      <p>That is not an air-gapped device. The website still loads over HTTPS. Browser extensions you installed can read a page. Malware on the device is outside this product.</p>

      <h2 className={h2}>4. What the website host may see</h2>
      <p>The site is hosted on Vercel. When you request a page, the host may process technical data such as IP address, user agent, URL, referrer, and timestamps in order to serve and protect the site. Those logs are not a copy of a PDF you opened in a tool. We do not sell host logs as a data product.</p>

      <h2 className={h2}>5. Visit analytics (Vercel Web Analytics)</h2>
      <p>We use <strong>Vercel Web Analytics</strong> to count page views and see which routes are opened (for example /resume-builder or /pdf-suite). It is first-party to the host. Vercel documents it as cookie-less. Typical fields are path, referrer host, country, device type, operating system, and browser. It does not receive the contents of files you open in a tool.</p>
      <p>We do not use Google Analytics, Meta Pixel, or Meta Audience Network on this site today. If that changes, this policy will be updated first.</p>
      <p>Vercel privacy information: <a className={a} href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a>.</p>

      <h2 className={h2}>6. Third-party content on pages</h2>
      <p>Tool-card photographs may load from Unsplash. Google Fonts may load the Outfit, Plus Jakarta Sans, and JetBrains Mono families. Those providers receive a request from your browser for that asset (typically IP address, user agent, and the font or image URL). That request is not your document.</p>
      <p>Contact submit opens your email app with a mailto draft to support@filetoolskit.com. We do not run a ticket database. If you send mail, we receive whatever you put in that message, including your address.</p>

      <h2 className={h2}>7. Advertising (Google AdSense)</h2>
      <p>FileTools Kit uses Google AdSense Auto ads. Google may display third-party advertisements on eligible pages after the site is approved for ad serving. The AdSense publisher script is included on the site, and the domain publishes an ads.txt authorization for publisher ID pub-4409273905876536.</p>
      <p>Google, as a third-party advertising vendor, may use cookies, web beacons, device information, IP address, or similar technologies to serve and measure ads, including personalized ads where permitted. Users can manage personalized ads at <a className={a} href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. Google’s privacy policy: <a className={a} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>. How Google uses data on partner sites: <a className={a} href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/partner-sites</a>.</p>
      <p>FileTools Kit does not sell the contents of files you open in a tool to advertisers. Ad networks do not receive your PDF, image, or resume bytes from our servers because those files are not uploaded to us. Tools still run in this tab.</p>
      <p>Where consent is required, visitors in the EEA, UK, Switzerland, or other regulated regions may be shown an applicable Google Privacy &amp; messaging consent experience before personalized advertising. Advertising and measurement technologies are subject to the choices available in that consent experience and Google’s policies.</p>

      <h2 className={h2}>8. Local storage and drafts</h2>
      <p>The browser may keep UI preferences in localStorage. A first-party A/B helper may store ftk_ab_visitor, ftk_ab_assign, and ftk_ab_events on this device only. Those A/B keys are not uploaded as a separate event stream. The Resume Builder may store a draft (ftk_resume_v1) on this device so a refresh does not wipe the form. Clear site data for filetoolskit.com to delete first-party keys. We cannot remote-wipe your browser.</p>

      <h2 className={h2}>9. Children</h2>
      <p>The site is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child sent us mail, write to privacy@filetoolskit.com and we will delete that correspondence.</p>

      <h2 className={h2}>10. International visitors</h2>
      <p>The operator is in India. Hosting and Vercel Web Analytics may process requests in other regions. If you visit from the EEA, UK, or elsewhere, technical data may cross borders in order to serve the page and count visits. We do not claim GDPR, CCPA, or DPDP certification. If you want a file deleted from our mailbox, email privacy@filetoolskit.com. We cannot delete a PDF that never left your tab.</p>

      <h2 className={h2}>11. Retention</h2>
      <p>We do not keep a copy of tool files because we do not receive them. Email you send us is kept as long as needed to reply and run the site, then deleted or archived in ordinary mail practice. Host logs and Vercel Analytics aggregates follow the host’s retention (Hobby reporting is a short rolling window).</p>

      <h2 className={h2}>12. Security limits</h2>
      <p>HTTPS protects the website in transit. Client-side tools reduce our access to your files. They do not encrypt a PDF you export, they do not hide the file from extensions, and they do not replace backups. Encrypted PDFs you drop in may fail to parse.</p>

      <h2 className={h2}>13. Your requests</h2>
      <p>Email privacy@filetoolskit.com to ask what mail we hold from you, to correct an address, or to ask us to delete correspondence. We respond from Bengaluru, India. There is no automated portal.</p>

      <h2 className={h2}>14. Changes</h2>
      <p>We will change the “Last updated” date when this policy changes in a material way. The live page is the current version.</p>

      <p className="text-xs text-slate-500">See also the <Link className={a} to="/cookie-policy">cookie policy</Link>, <Link className={a} to="/guides/what-stays-in-the-tab">what stays in this tab</Link>, and <Link className={a} to="/about">about</Link>.</p>
    </div>
  </div>
);

export const TermsPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Back />
    <div className={box}>
      <div className="flex items-center gap-3">
        <FileText className="w-8 h-8 text-[#007A82]" />
        <div>
          <h1 className="text-3xl font-black text-[#0A2540]">Terms of Service</h1>
          <p className="text-xs text-slate-500">Last updated: 10 September 2026</p>
        </div>
      </div>
      <p>These terms are between you and Souren Das (Bengaluru, India) for filetoolskit.com.</p>
      <p>All 12 tools are free in the browser. There is no paid upgrade or checkout on this site. Outputs you generate are yours, subject to third-party rights in content you paste in. FileTools Kit does not charge a license fee on those files.</p>
      <p>Do not use the tools for unlawful content. Tools are provided as-is, without warranty. Encrypted PDFs, unusual file types, and very large files may fail in the browser. Currency figures are static examples, not live quotes. Health numbers are not medical advice. Resume overlap % is not an employer ATS.</p>
      <p>The site uses Vercel Web Analytics for page views and may display Google AdSense Auto ads on eligible pages. Ads are supplied by a third-party advertising service and may be personalized where permitted and subject to applicable consent choices. Governed by the laws of India, with courts in Bengaluru, without limiting any non-waivable consumer rights you have where you live.</p>
      <p>Questions: support@filetoolskit.com.</p>
    </div>
  </div>
);

export const CookiePolicyPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Back />
    <div className={box}>
      <div className="flex items-center gap-3">
        <Lock className="w-8 h-8 text-[#007A82]" />
        <div>
          <h1 className="text-3xl font-black text-[#0A2540]">Cookie & Storage Policy</h1>
          <p className="text-xs text-slate-500">Last updated: 10 September 2026</p>
        </div>
      </div>
      <p>FileTools Kit uses Google AdSense Auto ads. Google may use advertising and measurement cookies or similar technologies when ads are served, subject to applicable consent requirements and your choices. FileTools Kit does not control Google’s third-party advertising technologies.</p>
      <h2 className={h2}>Visit analytics</h2>
      <p>Vercel Web Analytics is enabled. Vercel documents it as cookie-less. It records page path and coarse visit metadata so we can see which tools are opened. It does not receive file contents. See <a className={a} href="https://vercel.com/docs/analytics/privacy-policy" target="_blank" rel="noopener noreferrer">Vercel Analytics privacy notes</a>.</p>
      <p>Google Analytics is not installed.</p>
      <h2 className={h2}>First-party storage</h2>
      <p>This domain may use localStorage for UI preferences, an optional A/B helper (ftk_ab_visitor, ftk_ab_assign, ftk_ab_events), and a Resume Builder draft (ftk_resume_v1). These stay on the device. Clear site data for filetoolskit.com to delete them.</p>
      <h2 className={h2}>Hosting, fonts, and images</h2>
      <p>Vercel may set technical cookies to serve and protect the site. Google Fonts and Unsplash may set their own cookies when those assets load. We do not control those third-party cookies.</p>
      <h2 className={h2}>Advertising</h2>
      <p>Google may set advertising and measurement cookies or use similar technologies, including historical DoubleClick / IDE-style identifiers, to serve and measure ads. The exact technologies and purposes can change under Google’s advertising products and applicable regional consent choices. File bytes are not uploaded to us and are not sent to advertisers from our servers.</p>
      <p>Manage personalized ads at <a className={a} href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>. Google privacy: <a className={a} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>. Partner sites: <a className={a} href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">how Google uses data on partner sites</a>.</p>
      <p>Where required, EEA/UK/Switzerland visitors may see a Google Privacy &amp; messaging consent experience. The availability and wording of that message depends on the applicable regional configuration.</p>
      <p>See the <Link className={a} to="/privacy">privacy policy</Link> for the rest of the story.</p>
    </div>
  </div>
);

export const DisclaimerPage: React.FC = () => (
  <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
    <Back />
    <div className={box}>
      <div className="flex items-center gap-3">
        <AlertTriangle className="w-8 h-8 text-amber-700" />
        <h1 className="text-3xl font-black text-[#0A2540]">Disclaimer</h1>
      </div>
      <p>Currency figures are static examples last authored September 2026, not live quotes or financial advice.</p>
      <p>Health numbers use formulas such as Mifflin-St Jeor and are not medical advice.</p>
      <p>Resume match percentage is a local keyword-overlap heuristic, not an employer ATS.</p>
      <p>Encrypted PDFs may fail. Preview tiles in PDF Suite are placeholders, not rendered pages.</p>
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
      <div className={box}>
        <div className="flex items-center gap-3">
          <Mail className="w-8 h-8 text-[#007A82]" />
          <div>
            <h1 className="text-3xl font-black text-[#0A2540]">Contact</h1>
            <p className="text-xs text-slate-500">Souren Das · Bengaluru</p>
          </div>
        </div>
        <p>Mail is received by the operator. There is no ticket system. Write to <a className={a} href="mailto:support@filetoolskit.com">support@filetoolskit.com</a> or <a className={a} href="mailto:privacy@filetoolskit.com">privacy@filetoolskit.com</a>.</p>
        {submitted ? (
          <div className="p-6 rounded-3xl bg-emerald-50 border border-emerald-300 text-center">
            <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2 mx-auto" />
            <p className="text-sm font-medium">Your email app should open a draft to support@filetoolskit.com.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <input required placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-sm" />
            <input required type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-sm" />
            <textarea required rows={5} placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} className="w-full px-4 py-3 rounded-2xl bg-[#F4F8FA] border border-slate-200 text-sm" />
            <button type="submit" className="px-6 py-3 rounded-full bg-[#00A3AD] text-white text-xs font-black">Email support@filetoolskit.com</button>
          </form>
        )}
      </div>
    </div>
  );
};
