import React from 'react';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from '../NotFoundPage';
import { StaticDocPage } from '../StaticDocPage';

// Each guide is a plain HTML file in /public/guides. Search engines and direct
// visits get that file. Inside the app we show the same file, so there is one
// copy of every guide.
const STATIC_GUIDES = new Set([
  'build-resume-pdf',
  'compress-images-in-browser',
  'compress-pdf-in-browser',
  'convert-images-png-jpg-webp',
  'create-qr-code',
  'hash-text-sha256',
  'jpg-png-webp-which-to-send',
  'jpg-to-pdf-in-browser',
  'merge-pdf-in-browser',
  'organize-pdf-pages-in-browser',
  'page-numbers-pdf',
  'password-protect-pdf-in-browser',
  'pdf-to-jpg-in-browser',
  'resume-pdf-checklist',
  'split-pdf-pages',
  'watermark-versus-password',
  'what-stays-in-the-tab',
  'when-browser-pdf-tools-fail',
]);

export const GuideArticlePage: React.FC = () => {
  const { slug } = useParams();
  if (!slug || !STATIC_GUIDES.has(slug)) return <NotFoundPage />;
  return <StaticDocPage src={`/guides/${slug}.html`} back={{ to: '/guides', label: 'All guides' }} />;
};
