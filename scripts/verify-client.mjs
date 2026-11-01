import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
import {JSDOM,VirtualConsole} from 'jsdom';import {siteRoutes} from '../src/routes.js';
import {siteConfig} from '../site.config.mjs';
const root=path.resolve(import.meta.dirname,'..'),dist=path.join(root,'dist');
const checks=[];
for(const route of siteRoutes){
 const filename=path.join(dist,route.path==='/'?'index.html':route.path.slice(1)+'/index.html');
 const html=fs.readFileSync(filename,'utf8'),errors=[];
 const console=new VirtualConsole();console.on('error',(...args)=>errors.push(args.join(' ')));console.on('jsdomError',error=>errors.push(error.message));
 const dom=new JSDOM(html,{url:siteConfig.origin+siteConfig.base+route.path.slice(1),runScripts:'outside-only',pretendToBeVisual:true,virtualConsole:console});
 const {window}=dom;window.matchMedia=()=>({matches:false,addEventListener(){},removeEventListener(){}});
 window.HTMLElement.prototype.scrollIntoView=()=>{};
 const matches=window.HTMLElement.prototype.matches;
 window.HTMLElement.prototype.matches=function(selector){return selector===':modal'?this.dataset.modal==='true':matches.call(this,selector);};
 window.HTMLDialogElement.prototype.showModal=function(){this.open=true;this.dataset.modal='true';};
 window.HTMLDialogElement.prototype.close=function(){this.open=false;delete this.dataset.modal;};
 const before=window.document.querySelector('h1').textContent;
 const scriptUrl=window.document.querySelector('script[type=module]').getAttribute('src');
 assert.ok(scriptUrl.startsWith(siteConfig.base),'Client script escapes site base');
 const script=fs.readFileSync(path.join(dist,scriptUrl.slice(siteConfig.base.length)),'utf8');
 // Allow cold hydration and its initial hash-restoration effect to finish before clicks.
 window.eval(script);await new Promise(resolve=>setTimeout(resolve,500));
 assert.equal(window.document.querySelector('h1').textContent,before,route.path+' changed route during hydration');
 assert.deepEqual(errors,[],route.path+' client errors');
 assert.equal(window.document.body.style.overflow,'');
 if(route.path==='/'){
  assert.equal(window.document.querySelectorAll('.home-project-card').length,10);
  assert.equal(window.document.querySelector('.home-project-card').dataset.projectId,'energieatlas');
  assert.equal(window.document.querySelector('.home-featured .featured-map').getAttribute('href'),'/kc/projects/ladeinfrastruktur');
  const button=[...window.document.querySelectorAll('.project-filters button')].find(item=>item.textContent==='3D & Geodaten');button.click();await new Promise(resolve=>setTimeout(resolve,20));
  assert.equal(window.document.querySelector('.project-count').textContent,'1 Projekt');
  const trigger=window.document.querySelector('.projects-trigger');trigger.click();await new Promise(resolve=>setTimeout(resolve,20));
  assert.equal(window.document.querySelector('.projects-panel').hidden,false);assert.equal(window.document.querySelectorAll('.projects-panel li').length,11);
 }
 if(route.path==='/projects/ladeinfrastruktur'){
  const frame=window.document.querySelector('iframe');window.document.querySelector('.embed-actions button').click();await new Promise(resolve=>setTimeout(resolve,20));
  assert.equal(window.document.querySelector('iframe'),frame);assert.equal(window.document.body.style.overflow,'hidden');
  window.document.querySelector('dialog').dispatchEvent(new window.KeyboardEvent('keydown',{key:'Escape',bubbles:true,cancelable:true}));await new Promise(resolve=>setTimeout(resolve,20));
  assert.equal(window.document.querySelector('iframe'),frame);assert.equal(window.document.body.style.overflow,'');
 }
 if(route.path==='/projects/energieatlas'){
  const link=window.document.querySelector('.energy-article>.appendix-reference a');
  const target=link.getAttribute('href').slice(1);link.click();await new Promise(resolve=>setTimeout(resolve,25));
  assert.equal(window.document.querySelectorAll('.appendix-note-content:not([hidden])').length,1);
  assert.equal(window.document.getElementById(target+'-content').hidden,false);
  window.document.querySelector('.appendix-introduction .appendix-return').click();await new Promise(resolve=>setTimeout(resolve,25));
  assert.equal(window.document.querySelectorAll('.appendix-note-content:not([hidden])').length,0);
  assert.equal(window.document.activeElement.id,link.id);
  assert.equal(window.document.querySelector('.embed-actions a').textContent,'Separat öffnen ↗');
 }
 assert.deepEqual(errors,[],route.path+' interaction errors');
 checks.push({path:route.path,hydration:'passed'});dom.window.close();
}
fs.mkdirSync(path.join(root,'.build'),{recursive:true});fs.writeFileSync(path.join(root,'.build/client-check.json'),JSON.stringify({environment:'Production JavaScript in jsdom; no GPU, external apps or visual layout checks',checks},null,2)+'\n');
console.log(`Production client hydration passed for ${checks.length} pages; catalogue/menu/full-screen interactions passed.`);process.exit(0);
