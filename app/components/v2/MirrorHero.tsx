"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MirrorLine } from "./MirrorLine";
import { ApplyButton } from "../v1/ApplyButton";
import { VslPlayer } from "../VslPlayer";
import { APPLY_URL } from "../../lib/links";
import { VSL_SRC } from "../../lib/vsl-content";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const DIAGNOSTIC = [
  "The number has not moved in four quarters.",
  "You hit the new level, then something breaks inside ninety days.",
  "The money grows and you feel nothing.",
];

/**
 * V2 hero — recognition before claim.
 *
 * The visitor meets himself in three sentences before a single promise
 * is made, so by the time the video starts he is not evaluating an offer,
 * he is looking for a diagnosis he has already agreed with.
 */
export function MirrorHero({
  ctaRef,
}: {
  /** Sentinel for the sticky rail — the hero's apply block. */
  ctaRef?: React.RefObject<HTMLDivElement | null>;
}) {
  const reduced = useReducedMotion();

  return (
    <section className="relative pt-28 lg:pt-36 pb-20 lg:pb-28 overflow-hidden">
      <div className="mx-auto max-w-[980px] px-6 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
          className="eyebrow text-[var(--color-gold)] text-center text-[11px] leading-[1.7] max-w-[46ch] mx-auto"
        >
          For 6&ndash;7 Figure/Month Entrepreneurs Who Have Hit Something They
          Cannot Name
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.28, ease: easeOutExpo }}
          className="mt-12"
        >
          <MirrorLine
            as="h1"
            size="large"
            above={
              <>
                Your Revenue Stopped Growing At The Exact Point{" "}
                <span
                  className="accent text-[var(--color-gold)]"
                  style={{
                    textShadow: "0 0 70px oklch(0.78 0.165 78 / 0.45)",
                  }}
                >
                  You Did.
                </span>
              </>
            }
            below="And you have known that for longer than you have said it out loud."
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.5, ease: easeOutExpo }}
          className="mt-14 max-w-[60ch] mx-auto text-center text-[var(--color-ivory-dim)] text-[17px] lg:text-[18px] leading-[1.7]"
        >
          You have the offer, the team and the hours. The number still will not
          move. That is not a strategy problem. It is a ceiling set by what you
          will let yourself hold, and it stays exactly where it is until it is
          removed.
        </motion.p>

        {/* Diagnostic strip — the recognition mechanism */}
        <motion.ul
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease: easeOutExpo }}
          className="mt-16 max-w-[680px] mx-auto flex flex-col"
          style={{ borderTop: "1px solid var(--color-hairline)" }}
        >
          {DIAGNOSTIC.map((line, i) => (
            <motion.li
              key={line}
              initial={{ opacity: 0, x: reduced ? 0 : -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.85 + i * 0.12,
                ease: easeOutExpo,
              }}
              className="flex items-start gap-4 py-5"
              style={{ borderBottom: "1px solid var(--color-hairline)" }}
            >
              <span
                aria-hidden
                className="mt-2.5 block w-1.5 h-1.5 rounded-full shrink-0"
                style={{ background: "var(--color-gold)" }}
              />
              <span className="text-[var(--color-ivory)] text-[16px] lg:text-[17px] leading-[1.6]">
                {line}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.3, ease: easeOutExpo }}
          className="mt-8 text-center accent text-[var(--color-gold)] text-[clamp(19px,2.2vw,26px)]"
        >
          You already know which one you are.
        </motion.p>

        {/* The video */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 1.5, ease: easeOutExpo }}
          className="mt-20"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="eyebrow text-[11px] text-[var(--color-gold)] shrink-0">
              Step One / Watch
            </span>
            <span
              aria-hidden
              className="flex-1 h-px"
              style={{ background: "var(--color-hairline)" }}
            />
          </div>

          <VslPlayer src={VSL_SRC} />

          {/* Step Two — the ask, at peak warmth.
              Doubles as the sticky rail's sentinel: the rail only appears
              once this CTA has scrolled away, so two golds never compete. */}
          <div className="mt-12" ref={ctaRef}>
            <div className="flex items-center gap-4 mb-8">
              <span className="eyebrow text-[11px] text-[var(--color-gold)] shrink-0">
                Step Two / Apply
              </span>
              <span
                aria-hidden
                className="flex-1 h-px"
                style={{ background: "var(--color-hairline)" }}
              />
            </div>
            <div className="flex flex-col items-center text-center">
              <ApplyButton href={APPLY_URL} size="large">
                Apply For A Private Consultation
              </ApplyButton>
              <p className="mt-4 text-[13px] text-[var(--color-ivory-faint)]">
                No cost. No pitch. One call, 45 minutes.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
