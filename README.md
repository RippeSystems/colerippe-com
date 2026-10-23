# ColeRippe.com

Source of truth for the Cole Rippe personal landing page.

## Hosting

- Source: GitHub (`RippeSystems/colerippe-com`)
- Hosting target: Cloudflare Workers Static Assets
- Working Cloudflare preview: https://colerippe-com.rippesystems.workers.dev/
- Production domain: https://colerippe.com (still on Netlify)
- Production branch: `main`

## Migration status — 2026-10-23

- The complete seven-project site is in this repository, including all 22 original optimized JPG/MP4 assets.
- All local HTML/JavaScript file references resolve. All 11 videos are 720×720 H.264; the uploaded assets were verified byte-for-byte against the migration package.
- Source commit `61c9dc2c1462ef6f8a9986ba89d24d2cd6c65d53` was deployed successfully to the separate `colerippe-com` Worker through existing GitHub Actions credentials.
- Successful deployment run: https://github.com/RippeSystems/rippe-arcade/actions/runs/39834799909
- Cloudflare deployment version: `46f6e9f7-aa87-4eda-a37e-145d96e9759c`.
- Browser verification confirmed the page, seven project entries, and a playing 720×720 hero video. Full reel playback, hero rotation, and mobile layout checks remain outstanding because subsequent browser observation failed with native credential-protection errors.
- A scripted HTTP preview check returned Cloudflare error 1010. This is not treated as content verification. The replacement workflow explicitly requires browser verification before DNS cutover.
- The live domain still uses Netlify DNS and hosting. No production DNS changes have been made.
- The owner added a pending Cloudflare zone for `colerippe.com`, assigned `jacob.ns.cloudflare.com` and `tori.ns.cloudflare.com`. Authenticated inspection confirmed it belongs to a different account from the existing preview deployment.
- The current connection can see that zone, but DNS-record reads and Worker-account reads both returned HTTP 403. No writes were attempted. Account alignment and authorized domain-management access remain required; do not repeat the denied calls with unchanged credentials.
- Preserve `tradecalc.colerippe.com`, currently a CNAME to `custom-domains.chatgpt.site.`.

## Working deployment path

The temporary migration workflow is `.github/workflows/deploy-colerippe-migration.yml` in `RippeSystems/rippe-arcade`. It checks out this repository at the exact source commit above and uses that repository's existing encrypted Cloudflare deployment credentials. Credentials were not extracted or copied.

The workflow deploys only the separate `colerippe-com` Worker. It does not change production DNS. Changes pushed to this source repository are **not automatically deployed by this pinned workflow**; review and update its source commit explicitly for another deployment.

Long-term, connect this repository directly to Cloudflare or provision its own approved GitHub Actions deployment connection.

Deploy command:

`npx wrangler deploy`

The static site is served from `public/` as configured in `wrangler.jsonc`.

## Remaining domain migration

1. Complete preview checks for hero rotation, reel videos/posters, mobile layout, and all seven project entries.
2. Align the domain and Worker accounts. The simplest continuation is for the owner to onboard `colerippe.com` in the account containing the existing `colerippe-com.rippesystems.workers.dev` deployment, then provide that zone's assigned nameservers. The current Jacob/Tori zone is in another account that the connection cannot manage. Alternatively, use an owner-authorized deployment and DNS-management connection for that account. Do not change the shared Arcade credentials or repeat failed login loops.
3. Inspect/export all current DNS records at Netlify, including subdomains and email records, before any nameserver change. The observed authoritative nameservers are `dns1.p07.nsone.net.`, `dns2.p07.nsone.net.`, `dns3.p07.nsone.net.`, and `dns4.p07.nsone.net.`; this is not a full zone backup.
4. Add or locate `colerippe.com` in the correct Cloudflare account, preserve the complete DNS configuration, and activate the zone through the registrar. Preserve the TradeCalc CNAME and unrelated services.
5. Attach `colerippe.com` and `www.colerippe.com` to the verified Worker. Verify HTTPS and canonical-domain redirects.
6. Confirm the production domain serves the tested version and TradeCalc remains available. Keep the prior Netlify deployment available for rollback until migration is verified.
