import { NextRequest, NextResponse } from "next/server";
import { createHash } from "node:crypto";

/**
 * Email capture — Mailchimp first, Google Sheet second.
 *
 * This runs on the server for two reasons. The Mailchimp API key is a secret
 * and would be readable by anyone if the call were made from the browser. And
 * the old client-side call to the Apps Script had to use `mode: "no-cors"`,
 * which makes the response unreadable — so the form reported success even when
 * the endpoint was dead. From here both writes report real outcomes.
 *
 * Required environment variables (set in Vercel → Settings → Environment
 * Variables, not in the repo):
 *   MAILCHIMP_API_KEY      e.g. 8f2...c1-us21   (the -us21 suffix is the DC)
 *   MAILCHIMP_AUDIENCE_ID  e.g. a1b2c3d4e5      (Audience → Settings)
 *
 * With those unset the route simply skips Mailchimp and still writes to the
 * sheet, so deploying this before the keys exist cannot break the live form.
 */

/** Apps Script web app that appends a row to the connected sheet. */
const SHEET_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxCjP93bP3gS8lY8gK5XOoX5PUObKJ2b0uMR_AavueGu9PqhjX7GK3vYuqm_fu-UNUJhw/exec";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Outcome = { ok: boolean; detail?: string };

async function addToMailchimp(email: string, source?: string): Promise<Outcome> {
  const key = process.env.MAILCHIMP_API_KEY;
  const audience = process.env.MAILCHIMP_AUDIENCE_ID;
  if (!key || !audience) return { ok: false, detail: "not configured" };

  // The datacenter is the suffix of the key itself — "…-us21".
  const dc = key.split("-").pop();
  if (!dc) return { ok: false, detail: "malformed api key" };

  // Mailchimp addresses members by the MD5 of the lowercased email, which
  // makes this a PUT upsert rather than a create — so a repeat submission
  // updates instead of failing with "Member Exists".
  const hash = createHash("md5").update(email.toLowerCase()).digest("hex");

  const res = await fetch(
    `https://${dc}.api.mailchimp.com/3.0/lists/${audience}/members/${hash}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Basic ${Buffer.from(`anystring:${key}`).toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email_address: email,
        // status_if_new only applies on create. Deliberately NOT sending
        // `status`, so someone who previously unsubscribed stays unsubscribed
        // instead of being silently opted back in — that would be both a 400
        // from Mailchimp and a consent breach.
        status_if_new: "subscribed",
        ...(source ? { tags: [source] } : {}),
      }),
    }
  );

  if (res.ok) return { ok: true };
  const body = await res.text().catch(() => "");
  return { ok: false, detail: `${res.status} ${body.slice(0, 200)}` };
}

async function appendToSheet(email: string): Promise<Outcome> {
  try {
    const res = await fetch(SHEET_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ email }),
      // Deliberately not following the redirect. Apps Script writes the row
      // and *then* 302s to a single-use googleusercontent URL purely to show
      // its output; that URL 404s for anything but the original browser, so
      // following it reports a failure for a write that already succeeded.
      redirect: "manual",
    });
    const ok = res.status >= 200 && res.status < 400;
    return ok ? { ok: true } : { ok: false, detail: `http ${res.status}` };
  } catch (e) {
    return { ok: false, detail: String(e).slice(0, 120) };
  }
}

export async function POST(req: NextRequest) {
  const { email, source } = (await req
    .json()
    .catch(() => ({}))) as { email?: string; source?: string };

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "invalid email" },
      { status: 400 }
    );
  }

  // Both destinations are attempted regardless of the other's outcome, so one
  // being down never costs the address.
  const [mailchimp, sheet] = await Promise.all([
    addToMailchimp(email, source),
    appendToSheet(email),
  ]);

  // Success for the visitor means the address landed somewhere. Failing the
  // form because only the secondary store was reachable would lose a lead for
  // no reason.
  const ok = mailchimp.ok || sheet.ok;
  if (!ok) {
    console.error("subscribe failed", { mailchimp, sheet });
  } else if (!mailchimp.ok && mailchimp.detail !== "not configured") {
    console.warn("mailchimp write failed, sheet succeeded", mailchimp);
  }

  return NextResponse.json({ ok, mailchimp: mailchimp.ok, sheet: sheet.ok }, {
    status: ok ? 200 : 502,
  });
}
