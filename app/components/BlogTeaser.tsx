"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionMarker } from "./SectionMarker";

type Entry = {
  num: string;
  date: string;
  readMins: string;
  title: string;
  excerpt: string;
  href: string;
};

const entries: Entry[] = [
  {
    num: "N°01",
    date: "Jan 27, 2026",
    readMins: "7 min",
    title: "Why You're Blocking the Very Life You're Asking For",
    excerpt:
      "Most people don't fail to manifest because they're doing something wrong. They fail because they keep returning to an identity that can't hold the outcome.",
    href: "#blog",
  },
  {
    num: "N°02",
    date: "Jan 10, 2026",
    readMins: "9 min",
    title: "Why Nothing Changes — Even When You Pray, Plan, and Try",
    excerpt:
      "Most people don't fail because they lack effort or faith. They fail because they're trying to change results without changing the operating system underneath.",
    href: "#blog",
  },
  {
    num: "N°03",
    date: "Jan 1, 2026",
    readMins: "6 min",
    title: "Why Most People Never Change (Even When They Know the Truth)",
    excerpt:
      "Knowing the truth isn't enough. Thinking positively isn't enough. Even identity work fails if it's done in the wrong state. This is the part nobody teaches.",
    href: "#blog",
  },
];

function EntryCard({ entry, index }: { entry: Entry; index: number }) {
  const reduced = useReducedMotion();

  return (
    <motion.a
      href={entry.href}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col h-full pt-10"
      style={{ borderTop: "1px solid var(--color-hairline)" }}
    >
      {/* Massive ghost numeral behind */}
      <span
        aria-hidden
        className="pointer-events-none absolute font-display font-black select-none -top-2 right-0"
        style={{
          fontSize: "clamp(80px, 9vw, 140px)",
          lineHeight: 0.9,
          letterSpacing: "-0.06em",
          WebkitTextStroke: "1px var(--color-hairline)",
          color: "transparent",
          opacity: 0.6,
        }}
      >
        {(index + 1).toString().padStart(2, "0")}
      </span>

      <div className="relative flex items-center gap-4 mb-7">
        <span className="font-display font-black text-[var(--color-gold)] text-[14px] tracking-tight">
          {entry.num}
        </span>
        <span aria-hidden className="block w-6 h-px bg-[var(--color-hairline)]" />
        <span className="eyebrow text-[var(--color-ivory-faint)]">{entry.date}</span>
        <span aria-hidden className="block w-1 h-1 rounded-full bg-[var(--color-hairline)]" />
        <span className="eyebrow text-[var(--color-ivory-faint)]">{entry.readMins}</span>
      </div>

      <h3 className="font-display font-extrabold leading-[1.08] tracking-[-0.02em] text-[clamp(22px,2vw,28px)] text-[var(--color-ivory)] group-hover:text-[var(--color-gold-soft)] transition-colors duration-300" style={{ transitionTimingFunction: "var(--ease-out-expo)" }}>
        {entry.title}
      </h3>

      <p className="mt-5 text-[15px] text-[var(--color-ivory-dim)] leading-[1.6] flex-1">
        {entry.excerpt}
      </p>

      <span className="mt-8 eyebrow text-[var(--color-gold)] inline-flex items-center gap-2">
        Read
        <span
          aria-hidden
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
        >
          ↗
        </span>
      </span>
    </motion.a>
  );
}

export function BlogTeaser() {
  return (
    <section
      id="readings"
      className="relative py-32 lg:py-44"
      style={{
        borderTop: "1px solid var(--color-hairline)",
      }}
    >
      <SectionMarker index="VIII" label="Readings" />

      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        <div className="grid grid-cols-12 gap-8 items-end mb-16 lg:mb-20">
          <Reveal as="div" className="col-span-12 md:col-span-8">
            <p className="eyebrow text-[var(--color-ivory-faint)] mb-6">
              Reality Architecture Training · Latest entries
            </p>
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.025em] text-[clamp(40px,5.6vw,88px)] text-[var(--color-ivory)]">
              Control your{" "}
              <span className="text-[var(--color-gold)]">identity.</span>
              <br />
              Control your{" "}
              <span className="text-[var(--color-gold)]">reality.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.15} as="div" className="col-span-12 md:col-span-3 md:col-start-10">
            <p className="text-[var(--color-ivory-dim)] text-[15px] leading-[1.6] max-w-[34ch]">
              Weekly frameworks on identity, leverage, and subconscious mechanics
              — without mysticism.
            </p>
            <a
              href="#blog"
              className="mt-6 inline-flex items-center gap-2 eyebrow text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors duration-200"
            >
              View Archive
              <span aria-hidden>→</span>
            </a>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
          {entries.map((e, i) => (
            <EntryCard key={e.num} entry={e} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
