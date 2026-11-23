const TAPES = [
  { night: 1, week: 1, title: 'The Texas Chain Saw Massacre', year: 1974, director: 'Tobe Hooper', format: '35MM', runtime: 83 },
  { night: 2, week: 1, title: 'Suspiria', year: 1977, director: 'Dario Argento', format: '35MM', runtime: 98 },
  { night: 3, week: 1, title: 'Videodrome', year: 1983, director: 'David Cronenberg', format: 'VHS', runtime: 87 },
  { night: 4, week: 1, title: 'The Thing', year: 1982, director: 'John Carpenter', format: '35MM', runtime: 109 },
  { night: 5, week: 1, title: 'Possession', year: 1981, director: 'Andrzej Zulawski', format: '35MM', runtime: 124 },
  { night: 6, week: 1, title: 'Re-Animator', year: 1985, director: 'Stuart Gordon', format: 'VHS', runtime: 86 },
  { night: 7, week: 1, title: 'Evil Dead II', year: 1987, director: 'Sam Raimi', format: 'VHS', runtime: 84 },
  { night: 8, week: 1, title: 'Cure', year: 1997, director: 'Kiyoshi Kurosawa', format: '35MM', runtime: 111 },
  { night: 9, week: 2, title: 'Ringu', year: 1998, director: 'Hideo Nakata', format: 'VHS', runtime: 96 },
  { night: 10, week: 2, title: 'The Blair Witch Project', year: 1999, director: 'Myrick & Sanchez', format: 'VHS', runtime: 81 },
  { night: 11, week: 2, title: 'A Nightmare on Elm Street', year: 1984, director: 'Wes Craven', format: '35MM', runtime: 91 },
  { night: 12, week: 2, title: 'Phantasm', year: 1979, director: 'Don Coscarelli', format: 'VHS', runtime: 89 },
  { night: 13, week: 2, title: 'Friday the 13th Part VI', year: 1986, director: 'Tom McLoughlin', format: 'VHS', runtime: 86 },
  { night: 14, week: 2, title: 'Carrie', year: 1976, director: 'Brian De Palma', format: '35MM', runtime: 98 },
  { night: 15, week: 2, title: 'An American Werewolf in London', year: 1981, director: 'John Landis', format: '35MM', runtime: 97 },
  { night: 16, week: 2, title: 'The Fly', year: 1986, director: 'David Cronenberg', format: '35MM', runtime: 96 },
  { night: 17, week: 3, title: 'Fright Night', year: 1985, director: 'Tom Holland', format: 'VHS', runtime: 106 },
  { night: 18, week: 3, title: 'Dawn of the Dead', year: 1978, director: 'George A. Romero', format: '35MM', runtime: 127 },
  { night: 19, week: 3, title: 'Poltergeist', year: 1982, director: 'Tobe Hooper', format: '35MM', runtime: 114 },
  { night: 20, week: 3, title: 'Audition', year: 1999, director: 'Takashi Miike', format: '35MM', runtime: 115 },
  { night: 21, week: 3, title: 'The Fog', year: 1980, director: 'John Carpenter', format: '35MM', runtime: 89 },
  { night: 22, week: 3, title: 'Tenebrae', year: 1982, director: 'Dario Argento', format: '35MM', runtime: 101 },
  { night: 23, week: 3, title: 'Hellraiser', year: 1987, director: 'Clive Barker', format: 'VHS', runtime: 94 },
  { night: 24, week: 3, title: 'Candyman', year: 1992, director: 'Bernard Rose', format: '35MM', runtime: 99 },
  { night: 25, week: 4, title: 'The Return of the Living Dead', year: 1985, director: 'Dan O’Bannon', format: 'VHS', runtime: 91 },
  { night: 26, week: 4, title: 'Prince of Darkness', year: 1987, director: 'John Carpenter', format: '35MM', runtime: 102 },
  { night: 27, week: 4, title: 'Eyes Without a Face', year: 1960, director: 'Georges Franju', format: '35MM', runtime: 90 },
  { night: 28, week: 4, title: 'Hausu', year: 1977, director: 'Nobuhiko Obayashi', format: '35MM', runtime: 88 },
  { night: 29, week: 4, title: 'Rosemary’s Baby', year: 1968, director: 'Roman Polanski', format: '35MM', runtime: 137 },
  { night: 30, week: 4, title: 'The Shining', year: 1980, director: 'Stanley Kubrick', format: '35MM', runtime: 146 },
  { night: 31, week: 4, title: 'Halloween', year: 1978, director: 'John Carpenter', format: '35MM', runtime: 91 },
];

const FEATURED_REELS = [
  { night: 4, label: 'REEL 01', note: 'Antarctic research station 35mm safety print.' },
  { night: 3, label: 'REEL 02', note: 'First-generation Betamax and S-VHS broadcast transfer.' },
  { night: 9, label: 'REEL 03', note: 'Unmarked rental cassette with manual tracking lock.' },
  { night: 2, label: 'REEL 04', note: 'Technicolor dye-transfer 35mm theatrical reel.' },
  { night: 31, label: 'REEL 05', note: 'October closing marathon headliner in Projection Room 04.' },
];

const state = {
  activeWeek: '1',
  cuedNight: 31,
  activeReelIndex: 0,
  trailerPlaying: true,
  timecodeFrames: 114,
  audioEnabled: false,
  confirmed: false,
};

let audioCtx = null;
let droneGain = null;
let timecodeTimer = null;
let lastFocusedElement = null;

function pad2(num) {
  return String(num).padStart(2, '0');
}

function getTape(night) {
  return TAPES.find((t) => t.night === Number(night)) || TAPES[TAPES.length - 1];
}

function initHeaderScroll() {
  const header = document.getElementById('site-header');
  const onScroll = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initRevealObserver() {
  const nodes = document.querySelectorAll('.reveal');
  const vh = window.innerHeight || 900;
  nodes.forEach((el) => {
    if (el.getBoundingClientRect().top < vh * 0.92) {
      el.classList.add('is-visible');
    }
  });

  if (!('IntersectionObserver' in window)) {
    nodes.forEach((el) => el.classList.add('is-visible'));
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

  nodes.forEach((el) => {
    if (!el.classList.contains('is-visible')) observer.observe(el);
  });
}

function renderCuedDeck() {
  const tape = getTape(state.cuedNight);
  const nightLabel = `NIGHT ${pad2(tape.night)} · OCT ${pad2(tape.night)}`;
  document.getElementById('cued-night').textContent = nightLabel;
  document.getElementById('cued-title').textContent = `${tape.title} (${tape.year})`;
  document.getElementById('cued-details').textContent =
    `Dir. ${tape.director} · ${tape.format} Print · ${tape.runtime} min · Reel 04-${pad2(tape.night)}`;

  const reserveSelect = document.getElementById('rsvp-night');
  if (reserveSelect && !reserveSelect.disabled) {
    reserveSelect.value = String(tape.night);
    syncTicketPreview();
  }
}

function renderLedger() {
  const container = document.getElementById('tape-ledger');
  const visibleTapes =
    state.activeWeek === 'all'
      ? TAPES
      : TAPES.filter((t) => String(t.week) === state.activeWeek);

  document.getElementById('week-count').textContent =
    `Showing ${pad2(visibleTapes.length)} of 31 tapes`;

  container.innerHTML = visibleTapes
    .map((tape) => {
      const isCued = tape.night === state.cuedNight;
      return `
        <button
          type="button"
          class="tape-row${isCued ? ' is-cued' : ''}"
          data-night="${tape.night}"
          aria-pressed="${isCued ? 'true' : 'false'}"
        >
          <span class="tape-night">OCT ${pad2(tape.night)}</span>
          <span class="tape-title">${tape.title} (${tape.year})</span>
          <span class="tape-director">${tape.director}</span>
          <span class="tape-format">${tape.format}</span>
          <span class="tape-runtime">${tape.runtime} MIN</span>
          <span class="tape-cue-label">${isCued ? 'CUED' : 'CUE TAPE'}</span>
        </button>
      `;
    })
    .join('');

  container.querySelectorAll('.tape-row').forEach((row) => {
    row.addEventListener('click', () => {
      state.cuedNight = Number(row.dataset.night);
      renderCuedDeck();
      renderLedger();
    });
  });
}

function initWeekTabs() {
  const tabs = document.querySelectorAll('.week-tab');
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      state.activeWeek = tab.dataset.week;
      tabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', active ? 'true' : 'false');
      });
      renderLedger();
    });
  });
}

function initHeroRail() {
  const buttons = document.querySelectorAll('.rail-item');
  const readout = document.getElementById('rail-cue-readout');

  const updateRail = (idx) => {
    state.activeReelIndex = idx;
    const reel = FEATURED_REELS[idx];
    const tape = getTape(reel.night);
    buttons.forEach((btn, i) => {
      const active = i === idx;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
    });
    readout.textContent = `${reel.label} · OCT ${pad2(tape.night)} · ${tape.title.toUpperCase()} (${tape.year})`;
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.reelIndex);
      updateRail(idx);
      const reel = FEATURED_REELS[idx];
      state.cuedNight = reel.night;
      renderCuedDeck();
      renderLedger();
    });
  });
}

function toggleAmbientAudio() {
  const btn = document.getElementById('audio-toggle');
  const status = document.getElementById('audio-status');
  const nextState = !state.audioEnabled;
  state.audioEnabled = nextState;
  btn.setAttribute('aria-pressed', nextState ? 'true' : 'false');
  status.textContent = nextState ? 'HUM ON' : 'HUM OFF';

  try {
    if (nextState) {
      if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
        const osc = audioCtx.createOscillator();
        const filter = audioCtx.createBiquadFilter();
        droneGain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.value = 55;
        filter.type = 'lowpass';
        filter.frequency.value = 140;
        droneGain.gain.value = 0.035;
        osc.connect(filter);
        filter.connect(droneGain);
        droneGain.connect(audioCtx.destination);
        osc.start();
      } else if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      if (droneGain) droneGain.gain.setTargetAtTime(0.035, audioCtx.currentTime, 0.12);
    } else if (audioCtx && droneGain) {
      droneGain.gain.setTargetAtTime(0.0001, audioCtx.currentTime, 0.12);
    }
  } catch {
    // Web Audio unavailable in restricted headless context
  }
}

function formatTimecode(totalFrames) {
  const frames = totalFrames % 24;
  const totalSeconds = Math.floor(totalFrames / 24);
  const secs = totalSeconds % 60;
  const mins = Math.floor(totalSeconds / 60) % 60;
  return `00:${pad2(mins)}:${pad2(secs)}:${pad2(frames)}`;
}

function renderTrailerModalReel() {
  const reel = FEATURED_REELS[state.activeReelIndex];
  const tape = getTape(reel.night);
  document.getElementById('modal-reel-tag').textContent =
    `${reel.label} · OCT ${pad2(tape.night)} · ${tape.format}`;
  document.getElementById('modal-film-title').textContent =
    `${tape.title} (${tape.year})`;
  document.getElementById('modal-film-note').textContent =
    `Dir. ${tape.director} · ${tape.runtime} min · ${reel.note}`;
  document.getElementById('modal-timecode').textContent =
    formatTimecode(state.timecodeFrames);

  const monitor = document.getElementById('crt-monitor');
  const playBtn = document.getElementById('modal-play-toggle');
  const counter = document.getElementById('modal-counter');
  monitor.classList.toggle('is-paused', !state.trailerPlaying);
  playBtn.setAttribute('aria-pressed', state.trailerPlaying ? 'true' : 'false');
  playBtn.textContent = state.trailerPlaying ? 'Pause Tape' : 'Play Tape';
  counter.textContent = state.trailerPlaying
    ? 'TRACKING: +0.02 dB · PLAYING'
    : 'TRACKING: LOCKED · PAUSED';
}

function openTrailerModal(customNight) {
  const modal = document.getElementById('trailer-modal');
  lastFocusedElement = document.activeElement;

  if (customNight) {
    const matchIndex = FEATURED_REELS.findIndex((r) => r.night === customNight);
    if (matchIndex >= 0) {
      state.activeReelIndex = matchIndex;
    } else {
      const tape = getTape(customNight);
      document.getElementById('modal-reel-tag').textContent =
        `DECK CUE · OCT ${pad2(tape.night)} · ${tape.format}`;
      document.getElementById('modal-film-title').textContent =
        `${tape.title} (${tape.year})`;
      document.getElementById('modal-film-note').textContent =
        `Dir. ${tape.director} · ${tape.runtime} min · Screened in Projection Room 04.`;
    }
  }

  if (!customNight || FEATURED_REELS.some((r) => r.night === customNight)) {
    renderTrailerModalReel();
  }

  state.trailerPlaying = true;
  modal.hidden = false;
  document.body.style.overflow = 'hidden';
  document.querySelector('.trailer-dialog').focus();

  clearInterval(timecodeTimer);
  timecodeTimer = setInterval(() => {
    if (!state.trailerPlaying) return;
    state.timecodeFrames += 3;
    document.getElementById('modal-timecode').textContent =
      formatTimecode(state.timecodeFrames);
  }, 125);
}

function closeTrailerModal() {
  const modal = document.getElementById('trailer-modal');
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = '';
  clearInterval(timecodeTimer);
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

function initTrailerModal() {
  document.querySelectorAll('[data-open-trailer]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const mobileDrawer = document.getElementById('mobile-drawer');
      if (!mobileDrawer.hidden) closeMobileDrawer();
      openTrailerModal();
    });
  });

  document.getElementById('cued-preview-btn').addEventListener('click', () => {
    openTrailerModal(state.cuedNight);
  });

  document.getElementById('modal-close').addEventListener('click', closeTrailerModal);
  document.getElementById('trailer-backdrop').addEventListener('click', closeTrailerModal);

  document.getElementById('modal-prev-btn').addEventListener('click', () => {
    state.activeReelIndex = (state.activeReelIndex - 1 + FEATURED_REELS.length) % FEATURED_REELS.length;
    renderTrailerModalReel();
  });

  document.getElementById('modal-next-btn').addEventListener('click', () => {
    state.activeReelIndex = (state.activeReelIndex + 1) % FEATURED_REELS.length;
    renderTrailerModalReel();
  });

  document.getElementById('modal-play-toggle').addEventListener('click', () => {
    state.trailerPlaying = !state.trailerPlaying;
    renderTrailerModalReel();
  });

  document.getElementById('modal-reserve-btn').addEventListener('click', () => {
    const reel = FEATURED_REELS[state.activeReelIndex];
    state.cuedNight = reel.night;
    renderCuedDeck();
    renderLedger();
    closeTrailerModal();
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape') {
      closeTrailerModal();
      closeMobileDrawer();
    }
  });
}

function openMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  const toggle = document.getElementById('menu-toggle');
  lastFocusedElement = document.activeElement;
  drawer.hidden = false;
  toggle.setAttribute('aria-expanded', 'true');
  document.body.style.overflow = 'hidden';
  document.getElementById('drawer-close').focus();
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer.hidden) return;
  const toggle = document.getElementById('menu-toggle');
  drawer.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

function initMobileDrawer() {
  document.getElementById('menu-toggle').addEventListener('click', openMobileDrawer);
  document.getElementById('drawer-close').addEventListener('click', closeMobileDrawer);
  document.querySelectorAll('.mobile-nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });
}

function populateNightSelect() {
  const select = document.getElementById('rsvp-night');
  select.innerHTML = TAPES.map(
    (t) => `<option value="${t.night}">Oct ${pad2(t.night)} — ${t.title} (${t.year})</option>`
  ).join('');
  select.value = String(state.cuedNight);
}

function syncTicketPreview() {
  if (state.confirmed) return;
  const form = document.getElementById('rsvp-form');
  const passType = form.passType.value;
  const nightSelect = document.getElementById('rsvp-night');
  const nameInput = document.getElementById('rsvp-name');
  const seatSelect = document.getElementById('rsvp-seat');

  if (passType === 'october') {
    nightSelect.disabled = true;
    document.getElementById('ticket-feature').textContent = 'All 31 Nights (Oct 01–31)';
    document.getElementById('ticket-admission').textContent = 'Full October Pass · $180';
  } else {
    nightSelect.disabled = false;
    const tape = getTape(nightSelect.value);
    document.getElementById('ticket-feature').textContent =
      `Oct ${pad2(tape.night)} — ${tape.title} (${tape.year})`;
    document.getElementById('ticket-admission').textContent = 'Single Night · $14';
  }

  document.getElementById('ticket-guest').textContent =
    nameInput.value.trim() || 'Unassigned';
  document.getElementById('ticket-section').textContent = seatSelect.value;
}

function initRsvpForm() {
  populateNightSelect();
  const form = document.getElementById('rsvp-form');
  const nameInput = document.getElementById('rsvp-name');
  const emailInput = document.getElementById('rsvp-email');
  const errorName = document.getElementById('error-name');
  const errorEmail = document.getElementById('error-email');
  const ticket = document.getElementById('vhs-ticket');
  const statusEl = document.getElementById('ticket-status');
  const serialEl = document.getElementById('ticket-serial');
  const confirmedBox = document.getElementById('ticket-confirmed-actions');
  const confirmedMsg = document.getElementById('confirmed-msg');

  form.addEventListener('input', syncTicketPreview);
  form.addEventListener('change', syncTicketPreview);

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    let valid = true;

    const cleanName = nameInput.value.trim();
    const cleanEmail = emailInput.value.trim();

    if (cleanName.length < 2) {
      errorName.textContent = 'Enter a guest name for the lobby list.';
      nameInput.setAttribute('aria-invalid', 'true');
      valid = false;
    } else {
      errorName.textContent = '';
      nameInput.removeAttribute('aria-invalid');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail)) {
      errorEmail.textContent = 'Enter a valid email address for confirmation.';
      emailInput.setAttribute('aria-invalid', 'true');
      valid = false;
    } else {
      errorEmail.textContent = '';
      emailInput.removeAttribute('aria-invalid');
    }

    if (!valid) return;

    state.confirmed = true;
    const passType = form.passType.value;
    const nightCode = passType === 'october' ? '31' : pad2(document.getElementById('rsvp-night').value);
    const serialNum = `NO. 31-${nightCode}04`;

    ticket.classList.add('is-confirmed');
    statusEl.textContent = 'CONFIRMED';
    serialEl.textContent = serialNum;
    document.getElementById('ticket-guest').textContent = cleanName;
    confirmedMsg.textContent = `Stub ${serialNum} held for ${cleanName} at Projection Room 04.`;
    confirmedBox.hidden = false;
  });

  document.getElementById('reset-rsvp-btn').addEventListener('click', () => {
    state.confirmed = false;
    form.reset();
    document.getElementById('rsvp-night').value = String(state.cuedNight);
    document.getElementById('rsvp-night').disabled = false;
    errorName.textContent = '';
    errorEmail.textContent = '';
    nameInput.removeAttribute('aria-invalid');
    emailInput.removeAttribute('aria-invalid');
    ticket.classList.remove('is-confirmed');
    statusEl.textContent = 'DRAFT STUB';
    serialEl.textContent = 'NO. 31-0031';
    confirmedBox.hidden = true;
    syncTicketPreview();
  });

  syncTicketPreview();
}

document.addEventListener('DOMContentLoaded', () => {
  initHeaderScroll();
  initRevealObserver();
  initHeroRail();
  initWeekTabs();
  renderCuedDeck();
  renderLedger();
  initTrailerModal();
  initMobileDrawer();
  initRsvpForm();
  document.getElementById('audio-toggle').addEventListener('click', toggleAmbientAudio);
});
