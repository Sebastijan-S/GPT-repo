const {spawn} = require('child_process');
const fs=require('fs');
const cli=__dirname+'/.audit-npm-cache/_npx/0f94ee7615faf582/node_modules/lighthouse/cli/index.js';
const out=__dirname+'/03-implementation';
(async()=>{
 const summary=[];
 for(const [name,route,desktop] of [['en-mobile','',false],['en-desktop','',true],['sr-mobile','sr/',false]]){
  const runs=[];
  for(let n=1;n<=3;n++){
   const output=out+'/lighthouse-'+name+'-'+n+'.json';
   const args=[cli,'http://127.0.0.1:4173/'+route,'--output=json','--output-path='+output,'--chrome-flags=--headless --no-sandbox','--quiet'];
   if(desktop)args.push('--preset=desktop');
   await new Promise((resolve,reject)=>{
    const child=spawn(process.execPath,args,{env:{...process.env,CHROME_PATH:'C:/Program Files/Google/Chrome/Application/chrome.exe'},stdio:'pipe'});
    let errors='';child.stderr.on('data',d=>errors+=d);
    child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(new Error(errors)));
   });
   const r=JSON.parse(fs.readFileSync(output,'utf8'));
   const a=r.audits;
   runs.push({performance:r.categories.performance.score*100,accessibility:r.categories.accessibility.score*100,bestPractices:r.categories['best-practices'].score*100,seo:r.categories.seo.score*100,fcp:a['first-contentful-paint'].numericValue,lcp:a['largest-contentful-paint'].numericValue,tbt:a['total-blocking-time'].numericValue,cls:a['cumulative-layout-shift'].numericValue,labelName:a['label-content-name-mismatch']?.score,runtimeError:r.runtimeError||null});
   console.log(name+' run '+n+' '+JSON.stringify(runs.at(-1)));
  }
  const medians={};for(const key of ['performance','accessibility','bestPractices','seo','fcp','lcp','tbt','cls']) medians[key]=runs.map(r=>r[key]).sort((a,b)=>a-b)[1];
  summary.push({name,runs,medians});
  fs.writeFileSync(out+'/performance-summary.json',JSON.stringify(summary,null,2));
 }
})().catch(e=>{console.error(e);process.exit(1)});
