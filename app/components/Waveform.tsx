"use client";

import { useEffect, useRef } from "react";

/**
 * Live oscilloscope waveform. Renders to a canvas in a thin horizontal
 * band; animates a slow gold pulse that drifts left-to-right.
 * Reads as a "frequency reading" beneath the hero — instrument-panel
 * texture without being literal.
 */
export function Waveform({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    let raf = 0;

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      // Baseline hairline
      ctx.strokeStyle = "oklch(0.28 0.008 75)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, h / 2);
      ctx.lineTo(w, h / 2);
      ctx.stroke();

      // Waveform — sum of two sines + small noise, mostly flat with occasional pulses
      const grad = ctx.createLinearGradient(0, 0, w, 0);
      grad.addColorStop(0, "oklch(0.62 0.14 70 / 0)");
      grad.addColorStop(0.2, "oklch(0.78 0.165 78 / 0.9)");
      grad.addColorStop(0.8, "oklch(0.78 0.165 78 / 0.9)");
      grad.addColorStop(1, "oklch(0.62 0.14 70 / 0)");

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.4;
      ctx.lineCap = "round";
      ctx.shadowColor = "oklch(0.78 0.165 78 / 0.5)";
      ctx.shadowBlur = 6;

      ctx.beginPath();
      const samples = Math.floor(w / 2);
      for (let i = 0; i <= samples; i++) {
        const x = (i / samples) * w;
        // Mostly low-amplitude sine, with a moving "pulse" peak
        const base = Math.sin(i * 0.06 + t * 0.6) * 2;
        const pulseCenter = (((t * 30) % (samples + 60)) - 30);
        const pulseDist = Math.abs(i - pulseCenter);
        const pulse = Math.exp(-(pulseDist * pulseDist) / 80) * 16;
        const wobble =
          Math.sin(i * 0.02 + t * 1.3) * 0.6 +
          Math.sin(i * 0.3 + t * 2.1) * 0.3;
        const y = h / 2 + base + wobble - pulse;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      t += 0.016;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={`block w-full h-[64px] ${className}`}
    />
  );
}
