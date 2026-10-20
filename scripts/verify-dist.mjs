import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {siteRoutes,legacyRoutes} from '../src/routes.js';
import {siteConfig} from '../site.config.mjs';
const root=path.resolve(import.meta.dirname,'..'),dist=path.join(root,'dist');
const {origin,base}=siteConfig;
let checkedLinks=0,checkedFiles=0;const pages=[];
function existsWithExactCase(filename){
 let current=dist;
 for(const part of path.relative(dist,filename).split(path.sep).filter(Boolean)){
  if(!fs.readdirSync(current).includes(part))return false;
  current=path.join(current,part);
 }
 return true;
}
for(const route of siteRoutes){
 const filename=path.join(dist,route.path==='/'?'index.html':route.path.slice(1)+'/index.html');
 const html=fs.readFileSync(filename,'utf8');const dom=new JSDOM(html,{url:origin+base+route.path.slice(1)+'/'}),document=dom.window.document;
 assert.equal(document.querySelectorAll('h1').length,1,route.path+' must have one h1');
 assert.equal(document.documentElement.lang,route.lang);
 const expectedCanonical=origin+base+(route.path==='/'?'':route.path.slice(1)+'/');
 assert.equal(document.querySelector('link[rel=canonical]')?.href,expectedCanonical);
 assert.equal(document.querySelector('meta[property="og:url"]')?.content,expectedCanonical);
 assert.ok(document.querySelector('meta[name=description]')?.content);
 assert.ok(!/Dresden|\/diagnostics\//.test(html),route.path+' includes excluded content');
 assert.equal(document.querySelector('meta[name=robots]')?.content==='noindex',Boolean(route.draft),route.path+' indexing status');
 assert.equal(document.querySelector(`.footer-legal [href="${base}datenschutz/"]`)?.textContent,'Datenschutz');
 assert.equal(document.querySelector(`.footer-legal [href="${base}impressum/"]`)?.textContent,'Impressum');
 if(route.kind==='legal'){
  assert.equal(document.querySelectorAll('iframe').length,0);
  assert.equal(document.querySelectorAll('.legal-draft,.legal-pending').length,0);
  if(route.legalType==='privacy'){
   assert.ok(document.querySelector('a[href="https://www.lda.bayern.de/de/beschwerde.html"]'));
   assert.ok(document.querySelector('a[href="https://www.edpb.europa.eu/about-edpb/our-members_en"]'));
  }
 }
 for(const element of document.querySelectorAll('[href],[src],[poster]')){
  const value=element.getAttribute('href')||element.getAttribute('src')||element.getAttribute('poster');
  if(!value||/^(mailto:|tel:|data:|blob:)/.test(value))continue;
  if(value.startsWith('#')){assert.ok(document.getElementById(decodeURIComponent(value.slice(1))),route.path+' missing anchor '+value);continue;}
  const url=new URL(value,dom.window.location.href);if(url.origin!==origin)continue;
  if(!url.pathname.startsWith(base)&&/^https?:\/\//.test(value))continue;
  assert.ok(url.pathname.startsWith(base),'URL escapes '+base+': '+value);checkedLinks++;
  const relative=decodeURIComponent(url.pathname.slice(base.length));let target=path.join(dist,relative);
  if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
  assert.ok(fs.existsSync(target),route.path+' missing file '+value);
  assert.ok(existsWithExactCase(target),route.path+' wrong filename case '+value);checkedFiles++;
  if(url.hash&&target.endsWith('.html')){
   const targetDocument=target===filename?document:new JSDOM(fs.readFileSync(target,'utf8')).window.document;
   assert.ok(targetDocument.getElementById(decodeURIComponent(url.hash.slice(1))),route.path+' missing target anchor '+value);
  }
 }
 pages.push({path:route.path,language:route.lang,title:document.title,iframes:document.querySelectorAll('iframe').length});dom.window.close();
}
for(const alias of Object.keys(legacyRoutes))assert.ok(fs.existsSync(path.join(dist,alias.slice(1),'index.html')));
for(const file of ['404.html','.nojekyll','robots.txt','sitemap.xml'])assert.ok(fs.existsSync(path.join(dist,file)));
assert.ok(fs.readFileSync(path.join(dist,'robots.txt'),'utf8').includes('Sitemap: '+origin+base+'sitemap.xml'));
for(const entry of new JSDOM(fs.readFileSync(path.join(dist,'sitemap.xml'),'utf8'),{contentType:'text/xml'}).window.document.querySelectorAll('loc'))assert.ok(entry.textContent.startsWith(origin+base),'Sitemap URL escapes site base');
assert.ok(!fs.existsSync(path.join(dist,'projects/dresden')));
const report={base,pages,legacyRedirects:Object.keys(legacyRoutes).length,checkedLinks,checkedFiles,diagnosticsExcluded:true,dresdenExcluded:true};
fs.writeFileSync(path.join(dist,'release-check.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
