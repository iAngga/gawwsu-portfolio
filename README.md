# gawwsu-portfolio

Portfolio statis pakai [Astro](https://astro.build). Tema gelap retro, palette [SLSO8](https://lospec.com/palette-list/slso8).
Deploy otomatis ke Cloudflare Pages tiap `git push`.

## Jalankan lokal

Butuh Node.js 20.3+ (disarankan 22).

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # hasil di dist/
npm run preview    # cek hasil build
```

Entri dengan `draft: true` tetap tampil saat `npm run dev`, tapi tidak ikut saat build.

## Struktur

```text
src/
├── content/
│   ├── projects/<slug>/index.md   # game, gamejam, VR, Linux, dll.
│   ├── art/<kategori>/<slug>/index.md
│   └── blog/<slug>/index.md
├── content.config.ts              # schema frontmatter (divalidasi saat build)
├── data/site.ts                   # nama, tagline, menu, sosial, kategori art
├── components/                    # Header, Logo, Tile, Lightbox, FilterBar, dll.
├── pages/                         # routing
└── styles/global.css              # palette dan style utama
public/
├── favicon.svg
├── og.png                         # gambar preview saat link dibagikan
└── speckle.png                    # tekstur background
```

## Menambah konten

Tiap entri = satu folder. Gambar ditaruh di folder yang sama.

### Project

```markdown
---
title: Nama Game
date: 2026-10-01
summary: Satu kalimat deskripsi.
cover: ./cover.png
coverAlt: Deskripsi gambar
gallery:
  - ./shot-1.png
  - ./shot-2.png
tags: [game, gamejam]      # dipakai untuk filter di /projects/
role: Programmer, pixel art
tools: [Unity, Aseprite]
links:
  - label: Play on itch.io
    url: https://gyrothirteenlabs.itch.io/nama-game
pixelated: true            # true untuk pixel art (tetap tajam)
featured: true             # tampil di halaman depan
---

Isi tulisan (markdown).
```

### Art

Folder pertama di bawah `src/content/art/` = kategori. Contoh:
`src/content/art/photography/jalan-sore/index.md`.

Kategori baru (misal `music`) cukup bikin folder baru. Judul dan urutannya diatur di `ART_CATEGORIES` dalam `src/data/site.ts`.

Field: `title`, `date`, `cover`, `images` (gambar tambahan), `tools`, `links`, `pixelated`, `featured`.

### Blog

Default English. Untuk post Bahasa Indonesia tambahkan `lang: id`.

```markdown
---
title: Judul
date: 2026-10-19
description: Ringkasan singkat.
lang: id
tags: [linux]
---
```

## Gambar

- Gambar biasa: otomatis di-resize dan dikonversi ke WebP saat build.
- Pixel art (`pixelated: true`): ukuran asli dipertahankan sebagai PNG, lalu diperbesar di browser tanpa blur. Simpan di ukuran 1x (misal 96×96), jangan yang sudah di-upscale.
- Kalau nanti gambarnya sangat banyak atau besar, pertimbangkan simpan di Cloudflare R2 supaya repo tidak bengkak. Cek juga limit Cloudflare Pages (jumlah file dan ukuran per file) di dokumentasinya.

## Deploy ke Cloudflare Pages

1. Push repo ini ke GitHub:
   ```bash
   git init
   git add .
   git commit -m "init portfolio"
   git branch -M main
   git remote add origin https://github.com/iAngga/gawwsu-portfolio.git
   git push -u origin main
   ```
2. Buka Cloudflare dashboard → **Workers & Pages** → **Create** → tab **Pages** → **Connect to Git** → pilih repo `gawwsu-portfolio`.
3. Build settings:
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
4. Versi Node dibaca dari file `.node-version` (22). Kalau perlu, bisa juga set environment variable `NODE_VERSION=22`.
5. **Save and Deploy**. Setelah itu tiap push ke `main` otomatis build dan deploy. Branch lain dapat preview URL sendiri.

### Custom domain

Di project Pages → **Custom domains** → tambahkan `gawwsu.my.id`. Kalau DNS domainnya sudah di Cloudflare, record-nya dibuat otomatis. Kalau domain dipindah atau URL-nya beda, ubah juga `site` di `astro.config.mjs` dan `url` di `src/data/site.ts`.

## Yang masih placeholder

- Logo (`src/components/Logo.astro`) dan `public/og.png`
- Teks About, email, dan tanggal/role di tiap project
- Cover Atom Shock dan Homelab Notes, semua gambar di `art/pixel-art` dan `art/photography`
- Cari `TODO` di repo untuk daftar lengkapnya

## Credit

Palette SLSO8 oleh Luis Miguel Maldonado. Font: Pixelify Sans, Atkinson Hyperlegible, Instrument Serif, JetBrains Mono (Google Fonts).
