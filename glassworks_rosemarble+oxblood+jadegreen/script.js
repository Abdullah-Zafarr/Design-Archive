const VESSELS = [
  {
    id: 'brina-ribbed-vase',
    num: '01',
    name: 'Brina Ribbed Vase',
    category: 'vases',
    weight: 1840,
    batch: 'Batch 26-A4',
    price: 580,
    tone: 'Jade Green',
    note: 'Optic-blown vertical ribs in copper-jade cristallo with thick ground base.',
    silhouette: 'vase-tall'
  },
  {
    id: 'laguna-tumbler-pair',
    num: '02',
    name: 'Laguna Tumbler Pair',
    category: 'glasses',
    weight: 620,
    batch: 'Batch 26-B1',
    price: 340,
    tone: 'Jade Green',
    note: 'Matched pair of thin-lipped water tumblers with subtle bubble-trap base.',
    silhouette: 'tumbler'
  },
  {
    id: 'smeraldo-amphora',
    num: '03',
    name: 'Smeraldo Amphora',
    category: 'vases',
    weight: 2150,
    batch: 'Batch 26-A9',
    price: 760,
    tone: 'Deep Jade',
    note: 'Double-cased vessel pulled from two crucible gathers for emerald caustics.',
    silhouette: 'amphora'
  },
  {
    id: 'canaletto-carafe',
    num: '04',
    name: 'Canaletto Carafe',
    category: 'carafes',
    weight: 980,
    batch: 'Batch 26-C2',
    price: 490,
    tone: 'Oxblood Tint',
    note: 'Hand-sheared pouring lip with balanced heel for water or aged Amarone.',
    silhouette: 'carafe'
  },
  {
    id: 'torcello-bowl',
    num: '05',
    name: 'Torcello Bowl',
    category: 'vases',
    weight: 1620,
    batch: 'Batch 26-A7',
    price: 520,
    tone: 'Rose Marble',
    note: 'Spun open on the punty iron with soft opaque rose-mineral veining.',
    silhouette: 'bowl'
  },
  {
    id: 'alba-flute-set',
    num: '06',
    name: 'Alba Flute Set',
    category: 'glasses',
    weight: 540,
    batch: 'Batch 26-B6',
    price: 410,
    tone: 'Jade & Clear',
    note: 'Set of two slender stems drawn in one continuous heat without a weld.',
    silhouette: 'flute'
  }
];

const COLORANTS = {
  jade: {
    formula: 'Cupric oxide + ferric trace (2.4% batch weight)',
    soak: '1,380 \u00B0C / 11 hrs',
    character: 'Deep emerald caustics in direct lagoon light'
  },
  oxblood: {
    formula: 'Colloidal copper-ruby + tin reducer (1.8% batch weight)',
    soak: '1,410 \u00B0C / 14 hrs',
    character: 'Dense Venetian garnet with warm rose edge refraction'
  },
  amber: {
    formula: 'Iron-manganese silicate (3.1% batch weight)',
    soak: '1,360 \u00B0C / 10 hrs',
    character: 'Honeyed transparency suited to thin-walled carafes'
  },
  cobalt: {
    formula: 'Cobaltous oxide + silica flux (0.6% batch weight)',
    soak: '1,395 \u00B0C / 12 hrs',
    character: 'High-saturation lagoon indigo under morning sun'
  }
};

function renderSilhouette(type) {
  const paths = {
    'vase-tall': '<path d="M44 16 C44 16 38 44 36 74 C34 102 42 114 60 114 C78 114 86 102 84 74 C82 44 76 16 76 16 Z" fill="rgba(35,183,129,0.28)" stroke="#23B781" stroke-width="1.6"/><line x1="48" y1="26" x2="46" y2="100" stroke="#EED0C4" stroke-opacity="0.45" stroke-width="1.2"/><line x1="72" y1="26" x2="74" y2="100" stroke="#EED0C4" stroke-opacity="0.35" stroke-width="1.2"/>',
    'tumbler': '<path d="M30 40 L34 106 C34 111 48 114 54 114 C60 114 74 111 74 106 L78 40 Z" fill="rgba(35,183,129,0.24)" stroke="#23B781" stroke-width="1.5"/><path d="M68 48 L71 106 C71 110 80 112 85 112 C90 112 97 110 97 106 L100 48 Z" fill="rgba(238,208,196,0.12)" stroke="#EED0C4" stroke-opacity="0.7" stroke-width="1.4"/>',
    'amphora': '<path d="M50 16 L70 16 L66 34 C82 46 88 68 80 94 C76 108 68 114 60 114 C52 114 44 108 40 94 C32 68 38 46 54 34 Z" fill="rgba(23,140,97,0.35)" stroke="#23B781" stroke-width="1.6"/><ellipse cx="60" cy="114" rx="18" ry="3" fill="none" stroke="#EED0C4" stroke-opacity="0.4"/>',
    'carafe': '<path d="M48 18 L72 18 L68 44 C82 58 88 82 82 104 C79 112 70 114 60 114 C50 114 41 112 38 104 C32 82 38 58 52 44 Z" fill="rgba(220,169,151,0.18)" stroke="#EED0C4" stroke-width="1.6"/><path d="M48 18 L43 12" stroke="#EED0C4" stroke-width="1.6" stroke-linecap="round"/>',
    'bowl': '<path d="M22 52 C22 86 38 108 60 108 C82 108 98 86 98 52 Z" fill="rgba(220,169,151,0.22)" stroke="#DCA997" stroke-width="1.6"/><ellipse cx="60" cy="52" rx="38" ry="7" fill="rgba(238,208,196,0.12)" stroke="#EED0C4" stroke-width="1.3"/>',
    'flute': '<path d="M40 20 L56 20 L52 72 L48 72 Z" fill="rgba(35,183,129,0.26)" stroke="#23B781" stroke-width="1.5"/><line x1="48" y1="72" x2="48" y2="112" stroke="#EED0C4" stroke-width="1.5"/><line x1="36" y1="112" x2="60" y2="112" stroke="#EED0C4" stroke-width="1.5"/><path d="M68 20 L84 20 L80 72 L76 72 Z" fill="rgba(238,208,196,0.14)" stroke="#EED0C4" stroke-width="1.5"/><line x1="76" y1="72" x2="76" y2="112" stroke="#EED0C4" stroke-width="1.5"/><line x1="64" y1="112" x2="88" y2="112" stroke="#EED0C4" stroke-width="1.5"/>'
  };
  return `<svg width="120" height="128" viewBox="0 0 120 128" fill="none" aria-hidden="true">${paths[type] || paths['vase-tall']}</svg>`;
}

const state = {
  category: 'all',
  query: '',
  bag: []
};

const vesselGrid = document.getElementById('vesselGrid');
const searchStatus = document.getElementById('searchStatus');
const filterTabs = document.querySelectorAll('.filter-tab');
const bagCount = document.getElementById('bagCount');
const bagItemsEl = document.getElementById('bagItems');
const bagTotalEl = document.getElementById('bagTotal');
const bagConfirmed = document.getElementById('bagConfirmed');
const bagRef = document.getElementById('bagRef');

function formatEuro(amount) {
  return `\u20AC${amount.toLocaleString('en-IE')}`;
}

function renderVessels() {
  const q = state.query.trim().toLowerCase();
  const filtered = VESSELS.filter((item) => {
    const matchCat = state.category === 'all' || item.category === state.category;
    const matchQuery =
      !q ||
      item.name.toLowerCase().includes(q) ||
      item.batch.toLowerCase().includes(q) ||
      item.tone.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q);
    return matchCat && matchQuery;
  });

  if (q) {
    searchStatus.hidden = false;
    searchStatus.textContent = `Showing ${filtered.length} vessel${filtered.length === 1 ? '' : 's'} matching "${state.query.trim()}".`;
  } else {
    searchStatus.hidden = true;
    searchStatus.textContent = '';
  }

  if (filtered.length === 0) {
    vesselGrid.innerHTML = `<p class="bag-empty">No Murano pieces match that filter. Clear search or select All.</p>`;
    return;
  }

  vesselGrid.innerHTML = filtered
    .map(
      (item) => `
      <article class="vessel-card">
        <div>
          <div class="vessel-visual">
            <span class="vessel-num">${item.num}</span>
            <span class="vessel-category-tag">${item.category}</span>
            ${renderSilhouette(item.silhouette)}
          </div>
          <h3 class="vessel-name">${item.name}</h3>
          <p class="vessel-note">${item.note}</p>
          <div class="vessel-specs">
            <div>
              <span class="vessel-spec-label">Weight</span>
              <span class="vessel-spec-val">${item.weight.toLocaleString('en-IE')} g</span>
            </div>
            <div>
              <span class="vessel-spec-label">Furnace Batch</span>
              <span class="vessel-spec-val">${item.batch}</span>
            </div>
          </div>
        </div>
        <div class="vessel-footer">
          <span class="vessel-price">${formatEuro(item.price)}</span>
          <button type="button" class="add-bag-btn" data-add-id="${item.id}">Add to Bag</button>
        </div>
      </article>
    `
    )
    .join('');
}

function setActiveCategory(cat) {
  state.category = cat;
  filterTabs.forEach((tab) => {
    const active = tab.dataset.category === cat;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });
  renderVessels();
}

filterTabs.forEach((tab) => {
  tab.addEventListener('click', () => setActiveCategory(tab.dataset.category));
});

document.querySelectorAll('[data-filter-link]').forEach((link) => {
  link.addEventListener('click', () => {
    setActiveCategory(link.dataset.filterLink);
  });
});

// Bag state
function renderBag() {
  const totalQty = state.bag.reduce((sum, entry) => sum + entry.qty, 0);
  const totalAmount = state.bag.reduce((sum, entry) => sum + entry.price * entry.qty, 0);
  bagCount.textContent = String(totalQty);
  bagTotalEl.textContent = formatEuro(totalAmount);

  if (state.bag.length === 0) {
    bagItemsEl.innerHTML = '<p class="bag-empty">Your collection bag is empty. Select any numbered piece from the furnace catalogue.</p>';
    return;
  }

  bagItemsEl.innerHTML = state.bag
    .map(
      (entry) => `
      <div class="bag-item">
        <div>
          <h3 class="bag-item-title">${entry.name}</h3>
          <span class="bag-item-meta">${entry.batch} &middot; ${entry.weight} g &middot; ${formatEuro(entry.price)}</span>
        </div>
        <div class="bag-item-actions">
          <button type="button" class="qty-btn" data-qty-dec="${entry.id}" aria-label="Decrease quantity of ${entry.name}">-</button>
          <span class="tabular">${entry.qty}</span>
          <button type="button" class="qty-btn" data-qty-inc="${entry.id}" aria-label="Increase quantity of ${entry.name}">+</button>
          <button type="button" class="remove-btn" data-remove="${entry.id}">Remove</button>
        </div>
      </div>
    `
    )
    .join('');
}

function addToBag(id) {
  const vessel = VESSELS.find((v) => v.id === id);
  if (!vessel) return;
  const existing = state.bag.find((entry) => entry.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    state.bag.push({ ...vessel, qty: 1 });
  }
  bagConfirmed.hidden = true;
  renderBag();
  openDrawer('bag');
}

vesselGrid.addEventListener('click', (ev) => {
  const btn = ev.target.closest('[data-add-id]');
  if (btn) addToBag(btn.dataset.addId);
});

bagItemsEl.addEventListener('click', (ev) => {
  const dec = ev.target.closest('[data-qty-dec]');
  const inc = ev.target.closest('[data-qty-inc]');
  const rem = ev.target.closest('[data-remove]');

  if (dec) {
    const item = state.bag.find((e) => e.id === dec.dataset.qtyDec);
    if (item) {
      item.qty -= 1;
      if (item.qty <= 0) state.bag = state.bag.filter((e) => e.id !== item.id);
      renderBag();
    }
  } else if (inc) {
    const item = state.bag.find((e) => e.id === inc.dataset.qtyInc);
    if (item) {
      item.qty += 1;
      renderBag();
    }
  } else if (rem) {
    state.bag = state.bag.filter((e) => e.id !== rem.dataset.remove);
    renderBag();
  }
});

document.getElementById('bagCheckout').addEventListener('click', () => {
  if (state.bag.length === 0) return;
  bagRef.textContent = `MRN-${String(104 + state.bag.length * 7)}`;
  bagConfirmed.hidden = false;
});

// Drawers & Search
const backdrop = document.getElementById('drawerBackdrop');
const mobileDrawer = document.getElementById('mobileDrawer');
const bagDrawer = document.getElementById('bagDrawer');
const menuToggle = document.getElementById('menuToggle');
const bagToggle = document.getElementById('bagToggle');

function closeDrawers() {
  mobileDrawer.hidden = true;
  bagDrawer.hidden = true;
  backdrop.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  bagToggle.setAttribute('aria-expanded', 'false');
}

function openDrawer(kind) {
  closeDrawers();
  backdrop.hidden = false;
  if (kind === 'mobile') {
    mobileDrawer.hidden = false;
    menuToggle.setAttribute('aria-expanded', 'true');
  } else {
    bagDrawer.hidden = false;
    bagToggle.setAttribute('aria-expanded', 'true');
  }
}

menuToggle.addEventListener('click', () => openDrawer('mobile'));
bagToggle.addEventListener('click', () => openDrawer('bag'));
document.getElementById('menuClose').addEventListener('click', closeDrawers);
document.getElementById('bagClose').addEventListener('click', closeDrawers);
backdrop.addEventListener('click', closeDrawers);

document.querySelectorAll('[data-mobile-link]').forEach((link) => {
  link.addEventListener('click', closeDrawers);
});

// Search bar
const searchToggle = document.getElementById('searchToggle');
const searchBar = document.getElementById('searchBar');
const searchInput = document.getElementById('vesselSearch');
const searchClose = document.getElementById('searchClose');

searchToggle.addEventListener('click', () => {
  const isHidden = searchBar.hidden;
  searchBar.hidden = !isHidden;
  searchToggle.setAttribute('aria-expanded', String(isHidden));
  if (isHidden) searchInput.focus();
});

searchClose.addEventListener('click', () => {
  searchBar.hidden = true;
  searchToggle.setAttribute('aria-expanded', 'false');
  state.query = '';
  searchInput.value = '';
  renderVessels();
});

searchInput.addEventListener('input', () => {
  state.query = searchInput.value;
  renderVessels();
});

document.getElementById('searchForm').addEventListener('submit', (ev) => {
  ev.preventDefault();
  state.query = searchInput.value;
  renderVessels();
  document.getElementById('vessels').scrollIntoView();
});

// Mineral colorant swatches
const swatchBtns = document.querySelectorAll('.swatch-btn');
const swatchFormula = document.getElementById('swatchFormula');
const swatchSoak = document.getElementById('swatchSoak');
const swatchCharacter = document.getElementById('swatchCharacter');

swatchBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.swatch;
    const data = COLORANTS[key];
    if (!data) return;
    swatchBtns.forEach((b) => {
      const active = b === btn;
      b.classList.toggle('is-active', active);
      b.setAttribute('aria-checked', String(active));
    });
    swatchFormula.textContent = data.formula;
    swatchSoak.textContent = data.soak;
    swatchCharacter.textContent = data.character;
  });
});

// Visit booking form
const visitForm = document.getElementById('visitForm');
const visitError = document.getElementById('visitError');
const appointmentSlip = document.getElementById('appointmentSlip');
const visitDateInput = document.getElementById('visitDate');

const today = new Date().toISOString().split('T')[0];
visitDateInput.min = today;
visitDateInput.value = today;

visitForm.addEventListener('submit', (ev) => {
  ev.preventDefault();
  const name = document.getElementById('guestName').value.trim();
  const email = document.getElementById('guestEmail').value.trim();
  const dateVal = visitDateInput.value;
  const session = document.getElementById('visitSession').value;
  const party = document.getElementById('guestCount').value;
  const focus = document.getElementById('interestFocus').value;

  if (!name) {
    visitError.textContent = 'Enter your full name to register at the furnace.';
    visitError.hidden = false;
    return;
  }
  if (!email || !email.includes('@') || !email.includes('.')) {
    visitError.textContent = 'Enter a valid email address for the Venice appointment slip.';
    visitError.hidden = false;
    return;
  }
  if (!dateVal) {
    visitError.textContent = 'Select a preferred date for your Murano visit.';
    visitError.hidden = false;
    return;
  }

  visitError.hidden = true;
  document.getElementById('slipGuest').textContent = `${name} (${email})`;
  document.getElementById('slipDate').textContent = dateVal;
  document.getElementById('slipSession').textContent = session;
  document.getElementById('slipParty').textContent = party;
  document.getElementById('slipFocus').textContent = focus;
  document.getElementById('slipCode').textContent = `VB-${dateVal.replace(/-/g, '').slice(2)}`;

  visitForm.hidden = true;
  appointmentSlip.hidden = false;
});

document.getElementById('slipReset').addEventListener('click', () => {
  appointmentSlip.hidden = true;
  visitForm.hidden = false;
});

document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape') closeDrawers();
});

renderVessels();
renderBag();
