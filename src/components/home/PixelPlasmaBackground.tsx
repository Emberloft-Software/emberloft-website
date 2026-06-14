"use client";

import { useEffect, useRef } from "react";

interface PixelPlasmaBackgroundProps {
  background?: string;
  plasmaColor?: string;
  plasmaShadow?: string;
  pixelDensity?: number;
  pixelRoundness?: number;
  animationSpeed?: number;
  plasmaIntensity?: number;
  plasmaContrast?: number;
  waveFrequency?: number;
  waveAngle?: number;
  waveThickness?: number;
  className?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const v = hex.replace("#", "");
  const num = parseInt(v, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function roundRectPath(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  radius: number
) {
  if (radius <= 0) {
    ctx.rect(x, y, size, size);
    return;
  }
  const r = Math.min(radius, size / 2);
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + size, y, x + size, y + size, r);
  ctx.arcTo(x + size, y + size, x, y + size, r);
  ctx.arcTo(x, y + size, x, y, r);
  ctx.arcTo(x, y, x + size, y, r);
}

export default function PixelPlasmaBackground({
  background = "#0A0A0A",
  plasmaColor = "#0A0A0A",
  plasmaShadow = "#290052",
  pixelDensity = 74,
  pixelRoundness = 0.2,
  animationSpeed = 2,
  plasmaIntensity = 1.8,
  plasmaContrast = 1.6,
  waveFrequency = 1,
  waveAngle = 102,
  waveThickness = 0.7,
  className = "",
}: PixelPlasmaBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let raf = 0;

    const [pr, pg, pb] = hexToRgb(plasmaColor);
    const [sr, sg, sb] = hexToRgb(plasmaShadow);
    const angle = (waveAngle * Math.PI) / 180;
    const dirX = Math.cos(angle);
    const dirY = Math.sin(angle);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const render = (time: number) => {
      const t = (time / 1000) * animationSpeed;
      const size = width / pixelDensity;

      if (size > 0 && width > 0 && height > 0) {
        const cols = Math.ceil(width / size) + 1;
        const rows = Math.ceil(height / size) + 1;
        const pad = size * 0.12;
        const cellSize = Math.max(0, size - pad * 2);
        const radius = (cellSize / 2) * pixelRoundness;

        ctx.fillStyle = background;
        ctx.fillRect(0, 0, width, height);

        for (let j = 0; j < rows; j++) {
          const v = (j * size) / height;
          for (let i = 0; i < cols; i++) {
            const u = (i * size) / width;

            // Directional wave envelope
            const proj = u * dirX + v * dirY;
            const wave =
              (Math.sin(proj * waveFrequency * Math.PI * 2 + t) + 1) / 2;

            // Finer plasma noise texture
            const noise =
              (Math.sin(u * 6 + t * 0.6) +
                Math.sin(v * 6 - t * 0.4) +
                Math.sin((u + v) * 5 + t * 0.5) +
                Math.sin(Math.sqrt(u * u + v * v) * 8 - t * 0.7)) /
              4;
            const noiseNorm = (noise + 1) / 2;

            let value =
              wave * (0.4 + waveThickness * 0.6) +
              noiseNorm * (1 - waveThickness) * 0.6;

            value *= plasmaIntensity;
            value = Math.min(Math.max(value, 0), 1);
            value = Math.pow(value, plasmaContrast);

            if (value < 0.03) continue;

            const r = Math.round(pr + (sr - pr) * value);
            const g = Math.round(pg + (sg - pg) * value);
            const b = Math.round(pb + (sb - pb) * value);

            ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
            ctx.beginPath();
            roundRectPath(ctx, i * size + pad, j * size + pad, cellSize, radius);
            ctx.fill();
          }
        }
      }

      raf = requestAnimationFrame(render);
    };

    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [
    background,
    plasmaColor,
    plasmaShadow,
    pixelDensity,
    pixelRoundness,
    animationSpeed,
    plasmaIntensity,
    plasmaContrast,
    waveFrequency,
    waveAngle,
    waveThickness,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  );
}
