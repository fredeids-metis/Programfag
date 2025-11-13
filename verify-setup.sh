#!/bin/bash

echo "✅ Prosjektstruktur-sjekk"
echo "======================="
echo ""

# Sjekk Node.js
if command -v node &> /dev/null; then
    echo "✓ Node.js: $(node --version)"
else
    echo "✗ Node.js: IKKE INSTALLERT"
fi

# Sjekk npm
if command -v npm &> /dev/null; then
    echo "✓ npm: $(npm --version)"
else
    echo "✗ npm: IKKE INSTALLERT"
fi

# Sjekk jq
if command -v jq &> /dev/null; then
    echo "✓ jq: $(jq --version)"
else
    echo "✗ jq: IKKE INSTALLERT (trenger for hent_alle_fag.sh)"
fi

echo ""
echo "📁 Filstruktur-sjekk:"
echo "====================="

files=(
    "package.json"
    "hent_alle_fag.sh"
    "scripts/build.js"
    "programfag_lk20.txt"
    "dist/programfag.json"
    "dist/index.html"
    "dist/.nojekyll"
    ".gitignore"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✓ $file"
    else
        echo "✗ $file: MANGLER"
    fi
done

echo ""
echo "📊 Data-sjekk:"
echo "=============="
if [ -f "dist/programfag.json" ]; then
    count=$(jq '.antall' dist/programfag.json 2>/dev/null || echo "ERROR")
    echo "✓ Fag i JSON: $count"
else
    echo "✗ dist/programfag.json: MANGLER"
fi

if [ -d "programfag" ]; then
    fagcount=$(ls programfag/*.md 2>/dev/null | wc -l)
    echo "✓ Markdown-filer: $fagcount"
else
    echo "✗ programfag/: MANGLER"
fi

echo ""
echo "🌐 GitHub Pages:"
echo "================"
echo "Sjekk URL: https://fredeids-metis.github.io/Programfag/"
echo "API URL:   https://fredeids-metis.github.io/Programfag/programfag.json"
echo ""
echo "Tips: Sjekk GitHub repo Settings > Pages for korrekt source-konfig"
echo ""
