"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { SectionMarker } from "./SectionMarker";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type Props = {
  /** Reserved for Calendly's `?name={invitee_first_name}` token (unused in copy for now). */
  name?: string;
};

/**
 * Confirmation hero shown after a meeting is booked via Calendly.
 *
 * Mirrors the wax-seal moment from the Inquiry component so the visual
 * language stays consistent. Headline reads "You're almost there..." to
 * keep the energy forward-facing rather than past-tense.
 */
export function ThankYouHero(_props: Props) {
  const reduced = useReducedMotion();

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
        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: easeOutExpo }}
          className="font-display font-extrabold leading-[1.0] tracking-[-0.025em] text-[clamp(40px,6.5vw,108px)] text-[var(--color-ivory)]"
        >
          <span className="block whitespace-nowrap">You&apos;re</span>
          <span className="block whitespace-nowrap">
            <span
              className="accent text-[var(--color-gold)]"
              style={{
                textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.4)",
              }}
            >
              almost there...
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
