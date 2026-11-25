(() => {
  const PRODUCTS = {
    'classic-amalfi': {
      name: 'Classic Amalfi',
      price: 24,
      chill: '4 °C',
      co2: '5.2 g/L',
      brix: '8.4 °Bx',
      ph: '2.65',
    },
    'lavender-zest': {
      name: 'Lavender Zest',
      price: 25,
      chill: '4 °C',
      co2: '5.0 g/L',
      brix: '7.9 °Bx',
      ph: '2.72',
    },
    'blood-orange': {
      name: 'Blood Orange',
      price: 26,
      chill: '4 °C',
      co2: '4.8 g/L',
      brix: '9.1 °Bx',
      ph: '2.88',
    },
    'meyer-tonic': {
      name: 'Meyer Tonic',
      price: 24,
      chill: '4 °C',
      co2: '5.6 g/L',
      brix: '0.0 °Bx',
      ph: '2.58',
    },
  };

  const MAX_CASE_CANS = 12;

  const state = {
    cart: {},
    builder: {
      'classic-amalfi': 3,
      'lavender-zest': 3,
      'blood-orange': 3,
      'meyer-tonic': 3,
    },
    specMode: 'chill',
  };

  let lastFocusedTrigger = null;

  // Elements
  const filterTabs = Array.from(document.querySelectorAll('.filter-pill[role="tab"]'));
  const flavourCards = document.querySelectorAll('.flavour-card');
  const specToggleBtns = document.querySelectorAll('.spec-toggle-btn');
  const nutritionToggles = document.querySelectorAll('.nutrition-toggle');
  const liveStatus = document.getElementById('live-status');
  const addButtons = document.querySelectorAll('[data-add-id]');
  const headerCaseCount = document.getElementById('header-case-count');

  const backdrop = document.getElementById('drawer-backdrop');
  const caseDrawer = document.getElementById('case-drawer');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const openCaseBtn = document.getElementById('open-case-btn');
  const closeCaseBtn = document.getElementById('close-case-btn');
  const openMenuBtn = document.getElementById('open-menu-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const drawerCheckoutLink = document.getElementById('drawer-checkout-link');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  const cartList = document.getElementById('cart-list');
  const caseEmptyMsg = document.getElementById('case-empty-msg');
  const cartSubtotal = document.getElementById('cart-subtotal');

  const builderCount = document.getElementById('builder-count');
  const builderProgress = document.getElementById('builder-progress');
  const quickFillBtn = document.getElementById('quick-fill-btn');
  const stepperButtons = document.querySelectorAll('.stepper-btn');

  const dispatchForm = document.getElementById('dispatch-form');
  const formError = document.getElementById('form-error');
  const dispatchConfirmation = document.getElementById('dispatch-confirmation');
  const confirmDetails = document.getElementById('confirm-details');

  function announce(message) {
    if (!liveStatus) return;
    liveStatus.textContent = '';
    requestAnimationFrame(() => {
      liveStatus.textContent = message;
    });
  }

  // Filter Tabs + Arrow Key Navigation
  function activateFilterTab(tab) {
    const target = tab.dataset.filter;
    let visibleCount = 0;

    filterTabs.forEach((btn) => {
      const active = btn === tab;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
      btn.setAttribute('tabindex', active ? '0' : '-1');
    });

    flavourCards.forEach((card) => {
      const match = target === 'all' || card.dataset.category === target;
      card.hidden = !match;
      if (match) visibleCount += 1;
    });

    const label = tab.textContent.trim();
    const total = flavourCards.length;
    announce(
      target === 'all'
        ? `Showing all ${total} flavours.`
        : `Showing ${visibleCount} of ${total} flavours: ${label}.`
    );
  }

  filterTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activateFilterTab(tab));

    tab.addEventListener('keydown', (ev) => {
      let nextIndex = null;
      if (ev.key === 'ArrowRight') {
        nextIndex = (index + 1) % filterTabs.length;
      } else if (ev.key === 'ArrowLeft') {
        nextIndex = (index - 1 + filterTabs.length) % filterTabs.length;
      } else if (ev.key === 'Home') {
        nextIndex = 0;
      } else if (ev.key === 'End') {
        nextIndex = filterTabs.length - 1;
      }

      if (nextIndex !== null) {
        ev.preventDefault();
        const nextTab = filterTabs[nextIndex];
        nextTab.focus();
        activateFilterTab(nextTab);
      }
    });
  });

  // Chill & CO2 vs Brix & pH Spec Toggle
  function renderSpecMode(mode) {
    state.specMode = mode;
    specToggleBtns.forEach((btn) => {
      const active = btn.dataset.specMode === mode;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    flavourCards.forEach((card) => {
      const product = PRODUCTS[card.dataset.flavourId];
      if (!product) return;
      const primaryLabel = card.querySelector('[data-spec-label="primary"]');
      const primaryVal = card.querySelector('[data-spec-val="primary"]');
      const secondaryLabel = card.querySelector('[data-spec-label="secondary"]');
      const secondaryVal = card.querySelector('[data-spec-val="secondary"]');

      if (mode === 'chill') {
        if (primaryLabel) primaryLabel.textContent = 'Chill';
        if (primaryVal) primaryVal.textContent = product.chill;
        if (secondaryLabel) secondaryLabel.textContent = 'CO₂';
        if (secondaryVal) secondaryVal.textContent = product.co2;
      } else {
        if (primaryLabel) primaryLabel.textContent = 'Brix';
        if (primaryVal) primaryVal.textContent = product.brix;
        if (secondaryLabel) secondaryLabel.textContent = 'pH';
        if (secondaryVal) secondaryVal.textContent = product.ph;
      }
    });
  }

  specToggleBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.specMode;
      renderSpecMode(mode);
      announce(
        mode === 'chill'
          ? 'Showing chill temperature and CO₂ specs.'
          : 'Showing Brix and pH specs.'
      );
    });
  });

  // Expandable Per-Flavour Nutrition Spec Strip
  nutritionToggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const panelId = btn.getAttribute('aria-controls');
      const panel = panelId ? document.getElementById(panelId) : null;
      if (!panel) return;
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const nextExpanded = !expanded;
      btn.setAttribute('aria-expanded', String(nextExpanded));
      panel.hidden = !nextExpanded;
      const icon = btn.querySelector('.nutrition-toggle-icon');
      if (icon) icon.textContent = nextExpanded ? '−' : '+';
    });
  });

  // Drawers
  function isAnyDrawerOpen() {
    return !caseDrawer.hidden || !mobileDrawer.hidden;
  }

  function closeAllDrawers({ restoreFocus = true } = {}) {
    const wasOpen = isAnyDrawerOpen();
    caseDrawer.hidden = true;
    mobileDrawer.hidden = true;
    backdrop.hidden = true;
    openCaseBtn.setAttribute('aria-expanded', 'false');
    openMenuBtn.setAttribute('aria-expanded', 'false');

    if (wasOpen && restoreFocus && lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
      lastFocusedTrigger.focus();
    }
    lastFocusedTrigger = null;
  }

  function openDrawer(drawerEl, triggerEl) {
    const restoreEl = triggerEl || document.activeElement;
    closeAllDrawers({ restoreFocus: false });
    lastFocusedTrigger = restoreEl;
    drawerEl.hidden = false;
    backdrop.hidden = false;
    if (drawerEl === caseDrawer) {
      openCaseBtn.setAttribute('aria-expanded', 'true');
    } else if (drawerEl === mobileDrawer) {
      openMenuBtn.setAttribute('aria-expanded', 'true');
    }
    const closeBtn = drawerEl.querySelector('.drawer-close');
    if (closeBtn) closeBtn.focus();
  }

  openCaseBtn.addEventListener('click', () => openDrawer(caseDrawer, openCaseBtn));
  closeCaseBtn.addEventListener('click', () => closeAllDrawers());
  openMenuBtn.addEventListener('click', () => openDrawer(mobileDrawer, openMenuBtn));
  closeMenuBtn.addEventListener('click', () => closeAllDrawers());
  backdrop.addEventListener('click', () => closeAllDrawers());
  drawerCheckoutLink.addEventListener('click', () => closeAllDrawers({ restoreFocus: false }));
  mobileNavLinks.forEach((link) => link.addEventListener('click', () => closeAllDrawers({ restoreFocus: false })));

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && isAnyDrawerOpen()) {
      closeAllDrawers();
    }
  });

  // Cart Rendering
  function renderCart() {
    const entries = Object.entries(state.cart).filter(([, qty]) => qty > 0);
    const totalPacks = entries.reduce((sum, [, qty]) => sum + qty, 0);
    const totalAmount = entries.reduce((sum, [id, qty]) => sum + PRODUCTS[id].price * qty, 0);

    headerCaseCount.textContent = String(totalPacks);
    cartSubtotal.textContent = `£${totalAmount.toFixed(2)}`;
    caseEmptyMsg.hidden = entries.length > 0;
    cartList.innerHTML = '';

    entries.forEach(([id, qty]) => {
      const product = PRODUCTS[id];
      const li = document.createElement('li');
      li.className = 'cart-item';
      li.innerHTML = `
        <div>
          <span class="cart-item-title">${product.name} (12-pack)</span>
          <span class="cart-item-price">£${(product.price * qty).toFixed(2)}</span>
        </div>
        <div class="stepper">
          <button type="button" class="stepper-btn" data-cart-step="minus" data-cart-id="${id}" aria-label="Decrease ${product.name} packs">-</button>
          <span class="stepper-val">${qty}</span>
          <button type="button" class="stepper-btn" data-cart-step="plus" data-cart-id="${id}" aria-label="Increase ${product.name} packs">+</button>
        </div>
      `;
      cartList.appendChild(li);
    });

    return { totalPacks, totalAmount };
  }

  addButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.addId;
      state.cart[id] = (state.cart[id] || 0) + 1;
      const { totalPacks, totalAmount } = renderCart();
      announce(
        `Added ${PRODUCTS[id].name} 12-pack to case. ${totalPacks} ${totalPacks === 1 ? 'pack' : 'packs'} in case, subtotal £${totalAmount.toFixed(2)}.`
      );
      openDrawer(caseDrawer, btn);
    });
  });

  cartList.addEventListener('click', (ev) => {
    const target = ev.target.closest('[data-cart-step]');
    if (!target) return;
    const id = target.dataset.cartId;
    const delta = target.dataset.cartStep === 'plus' ? 1 : -1;
    const next = (state.cart[id] || 0) + delta;
    if (next <= 0) {
      delete state.cart[id];
    } else {
      state.cart[id] = next;
    }
    const { totalPacks, totalAmount } = renderCart();
    if (totalPacks === 0) {
      announce(`Removed ${PRODUCTS[id].name} from case. Your case is now empty.`);
    } else {
      announce(
        `Updated ${PRODUCTS[id].name} to ${next} ${next === 1 ? 'pack' : 'packs'}. Subtotal £${totalAmount.toFixed(2)}.`
      );
    }
  });

  // 12-Can Tasting Case Builder
  function getBuilderTotal() {
    return Object.values(state.builder).reduce((sum, n) => sum + n, 0);
  }

  function renderBuilder() {
    const total = getBuilderTotal();
    builderCount.textContent = `${total} / ${MAX_CASE_CANS} cans`;
    builderProgress.style.width = `${(total / MAX_CASE_CANS) * 100}%`;

    Object.entries(state.builder).forEach(([id, qty]) => {
      const el = document.getElementById(`qty-${id}`);
      if (el) el.textContent = String(qty);
    });
  }

  stepperButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      const step = btn.dataset.step;
      const currentTotal = getBuilderTotal();

      if (step === 'plus' && currentTotal < MAX_CASE_CANS) {
        state.builder[id] += 1;
      } else if (step === 'minus' && state.builder[id] > 0) {
        state.builder[id] -= 1;
      }
      renderBuilder();
    });
  });

  quickFillBtn.addEventListener('click', () => {
    state.builder = {
      'classic-amalfi': 3,
      'lavender-zest': 3,
      'blood-orange': 3,
      'meyer-tonic': 3,
    };
    renderBuilder();
  });

  // Dispatch Form Validation
  dispatchForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    formError.textContent = '';

    const totalCans = getBuilderTotal();
    if (totalCans !== MAX_CASE_CANS) {
      formError.textContent = `Select ${MAX_CASE_CANS} cans in your tasting case before dispatching (${totalCans} selected).`;
      return;
    }

    const name = dispatchForm.elements.name.value.trim();
    const email = dispatchForm.elements.email.value.trim();
    const address = dispatchForm.elements.address.value.trim();
    const city = dispatchForm.elements.city.value;
    const postcode = dispatchForm.elements.postcode.value.trim();

    if (!name || !email || !address || !postcode) {
      formError.textContent = 'Complete all delivery fields to schedule chilled dispatch.';
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      formError.textContent = 'Enter a valid email address for dispatch tracking.';
      return;
    }

    const mixSummary = Object.entries(state.builder)
      .filter(([, qty]) => qty > 0)
      .map(([id, qty]) => `${qty}x ${PRODUCTS[id].name}`)
      .join(', ');

    confirmDetails.textContent = `Scheduled for ${name} in ${city} (${postcode}): ${mixSummary}.`;
    dispatchConfirmation.hidden = false;
  });

  renderCart();
  renderBuilder();
})();
