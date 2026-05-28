"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VideoFrame } from "./VideoFrame";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export type ClientProfile = {
  name: string;
  role?: string;
  photo?: string;
  /** YouTube id for the testimonial video, e.g. "X2ObLdwGbZI". */
  videoYoutubeId?: string;
  /** Self-hosted video src (under /public), e.g. "/clients/jordy-testimonial.mp4". */
  videoSrc?: string;
  /** Optional poster image for the self-hosted video. */
  videoPoster?: string;
  /** CSS aspect-ratio for the testimonial frame, e.g. "16 / 9", "9 / 16". */
  videoAspect?: string;
  /** Short display-font pull quote shown under the name. */
  pullQuote?: string;
  /** A 2–4 sentence paragraph about the operator and the work. */
  bio?: string;
};

/** True when the testimonial frame is taller than wide (vertical clip). */
function isVerticalAspect(aspect?: string) {
  if (!aspect) return false;
  const parts = aspect.split("/").map((s) => parseFloat(s.trim()));
  if (parts.length !== 2 || parts.some((n) => !Number.isFinite(n) || n <= 0))
    return false;
  return parts[1] > parts[0];
}

type Props = {
  client: ClientProfile | null;
  onClose: () => void;
};

/**
 * Magazine-spread modal that opens when an operator card is clicked.
 *
 * Left column: portrait, edge to edge.
 * Right column: folio eyebrow, name, role, pull quote, video slot, bio.
 *
 * Closes on ESC, on click outside, on the close button. Body scroll
 * locks while open. Pure DOM (no portal) so it stacks above the GoldDots
 * and shader via z-index alone.
 */
export function ClientProfileModal({ client, onClose }: Props) {
  // Lock body scroll while the modal is open
  useEffect(() => {
    if (!client) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [client]);

  // ESC to close
  useEffect(() => {
    if (!client) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [client, onClose]);

  return (
    <AnimatePresence>
      {client && (
        <motion.div
          key="scrim"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: easeOutExpo }}
          onClick={onClose}
          className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-8"
          style={{ background: "oklch(0.04 0.005 70 / 0.92)" }}
          aria-modal="true"
          role="dialog"
          aria-label={`${client.name} profile`}
        >
          <motion.article
            key="card"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.985 }}
            transition={{ duration: 0.55, ease: easeOutExpo }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[1180px] max-h-[92vh] rounded-[8px] overflow-hidden"
            style={{
              background: "oklch(0.07 0.008 70)",
              border: "1px solid var(--color-hairline)",
              boxShadow:
                "0 40px 80px -24px oklch(0.04 0.005 70 / 0.9), 0 0 0 1px oklch(0.78 0.165 78 / 0.08)",
            }}
          >
            {/* Close button — hairline-bordered round, top right */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close profile"
              className="absolute top-4 right-4 md:top-6 md:right-6 z-30 w-11 h-11 flex items-center justify-center rounded-full text-[var(--color-ivory-faint)] hover:text-[var(--color-gold)] transition-colors duration-200"
              style={{
                border: "1px solid var(--color-hairline)",
                background: "oklch(0.05 0.005 70 / 0.7)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden
              >
                <path
                  d="M2 2 L12 12 M12 2 L2 12"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            {/* Two-column magazine spread */}
            <div className="grid grid-cols-1 md:grid-cols-[40%_60%] max-h-[92vh] overflow-hidden">
              {/* Left: portrait, full-bleed */}
              <div className="relative aspect-[3/4] md:aspect-auto md:min-h-[640px] overflow-hidden bg-[var(--color-ink-deep)]">
                {client.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={client.photo}
                    alt={client.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(180deg, oklch(0.20 0.04 70) 0%, oklch(0.08 0.010 70) 100%)",
                    }}
                  />
                )}

                {/* Vertical fade to the right edge so the portrait blends into the content column on desktop */}
                <div
                  aria-hidden
                  className="hidden md:block absolute inset-y-0 right-0 w-[18%] pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent 0%, oklch(0.07 0.008 70 / 0.7) 100%)",
                  }}
                />
              </div>

              {/* Right: scrollable content column */}
              <div className="relative overflow-y-auto px-7 md:px-12 lg:px-14 py-12 md:py-14 lg:py-16">
                {/* Folio mark */}
                <p className="eyebrow text-[var(--color-ivory-faint)] mb-8">
                  Folio · Client Profile
                </p>

                {/* Name */}
                <h2 className="font-display font-extrabold uppercase tracking-[-0.015em] leading-[1.0] text-[clamp(32px,3.6vw,52px)] text-[var(--color-ivory)]">
                  {client.name}
                </h2>

                {/* Role */}
                {client.role && (
                  <p className="eyebrow text-[var(--color-gold)] mt-4">
                    {client.role}
                  </p>
                )}

                {/* Optional pull quote */}
                {client.pullQuote && (
                  <blockquote className="relative accent text-[var(--color-ivory)] text-[clamp(20px,1.8vw,26px)] leading-[1.3] mt-10 max-w-[40ch] pl-6">
                    <span
                      aria-hidden
                      className="absolute left-0 top-1 bottom-1 w-px"
                      style={{
                        background:
                          "linear-gradient(180deg, var(--color-gold) 0%, transparent 100%)",
                      }}
                    />
                    {client.pullQuote}
                  </blockquote>
                )}

                {/* Video testimonial slot — vertical videos sit inside a
                    narrower centered well so they don't blow out the column */}
                <div className="relative mt-12">
                  <p className="eyebrow text-[var(--color-ivory-faint)] mb-4">
                    I · Testimonial
                  </p>

                  <div
                    className={
                      isVerticalAspect(client.videoAspect)
                        ? "relative mx-auto w-full max-w-[360px]"
                        : "relative"
                    }
                  >
                    {/* Soft gold bloom behind the video frame */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-[-10%]"
                      style={{
                        background:
                          "radial-gradient(ellipse 60% 70% at 50% 50%, oklch(0.42 0.16 78 / 0.35) 0%, oklch(0.30 0.10 75 / 0.15) 35%, transparent 70%)",
                        filter: "blur(40px)",
                      }}
                    />
                    <div className="relative">
                      <VideoFrame
                        youtubeId={client.videoYoutubeId}
                        videoSrc={client.videoSrc}
                        videoPoster={client.videoPoster}
                        aspect={client.videoAspect}
                        runtime="00:00"
                        progress={0.02}
                      />
                    </div>
                  </div>
                </div>

                {/* Bio paragraph */}
                <div className="mt-12">
                  <p className="eyebrow text-[var(--color-ivory-faint)] mb-4">
                    II · The Work
                  </p>
                  {client.bio ? (
                    <p className="text-[var(--color-ivory-dim)] text-[16px] leading-[1.7] max-w-[58ch]">
                      {client.bio}
                    </p>
                  ) : (
                    <p className="text-[var(--color-ivory-faint)] italic text-[15px] leading-[1.65] max-w-[58ch]">
                      Paragraph coming soon. Drop in 2 to 4 sentences about
                      the operator, the work, and the named outcome.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.article>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
