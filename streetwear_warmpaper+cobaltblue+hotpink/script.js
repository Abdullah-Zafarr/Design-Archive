const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });

/* Mobile Navigation Drawer */
function closeDrawer() {
  if (!menuToggle || !mobileDrawer) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileDrawer.hidden = true;
}

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  mobileDrawer.hidden = open;
});

mobileDrawer?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeDrawer);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileDrawer && !mobileDrawer.hidden) {
    closeDrawer();
    menuToggle?.focus();
  }
});

/* Capsule Bag State */
let cartTotal = 0;
const lastAdded = [];
const cartCountEl = document.getElementById('cart-count');
const mobileCartCountEl = document.getElementById('mobile-cart-count');
const bagStatusEl = document.getElementById('bag-status');

function syncCartDisplay() {
  if (cartCountEl) cartCountEl.textContent = String(cartTotal);
  if (mobileCartCountEl) mobileCartCountEl.textContent = String(cartTotal);
  if (bagStatusEl) {
    const label = cartTotal === 1 ? 'garment' : 'garments';
    const recent = lastAdded.length ? ` · Latest: ${lastAdded[lastAdded.length - 1]}` : '';
    bagStatusEl.textContent = `${cartTotal} ${label} staged in capsule bag${recent}`;
  }
}

document.getElementById('header-cart-btn')?.addEventListener('click', () => {
  document.getElementById('lookbook')?.scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.garment-card').forEach((card) => {
  const sizeBtns = [...card.querySelectorAll('.size-btn')];
  const addBtn = card.querySelector('.add-cart-btn');
  const sku = card.dataset.sku || 'Garment';

  sizeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-pressed', 'true');
    });
  });

  addBtn?.addEventListener('click', () => {
    const activeSize = card.querySelector('.size-btn.is-active')?.textContent || 'M';
    cartTotal += 1;
    lastAdded.push(`${sku} (${activeSize})`);
    syncCartDisplay();
    addBtn.textContent = 'ADDED';
    setTimeout(() => {
      addBtn.textContent = 'ADD TO CART';
    }, 900);
  });
});

/* NYC Showroom RSVP Form */
const rsvpForm = document.getElementById('rsvp-form');
const rsvpDone = document.getElementById('rsvp-done');
const rsvpDoneMsg = document.getElementById('rsvp-done-msg');
const rsvpEmail = document.getElementById('rsvp-email');
const rsvpWindow = document.getElementById('rsvp-window');

rsvpForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = rsvpEmail?.value.trim() || '';
  const pref = rsvpWindow?.value || 'Private Showroom Fitting';

  rsvpDoneMsg.textContent = `${pref} logged for ${email}. Canal Street studio confirmation follows within 24 hours.`;
  rsvpForm.hidden = true;
  rsvpDone.hidden = false;
});

document.getElementById('rsvp-reset')?.addEventListener('click', () => {
  rsvpForm?.reset();
  rsvpDone.hidden = true;
  rsvpForm.hidden = false;
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
