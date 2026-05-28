"use client";

import { useEffect } from "react";

/**
 * Fixed Unicorn Studio shader as the page-wide ambient background.
 *
 * Lives below all content (z-index -2 on the wrapper, with a scrim at
 * z-index -1 via body::before for legibility). A CSS filter pushes
 * the shader's colours to near-black grayscale so it reads as a
 * subtle moving texture against the black canvas, not a warm aura.
 *
 *   prefers-reduced-motion: the wrapper is display:none — see globals.css.
 */
export function AuraBackground() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    type UnicornGlobal = { isInitialized?: boolean; init?: () => void };
    const w = window as Window & { UnicornStudio?: UnicornGlobal };

    // Self-guard: don't re-init across hot reloads or strict-mode double-mounts
    if (w.UnicornStudio?.isInitialized) return;

    w.UnicornStudio = { isInitialized: false };
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
    script.async = true;
    script.onload = () => {
      const u = w.UnicornStudio;
      if (u && !u.isInitialized && typeof u.init === "function") {
        u.init();
        u.isInitialized = true;
      }
    };
    document.head.appendChild(script);

    // Note: no cleanup. Once mounted, the shader stays for the page session.
    // Strict-mode double-mount is handled by the isInitialized flag.
  }, []);

  return (
    <div className="aura-background-component" aria-hidden="true">
      <div data-us-project="qPVvnWEWLLiJgYtSkKyB" />
    </div>
  );
}
