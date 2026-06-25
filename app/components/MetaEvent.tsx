"use client";

import { useEffect } from "react";
import { trackMeta } from "../lib/meta";

/**
 * Fires a Meta Pixel standard event once on mount. Drop into any page where
 * landing on it IS the conversion (e.g. <MetaEvent name="Schedule" /> on the
 * post-booking thank-you page).
 */
export function MetaEvent({
  name,
  params,
}: {
  name: string;
  params?: Record<string, unknown>;
}) {
  useEffect(() => {
    trackMeta(name, params);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return null;
}
