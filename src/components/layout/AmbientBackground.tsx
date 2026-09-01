import React from 'react';
import { GoldenRibbonsBackground } from './GoldenRibbonsBackground';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Live animated golden ribbons background */}
      <GoldenRibbonsBackground />
    </div>
  );
};


