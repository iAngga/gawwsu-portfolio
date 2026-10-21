# gawwsu-portfolio docs

A quick guide to which file changes what.

## Workflow

```bash
npm run dev          # open http://localhost:4321, changes show up live
# edit files...
git add .
git commit -m "update about page"
git push             # Cloudflare builds and deploys automatically (~1 minute)
```

If `npm run dev` runs without errors, the Cloudflare build is usually fine too. To be sure, run `npm run build` before pushing.

---

## What to edit for what

| To change | File | Where |
| --- | --- | --- |
| Site name, header tagline, SEO description | `src/data/site.ts` | `SITE` |
| Nav menu (order, labels, colors) | `src/data/site.ts` | `NAV` |
| Social links (footer and About) | `src/data/site.ts` | `SOCIALS` |
| Art category titles, descriptions, order | `src/data/site.ts` | `ART_CATEGORIES` |
| Colors for the whole site | `src/styles/global.css` | `:root` (dark) and `:root[data-theme='light']` (light) |
| Fonts | `src/layouts/BaseLayout.astro` (Google Fonts link) + `src/styles/global.css` (`--font-*`) | |
| Grid columns, gap between tiles | `src/styles/global.css` | `.grid`, `--gap` |
| Tile hover effect, label under images | `src/styles/global.css` | `.tile-*` |
| Page width | `src/styles/global.css` | `--max` |
| Header logo | `src/components/Logo.astro` | |
| Logo size, nav position | `src/components/Header.astro` | `<style>` |
| Footer text | `src/components/Footer.astro` | |
| Home page (grid + "Latest writing") | `src/pages/index.astro` | |
| Title/intro of the Projects, Art, Blog pages | `src/pages/projects/index.astro`, `src/pages/art/index.astro`, `src/pages/blog/index.astro` | `<h1>` and `<p class="lede">` |
| Bio, "What I do", "Work" | `src/pages/about.astro` | `doing` and `work` arrays + the text in the HTML |
| 404 page | `src/pages/404.astro` | |
| Link preview image | `public/og.png` | 1200×630 |
| Favicon | `public/favicon.svg` | |
| Background speckle texture | `public/speckle.png` | strength: `--speckle-opacity` in CSS |
| Domain | `astro.config.mjs` (`site`) + `src/data/site.ts` (`url`) | |

---

## Folder structure

```text
gawwsu-portfolio/
├── astro.config.mjs        # Astro config: domain (site), code block theme
├── wrangler.jsonc          # Cloudflare Worker config: dist folder, 404 page
├── package.json            # dependencies + npm scripts (dev, build, preview)
├── tsconfig.json           # TypeScript settings (rarely needs changes)
├── .node-version           # Node version for the Cloudflare build (22)
├── README.md               # install and deploy
├── DOCS.md                 # this file
│
├── public/                 # static files, copied as-is into the build
│   ├── favicon.svg
│   ├── og.png
│   └── speckle.png
│
└── src/
    ├── content.config.ts   # the "schema": which frontmatter fields are allowed or required
    │
    ├── content/            # ALL SITE CONTENT LIVES HERE
    │   ├── projects/<name>/index.md + images
    │   ├── art/<category>/<name>/index.md + images
    │   └── blog/<name>/index.md
    │
    ├── data/
    │   └── site.ts         # global text: name, tagline, menu, socials, art categories
    │
    ├── lib/
    │   └── content.ts      # helpers: load and sort content, build URLs, format dates
    │
    ├── styles/
    │   └── global.css      # all global styles: palette, fonts, grid, tiles, buttons, prose
    │
    ├── layouts/
    │   └── BaseLayout.astro  # page skeleton: <head>, fonts, Header, Footer
    │
    ├── components/         # reusable UI pieces
    │   ├── Header.astro      # logo + menu + theme button
    │   ├── Logo.astro        # pixel "gawwsu" logo (SVG)
    │   ├── ThemeToggle.astro # dark/light button (saved in the browser)
    │   ├── Footer.astro      # copyright + social links
    │   ├── Tile.astro        # one image tile + label in the grid
    │   ├── FilterBar.astro   # tag filter buttons (Projects, Blog)
    │   ├── PostList.astro    # list of blog posts
    │   ├── ZoomImage.astro   # image that can be clicked to enlarge
    │   └── Lightbox.astro    # large image overlay (left/right arrows, Esc)
    │
    └── pages/              # each file = one URL
        ├── index.astro               # /
        ├── about.astro               # /about/
        ├── 404.astro                 # not found page
        ├── rss.xml.ts                # /rss.xml (blog feed)
        ├── projects/
        │   ├── index.astro           # /projects/          (grid + filter)
        │   └── [slug].astro          # /projects/name/     (project detail)
        ├── art/
        │   ├── index.astro           # /art/               (category grid)
        │   └── [category]/
        │       ├── index.astro       # /art/pixel-art/     (category contents)
        │       └── [slug].astro      # /art/pixel-art/name/ (piece detail)
        └── blog/
            ├── index.astro           # /blog/              (list + language filter)
            └── [slug].astro          # /blog/name/         (post)
```

Files named `[slug]` or `[category]` are templates: one file renders every entry in the matching `content/` folder.

---

## Common edits

### Change the tagline and name in the header

`src/data/site.ts`:

```ts
export const SITE = {
  name: 'gawwsu',
  tagline: 'linux tinkerer, devops in training, game dev, pixel pusher.',   // ← italic text under the logo
  description: '...',                                                         // ← description for search engines and link previews
  ...
};
```

### Add or change a menu item

`src/data/site.ts`:

```ts
export const NAV = [
  { href: '/projects/', label: 'Projects', tone: 'orange' },
  { href: '/art/', label: 'Art', tone: 'terra' },
  { href: '/blog/', label: 'Blog', tone: 'peach' },
  { href: '/about/', label: 'About', tone: 'cream' },
];
```

`tone` options: `orange`, `terra`, `peach`, `cream`. When adding a new page, also create its file in `src/pages/`, e.g. `src/pages/uses.astro` → `/uses/`.

### Change colors

All colors come from the 8 SLSO8 colors at the top of `src/styles/global.css`. The ones you usually change:

```css
:root {
  --bg: var(--slso-1);        /* background */
  --surface: var(--slso-2);   /* box behind images */
  --text: var(--slso-8);      /* main text */
  --text-dim: var(--slso-7);  /* small text / descriptions */
  --accent: var(--slso-6);    /* links */
  --shadow: var(--slso-5);    /* shadow on tile hover */
  --tagline: var(--slso-6);   /* tagline color */
}
```

Want a whole new palette? Just change `--slso-1` to `--slso-8`.

### Change the number of grid columns

`src/styles/global.css`:

```css
.grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));   /* desktop: 3 columns */
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* phone: 2 columns */
  }
}
```

Grid images are always square. Change `aspect-ratio: 1 / 1` in `.tile-media` (e.g. to `4 / 3`) for rectangles.

### Replace the logo

The easiest way:

1. Export your pixel art logo from Aseprite as a PNG at its original size (1x), save it as `public/logo.png`.
2. Replace the contents of `src/components/Logo.astro` with:

   ```astro
   <img src="/logo.png" alt="gawwsu" class="pixelated" />
   ```
3. Set its width in `src/components/Header.astro` (`.logo { width: ... }`). Use a multiple of the image's real width so the pixels stay even.

### Change fonts

1. Pick fonts on [Google Fonts](https://fonts.google.com) and copy the `<link>` URL.
2. Replace the font link `href` in `src/layouts/BaseLayout.astro`.
3. Update the font names in `src/styles/global.css`:

   ```css
   --font-pixel: 'Pixelify Sans', monospace;          /* headings, menu */
   --font-body: 'Atkinson Hyperlegible', sans-serif;  /* body text */
   --font-serif: 'Instrument Serif', serif;           /* tagline */
   --font-mono: 'JetBrains Mono', monospace;          /* code, dates */
   ```

### Change the home page

`src/pages/index.astro`. The home grid automatically shows projects and art with `featured: true`, newest first, up to 9. Change the number in `.slice(0, 9)` to show more or fewer, and `.slice(0, 3)` for the number of posts under "Latest writing".

---

## Adding content

Just create a new folder, no code changes needed.

| To add | Create folder | Required frontmatter |
| --- | --- | --- |
| Project / game | `src/content/projects/project-name/` | `title`, `date`, `summary`, `cover` |
| Art piece | `src/content/art/<category>/piece-name/` | `title`, `date`, `cover` |
| New art category | `src/content/art/music/` (new folder) | then register its title in `ART_CATEGORIES` (optional) |
| Blog post | `src/content/blog/post-title/` | `title`, `date`, `description` |

The folder name becomes the URL, so use lowercase and `-`. Full frontmatter examples are in `README.md`, or copy an existing entry.

Useful optional fields:

- `featured: true` → shown on the home page
- `pixelated: true` → pixel art stays sharp (save images at 1x)
- `draft: true` → only shown in `npm run dev`, not deployed
- `lang: id` (blog) → ID badge + Indonesian date format

If a field is wrong or missing, `npm run dev` / `npm run build` shows an error that names the file and the field.

---

## Troubleshooting

| Symptom | Likely cause |
| --- | --- |
| Build error `... does not match schema` | Typo in the frontmatter or a required field is empty. Check the file named in the error. |
| Image doesn't show | Wrong path in the frontmatter. It must be relative to `index.md`, e.g. `./cover.png`. |
| Pixel art looks blurry | Missing `pixelated: true`, or the image was upscaled before saving. |
| Changes don't show on the live site | Not pushed yet, or the build failed. Check the **Deployments** tab of the Worker in Cloudflare. |
| New page returns 404 | The file doesn't exist in `src/pages/`, or its name doesn't match the menu link. |
