import { createClient } from "@/lib/supabase/server";
import { Signal } from "@/lib/types";
import SignalTable from "@/components/SignalTable";

export const revalidate = 60;

export default async function SignalsPage({
  searchParams,
}: {
  searchParams: Promise<{ pair?: string }>;
}) {
  const { pair } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("signals")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (pair) {
    query = query.eq("pair", pair);
  }

  const { data } = await query;
  const signals = (data as Signal[]) ?? [];

  const { data: pairRows } = await supabase
    .from("signals")
    .select("pair")
    .order("pair");
  const uniquePairs = Array.from(
    new Set((pairRows ?? []).map((r: { pair: string }) => r.pair)),
  );

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <p className="text-[12px] font-medium uppercase tracking-wider text-amber">
        Public log
      </p>
      <h1 className="mt-2 font-display text-[28px] font-semibold text-text md:text-[32px]">
        Signal history
      </h1>
      <p className="mt-3 max-w-2xl text-[14px] leading-relaxed text-text-muted">
        Every signal the engine has posted, unedited. Outcomes update once a
        trade hits its stop or target.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <FilterPill href="/signals" active={!pair} label="All pairs" />
        {uniquePairs.map((p) => (
          <FilterPill
            key={p}
            href={`/signals?pair=${encodeURIComponent(p)}`}
            active={pair === p}
            label={p.replace("=X", "")}
          />
        ))}
      </div>

      <div className="mt-6">
        <SignalTable signals={signals} />
      </div>
    </div>
  );
}

function FilterPill({
  href,
  active,
  label,
}: {
  href: string;
  active: boolean;
  label: string;
}) {
  return (
    <a
      href={href}
      className="rounded-full border px-3.5 py-1.5 text-[13px] transition-colors"
      style={{
        borderColor: active ? "var(--amber)" : "var(--border)",
        color: active ? "var(--amber)" : "var(--text-muted)",
        background: active ? "var(--amber-dim)" : "transparent",
      }}
    >
      {label}
    </a>
  );
}
