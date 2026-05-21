"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionMarker } from "./SectionMarker";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type Phase = {
  numeral: string;
  name: string;
  oneLine: string;
  body: string;
};

const phases: Phase[] = [
  {
    numeral: "I",
    name: "Dissolution",
    oneLine: "The old identity dissolves.",
    body: "The first phase is honest. What you've been operating from is identified, surfaced, and let go. Not analyzed. Released. Most operators have never sat in the discomfort of not being who they thought they were.",
  },
  {
    numeral: "II",
    name: "Reconstruction",
    oneLine: "The new identity is built underneath strategy.",
    body: "Strategy works at the conscious level. Identity work happens beneath it. The new architecture is installed where the old patterns lived, the place that runs you whether you're paying attention or not.",
  },
  {
    numeral: "III",
    name: "Coagulation",
    oneLine: "The outcome becomes inevitable.",
    body: "What was internal becomes external. The new identity holds under pressure, in conflict, in opportunity. Outcomes stop being efforts and start being byproducts. This is where most coaching ends and where this work actually begins.",
  },
];

function PhaseRow({ phase, index }: { phase: Phase; index: number }) {
  const reduced = useReducedMotion();
  const isLast = index === phases.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      transition={{ duration: 0.9, delay: index * 0.1, ease: easeOutExpo }}
      className="relative grid grid-cols-[120px_1fr] md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start"
    >
      {/* Oversized typographic numeral — no glyph, no medallion */}
      <div className="relative">
        <span
          className="accent text-[var(--color-gold)] block leading-[0.85] tracking-tight"
          style={{
            fontSize: "clamp(96px, 12vw, 200px)",
          }}
        >
          {phase.numeral}
        </span>

        {/* Subtle vertical connector to next phase */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{ duration: 1.4, delay: 0.3, ease: easeOutExpo }}
            className="absolute left-0 w-px origin-top mt-6"
            style={{
              top: "100%",
              height: "100px",
              background:
                "linear-gradient(180deg, var(--color-hairline) 0%, transparent 100%)",
            }}
          />
        )}
      </div>

      {/* Phase copy */}
      <div className={isLast ? "pb-2" : "pb-20 md:pb-28"}>
        <p className="eyebrow text-[var(--color-ivory-faint)] mb-5">
          Phase {phase.numeral}
        </p>

        <h3 className="font-display font-extrabold leading-[1.0] tracking-[-0.025em] text-[clamp(36px,5vw,72px)] text-[var(--color-ivory)]">
          {phase.name}
        </h3>

        <p className="mt-6 text-[var(--color-ivory)] text-[19px] leading-[1.45] max-w-[36ch] font-medium">
          {phase.oneLine}
        </p>

        <p className="mt-5 text-[var(--color-ivory-dim)] text-[16px] leading-[1.7] max-w-[58ch]">
          {phase.body}
        </p>
      </div>
    </motion.div>
  );
}

export function Method() {
  return (
    <section
      id="method"
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{
        borderTop: "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <SectionMarker index="IV" label="The Method" />

      {/* Section header */}
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 mb-24 lg:mb-32">
        <div className="grid grid-cols-12 gap-8 items-end">
          <Reveal as="div" className="col-span-12 md:col-span-7">
            <p className="eyebrow text-[var(--color-gold)] mb-6">The Method</p>
            <h2 className="font-display font-extrabold leading-[0.96] tracking-[-0.025em] text-[clamp(48px,7vw,112px)] text-[var(--color-ivory)]">
              The{" "}
              <span className="accent text-[var(--color-gold)]">
                Transmutation
              </span>
            </h2>
          </Reveal>

          <Reveal
            delay={0.15}
            as="p"
            className="hidden md:block col-span-12 md:col-span-4 md:col-start-9 text-[var(--color-ivory-dim)] text-[16px] leading-[1.65] max-w-[42ch]"
          >
            A three-phase protocol developed over a decade of private work. The
            same sequence runs every engagement; what changes is the operator.
          </Reveal>
        </div>
      </div>

      {/* Phases */}
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        {phases.map((p, i) => (
          <PhaseRow key={p.numeral} phase={p} index={i} />
        ))}
      </div>

      {/* Footer line — quiet closer, no Latin */}
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10 mt-24 lg:mt-32">
        <div
          className="pt-10"
          style={{ borderTop: "1px solid var(--color-hairline)" }}
        >
          <p className="text-[var(--color-ivory-dim)] text-[16px] leading-[1.7] max-w-[58ch]">
            The sequence is non-negotiable. You can&apos;t coagulate something
            you haven&apos;t reconstructed, and you can&apos;t reconstruct
            something you haven&apos;t dissolved. Most operators try to start
            at phase three.
          </p>
        </div>
      </div>
    </section>
  );
}
