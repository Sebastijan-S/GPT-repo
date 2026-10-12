const assert=require('assert/strict');
const {chromium}=require('C:/Users/Cebo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 for(const [name,route]of [['en',''],['sr','sr/']]) for(const width of [1440,390,320]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:4173/'+route);
  await page.evaluate(()=>document.fonts.ready);
  assert.equal(await page.locator('#who-we-help .help-grid > article').count(),4);
  assert.equal(await page.locator('.help-audience').count(),0);
  assert(await page.locator('.help-platform').innerText().then(t=>t.includes(name==='en'?'We choose the platform':'Platformu')));
  assert.equal(await page.locator('#contact .social-row a').count(),2);
  assert.equal(await page.locator('#contact .contact-address').getAttribute('href'),'mailto:sningenia@gmail.com');
  assert.equal(await page.locator('#contact h2 em').innerText(),name==='en'?'10-minute':'10 minuta');
  assert(!await page.locator('#contact').innerText().then(t=>/No email application|Kopirajte|clicking does not/.test(t)));
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  for(const [id,suffix]of [['who-we-help','services'],['contact','contact']]){
    await page.locator('#'+id).scrollIntoViewIfNeeded();
    await page.screenshot({path:`03-implementation/${name}-${suffix}-revised-${width}.png`});
  }
  await page.close();
 }
 await browser.close();console.log('Six EN/SR desktop/mobile layouts passed; service grid, contact links, copy and accent verified.');
})().catch(e=>{console.error(e);process.exit(1)});
