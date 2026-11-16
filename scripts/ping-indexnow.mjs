// Submit all site URLs to the IndexNow API (Bing, DuckDuckGo, Yahoo, Yandex)
const KEY = 'f8a42b9e67d14835928d3e5b7218e04a';
const HOST = 'www.filetoolskit.com';

const URLS = [
  'https://www.filetoolskit.com/',
  'https://www.filetoolskit.com/merge-pdf',
  'https://www.filetoolskit.com/split-pdf',
  'https://www.filetoolskit.com/compress-pdf',
  'https://www.filetoolskit.com/compress-pdf-to-200kb',
  'https://www.filetoolskit.com/compress-pdf-to-100kb',
  'https://www.filetoolskit.com/rotate-pdf',
  'https://www.filetoolskit.com/docx-to-pdf',
  'https://www.filetoolskit.com/organize-pdf',
  'https://www.filetoolskit.com/pdf-to-jpg',
  'https://www.filetoolskit.com/jpg-to-pdf',
  'https://www.filetoolskit.com/password-protect-pdf',
  'https://www.filetoolskit.com/page-numbers',
  'https://www.filetoolskit.com/resume-builder',
  'https://www.filetoolskit.com/image-optimizer',
  'https://www.filetoolskit.com/file-converter',
  'https://www.filetoolskit.com/qr-generator',
  'https://www.filetoolskit.com/dev-tools',
  'https://www.filetoolskit.com/markdown-editor',
  'https://www.filetoolskit.com/svg-editor',
  'https://www.filetoolskit.com/text-diff',
  'https://www.filetoolskit.com/social-studio',
  'https://www.filetoolskit.com/health-calc',
  'https://www.filetoolskit.com/currency-crypto'
];

async function submitIndexNow() {
  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: `https://${HOST}/${KEY}.txt`,
    urlList: URLS
  };

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(payload)
    });
    console.log(`IndexNow submission response status: ${res.status}`);
  } catch (err) {
    console.error('IndexNow ping error:', err);
  }
}

submitIndexNow();
