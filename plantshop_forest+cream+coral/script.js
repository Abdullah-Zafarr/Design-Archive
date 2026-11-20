(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const liveAnnouncer = document.getElementById('live-announcer');

  function announce(msg) {
    if (!liveAnnouncer) return;
    liveAnnouncer.textContent = '';
    requestAnimationFrame(() => {
      liveAnnouncer.textContent = msg;
    });
  }

  /* Header scroll condensation */
  function syncHeaderScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  }
  window.addEventListener('scroll', syncHeaderScroll, { passive: true });
  syncHeaderScroll();

  /* Mobile navigation drawer */
  function setDrawerOpen(open) {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileDrawer.hidden = !open;
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const next = menuToggle.getAttribute('aria-expanded') !== 'true';
      setDrawerOpen(next);
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });

    document.addEventListener('click', (ev) => {
      if (!mobileDrawer.hidden && header && !header.contains(ev.target)) {
        setDrawerOpen(false);
      }
    });
  }

  /* Specimen category filter tabs */
  const filterTabs = [...document.querySelectorAll('.filter-tab')];
  const specimenCards = [...document.querySelectorAll('.specimen-card')];
  const emptyState = document.getElementById('specimen-empty');
  const resetFilterBtn = document.getElementById('reset-filter-btn');

  function applyFilter(filter) {
    let visibleCount = 0;
    filterTabs.forEach((tab) => {
      const active = tab.dataset.filter === filter;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    specimenCards.forEach((card) => {
      const tags = (card.dataset.tags || '').split(/\s+/);
      const match = filter === 'all' || tags.includes(filter);
      card.hidden = !match;
      if (match) visibleCount += 1;
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }

    announce(`Showing ${visibleCount} specimen${visibleCount === 1 ? '' : 's'}`);
  }

  filterTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => applyFilter(tab.dataset.filter || 'all'));
    tab.addEventListener('keydown', (ev) => {
      if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
      ev.preventDefault();
      const dir = ev.key === 'ArrowRight' ? 1 : -1;
      const target = filterTabs[(idx + dir + filterTabs.length) % filterTabs.length];
      target.focus();
      applyFilter(target.dataset.filter || 'all');
    });
  });

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      applyFilter('all');
      filterTabs[0]?.focus();
    });
  }

  /* Planter glaze picker synced to hero SVG and blueprint card */
  const GLAZES = {
    coral: {
      name: 'Terracotta Coral',
      sku: 'GLZ-01',
      note: 'Includes cork floor pad and 14 mm clay drainage hole.',
      rim: ['#FA8B6B', '#FF9F82', '#FF7F5A', '#E5633E'],
      body: ['#F68464', '#FFA286', '#FF7F5A', '#DE5D39'],
    },
    forest: {
      name: 'Forest Matte',
      sku: 'GLZ-02',
      note: 'High-fired botanical satin glaze with frost-resistant wall.',
      rim: ['#32503F', '#4A6E59', '#2F4A3A', '#1E3327'],
      body: ['#2E4939', '#456853', '#2B4435', '#192C21'],
    },
    sandstone: {
      name: 'Sandstone',
      sku: 'GLZ-03',
      note: 'Speckled buff grog stoneware fired unglazed at 1220 C.',
      rim: ['#D2BE9E', '#E5D5BC', '#CDB897', '#B69F7D'],
      body: ['#CEBA9B', '#E2D2B8', '#C6B08E', '#AE9674'],
    },
  };

  let activeGlazeKey = 'coral';
  const glazeOptions = [...document.querySelectorAll('.glaze-option')];
  const blueprintSku = document.getElementById('blueprint-sku');
  const blueprintTitle = document.getElementById('blueprint-title');
  const blueprintNote = document.getElementById('blueprint-note');
  const selectedGlazeLabel = document.getElementById('selected-glaze-label');

  function setGlaze(key) {
    const spec = GLAZES[key];
    if (!spec) return;
    activeGlazeKey = key;

    glazeOptions.forEach((btn) => {
      const selected = btn.dataset.glaze === key;
      btn.classList.toggle('is-active', selected);
      btn.setAttribute('aria-checked', String(selected));
    });

    spec.rim.forEach((hex, idx) => {
      document.getElementById(`rim-stop-${idx}`)?.setAttribute('stop-color', hex);
      document.getElementById(`prev-rim-${idx}`)?.setAttribute('stop-color', hex);
    });
    spec.body.forEach((hex, idx) => {
      document.getElementById(`body-stop-${idx}`)?.setAttribute('stop-color', hex);
      document.getElementById(`prev-body-${idx}`)?.setAttribute('stop-color', hex);
    });

    if (blueprintSku) blueprintSku.textContent = spec.sku;
    if (blueprintTitle) blueprintTitle.textContent = spec.name;
    if (blueprintNote) blueprintNote.textContent = spec.note;
    if (selectedGlazeLabel) selectedGlazeLabel.textContent = spec.name;

    announce(`Planter glaze set to ${spec.name}`);
  }

  glazeOptions.forEach((btn, idx) => {
    btn.addEventListener('click', () => setGlaze(btn.dataset.glaze || 'coral'));
    btn.addEventListener('keydown', (ev) => {
      if (ev.key !== 'ArrowDown' && ev.key !== 'ArrowRight' && ev.key !== 'ArrowUp' && ev.key !== 'ArrowLeft') return;
      ev.preventDefault();
      const dir = (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') ? 1 : -1;
      const target = glazeOptions[(idx + dir + glazeOptions.length) % glazeOptions.length];
      target.focus();
      setGlaze(target.dataset.glaze || 'coral');
    });
  });

  /* Care guide tabs */
  const careTabs = [...document.querySelectorAll('.care-tab')];
  const carePanels = [...document.querySelectorAll('.care-panel')];

  function activateCareTab(key) {
    careTabs.forEach((tab) => {
      const active = tab.dataset.careTab === key;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    carePanels.forEach((panel) => {
      panel.hidden = panel.id !== `panel-${key}`;
    });
  }

  careTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => activateCareTab(tab.dataset.careTab || 'watering'));
    tab.addEventListener('keydown', (ev) => {
      if (ev.key !== 'ArrowRight' && ev.key !== 'ArrowLeft') return;
      ev.preventDefault();
      const dir = ev.key === 'ArrowRight' ? 1 : -1;
      const target = careTabs[(idx + dir + careTabs.length) % careTabs.length];
      target.focus();
      activateCareTab(target.dataset.careTab || 'watering');
    });
  });

  /* Live Bag Drawer & Cart State */
  const bagToggle = document.getElementById('bag-toggle');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartClose = document.getElementById('cart-close');
  const cartItemsEl = document.getElementById('cart-items');
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalEl = document.getElementById('cart-total');
  const cartCheckoutBtn = document.getElementById('cart-checkout-btn');
  const cartConfirmEl = document.getElementById('cart-confirm');

  const cart = new Map();

  function renderCart() {
    if (!cartItemsEl || !cartCountEl || !cartTotalEl) return;

    let totalQty = 0;
    let totalCost = 0;
    cart.forEach((item) => {
      totalQty += item.qty;
      totalCost += item.price * item.qty;
    });

    cartCountEl.textContent = String(totalQty);
    cartTotalEl.textContent = `£${totalCost}`;

    if (cart.size === 0) {
      cartItemsEl.innerHTML = '<p class="cart-empty">Your specimen bag is empty. Add any XL plant from the floor to pair it with your chosen planter glaze.</p>';
      return;
    }

    const fragment = document.createDocumentFragment();
    cart.forEach((item, key) => {
      const row = document.createElement('div');
      row.className = 'cart-item';

      const top = document.createElement('div');
      top.className = 'cart-item-top';

      const info = document.createElement('div');
      const title = document.createElement('div');
      title.className = 'cart-item-name';
      title.textContent = item.name;
      const glaze = document.createElement('div');
      glaze.className = 'cart-item-glaze';
      glaze.textContent = `Glaze: ${item.glazeName}`;
      info.append(title, glaze);

      const price = document.createElement('div');
      price.className = 'cart-item-price';
      price.textContent = `£${item.price * item.qty}`;
      top.append(info, price);

      const actions = document.createElement('div');
      actions.className = 'cart-item-actions';

      const decBtn = document.createElement('button');
      decBtn.type = 'button';
      decBtn.className = 'qty-btn';
      decBtn.textContent = '-';
      decBtn.setAttribute('aria-label', `Decrease quantity of ${item.name}`);
      decBtn.addEventListener('click', () => updateCartQty(key, -1));

      const qtyVal = document.createElement('span');
      qtyVal.className = 'qty-val';
      qtyVal.textContent = String(item.qty);

      const incBtn = document.createElement('button');
      incBtn.type = 'button';
      incBtn.className = 'qty-btn';
      incBtn.textContent = '+';
      incBtn.setAttribute('aria-label', `Increase quantity of ${item.name}`);
      incBtn.addEventListener('click', () => updateCartQty(key, 1));

      const rmBtn = document.createElement('button');
      rmBtn.type = 'button';
      rmBtn.className = 'remove-btn';
      rmBtn.textContent = 'Remove';
      rmBtn.addEventListener('click', () => {
        cart.delete(key);
        renderCart();
      });

      actions.append(decBtn, qtyVal, incBtn, rmBtn);
      row.append(top, actions);
      fragment.appendChild(row);
    });

    cartItemsEl.innerHTML = '';
    cartItemsEl.appendChild(fragment);
  }

  function updateCartQty(key, delta) {
    const item = cart.get(key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart.delete(key);
    }
    if (cartConfirmEl) cartConfirmEl.hidden = true;
    renderCart();
  }

  function setCartOpen(open) {
    if (!cartDrawer || !bagToggle) return;
    cartDrawer.hidden = !open;
    bagToggle.setAttribute('aria-expanded', String(open));
    if (open) {
      cartClose?.focus();
    } else {
      bagToggle.focus();
    }
  }

  document.querySelectorAll('.add-bag-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.specimen-card');
      if (!card) return;
      const id = card.dataset.id || '';
      const name = card.dataset.name || 'Specimen';
      const price = Number(card.dataset.price || 0);
      const glazeName = GLAZES[activeGlazeKey]?.name || 'Terracotta Coral';
      const key = `${id}::${activeGlazeKey}`;

      const existing = cart.get(key);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.set(key, { id, name, price, glazeName, qty: 1 });
      }

      if (cartConfirmEl) cartConfirmEl.hidden = true;
      renderCart();

      const originalLabel = btn.textContent;
      btn.textContent = 'Added';
      setTimeout(() => {
        btn.textContent = originalLabel;
      }, 950);

      announce(`Added ${name} in ${glazeName} to bag`);
    });
  });

  if (bagToggle) {
    bagToggle.addEventListener('click', () => {
      renderCart();
      setCartOpen(true);
    });
  }

  cartClose?.addEventListener('click', () => setCartOpen(false));
  cartBackdrop?.addEventListener('click', () => setCartOpen(false));

  cartCheckoutBtn?.addEventListener('click', () => {
    if (!cartConfirmEl) return;
    if (cart.size === 0) {
      cartConfirmEl.textContent = 'Add at least one specimen before requesting a van slot.';
      cartConfirmEl.hidden = false;
      return;
    }
    let count = 0;
    cart.forEach((item) => {
      count += item.qty;
    });
    cartConfirmEl.textContent = `Preview confirmed: ${count} specimen${count === 1 ? '' : 's'} queued for Thursday London greenhouse dispatch.`;
    cartConfirmEl.hidden = false;
  });

  renderCart();

  /* Global Escape handler for drawer and bag */
  document.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Escape') return;
    if (cartDrawer && !cartDrawer.hidden) {
      setCartOpen(false);
      return;
    }
    if (mobileDrawer && !mobileDrawer.hidden) {
      setDrawerOpen(false);
      menuToggle?.focus();
    }
  });

  /* Restock alert form with inline validation and reset */
  const restockForm = document.getElementById('restock-form');
  const restockSpecies = document.getElementById('restock-species');
  const restockEmail = document.getElementById('restock-email');
  const restockError = document.getElementById('restock-error');
  const restockSuccess = document.getElementById('restock-success');
  const restockSuccessMsg = document.getElementById('restock-success-msg');
  const restockReset = document.getElementById('restock-reset');

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (restockForm && restockEmail && restockError && restockSuccess && restockSuccessMsg) {
    restockForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const email = restockEmail.value.trim();
      const species = restockSpecies ? restockSpecies.value : 'Monstera Deliciosa XL';

      if (!EMAIL_RE.test(email)) {
        restockError.textContent = 'Enter a valid email address such as alex@example.com.';
        restockError.hidden = false;
        restockEmail.setAttribute('aria-invalid', 'true');
        restockEmail.focus();
        return;
      }

      restockError.hidden = true;
      restockEmail.removeAttribute('aria-invalid');
      restockForm.hidden = true;
      restockSuccessMsg.textContent = `Registered ${email} for the next ${species} greenhouse release.`;
      restockSuccess.hidden = false;
      announce(`Restock alert saved for ${species}`);
    });

    restockEmail.addEventListener('input', () => {
      if (!restockError.hidden && EMAIL_RE.test(restockEmail.value.trim())) {
        restockError.hidden = true;
        restockEmail.removeAttribute('aria-invalid');
      }
    });

    restockReset?.addEventListener('click', () => {
      restockSuccess.hidden = true;
      restockForm.hidden = false;
      restockEmail.value = '';
      restockEmail.focus();
    });
  }
})();
