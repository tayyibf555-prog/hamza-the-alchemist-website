"use client";

import { useState } from "react";
import { TridentMark } from "./TridentMark";

type Props = {
  /** Visible runtime label, e.g. "08:42". Purely cosmetic until a real video is embedded. */
  runtime?: string;
  /** Position of the gold marker along the chapter timeline (0-1). */
  progress?: number;
  /** Show the caption row below the frame with the runtime. */
  showCaption?: boolean;
  /** YouTube video id, e.g. "X2ObLdwGbZI". When set, clicking play loads the real embed. */
  youtubeId?: string;
};

/**
 * VSL placeholder frame: hairline-gold-bordered 16:9 container with
 * a faint trident watermark, a chapter timeline along the bottom edge,
 * and a pulsing gold play button. Click to "play" — currently swaps in
 * a placeholder note where the real video embed should go.
 *
 * Shared between the homepage VSLHero and any other page that wants a
 * VSL block (e.g. /method).
 */
export function VideoFrame({
  runtime = "08:42",
  progress = 0.08,
  showCaption = false,
  youtubeId,
}: Props) {
  const [playing, setPlaying] = useState(false);

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
            background: youtubeId
              ? "oklch(0.05 0.005 70)"
              : "radial-gradient(ellipse at 50% 45%, oklch(0.22 0.06 75) 0%, oklch(0.12 0.014 70) 70%)",
          }}
        >
          {/* YouTube thumbnail as the real preview when an id is set and not yet playing */}
          {youtubeId && !playing && (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`}
                alt=""
                aria-hidden
                onError={(e) => {
                  // Fall back to hqdefault if maxres isn't available
                  const t = e.currentTarget;
                  if (!t.src.includes("hqdefault")) {
                    t.src = `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
                  }
                }}
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
              {/* Featherlight tint so the play button reads clearly on bright frames */}
              <div
                aria-hidden
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                  background: "oklch(0.05 0.005 70 / 0.18)",
                }}
              />
            </>
          )}

          {/* Chapter ticks — only on the abstract placeholder (no youtubeId yet) */}
          {!playing && !youtubeId && (
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
              <span
                className="absolute -top-[3px] w-px h-[7px]"
                style={{
                  left: `${progress * 100}%`,
                  background: "var(--color-gold)",
                }}
              />
            </div>
            <span className="eyebrow text-[10px] text-[var(--color-gold)]">
              {runtime}
            </span>
          </div>
          )}

          {/* Faint trident watermark — only on the abstract placeholder (no youtubeId yet) */}
          {!playing && !youtubeId && (
          <div
            aria-hidden
            className="absolute inset-0 flex items-center justify-center opacity-[0.08] text-[var(--color-ivory)] pointer-events-none"
            style={{ filter: "blur(0.4px)" }}
          >
            <div className="w-[42%] h-[80%]">
              <TridentMark className="w-full h-full" />
            </div>
          </div>
          )}

          {/* Play button — trident inside a gold ring */}
          {!playing && (
            <button
              type="button"
              onClick={() => setPlaying(true)}
              aria-label="Play video"
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
              <span
                aria-hidden
                className="absolute inset-0 rounded-full"
                style={{
                  border: "1px solid var(--color-gold)",
                  animation: "play-pulse 2.4s var(--ease-in-out-quart) infinite",
                  opacity: 0.6,
                }}
              />
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

          {playing && youtubeId && (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title="Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
            />
          )}

          {playing && !youtubeId && (
            <div className="absolute inset-0 flex items-center justify-center text-center px-8">
              <p className="text-[var(--color-ivory-dim)] text-[14px] max-w-[40ch]">
                Embed your VSL here. Pass a{" "}
                <code className="text-[var(--color-gold)]">youtubeId</code> prop
                to <code className="text-[var(--color-gold)]">&lt;VideoFrame /&gt;</code>{" "}
                to load the real video.
              </p>
            </div>
          )}
        </div>
      </div>

      {showCaption && (
        <div className="mt-5 flex items-center justify-end">
          <span className="eyebrow text-[var(--color-ivory-faint)]">
            Runtime · {runtime}
          </span>
        </div>
      )}

      <style jsx>{`
        @keyframes play-pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
