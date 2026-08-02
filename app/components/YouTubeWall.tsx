"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./Reveal";
import { claimAudioFocus } from "../lib/audio-focus";
import {
  YOUTUBE_CHANNEL,
  YOUTUBE_FEATURES,
  youTubeId,
  type YouTubeFeature,
} from "../lib/youtube-wall";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

/**
 * One tile: caption above, thumbnail below.
 *
 * The YouTube iframe is only mounted once the tile is clicked. Embedding four
 * players on load would pull in YouTube's script four times and cost more than
 * the rest of the page combined, so until then the tile is just an image.
 */
function Feature({ item, index }: { item: YouTubeFeature; index: number }) {
  const reduced = useReducedMotion();
  const [playing, setPlaying] = useState(false);
  const id = youTubeId(item.url);
  const filled = !!id;

  return (
    <motion.div
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.9, delay: (index % 2) * 0.1, ease: easeOutExpo }}
    >
      {/* The wrapper reserves two lines and bottom-aligns, so a caption that
          wraps cannot shove its thumbnail below the tile beside it. The
          alignment must live here rather than on the <p>: making the
          paragraph itself a flex container would turn each span into a flex
          item and break the sentence into stacked blocks. */}
      <div className="mb-5 md:min-h-[2.9em] flex items-end">
        <p className="w-full text-center font-display font-bold tracking-[-0.01em] text-[clamp(15px,1.4vw,20px)] leading-[1.4] text-balance">
          <span className="text-[var(--color-ivory)]">{item.lead} </span>
          <span
            className="text-[var(--color-gold)]"
            style={{ textShadow: "0 0 30px oklch(0.78 0.165 78 / 0.35)" }}
          >
            {item.gold}
          </span>
          {item.tail && (
            <span className="text-[var(--color-ivory)]"> {item.tail}</span>
          )}
        </p>
      </div>

      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[-8%]"
          style={{
            background:
              "radial-gradient(ellipse 60% 70% at 50% 50%, oklch(0.42 0.16 78 / 0.26) 0%, transparent 70%)",
            filter: "blur(38px)",
          }}
        />

        <div
          className="relative aspect-video overflow-hidden rounded-[4px]"
          style={{
            border: "1px solid var(--color-hairline)",
            background: "oklch(0.06 0.006 70)",
          }}
        >
          {playing && id ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
              title={`${item.lead} ${item.gold} ${item.tail ?? ""}`.trim()}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          ) : filled ? (
            <button
              type="button"
              onClick={() => {
                // Cross-origin iframes give no play event, so the click that
                // mounts the player is what tells the VSL to duck.
                claimAudioFocus();
                setPlaying(true);
              }}
              aria-label={`Play: ${item.lead} ${item.gold} ${item.tail ?? ""}`.trim()}
              className="group absolute inset-0"
            >
              {/* Plain img, not next/image: YouTube's CDN would need a remote
                  pattern in next.config, and these are already optimised. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                onError={(e) => {
                  // Not every upload has a maxres still; hqdefault always exists.
                  const img = e.currentTarget;
                  if (!img.dataset.fallback) {
                    img.dataset.fallback = "1";
                    img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
                  }
                }}
              />
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "oklch(0.04 0.005 70 / 0.22)" }}
              >
                <span
                  className="flex items-center justify-center w-[64px] h-[64px] md:w-[76px] md:h-[76px] rounded-full transition-transform duration-500 group-hover:scale-105"
                  style={{
                    background: "oklch(0.10 0.010 70 / 0.82)",
                    border: "1px solid var(--color-gold)",
                    boxShadow: "0 0 32px -6px oklch(0.78 0.165 78 / 0.6)",
                    transitionTimingFunction: "var(--ease-out-expo)",
                  }}
                >
                  <span
                    aria-hidden
                    className="block w-0 h-0 ml-1.5"
                    style={{
                      borderLeft: "16px solid var(--color-gold)",
                      borderTop: "11px solid transparent",
                      borderBottom: "11px solid transparent",
                    }}
                  />
                </span>
              </span>
            </button>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <span
                aria-hidden
                className="flex items-center justify-center w-[56px] h-[56px] rounded-full"
                style={{ border: "1px dashed var(--color-gold-deep)" }}
              >
                <span
                  className="block w-0 h-0 ml-1"
                  style={{
                    borderLeft: "13px solid var(--color-gold-deep)",
                    borderTop: "9px solid transparent",
                    borderBottom: "9px solid transparent",
                  }}
                />
              </span>
              <span className="eyebrow text-[10px] tracking-[0.2em] text-[var(--color-ivory-faint)]">
                Video Slot {index + 1}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/**
 * The YouTube wall — recorded client conversations under the case studies.
 *
 * Two columns on desktop, one on mobile. Content lives in
 * app/lib/youtube-wall.ts so links can be added without touching this file.
 */
export function YouTubeWall() {
  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="mx-auto max-w-[1180px] px-6 lg:px-10">
        <div className="text-center mb-16 lg:mb-20">
          <Reveal>
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.02em] text-[clamp(30px,3.4vw,50px)] text-[var(--color-ivory)]">
              More from the{" "}
              <span className="accent text-[var(--color-gold)]">Alchemist.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-14 lg:gap-x-14 lg:gap-y-20">
          {YOUTUBE_FEATURES.map((item, i) => (
            <Feature key={i} item={item} index={i} />
          ))}
        </div>

        <Reveal delay={0.15}>
          <div className="mt-16 lg:mt-20 flex justify-center">
            <a
              href={YOUTUBE_CHANNEL}
              target="_blank"
              rel="noopener noreferrer"
              className="group eyebrow inline-flex items-center gap-3 min-h-[44px] px-4 text-[var(--color-gold)] hover:text-[var(--color-gold-soft)] transition-colors duration-200"
            >
              <span>Watch more on YouTube</span>
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                style={{ transitionTimingFunction: "var(--ease-out-expo)" }}
              >
                ↗
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
