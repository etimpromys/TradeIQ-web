"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function AuthForm({ mode }: { mode: "login" | "signup" }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } =
      mode === "login"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <h1 className="font-display text-[26px] font-semibold text-text">
        {mode === "login" ? "Log in" : "Create your account"}
      </h1>
      <p className="mt-2 text-[13px] text-text-muted">
        {mode === "login"
          ? "Welcome back."
          : "Free — save your view of the signal log."}
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="block text-[13px] text-text-muted" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-border bg-panel px-3.5 py-2.5 text-[14px] text-text outline-none focus:border-amber"
          />
        </div>
        <div>
          <label className="block text-[13px] text-text-muted" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-border bg-panel px-3.5 py-2.5 text-[14px] text-text outline-none focus:border-amber"
          />
        </div>

        {error && (
          <p className="rounded-md bg-sell-dim px-3.5 py-2.5 text-[13px] text-sell">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-amber px-4 py-3 text-[14px] font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-[13px] text-text-muted">
        {mode === "login" ? (
          <>
            No account yet?{" "}
            <Link href="/signup" className="text-amber hover:opacity-80">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-amber hover:opacity-80">
              Log in
            </Link>
          </>
        )}
      </p>
    </div>
  );
}
