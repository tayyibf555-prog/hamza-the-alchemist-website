# DESIGN.md — Hamza The Alchemist

## Color strategy

**Committed → Drenched on hero.** The black surface IS the brand. Gold is a punctuation mark, never a wash. Reduce chroma at extremes; tint neutrals toward warm.

### Tokens (OKLCH)

| Role | Token | Value | Use |
|---|---|---|---|
| Surface | `--ink` | `oklch(0.14 0.012 70)` | Page background. Warm-tinted near-black, never `#000`. |
| Surface deep | `--ink-deep` | `oklch(0.10 0.010 70)` | Section breaks, footer, beneath the gradient bloom. |
| Surface raised | `--ink-raised` | `oklch(0.18 0.014 70)` | Stat panels, quote blocks. One step above `--ink`. |
| Bloom | `--bloom` | `oklch(0.22 0.10 75)` | Radial glow halos behind the logo and behind key headings. |
| Gold | `--gold` | `oklch(0.78 0.165 78)` | Primary accent. CTAs, highlighted words, key numbers. |
| Gold deep | `--gold-deep` | `oklch(0.62 0.14 70)` | Gradient stops, hover states, line accents. |
| Gold soft | `--gold-soft` | `oklch(0.85 0.12 85)` | Top of CTA gradient, particle highlights. |
| Ivory | `--ivory` | `oklch(0.95 0.012 85)` | Primary text, headlines. Warm white. |
| Ivory dim | `--ivory-dim` | `oklch(0.78 0.010 80)` | Body copy. |
| Ivory faint | `--ivory-faint` | `oklch(0.55 0.008 80)` | Eyebrows, labels, metadata. |
| Hairline | `--hairline` | `oklch(0.28 0.008 75)` | Section dividers, panel borders. Always full borders, never side-stripes. |

### The gold-black gradient (from the user request)

A single, restrained radial — not a full background wash. Center the bloom behind the hero focal point (the alchemy mark), fade to `--ink-deep` by 60% radius. Repeat once at the bottom of the section-stack as a vertical bookend. Never a diagonal mesh gradient. Never a gold "sweep."

```css
background:
  radial-gradient(ellipse 80% 60% at 70% 45%, oklch(0.22 0.10 75 / 0.55), transparent 65%),
  oklch(0.14 0.012 70);
```

## Typography

Editorial-luxury pairing. Two families, three weights total. No third font.

- **Display:** *Fraunces* — variable, optical-size aware. Weights 400 (italic for accent words) + 600 (regular headings). Used for all H1–H3 and large pull-quotes. Tracks tight (`-0.02em`) at display sizes, normal at smaller.
- **UI / Body:** *Inter* — variable. Weights 400 (body) + 500 (eyebrows, nav, buttons). Tracks `0.16em` and uppercase on eyebrows; normal on body.
- **Body copy:** Inter 400, 17px, line-height 1.55, max-width 62ch.

### Scale (1.333 ratio — perfect fourth)

| Step | Size | Family / Weight | Tracking | Use |
|---|---|---|---|---|
| Display XL | clamp(56px, 9vw, 144px) | Fraunces 600 | -0.025em | Hero headline ("TWENTY-FIRST CENTURY ALCHEMIST") |
| Display L | clamp(40px, 5vw, 80px) | Fraunces 600 | -0.02em | Section heads ("THAT SPEAK", "TRANSFORMATION") |
| H2 | clamp(28px, 3vw, 44px) | Fraunces 600 | -0.015em | Card headings |
| H3 | 22px | Fraunces 600 | -0.01em | Sub-section |
| Body | 17px | Inter 400 | normal | Paragraphs |
| Small | 14px | Inter 400 | normal | Captions |
| Eyebrow | 12px | Inter 500 | 0.18em uppercase | Section labels ("RESULTS", "SERVICES", "ABOUT ME") |

Accent words inside display headings use Fraunces 400 *italic* in `--gold` (e.g. *ALCHEMIST*, *EVEN BUSINESS*, *TRANSFORMATION*) — exactly as the current site does it. This is the brand's signature typographic move; preserve it.

## Layout

- **12-column grid**, 8px base unit. Gutters 32px desktop, 20px mobile.
- **Section rhythm:** vary vertical padding — alternate 160px / 220px / 120px (desktop) for cinematic pacing. Same padding everywhere = monotony.
- **Asymmetry on hero:** headline takes left 7 columns, logo bloom occupies right 5. Never centered. Centered hero = template.
- **Max content width:** 1280px. Hero breaks this rule and runs edge-to-edge with internal padding.
- **No nested cards.** Stat panels and service panels are flat raised surfaces with full hairline borders — never card-in-card.

## Components

### Nav
Sticky, hairline-bottom on scroll. Logo mark + wordmark left, links center, "Become an Alchemist" CTA right. CTA is the only gold element in the nav. On scroll past hero, background shifts from transparent to `--ink-deep` with a 200ms blur.

### CTA Button
- `--gold-soft` → `--gold-deep` vertical gradient fill, ivory-dim text turning to ink on hover.
- 56px height, 28px horizontal padding, 4px radius (sharp, not pill).
- Arrow glyph (→) with 12px left margin from label.
- Hover: gradient inverts, arrow translates 4px right, subtle gold-shadow bloom (12px blur, 30% opacity).

### Stat panel
- `--ink-raised` background, 1px `--hairline` full border, 32px internal padding.
- Eyebrow label (12px, gold) → big number (Fraunces 600, 88px) → descriptor (Inter, 18px ivory-dim) → visualization area.
- Visualizations are line graphs / bar charts in gold-on-ink. Drawn with SVG so they can animate the stroke on scroll-into-view.

### Eyebrow label
Uppercase, tracked, 12px Inter 500. Color `--ivory-faint` for neutral, `--gold` for sectioned ("RESULTS", "SERVICES") — preserves the existing site pattern.

### Hairline divider
1px `--hairline` line, full width, 80px vertical margin. Used between major sections. No decorative ornaments; the line is the ornament.

## Motion

All motion is reverent. Slow, deliberate, ease-out-expo or ease-out-quart curves. No bounce. No elastic. No spring-overshoot.

### Easing tokens

```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
--ease-out-quart: cubic-bezier(0.25, 1, 0.5, 1);
--ease-in-out-quart: cubic-bezier(0.76, 0, 0.24, 1);
```

### Timing tokens

| Token | Value | Use |
|---|---|---|
| `--dur-quick` | 200ms | Hover states, button feedback |
| `--dur-base` | 600ms | Default in/out transitions, section reveals |
| `--dur-slow` | 1200ms | Hero reveal beats, stat number counts |
| `--dur-cinema` | 2400ms | Logo bloom expansion, full hero choreography |

### The load-in sequence (signature moment)

A 3.2-second choreographed reveal. Triggered once per session (localStorage flag). Sequence:

1. **0–600ms:** Full-screen ink veil holds. Tiny gold dot (8px) at center pulses once.
2. **600–1400ms:** Veil parts vertically from the center, easing-out-expo, revealing the page beneath. The gold dot expands into the trident logo at its final hero position (right side).
3. **1400–2200ms:** Gold radial bloom (`--bloom`) expands from behind the logo. Particle field begins drifting upward.
4. **1800–2600ms:** Headline words stagger in — "THE / TWENTY-FIRST / CENTURY / *ALCHEMIST*" — each word a 600ms ease-out-expo translate-y(24px) + opacity. *ALCHEMIST* (gold italic) reveals last and slightly slower.
5. **2400–3000ms:** Subhead and CTA fade in together. Nav fades in.
6. **3000ms+:** Idle ambient — gold particle drift continues, logo halo breathes (4s loop, 2% scale, 80% opacity).

After first visit, the sequence collapses to a 800ms quick fade-up — the brand reveal is a one-time ceremony, not a tax.

### Scroll-tied motion

- **Section reveals:** Each section uses Framer Motion's `whileInView` with `once: true`. Eyebrow → headline → body → visualization stagger at 80ms intervals, each 600ms ease-out-expo translate-y(32px) + opacity.
- **Stat numbers count up** from 0 to final value over 1400ms when entering viewport.
- **SVG paths draw on** (line graphs, bar fills) using `pathLength` animation, 1800ms ease-out-quart.
- **Parallax on the logo bloom:** subtle, `y` translates 12% slower than scroll. Never aggressive.
- **No scroll-jacking. No snap.** The user controls the scroll; we only choreograph what's revealed.

### Ambient motion (always-on)

- Gold particle field behind hero: 40 particles, opacities 0.08–0.20, drifting upward at 8–14px/s with slight x-axis sway. Pure CSS / canvas, GPU-cheap.
- Logo halo breathing: 4s loop, scale 1.0 → 1.02, opacity 0.85 → 1.0, ease-in-out-quart.
- CTA gradient: hover only, never ambient. Ambient gradient shifts read as cheap.

### Reduced-motion fallback

`@media (prefers-reduced-motion: reduce)`:
- Load-in sequence reduces to a 400ms opacity fade. No translate, no scale, no particles.
- Scroll reveals become instant; only opacity transitions remain at 200ms.
- Ambient halo breathing disabled. Particle field disabled.

## Imagery

- Hamza photography: preserve cinematic outdoor portrait shots. Subtle inner-shadow vignette to deepen edges into the ink surface.
- Service tiles use existing alchemy/cosmos imagery (the lit pillar, the geodesic dome). These are SVG or high-res PNG with multiply blend mode against gold-deep to integrate with the surface.
- No stock photography. Ever.

## Iconography

Custom or none. The trident mark is the only icon system. Arrow glyph for CTAs is a typographic arrow (→), not an SVG icon.

## Absolute design bans (project-specific, in addition to skill defaults)

- No "Manifest your reality" bro-coach copy.
- No left/right side-stripe accents on panels (skill default — restated because the temptation is strong with gold).
- No gradient text via `background-clip` — gold accent words are solid `--gold`. The italic + color does the lifting.
- No glassmorphism. No backdrop-blur cards.
- No animated gradient backgrounds. The radial bloom is static; only the particle layer moves.
- No hero-metric template (big number + small label + stats grid). Stats live in dedicated panels, not in the hero.
- No "Trusted by" gray logo row.
- No exit-intent popups, no scroll-triggered popups, no cookie banner shock-and-awe.
