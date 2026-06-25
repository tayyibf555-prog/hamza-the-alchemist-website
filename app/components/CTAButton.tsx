"use client";

import type { ReactNode } from "react";
import { TYPEFORM_URL } from "../lib/links";

type Props = {
  children: ReactNode;
  href?: string;
  size?: "default" | "large";
  variant?: "filled" | "ghost";
  className?: string;
};

export function CTAButton({
  children,
  href = TYPEFORM_URL,
  size = "default",
  variant = "filled",
  className = "",
}: Props) {
  const sizing =
    size === "large"
      ? "h-[64px] px-9 text-[15px]"
      : "h-[52px] px-7 text-[13px]";

  if (variant === "ghost") {
    return (
      <a
        href={href}
        className={`group eyebrow inline-flex items-center gap-3 text-[var(--color-gold)] hover:text-[var(--color-gold-soft)] transition-colors duration-200 ${className}`}
      >
        <span>{children}</span>
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
        >
          ↗
        </span>
      </a>
    );
  }

  return (
    <a
      href={href}
      className={`group relative inline-flex items-center gap-3 ${sizing} eyebrow rounded-[3px] text-[var(--color-ink-deep)] overflow-hidden transition-all duration-300 ${className}`}
      style={{
        background:
          "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)",
        boxShadow:
          "0 0 0 1px oklch(0.62 0.14 70 / 0.4), 0 12px 32px -12px oklch(0.78 0.165 78 / 0.5)",
        transitionTimingFunction: "var(--ease-out-expo)",
      }}
    >
      <span className="relative z-10 font-semibold">{children}</span>
      <span
        aria-hidden
        className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1"
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
        →
      </span>
      {/* Hover bloom */}
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
