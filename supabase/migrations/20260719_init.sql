-- eMed GLP-1 — Supabase schema (PRD §4.3)
-- Lives in supabase/migrations/20260719_init.sql
-- Run via `supabase db reset` (local) or applied directly on prod.

create extension if not exists "pgcrypto";

-- Users: patient / clinic / family
create table if not exists public.users (
  id            uuid primary key default gen_random_uuid(),
  email         text unique not null,
  password_hash text,
  role          text not null default 'patient' check (role in ('patient', 'clinic', 'family')),
  clinic_id     uuid,
  plan          text not null default 'free' check (plan in ('free', 'patient_pro', 'clinic', 'enterprise')),
  created_at    timestamptz not null default now()
);

-- Treatments (one per scheduled injection)
create table if not exists public.treatments (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.users(id) on delete cascade,
  medication      text not null check (medication in ('Semaglutide', 'Tirzepatide')),
  dose_mg         numeric(6,2) not null check (dose_mg > 0 and dose_mg <= 50),
  injection_date  date not null check (injection_date <= current_date),
  injection_site  text check (injection_site in ('abdomen', 'thigh', 'arm')),
  created_at      timestamptz not null default now()
);
create index if not exists treatments_user_date on public.treatments (user_id, injection_date desc);

-- Side effects (12-item daily log)
create table if not exists public.side_effects (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users(id) on delete cascade,
  date        date not null,
  symptom     text not null check (symptom in (
                'nausea','vomiting','diarrhea','constipation','appetite_change','headache',
                'fatigue','injection_reaction','hypoglycemia','stomach_discomfort','hair_loss','mood_change')),
  severity    text not null check (severity in ('mild', 'moderate', 'severe')),
  notes       text,
  created_at  timestamptz not null default now()
);
create index if not exists side_effects_user_date on public.side_effects (user_id, date desc);

-- Weight records (weekly)
create table if not exists public.weight_records (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users(id) on delete cascade,
  date        date not null,
  weight_kg   numeric(5,1) not null check (weight_kg between 20 and 300),
  created_at  timestamptz not null default now()
);
create index if not exists weight_user_date on public.weight_records (user_id, date desc);

-- Subscriptions (Stripe future-proof)
create table if not exists public.subscriptions (
  id                     uuid primary key default gen_random_uuid(),
  user_id                uuid unique not null references public.users(id) on delete cascade,
  stripe_customer_id     text unique,
  stripe_subscription_id text unique,
  plan                   text not null default 'free',
  status                 text not null default 'incomplete',
  created_at             timestamptz not null default now()
);

-- Row-Level Security (PRD §5.2: patient only sees own data)
alter table public.users enable row level security;
alter table public.treatments enable row level security;
alter table public.side_effects enable row level security;
alter table public.weight_records enable row level security;
alter table public.subscriptions enable row level security;

-- Policies: patients see/insert/update/delete only their own data.
-- Single-column ownership uses auth.uid() for current authenticated user.
create policy "treatments own rows" on public.treatments
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "side effects own rows" on public.side_effects
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "weight own rows" on public.weight_records
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy "subscriptions own rows" on public.subscriptions
  for all to authenticated
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- users: can only read/update self
create policy "users read self" on public.users
  for select to authenticated
  using (id = auth.uid());
