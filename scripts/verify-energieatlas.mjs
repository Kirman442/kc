import fs from 'node:fs';
import assert from 'node:assert/strict';
import {JSDOM} from 'jsdom';
import {parseStoryMarkdown} from '../src/energieatlas-markdown.js';
const source=fs.readFileSync(new URL('../src/content/energieatlas-story-de.md',import.meta.url),'utf8');
const html=fs.readFileSync(new URL('../dist/projects/energieatlas/index.html',import.meta.url),'utf8');
const document=new JSDOM(html).window.document;
const normalize=text=>text.replace(/\s+/g,' ').trim();
const plain=text=>text.replace(/\[([^\]]+)\]\([^\s]+\)/g,'$1').replace(/\*\*|`/g,'');
const actual=normalize(document.querySelector('.energy-page').textContent);
let fragments=0;
for(const block of parseStoryMarkdown(source)){
  const texts=block.type==='paragraph'?[block.text]:block.type==='list'?block.items:block.type==='table'?[...block.rows.flat()]:[];
  for(let text of texts){text=text.replace(/^\*\*(Mein Beitrag|Werkzeuge):\*\*\s*/,'');assert.ok(actual.includes(normalize(plain(text))),'Missing source text: '+text.slice(0,110));fragments++;}
}
assert.equal(document.documentElement.lang,'de');
assert.ok(!/[А-Яа-яЁё]/.test(actual),'Russian text remains on the German page');
const ruSource=fs.readFileSync(new URL('../src/content/energieatlas-story-ru.md',import.meta.url),'utf8');
const urls=text=>[...text.matchAll(/\]\(([^\s]+)\)/g)].map(match=>match[1]).sort();
const additionalSourceUrls=['https://carto.com/about-carto/','https://www.openstreetmap.org/copyright'];
assert.deepEqual(urls(source).filter(url=>!additionalSourceUrls.includes(url)),urls(ruSource),'Original source and package links must be preserved');
for(const url of additionalSourceUrls)assert.ok(urls(source).includes(url));
assert.equal(document.querySelectorAll('.energy-article>h2[id^=energy-story-]').length,6);
assert.equal(document.querySelectorAll('.appendix-section').length,6);
assert.ok([...document.querySelectorAll('.appendix-note-content')].every(node=>node.hidden));
assert.equal(document.querySelectorAll('.mobile-network-documentation:not([open])').length,3);
const disclosures=[...document.querySelectorAll('.mobile-network-documentation')];
assert.deepEqual(disclosures.map(node=>node.querySelector('summary').textContent),['Daten und Methodik','Pakete und Bibliotheken','Dokumentation und weiterführende Materialien']);
const libraries=disclosures[1],documentation=disclosures[2];
assert.equal(libraries.querySelectorAll('dt').length,13);
assert.equal(libraries.querySelectorAll('dt a').length,21);
assert.equal(libraries.querySelectorAll('dd a').length,0);
for(const name of ['Apache Parquet','GeoParquet','MDN - SubtleCrypto.digest','MDN - AbortController']){
 assert.equal([...libraries.querySelectorAll('dt')].filter(node=>node.textContent===name).length,1,name+' must appear once in libraries');
 assert.ok(!documentation.textContent.includes(name),name+' must leave documentation');
}
for(const removed of ['React Router','Качество и охват','Техническое приложение этой истории','Коллеги по интерфейсу','Подготовка данных не означает автоматической замены','AGS хранится строкой','Переход приложения на Arrow'])assert.ok(!actual.includes(removed),'Removed text remains: '+removed);
assert.ok(actual.includes('Richard Sorge'));
assert.ok(actual.includes('Anlagenstatus und die gemeldete Leistung im jeweils ausgewerteten Registerstand'));
assert.ok(!actual.includes('\u2014'),'Long dashes must be replaced throughout the EnergieAtlas story');
assert.ok(!document.title.includes('\u2014'),'Long dash must be replaced in the EnergieAtlas title');
assert.ok(actual.includes('Hanau/Main-Kinzig-Kreis'));
assert.equal(document.querySelector('.sources-container').children[1].querySelector('h3')?.textContent,'Projektbeteiligte');
assert.ok(!actual.includes('Решения и приёмка результатов оставались за автором проекта.'));
assert.ok(actual.includes('nachfolgend aufgeführten Datensätze, methodischen Unterlagen und Werkzeuge.'));
assert.equal(document.querySelector('iframe').getAttribute('src'),'https://kirman442.github.io/energie-atlas/');
assert.notEqual(document.querySelector('meta[name=robots]')?.content,'noindex');
assert.ok(fs.readFileSync(new URL('../dist/sitemap.xml',import.meta.url),'utf8').includes('/projects/energieatlas'));
console.log(`EnergieAtlas: ${fragments} source fragments preserved; 6 technical notes, documentation disclosure and public iframe checked.`);
