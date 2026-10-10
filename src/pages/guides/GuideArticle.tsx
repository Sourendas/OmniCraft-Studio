import React from 'react';
import { useParams } from 'react-router-dom';
import { NotFoundPage } from '../NotFoundPage';
import { StaticDocPage } from '../StaticDocPage';
import { STATIC_GUIDE_SLUGS, guideCategoryName } from '../../data/guideCatalog';

// Each guide is a plain HTML file in /public/guides. Search engines and direct
// visits get that file. Inside the app we show the same file, so there is one
// copy of every guide. The list of guides lives in src/data/guideCatalog.ts.

export const GuideArticlePage: React.FC = () => {
  const { slug } = useParams();
  if (!slug || !STATIC_GUIDE_SLUGS.has(slug)) return <NotFoundPage />;
  return <StaticDocPage src={`/guides/${slug}.html`} back={{ to: '/guides', label: 'All guides' }} trail={guideCategoryName(slug)} />;
};
