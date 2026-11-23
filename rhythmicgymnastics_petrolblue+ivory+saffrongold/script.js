const TIERS = {
  upper: {
    label: 'UPPER BOWL · SECTIONS 201–218',
    price: '€18',
    desc: 'Elevated panoramic view over full carpet choreography and ribbon trajectories.',
    passValue: 'Upper Bowl · €18',
  },
  lower: {
    label: 'LOWER BOWL · SECTIONS 101–114',
    price: '€28',
    desc: 'Mid-level angle matching judges table sightline along the main diagonal.',
    passValue: 'Lower Bowl · €28',
  },
  floor: {
    label: 'FLOOR FRONT · ROWS A–D',
    price: '€48',
    desc: 'Carpet-level seats three meters from the ribbon boundary line and kiss-and-cry.',
    passValue: 'Floor Front · €48',
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  const syncHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  const setDrawer = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileDrawer.hidden = !open;
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setDrawer(!isOpen);
  });

  mobileDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setDrawer(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileDrawer.hidden) {
      setDrawer(false);
      menuToggle.focus();
    }
  });

  // Day programme tabs
  const dayTabs = document.querySelectorAll('.day-tab');
  const scheduleRows = document.querySelectorAll('.schedule-row');

  dayTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const day = tab.dataset.day;
      dayTabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      scheduleRows.forEach((row) => {
        row.hidden = row.dataset.day !== day;
      });
    });
  });

  // Arena tier tabs
  const tierButtons = document.querySelectorAll('.tier-btn');
  const tierLabel = document.getElementById('tier-label');
  const tierPrice = document.getElementById('tier-price');
  const tierDesc = document.getElementById('tier-desc');
  const passTypeSelect = document.getElementById('pass-type');

  tierButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const data = TIERS[btn.dataset.tier];
      if (!data) return;
      tierButtons.forEach((b) => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      tierLabel.textContent = data.label;
      tierPrice.textContent = data.price;
      tierDesc.textContent = data.desc;
      passTypeSelect.value = data.passValue;
    });
  });

  // Pass booking form
  const passForm = document.getElementById('pass-form');
  const passError = document.getElementById('pass-error');
  const passConfirm = document.getElementById('pass-confirmation');
  const passConfirmTitle = document.getElementById('pass-confirm-title');
  const passConfirmNote = document.getElementById('pass-confirm-note');

  passForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('pass-email').value.trim();
    if (!email || !email.includes('@')) {
      passError.hidden = false;
      return;
    }
    passError.hidden = true;
    const qty = document.getElementById('pass-qty').value;
    const passName = passTypeSelect.value;
    passConfirmTitle.textContent = `${qty} × ${passName}`;
    passConfirmNote.textContent = `Digital QR passes dispatched to ${email} for 15–17 May at Pavilhão Lisboa.`;
    passForm.hidden = true;
    passConfirm.hidden = false;
  });

  document.getElementById('reset-pass-btn').addEventListener('click', () => {
    passForm.reset();
    passConfirm.hidden = true;
    passForm.hidden = false;
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
});
