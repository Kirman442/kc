import { siteUrl } from "./site-paths.js";import React from 'react';
import MapEmbed from './MapEmbed.jsx';
import Code from './CodeBlock.jsx';
import ProjectGallery from './ProjectGallery.jsx';
import ImageComparison from './ImageComparison.jsx';
import { AppendixProvider, AppendixLink, TechnicalAppendix, AppendixSection } from './TechnicalAppendix.jsx';
import { galleries } from './gallery-data.js';
import { py1, py2, py3, py4, py5, Fluss1, Fluss2, Fluss3, Fluss4, Cluster1, Cluster2, Cluster3, Cluster4, Cluster5, Cluster6 } from './kartenCode.jsx';
export const contents = [{ "id": "story-start", "title": "Projektziel" }, { "id": "section-2", "title": "Hauptteil" }, { "id": "section-3", "title": "Vorüberlegung" }, { "id": "section-4", "title": "Aufbereitung der Strecken Feature Class" }, { "id": "section-5", "title": "Umsetzung" }, { "id": "section-6", "title": "Berechnung der Sohlen- und Firstenhöhen" }, { "id": "section-7", "title": "TINs Entwurf und Erstellen der 3D Feature Class mit den Streckenkörpern" }, { "id": "section-8", "title": "Ergebnis und Fazit" }, { "id": "video", "title": "3D-Modell im Film" }, { "id": "sources", "title": "Datenquellen und Anwendungen:" }];
export default function BergbauArticle() {return <div className="mobile-network-article migrated-article"><h2 id="story-start">Projektziel</h2>
    <p>Die Ruhrkohle-Aktiengesellschaft (RAG)
                                befasst sich neben den sogenannten „Ewigkeitsarbeiten“ in der ehemaligen
                                Steinkohleregion an der Ruhr auch mit dem Risikomanagement des oberflächennahen Bergbaus. Die
                                hinterblieben Hohlräume
                                sind durch Umwelteinflüsse Einsturz gefährdet und können in den oberen Schichten zum Einsacken
                                der Erdoberflächen
                                führen. Um Unfälle zu vermeiden, weißt die RAG sogenannte Gefährdungsflächen aus, die aus
                                historischen Risswerken
                                ermittelt wurden. Diese stellen jedoch nicht die exakte Position der bergbaulichen Strukturen da
                                und können nur durch
                                weitere Berechnungen verortet werden. Mittels GIS ist es möglich dreidimensionale Körper zu
                                visualisieren. Ein Problem
                                stellt dabei die Größe der Datenmenge dar. Bei einem Datensatz von ca. 16 000 Strecken, Abbauen
                                und anderen
                                bergbaulichen Objekten, ist die manuelle Bearbeitung nur mit einem extrem hohen Zeitaufwand
                                realisierbar.</p>
    <p>
                                Das Ziel dieser Projektarbeit ist es ein Verfahren zu entwickeln, das bergbauliche Strukturen
                                auf Grundlage
                                ausgewiesener Gefährdungsflächen und anderen historischen Risswerkinformationen automatisiert
                                darstellt. Das Projekt
                                soll sich dabei auf Strecken und Abbauen beschränken.</p>
    <p>
                                Zur Realisierung des Projektziels werden die Programme ArcGIS Pro, Code Editoren wie Spyder oder
                                VScode und verschiedene
                                Python bibliotheken verwendet. Mit deren hilfe soll ein Skript entworfen werden, dass Strecken
                                und Abbaue als 3D Feature
                                Classes in einer Geodatabase automatisiert hinterlegen kann. Das Skript soll bei der Übergabe
                                als benutzerfreundliches
                                tool in ArcGIS Pro anwendbar sein. Die Eingabe in der GUI (Graphical User interface soll aus
                                folgenden Dateien bestehen:</p>
    <ul>
                                <li>shape-file der Gefährdungsflächen der Strecken und Abbaue
                                </li>
                                <li>shape-file der zugehörigen Floezausbisslinien</li>
                                <li>Excel-Tabelle mit weiteren Risswerkinformationen</li>
                                <li>DGM-file der zu betrachtenden Fläche.</li>
                            </ul>
    <h2 id="section-2">Hauptteil</h2>
    <h2 id="section-3">Vorüberlegung</h2>
    <div className="illustrated-note"><div className="illustrated-media">
        <figure className="article-figure"><a href={siteUrl("/images/bergbau/stollenbau.webp")} target="_blank" rel="noopener noreferrer"><img src={siteUrl("/images/bergbau/stollenbau.webp")} alt="Stollenbau" loading="lazy" /></a></figure>
      </div><div className="illustrated-copy">
        <p>Beim Schreiben eines
                                        Python-Skripts müssen Strecken und Abbaue einzeln betrachtet werden. Strecken dienten
                                        damals als
                                        unterirdischen Tunner, die zur Erschließung und Aufteilung der Abbaufelder ausgebaut
                                        wurden. Sie fungierten als
                                        Verbindungsstücke zu den Schächten und wurden für den Abtransport der Mineralien
                                        genutzt. Sie befinden sich nahezu
                                        waagerecht im Raum und wurden bei der Bearbeitung der 3D-Körper ohne Rotation erstellt.
                                        Abbaue hingegen orientieren sich
                                        entlang der Floeze, welche in einem gewissen Floezeinfallswinkel vorliegen. Die Abbaue
                                        liegen somit rotiert im Raum und
                                        müssen getrennt in der Skriptbearbeitung behandelt werden.</p>
      </div></div>
    <h2 id="section-4">Aufbereitung der Strecken Feature Class</h2>
    <p>Zu Beginn des Skriptentwurf
                                müssen die sidepackages arcpy und math importiert werden. Erst dann können ArcGIS Funktionen
                                und Methoden und mathematischen Formel genutzt werden. Zur Darstellung von Höheneigenschaften
                                können in ArcGIS Pro
                                verschiedene Höhenmodelle genutzt werden. Für die extrudebetween Funktion müssen jedoch
                                sogenannte TINs (Triangulated
                                Irregular Networks) vorliegen.
                            </p>
    <p>
                                Da Strecken weitgehend waagerecht verlaufen und die Sohlenhöhen als gleichbleibend angenommen
                                werden, wird den TINs
                                jeweils nur eine Höhe zugeteilt. Die Höheninformation liegen weder in den Attributen der
                                shp-files noch in der
                                Excel-Tabelle vor und müssen aus der Teufenhöhe und einem digitalem Geländemodell (DGM)
                                berechnet werden. Dabei wird mit
                                der arcpy-Funktion featureClasstoFeatureClass zur weiteren Bearbeitung eine Kopie aus den
                                Gefährdungsflächen erstellt.
                                Diese liegt nun in Form einer Feature Class (FC) vor, welche fortan als Strecken FC betrachtet
                                wird. Im nächsten Schritt
                                soll die FC um ausgewählte Spalteninformationen der Excel-Tabelle erweitert werden. Dafür wurden
                                mit der Funktion
                                arcpy.management.AddFields die Spalten mit den Namen 'floezeinfallen', 'maechtigkeit',
                                'teufe_festgestein',
                                'teufe_karbon', 'teufe_grubenbau' erweitert, die aus der exceltabelle in gleicher Reihenfolge
                                entnommen wurden. Mit der
                                gleichen Ausführung werden die Spalten 'Z_Wert_Boden' und 'Z_Wert_Decke' erstellt, die später
                                die berechneten Z-Werte
                                der Strecken als Eintrag erhalten.</p>
    <p>
                                Im nächsten Schritt werden die Informationen der Excel-Tabelle in die neuen Spalten der Strecken
                                FC überführt. Hierfür
                                wird der UpdateCursor genutzt und für die Zuordnung der Spalten- Informationen zwei
                                If-Bedingungen gesetzt. Dabei werden
                                beim iterieren nur den Objektreihen Informationen zugewiesen bei denen die Namen und
                                Gefahrenarten der Strecken
                                identisch mit denen der Excel-Tabelle sind (sinngemäße Übertragung: „NAME“ == „Bezeichnung“
                                AND „GEF_ART“ ==
                                „Grubenbauart“).</p>
    <h2 id="section-5">Umsetzung</h2>
    <h2 id="section-6">Berechnung der Sohlen- und Firstenhöhen</h2>
    <div className="illustrated-note"><div className="illustrated-media">
        <figure className="article-figure"><a href={siteUrl("/images/bergbau/StreckeUndAbbauFrage.webp")} target="_blank" rel="noopener noreferrer"><img src={siteUrl("/images/bergbau/StreckeUndAbbauFrage.webp")} alt="Strecke" loading="lazy" /></a></figure>
      </div><div className="illustrated-copy">
        <p>Um die Sohlenhöhen
                                        der Strecken Features berechnen zu können, wird die Höheninformation im Bereich der
                                        einzelnen
                                        Features aus einem Pixel der DGM (absolute Höhe) entnommen und um die Teufe reduziert.
                                        Die Firsthöhen ergeben sich aus
                                        den Sohlenhöhen und der Mächtigkeit. Beide Informationen sind durch die
                                        Spaltenerweiterung verfügbar. Da Oberflächen
                                        unregelmäßige Strukturen aufweisen, soll die abgegriffene Höhe aus der DGM immer von
                                        einem der Anfangspunkte der
                                        Strecken gewählt werden. Dieser wird mit der distanceto-Methode ermittelt, da der
                                        Stützpunkt mit der größten Distanz zur
                                        Abbaue gleichzeitig den Anfang der Strecken markiert.</p>
      </div></div>
    <div className="illustrated-note"><div className="illustrated-media">
        <figure className="article-figure"><a href={siteUrl("/images/bergbau/StreckeUndAbbau_punkte.webp")} target="_blank" rel="noopener noreferrer"><img src={siteUrl("/images/bergbau/StreckeUndAbbau_punkte.webp")} alt="StreckeUndAbbau" loading="lazy" /></a></figure>
      </div><div className="illustrated-copy">
        <p>Über den searchcursor
                                        werden die Punkte der Features ausgelesen und die Distanzen zur Abbaue- Geometrie
                                        verglichen. Ist
                                        die Entfernung größer gelangen die Koordinaten des Punktes in eine neue Liste. Die
                                        XY-Koordinaten mit der kleineren
                                        Entfernung wir aus der Liste ersetzt, sodass am Ende nur ein Punkt übrig bleibt. Diese
                                        Methode wird durch alle
                                        Stützpunkte iteriert bis der Punkt mit der größten Entfernung feststeht. Die Startpunkte
                                        bzw. Abgreifpunkte zur
                                        Höhenermittlung werden in einer dictionary festgelhalten. Als keys werden die
                                        Streckennamen und Koordinaten als values
                                        definiert.</p>
      </div></div>
    <p>
                                Da das DGM im UTM-Format vorliegt, müssen die Koordinaten der Abgreifpunkte aus dem
                                Gauss-Krüger-System (DHDN 3- Degree
                                Gauss Zone 2) ins UTM-System (ETRS 1989 UTM Zone 32N) umgewandelt werden. Dies wird mit der
                                Funktion
                                Transformer.from_crs und transformer.transform durchgeführt. Die Höhenwerte werden anschließend
                                aus den umgewandelten
                                Variablen mit der getcellvalue methode aus der DGM ausgelesen und in eine neue Liste mit
                                Zuordnung der Strecken
                                gespeichert.</p>
    <div className="illustrated-note"><div className="illustrated-media">
        <figure className="article-figure"><a href={siteUrl("/images/bergbau/tins_skizze.webp")} target="_blank" rel="noopener noreferrer"><img src={siteUrl("/images/bergbau/tins_skizze.webp")} alt="Tins skizze" loading="lazy" /></a></figure>
      </div><div className="illustrated-copy">
        <p>Für die
                                        3D-Visualisierung wurde hier die Funktion extrudebetween gewählt. Dabei werden
                                        prinzipiell drei digitale Objekte
                                        benötigt. Zum einen b ein Oberflächenmodell, dass die Sohlenhöhe der Strecken begrenzt,
                                        also die absolute Höhe des
                                        Streckenbodens darstellt. Zum anderen ein zweites Höhenmodell mit der absoluten Höhe der
                                        Firste, die der Streckendecke.</p>
      </div></div>
    <p>
                                Das dritte Objekt ist eine Liste mit den X- und Y- Koordinaten des zu erstellenden 3D-Körpers.
                                Diese sind bereits
                                bekannt, da die Strecken exakt unter der Gefährdungsflächen liegen und somit die Koordinaten der
                                zugehörigen
                                Gefährdungsfläche kopiert bzw. abgegriffen werden können. Die extrudebetween Methode erstellt
                                mit ihrer Ausführung
                                innerhalb der zugewiesenen Oberflächenmodellen und im Bereich der XY-Koordinaten einen neuen 3D
                                Körper und speichert
                                diese in eine neue FeatureClass ab. Im folgenden Abschnitt soll noch einmal detaillierter auf
                                die Methode zum Abgreifen
                                der XY Koordinaten und der Erstellung der Oberflächenmodelle eingegangen werden.</p>
    <h2 id="section-7">TINs Entwurf und Erstellen der 3D Feature Class mit den Streckenkörpern</h2>
    <div className="illustrated-note"><div className="illustrated-media">
        <figure className="article-figure"><a href={siteUrl("/images/bergbau/tins_new.webp")} target="_blank" rel="noopener noreferrer"><img src={siteUrl("/images/bergbau/tins_new.webp")} alt="Tins new skizze" loading="lazy" /></a></figure>
      </div><div className="illustrated-copy">
        <p> Die meisten Oberflächenanalysen in GIS werden von Raster-
                                        oder
                                        TIN-Daten ausgeführt</p>
        <p>Zur automatisierten
                                        Feature Class Erstellung der dreidimensionalen Strecken werden nur noch zwei Funktionen
                                        benötigt.
                                        Wie bereits zu Beginn des Hauptteils erwähnt, bedarf es neben den XYGeometrien der
                                        Strecken, die jeweiligen TINs aus den
                                        Firsthöhen und Sohlenböden um die extrudebetween-Funktion durchführen zu können. Diese
                                        können nun für jedes Feature
                                        erstellt werden. Bei den in_features muss dabei vor der Ausführung der Parameter sf_type
                                        mit „Soft Clip“ angegeben werden. Mit dieser Einstellung wird die Rolle des
                                        Eingabe-Features definiert, die so die
                                        TIN-Oberflächenerstellung auf die
                                        Flächen der einzelnen Features begrenzt. Jedes Feature erhält dadurch jeweils zwei
                                        individuelle
                                        TINs. Wie auch die
                                        Feature Classes werden TINs in eine file Gedatabase abgespeichert und können in ArcGIS
                                        Pro
                                        visualisiert werden.</p>
      </div></div>
    <div className="illustrated-note"><div className="illustrated-media">
        <figure className="article-figure"><a href={siteUrl("/images/bergbau/3DStrecke2.webp")} target="_blank" rel="noopener noreferrer"><img src={siteUrl("/images/bergbau/3DStrecke2.webp")} alt="3DStrecke" loading="lazy" /></a></figure>
      </div><div className="illustrated-copy">
        <p> Modellierung und Erstellung eines dreidimensionalen Objekts
                                        auf der Grundlage der Daten</p>
        <p>Im letzten Schritt
                                        kann nun die extrudebetween-Funktion angewandt werden. Dabei müssen keine weiteren
                                        Parametereinstellungen beachtet werden. Die TINs und Strecken-Polygone sind exakt so
                                        beschnitten, dass nur noch die
                                        Eingabe-Werte, der Speicherort und der 3D Feature Class Name eingegeben werden muss. Die
                                        erstellten TINs werden
                                        anschließend mit der management.Delete- Funktion zur Reduktion überflüssiger Daten
                                        gelöscht. Die Strecken-Körper können
                                        jetzt in ArcGIS Pro visualisiert werden (Abb. rechts). In ArcGIS Pro muss dafür die
                                        Anzeige unter dem Reiter Ansicht von
                                        2D Karte in eine globale Szene umgewandelt werden. Um das Sichtfeld unter der Oberfläche
                                        zu aktivieren muss das
                                        Navigieren unter der Oberfläche aktiviert sein.</p>
      </div></div>
    <h2 id="section-8">Ergebnis und Fazit</h2>
    <div className="illustrated-note"><div className="illustrated-media">
        <figure className="article-figure"><a href={siteUrl("/images/bergbau/3DStrecke3.webp")} target="_blank" rel="noopener noreferrer"><img src={siteUrl("/images/bergbau/3DStrecke3.webp")} alt="3DStrecke" loading="lazy" /></a></figure>
      </div><div className="illustrated-copy">
        <p>Am Ende der Berechnungen und Transformationen haben wir ein
                                        fertiges 3D-Modell</p>
        <p>Aus dem bis hierhin
                                        beschriebenen Skripts wurde mit der tool-box und einer GUI in ArcGIS pro eine
                                        benutzerfreundliches
                                        tool entworfen. Dabei wurde die GUI so erstellt dass man die Pfade der Eingabe-Dateien
                                        einträgt, wie bereits im Teil
                                        Lösungsansatz beschrieben, eine Geodatabase als output-path und den neuen 3D Feature
                                        Class Namen.
                                        In Eigenleistung wurde ein Programm geschrieben, das 3D Objekte von bergbaulichen
                                        Strecken automatisiert ausgibt und
                                        eine 2D Feature Class der Abbau-Flächen erstellt.<br />Den Projektpartnern Herrn Schnell
                                        und Herrn Wiland von der RAG wurden nach Abschluss der
                                        Projektzzeit das Python-Skript
                                        als py-Datei, das fertige tool als tbx-Datei und dieser Projektbericht digital
                                        übergeben.</p>
      </div></div>
    <p>
                                Unten können Sie ein kurzes Video sehen, das 2D-Polygone zeigt, die aus den Originaldaten
                                gewonnen wurden, sowie
                                3D-Objekte, die mit den oben genannten Visualisierungsmethoden gewonnen wurden.
                            </p>
    <h2 id="video">3D-Modell im Film</h2><figure className="article-video"><video controls preload="metadata" playsInline src={siteUrl("/images/bergbau/Scene640_480_191123.mp4")} aria-label="Bergbaustrukturen in 3D" /><figcaption>3D-Bergbaustrukturen · Projektvideo</figcaption></figure>
    <h2 id="sources">Datenquellen und Anwendungen:</h2>
    <dl className="mobile-network-resources"><div className="mobile-network-resource"><dt>A Python library to read/write Excel 2010</dt><dd><a href={siteUrl("https://openpyxl.readthedocs.io/en/stable/")} target="_blank" rel="noopener noreferrer">openpyxl</a></dd></div><div className="mobile-network-resource"><dt>A Cartographic projections and coordinate transformations library</dt><dd><a href={siteUrl("https://pypi.org/project/pyproj/")} target="_blank" rel="noopener noreferrer">pyproj</a></dd></div><div className="mobile-network-resource"><dt>A Python site package used with ArcGIS Pro</dt><dd><a href={siteUrl("https://pro.arcgis.com/en/pro-app/latest/arcpy/get-started/what-is-arcpy-.htm")} target="_blank" rel="noopener noreferrer">ArcPy</a></dd></div></dl></div>;}
