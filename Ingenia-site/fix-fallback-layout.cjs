const fs=require('fs');
fs.appendFileSync('E:/Sync/SN Ingenia/sningenia-main/styles.css',`\n/* The no-script fallback must not shift page content when enhancement starts. */
.fallback-navigation { position: absolute; top: 4rem; left: 0; right: 0; z-index: 90; background: var(--bg); }
.fallback-nav { position: static; padding: 1rem 5vw; }
`);
