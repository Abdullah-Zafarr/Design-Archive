(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const layerBtns = [...document.querySelectorAll('.layer-btn')];
  const svgLayers = [...document.querySelectorAll('[data-svg-layer]')];
  const readoutCode = document.getElementById('readout-code');
  const readoutTitle = document.getElementById('readout-title');
  const readoutCopy = document.getElementById('readout-copy');
  const telImpact = document.getElementById('tel-impact');
  const telFalls = document.getElementById('tel-falls');
  const telWeight = document.getElementById('tel-weight');
  const telDiameter = document.getElementById('tel-diameter');
  const diagramActiveLabel = document.getElementById('diagram-active-label');
  const lengthBtns = [...document.querySelectorAll('.length-btn')];
  const summaryLength = document.getElementById('summary-length');
  const summaryWeight = document.getElementById('summary-weight');
  const summaryPrice = document.getElementById('summary-price');
  const batchCoilInput = document.getElementById('batch-coil');
  const orderForm = document.getElementById('order-form');
  const climberEmail = document.getElementById('climber-email');
  const regionSelect = document.getElementById('region-select');
  const emailError = document.getElementById('climber-email-error');
  const orderConfirmation = document.getElementById('order-confirmation');
  const orderConfirmCopy = document.getElementById('order-confirm-copy');
  const orderResetBtn = document.getElementById('order-reset-btn');

  const layers = {
    kern: {
      code: 'LAYER 01 · KERN CORE',
      title: 'Six-strand counter-twisted polyamide core',
      copy: 'Continuous high-tenacity nylon 6.6 bundles carry 62% of tensile load while elongating cleanly under lead-fall shock.',
      impact: '8.4 kN',
      falls: '9',
      weight: '54 g/m',
      diameter: 'Ø 9.0 mm',
      legend: 'ACTIVE: KERN CORE (62% LOAD)',
    },
    braid: {
      code: 'LAYER 02 · DRY BRAID',
      title: '48-carrier thermal dry sheath weave',
      copy: 'High-density 2×2 outer braid treated with PFC-free resin sheds meltwater and keeps sheath slippage at 0 mm.',
      impact: '8.4 kN',
      falls: '9',
      weight: '54 g/m',
      diameter: 'Ø 9.0 mm',
      legend: 'ACTIVE: DRY BRAID (38% SHEATH)',
    },
    middle: {
      code: 'LAYER 03 · MIDDLE MARK',
      title: 'Woven black tracer across midpoint meter',
      copy: 'Dyed polyamide yarns integrated directly into the carrier pattern mark exact half-rope length without ink fade.',
      impact: '8.4 kN',
      falls: '9',
      weight: '54 g/m',
      diameter: 'Ø 9.0 mm',
      legend: 'ACTIVE: MIDDLE MARK (50% INDEX)',
    },
    arrest: {
      code: 'LAYER 04 · FALL ARREST',
      title: '32% dynamic energy absorption zone',
      copy: 'Calibrated yarn crimp limits first-fall peak impact force to 8.4 kN across single, half, and twin UIAA ratings.',
      impact: '8.4 kN',
      falls: '9',
      weight: '54 g/m',
      diameter: 'Ø 9.0 mm',
      legend: 'ACTIVE: FALL ARREST (8.4 KN CAP)',
    },
  };

  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  const setDrawerOpen = (open) => {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileDrawer.hidden = !open;
  };

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      setDrawerOpen(!expanded);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !mobileDrawer.hidden) {
        setDrawerOpen(false);
        menuToggle.focus();
      }
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });
  }

  const selectLayer = (key) => {
    const info = layers[key] || layers.kern;

    layerBtns.forEach((btn) => {
      const active = btn.dataset.layer === key;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    svgLayers.forEach((group) => {
      group.classList.toggle('is-selected', group.dataset.svgLayer === key);
    });

    if (readoutCode) readoutCode.textContent = info.code;
    if (readoutTitle) readoutTitle.textContent = info.title;
    if (readoutCopy) readoutCopy.textContent = info.copy;
    if (telImpact) telImpact.textContent = info.impact;
    if (telFalls) telFalls.textContent = info.falls;
    if (telWeight) telWeight.textContent = info.weight;
    if (telDiameter) telDiameter.textContent = info.diameter;
    if (diagramActiveLabel) diagramActiveLabel.textContent = info.legend;
  };

  layerBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => selectLayer(btn.dataset.layer || 'kern'));

    btn.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const step = event.key === 'ArrowRight' ? 1 : -1;
      const next = layerBtns[(index + step + layerBtns.length) % layerBtns.length];
      next.focus();
      selectLayer(next.dataset.layer || 'kern');
    });
  });

  svgLayers.forEach((group) => {
    group.addEventListener('click', () => {
      selectLayer(group.dataset.svgLayer || 'kern');
    });

    group.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        selectLayer(group.dataset.svgLayer || 'kern');
      }
    });
  });

  lengthBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const len = btn.dataset.length || '60';
      const weight = btn.dataset.weight || '3.24 kg';
      const price = btn.dataset.price || '$228';

      lengthBtns.forEach((other) => {
        const active = other === btn;
        other.classList.toggle('is-active', active);
        other.setAttribute('aria-checked', String(active));
      });

      if (summaryLength) summaryLength.textContent = `${len} m`;
      if (summaryWeight) summaryWeight.textContent = weight;
      if (summaryPrice) summaryPrice.textContent = price;
      if (batchCoilInput) batchCoilInput.value = `Pitch Nine 9.0 mm · ${len} m`;
    });
  });

  if (orderForm && climberEmail && orderConfirmation && orderConfirmCopy) {
    orderForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = climberEmail.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!valid) {
        if (emailError) emailError.hidden = false;
        climberEmail.focus();
        return;
      }

      if (emailError) emailError.hidden = true;
      const region = regionSelect?.value || 'Cascades / High Sierra';
      const spec = batchCoilInput?.value || 'Pitch Nine 9.0 mm · 60 m';
      orderConfirmCopy.textContent = `Reservation logged for ${email} · ${spec} (${region}).`;
      orderForm.hidden = true;
      orderConfirmation.hidden = false;
    });

    climberEmail.addEventListener('input', () => {
      if (emailError) emailError.hidden = true;
    });
  }

  if (orderResetBtn && orderForm && orderConfirmation) {
    orderResetBtn.addEventListener('click', () => {
      orderConfirmation.hidden = true;
      orderForm.hidden = false;
      orderForm.reset();
      const activeLen = document.querySelector('.length-btn.is-active')?.dataset.length || '60';
      if (batchCoilInput) batchCoilInput.value = `Pitch Nine 9.0 mm · ${activeLen} m`;
      climberEmail?.focus();
    });
  }

  const revealEls = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
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
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  selectLayer('kern');
})();
