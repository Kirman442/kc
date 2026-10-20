import { siteUrl } from "./site-paths.js";import React from 'react';
import MapEmbed from './MapEmbed.jsx';
import Code from './CodeBlock.jsx';
import ProjectGallery from './ProjectGallery.jsx';
import ImageComparison from './ImageComparison.jsx';
import { AppendixProvider, AppendixLink, TechnicalAppendix, AppendixSection } from './TechnicalAppendix.jsx';
import { galleries } from './gallery-data.js';
import { py1, py2, py3, py4, py5, Fluss1, Fluss2, Fluss3, Fluss4, Cluster1, Cluster2, Cluster3, Cluster4, Cluster5, Cluster6 } from './kartenCode.jsx';
export const contents = [{ "id": "story-start", "title": "U-Bahn Geschichte" }, { "id": "section-2", "title": "Karte Erstellung" }, { "id": "section-3", "title": "Anzeigedatenverfahren" }, { "id": "section-4", "title": "Kartengrundlage" }, { "id": "section-5", "title": "Ergebnis" }, { "id": "map", "title": "Interaktive Karte" }, { "id": "sources", "title": "Datenquellen und Anwendungen:" }];
export default function UbahnArticle() {return <div className="mobile-network-article migrated-article"><h2 id="story-start">U-Bahn Geschichte</h2>
    <p>
                                Die erste Untergrundbahn Berlins entstand 1895 als Verbindungstunnel zwischen zwei
                                AEG-Fabriken.Dennoch setzte sich
                                später Siemens mit seinem preiswerteren Modell beim Tunnelbau durch. Im Jahr 1902 nahm in Berlin
                                die erste elektrische
                                Untergrundbahn für den öffentlichen Personenverkehr ihren Betrieb auf. Die Bahn, die großteils
                                als Hochbahn ausgeführt
                                war, reichte von Berlin bis in die damals selbstständige Nachbarstadt Charlottenburg. Auf einem
                                kurzen Stück berührte
                                sie auch das Territorium der ebenfalls damals noch selbstständigen Stadt Schöneberg.</p>
    <blockquote>
                                <p>Von diesem Moment an begann eine neue Ära in der Geschichte der Stadt, in der die U-Bahn
                                    sicherlich eine wichtige Rolle
                                    spielt.</p>
                            </blockquote>
    <p>Ein kurioses Detail ist, dass
                                das U-Bahn-System in den folgenden Jahrzehnten auf dem Stadtplan mit Bezug auf den
                                tatsächlichen Standort dargestellt wurde. Und nach den Daten, die ich finden konnte, begann man
                                erst im
                                sechsundfünfzigsten Jahr des letzten Jahrhunderts, als sich die Gesamtzahl der Stationen der
                                Hundertgrenze näherte, eine
                                schematische Darstellung der U-Bahn-Linien zu verwenden, die sich als praktischer und für die
                                Fahrgäste leichter
                                wahrnehmbar erwies.
                            </p>
    <p>Das vereinfachte Schema ist
                                schneller zu lesen. Gleichzeitig vermittelt es aber keine Vorstellung von der tatsächlichen
                                Lage der Linien und verbirgt Details. Lange U-Bahn-Strecken unterscheiden sich nicht von kurzen.
                                Es gibt keine
                                Verbindung zur Geografie.
                            </p>
    <p>Wischen nach
                                links/rechts über das Bild.
                            </p>
    <ImageComparison first={{ "src": "/images/ubahn/ubahn_schemamap.webp", "alt": "Berliner Ubahn Schemamap" }} second={{ "src": "/images/ubahn/ubahn_geomap3.webp", "alt": "Berliner Ubahn Geomap" }} />
    <p>Erstellen
                                wir eine
                                interaktive Karte der Berliner U-Bahn-Linien und schauen wir uns ihre Geschichte an - wie sich
                                eines
                                der größten Netze Europas entwickelt hat.
                            </p>
    <h2 id="section-2">Karte Erstellung</h2>
    <p>Um eine solche Karte zu
                                erstellen, benötigen wir:
                            </p>
    <ul>
                                <li>einen Anzeigedatenverfahren für die Karte</li>
                                <li>ein geeignetes Modell zur Datenspeicherung</li>
                                <li>daten</li>
                            </ul>
    <h2 id="section-3">Anzeigedatenverfahren</h2>
    <p>
                                Lassen Sie uns zunächst die Anforderungen an den Anzeigeverfahren definieren. Er sollte in der
                                Lage sein:</p>
    <ul>
                                <li>eine Basisebene mit einer "normalen" Karte - Straßen,
                                    Gewässer, Straßen, Gebäude usw. anzeigen;</li>
                                <li>Kreise und Linien auf der Basisebene anzeigen, die
                                    Bahnhöfe bzw. U-Bahn-Linien darstellen sollen;</li>
                                <li>Aktualisierung der gezeichneten Bahnhöfe und
                                    U-Bahn-Linien in Abhängigkeit vom gewählten Datum;
                                </li>
                                <li>Umschalten des aktuellen Datums zwischen dem 15. Februar
                                    1902 (Eröffnung der ersten U-Bahn-Linie) und dem heutigen Tag.
                                </li>
                            </ul>
    <p>
                                Die ersten drei Punkte sind in verschiedenen Open-Source-Bibliotheken und geografischen
                                Informationssystemen verfügbar.
                                Ich werde QGIS für die Datenaggregation und -bereinigung, ArcGIS Javascript SDK und React.JS für
                                die Visualisierung
                                verwenden. Für den vierten Punkt gibt es eine einfache Möglichkeit, das ArcGIS Javascript SDK zu
                                implementieren, wir
                                müssen nur die notwendigen Anpassungen für unsere Daten vornehmen.</p>
    <h2 id="section-4">Kartengrundlage</h2>
    <p>
                                Eine kleine Erklärung für diejenigen, die noch nie mit den Konzepten von Kacheln und
                                Kachelserver in Berührung gekommen
                                sind.
                                <br />
                                Die Online-Karten, an die die meisten Nutzer gewöhnt sind - OpenStreetMap, Google und Apple maps
                                usw. - bestehen aus
                                Kacheln: Quadrate mit einer Seitenlänge von 256 Pixeln.
                            </p>
    <p>
                                <b>Jede Kachel hat x-, y- und z-Koordinaten:</b>
                            </p>
    <div className="illustrated-note"><div className="illustrated-media">
        <figure className="article-figure"><a href={siteUrl("/images/ubahn/2200_1343.webp")} target="_blank" rel="noopener noreferrer"><img src={siteUrl("/images/ubahn/2200_1343.webp")} alt="Kachel Foto" loading="lazy" /></a></figure>
      </div><div className="illustrated-copy">
        <p>z ist der Maßstab, in
                                        dem sie angezeigt wird (je größer der z-Wert, desto größer die Vergrößerung);
                                        x - Seriennummer der Kachel in horizontaler Richtung im gewählten Maßstab z;
                                        y - fortlaufende Nummer der Kachel in vertikaler Richtung im gewählten Maßstab z.
                                        Eine Kachel mit den Koordinaten x=2200, y=1343 und z=12 sieht zum Beispiel so aus wie
                                        das Bild auf der rechten Seite. </p>
        <p>
                                        <a href={siteUrl("https://tile.openstreetmap.org/12/2200/1343.png")} target="_blank" rel="noopener noreferrer"><strong>openstreetmaps</strong></a>
                                    </p>
      </div></div>
    <div className="illustrated-note"><div className="illustrated-media">
        <figure className="article-figure"><a href={siteUrl("/images/ubahn/tile_map_story.webp")} target="_blank" rel="noopener noreferrer"><img src={siteUrl("/images/ubahn/tile_map_story.webp")} alt="Kachel Gesamtbild" loading="lazy" /></a></figure>
      </div><div className="illustrated-copy">
        <p>Das Gesamtbild, das
                                        wir letztendlich sehen, wird aus vielen Kacheln zu einem einzigen Bild zusammengefügt:
                                    </p>
      </div></div>
    <p>
                                Wenn wir die Karte in einem Browser bearbeiten - hineinzoomen oder seitwärts scrollen - werden
                                die erforderlichen
                                Kacheln bei Bedarf vom Server heruntergeladen. In unserem Fall werden ArcGIS-Datenserver als
                                Kachelserver verwendet.</p>
    <p>
                                Der nächste Schritt besteht darin, der Karte Stationen und U-Bahn-Linien hinzuzufügen. Jede
                                Linie entspricht einer
                                eigenen historischen Farbe.<br />

                                Als Nächstes müssen wir einen Slider mit einem Bereich vom 15. Februar 1902 bis zum heutigen Tag
                                "anzuschrauben". Mit
                                ihm stellen wir das "aktuelle" Datum für die Anzeige des U-Bahn-Schemas so ein, wie es an diesem
                                Tag war.
                            </p>
    <p>
                                Um feststellen zu können, welche Objekte an einem bestimmten Tag vorhanden waren, sind
                                entsprechend aufbereitete Daten
                                erforderlich. OpenStreetMap ist so konzipiert und entwickelt worden, dass es die tatsächlichen
                                Details zeigt - das, was
                                im Moment existiert. Für einige Arten von Objekten ist es möglich, das Jahr ihrer Entstehung
                                anzugeben (z. B. das
                                Baujahr eines Gebäudes). Aber für Objekte, die nicht mehr existieren oder die sich in der
                                Vergangenheit verändert haben,
                                gibt es keine Daten. Um dies zu beheben, fügen wir jedem Objekt, das auf der Karte angezeigt
                                werden kann, zwei Merkmale
                                hinzu:<br /><br />
                                <b><i>from_date</i></b> - das Datum, ab dem das Objekt auf der Karte
                                erscheint<br />
                                <b><i>to_date</i></b> - das Datum, ab dem das Objekt nicht mehr auf der Karte erscheinen
                                soll.<br /><br />
                                Mit Hilfe dieser Merkmale ist es möglich, die auf der Karte angezeigten Daten in Abhängigkeit
                                vom gewählten Datum zu
                                steuern.
                            </p>
    <h2 id="section-5">Ergebnis</h2>
    <p>
                                Das Ergebnis ist eine interaktive Karte der Berliner U-Bahn, auf der man sehen kann, wie sich
                                das Netz entwickelt hat.
                                Zum Beispiel, in welche Richtungen es sich entwickelt hat, mit welcher Geschwindigkeit neue
                                Bahnhöfe eröffnet wurden,
                                und einfach um nostalgisch zu werden.
                            </p>
    <p>
                                Der Slider ist für Zeiträume von 10 Jahren eingestellt. Man kann auf die U-Bahn-Linien und
                                Haltestellen klicken, um
                                kurze Informationen zu erhalten.
                            </p>
    <h2 id="map">Interaktive Karte</h2>
    <MapEmbed url="https://kirman442.github.io/berlinmetro/" title="Berliner U-Bahn" caption="Historische Entwicklung des Berliner U-Bahn-Netzes" />
    <h2 id="sources">Datenquellen und Anwendungen:</h2>
    <dl className="mobile-network-resources"><div className="mobile-network-resource"><dt>Historische Karten und Dokumente</dt><dd><a href={siteUrl("http://www.u-bahn-archiv.de/index.html")} target="_blank" rel="noopener noreferrer">Das
                                                BerlinerU-Bahn-Archiv</a></dd></div><div className="mobile-network-resource"><dt>Berliner U-Bahnhöfe</dt><dd><a href={siteUrl("http://www.u-bahn-archiv.de/index.html")} target="_blank" rel="noopener noreferrer">Wikipedia</a></dd></div><div className="mobile-network-resource"><dt>Datenmodell</dt><dd><a href={siteUrl("https://www.openstreetmap.org/#map=11/52.5070/13.3388")} target="_blank" rel="noopener noreferrer">OpenStreetMap</a></dd></div><div className="mobile-network-resource"><dt>"Rohdaten" Verarbeitung</dt><dd><a href={siteUrl("https://qgis.org/de/site/")} target="_blank" rel="noopener noreferrer">QGIS</a></dd></div><div className="mobile-network-resource"><dt>Datenvorbereitung</dt><dd><a href={siteUrl("https://developers.arcgis.com/")} target="_blank" rel="noopener noreferrer">ArcGIS
                                                Maps SDK JS</a></dd></div><div className="mobile-network-resource"><dt>Image comparsion slider</dt><dd><a href={siteUrl("https://img-comparison-slider.sneas.io/")} target="_blank" rel="noopener noreferrer">Slider Component
                                                for Comparing Images</a></dd></div><div className="mobile-network-resource"><dt>Frontend JS-Anwendung</dt><dd><a href={siteUrl("https://react.dev/")} target="_blank" rel="noopener noreferrer">React JS</a></dd></div><div className="mobile-network-resource"><dt>GitHub Pages</dt><dd><a href={siteUrl("https://pages.github.com/")} target="_blank" rel="noopener noreferrer">Website
                                                erstellen</a></dd></div></dl></div>;}
