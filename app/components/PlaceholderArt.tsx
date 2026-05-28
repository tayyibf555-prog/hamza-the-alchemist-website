/**
 * Shared placeholder that fills any media slot until a real file is dropped in.
 * Used by both the testimonials wall and the step screenshot slots on
 * /thank-you. Renders a small gold icon plus a label like "Screenshot slot".
 */
export function PlaceholderArt({ kind }: { kind: "video" | "image" }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, oklch(0.18 0.012 70) 0%, oklch(0.10 0.010 70) 70%)",
      }}
    >
      <div className="flex flex-col items-center gap-3 opacity-50">
        {kind === "video" ? (
          <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden fill="none">
            <circle
              cx="22"
              cy="22"
              r="21"
              stroke="var(--color-gold)"
              strokeWidth="1"
              opacity="0.6"
            />
            <path
              d="M18 14 L31 22 L18 30 Z"
              fill="var(--color-gold)"
              opacity="0.85"
            />
          </svg>
        ) : (
          <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden fill="none">
            <rect
              x="3"
              y="6"
              width="38"
              height="32"
              rx="2"
              stroke="var(--color-gold)"
              strokeWidth="1"
              opacity="0.65"
            />
            <circle
              cx="14"
              cy="17"
              r="3"
              fill="var(--color-gold)"
              opacity="0.85"
            />
            <path
              d="M4 32 L17 22 L25 28 L31 22 L40 32"
              stroke="var(--color-gold)"
              strokeWidth="1.4"
              fill="none"
              opacity="0.7"
              strokeLinejoin="round"
            />
          </svg>
        )}
        <span className="eyebrow text-[var(--color-ivory-faint)] text-[10px]">
          {kind === "video" ? "Video slot" : "Screenshot slot"}
        </span>
      </div>
    </div>
  );
}
