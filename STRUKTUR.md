# ✅ Prosjektstruktur - Gjennomgang

## Oppsummering av status

Ditt prosjekt er nå **strukturert og klar**, men det mangler en Squarespace-integrasjon.

### ✅ Ferdig:
- Node.js setup (package.json med avhengigheter)
- Bash-script for UDIR API-henting (hent_alle_fag.sh)
- Build-script (scripts/build.js) som lager JSON
- 29 programfag som markdown-filer
- dist/programfag.json (349 KB)
- GitHub Pages setup (index.html + .nojekyll)
- .gitignore optimalisert (node_modules ut, dist inn)
- Git history renset

### ⚠️ GitHub Pages - mulig issue:
JSON-filen viser som 404. **Årsak:** GitHub Pages er sannsynligvis satt til `/` (root) istedenfor `/dist`

**Løsning:**
1. Gå til GitHub: https://github.com/fredeids-metis/Programfag/settings/pages
2. Under "Source", velg:
   - Branch: `main`
   - Folder: `/dist`
3. Klikk "Save"
4. Vent 1-2 minutter

Da skal JSON være tilgjengelig på:
`https://fredeids-metis.github.io/Programfag/programfag.json`

### ⏳ Mangler:
- Squarespace integrasjon (JavaScript + CSS)
  - `squarespace/catalog.js` - for å vise fagene
  - `squarespace/styles.css` - for styling

## Mappestruktur (nå):

```
.
├── .git/                           ← Git repo
├── .gitignore                      ← Oppdatert (dist/ tillatt)
├── package.json                    ← Node-avhengigheter
├── package-lock.json               ← Lock-fil
├── README.md                       ← Dokumentasjon
├── OPPSETT.md                      ← Setup-guide
├── hent_alle_fag.sh               ← Script: hent fra UDIR
├── programfag_lk20.txt            ← Master-liste (29 fag)
├── verify-setup.sh                ← Verifikasjonsscript
│
├── programfag/                     ← Genererte .md-filer
│   ├── Bilde.md
│   ├── Biologi_1.md
│   ├── Biologi_2.md
│   ├── Engelsk_1.md
│   ├── Engelsk_2.md
│   ├── ... (23 flere)
│
├── scripts/
│   └── build.js                    ← Bygger JSON fra markdown
│
├── dist/                           ← GitHub Pages folder
│   ├── programfag.json            ← API-svar (349 KB)
│   ├── index.html                 ← Landing page
│   └── .nojekyll                  ← Jekyll-flag
│
└── squarespace/                    ← Integrasjonskode (TOM)
    └── README.md                  ← Integrasjonsguide
```

## Status for hver del

### 1. Data-henting (✅ FERDIG)
```bash
chmod +x hent_alle_fag.sh
./hent_alle_fag.sh
```
Henter fra UDIR GREP API → lager .md-filer

### 2. JSON-bygging (✅ FERDIG)
```bash
npm run build
```
Konverterer .md → dist/programfag.json

### 3. GitHub Pages (⚠️ TRENGER FIX)
- URL base: `https://fredeids-metis.github.io/Programfag/`
- API JSON: `https://fredeids-metis.github.io/Programfag/programfag.json`
- Mulig issue: Pages-source må være `/dist`

### 4. Squarespace (❌ IKKE STARTET)
Mangler kode som:
- Henter JSON fra GitHub Pages
- Viser fagene i et interaktivt grid/kort-layout
- Tillater søk og filtrering
- Responsive design

## Neste steg:

### Kortsiktig (1-2 timer):
1. Fix GitHub Pages (endre source til `/dist`)
2. Verifiser at JSON er tilgjengelig
3. Lag basic Squarespace-integrasjon

### Langsiktig:
1. Styling og UX-forbedringer
2. Søk/filtrering i Squarespace
3. Mulig: Automat oppdatering via GitHub Actions

## Verktøy du har:

```bash
# Verifiser alt er OK
bash verify-setup.sh

# Bygg JSON på nytt (hvis du endrer .md-filer)
npm run build

# Hent ny data fra UDIR
./hent_alle_fag.sh

# Committere endringer
git add .
git commit -m "Beskrivelse av endring"
git push origin main
```

## Tips:

- Alle `.md`-filer har frontmatter med `id`, `title`, `fagkode`, etc.
- `dist/programfag.json` er den endelige output for Squarespace
- `.gitignore` tillater nå `dist/` så det blir committert og hostet på GitHub Pages
- `build.js` parser markdown og lager strukturert JSON

## Ressurser:

- UDIR GREP API: https://www.udir.no/api/grep
- Ditt GitHub repo: https://github.com/fredeids-metis/Programfag
- GitHub Pages docs: https://docs.github.com/en/pages

**Konklusjon:** Prosjektet er solidgt bygget opp. Neste fase er Squarespace-integrasjon!
