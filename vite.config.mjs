import {defineConfig} from 'vite';
import {siteConfig} from './site.config.mjs';
export default defineConfig({base:siteConfig.base,esbuild:{jsx:'automatic'},server:{host:'127.0.0.1',port:5183,strictPort:true},build:{outDir:'dist',emptyOutDir:true}});
