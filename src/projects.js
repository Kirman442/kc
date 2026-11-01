const catalogue = [
  { id:'energieatlas', title:'EnergieAtlas', category:'Web-GIS', year:'2026', image:'/assets/energieatlas-aerial-coast-v1.png', href:'/projects/energieatlas', description:'Solar- und Windenergie in Deutschland: Anlagenbestand, regionale Vergleiche und modelliertes Dachpotenzial auf unterschiedlichen Maßstabsebenen untersuchen.', tools:'Python / React / TypeScript / MapLibre / ECharts' },
  { id:'mobile', title:'MobileNetwork', category:'Web-GIS', year:'2025 / 2026', image:'/assets/mobile-network.webp', href:'/projects/mobile-network', description:'Über eine Million Tile-Datensätze im Browser. Eine Geschichte über Formate, Verarbeitung und interaktive Karten.', tools:'React / deck.gl / Arrow', featuredHeading:['Große Daten.','Neue Wege zur Karte.'],featuredCaption:'Web-GIS / 42 Länder' },
  { id:'accidents', title:'Unfallkarte Deutschland', category:'Web-GIS', year:'2025', image:'/assets/accidents.webp', href:'/projects/accidents', description:'Verkehrsunfälle sichtbar machen und räumliche Muster erkunden.', tools:'React / Supabase / deck.gl' },
  { id:'unfallatlas', title:'Unfallatlas Deutschland', category:'Web-GIS', year:'2026', image:'/assets/hero-real-world-to-data-v1.webp', href:'/projects/unfallatlas', description:'Von der Unfallkarte zum Analysewerkzeug: Regionen, Zeiträume, Bedingungen und Beteiligte vergleichen.', tools:'React / deck.gl / MapLibre / Arrow', imageStyle:'polaroid',imagePosition:'68% center' },
  { id:'charging', title:'Ladeinfrastruktur', category:'Web-GIS', year:'2026', image:'/assets/ladeinfrastruktur-hero.webp', href:'/projects/ladeinfrastruktur', description:'Ladepunkte, Fahrzeugbestand und Straßen zusammenbringen: Versorgung vergleichen und Erreichbarkeit untersuchen.', tools:'React / deck.gl / MapLibre / Parquet / Python' },
  { id:'bayern', title:'Bayern auf einen Blick', category:'Web-GIS', year:'2025', image:'/assets/bayern.webp', href:'/projects/bayern', description:'Städte und Regionen in einer interaktiven Karte zusammenbringen.', tools:'React / deck.gl' },
  { id:'art', title:'Städte als Kunstkarten', category:'Kartografie', year:'2024', image:'/assets/art-maps.webp', href:'/projects/kunstkarten', description:'Den grafischen Charakter einer Stadt aus offenen Geodaten entdecken.', tools:'Python / OpenStreetMap' },
  { id:'rivers', title:'Die Wege des Wassers', category:'Kartografie', year:'2024', image:'/assets/rivers.webp', href:'/projects/flusssystem', description:'Flusssysteme filtern, visualisieren und ihren Verlauf nachvollziehen.', tools:'Python / Geodaten' },
  { id:'metro', title:'Berliner U-Bahn', category:'Web-GIS', year:'2023', image:'/assets/metro.webp', href:'/projects/ubahn', description:'Die Geschichte eines Verkehrsnetzes auf der Karte erzählen.', tools:'Kartografie / Webentwicklung' },
  { id:'mining', title:'Risikomanagement im Bergbau', category:'3D & Geodaten', year:'2022', image:'/assets/mining.webp', href:'/projects/bergbau', description:'Einen GIS-Workflow für unterirdische 3D-Strukturen umsetzen.', tools:'GIS / 3D-Modellierung' },
  { id:'clusters', title:'Clustering', category:'Web-GIS', year:'2024', image:'/assets/clusters.webp', href:'/projects/clustering', description:'Große Punktmengen bündeln und Karten übersichtlich halten.', tools:'Datenverarbeitung / Web-GIS' },
];

// Publication dates control the homepage chronology; article-navigation order stays explicit.
const presentation={
 energieatlas:{publishedAt:'2026-11-01',polaroidTilt:0,printCaption:'EnergieAtlas',heroLabel:'Energie',heroCaption:'Sonne, Wind und Regionen',imagePosition:'60% top'},
 mobile:{publishedAt:'2025-04-27',polaroidTilt:3,printCaption:'MobileNetwork'},
 accidents:{publishedAt:'2025-03-30',polaroidTilt:-3.5,printCaption:'Unfallkarte'},
 unfallatlas:{publishedAt:'2026-10-19',polaroidTilt:2.5,printCaption:'Unfallatlas',heroLabel:'Analyse'},
 charging:{publishedAt:'2026-10-19',featuredHeading:['Ladeinfrastruktur.','Versorgung im Blick.'],featuredCaption:'Mobilität / Deutschland',polaroidTilt:-2,printCaption:'Ladeinfrastruktur',imagePosition:'68% 65%'},
 bayern:{publishedAt:'2025-02-25',polaroidTilt:2,printCaption:'Bayern'},
 art:{publishedAt:'2024-04-18',polaroidTilt:-4,printCaption:'Kunstkarten',heroCaption:'Dortmund als Kunstkarte',heroLabel:'Stadt',imagePosition:'center 18%'},
 rivers:{publishedAt:'2024-05-25',polaroidTilt:3.5,printCaption:'Flusssysteme',heroCaption:'Wege des Wassers',heroLabel:'Landschaft',imagePosition:'center 35%'},
 metro:{publishedAt:'2023-12-19',polaroidTilt:2.8,printCaption:'Berliner U-Bahn'},
 mining:{publishedAt:'2022-08-25',polaroidTilt:-3,printCaption:'Bergbau'},
 clusters:{publishedAt:'2024-03-25',polaroidTilt:1.8,printCaption:'Clustering'},
};
export const homeFeaturedProjectId='charging';
export const projects=catalogue.map(project=>({...project,...presentation[project.id],featured:project.id===homeFeaturedProjectId}));
export const homeHero={mode:'selected',projectIds:['art','energieatlas','unfallatlas']};
export function chronologicalProjects(items=projects){
 return [...items].sort((a,b)=>{
  const year=a.publishedAt.slice(0,4).localeCompare(b.publishedAt.slice(0,4));
  if(year)return year;
  return a.publishedAt.length===10&&b.publishedAt.length===10?a.publishedAt.localeCompare(b.publishedAt):0;
 });
}
export function heroProjects(config=homeHero){
 const items=config.mode==='latest'?chronologicalProjects(projects.filter(project=>!project.pending)).reverse():[...new Set(config.projectIds)].map(id=>projects.find(project=>project.id===id)).filter(Boolean);
 return items.slice(0,3);
}
export function newestProjects(items=projects){return chronologicalProjects(items).reverse();}
