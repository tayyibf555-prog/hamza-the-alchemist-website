"use client";

import { useEffect, useRef } from "react";

/**
 * Custom cursor — a small gold dot that follows the mouse, with a
 * larger ring outline that lags behind. The dot scales up over
 * interactive elements (a, button, [data-hover]).
 *
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("cursor-on");

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      // Move the dot instantly
      dot.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
    };

    const tick = () => {
      // Ring lerps toward the cursor
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate3d(${rx - 20}px, ${ry - 20}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const interactive =
        target.closest("a, button, [data-hover], [role='button']") !== null;
      ring.dataset.hover = interactive ? "1" : "0";
      dot.dataset.hover = interactive ? "1" : "0";
    };

    const onLeave = () => {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
    };
    const onEnter = () => {
      ring.style.opacity = "1";
      dot.style.opacity = "1";
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.documentElement.classList.remove("cursor-on");
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed top-0 left-0 z-[200] h-10 w-10 rounded-full mix-blend-difference"
        style={{
          border: "1px solid var(--color-gold)",
          opacity: 0,
          transition: "opacity 200ms var(--ease-out-expo), width 200ms var(--ease-out-expo), height 200ms var(--ease-out-expo)",
          willChange: "transform",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="cursor-dot pointer-events-none fixed top-0 left-0 z-[201] h-2 w-2 rounded-full"
        style={{
          background: "var(--color-gold)",
          boxShadow: "0 0 12px oklch(0.78 0.165 78 / 0.8)",
          opacity: 0,
          transition: "opacity 200ms var(--ease-out-expo), transform 60ms linear, width 200ms var(--ease-out-expo), height 200ms var(--ease-out-expo)",
          willChange: "transform",
        }}
      />
    </>
  );
}
