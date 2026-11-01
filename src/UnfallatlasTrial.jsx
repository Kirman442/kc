import { siteUrl } from "./site-paths.js";import React, { useEffect } from 'react';
import { Arrow, Contours } from './components.jsx';
import { AppendixProvider, AppendixLink, TechnicalAppendix, AppendixSection } from './TechnicalAppendix.jsx';
import CodeBlock from './CodeBlock.jsx';
import MapEmbed from './MapEmbed.jsx';
import ProjectNavigation from './ProjectNavigation.jsx';
import content from './unfallatlas-trial-content.js';
import DocumentationDetails, { documentationStart } from './DocumentationDetails.jsx';
import './full-article.css';
import './unfallatlas-trial.css';

function Inline({ text }) {
  const tokens = text.split(/(\[[^\]]+\]\([^\s]+\)|`[^`]+`|\*\*[^*]+\*\*)/g);
  return tokens.map((token, i) => {
    const link = token.match(/^\[([^\]]+)\]\(([^\s]+)\)$/);
    if (link) {
      const [, label, url] = link;
      if (url.startsWith('#appendix-note-')) return <AppendixLink key={i} target={url.slice(1)} origin={'reading-' + url.slice(1)}>{label.replace(/^Technische Notiz:/, "Technischer Hinweis:")}</AppendixLink>;
      const href = url === 'https://kirman442.github.io/gis/portfolio/Accidents' ? '/projects/accidents' : url;
      const external = /^https?:/.test(href);
      return <a key={i} href={siteUrl(href)} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>{label}</a>;
    }
    if (token.startsWith('`')) return <code key={i}>{token.slice(1, -1)}</code>;
    if (token.startsWith('**')) return <strong key={i}>{token.slice(2, -2)}</strong>;
    return token;
  });
}
function Blocks({ blocks, resources = false }) {
  const documentation = documentationStart(blocks);
  if (documentation >= 0) return <><Blocks blocks={blocks.slice(0, documentation)} resources={resources} /><DocumentationDetails title={blocks[documentation].text}><Blocks blocks={blocks.slice(documentation + 1)} resources={resources} /></DocumentationDetails></>;
  return blocks.map((block, i) => {
    if (block.type === 'paragraph') {
      const references = block.text.includes('](#appendix-note-');
      return references ? <div className="trial-note-links" key={i}><Inline text={block.text} /></div> : <p key={i}><Inline text={block.text} /></p>;
    }
    if (block.type === 'heading') return block.level === 4 ? <h4 key={i}>{block.text}</h4> : <h3 key={i}>{block.text}</h3>;
    if (block.type === 'code') return <CodeBlock key={i} code={block.code} language={block.language} />;
    if (block.type === 'list') return <ul className="trial-credits" key={i}>{block.items.map((item, j) => <li key={j}><Inline text={item} /></li>)}</ul>;
    if (block.type === 'table') return resources ? <dl className="mobile-network-resources trial-resources" key={i}>{block.rows.map((row, j) => <div className="mobile-network-resource" key={j}><dt><Inline text={row[0]} /></dt><dd><Inline text={row[1]} />{row[2] && <div className="trial-source-links"><Inline text={row[2]} /></div>}</dd></div>)}</dl> : <div className="mobile-network-table-scroll" key={i} role="region" aria-label={block.headers.join(' / ')} tabIndex={0}><table className="mobile-network-table"><thead><tr>{block.headers.map((cell, j) => <th key={j} scope="col">{cell}</th>)}</tr></thead><tbody>{block.rows.map((row, j) => <tr key={j}>{row.map((cell, k) => <td key={k}><Inline text={cell} /></td>)}</tr>)}</tbody></table></div>;
    return null;
  });
}
export default function UnfallatlasTrial() {
  useEffect(() => {document.title = 'Unfallatlas Deutschland - Karten & Code';}, []);
  return <>
    <section className="cover project-cover trial-cover" lang="de" aria-labelledby="project-title"><img className="cover-image" src={siteUrl("/assets/hero-real-world-to-data-v1.webp")} alt="Von der Straße zur Datenanalyse: Deutschlandkarte, Unfallereignisse und Diagramme" width="2400" height="1200" /><div className="cover-shade" /><Contours className="cover-contours" /><div className="cover-grid" aria-hidden="true" /><div className="container cover-inner"><div className="cover-top"><a href={siteUrl("/home#projekte")}><Arrow direction="left" /> Projektübersicht</a><span className="mono">Projektgeschichte / 2026</span></div><div className="cover-copy"><p className="eyebrow">Web-GIS / Analyse / Geodaten</p><h1 id="project-title">Unfallatlas<br /><em>Deutschland.</em></h1><p className="cover-intro">Von der Unfallkarte zum Analysewerkzeug</p></div><div className="cover-foot mono"><span>2020–2025 / Deutschland</span><span>Rund 1,54 Mio. Datensätze / 400 Kreisgebiete</span></div></div></section>
    <section className="container overview trial-overview" lang="de" aria-label="Projekt auf einen Blick"><dl className="project-facts"><div><dt>Mein Beitrag</dt><dd>Idee, Daten & Analyse<br />Gestaltung & Entwicklung</dd></div><div><dt>Werkzeuge</dt><dd>React / deck.gl / MapLibre<br />Python / Arrow IPC / Brotli</dd></div><div><dt>Veröffentlicht</dt><dd><time dateTime="2026-10-19">19. Oktober 2026</time></dd></div></dl><div className="full-project-actions"><a className="button" href={siteUrl("#map")}>Anwendung öffnen <Arrow direction="down" /></a></div></section>
    <AppendixProvider><div className="container full-layout" lang="de"><aside className="full-contents" aria-label="Inhaltsverzeichnis"><span className="eyebrow">In dieser Geschichte</span>{content.narrative.map((section, i) => <a href={siteUrl('#' + section.id)} key={section.id}><span className="mono contents-number">{String(i + 1).padStart(2, '0')}</span>{section.title}</a>)}<a href={siteUrl("#map")}>Anwendung ↗</a><a href={siteUrl("#technical-appendix")}>Technical appendix</a><a href={siteUrl("#sources")}>Sources and documentation</a></aside><article className="full-reading"><div className="mobile-network-article migrated-article trial-article">{content.narrative.map((section) => <React.Fragment key={section.id}><h2 id={section.id}>{section.title}</h2><Blocks blocks={section.blocks} /></React.Fragment>)}<h2 id="map">Unfallatlas ausprobieren</h2><MapEmbed url="https://unfallatlas.netlify.app/accidents/app.html" title="Unfallatlas Deutschland" caption="Eigenständige Anwendung / Unfalldaten und Analyse" /><h2 id="technical-appendix">Technical appendix</h2><TechnicalAppendix count={content.notes.length} description="Details zu Datenaufbereitung, Auslieferung, Filterung und Berechnungen. Die Links in der Projektgeschichte öffnen den jeweiligen technischen Hinweis.">{content.notes.map((note) => <AppendixSection key={note.id} id={note.id} title={note.title}><Blocks blocks={note.blocks} /></AppendixSection>)}</TechnicalAppendix><div className="sources-container trial-sources"><h2 id="sources">{content.sources.title}</h2><Blocks blocks={content.sources.blocks} resources /></div></div></article></div></AppendixProvider>
    <ProjectNavigation projectId="unfallatlas" />
  </>;
}
