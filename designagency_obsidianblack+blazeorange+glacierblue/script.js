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

// Case filter
document.querySelectorAll('.filter-chip').forEach((chip) => {
  chip.addEventListener('click', () => {
    const f = chip.dataset.filter;
    document.querySelectorAll('.filter-chip').forEach((c) => {
      const active = c === chip;
      c.classList.toggle('is-active', active);
      c.setAttribute('aria-selected', String(active));
    });
    document.querySelectorAll('.case-card').forEach((card) => {
      card.hidden = !(f === 'all' || card.dataset.cat === f);
    });
  });
});

// Reel modal
const modal = document.getElementById('reel-modal');
document.getElementById('open-reel')?.addEventListener('click', () => { modal.hidden = false; });
document.getElementById('close-reel')?.addEventListener('click', () => { modal.hidden = true; });
modal?.addEventListener('click', (e) => { if (e.target === modal) modal.hidden = true; });

// Form
const form = document.getElementById('designova-form');
const done = document.getElementById('dn-done');
const doneMsg = document.getElementById('dn-done-msg');
document.getElementById('dn-reset')?.addEventListener('click', () => {
  form.reset();
  done.hidden = true;
  form.hidden = false;
});
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const n = document.getElementById('dn-name').value;
  const em = document.getElementById('dn-email').value;
  doneMsg.textContent = `Thanks, ${n}. Sprint inquiry registered for ${em}.`;
  form.hidden = true;
  done.hidden = false;
});

// Reveals
const obs = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }),
  { threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
