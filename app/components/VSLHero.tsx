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
 * Folio III · The Premise — the standalone identity statement.
 *
 * Sits under About: eyebrow qualifier over the headline, nothing else
 * competing for attention.
 */
export function VSLHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative py-32 lg:py-48 overflow-hidden">
      <SectionMarker index="III" label="The Premise" />

      <div className="mx-auto max-w-[1100px] w-full px-6 lg:px-10 text-center">
        <motion.p
          variants={fadeIn(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          className="eyebrow text-[var(--color-gold)] mb-8"
        >
          Where 7–9 figure entrepreneurs go to transcend their internal
          ceilings
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.1, ease: easeOutExpo }}
          className="font-display font-extrabold text-balance leading-[1.02] tracking-[-0.025em] text-[clamp(36px,6vw,88px)] text-[var(--color-ivory)]"
        >
          Your business cannot outgrow your{" "}
          <span
            className="accent text-[var(--color-gold)]"
            style={{ textShadow: "0 0 70px oklch(0.78 0.165 78 / 0.45)" }}
          >
            identity.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
