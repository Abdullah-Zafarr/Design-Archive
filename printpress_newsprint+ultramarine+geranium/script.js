'use strict';

/**
 * Edition definitions for Figures 01 through 08.
 * Each entry specifies deterministic harmonic wave parameters for both ink plates.
 */
const EDITIONS = {
  1: {
    num: 1,
    numeral: '№ 01',
    word: 'ONE',
    name: 'Monomial Lissajous',
    summary:
      'Seventy-two Ultramarine outer elliptical bands weave around sixty-four Geranium phase-shifted quadrature waves.',
    ratioTag: '1 : 1 QUADRATURE',
    paramsText: 'fx 1 : fy 1 / φ 0.78 rad',
    stock: '300 gsm Munken Lynx Uncoated',
    inks: 'Pantone 286 U + Pantone 1788 U',
    remaining: 9,
    total: 80,
    price: 180,
    blue: { count: 72, ax0: 210, ax1: 350, ay0: 142, ay1: 180, fx: 1, fy: 1, third: -0.04, phaseSpan: 0.55, cosTerm: 0, yOffset: 0 },
    red: { count: 64, ax0: 168, ax1: 288, ay0: 112, ay1: 148, fx: 1, fy: 2, third: -0.04, phaseSpan: 0.30, cosTerm: 38, yOffset: 10 },
  },
  2: {
    num: 2,
    numeral: '№ 02',
    word: 'TWO',
    name: 'Biaxial Dipole',
    summary:
      'Twin vertical harmonic nodes compress through a central pinch while Geranium rosettes flare across both wings.',
    ratioTag: '2 : 3 DIPOLE',
    paramsText: 'fx 2 : fy 3 / φ 0.45 rad',
    stock: '300 gsm Munken Lynx Uncoated',
    inks: 'Pantone 286 U + Pantone 1788 U',
    remaining: 22,
    total: 80,
    price: 190,
    blue: { count: 76, ax0: 230, ax1: 375, ay0: 148, ay1: 182, fx: 2, fy: 3, third: -0.04, phaseSpan: 0.28, cosTerm: 0, yOffset: 0 },
    red: { count: 68, ax0: 185, ax1: 305, ay0: 116, ay1: 142, fx: 1, fy: 3, third: -0.05, phaseSpan: 0.32, cosTerm: 34, yOffset: 8 },
  },
  3: {
    num: 3,
    numeral: '№ 03',
    word: 'THREE',
    name: 'Trefoil Interference',
    summary:
      'Three-lobe frequency ratios create crisp triangular moiré pockets where 0.18 pt Geranium strokes cross Ultramarine arcs.',
    ratioTag: '1 : 3 TREFOIL',
    paramsText: 'fx 1 : fy 3 / φ 0.52 rad',
    stock: '300 gsm Munken Lynx Uncoated',
    inks: 'Pantone 286 U + Pantone 1788 U',
    remaining: 18,
    total: 80,
    price: 200,
    blue: { count: 78, ax0: 235, ax1: 380, ay0: 144, ay1: 182, fx: 1, fy: 3, third: -0.05, phaseSpan: 0.30, cosTerm: 0, yOffset: 0 },
    red: { count: 70, ax0: 190, ax1: 318, ay0: 108, ay1: 138, fx: 2, fy: 3, third: -0.04, phaseSpan: 0.26, cosTerm: 42, yOffset: 12 },
  },
  4: {
    num: 4,
    numeral: '№ 04',
    word: 'FOUR',
    name: 'Harmonic Lattice',
    summary:
      'Counter-oscillating 3:4 Lissajous curves form an interlocking architectural cage with calibrated optical breathing room.',
    ratioTag: '3 : 4 LATTICE',
    paramsText: 'fx 3 : fy 4 / φ 0.29 rad',
    stock: '300 gsm Munken Lynx Uncoated',
    inks: 'Pantone 286 U + Pantone 1788 U',
    remaining: 31,
    total: 80,
    price: 195,
    blue: { count: 74, ax0: 245, ax1: 385, ay0: 148, ay1: 180, fx: 3, fy: 4, third: -0.03, phaseSpan: 0.22, cosTerm: 0, yOffset: 0 },
    red: { count: 66, ax0: 196, ax1: 312, ay0: 112, ay1: 144, fx: 2, fy: 4, third: -0.04, phaseSpan: 0.25, cosTerm: 38, yOffset: 14 },
  },
  5: {
    num: 5,
    numeral: '№ 05',
    word: 'FIVE',
    name: 'Pentatonic Ribbon',
    summary:
      'Five-cycle standing waves produce dense velvet overprint bands framing two asymmetrical inner newsprint windows.',
    ratioTag: '2 : 5 RIBBON',
    paramsText: 'fx 2 : fy 5 / φ 0.41 rad',
    stock: '300 gsm Munken Lynx Uncoated',
    inks: 'Pantone 286 U + Pantone 1788 U',
    remaining: 11,
    total: 80,
    price: 210,
    blue: { count: 80, ax0: 242, ax1: 392, ay0: 146, ay1: 184, fx: 2, fy: 5, third: -0.05, phaseSpan: 0.24, cosTerm: 0, yOffset: 0 },
    red: { count: 72, ax0: 198, ax1: 320, ay0: 108, ay1: 138, fx: 1, fy: 2, third: -0.05, phaseSpan: 0.34, cosTerm: 48, yOffset: 16 },
  },
  6: {
    num: 6,
    numeral: '№ 06',
    word: 'SIX',
    name: 'Double Knot Study',
    summary:
      'Sixfold phase drift fans the horizontal flanks wide while holding a tight 0.08 mm central registration throat.',
    ratioTag: '1 : 4 KNOT',
    paramsText: 'fx 1 : fy 4 / φ 0.38 rad',
    stock: '300 gsm Munken Lynx Uncoated',
    inks: 'Pantone 286 U + Pantone 1788 U',
    remaining: 26,
    total: 80,
    price: 205,
    blue: { count: 78, ax0: 246, ax1: 394, ay0: 146, ay1: 180, fx: 1, fy: 4, third: -0.05, phaseSpan: 0.26, cosTerm: 0, yOffset: 0 },
    red: { count: 72, ax0: 196, ax1: 318, ay0: 106, ay1: 136, fx: 1, fy: 3, third: -0.04, phaseSpan: 0.30, cosTerm: 46, yOffset: 16 },
  },
  7: {
    num: 7,
    numeral: '№ 07',
    word: 'SEVEN',
    name: 'Toroidal Fold',
    summary:
      'High-frequency radial modulation creates shimmering interference crescents across uncoated cotton rag.',
    ratioTag: '3 : 5 TOROID',
    paramsText: 'fx 3 : fy 5 / φ 0.31 rad',
    stock: '300 gsm Munken Lynx Uncoated',
    inks: 'Pantone 286 U + Pantone 1788 U',
    remaining: 19,
    total: 80,
    price: 215,
    blue: { count: 80, ax0: 248, ax1: 398, ay0: 148, ay1: 184, fx: 3, fy: 5, third: -0.04, phaseSpan: 0.21, cosTerm: 0, yOffset: 0 },
    red: { count: 74, ax0: 204, ax1: 326, ay0: 108, ay1: 140, fx: 1, fy: 2, third: -0.05, phaseSpan: 0.29, cosTerm: 50, yOffset: 18 },
  },
  8: {
    num: 8,
    numeral: '№ 08',
    word: 'EIGHT',
    name: 'Lemniscate Interference',
    summary:
      'Eighty-four Ultramarine outer wave cycles cross seventy-six Geranium harmonic loops along a dual-axis pinch waist.',
    ratioTag: '1 : 2 HARMONIC',
    paramsText: 'fx 1 : fy 2 / φ 0.34 rad',
    stock: '300 gsm Munken Lynx Uncoated',
    inks: 'Pantone 286 U + Pantone 1788 U',
    remaining: 14,
    total: 80,
    price: 220,
    blue: { count: 84, ax0: 252, ax1: 406, ay0: 148, ay1: 182, fx: 1, fy: 2, third: -0.06, phaseSpan: 0.26, cosTerm: 0, yOffset: 0 },
    red: { count: 76, ax0: 208, ax1: 342, ay0: 110, ay1: 146, fx: 1, fy: 2, third: -0.05, phaseSpan: 0.24, cosTerm: 52, yOffset: 22 },
  },
};

const SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Generates an SVG guilloché path string for a single parametric stroke.
 */
function buildCurvePath(cfg, u, cx, cy, phaseDelta = 0, steps = 160) {
  const ax = cfg.ax0 + (cfg.ax1 - cfg.ax0) * u;
  const ay = cfg.ay0 + (cfg.ay1 - cfg.ay0) * u;
  const cosAmp = cfg.cosTerm ? cfg.cosTerm * (0.72 + 0.36 * u) : 0;
  let d = '';

  for (let s = 0; s <= steps; s++) {
    const t = (s / steps) * Math.PI * 2;
    const sinFx = Math.sin(cfg.fx * t);
    const sinThird = cfg.third * Math.sin(3 * cfg.fx * t);
    const x = cx + ax * (sinFx + sinThird);

    const sinSq = Math.sin(t) * Math.sin(t);
    const phase = u * cfg.phaseSpan * sinSq + phaseDelta * sinSq;
    const yWave = -ay * Math.sin(cfg.fy * t + phase);
    const yDip = cosAmp * Math.cos(2 * t) + cfg.yOffset;
    const ySag = cfg.cosTerm === 0 ? u * 10 * sinSq : 0;
    const y = cy + yWave + yDip + ySag;

    d += s === 0 ? `M${x.toFixed(1)},${y.toFixed(1)}` : `L${x.toFixed(1)},${y.toFixed(1)}`;
  }

  return `${d}Z`;
}

/**
 * Renders both Ultramarine and Geranium guilloché ink groups into a target SVG element.
 */
function renderGuilloche(svgEl, edition, options = {}) {
  if (!svgEl) return;
  const cx = 500;
  const cy = 218;
  const phaseDelta = options.phaseDelta || 0;
  const stepDensity = options.mini ? 96 : 156;
  const strokeScale = options.mini ? 1.45 : 1;

  svgEl.replaceChildren();

  const blueGroup = document.createElementNS(SVG_NS, 'g');
  blueGroup.setAttribute('class', 'plate-ultramarine');
  blueGroup.setAttribute('fill', 'none');
  blueGroup.setAttribute('stroke', '#253FA4');
  blueGroup.setAttribute('stroke-width', String(1.0 * strokeScale));
  blueGroup.setAttribute('stroke-opacity', '0.36');

  const blueCount = options.mini ? Math.round(edition.blue.count * 0.45) : edition.blue.count;
  for (let i = 0; i < blueCount; i++) {
    const u = blueCount === 1 ? 0.5 : i / (blueCount - 1);
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', buildCurvePath(edition.blue, u, cx, cy, phaseDelta, stepDensity));
    blueGroup.appendChild(path);
  }

  const redGroup = document.createElementNS(SVG_NS, 'g');
  redGroup.setAttribute('class', 'plate-geranium');
  redGroup.setAttribute('fill', 'none');
  redGroup.setAttribute('stroke', '#E94643');
  redGroup.setAttribute('stroke-width', String(1.0 * strokeScale));
  redGroup.setAttribute('stroke-opacity', '0.40');

  const redCount = options.mini ? Math.round(edition.red.count * 0.45) : edition.red.count;
  for (let i = 0; i < redCount; i++) {
    const u = redCount === 1 ? 0.5 : i / (redCount - 1);
    const path = document.createElementNS(SVG_NS, 'path');
    path.setAttribute('d', buildCurvePath(edition.red, u, cx, cy, -phaseDelta * 0.85, stepDensity));
    redGroup.appendChild(path);
  }

  svgEl.appendChild(blueGroup);
  svgEl.appendChild(redGroup);
}

/**
 * Formats a number as Euro currency.
 */
function formatEuro(amount) {
  return `€${amount.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const heroSvg = document.getElementById('hero-guilloche');
  const heroPlate = document.getElementById('hero-plate');
  const archiveSvg = document.getElementById('archive-guilloche');
  const pressSvg = document.getElementById('press-plate-svg');
  const certMiniSvg = document.getElementById('cert-mini-svg');

  // Initial Hero & Press SVG renders
  renderGuilloche(heroSvg, EDITIONS[8]);
  renderGuilloche(pressSvg, EDITIONS[8]);

  // Subtle interactive phase shift on Hero Plate pointer move
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let rafPending = false;
  let targetPhase = 0;

  if (heroPlate && !prefersReducedMotion) {
    heroPlate.addEventListener('pointermove', (event) => {
      const rect = heroPlate.getBoundingClientRect();
      const normX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      targetPhase = Math.max(-0.14, Math.min(0.14, normX * 0.12));

      if (!rafPending) {
        rafPending = true;
        window.requestAnimationFrame(() => {
          renderGuilloche(heroSvg, EDITIONS[8], { phaseDelta: targetPhase });
          rafPending = false;
        });
      }
    });

    heroPlate.addEventListener('pointerleave', () => {
      renderGuilloche(heroSvg, EDITIONS[8], { phaseDelta: 0 });
    });
  }

  // Hero Ink Separation Chips
  const heroInkButtons = document.querySelectorAll('[data-hero-ink]');
  heroInkButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.getAttribute('data-hero-ink');
      heroSvg.setAttribute('data-ink-mode', mode);
      heroInkButtons.forEach((other) => {
        const active = other === btn;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-pressed', String(active));
      });
    });
  });

  // Mobile Drawer Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
      mobileDrawer.hidden = isOpen;
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.hidden = true;
      });
    });
  }

  // Chapter 1: Editions Archive Selector
  let activeEditionId = 8;
  const editionTabs = document.querySelectorAll('[data-edition]');
  const archiveSlug = document.getElementById('archive-slug');
  const archiveRatioTag = document.getElementById('archive-ratio-tag');
  const archiveCurveCount = document.getElementById('archive-curve-count');
  const specNumeral = document.getElementById('spec-numeral');
  const specName = document.getElementById('spec-name');
  const specSummary = document.getElementById('spec-summary');
  const specStock = document.getElementById('spec-stock');
  const specInks = document.getElementById('spec-inks');
  const specParams = document.getElementById('spec-params');
  const specRemaining = document.getElementById('spec-remaining');
  const specPrice = document.getElementById('spec-price');
  const selectForOrderBtn = document.getElementById('select-for-order');

  function updateArchiveEdition(id) {
    activeEditionId = id;
    const ed = EDITIONS[id];
    if (!ed) return;

    editionTabs.forEach((tab) => {
      const isMatch = Number(tab.getAttribute('data-edition')) === id;
      tab.classList.toggle('is-active', isMatch);
      tab.setAttribute('aria-selected', String(isMatch));
    });

    renderGuilloche(archiveSvg, ed);

    archiveSlug.textContent = `FIGURE ${ed.numeral} / ${ed.word}`;
    archiveRatioTag.textContent = ed.ratioTag;
    archiveCurveCount.textContent = `${ed.blue.count + ed.red.count} VECTOR PATHS`;
    specNumeral.textContent = ed.numeral;
    specName.textContent = ed.name;
    specSummary.textContent = ed.summary;
    specStock.textContent = ed.stock;
    specInks.textContent = ed.inks;
    specParams.textContent = ed.paramsText;
    specRemaining.textContent = `${ed.remaining} / ${ed.total} copies remaining`;
    specPrice.textContent = formatEuro(ed.price);
  }

  editionTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      updateArchiveEdition(Number(tab.getAttribute('data-edition')));
    });
  });

  updateArchiveEdition(8);

  // Chapter 2: Interactive Ink-Plate Breakdown
  const plateTabs = document.querySelectorAll('[data-plate-mode]');
  const toggleMisreg = document.getElementById('toggle-misreg');
  const swatchA = document.querySelector('[data-swatch="a"]');
  const swatchB = document.querySelector('[data-swatch="b"]');
  const plateExplanation = document.getElementById('plate-explanation');
  const metricCoverage = document.getElementById('metric-coverage');
  const metricDensity = document.getElementById('metric-density');
  const metricAlign = document.getElementById('metric-align');

  const PLATE_COPY = {
    overprint: {
      text: 'Both aluminum plates run sequentially through the cylinder gripper. Where 0.18 pt Geranium waves cross dense Ultramarine bands, translucent linseed inks blend optically into deep plum-violet moiré.',
      coverage: '62.5% total surface',
      density: '1.35 D / 1.28 D',
    },
    'plate-a': {
      text: 'Plate A carries 84 Ultramarine wave paths printed first onto raw 300 gsm Munken Lynx. Open uncoated cotton fibers absorb the initial pass and stabilize sheet stretch before Pass B.',
      coverage: '38.4% Plate A ink',
      density: '1.35 D Ultramarine',
    },
    'plate-b': {
      text: 'Plate B lays down 76 Geranium harmonic loops 48 hours later. Its transparent pigment sits on top of the Ultramarine ground without opaque masking.',
      coverage: '24.1% Plate B ink',
      density: '1.28 D Geranium',
    },
  };

  plateTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const mode = tab.getAttribute('data-plate-mode');
      pressSvg.setAttribute('data-plate-mode', mode);

      plateTabs.forEach((other) => {
        const active = other === tab;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-selected', String(active));
      });

      swatchA.classList.toggle('is-dimmed', mode === 'plate-b');
      swatchB.classList.toggle('is-dimmed', mode === 'plate-a');

      const info = PLATE_COPY[mode];
      plateExplanation.textContent = info.text;
      metricCoverage.textContent = info.coverage;
      metricDensity.textContent = info.density;
    });
  });

  if (toggleMisreg) {
    toggleMisreg.addEventListener('click', () => {
      const shifted = toggleMisreg.getAttribute('aria-pressed') === 'true';
      const next = !shifted;
      toggleMisreg.setAttribute('aria-pressed', String(next));
      pressSvg.setAttribute('data-shifted', String(next));
      metricAlign.textContent = next ? '+0.50 mm shift preview' : '0.00 mm locked';
    });
  }

  // Chapter 3: Shop Prints & Live Certificate Sync
  const orderSelect = document.getElementById('order-edition');
  const orderQty = document.getElementById('order-qty');
  const orderName = document.getElementById('order-name');
  const orderEmail = document.getElementById('order-email');
  const orderSubtotal = document.getElementById('order-subtotal');
  const orderForm = document.getElementById('order-form');
  const formError = document.getElementById('form-error');
  const orderConfirmed = document.getElementById('order-confirmed');
  const confirmedDetails = document.getElementById('confirmed-details');
  const confirmedRef = document.getElementById('confirmed-ref');
  const confirmedSheet = document.getElementById('confirmed-sheet');
  const confirmedTotal = document.getElementById('confirmed-total');
  const resetOrderBtn = document.getElementById('reset-order');

  const certSerial = document.getElementById('cert-serial');
  const certTitle = document.getElementById('cert-edition-title');
  const certCollector = document.getElementById('cert-collector-name');
  const certFormat = document.getElementById('cert-format');
  const certPrice = document.getElementById('cert-price');

  // Populate Edition Select
  Object.values(EDITIONS).forEach((ed) => {
    const opt = document.createElement('option');
    opt.value = String(ed.num);
    opt.textContent = `Figure ${ed.numeral} — ${ed.word} (${formatEuro(ed.price)})`;
    if (ed.num === 8) opt.selected = true;
    orderSelect.appendChild(opt);
  });

  function getSelectedFraming() {
    const checked = orderForm.querySelector('input[name="framing"]:checked');
    return checked ? checked.value : 'tube';
  }

  function syncOrderPreview() {
    const id = Number(orderSelect.value || 8);
    const ed = EDITIONS[id] || EDITIONS[8];
    const framing = getSelectedFraming();
    const frameAdd = framing === 'framed' ? 140 : 0;
    const qty = Number(orderQty.value || 1);
    const total = (ed.price + frameAdd) * qty;
    const nextCopyNum = ed.total - ed.remaining + 1;

    orderSubtotal.textContent = formatEuro(total);
    certSerial.textContent = `CERT ${ed.numeral.replace('№', '№')} · ${String(nextCopyNum).padStart(2, '0')} / ${ed.total}`;
    certTitle.textContent = `Figure ${ed.numeral} — ${ed.word}`;
    certCollector.textContent = orderName.value.trim() || 'Collector Archive Copy';
    certFormat.textContent = framing === 'framed' ? 'Museum oak frame + UV acrylic' : 'Unframed archival tube';
    certPrice.textContent = formatEuro(total);

    renderGuilloche(certMiniSvg, ed, { mini: true });
  }

  orderSelect.addEventListener('change', syncOrderPreview);
  orderQty.addEventListener('change', syncOrderPreview);
  orderName.addEventListener('input', syncOrderPreview);
  orderForm.querySelectorAll('input[name="framing"]').forEach((radio) => {
    radio.addEventListener('change', syncOrderPreview);
  });

  if (selectForOrderBtn) {
    selectForOrderBtn.addEventListener('click', () => {
      orderSelect.value = String(activeEditionId);
      syncOrderPreview();
      document.getElementById('shop').scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      orderName.focus({ preventScroll: true });
    });
  }

  orderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameVal = orderName.value.trim();
    const emailVal = orderEmail.value.trim();

    if (!nameVal || !emailVal || !emailVal.includes('@')) {
      formError.hidden = false;
      formError.textContent = 'Enter a collector name and valid email address to issue a reservation slip.';
      return;
    }

    formError.hidden = true;
    const id = Number(orderSelect.value || 8);
    const ed = EDITIONS[id] || EDITIONS[8];
    const framing = getSelectedFraming();
    const frameAdd = framing === 'framed' ? 140 : 0;
    const qty = Number(orderQty.value || 1);
    const total = (ed.price + frameAdd) * qty;
    const copyNum = ed.total - ed.remaining + 1;

    confirmedRef.textContent = `OO-2026-0${id}${String(copyNum).padStart(2, '0')}`;
    confirmedSheet.textContent = `${String(copyNum).padStart(2, '0')} / ${ed.total}`;
    confirmedTotal.textContent = formatEuro(total);
    confirmedDetails.textContent = `${qty}x Figure ${ed.numeral} (${framing === 'framed' ? 'Museum oak frame' : 'Unframed archival tube'}) held for ${nameVal}. Confirmation sent to ${emailVal}.`;

    orderForm.hidden = true;
    orderConfirmed.hidden = false;
  });

  resetOrderBtn.addEventListener('click', () => {
    orderConfirmed.hidden = true;
    orderForm.hidden = false;
    orderForm.reset();
    orderSelect.value = String(activeEditionId);
    syncOrderPreview();
  });

  syncOrderPreview();

  // Scroll Reveal Observer
  const revealItems = document.querySelectorAll('.reveal');
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  } else {
    window.requestAnimationFrame(() => {
      revealItems.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          el.classList.add('is-visible');
        }
      });
    });

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

    revealItems.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    });
  }
});
