const fs=require('fs');
const assert=require('assert/strict');
for(const file of ['index.html','sr/index.html']){
 const html=fs.readFileSync('E:/Sync/SN Ingenia/sningenia-main/'+file,'utf8');
 for(const [tag] of html.matchAll(/<a[^>]*data-cta=[^>]*>/g)){
  const href=tag.match(/href="([^"]+)"/)[1];
  assert(href==='#contact'||href.startsWith('mailto:sningenia@gmail.com?subject='));
 }
}
const summary=JSON.parse(fs.readFileSync('03-implementation/performance-summary.json','utf8'));
assert.equal(summary.length,3);
let table='\n## Final local Lighthouse medians\n\nThree sequential runs per profile on the final source, Lighthouse 13.5.0 / Chrome 155. Default mobile simulation and desktop preset, local HTTP preview, externally loaded Google Fonts.\n\n| Profile | Performance | Accessibility / best practices / SEO | LCP | TBT | CLS |\n| --- | --- | --- | --- | --- | --- |\n';
for(const {name,medians:m,runs} of summary){
 assert.equal(runs.length,3);
 assert(runs.every(r=>r.runtimeError===null&&r.labelName===1));
 table+=`| ${name} | ${m.performance} | ${m.accessibility} / ${m.bestPractices} / ${m.seo} | ${(m.lcp/1000).toFixed(2)}s | ${m.tbt}ms | ${m.cls.toFixed(3)} |\n`;
}
table+='\nThe initial fallback-navigation layout shift was corrected before these final runs. Mobile LCP remains above the 2.5s lab target. The known optional favicon 404 accounts for the best-practices console diagnostic. These local lab medians are not live-site speed or conversion results.\n';
fs.appendFileSync('03-implementation/README.md',table);
console.log('All primary CTA routes and final nine-run Lighthouse results verified.');
console.log(summary.map(({name,medians})=>({name,...medians})));
