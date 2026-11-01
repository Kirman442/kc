# EnergieAtlas

## Sonne, Wind und regionale Unterschiede

Deutschland · Energie · räumliche Analyse · Webkartografie

**Mein Beitrag:** Idee, Recherche zu den Datenquellen, Datenaufbereitung, räumliche Analyse und Anwendungsentwicklung.

**Werkzeuge:** Python, Parquet und GeoParquet · React, TypeScript, MapLibre und ECharts.

## Wie alles begann

Am Anfang stand der Wunsch zu verstehen, wie sich die Wind- und Solarenergie in Deutschland entwickeln. Dabei wollte ich unterschiedliche Maßstäbe betrachten: vom ganzen Land bis zu einzelnen Dächern oder Anlagen. Eine Karte zeigt natürlich, wo sich etwas befindet. Allein erklärt sie aber noch nicht, warum sich die Regionen unterscheiden. In welchen Regionen ist die installierte Leistung je Einwohner höher? Wie verändert sich der im Register erfasste Bestand an Anlagen in Betrieb? Und was lässt sich über das Potenzial von Dächern herausfinden, wenn man Ausrichtung, Neigung und erwarteten Energieertrag miteinander verknüpft?

So entstand EnergieAtlas. Darin habe ich Angaben zu Anlagen in Betrieb, Statistiken zur Stromerzeugung, Verwaltungsgrenzen und regionale Potenzialmodelle zusammengeführt. Die Grundlage bildet das Marktstammdatenregister der Bundesnetzagentur. Für konkrete Fragestellungen kamen weitere Quellen hinzu.

## Zuerst die Daten verstehen

Zunächst musste ich die Daten selbst verstehen. Ausgangspunkt waren archivierte Registerexporte und regionale Datensätze in unterschiedlichen Formaten: XML, Tabellen, Geodatenbanken und Rasterdateien. Strukturen, Bezugsdaten und Einheiten unterschieden sich von Quelle zu Quelle. Bevor ich mit der Karte begann, richtete ich daher eine eigene Ebene zur Aufbewahrung der Originalwerte ein, erstellte analytische Tabellen mit festgelegten Datentypen und bereitete kompakte Dateien für die Anwendung vor.

Besondere Aufmerksamkeit erforderte der Unterschied zwischen der tatsächlichen Entwicklung der Anlagen und den Änderungen ihrer Registereinträge. Dass eine Anlage erstmals in einem neuen Export erschien, bedeutete nicht immer, dass sie gerade erst gebaut worden war. Ihr Status oder ihre Leistung konnten sich geändert haben; ebenso konnten ältere Angaben korrigiert worden sein. Deshalb zeigt der Atlas einerseits den aktuellen Anlagenbestand nach Inbetriebnahmejahr und andererseits die Veränderungen zwischen verschiedenen Registerständen.

## Von der Gesamtleistung zum regionalen Vergleich

Zunächst ging es um die Gesamtleistung. Doch ich wollte auch verstehen, wie sie sich auf die Regionen verteilt. Dafür wurden die Verwaltungsschlüssel mit den geografischen Grenzen abgeglichen. Wir prüften die Summen auf den einzelnen Gebietsebenen und untersuchten fehlende Koordinaten sowie ungenaue Zuordnungen. Datensätze ohne eindeutige administrative Zuordnung blieben in den Gesamtsummen enthalten, wurden aber keinem Gebietspolygon zugeordnet. Auf den Punktebenen erscheinen nur Datensätze mit verwendbaren Koordinaten.

Nun lassen sich 16 Bundesländer und 401 Landkreise und kreisfreie Städte vergleichen. Neben der Gesamtleistung und der Zahl der registrierten Anlagen stehen Kennzahlen je Einwohner und je Fläche zur Verfügung. Eine Besonderheit betrifft Hanau: Seit Anfang 2026 ist die Stadt kreisfrei und gehört nicht mehr zum Main-Kinzig-Kreis. Die Einwohnerzahlen zum 31.12.2025 beziehen sich noch auf den früheren gemeinsamen Gebietsstand. Deshalb haben wir im Atlas eine gemeinsame Analysegruppe Hanau/Main-Kinzig-Kreis eingerichtet, um Leistung, Bevölkerung und Fläche auf einer vergleichbaren räumlichen Grundlage auszuwerten. Dafür werden die Anlagenwerte von Hanau und dem heutigen Main-Kinzig-Kreis zusammengefasst und auf die Einwohnerzahl und Fläche des gemeinsamen Vergleichsgebiets bezogen. In der Tabelle ersetzt eine gemeinsame Zeile die beiden Einzelzeilen, um Doppelzählungen zu vermeiden.

Die Leistungsstatistik haben wir um monatlich aufbereitete SMARD-Daten ergänzt. So wird sichtbar, wie sich die Stromerzeugung aus Solar- und Windenergie im Jahresverlauf verändert. Für 2026 umfasst der verwendete Datensatz Januar bis September; verglichen wird mit demselben Zeitraum 2025. Installierte Leistung und Nettostromerzeugung bleiben dabei getrennte Kennzahlen.

## Von der Region zum einzelnen Dach

Von den Regionen ging es zur Detailanalyse bis hin zu einzelnen Dächern. Für Nordrhein-Westfalen haben wir Schätzungen des Solarpotenzials auf Gemeindeebene aufbereitet. Düsseldorf diente als Beispiel für die Arbeit mit 305.939 Dachteilflächen.

Dabei interessierte uns mehr als nur die Lage dieser Flächen. Wir untersuchten, wie sich modellierte Leistung und modellierter Jahresertrag nach Himmelsrichtung, Dachneigung und deren Kombination verteilen und wie stark sich das Potenzial auf die Gebäudegruppen der Quelle konzentriert. Die Anwendung zeigt aggregierte Auswertungen der Dachteilflächen und ausgewählte Gebäudegruppen der Quelle. Für die Betrachtung einzelner Dächer führt ein Link zum Solarkataster NRW. Flachdächer wurden gesondert betrachtet; eine Dachteilfläche wurde nicht als eigenes Gebäude gezählt.

Für die Windenergie in Nordrhein-Westfalen haben wir die Standorte von Anlagen in Betrieb mit Windenergiegebieten aus der Planung und Windatlasdaten verknüpft. Dadurch lässt sich die Windressource an den Anlagenstandorten untersuchen und innerhalb sowie außerhalb der Planungsgebiete vergleichen.

## Was daraus geworden ist

EnergieAtlas verbindet einen Überblick über Deutschland mit regionalen Vergleichen, der Entwicklung des Registers, monatlichen Stromstatistiken und detaillierten regionalen Analysen. Zu Nordrhein-Westfalen und Düsseldorf kamen Profile für Hamburg, Chemnitz, Rheinland-Pfalz und Brandenburg hinzu. Jedes Profil behält seine eigenen Merkmale und Methoden. Aus den unterschiedlichen Modellen entsteht deshalb keine gemeinsame Rangliste des „besten Potenzials“.

Für Rheinland-Pfalz stehen Angaben zur installierten PV-Leistung und zum modellierten Dachpotenzial für das Land und seine 36 Landkreise und kreisfreien Städte zur Verfügung. Hinzu kommen eine Zeitreihe der installierten PV-Leistung für 2007–2025 und ein separates Solarthermie-Modell. Brandenburg ist mit 413 Gemeinden und 17 geprüften Kennzahlen vertreten. Die Anwendung lädt Daten passend zum ausgewählten Bereich. Dachgeometrien werden nicht ausgeliefert; die vorbereiteten Dachanalysen bleiben verfügbar. Für die Betrachtung einzelner Dächer verweist die Anwendung auf das Solarkataster NRW.

Das wichtigste Ergebnis ist die Verbindung der unterschiedlichen Maßstäbe. Man kann mit den Unterschieden zwischen den Bundesländern beginnen, zu einem regionalen Modell wechseln und anschließend ein einzelnes Objekt betrachten. Dabei bleiben Quelle, Einheit und die Bedeutung der jeweiligen Kennzahl nachvollziehbar.

## Welche Kennzahlen der Atlas enthält

| Bereich | Was sich untersuchen lässt |
|---|---|
| Anlagenbestand | Bruttoleistung, Anzahl der registrierten Einheiten, Anteile von Photovoltaik sowie Windenergie an Land und auf See |
| Regionaler Vergleich | Leistung in kW je Einwohner, Anlagenzahl je 1.000 Einwohner, Leistung in MW je km² |
| Entwicklung | Gruppen des aktuellen Anlagenbestands nach gemeldetem Inbetriebnahmejahr; separat die Veränderungen von Leistung, Anzahl und Status zwischen Registerständen |
| Stromerzeugung | Monatliche Nettostromerzeugung aus Photovoltaik sowie Windenergie an Land und auf See, Summen für vollständige Jahre oder ausgewiesene Teilzeiträume, Saisonalität und Veränderungen gegenüber vergleichbaren Vorjahreszeiträumen |
| Solarpotenzialmodelle | Modellierte Leistung und modellierter Jahresertrag, modellierte Eignungsflächen und Eignungsklassen; Ausrichtung, Neigung und spezifischer Jahresertrag, soweit die Quelle dies unterstützt |
| Windenergie NRW | Windgeschwindigkeit in 150 m Höhe, begrenzte Leistungsdichte des Windes und Unsicherheit der Windgeschwindigkeit; räumlicher Bezug von Anlagen in Betrieb zu Windenergiegebieten aus der Planung |

---

## Technischer Anhang

### 01. Drei Datenebenen statt einer großen Datei

Die ursprünglichen Exporte und Werte werden getrennt von den daraus abgeleiteten Analysedaten aufbewahrt. XML wird nach Parquet übertragen. Räumliche Datensätze werden mit Python-Geowerkzeugen aufbereitet und in Analyseformaten einschließlich GeoParquet gespeichert. Für die Anwendung entsteht ein eigener Satz aus JSON-Dateien und vereinfachten GeoJSON-Dateien.

Zu jedem Verarbeitungslauf gehören Eingabedateien, Parameter, ein Bericht und Prüfsummen. So lässt sich die Herkunft der Ergebnisse nachvollziehen. Kompatible Verarbeitungsschritte können fortgesetzt werden, ohne das gesamte Archiv erneut zu verarbeiten.

### 02. Geografische Zuordnung und Summenabgleich

Geprüft werden Schlüssel, übergeordnete Gebiete, die räumliche Abdeckung der Koordinaten und die Summen auf den Ebenen Deutschland → Bundesland → Kreis. Ungeklärte Zuordnungen und der räumliche Bezug zur See werden in gesonderten Kategorien geführt.

Für relative Kennzahlen werden Einwohnerzahlen zu den jeweils angegebenen Stichtagen sowie Flächen- und Gebietsangaben verwendet. Im aktuellen Vergleich bezieht sich der Anlagenbestand auf den Registerstand vom 28.10.2026, Einwohnerzahl und Fläche auf den 31.12.2025 und der Gebietsstand des statistischen Verzeichnisses auf den 30.09.2026. Die gemeinsame Analysegruppe Hanau/Main-Kinzig ersetzt keine amtlichen Gebietseinheiten und wird nicht zugleich mit ihren beiden Teilgebieten in einer Rangliste geführt. Für Windenergie auf See wird keine künstliche Kennzahl je Einwohner eines Landkreises an Land berechnet.

### 03. Was eine Veränderung im Zeitverlauf bedeutet

Die Gruppierung der heute in Betrieb befindlichen Anlagen nach Inbetriebnahmejahr rekonstruiert nicht den Anlagenbestand jedes früheren Jahres. Maßgeblich sind der Anlagenstatus und die gemeldete Leistung im jeweils ausgewerteten Registerstand.

Archivierte Registerstände werden separat anhand der Datensatzkennungen verglichen. Dabei werden neu hinzugekommene und entfallene Datensätze, Änderungen einzelner Felder sowie Statuswechsel unterschieden. Der Zeitpunkt, zu dem eine Änderung erkannt wird, wird nicht als Zeitpunkt des tatsächlichen Ereignisses ausgegeben. Auch bei SMARD werden vollständige Jahre und vergleichbare unvollständige Zeiträume getrennt betrachtet.

### 04. Räumliche Verarbeitung vor der Bereitstellung im Browser

Die Koordinaten der Windenergieanlagen werden mit den Planungspolygonen verknüpft. Werte zur Windressource werden aus den entsprechenden Rastern an den Anlagenstandorten ausgelesen. Eine Zusammenfassung dieser Werte beschreibt die Anlagenstandorte, nicht die mittlere Windressource des gesamten Bundeslandes. Raster mit unterschiedlichen Gittern behalten ihre eigene Geometrie.

Die im Atlas als „begrenzte Leistungsdichte“ bezeichnete Kennzahl heißt im Windatlas NRW „mittlere gekappte Windleistungsdichte“. Sie beschreibt die mittlere Leistung des Windes je Quadratmeter in W/m² unter Berücksichtigung von Luftdichte und Windgeschwindigkeitsverteilung. Oberhalb von 13 m/s steigt der angesetzte Leistungswert nicht weiter an. Diese Kappung bildet vereinfacht ab, dass Windenergieanlagen oberhalb ihrer Nennwindgeschwindigkeit keine höhere Leistung mehr erzeugen.

Für die Karte werden Verwaltungsgrenzen vereinfacht. Die Analysegeometrien und die Geometrien für die Darstellung werden getrennt behandelt; vereinfachte Browserpolygone sind keine Grundlage für neue präzise Flächenberechnungen. Die Düsseldorfer Dachanalysen umfassen 305.939 Teilflächen. Ihre Geometrien werden in der aktuellen Anwendung nicht geladen.

### 05. Wie Dachgruppen verglichen werden

Modellierte Leistung, modellierter Energieertrag und Anzahl der Teilflächen werden nach den Kategorien der Quelle summiert. Der spezifische Jahresertrag einer Gruppe wird als Verhältnis der Summen berechnet:

**Spezifischer Jahresertrag = Σ modellierter Jahresenergieertrag / Σ modellierte Leistung**, in kWh/(kWp·a).

Die LANUK-Schätzungen aus kommunalen Tabellen und der detaillierten Geodatenbank bleiben getrennt. In Brandenburg bedeutet die Klasse `schlecht` bedingte Eignung, nicht fehlende Eignung. Ungeklärte Bestandteile des PV-Energieertrags für Rheinland-Pfalz sind nicht in die Kennzahlen der Anwendung eingeflossen.

### 06. Der Browser erhält Daten für die ausgewählte Aufgabe

React und TypeScript bilden die Benutzeroberfläche, MapLibre stellt die Karte dar und ECharts die Diagramme. Der Code größerer Bereiche und die zugehörigen Daten werden bei Bedarf geladen. Die Zeitreihen für Rheinland-Pfalz und die Solarthermie-Daten werden separat angefordert. Für Düsseldorf werden vorbereitete Auswertungen nach Ausrichtung, Neigung und Gebäudegruppen geladen. Die Dachgeometrien selbst werden nicht an den Browser übertragen.

Das Manifest enthält Dateigrößen und SHA-256-Prüfsummen. Vor der Verwendung prüft der Browser, ob die Dateien diesen Angaben entsprechen. Ein beschädigtes Paket führt zu einer Fehlermeldung. Die Prüfsumme bestätigt die Identität der Datei; Zahlenabgleiche und Tests sind eigenständige Voraussetzungen für die Richtigkeit der Ergebnisse.

Das grundlegende Format für die Bereitstellung der Analysedaten ist JSON. Administrative Grenzen werden als separate, vereinfachte GeoJSON-Dateien bereitgestellt. Parquet und GeoParquet dienen der Aufbereitung und Speicherung.

---

## Quellen und Dokumentation

### Projektbeteiligte

- **Kirill Lisochenko** - Idee, analytische Fragestellungen, Recherche und Datenaufbereitung, Entwicklung, Ergebnisprüfung.
- **Richard Sorge** - UI/UX-Design, Gestaltung der Seiten und Benutzeroberflächen der Anwendung sowie Entwicklung der Farbpaletten für das helle und dunkle Design.
- **OpenAI Codex** - Unterstützung bei Architekturfragen, Datenaufbereitung, Umsetzung, Tests und Dokumentation.
- **Datenanbieter und Open-Source-Communitys** - die nachfolgend aufgeführten Datensätze, methodischen Unterlagen und Werkzeuge.

### Daten und Methodik

#### Anlagen und Änderungen im Register

- **[Bundesnetzagentur - Marktstammdatenregister](https://www.marktstammdatenregister.de/MaStR/).** Kennungen der Registereinheiten, Technologie, Status, Bruttoleistung, gemeldetes Inbetriebnahmedatum, administrative Zuordnung und Koordinaten. Der grundlegende Registerstand ist der 28.10.2026. Archivierte Registerstände dienen dem separaten Vergleich von Bestand und Werten.

#### Stromerzeugung und Saisonalität

- **[Bundesnetzagentur - SMARD, Downloadcenter](https://www.smard.de/home/downloadcenter/download-marktdaten).** Zeitreihen für die Nettostromerzeugung aus Photovoltaik sowie Windenergie an Land und auf See und für die Netzlast in Deutschland: 2016–2025 und Januar bis September 2026. Die Netzlast ist im vorbereiteten Datensatz enthalten, wird in der aktuellen Anwendung jedoch nicht dargestellt. Das Projekt verwendet die Definitionen der ausgewählten SMARD-Reihen; diese werden nicht mit der gesamten Bruttostromerzeugung Deutschlands gleichgesetzt. SMARD-Nutzungsbedingungen: CC BY 4.0.
- **[Umweltbundesamt - Erneuerbare Energien in Zahlen](https://www.umweltbundesamt.de/themen/klima-energie/erneuerbare-energien/erneuerbare-energien-in-zahlen).** Ergänzender Abgleich nationaler Ergebnisse und methodischer Abgrenzungen. UBA-Werte werden nicht als gleichwertige Beobachtungen mit SMARD zu einer gemeinsamen Zeitreihe zusammengeführt.

#### Grenzen, Bevölkerung und Fläche

- **[BKG - Geodatenzentrum](https://gdz.bkg.bund.de/).** Verwaltungsgrenzen und Schlüssel für die räumliche Zuordnung und kartografische Darstellung. Anpassungen für den Browser: Koordinatentransformation und Geometrievereinfachung. Die Ausgangsdaten bleiben getrennt von den vereinfachten Darstellungsgeometrien erhalten.
- **[Destatis - Gemeindeverzeichnis](https://www.destatis.de/DE/Themen/Laender-Regionen/Regionales/Gemeindeverzeichnis/_inhalt.html)** und **[AuszugGV3QAktuell](https://www.destatis.de/DE/Themen/Laender-Regionen/Regionales/Gemeindeverzeichnis/Administrativ/Archiv/GVAuszugQ/AuszugGV3QAktuell.html).** Bevölkerung, Fläche und Gebietsstand für Kennzahlen je Einwohner und je km². Die Stichtage der Bezugsgrößen werden getrennt vom MaStR-Registerstand angegeben.

#### Solarenergie, Windenergie und Planungsgebiete in NRW

- **[LANUK / OpenGeodata NRW - Energieatlas](https://www.opengeodata.nrw.de/produkte/umwelt_klima/energie/).** Kommunale Tabellen und detaillierte Daten des Solarkatasters, Windatlas 2025 und Planungsgrundlagen für die Windenergie. Düsseldorf dient als detailliertes Beispiel für die Analyse von Dachteilflächen. Unterschiedliche Auswertungen werden nicht automatisch zu einer einzigen Schätzung zusammengeführt.
- **[LANUK - Methodik der kommunalen PV-Auswertung](https://www.energieatlas.nrw.de/sites/default/files/2026-03/Methodik-Auswertung_PV-Potenzial-Bestand_LANUK.pdf).** Modelldefinitionen und Eingangsannahmen. Die kommunale Auswertung wird getrennt von der detaillierten Geodatenbank betrachtet.
- **[LANUK - Fachbericht 166, Windatlas NRW](https://www.lanuk.nrw.de/fileadmin/lanuvpubl/3_fachberichte/LANUK-Fachbericht_166.pdf).** Beschreibung des Windmodells und seiner Kennzahlen. Windressource, Planungsgebiet und genehmigter Anlagenstandort sind unterschiedliche Begriffe.

#### Regionale Solarpotenzialmodelle

- **[Hamburg - Solarpotenzialflächen](https://suche.transparenz.hamburg.de/dataset/solarpotenzialflaechen-hamburg9).** Daten zum Solarpotenzial von Dächern. Die Dächer der Gebäude und die Gebäude selbst werden auf getrennten Analyseebenen betrachtet. Ein fehlender Energieertragswert wird nicht durch null ersetzt.
- **[SAENA - Solarpotenziale Gebäude/PV](https://www.saena.de/solarpotenziale-gebaeude-pv-11270.html).** Quelle und Erläuterungen zu den Solarpotenzialmodellen am Beispiel Chemnitz. Dach- und Freiflächen bleiben separate Modelle.
- **[Energieatlas Rheinland-Pfalz - Photovoltaik](https://www.energieatlas.rlp.de/earp/daten/solarkataster/solarpotenziale-photovoltaik)** und **[Methodik der EE-Stromerzeugung](https://www.energieatlas.rlp.de/earp/daten/datenquellen-und-methodik/ee-stromerzeugung).** Angaben zur installierten PV-Leistung und zum modellierten Dachpotenzial für das Land und seine 36 Landkreise und kreisfreien Städte, eine Zeitreihe der installierten PV-Leistung für 2007–2025 sowie separate Solarthermie-Daten. Der zugrunde liegende MaStR-Registerstand ist der 22.04.2026. Das aktuelle Modell wird mit dem historischen Bestand verglichen. Quellenangabe: Energie- und Klimaschutzagentur Rheinland-Pfalz/Energieatlas. Es gelten die [Nutzungsbedingungen der Quelle](https://www.energieatlas.rlp.de/earp/informationen/impressum); eine allgemeine offene Lizenz wird nicht vorausgesetzt.
- **[WFBB - Solaratlas Brandenburg, Datenservice](https://energieportal-brandenburg.de/cms/inhalte/tools/solaratlas-brandenburg/datenservice).** Über WFS bereitgestellte aggregierte Daten für 413 Gemeinden, aus denen 17 geprüfte Kennzahlen ausgewählt wurden. Berichtsjahr 2025; die Bezugsdaten für Bestand, Verarbeitung und Modell unterscheiden sich. Quellenangabe: © Wirtschaftsförderung Land Brandenburg GmbH (WFBB), dl-de/by-2-0, Daten geändert.

Die Lizenz einer einzelnen Quelle gilt nicht für den gesamten Atlas. Für jeden Datensatz bleiben die eigenen Nutzungsbedingungen, Bezugsdaten und Hinweise auf vorgenommene Änderungen erhalten.

#### Kartografischer Hintergrund

- **[CARTO](https://carto.com/about-carto/)** und **[OpenStreetMap](https://www.openstreetmap.org/copyright).** Kartenhintergrund: CARTO Positron und Dark Matter auf Grundlage von OpenStreetMap. Die Fachdaten und ihre Auswertung stammen aus den gesondert genannten Quellen.

### Pakete und Bibliotheken

| Werkzeug | Rolle im Projekt |
|---|---|
| [Python](https://docs.python.org/3/), [pandas](https://pandas.pydata.org/docs/), [PyArrow](https://arrow.apache.org/docs/python/) | Einlesen und Umformen von Tabellen, Datentypen und Parquet, numerische Prüfungen |
| [GeoPandas](https://geopandas.org/en/stable/docs.html), [pyogrio](https://pyogrio.readthedocs.io/), [GDAL](https://gdal.org/en/stable/), [Shapely](https://shapely.readthedocs.io/en/stable/) | Einlesen von Geodaten, Koordinatenreferenzsysteme, räumliche Verknüpfungen und Geometrieaufbereitung |
| [Rasterio](https://rasterio.readthedocs.io/en/stable/) | Einlesen von Rastern und Abfragen von Ressourcenwerten an Punktstandorten |
| [openpyxl](https://openpyxl.readthedocs.io/en/stable/) | Einlesen von Excel-Tabellen und Datenwörterbüchern der Quellen |
| [React](https://react.dev/) und [TypeScript](https://www.typescriptlang.org/docs/) | Benutzeroberfläche, Typen und Ansichtsstatus |
| [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/) | Darstellung räumlicher Ebenen und Interaktion mit der Karte |
| [Apache ECharts](https://echarts.apache.org/handbook/en/get-started/) | Diagramme, Verteilungen und analytische Vergleiche |
| [Vite](https://vite.dev/guide/) | Entwicklung, Build und Codeaufteilung |
| [pytest](https://docs.pytest.org/en/stable/), [Node.js test runner](https://nodejs.org/api/test.html), [Playwright](https://playwright.dev/docs/intro) | Numerische Prüfungen, Prüfung der Datenverträge und Browsertests |
| [Apache Parquet](https://parquet.apache.org/docs/) | Speicherung und Einlesen aufbereiteter Analysetabellen |
| [GeoParquet](https://geoparquet.org/) | Speicherung von Geometrien und räumlichen Metadaten im Parquet-Format |
| [MDN - SubtleCrypto.digest](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest) | SHA-256-Prüfung im Browser |
| [MDN - AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) | Abbrechen von Webanfragen |

## Dokumentation und weiterführende Materialien

| Material | Nutzen |
|---|---|
| [MaStR-Datenmodell und Definitionen](https://www.marktstammdatenregister.de/MaStRHilfe/subpages/GrundlagenDatendefinition.html) | Unterschiede zwischen Registereinheiten, Technologien, Statusangaben und technischen Merkmalen |
| [Methodik des Solarpotenzials in Rheinland-Pfalz](https://www.energieatlas.rlp.de/earp/daten/datenquellen-und-methodik/methodik-solarpotenziale) | Annahmen des regionalen Modells und Unterschied zwischen Photovoltaik und Solarthermie |
| [Methodische Unterlagen für Brandenburg](https://energieportal-brandenburg.de/cms/inhalte/tools/solaratlas-brandenburg/datenservice) | WFS-Zugang, Datenerläuterungen und Nutzungsbedingungen |
