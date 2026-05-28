"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionMarker } from "./SectionMarker";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * Folio II · The Practice — curator's note.
 * Two-column editorial layout. Left: short paragraph defining the work
 * stripped of mysticism. Right: vertical pull-quote that does the
 * emotional work the paragraph deliberately doesn't.
 */
export function Practice() {
  const reduced = useReducedMotion();

  return (
    <section
      id="practice"
      className="relative py-32 lg:py-44 overflow-hidden"
    >
      <SectionMarker index="II" label="The Practice" />

      {/* Decorative oversized roman numeral drifting behind */}
      <span
        aria-hidden
        className="pointer-events-none absolute font-display font-black select-none accent text-[var(--color-gold)]"
        style={{
          right: "-2%",
          top: "10%",
          fontSize: "clamp(280px, 36vw, 520px)",
          lineHeight: 1,
          opacity: 0.04,
          letterSpacing: "0",
        }}
      >
        II
      </span>

      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-10 lg:gap-20 items-start">
          {/* Left rail — eyebrow + curator's note */}
          <div className="col-span-12 lg:col-span-6">
            <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-8">
              The Practice
            </Reveal>

            <Reveal>
              <h2 className="font-display font-extrabold leading-[1.04] tracking-[-0.02em] text-[clamp(32px,3.6vw,52px)] text-[var(--color-ivory)] mb-10">
                A private practice for{" "}
                <span className="accent text-[var(--color-gold)]">
                  identity work.
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.15} as="p" className="text-[var(--color-ivory-dim)] text-[17px] leading-[1.7] max-w-[58ch]">
              I work privately with CEOs, entrepreneurs, day traders,
              influencers, and music artists. The work is not motivational,
              theatrical, or mystical. It is a structured engagement that
              shifts identity at the subconscious level. Strategy lives at
              the conscious level. Identity runs underneath. Until the
              architecture changes, the outcomes never do.
            </Reveal>

            {/* Quiet credential line — no card grid */}
            <Reveal delay={0.25} as="p" className="mt-10 text-[15px] leading-[1.7] text-[var(--color-ivory-faint)] max-w-[56ch]">
              By application only. I take four people per quarter, and I&apos;m
              the one reading the applications.
            </Reveal>
          </div>

          {/* Right rail — vertical pull-quote */}
          <div className="col-span-12 lg:col-span-5 lg:col-start-8">
            <motion.figure
              initial={{ opacity: 0, y: reduced ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
              transition={{ duration: 1.0, delay: 0.2, ease: easeOutExpo }}
              className="relative pl-8 lg:pl-12"
            >
              {/* Tall gold hairline marker — the left "rule" of a magazine pull-quote */}
              <span
                aria-hidden
                className="absolute left-0 top-2 bottom-2 w-px"
                style={{
                  background:
                    "linear-gradient(180deg, var(--color-gold) 0%, transparent 100%)",
                }}
              />
              {/* Large opening quote glyph */}
              <span
                aria-hidden
                className="absolute -left-1 -top-8 accent text-[var(--color-gold)] text-[120px] leading-none opacity-50 pointer-events-none select-none"
              >
                &ldquo;
              </span>

              <blockquote className="accent text-[var(--color-ivory)] text-[clamp(26px,2.6vw,40px)] leading-[1.18]">
                The work begins where positive thinking ends. Where there is no
                more script to read from, no audience to perform for, no version
                of yourself you can recognize. That is the room.
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-4">
                <span
                  aria-hidden
                  className="block w-10 h-px"
                  style={{ background: "var(--color-hairline)" }}
                />
                <span className="eyebrow text-[var(--color-ivory-faint)]">
                  From the operating notes
                </span>
              </figcaption>
            </motion.figure>
          </div>
        </div>
      </div>
    </section>
  );
}
