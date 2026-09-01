import React from 'react';
import { motion } from 'motion/react';

export const AmbientBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-slate-950">
      {/* Top-left violet ambient glow from Bento Grid theme */}
      <motion.div
        animate={{
          x: [0, 20, 0, -15, 0],
          y: [0, -20, 15, 0],
          scale: [1, 1.05, 0.95, 1],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-violet-600/15 blur-[130px] rounded-full"
      />

      {/* Bottom-right cyan ambient glow from Bento Grid theme */}
      <motion.div
        animate={{
          x: [0, -20, 15, 0],
          y: [0, 20, -15, 0],
          scale: [1, 0.95, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-600/15 blur-[130px] rounded-full"
      />

      {/* Center subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-slate-900/30 blur-[100px] rounded-full" />

      {/* Fine Bento Grid background pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#94a3b8_1px,transparent_1px)] [background-size:32px_32px]"
      />
    </div>
  );
};

