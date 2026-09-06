import React, { useEffect, useRef } from 'react';

interface SakuraPetalsProps {
  mousePos: { x: number; y: number };
  scrollVelocity: number;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
  swing: number;
  swingSpeed: number;
  opacity: number;
  color: string;
}

export const SakuraPetals: React.FC<SakuraPetalsProps> = ({ mousePos, scrollVelocity }) => {
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

    // Color palette for cherry blossom petals
    const petalColors = [
      'rgba(255, 192, 203, 0.7)',
      'rgba(255, 182, 193, 0.65)',
      'rgba(255, 218, 224, 0.55)',
      'rgba(255, 240, 245, 0.5)',
      'rgba(244, 114, 182, 0.45)'
    ];

    const petalCount = 38;
    const petals: Petal[] = [];

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: 5 + Math.random() * 8,
        speedX: 0.6 + Math.random() * 1.2,
        speedY: 0.8 + Math.random() * 1.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        swing: Math.random() * Math.PI * 2,
        swingSpeed: 0.02 + Math.random() * 0.03,
        opacity: 0.35 + Math.random() * 0.5,
        color: petalColors[Math.floor(Math.random() * petalColors.length)]
      });
    }

    const drawPetal = (petal: Petal) => {
      ctx.save();
      ctx.translate(petal.x, petal.y);
      ctx.rotate(petal.rotation);
      ctx.scale(1, Math.cos(petal.swing));

      ctx.beginPath();
      // Organic petal shape: heart-like curved petal
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(
        -petal.size * 0.6,
        -petal.size * 0.8,
        -petal.size * 0.4,
        -petal.size * 1.6,
        0,
        -petal.size * 1.8
      );
      ctx.bezierCurveTo(
        petal.size * 0.4,
        -petal.size * 1.6,
        petal.size * 0.6,
        -petal.size * 0.8,
        0,
        0
      );

      ctx.fillStyle = petal.color;
      ctx.shadowColor = 'rgba(255, 182, 193, 0.4)';
      ctx.shadowBlur = 4;
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Mouse influence on horizontal wind
      const mouseWind = mousePos.x * 1.2;
      // Scroll velocity influence on vertical wind
      const scrollWind = Math.min(6, Math.max(-6, scrollVelocity * 0.05));

      for (let i = 0; i < petals.length; i++) {
        const p = petals[i];
        p.swing += p.swingSpeed;
        p.rotation += p.rotationSpeed;

        p.x += p.speedX + Math.sin(p.swing) * 0.8 + mouseWind;
        p.y += p.speedY + scrollWind;

        // Wrap around boundaries
        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        } else if (p.y < -30) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        if (p.x > width + 20) {
          p.x = -20;
        } else if (p.x < -20) {
          p.x = width + 10;
        }

        drawPetal(p);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [mousePos, scrollVelocity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-15 select-none"
      style={{ opacity: 0.85 }}
    />
  );
};
