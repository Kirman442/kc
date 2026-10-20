import { siteUrl } from "./site-paths.js";import React, { useEffect } from 'react';
import { Arrow } from './components.jsx';
import './home.css';

export default function AboutPage() {
  useEffect(() => {document.title = 'Über mich — Karten & Code';}, []);
  return <section className="author-note about-page"><div className="container"><a className="quiet-link" href={siteUrl("/home")}><Arrow direction="left" /> Zum Atlas</a><div className="author-inner"><div className="author-photo"><img src={siteUrl("/images/about/aboutFoto1.webp")} alt="Kirill Lisochenko" /><span className="mono">Der Mensch hinter den Karten</span></div><div className="author-copy"><p className="eyebrow">Über mich / Kirill Lisochenko</p><h1>Ich mag Fragen,<br /><em>die auf eine Karte führen.</em></h1><p>Mich interessiert, wie räumliche Daten zusammenhängen und wie man sie verständlich macht. Ich probiere aus, programmiere und gestalte — vom ersten Datensatz bis zur Anwendung im Browser.</p><p className="author-secondary">In meinen Projektgeschichten zeige ich auch Umwege und technische Grenzen. Denn oft beginnt genau dort die nächste Idee.</p><a className="quiet-link" href={siteUrl("/home#projekte")}>Zu den Projektgeschichten <Arrow /></a></div></div></div></section>;
}
