import { siteUrl } from "./site-paths.js";import React from 'react';
import MapEmbed from './MapEmbed.jsx';
import Code from './CodeBlock.jsx';
import ProjectGallery from './ProjectGallery.jsx';
import ImageComparison from './ImageComparison.jsx';
import { AppendixProvider, AppendixLink, TechnicalAppendix, AppendixSection } from './TechnicalAppendix.jsx';
import { galleries } from './gallery-data.js';
import { py1, py2, py3, py4, py5, Fluss1, Fluss2, Fluss3, Fluss4, Cluster1, Cluster2, Cluster3, Cluster4, Cluster5, Cluster6 } from './kartenCode.jsx';
export const contents = [{ "id": "story-start", "title": "OSMnx installieren" }, { "id": "section-2", "title": "Straßen und Straßennetzen herunterladen" }, { "id": "section-3", "title": "Datenverarbeitung" }, { "id": "section-4", "title": "Beschriftung" }, { "id": "gallery", "title": "Erste Version" }, { "id": "section-6", "title": "Zweite Version" }, { "id": "technical-appendix", "title": "Technical appendix" }, { "id": "sources", "title": "Datenquellen und Anwendungen" }];
export default function KunstkartenArticle() {return <div className="mobile-network-article migrated-article"><AppendixProvider><h2 id="story-start">OSMnx installieren</h2>
      <p>Als
                                erstes brauchen wir Python und einen Workflow. Ich
                                werde Conda verwenden, um den Workflow zu erstellen,
                                der Code-Editor ist Spyder oder VSCode. Wir werden
                                auch das Python-Paket OSMnx benutzen, mit dem wir
                                Geodaten von OpenStreetMap laden können.</p>
      <p>
                                Das <a href={siteUrl("https://osmnx.readthedocs.io/en/stable/index.html")} target="_blank" rel="noopener noreferrer"><strong>OSMNX </strong></a>
                                Python-Paket wurde von Jeff Boeing
                                geschrieben und kann zum Abrufen, Modellieren,
                                Analysieren und Visualisieren von Straßennetzen und
                                anderen räumlichen Daten aus OpenStreetMap verwendet
                                werden. Die Benutzer können städtische Netze, die
                                für Fußgänger, Autos oder Radfahrer geeignet sind,
                                mit einer einzigen Zeile Python-Code herunterladen
                                und modellieren und sie dann leicht analysieren und
                                visualisieren. Genauso einfach können Sie mit
                                städtischen Einrichtungen/Punkten von Interesse,
                                Gebäudegrundrissen, Haltestellen, Höhendaten,
                                Straßenausrichtungen, Geschwindigkeit/Reisezeit und
                                Routenführung arbeiten.</p>
      <h2 id="section-2">Straßen und Straßennetzen herunterladen</h2>
      <p>Nach
                                der erfolgreichen Installation von OSMnx können wir
                                mit der Programmierung beginnen. Für unsere Aufgabe
                                müssen wir noch 2 weitere Pakete importieren -
                                <a href={siteUrl("https://geopy.readthedocs.io/en/stable/")} target="_blank" rel="noopener noreferrer"><strong>geopy.geocoders</strong></a>
                                und <a href={siteUrl("https://pillow.readthedocs.io/en/stable/index.html")} target="_blank" rel="noopener noreferrer"><strong>PIL</strong></a>,
                                aber dazu komme ich
                                später. Als erstes müssen wir die Daten
                                herunterladen. Es gibt viele Möglichkeiten, dies zu
                                tun, eine der einfachsten ist die Verwendung der
                                graph_from_place() Methode.
                            </p>
      <p>
                                graph_from_place() benötigt ein paar Parameter.
                                place ist die Abfrage, die OpenStreetMaps verwendet,
                                um die Daten des angegebenen Ortes abzurufen,
                                retain_all gibt alle Straßen zurück, auch wenn sie
                                nicht mit anderen Elementen verbunden sind, simplify
                                bereinigt den bereitgestellten Graphen ein wenig,
                                und network_type gibt an, welche Art von Straßennetz
                                abgerufen werden soll.</p>
      <p>
                                Ich möchte alle möglichen Daten erhalten
                                (network_type='all'), aber man kann nur Fahrbahnen
                                mit 'drive' oder Fußwege mit 'walk' laden.</p>
      <p>
                                Eine andere Möglichkeit, die Daten zu laden, ist die
                                Verwendung von graph_from_point(), mit der wir
                                Koordinaten angeben können. In manchen Fällen ist
                                diese Option bequemer, z. B. bei Orten mit ähnlichen
                                Namen, und bietet eine höhere Genauigkeit. Mit
                                'dist' können wir nur die Knoten speichern, die sich
                                innerhalb der angegebenen Grenzen vom Zentrum des
                                Graphs befinden.</p>
      <p>
                                Wir müssen bedenken, dass wir, wenn wir Daten aus
                                großen Städten wie Madrid oder Berlin herunterladen
                                wollen, ein wenig warten müssen, um alle
                                Informationen zu erhalten. Es hängt auch davon ab,
                                welche Entfernung für die Kartenausschnitte gewählt
                                wird.</p>
      <AppendixLink target="appendix-note-1" origin="article-note-1">Straßennetze laden — Python-Code</AppendixLink>
      <p>
                                Man kann auch einen benutzerdefinierten Filter
                                verwenden - einen Filter, der anstelle des
                                voreingestellten network_type verwendet wird und die
                                Art des gewünschten Stadtnetzes angibt, z. B.
                                Kanalnetz -
                                ["waterway"~"canal"]', Metronetz -
                                ["railway"~"subway"] oder
                                ["highway"~"motorway|motorway_link|trunk|trunk_link"]',
                                um Autobahnen, Schnellstraßen und ihre Verbindungen
                                zu erhalten.</p>
      <h2 id="section-3">Datenverarbeitung</h2>
      <p>
                                Sowohl graph_from_place() als auch
                                graph_from_point() geben einen MultiDiGraph zurück,
                                den wir auspacken und in die Liste einfügen können.
                                Jetzt müssen wir sie nur noch anzeigen, einfärben
                                und die Breite der Linien an die Länge der
                                Verkehrsnetzabschnitte anpassen.
                            </p>
      <AppendixLink target="appendix-note-2" origin="article-note-2">Karte zeichnen — Python-Code</AppendixLink>
      <p>
                                Danach zeichnen wir die Karte mit dem Modul
                                ox.plot_graph. Wir fügen eine Hintergrundfarbe und
                                optional einen Kartenrand mit bbox border hinzu, der
                                standardmäßig undefiniert ist. Bounding Box oder Der
                                Rand hat die Weltseitenform (Norden, Süden, Osten,
                                Westen). Wenn keine, wird aus den räumlichen
                                Ausdehnungen der gezeichneten Geometrien berechnet.
                                Das heißt, in unserem Fall durch die Koordinaten
                                einer Adresse oder eines Ortes, und alles, was sich
                                auf die räumliche Geometrie dieses Ortes bezieht,
                                wird in die Karte aufgenommen.
                            </p>
      <div className="illustrated-note"><div className="illustrated-media">
          <figure className="article-figure"><a href={siteUrl("/images/kunstkarten/koeln1.webp")} target="_blank" rel="noopener noreferrer"><img src={siteUrl("/images/kunstkarten/koeln1.webp")} alt="Unbeschriftete Karte von Köln" loading="lazy" /></a></figure>
        </div><div className="illustrated-copy">
          <p>Vollständige
                                        unbeschriftete Karte von Köln</p>
        </div></div>
      <h2 id="section-4">Beschriftung</h2>
      <p>
                                Die Karte ist fertig, aber was ist eine Karte ohne
                                einen Namen? Wir könnten ihn in einem Grafikeditor
                                wie Photoshop, Raw Therapee oder Gimp schreiben,
                                aber wir suchen nicht nach einfachen Wegen und
                                werden alles direkt hier machen, denn es gibt viele
                                Bibliotheken für Python, die uns gerne helfen. Für
                                unsere Aufgabe benötigen wir 2 weitere Pakete -
                                geopy.geocoders und PIL , die ich schon am Anfang
                                erwähnt habe.
                            </p>
      <p>
                                Die erste ist für die Geo-Location eines Ortes oder
                                einer Adresse erforderlich, um den vollständigen
                                geografischen Namen (falls vorhanden) und seine
                                Koordinaten zu erhalten.
                            </p>
      <p>
                                Namen des Ortes werden wir später abschneiden und
                                nur Paris Frankreich stehen lassen (obwohl wir
                                natürlich alles schreiben können), und die
                                Koordinaten in dieser Form werden für ihre weitere
                                Umwandlung in das DMS-Koordinatensystem
                                (Degrees/Minutes/Seconds) benötigt, das auf der
                                Karte gut aussieht. Latitude und Longitude
                                Koordinaten 48.8534951 2.3483915 wandeln sich zu
                                48°51′ N / 2°20′ E
                            </p>
      <p>
                                Dazu müssen wir eine Funktion schreiben, die Lon/Lat
                                in DMS umwandelt. Wir suchen nach einer
                                Umrechnungsformel, finden sie und finden parallel
                                dazu in dem Buch Learning Scientific Programming
                                with Python eine hervorragende Lösung für unser
                                Problem. Wir müssen sie für uns noch ein wenig
                                verfeinern und los geht's!
                            </p>
      <AppendixLink target="appendix-note-3" origin="article-note-3">Koordinaten in DMS umwandeln — Python-Code</AppendixLink>
      <p>
                                Die zweite Bibliothek zum Drucken von Text auf ein
                                Bild. Dafür brauchen wir ttf-Fonts, ich habe sie von
                                hier ( CaviarDreams , BerlinSmallCaps )
                                heruntergeladen, und dann mit ihnen und dem Bild
                                experimentieren, um alles schön zu machen, obwohl
                                der Begriff der Schönheit für jeden anders ist :)
                            </p>
      <AppendixLink target="appendix-note-4" origin="article-note-4">Schriftarten und Beschriftung — Python-Code</AppendixLink>
      <p>
                                Überlagerung des Standortnames und der Koordinaten
                                auf der Karte
                            </p>
      <AppendixLink target="appendix-note-5" origin="article-note-5">Text und Karte zusammenführen — Python-Code</AppendixLink>
      <p>
                                Man wählt die Schriftarten aus, spielt mit ihrer
                                Größe, Farbe und Transparenz, richtet sie in der
                                Mitte oder am Rand des Bildes aus (in meinem Fall in
                                der Mitte) und voila, unsere Karte mit unserer
                                Beschriftung ist fertig. Wir können sie auf einem
                                Datenträger speichern, ausdrucken und in einem
                                Rahmen an die Wand hängen (dafür müssen wir ein
                                großes Format statt figsize=(8, 8) - figsize=(27,
                                40) für den Druck der Karte wählen, und da es sich
                                um ein Vektorbild handelt, können Sie es ohne
                                Qualitätsverlust einfach groß machen).
                            </p>
      <h2 id="gallery">Erste Version</h2>
      <ProjectGallery images={galleries.KunstkartenOldImages} title="Erste Version" />
      <p>
                                Früher hieß der letzte Menüpunkt - Viola!, aber
                                jetzt nur noch Erste Version, da beschlossen wurde,
                                alles neu zu machen, und ich werde Ihnen jetzt
                                sagen, warum.
                            </p>
      <h2 id="section-6">Zweite Version</h2>
      <p>
                                Ich kam auf dieses Projekt zurück, weil ich dachte,
                                es wäre schön, auch Gewässer oder vielmehr
                                Wasserflächen zu visualisieren, da die Karte ohne
                                sie sehr seltsam aussieht, zumal die Daten dazu in
                                OSM verfügbar sind. Und als ich anfing, mich mit
                                diesem Thema zu befassen, beschloss ich, alles neu
                                zu machen, da die Visualisierung von Straßen rein
                                schematisch implementiert war, obwohl sie für die
                                erste Version im Allgemeinen nicht schlecht war. Ein
                                und dieselbe Straße konnte unterschiedliche
                                Linienstärken und farben haben, weil Länge und Farbe
                                auf der Grundlage der Länge der Koordinatensegmente
                                ein und derselben Straße berechnet wurden, nicht auf
                                ihrem Zweck oder gesamten Teil. Das heißt, wenn eine
                                Straße von A nach B als "Fußgängerzone" oder
                                "Autobahn" bezeichnet wird, sollte sie zur
                                Visualisierung die gleiche Linienstärke und Farbe
                                haben.
                            </p>
      <p>
                                Bei der Arbeit mit Wasseroberflächen hat sich
                                herausgestellt, dass sie meist aus vielen Polygonen
                                und nicht aus einem einzigen Multipolygon bestehen.
                                Wenn man also eine Wasserfläche betrachtet, besteht
                                sie bei der Visualisierung aus Polygonen und man
                                kann die Grenzen jedes einzelnen Polygons sehen.
                                Meiner Meinung nach sieht das ästhetisch nicht sehr
                                ansprechend aus.
                            </p>
      <p>
                                Es wurde beschlossen, alle Wasserflächen zu einem
                                Multipolygon zu verschmelzen, so dass diese Grenzen
                                nicht mehr sichtbar sind. Ich werde Ihnen nun ein
                                Beispiel zeigen.
                            </p>
      <div className="media-pair">
        <div className="illustrated-note"><div className="illustrated-media">
            <figure className="article-figure"><a href={siteUrl("/images/kunstkarten/Berlin_water_grenze.png")} target="_blank" rel="noopener noreferrer"><img src={siteUrl("/images/kunstkarten/Berlin_water_grenze.png")} alt="Teil der Spree in Berlin Polygonen" loading="lazy" /></a></figure>
          </div><div className="illustrated-copy">
            <p>Teil
                                        der Spree in Berlin. Hier können Sie
                                        deutlich sehen, was ich meine.
                                        Hier wird der Flussabschnitt aus Polygonen
                                        gebildet.</p>
          </div></div>
        <div className="illustrated-note"><div className="illustrated-media">
            <figure className="article-figure"><a href={siteUrl("/images/kunstkarten/Berlin_water_ohne_grenze.png")} target="_blank" rel="noopener noreferrer"><img src={siteUrl("/images/kunstkarten/Berlin_water_ohne_grenze.png")} alt="Teil der Spree in Berlin Multipolygon" loading="lazy" /></a></figure>
          </div><div className="illustrated-copy">
            <p>Und
                                        hier ist ein Multipolygon</p>
            <p></p>
          </div></div>
      </div>
      <p>
                                Ich habe auch ein Textmenü implementiert, in dem man auswählen kann, was man auf der Karte
                                darstellen möchte - Gebäude, Straßen, Wasser, Eisenbahnverbindungen, d.h. wenn man möchte,
                                kann man
                                nur Straßen und Wasser oder nur Gebäude usw. darstellen, und man kann das Menü auch
                                verwenden, um
                                eine geeignete Farbpalette auszuwählen.
                            </p>
      <p>
                                So wurde fast der gesamte Code umgeschrieben, und jetzt ist es möglich, Wasserflächen,
                                Gebäude und
                                Eisenbahninfrastruktur in die Karte einzufügen, verschiedene Paletten für die Visualisierung
                                zu
                                verwenden, Namen neu anzuordnen und einen Farbverlauf anzuwenden. Außerdem wurde ein Rahmen
                                hinzugefügt, mit dem die Karte viel hübscher aussieht.
                            </p>
      <p>
                                Sie können jetzt sehr gut sehen, wie sich die Karten gegenüber der ersten Version verändert
                                haben.
                            </p>
      <ProjectGallery images={galleries.KunstkartenNewImages} title="Zweite Version" />
      <p>
                                Natürlich ist OSMnx nicht nur für diesen Zweck gedacht. Es ist eine sehr leistungsfähige
                                Bibliothek
                                für
                                die
                                Analyse von Geodaten, die auf NetworkX und GeoPandas basiert und mit der OpenStreetMap API
                                für
                                <a href={siteUrl("https://osmnx.readthedocs.io/en/stable/getting-started.html#introducing-osmnx")} target="_blank" rel="noopener noreferrer"><strong> verschiedene Arten von
                                        Geodatenanalysen</strong></a> interagiert.
                            </p>
      <p>
                                Der vollständige Code ist auf <a href={siteUrl("https://github.com/Kirman442/osmnx_maps.git")} target="_blank" rel="noopener noreferrer"><strong>GitHub</strong></a> verfügbar.
                            </p>
      <h2 id="technical-appendix">Technical appendix</h2><TechnicalAppendix count={5} description="Die Python-Beispiele aus der Projektgeschichte. Die Verweise im Text öffnen den passenden Abschnitt."><AppendixSection id="appendix-note-1" title="Straßennetze laden"><Code code={py1} language="python" /></AppendixSection><AppendixSection id="appendix-note-2" title="Karte zeichnen"><Code code={py2} language="python" /></AppendixSection><AppendixSection id="appendix-note-3" title="Koordinaten in DMS umwandeln"><Code code={py3} language="python" /></AppendixSection><AppendixSection id="appendix-note-4" title="Schriftarten und Beschriftung"><Code code={py4} language="python" /></AppendixSection><AppendixSection id="appendix-note-5" title="Text und Karte zusammenführen"><Code code={py5} language="python" /></AppendixSection></TechnicalAppendix>
      <h2 id="sources">Datenquellen und Anwendungen</h2>
      <dl className="mobile-network-resources"><div className="mobile-network-resource"><dt>OSMnx Python package</dt><dd><a href={siteUrl("https://osmnx.readthedocs.io/en/stable/index.html")} target="_blank" rel="noopener noreferrer">Download, model, analyze, and visualize street networks</a></dd></div><div className="mobile-network-resource"><dt>GeoPy Python</dt><dd><a href={siteUrl("https://geopy.readthedocs.io/en/stable/")} target="_blank" rel="noopener noreferrer">Geocoding web
                                                    services</a></dd></div><div className="mobile-network-resource"><dt>Python Imaging Library</dt><dd><a href={siteUrl("https://pillow.readthedocs.io/en/stable/index.html")} target="_blank" rel="noopener noreferrer">Image
                                                    processing capabilities</a></dd></div><div className="mobile-network-resource"><dt>Geo-Python Bibliotheken</dt><dd><a href={siteUrl("https://geopandas.org/en/stable/getting_started/introduction.html")} target="_blank" rel="noopener noreferrer">Geopandas</a>,<a href={siteUrl("https://shapely.readthedocs.io/en/stable/index.html")} target="_blank" rel="noopener noreferrer">Shapely</a></dd></div><div className="mobile-network-resource"><dt>Fonts</dt><dd><a href={siteUrl("https://www.dafont.com/caviar-dreams.font")} target="_blank" rel="noopener noreferrer">CaviarDreams</a>,<a href={siteUrl("https://www.dafont.com/berlin-small-caps.font")} target="_blank" rel="noopener noreferrer">BerlinSmallCaps</a></dd></div></dl></AppendixProvider></div>;}
