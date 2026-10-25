import type { APIRoute } from 'astro';
import { allArticles, LENS_ORDER } from '../lib/site';

export const GET: APIRoute = async ({ site }) => {
  const base = (site?.href ?? 'https://neuropolicycognita.org/').replace(/\/$/, '');
  const articles = await allArticles();
  const pages = [
    { loc: '/', lastmod: articles[0]?.data.date },
    ...LENS_ORDER.map((s) => ({ loc: `/${s}/`, lastmod: undefined as Date | undefined })),
    { loc: '/archive/', lastmod: articles[0]?.data.date },
    { loc: '/about/', lastmod: undefined },
    { loc: '/contact/', lastmod: undefined },
    ...articles.map((a) => ({ loc: `/articles/${a.id}/`, lastmod: a.data.date })),
  ];
  const body =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    pages
      .map((p) => `  <url><loc>${base}${p.loc}</loc>${p.lastmod ? `<lastmod>${p.lastmod.toISOString().slice(0, 10)}</lastmod>` : ''}</url>`)
      .join('\n') +
    '\n</urlset>\n';
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
};
