(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const filterTabs = [...document.querySelectorAll('.filter-tablist .tab-btn')];
  const repertoireRows = [...document.querySelectorAll('.repertoire-row')];
  const passButtons = [...document.querySelectorAll('.btn-pass')];
  const ledgerStatus = document.getElementById('ledger-status');
  const heldCountText = document.getElementById('held-count-text');
  const reserveForm = document.getElementById('reserve-form');
  const emailInput = document.getElementById('guest-email');
  const eveningSelect = document.getElementById('evening-select');
  const tierSelect = document.getElementById('tier-select');
  const emailError = document.getElementById('email-error');
  const reserveConfirmation = document.getElementById('reserve-confirmation');
  const confirmCopy = document.getElementById('confirm-copy');
  const resetFormBtn = document.getElementById('reset-form-btn');

  let activeStage = 'all';

  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  const setDrawerOpen = (open) => {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileDrawer.hidden = !open;
  };

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      setDrawerOpen(!expanded);
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

  const updateLedgerSummary = () => {
    const visibleCount = repertoireRows.filter((row) => !row.hidden).length;
    const heldRows = repertoireRows.filter((row) => row.querySelector('.btn-pass.is-held'));
    const heldCount = heldRows.length;
    const eveningWord = visibleCount === 1 ? 'evening' : 'evenings';
    const passWord = heldCount === 1 ? 'pass' : 'passes';

    if (ledgerStatus) {
      ledgerStatus.textContent = `Showing ${visibleCount} ${eveningWord} · ${heldCount} ${passWord} held`;
    }

    if (heldCountText) {
      if (heldCount === 0) {
        heldCountText.textContent = 'No passes held yet';
      } else {
        const works = heldRows.map((row) => row.dataset.work).join(', ');
        heldCountText.textContent = `${heldCount} ${passWord} held (${works})`;
      }
    }
  };

  const applyStageFilter = (stage) => {
    activeStage = stage;
    filterTabs.forEach((tab) => {
      const selected = tab.dataset.stage === stage;
      tab.classList.toggle('is-active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });

    repertoireRows.forEach((row) => {
      const matches = stage === 'all' || row.dataset.stage === stage;
      row.hidden = !matches;
      if (matches) row.classList.add('is-visible');
    });

    updateLedgerSummary();
  };

  filterTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      applyStageFilter(tab.dataset.stage || 'all');
    });

    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const step = event.key === 'ArrowRight' ? 1 : -1;
      const nextTab = filterTabs[(index + step + filterTabs.length) % filterTabs.length];
      nextTab.focus();
      applyStageFilter(nextTab.dataset.stage || 'all');
    });
  });

  passButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.repertoire-row');
      const seatsEl = row?.querySelector('.seats-value');
      const baseSeats = Number.parseInt(seatsEl?.dataset.seats || '0', 10);
      const willHold = !btn.classList.contains('is-held');

      btn.classList.toggle('is-held', willHold);
      btn.setAttribute('aria-pressed', String(willHold));
      btn.textContent = willHold ? 'Pass held' : 'Reserve pass';

      if (seatsEl) {
        const remaining = Math.max(0, baseSeats - (willHold ? 1 : 0));
        seatsEl.textContent = `${remaining} seats`;
      }

      updateLedgerSummary();
    });
  });

  if (reserveForm && emailInput && reserveConfirmation && confirmCopy) {
    reserveForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const emailVal = emailInput.value.trim();
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);

      if (!isValidEmail) {
        if (emailError) emailError.hidden = false;
        emailInput.focus();
        return;
      }

      if (emailError) emailError.hidden = true;
      const selectedEvening = eveningSelect?.value || 'Full Winter Season Pass';
      const selectedTier = tierSelect?.value || 'Orchestra';

      confirmCopy.textContent = `Hold recorded for ${emailVal} · ${selectedEvening} (${selectedTier}).`;
      reserveForm.hidden = true;
      reserveConfirmation.hidden = false;
    });

    emailInput.addEventListener('input', () => {
      if (emailError) emailError.hidden = true;
    });
  }

  if (resetFormBtn && reserveForm && reserveConfirmation) {
    resetFormBtn.addEventListener('click', () => {
      reserveConfirmation.hidden = true;
      reserveForm.hidden = false;
      reserveForm.reset();
      emailInput?.focus();
    });
  }

  const revealEls = [...document.querySelectorAll('.reveal')];
  if ('IntersectionObserver' in window) {
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
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  applyStageFilter(activeStage);
})();
