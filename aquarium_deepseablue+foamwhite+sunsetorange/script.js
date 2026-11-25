(() => {
  'use strict';

  /* --- Mobile / Quick Drawer --- */
  const menuToggle = document.getElementById('menu-toggle');
  const navDrawer = document.getElementById('nav-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerLinks = navDrawer ? navDrawer.querySelectorAll('a') : [];

  function setDrawerState(isOpen) {
    if (!navDrawer || !menuToggle || !drawerBackdrop) return;
    navDrawer.classList.toggle('is-open', isOpen);
    navDrawer.setAttribute('aria-hidden', String(!isOpen));
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    drawerBackdrop.hidden = !isOpen;
    if (isOpen && drawerClose) {
      drawerClose.focus();
    } else if (!isOpen) {
      menuToggle.focus();
    }
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      setDrawerState(!expanded);
    });
  }
  if (drawerClose) {
    drawerClose.addEventListener('click', () => setDrawerState(false));
  }
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', () => setDrawerState(false));
  }
  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => setDrawerState(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navDrawer && navDrawer.classList.contains('is-open')) {
      setDrawerState(false);
    }
  });

  /* --- Hero: Depth & Spectrum Lighting Toggle --- */
  const DEPTH_MODES = {
    surface: '6 m · 180 lux',
    twilight: '14 m · 42 lux',
    abyss: '28 m · 4 lux',
  };
  const heroEl = document.getElementById('top');
  const depthButtons = document.querySelectorAll('.depth-btn');
  const depthReadout = document.getElementById('depth-readout');

  depthButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.depth;
      if (!mode || !DEPTH_MODES[mode]) return;

      if (heroEl) heroEl.dataset.depth = mode;
      if (depthReadout) depthReadout.textContent = DEPTH_MODES[mode];

      depthButtons.forEach((item) => {
        const active = item === btn;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-pressed', String(active));
      });
    });
  });

  /* --- Hero: Hydrophone Feed (Web Audio API Ambient Drone) --- */
  const hydrophoneBtn = document.getElementById('hydrophone-toggle');
  const hydrophoneLabel = hydrophoneBtn ? hydrophoneBtn.querySelector('.hydrophone-label') : null;
  let audioCtx = null;
  let hydrophoneNodes = null;
  let hydrophonePlaying = false;

  function createPinkNoiseBuffer(ctx, seconds = 3) {
    const length = Math.floor(ctx.sampleRate * seconds);
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0;
    let b1 = 0;
    let b2 = 0;
    let b3 = 0;
    let b4 = 0;
    let b5 = 0;
    let b6 = 0;

    for (let i = 0; i < length; i += 1) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  function updateHydrophoneUI(isPlaying) {
    if (!hydrophoneBtn) return;
    hydrophoneBtn.setAttribute('aria-pressed', String(isPlaying));
    hydrophoneBtn.setAttribute(
      'aria-label',
      isPlaying ? 'Hydrophone Feed: Mute' : 'Hydrophone Feed: Play Drift'
    );
    if (hydrophoneLabel) {
      hydrophoneLabel.textContent = isPlaying ? 'Hydrophone: Mute' : 'Hydrophone: Play Drift';
    }
  }

  function stopHydrophone() {
    if (!hydrophonePlaying && !audioCtx) return;
    hydrophonePlaying = false;
    updateHydrophoneUI(false);

    if (hydrophoneNodes && audioCtx) {
      const { masterGain, oscA, oscB, noiseSrc } = hydrophoneNodes;
      const now = audioCtx.currentTime;
      try {
        masterGain.gain.cancelScheduledValues(now);
        masterGain.gain.setValueAtTime(masterGain.gain.value, now);
        masterGain.gain.linearRampToValueAtTime(0.0001, now + 0.12);
        oscA.stop(now + 0.14);
        oscB.stop(now + 0.14);
        noiseSrc.stop(now + 0.14);
      } catch {
        // Ignore already-stopped nodes on unload
      }
      hydrophoneNodes = null;
    }

    if (audioCtx) {
      const ctxToClose = audioCtx;
      audioCtx = null;
      setTimeout(() => {
        if (ctxToClose.state !== 'closed') {
          ctxToClose.close().catch(() => {});
        }
      }, 160);
    }
  }

  function startHydrophone() {
    const AudioContextCtor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextCtor) return;

    audioCtx = new AudioContextCtor();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }

    const masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.0001, audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.14, audioCtx.currentTime + 0.4);
    masterGain.connect(audioCtx.destination);

    const droneFilter = audioCtx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(180, audioCtx.currentTime);
    droneFilter.Q.setValueAtTime(0.8, audioCtx.currentTime);
    droneFilter.connect(masterGain);

    const oscA = audioCtx.createOscillator();
    oscA.type = 'sine';
    oscA.frequency.setValueAtTime(55, audioCtx.currentTime);
    const gainA = audioCtx.createGain();
    gainA.gain.setValueAtTime(0.22, audioCtx.currentTime);
    oscA.connect(gainA).connect(droneFilter);
  };

  const sessionTabs = document.querySelectorAll('.session-tab');
  const sessionPanel = document.getElementById('session-panel');
  const sessionWindowEl = document.getElementById('session-window');
  const sessionNameEl = document.getElementById('session-name');
  const sessionDescEl = document.getElementById('session-desc');
  const specLightingEl = document.getElementById('spec-lighting');
  const specHydrophoneEl = document.getElementById('spec-hydrophone');
  const specMemberEl = document.getElementById('spec-member');
  const specCapacityEl = document.getElementById('spec-capacity');
  const sessionReserveBtn = document.getElementById('session-reserve-btn');
  const entryWindowSelect = document.getElementById('entry-window');

  sessionTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.session;
      const data = SESSIONS[key];
      if (!data) return;

      sessionTabs.forEach((item) => {
        const active = item === tab;
        item.classList.toggle('is-active', active);
        item.setAttribute('aria-selected', String(active));
      });

      if (sessionPanel) {
        sessionPanel.setAttribute('aria-labelledby', tab.id);
      }
      if (sessionWindowEl) sessionWindowEl.textContent = data.window;
      if (sessionNameEl) sessionNameEl.textContent = data.name;
      if (sessionDescEl) sessionDescEl.textContent = data.desc;
      if (specLightingEl) specLightingEl.textContent = data.lighting;
      if (specHydrophoneEl) specHydrophoneEl.textContent = data.hydrophone;
      if (specMemberEl) specMemberEl.textContent = data.member;
      if (specCapacityEl) specCapacityEl.textContent = data.capacity;
      if (sessionReserveBtn) {
        sessionReserveBtn.dataset.window = data.bookingWindow;
        sessionReserveBtn.innerHTML = `Select ${data.bookingWindow.split(' ')[0]} Window <span aria-hidden="true">→</span>`;
      }
    });
  });

  if (sessionReserveBtn && entryWindowSelect) {
    sessionReserveBtn.addEventListener('click', () => {
      const selectedWindow = sessionReserveBtn.dataset.window;
      if (selectedWindow) {
        entryWindowSelect.value = selectedWindow;
      }
      if (counts.night === 0) {
        counts.night = 1;
        updateTotals();
      }
      const visitSection = document.getElementById('visit');
      if (visitSection) {
        visitSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  /* --- Chapter 3: Timed Entry Ticket Reservation --- */
  const PRICES = { adult: 28, child: 18, night: 36 };
  const counts = { adult: 2, child: 0, night: 0 };

  const visitDateInput = document.getElementById('visit-date');
  const visitorNameInput = document.getElementById('visitor-name');
  const liveTotalEl = document.getElementById('live-total');
  const previewPassSummary = document.getElementById('preview-pass-summary');
  const formError = document.getElementById('form-error');
  const bookingForm = document.getElementById('booking-form');

  const receiptPlaceholder = document.getElementById('receipt-placeholder');
  const receiptConfirmed = document.getElementById('receipt-confirmed');
  const confirmedCode = document.getElementById('confirmed-code');
  const confirmedName = document.getElementById('confirmed-name');
  const confirmedDate = document.getElementById('confirmed-date');
  const confirmedWindow = document.getElementById('confirmed-window');
  const confirmedPasses = document.getElementById('confirmed-passes');
  const confirmedTotal = document.getElementById('confirmed-total');
  const resetBookingBtn = document.getElementById('reset-booking-btn');

  if (visitDateInput && !visitDateInput.value) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    visitDateInput.value = tomorrow.toISOString().split('T')[0];
  }

  function formatPassSummary() {
    const parts = [];
    if (counts.adult > 0) parts.push(`${counts.adult} Adult`);
    if (counts.child > 0) parts.push(`${counts.child} Child`);
    if (counts.night > 0) parts.push(`${counts.night} Night Opening`);
    return parts.length ? parts.join(', ') : '0 Passes';
  }

  function calculateTotal() {
    return (
      counts.adult * PRICES.adult +
      counts.child * PRICES.child +
      counts.night * PRICES.night
    );
  }

  function updateTotals() {
    const adultEl = document.getElementById('count-adult');
    const childEl = document.getElementById('count-child');
    const nightEl = document.getElementById('count-night');
    if (adultEl) adultEl.textContent = String(counts.adult);
    if (childEl) childEl.textContent = String(counts.child);
    if (nightEl) nightEl.textContent = String(counts.night);

    const total = calculateTotal();
    if (liveTotalEl) liveTotalEl.textContent = `$${total.toFixed(2)}`;
    if (previewPassSummary) {
      previewPassSummary.textContent = `${formatPassSummary()} ($${total.toFixed(2)})`;
    }
  }

  document.querySelectorAll('.stepper-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const passType = btn.dataset.pass;
      const delta = Number(btn.dataset.delta);
      if (!(passType in counts) || Number.isNaN(delta)) return;
      counts[passType] = Math.max(0, Math.min(12, counts[passType] + delta));
      if (formError) formError.hidden = true;
      updateTotals();
    });
  });

  if (bookingForm) {
    bookingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const totalPasses = counts.adult + counts.child + counts.night;
      const guestName = visitorNameInput ? visitorNameInput.value.trim() : '';
      const visitDate = visitDateInput ? visitDateInput.value : '';

      if (totalPasses === 0) {
        if (formError) {
          formError.textContent = 'Select at least one pass before confirming timed entry.';
          formError.hidden = false;
        }
        return;
      }

      if (!visitDate || !guestName) {
        if (formError) {
          formError.textContent = 'Enter a visit date and reservation name for pier check-in.';
          formError.hidden = false;
        }
        return;
      }

      if (formError) formError.hidden = true;

      const randomCode = Math.floor(1000 + Math.random() * 9000);
      const total = calculateTotal();

      if (confirmedCode) confirmedCode.textContent = `LMN-2026-${randomCode}`;
      if (confirmedName) confirmedName.textContent = guestName;
      if (confirmedDate) confirmedDate.textContent = visitDate;
      if (confirmedWindow && entryWindowSelect) {
        confirmedWindow.textContent = entryWindowSelect.value;
      }
      if (confirmedPasses) confirmedPasses.textContent = formatPassSummary();
      if (confirmedTotal) confirmedTotal.textContent = `$${total.toFixed(2)}`;

      if (receiptPlaceholder) receiptPlaceholder.hidden = true;
      if (receiptConfirmed) receiptConfirmed.hidden = false;
    });
  }

  if (resetBookingBtn) {
    resetBookingBtn.addEventListener('click', () => {
      if (receiptConfirmed) receiptConfirmed.hidden = true;
      if (receiptPlaceholder) receiptPlaceholder.hidden = false;
    });
  }

  updateTotals();
})();