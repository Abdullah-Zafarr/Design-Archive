(() => {
  const header = document.getElementById('site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  /* Header condensation on scroll */
  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  /* Mobile navigation drawer */
  const setDrawerOpen = (open) => {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileDrawer.hidden = !open;
  };

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      setDrawerOpen(!expanded);
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setDrawerOpen(false);
        menuToggle.focus();
      }
    });
  }

  /* Editorial tablist filtering */
  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const ledgerItems = Array.from(document.querySelectorAll('.ledger-item'));
  const emptyState = document.getElementById('editorial-empty');
  const resetFilterBtn = document.getElementById('reset-filter-btn');

  const applyFilter = (category) => {
    let visibleCount = 0;

    tabs.forEach((tab) => {
      const active = tab.dataset.filter === category;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });

    ledgerItems.forEach((item) => {
      const match = category === 'all' || item.dataset.category === category;
      item.hidden = !match;
      if (match) {
        visibleCount += 1;
      } else {
        const trigger = item.querySelector('.ledger-trigger');
        const detail = item.querySelector('.ledger-detail');
        if (trigger && detail) {
          trigger.setAttribute('aria-expanded', 'false');
          detail.hidden = true;
        }
      }
    });

    if (emptyState) {
      emptyState.hidden = visibleCount > 0;
    }
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      applyFilter(tab.dataset.filter || 'all');
    });

    tab.addEventListener('keydown', (event) => {
      let nextIndex = null;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;

      if (nextIndex !== null) {
        event.preventDefault();
        tabs[nextIndex].focus();
        applyFilter(tabs[nextIndex].dataset.filter || 'all');
      }
    });
  });

  if (resetFilterBtn) {
    resetFilterBtn.addEventListener('click', () => {
      applyFilter('all');
      const allTab = tabs.find((t) => t.dataset.filter === 'all');
      if (allTab) allTab.focus();
    });
  }

  /* Expandable editorial colophon notes */
  document.querySelectorAll('.ledger-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const detail = trigger.nextElementSibling;
      if (!detail) return;
      const expanded = trigger.getAttribute('aria-expanded') === 'true';
      trigger.setAttribute('aria-expanded', String(!expanded));
      detail.hidden = expanded;
    });
  });

  /* Print archive form submission & reset */
  const archiveForm = document.getElementById('archive-form');
  const formConfirmation = document.getElementById('form-confirmation');
  const confirmCode = document.getElementById('confirm-code');
  const confirmSummary = document.getElementById('confirm-summary');
  const formResetBtn = document.getElementById('form-reset-btn');
  const emailInput = document.getElementById('collector-email');
  const editionSelect = document.getElementById('edition-select');

  if (archiveForm && formConfirmation && emailInput && editionSelect) {
    archiveForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!archiveForm.reportValidity()) return;

      const email = emailInput.value.trim();
      const edition = editionSelect.value;
      const hash = Array.from(email).reduce((acc, ch) => acc + ch.charCodeAt(0), 100) % 900 + 100;

      if (confirmCode) {
        confirmCode.textContent = `ALLOCATION VOGUE-09-${hash}`;
      }
      if (confirmSummary) {
        confirmSummary.textContent = `${edition} reserved for ${email}. Dispatch schedule sent from Milan studio.`;
      }

      archiveForm.hidden = true;
      formConfirmation.hidden = false;
    });

    if (formResetBtn) {
      formResetBtn.addEventListener('click', () => {
        archiveForm.reset();
        formConfirmation.hidden = true;
        archiveForm.hidden = false;
        emailInput.focus();
      });
    }
  }

  /* Scroll-reveal choreography with MutationObserver re-binding */
  const revealTargets = () => Array.from(document.querySelectorAll('.reveal:not(.is-visible)'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealTargets().forEach((el) => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
  );

  const bindReveals = () => {
    const thresholdY = window.innerHeight * 0.92;
    revealTargets().forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= thresholdY) {
        requestAnimationFrame(() => el.classList.add('is-visible'));
      } else {
        observer.observe(el);
      }
    });
  };

  bindReveals();

  const domObserver = new MutationObserver(() => bindReveals());
  domObserver.observe(document.body, { childList: true, subtree: true });
})();
