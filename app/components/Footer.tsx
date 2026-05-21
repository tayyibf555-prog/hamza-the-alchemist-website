import { TridentMark } from "./TridentMark";

export function Footer() {
  return (
    <footer
      className="relative"
      style={{ background: "var(--color-ink-deep)" }}
    >
      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px"
        style={{ background: "var(--color-hairline)" }}
      />
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-16 grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
        <div className="flex items-center gap-3">
          <span className="text-[var(--color-ivory)] w-6 h-9">
            <TridentMark className="w-full h-full" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="eyebrow text-[var(--color-ivory-faint)]">Hamza</span>
            <span className="font-display font-medium text-[14px] text-[var(--color-ivory)] tracking-tight -mt-0.5">
              The Alchemist
            </span>
          </span>
        </div>

        <nav className="flex flex-col gap-3">
          <p className="eyebrow text-[var(--color-ivory-faint)] mb-2">Site</p>
          <a href="#home" className="text-[var(--color-ivory-dim)] hover:text-[var(--color-ivory)] transition-colors text-[15px]">
            Home
          </a>
          <a href="#about" className="text-[var(--color-ivory-dim)] hover:text-[var(--color-ivory)] transition-colors text-[15px]">
            About
          </a>
          <a href="#services" className="text-[var(--color-ivory-dim)] hover:text-[var(--color-ivory)] transition-colors text-[15px]">
            Work With Me
          </a>
          <a href="#" className="text-[var(--color-ivory-dim)] hover:text-[var(--color-ivory)] transition-colors text-[15px]">
            Blog
          </a>
        </nav>

        <div className="flex flex-col gap-3">
          <p className="eyebrow text-[var(--color-ivory-faint)] mb-2">Channels</p>
          <a href="https://tiktok.com" className="text-[var(--color-ivory-dim)] hover:text-[var(--color-gold)] transition-colors text-[15px]">
            TikTok ↗
          </a>
          <a href="https://youtube.com" className="text-[var(--color-ivory-dim)] hover:text-[var(--color-gold)] transition-colors text-[15px]">
            YouTube ↗
          </a>
          <a href="https://instagram.com" className="text-[var(--color-ivory-dim)] hover:text-[var(--color-gold)] transition-colors text-[15px]">
            Instagram ↗
          </a>
        </div>
      </div>

      <div className="border-t border-[var(--color-hairline)]">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-[12px] text-[var(--color-ivory-faint)] tracking-wider">
            © {new Date().getFullYear()} Hamza The Alchemist. All rights reserved.
          </p>
          <p className="eyebrow text-[var(--color-ivory-faint)]">
            Everything is energy — even business.
          </p>
        </div>
      </div>
    </footer>
  );
}
