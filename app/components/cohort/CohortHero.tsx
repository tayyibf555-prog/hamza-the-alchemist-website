"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CTAButton } from "../CTAButton";
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

export function CohortHero() {
  const reduced = useReducedMotion();
  const remaining =
    SEATS !== null && SEATS_TAKEN !== null ? SEATS - SEATS_TAKEN : null;

  return (
    <section className="relative pt-10 lg:pt-16 pb-20 lg:pb-28 overflow-hidden bloom-bg">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-10 text-center">
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
          className="mt-6 font-display font-extrabold text-balance leading-[1.06] tracking-[-0.025em] text-[clamp(30px,5vw,64px)] text-[var(--color-ivory)]"
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
          className="mt-7 mx-auto max-w-[60ch] text-[var(--color-ivory-dim)] text-[17px] lg:text-[19px] leading-[1.7]"
        >
          The same identity work I do privately with 6&ndash;7 figure operators,
          run as a {WEEKS}-week cohort. One live call a week, with the course
          content between them so the calls are spent on your business rather
          than on theory.
        </motion.p>

        {/* Facts strip — each cell only appears once its value is set. */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: easeOutExpo }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-5"
        >
          <Fact label="Format" value={`${WEEKS} weeks · 1 call a week`} />
          {CALL_SLOT && <Fact label="Calls" value={CALL_SLOT} />}
          {START_DATE && <Fact label="Starts" value={formatStart(START_DATE)} />}
          {remaining !== null && remaining > 0 && (
            <Fact label="Seats left" value={`${remaining} of ${SEATS}`} />
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.65, ease: easeOutExpo }}
          className="mt-12 flex flex-col items-center"
        >
          <CTAButton size="large">Claim Your Seat</CTAButton>
        </motion.div>
      </div>
    </section>
  );
}

function Fact({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <span className="eyebrow text-[10px] tracking-[0.2em] text-[var(--color-ivory-faint)]">
        {label}
      </span>
      <span className="font-display font-semibold text-[15px] lg:text-[16px] text-[var(--color-ivory)]">
        {value}
      </span>
    </div>
  );
}
