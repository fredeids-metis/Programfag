# 📘 Bruksanvisning: Squarespace Integrasjon

Denne guiden viser deg hvordan du bruker programfag-katalogen på Squarespace.

## ✅ Hva er laget?

Du har nå tre filer:
- **[catalog.js](catalog.js)** - JavaScript som henter og viser fagene
- **[styles.css](styles.css)** - CSS for styling
- **[demo.html](demo.html)** - Lokal testfil (kun for testing)

---

## 🧪 Steg 1: Test lokalt

Før du legger det inn i Squarespace, test at alt fungerer:

1. Åpne [demo.html](demo.html) i nettleseren din
2. Sjekk at fagene lastes og vises
3. Test søkefunksjonen
4. Klikk på "Les mer" for å se detaljer
5. Test på mobil (åpne i nettleserens mobile-visning)

Hvis alt ser bra ut, er du klar for Squarespace!

---

## 🚀 Steg 2: Last opp filer til Squarespace

### Alternativ A: Bruk GitHub Pages (anbefalt)

Dette er den enkleste måten - filene hostes gratis på GitHub.

1. **Commit filene til GitHub:**
   ```bash
   git add squarespace/
   git commit -m "Legg til Squarespace-integrasjon"
   git push
   ```

2. **Filene er nå tilgjengelige på:**
   - CSS: `https://fredeids-metis.github.io/Programfag/squarespace/styles.css`
   - JS: `https://fredeids-metis.github.io/Programfag/squarespace/catalog.js`

**Merk:** GitHub Pages kan ta 1-2 minutter å oppdatere etter push.

### Alternativ B: Last opp til Squarespace

Hvis du vil hoste filene direkte på Squarespace:

1. Gå til **Settings → Advanced → Code Injection**
2. Lim inn CSS og JavaScript direkte (se neste steg)

---

## 🎨 Steg 3: Legg til i Squarespace

### 3.1 Gå til siden hvor du vil vise katalogen

1. Logg inn på Squarespace
2. Gå til siden hvor du vil ha programfag-katalogen
3. Klikk **Edit** (øverst til venstre)

### 3.2 Legg til en Code Block

1. Klikk på **+** (Add Block)
2. Velg **Code** under **More**
3. Lim inn følgende kode:

```html
<!-- Programfag Katalog -->
<div id="programfag-catalog"></div>

<!-- CSS -->
<link rel="stylesheet" href="https://fredeids-metis.github.io/Programfag/squarespace/styles.css">

<!-- JavaScript -->
<script src="https://fredeids-metis.github.io/Programfag/squarespace/catalog.js"></script>

<!-- Initialiser -->
<script>
  ProgramfagCatalog.init({
    container: '#programfag-catalog',
    apiUrl: 'https://fredeids-metis.github.io/Programfag/programfag.json'
  });
</script>
```

4. Klikk **Apply**
5. Klikk **Save** (øverst til venstre)

### 3.3 Ferdig!

Katalogen skal nå vises på siden. Test:
- Søk etter fag
- Klikk "Les mer" for å se detaljer
- Test på mobil

---

## 🎨 Steg 4: Tilpass designet (valgfritt)

Hvis du vil endre farger eller styling:

### Endre farger

Åpne [styles.css](styles.css) og endre disse variablene:

```css
/* Primærfarge (knapper, linker) */
#4a90e2  →  Endre til din farge

/* Bakgrunn på kort */
white  →  Endre til din farge

/* Tekstfarge */
#333  →  Endre til din farge
```

Eksempel - endre blå til grønn:
```css
/* Finn alle steder med #4a90e2 */
/* Erstatt med #2ecc71 (grønn) */
```

### Endre fontstørrelse

I [styles.css](styles.css):
```css
.programfag-header h2 {
  font-size: 2rem;  /* ← Endre dette */
}

.card-header h3 {
  font-size: 1.25rem;  /* ← Endre dette */
}
```

Husk å commit og push endringene til GitHub!

---

## 🔧 Vedlikehold og oppdateringer

### Oppdatere fagdata

Når du oppdaterer JSON-filen, oppdateres katalogen automatisk:

```bash
# 1. Gjør endringer i programfag/*.md
# 2. Bygg på nytt
npm run build

# 3. Push til GitHub
git add .
git commit -m "Oppdater fagdata"
git push
```

Katalogen på Squarespace henter automatisk ny data neste gang siden lastes.

### Oppdatere design

Når du endrer CSS eller JavaScript:

```bash
# 1. Gjør endringer i squarespace/styles.css eller catalog.js
# 2. Commit og push
git add squarespace/
git commit -m "Oppdater design"
git push
```

GitHub Pages oppdateres automatisk (vent 1-2 minutter).

---

## 🐛 Feilsøking

### Katalogen vises ikke

**Sjekk:**
1. Er filene tilgjengelige på GitHub Pages?
   - Gå til: `https://fredeids-metis.github.io/Programfag/squarespace/catalog.js`
   - Du skal se JavaScript-koden
2. Er JSON-filen tilgjengelig?
   - Gå til: `https://fredeids-metis.github.io/Programfag/programfag.json`
   - Du skal se JSON-data
3. Åpne nettleserens konsoll (F12) og sjekk etter feilmeldinger

### "Laster programfag..." forsvinner ikke

Dette betyr at JSON-filen ikke lastes. Sjekk:
1. Er GitHub Pages aktivert? (Settings → Pages)
2. Er repo public?
3. Vent 2-3 minutter etter push

### Søk fungerer ikke

Prøv å:
1. Hard refresh (Cmd+Shift+R / Ctrl+Shift+F5)
2. Sjekk at JavaScript-filen lastes riktig
3. Sjekk nettleserens konsoll (F12) for feil

### Modal åpner ikke

Sjekk at:
1. JavaScript-filen er lastet
2. Det ikke er JavaScript-konflikter med andre scripts på siden

---

## 📱 Responsive design

Katalogen er optimalisert for:
- **Desktop** - Grid med 3-4 kolonner
- **Tablet** - Grid med 2 kolonner
- **Mobil** - 1 kolonne, full bredde

Test alltid på flere skjermstørrelser!

---

## 💡 Fremtidige forbedringer

Når du vil utvide funksjonaliteten:

### Legg til filtrering på fagtype
- Biologi, Matematikk, Språk, osv.
- Krever endring i [catalog.js](catalog.js)

### Legg til favoritter
- La brukere lagre favorittfag
- Krever localStorage i JavaScript

### Legg til sortering
- Alfabetisk, fagkode, osv.
- Krever endring i [catalog.js](catalog.js)

### Legg til animasjoner
- Smooth scroll, fade-in effekter
- Krever endring i [styles.css](styles.css)

---

## 📞 Support

Hvis noe ikke fungerer:
1. Sjekk [demo.html](demo.html) lokalt først
2. Sjekk nettleserens konsoll (F12) for feilmeldinger
3. Verifiser at alle URL-er er korrekte
4. Test i en annen nettleser

---

**Lykke til med Squarespace-integrasjonen!** 🎉
