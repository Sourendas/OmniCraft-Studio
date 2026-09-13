import React, { useEffect, useRef } from 'react';

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface ProjectedPoint {
  x: number;
  y: number;
  scale: number;
  z: number;
}

interface RibbonSegment {
  left: ProjectedPoint;
  right: ProjectedPoint;
  center: ProjectedPoint;
  lightIntensity: number;
  specular: number;
  depth: number;
  width: number;
}

export const GoldenRibbonsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetRotX = 0;
    let targetRotY = 0;
    let curRotX = 0;
    let curRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      targetRotY = ((mouseX / width) - 0.5) * 0.35;
      targetRotX = -((mouseY / height) - 0.5) * 0.25;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    const ribbons = [
      {
        id: 'ribbon-primary-citrus',
        segmentsCount: 95,
        baseY: -height * 0.18,
        startX: -width * 0.65,
        endX: width * 0.75,
        depthOffset: 40,
        widthBase: 48,
        speedX: 0.00065,
        speedY: 0.0009,
        speedZ: 0.0008,
        speedTwist: 0.0011,
        ampY1: 90,
        ampY2: 45,
        ampZ1: 160,
        ampZ2: 90,
        twistFreq: 2.2,
        twistAmp: 1.8,
        primaryColor: [234, 88, 12],
        secondaryColor: [249, 115, 22],
        edgeColor: [194, 65, 12],
        specularColor: [255, 237, 213],
        alphaBase: 0.22,
        sheenMultiplier: 1.4
      },
      {
        id: 'ribbon-violet-spiral',
        segmentsCount: 90,
        baseY: height * 0.08,
        startX: -width * 0.7,
        endX: width * 0.7,
        depthOffset: -60,
        widthBase: 56,
        speedX: -0.0005,
        speedY: 0.00075,
        speedZ: 0.00065,
        speedTwist: -0.00095,
        ampY1: 110,
        ampY2: 50,
        ampZ1: 190,
        ampZ2: 110,
        twistFreq: 2.8,
        twistAmp: 2.3,
        primaryColor: [124, 58, 237],
        secondaryColor: [234, 88, 12],
        edgeColor: [91, 33, 182],
        specularColor: [237, 233, 254],
        alphaBase: 0.18,
        sheenMultiplier: 1.2
      },
      {
        id: 'ribbon-golden-crest',
        segmentsCount: 85,
        baseY: height * 0.28,
        startX: -width * 0.6,
        endX: width * 0.68,
        depthOffset: 90,
        widthBase: 34,
        speedX: 0.0008,
        speedY: 0.0012,
        speedZ: 0.00095,
        speedTwist: 0.0014,
        ampY1: 75,
        ampY2: 38,
        ampZ1: 130,
        ampZ2: 70,
        twistFreq: 3.2,
        twistAmp: 2.6,
        primaryColor: [250, 100, 0],
        secondaryColor: [249, 115, 22],
        edgeColor: [215, 80, 0],
        specularColor: [255, 235, 200],
        alphaBase: 0.16,
        sheenMultiplier: 1.8
      },
      {
        id: 'ribbon-deep-wave',
        segmentsCount: 80,
        baseY: height * 0.38,
        startX: -width * 0.65,
        endX: width * 0.65,
        depthOffset: -120,
        widthBase: 42,
        speedX: -0.00045,
        speedY: 0.0006,
        speedZ: 0.0005,
        speedTwist: 0.0008,
        ampY1: 65,
        ampY2: 30,
        ampZ1: 140,
        ampZ2: 60,
        twistFreq: 1.9,
        twistAmp: 1.6,
        primaryColor: [194, 65, 12],
        secondaryColor: [124, 58, 237],
        edgeColor: [154, 52, 18],
        specularColor: [255, 237, 213],
        alphaBase: 0.14,
        sheenMultiplier: 1.1
      }
    ];

    const particles = Array.from({ length: 32 }, () => ({
      x: (Math.random() - 0.5) * width * 1.4,
      y: (Math.random() - 0.5) * height * 1.4,
      z: (Math.random() - 0.5) * 600,
      radius: Math.random() * 2.2 + 0.8,
      alpha: Math.random() * 0.4 + 0.15,
      vx: (Math.random() - 0.5) * 0.35,
      vy: -Math.random() * 0.4 - 0.1,
      vz: (Math.random() - 0.5) * 0.3,
      twinkleSpeed: Math.random() * 0.025 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.3 ? [234, 88, 12] : [124, 58, 237]
    }));

    const FOV = 650;
    const CAMERA_Z = 750;
    const LIGHT_DIR = { x: 0.45, y: -0.75, z: 0.48 };
    const lightLength = Math.sqrt(LIGHT_DIR.x * LIGHT_DIR.x + LIGHT_DIR.y * LIGHT_DIR.y + LIGHT_DIR.z * LIGHT_DIR.z);
    LIGHT_DIR.x /= lightLength;
    LIGHT_DIR.y /= lightLength;
    LIGHT_DIR.z /= lightLength;

    let time = 0;

    const project3D = (p: Point3D, rotX: number, rotY: number): ProjectedPoint => {
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const x1 = p.x * cosY + p.z * sinY;
      const z1 = -p.x * sinY + p.z * cosY;
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = p.y * cosX - z1 * sinX;
      const z2 = p.y * sinX + z1 * cosX;
      const finalZ = z2 + CAMERA_Z;
      const scale = FOV / Math.max(10, finalZ);
      return { x: width / 2 + x1 * scale, y: height / 2 + y2 * scale, scale, z: z2 };
    };

    const render = () => {
      time += 1;
      curRotX += (targetRotX - curRotX) * 0.04;
      curRotY += (targetRotY - curRotY) * 0.04;
      const sceneRotX = curRotX + Math.sin(time * 0.0006) * 0.04;
      const sceneRotY = curRotY + Math.cos(time * 0.0005) * 0.06;
      ctx.clearRect(0, 0, width, height);

      const bgGrad = ctx.createLinearGradient(0, 0, width, height);
      bgGrad.addColorStop(0, '#FFFFFF');
      bgGrad.addColorStop(0.35, '#FFF8F1');
      bgGrad.addColorStop(0.7, '#FFF4E8');
      bgGrad.addColorStop(1, '#FFEDD5');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const glowOrb1 = ctx.createRadialGradient(
        width * 0.2 + Math.sin(time * 0.001) * 40,
        height * 0.25 + Math.cos(time * 0.0012) * 30,
        20, width * 0.2, height * 0.25, width * 0.45
      );
      glowOrb1.addColorStop(0, 'rgba(234, 88, 12, 0.11)');
      glowOrb1.addColorStop(0.55, 'rgba(255, 237, 213, 0.04)');
      glowOrb1.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glowOrb1;
      ctx.fillRect(0, 0, width, height);

      const glowOrb2 = ctx.createRadialGradient(
        width * 0.8 - Math.cos(time * 0.0009) * 50,
        height * 0.7 + Math.sin(time * 0.0011) * 40,
        30, width * 0.8, height * 0.7, width * 0.5
      );
      glowOrb2.addColorStop(0, 'rgba(124, 58, 237, 0.08)');
      glowOrb2.addColorStop(0.5, 'rgba(250, 100, 0, 0.03)');
      glowOrb2.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glowOrb2;
      ctx.fillRect(0, 0, width, height);

      ribbons.forEach((ribbon) => {
        const segments: RibbonSegment[] = [];
        const count = ribbon.segmentsCount;
        for (let i = 0; i <= count; i++) {
          const u = i / count;
          const x = ribbon.startX + u * (ribbon.endX - ribbon.startX);
          const waveY1 = Math.sin(u * Math.PI * 2.4 + time * ribbon.speedY) * ribbon.ampY1;
          const waveY2 = Math.cos(u * Math.PI * 4.2 - time * ribbon.speedY * 1.3) * ribbon.ampY2;
          const y = ribbon.baseY + waveY1 + waveY2;
          const waveZ1 = Math.sin(u * Math.PI * 2.0 + time * ribbon.speedZ) * ribbon.ampZ1;
          const waveZ2 = Math.cos(u * Math.PI * 3.6 + time * ribbon.speedZ * 1.4) * ribbon.ampZ2;
          const z = ribbon.depthOffset + waveZ1 + waveZ2;
          const twistAngle =
            Math.sin(u * Math.PI * ribbon.twistFreq + time * ribbon.speedTwist) * ribbon.twistAmp +
            Math.cos(u * Math.PI * 1.2 + time * ribbon.speedTwist * 0.8) * 0.6;
          const taper = Math.sin(u * Math.PI);
          const currentWidth = ribbon.widthBase * Math.pow(taper, 0.45);
          const nx = Math.sin(twistAngle);
          const ny = Math.cos(twistAngle);
          const nz = Math.sin(twistAngle * 0.5) * 0.6;
          const halfW = currentWidth / 2;
          const left3D: Point3D = { x: x - nx * halfW, y: y - ny * halfW, z: z - nz * halfW };
          const right3D: Point3D = { x: x + nx * halfW, y: y + ny * halfW, z: z + nz * halfW };
          const center3D: Point3D = { x, y, z };
          const leftProj = project3D(left3D, sceneRotX, sceneRotY);
          const rightProj = project3D(right3D, sceneRotX, sceneRotY);
          const centerProj = project3D(center3D, sceneRotX, sceneRotY);
          const normX = -ny;
          const normY = nx;
          const normZ = Math.cos(twistAngle);
          const dotLight = normX * LIGHT_DIR.x + normY * LIGHT_DIR.y + normZ * LIGHT_DIR.z;
          const lightIntensity = Math.max(0.1, Math.min(1.0, (dotLight + 1) * 0.5));
          const specular = Math.pow(Math.max(0, dotLight), 8) * ribbon.sheenMultiplier;
          segments.push({ left: leftProj, right: rightProj, center: centerProj, lightIntensity, specular, depth: centerProj.z, width: currentWidth * centerProj.scale });
        }

        for (let i = 0; i < segments.length - 1; i++) {
          const s0 = segments[i];
          const s1 = segments[i + 1];
          const avgLight = (s0.lightIntensity + s1.lightIntensity) * 0.5;
          const avgSpec = (s0.specular + s1.specular) * 0.5;
          const depthAlpha = Math.max(0.04, Math.min(0.4, ribbon.alphaBase * (1 + ((s0.depth + s1.depth) * 0.5) / 800)));
          const uRatio = i / segments.length;
          const r = Math.round(ribbon.primaryColor[0] * (1 - uRatio) + ribbon.secondaryColor[0] * uRatio + avgSpec * 50);
          const g = Math.round(ribbon.primaryColor[1] * (1 - uRatio) + ribbon.secondaryColor[1] * uRatio + avgSpec * 60);
          const b = Math.round(ribbon.primaryColor[2] * (1 - uRatio) + ribbon.secondaryColor[2] * uRatio + avgSpec * 60);
          ctx.save();
          ctx.beginPath();
          ctx.moveTo(s0.left.x, s0.left.y);
          ctx.lineTo(s1.left.x, s1.left.y);
          ctx.lineTo(s1.right.x, s1.right.y);
          ctx.lineTo(s0.right.x, s0.right.y);
          ctx.closePath();
          const quadGrad = ctx.createLinearGradient(s0.left.x, s0.left.y, s0.right.x, s0.right.y);
          const clampedR = Math.min(255, Math.max(0, r));
          const clampedG = Math.min(255, Math.max(0, g));
          const clampedB = Math.min(255, Math.max(0, b));
          quadGrad.addColorStop(0, `rgba(${clampedR}, ${clampedG}, ${clampedB}, ${depthAlpha * avgLight * 0.85})`);
          quadGrad.addColorStop(0.5, `rgba(${clampedR + 20}, ${clampedG + 20}, ${clampedB + 20}, ${depthAlpha * (avgLight + avgSpec * 0.6)})`);
          quadGrad.addColorStop(1, `rgba(${clampedR}, ${clampedG}, ${clampedB}, ${depthAlpha * avgLight * 0.75})`);
          ctx.fillStyle = quadGrad;
          ctx.fill();
          ctx.restore();
        }

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(segments[0].left.x, segments[0].left.y);
        for (let i = 1; i < segments.length; i++) ctx.lineTo(segments[i].left.x, segments[i].left.y);
        ctx.strokeStyle = `rgba(${ribbon.edgeColor.join(',')}, ${ribbon.alphaBase * 1.6})`;
        ctx.lineWidth = 1.3;
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(segments[0].right.x, segments[0].right.y);
        for (let i = 1; i < segments.length; i++) ctx.lineTo(segments[i].right.x, segments[i].right.y);
        ctx.strokeStyle = `rgba(${ribbon.edgeColor.join(',')}, ${ribbon.alphaBase * 1.3})`;
        ctx.lineWidth = 1.0;
        ctx.stroke();
        ctx.restore();

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(segments[0].center.x, segments[0].center.y);
        for (let i = 1; i < segments.length; i++) ctx.lineTo(segments[i].center.x, segments[i].center.y);
        ctx.strokeStyle = `rgba(${ribbon.specularColor.join(',')}, ${ribbon.alphaBase * 1.8})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.restore();
      });

      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy; p.z += p.vz; p.twinklePhase += p.twinkleSpeed;
        if (p.y < -height * 0.7) p.y = height * 0.7;
        if (p.y > height * 0.7) p.y = -height * 0.7;
        if (p.x < -width * 0.7) p.x = width * 0.7;
        if (p.x > width * 0.7) p.x = -width * 0.7;
        if (p.z < -300) p.z = 300;
        if (p.z > 300) p.z = -300;
        const proj = project3D(p, sceneRotX, sceneRotY);
        const twinkle = Math.sin(p.twinklePhase) * 0.5 + 0.5;
        const alpha = Math.max(0.04, Math.min(0.5, p.alpha * twinkle * proj.scale));
        const currentRadius = Math.max(0.5, p.radius * proj.scale);
        ctx.save();
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color.join(',')}, ${alpha})`;
        ctx.shadowColor = `rgba(${p.color.join(',')}, 0.6)`;
        ctx.shadowBlur = 4 * proj.scale;
        ctx.fill();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#EA580C_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/60 pointer-events-none" />
    </div>
  );
};
