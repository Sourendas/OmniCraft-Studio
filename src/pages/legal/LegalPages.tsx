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
      <p>The public site is https://www.filetoolskit.com (also reachable at https://filetoolskit.com). The product is a set of 12 browser tools for PDFs, images, resumes, QR codes, hashes, markdown, SVG, diffs, and related utilities. The site is supported by Google AdSense advertising. There is no paid plan.</p>
      <h2 className={h2}>2. Scope</h2>
      <p>This policy covers the website and the in-browser tools. It does not cover websites you open because a QR code pointed there, or third-party readers you use to view a downloaded PDF.</p>
      <h2 className={h2}>3. Information this site may process</h2>
      <p>We do not receive the contents of files you open in a tool. The following information may still be processed in connection with a visit:</p>
      <ul className="list-disc pl-5 space-y-1">
        <li>Technical request data seen by the host (IP address, user agent, URL, referrer, timestamp) when a page is loaded.</li>
        <li>Coarse visit analytics from Vercel Web Analytics (path, referrer host, country, device type, OS, browser).</li>
        <li>Email contents if you write to us, including your address and whatever you put in the message.</li>
        <li>First-party localStorage keys on your device (UI prefs, optional A/B keys, optional resume draft).</li>
        <li>Advertising and measurement data collected by Google AdSense and related Google technologies, as described in section 8 and in Google’s policies. FileTools Kit does not receive a copy of your PDF, image, or resume from that channel.</li>
      </ul>
      <p>We do not ask you to create an account. We do not run a user database.</p>
      <h2 className={h2}>4. What the tools do not send us</h2>
      <p>The 12 utilities run in your browser with libraries such as pdf-lib, jsPDF, qrcode, mammoth, and the Canvas and Web Crypto APIs. We do not operate an upload API that receives your PDFs, images, resume text, hashes, or other files you open in a tool. Closing the tab discards that working copy unless you downloaded it or your browser kept a localStorage draft (see section 9).</p>
      <p>That is not an air-gapped device. The website still loads over HTTPS. Browser extensions you installed can read a page. Malware on the device is outside this product.</p>
      <h2 className={h2}>5. What the website host may see</h2>
      <p>The site is hosted on Vercel. When you request a page, the host may process technical data such as IP address, user agent, URL, referrer, and timestamps in order to serve and protect the site. Those logs are not a copy of a PDF you opened in a tool. We do not sell host logs as a data product.</p>
      <h2 className={h2}>6. Visit analytics (Vercel Web Analytics)</h2>
      <p>We use <strong>Vercel Web Analytics</strong> to count page views and see which routes are opened (for example /resume-builder or /pdf-suite). It is first-party to the host. Vercel documents it as cookie-less. Typical fields are path, referrer host, country, device type, operating system, and browser. It does not receive the contents of files you open in a tool.</p>
      <p>We do not use Google Analytics, Meta Pixel, or Meta Audience Network on this site today. If that changes, this policy will be updated first.</p>
      <p>Vercel privacy information: <a className={a} href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">vercel.com/legal/privacy-policy</a>.</p>
      <h2 className={h2}>7. Third-party content on pages</h2>
      <p>Tool-card photographs may load from Unsplash. Google Fonts may load the Outfit, Plus Jakarta Sans, and JetBrains Mono families. Those providers receive a request from your browser for that asset (typically IP address, user agent, and the font or image URL). That request is not your document.</p>
      <p>Contact submit opens your email app with a mailto draft to support@filetoolskit.com. We do not run a ticket database. If you send mail, we receive whatever you put in that message, including your address.</p>
      <h2 className={h2}>8. Advertising (Google AdSense)</h2>
      <p>FileTools Kit uses <strong>Google AdSense Auto ads</strong> to support the free tools. The AdSense publisher script is included on pages of this site (client ID ca-pub-4409273905876536). The domain publishes an ads.txt authorization: google.com, pub-4409273905876536, DIRECT, f08c47fec0942fa0. Google may display third-party advertisements on eligible pages.</p>
      <p>Google, as a third-party advertising vendor, may use cookies, web beacons, device information, IP address, or similar technologies to serve and measure ads, including personalized ads where permitted. FileTools Kit does not control those Google technologies.</p>
      <p>Users can manage personalized ads at <a className={a} href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>. Google’s privacy policy: <a className={a} href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">policies.google.com/privacy</a>. How Google uses data on partner sites: <a className={a} href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">policies.google.com/technologies/partner-sites</a>.</p>
      <p>FileTools Kit does not sell the contents of files you open in a tool to advertisers. Ad networks do not receive your PDF, image, or resume bytes from our servers because those files are not uploaded to us. Tools still run in this tab.</p>
      <p>Where consent is required, visitors in the EEA, UK, Switzerland, or other regulated regions may be shown a Google Privacy & messaging consent experience before personalized advertising. Visitors in US states with consumer privacy laws (including California) may see a Google Privacy & messaging notice for US state regulations when that message is published in AdSense. That notice is Google’s advertising consent or opt-out flow. It is not a CCPA, CPRA, or similar certification by FileTools Kit.</p>
      <h2 className={h2}>9. Local storage and drafts</h2>
      <p>The browser may keep UI preferences in localStorage. A first-party A/B helper may store ftk_ab_visitor, ftk_ab_assign, and ftk_ab_events on this device only. Those A/B keys are not uploaded as a separate event stream. The Resume Builder may store a draft (ftk_resume_v1) on this device so a refresh does not wipe the form. Clear site data for filetoolskit.com to delete first-party keys. We cannot remote-wipe your browser.</p>
      <h2 className={h2}>10. Children</h2>
      <p>The site is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child sent us mail, write to privacy@filetoolskit.com and we will delete that correspondence.</p>
      <h2 className={h2}>11. International visitors</h2>
      <p>The operator is in India. Hosting, Vercel Web Analytics, and Google advertising may process requests in other regions, including the United States. If you visit from the US, EEA, UK, or elsewhere, technical and advertising data may cross borders in order to serve the page, count visits, and show ads. We do not claim GDPR, CCPA, CPRA, or DPDP certification. If you want a file deleted from our mailbox, email privacy@filetoolskit.com. We cannot delete a PDF that never left your tab.</p>
      <h2 className={h2}>12. Retention</h2>
      <p>We do not keep a copy of tool files because we do not receive them. Email you send us is kept as long as needed to reply and run the site, then deleted or archived in ordinary mail practice. Host logs and Vercel Analytics aggregates follow the host’s retention (Hobby reporting is a short rolling window). Advertising data retention follows Google’s policies.</p>
      <h2 className={h2}>13. Security limits</h2>
      <p>HTTPS protects the website in transit. Client-side tools reduce our access to your files. They do not encrypt a PDF you export, they do not hide the file from extensions, and they do not replace backups. Encrypted PDFs you drop in may fail to parse.</p>
      <h2 className={h2}>14. Your requests</h2>
      <p>Email privacy@filetoolskit.com to ask what mail we hold from you, to correct an address, or to ask us to delete correspondence. We respond from Bengaluru, India. There is no automated portal. For advertising opt-out use <a className={a} href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">Google Ads Settings</a> and your browser cookie controls. See the <Link className={a} to="/cookie-policy">cookie policy</Link>.</p>
      <h2 className={h2}>15. Changes</h2>
      <p>We will change the “Last updated” date when this policy changes in a material way. The live page is the current version.</p>
      <p className="text-xs text-slate-500">See also the <Link className={a} to="/cookie-policy">cookie policy</Link>, <Link className={a} to="/terms">terms</Link>, <Link className={a} to="/disclaimer">disclaimer</Link>, <Link className={a} to="/guides/what-stays-in-the-tab">what stays in this tab</Link>, and <Link className={a} to="/about">about</Link>.</p>
    </div>
  </div>
);
