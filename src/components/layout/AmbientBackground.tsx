import React, { useEffect, useState } from 'react';
import { GoldenRibbonsBackground } from './GoldenRibbonsBackground';

export const AmbientBackground: React.FC = () => {
  const [enableCanvas, setEnableCanvas] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px) and (pointer: fine)');
    const sync = () => setEnableCanvas(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      <div className="absolute inset-0 bg-gradient-to-b from-white via-[#F6FAFC] to-[#EDF5F8]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,163,173,0.12),transparent_55%),radial-gradient(ellipse_at_bottom_left,rgba(15,76,129,0.08),transparent_50%)]" />
      {enableCanvas ? <GoldenRibbonsBackground /> : null}
    </div>
  );
};
