"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TridentMark } from "../TridentMark";
import { TYPEFORM_URL } from "../../lib/links";
import { META_DISCLAIMER } from "../../lib/vsl-content";
import { ApplyButton } from "./ApplyButton";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * Step 02 close — the page bookends in the same room it opened in,
 * same hairline band treatment as the Screening Room.
 */
export function CloseBand() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative"
      style={{
        background: "var(--color-ink-deep)",
        borderTop: "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <div className="mx-auto max-w-[720px] px-6 lg:px-10 py-28 lg:py-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
        >
          <div className="flex justify-center mb-10">
            <span
              className="text-[var(--color-gold)] w-[38px] h-[58px]"
              style={{ opacity: 0.4 }}
            >
              <TridentMark className="w-full h-full" color="var(--color-gold)" />
            </span>
          </div>

          <h2 className="font-display font-extrabold text-balance leading-[1.04] tracking-[-0.02em] text-[clamp(30px,4.4vw,58px)] text-[var(--color-ivory)]">
            Everything above was evidence. This is the{" "}
            <span className="accent text-[var(--color-gold)]">ask.</span>
          </h2>

          <p className="mt-8 max-w-[52ch] mx-auto text-[var(--color-ivory-dim)] text-[17px] leading-[1.7]">
            One conversation, private, no cost. If the fit is not there you
            will be told in the first ten minutes.
          </p>

          <div className="mt-12 flex flex-col items-center">
            <ApplyButton href={TYPEFORM_URL} size="large" />
            <p className="mt-4 text-[13px] text-[var(--color-ivory-faint)]">
              Opens the private application form.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/** Footer — brand, pillar line, and the required ad-platform disclaimer. */
export function VslFooter() {
  return (
    <footer className="relative py-16">
      <div className="mx-auto max-w-[760px] px-6 lg:px-10 text-center">
        <div className="flex justify-center mb-5">
          <span className="text-[var(--color-ivory-faint)] w-[16px] h-[24px]">
            <TridentMark className="w-full h-full" />
          </span>
        </div>
        <p className="eyebrow text-[11px] text-[var(--color-ivory-faint)] tracking-[0.3em]">
          Hamza The Alchemist
        </p>
        <p className="accent text-[var(--color-gold)] text-[15px] mt-4">
          Everything is energy. Even business.
        </p>
        <p className="mt-8 text-[11px] leading-[1.7] text-[var(--color-ivory-faint)] opacity-60 max-w-[70ch] mx-auto">
          {META_DISCLAIMER}
        </p>
        <p className="mt-4 text-[11px] text-[var(--color-ivory-faint)] opacity-60">
          © {new Date().getFullYear()} Hamza The Alchemist. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
