export const SITE = {
  name: 'gawwsu',
  tagline: 'the busiest loser.',
  description:
    'Portfolio of gawwsu (Angga): self-hosting and DevOps write-ups, games, pixel art, 3D, and notes from tinkering with Linux.',
  url: 'https://gawwsu.my.id',
  author: 'gawwsu',
  ogImage: '/og.png',
};

/** tone = menu text color, defined in src/styles/global.css (.tone-*) */
export const NAV = [
  { href: '/projects/', label: 'Projects', tone: 'orange' },
  { href: '/art/', label: 'Art', tone: 'terra' },
  { href: '/blog/', label: 'Blog', tone: 'peach' },
  { href: '/about/', label: 'About', tone: 'cream' },
] as const;

export const SOCIALS = [
  { label: 'GitHub', handle: 'iAngga', url: 'https://github.com/iAngga' },
  { label: 'LinkedIn', handle: 'anggaaditiakurnia', url: 'https://www.linkedin.com/in/anggaaditiakurnia/' },
  { label: 'itch.io', handle: 'gyrothirteenlabs', url: 'https://gyrothirteenlabs.itch.io' },
  { label: 'Mastodon', handle: '@gawwsu@mastodon.social', url: 'https://mastodon.social/@gawwsu' },
  { label: 'RSS', handle: 'blog feed', url: '/rss.xml' },
];

/**
 * Art category metadata. Key = folder name in src/content/art/.
 * Folders not listed here still show up, titled from the folder name.
 * Empty categories are hidden.
 */
export const ART_CATEGORIES: Record<string, { title: string; description?: string; order: number }> = {
  'pixel-art': { title: 'Pixel Art', description: 'Small pictures, limited palettes.', order: 1 },
  '3d': { title: '3D', description: 'Low-poly models, props, and scenes.', order: 2 },
  photography: { title: 'Photography', description: 'Things I saw and pointed a camera at.', order: 3 },
  music: { title: 'Music', description: 'Tunes and sound experiments.', order: 4 },
};
