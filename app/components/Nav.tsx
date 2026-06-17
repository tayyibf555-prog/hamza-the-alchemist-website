"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { TridentMark } from "./TridentMark";
import { CTAButton } from "./CTAButton";

const links = [
  { label: "Transmutation", href: "/method" },
  { label: "Blog", href: "/blog" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  // Show a "back home" link whenever we're on a subpage (Transmutation, Blog, etc.)
  const showHome = pathname !== "/";

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
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 h-[76px] flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group">
            <span className="text-[var(--color-ivory)] w-7 h-11">
              <TridentMark className="w-full h-full" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="eyebrow text-[var(--color-ivory-faint)]">Hamza</span>
              <span className="font-display font-medium text-[14px] text-[var(--color-ivory)] tracking-tight -mt-0.5">
                The Alchemist
              </span>
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-9">
            {showHome && (
              <a
                href="/"
                className="eyebrow text-[var(--color-gold)] hover:text-[var(--color-gold-soft)] transition-colors duration-200 inline-flex items-center gap-2"
              >
                <span aria-hidden>←</span>
                Home
              </a>
            )}
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="eyebrow text-[var(--color-ivory-dim)] hover:text-[var(--color-ivory)] transition-colors duration-200"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:block">
            <CTAButton>Become an Alchemist</CTAButton>
          </div>

          <button
            type="button"
            className="md:hidden eyebrow text-[var(--color-ivory)] flex items-center gap-2 h-11 px-2 -mr-2"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
          >
            <span>{open ? "Close" : "Menu"}</span>
            <span aria-hidden className="text-[var(--color-gold)]">
              {open ? "×" : "≡"}
            </span>
          </button>
        </div>

        {/* Mobile drawer */}
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden border-t border-[var(--color-hairline)]"
            style={{ background: "var(--color-ink-deep)" }}
          >
            <div className="mx-auto max-w-[1320px] px-6 py-4 flex flex-col gap-1">
              {showHome && (
                <a
                  href="/"
                  onClick={() => setOpen(false)}
                  className="eyebrow text-[var(--color-gold)] hover:text-[var(--color-gold-soft)] transition-colors flex items-center gap-2 min-h-[48px]"
                >
                  <span aria-hidden>←</span>
                  Home
                </a>
              )}
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="eyebrow text-[var(--color-ivory-dim)] hover:text-[var(--color-gold)] transition-colors flex items-center min-h-[48px]"
                >
                  {l.label}
                </a>
              ))}
              <CTAButton className="w-fit mt-3">Become an Alchemist</CTAButton>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
