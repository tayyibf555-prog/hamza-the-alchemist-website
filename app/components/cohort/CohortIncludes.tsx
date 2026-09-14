"use client";

import { Reveal } from "../Reveal";
import { INCLUDES } from "../../lib/cohort";

export function CohortIncludes() {
  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{
        borderTop: "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
        background: "var(--color-ink-deep)",
      }}
    >
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <div className="text-center mb-16">
          <Reveal delay={0.1}>
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.02em] text-[clamp(30px,3.4vw,50px)] text-[var(--color-ivory)]">
              What you{" "}
              <span className="accent text-[var(--color-gold)]">get.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {INCLUDES.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06}>
              <div className="flex gap-5">
                <span
                  aria-hidden
                  className="mt-2 block w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: "var(--color-gold)",
                    boxShadow: "0 0 12px oklch(0.78 0.165 78 / 0.7)",
                  }}
                />
                <div>
                  <h3 className="font-display font-bold text-[17px] lg:text-[19px] text-[var(--color-ivory)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-[var(--color-ivory-dim)] text-[15px] leading-[1.7] max-w-[46ch]">
                    {item.detail}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
