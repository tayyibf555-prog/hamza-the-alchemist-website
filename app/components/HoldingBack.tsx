"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionMarker } from "./SectionMarker";

/**
 * The pre-CTA hook. A standalone editorial moment between the
 * Services section and the Final CTA. One thought, one breath, one beat.
 *
 *   "You already know what's holding you back."
 *
 * Quiet on the page; loud on the line.
 */
export function HoldingBack() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{
        borderTop: "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <SectionMarker index="VII" label="The Reckoning" />

      {/* Decorative oversized ampersand drifting behind the headline */}
      <span
        aria-hidden
        className="pointer-events-none absolute font-display font-black select-none text-[var(--color-gold)]"
        style={{
          right: "-2%",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "clamp(360px, 50vw, 720px)",
          lineHeight: 1,
          opacity: 0.04,
          letterSpacing: "-0.08em",
        }}
      >
        &amp;
      </span>

      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 grid grid-cols-12 gap-8 lg:gap-16 items-center">
        {/* Left rail metadata */}
        <Reveal as="div" className="col-span-12 lg:col-span-3 order-2 lg:order-1">
          <div
            className="pt-6 border-t flex flex-col gap-1"
            style={{ borderColor: "var(--color-hairline)" }}
          >
            <span className="eyebrow text-[var(--color-ivory-faint)]">Note</span>
            <p className="text-[14px] text-[var(--color-ivory-dim)] leading-[1.55] max-w-[28ch]">
              Read this once. Re-read it slowly. Then decide whether you&apos;re
              ready to do the work.
            </p>
          </div>
        </Reveal>

        {/* The line */}
        <div className="col-span-12 lg:col-span-9 order-1 lg:order-2">
          <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-10">
            Before You Apply
          </Reveal>

          <motion.h2
            initial={{ opacity: 0, y: reduced ? 0 : 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-extrabold text-balance leading-[1.0] tracking-[-0.025em] text-[clamp(48px,7.5vw,128px)] text-[var(--color-ivory)]"
          >
            You already know
            <br />
            what&apos;s{" "}
            <span
              className="accent text-[var(--color-gold)]"
              style={{ textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.35)" }}
            >
              holding you back.
            </span>
          </motion.h2>

          <Reveal delay={0.2} as="p" className="mt-12 max-w-[52ch] text-[var(--color-ivory-dim)] text-[18px] leading-[1.65]">
            The frequency you operate at is the ceiling you&apos;ll hit. Strategy can&apos;t
            outwork identity. New tactics applied at the old frequency produce the same
            outcome at a different speed.
          </Reveal>

          {/* Hairline grid of three short propositions */}
          <Reveal delay={0.3}>
            <div
              className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-0"
              style={{ borderTop: "1px solid var(--color-hairline)" }}
            >
              {[
                {
                  k: "01",
                  l: "Pattern",
                  d: "You keep ending up in the same situation with new names attached.",
                },
                {
                  k: "02",
                  l: "Ceiling",
                  d: "Every breakthrough is followed by a quiet retreat to baseline.",
                },
                {
                  k: "03",
                  l: "Friction",
                  d: "What you want and what you act on are two different operating systems.",
                },
              ].map((p, i) => (
                <div
                  key={p.k}
                  className={`pt-7 pb-2 md:px-7 ${
                    i < 2
                      ? "md:border-r border-[var(--color-hairline)]"
                      : ""
                  }`}
                >
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="font-display font-black text-[var(--color-gold)] text-[14px] tracking-tight">
                      {p.k}
                    </span>
                    <span className="eyebrow text-[var(--color-ivory)]">
                      {p.l}
                    </span>
                  </div>
                  <p className="text-[15px] text-[var(--color-ivory-dim)] leading-[1.55] max-w-[34ch]">
                    {p.d}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
