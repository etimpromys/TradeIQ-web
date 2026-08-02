-- TradeIQ — Supabase schema
-- Run this in the Supabase dashboard: SQL Editor -> New query -> paste -> Run

-- ============================================================
-- SIGNALS TABLE
-- Written by the forex bot (via service_role key), read publicly.
-- ============================================================

create table if not exists public.signals (
  id uuid primary key default gen_random_uuid(),
  pair text not null,
  signal_type text not null check (signal_type in ('BUY', 'SELL')),
  entry_price numeric not null,
  stop_loss numeric not null,
  take_profit numeric not null,
  risk_reward_ratio numeric,
  confluence_reasons text[],
  explanation text,
  outcome text not null default 'pending' check (outcome in ('pending', 'win', 'loss', 'expired')),
  pips_result numeric,
  created_at timestamptz not null default now(),
  closed_at timestamptz
);

create index if not exists signals_created_at_idx on public.signals (created_at desc);
create index if not exists signals_pair_idx on public.signals (pair);

alter table public.signals enable row level security;

-- Anyone (including logged-out visitors) can read signal history
create policy "Public read access to signals"
  on public.signals for select
  using (true);

-- Only the service_role key (used by the bot, never exposed to the browser)
-- can insert or update. No policy is created for insert/update/delete,
-- which means only service_role (which bypasses RLS entirely) can write.


-- ============================================================
-- PROFILES TABLE
-- One row per authenticated user, created automatically on signup.
-- ============================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  display_name text,
  plan text not null default 'free' check (plan in ('free', 'pro')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row whenever a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
