const fs=require('fs');
const {chromium}=require('C:/Users/Cebo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({channel:'chrome',headless:true});
 for(const [name,route]of [['en',''],['sr','sr/']]){
  const page=await browser.newPage({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await page.goto('http://127.0.0.1:4173/'+route);
  await page.locator('#work').screenshot({path:'03-implementation/'+name+'-work.png'});
  await page.locator('.card-open').nth(1).click();
  await page.locator('#modalImage').evaluate(img=>img.decode());
  await page.screenshot({path:'03-implementation/'+name+'-dialog.png'});
  await page.keyboard.press('Escape');
  await page.locator('#contact').screenshot({path:'03-implementation/'+name+'-contact.png'});
  await page.close();
 }
 // Default motion and desktop focus paths supplement the reduced-motion checks.
 const page=await browser.newPage({viewport:{width:1440,height:900}});
 await page.goto('http://127.0.0.1:4173/');
 await page.locator('.nav-links a[href="#work"]').click();
 await page.waitForTimeout(700);
 if(!await page.locator('#work h2').evaluate(el=>el===document.activeElement))throw Error('Desktop focus');
 await page.locator('.card-open').first().click();
 await page.locator('.modal-backdrop').click({position:{x:5,y:5}});
 if(!await page.locator('.card-open').first().evaluate(el=>el===document.activeElement))throw Error('Backdrop focus');
 await browser.close();
 console.log('Detail screenshots, default-motion desktop focus and backdrop dismissal passed.');
})().catch(e=>{console.error(e);process.exit(1)});
