const fs=require('fs');
fs.appendFileSync('E:/Sync/SN Ingenia/sningenia-main/styles.css',`\n.contact-intro h2 { max-width: none; }
.contact-intro h2 em { color: var(--sage); white-space: nowrap; }
.contact-details .contact-meta a, .contact-details .contact-socials a { color: var(--bg); }
.contact-details .contact-meta a:hover, .contact-details .contact-socials a:hover { color: var(--stone); }
`);
