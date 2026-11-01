import {legalDraft} from './legal-details.js';
export const siteRoutes=[
  {path:'/projects/energieatlas',kind:'energieatlas',lang:'de',title:'EnergieAtlas - Karten & Code',description:'Sonne, Wind und regionale Unterschiede: von Deutschland bis zum einzelnen Dach.'},
  {path:'/datenschutz',kind:'legal',legalType:'privacy',draft:legalDraft,lang:'de',title:'Datenschutz - Karten & Code',description:'Datenschutzhinweise zu Karten & Code, eingebetteten Anwendungen und Ihren Rechten.'},
  {path:'/impressum',kind:'legal',legalType:'imprint',lang:'de',title:'Impressum - Karten & Code',description:'Anbieterangaben und Kontakt für Karten & Code.'},
  {path:'/',kind:'home',lang:'de',title:'Karten & Code - GIS & Webentwicklung',description:'Interaktive Karten, Geodaten und Projektgeschichten aus Kartografie und Webentwicklung.'},
  {path:'/about',kind:'about',lang:'de',title:'Über mich - Karten & Code',description:'Kirill Lisochenko über Geodaten, Kartografie und interaktive Karten.'},
  {path:'/projects/mobile-network',kind:'mobile',lang:'en',title:'MobileNetwork - Karten & Code',description:'Mobile internet performance across 42 countries: Arrow IPC, Web Workers and interactive maps.'},
  {path:'/projects/accidents',kind:'story',projectId:'accidents',lang:'de',title:'Unfallkarte Deutschland - Karten & Code',description:'Verkehrsunfälle mit React, Supabase und deck.gl visualisieren.'},
  {path:'/projects/unfallatlas',kind:'unfallatlas',lang:'de',title:'Unfallatlas Deutschland - Karten & Code',description:'Regionen, Zeiträume und Beteiligte im Unfallatlas vergleichen.'},
  {path:'/projects/ladeinfrastruktur',kind:'charging',lang:'de',title:'Ladeinfrastruktur - Karten & Code',description:'Versorgung und Erreichbarkeit von Ladepunkten untersuchen.'},
  {path:'/projects/bayern',kind:'story',projectId:'bayern',lang:'de',title:'Bayern auf einen Blick - Karten & Code',description:'Eine interaktive Karte der Städte und Regionen Bayerns.'},
  {path:'/projects/kunstkarten',kind:'story',projectId:'art',lang:'de',title:'Städte als Kunstkarten - Karten & Code',description:'Mit Python und OpenStreetMap den grafischen Charakter einer Stadt entdecken.'},
  {path:'/projects/flusssystem',kind:'story',projectId:'rivers',lang:'de',title:'Die Wege des Wassers - Karten & Code',description:'Flusssysteme mit Python und offenen Geodaten visualisieren.'},
  {path:'/projects/ubahn',kind:'story',projectId:'metro',lang:'de',title:'Berliner U-Bahn - Karten & Code',description:'Die Geschichte des Berliner U-Bahn-Netzes kartografisch erzählen.'},
  {path:'/projects/bergbau',kind:'story',projectId:'mining',lang:'de',title:'Risikomanagement im Bergbau - Karten & Code',description:'Ein GIS-Workflow für unterirdische 3D-Bergbaustrukturen.'},
  {path:'/projects/clustering',kind:'story',projectId:'clusters',lang:'de',title:'Clustering - Karten & Code',description:'Große Punktmengen bündeln und Mobilfunkkarten übersichtlich halten.'},
];
export const legacyRoutes={
  '/home':'/',
  '/portfolio/MobileNetwork':'/projects/mobile-network',
  '/portfolio/Accidents':'/projects/accidents',
  '/portfolio/Bayern':'/projects/bayern',
  '/portfolio/Kunstkarten':'/projects/kunstkarten',
  '/portfolio/Flusssystem':'/projects/flusssystem',
  '/portfolio/Ubahn':'/projects/ubahn',
  '/portfolio/Bergbau':'/projects/bergbau',
  '/portfolio/Clustering':'/projects/clustering',
};
