"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RECEIPTS, RECEIPT_SLOTS } from "../../lib/vsl-content";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const CORRECTIONS = [
  {
    assumption: "You think this is mindset work.",
    correction: {
      before: "Mindset is what you say to yourself. Identity is ",
      gold: "what you will let yourself hold",
      after: ".",
    },
  },
  {
    assumption: "You think this is another strategist.",
    correction: {
      before: "You do not need a better plan. You have already ignored ",
      gold: "three good ones",
      after: ".",
    },
  },
  {
    assumption: "You think you can think your way out of it.",
    correction: {
      before: "The ceiling was not set by thinking. It was set ",
      gold: "below the level thinking reaches",
      after: ".",
    },
  },
];

/** The Receipts — evidence, deliberately quieter than the argument. */
export function Receipts() {
  const reduced = useReducedMotion();
  const cells = RECEIPTS.length > 0 ? RECEIPTS : Array(RECEIPT_SLOTS).fill(null);

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ borderTop: "1px solid var(--color-hairline)" }}
    >
      <div className="mx-auto max-w-[1080px] px-6 lg:px-10">
        <div className="text-center mb-14">
          <h2 className="font-display font-extrabold text-balance leading-[1.06] tracking-[-0.02em] text-[clamp(24px,3.2vw,40px)] text-[var(--color-ivory)]">
            What it sounds like{" "}
            <span className="accent text-[var(--color-gold)]">
              on the other side of the line.
            </span>
          </h2>
          <p className="mt-5 text-[14px] text-[var(--color-ivory-faint)]">
            Unedited. Sent after the work, not asked for.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          className="columns-2 lg:columns-3 gap-4"
        >
          {cells.map((src: string | null, i: number) => (
            <div
              key={i}
              className="break-inside-avoid mb-4 relative rounded-[3px] overflow-hidden"
              style={{
                border: "1px solid var(--color-hairline)",
                background: "oklch(0.07 0.008 70)",
                // Staggered heights so the wall reads as real artifacts
                aspectRatio: i % 3 === 0 ? "3 / 4" : i % 3 === 1 ? "4 / 5" : "1 / 1",
              }}
            >
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt="Client message"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-40">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path
                      d="M4 5h16v11H9l-5 4V5z"
                      stroke="var(--color-gold)"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="eyebrow text-[9px] text-[var(--color-ivory-faint)]">
                    Receipt {i + 1}
                  </span>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {RECEIPTS.length === 0 && (
          <p className="mt-5 text-center text-[12px] text-[var(--color-ivory-faint)] italic">
            Placeholder cells. Drop the client-message screenshots into
            /public/receipts and list them in vsl-content.ts to fill the wall.
          </p>
        )}
      </div>
    </section>
  );
}

/** What This Is Not — three corrections, same mirror grammar. */
export function NotThis() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ borderTop: "1px solid var(--color-hairline)" }}
    >
      <div className="mx-auto max-w-[760px] px-6 lg:px-10">
        <p className="eyebrow text-[var(--color-gold)] text-center mb-16">
          What This Is Not
        </p>

        <div className="flex flex-col gap-16 lg:gap-20">
          {CORRECTIONS.map((c, i) => (
            <motion.div
              key={c.assumption}
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
              transition={{ duration: 0.9, delay: i * 0.07, ease: easeOutExpo }}
            >
              <p className="font-display font-semibold text-[clamp(19px,2.2vw,24px)] text-[var(--color-ivory-faint)] leading-[1.3]">
                {c.assumption}
              </p>
              <div
                aria-hidden
                className="my-5 h-px w-full"
                style={{ background: "oklch(0.78 0.165 78 / 0.55)" }}
              />
              <p className="text-[var(--color-ivory)] text-[17px] lg:text-[19px] leading-[1.6]">
                {c.correction.before}
                <span className="accent text-[var(--color-gold)]">
                  {c.correction.gold}
                </span>
                {c.correction.after}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
