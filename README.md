# ColeRippe.com

Source of truth for the Cole Rippe personal landing page.

## Hosting

- Source: GitHub (`RippeSystems/colerippe-com`)
- Target hosting: Cloudflare Workers Static Assets
- Production domain: `https://colerippe.com`
- Production branch: `main`

## Migration status — 2026-10-22

- The complete seven-project site is in this repository, including all 22 original optimized JPG/MP4 assets.
- All local HTML/JavaScript file references resolve. All 11 videos are 720×720 H.264; the uploaded assets were verified byte-for-byte against the migration package.
- The live domain still returns Netlify responses. No production DNS changes have been made.
- Cloudflare deployment, GitHub build connection, preview verification, and domain cutover remain pending authenticated Cloudflare access.
- Preserve the existing `tradecalc.colerippe.com` DNS records and hosting throughout this migration.

## Deploy

Connect Cloudflare to this repository with automatic production deployments from `main`.

Deploy command:

`npx wrangler deploy`

The static site is served from `public/` as configured in `wrangler.jsonc`.

## Domain migration

1. Deploy to the temporary Cloudflare `workers.dev` address.
2. Verify the page, hero rotation, reel videos/posters, mobile layout, and all seven project entries on that address before changing production DNS.
3. Inspect and record the current DNS configuration, including subdomains and email records. Preserve unrelated records and `tradecalc.colerippe.com`.
4. Attach `colerippe.com` and `www.colerippe.com` to the verified Cloudflare deployment. Verify HTTPS and canonical-domain redirects.
5. Confirm the production domain serves the same tested version. Keep the prior Netlify deployment available for rollback until the migration is verified.
