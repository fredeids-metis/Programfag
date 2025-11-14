const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

// Konfigur marked for å lage ren HTML
marked.setOptions({
  headerIds: false,
  mangle: false
});

const PROGRAMFAG_DIR = path.join(__dirname, '..', 'programfag');
const OUTPUT_FILE = path.join(__dirname, '..', 'dist', 'programfag.json');

console.log('🔨 Bygger programfag.json...\n');

// Les alle .md-filer
const files = fs.readdirSync(PROGRAMFAG_DIR).filter(f => f.endsWith('.md'));

console.log(`📚 Fant ${files.length} markdown-filer\n`);

const programfag = [];

files.forEach(file => {
  const filePath = path.join(PROGRAMFAG_DIR, file);
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Parse frontmatter og markdown
  const { data, content: markdown } = matter(content);
  
  // Valider obligatoriske felter
  if (!data.id || !data.title || !data.fagkode) {
    console.warn(`⚠️  ${file}: Mangler obligatoriske felter (id, title, fagkode)`);
    return;
  }
  
  // Konverter markdown til HTML
  const html = marked(markdown);
  
  // Parse seksjoner fra markdown
  const sections = parseMarkdownSections(markdown);
  
  // Bygg fag-objekt
  const fag = {
    id: data.id,
    title: data.title,
    fagkode: data.fagkode,
    lareplan: data.lareplan || '',
    vimeo: data.vimeo || '',
    bilde: data.bilde || '',
    generert: data.generert || '',
    sections: sections,
    html: html,
    rawMarkdown: markdown
  };
  
  programfag.push(fag);
  console.log(`✅ ${data.title}`);
});

// Sorter alfabetisk etter title
programfag.sort((a, b) => a.title.localeCompare(b.title, 'no'));

// Lag output-mappe hvis den ikke finnes
const distDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

// Skriv JSON-fil
const output = {
  generert: new Date().toISOString(),
  antall: programfag.length,
  fag: programfag
};

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf8');

console.log(`\n✨ Ferdig! ${programfag.length} fag skrevet til programfag.json`);
console.log(`📁 ${OUTPUT_FILE}\n`);

// Kjør build-index.js automatisk
console.log('🔄 Bygger index.html...\n');
require('./build-index.js');

// Hjelpefunksjon for å parse seksjoner
function parseMarkdownSections(markdown) {
  const sections = {
    omFaget: '',
    kompetansemaal: [],
    kjerneelementer: []
  };
  
  // Split på ## overskrifter
  const lines = markdown.split('\n');
  let currentSection = '';
  let buffer = [];
  
  lines.forEach(line => {
    if (line.startsWith('## ')) {
      // Ny seksjon - lagre forrige
      saveSection(currentSection, buffer, sections);
      
      // Start ny seksjon
      currentSection = line.replace('## ', '').trim();
      buffer = [];
    } else if (line.startsWith('---')) {
      // Slutt på innhold
      saveSection(currentSection, buffer, sections);
      currentSection = '';
    } else if (currentSection) {
      buffer.push(line);
    }
  });
  
  // Lagre siste seksjon
  saveSection(currentSection, buffer, sections);
  
  return sections;
}

function saveSection(sectionName, buffer, sections) {
  if (!sectionName || buffer.length === 0) return;
  
  const content = buffer.join('\n').trim();
  
  if (sectionName === 'Om faget') {
    sections.omFaget = content;
  } else if (sectionName === 'Kompetansemål') {
    // Parse bullet points
    sections.kompetansemaal = content
      .split('\n')
      .filter(line => line.startsWith('- '))
      .map(line => line.substring(2).trim());
  } else if (sectionName === 'Kjerneelementer') {
    // Parse subsections (### overskrifter)
    const kjerne = [];
    const parts = content.split('### ').filter(p => p.trim());
    
    parts.forEach(part => {
      const lines = part.split('\n');
      const title = lines[0].trim();
      const beskrivelse = lines.slice(1).join('\n').trim();
      
      kjerne.push({
        title: title,
        beskrivelse: beskrivelse
      });
    });
    
    sections.kjerneelementer = kjerne;
  }
}
