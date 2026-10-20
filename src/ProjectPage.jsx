import { siteUrl } from "./site-paths.js";import React, { useEffect } from 'react';
import { Arrow, Contours } from './components.jsx';
import { projects } from './projects.js';
import AccidentsArticle, { contents as accidentsContents } from './AccidentsArticle.jsx';
import BayernArticle, { contents as bayernContents } from './BayernArticle.jsx';
import KunstkartenArticle, { contents as artContents } from './KunstkartenArticle.jsx';
import FlusssystemArticle, { contents as riversContents } from './FlusssystemArticle.jsx';
import ProjectNavigation from './ProjectNavigation.jsx';
import UbahnArticle, { contents as metroContents } from './UbahnArticle.jsx';
import BergbauArticle, { contents as miningContents } from './BergbauArticle.jsx';
import ClusteringArticle, { contents as clustersContents } from './ClusteringArticle.jsx';
import './full-article.css';
const stories = {
  clusters: { title: 'Clustering', intro: 'Manchmal müssen wir eine große Menge an Daten auf der Karte anzeigen. Und in diesem Fall ist es besser, Clustering zu verwenden.', date: '25. März 2024', dataset: '5G-Mobilfunkstandorte / Deutschland / GeoJSON', tools: 'Python / GeoPandas / OSMnx / ArcGIS / React', Article: ClusteringArticle, contents: clustersContents },
  metro: { title: 'Berliner U-Bahn Geschichte', intro: 'Interaktive Karte über die Entwicklung und den Bau der Berliner U-Bahn.', date: '19. Dezember 2023', dataset: 'Berliner U-Bahn / Geschichte & Liniennetz', tools: 'React / ArcGIS Maps SDK for JavaScript / QGIS', Article: UbahnArticle, contents: metroContents },
  mining: { title: 'Risikomanagement oberflächennaher Strukturen', intro: 'GIS-technische Umsetzung eines vorgegebenen Workflows zur Erstellung von 3D-Bergbaustrukturen.', date: '25. August 2022', dataset: 'Ca. 16.000 Strecken, Abbaue und weitere Objekte', tools: 'Python / ArcPy / pyproj / openpyxl / ArcGIS Pro', Article: BergbauArticle, contents: miningContents, action: '3D-Modell ansehen', target: 'video', contributors: 'Kirill Lisochenko & Martin Burzynski' },
  art: { title: 'Kunstkarten mit Python erstellen', intro: 'Sehen wir uns an, wie wir mit Python und OpenStreetMap-Daten schöne Karten erstellen können.', date: '18. April 2024', dataset: 'Stadtnetze / Gebäude / Wasserflächen', tools: 'Python / OSMnx / GeoPandas / Pillow', Article: KunstkartenArticle, contents: artContents, action: 'Karten ansehen', target: 'gallery' },
  rivers: { title: 'Die Visualisierung des Flusssystems', intro: 'Filtern und stilisieren das globale Flusssystem eines ganzen Kontinents oder eines bestimmten Landes.', date: '25. Mai 2024', dataset: 'HydroRIVERS / Europa / Südamerika', tools: 'Python / GeoPandas / Matplotlib / Pillow', Article: FlusssystemArticle, contents: riversContents, action: 'Flusssysteme entdecken', target: 'gallery' },
  accidents: { title: 'Unfallkarte: Schnell, Präzise, GPU-optimiert', intro: 'Geovisualisierung von Unfällen auf deutschen Straßen: Ein Experiment mit React, Supabase und Deck.gl', date: '30. März 2025', dataset: '269.048 Unfalldatensätze / Deutschland', tools: 'React / Supabase / deck.gl', Article: AccidentsArticle, contents: accidentsContents },
  bayern: { title: 'Bayern auf einen Blick', intro: 'Eine interaktive Karte der Städte und Regionen mit deck.gl und react-map-gl', date: '25. Februar 2025', dataset: 'Städte / Landkreise / Regierungsbezirke', tools: 'React / react-map-gl / deck.gl', Article: BayernArticle, contents: bayernContents }
};
export default function ProjectPage({ projectId }) {
  const project = projects.find((p) => p.id === projectId);
  const story = stories[projectId];const { Article } = story;
  useEffect(() => {document.title = project.title + ' — Karten & Code';}, [project.title]);
  return <>
    <section className={'cover project-cover project-cover-' + projectId} aria-labelledby="project-title"><img className="cover-image" src={siteUrl("/assets/" + projectId + "-cover.webp")} alt={project.title + ': Projektvisualisierung'} width="1200" height="800" /><div className="cover-shade" /><Contours className="cover-contours" /><div className="cover-grid" aria-hidden="true" /><div className="container cover-inner"><div className="cover-top"><a href={siteUrl("/home#projekte")}><Arrow direction="left" /> Projektübersicht</a><span className="mono">Projektgeschichte / {project.year}</span></div><div className="cover-copy"><p className="eyebrow">{project.category} / Datenvisualisierung</p><p className="project-name">{project.title}</p><h1 id="project-title">{story.title}</h1><p className="cover-intro">{story.intro}</p></div><div className="cover-foot mono"><span>{story.dataset}</span><span>{story.date}</span></div></div></section>
    <section className="container overview" aria-label="Projekt auf einen Blick"><dl className="project-facts"><div><dt>Mein Beitrag</dt><dd>Programmierung<br />Datenbearbeitung & Visualisierung</dd></div><div><dt>Werkzeuge</dt><dd>{story.tools}</dd></div><div><dt>Veröffentlicht</dt><dd>{story.date}</dd></div></dl><div className="full-project-actions"><a className="button" href={siteUrl("#" + (story.target || "map"))}>{story.action || "Karte entdecken"} <Arrow direction="down" /></a></div></section>
    <div className="container full-layout"><aside className="full-contents" aria-label="In dieser Projektgeschichte"><span className="eyebrow">In dieser Geschichte</span>{story.contents.map(({ id, title }, i) => <a key={id} href={siteUrl('#' + id)}><span className="mono contents-number">{String(i + 1).padStart(2, '0')}</span>{title}</a>)}{story.contributors && <p className="project-authors"><span className="eyebrow">Projektteam</span>{story.contributors}</p>}</aside><article className={'full-reading article-' + projectId}><Article /></article></div>
    <ProjectNavigation projectId={projectId} />
  </>;
}
