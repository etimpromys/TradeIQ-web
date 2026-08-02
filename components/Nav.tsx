import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/SignOutButton";

export default async function Nav() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-border-soft bg-bg/95 backdrop-blur sticky top-0 z-40">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <MarkIcon />
          <span className="font-display text-[17px] font-semibold tracking-tight text-text">
            Confluence
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/signals"
            className="text-[14px] text-text-muted transition-colors hover:text-text"
          >
            Signal history
          </Link>
          <Link
            href="/#how-it-works"
            className="text-[14px] text-text-muted transition-colors hover:text-text"
          >
            How it works
          </Link>
          <Link
            href="/#pricing"
            className="text-[14px] text-text-muted transition-colors hover:text-text"
          >
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="text-[14px] text-text-muted transition-colors hover:text-text"
              >
                Dashboard
              </Link>
              <SignOutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[14px] text-text-muted transition-colors hover:text-text"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="rounded-md bg-amber px-4 py-2 text-[13px] font-medium text-bg transition-opacity hover:opacity-90"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function MarkIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
      <path
        d="M2 14C5 14 5 8 8 8C11 8 11 16 14 16C17 16 17 6 20 6"
        stroke="var(--amber)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <circle cx="11" cy="11" r="2" fill="var(--amber)" />
    </svg>
  );
}
