# ColeRippe.com

Source of truth for the Cole Rippe personal landing page.

## Hosting

- Source: `RippeSystems/colerippe-com`; production branch: `main`.
- Target: Cloudflare Workers Static Assets, Worker `colerippe-com`.
- Preview: https://colerippe-com.rippesystems.workers.dev/
- Website traffic remains on Netlify while Cloudflare activation is pending.
- Registration is now managed in Cole's Name.com account. Netlify confirmed release in ticket 1151931 on October 24, 2026. This was not a transfer to Cloudflare Registrar.

## Verified migration state — October 24, 2026

- All seven projects and 22 original JPG/MP4 assets are present. The 11 videos are 720×720 H.264.
- Apex source `61c9dc2c1462ef6f8a9986ba89d24d2cd6c65d53` is deployed as version `46f6e9f7-aa87-4eda-a37e-145d96e9759c`. Later source changes have not modified the public site files.
- A separate `colerippe-www` Worker from source `1fb0a6197a9e1ded5940d3a416eb0b658be1a3bb` is deployed as version `e6803c57-fa55-4886-acf5-77f6f31eb9c2`. It returns a 301 to `https://colerippe.com`, preserving paths and queries.
- Both exact active deployments were verified through Cloudflare's API. Desktop (1440×1000) and mobile (390×844) browser checks of the pinned site checkout passed: seven projects, hero playback and rotation, all six reel videos playing, no horizontal overflow and no JavaScript errors. Redirect tests passed.
- Earlier live preview browser verification confirmed the page and hero. Current automated remote preview requests return HTTP 403; local browser checks are not represented as successful live HTTP verification.
- Correct zone: `3038ac36ccb8c9cad52b9606ed28c853`, in the established Worker deployment account.
- Cole saved `mina.ns.cloudflare.com` and `ruben.ns.cloudflare.com` at Name.com. The .com registry RDAP confirms both. Recursive resolver caches are mixed; one later Google DNS check still returned old Netlify nameservers.
- Cloudflare still reports the zone pending. The existing token cannot force activation: one `activation_check` request returned HTTP 403/code 9109. That call was removed and must not be retried with unchanged credentials. Cloudflare can activate automatically; the owner may use the domain's Overview → Re-check now.
- The full DNS inventory is five records: two DNS-only Netlify continuity CNAMEs (apex to `apex-loadbalancer.netlify.com`, www to `colerippe.netlify.app`, TTL 300), plus the three unchanged TradeCalc records. No email records or additional subdomains were present in the complete Netlify inventory.
- Preserve the DNS-only `tradecalc -> custom-domains.chatgpt.site` CNAME and TXT records at `_openai-site-verification.tradecalc` and `_cf-custom-hostname.tradecalc`. TradeCalc remains separately hosted by ChatGPT Sites.
- DNS backup: `migration/colerippe-netlify-dns-2026-10-23.json` in the private `RippeSystems/rippe-arcade` repository. The older Jacob/Tori zone belongs to another account and must not be used.

## Deployment and completion path

The private `RippeSystems/rippe-arcade` repository provides isolated migration workflows using its existing encrypted Cloudflare credentials. Credentials were not extracted or copied.

- `.github/workflows/deploy-colerippe-migration.yml` deploys the pinned apex source.
- `.github/workflows/finish-colerippe-domain.yml` verifies exact deployments, preserved DNS, redirect behavior and browser playback before waiting for an active zone. It then replaces only the two continuity CNAMEs with custom domains: apex to `colerippe-com`, www to `colerippe-www`. Rejected attachment restores the affected continuity CNAME where safe.
- Production verification checks HTTPS and hashes for all 25 site/media files, the www redirect and TradeCalc. Authorization errors stop verification without repeated retries.
- Latest verification run: https://github.com/RippeSystems/rippe-arcade/actions/runs/40096333986 — source QA passed; stopped at 13:05 UTC after three minutes of pending-zone checks. No website DNS writes occurred, production verification was skipped, and no background completion job remains running.

A push to this source repository does **not** automatically deploy through these pinned workflows. Review and update the pinned source explicitly for future deployments. Long-term, establish a direct approved deployment connection for this repository.

## Remaining work

1. Wait for the exact Mina/Ruben zone to become active. Registrar nameservers are already saved correctly.
2. Run the guarded completion workflow after activation; do not change TradeCalc or unrelated DNS.
3. Verify both website hostnames over HTTPS and TradeCalc. Do not call the migration complete before this succeeds.
4. Keep the previous Netlify site available for rollback. No hosting cancellation or paid registrar transfer has been performed.

References: [Worker custom domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/), [Cloudflare activation](https://developers.cloudflare.com/fundamentals/manage-domains/move-domain/), [Netlify external DNS](https://docs.netlify.com/manage/domains/configure-domains/configure-external-dns/).
