# ColeRippe.com

Source of truth for the Cole Rippe personal landing page.

## Hosting

- Source: GitHub (`RippeSystems/colerippe-com`)
- Production: Cloudflare Workers Static Assets
- Production domain: `https://colerippe.com`
- Production branch: `main`

## Deploy

Cloudflare should be connected to this repository with automatic production deployments from `main`.

Deploy command:

`npx wrangler deploy`

The static site is served from `public/` as configured in `wrangler.jsonc`.

## Domain migration

Do not cut DNS away from the current production host until the Cloudflare `workers.dev` deployment has been tested. After verification, attach `colerippe.com` and `www.colerippe.com` in Cloudflare, confirm TLS and redirects, then retire the Netlify production deployment.
