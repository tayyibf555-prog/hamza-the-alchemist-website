"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionMarker } from "./SectionMarker";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: easeOutExpo },
  },
});

/**
 * Folio I · Orientation — the homepage hero.
 *
 * A single full-height statement: eyebrow qualifier over the headline.
 * No video, no CTA competing for attention — just the line, then the
 * roster below.
 */
export function VSLHero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col overflow-hidden pt-[76px]"
    >
      <SectionMarker index="I" label="Orientation" />

      {/* Centered heading */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-[1100px] w-full px-6 lg:px-10 py-16 text-center">
          <motion.p
            variants={fadeIn(1.0)}
            initial="hidden"
            animate="visible"
            className="eyebrow text-[var(--color-gold)] mb-8"
          >
            Only for 7–9 figure entrepreneurs
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: reduced ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.2, ease: easeOutExpo }}
            className="font-display font-extrabold text-balance leading-[1.02] tracking-[-0.025em] text-[clamp(40px,7vw,104px)] text-[var(--color-ivory)]"
          >
            Your business cannot outgrow your{" "}
            <span
              className="accent text-[var(--color-gold)]"
              style={{ textShadow: "0 0 70px oklch(0.78 0.165 78 / 0.45)" }}
            >
              identity.
            </span>
          </motion.h1>
        </div>
      </div>

      {/* Scroll cue at the bottom of the hero */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 2.4, ease: easeOutExpo }}
        className="relative"
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 h-[56px] flex items-center justify-center md:justify-end">
          <div className="flex items-center gap-3 text-[var(--color-ivory-faint)]">
            <span className="eyebrow">Scroll</span>
            <span
              aria-hidden
              className="block w-2 h-2 rounded-full bg-[var(--color-gold)]"
              style={{ boxShadow: "0 0 10px oklch(0.78 0.165 78 / 0.7)" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
