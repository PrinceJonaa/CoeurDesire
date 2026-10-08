-- CoeurDesire M1 + M2. Run in Supabase SQL editor before enabling VITE_SUPABASE_*.
create extension if not exists pgcrypto;
create table if not exists public.admin_users (
 user_id uuid primary key references auth.users(id) on delete cascade,
 role text not null default 'editor' check (role in ('owner','editor')),
 created_at timestamptz not null default now()
);
alter table public.admin_users enable row level security;
create policy "Admin can view own role" on public.admin_users for select to authenticated
 using (user_id = (select auth.uid()));

create or replace function public.is_coeur_admin() returns boolean
language sql stable security definer set search_path = ''
as $$ select exists (
 select 1 from public.admin_users where user_id = (select auth.uid())
); $$;
revoke all on function public.is_coeur_admin() from public;
grant execute on function public.is_coeur_admin() to authenticated;

create table if not exists public.products (
 id text primary key default (gen_random_uuid())::text,
 slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
 name text not null check (char_length(name) between 1 and 150),
 category text not null default 'Oil' check (category in ('Oil','Hair','Accessory')),
 price_num numeric(10,2) not null default 0 check (price_num >= 0),
 image_url text not null default '',
 images text[] not null default '{}',
 card_bg text not null default '',
 hint text not null default '',
 description text not null default '',
 long_description text not null default '',
 ingredients text[] not null default '{}',
 how_to_use text not null default '',
 benefits text[] not null default '{}',
 in_stock boolean not null default true,
 badge text not null default '',
 purchase_url text not null default '' check (purchase_url = '' or purchase_url ~ '^https://[^[:space:]]+$'),
 status text not null default 'draft' check (status in ('draft','published')),
 sort_order integer not null default 0,
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create or replace function public.touch_coeur_product()
returns trigger language plpgsql set search_path = ''
as $$ begin new.updated_at = now(); return new; end; $$;
create trigger touch_coeur_product before update on public.products
for each row execute function public.touch_coeur_product();

create index if not exists products_status_sort_idx on public.products(status,sort_order,name);
alter table public.products enable row level security;
create policy "Visitors read published products" on public.products for select to anon, authenticated
 using (status = 'published' or (select public.is_coeur_admin()));
create policy "Admins insert products" on public.products for insert to authenticated
 with check ((select public.is_coeur_admin()));
create policy "Admins edit products" on public.products for update to authenticated
 using ((select public.is_coeur_admin())) with check ((select public.is_coeur_admin()));
create policy "Admins delete products" on public.products for delete to authenticated
 using ((select public.is_coeur_admin()));
grant select on public.products to anon;
grant select, insert, update, delete on public.products to authenticated;
grant select on public.admin_users to authenticated;

-- Public product photos, authenticated staff uploads only.
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('product-media','product-media',true,5242880,array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update
set public = excluded.public, file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;
create policy "Coeur staff upload product images" on storage.objects for insert to authenticated
 with check (bucket_id = 'product-media' and (select public.is_coeur_admin()));
create policy "Coeur staff delete product images" on storage.objects for delete to authenticated
 using (bucket_id = 'product-media' and (select public.is_coeur_admin()));

-- After creating/inviting the client in Authentication > Users, grant access by UUID:
-- insert into public.admin_users (user_id, role) values ('USER-UUID-HERE','owner');
-- Never expose a service_role secret in Vite or browser code.
