"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionMarker } from "./SectionMarker";
import { CountUp } from "./CountUp";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type Stat = {
  to: number;
  /** Rendered at 0.45× the integer size, on the same line, with tight tracking. */
  suffix: string;
  label: string;
};
type Principle = { title: string; body: string };

const stats: Stat[] = [
  { to: 8, suffix: "figures", label: "Combined client revenue" },
  { to: 80, suffix: "+", label: "Operators worked with" },
  { to: 6, suffix: "years", label: "In closed-room practice" },
  { to: 100, suffix: "%", label: "Application only" },
];

const principles: Principle[] = [
  {
    title: "Identity precedes outcome.",
    body: "Every result you've produced is downstream of the identity that produced it. Change the identity, the result changes on its own. Try to change the result without it, and the old identity quietly walks the new result back to baseline.",
  },
  {
    title: "Strategy works at the conscious level. The subconscious runs the room.",
    body: "Most coaching teaches you what to do. This work changes who's doing it. The frameworks I install live underneath the conscious decisions, in the place that operates when you're not paying attention.",
  },
  {
    title: "Most operators are trying to coagulate without dissolving first.",
    body: "They're stacking new tactics on top of an unresolved version of themselves. It's the most common failure mode I see. The work begins by undoing, not by adding.",
  },
];

export function About() {
  const reduced = useReducedMotion();

  return (
    <section
      id="about"
      className="relative py-32 lg:py-48 overflow-hidden bloom-left-mid"
    >
      <SectionMarker index="III" label="The Operator" />

      {/* ─── Centered narrative ─────────────────────────────────────── */}
      <div className="relative mx-auto max-w-[920px] px-6 lg:px-10">
        <Reveal as="p" className="eyebrow text-[var(--color-gold)] text-center mb-12">
          Hamza · The Operator
        </Reveal>

        <motion.h2
          initial={{ opacity: 0, y: reduced ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.1, ease: easeOutExpo }}
          className="font-display font-extrabold text-balance text-center leading-[1.02] tracking-[-0.025em] text-[clamp(36px,5vw,72px)] text-[var(--color-ivory)]"
        >
          Strategy can&apos;t outwork{" "}
          <span className="accent text-[var(--color-gold)]">identity.</span>
        </motion.h2>

        <Reveal delay={0.2}>
          <div className="mt-14 lg:mt-16 mx-auto max-w-[58ch] flex flex-col gap-6 text-center text-[var(--color-ivory-dim)] text-[17px] leading-[1.7]">
            <p>
              Six years private. A small number of founders, day traders, and
              creators each quarter. Every engagement individual.
            </p>
            <p>
              The frequency you operate at is the ceiling you&apos;ll hit.
              I&apos;ve never seen anyone break theirs without first dissolving
              the identity that built it.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ─── Stat band ──────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 mt-24 lg:mt-32">
        <div
          className="relative grid grid-cols-2 lg:grid-cols-4"
          style={{
            borderTop: "1px solid var(--color-hairline)",
            borderBottom: "1px solid var(--color-hairline)",
          }}
        >
          {stats.map((s, i) => {
            const isNotLast = i < stats.length - 1;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                transition={{
                  duration: 0.95,
                  delay: i * 0.14,
                  ease: easeOutExpo,
                }}
                className="group relative flex flex-col py-12 lg:py-16 px-6 lg:px-10 min-h-[260px] lg:min-h-[280px]"
              >
                {/* Animated vertical hairline divider — scales from top */}
                {isNotLast && (
                  <motion.span
                    aria-hidden
                    className="absolute top-0 right-0 w-px origin-top"
                    style={{
                      height: "100%",
                      background: "var(--color-hairline)",
                    }}
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                    transition={{
                      duration: 1.1,
                      delay: i * 0.14 + 0.1,
                      ease: easeOutExpo,
                    }}
                  />
                )}

                {/* Animated gold tick — grows from 0 width on cell entry,
                    extends further on hover for a small interactive touch */}
                <motion.span
                  aria-hidden
                  className="absolute top-0 left-0 h-px transition-all duration-500 group-hover:!w-16"
                  style={{
                    background: "var(--color-gold)",
                    boxShadow: "0 0 8px oklch(0.78 0.165 78 / 0.45)",
                    transitionTimingFunction: "var(--ease-out-expo)",
                  }}
                  initial={{ width: 0 }}
                  whileInView={{ width: "32px" }}
                  viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.14 + 0.4,
                    ease: easeOutExpo,
                  }}
                />

                {/* Value — count-up integer with inline smaller suffix.
                    Every cell uses the same single-line structure so the
                    values sit at identical vertical positions across the row. */}
                <p
                  className="font-display font-extrabold leading-[1] tracking-[-0.025em] text-[clamp(44px,4.6vw,72px)] text-[var(--color-ivory)] whitespace-nowrap transition-transform duration-500 group-hover:translate-x-1 flex items-baseline gap-[0.18em]"
                  style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
                >
                  <CountUp to={s.to} duration={1800} />
                  <span className="text-[0.45em] font-extrabold tracking-tight leading-none">
                    {s.suffix}
                  </span>
                </p>

                {/* Label — anchored to bottom of cell so rows stay symmetric.
                    whitespace-nowrap on desktop guarantees single-line labels;
                    on mobile we allow wrap because cells are much narrower. */}
                <p className="mt-auto pt-8 text-[13px] text-[var(--color-ivory-faint)] leading-[1.55] tracking-tight lg:whitespace-nowrap">
                  {s.label}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* ─── Two-column: principles (left) + portrait (right) ──────── */}
      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 mt-24 lg:mt-32">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left: principles list (editorial, hairline-divided rows — not cards) */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-10">
              How the work is built
            </Reveal>

            <ul className="flex flex-col">
              {principles.map((p, i) => {
                const num = (i + 1).toString().padStart(2, "0");
                return (
                  <motion.li
                    key={num}
                    initial={{ opacity: 0, y: reduced ? 0 : 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                    transition={{
                      duration: 0.9,
                      delay: i * 0.1,
                      ease: easeOutExpo,
                    }}
                    className="relative grid grid-cols-[80px_1fr] gap-6 lg:gap-10 py-10 lg:py-12"
                    style={{ borderTop: "1px solid var(--color-hairline)" }}
                  >
                    {/* Big oversized number */}
                    <span
                      className="accent text-[var(--color-gold)] leading-[0.85]"
                      style={{
                        fontSize: "clamp(56px, 6vw, 88px)",
                      }}
                    >
                      {num}
                    </span>

                    {/* Content */}
                    <div>
                      <h3 className="font-display font-extrabold leading-[1.15] tracking-[-0.02em] text-[clamp(22px,2.2vw,30px)] text-[var(--color-ivory)] max-w-[34ch]">
                        {p.title}
                      </h3>
                      <p className="mt-5 text-[var(--color-ivory-dim)] text-[16px] leading-[1.7] max-w-[58ch]">
                        {p.body}
                      </p>
                    </div>
                  </motion.li>
                );
              })}
              {/* Closing hairline */}
              <li
                aria-hidden
                className="h-px"
                style={{ background: "var(--color-hairline)" }}
              />
            </ul>
          </div>

          {/* Right: large founder portrait */}
          <div className="col-span-12 lg:col-span-5 lg:sticky lg:top-28">
            <motion.div
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 1.0, ease: easeOutExpo }}
              className="relative"
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
