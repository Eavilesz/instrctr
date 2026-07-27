create index if not exists reviews_created_at_idx on public.reviews (created_at);
create index if not exists hub_responses_created_at_idx on public.hub_responses (created_at);
create index if not exists general_comments_created_at_idx on public.general_comments (created_at);
