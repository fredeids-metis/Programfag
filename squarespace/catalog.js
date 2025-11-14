/**
 * Programfag Catalog - Minimal prototype
 * Viser programfag fra JSON i et enkelt grid-layout
 */

const ProgramfagCatalog = {
  config: {
    apiUrl: '',
    container: null
  },

  /**
   * Initialiser katalogen
   * @param {Object} options - Konfigurasjonsopsjoner
   * @param {string} options.apiUrl - URL til JSON-filen
   * @param {string} options.container - CSS-selector for container
   */
  init: function(options) {
    this.config.apiUrl = options.apiUrl;
    this.config.container = document.querySelector(options.container);

    if (!this.config.container) {
      console.error('ProgramfagCatalog: Container ikke funnet');
      return;
    }

    this.loadData();
  },

  /**
   * Hent data fra API
   */
  loadData: function() {
    const container = this.config.container;
    container.innerHTML = '<p class="loading">Laster programfag...</p>';

    fetch(this.config.apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Kunne ikke laste data');
        }
        return response.json();
      })
      .then(data => {
        this.renderCatalog(data.fag);
      })
      .catch(error => {
        console.error('Feil ved lasting:', error);
        container.innerHTML = '<p class="error">Kunne ikke laste programfag. Prøv igjen senere.</p>';
      });
  },

  /**
   * Vis katalogen
   * @param {Array} fag - Liste over fag
   */
  renderCatalog: function(fag) {
    const container = this.config.container;

    // Lag HTML for alle fag
    const html = `
      <div class="programfag-header">
        <h2>Programfag (${fag.length})</h2>
        <input
          type="text"
          id="programfag-search"
          class="programfag-search"
          placeholder="Søk etter fag..."
        >
      </div>
      <div class="programfag-grid" id="programfag-grid">
        ${fag.map(f => this.createCard(f)).join('')}
      </div>
    `;

    container.innerHTML = html;

    // Legg til søkefunksjonalitet
    this.setupSearch(fag);
  },

  /**
   * Lag kort for ett fag
   * @param {Object} fag - Fagdata
   * @returns {string} HTML for fagkortet
   */
  createCard: function(fag) {
    const omFaget = fag.sections?.omFaget || '';
    const preview = omFaget.substring(0, 150) + (omFaget.length > 150 ? '...' : '');

    return `
      <div class="programfag-card"
           data-fagkode="${fag.fagkode}"
           data-title="${fag.title.toLowerCase()}"
           data-beskrivelse="${omFaget.toLowerCase()}"
           data-fagid="${fag.id}"
           tabindex="0"
           role="article"
           aria-label="${fag.title} - ${fag.fagkode}">
        <div class="card-header">
          <h3>${fag.title}</h3>
          <span class="fagkode">${fag.fagkode}</span>
        </div>
        <div class="card-body">
          <p>${preview || 'Ingen beskrivelse tilgjengelig'}</p>
          <button
            class="btn-details"
            onclick="ProgramfagCatalog.showDetails('${fag.id}')"
          >
            Les mer →
          </button>
        </div>
      </div>
    `;
  },

  /**
   * Søkefunksjonalitet
   * @param {Array} fag - Liste over alle fag
   */
  setupSearch: function(fag) {
    const searchInput = document.getElementById('programfag-search');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const cards = document.querySelectorAll('.programfag-card');
      const grid = document.getElementById('programfag-grid');
      let visibleCount = 0;

      cards.forEach(card => {
        const title = card.dataset.title;
        const fagkode = card.dataset.fagkode.toLowerCase();
        const beskrivelse = card.dataset.beskrivelse;

        // Søk i tittel, fagkode OG beskrivelse
        if (title.includes(query) || fagkode.includes(query) || beskrivelse.includes(query)) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Vis "Ingen resultater" melding hvis ingen treff
      let noResultsMsg = document.getElementById('no-results-message');

      if (visibleCount === 0 && query.length > 0) {
        if (!noResultsMsg) {
          noResultsMsg = document.createElement('div');
          noResultsMsg.id = 'no-results-message';
          noResultsMsg.className = 'no-results';
          noResultsMsg.innerHTML = `
            <p>Ingen fag matcher søket "<strong>${e.target.value}</strong>"</p>
            <p style="font-size: 0.9rem; color: #999; margin-top: 10px;">Prøv et annet søkeord eller fagkode</p>
          `;
          grid.parentNode.insertBefore(noResultsMsg, grid.nextSibling);
        } else {
          noResultsMsg.innerHTML = `
            <p>Ingen fag matcher søket "<strong>${e.target.value}</strong>"</p>
            <p style="font-size: 0.9rem; color: #999; margin-top: 10px;">Prøv et annet søkeord eller fagkode</p>
          `;
        }
      } else if (noResultsMsg) {
        noResultsMsg.remove();
      }
    });
  },

  /**
   * Vis detaljer for ett fag
   * @param {string} fagId - ID til faget
   */
  showDetails: function(fagId) {
    // Hent fag-data på nytt for å vise detaljer
    fetch(this.config.apiUrl)
      .then(response => response.json())
      .then(data => {
        const fag = data.fag.find(f => f.id === fagId);
        if (fag) {
          this.renderDetails(fag);
        }
      })
      .catch(error => {
        console.error('Feil ved lasting av detaljer:', error);
      });
  },

  /**
   * Vis detaljert faginfo i modal
   * @param {Object} fag - Fagdata
   */
  renderDetails: function(fag) {
    // Sjekk om modal allerede eksisterer
    let modal = document.getElementById('programfag-modal');

    if (!modal) {
      // Lag modal
      modal = document.createElement('div');
      modal.id = 'programfag-modal';
      modal.className = 'programfag-modal';
      document.body.appendChild(modal);
    }

    // Lag innhold for kompetansemål med accordion
    const kompetansemaal = fag.sections?.kompetansemaal || [];
    const kompetansemaalHTML = kompetansemaal.length > 0
      ? `<div class="accordion">
          <div class="accordion-header" onclick="ProgramfagCatalog.toggleAccordion(event)">
            <h3>Kompetansemål <span class="accordion-count">(${kompetansemaal.length})</span></h3>
            <span class="accordion-icon">▼</span>
          </div>
          <div class="accordion-content">
            <ul>${kompetansemaal.map(k => `<li>${k}</li>`).join('')}</ul>
          </div>
        </div>`
      : '';

    // Lag innhold for kjerneelementer
    const kjerneelementer = fag.sections?.kjerneelementer || [];
    const kjerneelementHTML = kjerneelementer.length > 0
      ? `<h3>Kjerneelementer</h3>${kjerneelementer.map(k =>
          `<div class="kjerneelement">
            <h4>${k.title}</h4>
            <p>${k.beskrivelse}</p>
          </div>`
        ).join('')}`
      : '';

    // Bilde hvis tilgjengelig
    const bildeHTML = fag.bilde
      ? `<div class="fag-bilde">
          <img src="${fag.bilde}" alt="${fag.title}" />
        </div>`
      : '';

    // Vimeo-video hvis tilgjengelig
    const vimeoHTML = fag.vimeo
      ? `<div class="vimeo-container">
          <iframe
            src="https://player.vimeo.com/video/${this.extractVimeoId(fag.vimeo)}"
            frameborder="0"
            allow="autoplay; fullscreen; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>`
      : '';

    // Relaterte fag HTML
    const relatedHTML = fag.related && fag.related.length > 0
      ? `<p class="related-info">Fordypning i lag med: <span class="related-badge-large">${fag.related.join(', ')}</span></p>`
      : '';

    modal.innerHTML = `
      <div class="modal-content">
        <button class="modal-close" onclick="ProgramfagCatalog.closeModal()">&times;</button>
        <h2>${fag.title}</h2>
        <p class="fagkode-large">${fag.fagkode}</p>
        ${relatedHTML}

        ${bildeHTML}
        ${vimeoHTML}

        <div class="modal-body">
          ${fag.sections?.omFaget ? `<p class="om-faget">${fag.sections.omFaget}</p>` : ''}
          ${kompetansemaalHTML}
          ${kjerneelementHTML}
        </div>

        <a href="https://sokeresultat.udir.no/finn-lareplan.html?query=${fag.fagkode}&source=Laereplan&fltypefiltermulti=L%C3%A6replan&filtervalues=all" target="_blank" class="btn-lareplan">Se full læreplan på udir.no →</a>
      </div>
    `;

    modal.style.display = 'flex';

    // Lås body scroll når modal er åpen
    document.body.style.overflow = 'hidden';

    // Lukk ved klikk utenfor innholdet
    modal.onclick = (e) => {
      if (e.target === modal) {
        this.closeModal();
      }
    };
  },

  /**
   * Lukk modal
   */
  closeModal: function() {
    const modal = document.getElementById('programfag-modal');
    if (modal) {
      modal.style.display = 'none';
      // Gjenopprett body scroll
      document.body.style.overflow = '';
    }
  },

  /**
   * Hent Vimeo ID fra URL
   * @param {string} url - Vimeo URL
   * @returns {string} Vimeo ID
   */
  extractVimeoId: function(url) {
    const match = url.match(/vimeo\.com\/(\d+)/);
    return match ? match[1] : '';
  },

  /**
   * Toggle accordion åpen/lukket
   * @param {Event} event - Click event
   */
  toggleAccordion: function(event) {
    const header = event.currentTarget;
    const accordion = header.parentElement;
    const content = accordion.querySelector('.accordion-content');
    const icon = header.querySelector('.accordion-icon');

    // Toggle open class
    accordion.classList.toggle('open');

    // Roter ikon
    if (accordion.classList.contains('open')) {
      icon.textContent = '▲';
    } else {
      icon.textContent = '▼';
    }
  }
};

// Keyboard navigation
document.addEventListener('keydown', (e) => {
  // ESC - Lukk modal
  if (e.key === 'Escape') {
    ProgramfagCatalog.closeModal();
  }

  // Enter eller Space - Åpne fagkort når det er fokusert
  if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('programfag-card')) {
    e.preventDefault();
    const fagId = e.target.dataset.fagid;
    if (fagId) {
      ProgramfagCatalog.showDetails(fagId);
    }
  }
});
