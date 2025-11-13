# 📚 Programfag-katalog

Automatisk katalog over norske programfag med læreplandata fra UDIR Grep API.

## 🎯 Hva gjør dette prosjektet?

Dette systemet:
1. **Henter** læreplandata fra UDIR Grep API (via bash-script)
2. **Lagrer** data som markdown-filer (én per fag)
3. **Bygger** en JSON-fil som kan brukes av nettsider
4. **Publiserer** automatisk til GitHub Pages
5. **Viser** fagene på Squarespace (planlagt)

**Live JSON-fil:** `https://fredeids-metis.github.io/Programfag/programfag.json`

---

## 📁 Prosjektstruktur

```
programfag-katalog/
├── programfag_lk20.txt          ← Liste over alle 29 fag (master-liste)
├── hent_alle_fag.sh             ← Henter læreplandata fra UDIR API
├── verify-setup.sh              ← Sjekker at alt er satt opp riktig
│
├── programfag/                  ← 29 markdown-filer (én per fag)
│   ├── Biologi_1.md
│   ├── Matematikk_R1.md
│   └── ... (27 flere)
│
├── scripts/
│   └── build.js                 ← Bygger programfag.json fra markdown
│
├── docs/                        ← GitHub Pages publiserer herfra
│   ├── programfag.json          ← Ferdig API-respons (auto-generert)
│   └── index.html               ← Landingsside
│
├── squarespace/                 ← Integrasjon med Squarespace (TODO)
│   └── README.md                ← Plan for integrasjon
│
├── .github/workflows/
│   └── publish-docs.yml         ← Automatisk bygging ved push
│
└── package.json                 ← Node.js avhengigheter
```

---

## 🚀 Slik fungerer det

### 1️⃣ Dataflyt
```
UDIR API → hent_alle_fag.sh → programfag/*.md → build.js → docs/programfag.json → GitHub Pages
```

### 2️⃣ Automatisk publisering
Når du pusher kode til GitHub:
- GitHub Actions kjører automatisk
- Bygger ny `programfag.json`
- Kopierer til `docs/`
- Publiserer på GitHub Pages

### 3️⃣ Hver fagfil inneholder
- Fagkode (f.eks. `BIO01-01`)
- Tittel
- Kompetansemål
- Kjernelementer
- Tverrfaglige temaer
- Vimeo-lenke (valgfri, legges til manuelt)

---

## 🛠️ Hvordan bruke prosjektet

### Første gangs oppsett

```bash
# 1. Klon prosjektet
git clone https://github.com/fredeids-metis/Programfag.git
cd Programfag

# 2. Installer Node.js-pakker
npm install

# 3. Hent læreplandata fra UDIR (tar 5-10 min)
chmod +x hent_alle_fag.sh
./hent_alle_fag.sh

# 4. Bygg JSON-filen
npm run build

# 5. Push til GitHub (publiserer automatisk)
git add .
git commit -m "Oppdater læreplandata"
git push
```

### Vanlige oppgaver

#### 📝 Legge til Vimeo-lenke til et fag
```bash
# 1. Åpne fagfilen (f.eks. Biologi_1.md)
# 2. Endre frontmatter øverst i filen:
---
vimeo: "https://vimeo.com/123456789"
---

# 3. Bygg på nytt og push
npm run build
git add .
git commit -m "Legg til Vimeo-lenke for Biologi 1"
git push
```

#### 🔄 Oppdatere læreplandata fra UDIR
```bash
# Henter fersk data fra UDIR API
./hent_alle_fag.sh
npm run build
git add .
git commit -m "Oppdater læreplandata fra UDIR"
git push
```

#### ➕ Legge til nytt fag
```bash
# 1. Legg til fagkode i programfag_lk20.txt
echo "NYT01-01" >> programfag_lk20.txt

# 2. Hent data for det nye faget
./hent_alle_fag.sh

# 3. Bygg og push
npm run build
git add .
git commit -m "Legg til nytt fag: Nytt fag"
git push
```

#### ✅ Verifisere at alt fungerer
```bash
./verify-setup.sh
```

---

## 📦 npm-kommandoer

```bash
npm run build           # Bygger programfag.json fra markdown-filer
npm run sync-docs       # Kopierer fra dist/ til docs/ (gjøres automatisk av workflow)
npm run build-and-sync  # Begge kommandoene over
```

---

## 🔮 Fremtidige planer

### ✅ Ferdig
- [x] Hente data fra UDIR API
- [x] Generere markdown-filer
- [x] Bygge JSON-fil
- [x] GitHub Pages hosting
- [x] Automatisk publisering via GitHub Actions

### 🚧 Under arbeid
- [ ] **Squarespace-integrasjon**
  - Lage `catalog.js` - JavaScript for å vise fagene
  - Lage `styles.css` - CSS for styling
  - Legge til søk og filtrering
  - Responsive design

### 💡 Fremtidige ideer
- [ ] Automatisk oppdatering fra UDIR (schedulert GitHub Action)
- [ ] Mulighet for å filtrere på faggrupper
- [ ] Eksportere til andre formater (CSV, Excel)
- [ ] Legge til bilder/ikoner for hvert fag
- [ ] Statistikk og visualisering av kompetansemål

---

## 🧰 Teknisk stack

- **Bash** - Henter data fra UDIR Grep API
- **Node.js** - Bygger JSON-fil fra markdown
  - `gray-matter` - Parser frontmatter i markdown
  - `marked` - Konverterer markdown til HTML
- **GitHub Actions** - Automatisk bygging og publisering
- **GitHub Pages** - Gratis hosting av JSON-fil
- **Squarespace** - Frontend for sluttbruker (planlagt)

---

## 🔧 Feilsøking

### JSON-filen vises ikke på GitHub Pages
1. Sjekk at repo er **Public**
2. Gå til Settings → Pages
3. Sjekk at source er **main** branch, **/docs** folder
4. Vent 2-3 minutter etter push
5. Prøv hard refresh (Cmd+Shift+R)

### "command not found: node"
```bash
brew install node
```

### "command not found: jq"
```bash
brew install jq
```

### npm-feil
```bash
rm -rf node_modules package-lock.json
npm install
```

### GitHub Actions feiler
1. Sjekk workflow-loggen på GitHub
2. Verifiser at `package.json` og `scripts/build.js` finnes
3. Sjekk at det ikke er syntaksfeil i markdown-filene

---

## 📄 Lisens

- **Læreplandata:** Lisensiert av UDIR under [NLOD](https://www.udir.no/om-udir/data/vilkar-for-bruk/)
- **Prosjektkode:** MIT License

---

## 📞 Kontakt og bidrag

Dette er et personlig prosjekt for å gjøre norske læreplaner mer tilgjengelige.

**Nyttige lenker:**
- [UDIR Grep API dokumentasjon](https://www.udir.no/api/grep)
- [GitHub Pages dokumentasjon](https://docs.github.com/en/pages)
- [Squarespace utviklerdokumentasjon](https://developers.squarespace.com/)
