"use client";

import { useLayoutEffect } from "react";

/**
 * Belt-and-suspenders scroll-position reset on refresh.
 *
 * Multiple safety nets, because Chrome's scroll restoration can fire
 * after the React effect runs and even after the page's first paint,
 * once late-loaded content (fonts, images, motion reveals) settles
 * the document's total height.
 *
 *   1. Disable native scrollRestoration.
 *   2. Synchronously scroll to top in useLayoutEffect.
 *   3. Re-assert scroll-top on every animation frame for ~1.5s.
 *   4. Re-assert scroll-top on the window 'load' event.
 *   5. One final setTimeout after 2s as a catch-all.
 *
 * URL hash anchors are honored.
 */
export function ScrollManager() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const hash = window.location.hash;
    if (hash && hash.length > 1) {
      requestAnimationFrame(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      });
      return;
    }

    const snap = () => {
      if (window.scrollY !== 0) window.scrollTo(0, 0);
    };

    // 1: snap now
    snap();

    // 2: rAF chain for ~1.5s (about 90 frames at 60fps)
    let frames = 90;
    let rafId = 0;
    const tick = () => {
      snap();
      if (--frames > 0) rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    // 3: window 'load' fires after all sub-resources (fonts, images, etc.)
    const onLoad = () => snap();
    window.addEventListener("load", onLoad);

    // 4: final catch-all at 2s
    const final = window.setTimeout(snap, 2000);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("load", onLoad);
      window.clearTimeout(final);
    };
  }, []);

  return null;
}
