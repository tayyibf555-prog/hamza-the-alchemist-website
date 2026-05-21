#!/usr/bin/env node
/**
 * Convert the white-on-black logo PNG into a clean white-on-transparent
 * alpha-PNG. Any pixel below a luminance threshold becomes fully
 * transparent; the rest keeps its alpha proportional to its luminance.
 *
 * Output: /public/logo-clean.png — used by <TridentMark /> with
 * mask-mode: alpha for a perfectly clean cutout (no faint canvas edge).
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = resolve(__dirname, "../public/logo.png");
const OUT = resolve(__dirname, "../public/logo-clean.png");

// Pixels darker than this (per channel, 0–255) are clamped to fully transparent.
// 28 catches anti-aliased near-black edges while preserving genuine highlights.
const BLACK_THRESHOLD = 28;

async function main() {
  const img = sharp(SRC).ensureAlpha();
  const { data, info } = await img
    .raw()
    .toBuffer({ resolveWithObject: true });

  const { width, height, channels } = info;
  if (channels !== 4) {
    throw new Error(`Expected RGBA buffer, got ${channels} channels`);
  }

  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];

    // Use perceived luminance (Rec. 709) as the alpha source
    const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    if (luma <= BLACK_THRESHOLD) {
      // Anti-aliased canvas → fully transparent
      out[i] = 255;
      out[i + 1] = 255;
      out[i + 2] = 255;
      out[i + 3] = 0;
    } else {
      // Lift the rest to pure white, use the original luma as alpha
      // (this preserves anti-aliased edges of the trident shape itself)
      out[i] = 255;
      out[i + 1] = 255;
      out[i + 2] = 255;
      out[i + 3] = Math.round(Math.min(255, ((luma - BLACK_THRESHOLD) / (255 - BLACK_THRESHOLD)) * 255));
    }
  }

  await sharp(out, { raw: { width, height, channels: 4 } })
    .png({ compressionLevel: 9 })
    .toFile(OUT);

  const before = (await sharp(SRC).metadata()).size;
  const after = (await sharp(OUT).metadata()).size;
  console.log(`✔ ${OUT}`);
  console.log(`  ${width}×${height} · in ${before ?? "?"} → out ${after ?? "?"}`);
}

main().catch((err) => {
  console.error("clean-logo failed:", err);
  process.exit(1);
});
