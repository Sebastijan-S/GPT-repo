const {spawn} = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const cli=path.join(__dirname,'../.audit-npm-cache/_npx/0f94ee7615faf582/node_modules/lighthouse/cli/index.js');
(async()=>{
 const afterOnly=process.argv.includes('--after-only');
 const summary=afterOnly?JSON.parse(fs.readFileSync(path.join(__dirname,'performance-summary.json'),'utf8')).filter(r=>r.stage==='before'):[];
 for(const [name,route,desktop] of [['en-mobile','',false],['sr-mobile','sr/',false],['en-desktop','',true]]){
  for(const [stage,port] of [['before',4175],['after',4174]]){
   if(afterOnly&&stage==='before')continue;
   const runs=[];
   for(let n=1;n<=3;n++){
    const output=path.join(__dirname,`lighthouse-${stage}-${name}-${n}.json`);
    const args=[cli,`http://127.0.0.1:${port}/${route}`,'--output=json','--output-path='+output,'--chrome-flags=--headless --no-sandbox','--quiet'];
    if(desktop)args.push('--preset=desktop');
    await new Promise((resolve,reject)=>{
     const child=spawn(process.execPath,args,{env:{...process.env,CHROME_PATH:'C:/Program Files/Google/Chrome/Application/chrome.exe'},stdio:'pipe'});
     let errors='';child.stderr.on('data',d=>errors+=d);
     child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(new Error(errors)));
    });
    const r=JSON.parse(fs.readFileSync(output,'utf8')),a=r.audits;
    runs.push({performance:r.categories.performance.score*100,accessibility:r.categories.accessibility.score*100,seo:r.categories.seo.score*100,bestPractices:r.categories['best-practices'].score*100,lcp:a['largest-contentful-paint'].numericValue,tbt:a['total-blocking-time'].numericValue,cls:a['cumulative-layout-shift'].numericValue,runtimeError:r.runtimeError||null});
    console.log(`${stage} ${name} ${n}: ${JSON.stringify(runs.at(-1))}`);
   }
   const medians={},ranges={};
   for(const key of ['performance','accessibility','seo','bestPractices','lcp','tbt','cls']){
    const values=runs.map(r=>r[key]).sort((a,b)=>a-b);medians[key]=values[1];ranges[key]=[values[0],values[2]];
   }
   summary.push({stage,name,runs,medians,ranges});
   fs.writeFileSync(path.join(__dirname,'performance-summary.json'),JSON.stringify(summary,null,2));
  }
 }
})().catch(e=>{console.error(e);process.exit(1)});
