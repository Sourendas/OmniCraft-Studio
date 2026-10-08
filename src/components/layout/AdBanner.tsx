import React from 'react';

interface AdBannerProps {
  type: 'leaderboard' | 'sidebar' | 'in-content';
  className?: string;
}

// Ads are placed by Google AdSense Auto ads from the script in index.html.
// This slot used to render a filler "site note" box where a manual ad unit
// would sit. Filler boxes read as empty sections to reviewers, so the slot
// renders nothing until a real ad unit is configured here.
export const AdBanner: React.FC<AdBannerProps> = () => null;
