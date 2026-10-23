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
- Three missing TradeCalc records were added to this pending zone and verified by read-only audit job `120470460696` in run https://github.com/RippeSystems/rippe-arcade/actions/runs/39947151659. All four existing apex/www A records were preserved.
- TradeCalc remains a separate ChatGPT Sites deployment. Preserve its DNS-only CNAME `tradecalc -> custom-domains.chatgpt.site.` and both TXT records at `_openai-site-verification.tradecalc` and `_cf-custom-hostname.tradecalc`.
- Cloudflare now contains seven records. This is not yet a complete reconciliation against Netlify's DNS export. The older Jacob/Tori zone is in another account and must not be used for this cutover.

## Working deployment path

The temporary migration workflow is `.github/workflows/deploy-colerippe-migration.yml` in `RippeSystems/rippe-arcade`. It checks out this repository at the exact source commit above and uses that repository's existing encrypted Cloudflare deployment credentials. Credentials were not extracted or copied.

The workflow deploys only the separate `colerippe-com` Worker. It does not change production DNS. Changes pushed to this source repository are **not automatically deployed by this pinned workflow**; review and update its source commit explicitly for another deployment.

Long-term, connect this repository directly to Cloudflare or provision its own approved GitHub Actions deployment connection.

Deploy command:

`npx wrangler deploy`

The static site is served from `public/` as configured in `wrangler.jsonc`.

## Remaining domain migration

1. Complete preview checks for hero rotation, reel videos/posters, mobile layout, and all seven project entries.
2. Download the complete DNS CSV from Netlify Team dashboard > DNS > colerippe.com > Download records, then reconcile every record with the correct Cloudflare zone. The observed authoritative nameservers remain `dns1.p07.nsone.net.`, `dns2.p07.nsone.net.`, `dns3.p07.nsone.net.`, and `dns4.p07.nsone.net.`.
3. Complete the registrar-side nameserver change to Mina/Ruben after reconciliation. The domain was registered through Netlify (underlying registrar Name.com); authenticated registration controls are not currently available to this session. Netlify's official transfer-out process requires contacting support. No registrar transfer or purchase has been submitted.
4. Once the Cloudflare zone is active, attach `colerippe.com` and `www.colerippe.com` to the verified Worker. Verify HTTPS and canonical-domain behavior.
5. Confirm the production domain serves the tested version and TradeCalc remains available. Keep the prior Netlify deployment available for rollback until migration is verified.

References: [Netlify DNS export](https://docs.netlify.com/manage/domains/manage-domains/manage-dns-records/), [Netlify registrar transfer](https://docs.netlify.com/manage/domains/manage-domains/transfer-a-domain/), [Cloudflare Worker custom-domain requirements](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/).
