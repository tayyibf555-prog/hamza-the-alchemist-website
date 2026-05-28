"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { PlaceholderArt } from "./PlaceholderArt";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export type Step = {
  index: string;
  meta: string;
  title: string;
  copy: string;
  /** Path inside /public, e.g. "/steps/01.png". Empty string renders the placeholder. */
  image: string;
  imageAlt: string;
  /** CSS aspect-ratio for the image box, e.g. "1496 / 1051", "3 / 2", "16 / 9". */
  imageAspect?: string;
  /** Label next to the confirmation checkbox below the image. */
  confirmLabel: string;
};

const STORAGE_KEY = "thankyou:step-confirmations";

/**
 * Stacked, full-width step blocks for the /thank-you page.
 *
 * Each step is its own block (numeral + meta row, title, copy, big
 * screenshot with gold bloom, confirmation checkbox). The checkbox state
 * persists in localStorage so a refresh remembers which steps are done.
 */
export function ThankYouSteps({ steps }: { steps: Step[] }) {
  const reduced = useReducedMotion();
  const [done, setDone] = useState<Record<string, boolean>>({});
  const [hydrated, setHydrated] = useState(false);

  // Load persisted confirmations after mount (avoids SSR/CSR mismatch)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw));
    } catch {
      // localStorage unavailable, fine
    }
    setHydrated(true);
  }, []);

  const toggle = (key: string) => {
    setDone((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <section className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <Reveal as="p" className="eyebrow text-[var(--color-ivory-faint)] mb-4">
          Two Steps
        </Reveal>
        <Reveal>
          <h2 className="font-display font-extrabold text-balance leading-[1.02] tracking-[-0.025em] text-[clamp(32px,4.6vw,62px)] text-[var(--color-ivory)] max-w-[14ch]">
            Before we{" "}
            <span className="accent text-[var(--color-gold)]">speak.</span>
          </h2>
        </Reveal>

        <div className="mt-16 lg:mt-20 flex flex-col gap-10 lg:gap-14">
          {steps.map((s, i) => (
            <Reveal key={s.index} delay={0.1 + i * 0.1}>
              <article
                className="relative p-8 md:p-12 lg:p-14 rounded-[8px]"
                style={{
                  border: "1px solid var(--color-hairline)",
                  background: "oklch(0.07 0.008 70)",
                }}
              >
                {/* Top row: oversized numeral + meta */}
                <div className="flex items-baseline justify-between gap-6 mb-6">
                  <span
                    className="accent text-[var(--color-gold)] font-display font-bold leading-none"
                    style={{
                      fontSize: "clamp(56px, 7vw, 96px)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.index}
                  </span>
                  <span className="eyebrow text-[11px] text-[var(--color-ivory-faint)] tabular-nums text-right">
                    {s.meta}
                  </span>
                </div>

                <h3 className="font-display font-bold leading-[1.1] tracking-[-0.015em] text-[clamp(28px,3.4vw,44px)] text-[var(--color-ivory)]">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-[64ch] text-[var(--color-ivory-dim)] text-[16px] md:text-[17px] leading-[1.65]">
                  {s.copy}
                </p>

                {/* Big screenshot slot with gold bloom — same treatment as the homepage VSL */}
                <div className="relative mt-10 md:mt-12">
                  {/* Soft gold radial bloom behind */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-[-12%]"
                    style={{
                      background:
                        "radial-gradient(ellipse 60% 70% at 50% 50%, oklch(0.42 0.16 78 / 0.42) 0%, oklch(0.30 0.10 75 / 0.20) 35%, transparent 70%)",
                      filter: "blur(40px)",
                    }}
                  />

                  {/* Hairline-gold gradient frame — aspect adapts to the image */}
                  <div
                    className="relative overflow-hidden rounded-[6px]"
                    style={{
                      aspectRatio: s.imageAspect || "16 / 9",
                      border: "1px solid var(--color-hairline)",
                      padding: "1px",
                      background:
                        "linear-gradient(135deg, oklch(0.62 0.14 70 / 0.5) 0%, oklch(0.20 0.014 70) 35%, oklch(0.20 0.014 70) 65%, oklch(0.62 0.14 70 / 0.5) 100%)",
                      boxShadow:
                        "0 0 0 1px oklch(0.28 0.008 75), 0 30px 60px -20px oklch(0.10 0.010 70 / 0.8), 0 0 60px -10px oklch(0.78 0.165 78 / 0.4)",
                    }}
                  >
                    <div
                      className="relative w-full h-full rounded-[5px] overflow-hidden"
                      style={{ background: "oklch(0.07 0.008 70)" }}
                    >
                      {s.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={s.image}
                          alt={s.imageAlt}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      ) : (
                        <PlaceholderArt kind="image" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Confirmation checkbox */}
                <CheckboxRow
                  label={s.confirmLabel}
                  checked={!!done[s.index]}
                  hydrated={hydrated}
                  reduced={!!reduced}
                  onToggle={() => toggle(s.index)}
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CheckboxRow({
  label,
  checked,
  hydrated,
  reduced,
  onToggle,
}: {
  label: string;
  checked: boolean;
  hydrated: boolean;
  reduced: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={checked}
      className="group mt-8 md:mt-10 inline-flex items-center gap-4 text-left"
    >
      <span
        aria-hidden
        className="relative inline-flex items-center justify-center w-6 h-6 rounded-[4px] shrink-0 transition-colors duration-200"
        style={{
          border: checked
            ? "1px solid var(--color-gold)"
            : "1px solid var(--color-hairline)",
          background: checked
            ? "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)"
            : "transparent",
          boxShadow: checked
            ? "0 0 18px -4px oklch(0.78 0.165 78 / 0.6)"
            : "none",
        }}
      >
        {hydrated && checked && (
          <motion.svg
            viewBox="0 0 24 24"
            className="w-4 h-4"
            fill="none"
            initial={{ scale: reduced ? 1 : 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25, ease: easeOutExpo }}
          >
            <path
              d="M5 12.5 L10 17 L19 7"
              stroke="var(--color-ink-deep)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </motion.svg>
        )}
      </span>
      <span
        className="text-[15px] md:text-[16px] leading-[1.45] transition-colors duration-200"
        style={{
          color: checked
            ? "var(--color-ivory-faint)"
            : "var(--color-ivory)",
          textDecoration: checked ? "line-through" : "none",
          textDecorationColor: "var(--color-ivory-faint)",
        }}
      >
        {label}
      </span>
    </button>
  );
}
