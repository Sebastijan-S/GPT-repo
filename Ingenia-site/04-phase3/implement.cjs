const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'site');
let css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const replace = (from,to) => {
  if (!css.includes(from)) throw new Error('Missing CSS: ' + from);
  css = css.replace(from,to);
};
replace('  animation: fadeUp 0.22s ease-out both;', '  /* Keep the initial heading and call action visible without entrance motion. */');
replace('  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.modal-visual img {\n  min-height: 280px;', '  height: 100%;\n  object-fit: cover;\n  display: block;\n}\n.modal-visual img {\n  height: auto;\n  min-height: 0;\n  object-fit: contain;');
replace('  display: none;\n  align-items: center;\n  justify-content: center;\n  z-index: 200;', '  display: flex;\n  visibility: hidden;\n  pointer-events: none;\n  transition: visibility 0s linear 180ms;\n  align-items: center;\n  justify-content: center;\n  z-index: 200;');
replace('.project-modal.active { display: flex; }', '.project-modal.active { visibility: visible; pointer-events: auto; transition-delay: 0s; }\n.project-modal:not(.active) * { pointer-events: none; }');
replace('  animation: sliderGlow 10s linear infinite;', '  /* Static decoration: no continuous animation while reading. */');
replace('  animation: sliderGlow 8s ease-in-out infinite;', '  /* Static decoration: no continuous animation while reading. */');
replace('  html.landing-page { scroll-behavior: auto; }', '  html { scroll-behavior: auto; }');
css += `
/* Phase 3: responsive rhythm, clear controls and restrained state feedback. */
:root { --sticky-clearance: 7rem; }
html { scroll-padding-bottom: calc(var(--sticky-clearance) + 1rem); }
h2 { text-wrap: balance; }
.hero-bio { max-width: 42ch; line-height: 1.65; margin-bottom: 2rem; }
.card-desc, .card-challenge { font-size: 1rem; line-height: 1.6; }
.card-tag, .section-label, .platform-note-label, .contact-item-label { font-size: .875rem; line-height: 1.5; }
.card-body { gap: 0; }
.card-open { min-height: 44px; padding-top: .75rem; font-size: .875rem; }
.card-open:hover { color: var(--accent); }
.card-open:hover .card-open-arrow { transform: none; }
.modal-content { overscroll-behavior: contain; scroll-padding-block: 1rem; }
.modal-meta { padding-right: 3rem; }
.modal-subtitle, .modal-copy p, .modal-result p { max-width: 62ch; font-size: 1rem; line-height: 1.6; }
.modal-close { z-index: 2; }
.btn-primary, .btn-ghost { min-height: 44px; }
.nav-toggle { width: 44px; height: 44px; padding: 3px; }
.nav-links a, .language-switcher a, .mobile-nav-links a, .creator-link, .contact-socials a, .footer-link {
  display: inline-flex; align-items: center; min-height: 44px;
}
.language-switcher { gap: .5rem; }
.language-switcher a { justify-content: center; min-width: 44px; }
.social-link { width: 44px; height: 44px; }
.faq-item summary { min-height: 44px; }
.mobile-nav { overflow-y: auto; overscroll-behavior: contain; padding: 5rem 1.5rem 2rem; }
.mobile-nav-links { max-width: 100%; margin-block: auto; }
.mobile-nav-close { position: fixed; }
.work-card:hover, .creator-card:hover, .work-card:hover .card-thumb-inner,
.btn-primary:hover, .btn-ghost:hover { transform: none; }
.work-card:hover, .creator-card:hover { box-shadow: none; }
.btn-primary:hover { box-shadow: none; }
.btn-primary:active, .btn-ghost:active { filter: brightness(.94); }
.contact-band { --focus-outline: 3px solid var(--stone); }
.mobile-nav { --focus-outline: 3px solid var(--stone); }
.btn-primary, .btn-ghost, .card-open, .social-link, .creator-link, .nav-links a,
.mobile-nav-links a, .mobile-nav-close, .modal-close, .faq-item, .faq-item summary,
.contact-item a, .contact-socials a, .footer-link {
  transition-duration: 160ms; transition-timing-function: ease-out;
}
.modal-panel, .modal-backdrop { transition-duration: 180ms; }
@media (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference) {
  .btn-primary:hover, .btn-ghost:hover { transform: translateY(-1px); }
}
@media (max-width: 900px) {
  section, .about-section, .creators-section, .contact-band { padding: 4rem max(20px, 5vw); }
  .hero { padding: 7rem max(20px, 5vw) 4rem; min-height: 100svh; }
  .section-header { margin-bottom: 2rem; gap: 1rem; }
  .section-header .section-label { white-space: normal; }
  .hero-actions { gap: 1rem; }
  .help-grid { gap: 1.5rem; }
  .contact-inner { gap: 2rem; }
  .mobile-cta { padding-bottom: calc(.75rem + env(safe-area-inset-bottom, 0px)); }
  body.landing-page footer { padding: 1.5rem max(20px, 5vw) calc(var(--sticky-clearance) + 1rem); }
  .project-modal .modal-panel { max-height: 90dvh; }
  .modal-content { padding: 2rem 1.5rem; }
  .modal-meta { margin-bottom: 1.5rem; }
  .modal-panel h2 { font-size: clamp(2rem, 5vw, 3rem); overflow-wrap: anywhere; }
  .modal-visual { margin-bottom: 1.5rem; }
}
@media (max-width: 600px) {
  .hero-actions > a { width: 100%; max-width: 24rem; text-align: center; }
  .hero-bio { font-size: 1rem; }
  .hero-eyebrow { font-size: .875rem; letter-spacing: .08em; }
  .hero-eyebrow::before { flex: 0 0 1rem; }
  .contact-email-button { max-width: 100%; }
  .contact-meta { gap: 1.5rem; }
}
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .btn-primary:hover, .btn-ghost:hover { transform: none; }
}
`;
fs.writeFileSync(path.join(root,'styles.css'),css);
let js = fs.readFileSync(path.join(root,'script.js'),'utf8');
const edit = (from,to) => { if (!js.includes(from)) throw new Error('Missing JS: '+from); js = js.replace(from,to); };
edit("  mobileNav.querySelector('a')?.focus();", "  mobileNav.querySelector('a')?.focus();\n  updateMobileCta();");
edit('  if (restoreFocus) navToggle.focus();', '  if (restoreFocus) navToggle.focus();\n  updateMobileCta();');
edit("  modal.classList.add('active');", "  modal.removeAttribute('inert');\n  modal.querySelector('.modal-content').scrollTop = 0;\n  modal.classList.add('active');");
edit('  firstFocusableModal?.focus();\n};', '  firstFocusableModal?.focus();\n  updateMobileCta();\n};');
edit("  modal.classList.remove('active');", "  modal.setAttribute('inert', '');\n  modal.classList.remove('active');");
edit('  modalTrigger = null;\n};', '  modalTrigger = null;\n  updateMobileCta();\n};');
const start = js.indexOf("if (mobileCta && heroSection && contactSection && 'IntersectionObserver' in window)");
const end = js.indexOf("window.matchMedia('(max-width: 900px)')",start);
if (start < 0 || end < 0) throw new Error('Missing sticky observer');
js = js.slice(0,start) + `// Keep the call action out of the hero, contact section and open overlays.
function updateMobileCta() {
  if (!mobileCta || !heroSection || !contactSection) return;
  const intersectsViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  };
  const showCta = window.matchMedia('(max-width: 900px)').matches &&
    !intersectsViewport(heroSection) && !intersectsViewport(contactSection) &&
    !modal.classList.contains('active') && mobileNav.getAttribute('aria-hidden') !== 'false';
  mobileCta.setAttribute('aria-hidden', String(!showCta));
  mobileCta.toggleAttribute('inert', !showCta);
}

const measureMobileCta = () => {
  if (!mobileCta) return;
  const height = mobileCta.getBoundingClientRect().height;
  if (height) document.documentElement.style.setProperty('--sticky-clearance', height + 'px');
  updateMobileCta();
};
let ctaFrame = 0;
window.addEventListener('scroll', () => {
  if (ctaFrame) return;
  ctaFrame = requestAnimationFrame(() => { ctaFrame = 0; updateMobileCta(); });
}, { passive: true });
window.addEventListener('resize', measureMobileCta);
if (mobileCta && 'ResizeObserver' in window) new ResizeObserver(measureMobileCta).observe(mobileCta);
modal.setAttribute('inert', '');
measureMobileCta();

` + js.slice(end);
fs.writeFileSync(path.join(root,'script.js'),js);
console.log('Prepared phase 3 CSS and behavior changes.');
