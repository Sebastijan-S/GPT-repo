const fs = require('fs');
const path = require('path');
const root = 'E:/Sync/SN Ingenia/sningenia-main';
const out = __dirname + '/03-implementation';
fs.mkdirSync(out + '/baseline', {recursive:true});
const files = ['index.html','sr/index.html','privacy.html','sr/privacy.html','script.js','styles.css','analytics.js','robots.txt','sitemap.xml'];
for (const file of files) {
  const dest = path.join(out,'baseline',file);
  if (fs.existsSync(dest)) throw new Error('Baseline exists: refusing to overwrite');
  fs.mkdirSync(path.dirname(dest), {recursive:true});
  fs.copyFileSync(path.join(root,file),dest);
}
const read = file => fs.readFileSync(path.join(root,file),'utf8');
const write = (file,content) => fs.writeFileSync(path.join(root,file),content);
const esc = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const call = ['Arrange a 10-minute introductory call','Dogovorite uvodni poziv od 10 minuta'];
const mail = i => 'mailto:sningenia@gmail.com?subject=' + encodeURIComponent(i ? 'Uvodni poziv od 10 minuta' : '10-minute introductory call');
const projects = [
  {name:'Smart Residences',image:1,demo:false,tag:['Website project · Residential development','Veb projekat · Stambena izgradnja'],desc:['A website presentation for residential buildings, with visual emphasis on the properties and their details.','Sajt za predstavljanje stambenih objekata, sa naglaskom na fotografije i detalje nekretnina.'],purpose:['Present residential buildings and property information in a clear visual layout.','Predstaviti stambene objekte i informacije o nekretninama u preglednom vizuelnom rasporedu.'],design:['Property imagery and building details lead the page, with a restrained visual hierarchy.','Fotografije objekata i detalji nekretnina su u prvom planu, uz svedenu vizuelnu hijerarhiju.']},
  {name:'Invoko Cuts',image:3,demo:true,tag:['Working demo · Hair appointment experience','Funkcionalni demo · Zakazivanje kod frizera'],desc:['A demonstration of a hair-stylist appointment concept. Not commissioned client work.','Demonstracija koncepta za zakazivanje kod frizera. Nije rađena po narudžbini klijenta.'],purpose:['Explore a possible hair-stylist selection and appointment experience.','Istražiti moguće iskustvo izbora frizera i zakazivanja termina.'],design:['The screen puts stylist selection and a clear next action at the centre of the experience.','Prikaz stavlja izbor frizera i jasan sledeći korak u središte iskustva.']},
  {name:'PickUp Fresh',image:2,demo:true,tag:['Working demo · Meal pickup experience','Funkcionalni demo · Poručivanje hrane za preuzimanje'],desc:['A demonstration of a meal-ordering and pickup concept. Not commissioned client work.','Demonstracija koncepta za poručivanje i preuzimanje hrane. Nije rađena po narudžbini klijenta.'],purpose:['Explore a possible meal-selection and pickup experience.','Istražiti moguće iskustvo izbora obroka i preuzimanja hrane.'],design:['Food photography and a clear menu layout help explain the ordering concept.','Fotografije hrane i pregledan meni objašnjavaju koncept poručivanja.']},
  {name:'ArchiNova',image:4,demo:true,tag:['Working demo · Architecture website','Funkcionalni demo · Arhitektonski sajt'],desc:['An architecture portfolio concept exploring how to present projects and a studio’s approach. Not commissioned client work.','Koncept arhitektonskog portfolija koji istražuje predstavljanje projekata i pristupa studija. Nije rađen po narudžbini klijenta.'],purpose:['Explore how an architecture studio could introduce its work and approach.','Istražiti kako arhitektonski studio može predstaviti radove i svoj pristup.'],design:['An architectural illustration, bold typography and spacious layout frame the portfolio concept.','Arhitektonska ilustracija, upečatljiva tipografija i prozračan raspored oblikuju koncept portfolija.']}
];
for (const file of files.filter(f=>f.endsWith('.html'))) {
  const i = file.startsWith('sr/') ? 1 : 0;
  const prefix = i ? '../' : '';
  let html = read(file).replace(/\s*<!-- TODO: Replace https:\/\/example\.com[^>]*-->/g,'').replaceAll('https://example.com','https://www.sningenia.com');
  html = html.replaceAll('width="1536" height="1024"','width="1536" height="326"');
  html = html.replaceAll('images/logo-header.svg','images/logo-header.webp');
  html = html.replace('<link rel="preconnect" href="https://fonts.googleapis.com">','<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>');
  if (file.includes('privacy')) {
    html = html.replace(/<p>(?:If you use our contact form|Ako koristite kontakt formu)[\s\S]*?<\/p>/,`<p>${i ? 'Kada nam pošaljete e-poruku, primamo vašu adresu e-pošte i podatke koje odlučite da podelite radi odgovora na upit i dogovora za uvodni poziv. Sajt nema kontakt formu niti sistem za direktno zakazivanje.' : 'When you email us, we receive your email address and the information you choose to share so we can reply to your enquiry and arrange an introductory call. This website has no contact form or direct booking system.'}</p>`);
    html = html.replace(/<p>(?:Your enquiry is handled only|Vaš upit obrađuju samo)[\s\S]*?<\/p>/,`<p>${i ? 'Poruke poslate na sningenia@gmail.com primamo putem usluge Gmail koju pruža Google. Ne prodajemo niti delimo podatke iz upita radi oglašavanja.' : 'Messages sent to sningenia@gmail.com are received through Gmail, provided by Google. We do not sell or share enquiry information for advertising.'}</p>`).replace(/\s*<!-- TODO: name the form provider once connected -->/,'');
    html = html.replace(/(<h2>(?:Analytics|Analitika)<\/h2>)[\s\S]*?(?=<\/section>)/,`$1\n<p>${i ? 'Ovaj sajt trenutno ne učitava Google Analytics ili Microsoft Clarity i ne postavlja analitičke kolačiće. Ručno pratimo primljene upite i uzajamno dogovorene pozive. Klik na adresu e-pošte ne predstavlja primljen upit niti potvrđen poziv.' : 'This site currently loads no Google Analytics or Microsoft Clarity and sets no analytics cookies. We manually track received enquiries and mutually agreed calls. An email-link click is not a received enquiry or a confirmed call.'}</p>\n`);
    html = html.replace(/\s*<script src="(?:\.\.\/)?analytics.js" defer><\/script>/,'');
  } else {
    html = html.replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${i ? 'SNIngenia — dizajn i izrada novih sajtova i redizajn postojećih, na srpskom i engleskom. Dogovorite uvodni poziv od 10 minuta e-poštom.' : 'SNIngenia designs and builds new websites and redesigns existing ones, in English and Serbian. Arrange a 10-minute introductory call by email.'}">`);
    html = html.replaceAll('Start a project',call[i]).replaceAll('Započnimo projekat',call[i]);
    html = html.replace(/<p class="hero-eyebrow">[\s\S]*?<\/p>/,`<p class="hero-eyebrow">${i ? 'Studio sa dva člana · Dizajn i izrada sajtova' : 'Two-person studio · Website design and development'}</p>`);
    html = html.replace(/<h1>[\s\S]*?<\/h1>/,`<h1>${i ? '<em>Sajt</em> koji jasno predstavlja vaše <em>poslovanje</em>' : 'A <em>website</em> that makes your <em>business clear</em>'}</h1>`);
    html = html.replace(/<p class="hero-bio">[\s\S]*?<\/p>/,`<p class="hero-bio">${i ? 'Dizajniramo i izrađujemo nove sajtove i redizajniramo postojeće — da jasno predstavite usluge, pokažete radove i olakšate kontakt. Radimo sa firmama iz različitih oblasti, na srpskom i engleskom.' : 'We design and build new websites and redesign existing ones — so you can explain your services, show your work and make contact straightforward. For businesses across industries, in English and Serbian.'}</p>`);
    html = html.replace(/(<div class="hero-actions">[\s\S]*?<\/div>)/,`$1\n<p class="call-note">${i ? 'Razgovaramo o vašem poslu i potrebama za sajt. Termin dogovaramo e-poštom.' : 'Discuss your business and website needs. We agree a time by email.'}</p>`);
    html = html.replace(/<div class="stats-strip">[\s\S]*?(?=\s*(?:<!-- WHO WE HELP -->|<section id="who-we-help"))/,`<div class="stats-strip"><div class="stats-inner">${(i ? ['Studio sa dva člana','Dizajn i izrada u jednom timu','Sajtovi na srpskom i engleskom'] : ['Two-person studio','Design and development together','English and Serbian websites']).map(s=>`<div class="stat"><p class="stat-label">${s}</p></div>`).join('')}</div></div>\n`);
    html = html.replace(/<section id="who-we-help"[\s\S]*?<\/section>/,`<section id="who-we-help" class="help-section"><div class="section-header"><p class="section-label">${i ? 'USLUGE' : 'WHAT WE DO'}</p><div class="section-rule"></div></div><h2>${i ? 'Sajt prilagođen potrebama vašeg <em>poslovanja</em>' : 'A website built around your <em>business</em>'}</h2><div class="help-grid">${(i ? [['Novi sajtovi','Predstavite usluge, radove i informacije o poslovanju na jednom preglednom mestu, uz jednostavan način da vas posetioci kontaktiraju.'],['Redizajn postojećeg sajta','Unapređujemo strukturu, sadržaj i prikaz na telefonu kako bi posetioci lakše pronašli potrebne informacije.'],['Dizajn i izrada u jednom timu','Sarađujete sa istim malim timom od plana stranica i dizajna do izrade sajta. Pre početka rada dogovaramo stranice, funkcije i primopredaju.']] : [['New websites','Present your services, work and business information in one clear place, with a straightforward way for visitors to contact you.'],['Website redesigns','Improve structure, content and the mobile experience so visitors can find what they need.'],['Design and development together','Work with the same small team from page planning and design to the build. We agree pages, features and handover before work starts.']]).map(([h,p])=>`<article class="help-card"><h3>${h}</h3><p>${p}</p></article>`).join('')}</div><p class="help-audience">${i ? 'Platformu i dodatne funkcije biramo prema projektu i načinu održavanja sajta.' : 'We choose the platform and additional features around the project and how you want to maintain the website.'}</p></section>`);
    const cards = projects.map(p=>{
      const label = i ? 'Pogledajte detalje projekta' : 'View project details';
      const note = p.demo ? (i ? 'Ovaj primer prikazuje moguće rešenje; ne predstavlja dokaz o broju korisnika niti o poslovnim rezultatima.' : 'This example demonstrates a possible experience; it does not report customer adoption or business results.') : (i ? 'Prikaz vizuelnog rešenja; ovde nisu navedeni izmereni poslovni rezultati.' : 'A presentation of the visual approach; no measured business results are reported here.');
      return `<article class="work-card project-card" data-demo="${p.demo}" data-status="${esc(p.tag[i])}" data-role="${i ? 'Dizajn i prikaz interfejsa' : 'Interface design and presentation'}" data-deliverables="${i ? 'Prikaz veb iskustva' : 'Website experience preview'}" data-challenge="${esc(p.purpose[i])}" data-solution="${esc(p.design[i])}" data-result="${esc(note)}" data-image="${prefix}images/case${p.image}.webp"><div class="card-thumb"><div class="card-thumb-inner"><img src="${prefix}images/thumbnail${p.image}.webp" alt="${esc(p.name)} — ${i ? 'prikaz interfejsa' : 'interface preview'}" width="640" height="400" loading="lazy"></div></div><div class="card-body"><span class="card-tag">${p.tag[i]}</span><h3 class="card-title">${p.name}</h3><p class="card-desc">${p.desc[i]}</p><button type="button" class="card-open" aria-haspopup="dialog" aria-controls="projectModal" aria-label="${label}: ${p.name}"><span>${label}</span><span class="card-open-arrow" aria-hidden="true">→</span></button></div></article>`;
    }).join('\n');
    html = html.replace(/<section id="work">[\s\S]*?<\/section>/,`<section id="work"><div class="section-header"><p class="section-label">${i ? 'IZABRANI RADOVI' : 'SELECTED WORK'}</p><div class="section-rule"></div></div><h2>${i ? 'Izabrani sajtovi i <em>funkcionalni demo projekti</em>' : 'Selected websites and <em>working demos</em>'}</h2><div class="work-grid">${cards}</div><div class="project-cta"><a class="btn-primary" href="#contact" data-cta="work">${call[i]}</a></div></section>`);
    // Keep the existing people and brand presentation; bring their cards into About.
    const team = html.match(/<section id="team"[\s\S]*?<\/section>/)?.[0];
    if (team) {
      html = html.replace(team,'');
      html = html.replace(/(<section id="about"[\s\S]*?)(<\/section>)/,`$1${team.replace('<section id="team" class="creators-section">','<div id="team" class="creators-section">').replace(/<\/section>$/,'</div>')}$2`);
      html = html.replace(/<li><a href="#team">[^<]*<\/a><\/li>/g,'');
    }
    const steps = i ? [['Uvodni razgovor','Za 10 minuta razgovaramo o vašem poslovanju, postojećem sajtu i potrebama. Termin dogovaramo e-poštom.'],['Dogovor o obimu','U ponudi definišemo stranice, funkcije, sadržaj, revizije, odgovornosti i troškove.'],['Dizajn i izrada','Pripremamo dizajn, prikupljamo povratne informacije i izrađujemo dogovorene stranice.'],['Provera i primopredaja','Proveravamo prikaz i ključne funkcije, a objavu, pristupe i održavanje dogovaramo pre lansiranja.']] : [['Introduction','In 10 minutes, discuss your business, current website and needs. We agree a time by email.'],['Agree the scope','The proposal defines pages, features, content, revisions, responsibilities and costs.'],['Design and build','We prepare the design, collect feedback and build the agreed pages.'],['Review and handover','We check the layout and key functions, and agree launch, access and maintenance before release.']];
    html = html.replace(/<section id="faq"/,`<section id="process"><div class="section-header"><p class="section-label">${i ? 'KAKO RADIMO' : 'HOW WE WORK'}</p><div class="section-rule"></div></div><h2>${i ? 'Od razgovora do <em>primopredaje</em>' : 'From conversation to <em>handover</em>'}</h2><div class="help-grid">${steps.map(([h,p],n)=>`<article class="help-card"><h3>${n+1}. ${h}</h3><p>${p}</p></article>`).join('')}</div></section>\n<section id="faq"`);
    const faqs = i ? [['Kako dogovaramo uvodni poziv?','Pošaljite e-poruku sa kratkim opisom posla, potrebom za sajt i nekoliko termina uz vašu vremensku zonu. Odgovorom dogovaramo poziv od 10 minuta. Poziv je potvrđen tek kada se obe strane slože oko termina.'],['Kako određujete cenu i rok?','Ponudu i rok pripremamo nakon dogovora o obimu, sadržaju i funkcijama. Cenu razmatramo privatno; na sajtu nema javnog cenovnika.'],['Šta je potrebno od nas?','Osnovne informacije o poslu, cilj sajta, logo i raspoloživi tekstovi i fotografije. Dogovaramo ko priprema sadržaj i ko odobrava svaku fazu.'],['Šta je sa revizijama i dodatnim funkcijama?','Broj revizija, uključene stranice i funkcije i način obračuna dodatnog rada definišemo u ponudi pre početka.'],['Ko plaća domen, hosting i održavanje?','Domen, hosting, pretplate i održavanje navodimo odvojeno u ponudi, sa jasnim odgovornostima i troškovima.'],['Mogu li samostalno da menjam sajt?','Platformu biramo prema potrebama za uređivanje. Pristupe, obuku i podršku dogovaramo pre izrade.'],['Da li radite u različitim oblastima i na oba jezika?','Da. Radimo sa firmama iz različitih oblasti. Sajt može biti na srpskom, engleskom ili oba jezika.']] : [['How do we arrange the introductory call?','Email a short description of your business, website needs and a few suitable times with your timezone. We agree a 10-minute call by reply. The call is confirmed only when both sides agree on a time.'],['How do you set the price and timeline?','We prepare a proposal and schedule after agreeing the scope, content and features. Pricing is discussed privately; there is no public price list.'],['What do you need from us?','Business information, the purpose of the website, your logo and available text and images. We agree who prepares content and who approves each stage.'],['What about revisions and extra features?','The proposal defines the included revisions, pages and features, and how additional work is agreed before work starts.'],['Who pays for domains, hosting and maintenance?','Domains, hosting, subscriptions and maintenance are listed separately in the proposal, with clear responsibilities and costs.'],['Can I update the website myself?','We choose the platform around your editing needs. Access, training and support are agreed before the build.'],['Do you work across industries and in both languages?','Yes. We work with businesses across industries. Your website can be in English, Serbian or both.']];
    html = html.replace(/<div class="faq-list">[\s\S]*?<\/div>/,`<div class="faq-list">${faqs.map(([q,a])=>`<details class="faq-item"><summary>${q}</summary><p>${a}</p></details>`).join('\n')}</div>`);
    html = html.replace(/<section class="contact-band"[\s\S]*?<\/section>/,`<section class="contact-band" id="contact"><div class="contact-inner"><div><p class="section-label">${i ? 'KONTAKT' : 'LET’S TALK'}</p><h2>${call[i]}</h2><p>${i ? 'Razgovaramo o vašem poslovanju i potrebama za sajt. Termin dogovaramo e-poštom; klik ne potvrđuje rezervaciju.' : 'Discuss your business and website needs. We agree a time by email; clicking does not confirm a booking.'}</p></div><div class="contact-details"><p>${i ? 'Pošaljite kratak opis posla, link postojećeg sajta ako ga imate i nekoliko odgovarajućih termina uz vašu vremensku zonu. Poziv je potvrđen kada se obe strane slože oko termina.' : 'Send a short description of your business, your current website if you have one, and a few suitable times with your timezone. The call is confirmed when both sides agree on a time.'}</p><p><a class="btn-primary" href="${mail(i)}" data-cta="contact-email">${i ? 'Pošaljite e-poruku za uvodni poziv' : 'Email to arrange the call'}</a></p><p>${i ? 'Bez aplikacije za e-poštu? Kopirajte adresu u svoj servis za e-poštu:' : 'No email application? Copy this address into your email service:'}</p><p class="contact-address">sningenia@gmail.com</p><p><a href="privacy.html">${i ? 'Politika privatnosti' : 'Privacy Policy'}</a></p></div></div></section>`);
    // Show the representative screen before details and keep one truthful next step.
    html = html.replace(/<div class="modal-content">[\s\S]*?(?=\s*<\/div>\s*<\/div>\s*<\/div>\s*<footer)/,`<div class="modal-content"><div class="modal-meta"><span class="modal-tag"></span><h2 id="modalTitle"></h2><p class="modal-subtitle"></p></div><div class="modal-visual"><img id="modalImage" src="${prefix}images/case1.webp" alt="" width="1200" height="800" loading="lazy"></div><div class="modal-copy"><div class="modal-block"><h3>${i ? 'Namena' : 'Purpose'}</h3><p></p></div><div class="modal-block"><h3>${i ? 'Vizuelni pristup' : 'Visual approach'}</h3><p></p></div></div><div class="modal-result"><h3>${i ? 'O ovom prikazu' : 'About this preview'}</h3><p></p></div><a class="btn-primary modal-call" href="#contact" data-cta="project-dialog">${call[i]}</a>`);
    html = html.replaceAll('https://www.linkedin.com/company/106868611/admin/dashboard/','https://www.linkedin.com/company/106868611/');
    html = html.replace(/, "https:\/\/www.linkedin.com\/company\/106868611\/"/,''); // Omit unverified public company identity from schema.
    html = html.replace(/\s*<script src="(?:\.\.\/)?analytics.js" defer><\/script>/,'');
    const nojs = `<noscript><nav class="fallback-nav" aria-label="${i ? 'Navigacija bez JavaScript-a' : 'Navigation without JavaScript'}"><a href="#work">${i ? 'Radovi' : 'Work'}</a><a href="#about">${i ? 'O nama' : 'About'}</a><a href="#faq">FAQ</a><a href="#contact">${i ? 'Kontakt' : 'Contact'}</a><a href="${i ? '../' : 'sr/'}" lang="${i ? 'en' : 'sr'}">${i ? 'EN' : 'SR'}</a></nav></noscript>`;
    html = html.replace('<main id="main">', nojs+'\n<main id="main">');
  }
  write(file,html);
}
for (const file of ['robots.txt','sitemap.xml']) write(file,read(file).replaceAll('https://example.com','https://www.sningenia.com'));
let js = read('script.js');
// Optional reveal effects are removed: content is always visible.
js = js.slice(js.indexOf('const navToggle'));
js = js.replace('const closeMobileNav = () => {','const closeMobileNav = (restoreFocus = true) => {').replace('  navToggle.focus();','  if (restoreFocus) navToggle.focus();');
js = js.replace(/    const behavior = window.matchMedia[\s\S]*?    closeMobileNav\(\);/,`    if (mobileNav.getAttribute('aria-hidden') === 'false') closeMobileNav(false);
    history.pushState(null, '', href);
    focusSection(target);`);
js = `const focusSection = (target) => {
  const heading = target.querySelector('h1, h2') || target;
  if (!heading.hasAttribute('tabindex')) {
    heading.setAttribute('tabindex', '-1');
    heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), { once: true });
  }
  heading.focus({ preventScroll: true });
  target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
};
`+js;
js = js.replace(/const modalDetails[^\n]*\n/,'');
js = js.replace(/const contactForm[\s\S]*?(?=const focusableSelector)/,"const isSerbian = document.documentElement.lang === 'sr';\n\n");
js = js.replace(/    const role[^\n]*\n    const timeline[^\n]*\n    const deliverables[^\n]*\n/,'');
js = js.replace(/    const detailValues[^\n]*\n/,'');
js = js.replace(/    if \(detailValues.length >= 3\) {[\s\S]*?    }\n/,`    document.querySelector('.modal-tag').textContent = card.dataset.status;
    const demo = card.dataset.demo === 'true';
    const headings = modalCopy.querySelectorAll('h3');
    headings[0].textContent = isSerbian ? (demo ? 'Namena demo projekta' : 'Namena') : (demo ? 'Demo purpose' : 'Purpose');
    headings[1].textContent = isSerbian ? 'Vizuelni pristup' : 'Visual approach';
`);
js = js.replace('`${title} case study image`',"`${title} — ${isSerbian ? 'prikaz interfejsa' : 'interface preview'}`");
js = js.replace(/if \(contactForm\) {[\s\S]*?(?=const mobileCta)/,'');
js = js.replace("modalClose.addEventListener('click', closeModal);",`document.querySelector('.modal-call').addEventListener('click', (event) => {
  event.preventDefault();
  closeModal();
  history.pushState(null, '', '#contact');
  focusSection(document.getElementById('contact'));
});
modalClose.addEventListener('click', closeModal);`);
// Prevent interaction with content outside the active dialog.
js = js.replace("  modal.classList.add('active');",`  document.querySelectorAll('body > :not(.project-modal):not(script)').forEach(el => {
    if (!el.hasAttribute('inert')) { el.setAttribute('inert', ''); el.dataset.modalInert = 'true'; }
  });
  modal.classList.add('active');`);
js = js.replace("  modal.classList.remove('active');",`  document.querySelectorAll('[data-modal-inert]').forEach(el => { el.removeAttribute('inert'); delete el.dataset.modalInert; });
  modal.classList.remove('active');`);
// Avoid stale focus/scroll lock when rotating from mobile to desktop with an open menu.
js += `\nwindow.matchMedia('(max-width: 900px)').addEventListener('change', event => {
  if (!event.matches && mobileNav.getAttribute('aria-hidden') === 'false') closeMobileNav(false);
});\n`;
write('script.js',js);
write('analytics.js',`// Week-one measurement is manual. No analytics provider or cookies are loaded.
// Reconcile received enquiries and mutually agreed calls in the private studio log.
// An email-link click is neither a received enquiry nor a confirmed booking.
// Enabling analytics requires an explicit measurement/privacy decision and verification.
`);
let css = read('styles.css').replace('opacity: 0; transform: translateY(8px);\n  transition: opacity 0.22s ease-out, transform 0.22s ease-out;','opacity: 1; transform: none;');
css += `\n/* Focused week-one content and contact refinements. */
.call-note { margin-top: 1rem; color: var(--muted); font-size: .9rem; }
.stat-label { line-height: 1.5; }
.contact-details p + p { margin-top: 1.2rem; }
.contact-address { user-select: text; overflow-wrap: anywhere; }
.contact-details a:not(.btn-primary) { color: inherit; text-underline-offset: .2em; }
.contact-details .btn-primary { white-space: normal; text-align: center; }
.modal-copy { margin-top: 1.5rem; }
.modal-call { margin-top: 1.5rem; }
.fallback-nav { position: relative; display: flex; flex-wrap: wrap; gap: 1rem; padding: 6rem 5vw 1rem; }
.fallback-nav a { color: var(--ink); }
.project-card .card-tag { line-height: 1.5; }
:is(section, .hero, #team, h1, h2)[id], section h2 { scroll-margin-top: 6rem; }
@media (max-width: 900px) {
  .nav-cta { white-space: normal; }
  .mobile-nav .btn-primary { white-space: normal; text-align: center; }
  .mobile-cta .btn-primary { white-space: normal; line-height: 1.4; }
  body.landing-page footer { padding-bottom: 7rem; }
  .project-modal .modal-panel { max-height: 90dvh; }
}
`;
write('styles.css',css);
console.log('Implemented P0 contact/SEO and P1 bilingual content, navigation, resilience and manual measurement.');
