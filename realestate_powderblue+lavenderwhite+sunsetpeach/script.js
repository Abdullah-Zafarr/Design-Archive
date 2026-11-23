(() => {
  'use strict';

  const RESIDENCES = [
    {
      id: 'lunar-oasis-villa',
      index: '01',
      name: 'Lunar Oasis Villa',
      address: '1874 Forest Haven Rd, Arizona',
      location: 'Arizona',
      type: 'Villa',
      buyPrice: 485000,
      rentPrice: 3400,
      priceTier: 'tier-1',
      beds: 3,
      baths: 2,
      sqft: 1260,
      lotSqft: 14800,
      orientation: 'South-Southeast',
      solarShgc: '0.24 Low-E',
      cisternGal: '4,200 gal',
      photo: './assets/lunar-villa.jpg',
      summary: 'Cantilevered desert shell with curved low-iron glass walls, warm twilight cove illumination, and integrated agave courtyard.',
      palette: { sky: '#689EE4', shell: '#E9E8F8', glow: '#F5B69E', ground: '#192440' },
      svgVariant: 'cantilever'
    },
    {
      id: 'saguaro-rim-pavilion',
      index: '02',
      name: 'Saguaro Rim Pavilion',
      address: '4120 Sabino Canyon, Arizona',
      location: 'Arizona',
      type: 'Pavilion',
      buyPrice: 440000,
      rentPrice: 3100,
      priceTier: 'tier-1',
      beds: 2,
      baths: 2,
      sqft: 1480,
      lotSqft: 18400,
      orientation: 'East-Southeast',
      solarShgc: '0.22 Triple',
      cisternGal: '3,800 gal',
      photo: null,
      summary: 'Single-level board-formed pavilion anchored into granite outcrops with deep 14-foot shaded verandas and still cooling basin.',
      palette: { sky: '#8DB9F0', shell: '#F5F5FC', glow: '#F5B69E', ground: '#233A5E' },
      svgVariant: 'pavilion'
    },
    {
      id: 'moab-sandstone-ridge',
      index: '03',
      name: 'Moab Sandstone Ridge',
      address: '890 Red Mesa Trail, Utah',
      location: 'Utah',
      type: 'Cliff House',
      buyPrice: 690000,
      rentPrice: 4500,
      priceTier: 'tier-2',
      beds: 4,
      baths: 3,
      sqft: 2340,
      lotSqft: 26500,
      orientation: 'West-Southwest',
      solarShgc: '0.21 Acoustic',
      cisternGal: '5,000 gal',
      photo: null,
      summary: 'Elevated two-wing cliff residence spanning a red-rock arroyo with thermal-mass floors and recessed dusk light galleries.',
      palette: { sky: '#689EE4', shell: '#E9E8F8', glow: '#F5B69E', ground: '#192440' },
      svgVariant: 'cliff'
    },
    {
      id: 'carmel-tide-courtyard',
      index: '04',
      name: 'Carmel Tide Courtyard',
      address: '215 Garrapata Bluffs, California',
      location: 'California',
      type: 'Courtyard',
      buyPrice: 1180000,
      rentPrice: 6200,
      priceTier: 'tier-3',
      beds: 3,
      baths: 3,
      sqft: 2120,
      lotSqft: 12900,
      orientation: 'West Coastal',
      solarShgc: '0.26 Marine',
      cisternGal: '3,400 gal',
      photo: null,
      summary: 'Wind-sheltered coastal concrete courtyard framed around native cypress and salt-tolerant mist gardens above the Pacific shelf.',
      palette: { sky: '#8DB9F0', shell: '#E9E8F8', glow: '#F5B69E', ground: '#28245C' },
      svgVariant: 'courtyard'
    },
    {
      id: 'ocotillo-glass-house',
      index: '05',
      name: 'Ocotillo Glass House',
      address: '740 Arroyo Crest, New Mexico',
      location: 'New Mexico',
      type: 'Villa',
      buyPrice: 385000,
      rentPrice: 2750,
      priceTier: 'tier-1',
      beds: 2,
      baths: 2,
      sqft: 1190,
      lotSqft: 16200,
      orientation: 'True South',
      solarShgc: '0.23 Low-E',
      cisternGal: '4,600 gal',
      photo: null,
      summary: 'Compact high-desert villa calibrated to high-altitude winter sun angles with radiant concrete floors and flush terrace tracks.',
      palette: { sky: '#689EE4', shell: '#F5F5FC', glow: '#F5B69E', ground: '#192440' },
      svgVariant: 'desert-glass'
    },
    {
      id: 'sedona-mesa-cantilever',
      index: '06',
      name: 'Sedona Mesa Cantilever',
      address: '309 Cathedral Wash, Arizona',
      location: 'Arizona',
      type: 'Cliff House',
      buyPrice: 820000,
      rentPrice: 5100,
      priceTier: 'tier-2',
      beds: 3,
      baths: 3,
      sqft: 2410,
      lotSqft: 22100,
      orientation: 'South-Southwest',
      solarShgc: '0.24 Triple',
      cisternGal: '4,900 gal',
      photo: null,
      summary: 'Stepped limestone and poured concrete residence projecting 18 feet over juniper scrub with unobstructed dark-sky stargazing deck.',
      palette: { sky: '#8DB9F0', shell: '#E9E8F8', glow: '#F5B69E', ground: '#233A5E' },
      svgVariant: 'mesa'
    }
  ];

  // Filter state: hero top bar keeps initial reference labels visible while
  // Chapter 1 shows all 6 residences until the user interacts with a filter/search.
  const state = {
    mode: 'buy',
    activeLocation: 'all',
    activeType: 'all',
    activePrice: 'all',
    searchQuery: '',
    savedOnly: false,
    savedIds: new Set(['lunar-oasis-villa'])
  };

  const els = {
    modeBuy: document.getElementById('mode-buy'),
    modeRent: document.getElementById('mode-rent'),
    valLocation: document.getElementById('val-location'),
    valType: document.getElementById('val-type'),
    valPrice: document.getElementById('val-price'),
    heroSearchForm: document.getElementById('hero-search-form'),
    heroSearchInput: document.getElementById('hero-search-input'),
    heroExpandVilla: document.getElementById('hero-expand-villa'),
    heroViewDetails: document.getElementById('hero-view-details'),
    railSearchBtn: document.getElementById('rail-search-btn'),
    railSavedBtn: document.getElementById('rail-saved-btn'),
    railSavedBadge: document.getElementById('rail-saved-badge'),
    railThemeBtn: document.getElementById('rail-theme-btn'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    mobileDrawer: document.getElementById('mobile-drawer'),
    mobileSavedToggle: document.getElementById('mobile-saved-toggle'),
    mobileSavedCount: document.getElementById('mobile-saved-count'),
    residenceGrid: document.getElementById('residence-grid'),
    residenceEmpty: document.getElementById('residence-empty'),
    activeFilterSummary: document.getElementById('active-filter-summary'),
    resetFiltersBtn: document.getElementById('reset-filters-btn'),
    emptyResetBtn: document.getElementById('empty-reset-btn'),
    tabButtons: Array.from(document.querySelectorAll('.tab-btn')),
    drawerBackdrop: document.getElementById('drawer-backdrop'),
    specDrawer: document.getElementById('spec-drawer'),
    drawerClose: document.getElementById('drawer-close'),
    drawerEyebrow: document.getElementById('drawer-eyebrow'),
    drawerTitle: document.getElementById('drawer-title'),
    drawerBody: document.getElementById('drawer-body'),
    viewingForm: document.getElementById('viewing-form'),
    leadName: document.getElementById('lead-name'),
    leadEmail: document.getElementById('lead-email'),
    leadResidence: document.getElementById('lead-residence'),
    leadInquiry: document.getElementById('lead-inquiry'),
    leadNotes: document.getElementById('lead-notes'),
    errName: document.getElementById('err-name'),
    errEmail: document.getElementById('err-email'),
    formConfirmation: document.getElementById('form-confirmation'),
    confirmRef: document.getElementById('confirm-ref'),
    confirmCopy: document.getElementById('confirm-copy'),
    confirmResetBtn: document.getElementById('confirm-reset-btn')
  };

  function formatPrice(item) {
    if (state.mode === 'rent') {
      return `$${item.rentPrice.toLocaleString('en-US')}/mo`;
    }
    return `$${item.buyPrice.toLocaleString('en-US')}`;
  }

  function buildArchitecturalSvg(item) {
    const { sky, shell, glow, ground } = item.palette;
    if (item.svgVariant === 'pavilion') {
      return `
        <svg class="card-svg-art" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.name} architectural elevation">
          <defs>
            <linearGradient id="sky-${item.id}" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${sky}" />
              <stop offset="100%" stop-color="${shell}" stop-opacity="0.72" />
            </linearGradient>
          </defs>
          <rect width="400" height="250" fill="url(#sky-${item.id})" />
          <path d="M0 198 L400 198 L400 250 L0 250 Z" fill="${ground}" />
          <rect x="44" y="130" width="312" height="10" rx="5" fill="${shell}" />
          <rect x="64" y="140" width="272" height="58" fill="${glow}" fill-opacity="0.88" />
          <rect x="116" y="140" width="8" height="58" fill="${ground}" fill-opacity="0.65" />
          <rect x="220" y="140" width="8" height="58" fill="${ground}" fill-opacity="0.65" />
          <rect x="296" y="140" width="40" height="58" fill="${shell}" />
          <rect x="52" y="198" width="296" height="8" fill="${sky}" fill-opacity="0.45" />
        </svg>
      `;
    }
    if (item.svgVariant === 'courtyard') {
      return `
        <svg class="card-svg-art" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.name} architectural elevation">
          <rect width="400" height="250" fill="${sky}" />
          <path d="M0 194 Q120 184 220 192 T400 190 L400 250 L0 250 Z" fill="${ground}" />
          <rect x="38" y="114" width="136" height="80" rx="14" fill="${shell}" />
          <rect x="226" y="114" width="136" height="80" rx="14" fill="${shell}" />
          <rect x="56" y="130" width="96" height="54" rx="8" fill="${glow}" />
          <rect x="248" y="130" width="96" height="54" rx="8" fill="${glow}" />
          <rect x="164" y="146" width="72" height="48" fill="${ground}" fill-opacity="0.7" />
          <circle cx="200" cy="172" r="14" fill="${glow}" fill-opacity="0.9" />
        </svg>
      `;
    }
    if (item.svgVariant === 'cliff') {
      return `
        <svg class="card-svg-art" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.name} architectural elevation">
          <rect width="400" height="250" fill="${sky}" />
          <path d="M0 164 L140 156 L195 206 L400 198 L400 250 L0 250 Z" fill="${ground}" />
          <rect x="64" y="100" width="236" height="58" rx="8" fill="${shell}" />
          <rect x="172" y="112" width="114" height="36" rx="4" fill="${glow}" />
          <rect x="82" y="112" width="74" height="36" rx="4" fill="${glow}" fill-opacity="0.72" />
          <rect x="176" y="158" width="18" height="44" fill="${shell}" />
          <rect x="268" y="158" width="14" height="40" fill="${shell}" />
          <line x1="226" y1="112" x2="226" y2="148" stroke="${ground}" stroke-width="3" stroke-opacity="0.6" />
        </svg>
      `;
    }
    if (item.svgVariant === 'desert-glass') {
      return `
        <svg class="card-svg-art" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.name} architectural elevation">
          <rect width="400" height="250" fill="${sky}" />
          <path d="M0 198 Q180 186 400 196 L400 250 L0 250 Z" fill="${ground}" />
          <path d="M56 122 L344 106 L344 118 L56 134 Z" fill="${shell}" />
          <rect x="84" y="132" width="224" height="66" fill="${glow}" fill-opacity="0.92" />
          <rect x="148" y="132" width="12" height="66" fill="${shell}" />
          <rect x="240" y="132" width="12" height="66" fill="${shell}" />
          <rect x="52" y="196" width="296" height="6" fill="${shell}" fill-opacity="0.8" />
        </svg>
      `;
    }
    if (item.svgVariant === 'mesa') {
      return `
        <svg class="card-svg-art" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.name} architectural elevation">
          <rect width="400" height="250" fill="${sky}" />
          <path d="M0 190 L95 170 L180 184 L310 176 L400 194 L400 250 L0 250 Z" fill="${ground}" />
          <rect x="52" y="132" width="174" height="52" rx="10" fill="${shell}" />
          <rect x="68" y="142" width="142" height="32" rx="5" fill="${glow}" />
          <rect x="164" y="88" width="188" height="48" rx="12" fill="${shell}" />
          <rect x="180" y="98" width="156" height="28" rx="6" fill="${glow}" fill-opacity="0.94" />
          <line x1="258" y1="98" x2="258" y2="126" stroke="${ground}" stroke-width="3" stroke-opacity="0.6" />
        </svg>
      `;
    }
    return `
      <svg class="card-svg-art" viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${item.name} architectural elevation">
        <rect width="400" height="250" fill="${sky}" />
        <path d="M0 196 L120 186 L245 198 L400 180 L400 250 L0 250 Z" fill="${ground}" />
        <path d="M96 102 C96 86 110 78 134 78 L314 78 C338 78 352 90 352 108 L352 126 L134 126 C110 126 96 116 96 102 Z" fill="${shell}" />
        <rect x="150" y="90" width="176" height="32" rx="16" fill="${glow}" />
        <path d="M48 140 L330 140 C342 140 350 148 350 160 L350 196 L64 196 L64 156 C64 146 56 140 48 140 Z" fill="${shell}" />
        <rect x="86" y="152" width="194" height="42" rx="10" fill="${glow}" fill-opacity="0.9" />
        <line x1="158" y1="152" x2="158" y2="194" stroke="${ground}" stroke-width="3" stroke-opacity="0.65" />
        <line x1="226" y1="152" x2="226" y2="194" stroke="${ground}" stroke-width="3" stroke-opacity="0.65" />
      </svg>
    `;
  }

  function getFilteredResidences() {
    const query = state.searchQuery.trim().toLowerCase();
    return RESIDENCES.filter((item) => {
      if (state.savedOnly && !state.savedIds.has(item.id)) return false;
      if (state.activeLocation !== 'all' && item.location !== state.activeLocation) return false;
      if (state.activeType !== 'all' && item.type !== state.activeType) return false;
      if (state.activePrice !== 'all' && item.priceTier !== state.activePrice) return false;
      if (query) {
        const hay = `${item.name} ${item.address} ${item.location} ${item.type} ${item.summary}`.toLowerCase();
        if (!hay.includes(query)) return false;
      }
      return true;
    });
  }

  function hasActiveFilter() {
    return (
      state.activeLocation !== 'all' ||
      state.activeType !== 'all' ||
      state.activePrice !== 'all' ||
      state.searchQuery.trim() !== '' ||
      state.savedOnly
    );
  }

  function updateSavedIndicators() {
    const count = state.savedIds.size;
    if (els.railSavedBadge) {
      els.railSavedBadge.textContent = String(count);
      els.railSavedBadge.hidden = count === 0;
    }
    if (els.mobileSavedCount) {
      els.mobileSavedCount.textContent = String(count);
    }
    if (els.railSavedBtn) {
      els.railSavedBtn.setAttribute('aria-pressed', String(state.savedOnly));
      els.railSavedBtn.classList.toggle('is-active', state.savedOnly);
    }
  }

  function renderResidences() {
    const items = getFilteredResidences();
    const modeLabel = state.mode === 'rent' ? 'Rent pricing' : 'Buy pricing';
    const savedSuffix = state.savedOnly ? ' · Saved only' : '';
    els.activeFilterSummary.textContent = `${modeLabel}${savedSuffix} · ${items.length} of ${RESIDENCES.length} residences`;
    els.resetFiltersBtn.hidden = !hasActiveFilter();

    if (items.length === 0) {
      els.residenceGrid.innerHTML = '';
      els.residenceEmpty.hidden = false;
      return;
    }

    els.residenceEmpty.hidden = true;
    els.residenceGrid.innerHTML = items.map((item) => {
      const isSaved = state.savedIds.has(item.id);
      const visualMarkup = item.photo
        ? `<img src="${item.photo}" alt="${item.name} exterior" class="card-photo" width="480" height="300" />`
        : buildArchitecturalSvg(item);

      return `
        <article class="residence-card" data-id="${item.id}">
          <div class="card-visual">
            ${visualMarkup}
            <div class="card-badge-row">
              <span class="card-type-pill">${item.type}</span>
              <button
                type="button"
                class="card-save-btn"
                data-save-id="${item.id}"
                aria-label="Save ${item.name} to shortlist"
                aria-pressed="${isSaved}"
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="${isSaved ? 'currentColor' : 'none'}" aria-hidden="true">
                  <path d="M10 16.5C10 16.5 3.5 12.4 3.5 7.5C3.5 5.45 5.1 3.75 7.15 3.75C8.35 3.75 9.4 4.35 10 5.25C10.6 4.35 11.65 3.75 12.85 3.75C14.9 3.75 16.5 5.45 16.5 7.5C16.5 12.4 10 16.5 10 16.5Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
                </svg>
              </button>
            </div>
          </div>

          <div class="card-body">
            <div class="card-top-row">
              <h3 class="card-title">${item.name}</h3>
              <span class="card-price tabular">${formatPrice(item)}</span>
            </div>
            <p class="card-location">${item.address}</p>
            <div class="card-specs tabular">
              <span>${item.beds} Beds</span>
              <span>${item.baths} Baths</span>
              <span>${item.sqft.toLocaleString('en-US')} sq ft</span>
            </div>
            <button type="button" class="card-inspect-btn" data-inspect-id="${item.id}">
              <span>Inspect Specs</span>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  function syncTabButtons() {
    els.tabButtons.forEach((btn) => {
      const match = btn.dataset.type === state.activeType;
      btn.classList.toggle('is-active', match);
      btn.setAttribute('aria-selected', String(match));
    });
  }

  function setMode(nextMode) {
    state.mode = nextMode;
    const isBuy = nextMode === 'buy';
    els.modeBuy.classList.toggle('is-active', isBuy);
    els.modeBuy.setAttribute('aria-pressed', String(isBuy));
    els.modeRent.classList.toggle('is-active', !isBuy);
    els.modeRent.setAttribute('aria-pressed', String(!isBuy));

    // Update price dropdown labels to match Buy vs Rent currency scale
    const priceItems = document.querySelectorAll('#menu-price li');
    const labels = isBuy
      ? ['All Budgets', '$200K – $500K', '$500K – $900K', '$900K+']
      : ['All Budgets', '$2.5K – $3.8K/mo', '$3.8K – $5.5K/mo', '$5.5K+/mo'];
    priceItems.forEach((li, idx) => {
      if (labels[idx]) li.textContent = labels[idx];
      if (li.getAttribute('aria-selected') === 'true') {
        els.valPrice.textContent = li.textContent;
      }
    });

    renderResidences();
  }

  function resetAllFilters() {
    state.activeLocation = 'all';
    state.activeType = 'all';
    state.activePrice = 'all';
    state.searchQuery = '';
    state.savedOnly = false;
    els.heroSearchInput.value = '';
    els.valLocation.textContent = 'All Locations';
    els.valType.textContent = 'All Types';
    els.valPrice.textContent = 'All Budgets';
    document.querySelectorAll('.dropdown-menu li').forEach((li) => {
      li.setAttribute('aria-selected', String(li.dataset.value === 'all'));
    });
    syncTabButtons();
    updateSavedIndicators();
    renderResidences();
  }

  // Dropdown management
  function closeAllDropdowns() {
    document.querySelectorAll('.filter-dropdown').forEach((group) => {
      const btn = group.querySelector('.filter-trigger');
      const menu = group.querySelector('.dropdown-menu');
      if (btn && menu) {
        btn.setAttribute('aria-expanded', 'false');
        menu.hidden = true;
      }
    });
  }

  document.querySelectorAll('.filter-dropdown').forEach((group) => {
    const filterKey = group.dataset.filterGroup;
    const trigger = group.querySelector('.filter-trigger');
    const menu = group.querySelector('.dropdown-menu');
    const valueEl = group.querySelector('.trigger-value');

    trigger.addEventListener('click', (ev) => {
      ev.stopPropagation();
      const wasOpen = trigger.getAttribute('aria-expanded') === 'true';
      closeAllDropdowns();
      if (!wasOpen) {
        trigger.setAttribute('aria-expanded', 'true');
        menu.hidden = false;
      }
    });

    const selectOption = (li) => {
      const val = li.dataset.value;
      menu.querySelectorAll('li').forEach((opt) => opt.setAttribute('aria-selected', 'false'));
      li.setAttribute('aria-selected', 'true');
      valueEl.textContent = li.textContent;

      if (filterKey === 'location') state.activeLocation = val;
      if (filterKey === 'type') {
        state.activeType = val;
        syncTabButtons();
      }
      if (filterKey === 'price') state.activePrice = val;

      closeAllDropdowns();
      renderResidences();
    };

    menu.querySelectorAll('li').forEach((li) => {
      li.addEventListener('click', () => selectOption(li));
      li.addEventListener('keydown', (ev) => {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          selectOption(li);
          trigger.focus();
        }
      });
    });
  });

  document.addEventListener('click', (ev) => {
    if (!ev.target.closest('.filter-dropdown')) {
      closeAllDropdowns();
    }
  });

  // Inspection Drawer
  let lastFocusedEl = null;

  function openDrawer(residenceId) {
    const item = RESIDENCES.find((r) => r.id === residenceId) || RESIDENCES[0];
    lastFocusedEl = document.activeElement;
    els.drawerEyebrow.textContent = `RESIDENCE ${item.index} · ${item.type.toUpperCase()}`;
    els.drawerTitle.textContent = item.name;

    const visualMarkup = item.photo
      ? `<img src="${item.photo}" alt="${item.name} twilight facade" width="440" height="275" />`
      : buildArchitecturalSvg(item);

    els.drawerBody.innerHTML = `
      <div class="drawer-visual">${visualMarkup}</div>
      <div class="drawer-price-row">
        <span class="drawer-price tabular">${formatPrice(item)}</span>
        <span class="drawer-pill">${item.location}</span>
      </div>
      <p class="drawer-summary">${item.summary}</p>
      <dl class="drawer-specs">
        <div class="drawer-spec-row">
          <dt>Address</dt>
          <dd>${item.address}</dd>
        </div>
        <div class="drawer-spec-row">
          <dt>Configuration</dt>
          <dd class="tabular">${item.beds} Beds · ${item.baths} Baths</dd>
        </div>
        <div class="drawer-spec-row">
          <dt>Conditioned Area</dt>
          <dd class="tabular">${item.sqft.toLocaleString('en-US')} sq ft</dd>
        </div>
        <div class="drawer-spec-row">
          <dt>Desert / Coastal Lot</dt>
          <dd class="tabular">${item.lotSqft.toLocaleString('en-US')} sq ft</dd>
        </div>
        <div class="drawer-spec-row">
          <dt>Solar Orientation</dt>
          <dd>${item.orientation}</dd>
        </div>
        <div class="drawer-spec-row">
          <dt>Glazing Spec</dt>
          <dd class="tabular">${item.solarShgc}</dd>
        </div>
        <div class="drawer-spec-row">
          <dt>Rainwater Cistern</dt>
          <dd class="tabular">${item.cisternGal}</dd>
        </div>
      </dl>
      <button type="button" class="drawer-tour-btn" data-book-residence="${item.name}">
        Request Private Viewing
      </button>
    `;

    els.drawerBackdrop.hidden = false;
    els.specDrawer.hidden = false;
    document.body.style.overflow = 'hidden';
    els.drawerClose.focus();
  }

  function closeDrawer() {
    els.drawerBackdrop.hidden = true;
    els.specDrawer.hidden = true;
    document.body.style.overflow = '';
    if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
      lastFocusedEl.focus();
    }
  }

  els.drawerClose.addEventListener('click', closeDrawer);
  els.drawerBackdrop.addEventListener('click', closeDrawer);
  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      closeAllDropdowns();
      if (!els.specDrawer.hidden) closeDrawer();
    }
  });

  els.drawerBody.addEventListener('click', (ev) => {
    const bookBtn = ev.target.closest('[data-book-residence]');
    if (!bookBtn) return;
    const residenceName = bookBtn.dataset.bookResidence;
    els.leadResidence.value = residenceName;
    closeDrawer();
    document.getElementById('viewing').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => els.leadName.focus(), 350);
  });

  // Event bindings
  els.modeBuy.addEventListener('click', () => setMode('buy'));
  els.modeRent.addEventListener('click', () => setMode('rent'));

  els.heroSearchInput.addEventListener('input', (ev) => {
    state.searchQuery = ev.target.value;
    renderResidences();
  });

  els.heroSearchForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    state.searchQuery = els.heroSearchInput.value;
    renderResidences();
    document.getElementById('residences').scrollIntoView({ behavior: 'smooth' });
  });

  els.heroExpandVilla.addEventListener('click', () => openDrawer('lunar-oasis-villa'));
  els.heroViewDetails.addEventListener('click', () => openDrawer('lunar-oasis-villa'));

  els.railSearchBtn.addEventListener('click', () => {
    els.heroSearchInput.focus();
  });

  els.railSavedBtn.addEventListener('click', () => {
    state.savedOnly = !state.savedOnly;
    updateSavedIndicators();
    renderResidences();
    document.getElementById('residences').scrollIntoView({ behavior: 'smooth' });
  });

  els.railThemeBtn.addEventListener('click', () => {
    const root = document.documentElement;
    const next = root.getAttribute('data-theme') === 'dusk' ? 'twilight' : 'dusk';
    root.setAttribute('data-theme', next);
    els.railThemeBtn.setAttribute('aria-pressed', String(next === 'dusk'));
  });

  els.mobileMenuBtn.addEventListener('click', () => {
    const expanded = els.mobileMenuBtn.getAttribute('aria-expanded') === 'true';
    els.mobileMenuBtn.setAttribute('aria-expanded', String(!expanded));
    els.mobileDrawer.hidden = expanded;
  });

  els.mobileDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      els.mobileMenuBtn.setAttribute('aria-expanded', 'false');
      els.mobileDrawer.hidden = true;
    });
  });

  els.mobileSavedToggle.addEventListener('click', () => {
    state.savedOnly = !state.savedOnly;
    updateSavedIndicators();
    renderResidences();
    els.mobileMenuBtn.setAttribute('aria-expanded', 'false');
    els.mobileDrawer.hidden = true;
    document.getElementById('residences').scrollIntoView({ behavior: 'smooth' });
  });

  els.tabButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      state.activeType = btn.dataset.type;
      els.valType.textContent = btn.dataset.type === 'all' ? 'All Types' : btn.dataset.type;
      document.querySelectorAll('#menu-type li').forEach((li) => {
        li.setAttribute('aria-selected', String(li.dataset.value === state.activeType));
      });
      syncTabButtons();
      renderResidences();
    });
  });

  els.resetFiltersBtn.addEventListener('click', resetAllFilters);
  els.emptyResetBtn.addEventListener('click', resetAllFilters);

  els.residenceGrid.addEventListener('click', (ev) => {
    const saveBtn = ev.target.closest('[data-save-id]');
    if (saveBtn) {
      const id = saveBtn.dataset.saveId;
      if (state.savedIds.has(id)) state.savedIds.delete(id);
      else state.savedIds.add(id);
      updateSavedIndicators();
      renderResidences();
      return;
    }

    const inspectBtn = ev.target.closest('[data-inspect-id]');
    if (inspectBtn) {
      openDrawer(inspectBtn.dataset.inspectId);
    }
  });

  // Viewing Inquiry Form Validation & Submission
  els.viewingForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let valid = true;

    const nameVal = els.leadName.value.trim();
    const emailVal = els.leadEmail.value.trim();

    if (nameVal.length < 2) {
      els.errName.textContent = 'Enter your full name to schedule a viewing.';
      els.errName.hidden = false;
      els.leadName.setAttribute('aria-invalid', 'true');
      valid = false;
    } else {
      els.errName.hidden = true;
      els.leadName.removeAttribute('aria-invalid');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      els.errEmail.textContent = 'Enter a valid email address for the architectural dossier.';
      els.errEmail.hidden = false;
      els.leadEmail.setAttribute('aria-invalid', 'true');
      valid = false;
    } else {
      els.errEmail.hidden = true;
      els.leadEmail.removeAttribute('aria-invalid');
    }

    if (!valid) return;

    const refNum = Math.floor(1000 + Math.random() * 8999);
    els.confirmRef.textContent = `REF LO-${refNum}`;
    els.confirmCopy.textContent = `Our Scottsdale architectural advisor will send the ${els.leadResidence.value} dossier (${els.leadInquiry.value}) to ${emailVal} within 48 hours.`;
    els.viewingForm.hidden = true;
    els.formConfirmation.hidden = false;
  });

  els.confirmResetBtn.addEventListener('click', () => {
    els.viewingForm.reset();
    els.formConfirmation.hidden = true;
    els.viewingForm.hidden = false;
    els.leadName.focus();
  });

  // Scroll reveals
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Initial render
  updateSavedIndicators();
  renderResidences();
})();
