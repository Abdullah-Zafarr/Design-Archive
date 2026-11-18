const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const navDrawer = document.getElementById('nav-drawer');

// Header scroll condensation
window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });

// Navigation drawer
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navDrawer.hidden = isOpen;
});

navDrawer?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    navDrawer.hidden = true;
  });
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && navDrawer && !navDrawer.hidden) {
    menuToggle.setAttribute('aria-expanded', 'false');
    navDrawer.hidden = true;
    menuToggle.focus();
  }
});

// Interactive Collection Flavor & Pack Selector
const FLAVORS = {
  original: {
    eyebrow: 'Selected · Best Seller',
    title: 'Original Yuzu',
    notes: 'Cold-pressed aromatic yuzu juice from Kochi prefecture paired with lively sparkling spring water and zero sweeteners.',
    kcal: '15 kcal',
    optionValue: 'Original Yuzu',
  },
  bloodorange: {
    eyebrow: 'Selected · Seasonal',
    title: 'Blood Orange Yuzu',
    notes: 'Sun-ripened Sicilian blood orange layered under sharp mountain yuzu zest for a bright ruby sparkling finish.',
    kcal: '18 kcal',
    optionValue: 'Blood Orange Yuzu',
  },
  ginger: {
    eyebrow: 'Selected · Spiced',
    title: 'Ginger Yuzu',
    notes: 'Warm cold-pressed ginger root balanced by fragrant green yuzu rind and crisp mineral carbonation.',
    kcal: '15 kcal',
    optionValue: 'Ginger Yuzu',
  },
};

let activeFlavorKey = 'original';
let activePack = { name: '6-Pack', price: 18, cans: 6 };

const cfgEyebrow = document.getElementById('cfg-eyebrow');
const cfgTitle = document.getElementById('cfg-title');
const cfgNotes = document.getElementById('cfg-notes');
const cfgKcal = document.getElementById('cfg-kcal');
const cfgPercan = document.getElementById('cfg-percan');
const cfgSummary = document.getElementById('cfg-summary');

function syncConfigUI() {
  const f = FLAVORS[activeFlavorKey];
  cfgEyebrow.textContent = f.eyebrow;
  cfgTitle.textContent = f.title;
  cfgNotes.textContent = f.notes;
  cfgKcal.textContent = f.kcal;
  cfgPercan.textContent = `$${(activePack.price / activePack.cans).toFixed(2)}`;
  cfgSummary.textContent = `${f.title} · ${activePack.name} · $${activePack.price}`;
}

document.querySelectorAll('.flavor-cell').forEach((cell) => {
  cell.addEventListener('click', () => {
    activeFlavorKey = cell.dataset.flavor;
    document.querySelectorAll('.flavor-cell').forEach((c) => {
      const active = c === cell;
      c.classList.toggle('is-active', active);
      c.setAttribute('aria-selected', String(active));
    });
    syncConfigUI();
  });
});

document.querySelectorAll('.pack-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    activePack = {
      name: btn.dataset.pack,
      price: Number(btn.dataset.price),
      cans: Number(btn.dataset.cans),
    };
    document.querySelectorAll('.pack-btn').forEach((b) => {
      const sel = b === btn;
      b.classList.toggle('is-selected', sel);
      b.setAttribute('aria-checked', String(sel));
    });
    syncConfigUI();
  });
});

// Order Reservation Form Sync
const orderForm = document.getElementById('order-form');
const orderFlavor = document.getElementById('order-flavor');
const orderPack = document.getElementById('order-pack');
const orderQty = document.getElementById('order-qty');
const orderTotal = document.getElementById('order-total');
const orderError = document.getElementById('order-error');
const orderDone = document.getElementById('order-done');
const doneCode = document.getElementById('done-code');
const doneSummary = document.getElementById('done-summary');

function updateOrderTotal() {
  const selectedOpt = orderPack.options[orderPack.selectedIndex];
  const unitPrice = Number(selectedOpt.dataset.price || 18);
  const qty = Number(orderQty.value || 1);
  orderTotal.textContent = `$${unitPrice * qty}`;
}

document.getElementById('apply-to-order')?.addEventListener('click', () => {
  orderFlavor.value = FLAVORS[activeFlavorKey].optionValue;
  orderPack.value = activePack.name;
  updateOrderTotal();
  document.getElementById('shop').scrollIntoView({ behavior: 'smooth' });
});

orderPack?.addEventListener('change', updateOrderTotal);

document.getElementById('qty-minus')?.addEventListener('click', () => {
  const cur = Number(orderQty.value);
  if (cur > 1) {
    orderQty.value = String(cur - 1);
    updateOrderTotal();
  }
});

document.getElementById('qty-plus')?.addEventListener('click', () => {
  const cur = Number(orderQty.value);
  if (cur < 12) {
    orderQty.value = String(cur + 1);
    updateOrderTotal();
  }
});

orderForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('order-name').value.trim();
  const email = document.getElementById('order-email').value.trim();
  if (!name || !email || !email.includes('@')) {
    orderError.textContent = 'Enter your full name and a valid confirmation email.';
    orderError.hidden = false;
    return;
  }
  orderError.hidden = true;
  const qty = Number(orderQty.value);
  const unitPrice = Number(orderPack.options[orderPack.selectedIndex].dataset.price || 18);
  doneCode.textContent = `YZU-${1500 + qty * 12}`;
  doneSummary.textContent = `Reserved ${qty} × ${orderPack.value} of ${orderFlavor.value} ($${unitPrice * qty}) for ${name} (${email}).`;
  orderForm.hidden = true;
  orderDone.hidden = false;
});

document.getElementById('order-reset')?.addEventListener('click', () => {
  orderForm.reset();
  orderQty.value = '1';
  updateOrderTotal();
  orderDone.hidden = true;
  orderForm.hidden = false;
});

syncConfigUI();
updateOrderTotal();
