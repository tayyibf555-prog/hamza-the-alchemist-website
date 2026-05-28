"use client";

import {
  useEffect,
  useLayoutEffect,
  useState,
  type ReactNode,
} from "react";
import { TridentMark } from "./TridentMark";

const TOTAL_DURATION_MS = 2700;

// useLayoutEffect on the client, no-op on the server (avoids React's warning)
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  /** The rest of the site, revealed once the loader is dismissed. */
  children: ReactNode;
};

/**
 * Startup intro — logo split-open reveal.
 *
 * Timeline (~2.7s):
 *   0–50ms       overlay holds dark
 *   50–450ms     trident fades + scales in (overshoot to 1.06, settle to 1)
 *   450–550ms    brief hold at full size
 *   550–2550ms   logo splits down the middle very slowly — left half
 *                drifts off-screen to the left, right half drifts to
 *                the right, 2s glide with gentle ease-out
 *   1850–2550ms  veil fades out while halves continue drifting
 *   2700ms       overlay completely gone, site revealed
 *
 *   • Plays on every page load.
 *   • prefers-reduced-motion bypasses entirely.
 *   • Click anywhere on the overlay or press Esc to skip ahead.
 */
export function EntrySequence({ children }: Props) {
  const [active, setActive] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  // Skip path: reduced motion
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

  // Auto-dismiss + key/click listeners
  useEffect(() => {
    if (!active || dismissed) return;

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

  // Once dismissed: pin scroll to top briefly (bails on user input)
  useEffect(() => {
    if (!dismissed || !active) return;

    let userScrolling = false;
    const bail = () => {
      userScrolling = true;
    };
    const onKey = (e: KeyboardEvent) => {
      if (
        e.key === "ArrowUp" ||
        e.key === "ArrowDown" ||
        e.key === "PageUp" ||
        e.key === "PageDown" ||
        e.key === " " ||
        e.key === "Home" ||
        e.key === "End"
      )
        bail();
    };

    window.addEventListener("wheel", bail, { passive: true, once: true });
    window.addEventListener("touchstart", bail, { passive: true, once: true });
    window.addEventListener("keydown", onKey);

    const snap = () => {
      if (!userScrolling && window.scrollY !== 0) window.scrollTo(0, 0);
    };
    snap();
    const t1 = window.setTimeout(snap, 300);

    return () => {
      window.removeEventListener("wheel", bail);
      window.removeEventListener("touchstart", bail);
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t1);
    };
  }, [dismissed, active]);

  // Skip path — render children straight away
  if (!active) {
    return <>{children}</>;
  }

  return (
    <>
      <section
        role="presentation"
        aria-hidden="true"
        onClick={() => setDismissed(true)}
        className={`intro-overlay${dismissed ? " intro-overlay--done" : ""}`}
      >
        {/* Dark veil — fades out near the end of the split */}
        <div aria-hidden="true" className="intro-veil" />

        {/* Left half of the logo — clipped to show only the left side */}
        <div className="intro-logo intro-logo--left">
          <TridentMark className="w-full h-full" glow />
        </div>

        {/* Right half of the logo — clipped to show only the right side */}
        <div className="intro-logo intro-logo--right">
          <TridentMark className="w-full h-full" glow />
        </div>

        {/* Wordmark revealed between the splitting halves */}
        <div className="intro-wordmark">
          The 21st Century{" "}
          <span className="intro-wordmark-accent">Alchemist</span>
        </div>
      </section>

      {children}
    </>
  );
}
