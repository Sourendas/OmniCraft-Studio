import { EXTRA_PDF_A } from './toolArticlesExtraPdfA';
import { EXTRA_PDF_B } from './toolArticlesExtraPdfB';
import { EXTRA_MEDIA } from './toolArticlesExtraMedia';
import { EXTRA_TEXT } from './toolArticlesExtraText';

// Longer sections added under each tool in October 2026. The base articles in
// toolArticles.ts and toolArticlesPdf*.ts stay as they are; these add depth.
// steps or limits, when present, replace the base list because the base text
// described the tool less precisely than this does.
export interface ToolArticleExtra {
  sections: { heading: string; paragraphs: string[] }[];
  tips: string[];
  faq: { q: string; a: string }[];
  guides?: { slug: string; label: string }[];
  steps?: { title: string; body: string }[];
  limits?: string[];
}

export const TOOL_ARTICLE_EXTRAS: Record<string, ToolArticleExtra> = {
  ...EXTRA_PDF_A,
  ...EXTRA_PDF_B,
  ...EXTRA_MEDIA,
  ...EXTRA_TEXT,
};
