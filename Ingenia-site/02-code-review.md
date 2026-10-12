# SNIngenia — Phase 2 technical audit and fix plan

Reviewed 11 October 2026, Europe/Budapest. Website: https://www.sningenia.com/. Source: `E:\Sync\SN Ingenia\sningenia-main`. This was a read-only website audit: no website source edits, commits, deployments, inquiries, emails or calendar bookings. Audit scripts, downloaded public evidence and this report were written only under Reports.

## Decision and scope

Keep the existing static stack and visual identity. First make the introductory-call path honest and usable, repair production URL metadata, and enforce HTTPS. Then address the measured font/logo costs, keyboard navigation and bilingual consistency. No framework migration, CMS, large dependency set or cosmetic code rewrite is warranted.

**Owner clarification during this audit: use email-arranged 10-minute calls initially.** Therefore the week-one primary action should be “Arrange a 10-minute introductory call” / “Dogovorite uvodni poziv od 10 minuta,” with an explicit explanation that a time will be agreed by email. Do not promise instant slot booking or mark a mail link click as a completed booking. Display `sningenia@gmail.com` as selectable text as well as a mail link for visitors without a configured email application. No scheduler needs installing for this release.

Read [PORTFOLIO-REVIEW-BRIEF.md](C:/Users/Cebo/Documents/ChatGPT/Ingenia-site/PORTFOLIO-REVIEW-BRIEF.md) and [01-client-review.md](C:/Users/Cebo/Documents/ChatGPT/Ingenia-site/01-client-review.md). Their requirements remain: broad industry positioning, no public prices, English/Serbian parity, truthful portfolio proof, existing identity, one-week scope. Earlier recommendations were treated as unimplemented until rechecked. No conclusion here attributes low inquiry volume to the site; traffic and funnel evidence remain absent.

## Actual stack, instructions and deployment baseline

| Item | Observed evidence and interpretation |
| --- | --- |
| Stack | Four hand-authored static HTML pages: EN/SR home and privacy; shared `styles.css`, `script.js`, `analytics.js`; local SVG/WebP assets; Google Fonts. No package manifest, framework build, backend, server form handler, test suite, deployment workflow or hosting config in the inspected working tree. Copy describing Webflow/Framer is an offer, not evidence that this portfolio runs on either platform. |
| Version | Branch `main`; HEAD `963c29a9077bbcf02f6d410aaa384c2c86261362`, “Added mobile apps,” committed 10 October 2026 at 00:17:33 +0200. Origin: `https://github.com/Sebastijan-S/sningenia.git`. No fetch/pull performed; remote freshness is unknown. |
| Existing local changes | `git status --short` was and remains ` M styles.css`. The local change centers the hamburger bars with a 5px gap and changes expanded transforms from ±8px to ±7px. It predates this audit and must be preserved/reviewed by its author. |
| Applicable instructions | Checked `E:\AGENTS.md`, `E:\Sync\AGENTS.md`, `E:\Sync\SN Ingenia\AGENTS.md`, repository `AGENTS.md` and nested repository instruction files: none found. Read business instructions under `ChatGPT\SN Ingenia\AGENTS.md`, `Email Personalization\AGENTS.md`, `Lead-Finder\AGENTS.md`; the review brief and current user direction override older positioning/outreach status. No excluded folder or its contents was searched/read. No report-workspace `AGENTS.md` was present in the inventory. |
| Hosting | Public DNS: `www.sningenia.com` CNAME → `sebastijan-s.github.io`; resolved GitHub Pages IPv4/IPv6 addresses. Public responses include `Server: GitHub.com`, GitHub request IDs and Fastly/Varnish cache headers. This is strong public evidence of GitHub Pages hosting. Account settings, selected deployment branch, build logs and deployment commit were not authenticated/inspected. |
| Live versus source | EN `/` and `/index.html` and `script.js` matched local bytes; all 10 sampled images matched local SHA-256. SR home, both privacy pages, analytics, robots and sitemap matched after CRLF/LF normalization; their raw hash differences were line endings, not content changes. Live CSS matches HEAD after normalization and differs from working CSS only in the existing hamburger edits. Thus no substantive divergence in sampled content except that local CSS change; this does **not** prove an authenticated deployment SHA or parity of every repository file. |
| HTTPS | HTTPS pages load normally; no certificate error was observed. Raw HTTP still returns 200 for www. The earlier concern about pending certificates is not evidence of a current HTTPS outage. |

Evidence: [public responses, hashes and headers](C:/Users/Cebo/Documents/ChatGPT/Ingenia-site/02-evidence/public-responses.json), [DNS](C:/Users/Cebo/Documents/ChatGPT/Ingenia-site/02-evidence/dns.json), [redirects](C:/Users/Cebo/Documents/ChatGPT/Ingenia-site/02-evidence/redirects.json). Public snapshots are retained in `02-evidence`; source was not copied to another website checkout or modified. Initial sandbox network refusal was resolved with authorized public read-only requests and is not site downtime.

## Measured baselines and conditions

Lighthouse CLI **13.5.0**, Windows, installed Chrome 155 / headless Chrome 155.0.0.0, using the public HTTPS URLs. One successful navigation run per profile; no runtime errors or run warnings in the Lighthouse reports. Default storage reset enabled, no custom request blocks or headers. Measurements depend on this machine, network, CDN state and simulated throttling; they are neither repeated medians nor physical-device tests. Installation used an audit-local npm cache; no dependency was added to website source.

| Lab run | Time, Budapest | Performance / accessibility / best practices / SEO | FCP | LCP | Speed Index | TBT | CLS | Reported transfer total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [EN mobile](C:/Users/Cebo/Documents/ChatGPT/Ingenia-site/02-evidence/lighthouse-mobile.json), `/` | 22:23:02 | 82 / 100 / 73 / 100 | 3.1s | 3.6s | 3.6s | 160ms | 0 | 548 KiB |
| [EN desktop](C:/Users/Cebo/Documents/ChatGPT/Ingenia-site/02-evidence/lighthouse-desktop.json), `/` | 22:23:41 | 99 / 100 / 73 / 100 | 0.7s | 0.7s | 1.0s | 0ms | 0.006 | 610 KiB |
| [SR mobile](C:/Users/Cebo/Documents/ChatGPT/Ingenia-site/02-evidence/lighthouse-sr-mobile.json), `/sr/index.html` | 22:24:26 | 71 / 100 / 73 / 100 | 3.8s | 4.9s | 4.0s | 170ms | 0 | 663 KiB |

Mobile: simulated RTT 150ms, throughput 1,638.4 Kbps, CPU slowdown ×4; viewport 412×823, DPR 1.75. Desktop: simulated RTT 40ms, throughput 10,240 Kbps, CPU ×1; viewport 1350×940, DPR 1. Manual browser checks separately requested 1440×900 and 390×844 viewports. No network/CPU throttling was applied to those manual checks.

The SR/EN difference is not a controlled language experiment: document length, lazy-load proximity and network variation differ. Do not claim Serbian is consistently 1.3s slower from these single runs. Repeat three runs per profile after changes and compare medians under the same setup.

**No field Core Web Vitals were measured.** No CrUX, Search Console, RUM or real-user INP dataset was accessed. Lighthouse TBT is a lab diagnostic, not field INP. Field “good” thresholds are LCP ≤2.5s, INP ≤200ms and CLS ≤0.1 at the 75th percentile; these are separate from the scores above. See [Web Vitals definitions](https://web.dev/articles/vitals).

Important interpretation:

- Automated SEO **100** did not detect that canonical/hreflang/social URLs use `example.com`. It is not an indexing certification.
- Automated accessibility **100** is not a WCAG conformance result. The same reports contain a failing label/name diagnostic, and manual focus checks found a navigation defect.
- Best-practices HTTPS/mixed-content warnings point to the **form action `mailto:sningenia@gmail.com`**, not a discovered HTTP script/image request on the HTTPS page. Do not misreport that warning as an insecure network asset. Actual HTTP availability was independently verified with raw headers.
- Lighthouse recorded `/favicon.ico` 404 in each run. Manual in-app browser warning/error log queries returned no entries; that narrower log surface does not contradict the Lighthouse network evidence.

Direct HTTP checks fetched 21 page/file/asset URLs: all returned 200; individual sequential elapsed times were 155–585ms, including request overhead. These are spot checks, not uptime statistics, server-only timing or user-experience scores. Responses use `Cache-Control: max-age=600`; browser Lighthouse transfer sizes demonstrate compressed HTML/CSS/JS despite the uncompressed bodies saved by the separate HTTP client.

## Confirmed actionable findings

Priority is implementation order: P0 = first release work; P1 = this week; P2 = small follow-up. Severity describes impact, not an asserted revenue loss. File line references below refer to the inspected **local working tree**, unless a live URL is named. Shared CSS live lines after the hamburger block are one lower than local lines.

### T1 — High, P0: enabled contact form cannot submit through its intended handler

**Business consequence:** a visitor spends time filling a form that cannot send via the site's JavaScript path. An email fallback exists, but visitors only discover the configuration error after attempting submission.

**Location/evidence:** `index.html:395`, `sr/index.html:220`; `script.js:232–260`. Fresh live DOM on both languages has `data-endpoint=""` and `action="mailto:sningenia@gmail.com"`. Deployed `script.js` matches source; it prevents default, reads the empty endpoint at line 237, shows “The form is not connected yet” / Serbian equivalent and returns before `fetch`. Name/email/message are required; email uses `type="email"`. Success/error regions already have status/alert semantics and email fallback. No valid form submission was performed; this is a verified configuration/control-flow defect, not a tested inbox-delivery failure.

**Reproduce without sending:** inspect either live form and deployed handler, tracing the empty-endpoint branch. DOM validity inspection on SR showed empty required fields invalid. This audit did not click submit, enter real personal information or test browser validation bubbles.

**Smallest fix:** for the owner-selected email-arranged route, replace the enabled form with clear call-arrangement instructions, a mail link with an encoded introductory-call subject, and a visible address. Remove obsolete `mailto` form action/submit states. Keep the existing contact section/visual styling. Provide EN/SR instructions that the time is agreed by reply; remove unsupported response-time commitments per Phase 1.

**Acceptance:** every primary CTA reaches that usable route; duration and email-arranged nature are explicit; mail application opens an unsent draft with the correct recipient/subject in an authorized test, and visitors can select/copy the address without a mail app. No enabled unconnected form remains; no click is counted as a received inquiry or booking. Verify mailbox receipt separately using the controlled procedure below.

### T2 — High, P0: production URL identity points to `example.com`

**Business consequence:** search and sharing systems receive wrong ownership/discovery signals; social image URLs point off-site. Current ranking, indexing loss or revenue impact has not been measured.

**Location/evidence:** `index.html:9–22,31`; `sr/index.html:10–23,32`; `privacy.html:10–13`; `sr/privacy.html:10–13`; `robots.txt:4`; `sitemap.xml:5–26`. Re-fetched live pages/files contain the same placeholders. Both home pages use `ProfessionalService` JSON-LD with a placeholder `url`; JSON parses successfully. Robots allows crawling, but declares a foreign sitemap. Sitemap entries and reciprocal alternates describe the foreign host.

**Reproduce:** GET the four page URLs plus `/robots.txt` and `/sitemap.xml`; inspect canonical, hreflang, `og:url`, OG/Twitter images and schema URL. Searching downloaded snapshots for `example.com` reproduces it without relying on search extracts.

**Smallest fix:** consistently use `https://www.sningenia.com/`, `/sr/`, `/privacy.html`, `/sr/privacy.html`. Pair home↔home and privacy↔privacy reciprocally, with EN `x-default`; set homepage social/schema URLs and an existing valid production image. Keep simple truthful schema; no reviews, prices, fake address, booking action or rich-result promises. Canonicals are preferences/signals, not instructions that guarantee Google selection: [Google canonical guidance](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls).

**Acceptance:** zero placeholder-domain references in deployed SEO/discovery fields; all sitemap locations, alternates and canonical targets return 200 on HTTPS; each page has one appropriate canonical; language pairs reciprocate, including privacy. Production OG image returns a correct image MIME type and is previewed in a sharing debugger. Validate schema syntax and truthful fields. Search Console URL inspection/sitemap submission, if access exists later, is a separate check; successful deployment does not prove immediate reindexing.

### T3 — High, P1: HTTP www remains publicly served without HTTPS enforcement

**Business consequence:** visitors arriving on HTTP can receive a page susceptible to transit interception or modification; HTTP also duplicates the HTTPS content.

**Location/evidence:** `http://www.sningenia.com/` returns **200** with no Location header. Independently reproduced with both `Invoke-WebRequest` and `curl.exe -I --max-redirs 0`. Apex HTTP returns 301 to **HTTP** www; apex HTTPS returns 301 to HTTPS www. HTTPS itself loads successfully. This finding is independent of Lighthouse's mailto warning.

**Smallest fix:** verify the repository's Pages domain/certificate settings, then enable **Enforce HTTPS** in the existing host, subject to separate implementation authorization. GitHub documents this supported setting: [GitHub Pages HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https). No hosting migration is needed. Account setting state was not accessed, so the finding describes response behavior rather than guessing the checkbox state.

**Acceptance:** raw requests to both HTTP hosts redirect permanently to HTTPS www, preserving path/query; no loops; EN/SR/privacy pages and assets still load. HTTPS apex redirects consistently. Recheck from a client that does not silently upgrade HTTP.

### T4 — Medium, P1: mobile section navigation leaves keyboard focus at the menu toggle

**Business consequence:** keyboard visitors see the selected section but their next Tab continues from the header, making the page harder to navigate.

**Location/evidence:** `script.js:37–42,53–65`. Menu-link handler scrolls to the target, then always calls `closeMobileNav()`, which focuses the toggle. At 390×844, open menu → choose Work: menu closes and focus is “Toggle navigation,” confirmed in the live AX tree and DOM. The handler also intercepts desktop links without updating the URL fragment; on desktop the attempt to focus a hidden toggle leaves focus on the link.

**Smallest fix:** distinguish dismissing the menu from choosing a section. Restore toggle focus on Escape/backdrop/close; on a section selection, focus the destination heading/section using a temporary `tabindex="-1"` and preserve native fragment/history behavior. Respect reduced motion and the fixed header offset. Avoid adding a routing library.

**Acceptance:** EN/SR, keyboard-only: select each menu section and confirm focus lands at its heading; next Tab reaches relevant content. Escape/close returns focus to the toggle. Desktop section links update fragments and Back works predictably. Confirm focus is visible and not covered by the fixed header/sticky CTA.

### T5 — Medium, P1: visible case-study labels do not match accessible names

**Business consequence:** voice-control users may say the visible label and fail to activate the intended project control.

**Location/evidence:** EN buttons `index.html:163,185,207,229` show “View case study” but `aria-label` starts “Open [project] case study”; SR `sr/index.html:119,130,141,152` shows “Pogledajte studiju slučaja” but labels begin “Otvori…”. All three Lighthouse reports flag these. Reports also flag the social abbreviations “IG”/“in” versus their expanded names; address those while choosing labels/icons.

**Smallest fix:** include the complete visible wording in each accessible name, such as “View case study: Smart Residences,” and the Serbian equivalent. Prefer real visible text plus a visually hidden project name if straightforward. Use a recognisable decorative social icon with an explicit name, or visible full service names, rather than competing abbreviations.

**Acceptance:** accessible name contains the visible text for each text control; names remain project-specific. Re-run the label/name audit in both languages and check keyboard/project opening. Automated score alone is insufficient.

### T6 — Medium, P1: reveal styling makes essential content depend on JavaScript

**Business consequence:** if the script is blocked, unavailable or fails before observer initialization, substantial proof/FAQ content is visually hidden. Mobile menu activation also depends on this script. This is a resilience defect demonstrated by source, not an observed current script outage.

**Location/evidence:** `styles.css:1017–1021` sets `.reveal { opacity:0; transform:translateY(8px) }`; `script.js:1–21` must add `.visible`. Static scan counts **37 reveal elements per homepage**. No default-visible/no-script override exists; reduced-motion CSS is the limited exception. The first statement unconditionally constructs `IntersectionObserver`, so failure there prevents later interactions from initializing.

**Smallest fix:** keep content visible by default; opt into reveal hiding only when animation setup succeeds, or remove reveal hiding entirely. Guard observer creation and separate optional animation setup from essential controls. Provide simple mobile navigation/email access when JS is absent. This can preserve all colors, typography and layout.

**Acceptance:** on a preview, disable JS and separately block `script.js`: headings, projects, FAQ text/controls and email route remain available; mobile can reach main sections/language links. With JS enabled, ordinary menu/dialog flows still work. Reduced-motion mode has no reveal animation. Full no-JS runtime testing was not performed in this audit; these are release checks.

### T7 — Medium, P1: avoidable logo and font costs affect mobile loading

**Business consequence:** the first impression waits longer under mobile conditions; the measured LCP candidate on EN mobile is `.hero-bio`, so treating every image as the LCP problem would miss the font path.

**Location/evidence:** `images/logo-header.svg:1–3`, referenced at `index.html:44` and all other pages. It is **317,871 bytes**, largely an embedded base64 PNG, displayed at max-height 24px (`styles.css:69`). EN mobile transferred **239,650 bytes** for this single logo—about 43% of its measured transfer total. HTML width/height says 1536×1024 although the SVG viewBox is 1536×326. Font CSS at `index.html:23–24`, `sr/index.html:24–25`, both privacy pages `:14–15` blocks rendering; only `fonts.googleapis.com` is preconnected. EN mobile Lighthouse estimates 2,060ms potential render-blocking savings and a 340ms opportunity for `fonts.gstatic.com` preconnect; these are model estimates, not additive or guaranteed gains. Three font resources transferred about 83 KiB together. `display=swap` is already present.

**Smallest fix:** export the exact existing logo as a compact genuine vector or appropriately sized transparent raster at normal/2× display size; correct intrinsic aspect ratio. Add `fonts.gstatic.com` preconnect with `crossorigin`, retain the same two brand families and only needed weights/styles. If the font waterfall remains material, self-host a minimal licensed WOFF2 set with Serbian character coverage; treat this as a second step, not a prerequisite. Keep CSS blocking until a measured safe alternative is justified; do not introduce a flash of unstyled content to chase a score.

**Acceptance:** unchanged logo appearance at normal/2× desktop/mobile sizes, no layout jump; aim for a logo transfer below 20 KiB if visual quality permits. Repeat matched Lighthouse runs and inspect the font waterfall, fallback and Serbian diacritics. Seek mobile LCP ≤2.5s in the lab and no regression in CLS/TBT, but do not promise those values solely from estimated savings.

### T8 — Medium, P1: portfolio data and images disagree across languages

**Business consequence:** clients and assistive-technology users get conflicting descriptions of what the studio built.

**Location/evidence:** live/source EN `index.html:167–207` uses Avazo Style and PickUp Fresh; SR `sr/index.html:122–141` still uses Little Smiles Dentistry and Clive Contractors. Both refer to the same shared image indices. This was rechecked in the live SR dialog, which describes dentistry and appointment integration. Phase 1 visually verified the EN food/stylist image swap; current HTML and image hashes match that inspected version. Working demos are not commissioned projects per the owner brief.

**Smallest fix:** implement Phase 1's approved project inventory, demo labels, truthful scope and corrected image/alt mapping once in both HTML pages. Keep manual duplicated HTML for now; a short parity checklist is sufficient for four pages. Do not add a templating framework for this correction.

**Acceptance:** each card and dialog has the same approved identity/status in EN/SR; pictured UI, alt text, case image and title agree. No unsupported client/result/production-reliability claims remain. Verify any project URL before adding it; actual demo functionality is outside this portfolio-only audit without URLs and authorized test accounts.

### T9 — Medium measurement gap, P1: analytics intentionally unconfigured

**Business consequence:** there is no instrumented funnel to distinguish few visits from contact friction. Blank IDs are not themselves a security flaw or evidence of lost leads.

**Location/evidence:** local and fresh live `analytics.js:2–3`: both `GA4_ID` and `CLARITY_ID` are empty. Normalized files match. The `if (analyticsAllowed && ID)` guards skip provider loading; Lighthouse observed Google Fonts but no GA/Clarity requests. Existing hooks track CTA placement, case openings, language switches, email clicks, FAQ toggles and form status.

**Smallest fix:** choose a minimal measurement approach with the owner. The week-one email route can operate with a simple manually maintained received-inquiry/confirmed-call log; if GA4 is selected, configure only after agreeing the privacy behavior and updating actual policy wording. Clarity is optional. Do not merely fill IDs: the present loader gates only DNT/GPC, not an explicit consent choice. That is a configuration consideration, not a legal-compliance verdict.

**Acceptance:** if enabled, test separate `intro_call_email_click` events with placement/language/source and exclude internal tests. Verify DNT/GPC and any chosen consent gating before provider network requests. No names, emails, message bodies or sensitive query strings in event parameters. Received messages and confirmed calls are reconciled independently. If measurement remains manual, document that limitation and do not invent visit-to-lead rates.

### T10 — Low, P2: missing favicon and company admin URL

**Business consequence:** browser branding is incomplete and the public company link may send prospects to an admin-specific destination.

**Location/evidence:** all Lighthouse runs logged `https://www.sningenia.com/favicon.ico` **404**. EN `index.html:34,390` and SR `sr/index.html:35,217` use `linkedin.com/company/106868611/admin/dashboard/` in schema and public links. The href is confirmed; unauthenticated LinkedIn behavior was not exercised, so do not call it a proven 404.

**Smallest fix:** add a small favicon derived from the existing approved mark, explicitly referenced from all page heads. Replace the admin route with a verified public company URL, including schema `sameAs`, or omit it pending verification.

**Acceptance:** favicon loads with correct MIME type and no console 404; public company URL is usable while logged out. No need to redesign the brand.

## Conditional risks and optional improvements

These should not inflate the first-week scope or be described as observed production incidents.

| Item / severity | Evidence, consequence and smallest change | Acceptance |
| --- | --- | --- |
| Retained form robustness / medium **only if a form is later retained** | `script.js:245–255` accepts any 2xx as success, resets fields immediately, has no pending/disabled state or request timeout; repeated submits could duplicate requests. Honeypot at `:235` is client-side only. No endpoint currently exists, so backend validation, spam controls, CORS and delivery behavior cannot be assessed. Connect a trusted service with server-side validation/rate limiting, a defined success contract, pending state, bounded wait and retry messaging. Never put provider secrets in frontend code. | Controlled test matrix below; preserve content on errors; success means the provider accepted the request, not necessarily inbox receipt. No duplicate submission from repeated clicks. |
| Responsive card images / low–medium optimization | Four thumbnails are already WebP, 53,840–95,712 bytes each, lazy-loaded with reserved sizes. No `srcset`/`sizes`. EN mobile Lighthouse models 194 KiB potential savings across three loaded thumbnails; no modeled LCP saving for that opportunity. Export ~480/960px variants, keep crop and lazy loading, choose accurate sizes. `index.html:155,177,199,221` and SR `:118,129,140,151`. | Browser chooses a suitably sized source at 390px and desktop/2×; screenshots remain clear, no new CLS. Correct image mapping before generating variants. |
| Scroll geometry work / low follow-up | `script.js:75–91` reads section offsets on every scroll then toggles classes. Lighthouse attributed ~102.5ms forced reflow to this function in EN mobile. Passive listener already exists. Consider rAF batching or a small active-section observer only if trace remains significant after primary fixes. | Matched trace shows lower reflow cost with correct active links; no elaborate animation library. |
| Modal background isolation / manual verification gap | Dialog has `role=dialog`, `aria-modal`, labelled title, focus wrap and Escape/restore; source does not inert the background. Keyboard tests passed, but screen-reader virtual navigation/background exclusion was not tested. Native `<dialog>` or targeted inert management is optional if AT tests reveal leakage. | NVDA/VoiceOver cannot interact with background while open; close restores focus; no focus loss at zoom or during scrolling. |
| Privacy-page reduced-motion scope / low | `styles.css:16` gives all HTML smooth scrolling, but reduced-motion override at `:1079` targets `html.landing-page`; privacy HTML lacks that class. No material privacy-page scroll animation was reproduced. Broaden the override to `html` if changing this block. | Actual reduced-motion emulation: all pages suppress smooth scrolling and animation. Source intent alone is not a runtime pass. |
| Social preview composition / optional | Homepage metadata exists but uses a project thumbnail; privacy pages lack OG/Twitter metadata. Repair wrong-domain URLs first. A dedicated brand preview and privacy previews are optional and need Phase 3 approval of composition. | Real sharing preview shows chosen brand/image/text in EN/SR; no claim of search ranking benefit. |
| Security headers / optional hosting-dependent hardening | Sampled responses do not include CSP, HSTS, X-Content-Type-Options or Referrer-Policy. Static portfolio has no auth/payment state and no active submission endpoint. No exploitable XSS or credential leak was found in the two JS files: modal data uses `textContent`, external links use `noopener noreferrer`, no eval/HTML injection sink or secret was found in the targeted scan. This is not a penetration test. Do not migrate hosts for a checklist; consider a tested restrictive meta CSP only if needed and compatible with fonts/JSON-LD, then host-supported headers later. | Future policies tested in preview without blocking styles, fonts, analytics or chosen contact service. Confirm real host controls before planning header implementation. |

## SEO, reliability and accessibility coverage

| Check | Result / limit |
| --- | --- |
| Indexability | All four pages returned 200. No `noindex` in inspected HTML and no `X-Robots-Tag` in captured response headers. Robots says `Allow: /`. This means no observed explicit exclusion; it does not prove Google indexing. |
| URL variants | `/` and `/index.html` both return matching EN content; `/sr/` and `/sr/index.html` match normalized content. `/sr` redirects 301 to `/sr/`. Use `/` and `/sr/` consistently in metadata/internal language links. On Pages, correct canonicals are proportionate; do not introduce JS redirects or new infrastructure merely to eliminate index.html aliases. |
| Not-found behavior | One deliberately nonexistent public path returned genuine 404, not a soft 200 homepage. Custom branded 404 is optional. |
| Titles/descriptions | Present and localized for all four pages; privacy titles distinct; one homepage h1 in each language. Homepage description repeats the unverified one-hour promise—align with Phase 1. No keyword-length scoring or arbitrary title truncation refactor is required. |
| Hreflang/schema | Alternates structurally pair correct language/page types but wrong host. Homepage ProfessionalService JSON is parseable; semantic eligibility/rich results not validated. Privacy pages need no invented business schema or prices. |
| Internal links/assets | Lightweight static scan of `href`, `src`, `data-image`, local fragments and IDs across four HTML files: no missing local references or duplicate IDs. This was a regex-based focused checker, not a full HTML validator/crawler. 10 explicitly referenced image assets returned 200 live. Favicon is the known automatic browser resource failure. |
| Booking dependencies | Targeted HTML/JS URL search and fresh live link inventory found no studio scheduling URL/provider/embed. Demo “booking” descriptions do not establish a studio scheduler. Owner chose interim email arrangement, resolving the implementation dependency. Mailbox access, monitoring and delivery remain unverified. |
| Forms | Explicit labels, autocomplete, required fields, native email type, honeypot, status/alert regions and noscript email advice are present. No submission, timeout, delivery, spam rejection or successful state was executed. T1 is based on current configuration/control flow. |
| Keyboard | Tested EN desktop project open → focus on close → Tab wrap → Escape returns to trigger. EN mobile menu open, Shift+Tab wrap from Close menu to final CTA, section choice, close/focus behavior; EN Avazo dialog; SR menu Escape and Little Smiles dialog Escape/restore. SR FAQ opens with Enter and displays a pricing-by-project answer without public price figures. Full Tab traversal through every control and screen-reader certification were not performed. |
| Focus/names | Skip link, visible-focus CSS, project-dialog title/name, native details/summary, labelled form controls and hidden-menu inert handling are present. T4/T5 are confirmed exceptions. Contrast was checked only by Lighthouse; no full manual contrast/zoom audit. |
| Motion/layout | Reduced-motion stylesheet disables animations/transitions and shows reveal content on home; JS navigation reads the preference. Runtime OS preference switching was not exercised. Low measured CLS is reassuring for these load tests, not a guarantee across content, fonts and interactions. No blanket mobile-layout failure was found; Phase 3 should test 320/360px and 200% zoom. |
| JS/runtime | `node --check` passes for both source JS files. Manual browser error/warn query empty; Lighthouse console shows favicon 404. No current unhandled script exception was recorded. Graceful degradation remains T6. |
| Third parties | Active loading dependency is Google Fonts. Google/Clarity loaders exist but are disabled by empty IDs. Social destinations are outbound links, not embedded widgets. No live booking/form provider was identified. No vulnerability scanner, destructive probe, rate test or private-account audit was run. |
| Maintainability | Small shared assets and JS are proportionate. Main risk is duplicated EN/SR content drifting, plus TODO/config settings reaching production. Use a short release checklist and lightweight static checks rather than a framework migration. Avoid deploying the unrelated `.xlsx` or original image archives just because they exist in the source folder; publication allowlist is useful, but public availability/sensitivity of that workbook was not probed. |

Search retrieval returned an older page (marked crawled ten months ago). It was excluded from current-site findings; current evidence comes from browser rendering and direct HTTP retrieval. It is not proof that Google presently indexes that old version.

## One-week implementation order

Estimates are combined hands-on technical hours, excluding owner input, inbox access and Phase 1 writing/design work. These overlap Phase 1's estimates and must not simply be added to its total.

| Order | Work | Budget / dependency |
| --- | --- | --- |
| Day 1 | Record source baseline and preserve existing CSS edit. Implement T1: email-arranged 10-minute call route, EN/SR labels/instructions, visible address; remove unusable form. | 1–2h. Owner route decision received; confirm responsible inbox monitor before release. |
| Day 1 | T2 production URL sweep across four pages, sitemap, robots, schema/social. T3 verify and enable host HTTPS enforcement during separately authorized implementation. | 1–2h metadata; 0.5–1h hosting checks if admin access available. |
| Day 2 | T4 focus/fragment behavior, T5 accessible labels, T6 default-visible content and safe optional observer setup. | 2–4h including preview keyboard/no-JS checks. |
| Days 2–3 | T8 Phase 1 approved project/status/image parity and metadata copy. | 1–2h technical application after approved content; do not invent evidence. |
| Day 3 | T7 compact existing logo and font preconnect; add favicon/public social URL if verified. Responsive thumbnails only if time permits. | 1.5–3h core; +1–2h optional image variants. Avoid a new visual identity. |
| Day 4 | T9 minimal events or explicit manual log; chosen privacy behavior; controlled delivery verification. | 1–2h if analytics accounts/decisions ready; manual tracking avoids blocking the contact repair. |
| Day 5 | Matched performance runs, EN/SR desktop/mobile/keyboard QA, authorized contact delivery test, deploy verification/rollback record. | 2–3h. Deployment itself requires a later implementation request; none was performed here. |

Core technical scope: approximately **10–17 combined hours**, with optional work capped to preserve time for Phase 1 content, sales and client work. Address contact and metadata before performance polish. Do not hold these fixes for a scheduler, dashboard, redesign or perfect Lighthouse scores.

## Authorized booking/form verification design

**Nothing in this section was executed during the audit.** Obtain an explicitly authorized preview/test workflow before sending any test message or reserving a slot. Define the environment, test-only inbox/aliases, permitted recipient, test marker, data retention and who confirms receipt. Do not use a prospect's address, production availability or unrelated client calendar.

For the selected email-arranged route:

1. In a preview, test each EN/SR CTA and the sticky CTA. Inspect correct recipient and localized, URI-encoded subject. Open only an **unsent draft**; test a mail-app and a no-default-mail-app scenario, where visible address/instructions remain usable.
2. With separate permission, send one clearly marked synthetic message from a controlled sender to the designated test inbox/alias. Record message ID/time, actual receipt and spam-folder status; owner verifies the intended monitoring workflow. Draft opening or mail click is not delivery evidence.
3. Verify a test reply specifying a ten-minute time and explicit IANA timezone, including a US recipient timezone/DST example. Mark a call **confirmed** only after mutual agreement. Use a synthetic record/test calendar if authorized; no real booking is needed to validate website handoff.
4. Analytics distinguishes `intro_call_email_click` → received inquiry (manual verified record) → confirmed call → held/cancelled call. Do not trigger `booking_completed` from a click, generic thank-you display or draft creation. Manual reconciliation is adequate at this volume.

If a secondary form is later added, first use a test provider endpoint/test inbox, not the live operational recipient. Cover empty/invalid/email/whitespace/length input, Unicode Serbian text, honeypot, keyboard submission and accessible announcements. Simulate provider 4xx/429/5xx, offline/network loss, CORS rejection, slow timeout, malformed success response and double-click/retry. Verify server validation/spam controls and sender/reply-to handling; keep user content on errors, hide stale success, announce pending/error/success clearly, and always expose email fallback. Confirm one accepted request and one actual inbox message; provider 2xx alone does not establish delivery. Keep synthetic content/identifiers out of production analytics.

If a scheduler is later selected, use sandbox/test event availability, no production slots, controlled notifications, real timezone/DST and no-slots/error cases. Verify confirmation/reschedule/cancel flows and notification receipt. Only provider-confirmed records or carefully reconciled manual records establish completed bookings; event IDs deduplicate confirmations, cancellations update state, and reloading a success page must not create another booking event.

## Release criteria and verification gaps

Release gates for the focused week:

- No enabled unconnected form; all main CTAs truthfully arrange a ten-minute call by email in both languages; readable fallback and inbox ownership established. Delivery marked verified only after the separately authorized test.
- Zero placeholder production SEO URLs; valid reciprocal EN/SR home/privacy targets; robots/sitemap consistent; social image loads; no accidental noindex.
- Both HTTP hosts redirect to HTTPS www, with functioning certificate and preserved paths/queries. Unknown Pages setting/admin access is documented until checked.
- Keyboard menu/dialog/FAQ and visible focus pass on both languages; section choice moves focus appropriately; no-JS/script-blocked content/email remain usable; test 320/360/390px, desktop and 200% zoom.
- Brand/logo/corrected images and all approved Phase 1 facts agree across languages; no public prices, fictitious proof or unsupported response commitments.
- No new console/network failures; favicon fixed; core local URLs/anchors and JS syntax checks pass. Re-run three Lighthouse navigations per chosen mobile/desktop profile, report medians and variance. Aim for LCP ≤2.5s, CLS ≤0.1, TBT ≤200ms in these lab profiles. If mobile LCP remains above target, record the remaining trace cause and owner-approved follow-up; do not hide it behind the desktop score or silently imply field CWV success.
- Event names reflect clicks versus confirmed outcomes. No personal form/email content in analytics; selected privacy behavior checked. Manual measurement limitations explicit if IDs remain blank.
- Review exact diff, include the existing CSS change only intentionally, record approved commit and deployment mechanism, verify live files after cache expiry/bypass, retain prior known-good commit for rollback. Recheck content hashes/metadata live; local passing checks do not prove publication.

Remaining gaps: no authenticated host settings/deployment SHA, remote fetch freshness, Search Console indexing/CrUX/field INP, email delivery/monitoring, real scheduler, actual demo apps, screen-reader/broad browser/physical iOS or Android testing, full no-JS runtime run, manual contrast/zoom/reduced-motion emulation, inbox/provider failure tests or long-term uptime/certificate-expiry monitoring. These gaps are not asserted defects. HTTPS success today is not a future certificate/availability guarantee.

## Phase 1 dependencies and Phase 3 handoff

Phase 1 supplies final CTA/call expectations, truthful project status/scope, demo labels, corrected image identity, approved response wording and EN/SR copy. Its scheduler dependency is superseded for this release by the owner's email-arranged choice. Keep a future direct-scheduler item separate and incomplete until a provider is actually selected/tested. Technical metadata and HTTPS repairs do not depend on final portfolio prose.

Phase 3 should preserve violet/black/ivory, Inter/DM Serif, existing logo identity and broad portfolio. Work from the approved Phase 1 content and T1's email-arranged call route. Refine spacing, focus visibility, sticky CTA clearance, image crops and mobile modal information order. Respect reserved image space and the reduced-motion/default-visible strategy; do not reintroduce heavy hidden-on-load effects. Animation implementation comes last. Validate at 320/360/390px, 1440px desktop and 200% zoom, then rerun matched performance checks. Do not introduce a scheduler embed, new fonts, animation library or CMS as an assumed design requirement.

No further owner question blocks this audit. During implementation, inbox responsibility and host admin access are consequential inputs; technical choices above can proceed within the selected email-first scope once implementation is requested.
