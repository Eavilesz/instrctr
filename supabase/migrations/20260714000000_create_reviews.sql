create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  done boolean not null default false,
  created_at timestamptz not null,
  completed_at timestamptz
);

alter table public.reviews enable row level security;
