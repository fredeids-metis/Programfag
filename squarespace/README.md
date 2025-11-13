# 🎨 Squarespace Integrasjon

Denne mappen skal inneholde kode for å vise programfag-katalogen på Squarespace.

## 📋 Status: ✅ Minimal prototype ferdig!

### Filer som er laget:

### 1. ✅ `catalog.js` - JavaScript for katalogen
**Funksjonalitet:**
- ✅ Henter JSON fra `https://fredeids-metis.github.io/Programfag/programfag.json`
- ✅ Viser fag i et responsivt grid/kortlayout
- ✅ Søkefunksjon (søk etter fag eller fagkode)
- ✅ Detaljvisning i modal ved klikk
- ✅ Viser Vimeo-videoer hvis tilgjengelig
- ✅ Kompetansemål og kjerneelementer
- ✅ Lenke til full læreplan på udir.no

### 2. ✅ `styles.css` - CSS for styling
**Design:**
- ✅ Moderne kort-design med hover-effekter
- ✅ Søkeboks med fokus-states
- ✅ Modal med animasjoner
- ✅ Responsive design (desktop/tablet/mobil)
- ✅ Rene, minimalistiske farger

### 3. ✅ `demo.html` - Lokal testfil
**Bruk:**
- Test katalogen lokalt før du legger den i Squarespace
- Åpne filen i nettleseren for å se hvordan det ser ut

### 4. ✅ `BRUKSANVISNING.md` - Komplett guide
**Innhold:**
- Steg-for-steg instruksjoner for Squarespace
- Feilsøkingstips
- Tilpasningsguide

---

## 🚀 Kom i gang

### Steg 1: Test lokalt
1. Åpne `demo.html` i nettleseren
2. Sjekk at fagene lastes
3. Test søk og modal-funksjonen

### Steg 2: Publiser til GitHub
```bash
git add squarespace/
git commit -m "Legg til Squarespace-integrasjon"
git push
```

### Steg 3: Legg til i Squarespace
Se fullstendig guide i [BRUKSANVISNING.md](BRUKSANVISNING.md)

---

## 💡 Fremtidige forbedringer (valgfritt)

### Ikke implementert ennå:
- [ ] Filtrering på fagkategori (Realfag, Språk, Samfunnsfag, osv.)
- [ ] Sortering (alfabetisk, fagkode)
- [ ] Favorittfunksjon (localStorage)
- [ ] Mer avanserte animasjoner
- [ ] Eksporter til PDF
- [ ] Dele-knapper (sosiale medier)

---

## 💡 Eksempel på bruk i Squarespace

Når koden er ferdig, legges den til på Squarespace slik:

```html
<!-- Legg til i en Code Block på Squarespace-siden -->
<div id="programfag-catalog"></div>

<link rel="stylesheet" href="path/to/styles.css">
<script src="path/to/catalog.js"></script>

<script>
  // Initialiser katalogen
  ProgramfagCatalog.init({
    container: '#programfag-catalog',
    apiUrl: 'https://fredeids-metis.github.io/Programfag/programfag.json'
  });
</script>
```

---

## 📚 Ressurser

- [Squarespace Code Injection Guide](https://support.squarespace.com/hc/en-us/articles/205815908)
- [Squarespace Developer Platform](https://developers.squarespace.com/)
- API-endepunkt: `https://fredeids-metis.github.io/Programfag/programfag.json`

---

**Neste steg:** Lag `catalog.js` og `styles.css` når du er klar til å jobbe med frontend.
