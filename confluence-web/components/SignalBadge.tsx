export function DirectionBadge({ type }: { type: "BUY" | "SELL" }) {
  const isBuy = type === "BUY";
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-[12px] font-semibold tracking-wide"
      style={{
        color: isBuy ? "var(--buy)" : "var(--sell)",
        background: isBuy ? "var(--buy-dim)" : "var(--sell-dim)",
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: isBuy ? "var(--buy)" : "var(--sell)" }}
      />
      {type}
    </span>
  );
}

export function OutcomeBadge({ outcome }: { outcome: string }) {
  const styles: Record<string, { color: string; bg: string; label: string }> = {
    pending: { color: "var(--amber)", bg: "var(--amber-dim)", label: "Pending" },
    win: { color: "var(--buy)", bg: "var(--buy-dim)", label: "Win" },
    loss: { color: "var(--sell)", bg: "var(--sell-dim)", label: "Loss" },
    expired: { color: "var(--text-muted)", bg: "var(--panel-raised)", label: "Expired" },
  };
  const s = styles[outcome] ?? styles.pending;

  return (
    <span
      className="inline-flex items-center rounded-md px-2.5 py-1 text-[12px] font-medium"
      style={{ color: s.color, background: s.bg }}
    >
      {s.label}
    </span>
  );
}
