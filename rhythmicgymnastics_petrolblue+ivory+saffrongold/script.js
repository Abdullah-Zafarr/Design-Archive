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

  });
