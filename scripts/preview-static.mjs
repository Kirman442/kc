import http from 'node:http';import fs from 'node:fs';import path from 'node:path';
import {siteConfig} from '../site.config.mjs';
const root=path.resolve(import.meta.dirname,'../dist'),{base}=siteConfig;
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.ico':'image/x-icon','.mp4':'video/mp4','.json':'application/json','.xml':'application/xml','.txt':'text/plain; charset=utf-8','.woff2':'font/woff2'};
http.createServer((request,response)=>{
 try{
  const url=new URL(request.url,'http://localhost');
  if(url.pathname==='/'||url.pathname===base.slice(0,-1)){response.writeHead(302,{Location:base+url.search});response.end();return;}
  let filename=path.resolve(root,decodeURIComponent(url.pathname.slice(base.length)));let status=200;
  if(!url.pathname.startsWith(base)||!filename.startsWith(root+path.sep)&&filename!==root){response.writeHead(404);response.end('Not found');return;}
  if(fs.existsSync(filename)&&fs.statSync(filename).isDirectory()){
   if(!url.pathname.endsWith('/')){response.writeHead(301,{Location:url.pathname+'/'+url.search});response.end();return;}
   filename=path.join(filename,'index.html');
  }
  if(!fs.existsSync(filename)||!fs.statSync(filename).isFile()){filename=path.join(root,'404.html');status=404;}
  response.writeHead(status,{'Content-Type':mime[path.extname(filename)]||'application/octet-stream'});fs.createReadStream(filename).pipe(response);
 }catch{response.writeHead(400);response.end('Bad request');}
}).listen(5183,'127.0.0.1',()=>console.log('Standalone release preview: http://127.0.0.1:5183'+base));
