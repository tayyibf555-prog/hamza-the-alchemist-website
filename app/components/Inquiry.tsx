"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { createPopup } from "@typeform/embed";
import "@typeform/embed/build/css/popup.css";
import { Reveal } from "./Reveal";
import { SectionMarker } from "./SectionMarker";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/** Typeform application form id (form.typeform.com/to/<id>). */
const TYPEFORM_ID = "YkVVRS4U";

/**
 * Folio VIII · Inquiry — the application gateway.
 *
 * Heading + intro set the frame; a single gold CTA opens the Typeform
 * application in a full-screen overlay. The form itself lives on Typeform
 * so questions can be edited without a deploy.
 */
export function Inquiry() {
  const reduced = useReducedMotion();
  const popupRef = useRef<ReturnType<typeof createPopup> | null>(null);

  // Create the popup once on mount; tear it down on unmount.
  useEffect(() => {
    popupRef.current = createPopup(TYPEFORM_ID);
    return () => {
      popupRef.current?.unmount?.();
      popupRef.current = null;
    };
  }, []);

  const openForm = () => popupRef.current?.open();

  return (
    <section id="inquiry" className="relative py-32 lg:py-48 overflow-hidden">
      <SectionMarker index="VI" label="Inquiry" />

      {/* Decorative faint Roman numeral behind the block */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 0.05, scale: 1 }}
        viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
        transition={{ duration: 1.8, ease: easeOutExpo }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none"
        style={{ fontSize: "clamp(360px, 50vw, 720px)", lineHeight: 1 }}
      >
        <span className="accent text-[var(--color-gold)]">VIII</span>
      </motion.div>

      <div className="relative mx-auto max-w-[920px] px-6 lg:px-10 text-center">
        <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-8">
          Inquiry
        </Reveal>

        <Reveal>
          <h2 className="font-display font-extrabold text-balance leading-[0.98] tracking-[-0.025em] text-[clamp(48px,7vw,120px)] text-[var(--color-ivory)]">
            Submit an{" "}
            <span className="accent text-[var(--color-gold)]">application.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15} as="p" className="mt-8 max-w-[52ch] mx-auto text-[var(--color-ivory-dim)] text-[17px] leading-[1.65]">
          A few questions, a couple of minutes. Reviewed personally. If the
          work is a match, the conversation continues privately.
        </Reveal>

        {/* CTA — opens the Typeform application in a full-screen overlay */}
        <Reveal delay={0.3}>
          <div className="mt-14 flex justify-center">
            <motion.button
              type="button"
              onClick={openForm}
              whileHover={reduced ? undefined : { scale: 1.01 }}
              whileTap={reduced ? undefined : { scale: 0.99 }}
              transition={{ duration: 0.25, ease: easeOutExpo }}
              className="group relative inline-flex items-center gap-3 h-[64px] px-10 eyebrow rounded-[3px] text-[var(--color-ink-deep)] overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)",
                boxShadow:
                  "0 0 0 1px oklch(0.62 0.14 70 / 0.4), 0 18px 48px -12px oklch(0.78 0.165 78 / 0.55)",
              }}
            >
              <span className="relative z-10 font-semibold tracking-[0.18em] text-[14px]">
                Submit Application
              </span>
              <span
                aria-hidden
                className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1"
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              >
                →
              </span>
            </motion.button>
          </div>
        </Reveal>

        {/* Capacity line */}
        <Reveal delay={0.45}>
          <div
            className="mt-20 pt-10 max-w-[58ch] mx-auto"
            style={{ borderTop: "1px solid var(--color-hairline)" }}
          >
            <p className="text-[var(--color-ivory-dim)] text-[15px] leading-[1.65]">
              I read every application myself. Most get a thoughtful no. The
              work I do is too specific for everyone and that&apos;s deliberate.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
