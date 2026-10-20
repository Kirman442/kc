import { siteUrl } from "./site-paths.js";import React, { useEffect, useState } from 'react';
import { Arrow, Contours } from './components.jsx';
import { projects, newestProjects, heroProjects } from './projects.js';
import './home.css';
import './home-layout.css';

function AtlasPlate() {
  const sheets = heroProjects();
  return <div className="atlas-plate atlas-trio"><Contours className="plate-contours" /><span className="plate-axis mono" aria-hidden="true">KARTENBLÄTTER / DREI PERSPEKTIVEN</span>{sheets.map((item, i) => <a key={item.id} className={'atlas-sheet hero-polaroid hero-polaroid-' + (i + 1)} href={siteUrl(item.href)} aria-label={item.title + ': Projektgeschichte öffnen'}><div className="sheet-header mono"><span>{String(i + 1).padStart(2, '0')} / {item.heroLabel || item.category}</span><span>{item.year}</span></div><img src={siteUrl(item.image)} alt={item.title + ': Projektvisualisierung'} width="690" height="812" style={{ objectPosition: item.imagePosition || 'center' }} /><div className="sheet-footer"><span>{item.heroCaption || item.title}</span><Arrow /></div></a>)}<div className="plate-note mono"><span aria-hidden="true">+</span> Drei Blickwinkel auf dieselbe Welt.</div></div>;
}
function HomeHero() {
  return <section className="container home-intro"><div className="intro-copy"><p className="eyebrow">Ein Atlas aus Karten & Code</p><h1>Karten.<br />Code.<br /><em>Neue Perspektiven.</em></h1><p className="intro-lead">Geodaten, Entwicklung und Kartografie. Räumliche Informationen werden zu Karten, die sich entdecken lassen.</p><a className="button" href={siteUrl("#projekte")}>Den Atlas öffnen <Arrow direction="down" /></a><div className="intro-location mono"><span className="location-cross" aria-hidden="true">⊕</span> GIS & Webentwicklung</div></div><AtlasPlate /></section>;
}
function FeaturedProject({ item }) {
  return <article className="home-featured"><a className="featured-map featured-polaroid" style={{ '--print-tilt': item.polaroidTilt + 'deg' }} href={siteUrl(item.href)} aria-label={`${item.title}: Projektgeschichte öffnen`}><img src={siteUrl(item.image)} alt={`${item.title}: Projektvisualisierung`} width="1200" height="800" loading="lazy" style={{ objectPosition: item.imagePosition || 'center' }} /><span className="map-corner" aria-hidden="true">+</span><span className="map-caption mono">{item.featuredCaption || item.category}</span></a><div className="featured-copy"><div className="featured-kicker"><span className="eyebrow">Eine Projektgeschichte</span><span className="mono">{item.year}</span></div><h3><a href={siteUrl(item.href)}>{item.featuredHeading ? <>{item.featuredHeading[0]}<br /><em>{item.featuredHeading[1]}</em></> : item.title}</a></h3><p>{item.description}</p><div className="project-tools mono">{item.tools}</div><a className="quiet-link" href={siteUrl(item.href)}>{item.title} entdecken <Arrow /></a></div></article>;
}
function ProjectCard({ item }) {
  return <article className="home-project-card" data-project-id={item.id} data-published={item.publishedAt}><a className="card-map card-polaroid" href={siteUrl(item.href)} aria-label={item.title + ': Projektgeschichte öffnen'} style={{ '--print-tilt': item.polaroidTilt + 'deg' }}><img src={siteUrl(item.image)} alt={item.title + ': Projektvisualisierung'} width="690" height="812" loading="lazy" style={{ objectPosition: item.imagePosition || 'center' }} /><span className="card-print-caption mono">{item.printCaption} / {item.year}</span></a><div className="card-copy"><div className="card-meta mono"><span>{item.category}</span><span>{item.year}</span></div><h3><a href={siteUrl(item.href)}>{item.title}</a></h3><p>{item.description}</p><a className="card-link" href={siteUrl(item.href)}>{item.pending ? 'In Überarbeitung' : 'Projekt ansehen'} <Arrow /></a></div></article>;
}
function ProjectIndex() {
  const [filter, setFilter] = useState('Alle');
  const visible = newestProjects(projects.filter((p) => filter === 'Alle' || p.category === filter));
  const featured = visible.find((p) => p.featured);
  return <section className="container project-index" id="projekte"><div className="home-section-heading"><div><p className="eyebrow">Das Projektverzeichnis</p><h2>Eine Frage.<br /><em>Viele mögliche Karten.</em></h2></div><p>Experimente, Entdeckungen und eigene Anwendungen. Ein Blick in meine Arbeit mit räumlichen Daten.</p></div><div className="project-index-toolbar"><div className="project-filters" role="group" aria-label="Projekte nach Thema filtern">{['Alle', 'Web-GIS', 'Kartografie', '3D & Geodaten'].map((category) => <button key={category} onClick={() => setFilter(category)} aria-pressed={filter === category}>{category}</button>)}</div><span className="project-count mono" aria-live="polite">{visible.length} {visible.length === 1 ? 'Projekt' : 'Projekte'}</span></div>{featured && <FeaturedProject item={featured} />}<div className="home-project-grid">{visible.filter((p) => !p.featured).map((item) => <ProjectCard key={item.id} item={item} />)}</div><div className="catalog-end mono"><span>Jedes Projekt beginnt mit einer Frage.</span><span aria-hidden="true">Ende des Verzeichnisses / +</span></div></section>;
}
function HomeContact() {
  return <section className="home-contact"><Contours className="contact-contours" /><div className="container contact-content"><div><p className="eyebrow">Raum für Austausch</p><h2>Eine Idee im Kopf?<br /><em>Lassen wir sie Gestalt annehmen.</em></h2></div><a className="button" href={siteUrl("mailto:k.lisochenko@web.de")}>Schreib mir <Arrow /></a></div></section>;
}
export default function HomePage() {
  useEffect(() => {document.title = 'Karten & Code / GIS & Webentwicklung';}, []);
  return <><HomeHero /><div className="container atlas-principles mono"><span>Geodaten verstehen</span><span aria-hidden="true">+</span><span>Zusammenhänge entdecken</span><span aria-hidden="true">+</span><span>Karten entwickeln</span></div><ProjectIndex /><HomeContact /></>;
}
