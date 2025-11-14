const fs = require('fs');
const path = require('path');

console.log('🏗️  Bygger index.html...\n');

// Les programfag.json for å hente metadata
const jsonPath = path.join(__dirname, '..', 'dist', 'programfag.json');
const programfagData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const antallFag = programfagData.antall;
const genereringsDato = new Date(programfagData.generert).toISOString().split('T')[0];

// HTML-template
const htmlTemplate = `<!DOCTYPE html>
<html lang="no">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Programfag Katalog - API</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        .container {
            background: white;
            border-radius: 12px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            padding: 40px;
            max-width: 800px;
            width: 100%;
        }
        h1 {
            color: #667eea;
            margin-bottom: 20px;
            font-size: 2.5em;
        }
        h2 {
            color: #764ba2;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 1.5em;
        }
        p {
            margin-bottom: 15px;
            color: #555;
        }
        .api-url {
            background: #f5f5f5;
            border-left: 4px solid #667eea;
            padding: 15px;
            margin: 20px 0;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            overflow-x: auto;
        }
        .feature-list {
            list-style: none;
            margin: 20px 0;
        }
        .feature-list li {
            padding: 10px;
            margin: 5px 0;
            background: #f9f9f9;
            border-radius: 4px;
            border-left: 3px solid #764ba2;
        }
        .feature-list li::before {
            content: "✓ ";
            color: #667eea;
            font-weight: bold;
            margin-right: 10px;
        }
        code {
            background: #f0f0f0;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #eee;
            text-align: center;
            color: #999;
            font-size: 0.9em;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>📚 Programfag Katalog</h1>
        <p>API for læreplandata fra UDIR over alle programfag i videregående skole (LK20).</p>

        <h2>API Endpoint</h2>
        <div class="api-url">
https://fredeids-metis.github.io/Programfag/programfag.json
        </div>

        <h2>Innhold</h2>
        <ul class="feature-list">
            <li>${antallFag} programfag</li>
            <li>Kompetansemål for hvert fag</li>
            <li>Kjerneelementer</li>
            <li>Læreplanlenker</li>
            <li>HTML og raw markdown</li>
        </ul>

        <h2>Eksempel på struktur</h2>
        <div class="api-url">
{
  "generert": "${programfagData.generert}",
  "antall": ${antallFag},
  "fag": [
    {
      "id": "bilde",
      "title": "Bilde",
      "fagkode": "MOK3008",
      "lareplan": "MOK04‑02",
      "sections": {
        "omFaget": "...",
        "kompetansemaal": [...],
        "kjerneelementer": [...]
      },
      "html": "...",
      "rawMarkdown": "..."
    }
  ]
}
        </div>

        <h2>Bruk</h2>
        <p>Eksempel med JavaScript:</p>
        <div class="api-url">
fetch('https://fredeids-metis.github.io/Programfag/programfag.json')
  .then(res => res.json())
  .then(data => console.log(data.fag))
        </div>

        <h2>Kilde</h2>
        <p>Data hentet fra <a href="https://www.udir.no/api/grep" target="_blank">UDIR GREP API</a> (NLOD-lisensiert)</p>

        <div class="footer">
            <p>Generert: <strong>${genereringsDato}</strong></p>
            <p>Se <a href="https://github.com/fredeids-metis/Programfag" target="_blank">GitHub-repo</a> for detaljer</p>
        </div>
    </div>
</body>
</html>
`;

// Skriv til dist/index.html
const outputPath = path.join(__dirname, '..', 'dist', 'index.html');
fs.writeFileSync(outputPath, htmlTemplate, 'utf8');

console.log(`✨ index.html generert med ${antallFag} fag`);
console.log(`📅 Dato: ${genereringsDato}`);
console.log(`📁 ${outputPath}\n`);
