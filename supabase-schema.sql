create extension if not exists pgcrypto;

create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  full_name text,
  source text,
  page text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  stripe_session_id text unique,
  customer_name text,
  customer_email text,
  status text not null default 'new',
  subtotal numeric(10,2) not null default 0,
  currency text not null default 'CAD',
  items jsonb not null default '[]'::jsonb,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.users_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  created_at timestamptz not null default now()
);

alter table public.orders
add column if not exists user_id uuid references auth.users(id) on delete set null;

create index if not exists subscribers_created_at_idx on public.subscribers (created_at desc);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_customer_email_idx on public.orders (customer_email);
create index if not exists orders_user_id_idx on public.orders (user_id);
create index if not exists users_profiles_email_idx on public.users_profiles (email);

alter table public.users_profiles enable row level security;

drop policy if exists "Users can read own profile" on public.users_profiles;
create policy "Users can read own profile"
on public.users_profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.users_profiles;
create policy "Users can update own profile"
on public.users_profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists subscribers_updated_at on public.subscribers;
create trigger subscribers_updated_at before update on public.subscribers
for each row execute function public.set_updated_at();

drop trigger if exists orders_updated_at on public.orders;
create trigger orders_updated_at before update on public.orders
for each row execute function public.set_updated_at();
