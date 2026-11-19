#!/usr/bin/env bash
set -euo pipefail

site_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
if (( $# )); then
    help_dir="$(realpath -- "$1")"
    shift
    set -- "$help_dir" "$@"
fi
cd -- "$site_root"
python3 docs_build.py "$@"
uvx --from 'mkdocs==1.6.1' --with 'mkdocs-material==9.7.1' mkdocs build --clean -f mkdocs.ru.yml
uvx --from 'mkdocs==1.6.1' --with 'mkdocs-material==9.7.1' mkdocs build --clean -f mkdocs.en.yml
python3 update_sitemap.py
