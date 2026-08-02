import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Signal } from "@/lib/types";
import SignalTable from "@/components/SignalTable";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data } = await supabase
    .from("signals")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(10);

  const recentSignals = (data as Signal[]) ?? [];

  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <p className="text-[12px] font-medium uppercase tracking-wider text-amber">
        Dashboard
      </p>
      <h1 className="mt-2 font-display text-[28px] font-semibold text-text">
        {user.email}
      </h1>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border-soft bg-panel p-5">
          <p className="text-[12px] text-text-muted">Plan</p>
          <p className="mt-1.5 font-display text-[18px] font-semibold text-text">
            Free
          </p>
        </div>
        <div className="rounded-lg border border-dashed border-border p-5 opacity-70">
          <p className="text-[12px] text-text-muted">Instant alerts</p>
          <p className="mt-1.5 font-display text-[18px] font-semibold text-text">
            Coming soon
          </p>
        </div>
        <div className="rounded-lg border border-dashed border-border p-5 opacity-70">
          <p className="text-[12px] text-text-muted">Ad-free mode</p>
          <p className="mt-1.5 font-display text-[18px] font-semibold text-text">
            Coming soon
          </p>
        </div>
      </div>

      <h2 className="mt-12 font-display text-[18px] font-semibold text-text">
        Recent signals
      </h2>
      <div className="mt-4">
        <SignalTable signals={recentSignals} />
      </div>
    </div>
  );
}
