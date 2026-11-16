# FileTools Kit — Chrome / Edge Extension

This directory contains the ready-to-load Manifest V3 Chrome/Edge extension for **FileTools Kit**.

## Features
- **Instant 1-Click Access** to all in-browser PDF, image, resume, and developer tools right from the browser toolbar.
- **100% Privacy Guarantee:** Tools process files inside the browser tab using WebAssembly and HTML5 Canvas. No file upload APIs are contacted.

## How to Test Locally in Chrome / Edge / Brave

1. Open your browser and navigate to:
   - Chrome: `chrome://extensions`
   - Edge: `edge://extensions`
   - Brave: `brave://extensions`
2. Turn ON **"Developer mode"** (toggle in the top right corner).
3. Click **"Load unpacked"**.
4. Select this directory: `extension/`.
5. Pin the **FileTools Kit** icon to your toolbar!

## How to Publish to the Chrome Web Store

1. Zip the contents of this folder (`manifest.json`, `popup.html`, `icon16.png`, `icon48.png`, `icon128.png`).
2. Go to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).
3. Click **"Add new item"** and upload the `.zip` file.
4. Fill in:
   - **Category:** Productivity / Developer Tools
   - **Detailed description:** "Free, privacy-focused file tools that run 100% in your browser. Merge PDFs, compress documents to under 200KB, optimize WebP/PNG images, and build resumes without uploading your files to third-party servers."
5. Submit for review! (Typically approved within 24–48 hours).
