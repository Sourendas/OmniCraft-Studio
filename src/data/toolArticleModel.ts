import { getToolArticle } from './toolArticles';
import { PDF_TOOL_ARTICLES, type ToolArticleWithGuides } from './toolArticlesPdf';
import { TOOL_ARTICLE_EXTRAS, type ToolArticleExtra } from './toolArticlesExtra';

// One place that decides what a tool page's article contains. The React
// component (src/components/tools/ToolArticle.tsx) and the build-time
// prerender script (scripts/prerender-articles.mjs) both read this, so the
// text in the raw HTML cannot drift from the text on screen.
export type ToolArticleModel = ToolArticleWithGuides & {
  extra?: ToolArticleExtra;
  guides: { slug: string; label: string }[];
};

export function buildToolArticle(slug: string): ToolArticleModel | undefined {
  const base: ToolArticleWithGuides | undefined = getToolArticle(slug) ?? PDF_TOOL_ARTICLES[slug];
  if (!base) return undefined;
  const extra = TOOL_ARTICLE_EXTRAS[slug];
  const seen = new Set<string>();
  const guides = [...(base.guides ?? []), ...(extra?.guides ?? [])].filter((g) => !seen.has(g.slug) && seen.add(g.slug));
  return {
    ...base,
    extra,
    steps: extra?.steps ?? base.steps,
    limits: extra?.limits ?? base.limits,
    faq: [...base.faq, ...(extra?.faq ?? [])],
    guides,
  };
}
