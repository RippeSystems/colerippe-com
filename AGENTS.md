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
