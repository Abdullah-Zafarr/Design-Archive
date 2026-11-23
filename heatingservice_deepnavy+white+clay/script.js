(() => {
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!open));
      mobileDrawer.hidden = open;
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.hidden = true;
      });
    });
  }

  // Reveal above-the-fold and on scroll
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
      { threshold: 0.08, rootMargin: '0px 0px -24px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Hero telemetry state and preset inspector
  const TELEMETRY_PRESETS = {
    nominal: {
      score: 98,
      healthSub: 'System running well',
      healthMeta: ['1.4 bar', '62°C flow'],
      arrivalTime: '9:30',
      arrivalSub: 'Your engineer is on the way',
      arrivalPct: 78,
      arrivalMeta: ['Van NG-14', '1.8 miles away'],
      serviceSub: 'In 3 months',
      serviceMeta: ['91.4% ErP', 'CP12 valid'],
      sparkLine: 'M8 74 C 38 66, 54 44, 82 52 C 110 60, 128 54, 152 38 C 174 24, 194 20, 212 16',
      sparkArea: 'M8 74 C 38 66, 54 44, 82 52 C 110 60, 128 54, 152 38 C 174 24, 194 20, 212 16 L 212 90 L 8 90 Z',
      details: {
        health: ['Boiler health telemetry', 'Flue O2 4.2%, CO/CO2 ratio 0.0014, expansion vessel 1.4 bar cold'],
        arrival: ['Live dispatch telemetry', 'Engineer Callum Reid en route from Deansgate hub · ETA 09:30'],
        service: ['Service schedule telemetry', 'Next Gas Safe 28-point combustion check due in 90 days'],
      },
    },
    check: {
      score: 94,
      healthSub: 'Pressure check in progress',
      healthMeta: ['1.5 bar', '58°C flow'],
      arrivalTime: '0:00',
      arrivalSub: 'Engineer on site now',
      arrivalPct: 100,
      arrivalMeta: ['Van NG-14', 'On site'],
      serviceSub: 'Due today',
      serviceMeta: ['92.1% ErP', 'Testing flue'],
      sparkLine: 'M8 68 C 42 54, 68 58, 96 42 C 124 28, 154 34, 182 22 C 196 18, 204 16, 212 14',
      sparkArea: 'M8 68 C 42 54, 68 58, 96 42 C 124 28, 154 34, 182 22 C 196 18, 204 16, 212 14 L 212 90 L 8 90 Z',
      details: {
        health: ['Boiler health telemetry', 'Standing gas inlet 21.4 mbar, working pressure 19.8 mbar'],
        arrival: ['Live dispatch telemetry', 'Callum Reid checked in on site · 28-point inspection active'],
        service: ['Service schedule telemetry', 'Annual service sign-off and CP12 PDF queued for issue'],
      },
    },
    winter: {
      score: 96,
      healthSub: 'Winter modulation active',
      healthMeta: ['1.6 bar', '68°C flow'],
      arrivalTime: '11:15',
      arrivalSub: 'Priority winter dispatch',
      arrivalPct: 54,
      arrivalMeta: ['Van NG-07', '4.1 miles away'],
      serviceSub: 'In 6 months',
      serviceMeta: ['90.8% ErP', 'Filter clean'],
      sparkLine: 'M8 78 C 36 70, 62 60, 90 48 C 122 36, 148 44, 178 28 C 194 22, 204 20, 212 18',
      sparkArea: 'M8 78 C 36 70, 62 60, 90 48 C 122 36, 148 44, 178 28 C 194 22, 204 20, 212 18 L 212 90 L 8 90 Z',
      details: {
        health: ['Boiler health telemetry', 'Weather compensation active · outside 2°C, return 54°C'],
        arrival: ['Live dispatch telemetry', 'Priority winter cover crew dispatched from Leeds West hub'],
        service: ['Service schedule telemetry', 'Magnetic filter cleared last visit · inhibitor concentration verified'],
      },
    },
  };

  let activePresetKey = 'nominal';
  let activeCardKey = 'health';

  const gaugeFill = document.getElementById('gaugeFill');
  const healthScore = document.getElementById('healthScore');
  const healthSubtitle = document.getElementById('healthSubtitle');
  const healthMeta = document.getElementById('healthMeta');
  const arrivalTime = document.getElementById('arrivalTime');
  const arrivalSubtitle = document.getElementById('arrivalSubtitle');
  const arrivalBar = document.getElementById('arrivalBar');
  const arrivalMeta = document.getElementById('arrivalMeta');
  const serviceSubtitle = document.getElementById('serviceSubtitle');
  const serviceMeta = document.getElementById('serviceMeta');
  const sparkLine = document.getElementById('sparkLine');
  const sparkArea = document.getElementById('sparkArea');
  const inspectorLabel = document.getElementById('inspectorLabel');
  const inspectorDetail = document.getElementById('inspectorDetail');

  const CIRCUMFERENCE = 2 * Math.PI * 46;

  function renderTelemetry() {
    const data = TELEMETRY_PRESETS[activePresetKey];
    if (!data) return;

    if (healthScore) healthScore.textContent = String(data.score);
    if (healthSubtitle) healthSubtitle.textContent = data.healthSub;
    if (healthMeta) {
      healthMeta.innerHTML = `<span>${data.healthMeta[0]}</span><span>${data.healthMeta[1]}</span>`;
    }
    if (gaugeFill) {
      const offset = CIRCUMFERENCE * (1 - data.score / 100);
      gaugeFill.style.strokeDasharray = CIRCUMFERENCE.toFixed(2);
      gaugeFill.style.strokeDashoffset = offset.toFixed(2);
    }

    if (arrivalTime) arrivalTime.textContent = data.arrivalTime;
    if (arrivalSubtitle) arrivalSubtitle.textContent = data.arrivalSub;
    if (arrivalBar) arrivalBar.style.width = `${data.arrivalPct}%`;
    if (arrivalMeta) {
      arrivalMeta.innerHTML = `<span>${data.arrivalMeta[0]}</span><span>${data.arrivalMeta[1]}</span>`;
    }

    if (serviceSubtitle) serviceSubtitle.textContent = data.serviceSub;
    if (serviceMeta) {
      serviceMeta.innerHTML = `<span>${data.serviceMeta[0]}</span><span>${data.serviceMeta[1]}</span>`;
    }
    if (sparkLine) sparkLine.setAttribute('d', data.sparkLine);
    if (sparkArea) sparkArea.setAttribute('d', data.sparkArea);

    const detail = data.details[activeCardKey];
    if (detail && inspectorLabel && inspectorDetail) {
      inspectorLabel.textContent = detail[0];
      inspectorDetail.textContent = detail[1];
    }
  }

  document.querySelectorAll('.telemetry-card').forEach((card) => {
    card.addEventListener('click', () => {
      activeCardKey = card.dataset.telemetry || 'health';
      document.querySelectorAll('.telemetry-card').forEach((c) => {
        const selected = c === card;
        c.classList.toggle('is-selected', selected);
        c.setAttribute('aria-pressed', String(selected));
      });
      renderTelemetry();
    });
  });

  document.querySelectorAll('.preset-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      activePresetKey = btn.dataset.preset || 'nominal';
      document.querySelectorAll('.preset-btn').forEach((b) => {
        b.classList.toggle('is-active', b === btn);
      });
      renderTelemetry();
    });
  });

  renderTelemetry();

  // Chapter 1: Billing toggle and plan selection
  const billingTabs = document.querySelectorAll('.billing-tab');
  const priceEls = document.querySelectorAll('.plan-price');
  const unitEls = document.querySelectorAll('.plan-unit');

  billingTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const mode = tab.dataset.billing === 'annual' ? 'annual' : 'monthly';
      billingTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      priceEls.forEach((el) => {
        el.textContent = el.dataset[mode] || el.textContent;
      });
      unitEls.forEach((el) => {
        el.textContent = mode === 'annual' ? el.dataset.unitAnnual : el.dataset.unitMonthly;
      });
    });
  });

  const serviceSelect = document.getElementById('serviceSelect');
  const contactSection = document.getElementById('contact');

  function jumpToBooking(serviceValue) {
    if (serviceSelect && serviceValue) {
      serviceSelect.value = serviceValue;
    }
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const postcodeInput = document.getElementById('postcodeInput');
      if (postcodeInput) postcodeInput.focus({ preventScroll: true });
    }
  }

  document.querySelectorAll('.plan-select').forEach((btn) => {
    btn.addEventListener('click', () => {
      jumpToBooking(btn.dataset.plan || 'Annual boiler service');
    });
  });

  // Chapter 2: Interactive Fault-Code & Efficiency Calculator
  const FAULT_DATA = {
    pressure: {
      badge: 'EA / F22',
      severity: 'Priority: Same-day',
      finding: 'System pressure dropped below 0.7 bar',
      action: 'Check the pressure gauge below the casing. If below 1.0 bar when cold, open the filling loop gently to 1.3 bar, then inspect radiator valves for weeping.',
      cost: '£95 – £165',
      bookService: 'Emergency breakdown',
    },
    ignition: {
      badge: 'F28 / L2',
      severity: 'Priority: Urgent (< 4 hr)',
      finding: 'Ignition lockout after 3 flame-sense retries',
      action: 'Verify gas supply at the meter and hob. If other appliances light normally, an engineer needs to test the gas valve, spark electrode, and flame rectification probe.',
      cost: '£115 – £210',
      bookService: 'Emergency breakdown',
    },
    pump: {
      badge: 'F75',
      severity: 'Priority: Same-day',
      finding: 'Insufficient pressure jump on pump start',
      action: 'Indicates a worn water pressure sensor, airlock, or magnetite sludge restricting the circulation pump. Avoid repeated resets and schedule a pump and sensor bench test.',
      cost: '£130 – £245',
      bookService: 'Powerflush & balancing',
    },
    condensate: {
      badge: 'D1 / E133',
      severity: 'Priority: Weather-related',
      finding: 'Frozen or blocked condensate discharge trap',
      action: 'During sub-zero nights external 22 mm condensate runs can ice up. Thaw exposed pipework safely with warm water, never boiling, and request lagging upgrade.',
      cost: '£85 – £145',
      bookService: 'Emergency breakdown',
    },
  };

  const BRAND_LABELS = {
    worcester: 'Worcester',
    vaillant: 'Vaillant',
    ideal: 'Ideal',
    baxi: 'Baxi',
  };

  let activeFault = 'pressure';

  const boilerBrand = document.getElementById('boilerBrand');
  const boilerAge = document.getElementById('boilerAge');
  const annualSpend = document.getElementById('annualSpend');
  const boilerAgeOut = document.getElementById('boilerAgeOut');
  const annualSpendOut = document.getElementById('annualSpendOut');

  const diagCodeBadge = document.getElementById('diagCodeBadge');
  const diagSeverity = document.getElementById('diagSeverity');
  const diagFinding = document.getElementById('diagFinding');
  const diagAction = document.getElementById('diagAction');
  const diagRepairCost = document.getElementById('diagRepairCost');
  const diagEfficiency = document.getElementById('diagEfficiency');
  const diagSaving = document.getElementById('diagSaving');
  const diagBookBtn = document.getElementById('diagBookBtn');

  function updateDiagnostic() {
    const fault = FAULT_DATA[activeFault] || FAULT_DATA.pressure;
    const brandName = BRAND_LABELS[boilerBrand?.value || 'worcester'] || 'Worcester';
    const age = Number(boilerAge?.value || 11);
    const spend = Number(annualSpend?.value || 1350);

    if (boilerAgeOut) boilerAgeOut.textContent = `${age} years`;
    if (annualSpendOut) annualSpendOut.textContent = `£${spend.toLocaleString('en-GB')}`;

    const efficiency = Math.max(68, Math.min(93.5, 94.2 - age * 1.18));
    const targetEfficiency = 94.0;
    const saving = Math.max(45, Math.round(spend * ((targetEfficiency - efficiency) / targetEfficiency)));

    if (diagCodeBadge) diagCodeBadge.textContent = `${brandName} · ${fault.badge}`;
    if (diagSeverity) diagSeverity.textContent = fault.severity;
    if (diagFinding) diagFinding.textContent = fault.finding;
    if (diagAction) diagAction.textContent = fault.action;
    if (diagRepairCost) diagRepairCost.textContent = fault.cost;
    if (diagEfficiency) diagEfficiency.textContent = `${efficiency.toFixed(1)}%`;
    if (diagSaving) diagSaving.textContent = `£${saving} / yr`;
  }

  document.querySelectorAll('.fault-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      activeFault = tab.dataset.fault || 'pressure';
      document.querySelectorAll('.fault-tab').forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      updateDiagnostic();
    });
  });

  if (boilerBrand) boilerBrand.addEventListener('change', updateDiagnostic);
  if (boilerAge) boilerAge.addEventListener('input', updateDiagnostic);
  if (annualSpend) annualSpend.addEventListener('input', updateDiagnostic);

  if (diagBookBtn) {
    diagBookBtn.addEventListener('click', () => {
      const fault = FAULT_DATA[activeFault] || FAULT_DATA.pressure;
      jumpToBooking(fault.bookService);
    });
  }

  updateDiagnostic();

  // Chapter 3: Booking Form & Dispatch Ticket
  let selectedWindow = 'Morning 08:00 - 12:00';
  document.querySelectorAll('.window-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedWindow = btn.dataset.window || 'Morning 08:00 - 12:00';
      document.querySelectorAll('.window-btn').forEach((b) => {
        const checked = b === btn;
        b.classList.toggle('is-active', checked);
        b.setAttribute('aria-checked', String(checked));
      });
    });
  });

  const bookingForm = document.getElementById('bookingForm');
  const ticketConfirmation = document.getElementById('ticketConfirmation');
  const formError = document.getElementById('formError');
  const resetBookingBtn = document.getElementById('resetBookingBtn');

  function inferHub(postcode) {
    const clean = postcode.trim().toUpperCase();
    if (clean.startsWith('LS') || clean.startsWith('BD') || clean.startsWith('WF')) {
      return 'Leeds West Hub';
    }
    return 'Manchester Central Hub';
  }

  if (bookingForm && ticketConfirmation) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const postcode = document.getElementById('postcodeInput')?.value.trim() || '';
      const name = document.getElementById('customerName')?.value.trim() || '';
      const email = document.getElementById('customerEmail')?.value.trim() || '';
      const service = serviceSelect?.value || 'Annual boiler service';

      if (postcode.length < 4 || name.length < 2 || !email.includes('@')) {
        if (formError) {
          formError.textContent = 'Enter a valid postcode, contact name, and email address to issue a dispatch ticket.';
          formError.hidden = false;
        }
        return;
      }

      if (formError) formError.hidden = true;

      const ticketIdEl = document.getElementById('ticketId');
      const ticketPostcodeEl = document.getElementById('ticketPostcode');
      const ticketHubEl = document.getElementById('ticketHub');
      const ticketServiceEl = document.getElementById('ticketService');
      const ticketWindowEl = document.getElementById('ticketWindow');

      if (ticketIdEl) ticketIdEl.textContent = 'NG-4821';
      if (ticketPostcodeEl) ticketPostcodeEl.textContent = postcode.toUpperCase();
      if (ticketHubEl) ticketHubEl.textContent = inferHub(postcode);
      if (ticketServiceEl) ticketServiceEl.textContent = service;
      if (ticketWindowEl) ticketWindowEl.textContent = selectedWindow;

      bookingForm.hidden = true;
      ticketConfirmation.hidden = false;
    });
  }

  if (resetBookingBtn && bookingForm && ticketConfirmation) {
    resetBookingBtn.addEventListener('click', () => {
      bookingForm.reset();
      ticketConfirmation.hidden = true;
      bookingForm.hidden = false;
    });
  }
})();
