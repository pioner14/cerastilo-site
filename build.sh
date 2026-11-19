#!/bin/sh
cd "$(dirname "$0")" || exit 1
python3 build_en.py &&
  mkdir -p assets &&
  npx -y tailwindcss@3.4.17 -c tailwind.config.js -i tailwind.input.css -o assets/site.css --minify
