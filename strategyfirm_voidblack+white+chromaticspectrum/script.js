(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const filterTabs = [...document.querySelectorAll('.filter-tab')];
  const ledgerRows = [...document.querySelectorAll('#venture-ledger .ledger-row')];
  const ledgerStatus = document.getElementById('ledger-status');
  const sculpture = document.getElementById('crt-sculpture');
  const expSection = document.getElementById('experience');
  const proposalForm = document.getElementById('proposal-form');
  const proposalError = document.getElementById('proposal-error');
  const proposalDone = document.getElementById('proposal-done');
  const doneHeading = document.getElementById('done-heading');
  const doneDetail = document.getElementById('done-detail');
  const proposalReset = document.getElementById('proposal-reset');

  // Header scroll state
  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  // Navigation drawer with Escape key restore
  const setDrawer = (open) => {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileDrawer.hidden = !open;
  };

  menuToggle?.addEventListener('click', () => {
    const open = menuToggle.getAttribute('aria-expanded') === 'true';
    setDrawer(!open);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileDrawer && !mobileDrawer.hidden) {
      setDrawer(false);
      menuToggle?.focus();
    }
  });

  mobileDrawer?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setDrawer(false));
  });

  // Subtle interactive pointer parallax on CRT sculpture (±6px clamped)
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (sculpture && expSection && !reducedMotion) {
    expSection.addEventListener('pointermove', (event) => {
      const rect = expSection.getBoundingClientRect();
      const nx = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      const ny = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      const tx = Math.max(-6, Math.min(6, nx * 6));
      const ty = Math.max(-6, Math.min(6, ny * 6));
      sculpture.style.setProperty('--tilt-x', `${tx.toFixed(2)}px`);
      sculpture.style.setProperty('--tilt-y', `${ty.toFixed(2)}px`);
    });

    expSection.addEventListener('pointerleave', () => {
      sculpture.style.setProperty('--tilt-x', '0px');
      sculpture.style.setProperty('--tilt-y', '0px');
    });
  }

  // Venture sector tabs
  const applySectorFilter = (sector) => {
    let count = 0;

    filterTabs.forEach((tab) => {
      const active = tab.dataset.filter === sector;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    ledgerRows.forEach((row) => {
      const match = sector === 'all' || row.dataset.sector === sector;
      row.hidden = !match;
      if (match) {
        count += 1;
        row.classList.add('is-visible');
      }
    });

    if (ledgerStatus) {
      const labelMap = {
        all: 'all sectors',
        fintech: 'Fintech',
        robotics: 'Robotics',
        consumer: 'Consumer',
      };
      const noun = count === 1 ? 'mandate' : 'mandates';
      ledgerStatus.textContent = `Showing ${count} venture ${noun} in ${labelMap[sector] || 'all sectors'}`;
    }
  };

  filterTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => applySectorFilter(tab.dataset.filter || 'all'));

    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const next = filterTabs[(idx + delta + filterTabs.length) % filterTabs.length];
      next.focus();
      applySectorFilter(next.dataset.filter || 'all');
    });
  });

  // Partnership Proposal Intake Form
  proposalForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const companyInput = document.getElementById('vt-company');
    const stageSelect = document.getElementById('vt-stage');
    const mandateInput = document.getElementById('vt-mandate');

    const company = companyInput?.value.trim() || '';
    const stage = stageSelect?.value || 'Seed / Series A';
    const mandate = mandateInput?.value.trim() || '';

    if (company.length < 2) {
      if (proposalError) {
        proposalError.textContent = 'Enter your company or venture name to submit a brief.';
        proposalError.hidden = false;
      }
      companyInput?.focus();
      return;
    }

    if (mandate.length < 10) {
      if (proposalError) {
        proposalError.textContent = 'Provide a short mandate summary (at least 10 characters).';
        proposalError.hidden = false;
      }
      mandateInput?.focus();
      return;
    }

    if (proposalError) proposalError.hidden = true;
    proposalForm.hidden = true;
    if (proposalDone && doneHeading && doneDetail) {
      doneHeading.textContent = `${company} proposal logged`;
      doneDetail.textContent = `Stage: ${stage}. Mandate recorded: "${mandate}". Partner response expected within 48 hours.`;
      proposalDone.hidden = false;
    }
  });

  proposalReset?.addEventListener('click', () => {
    proposalForm?.reset();
    if (proposalDone) proposalDone.hidden = true;
    if (proposalForm) proposalForm.hidden = false;
    document.getElementById('vt-company')?.focus();
  });

  // Scroll reveal observer
  const reveals = [...document.querySelectorAll('.reveal')];
  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-visible'));
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
      reveals.forEach((el) => {
        if (el.getBoundingClientRect().top < cutoff) {
          el.classList.add('is-visible');
        } else {
          observer.observe(el);
        }
      });
    });
  }
})();
