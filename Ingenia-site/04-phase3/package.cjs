const fs=require('node:fs');
const path=require('node:path');
const {spawnSync}=require('node:child_process');
let patch='';
for(const file of ['styles.css','script.js']){
 const r=spawnSync('git',['-c','core.autocrlf=false','diff','--no-index','--',path.join(__dirname,'baseline',file),path.join(__dirname,'site',file)],{encoding:'utf8'});
 if(r.status!==1)throw new Error(r.stderr||'Expected a changed file');
 patch+=r.stdout.split('\n').map(line=>{
  if(line.startsWith('diff --git '))return `diff --git a/${file} b/${file}`;
  if(line.startsWith('--- '))return `--- a/${file}`;
  if(line.startsWith('+++ '))return `+++ b/${file}`;
  return line;
 }).join('\n');
}
fs.writeFileSync(path.join(__dirname,'phase3-only.patch'),patch);
const summaryFile=path.join(__dirname,'performance-summary.json');
if(fs.existsSync(summaryFile)&&!process.argv.includes('--patch-only')){
 const summary=JSON.parse(fs.readFileSync(summaryFile,'utf8'));
 if(summary.length!==6)throw new Error('Await all six matched performance profiles before finalizing report');
 let table='\n## Matched local performance measurements\n\nThree sequential Lighthouse runs for each profile before and after Phase 3. Both previews use the same final Phase 2 HTML/assets, differing only in the two changed files. External Google Fonts remain a source of run-to-run variance. These are local lab results, not field measurements.\n\n| Profile | Phase | Performance median | LCP median (range) | TBT median | CLS median | Accessibility / SEO |\n| --- | --- | --- | --- | --- | --- | --- |\n';
 for(const row of summary){const m=row.medians,r=row.ranges;table+=`| ${row.name} | ${row.stage} | ${m.performance} | ${(m.lcp/1000).toFixed(2)}s (${(r.lcp[0]/1000).toFixed(2)}–${(r.lcp[1]/1000).toFixed(2)}s) | ${m.tbt}ms | ${m.cls.toFixed(3)} | ${m.accessibility} / ${m.seo} |\n`;}
 table+='\nRaw runs and ranges are in `performance-summary.json` and the adjacent Lighthouse JSON files. The existing favicon 404 remains and accounts for the best-practices console diagnostic. Optional A3/A4 motion remains deferred.\n';
 const pairedFile=path.join(__dirname,'sr-paired-performance.json');
 if(fs.existsSync(pairedFile)){
  const paired=JSON.parse(fs.readFileSync(pairedFile,'utf8'));
  table+='\nA follow-up Serbian series alternated before/after runs to check ordering effects.\n\n| Phase | Performance median | LCP median (range) | TBT median | CLS median |\n| --- | --- | --- | --- | --- |\n';
  for(const {stage,medians:m,ranges:r}of paired)table+=`| ${stage} | ${m.performance} | ${(m.lcp/1000).toFixed(2)}s (${(r.lcp[0]/1000).toFixed(2)}–${(r.lcp[1]/1000).toFixed(2)}s) | ${m.tbt}ms | ${m.cls.toFixed(3)} |\n`;
  table+='\nThe paired Serbian median remains slower, so this pass does not establish a speed improvement or a resolved mobile LCP issue. Ranges overlap and remote-font timing varies, but that does not prove the entire difference is noise. Further font/loading work remains separate. The main table predates the final dialog image-readiness guard; that guard leaves the hero layout unchanged and was present in the last paired after run. Raw paired runs are retained in `sr-paired-performance.json`.\n';
 }
 const readme=path.join(__dirname,'README.md');
 const text=fs.readFileSync(readme,'utf8').split('\n## Matched local performance measurements')[0];
 fs.writeFileSync(readme,text+table);
}
console.log('Phase 3 patch and performance handoff prepared.');
