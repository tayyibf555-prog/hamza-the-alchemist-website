"use client";

import { Reveal } from "../Reveal";
import { CTAButton } from "../CTAButton";
import { APPLY_URL } from "../../lib/links";
import {
  CHECKOUT_URL,
  COURSE_NAME,
  PRICE,
  PRICE_WAS,
  WEEKS,
  formatPrice,
} from "../../lib/course";

/**
 * "Everything you get", then one price and one button in the same card, so
 * the stack and the ask are read together.
 *
 * With PRICE unset no figure renders at all — a wrong number on a live
 * sales page is worse than no number.
 */
export function CoursePricing() {
  return (
    <section
      id="pricing"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        borderTop: "1px solid var(--color-hairline)",
        background: "var(--color-ink-deep)",
      }}
    >
      <div className="mx-auto max-w-[620px] px-6 lg:px-10">
        <Reveal>
          <div
            className="rounded-[14px] p-8 lg:p-10"
            style={{
              border: "1px solid var(--color-gold)",
              background: "oklch(0.42 0.16 78 / 0.06)",
              boxShadow: "0 0 60px -24px oklch(0.78 0.165 78 / 0.5)",
            }}
          >
            <p className="eyebrow text-[11px] text-[var(--color-gold)] text-center">
              Everything you get with
            </p>
            <h2 className="mt-3 text-center font-display font-extrabold leading-[1.1] tracking-[-0.02em] text-[clamp(24px,2.6vw,34px)] text-[var(--color-ivory)]">
              {COURSE_NAME}&trade;
            </h2>

            <ul className="mt-8" style={{ borderTop: "1px solid var(--color-hairline)" }}>
              {WEEKS.map((w) => (
                <li
                  key={w.n}
                  className="grid grid-cols-[84px_1fr] gap-x-3 py-3.5"
                  style={{ borderBottom: "1px solid var(--color-hairline)" }}
                >
                  <span className="eyebrow text-[10px] tracking-[0.2em] text-[var(--color-gold)] pt-[3px]">
                    Week {String(w.n).padStart(2, "0")}
                  </span>
                  <span className="text-[var(--color-ivory)] text-[15px] lg:text-[16px] leading-[1.5]">
                    {w.title}
                  </span>
                </li>
              ))}
            </ul>

            {PRICE !== null && (
              <div className="mt-9 flex items-baseline justify-center gap-3 flex-wrap">
                <span className="font-display font-extrabold leading-none text-[clamp(40px,5vw,62px)] text-[var(--color-ivory)]">
                  {formatPrice(PRICE)}
                </span>
                {PRICE_WAS !== null && PRICE_WAS > PRICE && (
                  <span className="font-display text-[20px] text-[var(--color-ivory-faint)] line-through">
                    {formatPrice(PRICE_WAS)}
                  </span>
                )}
              </div>
            )}

            <div className="mt-9 flex justify-center">
              <CTAButton size="large" href={CHECKOUT_URL ?? APPLY_URL}>
                Get Access Now
              </CTAButton>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
