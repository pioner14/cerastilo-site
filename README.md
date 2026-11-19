# Cerastilo — Website

Static landing pages for GitHub Pages.

## Structure

- `index.html` is the Russian page and the source template for `en/index.html`.
- `main.js` contains the RU and EN dictionaries and handles the theme, mobile menu, feature tabs, and footer year.
- `build_en.py` generates the English page using only the Python standard library.
- `tailwind.input.css` and `tailwind.config.js` define styles compiled into `assets/site.css`.
- `fonts/fonts.css` loads local Golos Text and Playfair Display fonts. `screenshots/` serves WebP screenshots.
- Icons use inline SVG from Lucide (ISC).
- `robots.txt` and `sitemap.xml` cover both language versions.

## Build and preview

Edit Russian copy in `index.html` and keep the dictionaries in `main.js` in sync. Keep dictionary values as double-quoted JSON-compatible strings, one entry per line.

Run `python3 check_i18n.py` to check translation keys and `python3 build_en.py` to regenerate only the English page. Run `./build.sh` locally to regenerate the English page and compile CSS with Tailwind 3.4.17. Publish the generated files and local assets in the GitHub Pages branch root.

Preview both pages with `python3 -m http.server 8090 --bind 127.0.0.1`.

## Documentation (/docs/)

After updating the in-app guide, run `./build_docs.sh`. It reads `../NHJS_Q/docs/help` by default. Pass the path as an argument for a different checkout, for example `./build_docs.sh /path/to/docs/help`.

The script regenerates the ignored `docs-src/` directory, builds Russian into `docs/` and English into `docs/en/` with MkDocs Material, and refreshes `sitemap.xml`. Include the generated `docs/` and updated sitemap when publishing the site.

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
- Проверка переводов: `python3 check_i18n.py` (все ключи есть в ru и en).
- Предпросмотр — порт 8090, не 8765 (8765 — порт синхронизации программы).
