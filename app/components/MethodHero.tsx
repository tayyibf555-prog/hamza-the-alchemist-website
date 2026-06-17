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
    <section className="relative pt-[116px] lg:pt-[140px] pb-20 lg:pb-28 overflow-hidden bloom-bg">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: easeOutExpo }}
          className="font-display font-extrabold text-balance text-center leading-[1.08] tracking-[-0.02em] text-[clamp(28px,4vw,58px)] text-[var(--color-ivory)] max-w-[20ch] mx-auto"
        >
          Remove The Invisible Internal Ceiling That&rsquo;s Been Quietly Costing Your Business{" "}
          <span
            className="accent text-[var(--color-gold)]"
            style={{ textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.4)" }}
          >
            Millions
          </span>
        </motion.h1>

        {/* VSL right under the headline — capped width so the two read as one unit */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.3, ease: easeOutExpo }}
          className="relative mt-8 lg:mt-10 max-w-[760px] mx-auto"
        >
          <VideoFrame runtime="12:08" progress={0.06} youtubeId="X2ObLdwGbZI" />
        </motion.div>

        {/* Three Roman-numeral markers — table of contents for the phases below */}
        <Reveal delay={0.45}>
          <div
            className="mt-14 lg:mt-16 pt-10 grid grid-cols-3 gap-4 md:gap-10"
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
