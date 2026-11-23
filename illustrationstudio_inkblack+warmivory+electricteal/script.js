(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('studio-drawer');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('[data-drawer-link]');

  // Header scroll state
  function syncHeaderScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  }
  window.addEventListener('scroll', syncHeaderScroll, { passive: true });
  syncHeaderScroll();

  // Drawer open/close with focus management
  let lastFocused = null;

  function openDrawer() {
    if (!drawer || !drawerBackdrop || !menuToggle) return;
    lastFocused = document.activeElement;
    drawerBackdrop.hidden = false;
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    menuToggle.setAttribute('aria-expanded', 'true');
    drawerClose?.focus();
  }

  function closeDrawer() {
    if (!drawer || !drawerBackdrop || !menuToggle) return;
    drawer.classList.remove('is-open');
    drawer.setAttribute('aria-hidden', 'true');
    menuToggle.setAttribute('aria-expanded', 'false');
    drawerBackdrop.hidden = true;
    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
  }

  menuToggle?.addEventListener('click', () => {
    const isOpen = drawer?.classList.contains('is-open');
    if (isOpen) closeDrawer();
    else openDrawer();
  });

  drawerClose?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);
  drawerLinks.forEach((link) => link.addEventListener('click', closeDrawer));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer?.classList.contains('is-open')) {
      closeDrawer();
    }
  });

  // Hero Plate Archive Switcher (01 / 04 .. 04 / 04)
  const PLATES = [
    { id: '01', label: 'Ocular Stipple' },
    { id: '02', label: 'Nocturne Wave' },
    { id: '03', label: 'Cyanotype Iris' },
    { id: '04', label: 'Deep Register' },
  ];
  let currentPlateIdx = 0;

  const heroMedia = document.getElementById('hero-media');
  const plateCycleBtn = document.getElementById('plate-cycle');
  const plateIndexEl = document.getElementById('plate-index');
  const plateCaptionEl = document.getElementById('plate-caption');

  plateCycleBtn?.addEventListener('click', () => {
    currentPlateIdx = (currentPlateIdx + 1) % PLATES.length;
    const plate = PLATES[currentPlateIdx];
    if (heroMedia) heroMedia.dataset.plate = plate.id;
    if (plateIndexEl) plateIndexEl.textContent = `${plate.id} / 04`;
    if (plateCaptionEl) plateCaptionEl.textContent = plate.label;
  });

  // Chapter 01: Discipline filter + active plate note inspector
  const filterTabs = document.querySelectorAll('.filter-tab');
  const commissionCards = document.querySelectorAll('.commission-card');
  const inspectorBadge = document.getElementById('inspector-badge');
  const inspectorTitle = document.getElementById('inspector-title');
  const inspectorDetail = document.getElementById('inspector-detail');

  const PLATE_NOTES = {
    'Vespera Botanica': {
      badge: 'Plate Note 01',
      title: 'Vespera Botanica — Screenprint & deboss',
      detail: 'Ink Black key plate laid at 45 deg, Warm Ivory flood coat on cotton rag, and Electric Teal seal vignette.',
    },
    'Teatro Solare': {
      badge: 'Plate Note 02',
      title: 'Teatro Solare — 3-drum risograph',
      detail: 'Overprinted soy drums with 0.25mm intentional trap tolerance across 18 seasonal repertoire spreads.',
    },
    'Mare Nostrum Press': {
      badge: 'Plate Note 03',
      title: 'Mare Nostrum Press — Endgrain woodcut',
      detail: 'Hand-engraved boxwood blocks pulled on dampened Ingres rag for dense line weight and crisp hairlines.',
    },
    'Kinetik Nocturne': {
      badge: 'Plate Note 04',
      title: 'Kinetik Nocturne — Frame-by-frame ink',
      detail: '1,440 individual brush-and-stipple cels scanned at 1200 dpi and timed at 24fps for projection.',
    },
  };

  function selectCard(card) {
    commissionCards.forEach((c) => c.classList.remove('is-selected'));
    card.classList.add('is-selected');
    const clientName = card.querySelector('.card-client')?.textContent?.trim();
    const note = clientName ? PLATE_NOTES[clientName] : null;
    if (note && inspectorBadge && inspectorTitle && inspectorDetail) {
      inspectorBadge.textContent = note.badge;
      inspectorTitle.textContent = note.title;
      inspectorDetail.textContent = note.detail;
    }
  }

  commissionCards.forEach((card) => {
    card.addEventListener('click', () => selectCard(card));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectCard(card);
      }
    });
  });

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.filter || 'all';
      filterTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });

      let firstVisible = null;
      commissionCards.forEach((card) => {
        const match = target === 'all' || card.dataset.category === target;
        card.hidden = !match;
        if (match && !firstVisible) firstVisible = card;
      });

      if (firstVisible) {
        selectCard(firstVisible);
      }
    });
  });

  // Chapter 02: Colour Separation Inspector
  const CHANNELS = {
    composite: {
      name: 'Composite Overprint',
      angle: '45° / 15° / 75°',
      coverage: '60% / 30% / 10%',
      code: 'LMR-300LPI-COMP',
    },
    ink: {
      name: 'Ink Black (#031211)',
      angle: '45° Key Screen',
      coverage: '60% Surface Density',
      code: 'LMR-300LPI-BLK01',
    },
    ivory: {
      name: 'Warm Ivory (#E8E4D3)',
      angle: '15° Cotton Base',
      coverage: '30% Wave Field',
      code: 'LMR-300LPI-IVR02',
    },
    teal: {
      name: 'Electric Teal (#00AEBB)',
      angle: '75° Spot Pigment',
      coverage: '10% Focal Iris',
      code: 'LMR-300LPI-TEL03',
    },
  };

  const sepButtons = document.querySelectorAll('.sep-btn');
  const sepStage = document.getElementById('separation-stage');
  const sepNameEl = document.getElementById('sep-active-name');
  const sepAngleEl = document.getElementById('sep-angle');
  const sepCoverageEl = document.getElementById('sep-coverage');
  const colorbarLabelEl = document.getElementById('colorbar-label');
  const regToggleBtn = document.getElementById('reg-toggle');

  sepButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const ch = btn.dataset.channel || 'composite';
      const meta = CHANNELS[ch];
      sepButtons.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-active', active);
        b.setAttribute('aria-selected', String(active));
      });
      if (sepStage) sepStage.dataset.channel = ch;
      if (meta) {
        if (sepNameEl) sepNameEl.textContent = meta.name;
        if (sepAngleEl) sepAngleEl.textContent = meta.angle;
        if (sepCoverageEl) sepCoverageEl.textContent = meta.coverage;
        if (colorbarLabelEl) colorbarLabelEl.textContent = meta.code;
      }
    });
  });

  regToggleBtn?.addEventListener('click', () => {
    if (!sepStage) return;
    const currentlyVisible = sepStage.dataset.marks !== 'false';
    const next = !currentlyVisible;
    sepStage.dataset.marks = String(next);
    regToggleBtn.setAttribute('aria-pressed', String(next));
    regToggleBtn.textContent = next
      ? 'Registration crop marks: Visible'
      : 'Registration crop marks: Hidden';
  });

  // Chapter 03: Commission Brief Form Validation + Docket Confirmation
  const briefForm = document.getElementById('brief-form');
  const docketBox = document.getElementById('docket-confirmation');
  const docketNumberEl = document.getElementById('docket-number');
  const docketDetailsEl = document.getElementById('docket-details');
  const docketResetBtn = document.getElementById('docket-reset');

  function setFieldError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const err = document.getElementById(errorId);
    if (input) input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (err) err.textContent = message || '';
  }

  briefForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = document.getElementById('client-name')?.value.trim() || '';
    const emailVal = document.getElementById('client-email')?.value.trim() || '';
    const formatVal = document.getElementById('deliverable-format')?.value.trim() || '';
    const runVal = document.getElementById('print-run')?.value.trim() || '';
    const launchVal = document.getElementById('target-launch')?.value.trim() || '';

    let valid = true;

    if (!nameVal) {
      setFieldError('client-name', 'err-client-name', 'Enter your name or studio.');
      valid = false;
    } else {
      setFieldError('client-name', 'err-client-name', '');
    }

    if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      setFieldError('client-email', 'err-client-email', 'Enter a valid email address.');
      valid = false;
    } else {
      setFieldError('client-email', 'err-client-email', '');
    }

    if (!formatVal) {
      setFieldError('deliverable-format', 'err-deliverable-format', 'Select a deliverable format.');
      valid = false;
    } else {
      setFieldError('deliverable-format', 'err-deliverable-format', '');
    }

    if (!runVal) {
      setFieldError('print-run', 'err-print-run', 'Select an edition or print run scope.');
      valid = false;
    } else {
      setFieldError('print-run', 'err-print-run', '');
    }

    if (!launchVal) {
      setFieldError('target-launch', 'err-target-launch', 'Specify a target launch window.');
      valid = false;
    } else {
      setFieldError('target-launch', 'err-target-launch', '');
    }

    if (!valid) return;

    const codeNum = String(100 + Math.floor(Math.random() * 899));
    if (docketNumberEl) {
      docketNumberEl.textContent = `DOCKET #LMR-2026-${codeNum}`;
    }

    if (docketDetailsEl) {
      docketDetailsEl.innerHTML = '';
      const rows = [
        ['Client', nameVal],
        ['Format', formatVal],
        ['Edition scope', runVal],
        ['Target launch', launchVal],
      ];
      rows.forEach(([label, value]) => {
        const row = document.createElement('div');
        row.className = 'docket-detail-row';
        const dt = document.createElement('dt');
        dt.textContent = label;
        const dd = document.createElement('dd');
        dd.textContent = value;
        row.append(dt, dd);
        docketDetailsEl.appendChild(row);
      });
    }

    briefForm.hidden = true;
    if (docketBox) docketBox.hidden = false;
  });

  docketResetBtn?.addEventListener('click', () => {
    if (docketBox) docketBox.hidden = true;
    if (briefForm) {
      briefForm.hidden = false;
      briefForm.reset();
    }
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
