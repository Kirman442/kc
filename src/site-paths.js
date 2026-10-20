export const SITE_BASE=import.meta.env.BASE_URL;
export function siteUrl(value){
  if(typeof value!=='string'||!value.startsWith('/')||value.startsWith('//'))return value;
  if(value==='/home'||value.startsWith('/home#')||value.startsWith('/home?'))value='/'+value.slice(5);
  if(value===SITE_BASE.slice(0,-1)||value.startsWith(SITE_BASE))return value;
  return SITE_BASE+value.slice(1);
}
export function currentPath(){
  let path=typeof window==='undefined'?'/':window.location.pathname;
  if(path===SITE_BASE.slice(0,-1))return '/';
  if(path.startsWith(SITE_BASE))path='/'+path.slice(SITE_BASE.length);
  return path.replace(/\/+$/,'')||'/';
}
