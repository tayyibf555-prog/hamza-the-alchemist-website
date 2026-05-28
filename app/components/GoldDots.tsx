"use client";

import { useEffect, useState } from "react";

type Dot = {
  left: string;
  delay: string;
  duration: string;
  size: string;
  opacity: number;
  sway: string;
};

/** Deterministic pseudo-random — SSR/CSR-safe so the dots don't reshuffle on hydration. */
function rand(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function makeDots(count: number): Dot[] {
  return Array.from({ length: count }).map((_, i) => ({
    left: `${(rand(i + 1) * 100).toFixed(2)}%`,
    delay: `${(rand(i + 7) * 22).toFixed(2)}s`,
    duration: `${(20 + rand(i + 13) * 18).toFixed(2)}s`,
    size: `${(1.5 + rand(i + 19) * 1.8).toFixed(2)}px`,
    opacity: 0.35 + rand(i + 23) * 0.4,
    sway: `${((rand(i + 31) - 0.5) * 80).toFixed(2)}px`,
  }));
}

/**
 * Subtle moving features over the page background.
 *
 * Renders {count} small gold dots fixed across the viewport. Each
 * dot drifts upward over 20–38s with a small horizontal sway,
 * deterministically positioned so SSR and client match (no hydration
 * mismatch). prefers-reduced-motion hides them entirely.
 */
export function GoldDots({ count = 32 }: { count?: number }) {
  // Mount-gated so the very first paint doesn't render the dots — avoids
  // any FOUC where motion starts mid-frame.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const dots = makeDots(count);

  return (
    <div className="gold-dots" aria-hidden="true">
      {dots.map((d, i) => (
        <span
          key={i}
          className="gold-dot"
          style={
            {
              left: d.left,
              width: d.size,
              height: d.size,
              opacity: d.opacity,
              animationDelay: d.delay,
              animationDuration: d.duration,
              "--dot-opacity": d.opacity,
              "--dot-sway": d.sway,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
