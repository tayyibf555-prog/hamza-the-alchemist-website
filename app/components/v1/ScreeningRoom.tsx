"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { VSL_SRC } from "../../lib/vsl-content";
import { TYPEFORM_URL } from "../../lib/links";
import { ApplyButton } from "./ApplyButton";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const fmt = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return "00:00";
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

type Props = {
  /** Reports playback state up so the sticky rail can mirror it. */
  onProgress?: (elapsed: number, duration: number) => void;
  playerRef?: React.RefObject<HTMLDivElement | null>;
};

/**
 * The Screening Room — /v1 hero.
 *
 * A full-bleed band one step darker than the page, hairlined top and
 * bottom so the player sits inside a visibly separate room. Pressing
 * play sets html[data-room="dim"] and the whole page falls away around
 * the frame.
 */
export function ScreeningRoom({ onProgress, playerRef }: Props) {
  const reduced = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  // Drive the room state from the video's own events.
  useEffect(() => {
    const root = document.documentElement;
    if (playing) root.dataset.room = "dim";
    else delete root.dataset.room;
    return () => {
      delete root.dataset.room;
    };
  }, [playing]);

  useEffect(() => {
    onProgress?.(elapsed, duration);
  }, [elapsed, duration, onProgress]);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    v.play().catch(() => {});
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: "var(--color-ink-deep)",
        borderTop: "1px solid var(--color-hairline)",
        borderBottom: "1px solid var(--color-hairline)",
      }}
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-10 py-20 lg:py-28">
        {/* Eyebrow inside a hairline frame */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: easeOutExpo }}
          className="room-dim flex justify-center"
        >
          <span
            className="eyebrow text-[var(--color-gold)] text-[11px] px-4 py-2 rounded-[3px]"
            style={{ border: "1px solid var(--color-hairline)" }}
          >
            For 6&ndash;7 Figure/Month Entrepreneurs
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.25, ease: easeOutExpo }}
          className="room-dim mt-10 font-display font-extrabold text-balance text-center leading-[1.02] tracking-[-0.03em] text-[clamp(32px,5.4vw,76px)] text-[var(--color-ivory)] max-w-[18ch] mx-auto"
        >
          The Ceiling On Your Revenue Is Not Strategy. It Is{" "}
          <span
            className="accent text-[var(--color-gold)]"
            style={{ textShadow: "0 0 70px oklch(0.78 0.165 78 / 0.45)" }}
          >
            Identity.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.45, ease: easeOutExpo }}
          className="room-dim mt-8 max-w-[62ch] mx-auto text-center text-[var(--color-ivory-dim)] text-[17px] lg:text-[19px] leading-[1.65]"
        >
          Most operators at your level do not have a strategy problem. They
          have a self that was calibrated for a smaller number, and the
          business obeys it.
        </motion.p>

        {/* Slug row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.7, ease: easeOutExpo }}
          className="room-dim mt-14 flex items-center gap-4 max-w-[900px] mx-auto"
        >
          <span className="eyebrow text-[11px] text-[var(--color-gold)] shrink-0">
            01 / Watch
          </span>
          <span
            aria-hidden
            className="flex-1 h-px"
            style={{ background: "var(--color-hairline)" }}
          />
          <span className="eyebrow text-[11px] text-[var(--color-ivory-faint)] tabular-nums shrink-0">
            Runtime {duration ? fmt(duration) : "02:40"}
          </span>
        </motion.div>

        {/* The player */}
        <motion.div
          ref={playerRef}
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: easeOutExpo }}
          className="relative mt-6 max-w-[900px] mx-auto"
        >
          {/* Gold bloom behind — intensifies when the lights go down */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[-14%] transition-opacity duration-[900ms]"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 50% 50%, oklch(0.42 0.16 78 / 0.42) 0%, oklch(0.30 0.10 75 / 0.18) 38%, transparent 72%)",
              filter: "blur(46px)",
              opacity: playing ? 1 : 0.55,
              transitionTimingFunction: "var(--ease-out-expo)",
            }}
          />

          <div
            className="room-lit relative aspect-video overflow-hidden rounded-[4px]"
            style={{
              border: `1px solid ${
                playing ? "var(--color-gold)" : "var(--color-gold-deep)"
              }`,
              boxShadow: playing
                ? "0 0 0 1px oklch(0.78 0.165 78 / 0.28), 0 40px 90px -30px oklch(0.04 0.005 70 / 0.9), 0 0 90px -18px oklch(0.78 0.165 78 / 0.5)"
                : "0 0 0 1px oklch(0.28 0.008 75), 0 30px 70px -28px oklch(0.04 0.005 70 / 0.8)",
              background: "oklch(0.04 0.005 70)",
            }}
          >
            <video
              ref={videoRef}
              src={VSL_SRC}
              playsInline
              preload="metadata"
              controls={started}
              className="absolute inset-0 w-full h-full object-cover"
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onLoadedMetadata={(e) =>
                setDuration(e.currentTarget.duration || 0)
              }
              onTimeUpdate={(e) => setElapsed(e.currentTarget.currentTime)}
            >
              <track kind="captions" />
            </video>

            {/* Play affordance — the only object on the frame before it starts */}
            {!started && (
              <button
                type="button"
                onClick={play}
                aria-label="Play the video"
                className="group absolute inset-0 z-10 flex items-center justify-center"
                style={{ background: "oklch(0.04 0.005 70 / 0.28)" }}
              >
                <span
                  className="relative flex items-center justify-center w-[86px] h-[86px] md:w-[104px] md:h-[104px] rounded-full transition-transform duration-500"
                  style={{
                    background:
                      "radial-gradient(circle, oklch(0.14 0.012 70 / 0.9) 0%, oklch(0.10 0.010 70 / 0.7) 100%)",
                    border: "1px solid var(--color-gold)",
                    boxShadow:
                      "0 0 0 6px oklch(0.78 0.165 78 / 0.08), 0 0 40px -6px oklch(0.78 0.165 78 / 0.6)",
                    transitionTimingFunction: "var(--ease-out-expo)",
                  }}
                >
                  <span
                    aria-hidden
                    className="block w-0 h-0 ml-1.5 transition-transform duration-500 group-hover:scale-110"
                    style={{
                      borderLeft: "22px solid var(--color-gold)",
                      borderTop: "14px solid transparent",
                      borderBottom: "14px solid transparent",
                      filter:
                        "drop-shadow(0 0 12px oklch(0.78 0.165 78 / 0.6))",
                      transitionTimingFunction: "var(--ease-out-expo)",
                    }}
                  />
                </span>
              </button>
            )}
          </div>

          {/* Elapsed readout under the frame while the room is dark */}
          <div
            className="mt-4 flex items-center justify-between transition-opacity duration-500"
            style={{ opacity: started ? 1 : 0 }}
            aria-hidden={!started}
          >
            <span className="eyebrow text-[11px] text-[var(--color-ivory-faint)] tabular-nums">
              {fmt(elapsed)} / {fmt(duration)}
            </span>
            <span className="eyebrow text-[11px] text-[var(--color-ivory-faint)]">
              Sound on
            </span>
          </div>
        </motion.div>

        {/* Step 02 — the ask, immediately under the player */}
        <motion.div
          initial={{ opacity: 0, y: reduced ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 1.0, ease: easeOutExpo }}
          className="room-dim mt-14 max-w-[900px] mx-auto"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="eyebrow text-[11px] text-[var(--color-gold)] shrink-0">
              02 / Apply
            </span>
            <span
              aria-hidden
              className="flex-1 h-px"
              style={{ background: "var(--color-hairline)" }}
            />
          </div>

          <div className="flex flex-col items-center text-center">
            <ApplyButton href={TYPEFORM_URL} size="large" />
            <p className="mt-4 text-[13px] text-[var(--color-ivory-faint)]">
              Opens the private application form. No cost, no pitch.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
