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
- The live domain still uses Netlify DNS and hosting. Public nameservers and Worker routing have not changed.
- The correct Cloudflare zone is `3038ac36ccb8c9cad52b9606ed28c853`, assigned `mina.ns.cloudflare.com` and `ruben.ns.cloudflare.com`. It belongs to the existing Worker deployment account and remains pending.
- The actual personal GitHub deployment token was updated by Cole. DNS reads and writes now work through the existing encrypted GitHub Actions connection.
- All three TradeCalc records were added to the pending zone and verified. Cole then authorized Netlify CLI access for `rippesystems@gmail.com`, allowing complete DNS reconciliation through authenticated `getDnsZones` and `getDnsRecords`.
- TradeCalc remains a separate ChatGPT Sites deployment. Preserve its DNS-only CNAME `tradecalc -> custom-domains.chatgpt.site.` and both TXT records at `_openai-site-verification.tradecalc` and `_cf-custom-hostname.tradecalc`.
- Netlify's complete zone contains five records: two managed website records targeting `colerippe.netlify.app` and the three TradeCalc records. There are no email records or additional subdomains in that inventory.
- Cloudflare now contains the five equivalent records, verified by run https://github.com/RippeSystems/rippe-arcade/actions/runs/39973155295 (job `120480820826`). Four scanned website A records were replaced with DNS-only CNAMEs: apex `colerippe.com -> apex-loadbalancer.netlify.com` (flattened) and `www -> colerippe.netlify.app`, TTL 300. This preserves the current Netlify site during nameserver activation. All TradeCalc record IDs, values, TTLs, and DNS-only status were preserved.
- Source backup: `migration/colerippe-netlify-dns-2026-10-23.json` in the private `RippeSystems/rippe-arcade` repository. The older Jacob/Tori zone is in another account and must not be used for this cutover.
- Netlify reports `uses_netlify_registrar=true`; registration date is 2026-08-23. No public DNSSEC DS record was found. A support request to `support@netlify.com` is saved as an unsent Gmail draft; explicit send approval is still required. No registrar transfer or purchase has been submitted.

## Working deployment path

The temporary migration workflow is `.github/workflows/deploy-colerippe-migration.yml` in `RippeSystems/rippe-arcade`. It checks out this repository at the exact source commit above and uses that repository's existing encrypted Cloudflare deployment credentials. Credentials were not extracted or copied.

The workflow deploys only the separate `colerippe-com` Worker. It does not change production DNS. Changes pushed to this source repository are **not automatically deployed by this pinned workflow**; review and update its source commit explicitly for another deployment.

Long-term, connect this repository directly to Cloudflare or provision its own approved GitHub Actions deployment connection.

Deploy command:

`npx wrangler deploy`

The static site is served from `public/` as configured in `wrangler.jsonc`.

## Remaining domain migration

1. Ask Netlify support to set registrar nameservers to `mina.ns.cloudflare.com` and `ruben.ns.cloudflare.com`, preserving the existing site and zone. A complete request is saved in Rippe Systems Gmail as an unsent draft. If Netlify cannot change the nameservers, request their supported registration-release procedure. The API connection is working, but the documented API does not expose a registrar nameserver-update operation.
2. Complete remaining Worker preview QA (hero rotation, reel playback/posters, mobile layout); previous browser observation was blocked by native credential protection, while the page, seven entries, and playing hero had already been verified.
3. Once the Cloudflare zone is active, attach `colerippe.com` and `www.colerippe.com` to the verified Worker. Cloudflare custom domains conflict with existing CNAMEs: back up and replace only the two continuity CNAMEs as part of that attachment, while preserving all TradeCalc records. Verify HTTPS and canonical-domain behavior.
4. Confirm production serves the tested Worker version and TradeCalc remains available. Keep the prior Netlify deployment available for rollback until migration is verified.

References: [Netlify external DNS targets](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/), [Netlify registrar transfer](https://docs.netlify.com/manage/domains/manage-domains/transfer-a-domain/), [Netlify support](https://www.netlify.com/support/), [Cloudflare Worker custom-domain requirements](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
