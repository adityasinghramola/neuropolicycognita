// @ts-check
import { defineConfig } from 'astro/config';
import responsiveImages from './src/integrations/responsive-images.mjs';

// The deploy workflow sets SITE from public/CNAME, so this fallback only matters for local builds.
export default defineConfig({
  site: process.env.SITE || 'https://neuropolicycognita.org',
  base: process.env.BASE || '/',
  trailingSlash: 'ignore',
  integrations: [responsiveImages()],
});
