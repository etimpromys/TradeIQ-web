export type SignalOutcome = "pending" | "win" | "loss" | "expired";

export type Signal = {
  id: string;
  pair: string;
  signal_type: "BUY" | "SELL";
  entry_price: number;
  stop_loss: number;
  take_profit: number;
  risk_reward_ratio: number | null;
  confluence_reasons: string[] | null;
  explanation: string | null;
  outcome: SignalOutcome;
  pips_result: number | null;
  created_at: string;
  closed_at: string | null;
};
