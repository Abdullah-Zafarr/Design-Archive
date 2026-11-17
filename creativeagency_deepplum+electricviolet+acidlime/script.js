const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });

menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  mobileDrawer.hidden = isOpen;
});

mobileDrawer?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.hidden = true;
  });
});

// Tablist project filtering
const tabs = document.querySelectorAll('.tab-btn');
const rows = document.querySelectorAll('.work-row');
const emptyState = document.getElementById('work-empty');
const resetFilterBtn = document.getElementById('reset-filter');

function applyFilter(filter) {
  let visible = 0;
  tabs.forEach((t) => {
    const active = t.dataset.filter === filter;
    t.classList.toggle('is-active', active);
    t.setAttribute('aria-selected', String(active));
  });
  rows.forEach((row) => {
    const match = filter === 'all' || row.dataset.cat === filter;
    row.hidden = !match;
    if (match) visible += 1;
  });
  emptyState.hidden = visible > 0;
}

tabs.forEach((tab) => {
  tab.addEventListener('click', () => applyFilter(tab.dataset.filter));
});

resetFilterBtn?.addEventListener('click', () => applyFilter('all'));

// Scroll reveal
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Contact form inline state
const form = document.getElementById('contact-form');
const confirmation = document.getElementById('form-confirmation');
const confirmSummary = document.getElementById('confirm-summary');
const resetFormBtn = document.getElementById('reset-form');

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(form);
  confirmSummary.textContent = `Thanks, ${data.get('name')}. Inquiry for "${data.get('scope')}" recorded for ${data.get('email')}.`;
  form.hidden = true;
  confirmation.hidden = false;
});

resetFormBtn?.addEventListener('click', () => {
  form.reset();
  confirmation.hidden = true;
  form.hidden = false;
});
