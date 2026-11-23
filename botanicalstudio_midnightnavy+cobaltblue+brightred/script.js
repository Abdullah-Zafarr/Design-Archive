(() => {
  'use strict';

  const SPECIMENS = [
    {
      index: 'PLATE 01',
      code: 'FOLIO ANT-BB-014',
      symmetry: 'PENTAMEROUS · 72° AXIS',
      family: 'MALVACEAE · ANTWERP PRESS',
      binomial: 'Hibiscus syriacus',
      common: 'Blue Satin Rose of Sharon',
      note: 'Five broad obovate petals fold over a dense crimson central column. Deep Cobalt Blue veining radiates outward against matte Midnight Navy shadow folds.',
      bloom: 'July – September',
      geometry: '5 overlapping lobes',
      surface: '14.2% matte velvet',
      span: '88 mm diameter',
      pigments: { pb29: 58, pb28: 31, pr108: 11 },
      diagramType: 'hibiscus',
    },
    {
      index: 'PLATE 02',
      code: 'FOLIO ANT-BB-027',
      symmetry: 'CRUCIATE · 90° AXIS',
      family: 'PAPAVERACEAE · ANTWERP PRESS',
      binomial: 'Papaver rhoeas',
      common: 'Crimson Field Poppy',
      note: 'Four paper-thin pleated petals catch grazing light along crisp creased margins. Scarlet Cadmium Red fields lock tightly against deep navy basal blotches.',
      bloom: 'May – August',
      geometry: '4 cupped pleated petals',
      surface: '21.8% silk crepe',
      span: '74 mm diameter',
      pigments: { pb29: 46, pb28: 19, pr108: 35 },
      diagramType: 'poppy',
    },
    {
      index: 'PLATE 03',
      code: 'FOLIO ANT-BB-033',
      symmetry: 'ZYGOMORPHIC · BILATERAL',
      family: 'RANUNCULACEAE · ANTWERP PRESS',
      binomial: 'Delphinium elatum',
      common: 'Highland Cobalt Larkspur',
      note: 'Tiered sepals form a spurred bilateral silhouette along an erect raceme. Saturated Cobalt Blue surfaces shift into Midnight Navy near the central bee petal.',
      bloom: 'June – August',
      geometry: '5 spurred outer sepals',
      surface: '16.5% satin sheen',
      span: '62 mm floret',
      pigments: { pb29: 54, pb28: 41, pr108: 5 },
      diagramType: 'delphinium',
    },
    {
      index: 'PLATE 04',
      code: 'FOLIO ANT-BB-041',
      symmetry: 'ACTINOMORPHIC · 36° AXIS',
      family: 'RANUNCULACEAE · ANTWERP PRESS',
      binomial: 'Anemone coronaria',
      common: 'Midnight Windflower',
      note: 'Ten overlapping tepals frame a ring of dark anthers around a raised receptacle. Balanced navy and cobalt layers give way to sparse crimson stamen tips.',
      bloom: 'March – May',
      geometry: '10 radial tepal blades',
      surface: '11.4% dry matte',
      span: '80 mm diameter',
      pigments: { pb29: 61, pb28: 29, pr108: 10 },
      diagramType: 'anemone',
    },
  ];

  const MONOGRAPHS = [
    {
      tag: 'CHAPTER 01 · QUIET GROUND',
      heading: 'Midnight Navy Ground',
      hex: '#021861',
      swatch: '#021861',
      body: 'Midnight Navy occupies 60% of the visual field, establishing low-luminance stillness behind ruffled floral plates. At a relative luminance of 0.014, it drives crisp white editorial typography above a 13:1 contrast threshold while keeping saturated cobalt and red edges free of halation.',
      alloc: '60.0%',
      wave: '442 nm',
      contrast: '13.9 : 1',
      ratioLabel: '60 / 30 / 10',
      ratios: [60, 30, 10],
      caption: 'High-density navy ground compresses peripheral noise so the 10% Bright Red markers lock immediate focal attention.',
    },
    {
      tag: 'CHAPTER 02 · CHROMATIC BRIDGE',
      heading: 'Cobalt Blue Mid-Plane',
      hex: '#255DCE',
      swatch: '#255DCE',
      body: 'Cobalt Blue carries 30% of the structural field, translating deep navy recesses into luminous petal ridges. Across cool alabaster folios and dark conservatory panels, PB28 preserves steady tonal separation without competing against the primary focal signal.',
      alloc: '30.0%',
      wave: '472 nm',
      contrast: '5.5 : 1',
      ratioLabel: '30 / 60 / 10',
      ratios: [30, 60, 10],
      caption: 'Intermediate cobalt luminance bridges dark shadows and alabaster paper while preserving crisp petal vein geometry.',
    },
    {
      tag: 'CHAPTER 03 · FOCAL SIGNAL',
      heading: 'Bright Red Signal',
      hex: '#DE1110',
      swatch: '#DE1110',
      body: 'Bright Red is capped at 10% across registration squares, corner brackets, and interactive action states. Because warm PR108 opposes cool ultramarine on the chromatic wheel, minimal red accents register across the viewport within milliseconds.',
      alloc: '10.0%',
      wave: '634 nm',
      contrast: '5.0 : 1',
      ratioLabel: '10 / 60 / 30',
      ratios: [10, 60, 30],
      caption: 'Strict 10% restraint prevents chromatic fatigue and turns every corner bracket and button inversion into a clear landmark.',
    },
  ];

  function buildPetalSVG(type) {
    const NS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 320 320');
    svg.setAttribute('aria-hidden', 'true');

    const el = (tag, attrs) => {
      const node = document.createElementNS(NS, tag);
      for (const [k, v] of Object.entries(attrs)) {
        node.setAttribute(k, String(v));
      }
      return node;
    };

    // Drafting grid circle & crosshairs
    svg.appendChild(el('circle', { cx: 160, cy: 160, r: 126, fill: 'none', stroke: 'rgba(2,24,97,0.16)', 'stroke-width': 1, 'stroke-dasharray': '3 4' }));
    svg.appendChild(el('circle', { cx: 160, cy: 160, r: 78, fill: 'none', stroke: 'rgba(2,24,97,0.14)', 'stroke-width': 1 }));
    svg.appendChild(el('line', { x1: 20, y1: 160, x2: 300, y2: 160, stroke: 'rgba(2,24,97,0.14)', 'stroke-width': 1 }));
    svg.appendChild(el('line', { x1: 160, y1: 20, x2: 160, y2: 300, stroke: 'rgba(2,24,97,0.14)', 'stroke-width': 1 }));

    if (type === 'hibiscus') {
      for (let i = 0; i < 5; i += 1) {
        const angle = i * 72 - 90;
        const g = el('g', { transform: `rotate(${angle} 160 160)` });
        g.appendChild(el('path', {
          d: 'M160 154 C198 128 228 74 186 42 C164 26 146 32 134 46 C106 80 132 130 160 154 Z',
          fill: i % 2 === 0 ? 'rgba(37,93,206,0.14)' : 'rgba(2,24,97,0.08)',
          stroke: '#021861',
          'stroke-width': 1.4,
        }));
        g.appendChild(el('path', { d: 'M160 150 Q164 98 162 42', fill: 'none', stroke: '#255DCE', 'stroke-width': 1.1 }));
        g.appendChild(el('path', { d: 'M160 144 Q146 106 142 62', fill: 'none', stroke: '#255DCE', 'stroke-width': 0.85 }));
        g.appendChild(el('path', { d: 'M160 144 Q180 106 184 62', fill: 'none', stroke: '#255DCE', 'stroke-width': 0.85 }));
        svg.appendChild(g);
      }
      svg.appendChild(el('circle', { cx: 160, cy: 160, r: 14, fill: '#DE1110' }));
      svg.appendChild(el('circle', { cx: 160, cy: 160, r: 5, fill: '#F2F5FC' }));
    } else if (type === 'poppy') {
      for (let i = 0; i < 4; i += 1) {
        const angle = i * 90 + 45;
        const g = el('g', { transform: `rotate(${angle} 160 160)` });
        g.appendChild(el('path', {
          d: 'M160 160 C216 142 238 80 198 46 C176 28 144 28 122 46 C82 80 104 142 160 160 Z',
          fill: i % 2 === 0 ? 'rgba(222,17,16,0.16)' : 'rgba(37,93,206,0.12)',
          stroke: i % 2 === 0 ? '#DE1110' : '#021861',
          'stroke-width': 1.5,
        }));
        g.appendChild(el('path', { d: 'M160 152 L160 44', fill: 'none', stroke: '#021861', 'stroke-width': 1, 'stroke-dasharray': '4 3' }));
        svg.appendChild(g);
      }
      svg.appendChild(el('circle', { cx: 160, cy: 160, r: 24, fill: '#021861' }));
      svg.appendChild(el('circle', { cx: 160, cy: 160, r: 8, fill: '#DE1110' }));
    } else if (type === 'delphinium') {
      const angles = [-72, -32, 0, 32, 72];
      angles.forEach((angle, idx) => {
        const g = el('g', { transform: `rotate(${angle} 160 168)` });
        g.appendChild(el('path', {
          d: 'M160 164 C182 126 184 74 160 42 C136 74 138 126 160 164 Z',
          fill: idx === 2 ? 'rgba(37,93,206,0.22)' : 'rgba(2,24,97,0.08)',
          stroke: '#021861',
          'stroke-width': 1.4,
        }));
        g.appendChild(el('line', { x1: 160, y1: 160, x2: 160, y2: 52, stroke: '#255DCE', 'stroke-width': 1 }));
        svg.appendChild(g);
      });
      svg.appendChild(el('path', { d: 'M160 168 L160 278', stroke: '#021861', 'stroke-width': 1.6 }));
      svg.appendChild(el('rect', { x: 152, y: 156, width: 16, height: 16, fill: '#DE1110', transform: 'rotate(45 160 164)' }));
    } else {
      for (let i = 0; i < 10; i += 1) {
        const angle = i * 36;
        const g = el('g', { transform: `rotate(${angle} 160 160)` });
        g.appendChild(el('path', {
          d: 'M160 156 C174 126 176 74 160 44 C144 74 146 126 160 156 Z',
          fill: i % 2 === 0 ? 'rgba(37,93,206,0.16)' : 'rgba(2,24,97,0.06)',
          stroke: '#021861',
          'stroke-width': 1.25,
        }));
        svg.appendChild(g);
      }
      svg.appendChild(el('circle', { cx: 160, cy: 160, r: 22, fill: '#021861' }));
      for (let s = 0; s < 12; s += 1) {
        const rad = (s * 30 * Math.PI) / 180;
        const sx = 160 + Math.cos(rad) * 28;
        const sy = 160 + Math.sin(rad) * 28;
        svg.appendChild(el('circle', { cx: sx.toFixed(1), cy: sy.toFixed(1), r: 2.5, fill: '#DE1110' }));
      }
    }

    // Precision registration dot
    svg.appendChild(el('rect', { x: 276, y: 276, width: 8, height: 8, fill: '#DE1110' }));
    return svg;
  }

  // Header scroll condensation
  const header = document.getElementById('site-header');
  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  // Mobile drawer
  const menuToggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('drawer-backdrop');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const setDrawerOpen = (open) => {
    if (!drawer || !backdrop || !menuToggle) return;
    drawer.hidden = !open;
    backdrop.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) {
      drawerClose?.focus();
    }
  };

  menuToggle?.addEventListener('click', () => setDrawerOpen(true));
  drawerClose?.addEventListener('click', () => {
    setDrawerOpen(false);
    menuToggle?.focus();
  });
  backdrop?.addEventListener('click', () => setDrawerOpen(false));
  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => setDrawerOpen(false));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && !drawer.hidden) {
      setDrawerOpen(false);
      menuToggle?.focus();
    }
  });

  // Specimen Archive Switcher
  const plateTabs = document.querySelectorAll('.plate-tab');
  const specimenPanel = document.getElementById('specimen-panel');
  const svgHost = document.getElementById('specimen-svg-host');

  const renderSpecimen = (index) => {
    const item = SPECIMENS[index];
    if (!item || !svgHost) return;

    plateTabs.forEach((tab, idx) => {
      const active = idx === index;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    if (specimenPanel) {
      specimenPanel.setAttribute('aria-labelledby', `tab-plate-${index + 1}`);
    }

    document.getElementById('plate-code').textContent = item.code;
    document.getElementById('plate-symmetry').textContent = item.symmetry;
    document.getElementById('plate-family').textContent = item.family;
    document.getElementById('plate-binomial').textContent = item.binomial;
    document.getElementById('plate-common').textContent = item.common;
    document.getElementById('plate-index').textContent = item.index;
    document.getElementById('plate-note').textContent = item.note;

    document.getElementById('spec-bloom').textContent = item.bloom;
    document.getElementById('spec-geometry').textContent = item.geometry;
    document.getElementById('spec-surface').textContent = item.surface;
    document.getElementById('spec-span').textContent = item.span;

    document.getElementById('bar-pb29').style.transform = `scaleX(${item.pigments.pb29 / 100})`;
    document.getElementById('bar-pb28').style.transform = `scaleX(${item.pigments.pb28 / 100})`;
    document.getElementById('bar-pr108').style.transform = `scaleX(${item.pigments.pr108 / 100})`;

    document.getElementById('pct-pb29').textContent = `${item.pigments.pb29}%`;
    document.getElementById('pct-pb28').textContent = `${item.pigments.pb28}%`;
    document.getElementById('pct-pr108').textContent = `${item.pigments.pr108}%`;

    svgHost.replaceChildren(buildPetalSVG(item.diagramType));
  };

  plateTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const idx = Number(tab.dataset.plate);
      renderSpecimen(idx);
    });
  });
  renderSpecimen(0);

  // Monograph Ledger Switcher
  const monoTabs = document.querySelectorAll('.ledger-row');
  const monoPanel = document.getElementById('monograph-detail');

  const renderMonograph = (index) => {
    const item = MONOGRAPHS[index];
    if (!item) return;

    monoTabs.forEach((btn, idx) => {
      const active = idx === index;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    if (monoPanel) {
      monoPanel.setAttribute('aria-labelledby', `mono-tab-${index}`);
    }

    document.getElementById('mono-tag').textContent = item.tag;
    document.getElementById('mono-heading').textContent = item.heading;
    document.getElementById('mono-hex').textContent = item.hex;
    document.getElementById('mono-swatch').style.backgroundColor = item.swatch;
    document.getElementById('mono-body').textContent = item.body;
    document.getElementById('mono-alloc').textContent = item.alloc;
    document.getElementById('mono-wave').textContent = item.wave;
    document.getElementById('mono-contrast').textContent = item.contrast;
    document.getElementById('mono-ratio-label').textContent = item.ratioLabel;
    document.getElementById('mono-caption').textContent = item.caption;

    document.getElementById('bench-navy').style.flexGrow = String(item.ratios[0]);
    document.getElementById('bench-cobalt').style.flexGrow = String(item.ratios[1]);
    document.getElementById('bench-red').style.flexGrow = String(item.ratios[2]);
  };

  monoTabs.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.monograph);
      renderMonograph(idx);
    });
  });
  renderMonograph(0);

  // Reservation Form & Live Summary
  const form = document.getElementById('reservation-form');
  const slip = document.getElementById('confirmation-slip');
  const resetBtn = document.getElementById('reset-form-btn');

  const nameInput = document.getElementById('visitor-name');
  const emailInput = document.getElementById('visitor-email');
  const typeSelect = document.getElementById('reservation-type');
  const plateSelect = document.getElementById('plate-select');
  const formatSelect = document.getElementById('format-select');
  const dateInput = document.getElementById('visit-date');
  const dateWrap = document.getElementById('date-field-wrap');

  const formatLabels = {
    unframed: 'Unframed Archival Folio · 50 × 70 cm',
    framed: 'Framed in Ebonised Oak · 54 × 74 cm',
    viewing: 'Private Conservatory Study Viewing',
  };

  const syncSummary = () => {
    if (!plateSelect || !formatSelect) return;
    const selectedOpt = formatSelect.options[formatSelect.selectedIndex];
    const price = selectedOpt?.dataset.price || '0';
    const formatKey = formatSelect.value;

    document.getElementById('summary-plate').textContent = plateSelect.value;
    document.getElementById('summary-price').textContent = `€${price}`;
    document.getElementById('summary-format').textContent = formatLabels[formatKey] || '';

    const needsDate = typeSelect?.value !== 'print-only';
    if (dateWrap) {
      dateWrap.style.opacity = needsDate ? '1' : '0.55';
    }
    if (!needsDate && dateInput) {
      dateInput.setAttribute('aria-invalid', 'false');
      document.getElementById('error-date').textContent = '';
    }
  };

  plateSelect?.addEventListener('change', syncSummary);
  formatSelect?.addEventListener('change', syncSummary);
  typeSelect?.addEventListener('change', () => {
    if (typeSelect.value === 'visit-only' && formatSelect) {
      formatSelect.value = 'viewing';
    } else if (typeSelect.value !== 'visit-only' && formatSelect?.value === 'viewing') {
      formatSelect.value = 'unframed';
    }
    syncSummary();
  });

  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }
  syncSummary();

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const needsDate = typeSelect.value !== 'print-only';
    const dateVal = dateInput.value;

    let valid = true;

    const errName = document.getElementById('error-name');
    const errEmail = document.getElementById('error-email');
    const errDate = document.getElementById('error-date');

    if (nameVal.length < 2) {
      errName.textContent = 'Enter a full name of at least 2 characters.';
      nameInput.setAttribute('aria-invalid', 'true');
      valid = false;
    } else {
      errName.textContent = '';
      nameInput.setAttribute('aria-invalid', 'false');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      errEmail.textContent = 'Enter a valid email address.';
      emailInput.setAttribute('aria-invalid', 'true');
      valid = false;
    } else {
      errEmail.textContent = '';
      emailInput.setAttribute('aria-invalid', 'false');
    }

    if (needsDate && !dateVal) {
      errDate.textContent = 'Select a preferred conservatory viewing date.';
      dateInput.setAttribute('aria-invalid', 'true');
      valid = false;
    } else {
      errDate.textContent = '';
      dateInput.setAttribute('aria-invalid', 'false');
    }

    if (!valid) return;

    const selectedOpt = formatSelect.options[formatSelect.selectedIndex];
    const price = selectedOpt?.dataset.price || '0';
    const plateNum = String(plateSelect.selectedIndex + 1).padStart(2, '0');
    const editionNum = String(Math.floor(12 + (nameVal.length * 3) % 36)).padStart(3, '0');

    document.getElementById('slip-ref').textContent = `BB-ANT-P${plateNum}-${editionNum}`;
    document.getElementById('slip-name').textContent = nameVal;
    document.getElementById('slip-plate').textContent = plateSelect.value;
    document.getElementById('slip-format').textContent = `${formatLabels[formatSelect.value]} — €${price}`;
    document.getElementById('slip-date').textContent = needsDate ? dateVal : 'Courier dispatch (Antwerp)';

    form.hidden = true;
    slip.hidden = false;
    resetBtn?.focus();
  });

  resetBtn?.addEventListener('click', () => {
    slip.hidden = true;
    form.hidden = false;
    form.reset();
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }
    syncSummary();
    nameInput?.focus();
  });

  // Scroll Reveal Observer
  const reveals = document.querySelectorAll('.reveal');
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
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
})();
