const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');
const dropdownBtn = document.getElementById('tools-dropdown-btn');
const dropdownMenu = document.getElementById('tools-dropdown-menu');

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });

/* Mobile Navigation Drawer */
menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  mobileDrawer.hidden = open;
});

mobileDrawer?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.hidden = true;
  });
});

/* AI Tools Header Dropdown */
function closeDropdown() {
  if (!dropdownBtn || !dropdownMenu) return;
  dropdownBtn.setAttribute('aria-expanded', 'false');
  dropdownMenu.hidden = true;
}

dropdownBtn?.addEventListener('click', (event) => {
  event.stopPropagation();
  const isOpen = dropdownBtn.getAttribute('aria-expanded') === 'true';
  dropdownBtn.setAttribute('aria-expanded', String(!isOpen));
  dropdownMenu.hidden = isOpen;
});

document.addEventListener('click', (event) => {
  if (dropdownMenu && !dropdownMenu.hidden && !event.target.closest('.nav-dropdown')) {
    closeDropdown();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeDropdown();
    if (mobileDrawer && !mobileDrawer.hidden) {
      menuToggle?.setAttribute('aria-expanded', 'false');
      mobileDrawer.hidden = true;
    }
  }
});

/* Hero Arrows Cycle Card Focus */
const deckCols = [...document.querySelectorAll('.deck-col')];
let activeDeckIdx = 1;

function setFocusedDeck(idx) {
  activeDeckIdx = (idx + deckCols.length) % deckCols.length;
  deckCols.forEach((col, i) => {
    col.classList.toggle('is-focused', i === activeDeckIdx);
  });
}

document.getElementById('hero-prev')?.addEventListener('click', () => {
  setFocusedDeck(activeDeckIdx - 1);
});

document.getElementById('hero-next')?.addEventListener('click', () => {
  setFocusedDeck(activeDeckIdx + 1);
});

/* Hero Card 2: Interactive Auto Enhance Curves Toggle */
const enhanceBtn = document.getElementById('auto-enhance-btn');
const enhanceText = document.getElementById('auto-enhance-text');
const curvesBadge = document.getElementById('curves-mode-label');
const curveBlue = document.getElementById('curve-blue');
const curveWarm = document.getElementById('curve-warm');
const curveStem = document.getElementById('curve-stem');
const curveNode = document.getElementById('curve-node');

const CURVE_STATES = {
  base: {
    badge: 'Curves',
    btnText: 'Auto Enhance',
    blue: 'M 8 92 C 50 48, 102 30, 152 62 C 198 92, 246 86, 294 64 C 322 52, 340 74, 352 84',
    warm: 'M 8 68 C 44 108, 86 122, 128 84 C 166 48, 206 106, 250 112 C 290 118, 326 62, 352 94',
    nodeX: '152',
    nodeY: '62',
  },
  enhanced: {
    badge: 'Curves · Auto',
    btnText: 'Enhanced',
    blue: 'M 8 112 C 58 106, 114 78, 168 48 C 216 22, 266 28, 312 42 C 330 48, 342 54, 352 58',
    warm: 'M 8 102 C 52 96, 102 84, 156 56 C 204 32, 258 40, 306 54 C 328 60, 342 64, 352 68',
    nodeX: '168',
    nodeY: '48',
  },
};

enhanceBtn?.addEventListener('click', () => {
  const isActive = enhanceBtn.getAttribute('aria-pressed') === 'true';
  const next = !isActive;
  const state = next ? CURVE_STATES.enhanced : CURVE_STATES.base;

  enhanceBtn.setAttribute('aria-pressed', String(next));
  if (enhanceText) enhanceText.textContent = state.btnText;
  if (curvesBadge) curvesBadge.textContent = state.badge;
  curveBlue?.setAttribute('d', state.blue);
  curveWarm?.setAttribute('d', state.warm);
  curveStem?.setAttribute('x1', state.nodeX);
  curveStem?.setAttribute('x2', state.nodeX);

  curveNode?.querySelectorAll('circle').forEach((circle) => {
    circle.setAttribute('cx', state.nodeX);
    circle.setAttribute('cy', state.nodeY);
  });
});

/* Section 2: Interactive AI Tools Workspace Tabs */
const TOOL_MODES = {
  curves: {
    tag: '01 · Color Engine',
    title: 'Adaptive RGB Curves',
    desc: 'Match camera profiles across daylight, studio tungsten, and night footage using GPU-accelerated spline lifting without clipping highlights.',
    stats: [
      ['1.8 ms', 'Frame LUT latency at 4K'],
      ['12-bit', 'Color pipeline precision'],
      ['99.2%', 'Skin-tone delta preservation'],
    ],
    code: 'PIPE / LUT-CURVES',
    status: 'GPU Active',
    bullets: [
      'Automatic shot-to-shot white balance locking',
      'Highlight roll-off calibrated to Rec.709 and Log-C',
      'Non-destructive keyframe history on every node',
    ],
  },
  cut: {
    tag: '02 · Timeline Assembly',
    title: 'Smart Cut Detection',
    desc: 'Detect dead air, camera resets, and breath pauses across raw multi-cam reels to produce frame-accurate assembly cuts in one pass.',
    stats: [
      ['3x', 'Faster rough-cut assembly'],
      ['87%', 'Silence and pause trims automated'],
      ['24 ms', 'Scene boundary detection step'],
    ],
    code: 'PIPE / SMART-CUT',
    status: 'Model Ready',
    bullets: [
      'Preserves intentional dramatic beats with threshold sliders',
      'Keeps A-roll and B-roll audio sync locked to frame boundaries',
      'Exports clean EDL and XML timelines to external NLEs',
    ],
  },
  voice: {
    tag: '03 · Audio Mastering',
    title: 'Voice Sync and Stems',
    desc: 'Separate dialogue from ambient room tone, duck background stems automatically under speech, and align lip movement to dubbed tracks.',
    stats: [
      ['-24 LUFS', 'Broadcast loudness target lock'],
      ['16 stems', 'Concurrent track isolation'],
      ['<12 ms', 'Phoneme-to-frame sync drift'],
    ],
    code: 'PIPE / VOICE-SYNC',
    status: '48 kHz Lock',
    bullets: [
      'Instant noise floor reduction without metallic artifacts',
      'Automatic music bed ducking keyed to vocal transients',
      'Timecode-stamped caption generation synced per word',
    ],
  },
};

function selectWorkspaceTool(toolKey) {
  const mode = TOOL_MODES[toolKey];
  if (!mode) return;

  document.querySelectorAll('.tool-tab').forEach((tab) => {
    const selected = tab.dataset.tool === toolKey;
    tab.classList.toggle('is-active', selected);
    tab.setAttribute('aria-selected', String(selected));
  });

  document.getElementById('ws-tag').textContent = mode.tag;
  document.getElementById('ws-title').textContent = mode.title;
  document.getElementById('ws-desc').textContent = mode.desc;
  document.getElementById('ws-code').textContent = mode.code;
  document.getElementById('ws-status').textContent = mode.status;

  mode.stats.forEach(([val, lbl], index) => {
    const idx = index + 1;
    const valEl = document.getElementById(`ws-stat-${idx}`);
    const lblEl = document.getElementById(`ws-lbl-${idx}`);
    if (valEl) valEl.textContent = val;
    if (lblEl) lblEl.textContent = lbl;
  });

  const listEl = document.getElementById('ws-list');
  if (listEl) {
    listEl.replaceChildren(
      ...mode.bullets.map((text) => {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
      })
    );
  }
}

document.querySelectorAll('.tool-tab').forEach((tab) => {
  tab.addEventListener('click', () => {
    selectWorkspaceTool(tab.dataset.tool);
  });
});

document.querySelectorAll('[data-tool-target]').forEach((link) => {
  link.addEventListener('click', () => {
    selectWorkspaceTool(link.dataset.toolTarget);
    closeDropdown();
  });
});

/* Section 4: Signup / Sign-in Toggle + Form Confirmation */
const form = document.getElementById('flux-form');
const doneBox = document.getElementById('flux-done');
const doneMsg = document.getElementById('flux-done-msg');
const modeSignupBtn = document.getElementById('mode-signup');
const modeSigninBtn = document.getElementById('mode-signin');
const nameGroup = document.getElementById('name-field-group');
const nameInput = document.getElementById('flux-name');
const emailInput = document.getElementById('flux-email');
const submitBtn = document.getElementById('flux-submit-btn');

let authMode = 'signup';
let selectedPlan = 'Starter';

function setAuthMode(mode) {
  authMode = mode;
  const isSignup = mode === 'signup';
  modeSignupBtn?.classList.toggle('is-active', isSignup);
  modeSigninBtn?.classList.toggle('is-active', !isSignup);
  if (nameGroup) nameGroup.hidden = !isSignup;
  if (nameInput) nameInput.required = isSignup;
  if (submitBtn) submitBtn.textContent = isSignup ? 'Get Started Free' : 'Sign In to Workspace';
}

modeSignupBtn?.addEventListener('click', () => setAuthMode('signup'));
modeSigninBtn?.addEventListener('click', () => setAuthMode('signin'));

document.querySelectorAll('[data-auth-mode]').forEach((link) => {
  link.addEventListener('click', () => {
    setAuthMode(link.dataset.authMode === 'signin' ? 'signin' : 'signup');
  });
});

document.querySelectorAll('[data-plan]').forEach((btn) => {
  btn.addEventListener('click', () => {
    selectedPlan = btn.dataset.plan || 'Starter';
    setAuthMode('signup');
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = emailInput?.value.trim() || '';
  const name = nameInput?.value.trim() || '';

  if (authMode === 'signin') {
    doneMsg.textContent = `Workspace sign-in link sent to ${email}.`;
  } else {
    doneMsg.textContent = `${selectedPlan} workspace provisioned for ${name} (${email}).`;
  }

  form.hidden = true;
  doneBox.hidden = false;
});

document.getElementById('flux-reset')?.addEventListener('click', () => {
  form?.reset();
  doneBox.hidden = true;
  form.hidden = false;
  setAuthMode('signup');
});

/* Scroll Reveals */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

requestAnimationFrame(() => {
  document.querySelectorAll('.reveal').forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      el.classList.add('is-visible');
      revealObserver.unobserve(el);
    }
  });
});
