# SNIngenia — Phase 1 client persuasion review

Reviewed 11 October 2026, Europe/Budapest. Scope: buyer clarity, content, hierarchy, portfolio proof and the route from outreach to a 10-minute introductory call. This is a review and implementation proposal. No website source was edited or deployed; no inquiry, email or calendar booking was submitted.

## Recommendation

Keep the identity and broad industry positioning. Make the offer easier to understand, make project evidence truthful and consistent in both languages, and provide a working route to a short introductory call. A visual redesign is not the first priority.

The site already communicates “web design and development,” has a recognizable violet/black/ivory visual identity, shows named team members and offers readable mobile layouts. It does not yet reliably answer “what would you do for my business?”, “which of these projects were commissioned?” or “how do I book the call mentioned in your outreach?” The strongest immediate problems are an unconnected contact form, missing studio booking path, misleading demo presentation, mismatched project images and outdated Serbian project content.

**There is no evidence that the website caused the low inquiry volume.** The owner confirmed that no measured funnel data exists yet. Fix the known defects while establishing a baseline; do not infer conversion rates, lost revenue or a need for narrower industry positioning.

## Evidence and inspection limits

Evidence labels used below:

- **Live:** fresh rendered pages, their DOM, or direct public-file responses on the review date.
- **Source:** inspected local files; not automatically assumed to match deployment.
- **Owner/brief:** facts supplied in the current conversation or business notes.
- **Hypothesis:** predicted buyer reaction or benefit; not a user-research finding.

### What was inspected

| Evidence ID | Inspection and result |
| --- | --- |
| E1 | [English homepage](https://www.sningenia.com/) and `/index.html`: desktop at 1440 × 900; mobile at 390 × 844. Inspected hero, navigation, work, about/team, FAQ, contact and footer. Viewed fresh screenshots, not search extracts. |
| E2 | English: followed header/hero/contact anchors and mobile navigation; opened all four project dialogs, read their details and inspected images; checked the mobile Avazo dialog and sticky contact CTA. Dialog close returned focus to its trigger. Expanded cost and timing FAQ answers. No submission. |
| E3 | [Serbian homepage](https://www.sningenia.com/sr/index.html): desktop at 1440 × 900 and mobile at 390 × 844. Followed language switching, project/contact anchors and mobile navigation; opened Little Smiles Dentistry and Clive Contractors dialogs; expanded cost/timing answers. |
| E4 | Live EN and SR form DOM: `action="mailto:sningenia@gmail.com"`, `data-endpoint=""`. [Deployed script](https://www.sningenia.com/script.js), retrieved directly with HTTP 200, matched the local `script.js` exactly in the read comparison. Its submit handler prevents default submission, checks the empty endpoint, displays the not-connected error and returns before any POST. This confirms a configuration/code failure, without a submitted test. |
| E5 | Live EN canonical is `https://example.com/`; SR canonical is `https://example.com/sr/`. Live EN alternate-language URLs and social URL/image metadata use `example.com`. Direct HTTP 200 responses from [robots.txt](https://www.sningenia.com/robots.txt) and [sitemap.xml](https://www.sningenia.com/sitemap.xml) also contain the placeholder domain. |
| E6 | [Deployed analytics.js](https://www.sningenia.com/analytics.js), retrieved directly with HTTP 200: GA4 and Clarity IDs are both blank. Local code includes CTA, case-study, email, FAQ and form event hooks, but empty IDs do not provide a measured funnel. The whole analytics file was not byte-identical to local source; the blank live IDs were checked directly. |
| E7 | Both [English privacy](https://www.sningenia.com/privacy.html) and [Serbian privacy](https://www.sningenia.com/sr/privacy.html) destinations loaded through site links. Public email href is `mailto:sningenia@gmail.com`; delivery and inbox monitoring were not tested. Company LinkedIn href ends in `/admin/dashboard/`; its destination was inspected, not tested as an unauthenticated visitor. |
| E8 | Local source at `E:\Sync\SN Ingenia\sningenia-main`, HEAD `963c29a9077bbcf02f6d410aaa384c2c86261362`. `styles.css` already had an uncommitted modification before the review. The working tree is not assumed identical to production. No source changes were made in this review. |
| E9 | Read the review brief and relevant SN Ingenia, Email Personalization and Lead-Finder business instructions; inspected lead-research log evidence for outreach measurement. Lead-research files describe prospect research, not measured campaign delivery, visits or sales. Owner confirmed outreach has started and no measured funnel data is available. |

Mobile findings are browser viewport observations, not physical-device or cross-browser certification. No performance benchmark, complete accessibility audit, inbox delivery test or booking completion test was performed. Actual demo applications were not linked from the inspected portfolio or provided as URLs, so their accounts, ordering, booking, persistence and real-time behavior could not be independently exercised. Their status as working demos is owner-confirmed; their individual feature claims remain unverified.

The owner's clarification about booking described a “demo version mockup for future clients.” This does not establish SNIngenia's own appointment scheduler. The studio's real scheduling URL, provider and staffed hours remain missing inputs. Nothing in this report assumes an existing scheduler.

Initial restricted HTTP requests failed in the review environment; subsequent authorized read-only public-file requests succeeded. Those initial tool failures are not evidence of a website outage. No stale search-engine extracts were used. Excluded folders were not used as business context. No previous Phase 2 or Phase 3 report was available in the reports inventory.

## Immediate technical handoff

1. **Contact form — urgent, confirmed configuration failure.** On both languages the visible “Send message” form is unconnected. With the deployed handler active, a valid submission is stopped and produces the not-connected message. Do not present this as a tested email-delivery failure: nothing was submitted. In Phase 2, replace the form with the real booking route and explicit email fallback, or connect and verify a form if it is retained. Until then, show the email route clearly instead of inviting people to complete an unusable form.
2. **Production SEO — urgent, confirmed misconfiguration.** Canonical, language and sharing metadata reference `example.com`; robots and sitemap also identify the wrong domain. Correct these early in the technical phase. This is not proof of current indexing loss or the cause of weak outbound results. Check all EN/SR home/privacy pages, schema and social image URLs, preferred host and slash conventions together.
3. **Booking — urgent missing journey, not a broken known scheduler.** Current primary buttons lead to `#contact`, not appointment availability. There is no studio booking URL in the inspected live links or targeted local source search. Do not relabel that form “Book” and consider the task done.

## Prioritized findings

Effort is an estimate of combined hands-on implementation time, excluding missing inputs and external account setup. Confidence distinguishes observed evidence from predicted impact. Priorities are P0: address first; P1: this week; P2: later.

| ID / priority | Evidence and finding | Buyer impact / confidence | Concrete change / effort |
| --- | --- | --- | --- |
| F1 / P0 | E4: visible EN/SR forms have no endpoint; deployed code stops submission. | Confirmed functional obstacle. A visitor who completes the form must switch channels; abandonment is a hypothesis. Evidence high; commercial impact unmeasured. | Remove the unusable form from the primary journey; implement booking plus email, or a verified secondary form. 2–4h for the booking route; retained form delivery work extra. |
| F2 / P0 | E1–E3: all primary CTAs say “Start a project” / “Započnimo projekat” and lead to a project brief. No duration, agenda, slots or booking confirmation path. | Hypothesis: outreach recipients expecting a short call face a larger, less defined commitment. Evidence high; buyer-effect confidence medium. | Consistent 10-minute call CTA, short expectations and actual scheduler. Included in F1 implementation estimate. |
| F3 / P0 technical | E5: live production canonical/hreflang/social and discovery files use `example.com`. | Incorrect machine-readable identity is confirmed; discoverability/share-preview damage is possible, not measured. Evidence high. | Replace placeholder URLs throughout deployment, verify preferred production URLs and reciprocal language mapping. 1–2h plus deployment checks. |
| F4 / P1 | E2 + brief: Avazo, PickUp Fresh and ArchiNova have generic “Project case study” labels, client narratives and “The Result” sections despite being demos. PickUp says “The client needed”; ArchiNova does too. | Hypothesis: visitors infer commissioned work and proven operational outcomes, then lose trust if the distinction emerges later. Evidence high; reaction medium. | Visible demo label on card and dialog; replace client/result language with purpose, demonstrated design and limitations. 1–2h with F5/F6 content work. |
| F5 / P1 | E1–E3: Avazo's card and modal show meal UI; PickUp's modal shows stylist selection. Source maps Avazo to thumbnail/case2 and PickUp to thumbnail/case3; local thumbnail3 is the stylist UI. | A concrete inconsistency makes the proof difficult to interpret. Perceived carelessness is a hypothesis. Evidence high; reaction medium. | Correct card/detail image mapping and alt text. Check image branding as well: the stylist screenshot says “Invoko Cuts,” not Avazo Style. Confirm naming, then use a consistent demo identity. 0.5–1h. |
| F6 / P1 | E3: SR still lists Little Smiles Dentistry and Clive Contractors with different scopes/timelines, versus Avazo and PickUp on EN. Their client status is not established by the brief. | Switching languages changes the apparent portfolio, undermining factual consistency. Evidence high; trust effect medium. | Translate the same approved project inventory and proof labels. Do not describe the older SR entries as real clients without evidence. 1–2h. |
| F7 / P1 | E1: hero clearly names web design/development, but adds growth, platform names, AI and “small businesses and large companies alike.” Services appear later as skills/tools. | Hypothesis: category is clear, but practical fit and the deliverable are harder to identify quickly. High evidence; medium buyer-effect confidence. | Lead with a new website/redesign that explains the business, shows work and makes contact straightforward. Keep industry breadth; move platform/AI specifics out of the hero. 1–2h including localized copy. |
| F8 / P1 | E1–E3: “4+ years,” “4 industries,” one-hour replies, 2–4 / 6–10-week delivery and multiple project timelines are displayed. Business notes do not substantiate these commitments; local FAQ has a timeline-confirmation TODO. | Hypothesis: unsupported precision creates expectations the two-person team may not consistently meet. Missing substantiation is confirmed, not proof the claims are false. | Remove pending evidence or define and verify each claim. Replace stats with “Two-person studio · Design and development together · English and Serbian websites.” 0.5–1h. |
| F9 / P1 | E1/E2: no explicit project process; FAQ covers cost, timing, client inputs and editing but not scope boundaries, revisions, responsibilities or ongoing costs. | Hypothesis: a buyer cannot judge the effort and risk of engaging the studio. Evidence high; effect medium. | Add a concise four-step process and focused answers; commit terms in the proposal, not unconfirmed website promises. 2–3h for process/FAQ and EN/SR alignment. |
| F10 / P1 | E2: dialogs contain text and an image, no live-site/demo link or next-step link. On mobile, metadata and long prose precede the demonstration. Smart Residences claims it “drives direct buyer inquiries,” without supplied measurement. | Hypothesis: proof is harder to verify and the interested visitor reaches a dead end inside the modal. Evidence high; effect medium. | Show project type, concise contribution and relevant screen early; add only verified demo/client links. Add a call CTA that closes the dialog and goes to booking. Remove unsupported outcome statements. 1–2h once URLs/evidence exist. |
| F11 / P1 | E6/E9: blank live analytics IDs; no campaign/funnel data supplied. Outreach instructions specify no links in email bodies and an automated signature, but actual sent messages/signatures were not inspected. | It is unknown how many prospects reached the site or through which link. It is not possible to isolate the site as the bottleneck. Evidence high. | Instrument a small funnel and inspect the actual signature/source-link setup in later work. Do not assume the documented drafting policy matches all sent emails. 2–3h. |
| F12 / P2, quick correction if convenient | E7: company social href is an admin route. E1: Nikola has an initials portrait placeholder while Sebastian has a photo. | Hypothesis: social verification may be awkward; visual asymmetry can suggest unfinished presentation. Link destination/placeholder high confidence; visitor outcome not tested. | Verify a public company URL or remove that link; use a real supplied portrait or deliberately consistent initials treatment. No generated likeness. 0.5–1h. |

### Answers to the five buyer questions

**What do you offer, is it for me, why trust you, what next?** The first answer is partly successful: web design/development is explicit. Improve fit by naming situations (first business site or existing-site redesign), not by restricting industries. Trust is weakened by portfolio ambiguity and unverified statements. “Start a project” is visible but mismatched to a brief introductory call, and its destination has a confirmed contact defect.

**Does the order work?** Current EN order is hero → numeric claims → four pain points → work → about/skills → team → FAQ → contact. Proof arrives after multiple promises; services and delivery expectations are not stated together. Keep work early and replace redundant promises with a compact offer and tangible proof. Mobile inspection supports readability, but the long sequence and modal prose are opportunities to shorten the decision path, not measured evidence of abandonment.

**Does the portfolio demonstrate ability honestly?** The visual examples show useful directions for presenting properties, architecture, food and appointments. They do not prove paid app delivery, adoption, reduced waiting, real-time reliability or increased inquiries. Separate commissioned work from demonstrations and verify the named client/project relationship before publishing a client label. Keep demos: transparent demo work can explain thinking and interface ability without implying a track record that has not been established.

**Are services, process and objections explained?** Some FAQ foundations are useful. Replace the skill-chip list as the main service explanation with business deliverables. Add an approval sequence and what the client supplies. Explain that editing, support, hosting, revisions and integrations depend on the agreed scope. Do not publish a maintenance service commitment until its limits are defined.

**Where does outreach-to-call become difficult?** A prospect must connect a generic growth promise to the issue raised in outreach, infer whether the projects are relevant, close a case-study modal, select “Start a project,” and write a brief into an unconnected form. No calendar choice follows. Source-link arrival itself remains unmeasured. The proposed path is outreach/signature link → clear offer and relevant proof → 10-minute-call CTA → available slot → verified confirmation; email remains a separate fallback.

## Proposed homepage order

Use the existing typography, violet accents, light background, project cards and dark contact band. This is primarily content replacement and regrouping, not a new design system.

| Order | Section | Buyer question and role |
| --- | --- | --- |
| Navigation | Services · Work · How we work · About · FAQ · EN/SR · call CTA | Give direct access to the questions a buyer is likely to check. Merge About/Team rather than preserving two competing destinations. Mobile menu keeps language selection and the same CTA. |
| 1 | Hero + compact factual trust line | “What do you do, and what can I do next?” State new websites/redesigns and a 10-minute call. Keep a secondary “View our work” link. Use team/language facts, not unsupported numbers. |
| 2 | Short service/fit summary | “Is this useful for my situation?” Three concise items covering a new site, redesign and working with the same design/development team. This replaces the long pain-point block; do not add another long preamble. |
| 3 | Selected work: client evidence first, clearly labeled demos after | “Can I see relevant ability?” Lead with the verified building-development project once identity/contribution are confirmed. Preserve cross-industry demos. Show purpose, contribution and representative screens, not claimed business results. Repeat the call CTA after work. |
| 4 | How we work | “What happens if I engage you?” Four steps: introductory call, agreed scope, design/build review, launch/handover. State client inputs and decision points without invented durations. |
| 5 | About + team | “Who is accountable?” Keep the two people, roles and direct communication. Shorten the general handoff argument and hobbies paragraph. Names and responsibilities matter more than extra skill badges. |
| 6 | Focused FAQ | “What could make this unsuitable?” Scope and quote, timing, content inputs, editing/ownership, hosting/support, languages. Keep brief and specific. Remove the generic AI FAQ until a verified capability merits it. |
| 7 | Booking/contact band | “What will the call involve, and when can we talk?” Agenda, ten minutes, real available slots, visible timezone and email fallback. Availability must be real. |
| Footer | Identity, email, public social links, language links, privacy | Provide reassurance and recovery paths. No new sales argument or inflated claim needed. |

An outreach recipient who is ready to talk can use the header/hero CTA immediately. Someone checking credibility can inspect work first. Neither path should require reading the entire homepage.

## Concrete replacement copy

The text below is proposed public copy, not evidence that an operational process already exists. Adopt the process before publishing its commitments. Bracketed operational inputs are editorial placeholders and must never appear on the live site. No public prices are proposed.

### Hero and CTA — English

**Eyebrow:** Web design & development · Two-person studio

**Headline:** A clear website. A stronger introduction to your business.

**Body:** We design and build websites that explain what you do, show your work and make it easy to get in touch. Whether you need your first website or a redesign, you work directly with the people designing and building it.

**Primary CTA:** Book a 10-minute intro call

**Supporting line:** Tell us what you need from your website. We'll discuss whether we're a fit and the next step.

**Secondary CTA:** View our work

**Trust line:** Design and development together · Based in Serbia · Websites in English and Serbian

Use the same primary action in the header, after projects and in the mobile sticky bar. Allow wrapping where needed rather than clipping the label. A short header label “Book a call” is acceptable only with “10-minute introduction” immediately associated with it; avoid mixing in “Start a project” or “Get a quote.”

### Hero and CTA — Serbian

**Uvodna oznaka:** Veb dizajn i izrada sajtova · Tim od dvoje ljudi

**Naslov:** Jasan sajt. Bolje predstavljanje vašeg poslovanja.

**Tekst:** Dizajniramo i izrađujemo sajtove koji jasno predstavljaju čime se bavite, prikazuju vaš rad i olakšavaju kontakt. Bilo da vam je potreban prvi sajt ili redizajn postojećeg, sarađujete direktno sa ljudima koji ga dizajniraju i izrađuju.

**Glavno dugme:** Zakažite uvodni razgovor od 10 minuta

**Prateći tekst:** Recite nam šta vam je potrebno od sajta. Razgovaraćemo o tome da li možemo da pomognemo i koji je sledeći korak.

**Sporedno dugme:** Pogledajte naše radove

**Kratka poruka:** Dizajn i izrada u jednom timu · U Srbiji · Sajtovi na srpskom i engleskom

If a shorter mobile/header label is necessary: “Zakažite razgovor” with visible accompanying “10 minuta.” Preserve the duration and action in the accessible name.

### Service summary — English

**Heading:** A website built around what your business needs

**New websites.** Present your services, work and business information in one clear place, with a straightforward way for visitors to contact you.

**Website redesigns.** Rework an existing site's structure, content and mobile layout so visitors can find the information they need.

**Design and development together.** Work with one small team from the page plan and visual design through the build. We agree the pages, features and handover with you before work begins.

**Scope note:** The right platform and any additional features depend on your project and how you want to manage the site.

Do not add apps, automation, chatbots, care plans or custom integrations as standard deliverables without confirming production delivery/support capability and scope. Platform names may remain in a secondary answer, but the homepage does not need to force a stack decision.

### Service summary — Serbian

**Naslov:** Sajt prilagođen potrebama vašeg poslovanja

**Novi sajtovi.** Predstavite usluge, radove i informacije o poslovanju na jednom preglednom mestu, uz jednostavan način da vas posetioci kontaktiraju.

**Redizajn postojećeg sajta.** Unapređujemo strukturu, sadržaj i prikaz na telefonu kako bi posetioci lakše pronašli potrebne informacije.

**Dizajn i izrada u jednom timu.** Sarađujete sa istim malim timom od plana stranica i vizuelnog dizajna do izrade sajta. Pre početka rada dogovaramo stranice, funkcije i primopredaju.

**Napomena:** Platformu i dodatne funkcije biramo prema projektu i načinu na koji želite da održavate sajt.

### Project labels and proof copy

Section title: **Selected websites and working demos** / **Izabrani sajtovi i funkcionalni demo projekti**.

| Project | English card copy | Serbian card copy |
| --- | --- | --- |
| Smart Residences | **Website project · Residential development.** A website presentation for residential buildings, with visual emphasis on the properties and their details. **View project details.** | **Veb projekat · Stambena izgradnja.** Sajt za predstavljanje stambenih objekata, sa naglaskom na fotografije i detalje nekretnina. **Pogledajte detalje projekta.** |
| Avazo Style | **Working demo · Hair appointment experience.** A demonstration of a hair-stylist booking concept, created to show a possible experience for future clients. Not commissioned client work. **Explore the demo project.** | **Funkcionalni demo · Zakazivanje kod frizera.** Demonstracija koncepta za zakazivanje kod frizera, napravljena kao primer mogućeg rešenja za buduće klijente. Nije rađena po narudžbini klijenta. **Pogledajte demo projekat.** |
| PickUp Fresh | **Working demo · Meal pickup experience.** A demonstration of a meal-ordering and pickup concept, created to explore a possible experience for future clients. Not commissioned client work. **Explore the demo project.** | **Funkcionalni demo · Poručivanje hrane za preuzimanje.** Demonstracija koncepta za poručivanje i preuzimanje hrane, napravljena kao primer mogućeg rešenja za buduće klijente. Nije rađena po narudžbini klijenta. **Pogledajte demo projekat.** |
| ArchiNova | **Working demo · Architecture website.** An architecture portfolio concept exploring how to present projects and a studio's approach. Not commissioned client work. **Explore the demo project.** | **Funkcionalni demo · Arhitektonski sajt.** Koncept arhitektonskog portfolija koji istražuje način predstavljanja projekata i pristupa studija. Nije rađen po narudžbini klijenta. **Pogledajte demo projekat.** |

**Smart Residences verification gate:** the brief confirms one real building-development client, but does not explicitly establish the public project name, actual contribution or permission to publish details. Once that mapping is confirmed, replace its label with **Client website · Residential development** / **Sajt za klijenta · Stambena izgradnja**. Do not claim an additional client or a measured result. The neutral interim label above deliberately avoids guessing that relationship.

For demos, replace “Project case study” with **Working demo — not commissioned client work** / **Funkcionalni demo — nije projekat po narudžbini klijenta**. Replace “The Challenge / The Solution / The Result” with **Demo purpose / Design decisions / What you can explore**. Use a final note: **This example demonstrates a possible experience; it does not report customer adoption or business results.** Serbian: **Ovaj primer prikazuje moguće rešenje; ne predstavlja dokaz o broju korisnika niti o poslovnim rezultatima.**

The public card descriptions intentionally stop short of claiming verified real-time tracking, persistent accounts, live availability or successful transactions. Once safe demo URLs are available, test each feature without real bookings/orders and describe only what is actually demonstrated. Until then, use “View demo details,” not a button that promises to launch an unavailable app.

For the actual client project, prefer **Brief / Our contribution / Delivered website** with a verified live link, representative screen and one concrete design decision. Replace “drives direct buyer inquiries” with a factual description of an implemented contact route only after checking it. Omit 4/6-week timelines unless supported. Do not add the photographer site until its name, current status, contribution and publication permission are confirmed.

### Proposed process copy

| Step | English | Serbian |
| --- | --- | --- |
| 1 | **Start with 10 minutes.** Tell us about your business, website and priorities. We discuss whether the project is a fit. | **Počinjemo razgovorom od 10 minuta.** Recite nam nešto o poslovanju, sajtu i prioritetima. Razgovaramo o tome da li projekat odgovara našim mogućnostima. |
| 2 | **Agree the scope.** Before work starts, agree the pages, features, content responsibilities, revisions and milestones in a written proposal. | **Dogovaramo obim posla.** Pre početka rada, u pisanoj ponudi dogovaramo stranice, funkcije, odgovornosti za sadržaj, izmene i faze rada. |
| 3 | **Review the design and build.** Review the direction before development, then check the site together against the agreed scope. | **Pregledate dizajn i izrađeni sajt.** Prvo usaglašavamo dizajn, a zatim zajedno proveravamo izrađeni sajt prema dogovorenom obimu posla. |
| 4 | **Launch and hand over.** Agree what needs to be checked before launch, who manages the site and what support is included. | **Objava i primopredaja.** Dogovaramo provere pre objave, ko upravlja sajtom i koja podrška je uključena. |

These are proposed working practices, not assertions of an established delivery record. Do not promise unlimited revisions, fixed completion dates or ongoing care by implication.

### FAQ replacements and missing objections

| Question | Proposed English answer | Proposed Serbian answer |
| --- | --- | --- |
| How is a project quoted? / Kako određujete cenu projekta? | The quote depends on the pages, features and content work involved. We agree the scope and provide a written proposal before work begins. | Cena zavisi od broja stranica, funkcija i rada na sadržaju. Pre početka rada dogovaramo obim posla i dostavljamo pisanu ponudu. |
| How long will it take? / Koliko traje izrada? | Timing depends on the scope, content readiness and review schedule. We agree milestones after discussing your project. | Rok zavisi od obima posla, spremnosti sadržaja i termina za povratne informacije. Faze i rokove dogovaramo nakon razgovora o projektu. |
| What should I prepare? / Šta treba da pripremim? | For the introductory call, your current website, if you have one, and a short description of what you want to improve are enough. We discuss content and other materials before agreeing the project. | Za uvodni razgovor dovoljni su adresa postojećeg sajta, ako ga imate, i kratak opis onoga što želite da unapredite. O sadržaju i drugim materijalima razgovaramo pre dogovora o projektu. |
| Can I update it, and what happens after launch? / Mogu li samostalno da ažuriram sajt i šta se dešava nakon objave? | Tell us what you want to update yourself. The proposal will explain editing access, handover, hosting and third-party costs, and any agreed support. | Recite nam šta želite sami da ažurirate. U ponudi ćemo navesti pristup za uređivanje, primopredaju, troškove hostinga i drugih servisa, kao i dogovorenu podršku. |
| Can the website be in both languages? / Može li sajt biti na oba jezika? | Yes. We can discuss a website in English, Serbian or both, including who supplies and approves each language's content. | Da. Možemo da dogovorimo sajt na srpskom, engleskom ili oba jezika, uključujući to ko priprema i odobrava sadržaj na svakom jeziku. |

Also make ownership, third-party licenses, revisions and exclusions explicit in the proposal. No public prices, price bands or “from” amounts should be introduced. Remove the older Serbian source TODO suggesting a starting price so it cannot be revived accidentally.

### Booking section — English

**Heading:** Let's talk about your website

**Body:** Book a 10-minute introductory call to tell us about your business and what you want your website to do. We'll discuss whether we can help and the next step. You don't need a finished brief.

**Call expectations:** 10 minutes · A conversation with a co-founder · Your priorities, project fit and next steps

**CTA:** Book a 10-minute intro call

**Timezone helper, only after implementation:** Times are shown in your selected timezone. Check or change it before confirming.

**Fallback:** Can't find a suitable time, or prefer email? Write to **sningenia@gmail.com** with your website address, a short note and your timezone.

Do not display a one-hour response promise unless the team explicitly confirms and can staff it. Do not substitute an invented 24/48-hour promise.

### Booking section — Serbian

**Naslov:** Razgovarajmo o vašem sajtu

**Tekst:** Zakažite uvodni razgovor od 10 minuta da nam kažete nešto o svom poslovanju i tome šta očekujete od sajta. Razgovaraćemo o tome da li možemo da pomognemo i koji je sledeći korak. Nije vam potreban detaljan opis projekta unapred.

**Šta možete da očekujete:** 10 minuta · Razgovor sa jednim od suosnivača · Vaši prioriteti, mogućnosti saradnje i sledeći koraci

**Dugme:** Zakažite uvodni razgovor od 10 minuta

**Vremenska zona, nakon implementacije:** Termini su prikazani u izabranoj vremenskoj zoni. Proverite je ili promenite pre potvrde.

**Alternativa:** Ne odgovara vam nijedan termin ili više volite e-poštu? Pišite na **sningenia@gmail.com** i pošaljite adresu sajta, kratak opis i svoju vremensku zonu.

## Booking-flow specification

**Missing production inputs:** real scheduler/provider and URL; host/co-founder; connected calendar; staffed availability; call medium; language handling; notice/buffer/capacity rules; monitored fallback inbox. None can be inferred from the demo booking app. Do not publish a placeholder calendar or fabricate slots.

1. **Entry:** all primary CTAs lead to the same localized booking section. Keep the existing `#contact` anchor as an alias if existing links use it. Place the call summary above a “Choose a time” action to the actual scheduler. A direct hosted scheduler is sufficient for week one; an embed is optional. Keep a normal link usable if an embed fails.
2. **Expectations before leaving the site:** show duration, purpose, who attends and the call medium once selected. The call is an introduction and fit check, not an implied free audit, finished proposal or project commitment. No account or project brief should be required to view available times.
3. **Availability:** display real future slots from the host's connected calendar, excluding busy periods. Owner must choose actual hours; the existing “09:00–18:00 CET” reply text is not evidence of bookable hours. Configure minimum notice, buffers, booking horizon and daily capacity to fit the team's workload. Do not state a next available date unless the scheduler supplies it. Make “no suitable times” a supported state with email visible.
4. **Timezone:** default to the visitor's detected timezone, visibly name it, and let the visitor change it before choosing a slot. Use IANA zones for calculations (for example, `Europe/Belgrade` for the studio and the visitor's actual US zone), not a hardcoded year-round “CET.” Show a full date, time, named zone and date-specific UTC offset in confirmation. Check daylight-saving transitions, including weeks when Europe and the US change on different dates. Offer a clearly labeled 12/24-hour display or an unambiguous time format.
5. **Fields:** required name and email; business/site URL and a one-sentence goal optional for the introduction. Do not demand phone, a budget or a detailed project brief to view slots. Make call-language selection available if both languages can actually be staffed; preserve EN/SR website instructions regardless. Any scheduler localization limitation must be explained before handoff.
6. **Confirmation:** only show “Booked” after the scheduling service accepts the reservation and provides an event/booking ID. Show the exact time/zone, duration, host, meeting link or connection instructions, and cancel/reschedule controls. A scheduler page view or CTA click is never a booking. Confirmation email/calendar invitation delivery requires a separate controlled acceptance test in implementation.
7. **Recovery:** if a slot becomes unavailable, retain entered details where the provider safely supports it and offer another slot. If loading or confirmation fails, say the call has not been confirmed, offer retry and show the email address. Returning to the site must not create another booking or count a duplicate conversion.
8. **Email fallback:** visible plain address plus `mailto:sningenia@gmail.com` and an optional copy-address control. Suggested subject: “10-minute introduction” / “Uvodni razgovor od 10 minuta.” Invite the visitor to include a timezone and preferred times. Opening mail does not prove an email was sent; requesting a time does not prove a booking. The inbox owner and response commitment need confirmation.
9. **Current-form treatment:** remove the broken form from the primary path. A retained secondary form needs a real endpoint, delivery/error handling and a verified destination before release. A success HTTP response alone is not proof that a human received the email.
10. **Acceptance later:** check EN/SR, desktop/mobile, keyboard operation, selected timezone, empty calendars, occupied-slot races, unavailable provider and rescheduling. Use a controlled provider test environment or explicitly authorized test appointments in the implementation phase. This review authorizes none of those submissions.

If no scheduler can be configured immediately, show the honest interim action **Email us to arrange a 10-minute call** / **Pišite nam da dogovorimo razgovor od 10 minuta**. This provides a working route but does not satisfy direct booking; retain the real booking integration as an open urgent item.

## Measurement plan

Start with one analytics system and a simple pipeline ledger; a second analytics tool or session recording is unnecessary for week one. Configure collection and the privacy notice to match the chosen implementation; do not merely paste IDs into an unfinished setup. Keep contact details and project-brief text out of analytics.

| Stage | Definition and source of truth | Recording rule |
| --- | --- | --- |
| Source visits | Eligible website sessions grouped by source/medium/campaign, landing page, language and device category. | Use tagged portfolio/signature links where appropriate, for example `utm_source=outreach&utm_medium=email&utm_campaign=2026_10&utm_content=partner_a`. Use partner/campaign categories, not prospect names or emails. Retain direct/unknown as unknown. Filter staff/test traffic and known bot traffic. |
| Booking clicks | A click on the real scheduler link; store page language and placement such as hero, header, work or contact. | Event `booking_click`. Deduplicate to unique clicking sessions for visit-to-click reporting, while retaining raw event counts separately. Do not mark this as a completed lead or booking. An anchor scroll to the booking section is a separate `booking_section_click`. |
| Verified bookings | Scheduler confirmation/webhook/export with a unique booking ID, or a manually verified mutually agreed appointment for email bookings. | Event/ledger state `booking_confirmed` only from verified evidence. Prefer provider data; if integration is unavailable, reconcile the export manually. Deduplicate booking IDs; reschedules retain the original relationship and cancellations have their own status. A generic thank-you URL alone is not evidence. |
| Qualified calls | A call actually held where a relevant website need, responsible decision maker and feasible scope/timing are confirmed. | Record held/no-show/cancelled separately. Partner records qualification and a short reason in the private pipeline. A scheduled appointment is not a qualified call. Budget fit can be discussed privately without publishing prices. |
| Client wins | A project with an accepted written agreement and any required initial payment received. | Record project ID, win date and agreed value privately; do not count a verbal expression of interest or an unpaid proposal as a win. Count businesses/projects consistently, not every follow-up meeting. |

Minimum ledger columns: internal lead ID, partner, source/campaign, first contact date, website/source attribution if known, booking ID/date/status, call held date, qualified yes/no/reason, proposal status, won/lost/pending, win date and next action. Keep personal information in the private operational record, not public URLs or analytics events.

**Weekly review:** compare absolute counts and stage transitions by partner/source; use dates and cohorts, not just this week's unrelated totals. Report unique booking-click sessions / measured source sessions. Report verified bookings / unique clicking sessions only for bookings attributable to that click cohort; keep unmatched and email-arranged bookings separate. Report qualified calls / held calls and wins / qualified opportunities after enough time has elapsed. Show denominators with every rate. Do not invent benchmark targets.

For context, also retain actual outreach sent/delivered/bounce/reply counts if available. Lead lists are not sends; sent emails are not website visits. Email-open counts can be distorted, so do not use them as proof that a person read the pitch. Analytics blocking and consent choices may undercount visits, and security scanners may inflate email-link activity; keep those limitations visible.

Interpretation rules:

- Few measured visits: investigate delivered outreach, targeting, actual link placement and relevant traffic before attributing results to page copy.
- Visits but few booking clicks: fit, proof or CTA clarity are hypotheses to explore; ask prospects about the specific uncertainty when possible.
- Clicks but no verified bookings: inspect slot availability, timezone, scheduler fields and errors, plus natural indecision. Do not report those clicks as leads.
- Bookings but few held/qualified calls: inspect attendance, message-to-offer fit and qualification.
- Qualified calls but few wins: inspect the proposal, scope, trust, timing and sales discussion; the homepage may not be the limiting factor.

Because the sample is currently unmeasured and likely small, use a before/after log of release dates and qualitative feedback. Do not launch a multivariate experiment or claim statistical uplift after one week. Week-one success means reliable paths and usable measurement, not a guaranteed number of clients.

## Focused implementation backlog and acceptance checks

Estimates below group overlapping findings. Aim for roughly **14–23 combined hours** of core work, with additional time only if a secondary contact form or complicated scheduler integration is retained. This leaves room within the team's stated weekly capacity for outreach and client work. These are planning estimates, not promised delivery dates.

| Order / owner role | Work and budget | Acceptance checks |
| --- | --- | --- |
| Day 1 / developer + partner | **P0: booking/contact route** (F1/F2), 2–4h once inputs exist. | No enabled unconnected form in either language. Real scheduler URL reaches a 10-minute event with genuine availability. Email visible before and after handoff. If only interim email scheduling is ready, label it honestly and leave direct booking incomplete. |
| Day 1 / developer | **P0: production URL configuration** (F3), 1–2h. | No `example.com` in deployed canonical/hreflang/social/schema/robots/sitemap. Canonicals use the chosen production host and actual paths; reciprocal EN/SR alternates are valid; social images load. Check home and privacy variants. Inspect live output after any separately authorized deployment. No indexing/ranking guarantee. |
| Days 1–2 / both | **P1: truth and portfolio consistency** (F4/F5/F6/F8/F10), 3–5h. | Same approved projects and statuses in EN/SR. Demo labels visible without opening details. No fictitious clients/results or unsupported durations. Avazo uses the stylist screen; PickUp uses food screen; image name, alt text and visible brand agree. Actual client identity/contribution is confirmed before “client” labeling. Missing live URLs are omitted, not faked. |
| Days 2–3 / design/content + developer | **P1: homepage clarity and hierarchy** (F7/F9), 4–6h. | Offer, primary CTA and ten-minute expectation readable in the initial desktop/mobile view. Short service summary, early proof, process and FAQ follow the proposed order. Public prices absent. No unconfirmed one-hour response promise. About/team merged; visual identity preserved. All new copy available in EN/SR. |
| Day 4 / developer + sales owner | **P1: basic measurement** (F11), 2–3h. | Test navigation logs source visits and distinct CTA placements. Booking-link click increments only a click event. Reloading a thank-you page cannot fabricate a booking. Verified provider/test evidence or manual reconciliation produces one booking record; cancelled/rescheduled states handled. Internal tests excluded from reporting. No personal form data sent to analytics. |
| Day 5 / both | **P1: end-to-end review**, 2–3h. | At 1440 × 900, 390 × 844 and a narrower 320–360px width: navigation, language switch, project dialogs, booking link and fallback remain readable and operable. Check keyboard focus/close behavior, sticky CTA overlap and actual phone behavior. Repeat the exact outreach-to-call path with a controlled, authorized test workflow; verify receipt and confirmation before calling it complete. |

**Release dependencies:** the studio scheduling URL/hours/host, verified project names and permissions, safe demo URLs, and agreed delivery/support terms. Missing details do not prevent removing unsupported claims or repairing metadata, but they prevent describing booking or proof as complete.

Later improvements, only after the core path works:

- Public company social link and consistent portrait treatment (F12); verify the destination unauthenticated. A new portrait is not a blocker for booking or honest proof.
- One concise, evidence-backed case study for the real client, with permission, exact contribution and selected screens. Add outcomes or a testimonial only if supplied and substantiated.
- Direct project URLs or shareable case-study pages if outreach repeatedly needs a relevant example. This is optional, not an assumed niche landing page.
- Consider the photographer project when its status is confirmed. Do not fill the portfolio with invented completion dates or results.
- Define an optional support offering with limits, ownership and recurring costs before promoting it. No automatic app/AI service expansion.
- Phase 2 performance, broader accessibility and technical audits; Phase 3 spacing, image treatment and subtle visual refinement. Animation implementation comes last.

Do not spend the first week on a rebrand, a remodeling-only homepage, a framework migration, more demo apps, elaborate animation or a large analytics dashboard.

## Source handoff references

- [Confirmed review brief](C:/Users/Cebo/Documents/ChatGPT/Ingenia-site/PORTFOLIO-REVIEW-BRIEF.md)
- [Studio business context](<C:/Users/Cebo/Documents/ChatGPT/SN Ingenia/AGENTS.md>)
- [Outreach context](<C:/Users/Cebo/Documents/ChatGPT/Email Personalization/AGENTS.md>)
- [Lead research brief](C:/Users/Cebo/Documents/ChatGPT/Lead-Finder/LEAD_RESEARCH_INSTRUCTIONS.md)
- [English metadata and hero](<E:/Sync/SN Ingenia/sningenia-main/index.html:8>), [English portfolio](<E:/Sync/SN Ingenia/sningenia-main/index.html:143>), [FAQ](<E:/Sync/SN Ingenia/sningenia-main/index.html:329>), [contact form](<E:/Sync/SN Ingenia/sningenia-main/index.html:395>)
- [Serbian metadata](<E:/Sync/SN Ingenia/sningenia-main/sr/index.html:10>), [portfolio data](<E:/Sync/SN Ingenia/sningenia-main/sr/index.html:110>), [form](<E:/Sync/SN Ingenia/sningenia-main/sr/index.html:220>)
- [Submit-handler endpoint check](<E:/Sync/SN Ingenia/sningenia-main/script.js:232>), [analytics configuration](<E:/Sync/SN Ingenia/sningenia-main/analytics.js:1>), [robots](<E:/Sync/SN Ingenia/sningenia-main/robots.txt>), [sitemap](<E:/Sync/SN Ingenia/sningenia-main/sitemap.xml>)

The final technical review should recheck deployment rather than assuming any recommendation here has already been implemented.
