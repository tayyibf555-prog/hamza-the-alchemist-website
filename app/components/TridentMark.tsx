type Props = {
  className?: string;
  /** Adds a soft gold drop-shadow halo around the mark. */
  glow?: boolean;
  /** Override the fill color (defaults to ivory) — accepts any CSS color. */
  color?: string;
};

/**
 * The Alchemist mark.
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
}: Props) {
  return (
    <span
      role="img"
      aria-label="The Alchemist mark"
      className={`inline-block ${className}`}
      style={{
        backgroundColor: color,
        maskImage: "url(/logo-clean.png)",
        WebkitMaskImage: "url(/logo-clean.png)",
        maskMode: "alpha",
        WebkitMaskSourceType: "alpha",
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
