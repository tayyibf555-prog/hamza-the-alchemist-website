"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionMarker } from "./SectionMarker";
import { TridentMark } from "./TridentMark";
import { CTAButton } from "./CTAButton";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const fadeUp = (delay: number, y = 24) => ({
  hidden: { opacity: 0, y },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, delay, ease: easeOutExpo },
  },
});

/**
 * Folio I · Orientation — the homepage hero.
 *
 * The site's original statement, rebuilt on the current design system:
 * the stacked "THE TWENTY-FIRST CENTURY ALCHEMIST" mark (ALCHEMIST in the
 * gold italic accent) opposite the trident on a gold bloom, the audience
 * line beneath, one CTA. Asymmetric — never centered.
 */
export function AlchemistHero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col overflow-hidden pt-[76px]"
    >
      <SectionMarker index="I" label="Orientation" />

      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-[1320px] w-full px-6 lg:px-10 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-10 items-center">
            {/* Left — the mark */}
            <div className="lg:col-span-7 order-2 lg:order-1 text-center lg:text-left">
              <motion.p
                variants={fadeUp(0.9, 16)}
                initial="hidden"
                animate="visible"
                className="eyebrow text-[var(--color-ivory-faint)] mb-6"
              >
                The
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: reduced ? 0 : 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.1, delay: 1.1, ease: easeOutExpo }}
                className="font-display font-extrabold uppercase leading-[0.98] tracking-[-0.02em] text-[clamp(40px,6.4vw,92px)] text-[var(--color-ivory)]"
              >
                <span className="block">Twenty-First</span>
                <span className="block">Century</span>
                <span
                  className="block accent normal-case text-[var(--color-gold)]"
                  style={{ textShadow: "0 0 70px oklch(0.78 0.165 78 / 0.45)" }}
                >
                  Alchemist
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp(1.7)}
                initial="hidden"
                animate="visible"
                className="mt-10 max-w-[52ch] mx-auto lg:mx-0 text-[var(--color-ivory-dim)] text-[17px] lg:text-[19px] leading-[1.65]"
              >
                I help CEOs, entrepreneurs, day traders, influencers, and
                music artists manifest their desires by shifting their
                identity at the subconscious level.
              </motion.p>

              <motion.div
                variants={fadeUp(2.1)}
                initial="hidden"
                animate="visible"
                className="mt-10 flex justify-center lg:justify-start"
              >
                <CTAButton size="large">Become an Alchemist</CTAButton>
              </motion.div>
            </div>

            {/* Right — trident on a gold bloom */}
            <motion.div
              initial={{ opacity: 0, scale: reduced ? 1 : 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.3, delay: 1.3, ease: easeOutExpo }}
              className="lg:col-span-5 order-1 lg:order-2 relative flex items-center justify-center"
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
                className="relative w-[140px] h-[220px] lg:w-[180px] lg:h-[280px]"
                glow
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 2.6, ease: easeOutExpo }}
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
