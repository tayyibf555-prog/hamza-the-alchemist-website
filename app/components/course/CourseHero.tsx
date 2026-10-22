"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CTAButton } from "../CTAButton";
import { VslPlayer } from "../VslPlayer";
import { COURSE_VSL_SRC, CHECKOUT_URL, HERO } from "../../lib/course";
import { APPLY_URL } from "../../lib/links";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * Course hero — headline, subheader, video, one ask. Nothing else.
 *
 * No mark here: the masthead carries the logo immediately above. No facts
 * strip, no badges, no icons — the video is what the page is for and
 * anything between the headline and it is delay.
 */
export function CourseHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative pt-6 lg:pt-10 pb-20 lg:pb-28 overflow-hidden bloom-bg">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeOutExpo }}
          className="font-display font-extrabold text-balance text-center leading-[1.1] tracking-[-0.02em] text-[clamp(26px,3.4vw,50px)] text-[var(--color-ivory)] max-w-[26ch] mx-auto"
        >
          {HERO.lead}{" "}
          <span
            className="accent text-[var(--color-gold)]"
            style={{ textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.4)" }}
          >
            {HERO.accent}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: easeOutExpo }}
          className="mt-6 lg:mt-7 max-w-[62ch] mx-auto text-center text-[var(--color-ivory-dim)] text-[16px] lg:text-[18px] leading-[1.7]"
        >
          {HERO.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.25, ease: easeOutExpo }}
          className="relative mt-8 lg:mt-10 max-w-[920px] mx-auto"
        >
          {COURSE_VSL_SRC ? (
            <VslPlayer src={COURSE_VSL_SRC} />
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
                  Course VSL
                </span>
              </div>
            </div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.5, ease: easeOutExpo }}
          className="mt-10 lg:mt-12 flex justify-center"
        >
          <CTAButton size="large" href={CHECKOUT_URL ?? APPLY_URL}>
            Get Access Now
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
