# Phase 3 — visual refinement and restrained feedback

Implemented on 11 October 2026 in `E:\Sync\SN Ingenia\sningenia-main`. The final phase 1/2 working tree was copied and inspected before this pass. Only `styles.css` and `script.js` changed for phase 3. The prior text, project inventory, images, SEO, contact/privacy work and hamburger styling are preserved. No commit, push, deployment, mail launch, inquiry or booking was performed.

## Recheck and scope

A fresh browser visit to `https://www.sningenia.com/` still showed the older “Start a project” content and form. The updated page was verified from the local phase 1/2 source, rather than treating earlier live screenshots as its current state. Phase 3 is applied to that local source; production needs its normal release process.

The local source already fixes the call wording, project image mapping, status parity, early dialog images, compact contact hierarchy and section focus. Those changes were retained. The remaining implemented changes are:

- Sticky call action hides while the hero/contact, menu or project dialog is visible. Its actual height, including safe-area padding, determines bottom scroll clearance. It also works without IntersectionObserver and hides completely when JavaScript is blocked.
- Dialog images keep their natural aspect ratio without the previous minimum-height crop. A neutral image area replaces stale project imagery until the newly selected image loads; cached reopen and deliberately delayed image responses are checked. Dialogs reset their scroll position on opening, contain internal scrolling, reserve room for the close control and disable hidden controls immediately. Existing focus trap/restore and dialog-to-contact routing remain intact.
- Mobile sections use a consistent 64px vertical rhythm and at least 20px side clearance. Hero copy has a shorter line-height and the actions stack consistently on narrow screens. Supporting labels and card descriptions are larger. Card bottoms remain aligned.
- Menu, language, social, footer and FAQ controls have 44px minimum targets. Dark sections use a lighter focus outline. Tablet desktop navigation has room between the logo and links; a 1024px Serbian screenshot exposed the previous crowding.
- A1: essential feedback uses 160ms color/border changes and an optional 1px button lift only on a fine pointer. A2: explicit dialog state transitions use 180ms opacity/8px movement, with immediately available controls. Reduced motion makes states instant and disables transforms. Automatic hero fading and continuous decorative shimmer are removed. Card lifts and section entrances (A3/A4) remain deferred due the existing mobile LCP concern.
- Removed verified-unused styles for the old contact form, modal metadata/placeholder layout, experience list and obsolete keyframes. The final stylesheet is 31,068 bytes, slightly below the 31,208-byte phase 2 baseline despite the visual refinements. An initial CSS transfer regression prompted this cleanup; the first measurement set is preserved in `initial-performance/`.

## Verification

- `node --check` and source `git diff --check` passed.
- EN/SR at 320, 390, 768, 1024 and 1440 CSS px: no horizontal page overflow; 40 card/dialog journeys checked; project identity and image mapping; early uncropped image; focus trap/restore; reopen at top; menu section focus, fragment and Escape; dialog-to-contact; sticky visibility/height; email recipient/subject; native FAQ and 44px target checks. See `checks.json` and the paired screenshots.
- EN/SR no-JavaScript, blocked-script, missing IntersectionObserver/ResizeObserver, default-motion and simulated 200% CSS zoom checks passed. CSS zoom is a reflow check, not a real browser-zoom or physical-device certification.
- Fresh browser visual checks of mobile hero/cards/dialogs and desktop hero/cards supplemented the scripted checks. A physical phone, Safari/Firefox and screen-reader pass remain unperformed.
- Local before/after Lighthouse measurements are recorded below. No real messages were sent and the email route was inspected without opening a mail application.

## Review and recovery

`phase3-only.patch` isolates this task from the preceding working-tree changes. `baseline/styles.css` and `baseline/script.js` preserve the exact final phase 2 versions. `source-manifest.json` records the applied source path and before/after SHA-256 hashes. Source hashes were checked against the baseline before applying either file, preventing overwrite of unrelated intervening work.

Review the normal complete release diff in the existing repository before releasing; it still includes the preceding phase changes and the compact logo asset. To undo only phase 3 before other edits, restore the two baseline files or reverse `phase3-only.patch` after checking it applies. Do not reset the entire working tree.

## Matched local performance measurements

Three sequential Lighthouse runs for each profile before and after Phase 3. Both previews use the same final Phase 2 HTML/assets, differing only in the two changed files. External Google Fonts remain a source of run-to-run variance. These are local lab results, not field measurements.

| Profile | Phase | Performance median | LCP median (range) | TBT median | CLS median | Accessibility / SEO |
| --- | --- | --- | --- | --- | --- | --- |
| en-mobile | before | 84 | 3.33s (3.01–3.53s) | 0ms | 0.000 | 100 / 100 |
| sr-mobile | before | 81 | 3.79s (3.73–3.87s) | 0ms | 0.000 | 100 / 100 |
| en-desktop | before | 98 | 0.94s (0.94–1.01s) | 0ms | 0.007 | 100 / 100 |
| en-mobile | after | 87 | 3.29s (3.28–3.30s) | 0ms | 0.000 | 100 / 100 |
| sr-mobile | after | 78 | 4.16s (3.46–4.23s) | 0ms | 0.007 | 100 / 100 |
| en-desktop | after | 98 | 0.93s (0.57–1.71s) | 0ms | 0.008 | 100 / 100 |

Raw runs and ranges are in `performance-summary.json` and the adjacent Lighthouse JSON files. The existing favicon 404 remains and accounts for the best-practices console diagnostic. Optional A3/A4 motion remains deferred.

A follow-up Serbian series alternated before/after runs to check ordering effects.

| Phase | Performance median | LCP median (range) | TBT median | CLS median |
| --- | --- | --- | --- | --- |
| before | 81 | 3.84s (3.79–4.15s) | 0ms | 0.000 |
| after | 78 | 4.11s (4.03–4.61s) | 0ms | 0.000 |

The paired Serbian median remains slower, so this pass does not establish a speed improvement or a resolved mobile LCP issue. Ranges overlap and remote-font timing varies, but that does not prove the entire difference is noise. Further font/loading work remains separate. The main table predates the final dialog image-readiness guard; that guard leaves the hero layout unchanged and was present in the last paired after run. Raw paired runs are retained in `sr-paired-performance.json`.
