#!/usr/bin/env python3
"""Проверка: каждый ключ data-i18n / -aria / -alt / -title из index.html
есть в словарях ru и en в main.js. Запуск: python3 check_i18n.py"""
import re
import sys

from build_en import read_translations
from pathlib import Path

root = Path(__file__).resolve().parent
html = (root / "index.html").read_text(encoding="utf-8")
js = (root / "main.js").read_text(encoding="utf-8")

keys = set(re.findall(r'data-i18n(?:-aria|-alt|-title)?="([^"]+)"', html))
keys |= {"page.title", "page.description", "page.imageAlt", "nav.menuClose"}


bad = 0
for lang in ("en", "ru"):
    have = set(read_translations(js, lang))
    missing = sorted(keys - have)
    unused = sorted(have - keys)
    print(f"{lang}: ключей в словаре {len(have)}, отсутствует {len(missing)}", *missing)
    if unused:
        print(f"  (не используются на странице: {', '.join(unused)})")
    bad += len(missing)
print(f"Всего ключей в HTML: {len(keys)}; пропущено: {bad}")
sys.exit(1 if bad else 0)
