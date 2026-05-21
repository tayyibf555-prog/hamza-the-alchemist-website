"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "hta_loaded_v1";

export function LoadIn() {
  const [phase, setPhase] = useState<"hidden" | "veil" | "done">("hidden");
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    const seen = typeof window !== "undefined" && window.sessionStorage.getItem(STORAGE_KEY);
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setPhase("done");
      return;
    }

    if (seen) {
      setIsReturning(true);
      setPhase("veil");
      const t = setTimeout(() => setPhase("done"), 800);
      return () => clearTimeout(t);
    }

    setPhase("veil");
    window.sessionStorage.setItem(STORAGE_KEY, "1");
    const t = setTimeout(() => setPhase("done"), 2200);
    return () => clearTimeout(t);
  }, []);

  if (phase === "done") return null;

  if (isReturning) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 z-[100] pointer-events-none"
        style={{
          background: "var(--color-ink)",
          animation: "fadeOut 800ms var(--ease-out-expo) forwards",
        }}
      >
        <style>{`@keyframes fadeOut { to { opacity: 0; } }`}</style>
      </div>
    );
  }

  return (
    <div aria-hidden className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
      {/* Top half of the veil */}
      <div
        className="veil-top absolute inset-x-0 top-0 h-1/2"
        style={{ background: "var(--color-ink)" }}
      />
      {/* Bottom half of the veil */}
      <div
        className="veil-bottom absolute inset-x-0 bottom-0 h-1/2"
        style={{ background: "var(--color-ink)" }}
      />
      {/* Centered gold dot — pulses during the hold, then fades */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ animation: "dotFade 1400ms var(--ease-out-expo) forwards" }}
      >
        <div
          className="dot-pulse h-2 w-2 rounded-full"
          style={{ background: "var(--color-gold)" }}
        />
        <style>{`@keyframes dotFade { 0%, 40% { opacity: 1; } 100% { opacity: 0; } }`}</style>
      </div>
    </div>
  );
}
