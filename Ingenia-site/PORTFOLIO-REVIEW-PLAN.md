# SNIngenia portfolio review plan

Confirmed 11 October 2026. See PORTFOLIO-REVIEW-BRIEF.md for the current business decisions.

## Sequence and model recommendations

| Phase | Suggested timing | Model | Effort |
| --- | --- | --- | --- |
| 1. Client persuasion and hierarchy | Days 1-2 | GPT-6 Astra | High |
| 2. Code, SEO, performance and reliability | Days 3-4 | GPT-6.1 Sol | Medium |
| 3. Visual refinement, followed by animation work | Days 5-7 | GPT-6.1 Sol | High for review; Medium for bounded implementation |

These are task-specific starting recommendations, informed by [official model selection guidance](https://developers.openai.com/api/docs/guides/model-selection). Escalate difficult cross-file technical diagnosis to High. Use GPT-6 Luna at Medium for narrow, explicitly specified edits; keep whole-site review and final integration checks on Sol or Astra. Max/Ultra is unnecessary as a default here.

The schedule reserves time for implementation after each review; it is not a promise to complete every possible improvement. Run chats sequentially and pass findings forward. The prompts below request audits and proposed changes, not automatic source edits or publication.

Pull contact/booking failures and incorrect production SEO configuration into Day 1 even though they are technical issues. Finish essential client and technical fixes before visual polish. Use Day 7 for final regression checks and a small amount of motion only if the core site is ready; defer optional effects when necessary.

Measure visits from outreach, booking clicks, verified bookings, qualified calls and clients won. Record uncertainty when attribution or booking completion is unavailable. Website changes support the sales process; low inquiry volume alone does not identify the cause.

## Copyable prompts

### Phase 1

```text
Review SNIngenia from the perspective of a prospective paying client. This is Phase 1: client persuasion, content and hierarchy. Produce a review and proposed changes; do not edit website source or deploy.

Website: https://www.sningenia.com/
Source: E:\Sync\SN Ingenia\sningenia-main
Reports: C:\Users\Cebo\Documents\ChatGPT\Ingenia-site
Read PORTFOLIO-REVIEW-BRIEF.md there and relevant business notes under C:\Users\Cebo\Documents\ChatGPT. Exclude ME and Scheduled-Lead-Generations completely.

Confirmed requirements:
- Broad portfolio serving multiple industries; do not specialize it around remodeling.
- No public prices.
- Primary action: book a 10-minute introductory call.
- Outreach is active, with few or no inquiries; prioritize useful improvements within one week.
- Preserve the current identity and general visual style.
- Avazo Style, PickUp Fresh and ArchiNova are demos, not commissioned client projects.
- Review English and Serbian experiences; do not invent proof, results or capabilities.

Inspect the current rendered site on desktop and mobile, including navigation, project details and the contact journey. Use the source to clarify behavior. Do not rely on stale search extracts.

Assess:
1. Can a busy owner quickly understand what we do, why it matters, whether we fit, and what to do next?
2. Does the order of sections answer buyer questions at the right time?
3. Do projects demonstrate relevant ability with honest descriptions of client work versus demos?
4. Are services, process, scope, credibility and common objections explained clearly?
5. Does the journey from an outreach link to a booked call contain avoidable friction?

Use available traffic/outreach evidence; do not assume low inquiries prove a website problem. Label buyer reactions as hypotheses unless supported by actual research.

Deliver:
- The highest-impact findings, with evidence, buyer impact, confidence, effort and priority.
- A proposed section order with a reason for each section.
- Concrete replacement copy for the hero, primary CTA, service summary, proof labels and booking section.
- A booking-flow specification covering expectations, timezone clarity and an email fallback. Flag the real scheduling URL/availability as missing inputs if unavailable.
- A small measurement plan: source visits, booking clicks, confirmed bookings where verifiable, qualified calls and client wins. Do not equate clicks with bookings.
- A short implementation backlog with acceptance checks, separating urgent fixes from later improvements.

Immediately flag booking/contact failures or invalid production SEO configuration for early technical work. Do not submit inquiries or create bookings.

Save the report as 01-client-review.md in the Reports folder. Ask only consequential unanswered questions using A/B/C options.
```

### Phase 2

```text
Review SNIngenia's code, technical SEO, performance and reliability. This is Phase 2. Produce an evidence-backed audit and concrete fix plan; do not edit website source or deploy.

Website: https://www.sningenia.com/
Source: E:\Sync\SN Ingenia\sningenia-main
Reports: C:\Users\Cebo\Documents\ChatGPT\Ingenia-site
Read PORTFOLIO-REVIEW-BRIEF.md and 01-client-review.md in Reports if available. Business notes are under C:\Users\Cebo\Documents\ChatGPT; exclude ME and Scheduled-Lead-Generations completely.

Requirements: broad multi-industry portfolio, no public prices, primary action to book a 10-minute call, current visual identity preserved, focused one-week improvements. Keep English and Serbian support. Earlier report recommendations may not yet be implemented.

First identify the actual stack, applicable repository instructions, current source version, hosting evidence and differences from the live deployment. Keep recommendations proportionate to this small site; justify any proposed dependency or architecture change.

Review:
1. Booking/contact paths, validation, error/success states, email fallback and integration dependencies.
2. Canonicals, indexability, robots.txt, sitemap, redirects, page titles/descriptions, hreflang, structured data, social previews and internal links.
3. Mobile and desktop performance: images, fonts, CSS/JS, loading behavior and layout stability. Run suitable measurements where tools allow; report conditions and distinguish lab results from field Core Web Vitals.
4. Keyboard navigation, focus, menus, dialogs, forms, accessible names and reduced-motion behavior.
5. Runtime errors, broken resources, security-relevant frontend issues, third-party integrations, analytics and maintainability.

Recheck preliminary findings: example.com production URLs, empty contact endpoint, blank local analytics IDs and missing studio scheduling link. Do not treat old findings as automatically current.

For each actionable finding provide severity, affected file/line or URL, reproduction/evidence, business consequence, smallest appropriate fix and a meaningful acceptance check. Separate confirmed defects from suggestions.

Return a prioritized implementation order, measured baselines, checks performed, unverified areas and release criteria. Include verification of booking/form delivery in an authorized test environment; never create real bookings or send inquiries during this audit. Track booking clicks separately from verified completed bookings.

Do not invent benchmark scores, recommend a framework rewrite without evidence, or present cosmetic refactoring as urgent.

Save the report as 02-code-review.md in Reports, including dependencies on Phase 1 and a concise handoff for the visual review. Use A/B/C options only for consequential missing information.
```

### Phase 3

```text
Review SNIngenia's visual design and prepare a restrained animation plan. This is Phase 3, after the client and technical reviews. Produce visual evidence and implementation specifications; do not edit website source, add animations or deploy yet.

Website: https://www.sningenia.com/
Source: E:\Sync\SN Ingenia\sningenia-main
Reports: C:\Users\Cebo\Documents\ChatGPT\Ingenia-site
Read PORTFOLIO-REVIEW-BRIEF.md, 01-client-review.md and 02-code-review.md if available. Business notes are under C:\Users\Cebo\Documents\ChatGPT; exclude ME and Scheduled-Lead-Generations completely.

Requirements:
- Preserve the existing identity, palette and overall visual character.
- Keep a broad multi-industry portfolio, no public prices, and a primary 10-minute call-booking action.
- Improve client confidence and usability before decoration.
- Preserve honest demo/client labels, English/Serbian support and Phase 2 technical gains.
- Work within a focused one-week improvement effort.

Inspect fresh rendered pages at representative desktop, tablet and mobile widths. Capture screenshots of actual problems and interaction states. If visual inspection is unavailable, state that limitation; do not infer visual defects from HTML alone.

Review typography, line lengths, spacing, alignment, contrast, section rhythm, CTA prominence, project imagery/cropping, cards, dialogs, navigation, forms/booking and hover/focus states. Check both languages for wrapping and overflow. Tie recommendations to readability, credibility or task completion.

Deliver:
1. A screenshot-backed list of specific visual issues with location, viewport, impact and priority.
2. Concrete adjustments, such as spacing/type values or annotated before/after proposals, that preserve the brand.
3. A small consistency specification for type, spacing, buttons, cards and focus states.
4. An ordered implementation checklist with visual and functional acceptance checks.

Only after specifying static improvements, provide a separate animation backlog. For every proposed effect state its purpose, trigger, affected element, duration/easing, mobile behavior, reduced-motion fallback and performance risk. Prefer lightweight CSS and existing capabilities. Avoid scroll hijacking, content hidden until animation runs, or effects that delay booking.

Animation implementation comes last, after core journeys work and performance/accessibility checks pass. Specify which measurements and interactions must be rechecked afterward.

Save the report as 03-design-review.md in Reports, clearly separating essential visual fixes from optional motion. Ask only consequential unanswered questions using A/B/C options.
```

