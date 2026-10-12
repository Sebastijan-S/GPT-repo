const {spawn}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const cli=path.join(__dirname,'../.audit-npm-cache/_npx/0f94ee7615faf582/node_modules/lighthouse/cli/index.js');
(async()=>{
 const runs={before:[],after:[]};
 for(let n=1;n<=3;n++)for(const [stage,port]of [['before',4175],['after',4174]]){
  const output=path.join(__dirname,`lighthouse-paired-${stage}-sr-mobile-${n}.json`);
  const args=[cli,`http://127.0.0.1:${port}/sr/`,'--output=json','--output-path='+output,'--chrome-flags=--headless --no-sandbox','--quiet'];
  await new Promise((resolve,reject)=>{
   const child=spawn(process.execPath,args,{env:{...process.env,CHROME_PATH:'C:/Program Files/Google/Chrome/Application/chrome.exe'},stdio:'pipe'});
   let errors='';child.stderr.on('data',d=>errors+=d);child.on('error',reject);child.on('exit',c=>c===0?resolve():reject(new Error(errors)));
  });
  const r=JSON.parse(fs.readFileSync(output,'utf8')),a=r.audits;
  const run={performance:r.categories.performance.score*100,accessibility:r.categories.accessibility.score*100,seo:r.categories.seo.score*100,bestPractices:r.categories['best-practices'].score*100,lcp:a['largest-contentful-paint'].numericValue,tbt:a['total-blocking-time'].numericValue,cls:a['cumulative-layout-shift'].numericValue,runtimeError:r.runtimeError||null};
  runs[stage].push(run); console.log(`paired ${stage} ${n}: ${JSON.stringify(run)}`);
 }
 const rows=[];
 for(const stage of ['before','after']){
  const medians={},ranges={};
  for(const key of ['performance','accessibility','seo','bestPractices','lcp','tbt','cls']){const values=runs[stage].map(r=>r[key]).sort((a,b)=>a-b);medians[key]=values[1];ranges[key]=[values[0],values[2]];}
  rows.push({stage,name:'sr-mobile',runs:runs[stage],medians,ranges,method:'alternating before/after pairs'});
 }
 fs.writeFileSync(path.join(__dirname,'sr-paired-performance.json'),JSON.stringify(rows,null,2));
})().catch(e=>{console.error(e);process.exit(1)});
