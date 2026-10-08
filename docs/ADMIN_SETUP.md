# CoeurDesire — M1 + M2 administrator setup

This milestone adds a product CMS and private `/admin` dashboard, without changing the live site until the branch is merged and the Supabase project is configured. No customer is automatically granted access.

## 1. Create the Supabase project

1. Create a Supabase project owned by the business. Keep billing and account recovery accessible to its owner.
2. In **SQL Editor**, run `supabase/migrations/202610080001_admin_products.sql`.
3. Confirm `public.products` and `public.admin_users` tables exist and that Storage has public `product-media` bucket.
4. In **Authentication**, disable open public sign-ups for the admin app. Configure Auth > URL configuration with the production URL `https://coeurdesire.com` and redirect allow list `https://coeurdesire.com/admin` (plus an exact preview URL if testing).
5. Invite the client through Supabase Authentication > Users. Do not create shared admin passwords. Once the invite is accepted or the user UUID exists, run this in the SQL editor, substituting the actual UUID:

```sql
insert into public.admin_users(user_id, role)
values ('ACTUAL-UUID-FROM-AUTH-USERS', 'owner')
on conflict (user_id) do update set role=excluded.role;
```

The authenticated user gets access only when this row exists. Staff invitations can use role `editor`. There is no browser-based self-promotion to admin.

## 2. Frontend environment

Configure these in Vercel for Preview first:

```env
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR-SUPABASE-PUBLISHABLE-KEY
```

Legacy `VITE_SUPABASE_ANON_KEY` is also accepted. Both must be **public** (publishable/anon) values. NEVER use `service_role` or a database password in a `VITE_` variable. Rebuild/redeploy after env changes.

Locally, create `.env.local` (ignored by Git). Run `npm install`, `npm run typecheck`, `npm run build`, and `npm run dev`. The admin route is `/admin`. Production deployment still requires merging and redeploying the branch.

## 3. Import existing product content

Existing products are hardcoded in `constants.ts` solely as a fallback while Supabase is not configured.

**Important:** Once the Supabase environment variables are configured, the storefront reads ONLY published database products. An empty database therefore shows an empty collection. Use a preview deployment or local build with Supabase configured to:
1. Sign in at `/admin` using the authorized client/admin account.
2. Open **Products** and click **Import 3 existing products** once while the table is empty.
3. Review and publish the products, upload real photos if available.
4. Verify that the storefront shows these records before enabling the Supabase variables in Production.

Imported products use existing names, prices, descriptions, badges, stock status, and gradients. Placeholder stock image URLs are deliberately not migrated; upload real licensed photos through the editor.

## 4. Staff workflow

- `/admin`: securely log in, list products and drafts.
- Products > Add product: creates a **draft** until the publish checkbox is selected and saved.
- Product editor: edit slug, name, price, category, short/long copy, ingredients, benefits, photo gallery order, availability, listing order, and optional **HTTPS** purchase URL.
- Uploads go to Supabase Storage with a 5 MB cap. Uploading stores media immediately; press **Save product** to update the product gallery. Removing a photo from a product does not delete its storage file.
- Published records are read publicly; drafts are visible only to allowed admins by database RLS.
- Without a purchase URL, the existing order inquiry contact flow remains in place.
- Deleting a product is permanent; take a backup before bulk edits. Changed slugs have no automatic redirects yet, so avoid editing published URLs casually.
- The admin overview counters are **product counts**, not traffic analytics; analytics and mission editing are outside M1/M2.

## 5. Acceptance tests and security checks

- [ ] Unauthorized/unlisted users cannot access product drafts via browser or API, even if signed in.
- [ ] Anonymous users can read published products only; INSERT, UPDATE, and DELETE fail for anonymous callers.
- [ ] Logged-in authorized client can add a draft, edit, publish, and unpublish it.
- [ ] Product changes appear on home, catalog, and detail after refresh.
- [ ] Mobile admin form and product images work.
- [ ] Uploaded JPG/PNG/WebP/AVIF below 5MB succeeds; others are rejected.
- [ ] Price cannot be negative, slugs are validated and unique.
- [ ] Empty purchase URL still produces an inquiry action; approved HTTPS URL becomes Buy Now on detail.
- [ ] Sign out and direct navigation to `/admin` require reauthentication.
- [ ] Admin/Storage RLS policies are verified in a second incognito browser before production.

## Known follow-ups

M1/M2 do not yet implement Google Analytics, Google Search Console, mission editing, order processing, inquiry notifications, inventory quantities, order history, SEO redirects, or image file cleanup. A content audit log and automated rollbacks can be a later iteration.

For security: never give the business owner direct GitHub or Vercel owner access merely to edit products; Supabase admin membership is separate from developer/cloud infrastructure privileges.
