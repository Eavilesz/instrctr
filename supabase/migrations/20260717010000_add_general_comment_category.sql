alter table public.general_comments
  add column category text not null default 'Others'
  check (category in ('Approval', 'Reject', 'Improvements', 'Others'));
