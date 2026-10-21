---
title: How this site builds and deploys
date: 2026-10-18
description: Astro on GitHub, built and deployed by Cloudflare Workers on every push.
tags: [astro, cloudflare, meta]
---

This site is a static [Astro](https://astro.build) project. The repo lives on GitHub, and Cloudflare builds it and serves it as a Worker with static assets on every push to `main`.

## Build settings

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Output directory | `dist` (set in `wrangler.jsonc`) |
| Node version | from `.node-version` (22) |

`wrangler.jsonc` tells Cloudflare to serve the `dist` folder and to use the site's own 404 page for anything that doesn't exist.

## Adding content

Every entry is a folder with an `index.md` and its images:

```text
src/content/projects/my-game/
├── index.md
├── cover.png
└── shot-1.png
```

Images are resized and converted to WebP at build time. Pixel art keeps its original size and is scaled up in the browser with `image-rendering: pixelated`.
