const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const navDrawer = document.getElementById('nav-drawer');

function setDrawerOpen(open) {
  if (!menuToggle || !navDrawer) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
  navDrawer.hidden = !open;
}

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 28);
}, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  setDrawerOpen(!isOpen);
});

navDrawer?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setDrawerOpen(false));
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    setDrawerOpen(false);
    menuToggle.focus();
  }
});

document.addEventListener('click', (e) => {
  if (!navDrawer || navDrawer.hidden) return;
  if (!navDrawer.contains(e.target) && !menuToggle?.contains(e.target)) {
    setDrawerOpen(false);
  }
});

// Sector filter tabs
const tabButtons = [...document.querySelectorAll('.tab-btn')];
const statusRows = [...document.querySelectorAll('.status-row')];

function selectSector(targetBtn) {
  const sector = targetBtn.dataset.sector;
  tabButtons.forEach((btn) => {
    const active = btn === targetBtn;
    btn.classList.toggle('is-active', active);
    btn.setAttribute('aria-selected', String(active));
  });
  statusRows.forEach((row) => {
    row.hidden = sector !== 'all' && row.dataset.sector !== sector;
  });
}

tabButtons.forEach((btn, idx) => {
  btn.addEventListener('click', () => selectSector(btn));
  btn.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const nextIdx = (idx + (e.key === 'ArrowRight' ? 1 : -1) + tabButtons.length) % tabButtons.length;
    tabButtons[nextIdx].focus();
    selectSector(tabButtons[nextIdx]);
  });
});

// Ski pass calculator & reservation
const passForm = document.getElementById('pass-form');
const passConfirm = document.getElementById('pass-confirm');
const confirmCode = document.getElementById('confirm-code');
const confirmSummary = document.getElementById('confirm-summary');
const resetPassBtn = document.getElementById('reset-pass');
const tierButtons = [...document.querySelectorAll('.tier-btn')];
const qtyInput = document.getElementById('skier-qty');
const qtyMinus = document.getElementById('qty-minus');
const qtyPlus = document.getElementById('qty-plus');
const totalPriceEl = document.getElementById('total-price');
const formError = document.getElementById('form-error');

let activeTier = 'Day Pass';
let unitPrice = 68;

function updateTotal() {
  const qty = Math.max(1, Math.min(8, Number(qtyInput?.value || 1)));
  if (totalPriceEl) {
    totalPriceEl.textContent = `€${unitPrice * qty}`;
  }
}

tierButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    activeTier = btn.dataset.tier || 'Day Pass';
    unitPrice = Number(btn.dataset.price || 68);
    tierButtons.forEach((item) => {
      const selected = item === btn;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-checked', String(selected));
    });
    updateTotal();
  });
});

qtyMinus?.addEventListener('click', () => {
  const current = Number(qtyInput.value || 1);
  if (current > 1) {
    qtyInput.value = String(current - 1);
    updateTotal();
  }
});

qtyPlus?.addEventListener('click', () => {
  const current = Number(qtyInput.value || 1);
  if (current < 8) {
    qtyInput.value = String(current + 1);
    updateTotal();
  }
});

passForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('skier-name')?.value.trim() || '';
  const email = document.getElementById('skier-email')?.value.trim() || '';
  const date = document.getElementById('start-date')?.value || '2026-12-12';
  const qty = Number(qtyInput?.value || 1);

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    if (formError) {
      formError.textContent = 'Enter a lead skier name and valid email address to reserve.';
      formError.hidden = false;
    }
    return;
  }

  if (formError) {
    formError.hidden = true;
    formError.textContent = '';
  }

  const total = unitPrice * qty;
  const suffix = String((name.length * 13 + qty * 7 + total) % 90 + 10);
  if (confirmCode) confirmCode.textContent = `ALV-3200-${suffix}`;
  if (confirmSummary) {
    confirmSummary.textContent = `${qty}x ${activeTier} starting ${date} for ${name} (€${total} due at pickup). Present this code at Altaval Base Terminal RFID kiosks.`;
  }

  passForm.hidden = true;
  if (passConfirm) passConfirm.hidden = false;
});

resetPassBtn?.addEventListener('click', () => {
  passForm?.reset();
  if (qtyInput) qtyInput.value = '2';
  tierButtons[0]?.click();
  if (passConfirm) passConfirm.hidden = true;
  if (passForm) passForm.hidden = false;
});
