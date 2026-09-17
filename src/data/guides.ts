export interface GuideFigure {
  src: string;
  alt: string;
  caption: string;
}

export interface GuideArticle {
  slug: string;
  title: string;
  summary: string;
  toolRoute: string;
  toolLabel: string;
  updated: string;
  intro: string;
  wordCount: number;
  figures: GuideFigure[];
  lead: string[];
  whenToUse: string[];
  steps: { title: string; body: string }[];
  sections: { heading: string; paragraphs: string[] }[];
  cannot: string[];
  privacy: string[];
  notes: string[];
  relatedGuides?: { slug: string; label: string }[];
}

export const GUIDES: GuideArticle[] = [];

export function getGuide(slug: string | undefined) {
  if (!slug) return undefined;
  return GUIDES.find((g) => g.slug === slug);
}
