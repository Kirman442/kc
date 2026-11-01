import React from 'react';
import source from './content/energieatlas-story-de.md?raw';
import {splitStory} from './energieatlas-markdown.js';
import {siteUrl} from './site-paths.js';
import {Arrow} from './components.jsx';
import {AppendixProvider,AppendixLinks,AppendixSection,TechnicalAppendix} from './TechnicalAppendix.jsx';
import DocumentationDetails from './DocumentationDetails.jsx';
import MapEmbed from './MapEmbed.jsx';
import './full-article.css';
import './unfallatlas-trial.css';
import './energieatlas.css';

export const energieatlasStory=splitStory(source);
function Inline({text}){
  return text.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\([^\s]+\)|`[^`]+`)/g).map((token,i)=>{
    if(token.startsWith('**'))return <strong key={i}><Inline text={token.slice(2,-2)}/></strong>;
    if(token.startsWith('`'))return <code key={i}>{token.slice(1,-1)}</code>;
    const link=token.match(/^\[([^\]]+)\]\(([^\s]+)\)$/);
    if(link){const external=/^https?:/.test(link[2]);return <a key={i} href={siteUrl(link[2])} {...external?{target:'_blank',rel:'noopener noreferrer'}:{}}>{link[1]}</a>;}
    return token;
  });
}
function Blocks({blocks,resources=false}){
  return blocks.map((block,i)=>{
    if(block.type==='paragraph')return <p key={i}><Inline text={block.text}/></p>;
    if(block.type==='heading'){const Heading=block.level===4?'h4':'h3';return <Heading key={i}><Inline text={block.text}/></Heading>;}
    if(block.type==='list')return <ul className="energy-source-list" key={i}>{block.items.map((text,j)=><li key={j}><Inline text={text}/></li>)}</ul>;
    if(block.type==='table')return resources?<dl className="mobile-network-resources trial-resources" key={i}>{block.rows.map((row,j)=><div className="mobile-network-resource" key={j}><dt><Inline text={row[0]}/></dt><dd>{row.slice(1).map((text,k)=><p key={k}><Inline text={text}/></p>)}</dd></div>)}</dl>:<div className="mobile-network-table-scroll" key={i} role="region" tabIndex={0} aria-label={block.headers.join(' / ')}><table className="mobile-network-table"><thead><tr>{block.headers.map((text,j)=><th scope="col" key={j}><Inline text={text}/></th>)}</tr></thead><tbody>{block.rows.map((row,j)=><tr key={j}>{row.map((text,k)=><td key={k}><Inline text={text}/></td>)}</tr>)}</tbody></table></div>;
    return null;
  });
}
const references=[[1],[1,3],[2,3],[4,5],[6],[]];
export default function EnergieatlasPage(){
  const story=energieatlasStory;
  return <div className="energy-page" lang="de">
    <section className="cover energy-cover" aria-labelledby="project-title"><img className="cover-image" src={siteUrl('/assets/energieatlas-aerial-coast-v1.png')} alt="Luftbildillustration einer Küstenlandschaft mit Solarmodulen auf Dächern sowie Windenergieanlagen an Land und auf See" width="1774" height="887" fetchpriority="high"/><div className="cover-shade"/><div className="cover-grid" aria-hidden="true"/><div className="container cover-inner"><div className="cover-top"><a href={siteUrl('/#projekte')}><Arrow direction="left"/> Alle Projekte</a><span className="mono">Projektgeschichte / 2026</span></div><div className="cover-copy"><p className="eyebrow">Energie / Räumliche Analyse</p><h1 id="project-title">{story.title}</h1><p className="cover-intro">{story.subtitle}</p></div><div className="cover-foot mono"><span>{story.context}</span><span>Von Deutschland bis zum einzelnen Dach</span></div></div></section>
    <section className="container overview energy-overview" aria-label="Über das Projekt"><dl className="project-facts"><div><dt>Mein Beitrag</dt><dd><Inline text={story.contribution.replace(/^\*\*Mein Beitrag:\*\*\s*/,'')}/></dd></div><div><dt>Werkzeuge</dt><dd><Inline text={story.tools.replace(/^\*\*Werkzeuge:\*\*\s*/,'')}/></dd></div></dl><div className="full-project-actions"><a className="button" href="#map">Anwendung öffnen <Arrow direction="down"/></a></div></section>
    <AppendixProvider><div className="container full-layout"><aside className="full-contents" aria-label="Inhaltsverzeichnis"><span className="eyebrow">In dieser Geschichte</span>{story.narrative.map((section,i)=><a href={'#'+section.id} key={section.id}><span className="mono contents-number">{String(i+1).padStart(2,'0')}</span>{section.title}</a>)}<a href="#map">Anwendung ↗</a><a href="#technical-appendix">Technischer Anhang</a><a href="#sources">Quellen und Dokumentation</a></aside><article className="full-reading"><div id="story-start" className="mobile-network-article migrated-article trial-article energy-article">
      {story.narrative.map((section,i)=><React.Fragment key={section.id}><h2 id={section.id}>{section.title}</h2><Blocks blocks={section.blocks}/>{references[i]?.length>0&&<AppendixLinks items={references[i].map(number=>({target:story.notes[number-1].id,origin:`energy-reading-${i+1}-${number}`,label:story.notes[number-1].title}))}/>}</React.Fragment>)}
      <h2 id="map">EnergieAtlas erkunden</h2><MapEmbed url="https://kirman442.github.io/energie-atlas/" title="EnergieAtlas" caption="Deutschland / Solar- und Windenergie"/>
      <h2 id="technical-appendix">Technischer Anhang</h2><TechnicalAppendix description="Datenaufbereitung, geografische Prüfungen, Vergleiche und Bereitstellung im Browser. Die Links in der Geschichte öffnen jeweils den passenden technischen Hinweis.">{story.notes.map(note=><AppendixSection id={note.id} title={note.title} key={note.id}><Blocks blocks={note.blocks}/></AppendixSection>)}</TechnicalAppendix>
      <div className="sources-container trial-sources"><h2 id="sources">Quellen und Dokumentation</h2>{story.sourceGroups.map(group=>group.title==='Projektbeteiligte'?<section key={group.id}><h3>{group.title}</h3><Blocks blocks={group.blocks} resources/></section>:<DocumentationDetails key={group.id} title={group.title}><Blocks blocks={group.blocks} resources/></DocumentationDetails>)}<DocumentationDetails title="Dokumentation und weiterführende Materialien"><Blocks blocks={story.documentation} resources/></DocumentationDetails></div>
    </div></article></div></AppendixProvider>
    <div className="container energy-end"><a className="quiet-link" href={siteUrl('/#projekte')}>← Zurück zu den Projekten</a></div>
  </div>;
}
