"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Overall lead — the bar sits ahead of true playback position.
 * Set to 1 for a bar that tracks real position honestly.
 */
export const LEAD = 0.65;

/**
 * Surge cycles across the runtime. On a ten-minute video this puts a full
 * fast-then-slow beat at roughly every half minute — frequent enough to be
 * felt while watching, rather than a drift only a stopwatch would catch.
 */
const CYCLES = 20;

/**
 * Rate swing per cycle. Must stay below 1 or the bar would stall and reverse.
 * At 0.55 the fill runs 1.55x speed at the top of a cycle and 0.45x at the
 * bottom, which reads as surging rather than as a stutter.
 */
const SWING = 0.55;

/**
 * Bar fill percentage for a playback position.
 *
 * Two effects compose. A sine term modulates the *rate* so the fill surges,
 * eases, then surges again; its integral is pinned so it contributes nothing
 * at either end. The exponent then leans the whole curve forward. The result
 * always starts fast, never stalls, and lands on exactly 100% as the video
 * ends rather than arriving early and sitting there.
 */
export const pacedPct = (elapsed: number, duration: number) => {
  if (!(duration > 0)) return 0;
  const t = Math.min(1, Math.max(0, elapsed / duration));
  const w = 2 * Math.PI * CYCLES;
  // f(0) = 0, f(1) = 1, f'(t) = 1 + SWING*cos(w t) > 0
  const surged = t + (SWING / w) * Math.sin(w * t);
  return Math.min(100, Math.pow(Math.min(1, Math.max(0, surged)), LEAD) * 100);
};

/**
 * Start muted playback, retrying once the element has data.
 *
 * Only NotAllowedError means the browser actually refused. A bare play() on a
 * freshly mounted element also rejects with AbortError whenever a reload
 * supersedes it — which React's development double-invoke triggers every time.
 */
export function startMuted(
  video: HTMLVideoElement,
  onBlocked: () => void
): () => void {
  let cancelled = false;
  video.muted = true;

  const attempt = () => {
    if (cancelled) return;
    const p = video.play();
    if (!p) return;
    p.catch((err: unknown) => {
      if (cancelled) return;
      if ((err as { name?: string })?.name === "NotAllowedError") onBlocked();
    });
  };

  attempt();
  video.addEventListener("canplay", attempt);
  return () => {
    cancelled = true;
    video.removeEventListener("canplay", attempt);
  };
}

/**
 * Turn the sound on at the visitor's first interaction anywhere on the page.
 *
 * No browser will autoplay audio cold, but the block lifts the moment the page
 * receives a real gesture. Listening page-wide means an ordinary tap or scroll
 * arms the audio, so no one has to be asked to click a prompt first. Only
 * gestures that actually grant activation count — plain scroll and mousemove
 * do not, so they are deliberately absent here.
 */
export function useGestureUnmute(
  videoRef: React.RefObject<HTMLVideoElement | null>,
  enabled: boolean,
  onUnmuted: () => void
) {
  useEffect(() => {
    if (!enabled) return;
    const events = ["pointerdown", "touchstart", "keydown", "click"] as const;

    const arm = () => {
      const v = videoRef.current;
      if (!v) return;
      v.muted = false;
      v.volume = 1;
      if (v.paused) v.play().catch(() => {});
      onUnmuted();
      events.forEach((e) => window.removeEventListener(e, arm));
    };

    events.forEach((e) =>
      window.addEventListener(e, arm, { once: false, passive: true })
    );
    return () => events.forEach((e) => window.removeEventListener(e, arm));
  }, [videoRef, enabled, onUnmuted]);
}

type Props = {
  src: string;
  poster?: string;
  /** Reported on every frame so a parent (e.g. the sticky rail) can mirror state. */
  onProgress?: (elapsed: number, duration: number) => void;
  className?: string;
};

export function VslPlayer({ src, poster, onProgress, className = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    return startMuted(v, () => {});
  }, []);

  // Preload can satisfy loadedmetadata before React attaches its handlers,
  // which would pin duration at 0 and freeze the bar.
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

  const handleUnmuted = useCallback(() => setMuted(false), []);
  useGestureUnmute(videoRef, muted, handleUnmuted);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    v.volume = 1;
    setMuted(v.muted);
    if (v.paused) v.play().catch(() => {});
  }, []);

  /**
   * Clicking the frame pauses and resumes.
   *
   * While still muted the click is spent turning the sound on instead — the
   * page-wide listener is unmuting off this very gesture, and pausing at the
   * same moment would read as the video breaking on first touch.
   */
  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v || muted) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }, [muted]);

  const pct = pacedPct(elapsed, duration);

  return (
    // z-[2] lifts the player over .gold-dots, which is fixed at z-index 1 and
    // would otherwise drift its particles across the footage.
    <div className={`relative z-[2] ${className}`}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-12%]"
        style={{
          background:
            "radial-gradient(ellipse 60% 70% at 50% 50%, oklch(0.42 0.16 78 / 0.34) 0%, transparent 70%)",
          filter: "blur(44px)",
        }}
      />

      <div
        className="relative aspect-video overflow-hidden rounded-[4px]"
        style={{
          border: "1px solid var(--color-hairline)",
          background: "oklch(0.04 0.005 70)",
        }}
      >
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          playsInline
          autoPlay
          muted
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
          onTimeUpdate={(e) => {
            const t = e.currentTarget.currentTime;
            const d = e.currentTarget.duration || 0;
            setElapsed(t);
            onProgress?.(t, d);
          }}
        >
          <track kind="captions" />
        </video>

        {/* Click surface — pause and resume. Sits under the sound control and
            the bar so those keep their own hit areas. */}
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
                className="flex items-center justify-center w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-full"
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
                    borderLeft: "18px solid var(--color-gold)",
                    borderTop: "12px solid transparent",
                    borderBottom: "12px solid transparent",
                  }}
                />
              </span>
            </span>
          )}
        </button>

        {/* Sound state — a quiet corner control, not a gate across the frame.
            Most visitors never reach for it: the first tap or keypress
            anywhere on the page turns the sound on by itself. */}
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Turn the sound on" : "Mute"}
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 h-9 px-3 rounded-full transition-opacity duration-500"
          style={{
            background: "oklch(0.10 0.010 70 / 0.72)",
            border: "1px solid var(--color-gold-deep)",
            backdropFilter: "blur(6px)",
            opacity: muted ? 1 : 0.45,
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
            {muted ? (
              <>
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </>
            ) : (
              <path d="M15.5 8.5a5 5 0 0 1 0 7" />
            )}
          </svg>
          {muted && (
            <span className="eyebrow text-[10px] tracking-[0.18em] text-[var(--color-gold)]">
              Sound
            </span>
          )}
        </button>

        {/* Pacing bar */}
        <div
          aria-hidden
          className="absolute bottom-0 inset-x-0 z-30"
          style={{ background: "oklch(1 0 0 / 0.12)", height: 10 }}
        >
          <div
            className="relative h-full transition-[width] duration-300 ease-linear"
            style={{
              width: `${pct}%`,
              background:
                "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold) 45%, var(--color-gold-deep) 100%)",
              boxShadow: "0 0 16px -1px oklch(0.78 0.165 78 / 0.85)",
            }}
          >
            {/* Playhead at the leading edge */}
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
    </div>
  );
}
