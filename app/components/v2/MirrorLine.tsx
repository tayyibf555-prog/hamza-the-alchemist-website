"use client";

/**
 * THE MIRROR LINE — the signature device of concept /v2.
 *
 * A 1px gold hairline with the same block of type reflected beneath it,
 * dimmed and dissolving. Above the line is what the operator shows the
 * market; below it is what is actually running. The reflection carries
 * DIFFERENT words, so the eye reads it as a reflection first and as a
 * second sentence half a second later.
 *
 * Below 480px the flip is dropped for legibility: the private line
 * renders upright in gold italic, so the meaning survives even when the
 * optics do not.
 */
export function MirrorLine({
  above,
  below,
  size = "default",
  align = "center",
  as: Heading = "div",
}: {
  above: React.ReactNode;
  below: string;
  size?: "default" | "large" | "small";
  align?: "center" | "left";
  /** Render the shown line as a real heading where it is one. */
  as?: "div" | "h1" | "h2" | "h3";
}) {
  const aboveSize =
    size === "large"
      ? "text-[clamp(34px,6vw,78px)]"
      : size === "small"
      ? "text-[clamp(19px,2.2vw,26px)]"
      : "text-[clamp(24px,3.4vw,44px)]";

  const belowSize =
    size === "large"
      ? "text-[clamp(17px,2.2vw,28px)]"
      : size === "small"
      ? "text-[clamp(15px,1.6vw,18px)]"
      : "text-[clamp(16px,1.9vw,22px)]";

  const alignCls = align === "left" ? "text-left" : "text-center";

  return (
    <div className={alignCls}>
      {/* What he shows the market */}
      <Heading
        className={`font-display font-extrabold leading-[1.02] tracking-[-0.03em] ${aboveSize} text-[var(--color-ivory)]`}
      >
        {above}
      </Heading>

      {/* The line itself */}
      <div
        aria-hidden
        className="my-6 h-px w-full"
        style={{ background: "oklch(0.78 0.165 78 / 0.55)" }}
      />

      {/* What is actually running.
          Desktop/tablet: reflected. Mobile: upright for legibility. */}
      <p
        className={`hidden sm:block accent text-[var(--color-gold)] ${belowSize} leading-[1.15]`}
        style={{
          transform: "scaleY(-1)",
          opacity: 0.2,
          filter: "blur(0.35px)",
          WebkitMaskImage:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 68%)",
          maskImage:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 68%)",
        }}
      >
        {below}
      </p>

      <p
        className={`sm:hidden accent text-[var(--color-gold)] ${belowSize} leading-[1.3]`}
        style={{ opacity: 0.6 }}
      >
        {below}
      </p>
    </div>
  );
}
