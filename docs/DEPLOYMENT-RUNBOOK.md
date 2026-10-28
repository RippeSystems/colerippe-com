# ColeRippe.com approved deployment runbook

Verified 2026-10-28. The primary hub and shared-footer source stay in
`RippeSystems/colerippe-com`, branch `main`. Products keep their own repositories
and deployments. A source push here does **not** deploy.

## Connection status

A direct repository deployment connection was not established in this session.
The working approved connection is the encrypted Cloudflare token/account pair
in the private `RippeSystems/rippe-arcade` Actions environment. Its isolated
ColeRippe workflow deploys the separate `colerippe-com` Worker.
The connected tools cannot provision repository secrets; no Cloudflare connector
was available, and a new direct Cloudflare Git connection was not verified.
No credential was extracted, copied, printed, or added to source.

Use the exact procedure below now. A future direct connection needs an
owner-provisioned, appropriately scoped deployment credential or a native
Cloudflare repository connection for **only this repository and Worker**.
Verify its account, Worker, branch and build/deploy settings before enabling it,
then retire the pinned trigger to prevent duplicate deployments. Do not infer
that a GitHub push is live until that connection is established and verified.

## Current verified release

- Source: `775f5ff4f29a6d89afc32652b792695978141b6d`.
- Deployment pin change in private Arcade repo: `3bd5968f97f42484ddafe149c4f357bbd6022273`.
- Successful deployment run: [40698299208](https://github.com/RippeSystems/rippe-arcade/actions/runs/40698299208).
- Browser-verifier pin/change: `e01d22f9e79be30c1dcbbe63fe24658de365b9b7`.
- Initial successful browser run: [40698561083](https://github.com/RippeSystems/rippe-arcade/actions/runs/40698561083).
- Expanded read-only break-loop verifier: `f41325ce9d68dd478efd349808b9e833999069da`;
  latest successful browser run [40700443970](https://github.com/RippeSystems/rippe-arcade/actions/runs/40700443970).
- Public site: https://colerippe.com/ .
- Preview: https://colerippe-com.rippesystems.workers.dev/ .
- Target: `wrangler.jsonc`, Worker `colerippe-com`, assets `./public`.
- Redirect Worker `colerippe-www` is separate and needs no routine redeploy.

## Routine release, one purpose at a time

1. Fetch/pull latest `main` in **both** separate repositories; read each
   `AGENTS.md`. Record both full HEAD SHAs. Re-check remote HEAD immediately
   before every write or push. Stop and reconcile if either advanced.
   Never force-push over Muse or other changes.
2. Make and verify the single-purpose hub change in `colerippe-com`.
   Check `node --check public/script.js`, local assets/links, seven project
   entries, the one hero and its 6.4-second loop where unchanged. Commit and
   push, then record the exact full source SHA. This push alone is not a deploy.
3. Show Cole the concrete live deploy plan. In private
   `RippeSystems/rippe-arcade`, edit only the source `ref:` under
   `Check out verified ColeRippe.com source` in
   `.github/workflows/deploy-colerippe-migration.yml` to that exact 40-character
   source SHA. Keep `repository: RippeSystems/colerippe-com`, `path: site`,
   the action pins, static-only target assertions, credential references and
   deployment command unchanged:
   `deploy --config wrangler.jsonc --name colerippe-com`.
4. Append the planned release to Arcade's activity log, re-check both HEADs,
   commit the pin as its own change, and push Arcade `main`. That workflow's
   path trigger starts the isolated deploy. It requires
   `CLOUDFLARE_DEPLOY_ENABLED=true`, `CLOUDFLARE_API_TOKEN` and
   `CLOUDFLARE_ACCOUNT_ID` already configured there. Do not reveal their values.
   The ordinary Arcade workflow may also run against its **test Worker**.
5. Wait for **Deploy ColeRippe migration preview / deploy-colerippe** to succeed;
   record the run ID, job ID and deployed Worker version. Despite its historical
   “preview” name, `colerippe.com` already attaches to this Worker: this is a
   **live hub deployment**. Stop on failure; do not retry blindly.
6. Only after deployment succeeds, set the source `ref:` in
   `.github/workflows/verify-colerippe-live-browser.yml` to the **same source SHA**.
   Its script is `migration/verify-colerippe-live-browser.cjs`.
   Update expected asset inventories only for deliberate source changes.
   Commit this verification change separately and push `main`; the workflow
   path trigger starts the read-only browser check.
7. Require **Verify ColeRippe public browser / verify** to succeed. It currently
   checks HTTPS, the seven exact project links/text, title, 25 asset hashes
   (including shared footer CSS), one playing hero, desktop 1440×1000 and mobile
   390×844 without overflow/JS errors, the www 301 preserving path/query,
   TradeCalc HTTPS and identical four-link footers. It also checks the live
   break card's third-calculation/export triggers, error suppression, dismissal,
   session limit, preserved result, new-tab Reactor default, protected game URLs,
   keyboard merge and conditional game-over return. These use isolated browser
   storage and make no signup or server-data writes. Read the job's
   `COLE_LIVE_QA` output rather than assuming a successful upload proves QA.
8. Record source/pin SHAs, deployment and browser run IDs, actual verification,
   and limitations in both activity logs. Keep each live release separate.

If the correct pins are already committed, the same workflows can be launched
from **Actions → workflow name → Run workflow → main** without a placeholder
commit. This dispatch does not change the source pin.

## Shared footer ownership

Canonical markup: `shared/rippe-footer.html`.
Canonical stylesheet: `public/rippe-footer.css`.
The hub's `public/index.html` embeds that markup. TradeCalc keeps an identical
local HTML/CSS copy and includes the CSS in its offline shell; it does not fetch
runtime code from the hub. Update the source first, copy it into each product's
own repo, compare exact markup/CSS, then deploy and verify each product separately.

Exact order: **TradeCalc · Arcade · Rentals · colerippe.com**.
No Rippe Requests destination. House navigation only; no third-party or
programmatic ads. The strip is excluded from print output.

## Do not use these for routine releases

- Do not rerun `finish-colerippe-domain.yml`, `prepare-colerippe-domain.yml`,
  `preserve-tradecalc-dns.yml` or `reconcile-colerippe-dns.yml`.
  Migration/cutover is already complete.
- Do not change nameservers, DNS, domain attachments or the redirect Worker.
- Preserve the DNS-only TradeCalc CNAME to `custom-domains.chatgpt.site` plus
  both existing TXT records byte-for-byte. TradeCalc remains a separate
  ChatGPT Sites project, never either ColeRippe Worker.
- Do not cut over `rippearcade.com` from its existing Sites project. The repo's
  `rippe-arcade.rippesystems.workers.dev` remains the test destination until
  Muse verifies Reactor and Cole makes the separate cutover decision.
- Do not deploy or modify Requests, Replit Rentals, subscriptions or other games.

## Code rollback

Pin the isolated deployment workflow to the previously verified hub source
(e.g. `949b20f2467beb4a818585ef88d14d12e205821b` before this footer release),
deploy that source through the same Worker, then pin/run its matching browser
verification. Adjust the footer-specific assertions if rolling back before the
footer existed. A code rollback does not require DNS, registrar or Worker-domain
changes. Show the rollback plan before the live operation.
