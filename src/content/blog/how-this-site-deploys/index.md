---
title: How this site builds and deploys
date: 2026-10-18
description: Astro on GitHub, built and deployed by Cloudflare Pages on every push.
tags: [astro, cloudflare, meta]
---

This site is a static [Astro](https://astro.build) project. The repo lives on GitHub and Cloudflare Pages builds it on every push to `main`.

## Build settings

| Setting                | Value           |
| ---------------------- | --------------- |
| Framework preset       | Astro           |
| Build command          | `npm run build` |
| Build output directory | `dist`          |
| Node version           | from `.node-version` (22) |

## Adding content

Every entry is a folder with an `index.md` and its images:

```text
src/content/projects/my-game/
├── index.md
├── cover.png
└── shot-1.png
```

Images are resized and converted to WebP at build time. Pixel art keeps its original size and is scaled up in the browser with `image-rendering: pixelated`.
