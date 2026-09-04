import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE, seoForPath, websiteJsonLd } from '../lib/seo';
import { getGuide } from '../data/guides';

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
    upsertMeta('property', 'og:type', pathname === '/' ? 'website' : 'article');
    upsertMeta('property', 'og:image', `${SITE}/og.svg`);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', page.title);
    upsertMeta('name', 'twitter:description', page.description);
    upsertMeta('name', 'twitter:image', `${SITE}/og.svg`);

    let link = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = `${SITE}${page.path}`;

    const id = 'ftk-jsonld';
    document.getElementById(id)?.remove();
    if (jsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = id;
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
  }, [pathname]);

  return null;
};
