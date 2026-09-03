import type { ExperimentDef } from './abtest';

export const EXPERIMENTS: Record<string, ExperimentDef> = {
  hero_cta: {
    id: 'hero_cta',
    description: 'Home hero primary button label',
    enabled: true,
    variants: [
      { id: 'a', weight: 50 },
      { id: 'b', weight: 50 },
    ],
  },
};

export const HERO_CTA_COPY: Record<string, string> = {
  a: 'Browse tools',
  b: 'Open the tools',
};
