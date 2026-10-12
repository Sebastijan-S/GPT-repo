const path=require('node:path');
const {chromium}=require('C:/Users/Cebo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 for(const [lang,route] of [['en',''],['sr','sr/']])for(const width of [320,390,768,1024,1440]){
  const page=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:4174/'+route);
  await page.evaluate(()=>document.fonts.ready);
  await page.locator('.card-open').nth(1).click();
  await page.locator('#modalImage').evaluate(e=>e.decode());
  await page.screenshot({path:path.join(__dirname,`${lang}-${width}-dialog.png`)});
  await page.close();
 }
 await browser.close();console.log('Captured dialog opening views before keyboard focus checks scroll to the final action.');
})().catch(e=>{console.error(e);process.exit(1)});
