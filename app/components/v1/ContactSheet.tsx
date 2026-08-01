"use client";

import { motion, useReducedMotion } from "framer-motion";
import { RECEIPTS, RECEIPT_SLOTS } from "../../lib/vsl-content";
import { TYPEFORM_URL } from "../../lib/links";
import { ApplyButton } from "./ApplyButton";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * The Contact Sheet — one continuous sheet, not ten floating cards.
 * A hairline gutter grid does the dividing, so it reads as a printed
 * proof sheet rather than a wall of screenshots.
 */
export function ContactSheet() {
  const reduced = useReducedMotion();
  const cells = RECEIPTS.length > 0 ? RECEIPTS : Array(RECEIPT_SLOTS).fill(null);

  return (
    <section
      className="relative py-24 lg:py-32 overflow-hidden"
      style={{ borderTop: "1px solid var(--color-hairline)" }}
    >
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <div className="text-center mb-14">
          <p className="eyebrow text-[var(--color-gold)] mb-5">Sent By Clients</p>
          <h2 className="font-display font-extrabold leading-[1.04] tracking-[-0.02em] text-[clamp(30px,4.2vw,56px)] text-[var(--color-ivory)]">
            Receipts,{" "}
            <span className="accent text-[var(--color-gold)]">unedited.</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.9, ease: easeOutExpo }}
          className="grid grid-cols-2 md:grid-cols-5 gap-px rounded-[4px] overflow-hidden"
          style={{
            border: "1px solid var(--color-hairline)",
            background: "var(--color-hairline)",
          }}
        >
          {cells.map((src: string | null, i: number) => (
            <div
              key={i}
              className="relative aspect-[3/4]"
              style={{ background: "oklch(0.07 0.008 70)" }}
            >
              {src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={src}
                  alt="Client message"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-40">
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M4 5h16v11H9l-5 4V5z"
                      stroke="var(--color-gold)"
                      strokeWidth="1.2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="eyebrow text-[9px] text-[var(--color-ivory-faint)]">
                    Receipt {i + 1}
                  </span>
                </div>
              )}
            </div>
          ))}
        </motion.div>

        {RECEIPTS.length === 0 && (
          <p className="mt-5 text-center text-[12px] text-[var(--color-ivory-faint)] italic">
            Placeholder cells. Drop the client-message screenshots into
            /public/receipts and list them in vsl-content.ts to fill the sheet.
          </p>
        )}

        <div className="mt-16 flex flex-col items-center text-center">
          <ApplyButton href={TYPEFORM_URL} />
          <p className="mt-4 text-[13px] text-[var(--color-ivory-faint)]">
            Two minutes to apply. No payment, no calendar spam.
          </p>
        </div>
      </div>
    </section>
  );
}
