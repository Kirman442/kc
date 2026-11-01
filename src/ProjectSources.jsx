import React from 'react';
import DocumentationDetails from './DocumentationDetails.jsx';
import './project-sources.css';

export default function ProjectSources({locale='de',credits,data,libraries,documentation}){
  const en=locale==='en';
  return <div className="project-sources" lang={locale}><h2 id="sources">{en?'Sources and documentation':'Quellen und Dokumentation'}</h2>
    <section className="project-source-contributors"><h3>{en?'Project contributors':'Projektbeteiligte'}</h3>{credits}</section>
    <DocumentationDetails title={en?'Data and methodology':'Daten und Methodik'}>{data}</DocumentationDetails>
    <DocumentationDetails title={en?'Packages and libraries':'Pakete und Bibliotheken'}>{libraries}</DocumentationDetails>
    <DocumentationDetails title={en?'Documentation and background reading':'Dokumentation und weiterführende Materialien'}>{documentation}</DocumentationDetails>
  </div>;
}

export function sourceGroups(blocks){
  const groups=[];
  for(const block of blocks){
    if(block.type==='heading'&&block.level===3)groups.push({title:block.text,blocks:[]});
    else if(groups.length)groups.at(-1).blocks.push(block);
  }
  const find=pattern=>groups.find(group=>pattern.test(group.title))?.blocks||[];
  const result={credits:find(/credits|beteiligte/i),data:find(/Datenquellen|Daten und/i),libraries:find(/Pakete/),documentation:find(/Dokumentation/)};
  // Charging's source references previously shared a single documentation list.
  if(!result.data.length&&result.documentation[0]?.type==='list'){
    const [list,...rest]=result.documentation;
    result.data=[{...list,items:list.items.slice(0,4)}];
    result.documentation=[{...list,items:list.items.slice(4)},...rest];
  }
  return result;
}

function linkedTitle(name,references=''){
  if(name.includes(']('))return name;
  const links=[...references.matchAll(/\[([^\]]+)\]\(([^\s]+)\)/g)];
  if(!links.length)return name;
  const matching=links.filter(([,label])=>name.includes(label));
  if(matching.length){let title=name;for(const [token,label]of matching)title=title.replace(label,token);const other=links.filter(link=>!matching.includes(link));return title+(other.length?' · '+other.map(link=>link[0]).join(' · '):'');}
  return `[${name}](${links[0][2]})`+(links.length>1?' · '+links.slice(1).map(link=>link[0]).join(' · '):'');
}

export function SourceBlocks({blocks,Inline,credits=false}){
  return blocks.map((block,i)=>{
    if(block.type==='paragraph')return <p key={i}><Inline text={block.text}/></p>;
    if(block.type==='heading'){const Heading=block.level===4?'h4':'h3';return <Heading key={i}>{block.text}</Heading>;}
    if(block.type==='list'&&credits)return <ul className="project-source-credits" key={i}>{block.items.map((item,j)=><li key={j}><Inline text={item}/></li>)}</ul>;
    const rows=block.type==='table'?block.rows.map(row=>[linkedTitle(row[0],row[2]),row[1]]):block.type==='list'?block.items.map(item=>{const match=item.match(/^(.+?\*\*)\s+[–-]\s+(.+)$/);return match?[match[1],match[2]]:[item,''];}):null;
    if(rows)return <dl className="mobile-network-resources" key={i}>{rows.map(([name,description],j)=><div className="mobile-network-resource" key={j}><dt><Inline text={name}/></dt><dd><Inline text={description}/></dd></div>)}</dl>;
    return null;
  });
}
