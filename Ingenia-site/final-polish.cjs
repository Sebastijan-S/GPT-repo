const fs = require('fs');
const root = 'E:/Sync/SN Ingenia/sningenia-main/';
for(const file of ['index.html','sr/index.html','privacy.html','sr/privacy.html']){
 let html=fs.readFileSync(root+file,'utf8');
 html=html.replace('Inter:wght@300;400;500;600','Inter:wght@400;500;600');
 html=html.replace(' (Webflow, Framer)</title>','</title>');
 html=html.replace('Pricing is discussed privately; there is no public price list.','We discuss pricing with you privately.').replace('Cenu razmatramo privatno; na sajtu nema javnog cenovnika.','Cenu razmatramo sa vama privatno.');
 if(!file.includes('privacy')){
   const sr=file.startsWith('sr/');
   html=html.replace('<p class="contact-address">sningenia@gmail.com</p>',`<p class="contact-address">sningenia@gmail.com</p><p><a href="https://www.instagram.com/sningenia/" target="_blank" rel="noopener noreferrer">Instagram</a></p>`);
   html=html.replace(/ data-role="[^"]*" data-deliverables="[^"]*"/g,'');
 }
 // Expand generated adjacent block tags for a reviewable hand-authored diff.
 html=html.replace(/(<\/(?:article|div|section|details|h[1-3]|p)>)(?=<(?:article|div|section|details|h[1-3]|p|a|button))/g,'$1\n');
 html=html.replace(/(<(?:article|section|div)\b[^>]*>)(?=<(?:div|h[1-3]|p|article|details))/g,'$1\n');
 fs.writeFileSync(root+file,html);
}
for(const file of ['sitemap.xml','robots.txt']){
 const text=fs.readFileSync(root+file,'utf8').replace(/<!-- TODO: Replace example.com[^>]*-->\r?\n/g,'');
 fs.writeFileSync(root+file,text);
}
let js=fs.readFileSync(root+'script.js','utf8');
js=js.replace("    const href = link.getAttribute('href') || '';", "    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;\n    const href = link.getAttribute('href') || '';");
fs.writeFileSync(root+'script.js',js);
