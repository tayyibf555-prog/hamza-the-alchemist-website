"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionMarker } from "./SectionMarker";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type Stat = { value: string; label: string };
type Principle = { title: string; body: string };

const stats: Stat[] = [
  { value: "8 figures", label: "Combined revenue scaled by clients" },
  { value: "80+", label: "Operators worked with privately" },
  { value: "6 years", label: "In closed-room practice" },
  { value: "100%", label: "Application only" },
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
          <div className="mt-14 lg:mt-16 mx-auto max-w-[62ch] flex flex-col gap-7 text-center text-[var(--color-ivory-dim)] text-[17px] leading-[1.7]">
            <p>
              Six years ago I left a corporate role with nothing but a thesis: that
              every outcome an operator produces is downstream of an identity they
              never chose consciously. I tested it privately, with myself first,
              then with a handful of founders who were willing to do uncomfortable
              work. The results were not subtle.
            </p>
            <p>
              I remember exactly what it feels like to know what to do and still
              not do it. To set a goal and watch yourself walk it back. To
              hire a coach, read the books, do the visualizations, and end the
              year roughly where you started. That gap, between knowing and
              becoming, is the only thing I work on now.
            </p>
            <p>
              Today this is a private practice. Founders managing $4M to $80M+.
              Day traders with eight-figure portfolios. Creators with audiences
              in the millions. A small number of operators per quarter, each
              engagement private and individual. The frequency you operate at
              is the ceiling you&apos;ll hit, and I&apos;ve never seen anyone
              break their ceiling without first dissolving the identity that
              built it.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ─── Stat band ──────────────────────────────────────────────── */}
      <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 mt-24 lg:mt-32">
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{
            borderTop: "1px solid var(--color-hairline)",
            borderBottom: "1px solid var(--color-hairline)",
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: reduced ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: easeOutExpo,
              }}
              className="relative py-10 lg:py-14 px-6 lg:px-10"
              style={{
                borderRight:
                  i < stats.length - 1 ? "1px solid var(--color-hairline)" : "none",
              }}
            >
              {/* Subtle gold tick at top of each stat for rhythm */}
              <span
                aria-hidden
                className="absolute top-0 left-0 w-6 h-px"
                style={{ background: "var(--color-gold)" }}
              />
              <p className="font-display font-extrabold leading-[1.0] tracking-[-0.025em] text-[clamp(40px,4.4vw,68px)] text-[var(--color-ivory)]">
                {s.value}
              </p>
              <p className="mt-4 text-[14px] text-[var(--color-ivory-faint)] leading-[1.5] max-w-[26ch]">
                {s.label}
              </p>
            </motion.div>
          ))}
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
              {/* Hairline-framed portrait area, vertical 3:4 */}
              <div
                className="relative aspect-[3/4] overflow-hidden"
                style={{ border: "1px solid var(--color-hairline)" }}
              >
                {/* Placeholder: replace this gradient with <Image src="/portrait.jpg" /> */}
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 35%, oklch(0.30 0.04 75) 0%, oklch(0.12 0.012 70) 70%)",
                  }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 50%, oklch(0.08 0.010 70 / 0.85) 100%)",
                  }}
                />

                {/* Lower-left annotation block over the photo */}
                <div className="absolute bottom-0 inset-x-0 p-7">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span
                      className="block w-8 h-px"
                      style={{ background: "var(--color-gold)" }}
                    />
                    <span className="eyebrow text-[var(--color-ivory-faint)]">
                      Portrait · 2026
                    </span>
                  </div>
                  <p className="font-display font-extrabold text-[22px] text-[var(--color-ivory)] leading-tight">
                    Hamza
                  </p>
                  <p className="accent text-[var(--color-gold)] text-[15px] leading-tight mt-1">
                    The Alchemist
                  </p>
                </div>
              </div>

              {/* Offset hairline rectangle — gives the frame a deliberate
                  asymmetric weight; no decoration for its own sake. */}
              <div
                aria-hidden
                className="absolute -bottom-3 -right-3 w-2/3 h-2/3 pointer-events-none -z-10"
                style={{ border: "1px solid var(--color-hairline)" }}
              />

              {/* Caption under the photo — specific, human */}
              <div className="mt-7 flex items-baseline gap-4 flex-wrap">
                <span className="accent text-[var(--color-gold)] text-[16px]">
                  Mid-session, summer 2026.
                </span>
                <span className="eyebrow text-[var(--color-ivory-faint)]">
                  Replace with a real photo
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
