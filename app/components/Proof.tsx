"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";
import { SectionMarker } from "./SectionMarker";
import { ClientPortfolio } from "./ClientPortfolio";

function GrowthChart() {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduced = useReducedMotion();

  return (
    <svg
      ref={ref}
      viewBox="0 0 480 280"
      className="w-full h-auto"
      role="img"
      aria-label="Revenue growth after identity alignment"
    >
      {/* Frame */}
      <rect x="0.5" y="0.5" width="479" height="279" fill="none" stroke="var(--color-hairline)" strokeWidth="1" />

      {/* Grid */}
      <line x1="0" y1="220" x2="480" y2="220" stroke="var(--color-hairline)" strokeWidth="0.5" strokeDasharray="2 4" />
      <line x1="0" y1="150" x2="480" y2="150" stroke="var(--color-hairline)" strokeWidth="0.5" strokeDasharray="2 4" />
      <line x1="0" y1="80" x2="480" y2="80" stroke="var(--color-hairline)" strokeWidth="0.5" strokeDasharray="2 4" />

      {/* Flat baseline — "before" */}
      <motion.path
        d="M30 200 Q 120 198 220 202 T 380 204"
        fill="none"
        stroke="var(--color-ivory-faint)"
        strokeWidth="1.5"
        strokeDasharray="4 6"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView || reduced ? 1 : 0 }}
        transition={{ duration: 1.6, ease: [0.25, 1, 0.5, 1] }}
      />

      {/* Exponential — "after" */}
      <motion.path
        d="M30 200 Q 130 198 220 170 T 360 80 Q 420 40 450 28"
        fill="none"
        stroke="url(#proofGold)"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: inView || reduced ? 1 : 0 }}
        transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1], delay: 0.3 }}
        style={{ filter: "drop-shadow(0 0 12px oklch(0.78 0.165 78 / 0.5))" }}
      />

      <motion.circle
        cx="450"
        cy="28"
        r="5"
        fill="var(--color-gold)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: inView ? 1 : 0, scale: inView ? 1 : 0 }}
        transition={{ duration: 0.4, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
        style={{ filter: "drop-shadow(0 0 8px oklch(0.78 0.165 78 / 0.8))" }}
      />

      <text x="30" y="260" fontSize="9" letterSpacing="2.4" fill="var(--color-ivory-faint)" fontWeight="500">
        BEFORE
      </text>
      <text x="370" y="260" fontSize="9" letterSpacing="2.4" fill="var(--color-gold)" fontWeight="500">
        AFTER ALIGNMENT
      </text>

      <defs>
        <linearGradient id="proofGold" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-gold-deep)" />
          <stop offset="100%" stopColor="var(--color-gold-soft)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function Proof() {
  return (
    <section id="results" className="relative bloom-right-top">
      <SectionMarker index="IV" label="Evidence" />
      {/* ─── Header ─────────────────────────────────────── */}
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pt-32 lg:pt-44 pb-16 lg:pb-24">
        <div className="grid grid-cols-12 gap-8 items-end">
          <Reveal as="div" className="col-span-12 md:col-span-6">
            <p className="eyebrow text-[var(--color-ivory-faint)] mb-6">Proof</p>
            <h2 className="font-display font-extrabold leading-[0.98] tracking-[-0.025em] text-[clamp(48px,6vw,96px)] text-[var(--color-ivory)]">
              Results
              <br />
              <span className="accent text-[var(--color-gold)]">
                that speak
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} as="p" className="hidden md:block col-span-12 md:col-span-5 md:col-start-8 text-[var(--color-ivory-dim)] text-[16px] leading-[1.65] max-w-[42ch]">
            Identity-driven businesses produce identity-driven outcomes. Three rhythms
            below: revenue, reach, and resonance. None of it is hypothetical.
          </Reveal>
        </div>
      </div>

      {/* ─── Block A — Hero Stat (breakout left, chart right) ─── */}
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 pb-24 lg:pb-32">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-center">
          <Reveal as="div" className="col-span-12 lg:col-span-7">
            <p className="eyebrow text-[var(--color-gold)] mb-6">Revenue Architecture</p>
            <h3 className="font-display font-extrabold text-[clamp(64px,9vw,160px)] leading-[0.9] tracking-[-0.03em] text-[var(--color-ivory)]">
              <CountUp to={7} format={(v) => Math.round(v).toString()} />
              <span className="accent text-[var(--color-gold)] mx-3">
                &amp;
              </span>
              <CountUp to={8} format={(v) => Math.round(v).toString()} />
              <span className="font-display text-[0.55em] tracking-tight">‑figure</span>
            </h3>
            <p className="mt-8 text-[var(--color-ivory-dim)] text-[17px] leading-[1.65] max-w-[44ch]">
              Frameworks designed to build identity-driven businesses positioned for
              exponential growth. The plateau breaks where alignment begins.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="col-span-12 lg:col-span-5">
            <div className="relative" style={{ background: "var(--color-ink-deep)" }}>
              <GrowthChart />
            </div>
          </Reveal>
        </div>
      </div>

      {/* Creator clients marquee — full-width, breaks out of the inner container */}
      <ClientPortfolio />
    </section>
  );
}
