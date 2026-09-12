import React from 'react';

interface BrandLockupProps {
  compact?: boolean;
}

export const BrandLockup: React.FC<BrandLockupProps> = ({ compact = false }) => {
  const size = compact ? 32 : 40;
  return (
    <span className="flex items-center gap-2 min-w-0">
      <span className={`${compact ? 'w-8 h-8' : 'w-10 h-10'} rounded-full overflow-hidden shrink-0 bg-white`}>
        <img
          src="/logo.svg"
          alt=""
          width={size}
          height={size}
          className="w-full h-full object-cover"
        />
      </span>
      <span className="flex flex-col leading-none min-w-0">
        <span className={`${compact ? 'text-[16px]' : 'text-[18px]'} font-extrabold tracking-[-0.04em] text-[#0A2540]`}>
          File<span className="text-[#2563EB]">Tools</span>Kit
        </span>
        {!compact && (
          <span className="mt-0.5 text-[9px] font-semibold tracking-[0.12em] uppercase text-slate-500 truncate">
            Simple tools. Bigger possibilities.
          </span>
        )}
      </span>
    </span>
  );
};
