"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { VideoFrame } from "./VideoFrame";

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
    <section className="relative pt-[160px] lg:pt-[200px] pb-20 lg:pb-28 overflow-hidden bloom-bg">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeOutExpo }}
          className="font-display font-extrabold text-balance text-center leading-[0.98] tracking-[-0.025em] text-[clamp(48px,8vw,140px)] text-[var(--color-ivory)]"
        >
          The{" "}
          <span
            className="accent text-[var(--color-gold)]"
            style={{ textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.4)" }}
          >
            Transmutation.
          </span>
        </motion.h1>

        {/* VSL placeholder right under the headline */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: easeOutExpo }}
          className="relative mt-14 lg:mt-20"
        >
          <VideoFrame runtime="12:08" progress={0.06} youtubeId="X2ObLdwGbZI" />
        </motion.div>

        {/* Three Roman-numeral markers — table of contents for the phases below */}
        <Reveal delay={0.45}>
          <div
            className="mt-20 lg:mt-24 pt-10 grid grid-cols-3 gap-4 md:gap-10"
            style={{ borderTop: "1px solid var(--color-hairline)" }}
          >
            {["I · Dissolution", "II · Reconstruction", "III · Coagulation"].map(
              (entry) => {
                const [num, name] = entry.split(" · ");
                return (
                  <div key={entry} className="flex flex-col gap-2">
                    <span className="accent text-[var(--color-gold)] text-[clamp(32px,3.4vw,52px)] leading-none">
                      {num}
                    </span>
                    <span className="eyebrow text-[var(--color-ivory-faint)]">
                      {name}
                    </span>
                  </div>
                );
              }
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
