"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "../Reveal";
import { CTAButton } from "../CTAButton";
import { TESTIMONIAL_SHOTS } from "../../lib/cohort";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * The proof wall — unedited client messages.
 *
 * A masonry column layout rather than a grid: the screenshots are wildly
 * different heights (tall phone captures next to a wide crop) and a grid
 * would letterbox or crop them. Columns let each keep its own proportions.
 *
 * Message text is unreadable at column width, so tapping opens the full
 * image — the same pattern as Marco's testimonial on the homepage.
 */
export function CohortTestimonials() {
  const reduced = useReducedMotion();
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <div className="text-center mb-14 lg:mb-16">
          <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-6">
            Unedited
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.02em] text-[clamp(30px,3.4vw,50px)] text-[var(--color-ivory)]">
              What they send{" "}
              <span className="accent text-[var(--color-gold)]">after.</span>
            </h2>
          </Reveal>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
          {TESTIMONIAL_SHOTS.map((shot, i) => (
            <motion.button
              key={shot.src}
              type="button"
              onClick={() => setLightbox(shot.src)}
              aria-label={`Open testimonial ${i + 1} full size`}
              initial={{ opacity: 0, y: reduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: easeOutExpo }}
              className="group relative block w-full mb-5 break-inside-avoid overflow-hidden rounded-[10px]"
              style={{ border: "1px solid var(--color-hairline)" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={shot.src}
                alt={shot.alt}
                loading="lazy"
                className="block w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 50%, oklch(0.04 0.005 70 / 0.5) 100%)",
                }}
              />
            </motion.button>
          ))}
        </div>

        <p className="mt-2 text-center eyebrow text-[10px] tracking-[0.2em] text-[var(--color-ivory-faint)]">
          Tap to enlarge
        </p>

        <div className="mt-12 flex justify-center">
          <CTAButton size="large">I Want Similar Results</CTAButton>
        </div>
      </div>

      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Client testimonial"
          onClick={() => setLightbox(null)}
          onKeyDown={(e) => e.key === "Escape" && setLightbox(null)}
          tabIndex={-1}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8"
          style={{
            background: "oklch(0.02 0.004 70 / 0.94)",
            backdropFilter: "blur(6px)",
          }}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            aria-label="Close"
            className="absolute top-4 right-4 flex items-center justify-center w-11 h-11 rounded-full text-[var(--color-gold)] text-[22px] leading-none"
            style={{
              background: "oklch(0.10 0.010 70 / 0.85)",
              border: "1px solid var(--color-gold-deep)",
            }}
          >
            &times;
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt="Client testimonial"
            onClick={(e) => e.stopPropagation()}
            className="max-h-full max-w-full w-auto h-auto object-contain rounded-[8px]"
            style={{ border: "1px solid var(--color-hairline)" }}
          />
        </div>
      )}
    </section>
  );
}
