const fs = require('fs');
const path = require('path');

console.log('🔍 Validerer prosjektstruktur...\n');

let errors = 0;
let warnings = 0;

// Sjekk at kildefiler eksisterer
const checks = [
  { path: 'programfag', type: 'dir', critical: true, desc: 'Kildemappe for fag' },
  { path: 'squarespace', type: 'dir', critical: true, desc: 'Kildemappe for Squarespace' },
  { path: 'squarespace/catalog.js', type: 'file', critical: true, desc: 'Squarespace katalog (kilde)' },
  { path: 'squarespace/styles.css', type: 'file', critical: true, desc: 'Squarespace CSS (kilde)' },
  { path: 'scripts/build.js', type: 'file', critical: true, desc: 'Build-script' },
  { path: 'scripts/build-index.js', type: 'file', critical: true, desc: 'Index-generator' },
  { path: 'docs', type: 'dir', critical: true, desc: 'Publish-mappe' },
  { path: 'docs/bilder', type: 'dir', critical: false, desc: 'Bildemappe' },
];

checks.forEach(check => {
  const fullPath = path.join(__dirname, '..', check.path);
  const exists = check.type === 'dir'
    ? fs.existsSync(fullPath) && fs.statSync(fullPath).isDirectory()
    : fs.existsSync(fullPath) && fs.statSync(fullPath).isFile();

  if (!exists) {
    if (check.critical) {
      console.log(`❌ FEIL: ${check.desc} mangler: ${check.path}`);
      errors++;
    } else {
      console.log(`⚠️  Advarsel: ${check.desc} mangler: ${check.path}`);
      warnings++;
    }
  } else {
    console.log(`✅ ${check.desc}: ${check.path}`);
  }
});

// Sjekk at auto-genererte filer er synkroniserte
console.log('\n🔄 Sjekker synkronisering...\n');

const syncChecks = [
  { source: 'squarespace/catalog.js', dest: 'docs/squarespace/catalog.js' },
  { source: 'squarespace/styles.css', dest: 'docs/squarespace/styles.css' },
  { source: 'dist/programfag.json', dest: 'docs/programfag.json' },
  { source: 'dist/index.html', dest: 'docs/index.html' },
];

syncChecks.forEach(check => {
  const sourcePath = path.join(__dirname, '..', check.source);
  const destPath = path.join(__dirname, '..', check.dest);

  if (!fs.existsSync(sourcePath)) {
    console.log(`⚠️  Kilde mangler: ${check.source} (kjør 'npm run build')`);
    warnings++;
    return;
  }

  if (!fs.existsSync(destPath)) {
    console.log(`⚠️  Destinasjon mangler: ${check.dest} (kjør 'npm run sync-docs')`);
    warnings++;
    return;
  }

  const sourceContent = fs.readFileSync(sourcePath, 'utf8');
  const destContent = fs.readFileSync(destPath, 'utf8');

  if (sourceContent !== destContent) {
    console.log(`⚠️  Ute av synk: ${check.dest} (kjør 'npm run sync-docs')`);
    warnings++;
  } else {
    console.log(`✅ Synkronisert: ${check.dest}`);
  }
});

// Sjekk at .gitignore er riktig
console.log('\n📝 Sjekker .gitignore...\n');

const gitignorePath = path.join(__dirname, '..', '.gitignore');
const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');

const criticalIgnores = ['dist/', 'node_modules/'];
const shouldNotIgnore = ['docs/squarespace/', 'docs/programfag.json', 'docs/index.html'];

criticalIgnores.forEach(pattern => {
  if (gitignoreContent.includes(pattern)) {
    console.log(`✅ Ignorerer: ${pattern}`);
  } else {
    console.log(`⚠️  .gitignore bør inkludere: ${pattern}`);
    warnings++;
  }
});

shouldNotIgnore.forEach(pattern => {
  if (gitignoreContent.includes(pattern)) {
    console.log(`❌ FEIL: .gitignore skal IKKE ignorere: ${pattern} (GitHub Pages trenger disse!)`);
    errors++;
  } else {
    console.log(`✅ Ikke ignorert (korrekt): ${pattern}`);
  }
});

// Oppsummering
console.log('\n' + '='.repeat(50));
if (errors === 0 && warnings === 0) {
  console.log('✅ Alt ser bra ut!');
  process.exit(0);
} else {
  console.log(`\n📊 Oppsummering:`);
  console.log(`   Feil: ${errors}`);
  console.log(`   Advarsler: ${warnings}`);

  if (errors > 0) {
    console.log('\n❌ Kritiske feil funnet! Fiks disse før du fortsetter.');
    process.exit(1);
  } else {
    console.log('\n⚠️  Advarsler funnet. Vurder å kjøre "npm run build-and-sync"');
    process.exit(0);
  }
}
