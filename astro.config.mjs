// @ts-check
import { defineConfig } from 'astro/config';

export default defineConfig({
  // Change this if the domain changes. Used for RSS, canonical URLs and OG tags.
  site: 'https://gawwsu.my.id',
  markdown: {
    shikiConfig: {
      theme: 'vitesse-dark',
      wrap: true,
    },
  },
});
