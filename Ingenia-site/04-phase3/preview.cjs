const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.join(__dirname, 'site');
const baseline = process.argv.includes('--baseline');
const types = {'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.webp':'image/webp','.svg':'image/svg+xml','.xml':'application/xml','.txt':'text/plain'};
http.createServer((req,res) => {
  let rel = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
  if (rel.endsWith('/')) rel += 'index.html';
  let file = path.resolve(root, '.' + rel);
  if (!file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
  if (baseline && ['/styles.css','/script.js'].includes(rel)) file = path.join(__dirname, 'baseline', rel.slice(1));
  fs.readFile(file, (error,data) => {
    if (error) {res.writeHead(404).end();return;}
    res.setHeader('Content-Type', types[path.extname(file)] || 'application/octet-stream');
    res.setHeader('Cache-Control','no-store');
    res.end(data);
  });
}).listen(baseline ? 4175 : 4174, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${baseline ? 4175 : 4174}/`));
