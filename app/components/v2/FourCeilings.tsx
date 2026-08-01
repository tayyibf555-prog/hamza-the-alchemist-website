"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MirrorLine } from "./MirrorLine";
import { ApplyButton } from "../v1/ApplyButton";
import { TYPEFORM_URL } from "../../lib/links";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const CEILINGS = [
  {
    num: "01",
    name: "The Plateau",
    shown: "The number has not moved in four quarters.",
    running:
      "You changed the offer, the team and the hours. The ceiling was never in the business.",
  },
  {
    num: "02",
    name: "The Snapback",
    shown: "You hit the new level, then something breaks inside ninety days.",
    running:
      "Nothing broke. You returned to the number you believe you are worth.",
  },
  {
    num: "03",
    name: "The Numbness",
    shown: "The money grows and you feel nothing.",
    running:
      "The result arrived. The self that was supposed to receive it did not.",
  },
  {
    num: "04",
    name: "The Held Breath",
    shown: "You are waiting for it to be taken away.",
    running:
      "You are protecting a position you do not yet believe belongs to you.",
  },
];

/**
 * The Four Ceilings — the diagnostic proper.
 *
 * Every row is a mirror unit, so the page's grammar repeats: what he
 * says about the problem above the line, what is actually true below it.
 */
export function FourCeilings() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ borderTop: "1px solid var(--color-hairline)" }}
    >
      <div className="mx-auto max-w-[1080px] px-6 lg:px-10">
        {/* Header breaks the hero's centre axis on purpose */}
        <div className="mb-16 lg:mb-24">
          <p className="eyebrow text-[var(--color-gold)] mb-6">The Diagnostic</p>
          <h2 className="font-display font-extrabold text-balance leading-[1.04] tracking-[-0.025em] text-[clamp(30px,4.4vw,56px)] text-[var(--color-ivory)] max-w-[20ch]">
            There are four ceilings.{" "}
            <span className="accent text-[var(--color-gold)]">
              You are standing under one of them.
            </span>
          </h2>
        </div>

        <div className="flex flex-col gap-16 lg:gap-24">
          {CEILINGS.map((c, i) => (
            <motion.div
              key={c.num}
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.06,
                ease: easeOutExpo,
              }}
            >
              <div className="flex items-baseline gap-5 mb-6">
                <span className="accent text-[var(--color-gold)] text-[clamp(28px,3.2vw,44px)] leading-none">
                  {c.num}
                </span>
                <span className="eyebrow text-[11px] text-[var(--color-ivory-faint)]">
                  {c.name}
                </span>
              </div>

              <MirrorLine
                as="h3"
                align="left"
                size="small"
                above={
                  <span className="font-display font-bold text-[clamp(20px,2.6vw,32px)] leading-[1.2]">
                    {c.shown}
                  </span>
                }
                below={c.running}
              />
            </motion.div>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-center text-center">
          <ApplyButton href={TYPEFORM_URL}>
            Apply For A Private Consultation
          </ApplyButton>
          <p className="mt-4 text-[13px] text-[var(--color-ivory-faint)]">
            If one of those four landed, that is the conversation.
          </p>
        </div>
      </div>
    </section>
  );
}
