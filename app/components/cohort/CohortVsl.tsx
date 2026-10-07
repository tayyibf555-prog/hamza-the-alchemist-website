"use client";

import { motion, useReducedMotion } from "framer-motion";
import { VslPlayer } from "../VslPlayer";
import { CTAButton } from "../CTAButton";
import { COHORT_VSL_SRC } from "../../lib/cohort";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * The cohort VSL.
 *
 * Renders a labelled placeholder while COHORT_VSL_SRC is null, so the section
 * can ship and be judged for layout before the video is cut — and so a missing
 * file never shows a broken player on a live sales page.
 */
export function CohortVsl() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative py-20 lg:py-28 overflow-hidden"
      style={{
        borderTop: "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
        background: "var(--color-ink-deep)",
      }}
    >
      <div className="mx-auto max-w-[920px] px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="eyebrow text-center text-[var(--color-gold)] text-[11px] mb-8"
        >
          Watch First
        </motion.p>

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

        <div className="mt-10 flex justify-center">
          <CTAButton size="large">Claim Your Seat</CTAButton>
        </div>
      </div>
    </section>
  );
}
