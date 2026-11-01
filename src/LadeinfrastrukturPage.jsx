import { siteUrl } from "./site-paths.js";import React, { useEffect } from 'react';
import { Arrow, Contours } from './components.jsx';
import MapEmbed from './MapEmbed.jsx';
import ProjectNavigation from './ProjectNavigation.jsx';
import ChargingTechnical, { ChargingTechnicalLink } from './ChargingTechnical.jsx';
import { AppendixProvider } from './TechnicalAppendix.jsx';
import content from './ladeinfrastruktur-content.js';
import DocumentationDetails, { documentationStart } from './DocumentationDetails.jsx';
import ProjectSources, {sourceGroups, SourceBlocks} from './ProjectSources.jsx';
import './full-article.css';
import './ladeinfrastruktur.css';

function Inline({ text }) {
  return text.split(/(\*\*.+?\*\*|\[[^\]]+\]\([^\s]+\)|`[^`]+`)/g).map((part, i) => {
    if (part.startsWith('**')) return <strong key={i}><Inline text={part.slice(2, -2)} /></strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^\s]+)\)$/);
    if (link) return <a key={i} href={siteUrl(link[2])} target="_blank" rel="noopener noreferrer">{link[1]}</a>;
    if (part.startsWith('`')) return <code key={i}>{part.slice(1, -1)}</code>;
    return part;
  });
}
function Blocks({ blocks }) {
  const documentation = documentationStart(blocks);
  if (documentation >= 0) return <><Blocks blocks={blocks.slice(0, documentation)} /><DocumentationDetails title={blocks[documentation].text}><Blocks blocks={blocks.slice(documentation + 1)} /></DocumentationDetails></>;
  return blocks.map((block, i) => {
    if (block.type === 'paragraph') return <p key={i}><Inline text={block.text} /></p>;
    if (block.type === 'heading') return <h3 key={i}>{block.text}</h3>;
    if (block.type === 'list') return <dl className="mobile-network-resources charging-resources" key={i}>{block.items.map((item, j) => {
        const split = item.match(/\*\* – /).index + 2;
        return <div className="mobile-network-resource" key={j}><dt><Inline text={item.slice(0, split)} /></dt><dd><Inline text={item.slice(split + 3)} /></dd></div>;
      })}</dl>;
    return null;
  });
}
export default function LadeinfrastrukturPage() {
  const sources=sourceGroups(content.sources.blocks);
  useEffect(() => {document.title = 'Ladeinfrastruktur - Karten & Code';}, []);
  return <>
    <section className="cover project-cover charging-cover" aria-labelledby="project-title"><img className="cover-image" src={siteUrl("/assets/ladeinfrastruktur-hero.webp")} alt="Ladeplatz mit Schnellladesäulen an einer Autobahn in der Abenddämmerung" width="2400" height="1200" /><div className="cover-shade" /><Contours className="cover-contours" /><div className="cover-grid" aria-hidden="true" /><div className="container cover-inner"><div className="cover-top"><a href={siteUrl("/home#projekte")}><Arrow direction="left" /> Projektübersicht</a><span className="mono">Projektgeschichte / 2026</span></div><div className="cover-copy"><p className="eyebrow">Web-GIS / Mobilität / Geodaten</p><h1 id="project-title">Ladeinfrastruktur</h1><p className="cover-intro">Ein Blick auf Versorgung und Erreichbarkeit</p></div><div className="cover-foot mono"><span>Deutschland / BNetzA · KBA · BKG · OSM</span><span>67.680 Ladestandorte / 208.570 Ladepunkte</span></div></div></section>
    <section className="container overview charging-overview" aria-label="Projekt auf einen Blick"><dl className="project-facts"><div><dt>Mein Beitrag</dt><dd>Idee, Daten & Analyse<br />Gestaltung & Entwicklung</dd></div><div><dt>Werkzeuge</dt><dd>React / deck.gl / MapLibre<br />Python / Parquet / Web Workers</dd></div><div><dt>Veröffentlicht</dt><dd><time dateTime="2026-10-19">19. Oktober 2026</time></dd></div></dl><div className="full-project-actions"><a className="button" href={siteUrl("#map")}>Anwendung öffnen <Arrow direction="down" /></a></div></section>
    <AppendixProvider><div className="container full-layout" lang="de"><aside className="full-contents" aria-label="Inhaltsverzeichnis"><span className="eyebrow">In dieser Geschichte</span>{content.narrative.map((section, i) => <a key={section.id} href={siteUrl('#' + section.id)}><span className="mono contents-number">{String(i + 1).padStart(2, '0')}</span>{section.title}</a>)}<a href={siteUrl("#map")}>Anwendung ↗</a><a href={siteUrl("#technical-appendix")}>Technical appendix</a><a href={siteUrl("#sources")}>Quellen und Dokumentation</a></aside><article className="full-reading"><div className="mobile-network-article migrated-article charging-article">{content.narrative.map((section) => <React.Fragment key={section.id}><h2 id={section.id}>{section.title}</h2><Blocks blocks={section.blocks} /><ChargingTechnicalLink sectionTitle={section.title} /></React.Fragment>)}<h2 id="map">Ladeinfrastruktur erkunden</h2><MapEmbed url="https://kirman442.github.io/charging-points/" title="Ladeinfrastruktur Deutschland" caption="Versorgung, Fahrzeugbestand und experimentelle Autobahnrouten" /><ChargingTechnical topics={content.topics} Inline={Inline} /><div className="sources-container charging-sources"><ProjectSources credits={<SourceBlocks blocks={sources.credits} Inline={Inline} credits/>} data={<SourceBlocks blocks={sources.data} Inline={Inline}/>} libraries={<SourceBlocks blocks={sources.libraries} Inline={Inline}/>} documentation={<SourceBlocks blocks={sources.documentation} Inline={Inline}/>}/></div></div></article></div></AppendixProvider>
    <ProjectNavigation projectId="charging" />
  </>;
}
