const fs=require('fs');
const root='E:/Sync/SN Ingenia/sningenia-main/';
for(const file of ['index.html','sr/index.html']){
 fs.writeFileSync(root+file,fs.readFileSync(root+file,'utf8').replace(/[ \t]+$/gm,''));
}
fs.writeFileSync(root+'robots.txt',fs.readFileSync(root+'robots.txt','utf8').replace(/^# TODO: Replace example.com[^\r\n]*\r?\n/,''));
fs.appendFileSync(root+'styles.css',`\n.contact-inner { grid-template-columns: 1.1fr 1fr; }
.contact-details { gap: 1.2rem; }
.contact-details p, .contact-details p + p { margin-top: 0; }
.contact-band .btn-primary { background: var(--bg); color: var(--ink); }
.contact-band .btn-primary:hover { background: var(--stone); }
@media (max-width: 900px) { .contact-inner { grid-template-columns: 1fr; } }
`);
