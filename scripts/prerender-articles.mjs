// Build-time step: put each tool page's article and FAQ into its route-shell
// HTML so crawlers that do not run JavaScript see the full text.
// Source of truth: src/data/toolArticleModel.ts (the same model the React
// component renders). Route -> article slug comes from the WithArticle routes
// in src/App.tsx. The text goes inside <div id="boot">, which src/main.tsx
// removes in the same task as the first React render, so it never shows next
// to the live article and React never hydrates it (createRoot, not hydrateRoot).
import fs from 'fs';
import os from 'os';
import path from 'path';
import {fileURLToPath, pathToFileURL} from 'url';
import {build} from 'esbuild';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'ftk-articles-'));
const out = path.join(tmp, 'model.mjs');
await build({
  entryPoints: [path.join(root, 'src/data/toolArticleModel.ts')],
  bundle: true,
  format: 'esm',
  platform: 'node',
  outfile: out,
  logLevel: 'error',
});
const {buildToolArticle} = await import(pathToFileURL(out).href);
fs.rmSync(tmp, {recursive: true, force: true});

const app = fs.readFileSync(path.join(root, 'src/App.tsx'), 'utf8');
const routes = [...app.matchAll(/path="(\/[^"]+)"\s+element=\{<WithArticle\s+slug="([^"]+)"/g)].map((m) => [m[1], m[2]]);

const list = (items) => '<ul>' + items.map((i) => `<li>${esc(i)}</li>`).join('') + '</ul>';

function articleHtml(a) {
  const x = a.extra;
  let h = `<article id="boot-article"><h2>${esc(a.title)}</h2><p>${esc(a.lede)}</p>`;
  h += '<h3>Who this is for</h3>' + list(a.forWho);
  h += '<h3>Who this is not for</h3>' + list(a.notFor);
  h += '<h3>How to use it</h3><ol>' + a.steps.map((s) => `<li><strong>${esc(s.title)}.</strong> ${esc(s.body)}</li>`).join('') + '</ol>';
  h += '<h3>Limits</h3>' + list(a.limits);
  for (const s of x?.sections ?? []) h += `<section><h3>${esc(s.heading)}</h3>${s.paragraphs.map((p) => `<p>${esc(p)}</p>`).join('')}</section>`;
  if (x && x.tips.length) h += '<h3>Tips</h3>' + list(x.tips);
  h += '<h3>Questions</h3><dl>' + a.faq.map((f) => `<div><dt>${esc(f.q)}</dt><dd>${esc(f.a)}</dd></div>`).join('') + '</dl>';
  if (a.guides.length) {
    h += '<h3>Related guides</h3><ul>' + a.guides.map((g) => `<li><a href="/guides/${esc(g.slug)}">${esc(g.label)}</a></li>`).join('') + '</ul>';
  }
  h += '<p>Operator: Souren Das, Bengaluru. Guides: <a href="/guides">filetoolskit.com/guides</a>. Privacy: <a href="/privacy">Privacy</a>. Support: <a href="mailto:support@filetoolskit.com">support@filetoolskit.com</a>.</p></article>';
  return h;
}

const STYLE = '<style id="boot-article-style">#boot article{margin:2rem 0 0;max-width:40rem}#boot article h2{margin:0;font-size:1.25rem;line-height:1.3;font-weight:800}#boot article h3{margin:1.4rem 0 0;font-size:1rem;font-weight:800}#boot article ul,#boot article ol{margin:0.6rem 0 0;padding-left:1.25rem;font-size:0.95rem;line-height:1.55;color:#334155}#boot article li{margin:0.3rem 0}#boot article dt{margin-top:0.8rem;font-weight:800}#boot article dd{margin:0.2rem 0 0;font-size:0.95rem;line-height:1.55;color:#334155}</style>';

let done = 0;
for (const [route, slug] of routes) {
  const file = path.join(dist, route.slice(1), 'index.html');
  if (!fs.existsSync(file)) { console.warn(`prerender-articles: no shell for ${route}`); continue; }
  const article = buildToolArticle(slug);
  if (!article) { console.warn(`prerender-articles: no article for ${route} (${slug})`); continue; }
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('id="boot-article"')) continue;
  const m = /(<div id="boot">[\s\S]*?)(<\/div>\s*<noscript>)/.exec(html);
  if (!m) { console.warn(`prerender-articles: boot block not found in ${route}`); continue; }
  html = html.slice(0, m.index) + m[1] + articleHtml(article) + m[2] + html.slice(m.index + m[0].length);
  html = html.replace('</head>', '    ' + STYLE + '\n  </head>');
  fs.writeFileSync(file, html);
  done++;
}
console.log(`prerender-articles: injected ${done} of ${routes.length} tool routes`);
if (done === 0 && !process.env.PRERENDER_ALLOW_ZERO) {
  // Idempotent re-runs report 0, so only fail when no shell carries an article.
  const any = routes.some(([r]) => fs.existsSync(path.join(dist, r.slice(1), 'index.html')) && fs.readFileSync(path.join(dist, r.slice(1), 'index.html'), 'utf8').includes('id="boot-article"'));
  if (!any) throw new Error('prerender-articles: no article was injected');
}
