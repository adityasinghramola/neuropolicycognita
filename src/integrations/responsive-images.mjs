// After each build, make smaller WebP copies of every JPEG/PNG in /images
// (photo.jpg -> photo-480.webp, photo-800.webp, photo-1200.webp).
// The <Cover> component points browsers at these, so phones download a small file
// and desktops a sharp one. Covers uploaded through Pages CMS are handled automatically.
import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

export const WIDTHS = [480, 800, 1200];

export default function responsiveImages() {
  return {
    name: 'responsive-images',
    hooks: {
      'astro:build:done': async ({ dir, logger }) => {
        const imagesDir = path.join(fileURLToPath(dir), 'images');
        let files = [];
        try { files = await readdir(imagesDir, { recursive: true }); } catch { return; }
        const sources = files.filter((f) => /\.(jpe?g|png)$/i.test(f));
        await Promise.all(sources.flatMap((file) => {
          const src = path.join(imagesDir, file);
          const base = src.replace(/\.(jpe?g|png)$/i, '');
          return WIDTHS.map((w) =>
            sharp(src).resize({ width: w, withoutEnlargement: true }).webp({ quality: 78 }).toFile(`${base}-${w}.webp`),
          );
        }));
        logger.info(`Made WebP versions of ${sources.length} image(s)`);
      },
    },
  };
}
