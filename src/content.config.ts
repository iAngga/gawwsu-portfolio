import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Tiap entri = satu folder (page bundle):
 *   src/content/projects/nama-project/index.md
 *   src/content/projects/nama-project/cover.png
 * Path gambar di frontmatter relatif ke index.md, contoh: cover: ./cover.png
 */

const link = z.object({
  label: z.string(),
  url: z.string().url(),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      summary: z.string(),
      cover: image(),
      coverAlt: z.string().default(''),
      gallery: z.array(image()).default([]),
      // contoh: game, gamejam, vr, linux, tool. Dipakai untuk filter di /projects/
      tags: z.array(z.string()).default([]),
      role: z.string().optional(),
      tools: z.array(z.string()).default([]),
      links: z.array(link).default([]),
      // true = gambar ditampilkan tajam (nearest-neighbor), cocok untuk pixel art
      pixelated: z.boolean().default(false),
      // true = muncul di grid halaman depan
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

/**
 * Art dikelompokkan per folder kategori:
 *   src/content/art/pixel-art/judul/index.md
 *   src/content/art/photography/judul/index.md
 * Kategori baru (misal music) cukup bikin folder baru.
 * Judul dan urutan kategori diatur di src/data/site.ts
 */
const art = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/art' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      cover: image(),
      coverAlt: z.string().default(''),
      images: z.array(image()).default([]),
      tools: z.array(z.string()).default([]),
      // untuk musik atau video: link embed / eksternal
      links: z.array(link).default([]),
      pixelated: z.boolean().default(false),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      description: z.string(),
      // en = default, id = post santai Bahasa Indonesia
      lang: z.enum(['en', 'id']).default('en'),
      tags: z.array(z.string()).default([]),
      cover: image().optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects, art, blog };
