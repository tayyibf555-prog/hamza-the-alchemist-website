"use client";

import {
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE_KEY = "hta_entered_v3";

/** Bumped to v3 to bypass any stale flags from earlier scroll-driven version. */

const TOTAL_DURATION_MS = 3400;

// useLayoutEffect on the client, no-op on the server (avoids React's warning)
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  /** The rest of the site, revealed once the loader is dismissed. */
  children: ReactNode;
};

/**
 * Startup intro — liquid-metal logo reveal.
 *
 *   1. Full-screen ink/gold overlay fades in.
 *   2. Logo materialises through an SVG turbulence + displacement filter
 *      (chaotic ripple resolving into the clean mark over ~2.4s).
 *   3. A diagonal gold sheen sweeps across the logo.
 *   4. Wordmark fades up beneath the logo.
 *   5. "Click or press Esc to skip" cue appears.
 *   6. At 3.4s the overlay fades out and the site is revealed.
 *
 *   • Plays once per session (sessionStorage flag, set after dismissal).
 *   • prefers-reduced-motion bypasses the sequence entirely.
 *   • Click anywhere on the overlay or press Esc to skip ahead.
 */
export function EntrySequence({ children }: Props) {
  // Default to playing so the loader renders in the SSR HTML and shows on
  // first paint. A synchronous layout effect decides whether to skip.
  const [active, setActive] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  // Decide skip path synchronously before paint
  useIsoLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let seen = false;
    try {
      seen = window.sessionStorage.getItem(STORAGE_KEY) === "1";
    } catch {}

    if (reduced || seen) {
      setActive(false);
      setDismissed(true);
    }
  }, []);

  // Run the timed auto-dismiss + key/click listeners while the loader is active
  useEffect(() => {
    if (!active || dismissed) return;

    // Lock body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const dismiss = () => setDismissed(true);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };

    const timeout = window.setTimeout(dismiss, TOTAL_DURATION_MS);
    document.addEventListener("keydown", onKey);

    return () => {
      window.clearTimeout(timeout);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, dismissed]);

  // Once dismissed, set the session flag so subsequent reloads skip
  useEffect(() => {
    if (dismissed && active) {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, "1");
      } catch {}
    }
  }, [dismissed, active]);

  // Skip path — render children straight away (no overlay)
  if (!active) {
    return <>{children}</>;
  }

  return (
    <>
      <div
        role="presentation"
        aria-hidden="true"
        onClick={() => setDismissed(true)}
        className={`intro-overlay${dismissed ? " intro-overlay--done" : ""}`}
      >
        {/* SVG with liquid-metal filter applied to the logo image */}
        <svg className="intro-logo" viewBox="0 0 200 200">
          <defs>
            <filter
              id="liquidMetal"
              x="-30%"
              y="-30%"
              width="160%"
              height="160%"
            >
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.04"
                numOctaves={3}
                seed={3}
                result="turb"
              >
                <animate
                  attributeName="baseFrequency"
                  dur="2.4s"
                  values="0.08;0.04;0.015;0.01"
                  keyTimes="0;0.4;0.8;1"
                  fill="freeze"
                />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="turb" scale="80">
                <animate
                  attributeName="scale"
                  dur="2.4s"
                  values="100;55;15;0"
                  keyTimes="0;0.4;0.8;1"
                  fill="freeze"
                />
              </feDisplacementMap>
            </filter>
          </defs>
          <g filter="url(#liquidMetal)">
            <image
              href="/logo-clean.png"
              x="20"
              y="20"
              width="160"
              height="160"
              preserveAspectRatio="xMidYMid meet"
            />
          </g>
        </svg>

        {/* Sheen — diagonal gold sweep across the logo */}
        <div aria-hidden="true" className="intro-sheen" />

        {/* Wordmark beneath the logo */}
        <div className="intro-wordmark">
          Hamza <span className="intro-wordmark-accent">The Alchemist</span>
        </div>

        {/* Skip hint */}
        <div className="intro-skip">Click or press Esc to skip</div>
      </div>

      {children}
    </>
  );
}
