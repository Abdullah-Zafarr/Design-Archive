document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  // Header scroll state
  const syncHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  // Mobile drawer
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

  // Class track tabs
  const classTabs = document.querySelectorAll('.class-tab');
  const classCards = document.querySelectorAll('.class-card');

  classTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const track = tab.dataset.track;
      classTabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      classCards.forEach((card) => {
        card.hidden = card.dataset.track !== track;
      });
    });
  });

  // Select class -> booking form
  const selectedClassInput = document.getElementById('selected-class');
  document.querySelectorAll('[data-select-class]').forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedClassInput.value = btn.dataset.selectClass;
      document.getElementById('book').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Shop filter
  const filterTabs = document.querySelectorAll('.filter-tab');
  const products = document.querySelectorAll('.product-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const cat = tab.dataset.cat;
      filterTabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      products.forEach((item) => {
        item.hidden = cat !== 'all' && item.dataset.cat !== cat;
      });
    });
  });

  });
