"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionMarker } from "./SectionMarker";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const forList = [
  "Founders past their first million in revenue.",
  "Operators ready to confront identity, not chase tactics.",
  "Day traders, creators, and executives who can hold a private room.",
  "Anyone willing to dissolve before they reform.",
];

const notForList = [
  "First-time entrepreneurs looking for playbooks.",
  "Anyone seeking validation for the current path.",
  "People hiring a coach for accountability.",
  "Anyone uncomfortable with silence in a session.",
];

function MarkFor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" />
      <path
        d="M4.5 8.5 L7 11 L11.5 5.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MarkNotFor({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} fill="none" aria-hidden>
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <path
        d="M5 8 L11 8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ListColumn({
  heading,
  accent,
  items,
  variant,
  delay,
}: {
  heading: string;
  accent: string;
  items: string[];
  variant: "for" | "not";
  delay: number;
}) {
  const reduced = useReducedMotion();
  const Mark = variant === "for" ? MarkFor : MarkNotFor;
  const color =
    variant === "for"
      ? "text-[var(--color-gold)]"
      : "text-[var(--color-ivory-faint)]";

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay, ease: easeOutExpo }}
      className="relative"
    >
      {/* Column header */}
      <div className="flex items-baseline gap-4 mb-10">
        <span className={`accent text-[36px] leading-none ${color}`}>
          {heading}
        </span>
        <span
          aria-hidden
          className="block w-12 h-px"
          style={{ background: "var(--color-hairline)" }}
        />
        <span className="eyebrow text-[var(--color-ivory-faint)]">{accent}</span>
      </div>

      {/* List */}
      <ul className="flex flex-col">
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: reduced ? 0 : -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
            transition={{
              duration: 0.7,
              delay: delay + 0.1 + i * 0.08,
              ease: easeOutExpo,
            }}
            className="grid grid-cols-[24px_1fr] gap-5 py-6"
            style={{ borderTop: "1px solid var(--color-hairline)" }}
          >
            <span className={`mt-1 ${color}`}>
              <Mark className="w-4 h-4" />
            </span>
            <span
              className={`text-[17px] leading-[1.5] ${
                variant === "for"
                  ? "text-[var(--color-ivory)]"
                  : "text-[var(--color-ivory-faint)]"
              }`}
            >
              {item}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export function TermsOfEntry() {
  return (
    <section
      id="terms"
      className="relative py-32 lg:py-44 overflow-hidden"
      style={{ borderBottom: "1px solid var(--color-hairline)" }}
    >
      <SectionMarker index="V" label="Terms of Entry" />

      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        {/* Section header */}
        <div className="grid grid-cols-12 gap-8 items-end mb-20 lg:mb-28">
          <Reveal as="div" className="col-span-12 md:col-span-7">
            <p className="eyebrow text-[var(--color-ivory-faint)] mb-6">
              Terms of Entry
            </p>
            <h2 className="font-display font-extrabold leading-[0.98] tracking-[-0.025em] text-[clamp(48px,6.4vw,104px)] text-[var(--color-ivory)]">
              Terms of{" "}
              <span className="accent text-[var(--color-gold)]">entry.</span>
            </h2>
          </Reveal>

          <Reveal
            delay={0.15}
            as="p"
            className="hidden md:block col-span-12 md:col-span-4 md:col-start-9 text-[var(--color-ivory-dim)] text-[16px] leading-[1.65] max-w-[42ch]"
          >
            Admission is selective. The work is the same regardless; what
            changes is whether the operator is positioned to receive it. Read
            both columns before you apply.
          </Reveal>
        </div>

        {/* Two-column qualification grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          <ListColumn
            heading="For"
            accent="Admitted"
            items={forList}
            variant="for"
            delay={0}
          />

          {/* Vertical divider on desktop */}
          <div className="relative">
            <span
              aria-hidden
              className="hidden lg:block absolute -left-10 top-0 bottom-0 w-px"
              style={{ background: "var(--color-hairline)" }}
            />
            <ListColumn
              heading="Not for"
              accent="Declined"
              items={notForList}
              variant="not"
              delay={0.1}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
