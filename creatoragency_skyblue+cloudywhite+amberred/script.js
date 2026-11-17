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

// Playbook tabs
const PILLARS = {
  audience: {
    kicker: '01 · Audience Retention',
    title: 'Packaging, pacing, and multi-format distribution',
    desc: 'We audit hook retention, thumbnail clarity, and cross-platform cadence so every flagship upload compounds.',
  },
  deals: {
    kicker: '02 · Sponsor Partnerships',
    title: 'Multi-quarter integrations matched to channel tone',
    desc: 'Long-term category partnerships that respect viewer trust while lifting per-integration yield.',
  },
  products: {
    kicker: '03 · Owned Lines',
    title: 'Direct-to-fan releases built around real demand',
    desc: 'Turnaround sprint support for digital toolkits, apparel drops, and member communities.',
  },
};

document.querySelectorAll('.tab-pill').forEach((btn) => {
  btn.addEventListener('click', () => {
    const p = PILLARS[btn.dataset.pillar];
    if (!p) return;
    document.querySelectorAll('.tab-pill').forEach((b) => {
      const sel = b === btn;
      b.classList.toggle('is-active', sel);
      b.setAttribute('aria-selected', String(sel));
    });
    document.getElementById('pl-kicker').textContent = p.kicker;
    document.getElementById('pl-title').textContent = p.title;
    document.getElementById('pl-desc').textContent = p.desc;
  });
});

// Form
document.getElementById('upf-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const h = document.getElementById('upf-handle').value.trim();
  const em = document.getElementById('upf-email').value.trim();
  document.getElementById('upf-msg').textContent = `Creator profile received for ${h} (${em}).`;
});

// Reveals
const obs = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }),
  { threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
