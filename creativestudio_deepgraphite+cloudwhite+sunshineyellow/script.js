(() => {
  'use strict';

  /* =========================================================
     1. HERO SPOTLIGHT SWITCHER (01 / 02 / 03)
     ========================================================= */
  const SLIDES = [
    {
      num: '01',
      eyebrow: 'DREAM · PLAN · ACHIEVE',
      line1: 'Turn Ideas',
      line2Lead: 'Into',
      line2Accent: 'Impact.',
      subtext: 'A space to think deeper, create bolder, and grow further.',
      dotOffset: '0px',
    },
    {
      num: '02',
      eyebrow: 'SPACE · LIGHT · SILENCE',
      line1: 'Shape Form',
      line2Lead: 'Into',
      line2Accent: 'Story.',
      subtext: 'Architectural film, identity systems, and quiet brand conviction.',
      dotOffset: '35px',
    },
    {
      num: '03',
      eyebrow: 'ZURICH · LONDON · 2027',
      line1: 'Build Work',
      line2Lead: 'That',
      line2Accent: 'Lasts.',
      subtext: 'Four partner engagements each quarter for founders with sharp intent.',
      dotOffset: '70px',
    },
  ];

  let slideIdx = 0;
  const elEyebrow = document.getElementById('hero-eyebrow');
  const elLine1 = document.getElementById('hero-line-1');
  const elLine2Lead = document.getElementById('hero-line-2-lead');
  const elLine2Accent = document.getElementById('hero-line-2-accent');
  const elSubtext = document.getElementById('hero-subtext');
  const elSlideCurrent = document.getElementById('slide-current');
  const elRailDot = document.getElementById('hero-rail-dot');
  const btnPrev = document.getElementById('slide-prev');
  const btnNext = document.getElementById('slide-next');

  function renderSlide(idx) {
    const s = SLIDES[idx];
    if (!s) return;
    elEyebrow.textContent = s.eyebrow;
    elLine1.textContent = s.line1;
    elLine2Lead.textContent = s.line2Lead;
    elLine2Accent.textContent = s.line2Accent;
    elSubtext.textContent = s.subtext;
    elSlideCurrent.textContent = s.num;
    elRailDot.style.transform = `translate(-50%, ${s.dotOffset})`;
  }

  btnPrev?.addEventListener('click', () => {
    slideIdx = (slideIdx - 1 + SLIDES.length) % SLIDES.length;
    renderSlide(slideIdx);
  });

  btnNext?.addEventListener('click', () => {
    slideIdx = (slideIdx + 1) % SLIDES.length;
    renderSlide(slideIdx);
  });

  /* =========================================================
     2. MOBILE / STUDIO NAVIGATION DRAWER
     ========================================================= */
  const drawer = document.getElementById('nav-drawer');
  const drawerBackdrop = document.getElementById('nav-drawer-backdrop');
  const menuOpenBtn = document.getElementById('menu-open');
  const drawerCloseBtn = document.getElementById('drawer-close');
  const drawerLinks = document.querySelectorAll('.drawer-link');
  const drawerJourneyBtn = document.getElementById('drawer-journey-btn');

  function openDrawer() {
    drawer.hidden = false;
    drawerBackdrop.hidden = false;
    drawer.setAttribute('aria-hidden', 'false');
    menuOpenBtn.setAttribute('aria-expanded', 'true');
    drawerCloseBtn.focus();
  }

  function closeDrawer() {
    drawer.hidden = true;
    drawerBackdrop.hidden = true;
    drawer.setAttribute('aria-hidden', 'true');
    menuOpenBtn.setAttribute('aria-expanded', 'false');
  }

  menuOpenBtn?.addEventListener('click', openDrawer);
  drawerCloseBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);
  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  /* =========================================================
     3. TOP NAV ACTIVE INDICATOR ON SCROLL
     ========================================================= */
  const navLinks = document.querySelectorAll('.top-nav-link');

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.forEach((l) => l.classList.toggle('is-active', l === link));
    });
  });

  /* =========================================================
     4. WATCH THE JOURNEY MODAL
     ========================================================= */
  const journeyModal = document.getElementById('journey-modal');
  const journeyBackdrop = document.getElementById('journey-modal-backdrop');
  const watchJourneyBtn = document.getElementById('watch-journey-btn');
  const journeyCloseBtn = document.getElementById('journey-close');
  const journeyChapBtns = document.querySelectorAll('.journey-chap-btn');
  const journeyTimecode = document.getElementById('journey-timecode');
  const journeyActLabel = document.getElementById('journey-act-label');
  const journeyTitle = document.getElementById('journey-modal-title');
  const journeyDesc = document.getElementById('journey-act-desc');
  const journeyProgress = document.getElementById('journey-progress-fill');

  const JOURNEY_ACTS = [
    {
      time: '00:14 / 02:40',
      label: 'ACT 01 · DREAM',
      title: 'Quiet rooms produce sharp convictions',
      desc: 'We begin every engagement in stillness: stripping away inherited visual habits until only the necessary structural idea remains.',
      width: '33.33%',
    },
    {
      time: '01:08 / 02:40',
      label: 'ACT 02 · PLAN',
      title: 'Frame the geometry before shooting a single roll',
      desc: 'Every film treatment, spatial grid, and typographic hierarchy is mapped to exact architectural proportions.',
      width: '66.66%',
    },
    {
      time: '02:02 / 02:40',
      label: 'ACT 03 · ACHIEVE',
      title: 'Ship work built to hold up ten years later',
      desc: 'Production code, 16mm cinema masters, and living identity manuals delivered ready for global launch.',
      width: '100%',
    },
  ];

  function setJourneyAct(idx) {
    const act = JOURNEY_ACTS[idx];
    if (!act) return;
    journeyTimecode.textContent = act.time;
    journeyActLabel.textContent = act.label;
    journeyTitle.textContent = act.title;
    journeyDesc.textContent = act.desc;
    journeyProgress.style.width = act.width;

    journeyChapBtns.forEach((btn, i) => {
      const selected = i === idx;
      btn.classList.toggle('is-active', selected);
      btn.setAttribute('aria-selected', String(selected));
    });
  }

  function openJourneyModal() {
    closeDrawer();
    journeyModal.hidden = false;
    journeyBackdrop.hidden = false;
    setJourneyAct(0);
    journeyCloseBtn.focus();
  }

  function closeJourneyModal() {
    journeyModal.hidden = true;
    journeyBackdrop.hidden = true;
  }

  watchJourneyBtn?.addEventListener('click', openJourneyModal);
  drawerJourneyBtn?.addEventListener('click', openJourneyModal);
  journeyCloseBtn?.addEventListener('click', closeJourneyModal);
  journeyBackdrop?.addEventListener('click', closeJourneyModal);

  journeyChapBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      setJourneyAct(Number(btn.dataset.chap));
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!journeyModal.hidden) closeJourneyModal();
      if (!drawer.hidden) closeDrawer();
      if (!essayDrawer.hidden) closeEssayDrawer();
    }
  });

  /* =========================================================
     5. CHAPTER 1: THREE-PHASE PRACTICE TABS
     ========================================================= */
  const PHASES = {
    dream: {
      discipline: 'BRAND STRATEGY & THESIS',
      subtitle: 'Isolate the one position worth holding for ten years',
      copy: 'Before touching type or cameras, we strip away market imitation. We interview founders, inspect physical artifacts, and write a single-page positioning charter that governs every creative choice downstream.',
      code: 'PHASE 01 · SPECIFICATION',
      location: 'ZURICH LAB',
      output: '28-page Thesis Charter',
      cadence: '04 Weeks',
      lead: 'Research & Editorial Strategy',
      metric: '48h Synthesis',
      deliverables: [
        { name: 'Founder & Field Dossier', weeks: 'Weeks 01–02' },
        { name: 'Category Contrast Audit', weeks: 'Weeks 02–03' },
        { name: 'Core Verbal Architecture', weeks: 'Week 04' },
      ],
    },
    plan: {
      discipline: 'SPATIAL FILM & ART DIRECTION',
      subtitle: 'Choreograph light, pace, and visual tension before production',
      copy: 'We build physical lighting studies, architectural storyboards, and typographic specimens. Every frame and screen is tested against real viewing distances before a full production crew steps onto set.',
      code: 'PHASE 02 · SPECIFICATION',
      location: 'LONDON STUDIO',
      output: '14-Frame Film & UI Blueprint',
      cadence: '05 Weeks',
      lead: 'Spatial Direction & Type',
      metric: '100% Grid Lock',
      deliverables: [
        { name: 'Single-Source Lighting Study', weeks: 'Weeks 01–02' },
        { name: 'Editorial & Motion Storyboard', weeks: 'Weeks 03–04' },
        { name: 'Design Token Architecture', weeks: 'Week 05' },
      ],
    },
    achieve: {
      discipline: 'IDENTITY SYSTEMS & LAUNCH',
      subtitle: 'Deliver living brand systems and finished cinema assets',
      copy: 'From principal photography and color grading to accessible web architecture, we deliver documented tokens, motion curves, and master film reels ready for internal teams to operate independently.',
      code: 'PHASE 03 · SPECIFICATION',
      location: 'ZURICH · LONDON',
      output: 'Complete Brand & Web Release',
      cadence: '06 Weeks',
      lead: 'Systems Engineering & Film',
      metric: '0.0s Drift QA',
      deliverables: [
        { name: '4K Master Film & Stills', weeks: 'Weeks 01–03' },
        { name: 'Interactive Web Flagship', weeks: 'Weeks 03–05' },
        { name: 'Team Handoff & Manual', weeks: 'Week 06' },
      ],
    },
  };

  const practiceTabs = document.querySelectorAll('.practice-tab');
  const phasePanel = document.getElementById('phase-panel');
  const elPhaseDiscipline = document.getElementById('phase-discipline');
  const elPhaseSubtitle = document.getElementById('phase-subtitle');
  const elPhaseCopy = document.getElementById('phase-copy');
  const elPhaseDeliverables = document.getElementById('phase-deliverables');
  const elPhaseCode = document.getElementById('phase-code');
  const elPhaseLocation = document.getElementById('phase-location');
  const elSpecOutput = document.getElementById('spec-output');
  const elSpecCadence = document.getElementById('spec-cadence');
  const elSpecLead = document.getElementById('spec-lead');
  const elSpecMetric = document.getElementById('spec-metric');

  function renderPhase(key, triggerId) {
    const p = PHASES[key];
    if (!p) return;

    elPhaseDiscipline.textContent = p.discipline;
    elPhaseSubtitle.textContent = p.subtitle;
    elPhaseCopy.textContent = p.copy;
    elPhaseCode.textContent = p.code;
    elPhaseLocation.textContent = p.location;
    elSpecOutput.textContent = p.output;
    elSpecCadence.textContent = p.cadence;
    elSpecLead.textContent = p.lead;
    elSpecMetric.textContent = p.metric;

    elPhaseDeliverables.innerHTML = '';
    p.deliverables.forEach((d) => {
      const row = document.createElement('div');
      row.className = 'deliverable-row';
      const name = document.createElement('span');
      name.className = 'deliverable-name';
      name.textContent = d.name;
      const weeks = document.createElement('span');
      weeks.className = 'deliverable-weeks mono-num';
      weeks.textContent = d.weeks;
      row.append(name, weeks);
      elPhaseDeliverables.appendChild(row);
    });

    if (triggerId) {
      phasePanel.setAttribute('aria-labelledby', triggerId);
    }
  }

  practiceTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      practiceTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      renderPhase(tab.dataset.phase, tab.id);
    });
  });

  /* =========================================================
     6. CHAPTER 2: FIELD JOURNAL FILTER & ESSAY READER
     ========================================================= */
  const ESSAYS = [
    {
      id: '01',
      category: 'Strategy',
      time: '06 min read',
      title: 'Why Subtraction Outlasts Visual Noise',
      quote: 'When a page carries only three deliberate elements, each element has to justify its existence.',
      paragraphs: [
        'Most creative platforms fail not from lack of craft, but from accumulation. Over a twelve-month cycle, teams bolt on badges, secondary banners, and decorative borders until the founding conviction disappears beneath chrome.',
        'At Impact, we begin every identity audit by printing the entire digital surface at 1:1 scale and crossing out seventy percent of interface weight. What survives the cut becomes the structural spine of the brand.',
      ],
    },
    {
      id: '02',
      category: 'Film',
      time: '08 min read',
      title: 'Single-Source Lighting in Architectural Cinema',
      quote: 'A single hard shaft of warm daylight creates more spatial depth than a truckload of diffused LED panels.',
      paragraphs: [
        'Board-formed concrete reveals its grain only when struck at an oblique angle. Flattening a room with ambient bounce turns architectural space into generic studio backdrop.',
        'For our recent Zurich film study, we waited four hours for the sun to align with a high clerestory slit, letting eighty percent of the frame drop into true graphite shadow while one diagonal beam carried the entire narrative tension.',
      ],
    },
    {
      id: '03',
      category: 'Type',
      time: '05 min read',
      title: 'Setting Quiet Hierarchy at Editorial Scale',
      quote: 'Weight contrast between 400 and 600 reads as certainty; over-tracking small labels reads as hesitation.',
      paragraphs: [
        'Display headlines rarely need multiple font families to create emphasis. Stepping a single geometric sans from regular 400 into semibold 600 on the final payoff word directs the eye in under a hundred milliseconds.',
        'Pairing that disciplined sans scale with tabular monospace indices anchors timelines, reading durations, and studio coordinates without competing for display attention.',
      ],
    },
    {
      id: '04',
      category: 'Strategy',
      time: '07 min read',
      title: 'Designing Brands That Age Like Board-Formed Concrete',
      quote: 'Trends expire in eighteen months; proportion and material honesty remain legible after twenty years.',
      paragraphs: [
        'Founders often confuse novelty with positioning. An identity built on transient gradients needs constant re-skinning to avoid looking dated.',
        'By anchoring color palettes to physical studio environments—graphite plaster, unbleached paper, and warm directional light—a system absorbs new products and decades of growth without losing coherence.',
      ],
    },
  ];

  const filterChips = document.querySelectorAll('.filter-chip');
  const journalRows = document.querySelectorAll('.journal-row');
  const essayTriggers = document.querySelectorAll('[data-essay-trigger]');
  const essayDrawer = document.getElementById('essay-drawer');
  const readerNum = document.getElementById('reader-num');
  const readerCat = document.getElementById('reader-cat');
  const readerTime = document.getElementById('reader-time');
  const readerTitle = document.getElementById('reader-title');
  const readerQuote = document.getElementById('reader-quote');
  const readerBody = document.getElementById('reader-body');
  const readerPrev = document.getElementById('reader-prev');
  const readerNext = document.getElementById('reader-next');
  const readerClose = document.getElementById('reader-close');
  let activeEssayIndex = 0;

  filterChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      const cat = chip.dataset.filter;
      filterChips.forEach((c) => {
        const active = c === chip;
        c.classList.toggle('is-active', active);
        c.setAttribute('aria-selected', String(active));
      });
      journalRows.forEach((row) => {
        const match = cat === 'all' || row.dataset.category === cat;
        row.hidden = !match;
      });
    });
  });

  function openEssayByIndex(idx) {
    const essay = ESSAYS[idx];
    if (!essay) return;
    activeEssayIndex = idx;
    readerNum.textContent = essay.id;
    readerCat.textContent = essay.category;
    readerTime.textContent = essay.time;
    readerTitle.textContent = essay.title;
    readerQuote.textContent = essay.quote;
    readerBody.innerHTML = '';
    essay.paragraphs.forEach((txt) => {
      const p = document.createElement('p');
      p.textContent = txt;
      readerBody.appendChild(p);
    });
    essayDrawer.hidden = false;
  }

  function closeEssayDrawer() {
    essayDrawer.hidden = true;
  }

  essayTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.essayTrigger;
      const idx = ESSAYS.findIndex((e) => e.id === id);
      if (idx !== -1) {
        openEssayByIndex(idx);
        essayDrawer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });

  readerPrev?.addEventListener('click', () => {
    openEssayByIndex((activeEssayIndex - 1 + ESSAYS.length) % ESSAYS.length);
  });

  readerNext?.addEventListener('click', () => {
    openEssayByIndex((activeEssayIndex + 1) % ESSAYS.length);
  });

  readerClose?.addEventListener('click', closeEssayDrawer);

  /* =========================================================
     7. CHAPTER 3: PROJECT BRIEF FORM & CONFIRMATION
     ========================================================= */
  const briefForm = document.getElementById('brief-form');
  const briefConfirmed = document.getElementById('brief-confirmed');
  const briefError = document.getElementById('brief-error');
  const briefReset = document.getElementById('brief-reset');
  const confirmedTitle = document.getElementById('confirmed-title');
  const confirmedCopy = document.getElementById('confirmed-copy');
  const confirmedSummary = document.getElementById('confirmed-summary');

  const briefState = {
    discipline: 'Brand Strategy',
    quarter: 'Q1 2027',
    budget: '$30k–$55k',
  };

  document.querySelectorAll('.choice-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const field = chip.dataset.field;
      const value = chip.dataset.value;
      briefState[field] = value;

      const siblings = chip.parentElement.querySelectorAll('.choice-chip');
      siblings.forEach((s) => {
        const selected = s === chip;
        s.classList.toggle('is-selected', selected);
        s.setAttribute('aria-checked', String(selected));
      });
    });
  });

  briefForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('brief-name');
    const emailInput = document.getElementById('brief-email');
    const notesInput = document.getElementById('brief-notes');

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const notes = notesInput.value.trim();

    if (!name || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !notes) {
      briefError.textContent = 'Please complete your name, a valid work email, and brief project context.';
      briefError.hidden = false;
      return;
    }

    briefError.hidden = true;
    confirmedTitle.textContent = `Thank you, ${name}. Your brief is on our desk.`;
    confirmedCopy.textContent = `Our Zurich and London principals will review your ${briefState.discipline.toLowerCase()} note and reply to ${email} within 48 hours.`;

    confirmedSummary.innerHTML = '';
    const rows = [
      ['Discipline', briefState.discipline],
      ['Target Quarter', briefState.quarter],
      ['Estimated Scope', briefState.budget],
      ['Contact', email],
    ];
    rows.forEach(([k, v]) => {
      const row = document.createElement('div');
      row.className = 'confirmed-summary-row';
      const dt = document.createElement('dt');
      dt.textContent = k;
      const dd = document.createElement('dd');
      dd.textContent = v;
      row.append(dt, dd);
      confirmedSummary.appendChild(row);
    });

    briefForm.hidden = true;
    briefConfirmed.hidden = false;
  });

  briefReset?.addEventListener('click', () => {
    briefForm.reset();
    briefConfirmed.hidden = true;
    briefForm.hidden = false;
  });

  /* =========================================================
     8. SCROLL REVEAL OBSERVER
     ========================================================= */
  const revealNodes = document.querySelectorAll('.reveal');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealNodes.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealObs = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );

    requestAnimationFrame(() => {
      revealNodes.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          el.classList.add('is-visible');
        } else {
          revealObs.observe(el);
        }
      });
    });
  }
})();
