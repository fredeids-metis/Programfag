# 🚀 OPPSETT-GUIDE

Steg-for-steg guide for å sette opp prosjektet.

## ✅ SJEKKLISTE - før du starter

- [ ] Node.js installert (`node --version`)
- [ ] jq installert (`jq --version`)
- [ ] Git installert (`git --version`)
- [ ] GitHub-konto
- [ ] Squarespace-tilgang

---

## 📦 DEL 1: Installer Node.js (hvis ikke installert)

```bash
brew install node
node --version
npm --version
```

---

## 🗂️ DEL 2: Opprett GitHub Repo

1. Gå til https://github.com/new
2. Repository name: `programfag-katalog`
3. Description: "Katalog over programfag med læreplandata fra UDIR"
4. **Public** ✅ (må være public for GitHub Pages)
5. ✅ Add README file
6. ✅ Add .gitignore → velg **Node**
7. Klikk "Create repository"

---

## 💻 DEL 3: Klon og sett opp lokalt

```bash
# Klon repo
cd ~/Documents
git clone https://github.com/DITT-BRUKERNAVN/programfag-katalog.git
cd programfag-katalog

# Lag mappestruktur
mkdir -p programfag scripts dist squarespace

# Kopier filer fra dette prosjektet
# (Se DEL 4 nedenfor)
```

---

## 📄 DEL 4: Kopier prosjektfiler

Kopier disse filene til repo-mappen:

### Rot-nivå:
- `programfag_lk20.txt` → root
- `hent_alle_fag.sh` → root
- `package.json` → root

### Scripts:
- `build.js` → `scripts/`

### Squarespace (lages senere):
- `catalog.js` → `squarespace/`
- `styles.css` → `squarespace/`

---

## 🔧 DEL 5: Installer Node-pakker

```bash
npm install
```

Dette installerer:
- `gray-matter` (parser frontmatter)
- `marked` (konverterer markdown til HTML)

---

## 📥 DEL 6: Generer læreplandata

```bash
# Gjør scriptet kjørbart
chmod +x hent_alle_fag.sh

# Kjør scriptet (tar 5-10 minutter)
./hent_alle_fag.sh
```

Dette lager 32 markdown-filer i `programfag/`.

---

## 🏗️ DEL 7: Bygg JSON-fil

```bash
npm run build
```

Dette lager `dist/programfag.json`.

---

## 📤 DEL 8: Push til GitHub

```bash
git add .
git commit -m "Initial commit med alle programfag"
git push
```

---

## 🌐 DEL 9: Aktiver GitHub Pages

1. Gå til repo på GitHub
2. Settings → Pages
3. Source: **Deploy from a branch**
4. Branch: **main** → Folder: **/dist**
5. Klikk **Save**

Vent 1-2 minutter, deretter:

Test at JSON er tilgjengelig:
```
https://DITT-BRUKERNAVN.github.io/programfag-katalog/programfag.json
```

---

## ✅ FERDIG!

Nå har du:
- ✅ 32 programfag som markdown-filer
- ✅ JSON-fil hostet på GitHub Pages
- ✅ Klar for Squarespace-integrasjon

---

## 🔄 OPPDATERINGSRUTINE

### Når du vil legge til Vimeo-lenke:

1. Åpne `.md`-filen direkte på GitHub
2. Klikk "Edit" (blyant-ikon)
3. Endre `vimeo: ""` til `vimeo: "https://vimeo.com/123456"`
4. Commit changes
5. Kjør `npm run build` lokalt
6. Push til GitHub

### Når UDIR oppdaterer læreplaner:

1. Kjør `./hent_alle_fag.sh` (henter ny data)
2. Kjør `npm run build`
3. Push til GitHub

---

## 🆘 FEILSØKING

### "command not found: node"
```bash
brew install node
```

### "command not found: jq"
```bash
brew install jq
```

### "npm ERR!"
```bash
rm -rf node_modules package-lock.json
npm install
```

### GitHub Pages viser ikke JSON
- Sjekk at repo er **Public**
- Sjekk at Pages er aktivert
- Vent 2-3 minutter
- Prøv hard refresh (Cmd+Shift+R)

---

## 📞 NESTE STEG

Når dette fungerer, er du klar for Squarespace-integrasjon!
