import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Signal } from "@/lib/types";
import ConfluenceHero from "@/components/ConfluenceHero";
import SignalTable from "@/components/SignalTable";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("signals")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(5);

  const recentSignals = (data as Signal[]) ?? [];

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-8 md:pt-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border-soft bg-panel px-3 py-1 text-[12px] text-text-muted">
              <span className="h-1.5 w-1.5 rounded-full bg-buy" />
              Engine scans every 15 minutes
            </div>
            <h1 className="text-balance font-display text-[40px] font-semibold leading-[1.08] tracking-tight text-text md:text-[52px]">
              Signals that only fire when the indicators agree.
            </h1>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-text-muted">
              RSI, MACD, and EMA are checked independently. A signal only posts
              when two of the three line up — every reason logged, every
              outcome tracked in public.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/signals"
                className="rounded-md bg-amber px-5 py-3 text-[14px] font-medium text-bg transition-opacity hover:opacity-90"
              >
                View signal history
              </Link>
              <Link
                href="/signup"
                className="rounded-md border border-border px-5 py-3 text-[14px] font-medium text-text transition-colors hover:border-text-muted"
              >
                Create free account
              </Link>
            </div>
          </div>
          <ConfluenceHero />
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-t border-border-soft bg-panel/40">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-[12px] font-medium uppercase tracking-wider text-amber">
            The confluence rule
          </p>
          <h2 className="mt-3 max-w-xl font-display text-[28px] font-semibold leading-tight text-text md:text-[32px]">
            Two of three, or it doesn&apos;t post.
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-text-muted">
            No single indicator is reliable enough on its own — that&apos;s not
            a flaw to route around, it&apos;s a constant. Requiring agreement
            between independent signals doesn&apos;t eliminate false signals,
            but it filters out a lot of the noise a single-indicator system
            would act on.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <IndicatorCard
              label="RSI"
              title="Momentum extremes"
              body="Flags when price has moved far enough, fast enough, that a reversal becomes statistically more likely."
              color="var(--buy)"
            />
            <IndicatorCard
              label="MACD"
              title="Momentum shift"
              body="Watches for the histogram flipping sign — the moment trend acceleration actually changes direction, not just slows."
              color="var(--amber)"
            />
            <IndicatorCard
              label="EMA 12/26"
              title="Trend filter"
              body="Confirms the fast average is on the correct side of the slow one before a signal is allowed to count as valid."
              color="var(--sell)"
            />
          </div>
        </div>
      </section>

      {/* Recent signals preview */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-[12px] font-medium uppercase tracking-wider text-amber">
              Public log
            </p>
            <h2 className="mt-2 font-display text-[24px] font-semibold text-text">
              Most recent signals
            </h2>
          </div>
          <Link
            href="/signals"
            className="hidden text-[13px] text-text-muted hover:text-text md:block"
          >
            Full history →
          </Link>
        </div>
        <SignalTable signals={recentSignals} />
        <Link
          href="/signals"
          className="mt-5 block text-center text-[13px] text-text-muted hover:text-text md:hidden"
        >
          Full history →
        </Link>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-border-soft bg-panel/40">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
          <p className="text-[12px] font-medium uppercase tracking-wider text-amber">
            Pricing
          </p>
          <h2 className="mt-3 font-display text-[28px] font-semibold text-text md:text-[32px]">
            Free while we&apos;re building this out.
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2 md:max-w-2xl">
            <div className="rounded-lg border border-border-soft bg-panel p-6">
              <p className="font-display text-[15px] font-semibold text-text">Free</p>
              <p className="mt-1 text-[13px] text-text-muted">
                Full public signal history, no account required.
              </p>
              <p className="mt-5 font-display text-[28px] font-semibold text-text">
                $0
              </p>
              <ul className="mt-5 space-y-2.5 text-[13px] text-text-muted">
                <li>— Live signal log, all pairs</li>
                <li>— Outcome tracking</li>
                <li>— Create an account to save your view</li>
              </ul>
            </div>
            <div className="rounded-lg border border-dashed border-border p-6 opacity-70">
              <p className="font-display text-[15px] font-semibold text-text">Pro</p>
              <p className="mt-1 text-[13px] text-text-muted">
                Instant Telegram alerts, no ads, priority pairs.
              </p>
              <p className="mt-5 font-display text-[28px] font-semibold text-text">
                Coming soon
              </p>
              <ul className="mt-5 space-y-2.5 text-[13px] text-text-muted">
                <li>— Real-time push, not just the log</li>
                <li>— Ad-free dashboard</li>
                <li>— Custom pair watchlists</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function IndicatorCard({
  label,
  title,
  body,
  color,
}: {
  label: string;
  title: string;
  body: string;
  color: string;
}) {
  return (
    <div className="rounded-lg border border-border-soft bg-panel p-6">
      <span
        className="numeric inline-block rounded px-2 py-1 text-[11px] font-semibold tracking-wider"
        style={{ color, background: "var(--panel-raised)" }}
      >
        {label}
      </span>
      <h3 className="mt-4 font-display text-[16px] font-semibold text-text">
        {title}
      </h3>
      <p className="mt-2 text-[13px] leading-relaxed text-text-muted">{body}</p>
    </div>
  );
}
