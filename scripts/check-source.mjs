import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';
import {projects} from '../src/projects.js';import {siteRoutes} from '../src/routes.js';
const root=path.resolve(import.meta.dirname,'..');
assert.equal(projects.length,10);assert.equal(projects.some(project=>project.id==='dresden'),false);
for(const project of projects){assert.ok(siteRoutes.some(route=>route.path===project.href),'Missing project route '+project.href);assert.ok(fs.existsSync(path.join(root,'public',project.image)));}
for(const name of fs.readdirSync(path.join(root,'src'))){if(!/\.(jsx|js|css)$/.test(name))continue;const text=fs.readFileSync(path.join(root,'src',name),'utf8');assert.ok(!text.includes('../../portfolio/node_modules'),'Old dependency '+name);assert.ok(!/EmbedDiagnostics|DresdenArticle|PendingProject|useEmbedPolicy/.test(text),'Audit-only import '+name);}
console.log('Source check: 10 projects, independent dependencies, no Dresden or diagnostics.');
