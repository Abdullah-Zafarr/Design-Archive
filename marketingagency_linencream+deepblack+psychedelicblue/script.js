(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const watchVideoBtn = document.getElementById('watch-video-btn');
  const videoModal = document.getElementById('video-modal');
  const closeVideoBtn = document.getElementById('close-video-btn');
  const reelChapterBtns = [...document.querySelectorAll('.reel-chapter-btn')];
  const reelCode = document.getElementById('reel-chapter-code');
  const reelStat = document.getElementById('reel-chapter-stat');
  const reelDesc = document.getElementById('reel-chapter-desc');
  const cadenceBtns = [...document.querySelectorAll('.cadence-btn')];
  const planPrices = [...document.querySelectorAll('.plan-price')];
  const planPeriods = [...document.querySelectorAll('.plan-period')];
  const selectPlanBtns = [...document.querySelectorAll('[data-select-plan]')];
  const retainerSelect = document.getElementById('retainer-select');
  const auditForm = document.getElementById('audit-form');
  const emailInput = document.getElementById('work-email');
  const spendSelect = document.getElementById('spend-select');
  const emailError = document.getElementById('audit-email-error');
  const auditSuccess = document.getElementById('audit-success');
  const auditSuccessCopy = document.getElementById('audit-success-copy');
  const auditResetBtn = document.getElementById('audit-reset-btn');

  const chapters = [
    {
      code: 'CHAPTER 01 / HOOK VELOCITY',
      stat: '+64% thumb-stop rate',
      desc: 'Kinetic first-frame motion masks pairing sharp copy contrast with 3-second visual proof.',
    },
    {
      code: 'CHAPTER 02 / BID ENGINE',
      stat: '3.4x blended ROAS',
      desc: 'Daily contribution-margin pacing calibrated across Meta, YouTube, and branded search.',
    },
    {
      code: 'CHAPTER 03 / LANDING MATRIX',
      stat: '+38% conversion lift',
      desc: 'Offer-matched split pages stripping navigation clutter and routing high-intent buyers directly.',
    },
  ];

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

  // Showreel dialog
  const setReelChapter = (index) => {
    const ch = chapters[index] || chapters[0];
    reelChapterBtns.forEach((btn, i) => {
      btn.classList.toggle('is-active', i === index);
    });
    if (reelCode) reelCode.textContent = ch.code;
    if (reelStat) reelStat.textContent = ch.stat;
    if (reelDesc) reelDesc.textContent = ch.desc;
  };

  if (watchVideoBtn && videoModal) {
    watchVideoBtn.addEventListener('click', () => {
      setReelChapter(0);
      if (typeof videoModal.showModal === 'function') {
        videoModal.showModal();
      } else {
        videoModal.setAttribute('open', '');
      }
    });

    closeVideoBtn?.addEventListener('click', () => {
      if (typeof videoModal.close === 'function') {
        videoModal.close();
      } else {
        videoModal.removeAttribute('open');
      }
      watchVideoBtn.focus();
    });

    videoModal.addEventListener('click', (event) => {
      if (event.target === videoModal && typeof videoModal.close === 'function') {
        videoModal.close();
        watchVideoBtn.focus();
      }
    });
  }

  reelChapterBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => setReelChapter(index));
  });

  // Pricing cadence switcher
  const applyCadence = (cadence) => {
    const isAnnual = cadence === 'annual';
    cadenceBtns.forEach((btn) => {
      const active = btn.dataset.cadence === cadence;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });

    planPrices.forEach((el) => {
      el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
    });

    planPeriods.forEach((el) => {
      el.textContent = isAnnual ? el.dataset.annualNote : el.dataset.monthlyNote;
    });
  };

  cadenceBtns.forEach((btn) => {
    btn.addEventListener('click', () => applyCadence(btn.dataset.cadence || 'monthly'));
  });

  selectPlanBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const chosen = btn.dataset.selectPlan;
      if (retainerSelect && chosen) {
        retainerSelect.value = chosen;
      }
      document.getElementById('signup')?.scrollIntoView({ behavior: 'smooth' });
      emailInput?.focus();
    });
  });

  // Audit form
  if (auditForm && emailInput && auditSuccess && auditSuccessCopy) {
    auditForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = emailInput.value.trim();
      const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!valid) {
        if (emailError) emailError.hidden = false;
        emailInput.focus();
        return;
      }

      if (emailError) emailError.hidden = true;
      const spend = spendSelect?.value || '$40k–$120k';
      const track = retainerSelect?.value || 'Scale Pod';
      auditSuccessCopy.textContent = `Audit queued for ${email} · ${track} (${spend} monthly ad spend).`;
      auditForm.hidden = true;
      auditSuccess.hidden = false;
    });

    emailInput.addEventListener('input', () => {
      if (emailError) emailError.hidden = true;
    });
  }

  if (auditResetBtn && auditForm && auditSuccess) {
    auditResetBtn.addEventListener('click', () => {
      auditSuccess.hidden = true;
      auditForm.hidden = false;
      auditForm.reset();
      emailInput?.focus();
    });
  }

  // Scroll reveal
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
})();
