"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../Reveal";
import { WEEKS_PLAN } from "../../lib/cohort";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * Week-by-week breakdown.
 *
 * Each row separates the live call from the work between calls, because that
 * split is the thing being sold: the teaching sits in the content so the call
 * is not spent lecturing.
 */
export function CohortCurriculum() {
  const reduced = useReducedMotion();

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
        <div className="text-center mb-16 lg:mb-20">
          <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-6">
            The Six Weeks
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.02em] text-[clamp(30px,3.4vw,50px)] text-[var(--color-ivory)]">
              Exactly what we{" "}
              <span className="accent text-[var(--color-gold)]">work on.</span>
            </h2>
          </Reveal>
        </div>

        <ol className="flex flex-col" style={{ borderTop: "1px solid var(--color-hairline)" }}>
          {WEEKS_PLAN.map((w, i) => (
            <motion.li
              key={w.n}
              initial={{ opacity: 0, y: reduced ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px -8% 0px" }}
              transition={{ duration: 0.8, delay: i * 0.05, ease: easeOutExpo }}
              className="grid grid-cols-1 lg:grid-cols-[90px_1fr_1fr] gap-x-10 gap-y-4 py-8 lg:py-10"
              style={{ borderBottom: "1px solid var(--color-hairline)" }}
            >
              <span className="font-display font-extrabold leading-none text-[clamp(30px,3vw,42px)] text-[var(--color-gold)] opacity-70">
                {String(w.n).padStart(2, "0")}
              </span>

              <div>
                <p className="eyebrow text-[10px] tracking-[0.2em] text-[var(--color-ivory-faint)] mb-2">
                  Live call
                </p>
                <h3 className="font-display font-bold text-[clamp(19px,1.9vw,24px)] leading-[1.25] text-[var(--color-ivory)]">
                  {w.call}
                </h3>
                <p className="mt-3 accent text-[var(--color-gold)] text-[15px] leading-[1.5]">
                  {w.outcome}
                </p>
              </div>

              <div>
                <p className="eyebrow text-[10px] tracking-[0.2em] text-[var(--color-ivory-faint)] mb-2">
                  Between calls
                </p>
                <p className="text-[var(--color-ivory-dim)] text-[15px] lg:text-[16px] leading-[1.7]">
                  {w.work}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
