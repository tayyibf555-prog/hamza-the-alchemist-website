"use client";

import { useEffect, useState } from "react";

/**
 * Film-grain overlay. Generates a small noise tile once at mount,
 * tiles it across the viewport, and animates its position to create
 * a continuous shimmer — like grain on a film cell.
 *
 * Cheap to run: one paint, then pure CSS animation.
 * Honors prefers-reduced-motion.
 */
export function Grain() {
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    // Generate the noise tile once.
    const TILE = 256;
    const canvas = document.createElement("canvas");
    canvas.width = TILE;
    canvas.height = TILE;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = ctx.createImageData(TILE, TILE);
    const data = img.data;
    for (let i = 0; i < data.length; i += 4) {
      // Bias toward mid-grey with sparse highlights — film grain, not white noise
      const n = Math.random();
      const v = Math.floor(120 + (n - 0.5) * 240);
      const c = v < 0 ? 0 : v > 255 ? 255 : v;
      data[i] = c;                       // R
      data[i + 1] = Math.floor(c * 0.95); // G — slight warm cast
      data[i + 2] = Math.floor(c * 0.82); // B — more warm cast for gold integration
      data[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    setSrc(canvas.toDataURL("image/png"));
  }, []);

  if (!src) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] grain-shimmer"
      style={{
        backgroundImage: `url(${src})`,
        backgroundRepeat: "repeat",
        backgroundSize: "256px 256px",
        mixBlendMode: "overlay",
        opacity: 0.16,
      }}
    />
  );
}
