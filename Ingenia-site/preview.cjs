const http = require('http');
const fs = require('fs');
const path = require('path');
const root = 'E:/Sync/SN Ingenia/sningenia-main';
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain'};
http.createServer((req,res)=>{
  let rel = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if (rel.endsWith('/')) rel+='index.html';
  const file = path.resolve(root,'.'+rel);
  if (!file.startsWith(path.resolve(root)+path.sep)) { res.writeHead(403).end(); return; }
  fs.readFile(file,(error,data)=>{
    if(error) {res.writeHead(404).end();return;}
    res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
    res.end(data);
  });
}).listen(4173,'127.0.0.1',()=>console.log('Local: http://127.0.0.1:4173/'));
