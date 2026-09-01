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

    // Ribbon wave parameters for golden flowing ribbons
    const ribbons = [
      {
        yOffset: 0.22,
        amplitude: 65,
        wavelength: 0.0018,
        speed: 0.0008,
        thickness: 45,
        opacity: 0.45,
        goldShade: ['rgba(255, 215, 0, 0.4)', 'rgba(218, 165, 32, 0.25)', 'rgba(255, 248, 220, 0.5)']
      },
      {
        yOffset: 0.38,
        amplitude: 85,
        wavelength: 0.0014,
        speed: -0.0006,
        thickness: 60,
        opacity: 0.35,
        goldShade: ['rgba(234, 179, 8, 0.35)', 'rgba(202, 138, 4, 0.2)', 'rgba(254, 240, 138, 0.4)']
      },
      {
        yOffset: 0.58,
        amplitude: 95,
        wavelength: 0.0011,
        speed: 0.0007,
        thickness: 75,
        opacity: 0.4,
        goldShade: ['rgba(251, 191, 36, 0.35)', 'rgba(180, 83, 9, 0.25)', 'rgba(253, 230, 138, 0.5)']
      },
      {
        yOffset: 0.78,
        amplitude: 70,
        wavelength: 0.0016,
        speed: -0.0009,
        thickness: 50,
        opacity: 0.3,
        goldShade: ['rgba(245, 158, 11, 0.3)', 'rgba(146, 64, 14, 0.15)', 'rgba(254, 243, 199, 0.4)']
      }
    ];

    // Floating golden particle sparkles
    const sparkles = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.2 + 0.6,
      alpha: Math.random() * 0.7 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -Math.random() * 0.4 - 0.1,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2
    }));

    let time = 0;

    const render = () => {
      time += 1;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle background ambient gold & deep slate gradient
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        50,
        width * 0.5,
        height * 0.5,
        width * 0.85
      );
      bgGrad.addColorStop(0, 'rgba(15, 23, 42, 0.98)');
      bgGrad.addColorStop(0.5, 'rgba(10, 15, 30, 0.99)');
      bgGrad.addColorStop(1, 'rgba(3, 7, 18, 1)');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render each flowing golden ribbon
      ribbons.forEach((ribbon, idx) => {
        const baseY = height * ribbon.yOffset;
        const currentPhase = time * ribbon.speed;

        ctx.save();
        ctx.beginPath();

        // Top curve
        ctx.moveTo(0, baseY + Math.sin(currentPhase) * ribbon.amplitude);

        const step = 20;
        for (let x = 0; x <= width + step; x += step) {
          const wave1 = Math.sin(x * ribbon.wavelength + currentPhase) * ribbon.amplitude;
          const wave2 = Math.cos(x * ribbon.wavelength * 0.5 - currentPhase * 0.8) * (ribbon.amplitude * 0.35);
          const y = baseY + wave1 + wave2;
          ctx.lineTo(x, y);
        }

        // Bottom curve (create thickness)
        for (let x = width + step; x >= 0; x -= step) {
          const wave1 = Math.sin(x * ribbon.wavelength + currentPhase + 0.4) * ribbon.amplitude;
          const wave2 = Math.cos(x * ribbon.wavelength * 0.5 - currentPhase * 0.8) * (ribbon.amplitude * 0.35);
          const y = baseY + wave1 + wave2 + ribbon.thickness + Math.sin(x * 0.002 + currentPhase) * 15;
          ctx.lineTo(x, y);
        }

        ctx.closePath();

        // Create metallic golden linear gradient along the ribbon
        const ribbonGrad = ctx.createLinearGradient(0, baseY - ribbon.amplitude, width, baseY + ribbon.amplitude + ribbon.thickness);
        ribbonGrad.addColorStop(0, ribbon.goldShade[0]);
        ribbonGrad.addColorStop(0.25, ribbon.goldShade[1]);
        ribbonGrad.addColorStop(0.5, ribbon.goldShade[2]);
        ribbonGrad.addColorStop(0.75, ribbon.goldShade[0]);
        ribbonGrad.addColorStop(1, ribbon.goldShade[1]);

        ctx.fillStyle = ribbonGrad;
        ctx.fill();

        // Golden glowing edge highlight line
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = 'rgba(255, 243, 199, 0.45)';
        ctx.stroke();

        ctx.restore();
      });

      // Render floating golden sparkle motes
      sparkles.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.twinklePhase += s.twinkleSpeed;

        if (s.y < -10) s.y = height + 10;
        if (s.x < -10) s.x = width + 10;
        if (s.x > width + 10) s.x = -10;

        const currentAlpha = Math.max(0.1, (Math.sin(s.twinklePhase) * 0.5 + 0.5) * s.alpha);

        ctx.save();
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253, 224, 71, ${currentAlpha})`;
        ctx.shadowColor = 'rgba(234, 179, 8, 0.8)';
        ctx.shadowBlur = 8;
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
        style={{ filter: 'contrast(105%)' }}
      />
      {/* Subtle fine geometric grid overlay for high-polish enterprise aesthetic */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#fbbf24_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />
      {/* Soft vignette */}
      <div className="absolute inset-0 bg-radial-vignette opacity-40 pointer-events-none" />
    </div>
  );
};
