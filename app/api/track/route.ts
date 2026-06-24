import { NextRequest, NextResponse } from "next/server";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../../lib/analytics-config";

export const runtime = "nodejs";

const noContent = () => new NextResponse(null, { status: 204 });

function deviceFromUA(ua: string): string {
  if (/ipad|tablet|playbook|silk|kindle/i.test(ua)) return "tablet";
  if (/mobile|iphone|ipod|android.*mobile|windows phone/i.test(ua)) return "mobile";
  if (/android/i.test(ua)) return "tablet";
  return "desktop";
}

function isBot(ua: string): boolean {
  return /bot|crawl|spider|slurp|preview|facebookexternalhit|lighthouse|headless|monitor|pingdom|curl|wget|gtmetrix|screenshot|axios|python-requests/i.test(
    ua
  );
}

function sourceFromReferrer(ref: string, host: string): string {
  if (!ref) return "direct";
  let h = "";
  try {
    h = new URL(ref).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return "direct";
  }
  if (!h || h === host || h.endsWith("." + host)) return "direct";
  if (h.includes("instagram")) return "instagram";
  if (h.includes("youtube") || h === "youtu.be") return "youtube";
  if (h.includes("tiktok")) return "tiktok";
  if (h.includes("google")) return "google";
  if (h.includes("facebook") || h.startsWith("fb.") || h === "fb.com") return "facebook";
  if (h === "t.co" || h.includes("twitter") || h === "x.com") return "x";
  if (h.includes("linkedin") || h === "lnkd.in") return "linkedin";
  if (h.includes("bing")) return "bing";
  if (h.includes("reddit")) return "reddit";
  if (h.includes("skool")) return "skool";
  if (h.includes("typeform")) return "typeform";
  return h;
}

export async function POST(req: NextRequest) {
  try {
    const ua = req.headers.get("user-agent") || "";
    if (isBot(ua)) return noContent();

    const body = (await req.json().catch(() => ({}))) as {
      path?: string;
      referrer?: string;
      visitorId?: string;
    };

    const path = (body.path || "").slice(0, 512);
    const referrer = (body.referrer || "").slice(0, 1024);
    const visitorId = (body.visitorId || "").slice(0, 64);

    // Don't record visits to the private dashboard itself.
    if (path.startsWith("/dashboard-")) return noContent();

    const host = (req.headers.get("host") || "").replace(/^www\./, "").toLowerCase();
    const country = req.headers.get("x-vercel-ip-country") || "";
    const device = deviceFromUA(ua);
    const source = sourceFromReferrer(referrer, host);

    await fetch(`${SUPABASE_URL}/rest/v1/rpc/track_alchemist_view`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        p_visitor_id: visitorId,
        p_path: path,
        p_referrer: referrer,
        p_source: source,
        p_country: country,
        p_device: device,
      }),
    });

    return noContent();
  } catch {
    return noContent();
  }
}
