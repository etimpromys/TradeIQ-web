import { Signal } from "@/lib/types";
import { DirectionBadge, OutcomeBadge } from "@/components/SignalBadge";

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) +
    " · " +
    d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
}

export default function SignalTable({ signals }: { signals: Signal[] }) {
  if (signals.length === 0) {
    return (
      <div className="rounded-lg border border-border-soft bg-panel px-6 py-14 text-center">
        <p className="font-display text-[15px] text-text">No signals logged yet</p>
        <p className="mt-1.5 text-[13px] text-text-muted">
          The engine posts here the moment a 2-of-3 confluence fires. Check back after the next scan.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-border-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-left">
          <thead>
            <tr className="border-b border-border-soft bg-panel text-[11px] uppercase tracking-wider text-text-faint">
              <th className="px-4 py-3 font-medium">Pair</th>
              <th className="px-4 py-3 font-medium">Signal</th>
              <th className="px-4 py-3 font-medium numeric">Entry</th>
              <th className="px-4 py-3 font-medium numeric">Stop</th>
              <th className="px-4 py-3 font-medium numeric">Target</th>
              <th className="px-4 py-3 font-medium numeric">R:R</th>
              <th className="px-4 py-3 font-medium">Outcome</th>
              <th className="px-4 py-3 font-medium">Logged</th>
            </tr>
          </thead>
          <tbody>
            {signals.map((s, i) => (
              <tr
                key={s.id}
                className="border-b border-border-soft bg-panel text-[13px] transition-colors hover:bg-panel-raised"
                style={{ background: i % 2 === 0 ? "var(--panel)" : "var(--bg)" }}
              >
                <td className="px-4 py-3 font-display font-medium text-text">
                  {s.pair.replace("=X", "")}
                </td>
                <td className="px-4 py-3">
                  <DirectionBadge type={s.signal_type} />
                </td>
                <td className="px-4 py-3 numeric text-text-muted">{s.entry_price}</td>
                <td className="px-4 py-3 numeric text-text-muted">{s.stop_loss}</td>
                <td className="px-4 py-3 numeric text-text-muted">{s.take_profit}</td>
                <td className="px-4 py-3 numeric text-text-muted">
                  {s.risk_reward_ratio ? `1:${s.risk_reward_ratio}` : "—"}
                </td>
                <td className="px-4 py-3">
                  <OutcomeBadge outcome={s.outcome} />
                </td>
                <td className="px-4 py-3 numeric text-text-faint">{formatDate(s.created_at)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
