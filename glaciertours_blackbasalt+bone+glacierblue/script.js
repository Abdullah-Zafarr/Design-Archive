const ROUTES = {
  'blue-vault': {
    code: 'ROUTE KLD-01',
    name: 'Blue Vault 3h',
    price: 39900,
    status: 'Stable · Verified 07:00 UTC',
    desc: 'A 1.4 km sub-glacial circuit through compressed Holocene ice chambers beneath western Langjökull. Designed for steady footing on flat volcanic moraine transitioning into clear blue meltwater tunnels.',
    brief: 'Super-jeep transfer climbs 38 minutes from Húsafell to the moraine edge. Guests fit 12-point crampons at the threshold before descending 24 meters under the main arch.',
    elevation: '1,180 m',
    crampon: 'Grade II (12-point)',
    cap: '8 guests',
    window: '09:30 / 13:00',
    distance: '1.4 km circuit',
    stability: 'Stable · Verified 07:00 UTC',
  },
  'basalt-ridge': {
    code: 'ROUTE KLD-02',
    name: 'Basalt Ridge 5h',
    price: 58500,
    status: 'Stable · Anchors inspected',
    desc: 'A five-hour traverse linking upper volcanic ash tephra bands with deep vertical ice moulins. Guests walk exposed glacial ridgelines before descending into the lower basalt fissure.',
    brief: 'Requires sustained stair-stepping in stiff crampons and ice-axe balance checks with the lead guide. Hot broth and wind-shelter stop included inside the mid-vault ledge.',
    elevation: '1,340 m',
    crampon: 'Grade III (Technical)',
    cap: '8 guests',
    window: '08:30',
    distance: '3.2 km traverse',
    stability: 'Stable · Anchors inspected',
  },
  'dawn-aperture': {
    code: 'ROUTE KLD-03',
    name: 'Dawn Aperture 4h',
    price: 49200,
    status: 'Open · Low-angle light',
    desc: 'Early-access departure timed to low horizontal sun illuminating the eastern ice mouth before standard day groups reach the moraine.',
    brief: 'Includes 55 minutes inside the main cobalt arch for tripod setup and unhurried inspection of trapped ash strata. Headlamps and crampons fitted at Húsafell prior to boarding.',
    elevation: '1,260 m',
    crampon: 'Grade II (12-point)',
    cap: '8 guests',
    window: '07:45',
    distance: '1.8 km return',
    stability: 'Open · Low-angle light',
  },
};

const SEASON_DETAILS = {
  November: {
    label: 'November field window',
    copy: 'Early freeze firms meltwater drains. Blue Vault departs 09:30 and 13:00 daily from Húsafell.',
  },
  December: {
    label: 'December solstice window',
    copy: 'Low solar angle turns outer ice arches deep sapphire. Headlamps illuminate the full 1.4 km circuit.',
  },
  January: {
    label: 'January core freeze',
    copy: 'Peak ice density at -8 °C ceiling temperature. Three daily departures active including Dawn Aperture.',
  },
  February: {
    label: 'February high clarity',
    copy: 'Extending daylight pairs with dry winter air. Ideal visibility across the western glacier moraine.',
  },
  March: {
    label: 'March late-winter window',
    copy: 'Long sunlight hours until 19:20 before spring meltwater channels reopen. Final month of the ice-cave season.',
  },
};

function formatIsk(amount) {
  return `${amount.toLocaleString('en-US')} ISK`;
}

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  // Sticky header scroll state
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 36);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Mobile navigation drawer
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mobileDrawer.hidden = expanded;
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.hidden = true;
      });
    });
  }

  // Reveal observer
  const reveals = document.querySelectorAll('.reveal');
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
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
    );
    reveals.forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
        el.classList.add('is-visible');
      } else {
        io.observe(el);
      }
    });
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Chapter 1: Expedition route tabs
  const routeTabs = document.querySelectorAll('.route-tab');
  const routePanel = document.getElementById('panel-route');
  const selectRouteBtn = document.getElementById('select-route-btn');
  const bookRouteSelect = document.getElementById('book-route');

  function renderRoute(routeId) {
    const data = ROUTES[routeId];
    if (!data) return;

    routeTabs.forEach((tab) => {
      const active = tab.dataset.route === routeId;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      if (active && routePanel) {
        routePanel.setAttribute('aria-labelledby', tab.id);
      }
    });

    document.getElementById('route-code').textContent = data.code;
    document.getElementById('route-status').textContent = data.status;
    document.getElementById('route-name').textContent = data.name;
    document.getElementById('route-desc').textContent = data.desc;
    document.getElementById('route-brief').textContent = data.brief;
    document.getElementById('route-rate').textContent = `${formatIsk(data.price)} per guest`;
    document.getElementById('spec-elevation').textContent = data.elevation;
    document.getElementById('spec-crampon').textContent = data.crampon;
    document.getElementById('spec-cap').textContent = data.cap;
    document.getElementById('spec-window').textContent = data.window;
    document.getElementById('spec-distance').textContent = data.distance;
    document.getElementById('spec-stability').textContent = data.stability;

    if (selectRouteBtn) {
      selectRouteBtn.textContent = `Reserve ${data.name}`;
      selectRouteBtn.dataset.routeId = routeId;
    }
  }

  routeTabs.forEach((tab) => {
    tab.addEventListener('click', () => renderRoute(tab.dataset.route));
  });

  if (selectRouteBtn && bookRouteSelect) {
    selectRouteBtn.addEventListener('click', () => {
      const routeId = selectRouteBtn.dataset.routeId || 'blue-vault';
      bookRouteSelect.value = routeId;
      updateBookingSummary();
      document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
      bookRouteSelect.focus();
    });
  }

  // Chapter 2: Gear filter & guest checklist
  const gearFilters = document.querySelectorAll('.gear-filter');
  const gearItems = document.querySelectorAll('.gear-item');
  const guestChecks = document.querySelectorAll('[data-guest-check]');
  const readinessCount = document.getElementById('readiness-count');
  const resetGearBtn = document.getElementById('reset-gear-btn');

  function updateGuestReadiness() {
    const total = guestChecks.length;
    const checked = [...guestChecks].filter((cb) => cb.checked).length;
    if (readinessCount) {
      readinessCount.textContent = `${checked} / ${total} guest layers checked`;
    }
  }

  gearFilters.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;
      gearFilters.forEach((f) => {
        const active = f === btn;
        f.classList.toggle('is-active', active);
        f.setAttribute('aria-selected', String(active));
      });
      gearItems.forEach((item) => {
        item.hidden = filter !== 'all' && item.dataset.owner !== filter;
      });
    });
  });

  guestChecks.forEach((cb) => cb.addEventListener('change', updateGuestReadiness));

  if (resetGearBtn) {
    resetGearBtn.addEventListener('click', () => {
      guestChecks.forEach((cb) => {
        cb.checked = false;
      });
      updateGuestReadiness();
    });
  }

  // Chapter 2: Seasonal departure ledger
  const ledgerRows = document.querySelectorAll('.ledger-row');
  const ledgerDetail = document.getElementById('ledger-detail');

  ledgerRows.forEach((row) => {
    row.addEventListener('click', () => {
      const month = row.dataset.month;
      const info = SEASON_DETAILS[month];
      if (!info || !ledgerDetail) return;

      ledgerRows.forEach((r) => r.classList.toggle('is-selected', r === row));
      ledgerDetail.querySelector('.ledger-detail-label').textContent = info.label;
      ledgerDetail.querySelector('.ledger-detail-copy').textContent = info.copy;
    });
  });

  // Chapter 3: Booking calculator & validation
  const bookForm = document.getElementById('booking-form');
  const bookDate = document.getElementById('book-date');
  const bookParty = document.getElementById('book-party');
  const bookBoot = document.getElementById('book-boot');
  const bookName = document.getElementById('book-name');
  const bookEmail = document.getElementById('book-email');
  const confirmedBox = document.getElementById('booking-confirmed');
  const resetBookingBtn = document.getElementById('reset-booking-btn');

  function updateBookingSummary() {
    if (!bookRouteSelect || !bookParty || !bookBoot) return;
    const route = ROUTES[bookRouteSelect.value] || ROUTES['blue-vault'];
    const party = Math.min(8, Math.max(1, Number(bookParty.value) || 1));
    const total = route.price * party;

    document.getElementById('summary-route-name').textContent = route.name;
    document.getElementById('summary-unit-price').textContent = formatIsk(route.price);
    document.getElementById('summary-party-count').textContent = `${party} ${party === 1 ? 'guest' : 'guests'}`;
    document.getElementById('summary-boot').textContent = `${bookBoot.value} (${party} ${party === 1 ? 'pair' : 'pairs'})`;
    document.getElementById('summary-total').textContent = formatIsk(total);
  }

  [bookRouteSelect, bookParty, bookBoot].forEach((el) => {
    el?.addEventListener('change', updateBookingSummary);
    el?.addEventListener('input', updateBookingSummary);
  });
  updateBookingSummary();

  function setError(id, msg) {
    const el = document.getElementById(id);
    if (el) el.textContent = msg;
  }

  function clearErrors() {
    ['err-date', 'err-party', 'err-name', 'err-email'].forEach((id) => setError(id, ''));
  }

  if (bookForm && confirmedBox) {
    bookForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      clearErrors();

      let valid = true;
      const dateVal = bookDate.value;
      if (!dateVal) {
        setError('err-date', 'Select a departure date.');
        valid = false;
      } else {
        const monthNum = Number(dateVal.split('-')[1]);
        const inSeason = monthNum >= 11 || monthNum <= 3;
        if (!inSeason) {
          setError('err-date', 'Tours operate daily from November to March.');
          valid = false;
        }
      }

      const partyNum = Number(bookParty.value);
      if (!Number.isInteger(partyNum) || partyNum < 1 || partyNum > 8) {
        setError('err-party', 'Enter between 1 and 8 guests per guide.');
        valid = false;
      }

      const nameVal = bookName.value.trim();
      if (nameVal.length < 2) {
        setError('err-name', 'Enter the lead guest full name.');
        valid = false;
      }

      const emailVal = bookEmail.value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        setError('err-email', 'Enter a valid email address for dispatch.');
        valid = false;
      }

      if (!valid) return;

      const route = ROUTES[bookRouteSelect.value] || ROUTES['blue-vault'];
      const refCode = `KLD-${String(1000 + ((nameVal.length * 373 + partyNum * 119) % 9000))}`;

      document.getElementById('confirmed-ref').textContent = refCode;
      document.getElementById('confirmed-title').textContent = route.name;
      document.getElementById('confirmed-guest').textContent = `${nameVal} (${emailVal})`;
      document.getElementById('confirmed-date').textContent = dateVal;
      document.getElementById('confirmed-party').textContent = `${partyNum} ${partyNum === 1 ? 'guest' : 'guests'} · ${bookBoot.value}`;
      document.getElementById('confirmed-total').textContent = formatIsk(route.price * partyNum);

      bookForm.hidden = true;
      confirmedBox.hidden = false;
    });
  }

  if (resetBookingBtn && bookForm && confirmedBox) {
    resetBookingBtn.addEventListener('click', () => {
      confirmedBox.hidden = true;
      bookForm.hidden = false;
      bookName.focus();
    });
  }
});
