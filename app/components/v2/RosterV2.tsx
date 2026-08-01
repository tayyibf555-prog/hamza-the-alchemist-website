"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { OPERATORS, type Operator } from "../../lib/vsl-content";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

function Player({ op }: { op: Operator }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className="relative overflow-hidden rounded-[4px]"
      style={{
        aspectRatio: op.aspect,
        border: "1px solid var(--color-hairline)",
        background: "oklch(0.04 0.005 70)",
      }}
    >
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
            className="flex items-center justify-center w-[58px] h-[58px] rounded-full"
            style={{
              background: "oklch(0.10 0.010 70 / 0.85)",
              border: "1px solid var(--color-gold)",
              boxShadow: "0 0 28px -6px oklch(0.78 0.165 78 / 0.5)",
            }}
          >
            <span
              aria-hidden
              className="block w-0 h-0 ml-1 transition-transform duration-300 group-hover:scale-110"
              style={{
                borderLeft: "15px solid var(--color-gold)",
                borderTop: "9px solid transparent",
                borderBottom: "9px solid transparent",
                transitionTimingFunction: "var(--ease-out-expo)",
              }}
            />
          </span>
        </button>
      )}
    </div>
  );
}

function Result({ op }: { op: Operator }) {
  return (
    <>
      <h3 className="font-display font-extrabold uppercase leading-none tracking-[-0.015em] text-[clamp(22px,2.6vw,32px)] text-[var(--color-ivory)]">
        {op.name}
      </h3>
      <p className="eyebrow text-[11px] text-[var(--color-gold)] mt-3">
        {op.role}
      </p>
      <p className="mt-5 text-[var(--color-ivory-dim)] text-[16px] leading-[1.7]">
        {op.result.before}
        <span className="accent text-[var(--color-gold)]">{op.result.gold}</span>
        {op.result.after}
      </p>
    </>
  );
}

/**
 * The Roster — asymmetric two-tier, not three equal cards.
 * Nathan's 16:9 leads as the featured row; the two 9:16 verticals sit
 * beneath as a pair, so the grid never reads as a testimonial template.
 */
export function RosterV2() {
  const reduced = useReducedMotion();
  const featured = OPERATORS.find((o) => o.aspect === "16 / 9");
  const verticals = OPERATORS.filter((o) => o.aspect !== "16 / 9");

  return (
    <section
      className="relative py-24 lg:py-36 overflow-hidden"
      style={{ borderTop: "1px solid var(--color-hairline)" }}
    >
      <div className="mx-auto max-w-[1080px] px-6 lg:px-10">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="font-display font-extrabold text-balance leading-[1.04] tracking-[-0.025em] text-[clamp(30px,4.2vw,54px)] text-[var(--color-ivory)]">
            Same market. Same hours.{" "}
            <span className="accent text-[var(--color-gold)]">
              A different ceiling.
            </span>
          </h2>
          <p className="mt-7 max-w-[56ch] mx-auto text-[var(--color-ivory-dim)] text-[16px] leading-[1.7]">
            Three men who were not underperforming. They were performing
            exactly at the level they believed they were.
          </p>
        </div>

        {/* Tier one — featured */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-12% 0px -12% 0px" }}
            transition={{ duration: 0.9, ease: easeOutExpo }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 lg:mb-20"
          >
            <div className="lg:col-span-7">
              <Player op={featured} />
            </div>
            <div className="lg:col-span-5">
              <Result op={featured} />
            </div>
          </motion.div>
        )}

        {/* Tier two — the pair */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {verticals.map((op, i) => (
            <motion.div
              key={op.name}
              initial={{ opacity: 0, y: reduced ? 0 : 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{
                duration: 0.9,
                delay: i * 0.08,
                ease: easeOutExpo,
              }}
              className="flex flex-col"
            >
              <div className="max-w-[260px] w-full mx-auto md:mx-0 mb-7">
                <Player op={op} />
              </div>
              <Result op={op} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
