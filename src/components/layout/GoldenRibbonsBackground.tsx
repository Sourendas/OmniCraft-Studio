import React, { useEffect, useRef } from 'react';

export const GoldenRibbonsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Solutionreach signature clean teal, cyan, and ocean blue waves
    const ribbonWaves = [
      {
        yRatio: 0.18,
        amplitude: 36,
        wavelength: 0.0014,
        speed: 0.0005,
        thickness: 28,
        colorStart: 'rgba(0, 163, 173, 0.08)',
        colorMid: 'rgba(0, 194, 203, 0.16)',
        colorEnd: 'rgba(15, 76, 129, 0.05)',
        strokeColor: 'rgba(0, 163, 173, 0.22)',
        lineWidth: 1.2
      },
      {
        yRatio: 0.45,
        amplitude: 48,
        wavelength: 0.0011,
        speed: -0.0004,
        thickness: 40,
        colorStart: 'rgba(0, 181, 184, 0.09)',
        colorMid: 'rgba(208, 242, 243, 0.22)',
        colorEnd: 'rgba(0, 140, 149, 0.06)',
        strokeColor: 'rgba(0, 163, 173, 0.20)',
        lineWidth: 1.4
      },
      {
        yRatio: 0.72,
        amplitude: 42,
        wavelength: 0.0013,
        speed: 0.0006,
        thickness: 30,
        colorStart: 'rgba(15, 76, 129, 0.07)',
        colorMid: 'rgba(0, 163, 173, 0.14)',
        colorEnd: 'rgba(0, 194, 203, 0.05)',
        strokeColor: 'rgba(15, 76, 129, 0.18)',
        lineWidth: 1.0
      },
      {
        yRatio: 0.88,
        amplitude: 30,
        wavelength: 0.0016,
        speed: -0.0003,
        thickness: 22,
        colorStart: 'rgba(0, 163, 173, 0.06)',
        colorMid: 'rgba(230, 248, 249, 0.20)',
        colorEnd: 'rgba(0, 181, 184, 0.04)',
        strokeColor: 'rgba(0, 163, 173, 0.15)',
        lineWidth: 1.0
      }
    ];

    // Minimal floating ambient particles
    const particles = Array.from({ length: 24 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.6 + 0.6,
      alpha: Math.random() * 0.35 + 0.1,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -Math.random() * 0.3 - 0.05,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2
    }));

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // 1. Solutionreach crisp bright background with soft cool gradient
      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#FFFFFF');
      bgGrad.addColorStop(0.35, '#F8FCFD');
      bgGrad.addColorStop(0.7, '#F2F8FA');
      bgGrad.addColorStop(1, '#EDF5F8');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // 2. Soft cyan/teal ambient glow orbs
      const glow1 = ctx.createRadialGradient(
        width * 0.15, height * 0.22, 20,
        width * 0.15, height * 0.22, width * 0.42
      );
      glow1.addColorStop(0, 'rgba(0, 163, 173, 0.12)');
      glow1.addColorStop(0.6, 'rgba(208, 242, 243, 0.05)');
      glow1.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glow1;
      ctx.fillRect(0, 0, width, height);

      const glow2 = ctx.createRadialGradient(
        width * 0.85, height * 0.65, 30,
        width * 0.85, height * 0.65, width * 0.48
      );
      glow2.addColorStop(0, 'rgba(15, 76, 129, 0.08)');
      glow2.addColorStop(0.55, 'rgba(0, 194, 203, 0.04)');
      glow2.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glow2;
      ctx.fillRect(0, 0, width, height);

      // 3. Render clean fluid Solutionreach wave ribbons
      ribbonWaves.forEach((wave) => {
        const baseY = height * wave.yRatio;
        const currentPhase = time * wave.speed;

        ctx.save();
        ctx.beginPath();

        // Top edge
        const step = 25;
        ctx.moveTo(0, baseY + Math.sin(currentPhase) * wave.amplitude);

        for (let x = 0; x <= width + step; x += step) {
          const w1 = Math.sin(x * wave.wavelength + currentPhase) * wave.amplitude;
          const w2 = Math.cos(x * wave.wavelength * 0.6 - currentPhase * 0.7) * (wave.amplitude * 0.25);
          const y = baseY + w1 + w2;
          ctx.lineTo(x, y);
        }

        // Bottom edge
        for (let x = width + step; x >= 0; x -= step) {
          const w1 = Math.sin(x * wave.wavelength + currentPhase + 0.3) * wave.amplitude;
          const w2 = Math.cos(x * wave.wavelength * 0.6 - currentPhase * 0.7) * (wave.amplitude * 0.25);
          const y = baseY + w1 + w2 + wave.thickness + Math.sin(x * 0.0015 + currentPhase) * 6;
          ctx.lineTo(x, y);
        }

        ctx.closePath();

        // Fill fluid cyan gradient
        const ribbonGrad = ctx.createLinearGradient(0, baseY - wave.amplitude, width, baseY + wave.amplitude + wave.thickness);
        ribbonGrad.addColorStop(0, wave.colorStart);
        ribbonGrad.addColorStop(0.45, wave.colorMid);
        ribbonGrad.addColorStop(1, wave.colorEnd);
        ctx.fillStyle = ribbonGrad;
        ctx.fill();

        // Fine crisp stroke
        ctx.lineWidth = wave.lineWidth;
        ctx.strokeStyle = wave.strokeColor;
        ctx.stroke();

        ctx.restore();
      });

      // 4. Render subtle cyan light motes
      particles.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.twinklePhase += s.twinkleSpeed;

        if (s.y < -10) s.y = height + 10;
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;

        const currentAlpha = Math.max(0.06, (Math.sin(s.twinklePhase) * 0.5 + 0.5) * s.alpha);

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 163, 173, ${currentAlpha})`;
        ctx.shadowColor = 'rgba(0, 194, 203, 0.4)';
        ctx.shadowBlur = 3;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Solutionreach delicate micro-grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#00A3AD_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-transparent to-white/70 pointer-events-none" />
    </div>
  );
};
