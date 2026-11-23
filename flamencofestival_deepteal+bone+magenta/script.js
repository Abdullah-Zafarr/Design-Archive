const PERFORMANCES = [
  { id: 'n01', week: 1, date: '2 May', time: '21:30', palo: 'Soleá', artists: 'Lucía Valverde & Dani de Morón', venue: 'Patio de los Naranjos', price: 22, status: 'available' },
  { id: 'n02', week: 1, date: '3 May', time: '21:30', palo: 'Seguiriya', artists: 'Mateo Vargas & Alfredo Lagos', venue: 'Casa de la Memoria', price: 26, status: 'available' },
  { id: 'n03', week: 1, date: '4 May', time: '21:30', palo: 'Granaínas', artists: 'Diego Montoya (Solo Guitar)', venue: 'Casa de la Memoria', price: 22, status: 'available' },
  { id: 'n04', week: 1, date: '5 May', time: '21:30', palo: 'Alegrías', artists: 'Carmen Reyes & Grupo Triana', venue: 'Teatro Triana', price: 32, status: 'available' },
  { id: 'n05', week: 1, date: '6 May', time: '21:30', palo: 'Bulerías', artists: 'Lucía Valverde & Los Mellizos', venue: 'Teatro Triana', price: 34, status: 'limited' },
  { id: 'n06', week: 1, date: '7 May', time: '21:30', palo: 'Tientos', artists: 'Inés Bacán & Antonio Moya', venue: 'Patio de los Naranjos', price: 24, status: 'soldout' },
  { id: 'n07', week: 1, date: '8 May', time: '21:30', palo: 'Alegrías', artists: 'Diego Montoya & Rocío Márquez', venue: 'Teatro Triana', price: 36, status: 'available' },
  { id: 'n08', week: 2, date: '9 May', time: '21:30', palo: 'Seguiriya', artists: 'Mateo Vargas & Paco Jarana', venue: 'Patio de los Naranjos', price: 28, status: 'available' },
  { id: 'n09', week: 2, date: '10 May', time: '21:30', palo: 'Soleá', artists: 'Belén Maya & Rafael Rodríguez', venue: 'Teatro Triana', price: 38, status: 'limited' },
  { id: 'n10', week: 2, date: '11 May', time: '21:30', palo: 'Farruca', artists: 'Carmen Reyes & Dani de Morón', venue: 'Teatro Triana', price: 34, status: 'available' },
  { id: 'n11', week: 2, date: '12 May', time: '21:30', palo: 'Granaínas', artists: 'Diego Montoya & Juan Carmona', venue: 'Casa de la Memoria', price: 24, status: 'available' },
  { id: 'n12', week: 2, date: '13 May', time: '21:30', palo: 'Tientos', artists: 'Mateo Vargas & Juana del Pipa', venue: 'Casa de la Memoria', price: 28, status: 'limited' },
  { id: 'n13', week: 2, date: '14 May', time: '21:30', palo: 'Alegrías', artists: 'Carmen Reyes & Ensemble Cádiz', venue: 'Patio de los Naranjos', price: 30, status: 'available' },
  { id: 'n14', week: 2, date: '15 May', time: '21:30', palo: 'Bulerías', artists: 'Lucía Valverde & Full Company', venue: 'Teatro Triana', price: 42, status: 'limited' },
];

function renderLedger(weekNumber, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const items = PERFORMANCES.filter((item) => item.week === weekNumber);
  container.innerHTML = '';

  items.forEach((item, idx) => {
    const nightNumber = String((weekNumber - 1) * 7 + idx + 1).padStart(2, '0');
    const row = document.createElement('div');
    row.className = 'ledger-row';

    const actionMarkup =
      item.status === 'soldout'
        ? '<span class="status-soldout">Sold out</span>'
        : `<button type="button" class="status-btn" data-select-night="${item.id}">${
            item.status === 'limited' ? 'Last seats' : 'Select night'
          } <span aria-hidden="true">→</span></button>`;

    row.innerHTML = `
      <div class="ledger-night">
        <span class="ledger-date">NIGHT ${nightNumber} · ${item.date} · ${item.time}</span>
        <span class="ledger-title">${item.date}</span>
      </div>
      <div class="ledger-palo">${item.palo}</div>
      <div class="ledger-artists">${item.artists}</div>
      <div class="ledger-venue">${item.venue}</div>
      <div class="ledger-action">
        <span class="ledger-price">From €${item.price}</span>
        ${actionMarkup}
      </div>
    `;

    container.appendChild(row);
  });
}

function initTabs() {
  const tabs = document.querySelectorAll('.week-tab');
  const panel1 = document.getElementById('panel-week-1');
  const panel2 = document.getElementById('panel-week-2');
  const countLabel = document.getElementById('programme-count');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const week = tab.getAttribute('data-week');
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });

      if (week === '1') {
        panel1.hidden = false;
        panel2.hidden = true;
        if (countLabel) countLabel.textContent = '7 PERFORMANCES · 2–8 MAY · 21:30 START';
      } else {
        panel1.hidden = true;
        panel2.hidden = false;
        if (countLabel) countLabel.textContent = '7 PERFORMANCES · 9–15 MAY · 21:30 START';
      }
    });
  });
}

function initBooking() {
  const selectEl = document.getElementById('night-select');
  const formEl = document.getElementById('ticket-form');
  const qtyDec = document.getElementById('qty-dec');
  const qtyInc = document.getElementById('qty-inc');
  const qtyOutput = document.getElementById('qty-value');
  const btnTotal = document.getElementById('btn-total');
  const errorEl = document.getElementById('form-error');

  const summaryNight = document.getElementById('summary-night');
  const summaryVenue = document.getElementById('summary-venue');
  const summaryTier = document.getElementById('summary-tier');
  const summaryQty = document.getElementById('summary-qty');
  const summaryTotal = document.getElementById('summary-total');

  const summaryView = document.getElementById('summary-view');
  const receiptView = document.getElementById('receipt-view');
  const receiptRef = document.getElementById('receipt-ref');
  const receiptName = document.getElementById('receipt-name');
  const receiptEmail = document.getElementById('receipt-email');
  const receiptNight = document.getElementById('receipt-night');
  const receiptTier = document.getElementById('receipt-tier');
  const receiptTotal = document.getElementById('receipt-total');
  const resetBtn = document.getElementById('reset-booking');

  if (!selectEl || !formEl) return;

  let quantity = 2;

  PERFORMANCES.forEach((item, index) => {
    const opt = document.createElement('option');
    const nightNum = String(index + 1).padStart(2, '0');
    opt.value = item.id;
    opt.disabled = item.status === 'soldout';
    opt.textContent = `Night ${nightNum} · ${item.date} — ${item.palo} (${item.venue})${
      item.status === 'soldout' ? ' [Sold out]' : ''
    }`;
    selectEl.appendChild(opt);
  });

  function getSelectedTier() {
    const checked = formEl.querySelector('input[name="tier"]:checked');
    return {
      value: checked ? checked.value : 'patio',
      price: checked ? Number(checked.dataset.price) : 22,
      label: checked ? checked.dataset.label : 'Patio',
    };
  }

  function updateSummary() {
    const night = PERFORMANCES.find((p) => p.id === selectEl.value) || PERFORMANCES[0];
    const nightIdx = String(PERFORMANCES.indexOf(night) + 1).padStart(2, '0');
    const tier = getSelectedTier();
    const total = tier.price * quantity;

    qtyOutput.textContent = String(quantity);
    btnTotal.textContent = `€${total}`;

    if (tier.value === 'cycle') {
      summaryNight.textContent = 'Full Cycle · 2 to 15 May (14 Nights)';
      summaryVenue.textContent = 'All Three Triana Venues';
    } else {
      summaryNight.textContent = `Night ${nightIdx} · ${night.date} — ${night.palo}`;
      summaryVenue.textContent = night.venue;
    }

    summaryTier.textContent = `${tier.label} (€${tier.price} per pass)`;
    summaryQty.textContent = `${quantity} ${quantity === 1 ? 'pass' : 'passes'}`;
    summaryTotal.textContent = `€${total}`;
  }

  selectEl.addEventListener('change', updateSummary);
  formEl.querySelectorAll('input[name="tier"]').forEach((radio) => {
    radio.addEventListener('change', updateSummary);
  });

  qtyDec.addEventListener('click', () => {
    if (quantity > 1) {
      quantity -= 1;
      updateSummary();
    }
  });

  qtyInc.addEventListener('click', () => {
    if (quantity < 8) {
      quantity += 1;
      updateSummary();
    }
  });

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-select-night]');
    if (!trigger) return;
    const nightId = trigger.getAttribute('data-select-night');
    selectEl.value = nightId;
    const patioRadio = formEl.querySelector('input[name="tier"][value="patio"]');
    if (patioRadio && formEl.querySelector('input[name="tier"]:checked')?.value === 'cycle') {
      patioRadio.checked = true;
    }
    receiptView.hidden = true;
    summaryView.hidden = false;
    updateSummary();
    document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth' });
  });

  formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('guest-name');
    const emailInput = document.getElementById('guest-email');
    const guestName = nameInput.value.trim();
    const guestEmail = emailInput.value.trim();

    if (!guestName) {
      errorEl.textContent = 'Enter a guest name to reserve passes.';
      errorEl.hidden = false;
      nameInput.focus();
      return;
    }

    if (!guestEmail || !guestEmail.includes('@')) {
      errorEl.textContent = 'Enter a valid email address for the box office receipt.';
      errorEl.hidden = false;
      emailInput.focus();
      return;
    }

    errorEl.hidden = true;
    const night = PERFORMANCES.find((p) => p.id === selectEl.value) || PERFORMANCES[0];
    const nightIdx = String(PERFORMANCES.indexOf(night) + 1).padStart(2, '0');
    const tier = getSelectedTier();
    const total = tier.price * quantity;
    const refCode = `TRF-2026-${String(Math.floor(1000 + Math.random() * 9000))}`;

    receiptRef.textContent = refCode;
    receiptName.textContent = guestName;
    receiptEmail.textContent = guestEmail;
    receiptNight.textContent =
      tier.value === 'cycle'
        ? 'Full Cycle · 2 to 15 May'
        : `Night ${nightIdx} · ${night.date} (${night.venue})`;
    receiptTier.textContent = `${tier.label} × ${quantity}`;
    receiptTotal.textContent = `€${total}`;

    summaryView.hidden = true;
    receiptView.hidden = false;
  });

  resetBtn.addEventListener('click', () => {
    receiptView.hidden = true;
    summaryView.hidden = false;
    formEl.reset();
    quantity = 2;
    selectEl.selectedIndex = 0;
    updateSummary();
  });

  updateSummary();
}

function initMobileDrawer() {
  const toggleBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggleBtn || !closeBtn || !drawer) return;

  function openDrawer() {
    drawer.hidden = false;
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeDrawer() {
    drawer.hidden = true;
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggleBtn.focus();
  }

  toggleBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      drawer.hidden = true;
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !drawer.hidden) {
      closeDrawer();
    }
  });
}

function initReveals() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced || !('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  requestAnimationFrame(() => {
    elements.forEach((el) => {
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

  elements.forEach((el) => {
    if (!el.classList.contains('is-visible')) {
      observer.observe(el);
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderLedger(1, 'ledger-week-1');
  renderLedger(2, 'ledger-week-2');
  initTabs();
  initBooking();
  initMobileDrawer();
  initReveals();
});
