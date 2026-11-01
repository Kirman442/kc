// Generated from the supplied German story. Do not edit by hand.
export default {
  "narrative": [
    {
      "title": "Von der Unfallkarte zum Analysewerkzeug",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Dieses Projekt ist aus einer einfachen Unfallkarte entstanden. Bei [Accidents](https://kirman442.github.io/gis/portfolio/Accidents) wollte ich herausfinden, wie ein Browser mit Hunderttausenden von Punkten zurechtkommt: Wie schnell lassen sie sich laden, darstellen und filtern? Die Daten zu Verkehrsunfällen in Deutschland boten dafür eine gute Grundlage. Jeder Datensatz enthielt Koordinaten und Merkmale für die Filterung, und das Ergebnis war unmittelbar auf der Karte sichtbar."
        },
        {
          "type": "paragraph",
          "text": "Die Karte funktionierte. Irgendwann kam die Frage auf: Könnte ich sie um Auswertungen ergänzen? Daten zum Pkw-Bestand in Deutschland und den einzelnen Bundesländern hatte ich bereits. Ich wollte sie mit den Unfalldaten zusammenbringen und herausfinden, was sich damit über die Lage der Punkte hinaus untersuchen lässt."
        },
        {
          "type": "paragraph",
          "text": "So entstand Unfallatlas Deutschland. Anfangs hatte ich nur einige Vergleiche im Sinn, doch daraus ergaben sich weitere Fragen. Wie vergleiche ich ein großes mit einem kleinen Bundesland? Steigt die Unfallzahl schneller als der Pkw-Bestand? Nach und nach verlagerte sich meine Arbeit von der Darstellung der Punkte zur Aufbereitung der Daten und zur Suche nach geeigneten Vergleichen."
        }
      ],
      "id": "story-start"
    },
    {
      "title": "Erst musste ich die Daten zusammenbringen",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Zunächst aktualisierte ich den Datenbestand: Ich bereitete sechs Jahresausgaben des amtlichen Unfallatlas für 2020 bis 2025 auf, insgesamt rund 1,54 Millionen Datensätze. Dabei musste ich zuerst klären, welche Unfälle darin enthalten sind. Erfasst werden geokodierte Unfälle mit Personenschaden, also mit Getöteten oder Verletzten. Unfälle mit ausschließlich Sachschaden sind nicht enthalten. Die Zahl der Kartenpunkte entspricht deshalb nicht der Gesamtzahl aller polizeilich erfassten Verkehrsunfälle."
        },
        {
          "type": "paragraph",
          "text": "Anschließend ergänzte ich Bevölkerungszahlen und den Pkw-Bestand. Die älteren Veröffentlichungen des Kraftfahrt-Bundesamtes (KBA) lagen in unterschiedlichen Formaten vor: PDF, XLS und XLSX. Beim Auslesen der PDF-Dateien liefen benachbarte Zahlen teilweise zusammen. Eine Trennung an Leerzeichen lieferte falsche Spalten; ich musste die Positionen der Tabellenzellen berücksichtigen und die Summen prüfen. Für die Anwendung übernahm ich nur die benötigten Angaben."
        },
        {
          "type": "paragraph",
          "text": "Auch die Gebietszuordnung hatte sich verändert. Eisenach wurde beispielsweise in den Wartburgkreis eingegliedert. Ein Vergleich anhand der alten Gebietsschlüssel hätte dadurch eine Veränderung zeigen können, die allein auf die Gebietsänderung zurückging. Ich führte die Daten auf einen einheitlichen Stand mit 400 Kreisen und kreisfreien Städten zusammen und prüfte, dass dabei weder Unfälle noch Einwohner verloren gingen oder doppelt gezählt wurden. Ein Fehler in der Aufbereitung hätte im Diagramm durchaus überzeugend ausgesehen."
        },
        {
          "type": "paragraph",
          "text": "[Technische Notiz: Quellen, Zeitbezüge und einheitlicher Gebietsstand](#appendix-note-1)."
        }
      ],
      "id": "story-2"
    },
    {
      "title": "Wie die Daten in den Browser kommen",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Die erste Version der Anwendung nutzte Supabase. Für die neue Version untersuchte ich einen anderen Weg: die Daten vorab aufzubereiten und als Dateien bereitzustellen. Die vorbereiteten Daten ändern sich nicht, wenn jemand einen Filter betätigt. Ein Teil der Verarbeitung lässt sich daher einmalig vor der Veröffentlichung erledigen."
        },
        {
          "type": "paragraph",
          "text": "Ich erzeugte Varianten in Parquet und Arrow und prüfte ihren Inhalt sowie das Verhalten des Laders. Für die Veröffentlichung entschied ich mich für Arrow IPC mit Brotli-Kompression und teilte die Daten nach Jahr und Bundesland auf. Das gewählte Jahr wird schrittweise in einzelnen Dateien geladen; die gesamte mehrjährige Sammlung muss nicht in einem einzigen Array liegen."
        },
        {
          "type": "paragraph",
          "text": "Für einen Jahresvergleich werden die Koordinaten jedes einzelnen Unfalls gar nicht benötigt. Ich trennte deshalb kleine, vorberechnete Auswertungen von den einzelnen Unfalldatensätzen. So lässt sich zunächst die Entwicklung im Überblick betrachten. Die Punkte für das gewünschte Jahr werden geladen, wenn man sie auf der Karte untersuchen möchte."
        },
        {
          "type": "paragraph",
          "text": "[Technische Notiz: Parquet, Arrow IPC und Brotli-Auslieferung](#appendix-note-2). [Schrittweises Laden und Cache-Verwaltung](#appendix-note-3)."
        }
      ],
      "id": "story-3"
    },
    {
      "title": "Filtern, ohne ständig neu zu laden",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Nach dem Laden eines Jahres wollte ich die Auswahl frei verändern können: Abendstunden auswählen, Unfälle mit Fahrradbeteiligung betrachten, Pkw ausschließen oder nach Dunkelheit und nasser Fahrbahn filtern. Wenn dafür bei jeder Änderung erneut Daten heruntergeladen werden müssten, würde aus dem Erkunden schnell ein Warten."
        },
        {
          "type": "paragraph",
          "text": "Die Filterberechnung verlagerte ich in Web Workers. Die geladenen Datenspalten bleiben dort; die Oberfläche erhält die Ergebnisse und die zugehörigen Kennzahlen. Bei schnellen Änderungen musste ich außerdem einen weiteren Fall berücksichtigen: Eine frühere Berechnung konnte erst fertig werden, nachdem die Auswahl schon geändert worden war. Eine Prüfung der Anfrageversion verhindert, dass dieses Ergebnis die aktuelle Auswahl wieder überschreibt."
        },
        {
          "type": "paragraph",
          "text": "Bei den Beteiligungskombinationen war Vorsicht nötig. Wenn an einem Unfall ein Fahrrad und ein Pkw beteiligt waren, belegt das noch keinen direkten Zusammenstoß zwischen ihnen. Aus diesen Merkmalen lässt sich weder die Schuldfrage klären noch ablesen, wer verletzt wurde. Die Kombinationen lassen sich untersuchen; ihre Aussagegrenzen erläutere ich in der Anwendung."
        },
        {
          "type": "paragraph",
          "text": "[Technische Notiz: Spaltenbasierte Filterung, Masken und Häufigkeiten der Filterwerte](#appendix-note-4)."
        }
      ],
      "id": "story-4"
    },
    {
      "title": "Welche Frage soll ein Diagramm beantworten?",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Die Diagramme wählte ich anschließend passend zu konkreten Fragen aus. Eine weitere Darstellung allein hilft wenig, solange unklar bleibt, was eigentlich verglichen wird."
        },
        {
          "type": "paragraph",
          "text": "Monate haben beispielsweise unterschiedlich viele Tage. Ich ergänzte die durchschnittliche Unfallzahl je Kalendertag, damit die Monatslänge den Vergleich nicht verzerrt. Für Wochentage berücksichtigte ich, wie viele Montage oder Sonntage im gewählten Zeitraum tatsächlich vorkamen."
        },
        {
          "type": "paragraph",
          "text": "Beim Vergleich der Regionen stellte ich der Unfallzahl eine Kennzahl je 100.000 Einwohner zur Seite. Die Zahl der Unfälle mit Pkw-Beteiligung setzte ich ins Verhältnis zum angenäherten durchschnittlichen Bestand zugelassener Pkw im jeweiligen Jahr. So lässt sich die Entwicklung der Unfälle auch im Verhältnis zu Bevölkerung und Pkw-Bestand betrachten."
        },
        {
          "type": "paragraph",
          "text": "Bei den Unfallbedingungen trennte ich zwei Fragen: Wie viele Unfälle wurden erfasst, und welcher Anteil davon waren Unfälle mit Getöteten oder Schwerverletzten? Bedingungen mit besonders vielen Unfällen müssen nicht zugleich durch einen hohen Anteil dieser Unfallfolgen auffallen. Der Wechsel zwischen den Kennzahlen macht den Unterschied sichtbar. Ohne Angaben zum Verkehrsaufkommen lässt sich daraus jedoch nicht ableiten, welche Bedingungen gefährlicher sind."
        },
        {
          "type": "paragraph",
          "text": "Die Veränderung zwischen Jahren schlüsselte ich nach Monaten und Unfallkategorien auf: Wo nahm die Unfallzahl zu, wo ging sie zurück? Neben der Gesamtdifferenz lässt sich damit nachvollziehen, wie sie sich zusammensetzt."
        },
        {
          "type": "paragraph",
          "text": "[Technische Notiz: Bezugsgrößen und die Zusammensetzung einer Veränderung](#appendix-note-5)."
        }
      ],
      "id": "story-5"
    },
    {
      "title": "Von der Auswertung zurück zum einzelnen Unfall",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Aus den Auswertungen führen Links mit der passenden Auswahl zur Karte. Wer einen Monat, bestimmte Bedingungen oder ein Szenario betrachtet hat, kann sich dort die räumliche Verteilung genau dieser Unfälle ansehen."
        },
        {
          "type": "paragraph",
          "text": "In der Übersicht überlagern sich einzelne Punkte. Die Hexagon-Darstellung fasst Unfälle in sechseckigen Zellen zusammen; beim Hineinzoomen lassen sich die einzelnen Ereignisse betrachten. Enthält eine Zelle nur einen Unfall, öffnet sich direkt dessen Detailansicht."
        },
        {
          "type": "paragraph",
          "text": "Für mehrere Ereignisse ergänzte ich die Aktion „Diese N Unfälle zeigen“ und die Rückkehr zur vorherigen Ansicht. Hinter dem kleinen Bedienelement steckte eine eigene Aufgabe: Die Auswahl musste exakt die Unfälle der Zelle enthalten. Eine Suche in der Nähe ihres Mittelpunkts hätte ein benachbartes Ereignis einschließen oder eines aus der Zelle übersehen können. Deshalb wird die Zugehörigkeit nach derselben Regel bestimmt wie bei der Aggregation."
        },
        {
          "type": "paragraph",
          "text": "[Technische Notiz: Exakte Zellzugehörigkeit und Rückkehr zur Kartenansicht](#appendix-note-6)."
        }
      ],
      "id": "story-6"
    },
    {
      "title": "Richtig gerechnet ist noch nicht gut bedienbar",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Vieles fiel erst beim Arbeiten mit den fertigen Ansichten auf. Saisonale Diagramme für jedes einzelne Jahr brauchten zu viel Platz. Ein gewähltes Filterszenario änderte mitunter eine Informationskarte unterhalb des sichtbaren Ausschnitts, sodass die Wirkung des Klicks unbemerkt blieb. Auf der hellen Grundkarte wirkten die Punkte zwar dezent, waren aber schlecht zu erkennen. Jedes Mal stellte sich dieselbe Frage: Ist nachvollziehbar, was gerade ausgewählt wurde und was sich dadurch verändert hat?"
        },
        {
          "type": "paragraph",
          "text": "Ich probierte Lösungen in separaten Prototypen aus und prüfte sie mit den Daten. Daraus entstanden eine kompakte Uhrzeitauswahl und ein einklappbares Menü, das der Karte mehr Platz lässt. Für die helle Grundkarte brauchte ich eine eigene Punktpalette: Die Farben der dunklen Karte gingen dort unter."
        },
        {
          "type": "paragraph",
          "text": "Auch die alltäglichen Wechsel zwischen den Bereichen prüfte ich. Einmal schnell eine Karte zu öffnen reicht nicht, wenn sie bei der Rückkehr neu aufgebaut wird oder ihre Grundkarte verliert. Außerdem glich ich die Ergebnisse der Auswertungen, der Filter und der einzelnen Datensätze ab, damit dieselben Bedingungen überall dieselben Zahlen ergeben."
        }
      ],
      "id": "story-7"
    },
    {
      "title": "Was daraus geworden ist",
      "blocks": [
        {
          "type": "paragraph",
          "text": "[Unfallatlas Deutschland öffnen](https://unfallatlas.netlify.app/)."
        },
        {
          "type": "paragraph",
          "text": "Um die Karte herum ist ein Werkzeug zum Vergleich von Regionen, Zeiträumen, Bedingungen und Beteiligten entstanden. Man kann eine Kennzahl untersuchen und anschließend die Unfälle der gewählten Auswahl auf der Karte sehen. Ausgehend von der Darstellungsgeschwindigkeit bin ich bei einer für mich interessanteren Aufgabe angekommen: Wie wird aus einer Sammlung von Datensätzen eine Untersuchung, deren Schritte für die Nutzenden nachvollziehbar sind?"
        },
        {
          "type": "paragraph",
          "text": "Die Daten haben Grenzen. Fahrleistung und Verkehrsaufkommen sind darin nicht enthalten; Kennzahlen je Einwohner oder Pkw beschreiben daher kein Unfallrisiko je Fahrt. Ein Fahrzeug kann in einer Region zugelassen sein und in einer anderen verunglücken. Die Einordnung als Unfall mit Getöteten oder Schwerverletzten beschreibt die schwerste Unfallfolge und gibt nicht die Zahl der getöteten oder verletzten Menschen an."
        },
        {
          "type": "paragraph",
          "text": "Formeln und Einschränkungen stehen direkt bei den Kennzahlen und in den Erläuterungen. Damit soll erkennbar sein, welche Vergleiche die Anwendung ermöglicht und für welche Fragen weitere Daten nötig wären."
        }
      ],
      "id": "story-8"
    }
  ],
  "notes": [
    {
      "id": "appendix-note-1",
      "title": "1. Quellen, Zeitbezüge und einheitlicher Gebietsstand",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Die Unfalldaten der Anwendung umfassen 2020–2025. Die Bevölkerungszahlen wurden für 2016–2025 aufbereitet, die Pkw-Bestände als Stichtagswerte zum 1. Januar der Jahre 2016–2026."
        },
        {
          "type": "paragraph",
          "text": "Für den regionalen Vergleich wurden alle Jahre auf einen einheitlichen Stand mit 400 Gebieten auf Kreisebene gebracht. Der Schlüssel 16056 für Eisenach wird dem Wartburgkreis mit dem Schlüssel 16063 zugeordnet. Für die Bevölkerung 2020 werden die beiden ursprünglichen Angaben addiert; ab 2021 ist Eisenach bereits im Bevölkerungsstand des Wartburgkreises enthalten. Eine erneute Addition wäre falsch. In den Unfalldaten kommt der alte Schlüssel noch 2021 vor. Die Schlüssel für Hamburg werden auf 02000 vereinheitlicht, die für Berlin auf 11000. Angeglichen werden Schlüssel und Summen; historische Grenzverläufe werden nicht aus den Koordinaten rekonstruiert."
        },
        {
          "type": "paragraph",
          "text": "Für die Bevölkerung gilt jeweils der Stand zum 31. Dezember. Der Wechsel der Fortschreibungsbasis vom Zensus 2011 zum Zensus 2022 bleibt ein Bruch in der Zeitreihe. Die BKG-Geometrie wurde für die Darstellung vereinfacht, damit sie schneller geladen werden kann. Die anhand der Gebietsschlüssel berechneten Summen bleiben davon unberührt."
        }
      ]
    },
    {
      "id": "appendix-note-2",
      "title": "2. Parquet, Arrow IPC und Brotli",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Parquet wird bei der Aufbereitung und für das Archiv verwendet. An den Browser werden Arrow-IPC-Dateien mit äußerer Brotli-Kompression ausgeliefert. Das veröffentlichte Paket enthält 96 Unfalldateien - sechs Jahre mit jeweils 16 Bundesländern - sowie eine Arrow-Datei mit den Pkw-Beständen. Vorberechnete Auswertungen und Angaben zum Datenbestand liegen zusätzlich als JSON vor."
        },
        {
          "type": "paragraph",
          "text": "Im Laufzeitdatensatz werden Koordinaten als Float64-Paare mit fünf Nachkommastellen geführt; das vollständige Archiv bewahrt die ursprünglichen Koordinaten. Kategorien, Jahre, Identifikatoren und Gebietsschlüssel haben eigene Datentypen. Die ursprüngliche textuelle UID wird nicht als grundsätzlich eindeutiger Schlüssel behandelt: Weder wiederholte UIDs noch identische Koordinaten rechtfertigen das Entfernen eines Unfallereignisses."
        },
        {
          "type": "paragraph",
          "text": "Die Dateiendung `.br` allein genügt nicht. Eine Netlify Edge Function setzt `Content-Encoding: br` und den Arrow-Medientyp. Der Browser dekomprimiert die HTTP-Antwort; der Worker liest IPC und prüft die Prüfsumme der dekomprimierten Bytes. Die öffentliche Version enthält keinen Parquet-Decoder und keine zugehörige WASM-Datei."
        },
        {
          "type": "paragraph",
          "text": "Die vorbereitete Veröffentlichung umfasst rund 46,25 MB einschließlich Anwendung und Ressourcen. Das ist die Größe der bereitgestellten Dateien, nicht das Übertragungsvolumen beim ersten Besuch. Das Lesen von Arrow, die Filterung und die Vorbereitung der Darstellung benötigen weiterhin Speicher und Rechenzeit. Der gesamte Weg bis zur GPU wird hier nicht als Zero-Copy bezeichnet."
        },
        {
          "type": "heading",
          "level": 4,
          "text": "Warum eine `.br`-Datei noch keine korrekte Brotli-Auslieferung ist"
        },
        {
          "type": "paragraph",
          "text": "Arrow wird vor der Veröffentlichung komprimiert. Bei der Auslieferung teile ich dem Browser mit, wie er die Antwort verarbeiten muss. Gezeigt ist ein Ausschnitt der verwendeten Edge Function. Die vorgeschalteten Prüfungen des erlaubten Pfades und der HTTP-Methode sind hier ausgelassen."
        },
        {
          "type": "code",
          "language": "javascript",
          "code": "const response = await context.next();\nif (response.status !== 200) return response;\nconst entry = ASSETS[pathname];\nconst headers = new Headers(response.headers);\nif (entry.encoding === 'br') {\n  const original = response.headers.get('content-encoding');\n  if (original && original !== 'identity') {\n    return new Response('Unexpected origin compression', {status: 502});\n  }\n  headers.set('Content-Encoding', 'br');\n}\nheaders.set('Content-Type', entry.mime);\nheaders.set('Cache-Control',\n  'public, max-age=31536000, immutable, no-transform');\nreturn new Response(request.method === 'HEAD' ? null : response.body,\n  {status: response.status, headers});"
        },
        {
          "type": "paragraph",
          "text": "`ASSETS` ist der beim Build erzeugte Index der erlaubten Dateien. Die Prüfung des ursprünglichen `Content-Encoding` verhindert eine falsche Interpretation einer bereits komprimierten Antwort. Die lange Cache-Dauer gilt für Dateien unter einem Pfad mit der Datenversion, nicht für veränderliches HTML. Der vollständige Code setzt außerdem weitere Header für Sicherheit und Messungen."
        },
        {
          "type": "paragraph",
          "text": "Im ladenden Worker wird auf der anderen Seite der bereits dekomprimierte Inhalt geprüft. Für diesen Artikel wurde lediglich die Fehlermeldung ins Deutsche übertragen; die Programmlogik ist unverändert:"
        },
        {
          "type": "code",
          "language": "javascript",
          "code": "const bytes = new Uint8Array(await response.arrayBuffer());\nif (await hash(bytes) !== task.decodedSha256) {\n  throw new Error('Prüfsumme stimmt nicht überein: Bundesland ' + task.land);\n}"
        },
        {
          "type": "paragraph",
          "text": "Der Browser führt die HTTP-Dekompression durch, bevor diese Bytes an den Code übergeben werden. Die erwartete SHA-256-Prüfsumme bezieht sich deshalb auf IPC, nicht auf die gespeicherte `.br`-Datei. Anschließend werden das Schema und die Übereinstimmung mit vorberechneten Summen geprüft; die Datei-Prüfsumme ersetzt diese Kontrollen nicht."
        }
      ]
    },
    {
      "id": "appendix-note-3",
      "title": "3. Schrittweises Laden und Cache-Verwaltung",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Die Karte lädt das gewählte Jahr nach Bundesländern aufgeteilt über einen Pool aus vier Workern. Fertige Teile können schrittweise eintreffen. Dabei wird jeweils die vollständige Datei eines Bundeslandes geladen, kein beliebiger Zeilenbereich und nicht nur der sichtbare Kartenausschnitt."
        },
        {
          "type": "paragraph",
          "text": "Die Worker behalten die ursprünglichen Tabellen und Spalten; der Hauptthread erhält die für die Darstellung benötigten numerischen Arrays. Für den Cache gilt eine Speicherobergrenze: Daten nicht mehr benötigter Jahre werden bei Bedarf freigegeben. Die Berechnung berücksichtigt die Buffer der Anwendung, nicht jedoch den gesamten Speicher des Tabs, von MapLibre oder der GPU."
        },
        {
          "type": "paragraph",
          "text": "Beim Jahreswechsel werden vorherige Ladevorgänge abgebrochen und Ergebnisse auf Aktualität geprüft. Ein unvollständiges oder fehlerhaft geladenes Jahr wird nicht als fertig in den Cache übernommen. Die Analyseansichten verwenden dagegen vorberechnete Auswertungen und müssen nicht alle Unfallereignisse eines mehrjährigen Zeitraums im Speicher halten."
        }
      ]
    },
    {
      "id": "appendix-note-4",
      "title": "4. Filterung und verfügbare Filterwerte",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Innerhalb eines kategorialen Feldes sind gewählte Werte mit ODER verknüpft, verschiedene Felder mit UND. Für die Beteiligung gibt es drei Zustände: vorhanden, ausgeschlossen und ohne Einschränkung. Bei den Uhrzeiten sind auch getrennte Intervalle möglich. Werden keine Stunden ausgewählt, enthält das Ergebnis keine Unfälle."
        },
        {
          "type": "paragraph",
          "text": "Der Worker durchläuft die Spalten und berechnet eine Auswahlmaske, die Häufigkeiten nach Unfallfolge sowie die Häufigkeiten der Filterwerte (Facettenzählung). Für den Zähler eines Feldes gelten alle übrigen Filterbedingungen: Ein Datensatz, der nur die Bedingung dieses Feldes nicht erfüllt, wird dort trotzdem berücksichtigt. Verfehlt er mehrere Bedingungen, geht er auch in diesen Zähler nicht ein."
        },
        {
          "type": "paragraph",
          "text": "Die Koordinaten des Jahres werden nicht bei jeder Änderung erneut heruntergeladen. Auswahlmasken und die Aufbereitung der gefilterten Darstellung verursachen dennoch Arbeit. Der Scheduler prüft die Anfrageversion, damit ein älteres Ergebnis keine neuere Auswahl ersetzt. Die Detailansichten greifen auf die in den Workern gespeicherten Ursprungsdaten zu."
        },
        {
          "type": "heading",
          "level": 4,
          "text": "Häufigkeiten auch für aktuell nicht gewählte Werte"
        },
        {
          "type": "paragraph",
          "text": "Für jeden Datensatz prüfe ich zunächst die Bedingungen. `failures` hält fest, ob keine, eine oder mehrere Bedingungen verfehlt wurden. `failed` ist bei genau einer verfehlten Bedingung der Index dieses Feldes. Der folgende Zweig aus `queryColumns` entscheidet, wo der Datensatz gezählt wird. Die Vorbereitung der Spalten und die eigentliche Bedingungsprüfung sind ausgelassen; die Formatierung wurde zur besseren Lesbarkeit angepasst."
        },
        {
          "type": "code",
          "language": "javascript",
          "code": "if (!failures) {\n  mask[i] = 1;\n  count++;\n  category[values[keys.indexOf('category')] - 1]++;\n  for (let j = 0; j < keys.length; j++) {\n    facets[keys[j]][values[j]]++;\n  }\n} else if (failures === 1) {\n  facets[keys[failed]][values[failed]]++;\n}"
        },
        {
          "type": "paragraph",
          "text": "Sind Fahrradbeteiligung und Tageslicht gewählt, gehört ein Fahrradunfall bei Dunkelheit nicht zum aktuellen Ergebnis. Im Zähler für „Dunkelheit“ wird er dennoch berücksichtigt: Die übrigen Bedingungen sind erfüllt, und die Lichtverhältnisse lassen sich ändern. War kein Fahrrad beteiligt, sind bereits zwei Bedingungen verfehlt; dieses Ereignis wird dann auch im Zähler für „Dunkelheit“ nicht mitgezählt. Die Zahlen an den Filterwerten entsprechen deshalb nicht immer der Verteilung innerhalb der endgültigen Auswahl. Berechnet wird die Häufigkeit unter Ausklammerung des jeweiligen eigenen Feldfilters, keine Vorhersage des Ergebnisses jeder möglichen Änderung bei Mehrfachauswahl."
        },
        {
          "type": "heading",
          "level": 4,
          "text": "Warum eine alte Antwort die Auswahl nicht zurücksetzen darf"
        },
        {
          "type": "paragraph",
          "text": "Jeder neue Zustand erhält eine fortlaufende Version und ersetzt `s.latest`. Der Ausschnitt stammt aus der Verarbeitungsschleife des Karten-Schedulers. Die äußere Schleife, der Schutz vor parallelen Durchläufen und die Fehlerbehandlung sind ausgelassen."
        },
        {
          "type": "code",
          "language": "javascript",
          "code": "const job = s.latest, start = performance.now();\nconst queried = job.source.length\n  ? await loader.current.query(job.year, job.format,\n      job.source.map(p => p.land), job.filters)\n  : [];\nif (job.version === s.version && s.alive) {\n  s.completed = job;\n  setResult({\n    ...mergeQueryParts(queried), source: job.source,\n    updating: false, error: '', ms: performance.now() - start\n  });\n}\nif (job.version === s.version) break;"
        },
        {
          "type": "paragraph",
          "text": "Ändern sich die Filter während des `await`, stimmt die Version nicht mehr überein: Das Ergebnis wird nicht in die Oberfläche übernommen, und die Schleife verarbeitet die zuletzt angefragte Auswahl. Zwischenzustände müssen nicht nacheinander dargestellt werden. `s.alive` verhindert außerdem, dass nach dem Ende des Scheduler-Lebenszyklus noch ein Ergebnis übernommen wird. Das schützt vor veralteten Antworten, bricht aber eine bereits laufende Berechnung nicht ab. Der Abbruch von Ladevorgängen wird gesondert behandelt."
        }
      ]
    },
    {
      "id": "appendix-note-5",
      "title": "5. Bezugsgrößen und die Zusammensetzung einer Veränderung",
      "blocks": [
        {
          "type": "table",
          "headers": [
            "Kennzahl",
            "Berechnung und Bedeutung"
          ],
          "rows": [
            [
              "Unfallzahl",
              "Zahl der Ereignisse in der Auswahl, keine Personenzahl"
            ],
            [
              "Anteil der Unfälle mit Getöteten oder Schwerverletzten",
              "Unfälle mit Getöteten oder Schwerverletzten / alle Unfälle der Auswahl × 100 %"
            ],
            [
              "Unfälle je 100.000 Einwohner",
              "Unfallzahl / Bevölkerungsstand am 31. Dezember des jeweiligen Jahres × 100.000"
            ],
            [
              "Pkw-Unfälle je 10.000 Pkw",
              "Unfälle mit Pkw-Beteiligung / Mittelwert der Bestände am Jahresbeginn und am Beginn des Folgejahres × 10.000"
            ],
            [
              "Tagesdurchschnitt eines Monats",
              "Unfallzahl des Monats / tatsächliche Zahl seiner Kalendertage"
            ],
            [
              "Tagesdurchschnitt für einen Wochentag",
              "Zahl der passenden Unfälle / Zahl der Vorkommen dieses Wochentags im Zeitraum"
            ],
            [
              "Veränderung",
              "Endwert − Ausgangswert; relative Veränderung bezogen auf den Ausgangswert"
            ]
          ]
        },
        {
          "type": "paragraph",
          "text": "Differenzen zwischen Anteilen werden in Prozentpunkten angegeben. Bei einem Ausgangswert von null ist die relative Veränderung nicht definiert. Die Beiträge nicht überlappender Monate oder Kategorien müssen zusammen die Gesamtdifferenz ergeben. Beteiligungsgruppen überschneiden sich und dürfen so nicht addiert werden."
        },
        {
          "type": "paragraph",
          "text": "Während der Aufbereitung werden die Dateien erneut eingelesen und verglichen. Geprüft werden Datentypen, Wertebereiche, Datensatzanzahl, Reihenfolge und Prüfsummen. Im Browser werden ebenfalls Datenversion und Prüfsummen kontrolliert. Zum Veröffentlichungsstand bestehen alle 169 automatisierten Tests. Sie decken bestimmte Abläufe und Konsistenzbedingungen ab, ersetzen aber keine Prüfung der Oberfläche auf verschiedenen Geräten."
        }
      ]
    },
    {
      "id": "appendix-note-6",
      "title": "6. Exakte Zusammensetzung eines Hexagons",
      "blocks": [
        {
          "type": "paragraph",
          "text": "Die ausgewählte Zelle gehört zu einem bestimmten Stand der gefilterten Punkte und der Aggregationsparameter. Bei „Diese N Unfälle zeigen“ wird ihre Zusammensetzung mit derselben Zuordnungsregel wie bei der Aggregation ermittelt. Die Anzahl wird mit dem Aggregationsergebnis abgeglichen. Eine Suche in einem Kreis oder Rechteck könnte eine andere Auswahl ergeben."
        },
        {
          "type": "paragraph",
          "text": "Für die Ereignisse bleiben Verweise auf die ursprünglichen Datenpartitionen und Datensätze erhalten. Unfälle mit identischen Koordinaten werden nicht zu einem Ereignis zusammengefasst. Weiteres Verschieben der Karte ändert die eingeschränkte Auswahl nicht. Die Rückkehr stellt Kamera, Zelldetails und ursprüngliche Auswahl wieder her. Ein Wechsel von Jahr, Bundesland oder Filtern hebt diesen vorübergehenden Modus auf."
        },
        {
          "type": "paragraph",
          "text": "Die Beschränkung auf die Zelle wird derzeit nicht im üblichen Filterlink gespeichert. Das Kopieren dieses Links ist im eingeschränkten Modus mit einer Erläuterung deaktiviert. Enthält die Zelle nur einen Datensatz, öffnet sich unmittelbar die Detailansicht des Unfalls."
        }
      ]
    }
  ],
  "sources": {
    "title": "Sources and documentation",
    "blocks": [
      {
        "type": "heading",
        "level": 3,
        "text": "Datenquellen und Methodik"
      },
      {
        "type": "table",
        "headers": [
          "Quelle",
          "Verwendung",
          "Link"
        ],
        "rows": [
          [
            "Unfallatlas, Statistische Ämter des Bundes und der Länder",
            "Geokodierte Unfälle mit Personenschaden; in der Anwendung 2020–2025",
            "[Beschreibung und Zugang zum amtlichen Atlas](https://www.statistikportal.de/de/karten/unfallatlas)"
          ],
          [
            "Unfallatlas - Datensatzbeschreibung",
            "Felder, Kategorien, Beteiligungsmerkmale und Grenzen des Ausgangsdatensatzes",
            "[DSB_Unfallatlas.pdf](https://www.opengeodata.nrw.de/produkte/transport_verkehr/unfallatlas/DSB_Unfallatlas.pdf)"
          ],
          [
            "Destatis GENESIS, Bevölkerungsfortschreibung",
            "Bevölkerung nach Jahr und Gebiet; aufbereitete Reihe 2016–2025",
            "[Statistik 12411](https://genesis.destatis.de/datenbank/online/statistic/12411), Tabellen [12411-0011](https://genesis.destatis.de/datenbank/online/table/12411-0011), [12411-0021](https://genesis.destatis.de/datenbank/online/table/12411-0021), [12411-0016](https://genesis.destatis.de/datenbank/online/table/12411-0016)"
          ],
          [
            "Kraftfahrt-Bundesamt, FZ 1",
            "Pkw-Bestände; aufbereitete Stichtagswerte zum 1. Januar 2016–2026",
            "[Produktkatalog FZ 1](https://www.kba.de/DE/Statistik/Produktkatalog/produkte/Fahrzeuge/fz1_b_uebersicht.html)"
          ],
          [
            "BKG, Verwaltungsgebiete VG250",
            "Darstellungsgrenzen auf Grundlage der Geometrie vom 01.01.2026, vereinfacht; Gebietseinheiten auf Kreisebene auf den Stand 2025 abgestimmt",
            "[VG250](https://gdz.bkg.bund.de/index.php/default/open-data/verwaltungsgebiete-1-250-000-stand-01-01-vg250-01-01.html), [Datenquellen](https://sgx.geodatenzentrum.de/web_public/gdz/datenquellen/datenquellen_vg_nuts.pdf)"
          ],
          [
            "Destatis, Verkehrsunfälle 2021",
            "Amtliche Definitionen und Unterscheidung von Unfällen und Verunglückten; keine zusätzliche Unfalldatenreihe der Anwendung",
            "[Jahresbericht](https://www.destatis.de/DE/Themen/Gesellschaft-Umwelt/Verkehrsunfaelle/Publikationen/Downloads-Verkehrsunfaelle/verkehrsunfaelle-jahr-2080700217004.pdf?__blob=publicationFile)"
          ],
          [
            "Bayerisches Landesamt für Statistik",
            "Erläuterungen zu Unfalltyp, Unfallart und Unfallfolgen im amtlichen statistischen Bericht",
            "[Straßenverkehrsunfälle 2021](https://www.statistik.bayern.de/mam/produkte/veroffentlichungen/statistische_berichte/h1100d_202100.pdf#page=5)"
          ],
          [
            "CARTO und OpenStreetMap contributors",
            "Grundkarten Positron und Dark Matter sowie kartografische Daten",
            "[CARTO attribution](https://carto.com/attribution/index.html), [OpenStreetMap copyright](https://www.openstreetmap.org/copyright)"
          ]
        ]
      },
      {
        "type": "paragraph",
        "text": "Quellenvermerk der Grenzen: © BKG (2026), [dl-de/by-2-0](https://www.govdata.de/dl-de/by-2-0), unter Angabe der BKG-Datenquellen. Änderungen: Vereinfachung für die Darstellung und Angleichung der Gebietseinheiten auf Kreisebene. Für die übrigen Datensätze gelten die jeweiligen Lizenz- und Quellenangaben."
      },
      {
        "type": "heading",
        "level": 3,
        "text": "Pakete, Bibliotheken und Dienste"
      },
      {
        "type": "table",
        "headers": [
          "Werkzeug",
          "Aufgabe im Projekt",
          "Dokumentation"
        ],
        "rows": [
          [
            "React",
            "Oberfläche, Navigation und Zustände der Ansichten",
            "[react.dev](https://react.dev/)"
          ],
          [
            "deck.gl",
            "GPU-gestützte Darstellung von Punkten und Hexagonen sowie Interaktion mit Kartenobjekten",
            "[deck.gl](https://deck.gl/docs)"
          ],
          [
            "MapLibre GL JS",
            "Vektorgrundkarte, Kamera und räumlicher Kontext",
            "[MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/)"
          ],
          [
            "@vis.gl/react-maplibre",
            "Einbindung von MapLibre in React",
            "[react-maplibre](https://visgl.github.io/react-maplibre/)"
          ],
          [
            "Apache Arrow JavaScript",
            "Lesen von Arrow IPC und Zugriff auf Spalten im Browser",
            "[Arrow JS](https://arrow.apache.org/js/current/)"
          ],
          [
            "Python und PyArrow",
            "Geprüfte Aufbereitung von CSV, Parquet und Arrow sowie der Jahresauswertungen",
            "[PyArrow](https://arrow.apache.org/docs/python/)"
          ],
          [
            "openpyxl und xlrd",
            "Lesen der ursprünglichen XLSX-Dateien und älteren XLS-Dateien des KBA",
            "[openpyxl](https://openpyxl.readthedocs.io/en/stable/), [xlrd](https://xlrd.readthedocs.io/en/latest/)"
          ],
          [
            "pdfplumber und pypdf",
            "Auslesen von Tabellen aus textbasierten PDF-Veröffentlichungen des KBA",
            "[pdfplumber](https://github.com/jsvine/pdfplumber), [pypdf](https://pypdf.readthedocs.io/en/stable/)"
          ],
          [
            "NumPy und Shapely",
            "Prüfung und Aufbereitung der Kartengeometrie",
            "[NumPy](https://numpy.org/doc/), [Shapely](https://shapely.readthedocs.io/en/stable/)"
          ],
          [
            "Web Workers und TypedArrays",
            "Spaltenbasierte Filterung außerhalb des Hauptthreads, Masken und Übergabe numerischer Arrays",
            "[Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray)"
          ],
          [
            "Brotli",
            "Vorabkompression der Arrow-Dateien für die HTTP-Auslieferung",
            "[RFC 7932](https://www.rfc-editor.org/rfc/rfc7932)"
          ],
          [
            "Vite",
            "Entwicklung und Build der Anwendung",
            "[Vite](https://vite.dev/guide/)"
          ],
          [
            "Netlify und Edge Functions",
            "Dateihosting sowie passende Header für Brotli und Caching",
            "[Netlify Edge Functions](https://docs.netlify.com/build/edge-functions/overview/)"
          ],
          [
            "Supabase / PostgreSQL / PostGIS - Vorgängerversion",
            "Ursprüngliches Experiment mit Karte und Datenbankabfragen; kein Backend der heutigen Dateiversion",
            "[Supabase](https://supabase.com/docs), [PostGIS](https://postgis.net/documentation/)"
          ],
          [
            "parquet-wasm - untersuchte Varianten",
            "Parquet-Dekodierung beim Erproben der Dateivarianten; nicht Bestandteil des veröffentlichten Arrow-Pakets",
            "[parquet-wasm](https://kylebarron.dev/parquet-wasm/)"
          ]
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "text": "Project credits"
      },
      {
        "type": "list",
        "items": [
          "**Kirill Lisochenko** - Idee und Umsetzung des Projekts: ursprüngliche Karte, analytische Fragestellungen, Recherche und Aufbereitung der Daten, Gestaltung, Prüfung von Oberfläche und Ergebnissen.",
          "**Richard Sorge** - UI/UX-Design, Gestaltung der Seiten und Benutzeroberflächen der Anwendung sowie Entwicklung der Farbpaletten für das helle und dunkle Design.",
          "**OpenAI Codex** - Unterstützung bei Architekturuntersuchungen, Prototypen, Datenaufbereitung, Implementierung, Tests und Dokumentation. Die Entscheidungen und die Abnahme lagen beim Projektverantwortlichen.",
          "**Statistische Ämter des Bundes und der Länder, Destatis, KBA und BKG** - amtliche Daten, Klassifikationen und methodische Unterlagen.",
          "**CARTO und OpenStreetMap contributors** - Grundkarten und kartografische Daten; die erforderlichen Quellenangaben erscheinen auch direkt auf der Karte.",
          "**Entwicklerinnen, Entwickler und Open-Source-Communities** - Apache Arrow, vis.gl/deck.gl, MapLibre, React, die verwendeten Python-Bibliotheken und Vite als Grundlage der Aufbereitung und Anwendung."
        ]
      },
      {
        "type": "heading",
        "level": 3,
        "text": "Dokumentation und weiterführende Materialien"
      },
      {
        "type": "table",
        "headers": [
          "Material",
          "Bezug zum Projekt"
        ],
        "rows": [
          [
            "[Accidents - das Vorgängerprojekt](https://kirman442.github.io/gis/portfolio/Accidents)",
            "Ausgangspunkt der Idee und erste Erfahrungen mit schneller Darstellung und Filterung"
          ],
          [
            "[Apache Arrow Columnar Format](https://arrow.apache.org/docs/format/Columnar.html)",
            "Spaltenlayout, Datentypen und IPC; kein Beleg für durchgängiges Zero-Copy in dieser Anwendung"
          ],
          [
            "[Apache Parquet](https://parquet.apache.org/docs/)",
            "Speicherformat für aufbereitete Daten und das Archiv"
          ],
          [
            "[deck.gl Performance Optimization](https://deck.gl/docs/developer-guide/performance)",
            "Layer-Updates, stabile Datenreferenzen und binäre Attribute"
          ],
          [
            "[ScatterplotLayer](https://deck.gl/docs/api-reference/layers/scatterplot-layer)",
            "Darstellung einzelner Unfallereignisse"
          ],
          [
            "[HexagonLayer](https://deck.gl/docs/api-reference/aggregation-layers/hexagon-layer)",
            "Aggregation in Zellen und deren Parameter"
          ],
          [
            "[MDN Transferable objects](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects)",
            "Übertragung von ArrayBuffern zwischen Threads und Grenzen des Begriffs Zero-Copy"
          ],
          [
            "[MDN Content-Encoding](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Encoding)",
            "Warum die Endung .br allein für die HTTP-Auslieferung nicht genügt"
          ],
          [
            "[Shapely coverage_simplify](https://shapely.readthedocs.io/en/stable/reference/shapely.coverage_simplify.html)",
            "Vereinfachung zusammenhängender Gebietsgrenzen unter Erhaltung der topologischen Abdeckung"
          ],
          [
            "[Methodik der Anwendung](https://unfallatlas.netlify.app/accidents/app.html?screen=methodology)",
            "Verwendete Formeln, Bezugsgrößen und Einschränkungen"
          ],
          [
            "[Begriffe der Anwendung](https://unfallatlas.netlify.app/accidents/app.html?screen=dictionary)",
            "Kategorien, Beteiligung, Bedingungen und Klassifikationen"
          ]
        ]
      }
    ]
  },
  "report": {
    "source": "M:/projekte/germany/UAD/docs/unfallatlas-project-story-de.md",
    "sha256": "03038d9392dc991c54f21ead0cacdafeab38e104fcc958a5f8c7b1c5c7c3b1ea",
    "sections": 8,
    "technicalNotes": 6,
    "paragraphs": 59,
    "codeBlocks": 4,
    "tables": 4,
    "tableRows": 41,
    "narrativeWords": 1409,
    "estimatedReadingMinutes": 8
  }
};
