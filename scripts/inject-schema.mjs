import fs from 'fs';
import path from 'path';
import {fileURLToPath} from 'url';

const SITE = 'https://www.filetoolskit.com';
const dist = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');

function jsonLdTag(id, data) {
  const json = JSON.stringify(data).replace(/</g, String.fromCharCode(92) + 'u003c');
  return '<script type="application/ld+json" id="' + id + '">' + json + '</script>\n    ';
}

function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': SITE + '/#organization',
        name: 'FileTools Kit',
        url: SITE,
        logo: SITE + '/logo.jpg',
        email: 'support@filetoolskit.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bengaluru',
          addressRegion: 'Karnataka',
          addressCountry: 'IN',
        },
        founder: {'@id': SITE + '/#souren-das'},
      },
      {
        '@type': 'Person',
        '@id': SITE + '/#souren-das',
        name: 'Souren Das',
        email: 'mailto:support@filetoolskit.com',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Bengaluru',
          addressRegion: 'Karnataka',
          addressCountry: 'IN',
        },
      },
      {
        '@type': 'WebSite',
        '@id': SITE + '/#website',
        url: SITE,
        name: 'FileTools Kit',
        description: 'Merge PDFs, convert images, build a resume PDF, and more in this tab. Free tools operated by Souren Das in Bengaluru. No file-upload API.',
        inLanguage: 'en',
        publisher: {'@id': SITE + '/#organization'},
      },
    ],
  };
}

function toolSchema(route, name, description) {
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'FileTools Kit', item: SITE + '/'},
      {'@type': 'ListItem', position: 2, name: name, item: SITE + route},
    ],
  };
  const app = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: name,
    description: description,
    url: SITE + route,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Web browser',
    isAccessibleForFree: true,
    provider: {'@id': SITE + '/#organization'},
  };
  return jsonLdTag('ftk-breadcrumb', breadcrumb) + jsonLdTag('ftk-software', app);
}

const extraShells = {
  '/markdown-editor': {
    h1: 'Markdown Editor — write and preview in the tab',
    description: 'Preview Markdown locally. Refreshing can clear unsaved text.',
  },
  '/svg-editor': {
    h1: 'SVG Studio — edit simple vector markup locally',
    description: 'Tweak SVG markup in the browser. No photo auto-trace.',
  },
  '/text-diff': {
    h1: 'Text Diff — compare two strings side by side',
    description: 'Insertions and deletions in this tab. Refreshing clears the boxes.',
  },
  '/social-studio': {
    h1: 'Social Studio — resize a canvas for common post sizes',
    description: 'Export a PNG. This page does not post to any network.',
  },
  '/health-calc': {
    h1: 'Health calculator — numbers only, not medical advice',
    description: 'BMI here is arithmetic. See the disclaimer.',
  },
  '/currency-crypto': {
    h1: 'Currency worksheet — example rates, not a live feed',
    description: 'Static example figures. Not a bank quote.',
  },
};

function textOf(value) {
  return value.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

function decode(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function matchOne(html, re) {
  const found = html.match(re);
  return found ? found[1].trim() : '';
}

function injectStaticHtml(file) {
  const html = fs.readFileSync(file, 'utf8');
  if (html.includes('id="ftk-site"') || !html.includes('</head>')) return;
  const title = matchOne(html, /<title>([\s\S]*?)<\/title>/i);
  if (!title) return;
  const name = textOf(title).replace(/\s*\|\s*FileTools Kit\s*$/, '').trim();
  const description = decode(matchOne(html, /<meta\s+name="description"\s+content="([^"]*)"/i));
  const canonical = matchOne(html, /<link\s+rel="canonical"\s+href="([^"]*)"/i);
  const rel = '/' + path.relative(dist, file).split(path.sep).join('/');
  const url = canonical || (SITE + rel);
  const crumbs = [
    {'@type': 'ListItem', position: 1, name: 'FileTools Kit', item: SITE + '/'},
  ];
  if (rel.startsWith('/guides/') && rel !== '/guides.html') {
    crumbs.push({'@type': 'ListItem', position: 2, name: 'Guides', item: SITE + '/guides.html'});
    crumbs.push({'@type': 'ListItem', position: 3, name: name, item: url});
  } else {
    crumbs.push({'@type': 'ListItem', position: 2, name: name, item: url});
  }
  let extra = jsonLdTag('ftk-site', siteGraph()) + jsonLdTag('ftk-breadcrumb', {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs,
  });
  const ol = matchOne(html, /<ol>([\s\S]*?)<\/ol>/i);
  if (ol && description) {
    const steps = [...ol.matchAll(/<li>([\s\S]*?)<\/li>/gi)]
      .map((item) => decode(textOf(item[1])))
      .filter(Boolean);
    if (steps.length) {
      extra += jsonLdTag('ftk-howto', {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: name,
        description: description,
        inLanguage: 'en',
        step: steps.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step,
          text: step,
        })),
      });
    }
  }
  fs.writeFileSync(file, html.replace('</head>', extra + '  </head>'));
}

function walk(dir) {
  for (const ent of fs.readdirSync(dir, {withFileTypes: true})) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(full);
    else if (ent.name.endsWith('.html')) injectStaticHtml(full);
  }
}

const homePath = path.join(dist, 'index.html');
const home = fs.readFileSync(homePath, 'utf8');

for (const ent of fs.readdirSync(dist, {withFileTypes: true})) {
  if (!ent.isDirectory()) continue;
  const indexPath = path.join(dist, ent.name, 'index.html');
  if (!fs.existsSync(indexPath)) continue;
  let html = fs.readFileSync(indexPath, 'utf8');
  if (!html.includes('id="ftk-site"') || html.includes('id="ftk-breadcrumb"')) continue;
  const route = '/' + ent.name;
  const h1 = textOf(matchOne(html, /<h1>([\s\S]*?)<\/h1>/i)) || ent.name;
  const description = decode(matchOne(html, /<meta\s+name="description"\s+content="([^"]*)"/i));
  html = html.replace('</head>', toolSchema(route, h1, description) + '  </head>');
  fs.writeFileSync(indexPath, html);
}

for (const [route, page] of Object.entries(extraShells)) {
  const dir = path.join(dist, route.slice(1));
  fs.mkdirSync(dir, {recursive: true});
  const file = path.join(dir, 'index.html');
  if (fs.existsSync(file) && fs.readFileSync(file, 'utf8').includes('id="ftk-breadcrumb"')) continue;
  const out = home.replace('</head>', toolSchema(route, page.h1, page.description) + '  </head>');
  fs.writeFileSync(file, out);
}

walk(dist);
