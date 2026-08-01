"use client";

import { AnimatePresence, motion } from "framer-motion";
import { TYPEFORM_URL } from "../../lib/links";

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return "00:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

type Props = {
  visible: boolean;
  elapsed: number;
  duration: number;
  /** Must match the inline CTA label on the page so there is one learned object. */
  label?: string;
  shortLabel?: string;
};

/**
 * The Sticky Rail — appears once the player has scrolled out of view.
 *
 * Its job is recovering the apply action from the visitor who scrolled
 * past the video without watching, which on cold paid mobile traffic is
 * most of the audience. Carries live playback state so it reads as a
 * continuation of the player rather than a bolted-on banner.
 */
export function StickyRail({
  visible,
  elapsed,
  duration,
  label = "Apply For A Free Private Consultation",
  shortLabel = "Apply Now",
}: Props) {
  const pct = duration > 0 ? Math.min(100, (elapsed / duration) * 100) : 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 inset-x-0 z-50"
          style={{
            background: "color-mix(in oklch, var(--color-ink-deep) 96%, transparent)",
            borderTop: "1px solid var(--color-hairline)",
            backdropFilter: "blur(10px)",
          }}
        >
          <div className="mx-auto max-w-[1240px] px-5 sm:px-6 h-[62px] flex items-center justify-between gap-4">
            {/* Playback state — only once the player has reported a duration */}
            <div
              className={`${
                duration > 0 ? "hidden sm:flex" : "hidden"
              } items-center gap-3 shrink-0`}
            >
              <span
                aria-hidden
                className="relative block w-[120px] h-px"
                style={{ background: "var(--color-hairline)" }}
              >
                <span
                  className="absolute left-0 top-0 h-px transition-[width] duration-300"
                  style={{
                    width: `${pct}%`,
                    background: "var(--color-gold)",
                  }}
                />
              </span>
              <span className="eyebrow text-[11px] text-[var(--color-ivory-faint)] tabular-nums">
                {fmt(elapsed)} / {duration ? fmt(duration) : "02:40"}
              </span>
            </div>

            <a
              href={TYPEFORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-3 h-[42px] px-6 eyebrow rounded-[3px] text-[var(--color-ink-deep)]"
              style={{
                background:
                  "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)",
              }}
            >
              <span className="font-semibold tracking-[0.16em] text-[11px] sm:text-[12px]">
                <span className="hidden sm:inline">{label}</span>
                <span className="sm:hidden">{shortLabel}</span>
              </span>
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              >
                →
              </span>
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
