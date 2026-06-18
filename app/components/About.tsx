"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionMarker } from "./SectionMarker";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export function About() {
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative py-32 lg:py-48 overflow-hidden bloom-left-mid"
    >
      <SectionMarker index="III" label="The Operator" />

      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left: heading + story */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-8">
              Hamza · The Operator
            </Reveal>

            <motion.h2
              initial={{ opacity: 0, y: reduced ? 0 : 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 1.1, ease: easeOutExpo }}
              className="font-display font-extrabold leading-[1.04] tracking-[-0.025em] text-[clamp(32px,4vw,56px)] text-[var(--color-ivory)]"
            >
              Strategy can&apos;t outwork{" "}
              <span className="accent text-[var(--color-gold)]">identity.</span>
            </motion.h2>

            <Reveal delay={0.2}>
              <div className="mt-10 max-w-[58ch] flex flex-col gap-6 text-[var(--color-ivory-dim)] text-[17px] leading-[1.75]">
                <p>
                  Raised by immigrants who followed every rule and built
                  security, respect, and stability. Everything but freedom. That
                  tension left me a question I couldn&rsquo;t drop: why capable
                  people plateau, and why effort stops compounding.
                </p>
                <p>
                  I left corporate to build my own thing, and it collapsed. I
                  moved back home, slept in my car, and rebuilt quietly. A
                  mentor handed me one sentence instead of a tactic: ponder the
                  word infinity.
                </p>
                <p>
                  The breakthrough wasn&rsquo;t external. It was structural.
                  Reality had never resisted me, it reflected me. Now I work
                  privately with founders, executives, and investors, not to
                  motivate them but to restore internal order. When the
                  structure is correct, results reorganize.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right: founder portrait */}
          <div className="lg:col-span-5 order-1 lg:order-2 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 1.0, ease: easeOutExpo }}
              className="relative max-w-[360px] mx-auto lg:max-w-none lg:mx-0"
            >
              {/* Frameless portrait, vertical 3:4 */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src="/founder.png"
                  alt="Hamza, The Alchemist"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  style={{
                    objectFit: "cover",
                    objectPosition: "center top",
                  }}
                />
              </div>

              {/* Caption under the photo */}
              <div className="mt-7 flex items-baseline gap-4 flex-wrap">
                <span className="accent text-[var(--color-gold)] text-[16px]">
                  Between sessions.
                </span>
                <span className="eyebrow text-[var(--color-ivory-faint)]">
                  Summer 2026
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
