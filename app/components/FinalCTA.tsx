"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TridentMark } from "./TridentMark";
import { CTAButton } from "./CTAButton";
import { Reveal } from "./Reveal";
import { SectionMarker } from "./SectionMarker";

export function FinalCTA() {
  const reduced = useReducedMotion();

  return (
    <section
      id="apply"
      className="relative py-40 lg:py-56 overflow-hidden bloom-bg-bottom"
    >
      <SectionMarker index="VII" label="The Invitation" />

      {/* Top hairline */}
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "var(--color-hairline)" }}
      />

      {/* Faint trident behind */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 0.06, scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[900px] text-[var(--color-gold)] pointer-events-none"
        style={{
          filter: "blur(0.5px) drop-shadow(0 0 80px oklch(0.78 0.165 78 / 0.6))",
        }}
      >
        <TridentMark className="w-full h-full" />
      </motion.div>

      <div className="relative mx-auto max-w-[1100px] px-6 lg:px-10 text-center">
        <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-10">
          The Invitation
        </Reveal>

        <motion.h2
          initial={{ opacity: 0, y: reduced ? 0 : 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-extrabold text-balance leading-[0.98] tracking-[-0.025em] text-[clamp(56px,8.5vw,140px)] text-[var(--color-ivory)]"
        >
          Become an
          <br />
          <span
            className="accent text-[var(--color-gold)]"
            style={{ textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.45)" }}
          >
            Alchemist
          </span>
        </motion.h2>

        <Reveal delay={0.3} as="p" className="mt-10 max-w-[52ch] mx-auto text-[var(--color-ivory-dim)] text-[18px] leading-[1.6]">
          Capacity is intentionally limited. Applications are reviewed individually. If the
          frequency is a match, we&apos;ll continue the conversation.
        </Reveal>

        <Reveal delay={0.42}>
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-6">
            <CTAButton size="large" href="#apply-form">
              Apply Privately
            </CTAButton>
            <CTAButton variant="ghost" href="#community">
              Or join the community
            </CTAButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
