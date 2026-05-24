"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionMarker } from "./SectionMarker";
import { Particles } from "./Particles";
import { VideoFrame } from "./VideoFrame";

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
 * Folio I · Orientation — VSL-anchored hero.
 *
 * The video is the salesperson. The page is the frame around it.
 * No competing CTA, no competing copy. A short eyebrow above, a single
 * line below the video, one quiet CTA, a Latin band along the bottom.
 *
 * The 16:9 placeholder is hairline-gold-framed with a trident-inside-circle
 * play affordance, runtime label, and chapter markers visible so it reads
 * as "an actual film," not "a video player placeholder."
 */
export function VSLHero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col overflow-hidden pt-[76px]"
    >
      <Particles count={32} />

      <SectionMarker index="I" label="Orientation" />


      {/* Main column */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-[1100px] w-full px-6 lg:px-10 py-16 lg:py-20">
          {/* Eyebrow */}
          <motion.p
            variants={fadeIn(1.0)}
            initial="hidden"
            animate="visible"
            className="eyebrow text-[var(--color-gold)] text-center mb-10"
          >
            Orientation · The 21st Century Alchemist
          </motion.p>

          {/* Pre-headline (above the video, sets the frame) */}
          <motion.h1
            initial={{ opacity: 0, y: reduced ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.2, ease: easeOutExpo }}
            className="font-display font-extrabold text-balance text-center leading-[1.0] tracking-[-0.025em] text-[clamp(32px,4.4vw,68px)] text-[var(--color-ivory)] mb-12 lg:mb-16"
          >
            Your ceiling isn&apos;t strategy. It&apos;s{" "}
            <span
              className="accent text-[var(--color-gold)]"
              style={{ textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.4)" }}
            >
              identity.
            </span>
          </motion.h1>

          {/* The video frame */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 1.6, ease: easeOutExpo }}
            className="relative"
          >
            <VideoFrame runtime="08:42" showCaption />
          </motion.div>

          {/* Below-video caption + CTA */}
          <motion.div
            variants={fadeIn(2.1)}
            initial="hidden"
            animate="visible"
            className="mt-10 lg:mt-14 flex flex-col items-center gap-8"
          >
            <p className="accent text-[var(--color-ivory)] text-[clamp(18px,1.6vw,22px)] text-center max-w-[44ch]">
              Nine minutes. Identity, frequency, outcome.
            </p>

            <a
              href="#inquiry"
              className="group relative inline-flex items-center gap-3 h-[60px] px-9 eyebrow rounded-[3px] text-[var(--color-ink-deep)] overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)",
                boxShadow:
                  "0 0 0 1px oklch(0.62 0.14 70 / 0.4), 0 18px 48px -12px oklch(0.78 0.165 78 / 0.55)",
              }}
            >
              <span className="relative z-10 font-semibold tracking-[0.2em] text-[13px]">
                Inquire About Admission
              </span>
              <span
                aria-hidden
                className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1"
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              >
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom hairline — quiet closer, no decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 2.4, ease: easeOutExpo }}
        className="relative"
        style={{ borderTop: "1px solid var(--color-hairline)" }}
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 h-[56px] flex items-center justify-end">
          <div className="hidden md:flex items-center gap-3 text-[var(--color-ivory-faint)]">
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

