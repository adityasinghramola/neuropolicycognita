import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// The three lenses every piece can be read through.
export const LENSES = ['finance', 'politics', 'marketing', 'thinking'] as const;

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.string().default('NeuroPolicy Cognita'),
    // The section the article lives in.
    section: z.enum(LENSES),
    // Other lenses the article touches. This is what links pieces across sections.
    lenses: z.array(z.enum(LENSES)).default([]),
    // The behavioural idea at the heart of the piece, e.g. "Veblen effect".
    concept: z.string().optional(),
    cover: z.string().optional(),
    coverAlt: z.string().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articles };
