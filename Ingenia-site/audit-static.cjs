const fs = require('node:fs');
const path = require('node:path');
const root = 'E:/Sync/SN Ingenia/sningenia-main';
const files = ['index.html','sr/index.html','privacy.html','sr/privacy.html'];
const result = files.map(file => {
  const html = fs.readFileSync(path.join(root,file),'utf8');
  const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
  const broken = [];
  for (const m of html.matchAll(/\b(?:src|href|data-image)="([^"]+)"/g)) {
    const ref=m[1]; if (/^(?:https?:|mailto:|data:)/.test(ref)) continue;
    if(ref.startsWith('#')) {if(!ids.includes(ref.slice(1))) broken.push(ref); continue;}
    if(!fs.existsSync(path.resolve(root,path.dirname(file),ref.split('#')[0]))) broken.push(ref);
  }
  const schema=[...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(m=>{try{return {validJSON:true,type:JSON.parse(m[1])['@type']}}catch{return {validJSON:false}}});
  return {file,duplicateIds:ids.filter((v,i)=>ids.indexOf(v)!==i),brokenLocalRefs:broken,schema,hasNoindex:/noindex/i.test(html),title:html.match(/<title>(.*?)<\/title>/)?.[1],revealCount:(html.match(/class="[^"]*\breveal\b/g)||[]).length};
});
fs.writeFileSync('C:/Users/Cebo/Documents/ChatGPT/Ingenia-site/02-evidence/static-checks.json',JSON.stringify(result,null,2));
console.log(JSON.stringify(result,null,2));
