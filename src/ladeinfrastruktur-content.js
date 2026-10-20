// Generated from the supplied German project story and technical appendix.
export default {
  "title": "Ladeinfrastruktur: ein Blick auf Versorgung und Erreichbarkeit",
  "narrative": [
    {
      "id": "story-start",
      "title": "Die Ausgangsfrage",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Ich wollte die Ladeinfrastruktur in Deutschland im Verhältnis zur Zahl der Elektroautos betrachten. Auf einer gewöhnlichen Karte sieht man, wo Ladestationen stehen. Aber reicht es, sie einfach zu zählen? Eine Region mit vielen Lademöglichkeiten kann zugleich deutlich mehr Elektroautos haben. Und mehrere kleine Ladestationen bieten einem Fahrer etwas anderes als ein einzelner leistungsstarker Ladestandort."
        },
        {
          "type": "paragraph",
          "text": "Aus dieser Frage entstand Ladeinfrastruktur – eine interaktive Karte, in der ich offene Daten zu Ladestationen, Fahrzeugbestand und Straßen zusammengeführt habe. Mich interessierte die Versorgung mit Lademöglichkeiten. Gleichzeitig wollte ich ausprobieren, was sich aus mehreren unabhängigen Datenquellen gemeinsam machen lässt."
        },
        {
          "type": "paragraph",
          "text": "Auf Grundlage des verwendeten BNetzA-Datenstands vom 1. September 2026 zeigt die Anwendung 67.680 Ladestandorte, 116.108 Ladeeinrichtungen und 208.570 Ladepunkte. Die Fahrzeugstatistik stammt vom Kraftfahrt-Bundesamt (KBA), mit Stichtag 1. Januar 2026; die Gebietsgrenzen kommen vom Bundesamt für Kartographie und Geodäsie (BKG)."
        }
      ]
    },
    {
      "id": "story-2",
      "title": "Was zählt eigentlich als Ladestation?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Auf den ersten Blick ist die Aufgabe einfach: eine Tabelle laden und Marker auf die Karte setzen. Zunächst musste ich aber klären, was diese Marker darstellen. Ein **Ladestandort** fasst die Einrichtungen an einem Ort zusammen. Eine **Ladeeinrichtung**, in der Oberfläche kurz **Station** genannt, kann mehrere **Ladepunkte** haben. An jedem Ladepunkt kann jeweils ein Fahrzeug laden. Mehrere Anschlüsse bedeuten deshalb nicht automatisch mehrere unabhängig nutzbare Lademöglichkeiten."
        },
        {
          "type": "paragraph",
          "text": "Um Standorte auf der Karte darzustellen, habe ich die Einträge der Ladeeinrichtungen anhand von Adresse, Betreiber und räumlicher Nähe zusammengefasst. Zwischen zwei beliebigen Ladeeinrichtungen desselben Standorts dürfen höchstens 75 Meter liegen. Das ist eine Regel meines Projekts, keine amtliche Vorgabe. Diese Gruppierung ist nicht mit nachgewiesenen Grenzen eines Parkplatzes gleichzusetzen."
        },
        {
          "type": "paragraph",
          "text": "Auch bei der Leistung musste ich genauer hinsehen. Die Nennleistung einer Ladeeinrichtung wiederholt sich in den Datensätzen ihrer Ladepunkte. Einfaches Addieren würde das Ergebnis zu hoch ausfallen lassen. Deshalb wird jede Ladeeinrichtung nur einmal berücksichtigt. Die Leistung eines einzelnen Ladepunkts wird gesondert angezeigt – es handelt sich um unterschiedliche Angaben zum selben Standort."
        }
      ]
    },
    {
      "id": "story-3",
      "title": "Von Markern zum Vergleich der Regionen",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Die Karte zeigt die Anzahl der Ladepunkte und die Nennleistung der Ladeeinrichtungen je 1.000 zugelassene batterieelektrische Pkw (BEV). Man kann Bundesländer und KBA-Zulassungsbezirke vergleichen, die Verteilung der Ladepunkte nach Leistung betrachten und sich die Infrastrukturanteile der Betreiber ansehen."
        },
        {
          "type": "paragraph",
          "text": "Mir war wichtig, dass die Filter nicht nur die Marker, sondern auch die zugehörigen Auswertungen verändern. Bei der Auswahl von DC und mindestens 150 kW muss beispielsweise derselbe Ladepunkt beide Bedingungen erfüllen. Ein Standort darf nicht allein deshalb in die Auswahl gelangen, weil ein Ladepunkt leistungsstark genug ist und ein anderer DC unterstützt. Die durchgehende Öffnung rund um die Uhr wird dagegen für den gesamten Standort geprüft."
        },
        {
          "type": "paragraph",
          "text": "So lässt sich untersuchen, wie sich die Versorgung zwischen Regionen unterscheidet und wie viele schnelle Lademöglichkeiten bei Auswahl von 24/7 übrig bleiben. Die Karte kennt allerdings weder die aktuelle Belegung noch die Länge einer Warteschlange. Auch die Zahl zugelassener Fahrzeuge erfasst nicht sämtliche Fahrten durch eine Region. Die Anwendung hilft beim Vergleich, liefert aber keine abschließende Antwort darauf, wo es genügend Lademöglichkeiten gibt."
        }
      ]
    },
    {
      "id": "story-4",
      "title": "Weniger Arbeit beim Öffnen der Karte",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Für die Oberfläche habe ich React verwendet, für die Kartengrundlage MapLibre und für die Darstellung der Daten deck.gl. Die Tabellen liegen im Parquet-Format vor. Das Einlesen und die Berechnungen laufen in einem Web Worker, um den Hauptthread der Benutzeroberfläche zu entlasten."
        },
        {
          "type": "paragraph",
          "text": "Während der Entwicklung habe ich überdacht, welche Daten sofort geladen werden müssen. Um die Standorte auf der Karte anzuzeigen, braucht der Browser nicht den gesamten Text ihrer Detailansichten. Durch die Aufteilung schrumpfte die Startdatei mit den Standortdaten von etwa 2,79 auf 0,95 MB – um 66 %. Adressen und weitere Angaben werden separat im Hintergrund geladen. Wird eine Detailansicht vorher angefordert, erscheint sie, sobald die benötigten Daten vorliegen."
        },
        {
          "type": "paragraph",
          "text": "Auch einen Teil der Zuordnungen zwischen den Tabellen habe ich vorab berechnet, damit der Browser sie nicht jedes Mal neu herstellen muss. Die gesamte Datenmenge hat sich dadurch kaum verändert; weniger Arbeit fällt vor allem beim Start an. Diese Aufteilung erwies sich als hilfreicher als der Versuch, alles gleichzeitig zu laden und zu verarbeiten."
        }
      ]
    },
    {
      "id": "story-5",
      "title": "Nah an der Autobahn heißt nicht unbedingt gut erreichbar",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Später kam eine weitere Frage hinzu: Lässt sich ein Ladestandort während einer Autobahnfahrt tatsächlich nutzen? Er kann direkt neben der Strecke liegen, aber auf der anderen Seite, hinter einer Absperrung oder an einer Straße ohne geeignete Rückkehrmöglichkeit."
        },
        {
          "type": "paragraph",
          "text": "Dafür habe ich ein experimentelles Straßenmodell auf Basis von OpenStreetMap ergänzt. Es umfasst bislang die Autobahnen A1–A9. Jede Fahrtrichtung wird getrennt untersucht: Die Berechnung sucht eine Zufahrt zum Standort und eine Rückfahrt auf die Autobahn in derselben Fahrtrichtung. Dabei berücksichtigt sie Einbahnstraßen, Abbiegebeschränkungen und Zugangsbeschränkungen."
        },
        {
          "type": "paragraph",
          "text": "Im Modell dürfen Zufahrt und Rückfahrt jeweils höchstens 3 km lang sein. Außerdem darf die Standortkoordinate höchstens 60 m von der Straße entfernt sein, der sie zugeordnet wird. Die Strecken zwischen Ladestandorten werden für Standorte mit gefundenen Modellrouten, einer summierten Nennleistung der Ladeeinrichtungen von mindestens 400 kW und mindestens einem DC-Ladepunkt ab 150 kW berechnet. Eine solche Strecke umfasst die Rückfahrt vom vorherigen Standort, die Fahrt auf der Autobahn und die Zufahrt zum nächsten."
        },
        {
          "type": "paragraph",
          "text": "Am aufwendigsten war die Aufbereitung des Straßennetzes. Einige Abbiegebeschränkungen verwiesen auf Straßen, die im Datensatz fehlten. Diese Einträge zu übergehen hätte bedeutet, eine Durchfahrt zuzulassen, obwohl die Daten dafür nicht ausreichten. Deshalb mussten unvollständige Beschränkungen gesondert behandelt werden; ungeklärte Fälle blieben zur Prüfung offen. Die umfangreichen Berechnungen laufen außerhalb des Browsers und speichern Zwischenergebnisse. Die Website erhält fertige Tabellen."
        },
        {
          "type": "paragraph",
          "text": "Ein weiteres Beispiel sind die tatsächlichen Unterbrechungen im Verlauf der A1, A4 und A8. Getrennte Abschnitte lassen sich leicht mit einer Linie verbinden – dann würde die Karte aber einen nicht vorhandenen Weg zeigen. Deshalb bleiben getrennte Abschnitte und unbekannte Streckenlängen auch in den Ergebnissen erhalten."
        },
        {
          "type": "paragraph",
          "text": "Selbst ein anhand von OSM gefundener Weg bestätigt weder die tatsächliche Zufahrt zum Parkplatz noch die Funktionsfähigkeit der Ladestation. Für einen Fahrer können die letzten Meter wichtiger sein als eine Linie auf der Karte. Dieser Teil des Projekts bleibt deshalb ein Experiment. Die AFIR-Verordnung bildet einen Bezugspunkt der Untersuchung; die Anwendung bestätigt jedoch nicht, dass ihre Anforderungen erfüllt sind."
        }
      ]
    },
    {
      "id": "story-6",
      "title": "Was daraus geworden ist",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Die Infrastruktur lässt sich nun auf mehreren Ebenen untersuchen: die Ladeeinrichtungen eines einzelnen Standorts aufrufen, Regionen im Verhältnis zu ihrem Fahrzeugbestand vergleichen oder die berechneten Fahrstrecken zwischen Ladestandorten entlang einer Autobahn betrachten. Am interessantesten war für mich, diese Maßstabsebenen miteinander zu verbinden und dabei nachvollziehbar zu halten, was jede Kennzahl bedeutet."
        },
        {
          "type": "paragraph",
          "text": "Auch die Oberfläche entwickelte sich schrittweise weiter: eine Liste nahegelegener Standorte, die Rückkehr zur vorherigen Liste und Kartenansicht, helle und dunkle Kartenthemen sowie Erläuterungen zu Fachbegriffen kamen hinzu. Als Nächstes möchte ich sie übersichtlicher gestalten. Beim letzten UX-Audit zeigte sich, dass zwei gleichzeitig geöffnete Seitenbereiche die Oberfläche überladen. Die Analysemöglichkeiten sollen erhalten bleiben, die Informationen aber im passenden Moment erscheinen."
        },
        {
          "type": "paragraph",
          "text": "[Anwendung öffnen](https://kirman442.github.io/charging-points/) · [Quellcode](https://github.com/Kirman442/charging-points)"
        }
      ]
    }
  ],
  "sources": {
    "title": "Quellen und Dokumentation",
    "blocks": [
      {
        "type": "heading",
        "level": 3,
        "text": "Pakete, Bibliotheken und Dienste"
      },
      {
        "type": "list",
        "items": [
          "**[React](https://react.dev/) und [Vite](https://vite.dev/)** – Benutzeroberfläche, Entwicklung und Build-Prozess.",
          "**[deck.gl](https://deck.gl/)** – GPU-gestützte Darstellung der Kartenobjekte und Analyselayer.",
          "**[MapLibre](https://maplibre.org/maplibre-gl-js/docs/), [react-map-gl](https://visgl.github.io/react-map-gl/) und [CARTO](https://docs.carto.com/faqs/carto-basemaps)** – Kartengrundlage, React-Integration sowie die Kartenthemen Dark Matter und Positron.",
          "**[Supercluster](https://github.com/mapbox/supercluster)** – Gruppierung von Markern bei der Darstellung größerer Kartenausschnitte.",
          "**[Parquet](https://parquet.apache.org/docs/), [parquet-wasm](https://kylebarron.dev/parquet-wasm/) und [Arrow](https://arrow.apache.org/js/current/)** – Speicherung und Einlesen der aufbereiteten Tabellen.",
          "**[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) und [D3](https://d3js.org/)** – Datenverarbeitung außerhalb des Hauptthreads beziehungsweise Skalen und Farbschemata.",
          "**[Python](https://www.python.org/), [PyArrow](https://arrow.apache.org/docs/python/), [Shapely](https://shapely.readthedocs.io/) und [pyproj](https://pyproj4.github.io/pyproj/)** – Aufbereitung von Tabellen und Geometrien.",
          "**[pyosmium](https://docs.osmcode.org/pyosmium/latest/) und [SQLite](https://www.sqlite.org/docs.html)** – Verarbeitung von Straßendaten und Zwischenspeicherung der Ergebnisse.",
          "**[GitHub Actions](https://docs.github.com/en/actions) und [GitHub Pages](https://docs.github.com/en/pages)** – automatisierte Prüfungen, Build und Veröffentlichung."
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "text": "Projekt-Credits"
      },
      {
        "type": "list",
        "items": [
          "**Kirill Lisochenko** – Projektautor: Idee, Fragestellungen, Auswahl der Quellen und Kriterien, Arbeit mit den Daten, Prüfung der Ergebnisse und abschließende Entscheidungen.",
          "**OpenAI Codex** – Unterstützung bei Architektur, Implementierung, Optimierung, Tests und Dokumentation.",
          "**BNetzA, KBA und BKG** – Ausgangsdaten zur Ladeinfrastruktur, zum Fahrzeugbestand und zu den Gebietseinheiten.",
          "**OpenStreetMap contributors, Geofabrik und CARTO** – Straßendaten, regionale Auszüge und Kartengrundlage.",
          "**Entwicklerinnen und Entwickler der Open-Source-Bibliotheken** – die Werkzeuge, auf denen Anwendung und Datenverarbeitung aufbauen."
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "text": "Dokumentation und weitere Informationen"
      },
      {
        "type": "list",
        "items": [
          "**[BNetzA: öffentliche Ladeinfrastruktur](https://www.bundesnetzagentur.de/DE/Fachthemen/ElektrizitaetundGas/E-Mobilitaet/start.html)** – Ladesäulenregister; verwendet wird der Datenstand vom 01.09.2026.",
          "**[KBA: Fahrzeugbestand](https://www.kba.de/DE/Statistik/Fahrzeuge/Bestand/bestand_node.html)** – Fahrzeugstatistik FZ 1.2 zum 01.01.2026.",
          "**[BKG: VG250](https://gdz.bkg.bund.de/index.php/default/open-data/verwaltungsgebiete-1-250-000-stand-01-01-vg250-01-01.html)** – Verwaltungsgrenzen. © BKG (2026), [dl-de/by-2-0](https://www.govdata.de/dl-de/by-2-0).",
          "**[Geofabrik: Germany](https://download.geofabrik.de/europe/germany.html)** und **[OpenStreetMap](https://www.openstreetmap.org/copyright)** – Straßennetz und Nutzungsbedingungen unter der ODbL.",
          "**[OSM: access](https://wiki.openstreetmap.org/wiki/Key:access), [oneway](https://wiki.openstreetmap.org/wiki/Key:oneway), [turn restrictions](https://wiki.openstreetmap.org/wiki/Relation:restriction)** – Erläuterungen zu den im Modell berücksichtigten Straßentags.",
          "**[AFIR – Verordnung (EU) 2023/1804](https://eur-lex.europa.eu/legal-content/en/ALL/?uri=CELEX%3A32023R1804)** – Hintergrund zum Ausbau der Infrastruktur für alternative Kraftstoffe.",
          "**[Datenmodell der Ladeinfrastruktur](https://github.com/Kirman442/charging-points/blob/main/public/data/README_charging_tables_zstd10.txt)** – Zusammenfassung von Ladeeinrichtungen zu Standorten, 75-Meter-Regel, Leistungsangaben, Öffnungszeiten und Quellenangabe BNetzA / CC BY 4.0.",
          "**[Aufbereitung der BKG/KBA-Gebietsdaten](https://github.com/Kirman442/charging-points/blob/main/public/data/README_emob_boundaries_string.txt)** – Geometrieumwandlungen und Angaben zu den Datenquellen.",
          "**[Arrow: Columnar Format](https://arrow.apache.org/docs/format/Columnar.html)** und **[deck.gl: binary data](https://deck.gl/docs/developer-guide/performance#use-binary-data)** – technische Dokumentation zu Datenformaten und Visualisierung.",
          "**[README des Projekts](https://github.com/Kirman442/charging-points#readme)** – Funktionen, Einschränkungen, lokaler Start und Veröffentlichung."
        ]
      }
    ]
  },
  "topics": [
    {
      "number": 1,
      "title": "Ladepunkte filtern, Nennleistung richtig zählen",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Ein Ladestandort umfasst mehrere Ladeeinrichtungen; eine Ladeeinrichtung kann mehrere Ladepunkte haben. Für die Auswertung müssen diese Ebenen getrennt bleiben."
        },
        {
          "type": "paragraph",
          "text": "Ein vereinfachtes Beispiel: Eine Ladeeinrichtung hat eine Nennleistung von 150 kW und zwei Ladepunkte mit jeweils 150 kW. Erfüllen beide Punkte den Filter, zählt die Auswahl zwei Ladepunkte, aber nur einmal die Nennleistung der Einrichtung: 150 statt 300 kW. Die Leistungsangaben bedeuten außerdem nicht, dass beide Fahrzeuge gleichzeitig jeweils 150 kW erhalten können.",
          "id": "counting-example",
          "diagram": "counting-example"
        },
        {
          "type": "paragraph",
          "text": "Auch die Bedingungen eines Filters müssen zusammenpassen. Bei „DC und mindestens 150 kW“ muss derselbe Ladepunkt beide Anforderungen erfüllen. Ein leistungsstarker AC-Ladepunkt und ein schwächerer DC-Ladepunkt am selben Standort reichen dafür nicht aus."
        },
        {
          "type": "paragraph",
          "text": "Das folgende Beispiel zeigt das Prinzip, nicht den vollständigen Anwendungscode:"
        },
        {
          "type": "code",
          "language": "js",
          "code": "const eligible = points.filter(point =>\n  point.maxPowerKw >= minPowerKw && (!dcOnly || point.hasDC)\n);\nconst installationIds = new Set(eligible.map(p => p.installationId));\nconst nominalPowerKw = [...installationIds].reduce(\n  (sum, id) => sum + installations.get(id).nominalPowerKw, 0\n);"
        },
        {
          "type": "paragraph",
          "text": "Gebiet und durchgehende Öffnung des gesamten Standorts werden zusätzlich geprüft. Gehört nur ein Teil der Ladepunkte einer Einrichtung zur Auswahl, wird deren Nennleistung trotzdem einmal vollständig berücksichtigt. Eine anteilige Verteilung wäre durch die Daten nicht begründet."
        },
        {
          "type": "paragraph",
          "text": "**Beschriftung der Beispielschematik:** Eine Ladeeinrichtung · Nennleistung: 150 kW · Ladepunkt A: 150 kW · Ladepunkt B: 150 kW · Ergebnis: 2 Ladepunkte, 150 kW Nennleistung. Vereinfachtes Rechenbeispiel, kein konkreter Registereintrag."
        }
      ]
    },
    {
      "number": 2,
      "title": "Weniger Datensätze, gleiche Filterergebnisse",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Für die Auswertung muss der Browser nicht jede ursprüngliche Ladepunktzeile laden. Im verwendeten Datenstand werden 208.570 Ladepunkte durch 122.896 Gruppen dargestellt. Eine Gruppe enthält Punkte mit derselben Ladeeinrichtung, maximalen Ladepunktleistung, DC-Eigenschaft und Gebietszuordnung. Die Anzahl der Punkte bleibt gespeichert; die Leistung wird nicht auf grobe Kategorien gerundet. Dadurch bleiben auch genaue Leistungsschwellen auswertbar.",
          "id": "pipeline",
          "diagram": "pipeline"
        },
        {
          "type": "paragraph",
          "text": "Die Zuordnungen zu Standorten, Einrichtungen, Betreibern und Gebieten werden vorab als numerische Indizes vorbereitet. Der Web Worker arbeitet anschließend mit typisierten Spalten und muss weniger Zeichenketten verknüpfen. Leistungswerte bleiben als Float64 erhalten."
        },
        {
          "type": "paragraph",
          "text": "**Ablauf:** Ladepunktdaten → Gruppen mit gespeicherter Punktzahl → Parquet-Dateien und Zuordnungstabelle → Web Worker → Karte und Auswertungen."
        },
        {
          "type": "table",
          "headers": [
            "Daten für die Ladepunktgruppen",
            "Dateigröße"
          ],
          "rows": [
            [
              "Bisherige Gruppentabelle",
              "1.623.196 Byte"
            ],
            [
              "Numerische Gruppentabelle und Zuordnungstabelle",
              "1.125.622 Byte"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Die beiden neuen Dateien benötigen zusammen 30,7 % weniger Speicherplatz. Verglichen werden vorbereitete Parquet-Dateien aus zwei Entwicklungsschritten, nicht Parquet und JSON. Die Gruppierung wurde anhand der ursprünglichen Ladepunktdaten unter verschiedenen Filterkombinationen geprüft.",
          "id": "group-size",
          "diagram": "group-size"
        }
      ]
    },
    {
      "number": 3,
      "title": "Erst die Karte, dann die ausführlichen Standortdaten",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Zum ersten Anzeigen der Standorte braucht der Browser Koordinaten und wenige weitere Merkmale. Adressen und andere Angaben der Detailansichten können später folgen. Deshalb habe ich die Standortdaten in eine Startdatei mit fünf Spalten und eine separate Datei mit fünfzehn Spalten für die Detailansichten aufgeteilt. Das Einlesen und die Berechnungen laufen im Web Worker."
        },
        {
          "type": "table",
          "headers": [
            "Standortdaten",
            "Dateigröße"
          ],
          "rows": [
            [
              "Vollständige Ausgangstabelle",
              "3.490.205 Byte"
            ],
            [
              "Kompakte Tabelle mit 21 Spalten",
              "2.792.079 Byte"
            ],
            [
              "Startdatei mit 5 Spalten",
              "946.126 Byte"
            ],
            [
              "Separat geladene Detaildaten",
              "1.844.456 Byte"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Die Startdatei ist gegenüber der kompakten Tabelle um 66,1 % kleiner. Startdatei und Detaildaten ergeben zusammen 2.790.582 Byte, also nahezu die bisherige Datenmenge. Der Unterschied liegt vor allem darin, wann welche Daten geladen und verarbeitet werden.",
          "id": "loading-split",
          "diagram": "loading-split"
        },
        {
          "type": "paragraph",
          "text": "In einem lokalen Node-Vergleich nach dem Aufwärmen beider Verarbeitungspfade dauerte das Dekodieren der Tabelle mit 21 Spalten 67–75 ms, das der Startdatei 14–18 ms. Nicht enthalten waren Netzwerkübertragung, Initialisierung des Browsers und von WASM, Hash-Berechnung und Darstellung. Das sind Messwerte für einen Verarbeitungsschritt, keine Ladezeiten der Website."
        },
        {
          "type": "table",
          "headers": [
            "Dekodierung im lokalen Node-Vergleich",
            "Dokumentierter Zeitbereich"
          ],
          "rows": [
            [
              "Tabelle mit 21 Spalten",
              "67–75 ms"
            ],
            [
              "Startdatei mit 5 Spalten",
              "14–18 ms"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Auch die Größe der vorübergehend erzeugten Arrow-IPC-Daten sank: von 17.406.016 auf 2.887.488 Byte, um 83,4 %. Daraus lässt sich keine entsprechende Verringerung des maximalen Arbeitsspeicherbedarfs ableiten."
        },
        {
          "type": "paragraph",
          "text": "Die Detaildaten werden nach der Rückmeldung zum ersten deck.gl-Frame mit fertigen Daten im Hintergrund angefordert. Eine zuvor angeforderte Detailansicht kann das Laden früher auslösen. Mehrere Anfragen teilen sich denselben Ladevorgang. Eine verspätete Antwort öffnet keine bereits geschlossene Detailansicht; bei mehreren noch ausstehenden Anfragen wird nur die zuletzt ausgewählte berücksichtigt. Die Übergabe typisierter Arrays zwischen Threads macht die gesamte Verarbeitung nicht zu einem durchgängigen Zero-Copy-Verfahren: Geometrien werden beispielsweise in GeoJSON dekodiert.",
          "id": "loading-flow",
          "diagram": "loading-flow"
        },
        {
          "type": "heading",
          "text": "Einordnung gegenüber JSON und einer serverseitigen Datenbank"
        },
        {
          "type": "paragraph",
          "text": "Für denselben Datenbestand liegt kein vergleichbarer Benchmark mit JSON oder einer serverseitigen Datenbank vor. Die dokumentierten Zahlen beziehen sich auf die Weiterentwicklung der Parquet-Verarbeitung im Projekt."
        },
        {
          "type": "table",
          "headers": [
            "Variante",
            "Vereinfachter Datenweg",
            "Einordnung"
          ],
          "rows": [
            [
              "Vollständige JSON-Daten, Verarbeitung im Browser",
              "Laden → JSON einlesen → Indizes aufbauen → lokal filtern",
              "Architekturbeispiel; für dieses Projekt nicht vergleichend gemessen"
            ],
            [
              "Serverseitige Datenbank mit API",
              "Filter senden → serverseitige Abfrage → Ergebnis empfangen",
              "Mögliche Alternative; abhängig von Netzwerk, API und Indizes"
            ],
            [
              "Verwendete Architektur",
              "Vorbereitete Parquet-Dateien → Worker und numerische Indizes → lokal filtern",
              "Nach dem Laden der benötigten Daten ist für die Filter keine Anfrage an eine serverseitige Datenbank nötig"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Das ist eine Architekturentscheidung für einen veröffentlichten Datenstand, kein allgemeiner Geschwindigkeitsvergleich. Die Hintergrundkarte lädt weiterhin externe Kartenkacheln. SQLite wird außerhalb des Browsers zur Vorbereitung der Straßenanalysen eingesetzt."
        }
      ]
    },
    {
      "number": 4,
      "title": "Erreichbarkeit entlang der Straßen berechnen",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Die räumliche Nähe zur Autobahn liefert zunächst mögliche Ladestandorte. Ob ein Weg zu ihnen gefunden wird, prüft anschließend ein gerichteter Straßengraph aus OpenStreetMap. Jede Fahrtrichtung wird getrennt betrachtet; Einbahnstraßen, Zugangsbeschränkungen, Barrieren und Abbiegebeschränkungen fließen in die Prüfung ein."
        },
        {
          "type": "paragraph",
          "text": "Im Modell dürfen Zufahrt und Rückfahrt jeweils höchstens 3 km lang sein. Die Rückfahrt muss auf die Autobahn in derselben Fahrtrichtung führen. Für die Zuordnung des Standorts zu einer Straße gilt eine maximale Entfernung von 60 m."
        },
        {
          "type": "paragraph",
          "text": "**Berechnete Fahrstrecke zwischen zwei geeigneten Standorten:** Rückfahrt vom vorherigen Standort + Fahrt auf der Autobahn + Zufahrt zum nächsten Standort.",
          "id": "route",
          "diagram": "route"
        },
        {
          "type": "paragraph",
          "text": "Berücksichtigt werden Standorte mit gefundenen Modellrouten, mindestens 400 kW summierter Nennleistung der Ladeeinrichtungen und mindestens einem DC-Ladepunkt ab 150 kW. Tatsächliche Unterbrechungen einer Autobahn bleiben erhalten. Die gefundene Modellroute reicht bis zu einer Straße nahe der Standortkoordinate; sie bestätigt weder die tatsächliche Zufahrt zum Parkplatz noch die Einhaltung der AFIR-Anforderungen."
        },
        {
          "type": "paragraph",
          "text": "Die aufwendige Suche läuft vorab außerhalb des Browsers. Große Straßen-JSON-Dateien werden dabei fortlaufend eingelesen und in einem räumlichen SQLite-Index erschlossen. Die Website lädt fertige Ergebnisse, nicht das vollständige Straßennetz für eine eigene Routenberechnung."
        },
        {
          "type": "paragraph",
          "text": "**Beschriftung der Streckenschematik:** Vorheriger Ladestandort → Rückfahrt → Autobahn → Fahrt auf der Autobahn → Nächster Abzweig → Zufahrt → Nächster Ladestandort. Beide Standorte sind schematisch dargestellt; die Zeichnung ist keine reale Route."
        }
      ]
    },
    {
      "number": 5,
      "title": "Ungeklärte Wege bleiben ungeklärt",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Ein nicht gefundener Weg beweist nicht, dass ein Standort unerreichbar ist. Der Suche können unvollständige Straßendaten oder nicht eindeutig auswertbare Beschränkungen entgegenstehen. Deshalb unterscheidet die Auswertung gefundene Verbindungen, Fälle zur Prüfung und Ausschlüsse wegen einer zu langen Zufahrt."
        },
        {
          "type": "paragraph",
          "text": "Eine zusätzliche diagnostische Suche mit gelockerten Beschränkungen hilft, die Ursachen einzugrenzen. Sie bestätigt selbst keine Verbindung. Ein Standort wird wegen einer zu langen Zufahrt erst ausgeschlossen, wenn selbst die kürzeste diagnostisch ermittelte Zufahrt länger als 3 km ist. Wird kein Weg ermittelt, reicht das allein für diesen Ausschluss nicht aus.",
          "id": "decision",
          "diagram": "decision"
        },
        {
          "type": "paragraph",
          "text": "So bleibt der Unterschied zwischen „nicht geklärt“ und „zu weit nach den Regeln des Modells“ sichtbar. Die Diagnose lässt sich getrennt ausführen, ohne bereits akzeptierte Routen und berechnete Fahrstrecken zu verändern. Aussagen über die tatsächliche Befahrbarkeit vor Ort lassen sich daraus nicht abschließend ableiten."
        },
        {
          "type": "paragraph",
          "text": "**Beschriftung der Entscheidungsschematik:** Strenge Prüfung → Modellroute gefunden / Keine Modellroute ermittelt. Nur der zweite Zweig führt zur Diagnose → Diagnostisch ermittelte Zufahrt über 3 km: Ausschluss wegen Länge / Sonstige Fälle: weitere Prüfung. Eine diagnostisch gefundene Verbindung erhält keinen bestätigten Status."
        }
      ]
    },
    {
      "number": 6,
      "title": "Zusammengehörige Dateien erkennen",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Numerische Indizes setzen voraus, dass die Reihenfolge der Datensätze stimmt. Zwei Dateien können gleich viele Zeilen enthalten und trotzdem zu unterschiedlichen Datenständen gehören. Die Zeilenzahl allein schützt nicht davor, Angaben dem falschen Standort zuzuordnen."
        },
        {
          "type": "paragraph",
          "text": "Der Laufzeitkatalog verknüpft die vorbereiteten Dateien über SHA-256-Prüfsummen. Der Worker prüft diese Verknüpfungen sowie Struktur und Wertebereiche der Indizes. Passen die Dateien nicht zusammen, wird die Verarbeitung mit einem Fehler beendet, statt unbemerkt falsche Zuordnungen zu verwenden.",
          "id": "integrity",
          "diagram": "integrity"
        },
        {
          "type": "paragraph",
          "text": "Ein ähnliches Prinzip gilt für die gespeicherten Zwischenstände der Straßenberechnung: Sie sind an die Eingangsdaten und die verwendete Berechnungsversion gebunden. Bereits berechnete Teile können bei einem erneuten Lauf wiederverwendet werden, solange diese Bindung erhalten bleibt."
        },
        {
          "type": "paragraph",
          "text": "Eine Prüfsumme belegt dabei die Identität eines Dateiinhalts, nicht dessen fachliche Richtigkeit. Dafür werden die Ergebnisse zusätzlich mit den Ausgangsdaten verglichen und getestet."
        },
        {
          "type": "paragraph",
          "text": "**Beschriftung der Prüfschematik:** Startdaten · Detaildaten · Numerische Gruppen → Abgleich mit dem Laufzeitkatalog → Dateien passen zusammen: Verarbeitung / Dateien passen nicht zusammen: Fehlermeldung."
        }
      ]
    }
  ],
  "report": {
    "source": "M:/projekte/Ladesaeulenregister/audit charging-points/ladeinfrastruktur-project-story-de.md",
    "sha256": "b24ed64fcf1ee427c090dd5c1097dd3ad3e96369ae862d97e7b7a1be609e77be",
    "narrativeSections": 6,
    "paragraphs": 21,
    "sourceEntries": 24,
    "sourceGroups": 3,
    "appendixSource": "M:/projekte/Ladesaeulenregister/audit charging-points/ladeinfrastruktur-technical-appendix-de.md",
    "appendixSha256": "4f791043f091b360e2bf79694231b6cece4f8c74672231d81d2898af9619f29a",
    "technicalTopics": 6,
    "technicalParagraphs": 32,
    "technicalTables": 4
  }
};
