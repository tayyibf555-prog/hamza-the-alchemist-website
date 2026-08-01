"use client";

import { useEffect, useRef, useState } from "react";
import { TitleBar } from "../components/v1/TitleBar";
import { VslFooter } from "../components/v1/CloseBand";
import { StickyRail } from "../components/v1/StickyRail";
import { MirrorHero } from "../components/v2/MirrorHero";
import { FourCeilings } from "../components/v2/FourCeilings";
import { RosterV2 } from "../components/v2/RosterV2";
import { Receipts, NotThis } from "../components/v2/NotThis";
import { CloseV2 } from "../components/v2/CloseV2";

/**
 * CONCEPT V2 — "The Mirror Line"
 *
 * Copy carries the page. The visitor recognises himself in three
 * sentences before a single claim is made, so the video lands as a
 * diagnosis he has already agreed with rather than a pitch.
 *
 * Signature: a gold hairline with the same block of type reflected
 * beneath it, carrying different words. Above the line is what he shows
 * the market; below it is what is actually running.
 *
 * Preview route for client selection. Not indexed, not linked from the
 * live site.
 */
export default function V2Page() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const [railVisible, setRailVisible] = useState(false);

  useEffect(() => {
    const el = ctaRef.current;
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
        <MirrorHero ctaRef={ctaRef} />
        <FourCeilings />
        <RosterV2 />
        <Receipts />
        <NotThis />
        <CloseV2 />
      </main>
      <VslFooter />
      <StickyRail
        visible={railVisible}
        elapsed={0}
        duration={0}
        label="Apply For A Private Consultation"
        shortLabel="Apply Now"
      />
    </>
  );
}
