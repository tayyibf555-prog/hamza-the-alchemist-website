"use client";

import { motion, useReducedMotion } from "framer-motion";
import { COHORT_NUMBER, START_DATE, formatStart } from "../lib/cohort";

/**
 * Announcement bar above the masthead.
 *
 * Sits in the document flow rather than fixed, matching the nav — this page
 * has no sticky chrome, and pinning a bar would eat the same mobile pixels
 * the VSL is competing for. The whole bar is the link, so the tap target is
 * the full width rather than the few words inside it.
 */
export function CohortBanner() {
  const reduced = useReducedMotion();

  return (
    <motion.a
      href="/cohort"
      initial={{ opacity: 0, y: reduced ? 0 : -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative z-40 block w-full text-center"
      style={{
        background:
          "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)",
        borderBottom: "1px solid var(--color-gold-deep)",
      }}
    >
      <span className="flex items-center justify-center gap-2 sm:gap-3 min-h-[44px] px-4 py-2.5 flex-wrap">
        <span
          aria-hidden
          className="block w-1.5 h-1.5 rounded-full shrink-0"
          style={{
            background: "var(--color-ink-deep)",
            boxShadow: "0 0 0 3px oklch(0.10 0.010 70 / 0.18)",
          }}
        />
        <span className="eyebrow font-semibold tracking-[0.16em] text-[10.5px] sm:text-[12px] text-[var(--color-ink-deep)]">
          Cohort {COHORT_NUMBER} Open Now
        </span>
        {START_DATE && (
          <span className="eyebrow tracking-[0.14em] text-[10.5px] sm:text-[12px] text-[oklch(0.10_0.010_70_/_0.72)]">
            &middot; Starts {formatStart(START_DATE)}
          </span>
        )}
        <span
          className="eyebrow tracking-[0.14em] text-[10.5px] sm:text-[12px] text-[var(--color-ink-deep)] underline underline-offset-4 decoration-[oklch(0.10_0.010_70_/_0.4)] inline-flex items-center gap-1.5"
        >
          Claim your seat
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 group-hover:translate-x-1"
            style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
          >
            &rarr;
          </span>
        </span>
      </span>
    </motion.a>
  );
}
