"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CTAButton } from "../CTAButton";
import { VslPlayer } from "../VslPlayer";
import {
  CALL_SLOT,
  COHORT_NUMBER,
  COHORT_VSL_SRC,
  SEATS,
  SEATS_TAKEN,
  START_DATE,
  WEEKS,
  formatStart,
} from "../../lib/cohort";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * Cohort hero — centred, with the VSL directly under the headline.
 *
 * Deliberately the same shape as MethodHero on the homepage: eyebrow,
 * headline, video, one ask. No mark here — the masthead already carries it
 * immediately above, and a second lion was pushing the video down the page.
 */
export function CohortHero() {
  const reduced = useReducedMotion();
  const remaining =
    SEATS !== null && SEATS_TAKEN !== null ? SEATS - SEATS_TAKEN : null;

  return (
    <section className="relative pt-6 lg:pt-10 pb-20 lg:pb-28 overflow-hidden bloom-bg">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="eyebrow text-center text-[var(--color-gold)] text-[11px] lg:text-[12px] mb-5 lg:mb-6"
        >
          Cohort {COHORT_NUMBER} &middot; Now Open
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.12, ease: easeOutExpo }}
          className="font-display font-extrabold text-balance text-center leading-[1.08] tracking-[-0.02em] text-[clamp(28px,4vw,58px)] text-[var(--color-ivory)] max-w-[20ch] mx-auto"
        >
          Remove The Ceiling{" "}
          <span
            className="accent text-[var(--color-gold)]"
            style={{ textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.4)" }}
          >
            Together.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.26, ease: easeOutExpo }}
          className="mt-6 max-w-[58ch] mx-auto text-center text-[var(--color-ivory-dim)] text-[16px] lg:text-[18px] leading-[1.7]"
        >
          The same identity work I do privately with 6&ndash;7 figure
          operators, run as a {WEEKS}-week cohort. One live call a week, with
          the course content between them.
        </motion.p>

        {/* VSL right under the headline — capped width so the two read as one unit */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.4, ease: easeOutExpo }}
          className="relative mt-8 lg:mt-10 max-w-[920px] mx-auto"
        >
          {COHORT_VSL_SRC ? (
            <VslPlayer src={COHORT_VSL_SRC} />
          ) : (
            <div className="relative">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-[-12%]"
                style={{
                  background:
                    "radial-gradient(ellipse 60% 70% at 50% 50%, oklch(0.42 0.16 78 / 0.28) 0%, transparent 70%)",
                  filter: "blur(44px)",
                }}
              />
              <div
                className="relative aspect-video flex flex-col items-center justify-center gap-4 rounded-[6px]"
                style={{
                  border: "1px dashed var(--color-gold-deep)",
                  background: "oklch(0.06 0.006 70)",
                }}
              >
                <span
                  aria-hidden
                  className="flex items-center justify-center w-[72px] h-[72px] rounded-full"
                  style={{ border: "1px solid var(--color-gold-deep)" }}
                >
                  <span
                    className="block w-0 h-0 ml-1.5"
                    style={{
                      borderLeft: "18px solid var(--color-gold-deep)",
                      borderTop: "12px solid transparent",
                      borderBottom: "12px solid transparent",
                    }}
                  />
                </span>
                <span className="eyebrow text-[10px] tracking-[0.22em] text-[var(--color-ivory-faint)]">
                  Cohort VSL
                </span>
              </div>
            </div>
          )}
        </motion.div>

        {/* The ask, directly under the video */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6, ease: easeOutExpo }}
          className="mt-10 lg:mt-12 flex flex-col items-center text-center gap-5"
        >
          <CTAButton size="large">Claim Your Seat</CTAButton>

          {/* Facts — each cell only appears once its value is set. */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            <Fact value={`${WEEKS} weeks · 1 call a week`} />
            {CALL_SLOT && <Fact value={CALL_SLOT} />}
            {START_DATE && <Fact value={`Starts ${formatStart(START_DATE)}`} />}
            {remaining !== null && remaining > 0 && (
              <Fact value={`${remaining} of ${SEATS} seats left`} />
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Fact({ value }: { value: string }) {
  return (
    <span className="eyebrow text-[10px] tracking-[0.18em] text-[var(--color-ivory-faint)]">
      {value}
    </span>
  );
}
