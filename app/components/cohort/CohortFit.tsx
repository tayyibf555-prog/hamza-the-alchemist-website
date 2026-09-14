"use client";

import { Reveal } from "../Reveal";
import { FIT_FOR, FIT_NOT_FOR } from "../../lib/cohort";

/**
 * Fit check. The exclusions are as load-bearing as the inclusions — a cohort
 * that lets the wrong person in costs more than the seat is worth.
 */
export function CohortFit() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1000px] px-6 lg:px-10">
        <div className="text-center mb-16">
          <Reveal delay={0.1}>
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.02em] text-[clamp(30px,3.4vw,50px)] text-[var(--color-ivory)]">
              Who this is{" "}
              <span className="accent text-[var(--color-gold)]">for.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <Reveal>
            <div
              className="h-full rounded-[12px] p-7 lg:p-8"
              style={{
                border: "1px solid var(--color-gold-deep)",
                background: "oklch(0.42 0.16 78 / 0.05)",
              }}
            >
              <p className="eyebrow text-[11px] text-[var(--color-gold)] mb-6">
                This is for you if
              </p>
              <ul className="flex flex-col gap-4">
                {FIT_FOR.map((line) => (
                  <li key={line} className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-[var(--color-gold)] text-[15px] leading-none"
                    >
                      &#10003;
                    </span>
                    <span className="text-[var(--color-ivory)] text-[15px] lg:text-[16px] leading-[1.65]">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div
              className="h-full rounded-[12px] p-7 lg:p-8"
              style={{ border: "1px solid var(--color-hairline)" }}
            >
              <p className="eyebrow text-[11px] text-[var(--color-ivory-faint)] mb-6">
                This is not for you if
              </p>
              <ul className="flex flex-col gap-4">
                {FIT_NOT_FOR.map((line) => (
                  <li key={line} className="flex gap-4">
                    <span
                      aria-hidden
                      className="mt-1 shrink-0 text-[var(--color-ivory-faint)] text-[15px] leading-none"
                    >
                      &times;
                    </span>
                    <span className="text-[var(--color-ivory-dim)] text-[15px] lg:text-[16px] leading-[1.65]">
                      {line}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
