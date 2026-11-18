#!/usr/bin/env python3
"""Проверка: каждый ключ data-i18n / -aria / -alt / -title из index.html
есть в словарях ru и en в main.js. Запуск: python3 check_i18n.py"""
import re
import sys
from pathlib import Path

root = Path(__file__).resolve().parent
html = (root / "index.html").read_text(encoding="utf-8")
js = (root / "main.js").read_text(encoding="utf-8")

keys = set(re.findall(r'data-i18n(?:-aria|-alt|-title)?="([^"]+)"', html))
keys |= {"page.title", "page.description"}  # используются из JS


def section(lang: str, nxt: str | None) -> str:
    start = js.index(f"  {lang}: {{")
    end = js.index(f"  {nxt}: {{") if nxt else js.index("};", start)
    return js[start:end]


dicts = {"en": section("en", "ru"), "ru": section("ru", None)}
bad = 0
for lang, text in dicts.items():
    have = set(re.findall(r"^\s*'([^']+)':", text, re.M))
    missing = sorted(keys - have)
    unused = sorted(have - keys)
    print(f"{lang}: ключей в словаре {len(have)}, отсутствует {len(missing)}", *missing)
    if unused:
        print(f"  (не используются в HTML: {', '.join(unused)})")
    bad += len(missing)
print(f"Всего ключей в HTML: {len(keys)}; пропущено: {bad}")
sys.exit(1 if bad else 0)
