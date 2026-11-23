(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-nav-cta');

  const headerTrayPill = document.getElementById('header-tray-pill');
  const headerTrayCount = document.getElementById('header-tray-count');

  const filterTabs = document.querySelectorAll('.filter-tab');
  const menuCards = document.querySelectorAll('.menu-card');

  const trayItemCount = document.getElementById('tray-item-count');
  const trayTotal = document.getElementById('tray-total');
  const trayEmpty = document.getElementById('tray-empty');
  const trayList = document.getElementById('tray-list');
  const trayActions = document.getElementById('tray-actions');
  const trayClear = document.getElementById('tray-clear');
  const bridgeSummary = document.getElementById('bridge-summary');

  const modeBtns = document.querySelectorAll('.mode-btn');
  const partySizeLabel = document.getElementById('party-size-label');
  const partySizeSelect = document.getElementById('party-size');
  const bookingForm = document.getElementById('booking-form');
  const bookingTicket = document.getElementById('booking-ticket');
  const ticketCode = document.getElementById('ticket-code');
  const ticketTitle = document.getElementById('ticket-title');
  const ticketDetails = document.getElementById('ticket-details');
  const ticketReset = document.getElementById('ticket-reset');
  const flavorNotesInput = document.getElementById('flavor-notes');
  const visitDateInput = document.getElementById('visit-date');

  // Default reservation date to today
  if (visitDateInput && !visitDateInput.value) {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    visitDateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // Header scroll state
  const updateHeaderScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  updateHeaderScroll();
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });

  // Mobile drawer toggle
  const setDrawerOpen = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileDrawer.hidden = !open;
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setDrawerOpen(!isOpen);
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => setDrawerOpen(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      setDrawerOpen(false);
      menuToggle.focus();
    }
  });

  // Scroll reveals
  const revealEls = document.querySelectorAll('.reveal');
  const triggerVisible = (el) => el.classList.add('is-visible');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            triggerVisible(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    requestAnimationFrame(() => {
      revealEls.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          triggerVisible(el);
        } else {
          observer.observe(el);
        }
      });
    });
  } else {
    revealEls.forEach(triggerVisible);
  }

  // Category filter tabs
  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.filter;
      filterTabs.forEach((btn) => {
        const active = btn === tab;
        btn.classList.toggle('is-active', active);
        btn.setAttribute('aria-selected', String(active));
      });

      menuCards.forEach((card) => {
        const show = target === 'all' || card.dataset.category === target;
        card.hidden = !show;
      });
    });
  });

  // Live Tasting Tray state
  const tray = new Map();

  const formatEuro = (val) => `€${val.toFixed(2)}`;

  const renderTray = () => {
    let totalCount = 0;
    let totalCost = 0;

    tray.forEach((entry) => {
      totalCount += entry.qty;
      totalCost += entry.qty * entry.price;
    });

    headerTrayCount.textContent = String(totalCount);
    headerTrayPill.classList.toggle('has-items', totalCount > 0);
    trayItemCount.textContent = String(totalCount);
    trayTotal.textContent = formatEuro(totalCost);

    const hasItems = totalCount > 0;
    trayEmpty.hidden = hasItems;
    trayList.hidden = !hasItems;
    trayActions.hidden = !hasItems;

    // Update menu cards
    menuCards.forEach((card) => {
      const id = card.dataset.id;
      const entry = tray.get(id);
      const btn = card.querySelector('.btn-tray');
      const count = entry ? entry.qty : 0;
      card.classList.toggle('is-selected', count > 0);
      btn.classList.toggle('is-added', count > 0);
      btn.textContent = count > 0 ? `In tray (${count}) · Add` : 'Add to tray';
    });

    // Render tray rows
    trayList.innerHTML = '';
    const summaryParts = [];

    tray.forEach((entry) => {
      summaryParts.push(`${entry.qty}x ${entry.name}`);

      const li = document.createElement('li');
      li.className = 'tray-item';

      const nameSpan = document.createElement('span');
      nameSpan.className = 'tray-item-name';
      nameSpan.textContent = entry.name;

      const qtyWrap = document.createElement('div');
      qtyWrap.className = 'tray-item-qty';

      const decBtn = document.createElement('button');
      decBtn.type = 'button';
      decBtn.className = 'qty-btn';
      decBtn.textContent = '−';
      decBtn.setAttribute('aria-label', `Remove one ${entry.name}`);
      decBtn.addEventListener('click', () => {
        if (entry.qty <= 1) {
          tray.delete(entry.id);
        } else {
          entry.qty -= 1;
        }
        renderTray();
      });

      const qtyVal = document.createElement('span');
      qtyVal.textContent = String(entry.qty);

      const incBtn = document.createElement('button');
      incBtn.type = 'button';
      incBtn.className = 'qty-btn';
      incBtn.textContent = '+';
      incBtn.setAttribute('aria-label', `Add one ${entry.name}`);
      incBtn.addEventListener('click', () => {
        entry.qty += 1;
        renderTray();
      });

      qtyWrap.append(decBtn, qtyVal, incBtn);

      const subSpan = document.createElement('span');
      subSpan.className = 'tray-item-sub';
      subSpan.textContent = formatEuro(entry.qty * entry.price);

      li.append(nameSpan, qtyWrap, subSpan);
      trayList.appendChild(li);
    });

    if (hasItems) {
      const joined = summaryParts.join(', ');
      bridgeSummary.textContent = `${joined} (${formatEuro(totalCost)} total)`;
      if (!flavorNotesInput.dataset.userEdited) {
        flavorNotesInput.value = joined;
      }
    } else {
      bridgeSummary.textContent = 'No creations selected yet. You may add coppe in Chapter 01 or specify flavors below.';
      if (!flavorNotesInput.dataset.userEdited) {
        flavorNotesInput.value = '';
      }
    }
  };

  flavorNotesInput.addEventListener('input', () => {
    flavorNotesInput.dataset.userEdited = flavorNotesInput.value.trim() ? 'true' : '';
  });

  menuCards.forEach((card) => {
    const btn = card.querySelector('.btn-tray');
    btn.addEventListener('click', () => {
      const id = card.dataset.id;
      const name = card.dataset.name;
      const price = parseFloat(card.dataset.price);
      const existing = tray.get(id);
      if (existing) {
        existing.qty += 1;
      } else {
        tray.set(id, { id, name, price, qty: 1 });
      }
      renderTray();
    });
  });

  trayClear.addEventListener('click', () => {
    tray.clear();
    renderTray();
  });

  // Service format switch (Salone Table vs Insulated Tasting Box)
  let currentMode = 'Salone Table';

  const setServiceMode = (mode) => {
    currentMode = mode;
    modeBtns.forEach((btn) => {
      const active = btn.dataset.mode === mode;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    partySizeSelect.innerHTML = '';
    const options = mode === 'Salone Table'
      ? ['2 Guests', '4 Guests', '6 Guests']
      : ['600 g Thermal Box (4 scoops)', '1.2 kg Silver Box (8 scoops)'];
    partySizeLabel.textContent = mode === 'Salone Table' ? 'Guests at table' : 'Thermal box size';

    options.forEach((opt) => {
      const el = document.createElement('option');
      el.value = opt;
      el.textContent = opt;
      partySizeSelect.appendChild(el);
    });
  };

  modeBtns.forEach((btn) => {
    btn.addEventListener('click', () => setServiceMode(btn.dataset.mode));
  });

  // Form validation & confirmation ticket
  let ticketCounter = 404;

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameEl = document.getElementById('guest-name');
    const emailEl = document.getElementById('guest-email');
    const dateEl = document.getElementById('visit-date');
    const timeEl = document.getElementById('visit-time');

    const errName = document.getElementById('err-name');
    const errEmail = document.getElementById('err-email');
    const errDate = document.getElementById('err-date');

    errName.textContent = '';
    errEmail.textContent = '';
    errDate.textContent = '';

    let valid = true;

    if (!nameEl.value.trim() || nameEl.value.trim().length < 2) {
      errName.textContent = 'Enter a guest name.';
      valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim())) {
      errEmail.textContent = 'Enter a valid email address.';
      valid = false;
    }

    if (!dateEl.value) {
      errDate.textContent = 'Select a date.';
      valid = false;
    }

    if (!valid) return;

    ticketCounter += 1;
    ticketCode.textContent = `AMR-${String(ticketCounter).padStart(4, '0')}`;
    ticketTitle.textContent = `${currentMode} Confirmed`;

    const notesText = flavorNotesInput.value.trim() || 'Coppa N° 04 Amarena (house default)';

    const rows = [
      ['Format', currentMode],
      ['Guest', nameEl.value.trim()],
      ['Date', dateEl.value],
      ['Window', timeEl.value],
      [currentMode === 'Salone Table' ? 'Table' : 'Box', partySizeSelect.value],
      ['Selection', notesText],
    ];

    ticketDetails.innerHTML = '';
    rows.forEach(([label, val]) => {
      const wrapper = document.createElement('div');
      const dt = document.createElement('dt');
      dt.textContent = label;
      const dd = document.createElement('dd');
      dd.textContent = val;
      wrapper.append(dt, dd);
      ticketDetails.appendChild(wrapper);
    });

    bookingForm.hidden = true;
    bookingTicket.hidden = false;
  });

  ticketReset.addEventListener('click', () => {
    bookingTicket.hidden = true;
    bookingForm.hidden = false;
  });
})();
