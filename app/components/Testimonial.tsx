"use client";

import { motion, useReducedMotion } from "framer-motion";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type Props = {
  quote: string;
  name: string;
  role: string;
  metric: string;
};

/**
 * Single oversized pull-quote. Lives at the bottom of Folio V (Evidence).
 * Hairline-bracketed like a folio engraving. Fraunces italic at display size.
 * One named operator, one verifiable metric. No wall of testimonials.
 */
export function Testimonial({ quote, name, role, metric }: Props) {
  const reduced = useReducedMotion();

  return (
    <section className="relative py-24 lg:py-40">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        {/* Top hairline + eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.8, ease: easeOutExpo }}
          className="flex items-center gap-5 mb-12 lg:mb-16"
        >
          <span className="eyebrow text-[var(--color-gold)] shrink-0">
            From the room
          </span>
          <span
            aria-hidden
            className="block h-px flex-1"
            style={{ background: "var(--color-hairline)" }}
          />
        </motion.div>

        {/* The quote */}
        <motion.figure
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.1, delay: 0.1, ease: easeOutExpo }}
          className="relative"
        >
          {/* Oversized opening quote, drifting behind */}
          <span
            aria-hidden
            className="pointer-events-none absolute accent text-[var(--color-gold)] select-none"
            style={{
              left: "-2%",
              top: "-22%",
              fontSize: "clamp(180px, 22vw, 360px)",
              lineHeight: 1,
              opacity: 0.08,
            }}
          >
            &ldquo;
          </span>

          <blockquote className="relative accent text-[var(--color-ivory)] text-[clamp(28px,3.6vw,56px)] leading-[1.16] tracking-[-0.005em] max-w-[24ch]">
            {quote}
          </blockquote>

          <figcaption className="mt-12 lg:mt-16 flex items-baseline gap-6 flex-wrap">
            <span
              aria-hidden
              className="block w-12 h-px shrink-0"
              style={{ background: "var(--color-gold)" }}
            />
            <div className="flex flex-col gap-1">
              <span className="text-[var(--color-ivory)] font-medium text-[17px]">
                {name}
              </span>
              <span className="text-[var(--color-ivory-faint)] text-[14px] tracking-tight">
                {role}
              </span>
            </div>

            {/* Metric badge */}
            <span
              aria-hidden
              className="hidden md:block w-px h-12"
              style={{ background: "var(--color-hairline)" }}
            />
            <div className="flex flex-col gap-1">
              <span className="eyebrow text-[var(--color-ivory-faint)]">
                Verified outcome
              </span>
              <span className="accent text-[var(--color-gold)] text-[20px] leading-none">
                {metric}
              </span>
            </div>
          </figcaption>
        </motion.figure>

        {/* Bottom hairline */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.4, delay: 0.4, ease: easeOutExpo }}
          className="mt-16 lg:mt-20 h-px origin-left"
          style={{ background: "var(--color-hairline)" }}
        />
      </div>
    </section>
  );
}
