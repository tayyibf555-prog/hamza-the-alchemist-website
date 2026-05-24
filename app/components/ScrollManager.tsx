"use client";

import { useLayoutEffect } from "react";

/**
 * React-side scroll-position reset, synchronised with the inline
 * scroll-guard in /public/scroll-guard.js.
 *
 *   1. Disables native scrollRestoration (idempotent with the inline guard).
 *   2. Synchronously snaps to top in useLayoutEffect.
 *   3. Brief re-assert window (~1.5s) to absorb late layout shift —
 *      bails out the instant the user shows scroll intent so we never
 *      fight wheel/touch/keyboard input.
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
      ) {
        bail();
      }
    };

    window.addEventListener("wheel", bail, { passive: true, once: true });
    window.addEventListener("touchstart", bail, { passive: true, once: true });
    window.addEventListener("keydown", onKey);

    // Initial snap
    snap();

    // Short re-assert window: 15 frames at ~100ms each (~1.5s total).
    // Bails on user input so the page never jitters under wheel.
    let hits = 0;
    const tickId = window.setInterval(() => {
      if (userScrolling) {
        window.clearInterval(tickId);
        return;
      }
      snap();
      if (++hits >= 15) window.clearInterval(tickId);
    }, 100);

    const onLoad = () => {
      if (!userScrolling) snap();
    };
    window.addEventListener("load", onLoad);

    return () => {
      window.clearInterval(tickId);
      window.removeEventListener("wheel", bail);
      window.removeEventListener("touchstart", bail);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("load", onLoad);
    };
  }, []);

  return null;
}
