# ⚠️ ADVARSEL: Auto-genererte filer

**IKKE REDIGER FILER I DENNE MAPPEN MANUELT!**

Alle filer i `docs/` (bortsett fra `bilder/`) genereres automatisk av GitHub Actions.

## 🔄 Hvordan oppdatere innhold

| Hvis du vil endre... | Gjør dette ✅ |
|---------------------|---------------|
| **Faginnhold** | Endre markdown-filer i `/programfag/` |
| **Katalog-design** | Endre `/squarespace/catalog.js` eller `/squarespace/styles.css` |
| **Fagbilder** | Legg til i `/docs/bilder/` |

## 📦 Build-prosess

1. Du endrer kildefiler i `/programfag/` eller `/squarespace/`
2. Du kjører `npm run build` (eller pusher til GitHub)
3. GitHub Actions genererer automatisk:
   - `docs/programfag.json` (fra `/programfag/*.md`)
   - `docs/index.html` (fra `scripts/build-index.js`)
   - `docs/squarespace/*` (kopieres fra `/squarespace/*`)

## ❌ Hva skjer hvis du endrer filer her?

Endringene dine vil bli **overskrevet** neste gang GitHub Actions kjører!

## 📚 Mer informasjon

Se hovedfilen [README.md](../README.md) i rot-mappen.
