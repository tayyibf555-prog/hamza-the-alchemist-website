"use client";

import { motion, useReducedMotion } from "framer-motion";
import { TridentMark } from "../TridentMark";
import { MirrorLine } from "./MirrorLine";
import { ApplyButton } from "../v1/ApplyButton";
import { TYPEFORM_URL } from "../../lib/links";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * The Close — the last mirror unit, with the trident as a watermark
 * behind the type rather than a texture wash.
 */
export function CloseV2() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative py-32 lg:py-48 overflow-hidden"
      style={{ borderTop: "1px solid var(--color-hairline)" }}
    >
      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <span
          className="text-[var(--color-ivory)] w-[190px] h-[300px] lg:w-[300px] lg:h-[470px]"
          style={{ opacity: 0.06 }}
        >
          <TridentMark className="w-full h-full" />
        </span>
      </div>

      <div className="relative mx-auto max-w-[860px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
          transition={{ duration: 1.0, ease: easeOutExpo }}
        >
          <MirrorLine
            as="h2"
            above="You already know which line you are at."
            below="The only question left is whether it stays there."
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.9, delay: 0.15, ease: easeOutExpo }}
          className="mt-16 flex flex-col items-center text-center"
        >
          <ApplyButton href={TYPEFORM_URL} size="large">
            Apply For A Private Consultation
          </ApplyButton>

          <div className="mt-8 flex items-center gap-4 flex-wrap justify-center">
            {["Private", "One call", "No pitch"].map((t, i) => (
              <span key={t} className="flex items-center gap-4">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="block w-1 h-1 rounded-full"
                    style={{ background: "var(--color-hairline)" }}
                  />
                )}
                <span className="eyebrow text-[11px] text-[var(--color-ivory-faint)]">
                  {t}
                </span>
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
