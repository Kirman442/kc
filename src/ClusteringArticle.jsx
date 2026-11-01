import { siteUrl } from "./site-paths.js";import React from 'react';
import MapEmbed from './MapEmbed.jsx';
import Code from './CodeBlock.jsx';
import ProjectGallery from './ProjectGallery.jsx';
import ImageComparison from './ImageComparison.jsx';
import { AppendixProvider, AppendixLink, TechnicalAppendix, AppendixSection } from './TechnicalAppendix.jsx';
import { galleries } from './gallery-data.js';
import { py1, py2, py3, py4, py5, Fluss1, Fluss2, Fluss3, Fluss4, Cluster1, Cluster2, Cluster3, Cluster4, Cluster5, Cluster6 } from './kartenCode.jsx';
export const contents = [{ "id": "story-start", "title": "Einleitung" }, { "id": "section-2", "title": "Räumliche Verbindung" }, { "id": "section-3", "title": "Daten Hochladen" }, { "id": "map", "title": "Web-App" }, { "id": "technical-appendix", "title": "Technical appendix" }, { "id": "sources", "title": "Datenquellen und Anwendungen" }];
export default function ClusteringArticle() {return <div className="mobile-network-article migrated-article"><AppendixProvider><h2 id="story-start">Einleitung</h2>
      <p>
                                Clustering ist eine Methode zur Reduzierung von Punkten in einer Ebene, indem sie auf der
                                Grundlage ihrer räumlichen
                                Nähe zueinander in Clustern gruppiert werden. Die Größe der Cluster ist in der Regel
                                proportional zur Anzahl der Objekte
                                in jedem Cluster. Mit Hilfe von Clustern kann man effektiv sichtbar machen, wo sich Punkte
                                überschneiden oder sehr nahe
                                beieinander liegen.</p>
      <p>Für mein Beispiel habe ich
                                Daten im Geojson-Format über die weltweiten Standorte von Mobilfunkmasten mit 5G-Sendern
                                genommen und aus dem Datensatz nur diejenigen herausgeschnitten, die sich ausschließlich in
                                Deutschland befinden.
                            </p>
      <p>
                                Der ursprüngliche Datensatz enthielt die folgenden Felder: Name des Mobilfunkbetreibers, Name
                                der Stadt, Einsatzart und
                                Nutzungsstatus, aber kein Feld, in welchem Bundesland sich der Turm befindet. Vielleicht
                                brauchen wir es für weitere
                                Analysen. Und natürlich das Feld mit der Geometrie.</p>
      <AppendixLink target="appendix-note-1" origin="article-note-1">Ausgangsdaten als GeoJSON - Python-Code</AppendixLink>
      <p>
                                Zuerst dachte ich, es wäre eine gute Idee, den Datensatz nach deutschen Städten zu filtern und
                                gleichzeitig ein neues
                                Feld für die Turmzugehörigkeit zu Bundesland hinzuzufügen. Ich habe eine Liste von Städten
                                heruntergeladen, die zum
                                Zeitpunkt 2024 bereits 2056 umfasste und in der eine Korrelation der Stadt des entsprechenden
                                Bundeslandes vorhanden
                                war.</p>
      <AppendixLink target="appendix-note-2" origin="article-note-2">Städte zu Bundesländern zuordnen - Python-Code</AppendixLink>
      <p>
                                Ich filterte den ursprünglichen Datensatz nach den Städten, wobei ich ein neues Feld hinzufügte,
                                und nun sieht das
                                Objektverzeichnis wie folgt aus:</p>
      <AppendixLink target="appendix-note-3" origin="article-note-3">Ergebnis der Zuordnung - Python-Code</AppendixLink>
      <p>
                                Es hat alles geklappt, jetzt haben wir ein Feld "land_type", aber unerwartet habe ich
                                herausgefunden, dass es in einigen
                                Ländern Städte gibt, deren Namen die gleiche Schreibweise wie die deutschen haben, oder dass es
                                in Deutschland Städte
                                mit Namen aus anderen Ländern gibt. Man könnte in aller Ruhe deren Geschichte nachschlagen, das
                                wäre sicher interessant.</p>
      <p>
                                Aus dem Original-Sabset geht hervor, dass es in England solche Städte gibt, die dem deutschen
                                Marlow, Norden, Kirn
                                entsprechen. Wer hätte gedacht, dass es in Frankreich, wenn auch eher in Deutschland, eine Stadt
                                namens "Barby" * mit
                                demselben französischen Namen gibt. Überraschenderweise tauchten die Doppelgänger von Minden,
                                Waldeck, Linden und
                                Warburg in Kanada auf. Ich mein's ernst, Australien hat berühmte Städte wie Münster, Heidelberg
                                und Coburg.</p>
      <p>
                                Nach dem Filtern machte ich also einige unerwartete geografische Entdeckungen und reiste
                                virtuell durch diese Städte.
                            </p>
      <h2 id="section-2">Räumliche Verbindung</h2>
      <p>
                                Da wir sie aber für unsere Karte nicht brauchen, werden wir sie auf viel zuverlässigere Weise
                                los, indem wir eine
                                räumliche Verknüpfung (Spatial Join / Räumliche Verbindung) verwenden. Räumliche Verbindung -
                                vereinigt Attribute eines
                                Features basierend auf der räumlichen Beziehung mit den Attributen eines anderen. Die
                                Ziel-Features und die vereinigten
                                Attribute aus den Verbindungs-Features werden in die Ausgabe-Feature-Class geschrieben.
                            </p>
      <p>
                                Zu diesem Zweck benötigen wir Deutschlands Grenzen in Form eines Polygons. Wir können sie finden
                                und aus öffentlichen
                                Daten herunterladen, aber die Suche kann lange dauern und es ist nicht sicher, dass das Ergebnis
                                für uns geeignet ist.
                            </p>
      <p>
                                Mit unserer Erfahrung und der ausgezeichneten OSMnx-Bibliothek, die ich bereits im Projekt
                                'Kunstkarten mit Python'
                                erwähnt habe. Ein paar Zeilen Code und schon haben wir die genauen Grenzen Deutschlands aus
                                OpenStreetMaps in Form eines
                                Polygons in der Tasche, oder besser gesagt in Programmspeicher.
                            </p>
      <p>
                                Wir verknüpfen die Daten mit unserer neuen Liste von Funkmasten und schreiben das Ergebnis in
                                eine neue geojson-Datei.
                            </p>
      <AppendixLink target="appendix-note-4" origin="article-note-4">Räumliche Verknüpfung mit Deutschland - Python-Code</AppendixLink>
      <p>
                                Es ist auf jeden Fall einfacher, genauer und schneller als die Suche nach den Grenzen einer
                                Verwaltungseinheit, z. B.
                                des Landes Algerien oder der Stadt Barby in Frankreich :)
                            </p>
      <p>
                                Wir können die neue Datei überall verarbeiten, aber in diesem Fall möchte ich sie auf mein
                                ArcGIS Developers-Konto
                                hochladen, um sie später zu visualisieren und eine einseitige React- Webanwendung zu erstellen.
                            </p>
      <h2 id="section-3">Daten Hochladen</h2>
      <p>
                                Dazu benötigen wir die Python-API, die ich ganz am Anfang importiert habe. Logge ein, fülle die
                                Daten unseres Layers
                                aus, von denen wir einige für die weitere Identifizierung benötigen. Der Parameter
                                item_properties ermöglicht uns dies.
                            </p>
      <AppendixLink target="appendix-note-5" origin="article-note-5">Den ArcGIS-Layer vorbereiten - Python-Code</AppendixLink>
      <p>
                                Dann müssen wir prüfen, ob eine solche Ebene bereits geladen ist oder nicht, damit wir sie im
                                Falle einer
                                Datenaktualisierung überschreiben können. Aus diesem Grund müssen wir eine eindeutige
                                Beschreibung für unsere Ebene
                                angeben. Wenn die Ebene existiert, wird sie überschrieben, wenn nicht, wird sie neu erstellt.
                            </p>
      <p>
                                Beim Überschreiben ist es wichtig, dass die Ebene dieselbe ID hat, da unsere Karte diese Ebene
                                ständig verwenden wird.
                            </p>
      <AppendixLink target="appendix-note-6" origin="article-note-6">Den Feature-Layer aktualisieren - Python-Code</AppendixLink>
      <p>
                                Sobald die Geojson-Daten hochgeladen sind, werden sie automatisch als Feature Layer (gehostet)
                                veröffentlicht und wir
                                können damit arbeiten. Es ist möglich, nur mit Geojson zu arbeiten, aber der gehostete
                                Feature-Layer gibt uns mehr
                                Möglichkeiten.
                            </p>
      <p>
                                Installieren wir React mit Vite, installieren wir die Abhängigkeiten und notwendigen
                                Bibliotheken. Das dauert etwa 10
                                Minuten. Dann fügen wir die erforderlichen Module ein, visualisieren die Ebene auf schnelle und
                                unterhaltsame Weise. Das
                                nimmt natürlich mehr Zeit in Anspruch, vor allem, wenn Sie die Visualisierung nach eindeutigen
                                Werten verwenden, wie ich
                                es in meinem Beispiel getan habe, aber es kostet auch nicht viel Mühe.
                            </p>
      <h2 id="map">Web-App</h2>
      <p>
                                Laden alles auf Github hoch und voila, unsere Karte ist jetzt eine Webanwendung und jeder kann
                                sie sehen.
                            </p>
      <p>
                                <sup>*</sup> Barby ist eine französische Gemeinde mit 3553 Einwohnern im Département Savoie in
                                der Region Auvergne-Rhône-Alpes. Die
                                Bewohner werden Barbysins und Barbysines genannt.
                            </p>
      <p>
                                <sup>**</sup> Anfang März gab es folgende Mobilfunkmasten: Telekom Deutschland - 1736, O2 - 940,
                                Vodafone - 858.
                            </p>
      <MapEmbed url="https://kirman442.github.io/ookla/" title="5G-Netz Deutschland" caption="Mobilfunkstandorte / räumliche Cluster / ArcGIS" />
      <h2 id="technical-appendix">Technical appendix</h2><TechnicalAppendix count={6} description="Die Python-Beispiele aus der Projektgeschichte. Die Verweise im Text öffnen den passenden Abschnitt."><AppendixSection id="appendix-note-1" title="Ausgangsdaten als GeoJSON"><Code code={Cluster1} language="python" /></AppendixSection><AppendixSection id="appendix-note-2" title="Städte zu Bundesländern zuordnen"><Code code={Cluster2} language="python" /></AppendixSection><AppendixSection id="appendix-note-3" title="Ergebnis der Zuordnung"><Code code={Cluster3} language="python" /></AppendixSection><AppendixSection id="appendix-note-4" title="Räumliche Verknüpfung mit Deutschland"><Code code={Cluster4} language="python" /></AppendixSection><AppendixSection id="appendix-note-5" title="Den ArcGIS-Layer vorbereiten"><Code code={Cluster5} language="python" /></AppendixSection><AppendixSection id="appendix-note-6" title="Den Feature-Layer aktualisieren"><Code code={Cluster6} language="python" /></AppendixSection></TechnicalAppendix>
      <h2 id="sources">Datenquellen und Anwendungen</h2>
      <dl className="mobile-network-resources"><div className="mobile-network-resource"><dt>Python packages and libraries:</dt><dd>Geopandas , Json , Osmnx , ArcGIS API for Python</dd></div><div className="mobile-network-resource"><dt>5G GeoJSON Source data</dt><dd><a href={siteUrl("https://www.speedtest.net/ookla-5g-map")} target="_blank" rel="noopener noreferrer">Ookla 5G Map™</a></dd></div><div className="mobile-network-resource"><dt>Vitejs.dev</dt><dd><a href={siteUrl("https://vitejs.dev/")} target="_blank" rel="noopener noreferrer">Next
                                                Generation Frontend Tooling</a></dd></div><div className="mobile-network-resource"><dt>React.js</dt><dd><a href={siteUrl("https://react.dev/")} target="_blank" rel="noopener noreferrer">React library for web interfaces
                                            </a></dd></div><div className="mobile-network-resource"><dt>ArcGIS Maps SDK for JavaScript:</dt><dd><a href={siteUrl("https://developers.arcgis.com/javascript/latest/")} target="_blank" rel="noopener noreferrer">Data
                                                visualisation and hosting</a></dd></div><div className="mobile-network-resource"><dt>Website erstellen:</dt><dd><a href={siteUrl("https://pages.github.com/")} target="_blank" rel="noopener noreferrer">GitHub
                                                Pages</a></dd></div></dl></AppendixProvider></div>;}
