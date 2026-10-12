const fs=require('fs');
const root='E:/Sync/SN Ingenia/sningenia-main/';
const backup=__dirname+'/03-implementation/before-section-feedback';
fs.mkdirSync(backup,{recursive:true});
for(const file of ['index.html','sr/index.html','styles.css']){
 const dest=backup+'/'+file;
 if(fs.existsSync(dest))throw Error('Feedback baseline already exists');
 fs.mkdirSync(require('path').dirname(dest),{recursive:true});
 fs.copyFileSync(root+file,dest);
}
for(const file of ['index.html','sr/index.html']){
 const sr=file.startsWith('sr/');
 let html=fs.readFileSync(root+file,'utf8');
 const note=html.match(/<p class="help-audience">([\s\S]*?)<\/p>/);
 if(!note)throw Error('Missing platform note');
 html=html.replace(note[0],'');
 const services=html.match(/<section id="who-we-help"[\s\S]*?<\/section>/)[0];
 const updated=services.replace(/<\/div>\s*<\/section>$/,`<article class="help-card help-platform"><span class="platform-note-label">${sr?'PRILAGOĐENO VAMA':'BUILT AROUND YOU'}</span><h3>${sr?'Prava platforma za vaš projekat':'The right platform for your project'}</h3><p>${note[1]}</p></article>\n</div>\n</section>`);
 if(updated===services)throw Error('Could not place fourth card');
 html=html.replace(services,updated);
 const subject=encodeURIComponent(sr?'Uvodni poziv od 10 minuta':'10-minute introductory call');
 html=html.replace(/<section class="contact-band"[\s\S]*?<\/section>/,`<section class="contact-band" id="contact">
  <div class="contact-inner">
    <div class="contact-intro">
      <p class="section-label">${sr?'KONTAKT':'LET’S TALK'}</p>
      <h2>${sr?'Dogovorite uvodni poziv od <em>10 minuta</em>':'Arrange a <em>10-minute</em> introductory call'}</h2>
      <p>${sr?'Kratak razgovor o vašem sajtu. Termin dogovaramo e-poštom.':'A short conversation about your website. We agree a time by email.'}</p>
    </div>
    <div class="contact-details">
      <p class="contact-brief">${sr?'Pošaljite kratak opis svog poslovanja i trenutni sajt (ako ga imate).':'Send a short description of your business and current website (if available).'}</p>
      <a class="btn-primary contact-email-button" href="mailto:sningenia@gmail.com?subject=${subject}" data-cta="contact-email">${sr?'Pošaljite e-poruku za uvodni poziv':'Email to arrange the call'} <span aria-hidden="true">↗</span></a>
      <div class="contact-meta">
        <div class="contact-item contact-email"><span class="contact-item-label">${sr?'E-pošta':'Email'}</span><a class="contact-address" href="mailto:sningenia@gmail.com">sningenia@gmail.com</a></div>
        <div class="contact-item"><span class="contact-item-label">${sr?'Lokacija':'Location'}</span><p>${sr?'U Srbiji':'Based in Serbia'}</p></div>
        <div class="contact-item"><span class="contact-item-label">${sr?'Dostupnost':'Availability'}</span><p>${sr?'Otvoreni smo za projekte':'Open to projects'}</p></div>
      </div>
      <div class="contact-socials"><span class="contact-item-label">${sr?'Pratite nas':'Find us'}</span><div class="social-row">
        <a href="https://www.instagram.com/sningenia/" target="_blank" rel="noopener noreferrer">Instagram <span aria-hidden="true">↗</span></a>
        <a href="https://www.linkedin.com/company/106868611/" target="_blank" rel="noopener noreferrer">LinkedIn <span aria-hidden="true">↗</span></a>
      </div></div>
    </div>
  </div>
</section>`);
 fs.writeFileSync(root+file,html);
}
fs.appendFileSync(root+'styles.css',`\n/* Browser feedback: complete service grid and compact contact hierarchy. */
.help-platform { background: rgba(98,70,234,.06); border-color: var(--accent); display: flex; flex-direction: column; justify-content: center; }
.platform-note-label { color: var(--accent); font-size: .68rem; font-weight: 600; letter-spacing: .12em; margin-bottom: .8rem; }
.help-platform h3 { margin-bottom: .55rem; }
.contact-inner { grid-template-columns: 1.15fr 1fr; gap: clamp(2.5rem,6vw,6rem); }
.contact-intro h2 { max-width: 13ch; }
.contact-inner h2 em { color: var(--accent); font-style: normal; }
.contact-intro > p:last-child { max-width: 37ch; color: var(--stone); }
.contact-details { gap: 1.5rem; }
.contact-brief { max-width: 40ch; }
.contact-email-button { align-self: flex-start; display: inline-flex; gap: 1.5rem; align-items: center; }
.contact-meta { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(196,185,168,.3); }
.contact-meta .contact-email { grid-column: 1 / -1; }
.contact-item-label { color: var(--stone); font-size: .68rem; letter-spacing: .12em; text-transform: uppercase; }
.contact-details .contact-address { font-size: clamp(1.1rem,2vw,1.4rem); text-decoration: none; }
.contact-socials { padding-top: .25rem; }
.contact-socials .social-row { gap: 1.5rem; margin-top: .6rem; flex-wrap: wrap; }
.contact-socials a { font-size: .9rem; text-decoration: none; }
.contact-socials a:hover, .contact-address:hover { color: var(--accent); }
@media (max-width: 900px) { .contact-inner { grid-template-columns: 1fr; } .contact-intro h2 { max-width: 16ch; } }
@media (max-width: 360px) { .contact-meta { gap: 1.25rem .75rem; } .contact-email-button { padding-inline: 1.2rem; gap: .75rem; } }
`);
console.log('Updated EN/SR service grid, contact copy, email/social links and purple call duration.');
