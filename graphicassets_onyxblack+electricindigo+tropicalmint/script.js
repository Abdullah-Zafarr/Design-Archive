(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const filterTabs = [...document.querySelectorAll('.filter-tabs .tab-btn')];
  const assetCards = [...document.querySelectorAll('#vault-grid .asset-card')];
  const vaultStatus = document.getElementById('vault-status');
  const kitButtons = [...document.querySelectorAll('.btn-kit')];
  const authTabs = [...document.querySelectorAll('.auth-tab')];
  const joinForm = document.getElementById('join-form');
  const emailInput = document.getElementById('creator-email');
  const disciplineField = document.getElementById('discipline-field');
  const formError = document.getElementById('form-error');
  const joinSubmitText = document.getElementById('join-submit-text');
  const joinEyebrow = document.getElementById('join-eyebrow');
  const joinLead = document.getElementById('join-lead');
  const formSuccess = document.getElementById('form-success');
  const successTitle = document.getElementById('success-title');
  const successCopy = document.getElementById('success-copy');
  const formReset = document.getElementById('form-reset');

  let currentAuthMode = 'join';

  // Header scroll state
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Mobile navigation drawer
  const setDrawerOpen = (open) => {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileDrawer.hidden = !open;
  };

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      setDrawerOpen(!isExpanded);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !mobileDrawer.hidden) {
        setDrawerOpen(false);
        menuToggle.focus();
      }
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });
  }

  // Vault category filter
  const applyFilter = (filterKey) => {
    let visibleCount = 0;

    filterTabs.forEach((tab) => {
      const active = tab.dataset.filter === filterKey;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    assetCards.forEach((card) => {
      const matches = filterKey === 'all' || card.dataset.category === filterKey;
      card.hidden = !matches;
      if (matches) {
        visibleCount += 1;
        card.classList.add('is-visible');
      }
    });

    if (vaultStatus) {
      const labelMap = {
        all: 'all disciplines',
        graphics: 'Graphics',
        '3d': '3D Assets',
        fonts: 'Fonts',
        templates: 'Templates',
      };
      const noun = visibleCount === 1 ? 'kit' : 'kits';
      vaultStatus.textContent = `Showing ${visibleCount} production ${noun} in ${labelMap[filterKey] || 'all disciplines'}`;
    }
  };

  filterTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      applyFilter(tab.dataset.filter || 'all');
    });

    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const next = filterTabs[(index + delta + filterTabs.length) % filterTabs.length];
      next.focus();
      applyFilter(next.dataset.filter || 'all');
    });
  });

  // Top nav & drawer category jump links
  document.querySelectorAll('[data-filter-jump]').forEach((link) => {
    link.addEventListener('click', () => {
      const targetFilter = link.getAttribute('data-filter-jump');
      if (targetFilter) applyFilter(targetFilter);
    });
  });

  // Live mint download counter on kit action
  kitButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.asset-card');
      const countEl = card?.querySelector('.counter-num');
      if (countEl && !btn.classList.contains('is-downloaded')) {
        const current = Number.parseInt(countEl.dataset.count || '0', 10);
        const next = current + 1;
        countEl.dataset.count = String(next);
        countEl.textContent = next.toLocaleString('en-US');
        btn.classList.add('is-downloaded');
        const labelSpan = btn.querySelector('span');
        if (labelSpan) labelSpan.textContent = 'Saved';
        btn.setAttribute('aria-pressed', 'true');
      }
    });
  });

  // Auth mode switcher (Join Free vs Member Login)
  const setAuthMode = (mode) => {
    currentAuthMode = mode === 'login' ? 'login' : 'join';
    authTabs.forEach((tab) => {
      const active = tab.dataset.mode === currentAuthMode;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    if (disciplineField) {
      disciplineField.hidden = currentAuthMode === 'login';
    }
    if (joinSubmitText) {
      joinSubmitText.textContent = currentAuthMode === 'login' ? 'SIGN IN TO VAULT' : 'CREATE FREE PASS';
    }
    if (joinEyebrow) {
      joinEyebrow.textContent = currentAuthMode === 'login' ? 'Returning creator' : 'Free creator pass';
    }
    if (joinLead) {
      joinLead.textContent =
        currentAuthMode === 'login'
          ? 'Enter your studio email to restore saved kits and receive your direct sign-in link.'
          : 'Create your pass to bookmark kits, sync weekly vault drops, and download full source bundles at full speed.';
    }

    if (formError) formError.hidden = true;
    if (formSuccess && joinForm && !formSuccess.hidden) {
      formSuccess.hidden = true;
      joinForm.hidden = false;
    }
  };

  authTabs.forEach((tab) => {
    tab.addEventListener('click', () => setAuthMode(tab.dataset.mode));
  });

  document.querySelectorAll('[data-auth-mode]').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      setAuthMode(trigger.getAttribute('data-auth-mode'));
      if (emailInput) {
        setTimeout(() => emailInput.focus({ preventScroll: true }), 260);
      }
    });
  });

  // Form validation and confirmation state
  if (joinForm && emailInput && formError && formSuccess && successTitle && successCopy) {
    joinForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = emailInput.value.trim();
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!validEmail) {
        formError.textContent = 'Enter a valid studio or personal email address.';
        formError.hidden = false;
        emailInput.focus();
        return;
      }

      formError.hidden = true;
      joinForm.hidden = true;
      formSuccess.hidden = false;

      if (currentAuthMode === 'login') {
        successTitle.textContent = 'Sign-in link dispatched';
        successCopy.textContent = `A single-click vault access link for ${email} is ready for your studio session.`;
      } else {
        const discipline = document.getElementById('creator-role')?.value || 'Brand and Vector Design';
        successTitle.textContent = 'Pass RAW-2026-418 active';
        successCopy.textContent = `${email} is registered under ${discipline}. Commercial download rights are active immediately.`;
      }
    });

    if (formReset) {
      formReset.addEventListener('click', () => {
        joinForm.reset();
        formSuccess.hidden = true;
        joinForm.hidden = false;
        emailInput.focus();
      });
    }
  }

  // Scroll reveal choreography
  const revealTargets = [...document.querySelectorAll('.reveal')];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
    );

    requestAnimationFrame(() => {
      const cutoff = window.innerHeight * 0.92;
      revealTargets.forEach((el) => {
        if (el.getBoundingClientRect().top < cutoff) {
          el.classList.add('is-visible');
        } else {
          observer.observe(el);
        }
      });
    });
  }
})();
