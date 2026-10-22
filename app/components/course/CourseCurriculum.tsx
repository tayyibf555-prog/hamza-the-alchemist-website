"use client";

import { useState } from "react";
import { Reveal } from "../Reveal";
import { COURSE_NAME, INTRODUCING, WEEKS } from "../../lib/course";

/**
 * Introducing the course, then the curriculum as a dropdown: each week
 * shows only its title until clicked, per the brief.
 */
export function CourseCurriculum() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[900px] px-6 lg:px-10">
        <div className="text-center mb-14 lg:mb-16">
          <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-6">
            Introducing
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="font-display font-extrabold leading-[1.05] tracking-[-0.02em] text-[clamp(30px,3.4vw,50px)] text-[var(--color-ivory)]">
              {COURSE_NAME.replace(" Alchemist", "")}{" "}
              <span className="accent text-[var(--color-gold)]">Alchemist&trade;</span>
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-7 max-w-[62ch] mx-auto text-[var(--color-ivory-dim)] text-[16px] lg:text-[18px] leading-[1.75]">
              {INTRODUCING}
            </p>
          </Reveal>
        </div>

        <div style={{ borderTop: "1px solid var(--color-hairline)" }}>
          {WEEKS.map((w) => {
            const isOpen = open === w.n;
            return (
              <div
                key={w.n}
                style={{
                  borderBottom: "1px solid var(--color-hairline)",
                  opacity: w.pending && !w.detail ? 0.75 : 1,
                }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : w.n)}
                  aria-expanded={isOpen}
                  className="w-full grid grid-cols-[92px_1fr_auto] items-center gap-x-4 text-left py-6 min-h-[44px]"
                >
                  <span className="eyebrow text-[11px] tracking-[0.2em] text-[var(--color-gold)]">
                    Week {String(w.n).padStart(2, "0")}
                  </span>
                  <span className="font-display font-bold text-[17px] lg:text-[20px] leading-[1.3] text-[var(--color-ivory)]">
                    {w.title}
                  </span>
                  <span
                    aria-hidden
                    className="text-[var(--color-gold)] text-[20px] leading-none transition-transform duration-300"
                    style={{
                      transform: isOpen ? "rotate(45deg)" : "none",
                      transitionTimingFunction: "var(--ease-out-expo)",
                    }}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="pb-7 -mt-1 sm:pl-[108px] text-[var(--color-ivory-dim)] text-[15px] lg:text-[16px] leading-[1.75] max-w-[66ch]">
                    {w.detail ?? "Description pending from Hamza’s brief."}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
