import { siteUrl } from "./site-paths.js";import React from 'react';
import MapEmbed from './MapEmbed.jsx';
import Code from './CodeBlock.jsx';
import ProjectGallery from './ProjectGallery.jsx';
import ImageComparison from './ImageComparison.jsx';
import { AppendixProvider, AppendixLink, TechnicalAppendix, AppendixSection } from './TechnicalAppendix.jsx';
import { galleries } from './gallery-data.js';
import { py1, py2, py3, py4, py5, Fluss1, Fluss2, Fluss3, Fluss4, Cluster1, Cluster2, Cluster3, Cluster4, Cluster5, Cluster6 } from './kartenCode.jsx';
export const contents = [{ "id": "story-start", "title": "Einleitung" }, { "id": "section-2", "title": "Kepler.gl vs. Deck.gl: Analytisches Werkzeug vs. Programmierplattform" }, { "id": "section-3", "title": "Datensatz: Umfang und Struktur" }, { "id": "section-4", "title": "Entwicklungsphasen: Von den Daten zur Visualisierung" }, { "id": "section-5", "title": "Technische Feinheiten: Deck.gl – Das Geheimnis der Performance" }, { "id": "section-6", "title": "Blick in die Zukunft: Neue Karten, neue Daten, neue Entdeckungen" }, { "id": "map", "title": "Web-App" }, { "id": "sources", "title": "Datenquellen und Anwendungen" }];
export default function BayernArticle() {return <div className="mobile-network-article migrated-article"><h2 id="story-start">Einleitung</h2>
    <p>
                                Ich interessiere mich schon seit langem für geografische Visualisierungswerkzeuge.  Vor allem, nachdem ich die Kepler.gl-Bibliothek kennengelernt hatte.  Ursprünglich von Uber entwickelt, wurde Kepler.gl für die Bedürfnisse von analytischen Abteilungen geschaffen, die ein tieferes Verständnis der städtischen Dynamik suchen.  Uber Engineering verfügt über kolossale Mengen an Geodaten von Tausenden von Autos, die täglich in verschiedenen Metropolen der Welt unterwegs sind.  Kepler.gl wurde als effektives Werkzeug für die Analyse und Interpretation dieser Daten entwickelt, das ein „Live-Bild“ des Stadtverkehrs ermöglicht.</p>
    <p>Unabhängig davon, welche konkreten Werkzeuge und Technologien man verwendet, besteht der Prozess der Erstellung einer Datenvisualisierung normalerweise aus einigen wichtigen Schritten: Datenerfassung, Vorverarbeitung, die untersuchende Analyse der vorbereiteten Daten und schließlich die Erstellung der eigentlichen visuellen Darstellung. Kepler.gl automatisiert und vereinfacht drei dieser vier Schritte in erheblichem Maße, was die Analyse und Visualisierung großer Mengen an Geoinformationen deutlich einfacher macht. Mit diesem Tool kann man relativ schnell und, was wirklich zählt, ziemlich eindrucksvoll eine interaktive Karte auf Basis eigener Geodaten erstellen.</p>
    <h2 id="section-2">Kepler.gl vs. Deck.gl: Analytisches Werkzeug vs. Programmierplattform</h2>
    <p>
                                Aber Kepler.gl ist eher so ein „analytisches“ Werkzeug, für diejenigen, die Daten untersuchen.  Ich als Programmierer hatte jedoch Interesse an einem tieferen Verständnis der Mechanismen zur Erstellung solcher Visualisierungen, an der Möglichkeit, tiefer in den Prozess einzutauchen.  In diesem Kontext erregte Deck.gl meine Aufmerksamkeit.  Deck.gl, ebenfalls von Uber entwickelt, ist jedoch keine fertige Analyselösung, sondern eine Plattform, eine Programmbibliothek zur Erstellung maßgeschneiderter Visualisierungen auf Basis von WebGL.  Die WebGL-Technologie setzt natürlich ein gewisses Maß an technischem Fachwissen voraus, bietet aber im Gegenzug unzählige Möglichkeiten zur Feinabstimmung und Erstellung wirklich einzigartiger visueller Darstellungen.  Einer der Hauptvorteile von Deck.gl ist die Verfügbarkeit einer React-Komponente, die in Verbindung mit meiner Erfahrung in der React-Entwicklung vielversprechend für ein experimentelles Projekt erschien.
                            </p>
    <h2 id="section-3">Datensatz: Umfang und Struktur</h2>
    <p>
                                Als Themengebiet für das Experiment wurde Bayern gewählt.  Der im Projekt verwendete Datensatz umfasste etwa 2000 geografische Koordinaten von Städten (als Punktobjekte), polygonale Darstellungen von Regierungsbezirken (Bezirke), Landkreisen, kreisfreien Städten sowie eine Kontur Bayerns zur Visualisierung der Grenzen.  Obwohl der verwendete Datensatz nicht als extrem groß bezeichnet werden kann, erscheint er für die Zwecke der experimentellen Entwicklung und Demonstration der Möglichkeiten von Deck.gl als durchaus ausreichend.  Insbesondere die geometrische Komplexität von Polygonobjekten wie der kreisfreien Stadt Augsburg beläuft sich auf etwa 2400 Koordinaten, und jeder Bezirk hat durchschnittlich 14 solcher Objekte plus durchschnittlich 290 Stadtkoordinaten gibt, dann sorgt dies für eine gewisse Belastung bei der Visualisierung und dem Rendering.
                            </p>
    <h2 id="section-4">Entwicklungsphasen: Von den Daten zur Visualisierung</h2>
    <p>
                                Der Entwicklungsprozess des Projekts umfasste mehrere Schlüsselphasen, von der Suche und Aufbereitung der Daten bis hin zur direkten Implementierung der interaktiven Karte unter Verwendung der Bibliothek Deck.gl und des Frameworks React.js.  Der erste Schritt war die Suche und Sammlung der benötigten Geodaten.  Zu den Datenquellen gehörten sowohl offene Geoportale als auch spezialisierte Geodienste.  Die erhaltenen Daten stellten eine heterogene Mischung aus Formaten und Strukturen dar, was eine vorbereitende Verarbeitung und Konvertierung der Daten in ein einheitliches, standardisiertes Format erforderte, das für die Verwendung in Deck.gl geeignet ist.
                            </p>
    <p>
                                Ein erheblicher Teil der Arbeit war der Entwicklung der React-Anwendung gewidmet, die als „Container“ für die interaktive Karte dient.  Im Rahmen der React-Komponente wurden die Logik zum Laden und Verarbeiten von Daten, zum Erstellen und Konfigurieren von Deck.gl-Layern sowie interaktive Bedienelemente für die Karte implementiert.  Für die Gestaltung der Benutzeroberfläche wurde das Framework Tailwind CSS verwendet, das Komfort und Flexibilität bei der Anpassung des Erscheinungsbilds der Anwendung bietet.
                            </p>
    <h2 id="section-5">Technische Feinheiten: Deck.gl – Das Geheimnis der Performance</h2>
    <p>
                                Performance ist die zentrale Herausforderung bei der Visualisierung großer Datenmengen auf einer Karte. Und Deck.gl löst sie mit Bravour. Wie? Das Geheimnis liegt in der intelligenten Arbeit mit Layern. Stellen Sie sich einen Künstler vor, der eine Stadt malt: Anstatt jedes Element immer wieder neu zu zeichnen, erstellt er Entwurfslayer – schnelle Skizzen von Konturen. Deck.gl verwendet Layer wie „Skizzen“, leicht und sparsam.
                            </p>
    <p>
                                Beim Aktualisieren der Karte zeichnet Deck.gl nicht alles komplett neu. Es vergleicht die neuen „Entwurfslayer“ mit den alten und aktualisiert auf der WebGL-Leinwand nur die veränderten Details, wie ein Künstler, der nur Striche auf einem Gemälde korrigiert. Das „schwere“ Rendering findet nur dort statt, wo es wirklich notwendig ist.
                            </p>
    <p>

                                Ein weiteres „Geheimnis“ sind die UpdateTriggers. Das ist wie ein Befehl an Deck.gl: „Pass auf, diese Parameter könnten sich ändern!“. Zum Beispiel die Farbe der Bäume je nach Jahreszeit. Die Daten über die Bäume sind dieselben, nur die Farbe ändert sich. UpdateTriggers ermöglichen es Deck.gl, solche „feinen“ Änderungen zu verfolgen und nur das Notwendige neu zu zeichnen, wodurch selbst bei komplexen Visualisierungen eine flüssige Darstellung gewährleistet wird.
                            </p>
    <p>
                                Deck.gl – das ist die „Magie“ effizienter Arbeit mit Geodaten, basierend auf intelligentem Layer-Management und punktuellen Aktualisierungen. Effizienz und Dynamik – das ist sein Credo!
                            </p>
    <h2 id="section-6">Blick in die Zukunft: Neue Karten, neue Daten, neue Entdeckungen</h2>
    <p>
                                Das Ziel dieses Projekts war die praktische Untersuchung der Möglichkeiten der Bibliothek Deck.gl im Kontext der Erstellung interaktiver, geoinformatorischer Webanwendungen.  Die Aufgabe bestand darin, am Beispiel der Visualisierung bayerischer Geodaten die Effizienz von Deck.gl für die Arbeit mit Geodaten direkt im Browser zu bewerten.  Das Projekt war als experimentelle Plattform für die Erforschung der Funktionsprinzipien der Bibliothek, ihrer Stärken und potenziellen Grenzen konzipiert.  Als inspirierende Idee diente die Möglichkeit, die Leistungsfähigkeit von WebGL und den Komfort von React.js für die Erstellung einer modernen und informativen Kartenvsualisierung zu nutzen.  Letztendlich sollte das Projekt demonstrieren, inwieweit Deck.gl ein effizientes und flexibles Werkzeug für die Geovisualisierung ist und neue Horizonte für die Weiterentwicklung in diesem Bereich eröffnet.
                            </p>
    <p>
                                Die Bayern-Karte ist nur der Anfang, ein erstes Experiment mit Deck.gl. Aber schon jetzt ist das Potenzial der Bibliothek für die Entwicklung moderner geoinformatorischer Webanwendungen erkennbar. Deck.gl ist ein leistungsstarkes und flexibles Werkzeug zur Visualisierung von Geodaten im Browser.
                            </p>
    <h2 id="map">Web-App</h2>
    <MapEmbed url="https://kirman442.github.io/bayern/" title="Bayern auf einen Blick" caption="React / react-map-gl / deck.gl" />
    <h2 id="sources">Datenquellen und Anwendungen</h2>
    <dl className="mobile-network-resources"><div className="mobile-network-resource"><dt>Python packages and libraries:</dt><dd>Geopandas , Json , OSMnx, d3-scale</dd></div><div className="mobile-network-resource"><dt>react-map-gl</dt><dd><a href={siteUrl("https://visgl.github.io/react-map-gl/")} target="_blank" rel="noopener noreferrer">Part of vis.gl's Framework Suite</a></dd></div><div className="mobile-network-resource"><dt>deck.gl</dt><dd><a href={siteUrl("https://deck.gl/")} target="_blank" rel="noopener noreferrer">Framework for data analysis of large datasets</a></dd></div><div className="mobile-network-resource"><dt>React.js</dt><dd><a href={siteUrl("https://react.dev/")} target="_blank" rel="noopener noreferrer">React library for web interfaces
                                            </a></dd></div><div className="mobile-network-resource"><dt>Statistische Berichte und Daten:</dt><dd><a href={siteUrl("https://www.statistik.bayern.de/")} target="_blank" rel="noopener noreferrer">Bayerisches Landesamt für Statistik</a></dd></div></dl></div>;}
