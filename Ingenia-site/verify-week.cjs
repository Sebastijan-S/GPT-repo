const fs = require('fs');
const assert = require('assert/strict');
const { chromium } = require('C:/Users/Cebo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = 'E:/Sync/SN Ingenia/sningenia-main/';
const out = __dirname+'/03-implementation';
(async()=>{
 const browser = await chromium.launch({channel:'chrome',headless:true});
 const results=[];
 const errors=[];
 const pages=['','sr/','privacy.html','sr/privacy.html'];
 for(const route of pages) for(const [width,height] of [[1440,900],[390,844],[320,844]]){
  const page = await browser.newPage({viewport:{width,height},reducedMotion:'reduce'});
  page.on('pageerror',e=>errors.push(route+': '+e.message));
  page.on('request',r=>{if(/google-analytics|googletagmanager|clarity\.ms/.test(r.url())) errors.push('Unexpected analytics '+r.url())});
  assert.equal((await page.goto('http://127.0.0.1:4173/'+route)).status(),200);
  await page.evaluate(()=>document.fonts.ready);
  assert(await page.evaluate(()=>document.documentElement.scrollWidth <= innerWidth),route+' horizontal overflow '+width);
  assert.equal(await page.locator('form').count(),0);
  const broken = await page.locator('img').evaluateAll(imgs=>imgs.filter(img=>img.complete && img.naturalWidth===0).map(img=>img.src));
  assert.deepEqual(broken,[]);
  const canonical=await page.locator('[rel=canonical]').getAttribute('href');
  assert.equal(canonical,'https://www.sningenia.com/'+route);
  for(const alt of await page.locator('[hreflang]').evaluateAll(ls=>ls.map(l=>l.href))) assert(alt.startsWith('https://www.sningenia.com/'));
  if(!route.includes('privacy')){
   assert.equal(await page.locator('.card-title').allTextContents().then(x=>x.join('|')),'Smart Residences|Invoko Cuts|PickUp Fresh|ArchiNova');
   assert.equal(await page.locator('.project-card[data-demo=true]').count(),3);
   assert(await page.locator('html').evaluate(el=>el.classList.contains('site-ready')));
   assert.equal(await page.locator('script[type="application/ld+json"]').evaluate(el=>JSON.parse(el.textContent).url),'https://www.sningenia.com/'+(route==='sr/'?'sr/':''));
   for(const btn of await page.locator('.card-open').all()){
    assert((await btn.getAttribute('aria-label')).includes((await btn.innerText()).replace('→','').trim()));
    await btn.click();
    await page.waitForFunction(()=>document.getElementById('projectModal').getAttribute('aria-hidden')==='false');
    assert(await page.locator('main').evaluate(el=>el.inert));
    await page.keyboard.press('Shift+Tab');
    assert(await page.locator('.modal-call').evaluate(el=>el===document.activeElement));
    await page.keyboard.press('Tab');
    assert(await page.locator('#modalClose').evaluate(el=>el===document.activeElement));
    await page.keyboard.press('Escape');
    assert(await btn.evaluate(el=>el===document.activeElement));
   }
   await page.locator('.card-open').first().click();
   await page.locator('.modal-call').click();
   assert.equal(new URL(page.url()).hash,'#contact');
   assert(await page.locator('#contact h2').evaluate(el=>el===document.activeElement));
   const href=await page.locator('[data-cta=contact-email]').getAttribute('href');
   assert.equal(href.split('?')[0],'mailto:sningenia@gmail.com');
   assert.equal(new URL(href).searchParams.get('subject'),route==='sr/'?'Uvodni poziv od 10 minuta':'10-minute introductory call');
   if(width<900){
    await page.locator('.nav-toggle').click();
    await page.keyboard.press('Escape');
    assert(await page.locator('.nav-toggle').evaluate(el=>el===document.activeElement));
    await page.locator('.nav-toggle').click();
    await page.locator('.mobile-nav a[href="#work"]').click();
    assert(await page.locator('#work h2').evaluate(el=>el===document.activeElement));
    assert.equal(new URL(page.url()).hash,'#work');
    await page.goBack();
    assert.equal(new URL(page.url()).hash,'#contact');
   }
   await page.locator('.faq-item summary').first().click();
   assert(await page.locator('.faq-item').first().evaluate(el=>el.open));
   await page.goto('http://127.0.0.1:4173/'+route);
   await page.screenshot({path:out+'/'+(route==='sr/'?'sr':'en')+'-'+width+'.png',fullPage:true});
  }else await page.screenshot({path:out+'/'+route.replaceAll('/','-').replace('.html','')+'-'+width+'.png',fullPage:true});
  results.push({route:route||'/',width,height,status:'passed'});
  await page.close();
 }
 for(const mode of ['disabled','blocked','no-observer']) for(const route of ['', 'sr/']){
  const page = await browser.newPage({viewport:{width:320,height:844},javaScriptEnabled:mode!=='disabled'});
  page.on('pageerror',e=>errors.push(mode+': '+e.message));
  if(mode==='blocked') await page.route('**/script.js',r=>r.abort());
  if(mode==='no-observer') await page.addInitScript(()=>{delete window.IntersectionObserver});
  await page.goto('http://127.0.0.1:4173/'+route);
  assert(await page.locator('#work h2').isVisible());
  assert(await page.locator('.contact-address').isVisible());
  if(mode!=='no-observer'){
   assert(await page.locator('.fallback-nav').isVisible());
   await page.locator('.fallback-nav a[href="#contact"]').click();
   assert.equal(new URL(page.url()).hash,'#contact');
  } else {
   await page.locator('.nav-toggle').click();
   await page.locator('.mobile-nav a[href="#work"]').click();
   await page.locator('.card-open').first().click();
   assert(await page.locator('#projectModal').evaluate(el=>el.getAttribute('aria-hidden')==='false'));
  }
  results.push({route:route||'/',mode,status:'passed'});
  await page.close();
 }
 assert.deepEqual(errors,[]);
 // Validate every local HTML reference without calling external email or booking destinations.
 for(const file of ['index.html','sr/index.html','privacy.html','sr/privacy.html']){
  const html=fs.readFileSync(root+file,'utf8');
  assert(!html.includes('example.com'));
  for(const [,ref] of html.matchAll(/(?:href|src)="([^"#]+)"/g)){
   if(/^(https?:|mailto:|data:)/.test(ref))continue;
   const local=new URL(ref,'http://local/'+file).pathname;
   const dest=root+local.slice(1)+(local.endsWith('/')?'index.html':'');
   assert(fs.existsSync(dest),'Missing '+dest);
  }
 }
 fs.writeFileSync(out+'/checks.json',JSON.stringify({results,errors},null,2));
 console.log(JSON.stringify({passed:results.length,errors},null,2));
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
