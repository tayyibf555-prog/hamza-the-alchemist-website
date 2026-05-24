"use client";

import {
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";

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
 *   • Plays on every page load (no session skip — the door is always
 *     the door).
 *   • prefers-reduced-motion bypasses the sequence entirely.
 *   • Click anywhere on the overlay or press Esc to skip ahead.
 */
export function EntrySequence({ children }: Props) {
  // Default to playing so the loader renders in the SSR HTML and shows on
  // first paint. A synchronous layout effect skips only for reduced motion.
  const [active, setActive] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  // Decide skip path synchronously before paint (reduced motion only)
  useIsoLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) {
      setActive(false);
      setDismissed(true);
    }
  }, []);

  // Run the timed auto-dismiss + key/click listeners while the loader is active
  useEffect(() => {
    if (!active || dismissed) return;

    // Lock body scroll and pin scroll to top while the intro plays
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

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

  // Once dismissed: aggressively pin scroll to top for a short window
  // after the body is unlocked. The browser may try to restore the
  // previous scroll position the moment the page becomes scrollable
  // again — these scroll-to-top assertions defeat that.
  useEffect(() => {
    if (!dismissed || !active) return;

    const snap = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };

    // Snap synchronously now and on a rAF chain for ~800ms
    snap();
    let frames = 50;
    let rafId = requestAnimationFrame(function tick() {
      snap();
      if (--frames > 0) rafId = requestAnimationFrame(tick);
    });
    const t1 = window.setTimeout(snap, 500);
    const t2 = window.setTimeout(snap, 1200);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
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
