"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/** Stable per-browser id (anonymous, no PII) used to approximate unique visitors. */
function getVisitorId(): string {
  try {
    let id = localStorage.getItem("alch_vid");
    if (!id) {
      id =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("alch_vid", id);
    }
    return id;
  } catch {
    return "";
  }
}

/**
 * Fire-and-forget page-view beacon. Posts to /api/track on every route change
 * (the API route adds country + device server-side). Skips the private
 * dashboard so the client's own viewing doesn't pollute traffic.
 */
export function Track() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/dashboard-")) return;

    const payload = JSON.stringify({
      visitorId: getVisitorId(),
      path: pathname,
      referrer: typeof document !== "undefined" ? document.referrer || "" : "",
    });

    try {
      const blob = new Blob([payload], { type: "application/json" });
      if (navigator.sendBeacon && navigator.sendBeacon("/api/track", blob)) return;
    } catch {
      // fall through to fetch
    }

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
