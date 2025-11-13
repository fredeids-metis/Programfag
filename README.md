
# 📚 Programfag-katalog

Dynamisk katalog over programfag med læreplandata fra UDIR Grep API.

## 🎯 Hva er dette?

Dette prosjektet:
1. Henter læreplandata fra UDIR
2. Genererer markdown-filer for hvert fag
3. Bygger en JSON-fil som hostes på GitHub Pages
4. Viser fagene dynamisk på Squarespace

## 📁 Mappestruktur

```
programfag-katalog/
├── programfag_lk20.txt       ← Master-liste over alle fag
├── hent_alle_fag.sh          ← Script for å hente fra UDIR
├── programfag/               ← Genererte .md-filer (32 fag)
├── scripts/
│   └── build.js              ← Bygger programfag.json
├── dist/
│   └── programfag.json       ← Output (hostes via GitHub Pages)
├── squarespace/
│   ├── catalog.js            ← JavaScript for Squarespace
│   └── styles.css            ← CSS for styling
└── package.json
```

## 🚀 Kom i gang

### 1. Installer avhengigheter

```bash
# Installer Node.js pakker
npm install

# Sjekk at jq er installert (for bash-script)
brew install jq
```

### 2. Hent læreplandata fra UDIR

```bash
chmod +x hent_alle_fag.sh
./hent_alle_fag.sh
```

Dette henter data for alle fag i `programfag_lk20.txt` og lager markdown-filer i `programfag/`.

### 3. Bygg JSON-fil

```bash
npm run build
```

Dette genererer `dist/programfag.json` fra alle markdown-filene.

### 4. Push til GitHub

```bash
git add .
git commit -m "Oppdater læreplandata"
git push
```

GitHub Pages vil automatisk hoste `programfag.json`.

## 📝 Redigere fag

### Legge til Vimeo-lenke

1. Åpne `.md`-filen i `programfag/`-mappen
2. Endre frontmatter:
   ```yaml
   ---
   vimeo: "https://vimeo.com/123456789"
   ---
   ```
3. Kjør `npm run build`
4. Push til GitHub

### Legge til nytt fag

1. Legg til fag i `programfag_lk20.txt`
2. Kjør `./hent_alle_fag.sh`
3. Kjør `npm run build`
4. Push til GitHub

## 🌐 GitHub Pages oppsett

1. Gå til repo Settings → Pages
2. Source: Deploy from a branch
3. Branch: `main` → `/dist`
4. Save

JSON-filen vil være tilgjengelig på:
```
https://DITT-BRUKERNAVN.github.io/programfag-katalog/programfag.json
```

## 🛠️ Teknologi

- **Bash** - Henter data fra UDIR API
- **Node.js** - Bygger JSON-fil
- **GitHub Pages** - Hoster JSON
- **Squarespace** - Viser katalogen

## ⚖️ Lisens

Data fra UDIR er lisensiert under [NLOD](https://www.udir.no/om-udir/data/vilkar-for-bruk/).

Prosjektkode: MIT
