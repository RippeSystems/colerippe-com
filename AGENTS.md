# ColeRippe.com coordination

- `main` is production.
- Keep changes small and single-purpose.
- Preserve the existing monochrome motion-first visual direction unless explicitly asked to redesign it.
- Before changing outbound project links, verify the destination.
- Test the Cloudflare preview/Worker URL before changing production DNS.
- Never commit secrets, API tokens, passwords, or account credentials.

## Activity log

- 2026-10-22: Restored all 22 original optimized MP4/JPG assets from the migration package; verified every local HTML/JS asset reference and all seven project entries. Cloudflare deployment and domain cutover are pending authenticated access; preserve `tradecalc.colerippe.com`.

- 2026-10-22: Deployed source `61c9dc2c1462ef6f8a9986ba89d24d2cd6c65d53` to https://colerippe-com.rippesystems.workers.dev/ through a separate migration workflow in `RippeSystems/rippe-arcade`, reusing encrypted GitHub deployment credentials without extraction. Run `39834799909` succeeded; version `46f6e9f7-aa87-4eda-a37e-145d96e9759c`. Browser confirmed page, seven projects, and playing hero. Additional browser checks were blocked by native credential protection; scripted preview HTTP returned 1010. Cloudflare zone lookup returned no visible ColeRippe zones. Production remains on Netlify; no DNS changes. Preserve TradeCalc's CNAME to `custom-domains.chatgpt.site.`. See README for exact continuation and pinned-deployment behavior.

- 2026-10-23: Updated migration status after successful DNS access with Cole's corrected personal deployment token. Correct pending zone `3038ac36ccb8c9cad52b9606ed28c853` uses Mina/Ruben and matches the Worker account. Added all three verified TradeCalc CNAME/TXT records through the isolated Arcade workflow; read-only audit job `120470460696` verifies seven total records with four originals unchanged. Public nameservers remain Netlify. Full DNS export, registrar-side change, remaining preview QA, and Worker custom-domain activation are still outstanding; no registrar transfer submitted. Source assets and deployed revision unchanged.

- 2026-10-23: Cole completed official Netlify CLI authorization; verified rippesystems@gmail.com and recovered all five DNS records directly. Reconciliation workflow run `39973155295` / job `120480820826` succeeded: pending Cloudflare zone now has Netlify's documented DNS-only apex/www CNAMEs plus the three unchanged TradeCalc records. Source DNS backup is in the private Arcade repository. Netlify registration controls require support-assisted handling; support email draft is prepared but unsent pending explicit approval. Public nameservers remain Netlify and no Worker custom domains are attached. Remaining preview QA and post-activation CNAME replacement/Worker attachment are documented in README. No production code/assets changed.

- 2026-10-24: Netlify ticket 1151931 confirmed registration released into Cole's Name.com account. Cole saved Mina/Ruben; Google and Cloudflare DNS now report that pair. Cloudflare API still reports pending. Added a dedicated `colerippe-www` redirect Worker, preserving paths/query strings and HTTPS canonical destination, so the existing apex static-assets Worker remains unchanged. Redirect checks passed locally; guarded activation, preview QA and custom-domain attachment are next. No account codes or credentials committed.
