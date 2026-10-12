# One-week fixes — implementation and release handoff

Implemented locally on 11 October 2026 in `E:\Sync\SN Ingenia\sningenia-main`. No deployment, push, inquiry, email draft launch, message or booking was performed. Existing branch and commit were retained. The pre-existing hamburger CSS changes are preserved.

## Review

- [Implementation-only patch](implementation-only.patch) compares the final source with the starting working tree, so it excludes the pre-existing CSS edit. Includes the new lossless WebP logo as a Git binary patch.
- [Source manifest](source-manifest.json) records HEAD and before/after SHA-256 hashes. `baseline/` contains the starting versions of the nine modified text files.
- To inspect the working-tree diff, run `git diff` in the source repository. This includes the earlier hamburger CSS edit; `images/logo-header.webp` is a new untracked asset and must also be included in a future release.
- Screenshots and raw Lighthouse/check results are alongside this report. Verification scripts are in the review workspace, outside the website source.

## Implemented in priority order

1. **P0 contact:** removed both unusable forms and their JavaScript submit handlers. All primary calls to action lead to `#contact`, where a localized mail link supplies the correct recipient and encoded ten-minute-call subject. A selectable plain email address and instructions work without an email app. Time is agreed by reply; no click is treated as confirmation. No scheduler or sending capability was added.
2. **P0 SEO:** corrected canonical, reciprocal home/privacy language alternates, social image/URL metadata, schema, robots and sitemap to HTTPS www production URLs. Removed stale placeholder-domain comments. No invented schema reviews, prices or booking actions.
3. **P1 content/proof:** simplified the broad website-build/redesign offer, removed numerical experience/reply/timeline commitments and outcome claims, added a four-step process and practical FAQ, and merged team presentation into About. English and Serbian share the same inventory and status. Three working demos are explicitly identified. Invoko Cuts uses the stylist images; PickUp Fresh uses the food images. Smart Residences retains the neutral “Website project” status because client identity/contribution/publication permission are unconfirmed. No project links or new client claims were fabricated.
4. **P1 usability:** section selections update the fragment and focus the destination heading; menu dismissal restores toggle focus. Project dialogs trap focus, make outside content inert, restore focus, show the representative screen early and offer a contact next step. Button names include visible labels. Content is visible by default. A simple mobile navigation fallback remains available when JavaScript is disabled or its file is blocked. Essential controls work if IntersectionObserver is unavailable. Reduced motion is respected.
5. **P1 loading:** rasterized the exact existing SVG logo at 384px width as a 10,172-byte lossless transparent WebP, retaining the original SVG in source. Corrected the declared aspect ratio. Added Google font-file preconnect with crossorigin and removed unused Inter 300 from the request. Brand families, colors and visual direction are retained.
6. **P1 measurement:** analytics remains off; the dormant provider-loading code and obsolete form events were removed. Both privacy pages describe email-only contact and manual measurement. No analytics cookies, GA4 or Clarity network requests occur in checked flows.

## Checks and limits

- `node --check` for shared JavaScript and `git diff --check`.
- Browser QA: EN/SR home and privacy at 1440×900, 390×844 and 320×844; no horizontal overflow, missing referenced local assets or page JavaScript exceptions. All project dialogs, focus wrapping/restoration, dialog-to-contact path, mobile fragment/history behavior and native FAQ controls checked.
- Additional EN/SR 320px checks with JavaScript disabled, `script.js` blocked and IntersectionObserver absent. Desktop default-motion focus and backdrop dismissal checked separately. Mail recipient/subject inspected without launching the mail app or sending anything.
- Local canonical/alternate/schema/discovery references and image mappings checked. This is local source verification, not confirmation of deployed production responses, search indexing or sharing caches.
- [Browser check results](checks.json) and [three-run Lighthouse results](performance-summary.json). Lighthouse accessibility/SEO scores are diagnostics, not conformance or indexing certification. Exact medians are recorded in the results file; no field Core Web Vitals were collected. Local HTTP preview and remote Google Fonts differ from the earlier public-site measurement conditions, so these runs do not establish a measured live-site improvement. Mobile LCP may remain above the 2.5s target; inspect font loading under production conditions before making a speed claim.
- The optional favicon remains out of scope. Chrome requests `/favicon.ico` and receives 404; Lighthouse records this as its console-error/best-practices diagnostic. The admin-only company LinkedIn link was omitted pending verification; Instagram and the existing personal LinkedIn links remain.

## Manual measurement

Use [the empty log template](inquiry-call-log-template.csv) in private studio storage; do not publish it with the site. Add an inquiry only after an actual message arrives. Mark a call confirmed only after both parties agree to its time and timezone; distinguish held, cancelled, rescheduled and no-show states. Use a record ID rather than copying message bodies into measurement files. Keep contact details in the inbox or an appropriately restricted business system. Mark internal tests separately. Record the source/partner only when known, and leave it unknown otherwise. Manual tracking has no site-session denominator; it cannot establish visit-to-inquiry conversion rates.

## Remaining release requirements

1. Review and approve the source diff and Serbian copy; confirm the inbox monitor. Confirm controller identity, any required address and the existing proposed twelve-month retention period in the privacy policy; its existing TODOs remain for owner review. No legal-policy choices were invented.
2. In the existing GitHub Pages host, verify domain/certificate settings and enable Enforce HTTPS under separate hosting authorization. Check both HTTP hosts redirect to HTTPS www with paths/queries preserved and no loops. A source edit cannot enforce this host setting.
3. With explicit separate authorization, test real inbox receipt and a reply agreeing a ten-minute time with named IANA timezones, including a US timezone/DST case. This task intentionally did not send inquiries or create bookings. Inspect actual mail-app draft handling on the intended devices if needed; only the URI was verified here.
4. Check a real phone and intended non-Chrome browsers, including sticky-call overlap, focus/zoom, language switching and Serbian glyphs. Local automated viewport checks do not replace physical-device checks.
5. When deployment is separately authorized, include all nine modified text files **and the new WebP asset**. Keep the original logo SVG. Preserve the earlier hamburger change. Review the full release diff against HEAD, prepare rollback to the prior deployment, and verify the deployed EN/SR home/privacy, scripts, images, discovery files, redirects and canonical/alternate/social URLs. Use a sharing debugger and optionally Search Console after release; neither was accessed here.
6. Review the final Lighthouse medians and the remaining font waterfall under production conditions. Optional follow-up remains outside this patch: favicon, verified public company/demo links, self-hosted fonts, analytics/consent implementation, scheduler, additional client proof and elaborate animation.

## Final local Lighthouse medians

Three sequential runs per profile on the final source, Lighthouse 13.5.0 / Chrome 155. Default mobile simulation and desktop preset, local HTTP preview, externally loaded Google Fonts.

| Profile | Performance | Accessibility / best practices / SEO | LCP | TBT | CLS |
| --- | --- | --- | --- | --- | --- |
| en-mobile | 85 | 100 / 96 / 100 | 3.41s | 0ms | 0.000 |
| en-desktop | 96 | 100 / 96 / 100 | 1.08s | 0ms | 0.008 |
| sr-mobile | 80 | 100 / 96 / 100 | 3.86s | 0ms | 0.000 |

The initial fallback-navigation layout shift was corrected before these final runs. Mobile LCP remains above the 2.5s lab target. The known optional favicon 404 accounts for the best-practices console diagnostic. These local lab medians are not live-site speed or conversion results.

## Browser feedback revisions

The platform note now occupies the fourth service-grid position as a lightly tinted card. The contact section has shorter copy, a compact metadata/social layout, a selectable linked email address, restored Instagram/company LinkedIn links and a purple call-duration highlight. The email-application/copy-paste explanation is removed. Changes apply to English and Serbian. LinkedIn uses the original company ID’s public route rather than its admin dashboard; logged-out availability still needs release validation.

Six targeted browser layout checks passed at 1440, 390 and 320px in both languages, including the four-card grid, email/social hrefs, revised copy, call-duration highlight and absence of horizontal overflow. Screenshots named `*-revised-*.png` show this revision. `git diff --check` passed. The Lighthouse medians above predate this visual feedback revision and were not rerun for these content/layout changes. `before-section-feedback/` preserves the three files as they were before these revisions; the implementation patch and manifest are refreshed to the latest source.
