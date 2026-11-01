import fs from 'node:fs';
import path from 'node:path';
import {createRequire} from 'node:module';
import {build} from 'esbuild';
import {siteRoutes,legacyRoutes} from '../src/routes.js';
import {siteConfig} from '../site.config.mjs';
const root=path.resolve(import.meta.dirname,'..'),dist=path.join(root,'dist');
const {base,origin}=siteConfig;
const template=fs.readFileSync(path.join(dist,'index.html'),'utf8');
const compiled=await build({stdin:{contents:"import React from 'react';import {renderToString} from 'react-dom/server';import {App} from './src/App.jsx';export function render(pathname){return renderToString(React.createElement(App,{pathname}));}",resolveDir:root,loader:'jsx'},bundle:true,platform:'node',format:'cjs',write:false,jsx:'automatic',define:{'import.meta.env.BASE_URL':JSON.stringify(base)},loader:{'.css':'empty','.md':'text'}});
const module={exports:{}};new Function('require','module','exports',compiled.outputFiles[0].text)(createRequire(import.meta.url),module,module.exports);
const escape=text=>text.replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const canonical=route=>origin+base+(route.path==='/'?'':route.path.slice(1)+'/');
function page(route){
 const html=template.replace('<html lang="de">',`<html lang="${route.lang}">`).replace(/<title>[^<]*<\/title>/,`<title>${escape(route.title)}</title>`).replace('</head>',`<meta name="description" content="${escape(route.description)}"><link rel="canonical" href="${canonical(route)}"><meta property="og:type" content="website"><meta property="og:title" content="${escape(route.title)}"><meta property="og:description" content="${escape(route.description)}"><meta property="og:url" content="${canonical(route)}"></head>`).replace('<div id="root"></div>',`<div id="root">${module.exports.render(route.path)}</div>`);
 const destination=path.join(dist,route.path==='/'?'index.html':route.path.slice(1)+'/index.html');
 fs.mkdirSync(path.dirname(destination),{recursive:true});fs.writeFileSync(destination,route.draft?html.replace('</head>','<meta name="robots" content="noindex"></head>'):html);
}
for(const route of siteRoutes)page(route);
for(const [oldPath,newPath]of Object.entries(legacyRoutes)){
 const destination=path.join(dist,oldPath.slice(1),'index.html');fs.mkdirSync(path.dirname(destination),{recursive:true});
 const target=base+(newPath==='/'?'':newPath.slice(1)+'/');
 fs.writeFileSync(destination,`<!doctype html><html lang="de"><meta charset="UTF-8"><meta name="robots" content="noindex"><title>Karten &amp; Code</title><link rel="canonical" href="${origin+target}"><script>location.replace(${JSON.stringify(target)}+location.search+location.hash)</script><p><a href="${target}">Zur Projektgeschichte</a></p></html>`);
}
const notFound={path:'/not-found',lang:'de',title:'Seite nicht gefunden - Karten & Code',description:'Diese Seite wurde nicht gefunden.'};
const html404=template.replace(/<title>[^<]*<\/title>/,`<title>${notFound.title}</title>`).replace('</head>','<meta name="robots" content="noindex"></head>').replace('<div id="root"></div>',`<div id="root">${module.exports.render(notFound.path)}</div>`);
fs.writeFileSync(path.join(dist,'404.html'),html404);
fs.writeFileSync(path.join(dist,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+siteRoutes.filter(route=>!route.draft).map(route=>`<url><loc>${canonical(route)}</loc></url>`).join('')+'</urlset>\n');
console.log(`Rendered ${siteRoutes.length} pages, ${Object.keys(legacyRoutes).length} legacy redirects, sitemap and 404.`);
