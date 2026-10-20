# Karten & Code

Persönliches Portfolio von Kirill Lisochenko: Geodaten, Kartografie und interaktive Webanwendungen.

Website: **https://kirman442.github.io/kc/**

React 18, Vite und eigenes CSS. Die Projektgeschichten werden beim Build als einzelne HTML-Seiten erzeugt; React ergänzt die interaktiven Komponenten im Browser.

## Lokal starten

Voraussetzung: Node.js 22.12 oder neuer.

```sh
npm ci
npm run dev
```

Entwicklung: http://127.0.0.1:5183/kc/

## Build und Prüfung

```sh
npm run check
npm run build
npm test
npm run preview
```

Der Preview-Server verwendet denselben Port wie der Entwicklungsserver; nur einen davon gleichzeitig starten.

Der Build erzeugt HTML, Metadaten, Sitemap und Weiterleitungen innerhalb von `/kc/`. Anschließend werden interne Links, Anker und die Groß-/Kleinschreibung von Dateinamen geprüft. Die Client-Tests prüfen React-Hydration und ausgewählte Interaktionen in jsdom. Sie ersetzen keine visuelle Browserprüfung und prüfen nicht die extern gehosteten Kartenanwendungen.

## Inhalte bearbeiten

- `src/projects.js`: Projektkatalog, Vorschaubilder, Datum und Reihenfolge.
- `src/routes.js`: Seiten und Metadaten.
- `src/*Article.jsx`, `FullProject.jsx`, `AboutPage.jsx`: Geschichten und Seiten.
- `src/ladeinfrastruktur-content.js`, `src/unfallatlas-trial-content.js`: strukturierte Projekttexte.
- `src/LegalPage.jsx`, `src/legal-details.js`: rechtliche Informationen und offene Prüfpunkte.
- `src/components.jsx`, `src/SiteHeader.jsx`, `src/MapEmbed.jsx`: gemeinsame Komponenten.
- `public/`: Bilder, Video und Browser-Icons.
- `site.config.mjs`: Basis-Pfad `/kc/`, Origin und Zielrepository.

`dist/` wird generiert und nicht von Hand bearbeitet. Eingebettete Anwendungen werden unabhängig von diesem Repository veröffentlicht.

## Veröffentlichung

Der Workflow **Publish Karten & Code to kc** wird manuell in GitHub Actions gestartet. Er installiert die Abhängigkeiten, führt die Prüfungen aus und veröffentlicht `dist/` über GitHub Pages. `npm run check:publication` prüft das Zielrepository und meldet offene rechtliche Prüfpunkte; diese Prüfung ist keine rechtliche Freigabe.

Das frühere Portfolio unter `/gis/` bleibt eine unabhängige Website und wird durch diesen Workflow nicht geändert.
