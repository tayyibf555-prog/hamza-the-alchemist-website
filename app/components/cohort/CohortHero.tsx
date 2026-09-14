"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CTAButton } from "../CTAButton";
import { TridentMark } from "../TridentMark";
import {
  CALL_SLOT,
  COHORT_NUMBER,
  SEATS,
  SEATS_TAKEN,
  START_DATE,
  WEEKS,
  formatStart,
} from "../../lib/cohort";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * Cohort hero — copy left, mark right.
 *
 * Note the grid is `grid-cols-1 lg:grid-cols-12` with no base col-span on the
 * children: a bare grid-cols-12 forces twelve gaps at mobile width and blows
 * the layout past the viewport.
 *
 * On mobile the copy comes first rather than the mark. This is a sales page —
 * the headline has to be the first thing read, not a logo pushing it down.
 */
export function CohortHero() {
  const reduced = useReducedMotion();
  const remaining =
    SEATS !== null && SEATS_TAKEN !== null ? SEATS - SEATS_TAKEN : null;

  return (
    <section className="relative pt-10 lg:pt-16 pb-20 lg:pb-28 overflow-hidden bloom-bg">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left — the offer */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: reduced ? 0 : 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: easeOutExpo }}
              className="eyebrow text-[var(--color-gold)] text-[11px] lg:text-[12px]"
            >
              Cohort {COHORT_NUMBER} &middot; Now Open
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: reduced ? 0 : 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.12, ease: easeOutExpo }}
              className="mt-6 font-display font-extrabold text-balance leading-[1.04] tracking-[-0.025em] text-[clamp(32px,5.2vw,68px)] text-[var(--color-ivory)]"
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
              transition={{ duration: 1.0, delay: 0.3, ease: easeOutExpo }}
              className="mt-7 max-w-[56ch] mx-auto lg:mx-0 text-[var(--color-ivory-dim)] text-[17px] lg:text-[19px] leading-[1.7]"
            >
              The same identity work I do privately with 6&ndash;7 figure
              operators, run as a {WEEKS}-week cohort. One live call a week,
              with the course content between them so the calls are spent on
              your business rather than on theory.
            </motion.p>

            {/* Facts — each cell only appears once its value is set. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.5, ease: easeOutExpo }}
              className="mt-10 flex flex-wrap items-center justify-center lg:justify-start gap-x-10 gap-y-5"
            >
              <Fact label="Format" value={`${WEEKS} weeks · 1 call a week`} />
              {CALL_SLOT && <Fact label="Calls" value={CALL_SLOT} />}
              {START_DATE && (
                <Fact label="Starts" value={formatStart(START_DATE)} />
              )}
              {remaining !== null && remaining > 0 && (
                <Fact label="Seats left" value={`${remaining} of ${SEATS}`} />
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.65, ease: easeOutExpo }}
              className="mt-11 flex justify-center lg:justify-start"
            >
              <CTAButton size="large">Claim Your Seat</CTAButton>
            </motion.div>
          </div>

          {/* Right — the mark on a gold bloom */}
          <motion.div
            initial={{ opacity: 0, scale: reduced ? 1 : 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.4, ease: easeOutExpo }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-[-20%]"
              style={{
                background:
                  "radial-gradient(ellipse 60% 60% at 50% 50%, oklch(0.42 0.16 78 / 0.4) 0%, oklch(0.30 0.10 75 / 0.18) 40%, transparent 72%)",
                filter: "blur(50px)",
              }}
            />
            <TridentMark
              variant="lion"
              color="var(--color-gold)"
              className="relative w-[150px] h-[240px] lg:w-[300px] lg:h-[480px]"
              glow
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center lg:items-start gap-1.5">
      <span className="eyebrow text-[10px] tracking-[0.2em] text-[var(--color-ivory-faint)]">
        {label}
      </span>
      <span className="font-display font-semibold text-[15px] lg:text-[16px] text-[var(--color-ivory)]">
        {value}
      </span>
    </div>
  );
}
