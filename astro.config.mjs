// @ts-check
import { defineConfig } from 'astro/config';

// When your domain is live, change `site` to it (e.g. 'https://neuropolicycognita.com').
// Until then GitHub serves the site at https://<username>.github.io/<repo>/,
// so set SITE and BASE accordingly (the deploy workflow does this for you).
export default defineConfig({
  site: process.env.SITE || 'https://neuropolicycognita.com',
  base: process.env.BASE || '/',
  trailingSlash: 'ignore',
});
