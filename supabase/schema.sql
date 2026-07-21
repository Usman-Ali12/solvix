-- Run this once in your Supabase project's SQL editor
-- (Dashboard → SQL Editor → New query → paste → Run).

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  business_name text,
  role text not null default 'client' check (role in ('client', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can see and edit their own profile only.
create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Automatically create a profile row whenever someone signs up.
-- Role is always hard-coded to 'client' here — deliberately ignoring any
-- "role" field a signup request might try to pass in, so nobody can grant
-- themselves admin through the public signup form.
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, business_name, role)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'business_name',
    'client'
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- There is no public "become an admin" path, by design.
-- To promote yourself (or a teammate) to admin after signing up normally,
-- run this once with the real user's UUID (find it in
-- Authentication → Users in the Supabase dashboard):
--
-- update public.profiles set role = 'admin' where id = '00000000-0000-0000-0000-000000000000';
