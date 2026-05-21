"use client";

import { motion, useReducedMotion } from "framer-motion";

type Props = {
  /** Two-digit number like "01" */
  index: string;
  /** Short label, e.g. "OPEN", "IDENTITY", "PROOF" */
  label: string;
  /** Side to mount on */
  side?: "left" | "right";
};

/**
 * Vertical section index marker that sits on the edge of the viewport
 * inside a section. Reads like a chapter mark in a dossier.
 *
 *   01 ─ IDENTITY        (rotated 90° on the left edge)
 *
 * Place once at the top of each section.
 */
export function SectionMarker({ index, label, side = "left" }: Props) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, y: reduced ? 0 : 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      className={`pointer-events-none absolute top-[120px] hidden lg:flex ${
        side === "left" ? "left-5" : "right-5"
      } items-center gap-4`}
      style={{
        writingMode: "vertical-rl",
        transform: side === "left" ? "rotate(180deg)" : undefined,
      }}
    >
      <span className="accent text-[var(--color-gold)] text-[22px]">
        {index}
      </span>
      <span
        aria-hidden
        className="block w-px h-12"
        style={{ background: "var(--color-hairline)" }}
      />
      <span className="eyebrow text-[var(--color-ivory-faint)]">{label}</span>
    </motion.div>
  );
}
