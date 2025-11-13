# 🎨 Squarespace Integrasjon

Her skal integrasjonskoden for Squarespace ligge.

## Filer som mangler:

- `catalog.js` - JavaScript for å hente og vise fagene
- `styles.css` - CSS for styling

## Eksempel på oppsett

### 1. I Squarespace: Legg til Code Block

```html
<!-- Plasser i en Code Block på siden -->
<div id="programfag-catalog"></div>

<script src="https://path-to-your-catalog.js"></script>
<link rel="stylesheet" href="https://path-to-your-styles.css">

<script>
  // Initialiser katalogen
  programfagCatalog.init({
    container: '#programfag-catalog',
    apiUrl: 'https://fredeids-metis.github.io/Programfag/programfag.json'
  });
</script>
```

### 2. catalog.js skal gjøre:
- Hente JSON fra API
- Vise liste over fag
- Tillate søk/filtrering
- Vise fagdetaljer

### 3. styles.css skal style:
- Fagkort
- Søkeboks
- Modal/detaljvist
- Responsive design

## Neste steg

1. Lag `catalog.js` med fagvisning
2. Lag `styles.css` med styling
3. Test i Squarespace
4. Deploy
