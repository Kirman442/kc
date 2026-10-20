import React from 'react';
import {SiteHeader,Footer} from './components.jsx';
import HomePage from './HomePage.jsx';
import AboutPage from './AboutPage.jsx';
import FullProject from './FullProject.jsx';
import ProjectPage from './ProjectPage.jsx';
import LadeinfrastrukturPage from './LadeinfrastrukturPage.jsx';
import UnfallatlasTrial from './UnfallatlasTrial.jsx';
import LegalPage from './LegalPage.jsx';
import {LocaleProvider} from './locale.jsx';
import {currentPath,siteUrl} from './site-paths.js';
import {siteRoutes,legacyRoutes} from './routes.js';
import './theme.css';
import './identity.css';
export function App({pathname=currentPath()}){
  const path=legacyRoutes[pathname]||pathname;
  const route=siteRoutes.find(item=>item.path===path);
  let page;
  if(!route)page=<section className="container pending-project"><p className="eyebrow">404</p><h1>Diese Seite wurde nicht gefunden.</h1><a className="button" href={siteUrl('/')}>Zur Projektübersicht ↗</a></section>;
  else if(route.kind==='home')page=<HomePage/>;
  else if(route.kind==='about')page=<AboutPage/>;
  else if(route.kind==='mobile')page=<FullProject/>;
  else if(route.kind==='charging')page=<LadeinfrastrukturPage/>;
  else if(route.kind==='unfallatlas')page=<UnfallatlasTrial/>;
  else if(route.kind==='legal')page=<LegalPage type={route.legalType}/>;
  else page=<ProjectPage projectId={route.projectId}/>;
  return <LocaleProvider locale={route?.lang||'de'}><a className="skip-link" href="#main">Zum Inhalt</a><SiteHeader path={path}/><main id="main">{page}</main><Footer/></LocaleProvider>;
}
