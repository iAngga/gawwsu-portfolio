import { getCollection, type CollectionEntry } from 'astro:content';
import { ART_CATEGORIES } from '../data/site';

type Draftable = { data: { draft?: boolean } };

/** Draft tampil saat `npm run dev`, disembunyikan saat build production. */
const isVisible = ({ data }: Draftable) => !(import.meta.env.PROD && data.draft);

const byDateDesc = (a: { data: { date: Date } }, b: { data: { date: Date } }) =>
  b.data.date.valueOf() - a.data.date.valueOf();

/** "nama/index" -> "nama" (page bundle) */
export const cleanId = (id: string) => id.replace(/(^|\/)index$/, '');

export async function getProjects() {
  return (await getCollection('projects', isVisible)).sort(byDateDesc);
}

export async function getArt() {
  return (await getCollection('art', isVisible)).sort(byDateDesc);
}

export async function getPosts() {
  return (await getCollection('blog', isVisible)).sort(byDateDesc);
}

export const projectUrl = (e: CollectionEntry<'projects'>) => `/projects/${cleanId(e.id)}/`;
export const postUrl = (e: CollectionEntry<'blog'>) => `/blog/${cleanId(e.id)}/`;

export function artParts(e: CollectionEntry<'art'>) {
  const [category, ...rest] = cleanId(e.id).split('/');
  return { category, slug: rest.join('/') || category };
}

export const artUrl = (e: CollectionEntry<'art'>) => {
  const { category, slug } = artParts(e);
  return `/art/${category}/${slug}/`;
};

const titleFromSlug = (slug: string) =>
  slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

export function categoryMeta(slug: string) {
  const meta = ART_CATEGORIES[slug];
  return {
    slug,
    title: meta?.title ?? titleFromSlug(slug),
    description: meta?.description ?? '',
    order: meta?.order ?? 99,
  };
}

/** Kategori yang punya isi, lengkap dengan entri terbarunya. */
export async function getArtCategories() {
  const art = await getArt();
  const groups = new Map<string, CollectionEntry<'art'>[]>();
  for (const entry of art) {
    const { category } = artParts(entry);
    groups.set(category, [...(groups.get(category) ?? []), entry]);
  }
  return [...groups.entries()]
    .map(([slug, entries]) => ({ ...categoryMeta(slug), entries, latest: entries[0] }))
    .sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function formatDate(date: Date, lang: 'en' | 'id' = 'en') {
  return date.toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/** Hitung tag, urut dari yang paling sering dipakai. */
export function countTags(lists: string[][]) {
  const counts = new Map<string, number>();
  for (const tag of lists.flat()) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}
