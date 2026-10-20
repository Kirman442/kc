import { siteUrl, currentPath } from "./site-paths.js";import React, { useEffect, useRef, useState } from 'react';
import { newestProjects, projects } from './projects.js';
import './site-header.css';

const menuProjects = newestProjects(projects.filter((project) => !project.pending));

export function SiteHeader({path=currentPath()}={}) {
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const trigger = useRef(null);
  const revealTimer = useRef(null);

  const cancelReveal = () => {window.clearTimeout(revealTimer.current);revealTimer.current = null;};

  useEffect(() => {
    let lastY = Math.max(0, window.scrollY);
    let direction = null;
    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      if (y <= 50) {
        lastY = y;direction = null;cancelReveal();setHidden(false);return;
      }
      const delta = y - lastY;
      if (Math.abs(delta) < 4) return;
      lastY = y;
      if (delta > 0) {
        direction = 'down';cancelReveal();setHidden(true);setMenuOpen(false);
      } else if (direction !== 'up') {
        direction = 'up';cancelReveal();
        revealTimer.current = window.setTimeout(() => {revealTimer.current = null;setHidden(false);}, 300);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {window.removeEventListener('scroll', onScroll);cancelReveal();};
  }, []);

  const revealForFocus = () => {cancelReveal();setHidden(false);};
  const closeMenu = () => setMenuOpen(false);
  const onMenuKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault();event.stopPropagation();closeMenu();trigger.current?.focus();
    } else if (event.key === 'ArrowDown' && event.target === trigger.current) {
      event.preventDefault();setMenuOpen(true);
    }
  };

  return <>
    <div id="top" className="site-top" aria-hidden="true" />
    <header className={`site-header${hidden ? ' site-header-hidden' : ''}`} onFocusCapture={revealForFocus}>
      <div className="container header-inner">
        <a className="identity" href={siteUrl("/home")} aria-label="Karten & Code — zur Projektübersicht"><span className="identity-symbol" aria-hidden="true"><span />K-C</span><span><strong>Karten & Code</strong><small>GIS & Webentwicklung</small></span></a>
        <nav aria-label="Hauptnavigation">
          <div className="projects-dropdown" onPointerEnter={(event) => {if (event.pointerType === 'mouse' || event.pointerType === 'pen') setMenuOpen(true);}} onPointerLeave={(event) => {if (event.pointerType !== 'touch') closeMenu();}} onBlur={(event) => {if (!event.currentTarget.contains(event.relatedTarget)) closeMenu();}} onKeyDown={onMenuKeyDown}>
            <button ref={trigger} type="button" className={`projects-trigger${path !== '/about' ? ' projects-current' : ''}`} aria-expanded={menuOpen} aria-controls="header-projects" onClick={() => setMenuOpen((value) => !value)}>Projekte <span className="projects-chevron" aria-hidden="true">⌄</span></button>
            <div id="header-projects" className="projects-panel" hidden={!menuOpen}>
              <a className="projects-overview" href={siteUrl("/home#projekte")} onClick={closeMenu}>Alle Projekte <span aria-hidden="true">↗</span></a>
              <ul>{menuProjects.map((project) => <li key={project.id}><a href={siteUrl(project.href)} aria-current={path === project.href ? 'page' : undefined} onClick={closeMenu}>{project.title}</a></li>)}</ul>
            </div>
          </div>
          <a href={siteUrl("/about")} aria-current={path === '/about' ? 'page' : undefined}>Über mich</a>
          <a href={siteUrl("mailto:k.lisochenko@web.de")}>Kontakt <span className="arrow" aria-hidden="true">↗</span></a>
        </nav>
      </div>
    </header>
  </>;
}
