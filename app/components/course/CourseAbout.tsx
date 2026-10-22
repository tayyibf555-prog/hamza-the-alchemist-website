"use client";

import { Reveal } from "../Reveal";
import { ABOUT, COURSE_NAME, OUTCOMES } from "../../lib/course";

/**
 * Alchemical glyphs, one per outcome box — the brief asks for icons that fit
 * the brand, and the classical element/metal symbols are the brand's own
 * vocabulary rather than a generic icon set.
 */
const GLYPHS: React.ReactNode[] = [
  // Gold — circle with a point
  <><circle cx="16" cy="16" r="10" /><circle cx="16" cy="16" r="1.6" fill="currentColor" /></>,
  // Fire
  <path d="M16 5 L27 25 H5 Z" />,
  // Water
  <path d="M5 7 H27 L16 27 Z" />,
  // Air
  <><path d="M16 5 L27 25 H5 Z" /><path d="M8.5 18 H23.5" /></>,
  // Earth
  <><path d="M5 7 H27 L16 27 Z" /><path d="M8.5 14 H23.5" /></>,
  // Silver — crescent
  <path d="M20 5 A11 11 0 1 0 20 27 A8.5 8.5 0 1 1 20 5 Z" />,
  // Mercury
  <><path d="M11 4 A5 5 0 0 0 21 4" /><circle cx="16" cy="12" r="5" /><path d="M16 17 V28 M11.5 23 H20.5" /></>,
  // Quintessence — circle within square
  <><rect x="5" y="5" width="22" height="22" /><circle cx="16" cy="16" r="7" /></>,
];

export function CourseAbout() {
  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        borderTop: "1px solid var(--color-hairline)",
        background: "var(--color-ink-deep)",
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <div className="max-w-[760px] mx-auto text-center">
          <Reveal>
            <h2 className="font-display font-extrabold leading-[1.05] tracking-[-0.02em] text-[clamp(28px,3.2vw,46px)] text-[var(--color-ivory)]">
              The 21st Century{" "}
              <span className="accent text-[var(--color-gold)]">Alchemist&trade;</span>
            </h2>
          </Reveal>
          {ABOUT.map((p, n) => (
            <Reveal key={n} delay={0.08 + n * 0.06}>
              <p className="mt-6 text-[var(--color-ivory-dim)] text-[16px] lg:text-[18px] leading-[1.75]">
                {p}
              </p>
            </Reveal>
          ))}
          <Reveal delay={0.24}>
            <p className="mt-12 font-display font-bold text-[clamp(19px,2vw,24px)] leading-[1.35] text-[var(--color-ivory)]">
              Here&rsquo;s what becomes possible when you transmute your identity
              into {COURSE_NAME}&trade;
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {OUTCOMES.map((o, n) => (
            <Reveal key={n} delay={(n % 4) * 0.06}>
              <div
                className="h-full rounded-[12px] p-6 lg:p-7"
                style={{
                  border: o.pending
                    ? "1px dashed var(--color-gold-deep)"
                    : "1px solid var(--color-hairline)",
                  background: "oklch(0.09 0.008 70)",
                  opacity: o.pending ? 0.55 : 1,
                }}
              >
                <svg
                  aria-hidden
                  viewBox="0 0 32 32"
                  width="34"
                  height="34"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                  className="text-[var(--color-gold)]"
                >
                  {GLYPHS[n % GLYPHS.length]}
                </svg>
                <h3 className="mt-5 font-display font-bold text-[17px] lg:text-[18px] leading-[1.3] text-[var(--color-ivory)]">
                  {o.title}
                </h3>
                <p className="mt-3 text-[var(--color-ivory-dim)] text-[14px] lg:text-[15px] leading-[1.7]">
                  {o.detail}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
