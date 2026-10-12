const fs = require('fs');
const sharp = require('C:/Users/Cebo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const root = 'E:/Sync/SN Ingenia/sningenia-main/';
(async () => {
  const svg = fs.readFileSync(root+'images/logo-header.svg');
  // Rasterize the existing logo at >2x its 113x24 CSS size, preserving the full SVG canvas.
  await sharp(svg).resize({width:384}).webp({lossless:true}).toFile(root+'images/logo-header.webp');
  console.log('Logo bytes:', fs.statSync(root+'images/logo-header.webp').size);
  for (const file of ['index.html','sr/index.html']) {
    const sr = file.startsWith('sr/');
    let html = fs.readFileSync(root+file,'utf8');
    const modal = `<div class="project-modal" id="projectModal" aria-hidden="true">
  <div class="modal-backdrop" id="modalBackdrop"></div>
  <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
    <button class="modal-close" id="modalClose" type="button" aria-label="${sr ? 'Zatvori detalje projekta' : 'Close project details'}">×</button>
    <div class="modal-content">
      <div class="modal-meta"><span class="modal-tag"></span><h2 id="modalTitle"></h2><p class="modal-subtitle"></p></div>
      <div class="modal-visual"><img id="modalImage" src="${sr?'../':''}images/case1.webp" alt="" width="1200" height="800" loading="lazy"></div>
      <div class="modal-copy"><div class="modal-block"><h3>${sr?'Namena':'Purpose'}</h3><p></p></div><div class="modal-block"><h3>${sr?'Vizuelni pristup':'Visual approach'}</h3><p></p></div></div>
      <div class="modal-result"><h3>${sr?'O ovom prikazu':'About this preview'}</h3><p></p></div>
      <a class="btn-primary modal-call" href="#contact" data-cta="project-dialog">${sr?'Dogovorite uvodni poziv od 10 minuta':'Arrange a 10-minute introductory call'}</a>
    </div>
  </div>
</div>
`;
    html = html.replace(/<div class="project-modal"[\s\S]*?(?=(?:<!-- FOOTER -->\s*)?<footer)/,modal+'\n');
    html = html.replace('<noscript><nav class="fallback-nav"','<div class="fallback-navigation"><nav class="fallback-nav"').replace('</nav></noscript>','</nav></div>');
    html = html.replace('He keeps every project clear, on schedule and moving from idea to launch.','He works with clients from the initial plan through development and handover.').replace('Svaki projekat drži jasnim, u planiranom roku i na putu od ideje do objave.','Sarađuje sa klijentima od početnog plana do izrade i primopredaje.');
    // Keep social summaries aligned with the simpler offer.
    html = html.replace(/(<meta (?:property="og:description"|name="twitter:description") content=")[^"]*(">)/g,`$1${sr?'Novi sajtovi i redizajn postojećih, na srpskom i engleskom. Dogovorite uvodni poziv od 10 minuta e-poštom.':'New websites and website redesigns, in English and Serbian. Arrange a 10-minute introductory call by email.'}$2`);
    fs.writeFileSync(root+file,html);
  }
  let js = fs.readFileSync(root+'script.js','utf8');
  js += "\n// Enable enhanced controls only after essential handlers initialize successfully.\ndocument.documentElement.classList.add('site-ready');\n";
  fs.writeFileSync(root+'script.js',js);
  fs.appendFileSync(root+'styles.css',`\n.site-ready .fallback-navigation { display: none; }
html:not(.site-ready) .nav-toggle, html:not(.site-ready) .card-open { display: none; }
.contact-inner { gap: 3rem; }
.contact-inner h2 { font-size: clamp(2rem, 4vw, 3.5rem); }
.modal-call { white-space: normal; text-align: center; }
`);
})();
