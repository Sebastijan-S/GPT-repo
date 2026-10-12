const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const source='E:/Sync/SN Ingenia/sningenia-main';
const files=['styles.css','script.js'];
const hash=buffer=>crypto.createHash('sha256').update(buffer).digest('hex');
const manifestFile=path.join(__dirname,'source-manifest.json');
const prior=fs.existsSync(manifestFile)?JSON.parse(fs.readFileSync(manifestFile,'utf8')):{files:[]};
for(const file of files){
 const current=fs.readFileSync(path.join(source,file));
 const baseline=fs.readFileSync(path.join(__dirname,'baseline',file));
 const previous=prior.files.find(r=>r.file===file)?.after;
 if(hash(current)!==hash(baseline)&&hash(current)!==previous)throw new Error(`${file} changed outside this task; refusing to overwrite it.`);
}
const manifest=[];
for(const file of files){
 const baseline=fs.readFileSync(path.join(__dirname,'baseline',file));
 const updated=fs.readFileSync(path.join(__dirname,'site',file));
 fs.writeFileSync(path.join(source,file),updated);
 if(hash(fs.readFileSync(path.join(source,file)))!==hash(updated))throw new Error('Copy verification failed: '+file);
 manifest.push({file,before:hash(baseline),after:hash(updated)});
}
fs.writeFileSync(path.join(__dirname,'source-manifest.json'),JSON.stringify({source,files:manifest},null,2));
console.log('Applied and hash-verified only styles.css and script.js; previous phase changes preserved.');
