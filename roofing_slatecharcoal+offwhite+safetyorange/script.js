(() => {
  const SYSTEMS = {
    slate: {
      code: 'SYS-01 · BS 5534 COMPLIANT',
      pitch: 'Min pitch 22.5°',
      name: 'Penrhyn Welsh Natural Slate',
      desc: 'Riven 7 mm blue-grey slate double-lapped over breathable vapour membrane, graded tanalised battens, and copper clout nails.',
      wind: '145 mph',
      life: '80+ yrs',
      warranty: '25 yr',
      rate: 165,
      fixing: 'Copper nails + stainless steel ridge clips every 3rd course',
      underlay: '175 g/m² breather membrane with dry-fix ventilated ridge',
      flashing: 'Code 5 milled lead abutments and valley gutters',
      diagram: 'Dry-fix ridge · 35° dual-pitch profile',
      label: 'Welsh Slate'
    },
    zinc: {
      code: 'SYS-02 · EN 988 STANDING SEAM',
      pitch: 'Min pitch 5°',
      name: 'Pre-Weathered Standing-Seam Zinc',
      desc: '0.8 mm architectural quartz-zinc panels double-lock welted onto ventilated plywood decking with concealed sliding stainless clips.',
      wind: '155 mph',
      life: '75+ yrs',
      warranty: '25 yr',
      rate: 185,
      fixing: 'Concealed fixed & sliding stainless clips at 300 mm centres',
      underlay: 'Structured breather mat over 25 mm ventilated air cavity',
      flashing: 'Welted zinc drip eaves, box gutters, and parapet cappings',
      diagram: 'Double-lock welt · 14° low-pitch seam',
      label: 'Standing-Seam Zinc'
    },
    clay: {
      code: 'SYS-03 · BS EN 1304 PLAIN TILE',
      pitch: 'Min pitch 35°',
      name: 'Staffordshire Blue-Brindle Clay Tile',
      desc: 'Double-cambered kilned plain tiles fixed with corrosion-resistant alloy nails and eaves storm clips for steep residential pitches.',
      wind: '130 mph',
      life: '65+ yrs',
      warranty: '25 yr',
      rate: 138,
      fixing: 'Twice-nailed eaves & verge courses with alloy storm clips',
      underlay: 'High-tensile breathable felt with 25×50 mm treated battens',
      flashing: 'Code 4 lead stepped flashings and clay hip irons',
      diagram: 'Double-lap tile · 40° steep-pitch profile',
      label: 'Clay Plain Tile'
    }
  };

  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  function syncHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  }
  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  if (menuToggle && mobileDrawer) {
    const closeDrawer = () => {
      mobileDrawer.hidden = true;
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      mobileDrawer.hidden = expanded;
      menuToggle.setAttribute('aria-expanded', String(!expanded));
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && !mobileDrawer.hidden) {
        closeDrawer();
        menuToggle.focus();
      }
    });
  }

  // System tabs & guide estimator
  let activeSystemKey = 'slate';
  const tabs = document.querySelectorAll('.system-tab');
  const panel = document.getElementById('systemPanel');
  const areaSlider = document.getElementById('areaSlider');
  const areaReadout = document.getElementById('areaReadout');
  const estimatorSub = document.getElementById('estimatorSub');
  const estimatorPrice = document.getElementById('estimatorPrice');
  const estimatorBookBtn = document.getElementById('estimatorBookBtn');
  const materialSelect = document.getElementById('materialSelect');

  function updateEstimator() {
    if (!areaSlider) return;
    const area = Number(areaSlider.value);
    const sys = SYSTEMS[activeSystemKey];
    const total = area * sys.rate;
    if (areaReadout) areaReadout.textContent = `${area} m²`;
    if (estimatorSub) estimatorSub.textContent = `${area} m² × £${sys.rate} / m²`;
    if (estimatorPrice) estimatorPrice.textContent = `£${total.toLocaleString('en-GB')}`;
  }

  function renderSystem(key) {
    const sys = SYSTEMS[key];
    if (!sys) return;
    activeSystemKey = key;
    document.getElementById('systemCode').textContent = sys.code;
    document.getElementById('systemPitch').textContent = sys.pitch;
    document.getElementById('systemName').textContent = sys.name;
    document.getElementById('systemDesc').textContent = sys.desc;
    document.getElementById('specWind').textContent = sys.wind;
    document.getElementById('specLife').textContent = sys.life;
    document.getElementById('specWarranty').textContent = sys.warranty;
    document.getElementById('specRate').textContent = `£${sys.rate} / m²`;
    document.getElementById('layerFixing').textContent = sys.fixing;
    document.getElementById('layerUnderlay').textContent = sys.underlay;
    document.getElementById('layerFlashing').textContent = sys.flashing;
    document.getElementById('diagramLabel').textContent = sys.diagram;
    if (estimatorBookBtn) {
      estimatorBookBtn.textContent = `Book survey for ${sys.label}`;
    }
    if (materialSelect) {
      materialSelect.value = sys.label;
    }
    updateEstimator();
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.system;
      tabs.forEach((t) => {
        const selected = t === tab;
        t.classList.toggle('is-active', selected);
        t.setAttribute('aria-selected', String(selected));
      });
      if (panel) panel.setAttribute('aria-labelledby', tab.id);
      renderSystem(key);
    });
  });

  if (areaSlider) {
    areaSlider.addEventListener('input', updateEstimator);
  }

  // Ledger depot filter & row expansion
  const filterChips = document.querySelectorAll('.filter-chip');
  const ledgerRows = document.querySelectorAll('.ledger-row[data-region]');

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const region = chip.dataset.region;
      filterChips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-pressed', String(active));
      });
      ledgerRows.forEach((row) => {
        row.hidden = region !== 'all' && row.dataset.region !== region;
      });
    });
  });

  ledgerRows.forEach((row) => {
    row.addEventListener('click', () => {
      const expanded = row.classList.toggle('is-expanded');
      row.setAttribute('aria-expanded', String(expanded));
    });
  });

  // Survey form validation & instant confirmation
  const surveyForm = document.getElementById('surveyForm');
  const surveyConfirm = document.getElementById('surveyConfirm');
  const postcodeInput = document.getElementById('postcodeInput');
  const emailInput = document.getElementById('emailInput');
  const postcodeError = document.getElementById('postcodeError');
  const emailError = document.getElementById('emailError');
  const slotBtns = document.querySelectorAll('.slot-btn');
  const heroSurveyStatus = document.getElementById('heroSurveyStatus');
  const resetSurveyBtn = document.getElementById('resetSurveyBtn');
  let selectedSlot = 'Tue 9:00';
  let refCounter = 2094;

  slotBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedSlot = btn.dataset.slot || 'Tue 9:00';
      slotBtns.forEach((b) => {
        const active = b === btn;
        b.classList.toggle('is-selected', active);
        b.setAttribute('aria-checked', String(active));
      });
    });
  });

  function getDepotForPostcode(pc) {
    const clean = pc.trim().toUpperCase();
    if (/^(LS|HG|YO|BD|WF|HX|HD|DN|S)/.test(clean)) {
      return 'Yorkshire Wharfedale Yard';
    }
    return 'Bristol Clifton Depot';
  }

  if (surveyForm && surveyConfirm) {
    surveyForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      let valid = true;

      const pcVal = (postcodeInput?.value || '').trim().toUpperCase();
      const emailVal = (emailInput?.value || '').trim();

      if (postcodeError) {
        if (!/^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i.test(pcVal)) {
          postcodeError.textContent = 'Enter a valid UK postcode such as BS8 3HG or LS29 8AA.';
          postcodeError.hidden = false;
          valid = false;
        } else {
          postcodeError.hidden = true;
        }
      }

      if (emailError) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
          emailError.textContent = 'Enter a valid email address for the survey sheet.';
          emailError.hidden = false;
          valid = false;
        } else {
          emailError.hidden = true;
        }
      }

      if (!valid) return;

      const material = materialSelect?.value || 'Welsh Slate';
      const pitch = document.getElementById('pitchSelect')?.value || 'Standard 22°–34°';
      const depot = getDepotForPostcode(pcVal);

      document.getElementById('confirmRef').textContent = `RL-${refCounter}`;
      document.getElementById('confirmHeadline').textContent = `Drone survey booked for ${selectedSlot}`;
      document.getElementById('confirmDetails').textContent = `Assigned to ${depot} for ${pcVal}.`;
      document.getElementById('confirmMaterial').textContent = material;
      document.getElementById('confirmPitch').textContent = pitch;
      document.getElementById('confirmEmail').textContent = emailVal;

      if (heroSurveyStatus) {
        heroSurveyStatus.textContent = `Survey booked · ${selectedSlot}`;
      }

      refCounter += 1;
      surveyForm.hidden = true;
      surveyConfirm.hidden = false;
    });

    if (resetSurveyBtn) {
      resetSurveyBtn.addEventListener('click', () => {
        surveyConfirm.hidden = true;
        surveyForm.hidden = false;
        postcodeInput?.focus();
      });
    }
  }

  // Reveal choreography
  const revealEls = document.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  } else {
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
    revealEls.forEach((el) => observer.observe(el));
  }
})();
