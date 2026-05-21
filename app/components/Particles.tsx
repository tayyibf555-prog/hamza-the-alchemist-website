"use client";

import { useEffect, useMemo, useState } from "react";

type Particle = {
  left: string;
  size: string;
  duration: string;
  delay: string;
  opacity: string;
  sway: string;
};

function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function makeParticles(count: number): Particle[] {
  return Array.from({ length: count }).map((_, i) => ({
    left: (rand(i + 1) * 100).toFixed(2),
    size: (1 + rand(i + 7) * 2.2).toFixed(2),
    duration: (12 + rand(i + 13) * 10).toFixed(2),
    delay: (rand(i + 23) * 14).toFixed(2),
    opacity: (0.08 + rand(i + 31) * 0.14).toFixed(3),
    sway: ((rand(i + 41) - 0.5) * 60).toFixed(2),
  }));
}

export function Particles({ count = 36 }: { count?: number }) {
  // Render only on the client to avoid any SSR/CSR style serialization drift.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const particles = useMemo(() => makeParticles(count), [count]);

  if (!mounted) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <span
          key={i}
          className="particle absolute bottom-[-20px] rounded-full"
          style={
            {
              left: `${p.left}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: "var(--color-gold-soft)",
              "--p-duration": `${p.duration}s`,
              "--p-delay": `${p.delay}s`,
              "--p-opacity": p.opacity,
              "--p-sway": `${p.sway}px`,
              boxShadow: "0 0 6px oklch(0.85 0.12 85 / 0.4)",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
