alter table public.general_comments
  drop constraint general_comments_category_check;

alter table public.general_comments
  add constraint general_comments_category_check
  check (category in ('Approval', 'Reject', 'Improvements', 'Comment', 'Others'));
