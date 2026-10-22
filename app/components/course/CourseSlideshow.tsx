"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { VideoFrame } from "../VideoFrame";
import { profiles } from "../ClientPortfolio";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

type Slide = {
  name: string;
  result?: string;
  videoSrc?: string;
  embedUrl?: string;
  videoPoster?: string;
  aspect?: string;
  /** Eyebrow above the name, e.g. "Actor // Business Owner". */
  role?: string;
  /** Short write-up shown under the figure. `**text**` is set in gold. */
  bio?: string[];
};

/** Renders `**...**` spans in gold; everything else as plain text. */
const withGold = (text: string) =>
  text.split(/\*\*(.+?)\*\*/g).map((part, n) =>
    n % 2 ? (
      <strong key={n} className="font-semibold text-[var(--color-gold)]">
        {part}
      </strong>
    ) : (
      part
    ),
  );

/**
 * K.C. Wolf leads — Hamza wants his video at the top of the sales page.
 * This is his full testimonial; the source is only 360x640, so it is
 * shown as-is rather than upscaled.
 */
const KC_WOLF: Slide = {
  name: "K.C. Wolf",
  result: "$10K → $30K / month",
  videoSrc: "/testimonials/course/kc-wolf.mp4",
  // The video opens on a shot of trees; this is a frame from 0:45.
  videoPoster: "/testimonials/course/kc-wolf-poster.jpg",
  aspect: "9 / 16",
  role: "Actor // Business Owner",
  bio: [
    "K.C. Wolf entered the program fighting battles behind the scenes that were holding him back from his true potential.",
    "He emerged with a renewed sense of purpose, opening doors to new acting roles and auditions while scaling his social media marketing business to **over $30,000 per month.**",
  ],
};

const SLIDES: Slide[] = [
  KC_WOLF,
  ...profiles
    .filter((p) => p.videoSrc || p.videoEmbedUrl)
    .map((p) => ({
      name: p.name,
      result: p.result,
      videoSrc: p.videoSrc,
      embedUrl: p.videoEmbedUrl,
      videoPoster: p.videoPoster,
      aspect: p.videoAspect,
    })),
];

const titleCase = (s: string) =>
  s.toLowerCase().replace(/(^|[\s.])\S/g, (c) => c.toUpperCase());

/**
 * The scrolling testimonials — one client at a time, arrows to move.
 *
 * A slideshow rather than a stacked roster, per Hamza's reference: the
 * proof stays dense without pushing the rest of the page a mile down.
 * Each slide carries its figure, since the number is what converts.
 */
export function CourseSlideshow() {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [dir, setDir] = useState(1);
  const slide = SLIDES[i];
  const hasMedia = !!(slide.videoSrc || slide.embedUrl);
  const vertical = slide.aspect
    ? (() => {
        const [w, h] = slide.aspect.split("/").map((n) => parseFloat(n));
        return h > w;
      })()
    : false;

  const go = (step: number) => {
    setDir(step);
    setI((cur) => (cur + step + SLIDES.length) % SLIDES.length);
  };

  return (
    <section className="relative pb-24 lg:pb-32 overflow-hidden" aria-roledescription="carousel" aria-label="Client results">
      <div className="mx-auto max-w-[760px] px-6 lg:px-10">
        <div
          className="relative rounded-[14px] p-5 sm:p-7"
          style={{
            border: "1px solid var(--color-hairline)",
            background: "oklch(0.07 0.006 70)",
          }}
        >
          <div className="relative min-h-[420px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={i}
                custom={dir}
                initial={{ opacity: 0, x: reduced ? 0 : dir * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduced ? 0 : dir * -40 }}
                transition={{ duration: 0.45, ease: easeOutExpo }}
                className="w-full"
              >
                <div className={`mx-auto ${vertical ? "max-w-[320px]" : "max-w-[640px]"}`}>
                  {hasMedia ? (
                    <VideoFrame
                      key={slide.name}
                      videoSrc={slide.videoSrc}
                      embedUrl={slide.embedUrl}
                      videoPoster={slide.videoPoster}
                      aspect={slide.aspect}
                      runtime="00:00"
                      progress={0.02}
                    />
                  ) : (
                    <div
                      className="flex flex-col items-center justify-center gap-3 rounded-[6px]"
                      style={{
                        aspectRatio: slide.aspect ?? "16 / 9",
                        border: "1px dashed var(--color-gold-deep)",
                        background: "oklch(0.06 0.006 70)",
                      }}
                    >
                      <span className="eyebrow text-[10px] tracking-[0.22em] text-[var(--color-ivory-faint)]">
                        Video pending
                      </span>
                    </div>
                  )}
                </div>

                <div className="mt-6 text-center">
                  <p className="font-display font-bold text-[20px] lg:text-[22px] text-[var(--color-ivory)]">
                    {titleCase(slide.name)}
                  </p>
                  {slide.result && (
                    <p className="mt-1.5 text-[var(--color-gold)] text-[15px] lg:text-[16px] tabular-nums">
                      {slide.result}
                    </p>
                  )}
                  {slide.role && (
                    <p className="mt-4 eyebrow text-[10px] tracking-[0.22em] text-[var(--color-ivory-faint)]">
                      {slide.role}
                    </p>
                  )}
                  {slide.bio?.map((para, n) => (
                    <p
                      key={n}
                      className="mt-3 max-w-[52ch] mx-auto text-[var(--color-ivory-dim)] text-[15px] lg:text-[16px] leading-[1.7]"
                    >
                      {withGold(para)}
                    </p>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2" aria-hidden>
              {SLIDES.map((s, n) => (
                <span
                  key={s.name}
                  className="block h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: n === i ? 18 : 6,
                    background: n === i ? "var(--color-gold)" : "var(--color-hairline)",
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              {[
                { step: -1, label: "Previous testimonial", glyph: "←" },
                { step: 1, label: "Next testimonial", glyph: "→" },
              ].map((b) => (
                <button
                  key={b.step}
                  type="button"
                  onClick={() => go(b.step)}
                  aria-label={b.label}
                  className="flex items-center justify-center w-11 h-11 rounded-full text-[18px] text-[var(--color-ivory)] transition-colors duration-300 hover:text-[var(--color-gold)]"
                  style={{ border: "1px solid var(--color-hairline)" }}
                >
                  {b.glyph}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
