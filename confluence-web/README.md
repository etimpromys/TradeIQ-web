# TradeIQ — Website

The public-facing site for the TradeIQ forex signal bot: landing page,
public signal history, and a basic logged-in dashboard. Subscriptions and
ads are intentionally deferred to a later phase (this is the MVP).

Built with Next.js (App Router) + Tailwind CSS + Supabase (database + auth).
Free to run on Vercel's free tier and Supabase's free tier.

## What's here

- **`/`** — landing page: hero, how-the-strategy-works, live signal preview, pricing (Pro tier marked "coming soon")
- **`/signals`** — full public signal history, filterable by pair, no login required
- **`/login`, `/signup`** — Supabase email/password auth
- **`/dashboard`** — logged-in view: plan status, placeholders for instant alerts / ad-free mode, recent signals
- **`supabase/schema.sql`** — the database schema (run this once in Supabase)

## Local setup

```bash
npm install
cp .env.local.example .env.local   # fill in your Supabase project URL + anon key
npm run dev
```

Visit `http://localhost:3000`.

## Supabase setup (one-time)

1. Create a free project at supabase.com.
2. **SQL Editor** → paste the contents of `supabase/schema.sql` → Run.
   This creates the `signals` table (read by the site, written by the bot)
   and the `profiles` table (one row per signed-up user, created automatically).
3. **Project Settings → API** → copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key** → this one is for the *bot*, not the website. See
     the bot's own README for how to wire it in. Never put the service_role
     key in this project's env vars — it would be exposed to the browser.

## Deploying to Vercel (free)

1. Push this folder to its own GitHub repo (separate from the bot repo, or
   a subfolder of a monorepo — either works).
2. Go to vercel.com → **Add New Project** → import the repo.
3. In the Vercel project's **Settings → Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. Vercel auto-detects Next.js — no build config needed.
5. Every push to `main` auto-redeploys.

## Design notes

Dark trading-terminal palette, not the generic "AI startup" cream/terracotta
look. Three accent colors map directly to what the bot actually does:
teal for BUY/wins, brick red for SELL/losses, amber for the "confluence"
moment itself (used in the hero animation, filters, and CTAs). Type is
Space Grotesk (display) + Inter (body) + IBM Plex Mono (numbers/prices) —
the mono face is there specifically so entry/stop/target prices read like
a real data feed, not styled prose.

## What's deliberately NOT built yet (next phases)

- **Subscriptions/payments** — pricing section exists but "Pro" just says
  "coming soon." Wire in Paystack/Flutterwave/Stripe when ready.
- **Ads** — no ad network integrated yet. Once traffic exists, this is
  usually a single script tag (e.g. Google AdSense) dropped into `layout.tsx`.
- **Outcome tracking automation** — the `outcome` field on each signal
  (win/loss/pending) currently has to be updated manually or via a script
  you'd add later that checks whether price hit the stop or target.
- **Password reset flow** — not built; Supabase supports it, just not wired
  into the UI yet.

## File structure

```
confluence-web/
├── app/
│   ├── layout.tsx          # fonts, nav, footer wrapper
│   ├── page.tsx             # landing page
│   ├── globals.css          # design tokens (colors, fonts)
│   ├── signals/page.tsx     # public signal history
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── dashboard/page.tsx   # protected
├── components/
│   ├── Nav.tsx, Footer.tsx
│   ├── TradeIQHero.tsx      # animated signature hero visual
│   ├── SignalTable.tsx, SignalBadge.tsx
│   ├── AuthForm.tsx, SignOutButton.tsx
├── lib/
│   ├── supabase/client.ts   # browser Supabase client
│   ├── supabase/server.ts   # server Supabase client
│   └── types.ts
├── middleware.ts             # keeps Supabase session cookies fresh
├── supabase/schema.sql       # run once in Supabase SQL editor
└── .env.local.example
```
