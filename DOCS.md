# Dokumentasi gawwsu-portfolio

Panduan singkat: file mana untuk mengubah apa.

## Alur kerja

```bash
npm run dev          # buka http://localhost:4321, perubahan langsung kelihatan
# edit file...
git add .
git commit -m "update about page"
git push             # Cloudflare otomatis build + deploy (±1 menit)
```

Kalau `npm run dev` jalan tanpa error, biasanya build di Cloudflare juga aman. Untuk lebih yakin, jalankan `npm run build` sebelum push.

---

## Mau ubah apa? Edit di sini

| Mau ubah | File | Bagian |
| --- | --- | --- |
| Nama situs, tagline header, deskripsi SEO | `src/data/site.ts` | `SITE` |
| Menu nav (urutan, label, warna) | `src/data/site.ts` | `NAV` |
| Link sosial (footer & About) | `src/data/site.ts` | `SOCIALS` |
| Judul/deskripsi/urutan kategori art | `src/data/site.ts` | `ART_CATEGORIES` |
| Warna seluruh situs | `src/styles/global.css` | `:root` (gelap) dan `:root[data-theme='light']` (terang) |
| Font | `src/layouts/BaseLayout.astro` (link Google Fonts) + `src/styles/global.css` (`--font-*`) | |
| Jumlah kolom grid, jarak antar tile | `src/styles/global.css` | `.grid`, `--gap` |
| Efek hover tile, label di bawah gambar | `src/styles/global.css` | `.tile-*` |
| Lebar halaman | `src/styles/global.css` | `--max` |
| Logo header | `src/components/Logo.astro` | |
| Ukuran logo, posisi nav | `src/components/Header.astro` | `<style>` |
| Teks footer | `src/components/Footer.astro` | |
| Isi halaman depan (grid + "Latest writing") | `src/pages/index.astro` | |
| Teks judul/deskripsi halaman Projects, Art, Blog | `src/pages/projects/index.astro`, `src/pages/art/index.astro`, `src/pages/blog/index.astro` | `<h1>` dan `<p class="lede">` |
| Bio dan "What I do" | `src/pages/about.astro` | array `doing` + teks di HTML |
| Halaman 404 | `src/pages/404.astro` | |
| Gambar preview saat link dibagikan | `public/og.png` | ukuran 1200×630 |
| Favicon | `public/favicon.svg` | |
| Tekstur bintik di background | `public/speckle.png` | kekuatannya: `--speckle-opacity` di CSS |
| Domain | `astro.config.mjs` (`site`) + `src/data/site.ts` (`url`) | |

---

## Struktur folder

```text
gawwsu-portfolio/
├── astro.config.mjs        # config Astro: domain (site), tema warna code block
├── wrangler.jsonc          # config Cloudflare Worker: folder dist, halaman 404
├── package.json            # daftar dependency + perintah npm (dev, build, preview)
├── tsconfig.json           # setting TypeScript (jarang perlu diubah)
├── .node-version           # versi Node untuk build di Cloudflare (22)
├── README.md               # cara install dan deploy
├── DOCS.md                 # file ini
│
├── public/                 # file statis, disalin apa adanya ke hasil build
│   ├── favicon.svg
│   ├── og.png
│   └── speckle.png
│
└── src/
    ├── content.config.ts   # "schema": field apa saja yang boleh/wajib di frontmatter
    │
    ├── content/            # SEMUA ISI WEBSITE ADA DI SINI
    │   ├── projects/<nama>/index.md + gambar
    │   ├── art/<kategori>/<nama>/index.md + gambar
    │   └── blog/<nama>/index.md
    │
    ├── data/
    │   └── site.ts         # teks global: nama, tagline, menu, sosial, kategori art
    │
    ├── lib/
    │   └── content.ts      # fungsi bantu: ambil & urutkan konten, bikin URL, format tanggal
    │
    ├── styles/
    │   └── global.css      # semua style global: palette, font, grid, tile, tombol, prose
    │
    ├── layouts/
    │   └── BaseLayout.astro  # kerangka tiap halaman: <head>, font, Header, Footer
    │
    ├── components/         # potongan UI yang dipakai ulang
    │   ├── Header.astro      # logo + menu + tombol tema
    │   ├── Logo.astro        # logo pixel "gawwsu" (SVG)
    │   ├── ThemeToggle.astro # tombol gelap/terang (disimpan di browser)
    │   ├── Footer.astro      # copyright + link sosial
    │   ├── Tile.astro        # 1 kotak gambar + label di grid
    │   ├── FilterBar.astro   # tombol filter tag (Projects, Blog)
    │   ├── PostList.astro    # daftar tulisan blog
    │   ├── ZoomImage.astro   # gambar yang bisa diklik untuk diperbesar
    │   └── Lightbox.astro    # overlay gambar besar (panah kiri/kanan, Esc)
    │
    └── pages/              # tiap file = 1 URL
        ├── index.astro               # /
        ├── about.astro               # /about/
        ├── 404.astro                 # halaman tidak ditemukan
        ├── rss.xml.ts                # /rss.xml (feed blog)
        ├── projects/
        │   ├── index.astro           # /projects/          (grid + filter)
        │   └── [slug].astro          # /projects/nama/     (detail project)
        ├── art/
        │   ├── index.astro           # /art/               (grid kategori)
        │   └── [category]/
        │       ├── index.astro       # /art/pixel-art/     (grid isi kategori)
        │       └── [slug].astro      # /art/pixel-art/nama/ (detail karya)
        └── blog/
            ├── index.astro           # /blog/              (daftar + filter bahasa)
            └── [slug].astro          # /blog/nama/         (isi tulisan)
```

File dengan nama `[slug]` atau `[category]` adalah template: satu file dipakai untuk semua entri di folder `content/` yang sesuai.

---

## Contoh edit yang sering

### Ganti tagline dan nama di header

`src/data/site.ts`:

```ts
export const SITE = {
  name: 'gawwsu',
  tagline: 'game dev, pixel pusher, linux tinkerer, etc.',   // ← teks miring di bawah logo
  description: '...',                                        // ← deskripsi untuk Google & share link
  ...
};
```

### Tambah atau ubah menu

`src/data/site.ts`:

```ts
export const NAV = [
  { href: '/projects/', label: 'Projects', tone: 'orange' },
  { href: '/art/', label: 'Art', tone: 'terra' },
  { href: '/blog/', label: 'Blog', tone: 'peach' },
  { href: '/about/', label: 'About', tone: 'cream' },
];
```

`tone` pilihan: `orange`, `terra`, `peach`, `cream`. Kalau menambah halaman baru, buat juga file-nya di `src/pages/`, misal `src/pages/uses.astro` → `/uses/`.

### Ganti warna

Semua warna diambil dari 8 warna SLSO8 di atas `src/styles/global.css`. Yang biasanya diubah:

```css
:root {
  --bg: var(--slso-1);        /* background */
  --surface: var(--slso-2);   /* kotak di belakang gambar */
  --text: var(--slso-8);      /* teks utama */
  --text-dim: var(--slso-7);  /* teks kecil / deskripsi */
  --accent: var(--slso-6);    /* link */
  --shadow: var(--slso-5);    /* bayangan saat hover tile */
  --tagline: var(--slso-6);   /* warna tagline */
}
```

Mau ganti palette total? Cukup ubah `--slso-1` sampai `--slso-8`.

### Ubah jumlah kolom grid

`src/styles/global.css`:

```css
.grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));   /* desktop: 3 kolom */
}

@media (max-width: 720px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr)); /* HP: 2 kolom */
  }
}
```

Gambar di grid selalu kotak. Ubah `aspect-ratio: 1 / 1` di `.tile-media` (misal jadi `4 / 3`) kalau mau persegi panjang.

### Ganti logo

Opsi paling gampang:

1. Export logo pixel art dari Aseprite sebagai PNG ukuran asli (1x), simpan di `public/logo.png`.
2. Ganti isi `src/components/Logo.astro` jadi:

   ```astro
   <img src="/logo.png" alt="gawwsu" class="pixelated" />
   ```
3. Atur lebarnya di `src/components/Header.astro` (`.logo { width: ... }`). Pakai kelipatan lebar asli gambar supaya pixel-nya rata.

### Ganti font

1. Pilih font di [Google Fonts](https://fonts.google.com), salin URL `<link>`-nya.
2. Ganti `href` link font di `src/layouts/BaseLayout.astro`.
3. Ubah nama font di `src/styles/global.css`:

   ```css
   --font-pixel: 'Pixelify Sans', monospace;   /* judul, menu */
   --font-body: 'Atkinson Hyperlegible', sans-serif;  /* teks biasa */
   --font-serif: 'Instrument Serif', serif;    /* tagline */
   --font-mono: 'JetBrains Mono', monospace;   /* kode, tanggal */
   ```

### Ubah halaman depan

`src/pages/index.astro`. Grid depan otomatis berisi project + art yang punya `featured: true`, urut terbaru, maksimal 9. Ganti angka di `.slice(0, 9)` untuk mengubah jumlahnya, dan `.slice(0, 3)` untuk jumlah tulisan di "Latest writing".

---

## Menambah konten

Cukup bikin folder baru, tanpa menyentuh kode.

| Mau tambah | Buat folder | Wajib di frontmatter |
| --- | --- | --- |
| Project / game | `src/content/projects/nama-project/` | `title`, `date`, `summary`, `cover` |
| Karya art | `src/content/art/<kategori>/nama-karya/` | `title`, `date`, `cover` |
| Kategori art baru | `src/content/art/music/` (folder baru) | lalu daftarkan judulnya di `ART_CATEGORIES` (opsional) |
| Tulisan blog | `src/content/blog/judul-tulisan/` | `title`, `date`, `description` |

Nama folder jadi URL, jadi pakai huruf kecil dan tanda `-`. Contoh lengkap frontmatter ada di `README.md`, atau salin dari entri yang sudah ada.

Field opsional yang berguna:

- `featured: true` → tampil di halaman depan
- `pixelated: true` → pixel art tetap tajam (simpan gambar di ukuran 1x)
- `draft: true` → hanya tampil di `npm run dev`, tidak ikut ter-deploy
- `lang: id` (blog) → badge ID + tanggal format Indonesia

Kalau ada field yang salah atau kurang, `npm run dev` / `npm run build` akan menampilkan error yang menyebut file dan field-nya.

---

## Kalau ada masalah

| Gejala | Kemungkinan penyebab |
| --- | --- |
| Build error `... does not match schema` | Frontmatter salah ketik / field wajib kosong. Cek file yang disebut di error. |
| Gambar tidak muncul | Path di frontmatter salah. Harus relatif ke `index.md`, misal `./cover.png`. |
| Pixel art blur | Lupa `pixelated: true`, atau gambar sudah di-upscale sebelum disimpan. |
| Perubahan tidak muncul di situs | Belum `git push`, atau build gagal. Cek tab **Deployments** di Cloudflare. |
| Halaman baru 404 | File belum ada di `src/pages/`, atau nama file beda dengan link di menu. |
