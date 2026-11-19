#!/usr/bin/env python3
"""Refresh the documentation URLs in the main site's sitemap."""

import re
from pathlib import Path
from xml.etree import ElementTree

ROOT = Path(__file__).resolve().parent
BASE = "https://cerastilo.com/"
ENTRY = re.compile(r"^  <url>\n.*?^  </url>\n", re.M | re.S)


def main():
    sitemap = ROOT / "sitemap.xml"
    original = sitemap.read_text(encoding="utf-8")
    matches = list(ENTRY.finditer(original))
    existing = [match[0] for match in matches if re.search(
        r"<loc>https://cerastilo\.com/(?:en/)?</loc>", match[0]
    )]
    if len(existing) != 2:
        raise ValueError("Expected two existing landing page entries in sitemap.xml")

    pages = {"ru": set(), "en": set()}
    for index in (ROOT / "docs").rglob("index.html"):
        parts = index.parent.relative_to(ROOT / "docs").parts
        lang = "en" if parts[:1] == ("en",) else "ru"
        slug = parts[1:] if lang == "en" else parts
        if slug[:1] not in {("404",), ("search",)}:
            pages[lang].add(slug)
    if not pages["ru"] or pages["ru"] != pages["en"]:
        raise ValueError("Built Russian and English documentation pages must match")

    entries = []
    for lang in ("ru", "en"):
        for parts in sorted(pages[lang]):
            suffix = "".join(f"{part}/" for part in parts)
            ru = f"{BASE}docs/{suffix}"
            en = f"{BASE}docs/en/{suffix}"
            loc = ru if lang == "ru" else en
            entries.append(
                "  <url>\n"
                f"    <loc>{loc}</loc>\n"
                f'    <xhtml:link rel="alternate" hreflang="ru" href="{ru}" />\n'
                f'    <xhtml:link rel="alternate" hreflang="en" href="{en}" />\n'
                f'    <xhtml:link rel="alternate" hreflang="x-default" href="{ru}" />\n'
                "  </url>\n"
            )

    result = original[:matches[0].start()] + "".join(existing + entries) + "</urlset>\n"
    ElementTree.fromstring(result)
    sitemap.write_text(result, encoding="utf-8")


if __name__ == "__main__":
    main()
