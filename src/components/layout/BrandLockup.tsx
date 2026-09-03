import React from 'react';

interface BrandLockupProps {
  compact?: boolean;
}

export const BrandLockup: React.FC<BrandLockupProps> = ({ compact = false }) => {
  return (
    <span className="flex items-center gap-2.5 min-w-0">
      <span className={`${compact ? 'w-8 h-8' : 'w-9 h-9'} rounded-xl shadow-sm shadow-teal-900/10 overflow-hidden shrink-0`}>
        <img src="/favicon.svg" alt="" width={36} height={36} className="w-full h-full" />
      </span>
      <span className="flex items-baseline gap-1.5 leading-none">
        <span className={`${compact ? 'text-[17px]' : 'text-[19px]'} font-extrabold tracking-[-0.045em] text-[#0A2540]`}>
          File<span className="text-[#00A3AD]">Tools</span>
        </span>
        <span className="inline-flex items-center rounded-md bg-[#E6F8F9] px-1.5 py-[3px] text-[10px] font-extrabold tracking-[0.18em] text-[#0F4C81]">
          KIT
        </span>
      </span>
    </span>
  );
};
