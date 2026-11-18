# Cerastilo — Website

This directory contains the **static landing page** for the Cerastilo project.
It serves directly from a static host without a build step or local package
installation. Golos Text loads from Google Fonts; icons are inlined in `main.js` (Lucide shapes, ISC), no icon CDN.

---

## 📂 Directory structure

```
website/
├── index.html          — Main HTML page (bilingual EN/RU)
├── style.css           — All styles (@layer, oklch tokens, dark mode)
├── main.js             — ES module: i18n, theme, slider, and navigation
├── README-site.md      — This file
├── icon.png, icon-256.png, favicon-32.png, icon-small.svg — icon (from repo assets/)
├── og-image.png        — 1200×630 social preview (seal + name)
└── screenshots/        — PNG screenshots copied from docs/help/ru/screenshots/
    ├── raspisanie.png
    ├── mesyac.png
    ├── segodnya.png
    ├── vozveshchateli.png
    ├── istoriya.png
    ├── statistika.png
    ├── tetradi.png
    └── nastroyki.png
```

---

## 🖥 Preview locally

No build step needed. Just serve the directory over HTTP (browsers block some
ES module features on `file://`):

```bash
cd /path/to/NHJS_Q/website
python3 -m http.server 8090 --bind 127.0.0.1
```

Then open **http://127.0.0.1:8090/** in your browser.

Alternatively with Node.js (if installed):

```bash
npx serve .
```

---

## 🚀 Deploy the website

The page keeps `<meta name="robots" content="noindex">` until release; remove it when the
site goes public. `og:url`/canonical use the placeholder `https://cerastilo.com/`.

- **Cloudflare Pages Direct Upload:** upload the static site with `index.html`
  at the root alongside `style.css`, `main.js`, and `screenshots/`.
  See [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).
- **GitHub Pages:** in a repository dedicated to the website, publish the root of
  the site branch. In a repository containing the site under `website/`, use a
  Pages workflow that uploads `website/` as its artifact. Publishing directly
  from a branch supports only the root and `/docs`.
  See [publishing sources](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

After the stable builds are published, add verified download URLs to the install
section and verify the Linux and Android installation paths.

---

## 🔄 Update screenshots

Screenshots are plain PNG files in `website/screenshots/`.
To refresh them from the source docs:

```bash
cp /path/to/NHJS_Q/docs/help/ru/screenshots/*.png \
   /path/to/NHJS_Q/website/screenshots/
```

The 8 expected filenames (must match exactly):

| File                   | Caption (EN)         |
|------------------------|----------------------|
| `raspisanie.png`       | Weekly schedule view |
| `mesyac.png`           | Monthly board        |
| `segodnya.png`         | Today dashboard      |
| `vozveshchateli.png`   | Participants database|
| `istoriya.png`         | Assignment history   |
| `statistika.png`       | Load statistics      |
| `tetradi.png`          | Workbook import      |
| `nastroyki.png`        | Settings             |

---

## 🌐 Add or edit translations

The default Russian content is in `index.html`. Keep it in sync with the
Russian translation in `main.js`. For language switching, look at the top of `main.js` — look for the `const translations` object.
It has two keys: `en` and `ru`.

To edit a Russian string, update it in both files.
To add a new language (e.g. Ukrainian):

1. Add a `uk: { ... }` block mirroring `en`.
2. Update `detectLang()` to return `'uk'` when appropriate.
3. Add a third state to the language toggle button in `initLangToggle()`.

---


## 🎨 Design tokens

All colours are `oklch()` custom properties in `style.css` under
`@layer tokens`. Dark mode is applied automatically via
`prefers-color-scheme` media query or the manual toggle (persisted in
`localStorage` as `cerastilo-theme`).

The palette name is **Violet** with pale lavender surfaces.

---

## ♿ Accessibility

- Skip-to-content link (visible on focus).
- All interactive elements have `aria-label` or `data-i18n-aria` labels.
- Screenshot slider is a `role="region"` carousel with `role="group"` slides
  and a group of buttons with `aria-pressed` indicating the active slide.
- FAQ uses native `<details>`/`<summary>` (keyboard-accessible by default).
- `prefers-reduced-motion` disables all animations.
- `focus-visible` outlines on every interactive element.

---

## 📄 License

Cerastilo is source-available (not open source): official builds are free to use,
modifying, redistributing or selling only with the author's written permission.
See `LICENSE` in the repository. © 2026 pioner14. Unofficial application — not
affiliated with the Watch Tower Bible and Tract Society / JW.org.

---

## 🌐 План публикации (решено 18.11.2026)

- Отдельный **открытый** репозиторий только для сайта, файлы `website/` — в корень,
  GitHub Pages: Settings → Pages → Deploy from a branch → `main` / root.
- `CNAME` с `cerastilo.com` задаёт свой домен (домен ещё уточняется).
  DNS у регистратора: A-записи `185.199.108.153`, `185.199.109.153`,
  `185.199.110.153`, `185.199.111.153`; `www` — CNAME на `pioner14.github.io`.
  После проверки домена — включить «Enforce HTTPS».
- `noindex` в `index.html` убрать только к релизу.
- Проверка переводов: `python3 check_i18n.py` (все ключи есть в ru и en).
- Предпросмотр — порт 8090, не 8765 (8765 — порт синхронизации программы).
