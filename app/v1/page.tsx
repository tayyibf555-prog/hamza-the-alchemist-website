"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { TitleBar } from "../components/v1/TitleBar";
import { ScreeningRoom } from "../components/v1/ScreeningRoom";
import { StickyRail } from "../components/v1/StickyRail";
import { Reel } from "../components/v1/Reel";
import { ContactSheet } from "../components/v1/ContactSheet";
import { CloseBand, VslFooter } from "../components/v1/CloseBand";

/**
 * CONCEPT V1 — "Private Screening"
 *
 * The video is the page. Everything else is a quiet frame around it.
 * Signature: House Lights — pressing play dims the entire room around
 * the player, so the visitor only ever has one available action.
 *
 * Preview route for client selection. Not indexed, not linked from the
 * live site.
 */
export default function V1Page() {
  const playerRef = useRef<HTMLDivElement>(null);
  const [railVisible, setRailVisible] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);

  const handleProgress = useCallback((e: number, d: number) => {
    setElapsed(e);
    setDuration(d);
  }, []);

  // The rail appears once the player has left the viewport.
  useEffect(() => {
    const el = playerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setRailVisible(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <TitleBar />
      <main className="pt-[68px]">
        <ScreeningRoom onProgress={handleProgress} playerRef={playerRef} />
        <Reel />
        <ContactSheet />
        <CloseBand />
      </main>
      <VslFooter />
      <StickyRail
        visible={railVisible}
        elapsed={elapsed}
        duration={duration}
      />
    </>
  );
}
