import { siteUrl } from "./site-paths.js";import React from 'react';
import MapEmbed from './MapEmbed.jsx';
import Code from './CodeBlock.jsx';
import ProjectGallery from './ProjectGallery.jsx';
import ImageComparison from './ImageComparison.jsx';
import { AppendixProvider, AppendixLink, TechnicalAppendix, AppendixSection } from './TechnicalAppendix.jsx';
import { galleries } from './gallery-data.js';
import { py1, py2, py3, py4, py5, Fluss1, Fluss2, Fluss3, Fluss4, Cluster1, Cluster2, Cluster3, Cluster4, Cluster5, Cluster6 } from './kartenCode.jsx';
export const contents = [{ "id": "story-start", "title": "Einleitung" }, { "id": "section-2", "title": "Daten vorbereiten" }, { "id": "section-3", "title": "Vergleich der Datenlesegeschwindigkeit:" }, { "id": "section-4", "title": "Parquet und Feather Formate" }, { "id": "section-5", "title": "Programmierung" }, { "id": "visualisierung", "title": "Visualisierung" }, { "id": "gallery", "title": "Kartengalerie" }, { "id": "technical-appendix", "title": "Technical appendix" }, { "id": "sources", "title": "Datenquellen und Anwendungen:" }];
export default function FlusssystemArticle() {return <div className="mobile-network-article migrated-article"><AppendixProvider><h2 id="story-start">Einleitung</h2>
      <p>
                                Nachdem ich <a href={siteUrl("https://www.qgistutorials.com/en/docs/3/river_styling_expressions.html")} target="_blank" rel="noopener noreferrer"><strong>diesen Beitrag</strong></a> auf LinkedIn angesehen hatte, fühlte ich mich inspiriert, diesen Weg zu wiederholen, jedoch
                                ausschließlich durch die
                                Programmierung mit Python und ein wenig Übung im Umgang mit GeoPandas, Matplotlib, PIL, OSMnx
                                und anderen Bibliotheken.
                                Schließlich hat jedes Projekt viele Feinheiten, und jedes Mal entdeckt man etwas Neues. Und
                                dieses Mal war keine
                                Ausnahme.</p>
      <p>Das Projektziel ist es, das
                                globale Flusssystem eines bestimmten Landes oder ganzen Kontinents zu filtern und zu
                                stilisieren, wobei der Prozess der Datenerfassung mithilfe von Python automatisiert wird.
                                Die Visualisierung des Flusssystems kann auf einem einzigen Parameter oder einer Kombination von
                                ihnen basieren, zum
                                Beispiel:
                            </p>
      <ul>
                                <li>Die Flussordnungsnummer gemäß dem
                                    Strahler-Ordnungssystem: Die Ordnung 1
                                    repräsentiert Quellbäche; wenn zwei Bäche 1.
                                    Ordnung aufeinandertreffen, bilden sie einen Fluss 2. Ordnung; wenn zwei Flüsse 2. Ordnung
                                    aufeinandertreffen, bilden
                                    sie einen Fluss 3. Ordnung; und so weiter.
                                </li>
                                <li>Der Flussordnungsindikator gemäß dem klassischen
                                    Ordnungssystem: Die
                                    Ordnung 1 repräsentiert den Hauptfluss von der
                                    Quelle bis zur Mündung; Ordnung 2 repräsentiert alle Zuflüsse, die in einen Fluss 1. Ordnung
                                    münden; Ordnung 3
                                    repräsentiert alle Zuflüsse, die in einen Fluss 2. Ordnung münden, und so weiter. Dieses
                                    Ordnungssystem kann verwendet
                                    werden, um "Hauptflüsse" zu bestimmen, d.h. den Hauptstamm eines Flusses von der Quelle bis
                                    zur Mündung.</li>
                                <li>Der Flussordnungsindikator unter Verwendung des
                                    Flussabflusses zur
                                    Ermittlung der Größen: Ordnung 1 repräsentiert
                                    Flussabschnitte mit einem mittleren mehrjährigen Abfluss ≥ 100.000 m3/s; Ordnung 2
                                    repräsentiert Flussabschnitte mit
                                    einem mittleren mehrjährigen Abfluss ≥ 10.000 m3/s und &lt; 100.000 m3/s; ... Ordnung 9
                                    repräsentiert Flussabschnitte mit einem mittleren mehrjährigen Abfluss ≥ 0,001 m3/s und
                                    &lt; 0,01 m3/s; und Ordnung 10 repräsentiert Flussabschnitte mit einem mittleren
                                    mehrjährigen Abfluss &lt; 0,001 m3/s (d.h. 0 in den vorliegenden Daten aufgrund der Rundung
                                    auf 3 Stellen). </li>
                                <li>Der Gesamtflächenindikator im Oberlauf, in
                                    Quadratkilometern, berechnet
                                    von den Quellen bis zum Übergangspunkt (d.h. dem
                                    untersten Pixel) der Erreichbarkeit. Die Fläche des Oberlaufs umfasst nur das unmittelbar
                                    mit dem Einzugsgebiet
                                    verbundene Gebiet, d.h. es umfasst nicht die endorheischen Regionen, die in ein größeres
                                    Becken eingebettet sein können.</li>
                                <li>Die Linienfarben der Flüsse - eine passende Farbpalette
                                    von Matplotlib
                                    oder Colorcet.</li>
                            </ul>
      <h2 id="section-2">Daten vorbereiten</h2>
      <p>
                                Auf der HydroSHEDS-Website im Abschnitt <a href={siteUrl("https://www.hydrosheds.org/products/hydrorivers")} target="_blank" rel="noopener noreferrer"><strong>HydroRIVERS</strong></a> werden Daten in Form von
                                Geodatenbank und Shapefile bereitgestellt.
                                Für das Projekt habe ich zwei Dateien heruntergeladen - Europa und Naher Osten und Südamerika im
                                Shapefile-Format. Die
                                Größe ist natürlich nicht klein. Europa und Naher Osten - 263 MB, Südamerika - 406 MB. Daher
                                liegt die Schwierigkeit in
                                der Arbeit mit solch großen Dateien in Python. Zum Beispiel dauert das Lesen eines gesamten
                                Shapefiles für Europa und
                                Nahen Osten 304 Sekunden, und für das Shapefile von Südamerika - 510 Sekunden. Ich beschloss, es
                                wäre besser, wenn ich
                                ein Land aus dem Subdataset auswähle (idealerweise ein kleineres), und mit den erhaltenen Daten
                                zu experimentieren.</p>
      <p>
                                Aber während der Arbeit stieß ich auf die Möglichkeit, Geodatensätze in das Parquet- oder
                                Feather-Format zu konvertieren
                                und sie dann zu komprimieren, und GeoPandas ermöglicht es, Dateien in diesem Format zu lesen,
                                indem sie sie unterwegs in
                                das gdf-Format umwandeln. Der Geschwindigkeitsgewinn erwies sich einfach als fantastisch, ich
                                konnte nicht einmal
                                vermuten, dass durch den Unterschied zwischen den GeoDataFrame-, Shapefile-, Feather- oder
                                Parquet-Formaten die Lese-
                                und Umwandlungsgeschwindigkeit so stark erhöht werden könnte. Die oben genannte Datei Europa und
                                Naher Osten wird nun
                                anstelle von 5 Minuten in 1,46 Sekunden in ein GeoDataFrame gelesen und umgewandelt, wenn sie 95
                                MB groß ist, das ist
                                einfach eine erstaunliche Geschwindigkeit.</p>
      <h2 id="section-3">Vergleich der Datenlesegeschwindigkeit:</h2>
      <p>
                                Europa: Shapefile 263 MB - 304 Sekunden. Feather 95 MB - 1,46 Sekunden.<br />
                                Südamerika: Shapefile 406 MB - 517 Sekunden. Feather 134MB - 3,94 Sekunden.</p>
      <p>
                                Deshalb habe ich die Shapefiles der Kontinente in das Feather-Format umgewandelt, ein Land
                                daraus ausgewählt, um damit
                                zu arbeiten, das erhaltene GeoDataFrame ebenfalls in Feather umgewandelt, und die Arbeit ging
                                viel schneller voran. Denn
                                nach dem Laden wird die Datei in ein gdf umgewandelt, und dann erfolgt die Arbeit damit nach den
                                üblichen Regeln von
                                GeoPandas, d.h. es wird nur die Geschwindigkeit des ursprünglichen Datenladens gewonnen, aber in
                                diesem Fall ist dies
                                ein enormer Geschwindigkeitsgewinn.</p>
      <h2 id="section-4">Parquet und Feather Formate</h2>
      <p>
                                Die Formate Parquet und Feather sind zwei moderne binäre Datenformate, die eine effiziente
                                Komprimierung sowie eine hohe
                                Lese- und Schreibgeschwindigkeit der Daten ermöglichen.</p>
      <p>
                                <b>Parquet:</b> Dieses spaltenbasierte Speicherformat ist für komplexe analytische Abfragen
                                optimiert. Es unterstützt
                                verschiedene Datentypen, Komprimierungsmethoden und Schemas, um Speicherplatz zu sparen und den
                                Zugriff auf Daten zu
                                beschleunigen. Parquet wird häufig in Datenverarbeitungssystemen wie Apache Spark und Hadoop
                                verwendet, um große
                                Datenmengen zu verarbeiten.
                            </p>
      <p>
                                <b>Feather:</b> Feather ist ein binäres Datenformat, das für schnelles Lesen und Schreiben von
                                Daten in pandas DataFrame
                                entwickelt wurde. Feather bietet hohe Leistung durch minimale Ein-/Ausgabe-Verzögerung und
                                die Eliminierung der
                                Notwendigkeit für zusätzliche Serialisierung/Deserialisierung von Daten. Feather eignet sich
                                ideal für den
                                plattformübergreifenden Datenaustausch zwischen verschiedenen Programmiersprachen.
                            </p>
      <h2 id="section-5">Programmierung</h2>
      <p>
                                Wie ich bereits erwähnt habe, kann die Visualisierung des Flusssystems auf einem einzelnen
                                Parameter oder einer
                                Kombination von ihnen basieren, daher habe ich zunächst den Indikator für die Gesamtfläche im
                                Oberlauf ausgewählt -
                                UPLAND_SKM und auf der Grundlage dieses Parameters eine neue Spalte line_width im gdf
                                hinzugefügt. Und ich habe eine
                                Funktion für die Linienbreite geschrieben, die auf den Daten aus dieser Spalte basiert.
                            </p>
      <AppendixLink target="appendix-note-1" origin="article-note-1">Linienbreite nach Einzugsgebietsfläche — Python-Code</AppendixLink>
      <p>
                                Wir können zusätzliche Daten aus anderen Spalten hinzufügen oder die Visualisierung nur auf der
                                Grundlage anderer oben
                                genannter Projektziele durchführen. Zum Beispiel so:
                            </p>
      <AppendixLink target="appendix-note-2" origin="article-note-2">Flussabschnitte filtern — Python-Code</AppendixLink>
      <p>
                                und erhalten ein völlig anderes Ergebnis.<br />
                                Es mag so aussehen, als gäbe es zu viele Flüsse oder genauer gesagt, ein Flusssystem sieht
                                unrealistisch aus, aber dabei
                                muss man berücksichtigen, dass nicht nur Flüsse oder ihre Zuflüsse berücksichtigt werden,
                                sondern auch allerlei Bäche
                                und Bächlein, deren Wasserdurchfluss pro Sekunde bis zu 0,001 m3/s beträgt. Wir können die Werte
                                filtern, indem wir
                                zusätzliche Parameter in der Ergebnisauswahl angeben.
                                Dann bestimmen wir auf der Grundlage der Fluss-ID in der Spalte MAIN_RIV die eindeutigen Flüsse
                                und erstellen basierend
                                darauf eine Farbpalette. In meinem Fall habe ich die 'Set2'-Palette aus den matplotlib-Colormaps
                                verwendet.
                            </p>
      <AppendixLink target="appendix-note-3" origin="article-note-3">Flusssysteme einfärben — Python-Code</AppendixLink>
      <p>
                                Dann bereiten wir den Subplot vor und drucken sofort unser modifiziertes gdf.
                            </p>
      <AppendixLink target="appendix-note-4" origin="article-note-4">Das Flusssystem zeichnen — Python-Code</AppendixLink>
      <h2 id="visualisierung">Visualisierung</h2>
      <p>
                                Das ist alles, die Hauptarbeit ist getan, der Code ist sehr kurz, aber meiner Meinung nach
                                fehlen nur noch ein paar
                                kleine Details und abschließende Feinheiten.
                            </p>
      <p>
                                Ich hatte den Wunsch, einen Rahmen hinzuzufügen (das Bild sieht meiner Meinung nach mit einem
                                Rahmen abgeschlossen aus)
                                und eine kurze Beschreibung dessen, was auf dem Bildschirm zu sehen ist, hinzuzufügen. Das
                                Stoppen dauerte ein paar
                                Tage. Der Rahmen war schnell gemacht, aber das Experimentieren mit Beschriftungen und dem
                                Hinzufügen des Namens des
                                Landes, der Hauptstadt des Landes, der Koordinaten der Stadt hat mich ein wenig verwirrt, denn
                                ich wollte diese Daten
                                ausschließlich aus der Geocodierung erhalten, dh nichts manuell eingeben außer dem Land. Obwohl
                                ich im Grunde genommen
                                das Land nicht angeben musste, die Namen aller Länder des Kontinents erhalten und mir erlauben
                                konnte, die
                                entsprechenden Zahlen zu drücken, oder sogar eine grafische Benutzeroberfläche in tkinter
                                erstellen konnte, aber etwas
                                hat mich aufgehalten :)
                            </p>
      <p>
                                Kurz gesagt, jetzt können wir sowohl die Daten des gesamten Kontinents als auch die Daten eines
                                einzelnen Landes drucken
                                und speichern. Wir können noch tiefer gehen und die Daten von Städten oder sogar beliebigen
                                Gebieten visualisieren, aber
                                das hängt von den Anforderungen ab. Also, beim Visualisieren eines Landes drucken wir seine
                                Hauptstadt, die Koordinaten
                                der Hauptstadt und können eine Flagge an ihrer Position hinzufügen. Und natürlich den Rahmen um
                                das Bild. So, ich fand
                                es interessant, jetzt möchte ich mich ein wenig ausruhen und mit anderen Daten experimentieren,
                                da gibt es sehr viel
                                Interessantes.
                            </p>
      <h2 id="gallery">Kartengalerie</h2>
      <ProjectGallery images={galleries.FlusssystemImages} title="Flusssysteme" />
      <p>
                                Der vollständige Code dieses Abenteuers ist auf <a href={siteUrl("https://github.com/Kirman442/hydrorivers.git")} target="_blank" rel="noopener noreferrer"><strong>GitHub</strong></a> verfügbar.
                            </p>
      <h2 id="technical-appendix">Technical appendix</h2><TechnicalAppendix count={4} description="Die Python-Beispiele aus der Projektgeschichte. Die Verweise im Text öffnen den passenden Abschnitt."><AppendixSection id="appendix-note-1" title="Linienbreite nach Einzugsgebietsfläche"><Code code={Fluss1} language="python" /></AppendixSection><AppendixSection id="appendix-note-2" title="Flussabschnitte filtern"><Code code={Fluss2} language="python" /></AppendixSection><AppendixSection id="appendix-note-3" title="Flusssysteme einfärben"><Code code={Fluss3} language="python" /></AppendixSection><AppendixSection id="appendix-note-4" title="Das Flusssystem zeichnen"><Code code={Fluss4} language="python" /></AppendixSection></TechnicalAppendix>
      <h2 id="sources">Datenquellen und Anwendungen:</h2>
      <dl className="mobile-network-resources"><div className="mobile-network-resource"><dt>Python packages and libraries:</dt><dd>json, urllib.request, os, osmnx, matplotlib, geopandas, PIL</dd></div><div className="mobile-network-resource"><dt>HydroSHEDS</dt><dd><a href={siteUrl("https://www.hydrosheds.org/")} target="_blank" rel="noopener noreferrer">Seamless
                                                hydrographic data for global and regional applications</a></dd></div></dl></AppendixProvider></div>;}
