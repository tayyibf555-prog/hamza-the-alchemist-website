"use client";

import { motion, useReducedMotion } from "framer-motion";
import { VslPlayer } from "./VslPlayer";
import { CTAButton } from "./CTAButton";
import { VSL_SRC } from "../lib/vsl-content";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * Hero for the /method route.
 *
 * Eyebrow → "The Transmutation." headline → VSL placeholder → three-phase
 * Roman-numeral row that doubles as a table of contents for the phases
 * rendered by <Method /> below.
 */
export function MethodHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative pt-6 lg:pt-10 pb-20 lg:pb-28 overflow-hidden bloom-bg">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.12, ease: easeOutExpo }}
          className="font-display font-extrabold text-balance text-center leading-[1.1] tracking-[-0.02em] text-[clamp(24px,3.1vw,44px)] text-[var(--color-ivory)] max-w-[30ch] mx-auto"
        >
          You&rsquo;ve Built a Business Generating Millions. You Have the Skills, the Strategy,
          and the Experience. Yet You Keep Hitting the Same Revenue Ceiling. The Problem
          Isn&rsquo;t Your Business.{" "}
          <span
            className="accent text-[var(--color-gold)]"
            style={{ textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.4)" }}
          >
            It&rsquo;s the Identity Running It.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: easeOutExpo }}
          className="mt-5 lg:mt-6 text-center text-[var(--color-ivory-dim)] text-[16px] lg:text-[18px] leading-[1.6] max-w-[60ch] mx-auto"
        >
          I help successful entrepreneurs uncover and transform the subconscious patterns
          limiting their growth through personalized hypnosis and identity transmutation.
        </motion.p>

        {/* VSL right under the headline — capped width so the two read as one unit */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: easeOutExpo }}
          className="relative mt-8 lg:mt-10 max-w-[920px] mx-auto"
        >
          <VslPlayer src={VSL_SRC} />
        </motion.div>

        {/* The ask, directly under the video — the page's primary action. */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.6, ease: easeOutExpo }}
          className="mt-10 lg:mt-12 flex flex-col items-center text-center"
        >
          <CTAButton size="large">See If You Qualify</CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
