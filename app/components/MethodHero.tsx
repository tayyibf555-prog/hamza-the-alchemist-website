"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * Dedicated hero for the /method route. Sits above the existing
 * <Method /> component (which renders the three Transmutation phases)
 * and gives the page its own anchor identity instead of reading like
 * an excerpted section from the homepage.
 */
export function MethodHero() {
  const reduced = useReducedMotion();

  return (
    <section className="relative pt-[160px] lg:pt-[200px] pb-20 lg:pb-28 overflow-hidden bloom-bg">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <Reveal as="p" className="eyebrow text-[var(--color-gold)] text-center mb-10">
          The Method
        </Reveal>

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

        <Reveal delay={0.2} as="p" className="mt-10 max-w-[58ch] mx-auto text-center text-[var(--color-ivory-dim)] text-[18px] leading-[1.65]">
          A three-phase protocol developed over a decade of private work. The
          sequence is non-negotiable. The same protocol runs every engagement;
          what changes is the operator.
        </Reveal>

        {/* Three quick markers for the phases — read like a table of contents */}
        <Reveal delay={0.35}>
          <div
            className="mt-16 lg:mt-20 pt-10 grid grid-cols-3 gap-4 md:gap-10"
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
