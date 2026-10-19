export const SITE = {
  name: 'gawwsu',
  tagline: 'game dev, pixel pusher, linux tinkerer, etc.',
  description:
    'Portfolio of gawwsu: games, game jams, pixel art, 3D, photography, and notes from tinkering with Linux.',
  url: 'https://gawwsu.my.id',
  author: 'gawwsu',
  ogImage: '/og.png',
};

/** tone = warna teks menu, didefinisikan di src/styles/global.css (.tone-*) */
export const NAV = [
  { href: '/projects/', label: 'Projects', tone: 'orange' },
  { href: '/art/', label: 'Art', tone: 'terra' },
  { href: '/blog/', label: 'Blog', tone: 'peach' },
  { href: '/about/', label: 'About', tone: 'cream' },
] as const;

// TODO: ganti placeholder di bawah dengan link asli
export const SOCIALS = [
  { label: 'itch.io', handle: 'gyrothirteenlabs', url: 'https://gyrothirteenlabs.itch.io' },
  { label: 'GitHub', handle: 'iAngga', url: 'https://github.com/iAngga' },
  { label: 'Email', handle: 'hello@example.com', url: 'mailto:hello@example.com' },
  { label: 'RSS', handle: 'blog feed', url: '/rss.xml' },
];

/**
 * Metadata kategori art. Key = nama folder di src/content/art/.
 * Folder yang tidak terdaftar di sini tetap tampil, judulnya diambil dari nama folder.
 * Kategori tanpa isi tidak ditampilkan.
 */
export const ART_CATEGORIES: Record<string, { title: string; description?: string; order: number }> = {
  'pixel-art': { title: 'Pixel Art', description: 'Small pictures, limited palettes.', order: 1 },
  '3d': { title: '3D', description: 'Low-poly models, props, and scenes.', order: 2 },
  photography: { title: 'Photography', description: 'Things I saw and pointed a camera at.', order: 3 },
  music: { title: 'Music', description: 'Tunes and sound experiments.', order: 4 },
};
