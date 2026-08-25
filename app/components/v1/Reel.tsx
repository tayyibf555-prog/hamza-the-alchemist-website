"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { OPERATORS, type Operator } from "../../lib/vsl-content";
import { APPLY_URL } from "../../lib/links";
import { ApplyButton } from "./ApplyButton";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

function isVertical(aspect: string) {
  const [w, h] = aspect.split("/").map((n) => parseFloat(n.trim()));
  return Number.isFinite(w) && Number.isFinite(h) && h > w;
}

function ReelRow({ op, index }: { op: Operator; index: number }) {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const vertical = isVertical(op.aspect);

  return (
    <motion.article
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: easeOutExpo }}
      className="py-14 lg:py-20"
      style={{ borderTop: "1px solid var(--color-hairline)" }}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-10 lg:gap-16">
        {/* Player at its true aspect — the uneven rhythm is the point */}
        <div
          className={`relative shrink-0 mx-auto md:mx-0 w-full ${
            vertical ? "max-w-[260px]" : "max-w-[520px]"
          }`}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-[-12%]"
            style={{
              background:
                "radial-gradient(ellipse 60% 70% at 50% 50%, oklch(0.42 0.16 78 / 0.32) 0%, transparent 70%)",
              filter: "blur(40px)",
            }}
          />
          <div
            className="relative overflow-hidden rounded-[4px]"
            style={{
              aspectRatio: op.aspect,
              border: "1px solid var(--color-hairline)",
              background: "oklch(0.04 0.005 70)",
            }}
          >
            {/* Self-hosted clips */}
            {op.videoSrc && (
              <video
                src={op.videoSrc}
                controls={playing}
                playsInline
                preload="metadata"
                className="absolute inset-0 w-full h-full object-cover"
                onPlay={() => setPlaying(true)}
              >
                <track kind="captions" />
              </video>
            )}

            {/* Embedded clips (Loom) — poster until clicked */}
            {op.embedUrl && !playing && op.poster && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={op.poster}
                alt=""
                aria-hidden
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {op.embedUrl && playing && (
              <iframe
                src={op.embedUrl}
                title={`${op.name} testimonial`}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full z-20"
                style={{ border: 0 }}
              />
            )}

            {!playing && (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label={`Play ${op.name}'s testimonial`}
                className="group absolute inset-0 z-10 flex items-center justify-center"
                style={{ background: "oklch(0.04 0.005 70 / 0.2)" }}
              >
                <span
                  className="flex items-center justify-center w-[64px] h-[64px] rounded-full"
                  style={{
                    background: "oklch(0.10 0.010 70 / 0.8)",
                    border: "1px solid var(--color-gold)",
                    boxShadow: "0 0 30px -6px oklch(0.78 0.165 78 / 0.5)",
                  }}
                >
                  <span
                    aria-hidden
                    className="block w-0 h-0 ml-1 transition-transform duration-300 group-hover:scale-110"
                    style={{
                      borderLeft: "16px solid var(--color-gold)",
                      borderTop: "10px solid transparent",
                      borderBottom: "10px solid transparent",
                      transitionTimingFunction: "var(--ease-out-expo)",
                    }}
                  />
                </span>
              </button>
            )}
          </div>
        </div>

        {/* Copy */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="font-display font-extrabold uppercase leading-none tracking-[-0.015em] text-[clamp(26px,3vw,38px)] text-[var(--color-ivory)]">
            {op.name}
          </h3>
          <p className="eyebrow text-[11px] text-[var(--color-gold)] mt-3">
            {op.role}
          </p>
          <p className="mt-6 text-[var(--color-ivory-dim)] text-[17px] leading-[1.7] max-w-[52ch] mx-auto md:mx-0">
            {op.result.before}
            <span className="accent text-[var(--color-gold)]">
              {op.result.gold}
            </span>
            {op.result.after}
          </p>
        </div>
      </div>
    </motion.article>
  );
}

/** The Reel — three full-width rows, not three equal cards. */
export function Reel() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10">
        <div className="text-center mb-6">
          <p className="eyebrow text-[var(--color-gold)] mb-5">The Reel</p>
          <h2 className="font-display font-extrabold text-balance leading-[1.04] tracking-[-0.02em] text-[clamp(30px,4.2vw,56px)] text-[var(--color-ivory)]">
            Same market. Same hours. Different{" "}
            <span className="accent text-[var(--color-gold)]">self.</span>
          </h2>
        </div>

        {OPERATORS.map((op, i) => (
          <ReelRow key={op.name} op={op} index={i} />
        ))}

        <div
          className="pt-14 flex flex-col items-center text-center"
          style={{ borderTop: "1px solid var(--color-hairline)" }}
        >
          <ApplyButton href={APPLY_URL} />
          <p className="mt-4 text-[13px] text-[var(--color-ivory-faint)]">
            The same application they filled out.
          </p>
        </div>
      </div>
    </section>
  );
}
