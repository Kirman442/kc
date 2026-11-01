import React from 'react';
import {siteUrl} from './site-paths.js';
import {legalDetails} from './legal-details.js';
import './legal.css';

const apps = [
  ['EnergieAtlas','https://kirman442.github.io/energie-atlas/'],
  ['MobileNetwork','https://mobile-network-map.netlify.app/'],
  ['Unfallkarte Deutschland','https://kirman442.github.io/accidents/'],
  ['Unfallatlas Deutschland','https://unfallatlas.netlify.app/accidents/app.html'],
  ['Ladeinfrastruktur','https://kirman442.github.io/charging-points/'],
  ['Bayern','https://kirman442.github.io/bayern/'],
  ['Berliner U-Bahn','https://kirman442.github.io/berlinmetro/'],
  ['Clustering','https://kirman442.github.io/ookla/'],
];
function Contact(){
  return <address className="legal-contact"><strong>{legalDetails.name}</strong>
    {legalDetails.postalAddress.map(line=><span key={line}>{line}</span>)}
    <span>{legalDetails.region}</span><a href={`mailto:${legalDetails.email}`}>{legalDetails.email}</a></address>;
}
function Privacy(){
  return <>
    <section id="verantwortlicher"><h2>1. Verantwortlicher</h2><p>Verantwortlich für dieses Portfolio ist:</p><Contact/></section>
    <section id="portfolio"><h2>2. Portfolio und technische Bereitstellung</h2>
      <p>Dieses persönliche berufliche Portfolio stellt meine Arbeit mit Geodaten und interaktiven Karten vor. Die Texte und Bilder der Projektgeschichten können ohne Registrierung gelesen werden.</p>
      <p>Die Portfolio-Oberfläche enthält keine eigene Besuchsanalyse, keine Werbetracker und kein Kontaktformular. Schriften und Bilder werden mit der Website ausgeliefert. Der Portfolio-Code setzt selbst keine Cookies und speichert keine Besuchereinstellungen im Browser. Für die eingebetteten Anwendungen gilt der gesonderte Abschnitt unten.</p>
      <h3>Hosting mit GitHub Pages</h3>
      <p>Das Portfolio wird auf GitHub Pages bereitgestellt. GitHub nennt als Datenschutzkontakte GitHub, Inc., 88 Colin P. Kelly Jr. St., San Francisco, CA 94107, USA, und GitHub B.V., Prins Bernhardplein 200, 1097 JB Amsterdam, Niederlande. Datenschutzkontakt: <a href="mailto:dpo@github.com">dpo@github.com</a>.</p>
      <p>Bei der Auslieferung erhält GitHub technische Verbindungsdaten. Für Pages bestätigt GitHub ausdrücklich die Protokollierung von IP-Adressen zur Sicherheit, auch ohne Anmeldung.</p>
      <p>Die technische Bereitstellung des Portfolios dient meinem berechtigten Interesse an einer erreichbaren, sicheren Darstellung meiner beruflichen Arbeiten (Art. 6 Abs. 1 Buchst. f DSGVO). Dies ist keine pauschale Rechtsgrundlage für alle Vorgänge innerhalb eingebetteter Anwendungen.</p>
      <p>GitHub beschreibt Verarbeitung auch in den USA und anderen Ländern sowie Standardvertragsklauseln und das EU-U.S. Data Privacy Framework als Transfermechanismen. Die Datenschutzerklärung nennt zweck- und gesetzesabhängige Aufbewahrung, aber keine feste Frist speziell für Pages-IP-Protokolle. Eine bestimmte Anzahl von Tagen wird deshalb hier nicht zugesichert.</p>
      <p><a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection">GitHub Pages: Datenerhebung</a> · <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">Datenschutzerklärung von GitHub</a></p>
    </section>
    <section id="kontakt"><h2>3. Kontakt per E-Mail</h2>
      <p>Ein Klick auf die E-Mail-Adresse öffnet Ihr E-Mail-Programm. Beim Versand verarbeite ich Ihre E-Mail-Adresse, gegebenenfalls Ihren Namen sowie Nachricht und Anhänge zur Beantwortung Ihrer Anfrage. Rechtsgrundlage ist mein berechtigtes Interesse an dieser Kommunikation (Art. 6 Abs. 1 Buchst. f DSGVO); für die Erfüllung gesetzlicher Datenschutzpflichten gilt Art. 6 Abs. 1 Buchst. c DSGVO. Die Kontaktaufnahme ist freiwillig.</p>
      <p>Ich nutze WEB.DE, einen Dienst der 1&amp;1 Mail &amp; Media GmbH, Elgendorfer Str. 57, 56410 Montabaur, mit Zweigniederlassung Karlsruhe, Brauerstr. 48, 76135 Karlsruhe. Eine automatische Weiterleitung an ein anderes Postfach ist nicht eingerichtet. WEB.DE verarbeitet die für Empfang, Speicherung, Versand und Sicherheit erforderlichen Nachrichten- und Verbindungsdaten.</p>
      <p>Ich lösche Korrespondenz, sobald sie für die Bearbeitung und weitere Kommunikation nicht mehr benötigt wird, sofern keine gesetzlichen Aufbewahrungspflichten oder konkreten Rechtsansprüche entgegenstehen. Die von WEB.DE genannte grundsätzliche Löschung von Verkehrsdaten innerhalb von sieben Tagen betrifft technische Übertragungsdaten, nicht den Inhalt meiner E-Mail-Korrespondenz.</p>
      <p>WEB.DE beschreibt mögliche Weitergaben außerhalb des EWR mit Garantien nach Kapitel V DSGVO. Daraus folgt keine Zusicherung, dass jeder einzelne Verarbeitungsschritt ausschließlich in Deutschland erfolgt. Weitere Anbieterangaben: <a href="https://agb-server.web.de/datenschutz/">WEB.DE - Datenschutzhinweise</a>. Eine gewöhnliche E-Mail ist nicht automatisch Ende-zu-Ende-verschlüsselt; bitte senden Sie keine unnötigen sensiblen Daten.</p>
    </section>
    <section id="anwendungen"><h2>4. Eingebettete Karten und Anwendungen</h2>
      <p>Einige Projektseiten zeigen eigenständige Anwendungen in einem eingebetteten Fenster. Diese laden automatisch beim Aufruf der Projektseite. Dabei entstehen Verbindungen zu den jeweiligen Hosting-Diensten; die Anwendung kann weitere Daten- und Kartendienste aufrufen. Die IP-Adresse wird bei diesen Verbindungen an die angesprochenen Dienste übermittelt.</p>
      <p>„Separat öffnen“ öffnet die jeweilige Anwendung als eigene Seite. Dort angebotene Datenschutzhinweise ergänzen die Angaben zur Einbindung in dieses Portfolio.</p>
      <ul className="legal-apps">{apps.map(([name,url])=><li key={url}><a href={url}>{name} ↗</a><span>{new URL(url).hostname}</span></li>)}</ul>
      <p><a href="https://unfallatlas.netlify.app/accidents/app.html?screen=about#about-privacy">Unfallatlas Deutschland - Datenschutzhinweise der Anwendung</a></p>
      <p>Anwendungen auf kirman442.github.io teilen sich mit dem Portfolio denselben Browser-Ursprung. Eine Trennung der URL-Pfade allein trennt deshalb beispielsweise den localStorage nicht.</p>
    </section>
    <section id="rechte"><h2>5. Ihre Rechte</h2>
      <p>Unter den jeweiligen gesetzlichen Voraussetzungen haben Sie Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung und Datenübertragbarkeit. Gegen eine Verarbeitung auf Grundlage berechtigter Interessen können Sie aus Gründen Ihrer besonderen Situation Widerspruch einlegen. Eine erteilte Einwilligung können Sie für die Zukunft widerrufen; die bis dahin erfolgte Verarbeitung bleibt davon unberührt.</p>
      <p>Für Anliegen zu diesem Portfolio können Sie mich unter <a href={`mailto:${legalDetails.email}`}>{legalDetails.email}</a> erreichen.</p>
    </section>
    <section id="aufsicht"><h2>6. Beschwerde und Datenschutzaufsicht</h2>
      <p>Wenn Sie eine Verletzung Ihrer Datenschutzrechte vermuten, können Sie sich an eine Datenschutzaufsichtsbehörde wenden, insbesondere an Ihrem gewöhnlichen Aufenthaltsort, Arbeitsplatz oder am Ort des vermuteten Verstoßes.</p>
      <p>Für nichtöffentliche Stellen in Bayern ist das Bayerische Landesamt für Datenschutzaufsicht (BayLDA) zuständig.</p>
      <ul><li><a href="https://www.lda.bayern.de/de/beschwerde.html">BayLDA - Beschwerde einreichen</a></li><li><a href="https://www.lda.bayern.de/de/kontakt.html">BayLDA - Kontakt</a></li><li><a href="https://www.edpb.europa.eu/about-edpb/our-members_en">Europäischer Datenschutzausschuss - Verzeichnis der europäischen Aufsichtsbehörden</a></li></ul>
      <p>Das Verzeichnis hilft bei der Suche nach einer zuständigen Behörde; es ist kein Beschwerdeformular des Europäischen Datenschutzausschusses.</p>
    </section>
  </>;
}
function Imprint(){
  return <><section><h2>Anbieter und Kontakt</h2><Contact/><p>Karten &amp; Code ist das persönliche berufliche Portfolio von Kirill Lisochenko zu Geodaten, Kartografie und Webentwicklung.</p></section>
    <section><h2>Informationspflichten</h2><p>Anbieterangaben gemäß <a href="https://www.gesetze-bayern.de/Content/Document/MStV-18">§ 18 Abs. 1 Medienstaatsvertrag</a>.</p></section>
    <section><h2>Datenschutz</h2><p>Informationen zur technischen Bereitstellung, eingebetteten Anwendungen und Ihren Rechten finden Sie unter <a href={siteUrl('/datenschutz/')}>Datenschutz</a>.</p></section></>;
}
export default function LegalPage({type}){
  const privacy=type==='privacy';
  return <article className="container legal-page" lang="de"><header><p className="eyebrow">Karten &amp; Code / Rechtliche Hinweise</p><h1>{privacy?'Datenschutzerklärung':'Impressum'}</h1><p className="legal-date mono">Stand: {privacy?'1. November 2026':'20. Oktober 2026'}</p></header>
    <div className="legal-copy">{privacy?<Privacy/>:<Imprint/>}</div><nav className="legal-related" aria-label="Weitere rechtliche Hinweise"><a href={siteUrl('/')}>← Zur Projektübersicht</a><a href={siteUrl(privacy?'/impressum/':'/datenschutz/')}>{privacy?'Impressum':'Datenschutz'} ↗</a></nav></article>;
}
