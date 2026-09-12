import { GUIDES as RAW_GUIDES, getGuide as rawGetGuide, type GuideArticle } from './guides';

function honest(text: string): string {
  return text
    .replace('and future ads are a different channel.', 'and AdSense cookies are a different channel.')
    .replace('and future ads', 'and AdSense')
    .replace(
      'and advertising cookies that may appear only after Google AdSense is approved.',
      'and Google AdSense advertising cookies.'
    )
    .replace(
      'The AdSense script is not embedded today. After approval, Google may use cookies to serve ads. Ad networks still would not receive your file bytes from our servers.',
      'The AdSense publisher script is included on the site. Google may use cookies to serve and measure ads. Ad networks still do not receive your file bytes from our servers, because those files are not uploaded to us.'
    )
    .replace(
      'When Google AdSense is approved later, ads still would not receive PDF bytes from our servers, because those files are not uploaded to us.',
      'Google AdSense may show ads on the site. Ads do not receive PDF bytes from our servers, because those files are not uploaded to us.'
    )
    .replace(
      'When ads are eventually enabled, ad networks still would not receive your image files from our servers.',
      'Google AdSense may show ads on the site. Ad networks do not receive your image files from our servers, because those files are not uploaded to us.'
    )
    .replace(
      'See also the cookie policy for what will change if AdSense is enabled.',
      'See also the cookie policy and privacy policy for AdSense, cookies, and opt-out links.'
    );
}

export function applyGuideFixes(guide: GuideArticle): GuideArticle {
  return {
    ...guide,
    updated: guide.slug === 'what-stays-in-the-tab' ? '12 September 2026' : guide.updated,
    summary: honest(guide.summary),
    intro: honest(guide.intro),
    figures: guide.figures.map((figure) => ({
      ...figure,
      alt: honest(figure.alt),
      caption: honest(figure.caption)
    })),
    lead: guide.lead.map(honest),
    whenToUse: guide.whenToUse.map(honest),
    steps: guide.steps.map((step) => ({
      title: step.title === 'Advertising, later' ? 'Advertising' : step.title,
      body: honest(step.body)
    })),
    sections: guide.sections.map((section) => ({
      ...section,
      paragraphs: section.paragraphs.map(honest)
    })),
    cannot: guide.cannot.map(honest),
    privacy: guide.privacy.map(honest),
    notes: guide.notes.map(honest)
  };
}

export const GUIDES = RAW_GUIDES.map(applyGuideFixes);

export function getGuide(slug: string | undefined) {
  const guide = rawGetGuide(slug);
  return guide ? applyGuideFixes(guide) : undefined;
}
