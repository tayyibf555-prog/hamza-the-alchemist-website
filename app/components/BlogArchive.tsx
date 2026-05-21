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

const latest: Entry[] = [
  {
    num: "N°01",
    date: "Jan 27, 2026",
    readMins: "7 min",
    title: "Why You're Blocking the Very Life You're Asking For",
    excerpt:
      "Most people don't fail to manifest because they're doing something wrong. They fail because they keep returning to an identity that can't hold the outcome.",
    href: "#blog-01",
  },
  {
    num: "N°02",
    date: "Jan 10, 2026",
    readMins: "9 min",
    title: "Why Nothing Changes — Even When You Pray, Plan, and Try",
    excerpt:
      "Most people don't fail because they lack effort or faith. They fail because they're trying to change results without changing the operating system underneath.",
    href: "#blog-02",
  },
  {
    num: "N°03",
    date: "Jan 1, 2026",
    readMins: "6 min",
    title: "Why Most People Never Change (Even When They Know the Truth)",
    excerpt:
      "Knowing the truth isn't enough. Thinking positively isn't enough. Even identity work fails if it's done in the wrong state. This is the part nobody teaches.",
    href: "#blog-03",
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

      <h3
        className="font-display font-extrabold leading-[1.08] tracking-[-0.02em] text-[clamp(22px,2vw,28px)] text-[var(--color-ivory)] group-hover:text-[var(--color-gold-soft)] transition-colors duration-300"
        style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
      >
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

function LockedCard({ index }: { index: number }) {
  return (
    <div
      className="group relative flex flex-col h-full pt-10 opacity-60 hover:opacity-80 transition-opacity duration-300"
      style={{ borderTop: "1px solid var(--color-hairline)" }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute font-display font-black select-none -top-2 right-0"
        style={{
          fontSize: "clamp(80px, 9vw, 140px)",
          lineHeight: 0.9,
          letterSpacing: "-0.06em",
          WebkitTextStroke: "1px var(--color-hairline)",
          color: "transparent",
          opacity: 0.4,
        }}
      >
        {(index + 4).toString().padStart(2, "0")}
      </span>

      <div className="flex items-center gap-3 mb-6">
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden
          className="text-[var(--color-ivory-faint)]"
        >
          <path
            d="M3 6V4a4 4 0 1 1 8 0v2"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <rect
            x="2"
            y="6"
            width="10"
            height="7"
            rx="1"
            stroke="currentColor"
            strokeWidth="1.4"
          />
        </svg>
        <span className="eyebrow text-[var(--color-ivory-faint)]">Subscriber only</span>
      </div>

      {/* Skeleton lines */}
      <div className="space-y-3">
        <div
          className="h-4 w-[80%]"
          style={{ background: "var(--color-hairline)" }}
        />
        <div
          className="h-4 w-[64%]"
          style={{ background: "var(--color-hairline)" }}
        />
      </div>

      <div className="mt-6 flex items-center justify-center h-12 mb-2">
        <span
          className="inline-flex items-center justify-center w-9 h-9 rounded-full"
          style={{
            border: "1px solid var(--color-hairline)",
            background: "var(--color-ink)",
          }}
          aria-hidden
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-[var(--color-ivory-faint)]">
            <path
              d="M3 6V4a4 4 0 1 1 8 0v2"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <rect
              x="2"
              y="6"
              width="10"
              height="7"
              rx="1"
              stroke="currentColor"
              strokeWidth="1.4"
            />
          </svg>
        </span>
      </div>

      <div className="space-y-3">
        <div
          className="h-3 w-[92%]"
          style={{ background: "var(--color-hairline)", opacity: 0.6 }}
        />
        <div
          className="h-3 w-[78%]"
          style={{ background: "var(--color-hairline)", opacity: 0.6 }}
        />
        <div
          className="h-3 w-[40%]"
          style={{ background: "var(--color-hairline)", opacity: 0.6 }}
        />
      </div>

      <span className="mt-auto pt-8 eyebrow text-[var(--color-ivory-faint)]">
        Subscribe to unlock
      </span>
    </div>
  );
}

export function BlogArchive() {
  return (
    <section
      className="relative py-32 lg:py-40"
      style={{ borderTop: "1px solid var(--color-hairline)" }}
    >
      <SectionMarker index="II" label="Latest Entries" />

      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        {/* Section heading */}
        <div className="text-center mb-20 lg:mb-24">
          <Reveal as="p" className="eyebrow text-[var(--color-ivory-faint)] mb-4">
            Latest Entries
          </Reveal>
          <Reveal>
            <div aria-hidden className="mx-auto w-12 h-px bg-[var(--color-gold)]" />
          </Reveal>
        </div>

        {/* Free entries */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
          {latest.map((e, i) => (
            <EntryCard key={e.num} entry={e} index={i} />
          ))}
        </div>

        {/* View archive */}
        <Reveal delay={0.2} className="mt-20 lg:mt-24 text-center">
          <a
            href="#archive"
            className="inline-flex items-center gap-2 eyebrow text-[var(--color-ivory)] hover:text-[var(--color-gold)] transition-colors duration-200"
          >
            View Archive
            <span aria-hidden>→</span>
          </a>
        </Reveal>

        {/* Subscriber-only band */}
        <div className="mt-32 lg:mt-44">
          <div className="text-center mb-16">
            <Reveal>
              <div className="inline-flex items-center gap-4">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                  className="text-[var(--color-ivory-faint)]"
                >
                  <path
                    d="M3 6V4a4 4 0 1 1 8 0v2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <rect
                    x="2"
                    y="6"
                    width="10"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
                <span className="eyebrow text-[var(--color-ivory-faint)]">
                  Subscriber Only
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                  className="text-[var(--color-ivory-faint)]"
                >
                  <path
                    d="M3 6V4a4 4 0 1 1 8 0v2"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                  <rect
                    x="2"
                    y="6"
                    width="10"
                    height="7"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  />
                </svg>
              </div>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
            {[0, 1, 2].map((i) => (
              <LockedCard key={i} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
