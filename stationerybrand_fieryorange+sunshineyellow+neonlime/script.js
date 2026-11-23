const PRODUCTS = [
  {
    id: 'lime-normal',
    sku: 'ST-01',
    name: 'Neon Lime Masking Roll',
    category: 'neon',
    width: '24 mm',
    length: '25 m',
    price: 6.5,
    color: '#D0F030',
    accent: '#000000',
    pattern: 'solid',
    note: 'Matte crepe, clean 30-day peel',
  },
  {
    id: 'fiery-crepe',
    sku: 'ST-02',
    name: 'Fiery Orange Studio Roll',
    category: 'neon',
    width: '24 mm',
    length: '25 m',
    price: 6.5,
    color: '#F04400',
    accent: '#FFD91A',
    pattern: 'solid',
    note: 'High-visibility binder & spine tape',
  },
  {
    id: 'sunshine-washi',
    sku: 'ST-03',
    name: 'Sunshine Yellow Slim Roll',
    category: 'neon',
    width: '15 mm',
    length: '25 m',
    price: 5.5,
    color: '#FFD91A',
    accent: '#000000',
    pattern: 'solid',
    note: 'Journal headers & quick flags',
  },
  {
    id: 'fiery-wide',
    sku: 'ST-04',
    name: 'Fiery Wide Parcel Tape',
    category: 'neon',
    width: '48 mm',
    length: '25 m',
    price: 9.0,
    color: '#F04400',
    accent: '#FFFFFF',
    pattern: 'stripe',
    note: 'Heavy crepe for kraft mailers',
  },
  {
    id: 'chalk-grid',
    sku: 'ST-05',
    name: 'Chalk 5 mm Grid Washi',
    category: 'grid',
    width: '15 mm',
    length: '25 m',
    price: 7.0,
    color: '#F4F1E8',
    accent: '#000000',
    pattern: 'grid',
    note: '5 mm black rule for wall planners',
  },
  {
    id: 'lime-dotted',
    sku: 'ST-06',
    name: 'Neon Lime Dotted Index',
    category: 'grid',
    width: '15 mm',
    length: '25 m',
    price: 6.5,
    color: '#D0F030',
    accent: '#000000',
    pattern: 'dots',
    note: 'Micro-dot matrix for page tabs',
  },
  {
    id: 'yellow-check',
    sku: 'ST-07',
    name: 'Sunshine Gingham Border',
    category: 'grid',
    width: '24 mm',
    length: '25 m',
    price: 7.0,
    color: '#FFD91A',
    accent: '#F04400',
    pattern: 'check',
    note: 'Two-tone orange check over yellow',
  },
  {
    id: 'neon-trio',
    sku: 'ST-08',
    name: 'Primary Desk Trio Pack',
    category: 'bundle',
    width: '15 / 24 mm',
    length: '3 x 25 m',
    price: 17.5,
    color: '#D0F030',
    accent: '#F04400',
    pattern: 'trio',
    note: 'Lime, Yellow & Fiery Orange box',
  },
];

const SWATCH_PALETTE = [
  { id: 'neon-lime', name: 'Neon Lime', hex: '#D0F030', ink: '#000000' },
  { id: 'fiery-orange', name: 'Fiery Orange', hex: '#F04400', ink: '#FFFFFF' },
  { id: 'sunshine-yellow', name: 'Sunshine Yellow', hex: '#FFD91A', ink: '#000000' },
  { id: 'jet-black', name: 'Jet Black', hex: '#000000', ink: '#FFD91A' },
  { id: 'chalk-grid', name: 'Chalk Grid', hex: '#F4F1E8', ink: '#000000' },
  { id: 'cobalt-ink', name: 'Cobalt Ink', hex: '#1B49F0', ink: '#FFFFFF' },
  { id: 'kraft-sand', name: 'Kraft Paper', hex: '#D7B98E', ink: '#000000' },
  { id: 'coral-pop', name: 'Coral Red', hex: '#FF5C38', ink: '#000000' },
];

const state = {
  filter: 'all',
  search: '',
  cart: [],
  activeSlot: 0,
  slots: [
    { swatch: SWATCH_PALETTE[0], width: '24 mm' },
    { swatch: SWATCH_PALETTE[1], width: '24 mm' },
    { swatch: SWATCH_PALETTE[2], width: '15 mm' },
    { swatch: SWATCH_PALETTE[3], width: '48 mm' },
  ],
};

function formatEuro(value) {
  return `€${value.toFixed(2)}`;
}

function renderTapeRollSvg(product) {
  const { color, accent, pattern } = product;
  let patternOverlay = '';
  if (pattern === 'grid') {
    patternOverlay = `<path d="M24 54h132M24 66h132M36 44v34M52 44v34M68 44v34M84 44v34" stroke="${accent}" stroke-width="1" opacity="0.45" />`;
  } else if (pattern === 'dots') {
    patternOverlay = `<circle cx="38" cy="56" r="2" fill="${accent}" /><circle cx="52" cy="64" r="2" fill="${accent}" /><circle cx="66" cy="56" r="2" fill="${accent}" /><circle cx="80" cy="64" r="2" fill="${accent}" />`;
  } else if (pattern === 'check') {
    patternOverlay = `<rect x="24" y="46" width="16" height="16" fill="${accent}" opacity="0.7" /><rect x="56" y="46" width="16" height="16" fill="${accent}" opacity="0.7" /><rect x="40" y="62" width="16" height="16" fill="${accent}" opacity="0.7" />`;
  } else if (pattern === 'trio') {
    return `
      <svg viewBox="0 0 180 110" width="160" height="96" aria-hidden="true">
        <circle cx="56" cy="58" r="28" fill="#F04400" stroke="#000000" stroke-width="2" />
        <circle cx="56" cy="58" r="11" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
        <circle cx="92" cy="52" r="28" fill="#FFD91A" stroke="#000000" stroke-width="2" />
        <circle cx="92" cy="52" r="11" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
        <circle cx="126" cy="60" r="28" fill="#D0F030" stroke="#000000" stroke-width="2" />
        <circle cx="126" cy="60" r="11" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
      </svg>
    `;
  }
  return `
    <svg viewBox="0 0 180 110" width="160" height="96" aria-hidden="true">
      <path d="M22 44h88v34H22l6-9-6-8 6-9-6-8z" fill="${color}" stroke="#000000" stroke-width="2" stroke-linejoin="round" />
      ${patternOverlay}
      <circle cx="118" cy="56" r="34" fill="${color}" stroke="#000000" stroke-width="2" />
      <circle cx="118" cy="56" r="14" fill="#FFFFFF" stroke="#000000" stroke-width="2" />
      <circle cx="118" cy="48" r="2.5" fill="#000000" />
    </svg>
  `;
}

/* CATALOG */
function renderCatalog() {
  const grid = document.getElementById('products-grid');
  const empty = document.getElementById('products-empty');
  const clearBtn = document.getElementById('search-clear-btn');

  const query = state.search.trim().toLowerCase();
  clearBtn.hidden = query.length === 0;

  const filtered = PRODUCTS.filter((item) => {
    const matchesCategory = state.filter === 'all' || item.category === state.filter;
    const matchesQuery =
      !query ||
      item.name.toLowerCase().includes(query) ||
      item.width.toLowerCase().includes(query) ||
      item.sku.toLowerCase().includes(query) ||
      item.note.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  if (filtered.length === 0) {
    grid.innerHTML = '';
    empty.hidden = false;
    return;
  }

  empty.hidden = true;
  grid.innerHTML = filtered
    .map(
      (item, index) => `
    <article class="product-card reveal is-visible delay-${(index % 4) + 1}">
      <div>
        <div class="product-visual">
          <span class="product-sku tabular">${item.sku}</span>
          <span class="product-width-badge tabular">${item.width}</span>
          ${renderTapeRollSvg(item)}
        </div>
        <h3 class="product-name">${item.name}</h3>
        <p class="product-specs tabular">${item.width} · ${item.length} · ${item.note}</p>
      </div>
      <div class="product-bottom">
        <span class="product-price tabular">${formatEuro(item.price)}</span>
        <button type="button" class="add-cart-btn" data-add-id="${item.id}">Add to Cart</button>
      </div>
    </article>
  `,
    )
    .join('');
}

/* CART / TAPE BAG */
function addToCart(itemObj) {
  const existing = state.cart.find((entry) => entry.key === itemObj.key);
  if (existing) {
    existing.qty += 1;
  } else {
    state.cart.push({ ...itemObj, qty: 1 });
  }
  renderCart();
}

function addProductIdToCart(productId) {
  const prod = PRODUCTS.find((p) => p.id === productId);
  if (!prod) return;
  addToCart({
    key: prod.id,
    name: prod.name,
    meta: `${prod.width} · ${prod.length}`,
    price: prod.price,
    color: prod.color,
  });
}

function updateCartQty(key, delta) {
  const index = state.cart.findIndex((entry) => entry.key === key);
  if (index === -1) return;
  state.cart[index].qty += delta;
  if (state.cart[index].qty <= 0) {
    state.cart.splice(index, 1);
  }
  renderCart();
}

function renderCart() {
  const totalCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = state.cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  document.getElementById('header-bag-count').textContent = String(totalCount);
  document.getElementById('mobile-bag-count').textContent = `(${totalCount})`;
  document.getElementById('cta-bag-count').textContent = `(${totalCount})`;
  document.getElementById('drawer-item-count').textContent = `${totalCount} ${totalCount === 1 ? 'item' : 'items'}`;
  document.getElementById('bag-subtotal').textContent = formatEuro(subtotal);

  const threshold = 35;
  const remaining = Math.max(0, threshold - subtotal);
  const pct = Math.min(100, (subtotal / threshold) * 100);
  document.getElementById('shipping-fill').style.width = `${pct}%`;
  document.getElementById('shipping-note').textContent =
    remaining === 0
      ? 'Free studio shipping unlocked on this order'
      : `Add ${formatEuro(remaining)} of tape rolls for free studio shipping`;

  const container = document.getElementById('bag-items');
  const confirmed = document.getElementById('bag-confirmed');
  confirmed.hidden = true;

  if (state.cart.length === 0) {
    container.innerHTML = '<p class="bag-empty">Your Tape Bag is empty. Add single rolls, DIY pairings, or a custom 4-pack.</p>';
    return;
  }

  container.innerHTML = state.cart
    .map(
      (item) => `
    <div class="bag-item">
      <div class="bag-swatch" style="background-color: ${item.color};"></div>
      <div>
        <p class="bag-item-title">${item.name}</p>
        <p class="bag-item-meta tabular">${item.meta} · ${formatEuro(item.price)}</p>
      </div>
      <div class="bag-item-controls">
        <button type="button" class="qty-btn" data-qty-key="${item.key}" data-delta="-1" aria-label="Decrease quantity of ${item.name}">-</button>
        <span class="tabular">${item.qty}</span>
        <button type="button" class="qty-btn" data-qty-key="${item.key}" data-delta="1" aria-label="Increase quantity of ${item.name}">+</button>
      </div>
    </div>
  `,
    )
    .join('');
}

function openBagDrawer() {
  const drawer = document.getElementById('bag-drawer');
  const backdrop = document.getElementById('bag-backdrop');
  drawer.hidden = false;
  backdrop.hidden = false;
  drawer.setAttribute('aria-hidden', 'false');
  document.getElementById('bag-close-btn').focus();
}

function closeBagDrawer() {
  const drawer = document.getElementById('bag-drawer');
  const backdrop = document.getElementById('bag-backdrop');
  drawer.hidden = true;
  backdrop.hidden = true;
  drawer.setAttribute('aria-hidden', 'true');
}

/* CUSTOM 4-PACK BUILDER */
function renderBuilder() {
  const slotsWrap = document.getElementById('pack-slots');
  const visualWrap = document.getElementById('pack-visualizer');
  const swatchGrid = document.getElementById('swatch-grid');
  const manifestList = document.getElementById('manifest-list');
  const activeSlotLabel = document.getElementById('active-slot-label');

  const current = state.slots[state.activeSlot];
  activeSlotLabel.textContent = `0${state.activeSlot + 1}`;

  slotsWrap.innerHTML = state.slots
    .map(
      (slot, idx) => `
    <button type="button" class="slot-btn ${idx === state.activeSlot ? 'is-active' : ''}" role="radio" aria-checked="${idx === state.activeSlot}" data-slot-index="${idx}">
      <span class="slot-index tabular">SLOT 0${idx + 1}</span>
      <span class="slot-color-chip" style="background-color: ${slot.swatch.hex};"></span>
      <span class="slot-name">${slot.swatch.name}</span>
      <span class="slot-width tabular">${slot.width}</span>
    </button>
  `,
    )
    .join('');

  visualWrap.innerHTML = state.slots
    .map((slot, idx) => {
      const heightMap = { '15 mm': 56, '24 mm': 76, '48 mm': 102 };
      const h = heightMap[slot.width] || 76;
      return `
      <div class="visual-roll">
        <div class="visual-roll-cylinder tabular" style="height: ${h}px; background-color: ${slot.swatch.hex}; color: ${slot.swatch.ink};">
          ${slot.width}
        </div>
        <span class="visual-roll-tag tabular">0${idx + 1}</span>
      </div>
    `;
    })
    .join('');

  swatchGrid.innerHTML = SWATCH_PALETTE.map(
    (swatch) => `
    <button type="button" class="swatch-btn ${swatch.id === current.swatch.id ? 'is-selected' : ''}" data-swatch-id="${swatch.id}">
      <span class="swatch-dot" style="background-color: ${swatch.hex};"></span>
      <span>${swatch.name}</span>
    </button>
  `,
  ).join('');

  document.querySelectorAll('.width-pill').forEach((pill) => {
    const active = pill.dataset.width === current.width;
    pill.classList.toggle('is-active', active);
    pill.setAttribute('aria-checked', String(active));
  });

  manifestList.innerHTML = state.slots
    .map(
      (slot, idx) => `
    <li class="manifest-item">
      <span>0${idx + 1}. ${slot.swatch.name}</span>
      <span class="tabular">${slot.width} · 25 m</span>
    </li>
  `,
    )
    .join('');
}

/* INIT & EVENTS */
function setupReveals() {
  const targets = document.querySelectorAll('.reveal');
  const thresholdHeight = window.innerHeight * 0.92;

  targets.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < thresholdHeight) {
      requestAnimationFrame(() => el.classList.add('is-visible'));
    }
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' },
    );
    targets.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        io.observe(el);
      }
    });
  } else {
    targets.forEach((el) => el.classList.add('is-visible'));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderCatalog();
  renderBuilder();
  renderCart();
  setupReveals();

  /* Header scroll condensation */
  const siteHeader = document.getElementById('site-header');
  window.addEventListener(
    'scroll',
    () => {
      siteHeader.classList.toggle('is-scrolled', window.scrollY > 28);
    },
    { passive: true },
  );

  /* Header search jump */
  document.getElementById('search-toggle').addEventListener('click', () => {
    const productsEl = document.getElementById('products');
    const input = document.getElementById('catalog-search-input');
    productsEl.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => input.focus(), 300);
  });

  /* Filter tabs */
  document.querySelectorAll('.filter-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      state.filter = tab.dataset.filter;
      document.querySelectorAll('.filter-tab').forEach((btn) => {
        const isCurrent = btn === tab;
        btn.classList.toggle('is-active', isCurrent);
        btn.setAttribute('aria-selected', String(isCurrent));
      });
      renderCatalog();
    });
  });

  /* Catalog search */
  const searchInput = document.getElementById('catalog-search-input');
  searchInput.addEventListener('input', () => {
    state.search = searchInput.value;
    renderCatalog();
  });

  document.getElementById('search-clear-btn').addEventListener('click', () => {
    searchInput.value = '';
    state.search = '';
    renderCatalog();
    searchInput.focus();
  });

  document.getElementById('reset-catalog-btn').addEventListener('click', () => {
    state.filter = 'all';
    state.search = '';
    searchInput.value = '';
    document.querySelectorAll('.filter-tab').forEach((btn) => {
      const isAll = btn.dataset.filter === 'all';
      btn.classList.toggle('is-active', isAll);
      btn.setAttribute('aria-selected', String(isAll));
    });
    renderCatalog();
  });

  /* Product add-to-cart delegation */
  document.getElementById('products-grid').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-add-id]');
    if (!btn) return;
    addProductIdToCart(btn.dataset.addId);
    openBagDrawer();
  });

  /* DIY template pairing delegation */
  document.getElementById('diy-grid').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-pairing]');
    if (!btn) return;
    const ids = btn.dataset.pairing.split(',');
    ids.forEach((id) => addProductIdToCart(id.trim()));
    openBagDrawer();
  });

  /* Builder interactions */
  document.getElementById('pack-slots').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-slot-index]');
    if (!btn) return;
    state.activeSlot = Number(btn.dataset.slotIndex);
    renderBuilder();
  });

  document.getElementById('swatch-grid').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-swatch-id]');
    if (!btn) return;
    const found = SWATCH_PALETTE.find((s) => s.id === btn.dataset.swatchId);
    if (!found) return;
    state.slots[state.activeSlot].swatch = found;
    renderBuilder();
  });

  document.getElementById('width-pills').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-width]');
    if (!btn) return;
    state.slots[state.activeSlot].width = btn.dataset.width;
    renderBuilder();
  });

  document.getElementById('add-bundle-to-bag').addEventListener('click', () => {
    const summary = state.slots.map((s) => `${s.swatch.name} (${s.width})`).join(' + ');
    const key = `custom-${state.slots.map((s) => `${s.swatch.id}-${s.width}`).join('_')}`;
    addToCart({
      key,
      name: 'Custom 4-Pack Box',
      meta: summary,
      price: 22.0,
      color: state.slots[0].swatch.hex,
    });
    openBagDrawer();
  });

  /* Preorder form */
  const preorderForm = document.getElementById('preorder-form');
  const preorderError = document.getElementById('preorder-error');
  const preorderReceipt = document.getElementById('preorder-receipt');

  preorderForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('preorder-name').value.trim();
    const email = document.getElementById('preorder-email').value.trim();
    const city = document.getElementById('preorder-city').value.trim();

    if (!name || !email.includes('@') || !city) {
      preorderError.hidden = false;
      return;
    }

    preorderError.hidden = true;
    const code = `ST-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;
    document.getElementById('receipt-id').textContent = code;
    document.getElementById('receipt-summary').textContent = `Reserved for ${name} (${city}) · ${email} · €22.00`;
    document.getElementById('receipt-items').innerHTML = state.slots
      .map((s, i) => `<li>Slot 0${i + 1}: ${s.swatch.name} (${s.width})</li>`)
      .join('');

    preorderForm.hidden = true;
    preorderReceipt.hidden = false;
  });

  document.getElementById('reset-preorder-btn').addEventListener('click', () => {
    preorderForm.reset();
    preorderReceipt.hidden = true;
    preorderForm.hidden = false;
  });

  /* Tape Bag drawer events */
  document.getElementById('bag-open-btn').addEventListener('click', openBagDrawer);
  document.getElementById('cta-open-bag').addEventListener('click', openBagDrawer);
  document.getElementById('bag-close-btn').addEventListener('click', closeBagDrawer);
  document.getElementById('bag-backdrop').addEventListener('click', closeBagDrawer);

  document.getElementById('bag-items').addEventListener('click', (event) => {
    const btn = event.target.closest('[data-qty-key]');
    if (!btn) return;
    updateCartQty(btn.dataset.qtyKey, Number(btn.dataset.delta));
  });

  document.getElementById('bag-checkout-btn').addEventListener('click', () => {
    if (state.cart.length === 0) return;
    const count = state.cart.reduce((sum, i) => sum + i.qty, 0);
    const total = state.cart.reduce((sum, i) => sum + i.price * i.qty, 0);
    const confirmed = document.getElementById('bag-confirmed');
    document.getElementById('bag-confirmed-copy').textContent = `${count} items reserved at ${formatEuro(total)}. Dispatch code ST-BAG-${String(Math.floor(100 + Math.random() * 900))}.`;
    confirmed.hidden = false;
  });

  /* Mobile drawer */
  const mobileDrawer = document.getElementById('mobile-drawer');
  const openMenuBtn = document.getElementById('mobile-menu-open');
  const closeMenuBtn = document.getElementById('mobile-menu-close');

  function closeMobileMenu() {
    mobileDrawer.hidden = true;
    openMenuBtn.setAttribute('aria-expanded', 'false');
  }

  openMenuBtn.addEventListener('click', () => {
    mobileDrawer.hidden = false;
    openMenuBtn.setAttribute('aria-expanded', 'true');
    closeMenuBtn.focus();
  });

  closeMenuBtn.addEventListener('click', closeMobileMenu);

  mobileDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMobileMenu);
  });

  document.getElementById('mobile-bag-btn').addEventListener('click', () => {
    closeMobileMenu();
    openBagDrawer();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeBagDrawer();
      closeMobileMenu();
    }
  });
});
