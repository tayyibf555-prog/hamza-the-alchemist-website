"use client";

import { useState } from "react";
import { Reveal } from "./Reveal";
import { ClientProfileModal, type ClientProfile } from "./ClientProfileModal";

type Client = ClientProfile & {
  /** Placeholder background gradient until a photo is provided. */
  tint: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
};

const clients: Client[] = [
  {
    name: "JORDY MICHELS",
    role: "Day Trader",
    tint: "oklch(0.28 0.04 70)",
    photo: "/clients/jordy-michels.png",
    videoSrc: "/clients/jordy-michels-testimonial.mp4",
    videoAspect: "9 / 16",
  },
  { name: "KINOBODY",       tint: "oklch(0.30 0.05 70)",  instagram: "1.7M", youtube: "771K", tiktok: "1.4M" },
  { name: "MORIBYAN",       tint: "oklch(0.36 0.04 60)",  instagram: "2.7M", youtube: "1.33M", tiktok: "5.3M" },
  { name: "GRACE BEVERLEY", tint: "oklch(0.32 0.05 50)",  instagram: "1.2M", youtube: "705K", tiktok: "436K" },
  { name: "LEANA DEEB",     tint: "oklch(0.28 0.06 65)",  instagram: "4.8M", youtube: "1.72M", tiktok: "11.3M" },
  { name: "JAMES SMITH",    tint: "oklch(0.34 0.05 55)",  instagram: "1.4M", youtube: "469K", tiktok: "1.8M" },
  { name: "ALEX HORMOZI",   tint: "oklch(0.31 0.05 75)",  instagram: "2.1M", youtube: "3.2M", tiktok: "1.9M" },
  { name: "ALI ABDAAL",     tint: "oklch(0.29 0.04 60)",  instagram: "920K", youtube: "5.6M", tiktok: "1.1M" },
  { name: "DAN KOE",        tint: "oklch(0.33 0.05 50)",  instagram: "650K", youtube: "480K", tiktok: "320K" },
];

function Card({
  client,
  onOpen,
  ariaHidden,
}: {
  client: Client;
  onOpen: () => void;
  ariaHidden?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-hidden={ariaHidden ? true : undefined}
      tabIndex={ariaHidden ? -1 : 0}
      aria-label={`Open ${client.name} profile`}
      className="group relative shrink-0 w-[260px] md:w-[300px] aspect-[3/4] overflow-hidden rounded-[14px] text-left cursor-pointer transition-transform duration-500"
      style={{
        border: "1px solid var(--color-hairline)",
        background: `linear-gradient(180deg, ${client.tint} 0%, oklch(0.10 0.012 70) 100%)`,
        transitionTimingFunction: "var(--ease-out-expo)",
      }}
    >
      {/* If a real photo is provided, render it. Otherwise the gradient placeholder shows. */}
      {client.photo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={client.photo}
          alt={client.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Bottom shadow for legibility */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-2/5 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, oklch(0.04 0.005 70 / 0.85) 100%)",
        }}
      />

      {/* Name + role / platform row */}
      <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col gap-2">
        <p className="font-display font-extrabold leading-none tracking-tight text-[18px] text-[var(--color-ivory)] uppercase">
          {client.name}
        </p>

        {client.role && (
          <p className="eyebrow text-[11px] text-[var(--color-gold)]">
            {client.role}
          </p>
        )}

        {(client.instagram || client.youtube || client.tiktok) && (
          <div className="flex items-center gap-4 text-[11px] text-[var(--color-ivory-dim)] mt-1">
            {client.instagram && (
              <span className="inline-flex items-center gap-1.5">
                <PlatformIcon kind="instagram" />
                <span className="tabular-nums">{client.instagram}</span>
              </span>
            )}
            {client.youtube && (
              <span className="inline-flex items-center gap-1.5">
                <PlatformIcon kind="youtube" />
                <span className="tabular-nums">{client.youtube}</span>
              </span>
            )}
            {client.tiktok && (
              <span className="inline-flex items-center gap-1.5">
                <PlatformIcon kind="tiktok" />
                <span className="tabular-nums">{client.tiktok}</span>
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  );
}

function PlatformIcon({ kind }: { kind: "instagram" | "youtube" | "tiktok" }) {
  if (kind === "instagram") {
    return (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  }
  if (kind === "youtube") {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="2" y="6" width="20" height="12" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M10 9.5 L15 12 L10 14.5 Z" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 4 V14 a4 4 0 1 1 -4 -4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 4 a5 5 0 0 0 5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * Horizontal marquee of creator client cards. Two copies of the list
 * sit side by side; the row translates from 0 to -50% on a slow loop,
 * giving a seamless infinite-scroll effect. Pauses on hover so the
 * viewer can read a card properly.
 */
export function ClientPortfolio() {
  const [openClient, setOpenClient] = useState<Client | null>(null);

  return (
    <div
      className="relative pt-16 lg:pt-20 pb-20 lg:pb-28"
      style={{
        /* Force the block to be exactly the viewport width and break
           out of any centered max-width ancestor. */
        width: "100vw",
        marginLeft: "calc(50% - 50vw)",
        marginRight: "calc(50% - 50vw)",
      }}
    >
      <div className="mx-auto max-w-[1320px] px-6 lg:px-10 mb-14 lg:mb-20 text-center">
        <Reveal as="p" className="eyebrow text-[var(--color-gold)] mb-6">
          The Roster
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display font-extrabold leading-[1.0] tracking-[-0.02em] text-[clamp(32px,3.6vw,52px)] text-[var(--color-ivory)]">
            Identity-driven{" "}
            <span className="accent text-[var(--color-gold)]">operators.</span>
          </h2>
        </Reveal>
      </div>

      <div
        className="client-marquee relative overflow-hidden"
        style={{
          width: "100vw",
        }}
      >
        <div className="client-marquee-track flex gap-5 lg:gap-7 py-2">
          {clients.map((c, i) => (
            <Card
              key={`a-${i}`}
              client={c}
              onOpen={() => setOpenClient(c)}
            />
          ))}
          {/* Duplicate for seamless loop — aria-hidden so screen readers don't
              double-announce. Still clickable for users whose mouse lands on
              the duplicate copy as it scrolls. */}
          {clients.map((c, i) => (
            <Card
              key={`b-${i}`}
              client={c}
              onOpen={() => setOpenClient(c)}
              ariaHidden
            />
          ))}
        </div>
      </div>

      <ClientProfileModal
        client={openClient}
        onClose={() => setOpenClient(null)}
      />
    </div>
  );
}
