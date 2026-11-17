const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
}, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  mobileDrawer.hidden = open;
});

mobileDrawer?.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.hidden = true;
  });
});

// Live Scan Preview toggle
const scanBtn = document.getElementById('live-scan-btn');
const focusEl = document.getElementById('focus-readout');
const loadEl = document.getElementById('load-readout');
let scanTimer = null;

scanBtn?.addEventListener('click', () => {
  const active = scanBtn.getAttribute('aria-pressed') === 'true';
  scanBtn.setAttribute('aria-pressed', String(!active));
  if (!active) {
    let step = 0;
    scanTimer = setInterval(() => {
      step += 1;
      const focusVal = 82 + ((step % 5) - 2);
      const loadVal = 56 + ((step % 7) - 3);
      focusEl.textContent = `${focusVal}%`;
      loadEl.textContent = `${loadVal}%`;
    }, 900);
  } else {
    clearInterval(scanTimer);
    focusEl.textContent = '82%';
    loadEl.textContent = '56%';
  }
});

// Overview telemetry state tabs
const MODES = {
  focus: {
    tag: 'Alpha / Beta Coherence',
    score: '82%',
    desc: 'Sustained prefrontal engagement with low cognitive friction across 45-minute work blocks.',
  },
  recovery: {
    tag: 'Parasympathetic Baseline',
    score: '34%',
    desc: 'Reduced amygdala arousal and steady theta drift indicating rapid post-sprint recovery.',
  },
  flow: {
    tag: 'Frontal-Temporal Sync',
    score: '91%',
    desc: 'Balanced cross-hemisphere coherence during uninterrupted creative problem solving.',
  },
};

document.querySelectorAll('.mode-pill').forEach((btn) => {
  btn.addEventListener('click', () => {
    const mode = MODES[btn.dataset.mode];
    if (!mode) return;
    document.querySelectorAll('.mode-pill').forEach((p) => {
      const sel = p === btn;
      p.classList.toggle('is-active', sel);
      p.setAttribute('aria-selected', String(sel));
    });
    document.getElementById('mode-tag').textContent = mode.tag;
    document.getElementById('mode-score').textContent = mode.score;
    document.getElementById('mode-desc').textContent = mode.desc;
  });
});

// Scroll reveals
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        observer.unobserve(e.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
);
document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Early access form
const visorForm = document.getElementById('visor-form');
const visorDone = document.getElementById('visor-done');
const visorMsg = document.getElementById('visor-done-msg');
const visorReset = document.getElementById('visor-reset');

visorForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('nv-name').value;
  const email = document.getElementById('nv-email').value;
  visorMsg.textContent = `Early visor request queued for ${name} (${email}).`;
  visorForm.hidden = true;
  visorDone.hidden = false;
});

visorReset?.addEventListener('click', () => {
  visorForm.reset();
  visorDone.hidden = true;
  visorForm.hidden = false;
});
