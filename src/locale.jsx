import React, { createContext, useContext } from 'react';
const LocaleContext = createContext('en');
export function LocaleProvider({ locale, children }) {return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;}
export function useLocale() {return useContext(LocaleContext);}
export const labels = {
  en: { note: 'Technical note', notes: 'Technical notes', implementation: 'Implementation notes, measurements & code', count: (n) => `${n} technical notes · open individually or together`, openAll: 'Open all notes', closeAll: 'Close all notes', back: '← Back to where you were reading', backStory: '↑ Back to the main story', description: 'A closer look at the implementation and the conditions behind the comparisons. Links in the main story open the corresponding note here.', live: 'Live application', separate: 'Open separately', fullscreen: 'Full-screen', closeFullscreen: 'Close full-screen', explore: 'Explore the data here or open the application separately.', closeCaption: 'Close full-screen to return to the article', map: (t) => `${t} — interactive map`, application: (t) => `${t} interactive application`, copy: 'Copy', copied: 'Copied', copyFallback: 'Select text to copy', code: (l) => `${l} code example` },
  de: { note: 'Technischer Hinweis', notes: 'Technische Hinweise', implementation: 'Implementierung, Messwerte und Code', count: (n) => `${n} technische Hinweise · einzeln oder gemeinsam öffnen`, openAll: 'Alle Hinweise öffnen', closeAll: 'Alle Hinweise schließen', back: '← Zurück zur zuletzt gelesenen Stelle', backStory: '↑ Zurück zur Projektgeschichte', description: 'Details zur Implementierung und zu den Grundlagen der Vergleiche. Die Links in der Projektgeschichte öffnen jeweils den passenden technischen Hinweis.', live: 'Interaktive Anwendung', separate: 'Separat öffnen', fullscreen: 'Vollbild', closeFullscreen: 'Vollbild schließen', explore: 'Daten hier erkunden oder die Anwendung separat öffnen.', closeCaption: 'Vollbild schließen und zur Projektgeschichte zurückkehren.', map: (t) => `Interaktive Karte: ${t}`, application: (t) => `Interaktive Anwendung: ${t}`, copy: 'Kopieren', copied: 'Kopiert', copyFallback: 'Text zum Kopieren markieren', code: (l) => `Codebeispiel in ${l === 'js' || l === 'javascript' ? 'JavaScript' : l === 'python' ? 'Python' : l}` }
};
Object.assign(labels.en, {
  appStartTitle: 'Explore the interactive map', appStartHint: 'Load the map when you are ready to explore the data.', appStart: 'Load map here',
  appDisabled: 'Control page: application disabled', appDisabledHint: 'This copy contains no iframe. The external application is not started.',
  appLoading: 'Loading the application…', appLoadingHint: 'The interactive map is opening here.',
  appSlow: 'The application is taking longer to load.',
  appRetryHint: 'Try reloading it or use Open separately above.', appReload: 'Reload application'
});
Object.assign(labels.de, {
  appStartTitle: 'Die interaktive Karte erkunden', appStartHint: 'Karte laden und die Daten selbst erkunden.', appStart: 'Karte hier laden',
  appDisabled: 'Kontrollseite: Anwendung deaktiviert', appDisabledHint: 'Diese Kopie enthält kein iframe. Die externe Anwendung wird nicht gestartet.',
  appLoading: 'Anwendung wird geladen…', appLoadingHint: 'Die interaktive Karte wird hier geöffnet.',
  appSlow: 'Das Laden der Anwendung dauert länger.',
  appRetryHint: 'Erneut laden oder oben „Separat öffnen“ verwenden.', appReload: 'Anwendung neu laden'
});
