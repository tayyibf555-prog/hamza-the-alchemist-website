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

function PlatformBar({
  label,
  valueText,
  pct,
  gold,
  delay,
}: {
  label: string;
  valueText: string;
  pct: number;
  gold: boolean;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduced = useReducedMotion();

  return (
    <div ref={ref} className="grid grid-cols-[120px_1fr_100px] items-center gap-6">
      <div className="flex flex-col gap-1">
        <span className="eyebrow text-[var(--color-ivory)]">{label}</span>
      </div>
      <div className="h-9 relative" style={{ background: "var(--color-ink-deep)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: inView || reduced ? `${pct}%` : 0 }}
          transition={{ duration: 1.4, delay, ease: [0.25, 1, 0.5, 1] }}
          className="h-full"
          style={{
            background: gold
              ? "linear-gradient(90deg, var(--color-gold-deep) 0%, var(--color-gold-soft) 100%)"
              : "var(--color-ink-raised)",
            border: gold ? "none" : "1px solid var(--color-hairline)",
            boxShadow: gold ? "0 0 18px oklch(0.78 0.165 78 / 0.4)" : "none",
          }}
        />
      </div>
      <span
        className="font-display text-[18px] text-right"
        style={{ color: gold ? "var(--color-gold)" : "var(--color-ivory-dim)" }}
      >
        {valueText}
      </span>
    </div>
  );
}

function EngagementRing({
  value,
  label,
  delay,
  fill = 0.82,
}: {
  value: string;
  label: string;
  delay: number;
  fill?: number;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const reduced = useReducedMotion();
  const r = 48;
  const c = 2 * Math.PI * r;

  return (
    <div className="flex items-center gap-5">
      <svg ref={ref} width="120" height="120" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--color-hairline)" strokeWidth="2" />
        <motion.circle
          cx="60"
          cy="60"
          r={r}
          fill="none"
          stroke="url(#ringGoldProof)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: inView || reduced ? c * (1 - fill) : c }}
          transition={{ duration: 1.8, delay, ease: [0.25, 1, 0.5, 1] }}
          transform="rotate(-90 60 60)"
          style={{ filter: "drop-shadow(0 0 8px oklch(0.78 0.165 78 / 0.4))" }}
        />
        <text x="60" y="66" textAnchor="middle" fontSize="18" fontWeight="600" fill="var(--color-ivory)" className="font-display">
          {value}
        </text>
        <defs>
          <linearGradient id="ringGoldProof" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-gold-deep)" />
            <stop offset="100%" stopColor="var(--color-gold-soft)" />
          </linearGradient>
        </defs>
      </svg>
      <span className="eyebrow text-[var(--color-ivory-faint)]">{label}</span>
    </div>
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

      {/* ─── Block B — Strip stat (full-width band, 3 columns, no panels) ─── */}
      <div
        className="relative bloom-strip"
        style={{
          borderTop: "1px solid var(--color-hairline)",
          borderBottom: "1px solid var(--color-hairline)",
        }}
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-20 lg:py-28">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
            <Reveal className="md:px-10 md:border-r border-[var(--color-hairline)]">
              <p className="eyebrow text-[var(--color-ivory-faint)] mb-5">Distribution</p>
              <p className="font-display font-extrabold text-[clamp(48px,5vw,80px)] leading-[1.0] tracking-[-0.02em] text-[var(--color-ivory)]">
                <CountUp to={8.7} format={(v) => v.toFixed(1)} />
                <span className="text-[var(--color-gold)]">M+</span>
              </p>
              <p className="mt-3 text-[var(--color-ivory-dim)] text-[16px]">
                Content views, six months
              </p>
            </Reveal>

            <Reveal delay={0.1} className="md:px-10 md:border-r border-[var(--color-hairline)]">
              <p className="eyebrow text-[var(--color-ivory-faint)] mb-5">Engagement</p>
              <p className="font-display font-extrabold text-[clamp(48px,5vw,80px)] leading-[1.0] tracking-[-0.02em] text-[var(--color-ivory)]">
                <CountUp to={1} format={(v) => Math.round(v).toString()} />
                <span className="text-[var(--color-gold)]">M+</span>
              </p>
              <p className="mt-3 text-[var(--color-ivory-dim)] text-[16px]">
                Likes, comments, shares
              </p>
            </Reveal>

            <Reveal delay={0.2} className="md:px-10">
              <p className="eyebrow text-[var(--color-ivory-faint)] mb-5">Market Pull</p>
              <p className="font-display font-extrabold text-[clamp(48px,5vw,80px)] leading-[1.0] tracking-[-0.02em] text-[var(--color-ivory)]">
                <CountUp to={100} format={(v) => Math.round(v).toString()} />
                <span className="text-[var(--color-gold)]">K+</span>
              </p>
              <p className="mt-3 text-[var(--color-ivory-dim)] text-[16px]">
                Followers in six months
              </p>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ─── Block C — Channel breakdown (asymmetric, copy left, bars right) ─── */}
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-24 lg:py-36">
        <div className="grid grid-cols-12 gap-10 lg:gap-16 items-start">
          <Reveal className="col-span-12 lg:col-span-4">
            <p className="eyebrow text-[var(--color-ivory-faint)] mb-6">
              Where the attention lives
            </p>
            <h3 className="font-display font-extrabold leading-[1.0] tracking-[-0.02em] text-[clamp(32px,3.4vw,52px)] text-[var(--color-ivory)]">
              Three platforms.
              <br />
              <span className="accent text-[var(--color-gold)]">
                Zero paid ads.
              </span>
            </h3>
            <p className="mt-6 text-[var(--color-ivory-dim)] text-[16px] leading-[1.65] max-w-[36ch]">
              Built from a self-owned audience. Distribution is downstream of identity, not
              of budget.
            </p>
          </Reveal>

          <Reveal delay={0.15} className="col-span-12 lg:col-span-8">
            <div className="flex flex-col gap-7">
              <PlatformBar label="TikTok" valueText="8.2M" pct={92} gold delay={0.2} />
              <PlatformBar label="YouTube" valueText="500K" pct={28} gold={false} delay={0.35} />
              <PlatformBar label="Instagram" valueText="Growing" pct={14} gold={false} delay={0.5} />
            </div>

            {/* Engagement rings, hairline-bracketed below the bars */}
            <div
              className="mt-14 pt-10"
              style={{ borderTop: "1px solid var(--color-hairline)" }}
            >
              <p className="eyebrow text-[var(--color-ivory-faint)] mb-8">
                Audience response
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <EngagementRing value="850K+" label="Likes" delay={0.2} fill={0.92} />
                <EngagementRing value="120K+" label="Comments" delay={0.35} fill={0.66} />
                <EngagementRing value="80K+" label="Shares" delay={0.5} fill={0.48} />
              </div>
            </div>
          </Reveal>
        </div>

        {/* Creator clients marquee */}
        <ClientPortfolio />
      </div>
    </section>
  );
}
