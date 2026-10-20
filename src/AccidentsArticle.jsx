import { siteUrl } from "./site-paths.js";import React from 'react';
import MapEmbed from './MapEmbed.jsx';
import Code from './CodeBlock.jsx';
import ProjectGallery from './ProjectGallery.jsx';
import ImageComparison from './ImageComparison.jsx';
import { AppendixProvider, AppendixLink, TechnicalAppendix, AppendixSection } from './TechnicalAppendix.jsx';
import { galleries } from './gallery-data.js';
import { py1, py2, py3, py4, py5, Fluss1, Fluss2, Fluss3, Fluss4, Cluster1, Cluster2, Cluster3, Cluster4, Cluster5, Cluster6 } from './kartenCode.jsx';
export const contents = [{ "id": "story-start", "title": "Einleitung" }, { "id": "section-2", "title": "Datenvorbereitung" }, { "id": "section-3", "title": "Daten laden und verarbeiten" }, { "id": "section-4", "title": "Zusammenfassung und Schlussfolgerungen" }, { "id": "map", "title": "Web-App" }, { "id": "section-6", "title": "Weiterentwicklung und Optimierung" }, { "id": "sources", "title": "Datenquellen und Anwendungen" }];
export default function AccidentsArticle() {return <div className="mobile-network-article migrated-article"><h2 id="story-start">Einleitung</h2>
    <p>
                                Nach meiner Erfahrung mit deck.gl im Projekt "Bayern auf einen Blick" interessierte mich, wie die Kombination aus React + Supabase + Deck.gl mit verschiedenen räumlichen Abfragen und Filterungen funktionieren würde. Supabase unterstützt die PostGIS-Erweiterung und andere Geo-Erweiterungen von PostgreSQL "out of the box" sowie einen vollwertigen RESTful API mit PostgREST.
                            </p>
    <p>
                                Supabase generiert automatisch eine API direkt aus Ihrem Datenbankschema, sodass Sie über eine Restful-Schnittstelle direkt vom Browser aus eine Verbindung zu Ihrer Datenbank herstellen können.
                            </p>
    <p>Für solche Experimente ist es wünschenswert, einen großen Datensatz mit Hunderttausenden von Geodaten zu verwenden, um den Browser und das Framework richtig zu belasten, denn deck.gl ist ein GPU-gestütztes Framework für die visuelle explorative Datenanalyse großer Datensätze. In diesem Beispiel verwende ich "Die Straßenverkehrsunfallstatistik erfasst alle Unfälle mit Personen- oder Sachschäden auf öffentlichen Straßen und Plätzen, die von der Polizei aufgenommen werden" mit 269.000 Datensätzen aus ganz Deutschland. Ich denke, das ist ein sehr guter Ausgangspunkt, um das Zusammenspiel aller drei Komponenten - React.js + Supabase + Deck.gl - zu erleben.
                            </p>
    <h2 id="section-2">Datenvorbereitung</h2>
    <p>
                                Der ursprüngliche Datensatz hatte eine Größe von 43,5 MB, ich habe ihn auf 19 MB reduziert, wobei alle 269.000 Datensätze erhalten blieben. Nach dem Export zu Supabase entstand eine Tabelle mit einer Größe von 103 MB, ohne Indizes 86 MB. Eine Datenabfrage aus einer so großen Tabelle wäre für Benutzer nicht sehr komfortabel, daher habe ich die Tabelle nach dem Feld "Land" partitioniert. Das Ergebnis waren 16 Tabellen, jede mit eigenen Daten und Indizes.
                            </p>
    <p>
                                Anfangs habe ich auch materialisierte Ansichten für jede Tabelle erstellt, aber dann verwarf ich diese Idee, weil ich mich für eine parallele/sequentielle Datenladung entschied. Für eine sehr schnelle Darstellung der Daten auf der Karte laden wir nur drei Spalten in der Tabelle: id und zwei mit Koordinaten, wobei ich die Anzahl der Nachkommastellen auf 5 reduziert habe. Diese Genauigkeit ist für unser Beispiel völlig ausreichend - eine Genauigkeit von bis zu 10 Metern, während es vorher 10 Stellen waren - submillimetergenaue Präzision, die absolut unnötig ist.
                            </p>
    <blockquote>
                                <p>Kurz mal eine kleine Ausführung dazu.</p>

                                <p>
                                    Man sollte jedoch nicht vergessen, dass die tatsächliche Genauigkeit dieser Koordinaten davon abhängt, wie sie erfasst wurden (z. B. GPS, Luftbild, Satellitenaufnahme etc.) und welche Geräte dabei verwendet wurden. Ein normales GPS-Gerät liefert in der Regel keine so hohe Genauigkeit. Solche Werte findet man oft in sehr präzisen, bearbeiteten Daten oder in Ergebnissen von Vermessungen. Ich bezweifle aber, dass Polizisten, die zu Unfällen und Vorfällen fahren, solche hochpräzisen Geräte oder Vermessungsausrüstung dabei haben.
                                </p>
                                <p>
                                    Außerdem ist es wichtig, den Unterschied zwischen Präzision und Genauigkeit zu verstehen:<br /><br />
                                    Präzision bedeutet, wie viele Stellen nach dem Komma eine Zahl hat, was zeigt, wie detailliert eine Messung ist.
                                    Genauigkeit bedeutet, wie nah der gemessene Wert am tatsächlichen Wert liegt.
                                    Das heißt, auch wenn die erste Koordinate sehr präzise angegeben ist, kann ihre tatsächliche Genauigkeit geringer sein, wenn die Messmethode diese Präzision nicht ermöglicht hat.
                                </p> </blockquote>
    <h2 id="section-3">Daten laden und verarbeiten</h2>
    <p>
                                Die Parallelisierung maximieren wir - 16 gleichzeitig, was Supabase ermöglicht. Wir laden, verarbeiten, konvertieren die Koordinaten in den Float-Typ und erhalten ein Array von Koordinaten für jede Tabelle zur Anzeige auf der Karte. Nach der Zusammenführung zu einem einzigen Array werden die Daten auf der Karte angezeigt, und sofort danach beginnt das Laden der Attribute. In unserem Beispiel sind das 6 Eigenschaften: drei Listen - Land, Wochentag, Unfallkategorien und drei Arten von Unfällen - Unfall mit Rad, Unfall mit Pkw, Unfall mit Fußgänger. Der Prozess wird ebenfalls parallelisiert, und diese Eigenschaften werden den bereits geladenen Daten auf der Karte hinzugefügt.
                            </p>
    <p>
                                Die Benutzeroberfläche wird dabei dank asynchroner Funktionen nicht blockiert. Zur Leistungsüberwachung habe ich Funktionen geschrieben, die die Geschwindigkeit und Größe der geladenen Daten messen:<br /><br /></p>
    <ul>
                                    <li>Paralleles Laden: 16 gleichzeitige Anfragen an die Supabase</li>
                                    <li>Geodaten (Koordinaten) in 2,78 Sekunden geladen. Anzahl: 269.048, Gesamtgröße: 6,67 MB</li>
                                    <li>Attribute in 2,11 Sekunden geladen und zusammengeführt. Anzahl: 269.048, Gesamtgröße: 11,29 MB</li>
                                    <li>Null UI-Block: Stream-Verarbeitung im Hintergrund</li>
                                </ul>
    <h2 id="section-4">Zusammenfassung und Schlussfolgerungen</h2>
    <p>
                                Mit unserem Ansatz, React und Deck.gl zu nutzen, erreichen wir stabile 55-60 FPS hin, sogar wenn wir alle 269.000 Punkte verarbeiten. Gerade auf Mobilgeräten macht sich das stark bemerkbar, wo der Unterschied in der Performance extrem wichtig für die Bedienbarkeit der App ist.

                            </p>
    <p>
                                Weil unser technischer Stack so effizient ist, mussten wir uns gar nicht erst mit räumlichen Abfragen über die Datenbank rumschlagen – bei so einer Datenmenge geht das in React auf der Client-Seite viel einfacher und schneller. Das Rendern ist sofort da, wir brauchen keine extra Anfragen an die Datenbank zu schicken, sehr erfreulich. Am Ende haben wir eine richtig leistungsstarke Anwendung bekommen, um Verkehrsunfälle in ganz Deutschland zu visualisieren und zu analysieren.
                            </p>
    <h2 id="map">Web-App</h2>
    <MapEmbed url="https://kirman442.github.io/accidents/" title="Unfallkarte Deutschland" caption="React / Supabase / deck.gl" />
    <h2 id="section-6">Weiterentwicklung und Optimierung</h2>
    <p>
                                    Einige Zeit nach Abschluss der ersten Version habe ich mich entschieden, zu diesem Projekt zurückzukehren. Die Anwendung funktionierte bereits gut, aber inzwischen wollte ich nicht mehr nur testen, ob sich rund 269.000 Datensätze mit React, Supabase und deck.gl performant darstellen lassen. Diesmal ging es darum, die bestehende Lösung genauer zu analysieren, Schwachstellen zu finden und sowohl die Datenbereitstellung als auch das Rendering und die Filterung weiter zu optimieren.
                                </p>
    <p>
                                    Ein wichtiger Schritt war die Überarbeitung des Ladevorgangs. Die Daten werden weiterhin parallel aus den nach Bundesländern partitionierten Daten geladen, allerdings muss die Anwendung nun nicht mehr warten, bis alle 16 Bundesländer vollständig verfügbar sind. Sobald die Koordinaten eines Bundeslandes geladen wurden, werden sie direkt an die Karte übergeben. Während dieses progressiven Ladevorgangs werden die Unfälle zunächst als einfache Punkte mit einem <code>ScatterplotLayer</code> dargestellt. Dadurch sind bereits nach kurzer Zeit erste Daten auf der Karte sichtbar. Erst wenn die Geodaten aller Bundesländer vollständig geladen sind, wechselt die Visualisierung auf den rechenintensiveren <code>HexagonLayer</code> beziehungsweise <code>HeatmapLayer</code>. Anschließend werden die zusätzlichen Attribute separat geladen und über die Unfall-ID mit den bereits vorhandenen Geodaten zusammengeführt. Die Karte bleibt währenddessen bereits sichtbar und nutzbar.
                                </p>
    <p>
                                    Auch die Filterung wurde überarbeitet und eindeutiger gestaltet. Neben Bundesland, Wochentag und Unfallkategorie können die Daten nach Fahrrad-, Pkw- und Fußgängerbeteiligung untersucht werden. Für diese Merkmale gibt es nun jeweils die drei klar definierten Zustände <strong>„Alle“, „Mit“ und „Ohne“</strong>. Die Filter können frei miteinander kombiniert werden und werden direkt im Browser auf den bereits geladenen Daten ausgeführt, sodass für jede neue Kombination keine zusätzliche Datenbankabfrage notwendig ist. Damit wurde aus dem ursprünglichen Performance-Experiment schrittweise eine reaktionsfähigere und benutzerfreundlichere Web-GIS-Anwendung, bei der nicht nur die reine Ladezeit, sondern auch die wahrgenommene Geschwindigkeit und eine nachvollziehbare Datenexploration im Vordergrund stehen.
                                </p>
    <h2 id="sources">Datenquellen und Anwendungen</h2>
    <dl className="mobile-network-resources"><div className="mobile-network-resource"><dt>Supabase</dt><dd><a href={siteUrl("https://supabase.com/")} target="_blank" rel="noopener noreferrer">Open Source SQL Database</a></dd></div><div className="mobile-network-resource"><dt>deck.gl</dt><dd><a href={siteUrl("https://deck.gl/")} target="_blank" rel="noopener noreferrer">Framework for data analysis of large datasets</a></dd></div><div className="mobile-network-resource"><dt>React.js</dt><dd><a href={siteUrl("https://react.dev/")} target="_blank" rel="noopener noreferrer">React library for web interfaces
                                            </a></dd></div><div className="mobile-network-resource"><dt>Statistisches Bundesamt (Destatis):</dt><dd><a href={siteUrl("https://www.destatis.de/DE/Home/_inhalt.html")} target="_blank" rel="noopener noreferrer">Die Straßenverkehrsunfallstatistik</a></dd></div></dl></div>;}
