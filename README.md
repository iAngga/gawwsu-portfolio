# gawwsu-portfolio

My personal site: DevOps and self-hosting write-ups, games, pixel art, 3D and photos.
Static [Astro](https://astro.build) site with a dark retro theme in the [SLSO8](https://lospec.com/palette-list/slso8) palette, deployed to Cloudflare on every push.

**Live:** [gawwsu.my.id](https://gawwsu.my.id)

## Run locally

Needs Node.js 20.3+ (22 recommended).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # output in dist/
npm run preview    # check the production build
```

Entries with `draft: true` show up in `npm run dev` but are left out of the build.

## Structure

```text
src/
├── content/
│   ├── projects/<slug>/index.md   # games, game jams, VR, infra / Linux projects
│   ├── art/<category>/<slug>/index.md
│   └── blog/<slug>/index.md
├── content.config.ts              # frontmatter schema (validated at build time)
├── data/site.ts                   # name, tagline, menu, socials, art categories
├── components/                    # Header, Logo, Tile, Lightbox, FilterBar, ...
├── pages/                         # routes
└── styles/global.css              # palette and main styles
public/
├── favicon.svg
├── og.png                         # preview image when a link is shared
└── speckle.png                    # background texture
```

See [DOCS.md](./DOCS.md) for which file to edit for what.

## Adding content

Every entry is one folder. Images go in the same folder.

### Project

```markdown
---
title: Game Name
date: 2026-10-01
summary: One-line description.
cover: ./cover.png
coverAlt: Image description
gallery:
  - ./shot-1.png
  - ./shot-2.png
tags: [game, gamejam]      # used by the filter on /projects/
role: Programmer, pixel art
tools: [Unity, Aseprite]
links:
  - label: Play on itch.io
    url: https://gyrothirteenlabs.itch.io/game-name
pixelated: true            # true for pixel art (stays sharp)
featured: true             # shown on the home page
---

Write-up in markdown.
```

For infra projects, use tags like `devops`, `docker`, `linux`, and link the repo with a `Source on GitHub` link.

### Art

The first folder under `src/content/art/` is the category, e.g.
`src/content/art/photography/evening-street/index.md`.

A new category (e.g. `music`) is just a new folder. Its title and order are set in `ART_CATEGORIES` in `src/data/site.ts`.

Fields: `title`, `date`, `cover`, `images` (extra images), `tools`, `links`, `pixelated`, `featured`.

### Blog

English by default. For a post in Bahasa Indonesia, add `lang: id`.

```markdown
---
title: Title
date: 2026-10-19
description: Short summary.
lang: id
tags: [linux]
---
```

## Images

- Regular images are resized and converted to WebP at build time.
- Pixel art (`pixelated: true`) keeps its original size as PNG and is scaled up in the browser without blur. Save it at 1x (e.g. 96×96), not pre-upscaled.
- If images get very large or numerous, consider Cloudflare R2 so the repo doesn't bloat, and check Cloudflare's asset limits (file count and size per file).

## Deploy

The site is deployed as a Cloudflare Worker with static assets (see `wrangler.jsonc`), connected to this GitHub repo.

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Import a repository** → pick `gawwsu-portfolio`.
2. Build settings:
   - Build command: `npm run build`
   - Deploy command: `npx wrangler deploy`
3. The Node version comes from `.node-version` (22).
4. Every push to `main` builds and deploys automatically.

### Custom domain

Worker → **Settings** → **Domains & Routes** → add the domain (currently `gawwsu.my.id`). If the domain changes, also update `site` in `astro.config.mjs` and `url` in `src/data/site.ts`.

## Still to do

- Logo (`src/components/Logo.astro`) and `public/og.png`
- Real pixel art and photos (the placeholder pieces are set to `draft: true`)
- A real cover for Atom Shock
- Search the repo for `TODO` for the full list

## Credits

SLSO8 palette by Luis Miguel Maldonado. Fonts: Pixelify Sans, Atkinson Hyperlegible, Instrument Serif, JetBrains Mono (Google Fonts).
