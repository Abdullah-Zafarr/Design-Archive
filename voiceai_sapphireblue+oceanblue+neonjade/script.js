const menuToggle = document.getElementById('menu-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');

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

// Interactive phone preview simulation
document.getElementById('call-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const phone = document.getElementById('caller-phone').value.trim();
  const status = document.getElementById('call-status');
  status.textContent = `Preview simulation: Alex outbound voice check queued for ${phone}.`;
});

// Demo form
document.getElementById('demo-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('dm-email').value.trim();
  document.getElementById('demo-status').textContent = `Demo benchmark scheduled for ${email}.`;
});

// Reveals
const obs = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }),
  { threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
