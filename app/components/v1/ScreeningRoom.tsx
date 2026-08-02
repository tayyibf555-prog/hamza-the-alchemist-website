"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { VSL_SRC } from "../../lib/vsl-content";
import { TYPEFORM_URL } from "../../lib/links";
import { ApplyButton } from "./ApplyButton";
import { pacedPct, startPlayback, useGestureUnmute } from "../VslPlayer";

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
  /** Sound on — what darkens the room. */
  const [started, setStarted] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  // Ask for sound on mount and only settle for silence if the browser
  // refuses, so anyone it will permit hears the video straight away.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    return startPlayback(v, () => setStarted(false));
  }, []);

  // Preload can satisfy loadedmetadata before React attaches its handlers,
  // which would pin duration at 0 and freeze the pacing bar.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const sync = () => {
      if (Number.isFinite(v.duration) && v.duration > 0) setDuration(v.duration);
      setElapsed(v.currentTime);
    };
    sync();
    v.addEventListener("durationchange", sync);
    v.addEventListener("loadedmetadata", sync);
    return () => {
      v.removeEventListener("durationchange", sync);
      v.removeEventListener("loadedmetadata", sync);
    };
  }, []);

  // The lights go down when the sound comes on, not on the silent autoplay —
  // dimming the page for a video nobody has opted into would spend the
  // mechanic before the visitor has made a choice.
  useEffect(() => {
    const root = document.documentElement;
    if (started && playing) root.dataset.room = "dim";
    else delete root.dataset.room;
    return () => {
      delete root.dataset.room;
    };
  }, [started, playing]);

  useEffect(() => {
    onProgress?.(elapsed, duration);
  }, [elapsed, duration, onProgress]);

  // The first gesture anywhere on the page arms the audio, so nobody has to
  // be asked to click a prompt before the pitch is audible.
  const handleUnmuted = useCallback(() => setStarted(true), []);
  useGestureUnmute(videoRef, !started, handleUnmuted);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    v.volume = 1;
    setStarted(!v.muted);
    if (v.paused) v.play().catch(() => {});
  };

  /**
   * Clicking the frame pauses and resumes. While still muted the click is
   * spent turning the sound on instead, so first contact never reads as the
   * video breaking.
   */
  const togglePlay = () => {
    const v = videoRef.current;
    if (!v || !started) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
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
        </motion.div>

        {/* The player */}
        <motion.div
          ref={playerRef}
          initial={{ opacity: 0, y: reduced ? 0 : 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8, ease: easeOutExpo }}
          // z-[2] keeps .gold-dots (fixed, z-index 1) from drifting over the frame.
          className="relative z-[2] mt-6 max-w-[900px] mx-auto"
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
              preload="auto"
              className="absolute inset-0 w-full h-full object-cover"
              onPlay={() => setPlaying(true)}
              // Mute state is driven imperatively (we ask for sound first),
              // so mirror the element rather than forcing the attribute.
              onVolumeChange={(e) => setStarted(!e.currentTarget.muted)}
              onPause={() => setPlaying(false)}
              onEnded={() => setPlaying(false)}
              onLoadedMetadata={(e) =>
                setDuration(e.currentTarget.duration || 0)
              }
              onTimeUpdate={(e) => setElapsed(e.currentTarget.currentTime)}
            >
              <track kind="captions" />
            </video>

            {/* Click surface — pause and resume. */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause the video" : "Play the video"}
              className="absolute inset-0 z-10"
            >
              {!playing && (
                <span
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: "oklch(0.04 0.005 70 / 0.4)" }}
                >
                  <span
                    className="flex items-center justify-center w-[76px] h-[76px] md:w-[92px] md:h-[92px] rounded-full"
                    style={{
                      background: "oklch(0.10 0.010 70 / 0.85)",
                      border: "1px solid var(--color-gold)",
                      boxShadow: "0 0 36px -6px oklch(0.78 0.165 78 / 0.55)",
                    }}
                  >
                    <span
                      aria-hidden
                      className="block w-0 h-0 ml-1.5"
                      style={{
                        borderLeft: "19px solid var(--color-gold)",
                        borderTop: "13px solid transparent",
                        borderBottom: "13px solid transparent",
                      }}
                    />
                  </span>
                </span>
              )}
            </button>

            {/* Sound state — a quiet corner control. The first gesture
                anywhere on the page turns the sound on by itself. */}
            <button
              type="button"
              onClick={play}
              aria-label={started ? "Mute" : "Turn the sound on"}
              className="absolute bottom-5 right-5 z-20 flex items-center gap-2 h-9 px-3 rounded-full transition-opacity duration-500"
              style={{
                background: "oklch(0.10 0.010 70 / 0.72)",
                border: "1px solid var(--color-gold-deep)",
                backdropFilter: "blur(6px)",
                opacity: started ? 0.45 : 1,
              }}
            >
              <svg
                aria-hidden
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-gold)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 5 6 9H2v6h4l5 4V5z" />
                {started ? (
                  <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                ) : (
                  <>
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </>
                )}
              </svg>
              {!started && (
                <span className="eyebrow text-[10px] tracking-[0.18em] text-[var(--color-gold)]">
                  Sound
                </span>
              )}
            </button>

            {/* Pacing bar, on the frame's bottom edge */}
            <div
              aria-hidden
              className="absolute bottom-0 inset-x-0 z-30"
              style={{ background: "oklch(1 0 0 / 0.12)", height: 10 }}
            >
              <div
                className="relative h-full transition-[width] duration-300 ease-linear"
                style={{
                  width: `${pacedPct(elapsed, duration)}%`,
                  background:
                    "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold) 45%, var(--color-gold-deep) 100%)",
                  boxShadow: "0 0 16px -1px oklch(0.78 0.165 78 / 0.85)",
                }}
              >
                <span
                  className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 block rounded-full"
                  style={{
                    width: 16,
                    height: 16,
                    background: "var(--color-gold)",
                    border: "2px solid oklch(0.04 0.005 70)",
                    boxShadow: "0 0 14px 0 oklch(0.78 0.165 78 / 0.9)",
                  }}
                />
              </div>
            </div>
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
