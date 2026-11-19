(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const langToggle = document.getElementById('lang-toggle');
  const langLabel = document.getElementById('lang-label');
  const langMenu = document.getElementById('lang-menu');
  const langOptions = [...document.querySelectorAll('.lang-option')];
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const heroCtaLabel = document.getElementById('hero-cta-label');

  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  const fxAmount = document.getElementById('fx-amount');
  const fxFrom = document.getElementById('fx-from');
  const fxTo = document.getElementById('fx-to');
  const fxSwap = document.getElementById('fx-swap');
  const fxOutput = document.getElementById('fx-output');
  const fxRateDisplay = document.getElementById('fx-rate-display');
  const fxFeeDisplay = document.getElementById('fx-fee-display');

  const onboardingForm = document.getElementById('onboarding-form');
  const entityName = document.getElementById('entity-name');
  const workEmail = document.getElementById('work-email');
  const corridorSelect = document.getElementById('corridor-select');
  const onboardingError = document.getElementById('onboarding-error');
  const onboardingSuccess = document.getElementById('onboarding-success');
  const onboardingMsg = document.getElementById('onboarding-msg');
  const onboardingReset = document.getElementById('onboarding-reset');

  const LOCALES = {
    Eng: {
      title: 'Simplified<br>Global Finance',
      subtitle: 'A unified financial platform for global<br>businesses. Manage accounts, payments,<br>and currencies in one place.',
      cta: "Let's get started",
    },
    Fra: {
      title: 'Finance Mondiale<br>Simplifiée',
      subtitle: 'Une plateforme financière unifiée pour<br>les entreprises mondiales. Comptes,<br>paiements et devises réunis.',
      cta: 'Commencer',
    },
    Deu: {
      title: 'Globale Finanzen<br>Vereinfacht',
      subtitle: 'Eine einheitliche Finanzplattform für<br>globale Unternehmen. Konten, Zahlungen<br>und Währungen an einem Ort.',
      cta: 'Jetzt starten',
    },
    Jpn: {
      title: 'グローバル金融を<br>シンプルに',
      subtitle: 'グローバル企業のための統合財務<br>プラットフォーム。口座・決済・<br>多通貨を一元管理。',
      cta: '口座開設へ',
    },
  };

  // USD reference rates for illustrative corporate desk
  const USD_RATES = {
    USD: 1,
    EUR: 0.9184,
    GBP: 0.7865,
    JPY: 152.4,
    CHF: 0.8812,
  };

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Language pill dropdown
  const setLangOpen = (open) => {
    if (!langToggle || !langMenu) return;
    langToggle.setAttribute('aria-expanded', String(open));
    langMenu.hidden = !open;
  };

  if (langToggle && langMenu) {
    langToggle.addEventListener('click', () => {
      const open = langToggle.getAttribute('aria-expanded') === 'true';
      if (!open) setDrawerOpen(false);
      setLangOpen(!open);
    });

    langOptions.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.lang || 'Eng';
        const copy = LOCALES[key] || LOCALES.Eng;
        if (langLabel) langLabel.textContent = key;
        if (heroTitle) heroTitle.innerHTML = copy.title;
        if (heroSubtitle) heroSubtitle.innerHTML = copy.subtitle;
        if (heroCtaLabel) heroCtaLabel.textContent = copy.cta;
        langOptions.forEach((o) => o.classList.toggle('is-selected', o === btn));
        setLangOpen(false);
        langToggle.focus();
      });
    });
  }

  // Mobile drawer
  const setDrawerOpen = (open) => {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileDrawer.hidden = !open;
  };

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      if (!open) setLangOpen(false);
      setDrawerOpen(!open);
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (langMenu && !langMenu.hidden) {
      setLangOpen(false);
      langToggle?.focus();
    }
    if (mobileDrawer && !mobileDrawer.hidden) {
      setDrawerOpen(false);
      menuToggle?.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (langMenu && !langMenu.hidden) {
      const inside = langMenu.contains(event.target) || langToggle?.contains(event.target);
      if (!inside) setLangOpen(false);
    }
  });

  // Illustrative FX calculator
  const recalculateFx = () => {
    const rawAmount = Number.parseFloat(fxAmount?.value || '0');
    const amount = Number.isFinite(rawAmount) && rawAmount > 0 ? rawAmount : 0;
    const fromCode = fxFrom?.value || 'USD';
    const toCode = fxTo?.value || 'EUR';

    const midRate = USD_RATES[toCode] / USD_RATES[fromCode];
    const spreadFee = amount * 0.0015;
    const netAmount = Math.max(0, amount - spreadFee);
    const converted = netAmount * midRate;

    const decimals = toCode === 'JPY' ? 0 : 2;
    if (fxOutput) {
      fxOutput.textContent = converted.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
    if (fxRateDisplay) {
      const rateFmt = midRate.toFixed(toCode === 'JPY' ? 2 : 4);
      fxRateDisplay.textContent = `1 ${fromCode} = ${rateFmt} ${toCode}`;
    }
    if (fxFeeDisplay) {
      const feeFmt = spreadFee.toLocaleString('en-US', {
        minimumFractionDigits: fromCode === 'JPY' ? 0 : 2,
        maximumFractionDigits: fromCode === 'JPY' ? 0 : 2,
      });
      fxFeeDisplay.textContent = `${feeFmt} ${fromCode}`;
    }
  };

  fxAmount?.addEventListener('input', recalculateFx);
  fxFrom?.addEventListener('change', recalculateFx);
  fxTo?.addEventListener('change', recalculateFx);

  fxSwap?.addEventListener('click', () => {
    if (!fxFrom || !fxTo) return;
    const prevFrom = fxFrom.value;
    fxFrom.value = fxTo.value;
    fxTo.value = prevFrom;
    recalculateFx();
  });

  recalculateFx();

  // Corporate onboarding form
  if (onboardingForm) {
    onboardingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const entityVal = entityName?.value.trim() || '';
      const emailVal = workEmail?.value.trim() || '';
      const corridorVal = corridorSelect?.value || 'USD → EUR';

      if (!entityVal) {
        if (onboardingError) {
          onboardingError.textContent = 'Enter your legal entity name to initialize the treasury ledger.';
          onboardingError.hidden = false;
        }
        entityName?.focus();
        return;
      }
      if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        if (onboardingError) {
          onboardingError.textContent = 'Enter a valid corporate work email address.';
          onboardingError.hidden = false;
        }
        workEmail?.focus();
        return;
      }
      if (onboardingError) onboardingError.hidden = true;
      onboardingForm.hidden = true;
      if (onboardingMsg) {
        onboardingMsg.textContent = `${entityVal} queued on ${corridorVal}. Workspace notice sent to ${emailVal}.`;
      }
      if (onboardingSuccess) onboardingSuccess.hidden = false;
    });
  }

  onboardingReset?.addEventListener('click', () => {
    if (onboardingForm) {
      onboardingForm.reset();
      onboardingForm.hidden = false;
    }
    if (onboardingSuccess) onboardingSuccess.hidden = true;
    entityName?.focus();
  });

  // Reveal choreography
  const reveals = [...document.querySelectorAll('.reveal')];
  const revealVisible = () => {
    const cutoff = window.innerHeight * 0.92;
    reveals.forEach((el) => {
      if (el.getBoundingClientRect().top <= cutoff) el.classList.add('is-visible');
    });
  };
  requestAnimationFrame(revealVisible);

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
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
})();
