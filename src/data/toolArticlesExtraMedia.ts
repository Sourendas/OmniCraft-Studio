import type { ToolArticleExtra } from './toolArticlesExtra';

export const EXTRA_MEDIA: Record<string, ToolArticleExtra> = {
  'file-converter': {
    sections: [
      {
        heading: 'What each conversion does',
        paragraphs: [
          "Images the browser can open (PNG, JPEG, WebP, and usually GIF and BMP) are drawn on a canvas and saved as PNG, JPG, or WebP at quality 0.92. When the target is JPG, transparent areas are painted white first, because JPEG has no transparency. The picture keeps its pixel size. Camera details and GPS location are not copied into the new file.",
          "Audio files the browser can play, such as MP3 or WAV, are decoded and saved as uncompressed WAV. A DOCX file can be saved as plain text, or as a simple text-only PDF on Letter-size pages in 10-point Helvetica. Tables, images, and styling from the Word file are not carried into that PDF. TXT, Markdown, and HTML files export as plain text. Spreadsheets, slides, ODT, and old .doc files are marked Unsupported, because the browser has no reliable way to read them.",
        ],
      },
      {
        heading: 'Picking the right target',
        paragraphs: [
          "WebP is the default for images because it is usually smallest at similar quality, and most current sites accept it. Choose JPG for an older upload form or an email to someone on an old device. Choose PNG for screenshots, logos, and anything with sharp text where blur would be obvious. Converting never adds detail that was not there, so a small blurry JPEG saved as PNG becomes a larger blurry file.",
        ],
      },
    ],
    tips: [
      "To make a photo smaller as well as change its format, use Image Optimizer, which adds quality and scale controls.",
      "The DOCX to PDF path uses a basic Latin font. Text in Hindi, Tamil, or other non-Latin scripts will not display correctly. Export from Word or Google Docs instead.",
      "Convert All skips files marked Unsupported, so a mixed folder will not stop halfway.",
    ],
    faq: [
      { q: "Can I convert HEIC iPhone photos?", a: "Only if your browser can open HEIC, which most desktop browsers cannot. On the iPhone, set Camera > Formats to Most Compatible, or share the photo as JPEG." },
      { q: "Why is the WAV so much bigger than the MP3?", a: "WAV stores every audio sample uncompressed. A minute of stereo CD-quality audio is about 10 MB." },
    ],
    guides: [
      { slug: 'webp-images-for-websites', label: 'Compress images for a website: WebP explained' },
      { slug: 'convert-images-png-jpg-webp', label: 'How to convert PNG, JPG, and WebP' },
    ],
  },
  'image-optimizer': {
    steps: [
      { title: 'Add images', body: 'Press Select or Drop Images to Compress and pick one or more PNG, JPG, or WebP files. Each one is processed straight away with the current settings.' },
      { title: 'Set quality, scale, and format', body: 'Visual Quality runs from 10 to 95 percent (75 is the default). Dimensions Scaling shrinks width and height from 100 down to 25 percent. Output Format is WebP, JPEG, or PNG. Changing any control re-processes every image in the list.' },
      { title: 'Compare and download', body: 'Each card shows the size before and after and the new pixel size. Press Save on one image or Download All for every image. Open a result and check that faces and text are still clear.' },
    ],
    sections: [
      {
        heading: 'Which control saves the most',
        paragraphs: [
          "For phone photos, scale usually matters more than quality. A 4000-pixel-wide photo shown at 1200 pixels on a website carries about eleven times more pixels than it needs. Setting Dimensions Scaling to 30 or 40 percent and quality around 70 to 80 percent typically brings a multi-megabyte photo down to a few hundred kilobytes. The exact result depends on the photo, so the page shows real sizes rather than a promised percentage.",
          "The quality slider only affects WebP and JPEG. PNG is lossless, so for PNG only the scale changes the size. If a PNG screenshot is still large, try WebP, which keeps text readable at a fraction of the size.",
        ],
      },
      {
        heading: 'Privacy',
        paragraphs: [
          "Images are decoded and re-encoded on a canvas in this tab. Re-encoding drops embedded metadata such as camera model and GPS location, which is useful before posting a photo publicly. Nothing is sent to a FileTools Kit server.",
        ],
      },
    ],
    limits: [
      "Recompression is lossy for WebP and JPEG. You cannot recover detail afterwards, so keep the original.",
      "Very large panoramas or dozens of photos at once can slow a phone. Work in smaller batches.",
      "Download All saves each image as a separate file. Your browser may ask once to allow multiple downloads.",
    ],
    tips: [
      "Transparent PNGs exported as JPEG get a white background. Use WebP or PNG to keep transparency.",
      "Do not compress the same JPEG repeatedly. Start again from the original each time.",
      "For document photos headed into a PDF, compress them here first, then use JPG to PDF.",
    ],
    faq: [
      { q: "What settings should I use for a website?", a: "Scale the image to roughly the largest width it will be shown at, choose WebP, and start at 75 percent quality. Lower it until you can see a difference, then go back one step." },
      { q: "Why did one image get bigger?", a: "An already well-compressed small image can grow when re-encoded at a higher quality. Lower the quality or keep the original." },
    ],
    guides: [
      { slug: 'webp-images-for-websites', label: 'Compress images for a website: WebP explained' },
      { slug: 'compress-images-in-browser', label: 'How to compress images in the browser' },
    ],
  },
  'qr-generator': {
    sections: [
      {
        heading: 'The five code types',
        paragraphs: [
          "Website URL encodes a web address and adds https:// if you leave it off. Wi-Fi Network encodes the network name, password, and security type so a phone can join without typing. vCard Contact encodes a name, company, phone, and email that a phone offers to save as a contact. Email Draft opens a new email to the address you enter. Plain Text encodes any short text exactly as typed.",
          "The preview updates as you type. Download PNG saves a 320-pixel image named filetoolskit-qr.png. Vector SVG saves filetoolskit-qr.svg, which stays sharp at any size and is the better choice for print.",
        ],
      },
      {
        heading: 'Colours, error correction, and margin',
        paragraphs: [
          "Keep the foreground dark and the background light. Many scanners struggle with light-on-dark codes or low contrast. Error Correction sets how much of the code can be damaged and still scan: L recovers about 7 percent, M 15, Q 25, and H 30. H is the default. Lower levels make a less dense code, which helps when the payload is long. Quiet Margin is the blank border, from 0 to 6 modules. Keep at least 2, and more if the code will sit on a busy background.",
        ],
      },
    ],
    tips: [
      "Scan the downloaded file with two different phones before you print anything.",
      "Printed codes cannot be edited. If the address might change, encode a page you control that you can update.",
      "For print, keep the code at least 2 cm wide for a table card and larger for a poster read from a distance.",
    ],
    faq: [
      { q: "Do these codes expire?", a: "No. They are static codes that contain the data itself. There is no redirect service that could switch off." },
      { q: "Can I track how many people scanned it?", a: "No. A static code has no tracking. If you need counts, encode a link to a page with your own analytics." },
    ],
    guides: [
      { slug: 'wifi-qr-code', label: 'Make a Wi-Fi QR code guests can scan' },
      { slug: 'create-qr-code', label: 'How to create a QR code and export PNG or SVG' },
    ],
  },
  'svg-studio': {
    sections: [
      {
        heading: 'What you can change',
        paragraphs: [
          "Start from one of the eight preset icons, paste SVG markup into the code view, or press Upload SVG. Stroke colour, fill colour, and stroke width are applied by rewriting the stroke, fill, and stroke-width attributes that already exist in the markup. Icons that set colours through a style attribute or a CSS class will not change, because those values are not attributes. Fill can be left transparent so outline icons stay outlines.",
          "Inner Padding, Rotation Angle, and the background choice (Cyan Glow, Transparent, Solid White, or Dark Slate) shape the preview and the PNG export. Download SVG and Copy Minified SVG give you the recoloured markup with comments, XML declarations, and extra whitespace removed. The React Component tab wraps the same markup in a TypeScript JSX component with camelCase attributes.",
        ],
      },
      {
        heading: 'When SVG Studio is the right tool',
        paragraphs: [
          "It suits quick jobs on simple icons: matching an icon to a brand colour, making a thicker outline for a small button, producing a PNG for a slide, or getting a React component without setting up a build step. For illustrations with gradients, masks, embedded images, or many layers, a full vector editor such as Inkscape or Figma gives you control over each part. Whatever you change, the original file on your computer is not touched until you save a download over it.",
        ],
      },
      {
        heading: 'PNG export',
        paragraphs: [
          "Export PNG draws the icon on a canvas at four times the 256-pixel preview, so the file is 1024 by 1024 pixels. The default background is Cyan Glow. Choose Transparent first if the PNG will sit on a coloured page.",
        ],
      },
    ],
    tips: [
      "Only paste SVG from sources you trust. SVG can contain scripts and links, and this page does not sanitise every possible feature.",
      "If a recolour changes parts you wanted to keep, edit the markup by hand in the code view.",
      "Use the SVG on websites and in print. Use the PNG where a tool does not accept SVG, such as some slide decks and social posts.",
    ],
    faq: [
      { q: "Is rotation saved in the SVG file?", a: "No. Rotation and padding apply to the preview and the PNG. The SVG download carries the colour and stroke changes." },
      { q: "Can it trace a photo into an SVG?", a: "No. It edits existing vector markup. Tracing a photo needs a dedicated vector tool." },
    ],
    guides: [{ slug: 'svg-vs-png', label: 'SVG vs PNG: which image format to use' }],
  },
  'social-studio': {
    sections: [
      {
        heading: 'How the styles work',
        paragraphs: [
          "Each style swaps ordinary letters and digits for look-alike symbols from the Unicode mathematical and enclosed alphanumeric blocks: Bold Sans, Italic Serif, Gothic / Fraktur, Double-Struck / Outline, Circled / Bubble, Monospace Code, Small Caps, and Strikethrough. Because they are symbols rather than a font, they survive copy and paste into apps that do not let you choose fonts.",
          "The meters compare the length of the plain text you typed with common limits: 280 for X, 150 for an Instagram bio, 80 for a TikTok bio, 3000 for a LinkedIn post, and 500 for Threads. Styled symbols can count as two characters each in some apps, so leave room when you paste a styled version.",
        ],
      },
      {
        heading: 'Accessibility and search',
        paragraphs: [
          "Screen readers often read styled symbols one by one, or as mathematical letters, which makes a styled sentence hard to follow. Search inside apps may not match styled words to their plain spelling. Use a style for a name or a two-word heading, and keep the message itself in plain text.",
        ],
      },
    ],
    tips: [
      "Check the pasted result on your phone. Some older devices show empty boxes for rare symbols.",
      "Keep hashtags and @mentions in plain text so they still link.",
      "Platform limits change. Treat the meters as a guide and check the app's own counter before posting.",
    ],
    faq: [
      { q: "Are these real fonts?", a: "No. They are separate Unicode characters. That is why they paste anywhere, and also why screen readers and search treat them differently." },
      { q: "Does Social Studio store my text?", a: "No. The text stays in this tab and is gone when you close it." },
    ],
  },
};
