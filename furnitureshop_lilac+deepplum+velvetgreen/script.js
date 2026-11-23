(() => {
  const SOFAS = [
    {
      id: 'curva-chaise',
      name: 'Curva Chaise',
      category: 'linear',
      dimensions: '242 × 118 cm',
      depth: '108 cm',
      leadTime: '10 weeks',
      price: 4200,
    },
    {
      id: 'brera-3-seater',
      name: 'Brera 3-Seater',
      category: 'linear',
      dimensions: '260 × 108 cm',
      depth: '108 cm',
      leadTime: '10 weeks',
      price: 4650,
    },
    {
      id: 'navigli-corner',
      name: 'Navigli Corner',
      category: 'corner',
      dimensions: '310 × 220 cm',
      depth: '108 cm',
      leadTime: '10 weeks',
      price: 6400,
    },
    {
      id: 'isola-ottoman',
      name: 'Isola Ottoman',
      category: 'ottoman',
      dimensions: '108 × 108 cm',
      depth: '108 cm',
      leadTime: '10 weeks',
      price: 1450,
    },
  ];

  const VELVETS = [
    {
      index: '01',
      id: 'verde-velluto',
      name: 'Verde Velluto',
      hex: '#52AE4C',
      fiber: '100% Cotton-Modal Pile',
      martindale: '85,000 rubs',
      weight: '540 g/m²',
      batch: 'ML-01 · Brera Moss',
      care: 'Water-repellent wash',
      notes: 'Rich architectural green dyed with double-fixative mineral pigment for uniform pile direction across curved arms.',
    },
    {
      index: '02',
      id: 'pruna-scura',
      name: 'Pruna Scura',
      hex: '#3F0820',
      fiber: 'Mohair & Combed Cotton',
      martindale: '92,000 rubs',
      weight: '580 g/m²',
      batch: 'ML-02 · Deep Damson',
      care: 'Dry brush weekly',
      notes: 'Dense upright mohair tuft that absorbs ambient light along seat folds while showing warm plum undertone on radii.',
    },
    {
      index: '03',
      id: 'glicine',
      name: 'Glicine',
      hex: '#C9BBD8',
      fiber: 'Long-Staple Cotton Velvet',
      martindale: '80,000 rubs',
      weight: '510 g/m²',
      batch: 'ML-03 · Plaster Lilac',
      care: 'Water-repellent wash',
      notes: 'Soft lime-plaster lilac calibrated to match Milanese cortile walls without optical brighteners.',
    },
    {
      index: '04',
      id: 'notte-navigli',
      name: 'Notte Navigli',
      hex: '#1A2639',
      fiber: 'Heavy Mohair Blend',
      martindale: '95,000 rubs',
      weight: '610 g/m²',
      batch: 'ML-04 · Canal Indigo',
      care: 'Dry brush weekly',
      notes: 'High-twist indigo pile woven for heavy daily seating in residential and hospitality lounges.',
    },
    {
      index: '05',
      id: 'terracotta-brera',
      name: 'Terracotta Brera',
      hex: '#9E4B3A',
      fiber: 'Washed Cotton Velvet',
      martindale: '85,000 rubs',
      weight: '530 g/m²',
      batch: 'ML-05 · Kiln Rust',
      care: 'Water-repellent wash',
      notes: 'Enzyme-washed brick clay tone with broken surface luster and supple drape on French seams.',
    },
    {
      index: '06',
      id: 'ocra-scala',
      name: 'Ocra Scala',
      hex: '#C6923A',
      fiber: 'Woven Mohair Pile',
      martindale: '90,000 rubs',
      weight: '575 g/m²',
      batch: 'ML-06 · Brass Ochre',
      care: 'Dry brush weekly',
      notes: 'Warm raw-sienna mohair spun in Biella and sheared to a tight 3.2 mm architectural height.',
    },
    {
      index: '07',
      id: 'pietra-travertino',
      name: 'Pietra Travertino',
      hex: '#D8CEC0',
      fiber: 'Unbleached Cotton Pile',
      martindale: '82,000 rubs',
      weight: '505 g/m²',
      batch: 'ML-07 · Stone Warm',
      care: 'Fluorocarbon-free shield',
      notes: 'Natural undyed ecru yarn scoured in soft mountain water and sealed against everyday spills.',
    },
    {
      index: '08',
      id: 'salvia-ticinese',
      name: 'Salvia Ticinese',
      hex: '#7A8B74',
      fiber: 'Matte Cotton-Linen Pile',
      martindale: '84,000 rubs',
      weight: '520 g/m²',
      batch: 'ML-08 · Herb Sage',
      care: 'Water-repellent wash',
      notes: 'Linen warp stabilizes the muted botanical pile to resist seat pooling on 108 cm cushions.',
    },
    {
      index: '09',
      id: 'grafite-porta',
      name: 'Grafite Porta',
      hex: '#34363B',
      fiber: 'Dense Mohair Velvet',
      martindale: '100,000 rubs',
      weight: '620 g/m²',
      batch: 'ML-09 · Iron Slate',
      care: 'Contract-grade finish',
      notes: 'Our highest-rub architectural mohair designed for high-traffic studio and gallery seating.',
    },
    {
      index: '10',
      id: 'bordeaux-scala',
      name: 'Bordeaux Scala',
      hex: '#6B182E',
      fiber: 'Silk-Cotton Blend Pile',
      martindale: '78,000 rubs',
      weight: '495 g/m²',
      batch: 'ML-10 · Opera Claret',
      care: 'Specialist steam care',
      notes: 'Spun silk face yarns create directional light shift from crimson highlight to deep garnet.',
    },
    {
      index: '11',
      id: 'sabbia-duomo',
      name: 'Sabbia Duomo',
      hex: '#BFA98E',
      fiber: 'Combed Cotton Velvet',
      martindale: '86,000 rubs',
      weight: '545 g/m²',
      batch: 'ML-11 · Sand Dust',
      care: 'Water-repellent wash',
      notes: 'Neutral limestone sand pile with crisp piping definition along low curved corners.',
    },
    {
      index: '12',
      id: 'muschio-parco',
      name: 'Muschio Parco',
      hex: '#2D5436',
      fiber: 'Heavy Cotton Pile',
      martindale: '88,000 rubs',
      weight: '560 g/m²',
      batch: 'ML-12 · Sempione Pine',
      care: 'Water-repellent wash',
      notes: 'Deep forest evergreen dyed in two baths for saturated shadow depth along seat wells.',
    },
    {
      index: '13',
      id: 'malva-chiaro',
      name: 'Malva Chiaro',
      hex: '#A98FB8',
      fiber: 'Short-Pile Cotton',
      martindale: '85,000 rubs',
      weight: '535 g/m²',
      batch: 'ML-13 · Dusk Mauve',
      care: 'Water-repellent wash',
      notes: 'Deeper dusky mauve companion to Glicine, balanced to hold warmth under tungsten evening light.',
    },
    {
      index: '14',
      id: 'cacao-lombardo',
      name: 'Cacao Lombardo',
      hex: '#4A3026',
      fiber: 'Rich Mohair Blend',
      martindale: '94,000 rubs',
      weight: '590 g/m²',
      batch: 'ML-14 · Roast Umber',
      care: 'Dry brush weekly',
      notes: 'Earthy espresso umber with high natural crimp recovery for deep feather-wrapped modules.',
    },
  ];

  const state = {
    activeVelvetId: 'verde-velluto',
    bag: [],
    orderedSwatches: new Set(),
    activeDrawer: null,
    lastTrigger: null,
    orderSubmitted: false,
  };

  // Elements
  const header = document.getElementById('site-header');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const sofaCards = document.querySelectorAll('.sofa-card');
  const sofaActiveDot = document.getElementById('sofa-active-dot');
  const sofaActiveVelvet = document.getElementById('sofa-active-velvet');
  const swatchGrid = document.getElementById('swatch-grid');

  const specimenEl = document.getElementById('swatch-specimen');
  const specimenBatchEl = document.getElementById('specimen-batch');
  const specimenHexEl = document.getElementById('specimen-hex');
  const specimenIndexEl = document.getElementById('specimen-index');
  const specimenFiberEl = document.getElementById('specimen-fiber');
  const specimenNameEl = document.getElementById('specimen-name');
  const specimenNotesEl = document.getElementById('specimen-notes');
  const specimenMartindaleEl = document.getElementById('specimen-martindale');
  const specimenWeightEl = document.getElementById('specimen-weight');
  const specimenDyeEl = document.getElementById('specimen-dye');
  const specimenCareEl = document.getElementById('specimen-care');
  const toggleSwatchOrderBtn = document.getElementById('toggle-swatch-order');

  const backdrop = document.getElementById('drawer-backdrop');
  const navDrawer = document.getElementById('nav-drawer');
  const searchDrawer = document.getElementById('search-drawer');
  const bagDrawer = document.getElementById('bag-drawer');
  const menuToggle = document.getElementById('menu-toggle');
  const searchToggle = document.getElementById('search-toggle');
  const bagToggle = document.getElementById('bag-toggle');
  const bagCountEl = document.getElementById('bag-count');
  const bagBodyEl = document.getElementById('bag-body');
  const bagFooterEl = document.getElementById('bag-footer');
  const searchInput = document.getElementById('catalog-search-input');
  const searchResults = document.getElementById('search-results');

  const consultationForm = document.getElementById('consultation-form');
  const bookingFormWrap = document.getElementById('booking-form-wrap');
  const bookingConfirm = document.getElementById('booking-confirmation');
  const bookingSummaryText = document.getElementById('booking-summary-text');
  const bookingResetBtn = document.getElementById('booking-reset');

  function getVelvet(id) {
    return VELVETS.find((v) => v.id === id) || VELVETS[0];
  }

  function formatEuro(amount) {
    return `€${amount.toLocaleString('en-US')}`;
  }

  // Header scroll state
  function updateHeaderScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  }
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  // Reveal choreography
  function initReveals() {
    const els = document.querySelectorAll('.reveal');
    const triggerVisible = (el) => el.classList.add('is-visible');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      els.forEach(triggerVisible);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerVisible(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
    );

    els.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92) {
        triggerVisible(el);
      } else {
        observer.observe(el);
      }
    });
  }

  // Sofa filter tabs
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;
      filterTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      sofaCards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.hidden = !matches;
      });
    });
  });

  // Render 14 Swatches
  function renderSwatches() {
    if (!swatchGrid) return;
    swatchGrid.innerHTML = '';

    VELVETS.forEach((velvet) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'swatch-btn';
      btn.setAttribute('role', 'option');
      btn.dataset.velvetId = velvet.id;
      const isSelected = velvet.id === state.activeVelvetId;
      btn.classList.toggle('is-selected', isSelected);
      btn.setAttribute('aria-selected', String(isSelected));

      const chip = document.createElement('span');
      chip.className = 'swatch-chip';
      chip.style.backgroundColor = velvet.hex;

      const meta = document.createElement('span');
      meta.className = 'swatch-meta';

      const num = document.createElement('span');
      num.className = 'swatch-num';
      num.textContent = `SWATCH ${velvet.index}`;

      const title = document.createElement('span');
      title.className = 'swatch-title';
      title.textContent = velvet.name;

      meta.append(num, title);
      btn.append(chip, meta);
      btn.addEventListener('click', () => selectVelvet(velvet.id));
      swatchGrid.appendChild(btn);
    });
  }

  function selectVelvet(id) {
    state.activeVelvetId = id;
    const v = getVelvet(id);

    if (sofaActiveDot) sofaActiveDot.style.backgroundColor = v.hex;
    if (sofaActiveVelvet) sofaActiveVelvet.textContent = v.name;

    if (specimenEl) specimenEl.style.backgroundColor = v.hex;
    if (specimenBatchEl) specimenBatchEl.textContent = `BATCH ${v.batch.split(' · ')[0]}`;
    if (specimenHexEl) specimenHexEl.textContent = v.hex;
    if (specimenIndexEl) specimenIndexEl.textContent = `SWATCH ${v.index} / 14`;
    if (specimenFiberEl) specimenFiberEl.textContent = v.fiber;
    if (specimenNameEl) specimenNameEl.textContent = v.name;
    if (specimenNotesEl) specimenNotesEl.textContent = v.notes;
    if (specimenMartindaleEl) specimenMartindaleEl.textContent = v.martindale;
    if (specimenWeightEl) specimenWeightEl.textContent = v.weight;
    if (specimenDyeEl) specimenDyeEl.textContent = v.batch;
    if (specimenCareEl) specimenCareEl.textContent = v.care;

    document.querySelectorAll('.swatch-btn').forEach((btn) => {
      const selected = btn.dataset.velvetId === id;
      btn.classList.toggle('is-selected', selected);
      btn.setAttribute('aria-selected', String(selected));
    });

    updateSwatchOrderButton();
  }

  function updateSwatchOrderButton() {
    if (!toggleSwatchOrderBtn) return;
    const added = state.orderedSwatches.has(state.activeVelvetId);
    toggleSwatchOrderBtn.setAttribute('aria-pressed', String(added));
    toggleSwatchOrderBtn.textContent = added
      ? 'Sample Swatch in Bag (€0)'
      : 'Order Sample Swatch (€0)';
  }

  if (toggleSwatchOrderBtn) {
    toggleSwatchOrderBtn.addEventListener('click', () => {
      const v = getVelvet(state.activeVelvetId);
      const key = `swatch:${v.id}`;
      if (state.orderedSwatches.has(v.id)) {
        state.orderedSwatches.delete(v.id);
        state.bag = state.bag.filter((item) => item.key !== key);
      } else {
        state.orderedSwatches.add(v.id);
        state.bag.push({
          key,
          type: 'swatch',
          title: `${v.name} Cutting`,
          subtitle: `${v.batch} · 15 × 15 cm sample`,
          hex: v.hex,
          price: 0,
          qty: 1,
        });
      }
      state.orderSubmitted = false;
      updateSwatchOrderButton();
      renderBag();
    });
  }

  // Add Sofa to Bag
  document.querySelectorAll('[data-add-sofa]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const sofa = SOFAS.find((s) => s.id === btn.dataset.addSofa);
      if (!sofa) return;
      const velvet = getVelvet(state.activeVelvetId);
      const key = `sofa:${sofa.id}:${velvet.id}`;
      const existing = state.bag.find((item) => item.key === key);

      if (existing) {
        existing.qty += 1;
      } else {
        state.bag.push({
          key,
          type: 'sofa',
          title: sofa.name,
          subtitle: `${velvet.name} · ${sofa.depth} depth · ${sofa.leadTime}`,
          hex: velvet.hex,
          price: sofa.price,
          qty: 1,
        });
      }
      state.orderSubmitted = false;
      renderBag();
      openDrawer(bagDrawer, btn);
    });
  });

  // Render Bag
  function renderBag() {
    const totalCount = state.bag.reduce((sum, item) => sum + item.qty, 0);
    if (bagCountEl) {
      bagCountEl.textContent = String(totalCount);
      bagCountEl.hidden = totalCount === 0;
    }

    if (!bagBodyEl || !bagFooterEl) return;

    if (state.orderSubmitted) {
      bagBodyEl.innerHTML = `
        <div class="bag-empty">
          <span class="mono-tag">DOSSIER SENT TO MILAN BENCH</span>
          <p>Your configuration dossier has been queued for batch verification in Via Brera. Production begins upon deposit sign-off.</p>
          <button type="button" class="btn-outline-lilac" id="bag-reset-btn">Start a new configuration</button>
        </div>
      `;
      bagFooterEl.innerHTML = '';
      const resetBtn = document.getElementById('bag-reset-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          state.orderSubmitted = false;
          renderBag();
        });
      }
      return;
    }

    if (state.bag.length === 0) {
      bagBodyEl.innerHTML = `
        <div class="bag-empty">
          <span class="mono-tag">EMPTY BAG</span>
          <p>Select one of our four 108 cm modular silhouettes or add complimentary Milanese velvet cuttings.</p>
          <a href="#sofas" class="btn-velvet" data-jump-sofas>Browse Sofas</a>
        </div>
      `;
      bagFooterEl.innerHTML = '';
      const jumpBtn = bagBodyEl.querySelector('[data-jump-sofas]');
      if (jumpBtn) {
        jumpBtn.addEventListener('click', () => closeDrawer());
      }
      return;
    }

    bagBodyEl.innerHTML = '';
    let subtotal = 0;

    state.bag.forEach((item) => {
      subtotal += item.price * item.qty;
      const card = document.createElement('div');
      card.className = 'bag-item';
      card.innerHTML = `
        <div class="bag-item-head">
          <div>
            <div class="bag-item-title">${item.title}</div>
            <div class="bag-item-sub">
              <span class="bag-item-dot" style="background-color: ${item.hex}"></span>
              <span>${item.subtitle}</span>
            </div>
          </div>
          <span class="mono-tag">${item.price === 0 ? '€0' : formatEuro(item.price * item.qty)}</span>
        </div>
        <div class="bag-item-controls">
          <div class="qty-group">
            <button type="button" class="qty-btn" data-qty-dec="${item.key}" aria-label="Decrease quantity">−</button>
            <span>${item.qty}</span>
            <button type="button" class="qty-btn" data-qty-inc="${item.key}" aria-label="Increase quantity">+</button>
          </div>
          <button type="button" class="remove-btn" data-remove-key="${item.key}">Remove</button>
        </div>
      `;
      bagBodyEl.appendChild(card);
    });

    bagBodyEl.querySelectorAll('[data-qty-dec]').forEach((btn) => {
      btn.addEventListener('click', () => updateQty(btn.dataset.qtyDec, -1));
    });
    bagBodyEl.querySelectorAll('[data-qty-inc]').forEach((btn) => {
      btn.addEventListener('click', () => updateQty(btn.dataset.qtyInc, 1));
    });
    bagBodyEl.querySelectorAll('[data-remove-key]').forEach((btn) => {
      btn.addEventListener('click', () => removeBagItem(btn.dataset.removeKey));
    });

    bagFooterEl.innerHTML = `
      <div class="bag-total-row">
        <span>Estimated total</span>
        <strong>${formatEuro(subtotal)}</strong>
      </div>
      <p class="bag-note">Made to order in 10 weeks · White-glove European delivery quoted by postcode.</p>
      <button type="button" class="btn-velvet btn-velvet--full" id="confirm-dossier-btn">Request Order Dossier</button>
    `;

    const confirmBtn = document.getElementById('confirm-dossier-btn');
    if (confirmBtn) {
      confirmBtn.addEventListener('click', () => {
        state.bag = [];
        state.orderedSwatches.clear();
        state.orderSubmitted = true;
        updateSwatchOrderButton();
        renderBag();
      });
    }
  }

  function updateQty(key, delta) {
    const item = state.bag.find((i) => i.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      removeBagItem(key);
    } else {
      renderBag();
    }
  }

  function removeBagItem(key) {
    if (key.startsWith('swatch:')) {
      state.orderedSwatches.delete(key.replace('swatch:', ''));
      updateSwatchOrderButton();
    }
    state.bag = state.bag.filter((i) => i.key !== key);
    renderBag();
  }

  // Catalog Search
  function renderSearch(query = '') {
    if (!searchResults) return;
    const q = query.trim().toLowerCase();
    const hits = [];

    SOFAS.forEach((s) => {
      const hay = `${s.name} ${s.dimensions} ${s.depth} sofa`.toLowerCase();
      if (!q || hay.includes(q)) {
        hits.push({
          kind: 'SOFA FRAME',
          title: s.name,
          sub: `${s.dimensions} · ${formatEuro(s.price)}`,
          action: () => {
            closeDrawer();
            document.getElementById('sofas')?.scrollIntoView({ behavior: 'smooth' });
          },
        });
      }
    });

    VELVETS.forEach((v) => {
      const hay = `${v.name} ${v.fiber} ${v.batch} ${v.martindale} velvet`.toLowerCase();
      if (!q || hay.includes(q)) {
        hits.push({
          kind: `VELVET ${v.index}`,
          title: v.name,
          sub: `${v.fiber} · ${v.martindale}`,
          hex: v.hex,
          action: () => {
            selectVelvet(v.id);
            closeDrawer();
            document.getElementById('velvets')?.scrollIntoView({ behavior: 'smooth' });
          },
        });
      }
    });

    searchResults.innerHTML = '';
    if (hits.length === 0) {
      searchResults.innerHTML = '<p class="bag-note">No frames or velvets matched that query.</p>';
      return;
    }

    hits.slice(0, 12).forEach((hit) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'search-hit';
      btn.innerHTML = `
        <span class="search-hit-meta">
          <span class="search-hit-type">${hit.kind}</span>
          <strong>${hit.title}</strong>
          <span class="search-hit-sub">${hit.sub}</span>
        </span>
        ${hit.hex ? `<span class="search-hit-swatch" style="background-color: ${hit.hex}"></span>` : '<span class="mono-tag">View</span>'}
      `;
      btn.addEventListener('click', hit.action);
      searchResults.appendChild(btn);
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', (e) => renderSearch(e.target.value));
  }

  // Drawer Management
  function openDrawer(drawerEl, triggerEl) {
    if (!drawerEl) return;
    closeDrawer(false);
    state.activeDrawer = drawerEl;
    state.lastTrigger = triggerEl || null;

    if (backdrop) backdrop.hidden = false;
    drawerEl.hidden = false;

    if (triggerEl) triggerEl.setAttribute('aria-expanded', 'true');

    const firstFocus = drawerEl.querySelector('input, button, a');
    if (firstFocus) firstFocus.focus();
  }

  function closeDrawer(restoreFocus = true) {
    [navDrawer, searchDrawer, bagDrawer].forEach((d) => {
      if (d) d.hidden = true;
    });
    if (backdrop) backdrop.hidden = true;

    [menuToggle, searchToggle, bagToggle].forEach((t) => {
      if (t) t.setAttribute('aria-expanded', 'false');
    });

    if (restoreFocus && state.lastTrigger) {
      state.lastTrigger.focus();
    }
    state.activeDrawer = null;
  }

  if (menuToggle) menuToggle.addEventListener('click', () => openDrawer(navDrawer, menuToggle));
  if (searchToggle) {
    searchToggle.addEventListener('click', () => {
      renderSearch(searchInput ? searchInput.value : '');
      openDrawer(searchDrawer, searchToggle);
    });
  }
  if (bagToggle) bagToggle.addEventListener('click', () => openDrawer(bagDrawer, bagToggle));
  if (backdrop) backdrop.addEventListener('click', () => closeDrawer());

  document.querySelectorAll('[data-close-drawer]').forEach((btn) => {
    btn.addEventListener('click', () => closeDrawer());
  });

  document.querySelectorAll('.drawer-nav-link').forEach((link) => {
    link.addEventListener('click', () => closeDrawer(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && state.activeDrawer) {
      closeDrawer();
    }
  });

  // Consultation Booking Form Validation
  if (consultationForm) {
    const nameInput = document.getElementById('visit-name');
    const emailInput = document.getElementById('visit-email');
    const dateInput = document.getElementById('visit-date');
    const showroomSelect = document.getElementById('visit-showroom');
    const modelSelect = document.getElementById('visit-model');

    const errorName = document.getElementById('error-name');
    const errorEmail = document.getElementById('error-email');
    const errorDate = document.getElementById('error-date');

    function setError(input, errorEl, msg) {
      if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
      if (errorEl) errorEl.textContent = msg;
    }

    consultationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const dateVal = dateInput.value;

      if (nameVal.length < 2) {
        setError(nameInput, errorName, 'Enter your full name.');
        valid = false;
      } else {
        setError(nameInput, errorName, '');
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        setError(emailInput, errorEmail, 'Enter a valid email address.');
        valid = false;
      } else {
        setError(emailInput, errorEmail, '');
      }

      if (!dateVal) {
        setError(dateInput, errorDate, 'Select a preferred visit date.');
        valid = false;
      } else {
        setError(dateInput, errorDate, '');
      }

      if (!valid) return;

      bookingFormWrap.hidden = true;
      bookingConfirm.hidden = false;
      bookingSummaryText.textContent = `${nameVal} · ${showroomSelect.value} · ${modelSelect.value} on ${dateVal}. Confirmation sent to ${emailVal}.`;
    });

    if (bookingResetBtn) {
      bookingResetBtn.addEventListener('click', () => {
        consultationForm.reset();
        [nameInput, emailInput, dateInput].forEach((inp) => inp.setAttribute('aria-invalid', 'false'));
        [errorName, errorEmail, errorDate].forEach((err) => {
          err.textContent = '';
        });
        bookingConfirm.hidden = true;
        bookingFormWrap.hidden = false;
      });
    }
  }

  // Init
  renderSwatches();
  selectVelvet('verde-velluto');
  renderBag();
  initReveals();
})();
