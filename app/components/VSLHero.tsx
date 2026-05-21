"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SectionMarker } from "./SectionMarker";
import { TridentMark } from "./TridentMark";
import { Particles } from "./Particles";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: easeOutExpo },
  },
});

/**
 * Folio I · Orientation — VSL-anchored hero.
 *
 * The video is the salesperson. The page is the frame around it.
 * No competing CTA, no competing copy. A short eyebrow above, a single
 * line below the video, one quiet CTA, a Latin band along the bottom.
 *
 * The 16:9 placeholder is hairline-gold-framed with a trident-inside-circle
 * play affordance, runtime label, and chapter markers visible so it reads
 * as "an actual film," not "a video player placeholder."
 */
export function VSLHero() {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex flex-col overflow-hidden pt-[76px]"
    >
      <Particles count={32} />

      <SectionMarker index="I" label="Orientation" />


      {/* Main column */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="mx-auto max-w-[1100px] w-full px-6 lg:px-10 py-16 lg:py-20">
          {/* Eyebrow */}
          <motion.p
            variants={fadeIn(1.0)}
            initial="hidden"
            animate="visible"
            className="eyebrow text-[var(--color-gold)] text-center mb-10"
          >
            Orientation · The 21st Century Alchemist
          </motion.p>

          {/* Pre-headline (above the video, sets the frame) */}
          <motion.h1
            initial={{ opacity: 0, y: reduced ? 0 : 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 1.2, ease: easeOutExpo }}
            className="font-display font-extrabold text-balance text-center leading-[1.0] tracking-[-0.025em] text-[clamp(32px,4.4vw,68px)] text-[var(--color-ivory)] mb-12 lg:mb-16"
          >
            Watch this before you{" "}
            <span
              className="accent text-[var(--color-gold)]"
              style={{ textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.4)" }}
            >
              apply.
            </span>
          </motion.h1>

          {/* The video frame */}
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, delay: 1.6, ease: easeOutExpo }}
            className="relative"
          >
            <VideoFrame playing={playing} onPlay={() => setPlaying(true)} />
          </motion.div>

          {/* Below-video caption + CTA */}
          <motion.div
            variants={fadeIn(2.1)}
            initial="hidden"
            animate="visible"
            className="mt-10 lg:mt-14 flex flex-col items-center gap-8"
          >
            <p className="accent text-[var(--color-ivory)] text-[clamp(18px,1.6vw,22px)] text-center max-w-[44ch]">
              Nine minutes. Identity, frequency, outcome.
            </p>

            <a
              href="#inquiry"
              className="group relative inline-flex items-center gap-3 h-[60px] px-9 eyebrow rounded-[3px] text-[var(--color-ink-deep)] overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)",
                boxShadow:
                  "0 0 0 1px oklch(0.62 0.14 70 / 0.4), 0 18px 48px -12px oklch(0.78 0.165 78 / 0.55)",
              }}
            >
              <span className="relative z-10 font-semibold tracking-[0.2em] text-[13px]">
                Inquire About Admission
              </span>
              <span
                aria-hidden
                className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1"
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              >
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Bottom hairline — quiet closer, no decoration */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.0, delay: 2.4, ease: easeOutExpo }}
        className="relative"
        style={{ borderTop: "1px solid var(--color-hairline)" }}
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 h-[56px] flex items-center justify-end">
          <div className="hidden md:flex items-center gap-3 text-[var(--color-ivory-faint)]">
            <span className="eyebrow">Scroll</span>
            <span
              aria-hidden
              className="block w-2 h-2 rounded-full bg-[var(--color-gold)]"
              style={{ boxShadow: "0 0 10px oklch(0.78 0.165 78 / 0.7)" }}
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ─── Video frame ─────────────────────────────────────────── */

function VideoFrame({
  playing,
  onPlay,
}: {
  playing: boolean;
  onPlay: () => void;
}) {
  return (
    <div className="relative">
      {/* Outer hairline-gold frame */}
      <div
        className="relative rounded-[6px] overflow-hidden"
        style={{
          border: "1px solid var(--color-hairline)",
          padding: "1px",
          background:
            "linear-gradient(135deg, oklch(0.62 0.14 70 / 0.5) 0%, oklch(0.20 0.014 70) 35%, oklch(0.20 0.014 70) 65%, oklch(0.62 0.14 70 / 0.5) 100%)",
          boxShadow:
            "0 0 0 1px oklch(0.28 0.008 75), 0 40px 80px -24px oklch(0.10 0.010 70 / 0.8), 0 0 80px -20px oklch(0.78 0.165 78 / 0.4)",
        }}
      >
        {/* Inner 16:9 placeholder */}
        <div
          className="relative aspect-video w-full rounded-[5px] overflow-hidden flex items-center justify-center"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, oklch(0.22 0.06 75) 0%, oklch(0.12 0.014 70) 70%)",
          }}
        >
          {/* Chapter ticks along the bottom edge */}
          <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-3 pointer-events-none">
            <span className="eyebrow text-[10px] text-[var(--color-ivory-faint)]">
              00:00
            </span>
            <div className="flex-1 relative h-px bg-[var(--color-hairline)]">
              {[0.18, 0.32, 0.51, 0.7, 0.86].map((p, i) => (
                <span
                  key={i}
                  className="absolute -top-[3px] w-px h-[7px]"
                  style={{
                    left: `${p * 100}%`,
                    background: "var(--color-hairline)",
                  }}
                />
              ))}
              {/* Gold marker showing "where we are" — quietly hinting it's a real timeline */}
              <span
                className="absolute -top-[3px] w-px h-[7px]"
                style={{ left: "8%", background: "var(--color-gold)" }}
              />
            </div>
            <span className="eyebrow text-[10px] text-[var(--color-gold)]">
              08:42
            </span>
          </div>

          {/* The faint big trident as a watermark behind the play */}
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center opacity-[0.08] text-[var(--color-ivory)] pointer-events-none"
            style={{ filter: "blur(0.4px)" }}
          >
            <div className="w-[42%] h-[80%]">
              <TridentMark className="w-full h-full" />
            </div>
          </div>

          {/* Play button — trident inside a gold ring */}
          {!playing && (
            <button
              type="button"
              onClick={onPlay}
              aria-label="Play orientation video"
              className="group relative z-20 flex items-center justify-center w-[88px] h-[88px] md:w-[120px] md:h-[120px] rounded-full transition-transform duration-300"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.18 0.014 70 / 0.85) 0%, oklch(0.14 0.012 70 / 0.6) 100%)",
                border: "1px solid var(--color-gold)",
                boxShadow:
                  "0 0 0 6px oklch(0.78 0.165 78 / 0.08), 0 0 32px -4px oklch(0.78 0.165 78 / 0.6)",
                transitionTimingFunction: "var(--ease-out-expo)",
              }}
            >
              {/* Pulsing outer ring */}
              <span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px solid var(--color-gold)",
                  animation: "play-pulse 2.4s var(--ease-in-out-quart) infinite",
                  opacity: 0.6,
                }}
              />
              {/* Play triangle */}
              <span
                aria-hidden
                className="block w-0 h-0 ml-2 transition-transform duration-300 group-hover:scale-110"
                style={{
                  borderLeft: "20px solid var(--color-gold)",
                  borderTop: "13px solid transparent",
                  borderBottom: "13px solid transparent",
                  filter: "drop-shadow(0 0 12px oklch(0.78 0.165 78 / 0.6))",
                  transitionTimingFunction: "var(--ease-out-expo)",
                }}
              />
            </button>
          )}

          {/* Placeholder content visible after "play" — replace with real video embed */}
          {playing && (
            <div className="absolute inset-0 flex items-center justify-center text-center px-8">
              <p className="text-[var(--color-ivory-dim)] text-[14px] max-w-[40ch]">
                Embed your VSL here. Replace the &lt;VideoFrame /&gt;{" "}
                <code className="text-[var(--color-gold)]">playing</code> branch
                with an <code className="text-[var(--color-gold)]">&lt;iframe&gt;</code> or{" "}
                <code className="text-[var(--color-gold)]">&lt;video&gt;</code> source.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Frame caption — just runtime, no folio stamp */}
      <div className="mt-5 flex items-center justify-end">
        <span className="eyebrow text-[var(--color-ivory-faint)]">
          Runtime · 08:42
        </span>
      </div>

      {/* Pulse keyframe */}
      <style jsx>{`
        @keyframes play-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
