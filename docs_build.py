#!/usr/bin/env python3
"""Convert Cerastilo's bilingual in-app help into MkDocs sources."""

import argparse
import json
import os
import re
import shutil
import sys
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent
CHAPTERS = dict(enumerate((
    "about", "interface", "today", "workbooks", "publishers", "schedule",
    "rules", "history-stats", "email", "export", "settings", "android",
), 1))
SECTIONS = {
    1: (None, None),
    2: (None, None, None, None),
    3: (None, None, None),  # Starts at 3.0.
    4: (None, None, None),
    5: ("list", "card"),
    6: ("auto-assign", "manual", "week-table", "extra-items", "month-board",
        "announcements", "undo"),
    7: (None, None, None, None),
    8: (None, None, None),
    9: ("smtp", "bulk", "personal", "calendar", "log", "replies"),
    10: (None, None, None),
    11: ("congregation", "modules", "import", "backup", "sync", "updates"),
    12: (None, None),
}
SPLIT = {5, 6, 9, 11}
HEADINGS = re.compile(r"^(#{2,3}) (\d+(?:\.\d+)?)\. (.+)$", re.M)
REFERENCE = re.compile(
    r"\b(глав[аеуы]|раздел(?:а|е|у|ом|ы|ов|ах)?|chapters?|sections?)"
    r"(\s+)(\d+(?:\.\d+)*)(?:([ \t]+(?:and|и)[ \t]+)(\d+(?:\.\d+)*))?",
    re.I,
)
IMAGE = re.compile(r"(!\[[^\n]*?\])\((?:[^\s()]*/)?screenshots/([^/\s()]+)\.png\)")
STARTUP = re.compile(
    r"^(?:При запуске программа:|On startup the (?:program|app):?)\s*\n"
    r".*?(?=\n[ \t]*\n(?![ \t]*(?:\n|[*+-] |\d+\. ))|\Z)",
    re.M | re.S,
)
RULES_TITLE = {"ru": "Правила распределения заданий", "en": "Assignment rules"}


def targets():
    result = {}
    for chapter, slug in CHAPTERS.items():
        path = f"{slug}/index.md" if chapter in SPLIT else f"{slug}.md"
        result[str(chapter)] = (path, "")
        for index, section in enumerate(SECTIONS[chapter], start=0 if chapter == 3 else 1):
            number = f"{chapter}.{index}"
            result[number] = (
                (f"{slug}/{section}.md", "") if section else (path, f"#section-{number}")
            )
    return result


def relative(target, page):
    return Path(os.path.relpath(target, Path(page).parent)).as_posix()


def page_title(title):
    # Remove pictographs at the start of quoted UI labels, preserving the labels.
    def clean_quote(match):
        quote, prefix = match.groups()
        if any(unicodedata.category(char) == "So" or char == "⋯" for char in prefix):
            return quote
        return match[0]

    return re.sub(r'([«“"])([^\w«»“”"]+)(?=\w)', clean_quote, title)


def description(body, fallback):
    def prose(text):
        paragraphs = re.split(r"\n\s*\n", text)
        parts = []
        for paragraph in paragraphs:
            if re.match(r"\s*(?:#|!\[|\||---|\[)", paragraph):
                continue
            paragraph = re.sub(r"!?\[([^\]]+)\]\([^)]*\)", r"\1", paragraph)
            paragraph = re.sub(r"^\s*(?:[-*+] |\d+\. )", "", paragraph, flags=re.M)
            paragraph = re.sub(r'[*_`"«»“”„‘’]', "", paragraph)
            parts.append(" ".join(paragraph.split()))
        return " ".join(filter(None, parts))

    content = " ".join(filter(None, (prose(body), prose(fallback))))
    for end in re.finditer(r"[.!?](?=\s|$)", content[:161]):
        if 140 <= end.end() <= 160:
            return content[:end.end()]
    if len(content) <= 160:
        return content
    # Prefer a whole word, using a hard limit for unusually long words.
    end = content.rfind(" ", 139, 160)
    return content[:end if end != -1 else 159].rstrip(" ,;:") + "…"


def build_language(help_dir, lang, destination, mapping):
    guide = (help_dir / lang / "guide.md").read_text(encoding="utf-8")
    quick = (help_dir / lang / "quick_start.md").read_text(encoding="utf-8")
    quick_heading, _, quick_body = quick.partition("\n")
    pages = {"index.md": (quick_heading.removeprefix("# "), quick_body, "")}
    headings = list(HEADINGS.finditer(guide))
    seen = set()
    sections = {}
    for index, heading in enumerate(headings):
        level, number, title = heading.groups()
        if number not in mapping:
            raise ValueError(f"{lang}/guide.md: no URL mapping for {number}")
        if number in seen:
            raise ValueError(f"{lang}/guide.md: duplicate heading number {number}")
        seen.add(number)
        end = headings[index + 1].start() if index + 1 < len(headings) else len(guide)
        body = guide[heading.end():end].strip()
        chapter = number.split(".")[0]
        if level != ("###" if "." in number else "##"):
            raise ValueError(f"{lang}/guide.md: unexpected heading level for {number}")
        sections.setdefault(chapter, []).append((number, title, body))

    missing = mapping.keys() - seen
    if missing:
        raise ValueError(f"{lang}/guide.md: expected headings missing: {', '.join(sorted(missing))}")

    for chapter, entries in sections.items():
        number, title, intro = entries[0]
        if number != chapter:
            raise ValueError(f"{lang}/guide.md: expected chapter {chapter} before {number}")
        if chapter == "7":
            title = RULES_TITLE[lang]
        path, _ = mapping[chapter]
        body = [intro]
        fallback = []
        for number, section_title, section_body in entries[1:]:
            section_path, anchor = mapping[number]
            if number == "1.1":
                section_body = STARTUP.sub("", section_body)
            if section_path == path:
                body.append(f"## {number}. {section_title} {{: #{anchor[1:]}}}\n\n{section_body}")
            else:
                pages[section_path] = (section_title, section_body, "")
                body.append(f"- [{section_title}]({relative(section_path, path)})")
                fallback.append(section_body)
        separator = "\n" if int(chapter) in SPLIT else "\n\n"
        pages[path] = (title, intro + "\n\n" + separator.join(body[1:]), "\n\n".join(fallback))

    meta_file = ROOT / "docs-meta" / f"{lang}.json"
    overrides = json.loads(meta_file.read_text(encoding="utf-8")) if meta_file.exists() else {}
    (destination / "img").mkdir(parents=True)
    (destination / "docs-theme").mkdir()
    shutil.copyfile(ROOT / "docs-theme/extra.css", destination / "docs-theme/extra.css")

    for path, (title, body, fallback) in pages.items():
        def reference(match):
            label, space, number, conjunction, second = match.groups()

            def link(text, number):
                if number not in mapping:
                    raise ValueError(f"{lang}/{path}: no URL mapping for reference {number}")
                target, anchor = mapping[number]
                href = anchor if target == path and anchor else relative(target, path) + anchor
                return f"[{text}]({href})"

            result = link(label + space + number, number)
            if second:
                result += conjunction + link(second, second)
            return result

        lines = []
        for line in body.splitlines():
            for match in IMAGE.finditer(line):
                source = ROOT / "screenshots" / f"{match[2]}.webp"
                if not source.is_file():
                    print(f"Warning: {lang}/{path}: missing screenshots/{source.name}", file=sys.stderr)
                    break
                shutil.copyfile(source, destination / "img" / source.name)
            else:
                line = IMAGE.sub(lambda m: f"{m[1]}({relative(f'img/{m[2]}.webp', path)})", line)
                lines.append(REFERENCE.sub(reference, line))
        body = "\n".join(lines).strip()
        slug = path.removesuffix(".md").removesuffix("/index")
        meta = {"title": page_title(title), "description": description(body, fallback)}
        meta.update({key: value for key, value in overrides.get(slug, {}).items() if key in meta})
        front_matter = "\n".join(f"{key}: {json.dumps(value, ensure_ascii=False)}" for key, value in meta.items())
        output = destination / path
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(f"---\n{front_matter}\n---\n\n# {title}\n\n{body}\n", encoding="utf-8")


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("help_dir", nargs="?", type=Path, default=ROOT.parent / "NHJS_Q/docs/help")
    args = parser.parse_args()
    source = args.help_dir.resolve()
    destination = ROOT / "docs-src"
    if source.is_relative_to(destination):
        parser.error("help_dir must be outside the generated docs-src directory")
    if destination.exists():
        shutil.rmtree(destination)
    for lang in ("ru", "en"):
        build_language(source, lang, destination / lang, targets())


if __name__ == "__main__":
    main()
