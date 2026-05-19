-- Portal schema migration
-- Run this in the Supabase SQL editor: https://supabase.com/dashboard/project/pchnmikhxwrgexhzwolf/sql

-- ── Portal clients ────────────────────────────────────────────
create table if not exists public.portal_clients (
  id              uuid primary key references auth.users(id) on delete cascade,
  name            text,
  company_name    text,
  email           text unique,
  retainer_amount numeric(10,2),
  retainer_currency text not null default 'ZAR',
  retainer_status text not null default 'active' check (retainer_status in ('active','paused','cancelled')),
  package         text,
  start_date      date,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

alter table public.portal_clients enable row level security;
create policy "clients_select_own" on public.portal_clients for select using (auth.uid() = id);

-- ── Deliverables ─────────────────────────────────────────────
create table if not exists public.deliverables (
  id             uuid primary key default gen_random_uuid(),
  client_id      uuid not null references public.portal_clients(id) on delete cascade,
  title          text not null,
  caption        text,
  image_url      text,
  platform       text not null default 'instagram' check (platform in ('instagram','facebook','linkedin','tiktok','google','twitter','other')),
  status         text not null default 'pending' check (status in ('pending','approved','changes_requested')),
  changes_note   text,
  scheduled_date date,
  created_at     timestamptz not null default now()
);

alter table public.deliverables enable row level security;
create policy "deliverables_select_own" on public.deliverables for select using (auth.uid() = client_id);
create policy "deliverables_update_own" on public.deliverables for update using (auth.uid() = client_id) with check (auth.uid() = client_id);

-- ── Reports ──────────────────────────────────────────────────
create table if not exists public.reports (
  id         uuid primary key default gen_random_uuid(),
  client_id  uuid not null references public.portal_clients(id) on delete cascade,
  month      date not null,
  title      text,
  summary    text,
  metrics    jsonb not null default '{}',
  created_at timestamptz not null default now()
);

alter table public.reports enable row level security;
create policy "reports_select_own" on public.reports for select using (auth.uid() = client_id);

-- ── Invoices ─────────────────────────────────────────────────
create table if not exists public.invoices (
  id             uuid primary key default gen_random_uuid(),
  client_id      uuid not null references public.portal_clients(id) on delete cascade,
  invoice_number text unique,
  amount         numeric(10,2) not null,
  currency       text not null default 'ZAR',
  status         text not null default 'pending' check (status in ('pending','paid','overdue','draft')),
  due_date       date,
  issued_date    date,
  description    text,
  pdf_url        text,
  created_at     timestamptz not null default now()
);

alter table public.invoices enable row level security;
create policy "invoices_select_own" on public.invoices for select using (auth.uid() = client_id);

-- ── Projects ─────────────────────────────────────────────────
create table if not exists public.projects (
  id          uuid primary key default gen_random_uuid(),
  client_id   uuid not null references public.portal_clients(id) on delete cascade,
  title       text not null,
  description text,
  status      text not null default 'in_progress' check (status in ('in_progress','completed','upcoming')),
  due_date    date,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

alter table public.projects enable row level security;
create policy "projects_select_own" on public.projects for select using (auth.uid() = client_id);

-- ── Brand assets ─────────────────────────────────────────────
create table if not exists public.brand_assets (
  id            uuid primary key default gen_random_uuid(),
  client_id     uuid not null references public.portal_clients(id) on delete cascade,
  name          text not null,
  type          text not null default 'other' check (type in ('logo','font','color','guideline','image','document','other')),
  file_url      text,
  thumbnail_url text,
  metadata      jsonb not null default '{}',
  created_at    timestamptz not null default now()
);

alter table public.brand_assets enable row level security;
create policy "brand_assets_select_own" on public.brand_assets for select using (auth.uid() = client_id);

-- ── Account credentials ───────────────────────────────────────
create table if not exists public.account_credentials (
  id           uuid primary key default gen_random_uuid(),
  client_id    uuid not null references public.portal_clients(id) on delete cascade,
  platform     text not null,
  account_name text,
  username     text,
  notes        text,
  status       text not null default 'active' check (status in ('active','pending','revoked')),
  created_at   timestamptz not null default now()
);

alter table public.account_credentials enable row level security;
create policy "credentials_select_own" on public.account_credentials for select using (auth.uid() = client_id);
