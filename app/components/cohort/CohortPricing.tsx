"use client";

import { Reveal } from "../Reveal";
import { CTAButton } from "../CTAButton";
import { APPLY_URL } from "../../lib/links";
import {
  COHORT_NUMBER,
  PRICE,
  PRIVATE_CHECKOUT_URL,
  PRIVATE_PRICE,
  PRICE_WAS,
  SEATS,
  SEATS_TAKEN,
  START_DATE,
  WEEKS,
  formatPrice,
  formatStart,
} from "../../lib/cohort";

/**
 * Two ways in: the cohort, or the private work.
 *
 * With PRICE unset the card reads "By application" rather than showing a
 * placeholder figure — a wrong number on a live sales page is worse than no
 * number, because visitors anchor to it and then feel misled.
 */
export function CohortPricing() {
  const remaining =
    SEATS !== null && SEATS_TAKEN !== null ? SEATS - SEATS_TAKEN : null;

  return (
    <section
      id="pricing"
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        borderTop: "1px solid var(--color-hairline)",
        background: "var(--color-ink-deep)",
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <div className="text-center mb-16">
          <Reveal delay={0.1}>
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.02em] text-[clamp(30px,3.4vw,50px)] text-[var(--color-ivory)]">
              Two ways{" "}
              <span className="accent text-[var(--color-gold)]">in.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {/* The cohort */}
          <Reveal>
            <div
              className="relative h-full flex flex-col rounded-[14px] p-8 lg:p-10"
              style={{
                border: "1px solid var(--color-gold)",
                background: "oklch(0.42 0.16 78 / 0.06)",
                boxShadow: "0 0 60px -24px oklch(0.78 0.165 78 / 0.5)",
              }}
            >
              {SEATS !== null && (
                <span
                  className="absolute -top-3 left-8 eyebrow text-[10px] tracking-[0.2em] px-3 py-1.5 rounded-full text-[var(--color-ink-deep)]"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)",
                  }}
                >
                  {SEATS} seats only
                </span>
              )}

              <p className="eyebrow text-[11px] text-[var(--color-gold)]">
                Cohort {COHORT_NUMBER}
              </p>

              <div className="mt-5 flex items-baseline gap-3 flex-wrap">
                {PRICE !== null ? (
                  <>
                    <span className="font-display font-extrabold leading-none text-[clamp(38px,4.4vw,58px)] text-[var(--color-ivory)]">
                      {formatPrice(PRICE)}
                    </span>
                    {PRICE_WAS !== null && PRICE_WAS > PRICE && (
                      <span className="font-display text-[20px] text-[var(--color-ivory-faint)] line-through">
                        {formatPrice(PRICE_WAS)}
                      </span>
                    )}
                  </>
                ) : (
                  <span className="font-display font-extrabold leading-none text-[clamp(30px,3.2vw,42px)] text-[var(--color-ivory)]">
                    By application
                  </span>
                )}
              </div>

              <p className="mt-5 text-[var(--color-ivory-dim)] text-[15px] leading-[1.7]">
                {WEEKS} weeks. One live call a week, the course content between
                them, recordings and the cohort room.
              </p>

              <div className="mt-8 pt-6 flex-1" style={{ borderTop: "1px solid var(--color-hairline)" }}>
                <ul className="flex flex-col gap-3">
                  {[
                    `${WEEKS} live calls with Hamza`,
                    "The full course content",
                    "Every call recorded and kept",
                    "Private cohort room",
                    "Direct access between calls",
                  ].map((l) => (
                    <li key={l} className="flex gap-3">
                      <span aria-hidden className="text-[var(--color-gold)] text-[14px] leading-[1.6]">
                        &#10003;
                      </span>
                      <span className="text-[var(--color-ivory)] text-[15px] leading-[1.6]">
                        {l}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-9 flex flex-col items-start gap-4">
                <CTAButton size="large">Claim Your Seat</CTAButton>
                {(START_DATE || (remaining !== null && remaining > 0)) && (
                  <p className="text-[13px] text-[var(--color-ivory-faint)]">
                    {START_DATE && `Starts ${formatStart(START_DATE)}`}
                    {START_DATE && remaining !== null && remaining > 0 && " · "}
                    {remaining !== null && remaining > 0 && `${remaining} seats left`}
                  </p>
                )}
              </div>
            </div>
          </Reveal>

          {/* Private */}
          <Reveal delay={0.12}>
            <div
              className="h-full flex flex-col rounded-[14px] p-8 lg:p-10"
              style={{ border: "1px solid var(--color-hairline)" }}
            >
              <p className="eyebrow text-[11px] text-[var(--color-ivory-faint)]">
                Private
              </p>

              <div className="mt-5">
                <span className="font-display font-extrabold leading-none text-[clamp(38px,4.4vw,58px)] text-[var(--color-ivory)]">
                  {PRIVATE_PRICE !== null
                    ? formatPrice(PRIVATE_PRICE)
                    : "By application"}
                </span>
              </div>

              <p className="mt-5 text-[var(--color-ivory-dim)] text-[15px] leading-[1.7]">
                One-to-one identity recalibration, paced to you. The work the
                roster on the homepage came out of.
                {PRIVATE_PRICE !== null && " No application — pay and book in."}
              </p>

              <div className="mt-8 pt-6 flex-1" style={{ borderTop: "1px solid var(--color-hairline)" }}>
                <ul className="flex flex-col gap-3">
                  {[
                    "Everything in the cohort",
                    "Private sessions, not group calls",
                    "Paced to your situation",
                    "Direct line to Hamza",
                    "No audit, no application — start straight away",
                  ].map((l) => (
                    <li key={l} className="flex gap-3">
                      <span aria-hidden className="text-[var(--color-ivory-faint)] text-[14px] leading-[1.6]">
                        &#10003;
                      </span>
                      <span className="text-[var(--color-ivory-dim)] text-[15px] leading-[1.6]">
                        {l}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-9">
                {PRIVATE_PRICE !== null ? (
                  <CTAButton
                    size="large"
                    href={PRIVATE_CHECKOUT_URL ?? APPLY_URL}
                  >
                    Start 1-on-1
                  </CTAButton>
                ) : (
                  <CTAButton size="large" variant="ghost">
                    See If You Qualify
                  </CTAButton>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
