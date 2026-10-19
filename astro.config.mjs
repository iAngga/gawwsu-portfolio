// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Ganti kalau domainnya beda. Dipakai untuk RSS, canonical URL, dan OG tags.
  site: 'https://gawwsu.my.id',
  markdown: {
    shikiConfig: {
      theme: 'vitesse-dark',
      wrap: true,
    },
  },
});
