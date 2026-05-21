"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function pad(n: number, len = 2) {
  return n.toString().padStart(len, "0");
}

/**
 * A tiny instrument-panel readout that sits in a corner of the hero.
 * Displays:
 *   FREQ  — drifts subtly around 432Hz
 *   ALIGN — drifts subtly around 87.x%
 *   TIME  — current UTC time, HH:MM:SS
 *
 * Reads as the kind of telemetry header a high-end editorial or
 * intelligence-dashboard site would carry. Static-feeling enough to
 * stay in the periphery; never the main attraction.
 */
export function InstrumentPanel({ className = "" }: { className?: string }) {
  const [freq, setFreq] = useState("432.00");
  const [align, setAlign] = useState("87.4");
  const [time, setTime] = useState("00:00:00");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let raf = 0;
    let last = 0;

    const tick = (now: number) => {
      if (now - last > 90) {
        last = now;
        // Drift values slightly so they feel "live"
        setFreq((432 + (Math.sin(now * 0.0007) * 1.2)).toFixed(2));
        setAlign((87 + (Math.sin(now * 0.0011) * 0.8) + Math.random() * 0.1).toFixed(1));
        const d = new Date();
        setTime(`${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 2.7, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-6 ${className}`}
    >
      <Readout label="Freq" value={`${freq} Hz`} accent />
      <Divider />
      <Readout label="Align" value={`${align}%`} />
      <Divider />
      <Readout label="UTC" value={time} mono />
    </motion.div>
  );
}

function Readout({
  label,
  value,
  accent = false,
  mono = false,
}: {
  label: string;
  value: string;
  accent?: boolean;
  mono?: boolean;
}) {
  return (
    <div className="flex flex-col leading-none gap-1.5">
      <span className="text-[10px] tracking-[0.22em] uppercase text-[var(--color-ivory-faint)] font-medium">
        {label}
      </span>
      <span
        className={`text-[12px] tabular-nums tracking-tight ${
          accent ? "text-[var(--color-gold)]" : "text-[var(--color-ivory)]"
        } ${mono ? "font-mono" : "font-medium"}`}
      >
        {value}
      </span>
    </div>
  );
}

function Divider() {
  return <span aria-hidden className="block w-px h-6 bg-[var(--color-hairline)]" />;
}
