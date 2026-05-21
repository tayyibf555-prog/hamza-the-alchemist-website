"use client";

import {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  type ReactNode,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import { TridentMark } from "./TridentMark";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

// useLayoutEffect on the client, no-op on the server (avoids React's warning)
const useIsoLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

type Props = {
  /** The rest of the site that appears once the trident expands. */
  children: ReactNode;
  /** Scroll cue copy. */
  cue?: string;
};

/**
 * Scroll-driven entry. The trident sits centered on the gold-black canvas.
 * As the visitor scrolls (wheel or touch), the mark expands; once it
 * reaches full size, the rest of the site is revealed and native scroll
 * resumes. Scrolling back to the very top re-collapses the entry.
 *
 *   • Plays on every page load — no session skip. The entry is the door.
 *   • prefers-reduced-motion bypasses the sequence (children render immediately).
 *   • Rendered on the server so it appears with the very first paint.
 */
export function EntrySequence({
  children,
  cue = "Scroll to enter the practice",
}: Props) {
  const reduced = useReducedMotion();

  // Default to "play" so the loader is in the SSR HTML and shows on first
  // paint. A synchronous layout effect on the client decides whether to
  // skip (only for prefers-reduced-motion).
  const [active, setActive] = useState(true);
  const [progress, setProgress] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const touchStartY = useRef(0);

  // Skip path: only for reduced motion. We do not persist across reloads —
  // the loader is the door, every visit walks through it.
  useIsoLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (reduced) {
      setActive(false);
      setExpanded(true);
    }
  }, [reduced]);

  // Mobile check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Wheel + touch interception while the loader is active
  useEffect(() => {
    if (!active) return;

    const onWheel = (e: WheelEvent) => {
      // Roll back into the loader when the user scrolls up past the top
      if (expanded && e.deltaY < 0 && window.scrollY <= 5) {
        setExpanded(false);
        e.preventDefault();
        return;
      }
      if (!expanded) {
        e.preventDefault();
        const delta = e.deltaY * 0.0012;
        setProgress((p) => {
          const next = Math.min(Math.max(p + delta, 0), 1);
          if (next >= 1) setExpanded(true);
          return next;
        });
      }
    };

    const onTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!touchStartY.current) return;
      const dy = touchStartY.current - e.touches[0].clientY;
      if (expanded && dy < -20 && window.scrollY <= 5) {
        setExpanded(false);
        e.preventDefault();
        return;
      }
      if (!expanded) {
        e.preventDefault();
        const factor = dy < 0 ? 0.01 : 0.0065;
        const delta = dy * factor;
        setProgress((p) => {
          const next = Math.min(Math.max(p + delta, 0), 1);
          if (next >= 1) setExpanded(true);
          return next;
        });
        touchStartY.current = e.touches[0].clientY;
      }
    };

    const onTouchEnd = () => {
      touchStartY.current = 0;
    };

    // Lock the document at scrollY=0 until the loader expands
    const onScroll = () => {
      if (!expanded) window.scrollTo(0, 0);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll);
    window.addEventListener("touchstart", onTouchStart, { passive: false });
    window.addEventListener("touchmove", onTouchMove, { passive: false });
    window.addEventListener("touchend", onTouchEnd);

    // Body scroll lock while not expanded
    const prevOverflow = document.body.style.overflow;
    if (!expanded) document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
      document.body.style.overflow = prevOverflow;
    };
  }, [active, expanded]);

  // If reduced motion, render children straight through, no veil.
  if (!active) {
    return <>{children}</>;
  }

  // Sizing — square container to match the PNG aspect (1024×1024)
  const baseSize = isMobile ? 220 : 320;
  const targetSize = isMobile ? 760 : 1080;
  const tridentSize = baseSize + progress * (targetSize - baseSize);

  // Halo brightens with the mark
  const haloScale = 1 + progress * 1.3;
  const haloOpacity = 0.4 + progress * 0.45;

  return (
    <>
      {/* The loader stage — fades out when expanded */}
      <section
        aria-label="Enter The Practice"
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
        style={{
          opacity: expanded ? 0 : 1,
          visibility: expanded ? "hidden" : "visible",
          transitionProperty: "opacity, visibility",
          transitionDuration: expanded ? "900ms, 0ms" : "0ms, 0ms",
          transitionDelay: expanded ? "0ms, 900ms" : "0ms, 0ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          pointerEvents: expanded ? "none" : "auto",
        }}
      >
        {/* Dark veil over the html gradient so the mark reads cleanly */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(0.10 0.012 70 / 0.65) 0%, oklch(0.10 0.012 70 / 0.94) 70%)",
          }}
        />

        {/* The trident with growing halo */}
        <div
          className="relative flex items-center justify-center"
          style={{
            width: `${tridentSize}px`,
            height: `${tridentSize}px`,
            maxWidth: "85vmin",
            maxHeight: "85vmin",
          }}
        >
          {/* Halo */}
          <div
            aria-hidden
            className="absolute inset-[-30%] rounded-full"
            style={{
              background:
                "radial-gradient(circle, oklch(0.78 0.165 78 / 0.45) 0%, oklch(0.78 0.165 78 / 0.18) 40%, transparent 70%)",
              transform: `scale(${haloScale})`,
              opacity: haloOpacity,
              filter: "blur(20px)",
            }}
          />
          <div className="relative w-full h-full">
            <TridentMark className="w-full h-full" glow />
          </div>
        </div>

        {/* Scroll cue + pulsing gold dot */}
        <motion.div
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3 pointer-events-none"
          animate={{ opacity: progress < 0.08 ? 1 : 0 }}
          transition={{ duration: 0.5, ease: easeOutExpo }}
        >
          <span className="eyebrow text-[var(--color-ivory-faint)]">{cue}</span>
          <motion.span
            aria-hidden
            className="block w-2 h-2 rounded-full bg-[var(--color-gold)]"
            style={{ boxShadow: "0 0 10px oklch(0.78 0.165 78 / 0.7)" }}
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>

        {/* Progress hairline along the bottom */}
        <div
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: "var(--color-hairline)" }}
        />
        <div
          aria-hidden
          className="absolute bottom-0 left-0 h-px"
          style={{
            width: `${progress * 100}%`,
            background:
              "linear-gradient(90deg, var(--color-gold-deep) 0%, var(--color-gold-soft) 100%)",
            boxShadow: "0 0 12px oklch(0.78 0.165 78 / 0.7)",
          }}
        />
      </section>

      {/* Children — the actual site. Fades in as the loader expands past 75% */}
      <motion.div
        initial={false}
        animate={{ opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.9, ease: easeOutExpo }}
        style={{
          pointerEvents: expanded ? "auto" : "none",
        }}
      >
        {children}
      </motion.div>
    </>
  );
}
