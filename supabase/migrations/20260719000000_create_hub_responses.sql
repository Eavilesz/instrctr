create table if not exists public.hub_responses (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  checked boolean not null default false,
  created_at timestamptz not null,
  completed_at timestamptz
);
alter table public.hub_responses enable row level security;
