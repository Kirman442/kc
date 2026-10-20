import { siteUrl } from "./site-paths.js";import React from 'react';
import { Arrow } from './components.jsx';
import { projects } from './projects.js';

export default function ProjectNavigation({ projectId }) {
  const index = projects.findIndex((project) => project.id === projectId);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  return <nav id="project-navigation" className="project-navigation" aria-label="Projektgeschichten"><div className="container project-navigation-inner">
    <a href={siteUrl(previous.href)} className="story-link story-previous" rel="prev"><span className="story-direction"><Arrow direction="left" /> Vorherige Projektgeschichte</span><h3>{previous.title}</h3></a>
    <a href={siteUrl("/home")} className="story-home" aria-label="Home — Karten & Code" title="Home — Karten & Code"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M7 7h34v34H7zM11 11h26v26H11zM24 3v9M3 24h9" fill="none" stroke="currentColor" strokeWidth=".8" /><text x="24" y="27" textAnchor="middle">K-C</text></svg></a>
    <a href={siteUrl(next.href)} className="story-link story-next" rel="next"><span className="story-direction">Nächste Projektgeschichte <Arrow /></span><h3>{next.title}</h3></a>
  </div></nav>;
}
