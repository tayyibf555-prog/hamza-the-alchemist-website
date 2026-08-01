"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TridentMark } from "../TridentMark";

/**
 * Title Bar — brand only, zero links.
 *
 * This is a paid-traffic page: every link is an exit, so there are none.
 * Dims with the room when the VSL plays.
 */
export function TitleBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="room-dim room-dim--deep fixed top-0 inset-x-0 z-40"
      style={{
        background: scrolled
          ? "color-mix(in oklch, var(--color-ink-deep) 88%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${
          scrolled ? "var(--color-hairline)" : "transparent"
        }`,
        transition: "background 300ms, border-color 300ms, backdrop-filter 300ms",
      }}
    >
      <div className="h-[68px] flex flex-col items-center justify-center gap-1">
        <div className="flex items-center gap-2.5">
          <span className="text-[var(--color-ivory)] w-[18px] h-[28px]">
            <TridentMark className="w-full h-full" />
          </span>
          <span className="font-display font-extrabold text-[12px] tracking-[0.22em] uppercase text-[var(--color-ivory)]">
            Hamza
          </span>
        </div>
        <span className="accent text-[var(--color-gold)] text-[11px]">
          The Alchemist
        </span>
      </div>
    </motion.header>
  );
}
