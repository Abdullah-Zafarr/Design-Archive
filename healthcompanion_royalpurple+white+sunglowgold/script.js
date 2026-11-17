const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
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

// Selectable schedule day cards
document.querySelectorAll('.session-box').forEach((box) => {
  box.addEventListener('click', () => {
    document.querySelectorAll('.session-box').forEach((b) => b.classList.remove('is-selected'));
    box.classList.add('is-selected');
  });
});

// Module tabs
const MODULES = {
  workouts: {
    tag: 'Weekly Load Target',
    metric: '4 sessions · 6.5 hrs',
    desc: 'Adaptive session pacing adjusts your Monday and Thursday blocks based on sleep score and heart-rate drift.',
  },
  nutrition: {
    tag: 'Daily Fuel Window',
    metric: '2,480 kcal · 155g protein',
    desc: 'Pre-training carbohydrate timing and hydration cues aligned directly to session intensity.',
  },
  recovery: {
    tag: 'Readiness Index',
    metric: '88 / 100 readiness',
    desc: 'Overnight HRV and resting pulse tracking flag when to swap high-output intervals for mobility.',
  },
};

document.querySelectorAll('.tab-pill').forEach((tab) => {
  tab.addEventListener('click', () => {
    const m = MODULES[tab.dataset.tab];
    if (!m) return;
    document.querySelectorAll('.tab-pill').forEach((t) => {
      const sel = t === tab;
      t.classList.toggle('is-active', sel);
      t.setAttribute('aria-selected', String(sel));
    });
    document.getElementById('comp-tag').textContent = m.tag;
    document.getElementById('comp-metric').textContent = m.metric;
    document.getElementById('comp-desc').textContent = m.desc;
  });
});

// Signup form
const form = document.getElementById('pelma-form');
const done = document.getElementById('pm-done');
const msg = document.getElementById('pm-done-msg');
document.getElementById('pm-reset')?.addEventListener('click', () => {
  form.reset();
  done.hidden = true;
  form.hidden = false;
});
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const n = document.getElementById('pm-name').value;
  const em = document.getElementById('pm-email').value;
  msg.textContent = `Trial cohort reserved for ${n} (${em}).`;
  form.hidden = true;
  done.hidden = false;
});

// Reveals
const obs = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }),
  { threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
