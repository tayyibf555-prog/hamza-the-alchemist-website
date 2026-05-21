"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionMarker } from "./SectionMarker";

export function Manifesto() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative py-28 lg:py-40 overflow-hidden bloom-center-wide"
    >
      <SectionMarker index="III" label="The Thesis" />

      {/* Decorative oversized opening quote — soft, behind the headline */}
      <span
        aria-hidden
        className="pointer-events-none absolute font-display font-black select-none text-[var(--color-gold)]"
        style={{
          left: "50%",
          top: "8%",
          transform: "translateX(-50%)",
          fontSize: "clamp(180px, 22vw, 360px)",
          lineHeight: 1,
          opacity: 0.05,
          letterSpacing: "-0.1em",
        }}
      >
        &ldquo;
      </span>

      {/* Top + bottom hairlines */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "var(--color-hairline)" }}
      />
      <div
        aria-hidden
        className="absolute bottom-0 inset-x-0 h-px"
        style={{ background: "var(--color-hairline)" }}
      />

      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="eyebrow text-[var(--color-gold)] mb-10"
        >
          The Thesis
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: reduced ? 0 : 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-balance leading-[1.05] tracking-[-0.02em] text-[clamp(32px,4.4vw,64px)] text-[var(--color-ivory)]"
        >
          You don&apos;t need another{" "}
          <span className="text-[var(--color-ivory-faint)]">strategy</span>. You need a new{" "}
          <span className="accent text-[var(--color-gold)]">
            identity
          </span>
          . The reality you want is already available to the version of you that holds it as
          fact.
        </motion.h2>
      </div>
    </section>
  );
}
