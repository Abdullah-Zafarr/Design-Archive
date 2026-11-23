const SPECIES = [
  {
    id: 'morpho-menelaus',
    group: 'morpho',
    common: 'Blue Morpho',
    binomial: 'Morpho menelaus',
    zone: 'Zone A · Upper Canopy',
    temp: '26 °C',
    humidity: '78%',
    wingspan: '138 mm',
    lifespan: '115 days',
    host: 'Erythroxylum & Inga legumes',
    note: 'Micro-ribbed dorsal scales scatter light into bright cobalt while brown ventral eyespots conceal the butterfly at rest.'
  },
  {
    id: 'morpho-peleides',
    group: 'morpho',
    common: 'Peleides Morpho',
    binomial: 'Morpho peleides',
    zone: 'Zone A · Sunlit Atrium',
    temp: '26 °C',
    humidity: '76%',
    wingspan: '146 mm',
    lifespan: '108 days',
    host: 'Mucuna urens & Pterocarpus',
    note: 'Glides along the upper timber boardwalk before descending to fermenting mango and banana trays around midday.'
  },
  {
    id: 'papilio-ulysses',
    group: 'swallowtail',
    common: 'Ulysses Swallowtail',
    binomial: 'Papilio ulysses',
    zone: 'Zone B · Queensland Fernery',
    temp: '25 °C',
    humidity: '75%',
    wingspan: '132 mm',
    lifespan: '42 days',
    host: 'Euodia elleryana & Citrus',
    note: 'Fast canopy flyer pairing velvety dark wing margins with deep azure patches visible across the glasshouse atrium.'
  },
  {
    id: 'papilio-lowi',
    group: 'swallowtail',
    common: 'Asian Giant Swallowtail',
    binomial: 'Papilio lowi',
    zone: 'Zone B · Citrus Terrace',
    temp: '25 °C',
    humidity: '74%',
    wingspan: '124 mm',
    lifespan: '38 days',
    host: 'Citrus reticulata & Murraya',
    note: 'Tailed hindwings and pale cream bands patrol flowering scarlet pentas throughout sunlit afternoon hours.'
  },
  {
    id: 'greta-oto',
    group: 'glasswing',
    common: 'Glasswing',
    binomial: 'Greta oto',
    zone: 'Zone C · Cloud Forest Mist',
    temp: '23 °C',
    humidity: '82%',
    wingspan: '58 mm',
    lifespan: '64 days',
    host: 'Cestrum nocturnum (night jasmine)',
    note: 'Nanopillar wing textures reduce surface reflection below 2%, rendering the clear membrane nearly invisible mid-flight.'
  },
  {
    id: 'ithomia-drymo',
    group: 'glasswing',
    common: 'Clearwing Ithomiine',
    binomial: 'Ithomia drymo',
    zone: 'Zone C · Understorey Ravine',
    temp: '23 °C',
    humidity: '84%',
    wingspan: '52 mm',
    lifespan: '56 days',
    host: 'Solanum & Acnistus arborescens',
    note: 'Flies low beneath tree ferns and gathers along white Lantana clusters immediately after hourly misting cycles.'
  },
  {
    id: 'attacus-atlas',
    group: 'atlas-moth',
    common: 'Atlas Moth',
    binomial: 'Attacus atlas',
    zone: 'Zone D · Cedar Pavilion',
    temp: '27 °C',
    humidity: '80%',
    wingspan: '248 mm',
    lifespan: '7 days',
    host: 'Ailanthus altissima & Cinnamomum',
    note: 'Among the largest winged insects by area; adults lack functional mouthparts and rest calmly on warm cedar rafters.'
  },
  {
    id: 'argema-mittrei',
    group: 'atlas-moth',
    common: 'Comet Moth',
    binomial: 'Argema mittrei',
    zone: 'Zone D · Madagascar Alcove',
    temp: '27 °C',
    humidity: '79%',
    wingspan: '210 mm',
    lifespan: '6 days',
    host: 'Weinmannia & Uapaca',
    note: 'Saffron-tinted wings with trailing 140 mm tails; newly emerged moths stay perched near the observation frame.'
  }
];

const WING_ICONS = {
  morpho: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 10.5C9.5 5 4.5 3.5 3 6.5c-1.4 2.8-.2 6.5 3 7.5-1.6 2.5-.6 6 2 6.5 2.4.5 3.5-2 4-5.5.5 3.5 1.6 6 4 5.5 2.6-.5 3.6-4 2-6.5 3.2-1 4.4-4.7 3-7.5-1.5-3-6.5-1.5-9 4z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
  </svg>`,
  swallowtail: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 10C9.5 4.5 4.5 3.5 3.5 6.5c-1 2.5.4 5.8 3 6.8-1 2.2-.2 5 1.5 5.7l1 2.5 1.5-2.5c.8-.5 1.2-2 1.5-4 .3 2 .7 3.5 1.5 4l1.5 2.5 1-2.5c1.7-.7 2.5-3.5 1.5-5.7 2.6-1 4-4.3 3-6.8-1-3-6-2-8.5 3.5z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
  </svg>`,
  glasswing: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 11C9.5 6.5 4.5 6 3.5 8.5c-.8 2 .5 4.5 3 5-1 1.8-.3 4.2 1.5 4.6 1.8.4 3.2-1.2 4-3.6.8 2.4 2.2 4 4 3.6 1.8-.4 2.5-2.8 1.5-4.6 2.5-.5 3.8-3 3-5-1-2.5-6-2-8.5 2.5z" stroke="currentColor" stroke-width="1.35" stroke-dasharray="2.5 1.8" stroke-linejoin="round"/>
  </svg>`,
  'atlas-moth': `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 10C8.8 5.2 3.5 4 2.5 6.8c-.9 2.6.8 5.5 3.5 6.4-1.3 2.3-.5 5.4 2 6.1 2.2.6 3.5-1.5 4-4.8.5 3.3 1.8 5.4 4 4.8 2.5-.7 3.3-3.8 2-6.1 2.7-.9 4.4-3.8 3.5-6.4C20.5 4 15.2 5.2 12 10z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
    <circle cx="7.5" cy="9.5" r="1.1" fill="currentColor"/>
    <circle cx="16.5" cy="9.5" r="1.1" fill="currentColor"/>
  </svg>`
};

const PRICES = {
  adult: 18,
  child: 11,
  member: 0
};

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initMobileDrawer();
  initReveals();
  initSpeciesFilter();
  initTicketBooking();
});

function initHeaderScroll() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const update = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };

  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initMobileDrawer() {
  const toggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggle || !drawer) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    drawer.hidden = !open;
  };

  toggle.addEventListener('click', () => {
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    setOpen(!isExpanded);
  });

  drawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !drawer.hidden) {
      setOpen(false);
      toggle.focus();
    }
  });
}

function initReveals() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
    return;
  }

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

  targets.forEach((el) => observer.observe(el));
}

function initSpeciesFilter() {
  const tabs = document.querySelectorAll('.species-tab');
  const grid = document.getElementById('species-grid');
  const countEl = document.getElementById('collection-count');
  if (!tabs.length || !grid || !countEl) return;

  const render = (filter) => {
    const items = filter === 'all'
      ? SPECIES
      : SPECIES.filter((item) => item.group === filter);

    grid.innerHTML = items.map((item) => `
      <article class="species-card">
        <div class="species-card-head">
          <div>
            <span class="species-zone">${item.zone}</span>
            <h3 class="species-common">${item.common}</h3>
            <p class="species-binomial">${item.binomial}</p>
          </div>
          <div class="species-mark">${WING_ICONS[item.group]}</div>
        </div>

        <dl class="species-metrics">
          <div class="species-metric-cell">
            <dt>Temp</dt>
            <dd>${item.temp}</dd>
          </div>
          <div class="species-metric-cell">
            <dt>Humidity</dt>
            <dd>${item.humidity}</dd>
          </div>
          <div class="species-metric-cell">
            <dt>Wingspan</dt>
            <dd>${item.wingspan}</dd>
          </div>
          <div class="species-metric-cell">
            <dt>Adult span</dt>
            <dd>${item.lifespan}</dd>
          </div>
        </dl>

        <p class="species-host">
          <strong>Host plants:</strong> ${item.host}. ${item.note}
        </p>
      </article>
    `).join('');

    countEl.textContent = `Showing ${items.length} of ${SPECIES.length} species`;
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((btn) => {
        const active = btn === tab;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
      });
      render(tab.dataset.species || 'all');
    });
  });

  render('all');
}

function initTicketBooking() {
  const form = document.getElementById('ticket-form');
  const receipt = document.getElementById('receipt-card');
  const dateInput = document.getElementById('visit-date');
  const slotButtons = document.querySelectorAll('.slot-btn');
  const stepButtons = document.querySelectorAll('.step-btn');
  const summaryCountEl = document.getElementById('summary-count');
  const summaryTotalEl = document.getElementById('summary-total');
  const errorEl = document.getElementById('form-error');
  const receiptRefEl = document.getElementById('receipt-ref');
  const receiptDetailsEl = document.getElementById('receipt-details');
  const resetBtn = document.getElementById('reset-booking-btn');
  const applyMemberBtn = document.getElementById('apply-member-btn');

  if (!form || !receipt || !dateInput) return;

  const state = {
    slot: '10:00',
    adult: 2,
    child: 0,
    member: 0
  };

  const setDefaultDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const toIso = (d) => d.toISOString().split('T')[0];
    dateInput.min = toIso(today);
    dateInput.value = toIso(tomorrow);
  };

  const updateCounts = () => {
    document.getElementById('count-adult').textContent = String(state.adult);
    document.getElementById('count-child').textContent = String(state.child);
    document.getElementById('count-member').textContent = String(state.member);

    const totalPasses = state.adult + state.child + state.member;
    const totalAmount = state.adult * PRICES.adult + state.child * PRICES.child + state.member * PRICES.member;

    summaryCountEl.textContent = `${totalPasses} ${totalPasses === 1 ? 'pass' : 'passes'}`;
    summaryTotalEl.textContent = `£${totalAmount.toFixed(2)}`;
  };

  slotButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      slotButtons.forEach((item) => {
        const selected = item === btn;
        item.classList.toggle('is-selected', selected);
        item.setAttribute('aria-checked', String(selected));
      });
      state.slot = btn.dataset.slot || '10:00';
    });
  });

  stepButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const key = btn.dataset.pass;
      const delta = Number(btn.dataset.delta || 0);
      if (!key || !(key in state)) return;
      state[key] = Math.max(0, Math.min(12, state[key] + delta));
      errorEl.hidden = true;
      updateCounts();
    });
  });

  if (applyMemberBtn) {
    applyMemberBtn.addEventListener('click', () => {
      if (state.member === 0) {
        state.member = 1;
        updateCounts();
      }
      receipt.hidden = true;
      form.hidden = false;
      document.getElementById('tickets')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.getElementById('visitor-name')?.focus({ preventScroll: true });
    });
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    errorEl.hidden = true;

    const totalPasses = state.adult + state.child + state.member;
    const nameInput = document.getElementById('visitor-name');
    const emailInput = document.getElementById('visitor-email');
    const visitorName = nameInput.value.trim();
    const visitorEmail = emailInput.value.trim();

    if (totalPasses === 0) {
      errorEl.textContent = 'Select at least one admission pass to continue.';
      errorEl.hidden = false;
      return;
    }

    if (!dateInput.value) {
      errorEl.textContent = 'Choose a visit date for your timed entry.';
      errorEl.hidden = false;
      dateInput.focus();
      return;
    }

    if (!visitorName || !visitorEmail || !emailInput.checkValidity()) {
      errorEl.textContent = 'Enter your full name and a valid email address.';
      errorEl.hidden = false;
      if (!visitorName) nameInput.focus();
      else emailInput.focus();
      return;
    }

    const totalAmount = state.adult * PRICES.adult + state.child * PRICES.child + state.member * PRICES.member;
    const code = `LIN-${new Date().getFullYear()}-${String(Math.floor(1000 + Math.random() * 9000))}`;
    receiptRefEl.textContent = code;

    const breakdownParts = [];
    if (state.adult > 0) breakdownParts.push(`${state.adult} Adult`);
    if (state.child > 0) breakdownParts.push(`${state.child} Child`);
    if (state.member > 0) breakdownParts.push(`${state.member} Member`);

    receiptDetailsEl.innerHTML = `
      <div class="receipt-row"><dt>Visitor</dt><dd>${escapeHtml(visitorName)}</dd></div>
      <div class="receipt-row"><dt>Confirmation sent</dt><dd>${escapeHtml(visitorEmail)}</dd></div>
      <div class="receipt-row"><dt>Visit date</dt><dd>${escapeHtml(dateInput.value)}</dd></div>
      <div class="receipt-row"><dt>Entry window</dt><dd>${escapeHtml(state.slot)} airlock</dd></div>
      <div class="receipt-row"><dt>Passes</dt><dd>${escapeHtml(breakdownParts.join(' · '))}</dd></div>
      <div class="receipt-row"><dt>Total</dt><dd>£${totalAmount.toFixed(2)}</dd></div>
    `;

    form.hidden = true;
    receipt.hidden = false;
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      receipt.hidden = true;
      form.hidden = false;
      state.adult = 2;
      state.child = 0;
      state.member = 0;
      setDefaultDate();
      updateCounts();
    });
  }

  setDefaultDate();
  updateCounts();
}

function escapeHtml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
