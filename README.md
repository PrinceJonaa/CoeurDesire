<div align="center">
<img width="1200" height="475" alt="CoeurDesire Banner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# CoeurDesire

> A luxury beauty & wellness web application for natural hair, scented oils, and healing through self-love.

**Live site:** [coeurdesire.com](https://www.coeurdesire.com)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home — hero, featured products, testimonials |
| `/catalog` | Product collection — filter by Oil / Hair |
| `/catalog/:slug` | Individual product detail with SEO meta |
| `/services` | Services — remote/virtual available, in-person coming soon |
| `/mission` | Brand mission and philosophy |
| `/contact` | Inquiry form → inquiry@coeurdesire.com |

## Products

- **Essence of Amber** — Grounding body oil — $45
- **Silk Hydration Mist** — Curl refresher spray — $32
- **Rose Gold Elixir** — Radiance face & body oil — $55

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, Framer Motion, Tailwind CSS
- **Hosting:** Vercel (with SPA rewrites for clean URLs)
- **Edge API:** Cloudflare Workers (`coeurdesire-api.jbonner.workers.dev`)
- **Email:** Cloudflare Email Routing → inquiry@coeurdesire.com
- **KV Storage:** Cloudflare KV (inquiry form submissions)

## Run Locally

```bash
npm install
npm run dev        # http://localhost:3000
```

## Cloudflare Worker

```bash
cd cloudflare
wrangler deploy    # requires CLOUDFLARE_API_KEY + CLOUDFLARE_ACCOUNT_ID
```

## Contact

All inquiries → [inquiry@coeurdesire.com](mailto:inquiry@coeurdesire.com)
