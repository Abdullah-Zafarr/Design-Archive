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

// Cycle featured car card
const CARS = [
  { tag: 'Car 01 >', title: 'Detailing service', sub: 'Modern and aggressive' },
  { tag: 'Car 02 >', title: 'Track telemetry', sub: 'Carbon and kinetic' },
  { tag: 'Car 03 >', title: 'Launch film', sub: 'High-speed editorial' },
];
let carIdx = 0;
document.getElementById('cycle-car')?.addEventListener('click', () => {
  carIdx = (carIdx + 1) % CARS.length;
  document.getElementById('car-tag').textContent = CARS[carIdx].tag;
  document.getElementById('car-title').textContent = CARS[carIdx].title;
  document.getElementById('car-sub').textContent = CARS[carIdx].sub;
});

// Portfolio filter
document.querySelectorAll('.tab-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    document.querySelectorAll('.tab-btn').forEach((b) => {
      const sel = b === btn;
      b.classList.toggle('is-active', sel);
      b.setAttribute('aria-selected', String(sel));
    });
    document.querySelectorAll('.work-card').forEach((card) => {
      card.hidden = !(f === 'all' || card.dataset.cat === f);
    });
  });
});

// Form
const form = document.getElementById('kinetic-form');
const done = document.getElementById('kn-done');
const msg = document.getElementById('kn-done-msg');
document.getElementById('kn-reset')?.addEventListener('click', () => {
  form.reset();
  done.hidden = true;
  form.hidden = false;
});
form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const n = document.getElementById('kn-name').value;
  const em = document.getElementById('kn-email').value;
  msg.textContent = `Sprint inquiry received for ${n} (${em}).`;
  form.hidden = true;
  done.hidden = false;
});

// Reveals
const obs = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }),
  { threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
