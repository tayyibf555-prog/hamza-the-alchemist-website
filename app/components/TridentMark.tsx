type Props = {
  className?: string;
  /** Adds a soft gold drop-shadow halo around the mark. */
  glow?: boolean;
  /** Override the fill color (defaults to ivory) — accepts any CSS color. */
  color?: string;
  /**
   * Which mark to draw.
   *
   * "lion" is the full identity — half lion, half trident glyph. Its mane is
   * built from ~40 hairlines, which merge into an unreadable smear below
   * roughly 100px, so it is only for large placements.
   *
   * "lionIcon" is the same mark reduced to a handful of bold strokes so it
   * survives nav and favicon sizes. Use it anywhere under ~100px.
   *
   * "trident" is the original bare glyph, kept for continuity.
   */
  variant?: "trident" | "lion" | "lionIcon";
};

const SRC: Record<NonNullable<Props["variant"]>, string> = {
  trident: "/logo-clean.png",
  lion: "/lion-mark.png",
  lionIcon: "/lion-mark-icon.png",
};

/**
 * The Lion Alchemist mark.
 *
 * Backed by /public/logo-clean.png — a programmatically-cleaned variant of
 * the source artwork where the near-black canvas has been pushed to fully
 * transparent (see scripts/clean-logo.mjs). With alpha already baked into
 * the asset, we mask via `mask-mode: alpha` for a perfectly clean cutout
 * with no faint outline around the shape.
 *
 * The visible color comes from `background-color` — masks shape it.
 */
export function TridentMark({
  className = "",
  glow = false,
  color = "var(--color-ivory)",
  variant = "trident",
}: Props) {
  const src = SRC[variant];

  return (
    <span
      role="img"
      aria-label="The Lion Alchemist mark"
      className={`inline-block ${className}`}
      style={{
        backgroundColor: color,
        maskImage: `url(${src})`,
        WebkitMaskImage: `url(${src})`,
        // Mask source has alpha baked in (see scripts/clean-logo.mjs).
        // mask-mode: alpha is the default for raster images with alpha,
        // so no explicit mode declaration is needed — also avoids
        // -webkit-mask-source-type which isn't in React's CSSProperties.
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
        filter: glow
          ? "drop-shadow(0 0 24px oklch(0.78 0.165 78 / 0.55)) drop-shadow(0 0 48px oklch(0.78 0.165 78 / 0.25))"
          : undefined,
      }}
    />
  );
}
