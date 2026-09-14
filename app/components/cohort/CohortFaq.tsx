"use client";

import { useState } from "react";
import { Reveal } from "../Reveal";
import { CTAButton } from "../CTAButton";
import { FAQS, SEATS, SEATS_TAKEN, START_DATE, formatStart } from "../../lib/cohort";

export function CohortFaq() {
  const [open, setOpen] = useState<number | null>(0);
  const remaining =
    SEATS !== null && SEATS_TAKEN !== null ? SEATS - SEATS_TAKEN : null;

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[860px] px-6 lg:px-10">
        <div className="text-center mb-14">
          <Reveal delay={0.1}>
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.02em] text-[clamp(30px,3.4vw,50px)] text-[var(--color-ivory)]">
              Asked and{" "}
              <span className="accent text-[var(--color-gold)]">answered.</span>
            </h2>
          </Reveal>
        </div>

        <div style={{ borderTop: "1px solid var(--color-hairline)" }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} style={{ borderBottom: "1px solid var(--color-hairline)" }}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between gap-6 text-left py-6 min-h-[44px]"
                >
                  <span className="font-display font-bold text-[16px] lg:text-[18px] text-[var(--color-ivory)]">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-[var(--color-gold)] text-[20px] leading-none transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "none",
                      transitionTimingFunction: "var(--ease-out-expo)",
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-7 -mt-1 text-[var(--color-ivory-dim)] text-[15px] lg:text-[16px] leading-[1.75] max-w-[64ch]">
                    {f.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Closing band */}
        <div className="mt-20 text-center">
          <Reveal>
            <h3 className="font-display font-extrabold leading-[1.1] tracking-[-0.02em] text-[clamp(26px,3vw,40px)] text-[var(--color-ivory)] max-w-[20ch] mx-auto">
              The ceiling does not move on its own.
            </h3>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="mt-9 flex flex-col items-center gap-4">
              <CTAButton size="large">Claim Your Seat</CTAButton>
              {(START_DATE || (remaining !== null && remaining > 0)) && (
                <p className="text-[13px] text-[var(--color-ivory-faint)]">
                  {START_DATE && `Starts ${formatStart(START_DATE)}`}
                  {START_DATE && remaining !== null && remaining > 0 && " · "}
                  {remaining !== null && remaining > 0 && `${remaining} seats left`}
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
