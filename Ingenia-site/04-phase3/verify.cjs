const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {chromium} = require('C:/Users/Cebo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const out = __dirname;
const base = 'http://127.0.0.1:4174/';
(async () => {
  const browser = await chromium.launch({channel:'chrome',headless:true});
  const results = [];
  for (const [lang,route] of [['en',''],['sr','sr/']]) {
    for (const width of [320,390,768,1024,1440]) {
      const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
      const errors=[]; page.on('pageerror',e=>errors.push(e.message));
      await page.goto(base+route);
      await page.evaluate(()=>document.fonts.ready);
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${lang} ${width} overflow`);
      assert.equal(await page.locator('form').count(),0);
      assert.equal(await page.locator('.project-card').count(),4);
      assert.equal(await page.locator('.project-card[data-demo="true"]').count(),3);
      assert.equal(await page.locator('#mobileCta').getAttribute('aria-hidden'),'true');
      if(width>900)assert(await page.evaluate(()=>document.querySelector('.nav-logo').getBoundingClientRect().right+8<=document.querySelector('.nav-links').getBoundingClientRect().left),'Header links clear the logo');
      await page.screenshot({path:path.join(out,`${lang}-${width}-hero.png`)});
      const work = page.locator('#work');
      await work.scrollIntoViewIfNeeded();
      await page.screenshot({path:path.join(out,`${lang}-${width}-work.png`)});
      if (width<=900) {
        await assert.doesNotReject(()=>page.waitForFunction(()=>document.querySelector('#mobileCta').getAttribute('aria-hidden')==='false'));
        const clearance=await page.evaluate(()=>parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--sticky-clearance')));
        assert(clearance>=await page.locator('#mobileCta').evaluate(e=>e.getBoundingClientRect().height));
        await page.locator('.nav-toggle').click();
        assert.equal(await page.locator('#mobileCta').getAttribute('aria-hidden'),'true');
        await page.locator('.mobile-nav a[href="#work"]').click();
        assert.equal(await page.evaluate(()=>document.activeElement.tagName),'H2');
        assert(new URL(page.url()).hash==='#work');
        await page.locator('.nav-toggle').click();
        await page.keyboard.press('Escape');
        assert.equal(await page.evaluate(()=>document.activeElement.className),'nav-toggle');
      }
      for (let i=0;i<4;i++) {
        const card=page.locator('.project-card').nth(i), button=card.locator('.card-open');
        const title=await card.locator('.card-title').innerText();
        const image=await card.getAttribute('data-image');
        await button.click();
        assert.equal(await page.locator('#modalTitle').innerText(),title);
        assert.equal(await page.locator('#modalImage').getAttribute('src'),image);
        await page.locator('#modalImage').evaluate(e=>e.decode());
        await page.waitForFunction(()=>!document.querySelector('#modalImage').classList.contains('is-loading'));
        assert(await page.locator('#modalImage').evaluate(e=>e.currentSrc===new URL(e.getAttribute('src'),document.baseURI).href));
        assert.equal(await page.locator('#mobileCta').getAttribute('aria-hidden'),'true');
        assert(await page.locator('#modalImage').evaluate(e=>e.getBoundingClientRect().top<innerHeight),`${lang} ${width} early image`);
        const crop=await page.locator('#modalImage').evaluate(e=>({h:e.getBoundingClientRect().height,w:e.getBoundingClientRect().width,nw:e.naturalWidth,nh:e.naturalHeight}));
        if(crop.nw)assert(Math.abs(crop.h/crop.w-crop.nh/crop.nw)<.01,'Dialog image is uncropped');
        assert.equal(await page.evaluate(()=>document.activeElement.id),'modalClose');
        if(i===1)await page.screenshot({path:path.join(out,`${lang}-${width}-dialog.png`)});
        await page.keyboard.press('Shift+Tab');
        assert(await page.evaluate(()=>document.activeElement.classList.contains('modal-call')));
        await page.keyboard.press('Tab');
        assert.equal(await page.evaluate(()=>document.activeElement.id),'modalClose');
        await page.locator('.modal-content').evaluate(e=>e.scrollTop=e.scrollHeight);
        await page.keyboard.press('Escape');
        assert.equal(await button.evaluate(e=>e===document.activeElement),true);
        assert.equal(await page.locator('#projectModal').getAttribute('inert'),'');
        await button.click();
        assert.equal(await page.locator('.modal-content').evaluate(e=>e.scrollTop),0,'Reopened dialog starts at top');
        await page.locator('.modal-call').click();
        assert(new URL(page.url()).hash==='#contact');
        await page.waitForFunction(()=>document.querySelector('#mobileCta').getAttribute('aria-hidden')==='true');
        assert.equal(await page.evaluate(()=>document.activeElement.tagName),'H2');
      }
      await page.locator('#contact').scrollIntoViewIfNeeded();
      await page.screenshot({path:path.join(out,`${lang}-${width}-contact.png`)});
      const mail=await page.locator('.contact-email-button').getAttribute('href');
      assert(mail.startsWith('mailto:sningenia@gmail.com?subject='));
      for(const selector of ['.contact-email-button','.footer-link','.faq-item summary'])assert(await page.locator(selector).first().evaluate(e=>e.getBoundingClientRect().height>=44),selector+' touch target');
      const faq=page.locator('.faq-item').first();
      await faq.locator('summary').click(); assert(await faq.getAttribute('open')!==null);
      assert.deepEqual(errors,[]);
      results.push({lang,width,overflow:false,dialogs:4,sticky:true,focus:true,errors});
      await page.close();
    }
    for(const mode of ['no-js','blocked-script','no-observers','zoom-200','default-motion','slow-image']) {
      const page=await browser.newPage({viewport:{width:mode==='zoom-200'?640:390,height:900},javaScriptEnabled:mode!=='no-js',reducedMotion:mode==='default-motion'?'no-preference':'reduce'});
      if(mode==='blocked-script') await page.route('**/script.js',r=>r.abort());
      if(mode==='no-observers')await page.addInitScript(()=>{delete window.IntersectionObserver;delete window.ResizeObserver;});
      let releaseImage;
      if(mode==='slow-image'){
        const gate=new Promise(resolve=>releaseImage=resolve);
        await page.route('**/images/case3.webp',async route=>{await gate;await route.continue();});
      }
      await page.goto(base+route+(mode==='default-motion'?'#contact':''));
      if(mode==='zoom-200')await page.evaluate(()=>document.documentElement.style.zoom='2');
      assert(await page.locator('h1').isVisible());
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
      assert(await page.locator('.contact-address').innerText()==='sningenia@gmail.com');
      if(mode==='no-js'||mode==='blocked-script'){
        assert(await page.locator('.fallback-navigation').isVisible());
        assert(!await page.locator('#mobileCta').isVisible());
      } else {
        await page.locator('.card-open').nth(mode==='slow-image'?1:0).click();
        if(mode==='slow-image'){
          assert.equal(await page.locator('#modalTitle').innerText(),'Invoko Cuts');
          assert.equal(await page.locator('#modalImage').isVisible(),false,'Do not show the preceding project while the new image loads');
          releaseImage();
          await page.locator('#modalImage').evaluate(e=>e.decode());
          await page.locator('#modalImage').waitFor({state:'visible'});
          assert(await page.locator('#modalImage').evaluate(e=>e.currentSrc.endsWith('/images/case3.webp')));
        }
        await page.keyboard.press('Escape');
        await page.locator('#contact').scrollIntoViewIfNeeded();
        await page.waitForFunction(()=>document.querySelector('#mobileCta').getAttribute('aria-hidden')==='true');
      }
      if(mode==='default-motion') {
        const animation=await page.locator('.hero-text').evaluate(e=>getComputedStyle(e).animationName);
        assert.equal(animation,'none');
      }
      if(mode==='zoom-200')await page.screenshot({path:path.join(out,`${lang}-zoom-200.png`)});
      results.push({lang,mode,passed:true}); await page.close();
    }
  }
  await browser.close();
  fs.writeFileSync(path.join(out,'checks.json'),JSON.stringify(results,null,2));
  console.log(`${results.length} responsive and resilience scenarios passed; 40 dialog journeys checked.`);
})().catch(e=>{console.error(e);process.exit(1)});
