"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { TridentMark } from "./TridentMark";
import { CTAButton } from "./CTAButton";
import { Particles } from "./Particles";
import { SectionMarker } from "./SectionMarker";

const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const lineVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay: 1.4 + i * 0.18,
      ease: easeOutExpo,
    },
  }),
};

const goldLineVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, delay: 2.05, ease: easeOutExpo },
  },
};

const fadeIn = (delay: number) => ({
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, delay, ease: easeOutExpo },
  },
});

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bloomY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const headlineY = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] flex items-center overflow-hidden bloom-bg pt-[76px]"
    >
      <Particles count={42} />

      <SectionMarker index="I" label="Opening · The Mark" />

      {/* Top-right Roman folio marker — quiet editorial annotation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.6, ease: easeOutExpo }}
        className="hidden md:flex absolute top-[100px] right-10 z-20 flex-col items-end gap-2"
      >
        <span className="accent text-[var(--color-gold)] text-[15px]">Folio I</span>
        <span aria-hidden className="block w-10 h-px bg-[var(--color-hairline)]" />
        <span className="eyebrow text-[var(--color-ivory-faint)]">Identity · Operator</span>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1320px] w-full px-6 lg:px-10 grid grid-cols-12 gap-8 items-center py-20 lg:py-28">
        {/* Headline column */}
        <motion.div
          className="col-span-12 lg:col-span-7"
          style={reduced ? undefined : { y: headlineY }}
        >
          <motion.p
            className="eyebrow text-[var(--color-ivory-faint)] mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2, ease: easeOutExpo }}
          >
            The 21st Century Alchemist
          </motion.p>

          <h1 className="font-display font-extrabold leading-[1.04] tracking-[-0.02em] text-[clamp(48px,7.2vw,118px)] text-[var(--color-ivory)]">
            <motion.span
              className="block"
              custom={0}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            >
              The
            </motion.span>
            <motion.span
              className="block"
              custom={1}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            >
              Twenty<span className="text-[var(--color-ivory-dim)]">‑</span>First
            </motion.span>
            <motion.span
              className="block"
              custom={2}
              variants={lineVariants}
              initial="hidden"
              animate="visible"
            >
              Century
            </motion.span>
            <motion.span
              variants={goldLineVariants}
              initial="hidden"
              animate="visible"
              className="block accent text-[var(--color-gold)]"
              style={{ textShadow: "0 0 60px oklch(0.78 0.165 78 / 0.35)" }}
            >
              Alchemist
            </motion.span>
          </h1>

          <motion.p
            variants={fadeIn(2.4)}
            initial="hidden"
            animate="visible"
            className="mt-10 max-w-[560px] text-[var(--color-ivory-dim)] text-[17px] leading-[1.55]"
          >
            I work privately with{" "}
            <span className="text-[var(--color-ivory)] font-medium">CEOs</span>,{" "}
            <span className="text-[var(--color-ivory)] font-medium">entrepreneurs</span>,{" "}
            <span className="text-[var(--color-ivory)] font-medium">day traders</span>,{" "}
            <span className="text-[var(--color-ivory)] font-medium">influencers</span>, and{" "}
            <span className="text-[var(--color-ivory)] font-medium">music artists</span> to
            manifest their desires by shifting identity at the{" "}
            <span className="text-[var(--color-gold)] font-medium">subconscious level</span>.
          </motion.p>

          <motion.div
            variants={fadeIn(2.7)}
            initial="hidden"
            animate="visible"
            className="mt-12 flex items-center gap-6 flex-wrap"
          >
            <CTAButton size="large">Become an Alchemist</CTAButton>
            <a
              href="#about"
              className="eyebrow text-[var(--color-ivory-faint)] hover:text-[var(--color-ivory)] transition-colors duration-200"
            >
              <span>Read the manifesto</span>
            </a>
          </motion.div>
        </motion.div>

        {/* Logo column */}
        <motion.div
          className="hidden lg:flex col-span-5 items-center justify-center relative"
          style={reduced ? undefined : { y: bloomY }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.8, ease: easeOutExpo }}
            className="relative"
          >
            {/* Bloom halo */}
            <div
              aria-hidden
              className="absolute inset-0 -m-32 rounded-full halo-breathe"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.78 0.165 78 / 0.28) 0%, transparent 60%)",
                filter: "blur(20px)",
              }}
            />
            <div className="relative w-[260px] h-[420px] text-[var(--color-ivory)]">
              <TridentMark className="w-full h-full" glow />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom editorial strip — quiet horizon line with a Latin imprimatur,
          a center hairline horizon, and a scroll cue. No live signal. */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 2.6, ease: easeOutExpo }}
        className="absolute bottom-0 inset-x-0"
        style={{
          borderTop: "1px solid var(--color-hairline)",
        }}
      >
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 h-[68px] flex items-center gap-6">
          <span className="hidden md:flex items-center gap-3 shrink-0">
            <span className="accent text-[var(--color-gold)] text-[15px]">
              Solve et coagula
            </span>
            <span className="eyebrow text-[var(--color-ivory-faint)]">
              · Dissolve &amp; reform
            </span>
          </span>
          <span aria-hidden className="hidden md:block w-px h-5 bg-[var(--color-hairline)]" />
          <div className="flex-1 h-px bg-[var(--color-hairline)] opacity-60" />
          <span aria-hidden className="hidden md:block w-px h-5 bg-[var(--color-hairline)]" />
          <div className="hidden md:flex items-center gap-3 shrink-0 text-[var(--color-ivory-faint)]">
            <span className="eyebrow">Scroll</span>
            <span aria-hidden className="block w-2 h-2 rounded-full bg-[var(--color-gold)]" style={{ boxShadow: "0 0 10px oklch(0.78 0.165 78 / 0.7)" }} />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
