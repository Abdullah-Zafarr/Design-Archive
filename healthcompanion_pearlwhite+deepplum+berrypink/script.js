(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const sessionBoxes = [...document.querySelectorAll('.session-box')];
  const heroPillarsContainer = document.getElementById('hero-pillars');
  const heroPillars = [...document.querySelectorAll('.hero-pillars .pillar')];
  const serviceTabs = [...document.querySelectorAll('.service-tab')];
  const slotDisplay = document.getElementById('selected-slot-display');
  const cohortSelect = document.getElementById('pm-cohort');
  const demoForm = document.getElementById('demo-form');
  const formError = document.getElementById('form-error');
  const demoDone = document.getElementById('demo-done');
  const doneTitle = document.getElementById('done-title');
  const doneSummary = document.getElementById('done-summary');
  const demoReset = document.getElementById('demo-reset');

  // Header condensation
  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  window.addEventListener('scroll', syncHeader, { passive: true });
  syncHeader();

  // Drawer open/close + Escape handling
  const setDrawer = (open) => {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileDrawer.hidden = !open;
  };

  menuToggle?.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setDrawer(!isOpen);
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

  // Schedule session selector synced with form summary
  sessionBoxes.forEach((box) => {
    box.addEventListener('click', () => {
      sessionBoxes.forEach((item) => {
        const active = item === box;
        item.classList.toggle('is-selected', active);
        item.setAttribute('aria-pressed', String(active));
      });
      const slot = box.dataset.slot;
      if (slot && slotDisplay) slotDisplay.textContent = slot;
      if (cohortSelect && box.dataset.day) {
        const match = [...cohortSelect.options].find((opt) => opt.value.startsWith(box.dataset.day));
        if (match) cohortSelect.value = match.value;
      }
    });
  });

  // Synchronized 5-pillar hero & services state
  const PILLARS = [
    {
      tag: 'Pillar 01 / Coaching',
      title: 'Small-cohort skill progression led by certified specialists',
      desc: 'Youth foundations, adult endurance runners, and competitive court players train on shared kinematic principles calibrated to joint load and weekly schedule.',
      statA: '1 : 6 max',
      statB: 'Weekly video',
      statC: '23 Tennis Court Ln',
    },
    {
      tag: 'Pillar 02 / Facilities',
      title: 'Force-plate runways, indoor sprint lanes, and recovery bays',
      desc: 'Calibrated timing gates and court sensors capture ground-contact symmetry without bulky wearable straps during Monday and Thursday sessions.',
      statA: '400 Hz plates',
      statB: '6 sprint lanes',
      statC: 'Climate controlled',
    },
    {
      tag: 'Pillar 03 / Personalization',
      title: 'Weekly training load tuned to sleep and recovery markers',
      desc: 'Each workout block adjusts interval volume and carbohydrate windows automatically whenever overnight recovery dips below your baseline.',
      statA: '4 blocks / wk',
      statB: 'Daily fuel plan',
      statC: 'Auto-scaled volume',
    },
    {
      tag: 'Pillar 04 / Outcomes',
      title: 'Consistent 12-week adherence backed by audited member logs',
      desc: 'Clear weekly milestones keep beginners injury-free while lifting sprint output and aerobic recovery rates for returning competitors.',
      statA: '94.2% completion',
      statB: '-6.4 bpm RHR',
      statC: '480 audited blocks',
    },
    {
      tag: 'Pillar 05 / Progression',
      title: 'Structured pathways from Monday Beginners to Thursday Advanced',
      desc: 'Start with joint stability and pacing control, then advance seamlessly into high-velocity agility blocks as technique benchmarks clear.',
      statA: '2 core tracks',
      statB: '12-wk cycles',
      statC: 'Direct coach review',
    },
  ];

  const selectPillar = (index) => {
    const idx = Math.max(0, Math.min(PILLARS.length - 1, Number(index)));
    const data = PILLARS[idx];

    if (heroPillarsContainer) {
      heroPillarsContainer.style.setProperty('--active-pillar', String(idx));
    }

    heroPillars.forEach((btn, i) => {
      const active = i === idx;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    serviceTabs.forEach((tab, i) => {
      const active = i === idx;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });

    const tagEl = document.getElementById('pillar-tag');
    const titleEl = document.getElementById('pillar-title');
    const descEl = document.getElementById('pillar-desc');
    const statAEl = document.getElementById('pillar-stat-a');
    const statBEl = document.getElementById('pillar-stat-b');
    const statCEl = document.getElementById('pillar-stat-c');

    if (tagEl) tagEl.textContent = data.tag;
    if (titleEl) titleEl.textContent = data.title;
    if (descEl) descEl.textContent = data.desc;
    if (statAEl) statAEl.textContent = data.statA;
    if (statBEl) statBEl.textContent = data.statB;
    if (statCEl) statCEl.textContent = data.statC;
  };

  heroPillars.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectPillar(btn.dataset.pillar || '0');
    });
  });

  serviceTabs.forEach((tab, idx) => {
    tab.addEventListener('click', () => {
      selectPillar(tab.dataset.pillar || String(idx));
    });

    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
      event.preventDefault();
      const delta = event.key === 'ArrowDown' ? 1 : -1;
      const nextIdx = (idx + delta + serviceTabs.length) % serviceTabs.length;
      serviceTabs[nextIdx].focus();
      selectPillar(nextIdx);
    });
  });

  // Trial & Demo Form
  demoForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const nameInput = document.getElementById('pm-name');
    const emailInput = document.getElementById('pm-email');
    const name = nameInput?.value.trim() || '';
    const email = emailInput?.value.trim() || '';
    const cohort = cohortSelect?.value || 'Mondays · Beginners';

    if (name.length < 2) {
      if (formError) {
        formError.textContent = 'Enter your full name to reserve a cohort slot.';
        formError.hidden = false;
      }
      nameInput?.focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      if (formError) {
        formError.textContent = 'Enter a valid email address for session confirmation.';
        formError.hidden = false;
      }
      emailInput?.focus();
      return;
    }

    if (formError) formError.hidden = true;
    demoForm.hidden = true;
    if (demoDone && doneTitle && doneSummary) {
      doneTitle.textContent = `Spot reserved for ${name}`;
      doneSummary.textContent = `${cohort} confirmation and onboarding check-in sent to ${email}.`;
      demoDone.hidden = false;
    }
  });

  demoReset?.addEventListener('click', () => {
    demoForm?.reset();
    if (demoDone) demoDone.hidden = true;
    if (demoForm) demoForm.hidden = false;
    document.getElementById('pm-name')?.focus();
  });

  // Scroll reveal observer
  const reveals = [...document.querySelectorAll('.reveal')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
