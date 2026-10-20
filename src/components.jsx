import { siteUrl } from "./site-paths.js";import React from "react";
export { SiteHeader } from './SiteHeader.jsx';
const emailHref = "mailto:k.lisochenko@web.de";

export function Arrow({ direction = 'up-right' }) {
  return <span aria-hidden="true" className="arrow">{direction === 'down' ? '↓' : direction === 'left' ? '←' : '↗'}</span>;
}

export function Button({ children, href, secondary = false, external = false }) {
  return <a className={`button ${secondary ? 'button-secondary' : ''}`} href={siteUrl(href)} {...external ? { target: '_blank', rel: 'noopener noreferrer' } : {}}>{children}<Arrow direction={external ? 'up-right' : 'down'} /></a>;
}

export function Contours({ className = '' }) {
  const paths = Array.from({ length: 10 }, (_, ring) => {
    const points = Array.from({ length: 121 }, (_, i) => {
      const t = i / 120 * Math.PI * 2;
      const radius = 55 + ring * 13 + 12 * Math.sin(t * 3 + .6) + 7 * Math.cos(t * 5);
      return `${i ? 'L' : 'M'}${(250 + Math.cos(t) * radius * 1.25).toFixed(2)},${(250 + Math.sin(t) * radius * .87).toFixed(2)}`;
    }).join(' ') + 'Z';
    return <path key={ring} d={points} />;
  });
  return <svg className={`contours ${className}`} viewBox="0 0 500 500" aria-hidden="true" focusable="false">{paths}</svg>;
}

export function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><p className="footer-motto">Geodaten verstehen. Karten entwickeln.</p><a href={siteUrl(emailHref)}>k.lisochenko@web.de <Arrow /></a><a className="to-top mono" href={siteUrl("#top")}>Nach oben ↑</a></div><div className="container footer-bottom mono"><span>© 2026 Alle Rechte vorbehalten, Kirill Lisochenko</span><nav className="footer-legal" aria-label="Rechtliche Hinweise" lang="de"><a href={siteUrl('/datenschutz/')}>Datenschutz</a><a href={siteUrl('/impressum/')}>Impressum</a></nav></div></footer>;
}
