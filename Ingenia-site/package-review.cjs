const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const {spawnSync}=require('child_process');
const root='E:/Sync/SN Ingenia/sningenia-main';
const out=__dirname+'/03-implementation';
const files=['index.html','sr/index.html','privacy.html','sr/privacy.html','script.js','styles.css','analytics.js','robots.txt','sitemap.xml'];
let patch='';
const manifest=[];
const hash=data=>crypto.createHash('sha256').update(data).digest('hex');
for(const file of files){
 const before=out+'/baseline/'+file;
 const after=root+'/'+file;
 const result=spawnSync('git',['diff','--no-index','--',before,after],{encoding:'utf8'});
 if(![0,1].includes(result.status))throw Error(result.stderr);
 const body=result.stdout.slice(result.stdout.indexOf('@@'));
 if(result.status===1) patch+=`diff --git a/${file} b/${file}\n--- a/${file}\n+++ b/${file}\n`+body;
 manifest.push({file,before:hash(fs.readFileSync(before)),after:hash(fs.readFileSync(after))});
}
const logo=spawnSync('git',['diff','--no-index','--binary','--','/dev/null',root+'/images/logo-header.webp'],{encoding:'utf8'});
if(logo.status!==1)throw Error(logo.stderr);
patch+=logo.stdout.replace(/diff --git [^\r\n]+/, 'diff --git a/images/logo-header.webp b/images/logo-header.webp').replace(/\+\+\+ [^\r\n]+/,'+++ b/images/logo-header.webp');
fs.writeFileSync(out+'/implementation-only.patch',patch);
fs.writeFileSync(out+'/source-manifest.json',JSON.stringify({head:spawnSync('git',['-C',root,'rev-parse','HEAD'],{encoding:'utf8'}).stdout.trim(),files:manifest,newAsset:{file:'images/logo-header.webp',bytes:fs.statSync(root+'/images/logo-header.webp').size,sha256:hash(fs.readFileSync(root+'/images/logo-header.webp'))}},null,2));
const css=fs.readFileSync(root+'/styles.css','utf8');
for(const rule of ['justify-content: center;\n  align-items: center;\n  gap: 5px;', 'translateY(7px) rotate(45deg)','translateY(-7px) rotate(-45deg)'])if(!css.includes(rule))throw Error('Existing hamburger change missing');
for(const file of ['index.html','sr/index.html']){
 const html=fs.readFileSync(root+'/'+file,'utf8');
 if(/example\.com|data-timeline=|contactForm|Reply within|1 hour|1 sat/.test(html))throw Error('Stale content '+file);
 if(!html.includes('https://fonts.gstatic.com')||!html.includes('logo-header.webp'))throw Error('Asset setup '+file);
}
const xml=fs.readFileSync(root+'/sitemap.xml','utf8');
for(const url of ['https://www.sningenia.com/','https://www.sningenia.com/sr/','https://www.sningenia.com/privacy.html','https://www.sningenia.com/sr/privacy.html'])if(!xml.includes('<loc>'+url+'</loc>'))throw Error('Sitemap '+url);
fs.writeFileSync(out+'/inquiry-call-log-template.csv','record_id,source_partner,source_campaign,received_at,call_status,agreed_at,call_local_date_time,visitor_iana_timezone,studio_iana_timezone,held_at,qualification,internal_test\n');
console.log('Saved implementation-only patch with new logo, SHA-256 source manifest and empty manual log template. Existing CSS edits preserved.');
