"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TridentMark } from "./TridentMark";

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 inset-x-0 z-50"
    >
      <div
        className="transition-all duration-300"
        style={{
          background: scrolled
            ? "color-mix(in oklch, var(--color-ink-deep) 80%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          borderBottom: scrolled
            ? "1px solid var(--color-hairline)"
            : "1px solid transparent",
        }}
      >
        {/* The wordmark is absolutely centred rather than sitting in the flex
            flow, so it stays on the page's true centre line no matter how
            wide the mark and the CTA either side of it are. */}
        <div className="relative mx-auto max-w-[1320px] px-6 lg:px-10 h-[132px] flex items-center justify-center">
          <a
            href="/"
            aria-label="The Lion Alchemist — home"
            className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="flex items-baseline gap-2.5 whitespace-nowrap">
              <span className="font-display font-semibold tracking-tight text-[clamp(23px,2.8vw,34px)] text-[var(--color-ivory)]">
                The Lion
              </span>
              <span
                className="accent text-[var(--color-gold)] text-[clamp(26px,3.2vw,39px)]"
                style={{ textShadow: "0 0 40px oklch(0.78 0.165 78 / 0.5)" }}
              >
                Alchemist
              </span>
            </span>
            <span className="w-[38px] h-[58px]">
              <TridentMark
                variant="lionIcon"
                color="var(--color-gold)"
                className="w-full h-full"
              />
            </span>
          </a>

        </div>
      </div>
    </motion.header>
  );
}
