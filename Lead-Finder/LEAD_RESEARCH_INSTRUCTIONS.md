# Lead research brief

Status: FINALIZED — targeting choices settled on October 10, 2026. This document defines future lead research; finalizing it does not mean a lead batch has been researched.

## Confirmed business context

- The seller is a two-person team offering websites, website redesigns, and apps.
- Initial offer: lead with website creation or redesign focused on showcasing completed remodeling projects, presenting credible business information, and making estimate requests easy. For this research workflow, prospects must already have a live website, so redesign is the primary entry offer.
- Apps remain an optional follow-on service when a specific business need emerges. Do not automatically bundle a custom app into the initial website offer or promise increased leads or conversion rates without evidence.
- Initial project price target: USD 1,500–4,000. This is the seller's target price, not a verified prospect budget.
- Portfolio context: one website is live and another is expected soon. Do not claim remodeling-industry experience, results, or capabilities that the user has not supplied.
- Initial outreach channel: personalized email. Phone calls may be added later.

## Confirmed ideal customer profile

- United States companies specializing in kitchen remodeling, bathroom remodeling, or both; either specialty qualifies. Prioritize fit across the country.
- Independently operated regional or local businesses with approximately 5–50 employees.
- No minimum branch count. The original 2–5-location requirement has been removed.
- Exclude solo operators, national chains, franchises, aggregators, directories, lead brokers, suppliers without remodeling services, and unrelated contractors.
- A qualifying prospect must have BOTH a verifiable website problem and a documented business change within the preceding 12 months that creates a relevant opportunity.

## Settled targeting choices

1. Kitchen specialists, bathroom specialists, and companies offering both qualify (8A).
2. Lead with website redesigns; offer apps when relevant (9A, selected under the user's instruction to choose the best starting offer). This choice reflects the current portfolio and project price target, not a claim of proven market performance.
3. Recent means within a rolling 12-month window measured from each research run (10A).

## Research and qualification protocol

1. Perform live web searches and open the business's official pages during each research run. Search snippets alone do not verify a lead.
2. Verify the canonical HTTPS root homepage. Follow legitimate redirects and record the final HTTPS root. Exclude HTTP-only, parked, expired, unrelated, or persistently unavailable root homepages. A live homepage may still have a verifiable internal navigation or mobile issue that qualifies as an opportunity. Do not use directory, social-profile, service-page, or job-board URLs as the Website field.
3. Confirm that official services and project pages establish kitchen remodeling, bathroom remodeling, or both as a core service and support the US service area. An incidental mention on an otherwise unrelated contractor's website is insufficient.
4. Look for credible evidence that the company is operating, including current official contact information and dated business activity. A loading homepage or copyright year alone is insufficient. Do not describe public-web checks as a guarantee of current operating status.
5. Support the 5–50 employee range with a public company profile or sufficiently complete official staff information. Record whether the evidence is an explicit range, an exact count, or an estimate. A partial team page establishes only a lower bound; do not treat it as the total workforce. Do not confuse subcontractors with employees. Exclude leads when size cannot reasonably be supported within the target range.
6. Require BOTH a publicly listed business email address AND a public business phone number. Prefer an official contact, team, footer, or legal page. Generic official addresses such as info@ or contact@ are acceptable. A contact form alone is insufficient. Never invent, infer, or generate an email from a naming pattern. Public listing does not establish deliverability.
7. Identify a publicly named owner, founder, president, managing partner, or relevant leader. If unavailable, use an actually listed primary contact or department, as permitted by the original brief. Never invent a name or role, and do not imply a generic email belongs personally to a named owner.
8. Verify one concrete website problem relevant to the seller's offer, such as a reproducible mobile layout failure, broken quote-request link, or broken navigation to a key service. Describe the observation precisely. Subjective claims such as 'old-fashioned design' are insufficient by themselves. Do not claim a form fails without adequate evidence; do not submit test inquiries or contact businesses during research.
9. Verify a dated business change relevant to the website opportunity, such as a new service area, new showroom, expanded remodeling service, rebrand, or ownership transition. The change must have occurred or been newly announced within the 12 months preceding the research run. Record the event date separately from publication or page-update dates when available; a recently refreshed article about an older change does not qualify. Routine blog posts, undated testimonials, and ordinary project completions do not automatically establish expansion or a buying trigger.
10. Treat a website problem plus a business change as evidence of fit and timing, not proof of purchase intent. Label actual buying intent internally only when supported by an explicit public request or announcement of planned website/app work. Do not invent budgets, urgency, lost revenue, or willingness to buy.
11. Deduplicate by company ownership, operating brand, and canonical domain. Multiple locations or brands under the same prospect organization must not inflate the batch.

## Evidence record

Keep a separate local research log for every accepted lead, including verification date, official source URLs, service-area evidence, employee-size evidence and confidence, phone/email sources, decision-maker source, website issue and reproduction details, and the dated business-change source. Also record the reason for excluding uncertain candidates. Keep the evidence log separate from the six-column deliverable.

## Lead batch output

Target exactly 10 fully qualified, nonduplicative leads per run. Search beyond the first 10 candidates when necessary. Never fabricate or relax hard filters to fill a batch. If fewer than 10 can be verified, return only qualified rows and record the shortfall in the separate research log.

## Google Sheets delivery

- Configured destination spreadsheet: `https://docs.google.com/spreadsheets/d/1V9OchAp0IFLfK7jXnDUHrvikdV2GWgi_FIfoBzFhv8Y/edit?gid=0#gid=0`.
- Configured destination worksheet ID: `gid=0`. Resolve and record its visible tab name through the connected Google Drive/Sheets integration before the first import. Continue using this worksheet ID even if the visible tab name changes.
- Treat the connected Google Sheet table as the primary destination for completed lead batches. As soon as a batch has passed the qualification and deduplication checks, import its qualified rows into the table during the same run without asking for a separate confirmation.
- Use the Google Sheet, worksheet/tab, and table identified by the user for this project. If the destination has not yet been identified, ask one A/B/C clarification question before the first import; never guess between multiple plausible sheets, tabs, or tables.
- Preserve this exact six-column order and spelling: `Company Name`, `Website`, `Number`, `Name`, `E-mail`, `Personalized Hook`. Do not add, remove, rename, or reorder destination columns unless the user explicitly changes the schema.
- Before writing, confirm that the destination headers match the required schema. Append new rows to the existing table; do not overwrite headers, formulas, formatting, filters, existing rows, or unrelated cells.
- Deduplicate the incoming batch against the destination using company ownership, operating brand, and canonical domain. Skip rows already represented in the table rather than creating duplicates.
- Write only fully qualified rows. Import a verified short batch as-is when fewer than 10 leads qualify; do not add weaker rows to reach the target.
- After writing, read back or otherwise verify the appended range and confirm that the number and values of imported rows match the qualified batch. Do not claim that an import succeeded without this verification.
- If the connection, permission, destination, schema, or write fails, preserve the completed CSV and research log locally, do not claim completion, and report the precise blocker. Never create a replacement spreadsheet or modify a different table without the user's instruction.

For the completed lead deliverable, return one CSV code block with no introduction, outro, or extra columns:

```csv
Company Name,Website,Number,Name,E-mail,Personalized Hook
```

- Company Name: exact verified operating or legal business name; do not add an unverified legal suffix.
- Website: verified live canonical HTTPS root homepage, with a trailing slash where appropriate.
- Number: verified public main office or direct business phone number.
- Name: verified decision maker, primary contact, or actually listed department.
- E-mail: publicly listed business or decision-maker email address.
- Personalized Hook: one specific, natural sentence grounded in an official service, project, value proposition, or verified business change. Prefer a relevant business change when available. Do not invent praise, results, or claims about the prospect's needs.

Use valid CSV escaping: quote fields containing commas, quotation marks, or line breaks and double embedded quotation marks. Keep each lead on one physical line. Do not include Markdown links or source citations inside fields; store supporting links in the evidence log.

Research authorization does not authorize outreach. Do not send emails, submit forms, or make calls without a separate user instruction.
