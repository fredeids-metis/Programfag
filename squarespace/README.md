# 🎨 Squarespace Integrasjon

Denne mappen skal inneholde kode for å vise programfag-katalogen på Squarespace.

## 📋 Status: Ikke implementert

Følgende filer må lages:

### 1. `catalog.js` - JavaScript for katalogen
**Oppgaver:**
- Hente JSON fra `https://fredeids-metis.github.io/Programfag/programfag.json`
- Vise fag i et grid/kortlayout
- Implementere søk og filtrering
- Vise detaljert faginfo ved klikk
- Håndtere Vimeo-videoer

### 2. `styles.css` - CSS for styling
**Oppgaver:**
- Style fagkort (tittel, fagkode, beskrivelse)
- Style søkeboks
- Modal/detaljvisning for fag
- Responsive design (mobil, tablet, desktop)
- Farger og typografi tilpasset Squarespace-siden

---

## 🚀 Implementeringsplan

### Steg 1: Minimal implementasjon
- [ ] Lag enkel HTML-struktur
- [ ] Hent og vis alle fag i en liste
- [ ] Basic CSS-styling

### Steg 2: Funksjonalitet
- [ ] Søk etter fag (tittel, fagkode)
- [ ] Filtrer på kategori/type
- [ ] Klikk på fag for å se detaljer
- [ ] Vis Vimeo-video hvis tilgjengelig

### Steg 3: Design
- [ ] Responsivt design
- [ ] Animasjoner og overganger
- [ ] Tilpass til Squarespace-tema

### Steg 4: Testing
- [ ] Test i ulike nettlesere
- [ ] Test på mobil og tablet
- [ ] Verifiser at JSON-data lastes korrekt

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
