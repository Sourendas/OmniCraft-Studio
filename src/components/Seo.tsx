import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE, seoForPath, websiteJsonLd } from '../lib/seo';
import { getGuide } from '../data/honestGuides';

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  const sel = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(sel) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export const Seo: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    let page = seoForPath(pathname);
    let jsonLd: unknown = pathname === '/' ? websiteJsonLd() : null;

    const slug = pathname.startsWith('/guides/') ? pathname.slice('/guides/'.length) : '';
    const guide = slug ? getGuide(slug) : undefined;
    if (guide) {
      page = {
        path: `/guides/${guide.slug}`,
        title: `${guide.title} | FileTools Kit`,
        description: guide.summary
      };
      jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: guide.title,
        description: guide.summary,
        inLanguage: 'en',
        dateModified: guide.updated,
        author: { '@type': 'Person', name: 'Souren Das' },
        step: guide.steps.map((s, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          name: s.title,
          text: s.body
        }))
      };
    }

    document.title = page.title;
    upsertMeta('name', 'description', page.description);
    upsertMeta('property', 'og:title', page.title);
    upsertMeta('property', 'og:description', page.description);
    upsertMeta('property', 'og:url', `${SITE}${page.path}`);
    const canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) canonical.href = `${SITE}${page.path}`;

    const existing = document.getElementById('ftk-jsonld');
    if (existing) existing.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'ftk-jsonld';
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
};
