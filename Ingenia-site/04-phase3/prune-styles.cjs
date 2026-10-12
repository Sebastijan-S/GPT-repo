const fs=require('node:fs');
const path=require('node:path');
const file=path.join(__dirname,'site/styles.css');
let css=fs.readFileSync(file,'utf8');
const html=['index.html','privacy.html','sr/index.html','sr/privacy.html'].map(f=>fs.readFileSync(path.join(__dirname,'site',f),'utf8')).join('\n');
for(const className of ['contact-form','form-success','form-error','form-note','form-row','form-honeypot','modal-grid','modal-details','detail-row','visual-placeholder','exp-list','exp-item','exp-period','exp-role','exp-company','exp-desc']) {
 if(new RegExp('class="[^"]*\\b'+className+'\\b').test(html))throw new Error('Still used: '+className);
}
const remove=(from,to)=>{
 const a=css.indexOf(from),b=css.indexOf(to,a);
 if(a<0||b<0)throw new Error('Missing obsolete style block: '+from);
 css=css.slice(0,a)+css.slice(b);
};
remove('.contact-form {','.social-row {');
remove('.modal-grid {','.modal-copy .modal-block {');
remove('.visual-placeholder {','.modal-result {');
remove('@keyframes sliderGlow {','/* Unique gradient backgrounds');
remove('@keyframes fadeUp {','.reveal {');
remove('/* ── EXPERIENCE ── */','/* ── CONTACT ── */');
css=css.replace('  .modal-grid { grid-template-columns: 1fr; }\n','').replace('  .detail-row { grid-template-columns: 1fr; }\n','').replace('  .contact-form { margin-top: 2rem; }\n','');
css=css.replace('  .exp-item { grid-template-columns: 1fr; gap: 0.5rem; }\n','');
fs.writeFileSync(path.join(__dirname,'optimized-styles.css'),css);
console.log('CSS bytes: '+Buffer.byteLength(fs.readFileSync(path.join(__dirname,'baseline/styles.css')))+' baseline; '+Buffer.byteLength(css)+' phase 3 after obsolete styles removed.');
