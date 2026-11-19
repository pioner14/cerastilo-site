#!/usr/bin/env python3
"""Generate en/index.html from the Russian page and main.js translations."""

import json
import re
from html import escape
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parent
EN_URL = "https://cerastilo.com/en/"


def read_translations(source, lang):
    """Read a dictionary block with one JSON-compatible string per entry."""
    start = source.index(f"  {lang}: {{\n")
    end = source.index("\n  },", start)
    translations = {}
    for line in source[start:end].splitlines()[1:]:
        if not line.strip() or line.lstrip().startswith("//"):
            continue
        match = re.fullmatch(r"""    '([^']+)': ("(?:[^"\\]|\\.)*"),""", line)
        if not match:
            raise ValueError(f"Invalid {lang} dictionary entry: {line}")
        key, value = match.groups()
        if key in translations:
            raise ValueError(f"Duplicate {lang} translation: {key}")
        translations[key] = json.loads(value)
    return translations


class EnglishPage(HTMLParser):
    def __init__(self, source, translations):
        super().__init__(convert_charrefs=False)
        self.source = source
        self.lines = [0, *(match.end() for match in re.finditer("\n", source))]
        self.translations = translations
        self.edits = []
        self.content = None
        self.meta = {
            "description": translations["page.description"],
            "og:locale": "en_US",
            "og:url": EN_URL,
            "og:title": translations["page.title"],
            "og:description": translations["page.description"],
            "og:image:alt": translations["page.imageAlt"],
            "twitter:image:alt": translations["page.imageAlt"],
        }

    def source_offset(self):
        line, column = self.getpos()
        return self.lines[line - 1] + column

    def handle_starttag(self, tag, pairs):
        self.start_tag(tag, pairs)

    def handle_startendtag(self, tag, pairs):
        self.start_tag(tag, pairs, self_closing=True)

    def start_tag(self, tag, pairs, self_closing=False):
        if self.content is not None:
            if tag == self.content[0] and not self_closing:
                self.depth += 1
            return

        start = self.source_offset()
        end = start + len(self.get_starttag_text())
        attrs = dict(pairs)
        updates = {}
        for marker, attribute in (
            ("data-i18n-alt", "alt"),
            ("data-i18n-aria", "aria-label"),
            ("data-i18n-title", "title"),
            ("data-i18n-href", "href"),
        ):
            if marker in attrs:
                updates[attribute] = self.translations[attrs[marker]]

        if tag == "html":
            updates["lang"] = "en"
        elif tag == "link" and attrs.get("rel") == "canonical":
            updates["href"] = EN_URL
        elif tag == "meta":
            key = attrs.get("name", attrs.get("property"))
            if key in self.meta:
                updates["content"] = self.meta[key]
        elif tag == "a" and attrs.get("id") == "lang-toggle":
            updates.update(href="/", hreflang="ru")

        if updates:
            attrs.update(updates)
            attributes = "".join(
                f" {name}" if value is None else f' {name}="{escape(value, quote=True)}"'
                for name, value in attrs.items()
            )
            suffix = " />" if self_closing else ">"
            self.edits.append((start, end, f"<{tag}{attributes}{suffix}"))

        if "data-i18n" in attrs:
            self.content = (tag, end, attrs["data-i18n"])
        elif tag == "title":
            self.content = (tag, end, "page.title")
        elif tag == "script" and attrs.get("type") == "application/ld+json":
            self.content = (tag, end, None)
        if self.content is not None:
            self.depth = 1

    def handle_endtag(self, tag):
        if self.content is None or tag != self.content[0]:
            return
        self.depth -= 1
        if self.depth:
            return

        _, start, key = self.content
        end = self.source_offset()
        original = self.source[start:end]
        if key is None:
            data = json.loads(original)
            data.update(description=self.translations["page.description"], url=EN_URL, inLanguage="en")
            encoded = json.dumps(data, indent=2, ensure_ascii=False).replace("<", r"\u003c")
            replacement = "\n".join(f"    {line}" for line in encoded.splitlines())
        else:
            # Match textContent: escape any markup present in a translation.
            replacement = escape(self.translations[key], quote=False)

        leading = re.match(r"\s*", original)[0]
        trailing = re.search(r"\s*$", original)[0] if original.strip() else ""
        if key is None:
            leading = "\n"
        self.edits.append((start, end, leading + replacement + trailing))
        self.content = None

    def render(self):
        self.feed(self.source)
        self.close()
        if self.content is not None:
            raise ValueError(f"Unclosed translated element: {self.content[0]}")

        parts = []
        cursor = 0
        for start, end, replacement in self.edits:
            parts.extend((self.source[cursor:start], replacement))
            cursor = end
        parts.append(self.source[cursor:])
        return "".join(parts)


def main():
    source = (ROOT / "index.html").read_text(encoding="utf-8")
    script = (ROOT / "main.js").read_text(encoding="utf-8")
    html = EnglishPage(source, read_translations(script, "en")).render()
    target = ROOT / "en" / "index.html"
    target.parent.mkdir(exist_ok=True)
    target.write_text(html, encoding="utf-8")


if __name__ == "__main__":
    main()
