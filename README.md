# PeptidesCanada Storefront

Static premium storefront deployed from GitHub to Vercel with Vercel API routes for Stripe Checkout, newsletter capture, webhook order tracking, and a private `/admin` dashboard.

## Stripe setup

Add these variables in `Vercel -> Project Settings -> Environment Variables`:

- `STRIPE_SECRET_KEY`: Stripe Dashboard -> Developers -> API keys -> Secret key.
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Stripe Dashboard -> Developers -> API keys -> Publishable key.
- `NEXT_PUBLIC_SITE_URL`: your deployed site URL, for example `https://pepcan.vercel.app`.
- `STRIPE_WEBHOOK_SECRET`: Stripe Dashboard -> Developers -> Webhooks after adding `/api/stripe-webhook`.

The frontend never receives `STRIPE_SECRET_KEY`. The cart calls `/api/create-checkout-session`, and the API validates product handles, variants, quantities, and prices server-side before creating the Stripe Checkout session.

## Database setup

Newsletter subscribers and paid Stripe orders can be tracked in `/admin` after connecting Supabase:

1. Create a Supabase project.
2. Run `supabase-schema.sql` in the Supabase SQL editor.
3. Add these Vercel environment variables:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_API_KEY`
4. Visit `/admin` and enter `ADMIN_API_KEY`.

Without Supabase variables, the storefront and Stripe Checkout still work, but subscriber/order persistence is disabled.

## Local checks

```bash
npm install
npm run check
node build-static-github-pages-site.js
```
