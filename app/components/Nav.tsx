"use client";

import { motion } from "framer-motion";
import { TridentMark } from "./TridentMark";

/**
 * The masthead.
 *
 * Sits in the normal document flow rather than fixed to the viewport: this
 * is a single-purpose sales page with no nav links to return to, so pinning
 * a bar to the top would only eat vertical space on every scroll — most
 * costly on mobile, where the video is competing for the same pixels.
 */
export function Nav() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="relative z-30"
    >
      <div>
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
