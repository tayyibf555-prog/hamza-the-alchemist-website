"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionMarker } from "./SectionMarker";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type Props = {
  /** Optional first name passed by Calendly via `?name={invitee_first_name}`. */
  name?: string;
};

/**
 * Confirmation hero shown after a meeting is booked via Calendly.
 *
 * Mirrors the wax-seal moment from the Inquiry component so the visual
 * language stays consistent — the seal is the user's signal that
 * something private has been received. Layout intentionally quiet:
 * single centered statement, three-step timeline of what happens next,
 * one optional next step and a return link.
 */
export function ThankYouHero({ name }: Props) {
  const reduced = useReducedMotion();
  const operator = (name?.trim() || "operator").replace(/[<>]/g, "");

  return (
    <section className="relative pt-[160px] lg:pt-[220px] pb-24 lg:pb-32 overflow-hidden bloom-bg">
      <SectionMarker index="IX" label="Confirmation" />

      {/* Top-right folio marker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: easeOutExpo }}
        className="hidden md:flex absolute top-[100px] right-10 z-20 flex-col items-end gap-2"
      >
        <span className="accent text-[var(--color-gold)] text-[15px]">
          Folio · Confirmation
        </span>
        <span
          aria-hidden
          className="block w-10 h-px bg-[var(--color-hairline)]"
        />
        <span className="eyebrow text-[var(--color-ivory-faint)]">
          Sealed · Awaiting the call
        </span>
      </motion.div>

      {/* Decorative oversized Roman numeral drifting behind */}
      <span
        aria-hidden
        className="pointer-events-none absolute font-display font-black select-none text-[var(--color-gold)]"
        style={{
          left: "50%",
          top: "6%",
          transform: "translateX(-50%)",
          fontSize: "clamp(220px, 28vw, 480px)",
          lineHeight: 1,
          opacity: 0.04,
          letterSpacing: "-0.06em",
        }}
      >
        IX
      </span>

      <div className="relative mx-auto max-w-[920px] px-6 lg:px-10 text-center">
        {/* Wax-seal mark — same family as Inquiry's confirmation seal */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, delay: 0.15, ease: easeOutExpo }}
          className="mx-auto mb-12 w-24 h-24 rounded-full flex items-center justify-center"
          style={{
            background:
              "radial-gradient(circle, oklch(0.62 0.14 70) 0%, oklch(0.42 0.10 72) 100%)",
            boxShadow:
              "0 0 0 1px oklch(0.78 0.165 78 / 0.5), 0 0 40px -4px oklch(0.78 0.165 78 / 0.55)",
          }}
        >
          <svg
            viewBox="0 0 32 32"
            className="w-11 h-11 text-[var(--color-ink-deep)]"
            fill="none"
            aria-hidden
          >
            <path
              d="M7 17 L13 22 L25 10"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>

        <Reveal
          as="p"
          className="eyebrow text-[var(--color-gold)] mb-8"
        >
          Admission Confirmed
        </Reveal>

        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: easeOutExpo }}
          className="font-display font-extrabold leading-[1.0] tracking-[-0.025em] text-[clamp(40px,6.5vw,108px)] text-[var(--color-ivory)]"
        >
          <span className="block whitespace-nowrap">
            The call is{" "}
            <span
              className="accent text-[var(--color-gold)]"
              style={{
                textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.4)",
              }}
            >
              yours,
            </span>
          </span>
          <span className="block whitespace-nowrap">
            <span
              className="accent text-[var(--color-gold)]"
              style={{
                textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.4)",
              }}
            >
              {operator}.
            </span>
          </span>
        </motion.h1>

        <Reveal
          delay={0.4}
          as="p"
          className="mt-10 max-w-[56ch] mx-auto text-[var(--color-ivory-dim)] text-[18px] leading-[1.65]"
        >
          A calendar invite is already on its way. Save it. Treat it as
          a meeting with the version of yourself you&apos;re building.
        </Reveal>
      </div>
    </section>
  );
}
