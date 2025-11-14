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
├── programfag_lk20.txt          ← Liste over alle 30 fag (master-liste)
├── hent_alle_fag.sh             ← Henter læreplandata fra UDIR API
├── verify-setup.sh              ← Sjekker at alt er satt opp riktig
│
├── programfag/                  ← 30 markdown-filer (én per fag)
│   ├── Biologi_1.md
│   ├── Matematikk_R1.md
│   └── ... (28 flere)
│
├── scripts/
│   └── build.js                 ← Bygger programfag.json fra markdown
│
├── docs/                        ← GitHub Pages publiserer herfra
│   ├── programfag.json          ← Ferdig API-respons (auto-generert)
│   ├── index.html               ← Landingsside
│   ├── bilder/                  ← Fagbilder for modal-visning
│   └── squarespace/             ← Komplett Squarespace-integrasjon
│       ├── catalog.js           ← Fagkatalog med søk og filtrering
│       ├── styles.css           ← Responsive styling
│       ├── demo.html            ← Demo av katalogen
│       ├── README.md            ← Teknisk dokumentasjon
│       └── BRUKSANVISNING.md    ← Steg-for-steg guide
│
├── squarespace/                 ← Squarespace-filer (kildekode)
│   ├── catalog.js
│   ├── styles.css
│   └── README.md
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

#### 🎨 Legge til bilde for et fag
```bash
# 1. Legg til bildefil i docs/bilder/
# Navngi filen etter fag-ID, f.eks: biologi1.jpg, fysikk1.jpg

# 2. Åpne fagfilen (f.eks. Biologi_1.md)
# 3. Legg til bilde i frontmatter:
---
bilde: "bilder/biologi1.jpg"
---

# 4. Bygg på nytt og push
npm run build
git add .
git commit -m "Legg til bilde for Biologi 1"
git push
```

---

## 📦 npm-kommandoer

```bash
npm run build           # Bygger programfag.json fra markdown-filer
npm run sync-docs       # Kopierer fra dist/ til docs/ (gjøres automatisk av workflow)
npm run build-and-sync  # Begge kommandoene over
```

---

## 🎨 Squarespace-integrasjon

Prosjektet inkluderer en komplett, ferdig løsning for å vise fagkatalogen på Squarespace.

### Funksjoner
- ✅ Interaktiv fagkatalog med kort-visning
- ✅ Søk i fagnavn og fagkoder
- ✅ Modal-visning med fullstendige fagdetaljer
- ✅ Bildeintegrasjon (valgfri per fag)
- ✅ Responsiv design (desktop, tablet, mobil)
- ✅ Elegant animasjoner og overganger

### Slik implementerer du på Squarespace

**Demo:** Se [docs/squarespace/demo.html](docs/squarespace/demo.html) for forhåndsvisning

**Detaljert guide:** Se [docs/squarespace/BRUKSANVISNING.md](docs/squarespace/BRUKSANVISNING.md)

**Hurtigversjon:**
1. Opprett en ny Code Block på Squarespace
2. Kopier innholdet fra [docs/squarespace/catalog.js](docs/squarespace/catalog.js)
3. Kopier CSS fra [docs/squarespace/styles.css](docs/squarespace/styles.css) til Custom CSS
4. Publiser!

---

## 🔮 Fremtidige planer

### ✅ Ferdig
- [x] Hente data fra UDIR API
- [x] Generere markdown-filer
- [x] Bygge JSON-fil
- [x] GitHub Pages hosting
- [x] Automatisk publisering via GitHub Actions
- [x] **Squarespace-integrasjon**
  - [x] `catalog.js` - Interaktiv fagkatalog
  - [x] `styles.css` - Responsive styling
  - [x] Søk og filtrering
  - [x] Modal-visning med fagdetaljer
  - [x] Bildeintegrasjon
  - [x] Demo-side og dokumentasjon

### 💡 Fremtidige ideer
- [ ] Automatisk oppdatering fra UDIR (schedulert GitHub Action)
- [ ] Mulighet for å filtrere på faggrupper
- [ ] Eksportere til andre formater (CSV, Excel)
- [ ] Legge til flere bilder for alle fag
- [ ] Statistikk og visualisering av kompetansemål
- [ ] Vimeo-videointegrasjon for alle fag

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
