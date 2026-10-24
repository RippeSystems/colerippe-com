# ColeRippe.com

Source of truth for the Cole Rippe personal landing page.

## Production

- Website: https://colerippe.com/
- www: https://www.colerippe.com/ returns a 301 to the apex over HTTPS, preserving paths and query strings.
- Source: `RippeSystems/colerippe-com`, branch `main`.
- Hosting and authoritative DNS: Cloudflare.
- Domain registration and renewal: Cole's Name.com account, after Netlify's confirmed release in ticket 1151931.
- Netlify's prior deployment is retained as a rollback copy; no cancellation or paid registrar transfer was performed.

## Migration completed — October 24, 2026

The correct zone `3038ac36ccb8c9cad52b9606ed28c853` is active in the established Worker account. Registrar nameservers are `mina.ns.cloudflare.com` and `ruben.ns.cloudflare.com`.

Completion job `120882585815` attached both custom domains at 13:17 UTC:

| Hostname | Worker | Deployed version |
| --- | --- | --- |
| colerippe.com | colerippe-com | 46f6e9f7-aa87-4eda-a37e-145d96e9759c |
| www.colerippe.com | colerippe-www | e6803c57-fa55-4886-acf5-77f6f31eb9c2 |

Only the two Netlify continuity CNAMEs were replaced. Cloudflare manages their new proxied AAAA records (`100::`). All unrelated records, including the three TradeCalc records, were preserved byte-for-byte.

Apex assets are from source `61c9dc2c1462ef6f8a9986ba89d24d2cd6c65d53`; the redirect was added in `1fb0a6197a9e1ded5940d3a416eb0b658be1a3bb`. Subsequent changes did not modify the public site files.

## Verification

[Public browser verification run 40097799300](https://github.com/RippeSystems/rippe-arcade/actions/runs/40097799300), job `120883598743`, succeeded at 13:21 UTC:

- HTTPS apex returned 200 with Cloudflare headers and the expected title.
- All seven projects, their text and links matched the pinned source.
- CSS, JavaScript, all 11 JPGs and all 11 MP4s matched source SHA-256 hashes: 24 exact asset files.
- Desktop 1440×1000 and mobile 390×844 loaded correctly, with the hero playing and no horizontal overflow or JavaScript errors.
- www returned 301 with the exact apex destination, including the original path/query; the destination returned 200.
- TradeCalc returned 200 with its expected title. Its Sites domain and SSL also remain active.
- Earlier browser checks of the unchanged pinned source verified hero rotation and all six reel videos playing.

Cloudflare injects its analytics beacon into the served HTML, so a raw HTML byte comparison is not an appropriate production gate. The earlier urllib verifier reported that mismatch, a TLS timeout and a 403; the later standard Chrome check succeeded without custom user agents, credentials, security-setting changes or retries. Local runtime HTTP access was also blocked by its network proxy; it was not used as site-health evidence.

## TradeCalc preservation

TradeCalc is a separate ChatGPT Sites deployment at https://tradecalc.colerippe.com/. Preserve its DNS-only CNAME to `custom-domains.chatgpt.site` and both TXT records at `_openai-site-verification.tradecalc` and `_cf-custom-hostname.tradecalc`. Do not attach it to either ColeRippe Worker.

The original complete Netlify zone backup is `migration/colerippe-netlify-dns-2026-10-23.json` in the private `RippeSystems/rippe-arcade` repository. The source inventory had five records and no mail records.

## Deployment operations

The private `RippeSystems/rippe-arcade` repository provides isolated workflows using its existing encrypted Cloudflare credentials. Credentials were not extracted or copied.

- `deploy-colerippe-migration.yml` deploys the explicitly pinned apex source.
- `finish-colerippe-domain.yml` was the guarded one-time domain cutover. Cutover is complete; do not rerun it for routine health checks. Its older urllib verification can report a false failure because of edge HTML changes or client restrictions.
- `verify-colerippe-live-browser.yml` is the successful read-only production browser check and is the appropriate validation workflow.
- `wrangler.www.jsonc` and `www-redirect.mjs` define the separate redirect Worker.

A push to this source repository does **not** automatically deploy through these pinned workflows. Review and update the pinned source explicitly for future deployments, then run public browser verification. Long-term, establish a direct approved deployment connection for this repository.

No scheduled migration or polling job remains running. Keep the prior Netlify site until Cole authorizes cleanup.

## Rollback reference

The old website records were DNS-only CNAMEs, TTL 300: apex to `apex-loadbalancer.netlify.com`, www to `colerippe.netlify.app`. Restoring them requires removing only the corresponding Worker custom-domain attachments first. Do not change nameservers, TradeCalc, or unrelated DNS during a website-hosting rollback.
