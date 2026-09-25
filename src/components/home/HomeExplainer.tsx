import React from 'react';
import { Link } from 'react-router-dom';

export const HomeExplainer: React.FC = () => {
  return (
    <section className="px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto pb-8 relative z-10">
      <article className="rounded-3xl bg-white border border-orange-100 p-6 sm:p-10 space-y-4 text-sm sm:text-[15px] leading-relaxed text-stone-700">
        <h2 className="text-2xl font-black text-[#1C1917] tracking-tight">What FileTools Kit is</h2>
        <p>
          FileTools Kit is a free website with twelve utilities: PDF merge and split, a resume PDF form, image convert and compress, a QR exporter, an SVG editor, a Markdown preview, a text diff, developer hashes, a social-size canvas, a health arithmetic page, and a currency worksheet. Souren Das operates the site from Bengaluru, India.
        </p>
        <p>
          The point of the site is narrow. You already have a file or a short piece of text. You need a download — a merged PDF, a smaller JPEG, a resume PDF, a QR PNG — without creating an account. The tools use libraries such as pdf-lib, jsPDF, Web Crypto, and the canvas API inside this browser tab. FileTools Kit does not run a processing server that receives those documents.
        </p>
        <p>
          The website still has a host. Vercel serves HTML, CSS, and JavaScript. Opening any page creates ordinary web logs (IP address, URL, user agent) on that host and on Google systems if ads or analytics load. That is not the same as uploading a PDF to an API we operate. Details are on the{' '}
          <Link className="text-[#C2410C] font-bold underline" to="/privacy">
            privacy policy
          </Link>
          .
        </p>
        <h3 className="text-lg font-black text-[#1C1917]">How a typical job works</h3>
        <p>
          Example: you need one PDF for a job application. Open{' '}
          <Link className="text-[#C2410C] font-bold underline" to="/pdf-suite">
            PDF Suite
          </Link>
          , drop the cover letter, resume, and certificates, put them in order, merge, and download. Then open the download in a reader. If a file is encrypted, this tab will often fail — that is a limit of in-browser PDF libraries, not a hidden upload.
        </p>
        <p>
          Example: you need a smaller photo. Open{' '}
          <Link className="text-[#C2410C] font-bold underline" to="/image-optimizer">
            Image Optimizer
          </Link>
          , set a max width, export JPEG or WebP, and keep the original. Compression throws detail away on purpose.
        </p>
        <h3 className="text-lg font-black text-[#1C1917]">What this site is not</h3>
        <ul className="list-disc pl-5 space-y-1">
          <li>Not an employer ATS. Resume “match %” is local keyword overlap.</li>
          <li>Not a live FX or crypto exchange. Currency figures are static examples.</li>
          <li>Not medical advice. Health numbers are arithmetic.</li>
          <li>Not a cloud drive. Refreshing a tab can clear unsaved form text.</li>
        </ul>
        <p>
          Written how-tos live in{' '}
          <Link className="text-[#C2410C] font-bold underline" to="/guides">
            Guides
          </Link>
          . Who runs the site:{' '}
          <Link className="text-[#C2410C] font-bold underline" to="/about">
            About
          </Link>
          . Email{' '}
          <a className="text-[#C2410C] font-bold underline" href="mailto:support@filetoolskit.com">
            support@filetoolskit.com
          </a>
          .
        </p>
      </article>
    </section>
  );
};
