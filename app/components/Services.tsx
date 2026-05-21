"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { CTAButton } from "./CTAButton";
import { SectionMarker } from "./SectionMarker";

function PillarArt() {
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="pillarGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.85 0.12 85 / 0.55)" />
          <stop offset="40%" stopColor="oklch(0.78 0.165 78 / 0.2)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <linearGradient id="pillarBeam2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.95 0.05 85 / 0)" />
          <stop offset="50%" stopColor="oklch(0.92 0.12 80 / 1)" />
          <stop offset="100%" stopColor="oklch(0.95 0.05 85 / 0)" />
        </linearGradient>
      </defs>
      <circle cx="200" cy="140" r="100" stroke="var(--color-hairline)" strokeWidth="0.5" fill="none" />
      <circle cx="200" cy="140" r="80" stroke="var(--color-hairline)" strokeWidth="0.5" strokeDasharray="2 4" fill="none" />
      <ellipse cx="200" cy="140" rx="120" ry="120" fill="url(#pillarGlow2)" />
      <motion.rect
        x="196"
        y="20"
        width="8"
        height="240"
        fill="url(#pillarBeam2)"
        initial={{ scaleY: 0, opacity: 0 }}
        whileInView={{ scaleY: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          transformOrigin: "200px 140px",
          filter: "drop-shadow(0 0 12px oklch(0.78 0.165 78 / 0.7))",
        }}
      />
    </svg>
  );
}

function NetworkArt() {
  const nodes = [
    [200, 70], [140, 100], [260, 100], [100, 150], [200, 140], [300, 150],
    [130, 200], [200, 210], [270, 200], [160, 240], [240, 240],
  ];
  const edges: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [1, 4], [2, 4], [2, 5], [3, 6], [3, 4],
    [4, 5], [4, 7], [5, 8], [6, 7], [6, 9], [7, 9], [7, 10], [8, 10],
  ];
  return (
    <svg viewBox="0 0 400 280" className="w-full h-full" aria-hidden>
      <defs>
        <radialGradient id="netGlow2" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.85 0.12 85 / 0.4)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="155" rx="160" ry="120" fill="url(#netGlow2)" />
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="oklch(0.78 0.165 78 / 0.5)"
          strokeWidth="0.8"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 1.4, delay: 0.1 + i * 0.04, ease: [0.25, 1, 0.5, 1] }}
        />
      ))}
      {nodes.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r="3"
          fill="var(--color-gold)"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
          transition={{ duration: 0.5, delay: 0.4 + i * 0.05, ease: [0.16, 1, 0.3, 1] }}
          style={{ filter: "drop-shadow(0 0 6px oklch(0.78 0.165 78 / 0.9))" }}
        />
      ))}
    </svg>
  );
}

type Tile = {
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description: string;
  meta: { label: string; value: string }[];
  cta: string;
  href: string;
  Art: () => React.ReactElement;
};

function EditorialServiceRow({ tile, mirror }: { tile: Tile; mirror: boolean }) {
  const reduced = useReducedMotion();
  const artRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced) return;
    const rect = artRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: -py * 5, y: px * 5 });
  };

  const onLeave = () => setTilt({ x: 0, y: 0 });

  const copyClass = mirror ? "lg:col-start-7 lg:col-span-6" : "lg:col-span-6";
  const artClass = mirror ? "lg:col-start-1 lg:col-span-6 lg:row-start-1" : "lg:col-span-6";

  return (
    <div className="relative grid grid-cols-12 gap-10 lg:gap-16 items-center">
      {/* Massive ghost index — architectural numbering */}
      <span
        aria-hidden
        className={`pointer-events-none absolute font-display font-black select-none ${
          mirror ? "lg:right-[-12px] right-[-4px]" : "lg:left-[-12px] left-[-4px]"
        } top-[-90px] lg:top-[-130px]`}
        style={{
          fontSize: "clamp(140px, 18vw, 280px)",
          lineHeight: 1,
          letterSpacing: "-0.06em",
          WebkitTextStroke: "1.5px var(--color-hairline)",
          color: "transparent",
        }}
      >
        {tile.index}
      </span>

      {/* Copy */}
      <div className={`relative col-span-12 ${copyClass}`}>
        <Reveal delay={mirror ? 0.1 : 0}>
          <div className="flex items-center gap-4 mb-7">
            <span className="font-display font-black text-[var(--color-gold)] text-[22px] tracking-tight">
              {tile.index}
            </span>
            <span
              aria-hidden
              className="h-px flex-1 max-w-[80px]"
              style={{ background: "var(--color-hairline)" }}
            />
            <p className="eyebrow text-[var(--color-gold)]">{tile.eyebrow}</p>
          </div>

          <h3 className="font-display font-extrabold leading-[1.02] tracking-[-0.02em] text-[clamp(36px,4vw,60px)] text-[var(--color-ivory)]">
            {tile.title}
          </h3>

          <p className="mt-7 text-[var(--color-ivory-dim)] text-[17px] leading-[1.65] max-w-[46ch]">
            {tile.description}
          </p>

          {/* Meta row */}
          <div
            className="mt-10 pt-7 grid grid-cols-2 gap-y-4 gap-x-8 max-w-[440px]"
            style={{ borderTop: "1px solid var(--color-hairline)" }}
          >
            {tile.meta.map((m) => (
              <div key={m.label} className="flex flex-col gap-1">
                <span className="eyebrow text-[var(--color-ivory-faint)]">{m.label}</span>
                <span className="font-display text-[var(--color-ivory)] text-[18px]">
                  {m.value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <CTAButton href={tile.href}>{tile.cta}</CTAButton>
          </div>
        </Reveal>
      </div>

      {/* Art */}
      <div className={`col-span-12 ${artClass}`}>
        <Reveal delay={mirror ? 0 : 0.1}>
          <div
            ref={artRef}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            className="relative aspect-[5/4] overflow-hidden transition-transform duration-500"
            style={{
              background: "var(--color-ink-deep)",
              border: "1px solid var(--color-hairline)",
              transform: `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
              transitionTimingFunction: "var(--ease-out-expo)",
            }}
          >
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.04]" style={{ transitionTimingFunction: "var(--ease-out-expo)" }}>
              <tile.Art />
            </div>
            <div
              className="absolute inset-4 pointer-events-none"
              style={{ border: "1px solid oklch(0.78 0.165 78 / 0.16)" }}
            />
          </div>
        </Reveal>
      </div>
    </div>
  );
}

const tiles: Tile[] = [
  {
    index: "01",
    eyebrow: "Private Operator Mastermind",
    title: (
      <>
        The{" "}
        <span className="accent text-[var(--color-gold)]">
          Transmutation
        </span>
      </>
    ),
    description:
      "A closed-room container for serious operators ready to reconstruct identity at the subconscious level. Capacity is intentionally limited, the work is intentionally private.",
    meta: [
      { label: "Format", value: "1:1 + cohort" },
      { label: "Cadence", value: "Quarterly" },
      { label: "Capacity", value: "Limited" },
      { label: "Entry", value: "Application" },
    ],
    cta: "Apply For Access",
    href: "#apply",
    Art: PillarArt,
  },
  {
    index: "02",
    eyebrow: "Community & Live Workshops",
    title: (
      <>
        21st Century{" "}
        <span className="accent text-[var(--color-gold)]">
          Alchemist
        </span>
      </>
    ),
    description:
      "The community for those building from a new frequency. Live workshops, peer accountability, and a curated network of high-pull operators. Built around the work, not around the content.",
    meta: [
      { label: "Format", value: "Community" },
      { label: "Cadence", value: "Monthly" },
      { label: "Access", value: "Open enrollment" },
      { label: "Calls", value: "Live + recorded" },
    ],
    cta: "Join The Order",
    href: "#community",
    Art: NetworkArt,
  },
];

export function Services() {
  return (
    <section
      id="services"
      className="relative py-32 lg:py-44 bloom-left-low overflow-hidden"
    >
      <SectionMarker index="V" label="The Work" />
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10">
        {/* Header */}
        <div className="grid grid-cols-12 gap-8 items-end mb-24 lg:mb-32">
          <Reveal as="div" className="col-span-12 md:col-span-7">
            <p className="eyebrow text-[var(--color-ivory-faint)] mb-6">Services</p>
            <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.025em] text-[clamp(48px,6vw,96px)] text-[var(--color-ivory)]">
              Multi&#8209;Dimensional
              <br />
              <span className="accent text-[var(--color-gold)]">
                Transformation
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.15} as="p" className="hidden md:block col-span-12 md:col-span-4 md:col-start-9 text-[var(--color-ivory-dim)] text-[16px] leading-[1.65] max-w-[36ch]">
            Synthesis of identity and metaphysics. Two doors. Both require commitment;
            neither sells a shortcut.
          </Reveal>
        </div>

        {/* Editorial stagger */}
        <div className="flex flex-col gap-32 lg:gap-44">
          {tiles.map((tile, i) => (
            <EditorialServiceRow key={tile.index} tile={tile} mirror={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
