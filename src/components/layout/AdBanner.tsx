import React from 'react';

interface AdBannerProps {
  type: 'leaderboard' | 'sidebar' | 'in-content';
  className?: string;
}

export const AdBanner: React.FC<AdBannerProps> = ({ type, className = '' }) => {
  return (
    <div id={`site-note-${type}`} className={`w-full max-w-[560px] mx-auto rounded-3xl bg-[#E6F8F9]/60 border border-[#B3EAEF] p-4 my-6 text-center ${className}`}>
      <p className="text-xs font-black text-[#0A2540]">FileTools Kit</p>
      <p className="text-[11px] text-slate-600 mt-1 font-medium">Tools run in this tab. No paid upgrade on this site.</p>
    </div>
  );
};
