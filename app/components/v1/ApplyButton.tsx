"use client";

type Props = {
  href: string;
  size?: "default" | "large";
  /** Full width on mobile (the default) or auto everywhere. */
  block?: boolean;
  className?: string;
  children?: React.ReactNode;
};

/**
 * The page's single learned object. The label never changes so repetition
 * reads as insistence rather than a loop; only the microcopy beneath it
 * varies by placement.
 */
export function ApplyButton({
  href,
  size = "default",
  block = true,
  className = "",
  children = "Apply For A Free Private Consultation",
}: Props) {
  const sizing =
    size === "large"
      ? "h-[62px] px-10 text-[13px]"
      : "h-[56px] px-8 text-[12px]";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative inline-flex items-center justify-center gap-3 ${sizing} ${
        block ? "w-full sm:w-auto" : ""
      } eyebrow rounded-[12px] text-[var(--color-ink-deep)] overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background:
          "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)",
        boxShadow:
          "0 0 0 1px oklch(0.62 0.14 70 / 0.4), 0 18px 48px -12px oklch(0.78 0.165 78 / 0.55)",
        transitionTimingFunction: "var(--ease-out-expo)",
      }}
    >
      <span className="relative z-10 font-semibold tracking-[0.18em] text-center">
        {children}
      </span>
      <span
        aria-hidden
        className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1"
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
        →
      </span>
      <span
        aria-hidden
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(180deg, var(--color-gold-deep) 0%, var(--color-gold) 100%)",
        }}
      />
    </a>
  );
}
