import type { Metadata } from "next";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../lib/analytics-config";

export const metadata: Metadata = {
  title: "Traffic · Hamza The Alchemist",
  robots: { index: false, follow: false },
};

// Always render fresh on each load.
export const dynamic = "force-dynamic";

type Pair = { views: number };
type DailyRow = { day: string; views: number; visitors: number };
type Analytics = {
  days: number;
  totals: { views: number; visitors: number };
  daily: DailyRow[];
  top_pages: (Pair & { path: string })[];
  sources: (Pair & { source: string })[];
  devices: (Pair & { device: string })[];
  countries: (Pair & { country: string })[];
};

async function getAnalytics(days: number): Promise<Analytics | null> {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/alchemist_analytics`, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ days }),
      cache: "no-store",
    });
    if (!res.ok) return null;
    return (await res.json()) as Analytics;
  } catch {
    return null;
  }
}

const RANGES = [7, 30, 90];

function flag(code: string): string {
  if (!code || code.length !== 2 || code === "??") return "🌐";
  try {
    return code
      .toUpperCase()
      .replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
  } catch {
    return "🌐";
  }
}

const cap = (s: string) => (s ? s.charAt(0).toUpperCase() + s.slice(1) : s);

const card: React.CSSProperties = {
  border: "1px solid var(--color-hairline)",
  background: "oklch(0.07 0.008 70)",
  borderRadius: "10px",
};

function KPI({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-6 lg:p-7" style={card}>
      <p className="eyebrow text-[var(--color-ivory-faint)] text-[11px] mb-4">
        {label}
      </p>
      <p className="font-display font-extrabold leading-none tracking-[-0.02em] text-[clamp(30px,4vw,44px)] text-[var(--color-ivory)]">
        {value}
      </p>
    </div>
  );
}

function BarList({
  title,
  rows,
}: {
  title: string;
  rows: { label: string; value: number; lead?: string }[];
}) {
  const max = Math.max(1, ...rows.map((r) => r.value));
  return (
    <div className="p-6 lg:p-8" style={card}>
      <p className="eyebrow text-[var(--color-gold)] text-[11px] mb-7">{title}</p>
      {rows.length === 0 ? (
        <p className="text-[var(--color-ivory-faint)] text-[14px]">No data yet.</p>
      ) : (
        <ul className="flex flex-col gap-4">
          {rows.map((r, i) => (
            <li key={i} className="relative">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <span className="text-[14px] text-[var(--color-ivory)] truncate flex items-center gap-2">
                  {r.lead && <span aria-hidden>{r.lead}</span>}
                  <span className="truncate">{r.label}</span>
                </span>
                <span className="text-[13px] tabular-nums text-[var(--color-ivory-dim)] shrink-0">
                  {r.value.toLocaleString()}
                </span>
              </div>
              <div className="h-[6px] rounded-full overflow-hidden" style={{ background: "var(--color-hairline)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.max(3, (r.value / max) * 100)}%`,
                    background:
                      "linear-gradient(90deg, var(--color-gold-deep) 0%, var(--color-gold) 100%)",
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Daily visitors bar chart — fills every day in the range, even zero days. */
function VisitorsChart({ daily, days }: { daily: DailyRow[]; days: number }) {
  const byDay = new Map(daily.map((d) => [d.day, d]));
  const today = new Date();
  const series: { day: string; views: number; visitors: number; label: string }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().slice(0, 10);
    const row = byDay.get(key);
    series.push({
      day: key,
      views: row?.views ?? 0,
      visitors: row?.visitors ?? 0,
      label: d.toLocaleDateString("en-GB", { day: "numeric", month: "short" }),
    });
  }
  const max = Math.max(1, ...series.map((s) => s.views));
  const peak = series.reduce((a, b) => (b.views > a.views ? b : a), series[0]);

  return (
    <div className="p-6 lg:p-8 overflow-hidden" style={card}>
      <div className="flex items-baseline justify-between gap-4 mb-8">
        <p className="eyebrow text-[var(--color-gold)] text-[11px]">
          Page views · last {days} days
        </p>
        {peak && peak.views > 0 && (
          <p className="text-[12px] text-[var(--color-ivory-faint)]">
            Peak {peak.views.toLocaleString()} on {peak.label}
          </p>
        )}
      </div>

      <div className="flex items-end gap-[2px] h-[180px]">
        {series.map((s, i) => (
          <div key={i} className="group relative flex-1 h-full flex items-end">
            <div
              className="w-full rounded-t-[2px] transition-colors"
              style={{
                height: `${(s.views / max) * 100}%`,
                minHeight: s.views > 0 ? "3px" : "0px",
                background:
                  s.views > 0
                    ? "linear-gradient(180deg, var(--color-gold) 0%, var(--color-gold-deep) 100%)"
                    : "transparent",
              }}
            />
            {/* tooltip */}
            <div
              className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 rounded-[4px] text-[11px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity z-10"
              style={{ background: "var(--color-ink-deep)", border: "1px solid var(--color-hairline)" }}
            >
              <span className="text-[var(--color-ivory)]">{s.label}</span>
              <span className="text-[var(--color-gold)] ml-2">{s.views} views</span>
            </div>
          </div>
        ))}
      </div>

      {/* axis labels — show a handful */}
      <div className="flex justify-between mt-4 text-[11px] text-[var(--color-ivory-faint)]">
        <span>{series[0]?.label}</span>
        <span>{series[Math.floor(series.length / 2)]?.label}</span>
        <span>{series[series.length - 1]?.label}</span>
      </div>
    </div>
  );
}

type Props = { searchParams: Promise<{ days?: string }> };

export default async function TrafficDashboard({ searchParams }: Props) {
  const sp = await searchParams;
  const days = RANGES.includes(Number(sp.days)) ? Number(sp.days) : 30;
  const data = await getAnalytics(days);

  const totals = data?.totals ?? { views: 0, visitors: 0 };
  const topSource = data?.sources?.[0];
  const topCountry = data?.countries?.[0];
  const hasData = (data?.totals?.views ?? 0) > 0;

  return (
    <main className="relative z-10 min-h-screen">
      <div className="mx-auto max-w-[1100px] px-6 lg:px-10 py-16 lg:py-24">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow text-[var(--color-gold)] mb-3">Traffic</p>
            <h1 className="font-display font-extrabold leading-[1.0] tracking-[-0.02em] text-[clamp(32px,4vw,52px)] text-[var(--color-ivory)]">
              Hamza The Alchemist
            </h1>
            <p className="mt-3 text-[var(--color-ivory-dim)] text-[15px]">
              Live overview of everyone arriving at the site.
            </p>
          </div>

          {/* Range pills */}
          <div className="flex items-center gap-2">
            {RANGES.map((r) => {
              const active = r === days;
              return (
                <a
                  key={r}
                  href={`?days=${r}`}
                  className="eyebrow text-[12px] px-4 h-[38px] inline-flex items-center rounded-[4px] transition-colors"
                  style={{
                    border: "1px solid var(--color-hairline)",
                    background: active
                      ? "linear-gradient(180deg, var(--color-gold-soft) 0%, var(--color-gold-deep) 100%)"
                      : "transparent",
                    color: active ? "var(--color-ink-deep)" : "var(--color-ivory-dim)",
                  }}
                >
                  {r}d
                </a>
              );
            })}
          </div>
        </div>

        {!data && (
          <div className="p-8 mb-10" style={card}>
            <p className="text-[var(--color-gold)] text-[15px]">
              Couldn&rsquo;t reach the analytics store. Refresh in a moment.
            </p>
          </div>
        )}

        {/* KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-5 lg:mb-6">
          <KPI label="Visitors" value={totals.visitors.toLocaleString()} />
          <KPI label="Page Views" value={totals.views.toLocaleString()} />
          <KPI
            label="Top Source"
            value={topSource ? cap(topSource.source) : "—"}
          />
          <KPI
            label="Top Country"
            value={topCountry ? `${flag(topCountry.country)} ${topCountry.country.toUpperCase()}` : "—"}
          />
        </div>

        {!hasData ? (
          <div className="p-10 text-center" style={card}>
            <p className="font-display font-bold text-[20px] text-[var(--color-ivory)] mb-2">
              No traffic recorded yet.
            </p>
            <p className="text-[var(--color-ivory-dim)] text-[15px] max-w-[46ch] mx-auto">
              Visits will appear here within seconds of the first person landing
              on the site. Open the homepage in another tab to test it.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-5 lg:gap-6">
            {/* Chart */}
            <VisitorsChart daily={data!.daily} days={days} />

            {/* Pages + Sources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
              <BarList
                title="Top Pages"
                rows={(data!.top_pages || []).map((p) => ({
                  label: p.path,
                  value: p.views,
                }))}
              />
              <BarList
                title="Traffic Sources"
                rows={(data!.sources || []).map((s) => ({
                  label: cap(s.source),
                  value: s.views,
                }))}
              />
            </div>

            {/* Devices + Countries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
              <BarList
                title="Devices"
                rows={(data!.devices || []).map((d) => ({
                  label: cap(d.device),
                  value: d.views,
                }))}
              />
              <BarList
                title="Countries"
                rows={(data!.countries || []).map((c) => ({
                  label: c.country.toUpperCase(),
                  lead: flag(c.country),
                  value: c.views,
                }))}
              />
            </div>
          </div>
        )}

        <div className="mt-12 flex items-center justify-between text-[12px] text-[var(--color-ivory-faint)]">
          <span>Private dashboard · do not share the link.</span>
          <a href={`?days=${days}`} className="hover:text-[var(--color-gold)] transition-colors">
            ↻ Refresh
          </a>
        </div>
      </div>
    </main>
  );
}
