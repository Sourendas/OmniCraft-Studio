import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// The policy, about, and contact pages are plain HTML files in /public. Search
// engines and direct visits get those files. Inside the app, this component
// loads the same file and shows its <main> content inside the site layout, so
// there is one copy of each policy instead of two that drift apart.

const IN_APP: Record<string, string> = {
  '/privacy.html': '/privacy',
  '/terms.html': '/terms',
  '/cookie-policy.html': '/cookie-policy',
  '/disclaimer.html': '/disclaimer',
  '/contact.html': '/contact',
  '/about.html': '/about',
};

const prose =
  'rounded-3xl bg-white border border-slate-200 p-6 sm:p-8 text-sm text-slate-700 leading-relaxed ' +
  '[&_h1]:text-3xl [&_h1]:font-black [&_h1]:text-[#0A2540] [&_h1]:mb-2 ' +
  '[&_h2]:text-lg [&_h2]:font-black [&_h2]:text-[#0A2540] [&_h2]:mt-6 [&_h2]:mb-2 ' +
  '[&_p]:my-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:my-3 [&_li]:my-1 ' +
  '[&_a]:text-[#C2410C] [&_a]:underline [&_a]:font-bold';

export const StaticDocPage: React.FC<{ src: string }> = ({ src }) => {
  const [html, setHtml] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let alive = true;
    setHtml(null);
    setFailed(false);
    fetch(src, { headers: { Accept: 'text/html' } })
      .then((res) => (res.ok ? res.text() : Promise.reject(new Error(String(res.status)))))
      .then((text) => {
        if (!alive) return;
        const doc = new DOMParser().parseFromString(text, 'text/html');
        const main = doc.querySelector('main');
        if (!main) throw new Error('no main');
        // Drop the small link row at the top and the footer nav of the static
        // file; the app already has a navbar and footer.
        const first = main.firstElementChild;
        if (first && first.tagName === 'P' && first.querySelector('a[href="/"]')) first.remove();
        main.querySelectorAll('nav.static-nav').forEach((n) => n.remove());
        main.querySelectorAll('script').forEach((n) => n.remove());
        setHtml(main.innerHTML);
      })
      .catch(() => {
        if (alive) setFailed(true);
      });
    return () => {
      alive = false;
    };
  }, [src]);

  useEffect(() => {
    if (failed) window.location.replace(src);
  }, [failed, src]);

  const onClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const a = (e.target as HTMLElement).closest('a');
    if (!a || e.metaKey || e.ctrlKey || e.shiftKey || a.target) return;
    const href = a.getAttribute('href') || '';
    const to = IN_APP[href];
    if (to) {
      e.preventDefault();
      navigate(to);
    }
  };

  return (
    <div className="relative z-10 max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-1.5 text-xs font-black text-[#C2410C] mb-6">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to tools
      </Link>
      {html === null ? (
        <div className="rounded-3xl bg-white border border-slate-200 p-8 text-sm text-slate-600">Loading…</div>
      ) : (
        <div className={prose} onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
      )}
    </div>
  );
};
