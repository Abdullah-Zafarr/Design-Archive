(() => {
  const COURSES = {
    cloudline: {
      name: 'Cloudline Highlands',
      region: 'Dolomites · 46.5405° N, 11.8742° E',
      window: 'May – October',
      desc: 'Perched above the valley inversion line on limestone plateaus, Cloudline trades flat target golf for cross-canyon carries and firm bentgrass greens.',
      par: '72',
      yardage: '7,140 yds',
      slope: 142,
      elevation: '1,840 m',
      stimp: 'Green speed 11.4 Stimp · Walking only',
      netClimb: '+210 m net climb',
      startElev: 'Hole 1 · 1,690 m',
      peakElev: 'Summit Hole 12 · 1,840 m',
      endElev: 'Clubhouse · 1,735 m',
      points: [185, 168, 152, 164, 134, 112, 126, 86, 66, 92, 54, 48, 78, 108, 96, 128, 146, 138],
      wind: '12 kt NW',
      sigHole: 'Hole 12 · 198 yds Par 3',
    },
    basalt: {
      name: 'Basalt Links',
      region: 'Reykjanes · 63.8804° N, 22.4495° W',
      window: 'April – November',
      desc: 'Carved across dark volcanic ridge shelves and moss-lined lava troughs, Basalt rewards low penetrating flight paths and creative bump-and-run approaches.',
      par: '71',
      yardage: '6,890 yds',
      slope: 136,
      elevation: '620 m',
      stimp: 'Green speed 10.8 Stimp · Forecaddie led',
      netClimb: '+95 m shelf gain',
      startElev: 'Hole 1 · 545 m',
      peakElev: 'Ridge Hole 9 · 620 m',
      endElev: 'Clubhouse · 560 m',
      points: [172, 162, 148, 156, 138, 124, 114, 96, 82, 104, 118, 134, 122, 144, 152, 136, 158, 164],
      wind: '18 kt SW',
      sigHole: 'Hole 9 · 436 yds Par 4',
    },
    fjord: {
      name: 'Fjord Nine',
      region: 'Hardanger · 60.3712° N, 6.4628° E',
      window: 'May – September',
      desc: 'Nine dramatic cliffside holes suspended above deep-water granite inlets, built for brisk two-hour twilight loops and precision wedge play.',
      par: '35',
      yardage: '3,280 yds',
      slope: 128,
      elevation: '310 m',
      stimp: 'Green speed 11.0 Stimp · 9-Hole Loop',
      netClimb: '+65 m cliff rise',
      startElev: 'Hole 1 · 245 m',
      peakElev: 'Promontory Hole 6 · 310 m',
      endElev: 'Boathouse · 260 m',
      points: [188, 174, 146, 138, 110, 74, 94, 124, 166],
      wind: '9 kt NNE',
      sigHole: 'Hole 6 · 164 yds Par 3',
    },
  };

  const COURSE_KEYS = ['cloudline', 'basalt', 'fjord'];

  // Header condensation + active section link
  const header = document.getElementById('site-header');
  const navLinks = [...document.querySelectorAll('.nav-link')];

  function updateHeaderOnScroll() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  }
  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
  updateHeaderOnScroll();

  // Mobile drawer toggle
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      mobileDrawer.hidden = expanded;
    });
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileDrawer.hidden = true;
      });
    });
  }

  // Elevation SVG path builder
  const elevPath = document.getElementById('elevation-path');
  const elevArea = document.getElementById('elevation-area');
  const elevNodes = document.getElementById('elevation-nodes');

  function buildElevationChart(pts) {
    if (!elevPath || !elevArea || !elevNodes) return;
    const xStart = 32;
    const xEnd = 528;
    const yBottom = 210;
    const stepX = (xEnd - xStart) / Math.max(pts.length - 1, 1);

    const coords = pts.map((y, idx) => ({
      x: Math.round(xStart + idx * stepX),
      y,
      hole: idx + 1,
    }));

    let d = `M ${coords[0].x} ${coords[0].y}`;
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const curr = coords[i];
      const midX = Math.round((prev.x + curr.x) / 2);
      d += ` C ${midX} ${prev.y}, ${midX} ${curr.y}, ${curr.x} ${curr.y}`;
    }

    const areaD = `${d} L ${coords[coords.length - 1].x} ${yBottom} L ${coords[0].x} ${yBottom} Z`;
    elevPath.setAttribute('d', d);
    elevArea.setAttribute('d', areaD);

    let peakIdx = 0;
    coords.forEach((c, idx) => {
      if (c.y < coords[peakIdx].y) peakIdx = idx;
    });

    elevNodes.innerHTML = coords
      .map((c, idx) => {
        const isPeak = idx === peakIdx;
        const r = isPeak ? 5.5 : 3;
        const fill = isPeak ? '#B9F12F' : '#F2F0E9';
        const ring = isPeak ? `<circle cx="${c.x}" cy="${c.y}" r="10" fill="none" stroke="#B9F12F" stroke-opacity="0.45" stroke-width="1.5" />` : '';
        return `${ring}<circle cx="${c.x}" cy="${c.y}" r="${r}" fill="${fill}" />`;
      })
      .join('');
  }

  // Course tabs & Hero Stepper sync
  const courseTabs = [...document.querySelectorAll('.course-tab')];
  const stepperBtns = [...document.querySelectorAll('.stepper-btn')];
  const stepperReadout = document.getElementById('stepper-readout');

  function selectCourse(key) {
    const data = COURSES[key];
    if (!data) return;

    courseTabs.forEach((tab) => {
      const active = tab.dataset.course === key;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      if (active) {
        document.getElementById('course-panel')?.setAttribute('aria-labelledby', tab.id);
      }
    });

    const idx = COURSE_KEYS.indexOf(key);
    stepperBtns.forEach((btn, bIdx) => {
      const active = bIdx === idx;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });

    if (stepperReadout) {
      const nameEl = stepperReadout.querySelector('.stepper-name');
      const metaEl = stepperReadout.querySelector('.stepper-meta');
      if (nameEl) nameEl.textContent = data.name;
      if (metaEl) metaEl.textContent = `${data.elevation} · Par ${data.par}`;
    }

    document.getElementById('course-region').textContent = data.region;
    document.getElementById('course-window').textContent = data.window;
    document.getElementById('course-name').textContent = data.name;
    document.getElementById('course-desc').textContent = data.desc;
    document.getElementById('spec-par').textContent = data.par;
    document.getElementById('spec-yardage').textContent = data.yardage;
    document.getElementById('spec-slope').textContent = String(data.slope);
    document.getElementById('spec-elevation').textContent = data.elevation;
    document.getElementById('course-stimp').textContent = data.stimp;
    document.getElementById('elevation-badge').textContent = data.netClimb;
    document.getElementById('elevation-start').textContent = data.startElev;
    document.getElementById('elevation-peak').textContent = data.peakElev;
    document.getElementById('elevation-end').textContent = data.endElev;

    buildElevationChart(data.points);
  }

  courseTabs.forEach((tab) => {
    tab.addEventListener('click', () => selectCourse(tab.dataset.course));
  });

  const heroStepper = document.querySelector('.hero-stepper');
  let stepperTimer = null;

  stepperBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const idx = Number(btn.dataset.step);
      selectCourse(COURSE_KEYS[idx] || 'cloudline');
      if (heroStepper) {
        heroStepper.classList.add('is-revealed');
        clearTimeout(stepperTimer);
        stepperTimer = setTimeout(() => heroStepper.classList.remove('is-revealed'), 2400);
      }
    });
  });

  document.querySelectorAll('[data-course-jump]').forEach((el) => {
    el.addEventListener('click', () => {
      selectCourse(el.dataset.courseJump);
    });
  });

  document.getElementById('course-reserve-btn')?.addEventListener('click', () => {
    const activeName = document.getElementById('course-name')?.textContent;
    const resCourse = document.getElementById('res-course');
    if (resCourse && activeName) resCourse.value = activeName;
  });

  selectCourse('cloudline');

  // Handicap & Tee-Time Availability Checker
  const chkCourse = document.getElementById('chk-course');
  const chkHandicap = document.getElementById('chk-handicap');
  const chkWindow = document.getElementById('chk-window');
  const outCourseHcp = document.getElementById('out-course-hcp');
  const outTees = document.getElementById('out-tees');
  const outCaddie = document.getElementById('out-caddie');
  const slotButtonsWrap = document.getElementById('slot-buttons');

  const WINDOWS = {
    dawn: ['06:35 · Open', '07:10 · 2 Spots', '07:55 · Open'],
    midday: ['11:15 · Open', '12:05 · 3 Spots', '13:00 · Open'],
    golden: ['15:40 · Open', '16:20 · 2 Spots', '17:05 · Open'],
  };

  function updateChecker() {
    if (!chkCourse || !chkHandicap || !chkWindow) return;
    const key = chkCourse.value;
    const data = COURSES[key] || COURSES.cloudline;
    const rawHcp = parseFloat(chkHandicap.value);
    const index = Number.isFinite(rawHcp) ? Math.min(36, Math.max(0, rawHcp)) : 8.5;

    const courseHcp = Math.round(index * (data.slope / 113));
    outCourseHcp.textContent = String(courseHcp);

    if (key === 'fjord') {
      outTees.textContent = index <= 8 ? 'Cliff Tees · 3,280 yds' : 'Fjord Tees · 2,940 yds';
    } else if (index <= 6) {
      outTees.textContent = `Back Tees · ${data.yardage}`;
    } else if (index <= 16) {
      outTees.textContent = 'Crest Tees · 6,620 yds';
    } else {
      outTees.textContent = 'Forward Tees · 5,980 yds';
    }

    outCaddie.textContent = index <= 10 ? 'Walking Forecaddie' : 'Single-Bag Master Caddie';

    const slots = WINDOWS[chkWindow.value] || WINDOWS.dawn;
    if (slotButtonsWrap) {
      slotButtonsWrap.innerHTML = slots
        .map((label, i) => {
          const timePart = label.split(' · ')[0];
          return `<button type="button" class="slot-btn${i === 1 ? ' is-selected' : ''}" data-slot="${timePart}" data-course-name="${data.name}">${label}</button>`;
        })
        .join('');

      slotButtonsWrap.querySelectorAll('.slot-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          slotButtonsWrap.querySelectorAll('.slot-btn').forEach((b) => b.classList.remove('is-selected'));
          btn.classList.add('is-selected');
          const resCourse = document.getElementById('res-course');
          const resSlot = document.getElementById('res-slot');
          if (resCourse) resCourse.value = btn.dataset.courseName;
          if (resSlot) resSlot.value = btn.dataset.slot;
          document.getElementById('visit')?.scrollIntoView({ behavior: 'smooth' });
        });
      });
    }
  }

  chkCourse?.addEventListener('change', updateChecker);
  chkHandicap?.addEventListener('input', updateChecker);
  chkWindow?.addEventListener('change', updateChecker);
  updateChecker();

  // Tier selection pre-fills visit notes
  document.querySelectorAll('[data-tier-select]').forEach((link) => {
    link.addEventListener('click', () => {
      const notes = document.getElementById('res-notes');
      if (notes) {
        notes.value = `${link.dataset.tierSelect} membership inquiry during visit`;
      }
    });
  });

  // Plan a Visit Form Validation + Receipt State
  const visitForm = document.getElementById('visit-form');
  const teeReceipt = document.getElementById('tee-receipt');
  const resDate = document.getElementById('res-date');

  if (resDate && !resDate.value) {
    const future = new Date(Date.now() + 7 * 86400000);
    resDate.value = future.toISOString().split('T')[0];
  }

  function setFieldError(inputId, errId, msg) {
    const input = document.getElementById(inputId);
    const err = document.getElementById(errId);
    if (input) input.setAttribute('aria-invalid', msg ? 'true' : 'false');
    if (err) err.textContent = msg;
  }

  visitForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('res-name').value.trim();
    const email = document.getElementById('res-email').value.trim();
    const dateVal = document.getElementById('res-date').value.trim();
    const slotVal = document.getElementById('res-slot').value.trim();

    let firstInvalid = null;

    if (name.length < 2) {
      setFieldError('res-name', 'err-name', 'Enter lead golfer full name.');
      firstInvalid = firstInvalid || document.getElementById('res-name');
    } else {
      setFieldError('res-name', 'err-name', '');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFieldError('res-email', 'err-email', 'Enter a valid email address.');
      firstInvalid = firstInvalid || document.getElementById('res-email');
    } else {
      setFieldError('res-email', 'err-email', '');
    }

    if (!dateVal) {
      setFieldError('res-date', 'err-date', 'Select a departure date.');
      firstInvalid = firstInvalid || document.getElementById('res-date');
    } else {
      setFieldError('res-date', 'err-date', '');
    }

    if (!/^\d{2}:\d{2}$/.test(slotVal)) {
      setFieldError('res-slot', 'err-slot', 'Use HH:MM format (e.g. 07:10).');
      firstInvalid = firstInvalid || document.getElementById('res-slot');
    } else {
      setFieldError('res-slot', 'err-slot', '');
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const courseVal = document.getElementById('res-course').value;
    const playersVal = document.getElementById('res-players').value;
    const caddieVal = document.getElementById('res-caddie').value;
    const refNum = `CR-2026-${String(Math.floor(1000 + Math.random() * 8999))}`;

    document.getElementById('rcpt-ref').textContent = refNum;
    document.getElementById('rcpt-course').textContent = courseVal;
    document.getElementById('rcpt-name').textContent = name;
    document.getElementById('rcpt-time').textContent = `${dateVal} · ${slotVal}`;
    document.getElementById('rcpt-players').textContent = playersVal;
    document.getElementById('rcpt-caddie').textContent = caddieVal;

    visitForm.hidden = true;
    teeReceipt.hidden = false;
  });

  document.getElementById('receipt-reset')?.addEventListener('click', () => {
    teeReceipt.hidden = true;
    visitForm.hidden = false;
    document.getElementById('res-name')?.focus();
  });

  // Experience Preview Modal
  const expModal = document.getElementById('experience-modal');
  const watchTrigger = document.getElementById('watch-trigger');
  const expClose = document.getElementById('exp-modal-close');
  const expTabs = [...document.querySelectorAll('.exp-tab')];
  let lastTrigger = null;

  function setExperienceChapter(idx) {
    const key = COURSE_KEYS[idx] || 'cloudline';
    const data = COURSES[key];
    document.getElementById('exp-modal-title').textContent = `Aerial Perspective · ${data.name}`;
    document.getElementById('exp-alt').textContent = data.elevation;
    document.getElementById('exp-wind').textContent = data.wind;
    document.getElementById('exp-hole').textContent = data.sigHole;
    expTabs.forEach((t, i) => t.classList.toggle('is-active', i === idx));
  }

  function openModal(modal, triggerEl, focusEl) {
    if (!modal) return;
    lastTrigger = triggerEl;
    modal.hidden = false;
    (focusEl || modal.querySelector('button'))?.focus();
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.hidden = true;
    lastTrigger?.focus();
  }

  watchTrigger?.addEventListener('click', () => {
    setExperienceChapter(0);
    openModal(expModal, watchTrigger, expClose);
  });

  expClose?.addEventListener('click', () => closeModal(expModal));
  expModal?.addEventListener('click', (e) => {
    if (e.target === expModal) closeModal(expModal);
  });

  expTabs.forEach((tab) => {
    tab.addEventListener('click', () => setExperienceChapter(Number(tab.dataset.exp)));
  });

  document.getElementById('exp-book-btn')?.addEventListener('click', () => {
    const activeTab = expTabs.find((t) => t.classList.contains('is-active'));
    const key = COURSE_KEYS[Number(activeTab?.dataset.exp || 0)];
    const resCourse = document.getElementById('res-course');
    if (resCourse && COURSES[key]) resCourse.value = COURSES[key].name;
    closeModal(expModal);
  });

  // Directory Search Modal
  const searchModal = document.getElementById('search-modal');
  const searchTrigger = document.getElementById('search-trigger');
  const searchClose = document.getElementById('search-modal-close');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');

  const SEARCH_ITEMS = [
    { label: 'Cloudline Highlands · Dolomites (1,840 m)', tag: 'Course 01', target: '#locations', course: 'cloudline' },
    { label: 'Basalt Links · Reykjanes (620 m)', tag: 'Course 02', target: '#locations', course: 'basalt' },
    { label: 'Fjord Nine · Hardanger (310 m)', tag: 'Course 03', target: '#locations', course: 'fjord' },
    { label: 'Founding Membership · Full Reciprocity', tag: '$18,500/yr', target: '#membership' },
    { label: 'Nomad Membership · 24 Annual Rounds', tag: '$9,200/yr', target: '#membership' },
    { label: 'House Membership · Single Sanctuary', tag: '$4,800/yr', target: '#membership' },
    { label: 'Handicap & Tee-Time Availability Checker', tag: 'Calculator', target: '#membership' },
    { label: 'Plan a Visit · Caddie & Tee Request', tag: 'Reservation', target: '#visit' },
  ];

  function renderSearch(query = '') {
    if (!searchResults) return;
    const q = query.trim().toLowerCase();
    const matches = SEARCH_ITEMS.filter((item) => item.label.toLowerCase().includes(q) || item.tag.toLowerCase().includes(q));
    if (!matches.length) {
      searchResults.innerHTML = `<li class="search-result-btn"><span>00 matches found for "${query.replace(/[<>"]/g, '')}"</span><span class="search-result-tag">Reset</span></li>`;
      return;
    }
    searchResults.innerHTML = matches
      .map(
        (m, i) => `<li><button type="button" class="search-result-btn" data-idx="${i}"><span>${m.label}</span><span class="search-result-tag">${m.tag}</span></button></li>`
      )
      .join('');
    searchResults.querySelectorAll('.search-result-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = matches[Number(btn.dataset.idx)];
        if (item.course) selectCourse(item.course);
        closeModal(searchModal);
        document.querySelector(item.target)?.scrollIntoView({ behavior: 'smooth' });
      });
    });
  }

  searchTrigger?.addEventListener('click', () => {
    renderSearch('');
    openModal(searchModal, searchTrigger, searchInput);
  });

  searchClose?.addEventListener('click', () => closeModal(searchModal));
  searchModal?.addEventListener('click', (e) => {
    if (e.target === searchModal) closeModal(searchModal);
  });
  searchInput?.addEventListener('input', (e) => renderSearch(e.target.value));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (expModal && !expModal.hidden) closeModal(expModal);
      if (searchModal && !searchModal.hidden) closeModal(searchModal);
    }
  });

  // Scroll Reveal Observer
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
      { threshold: 0.08, rootMargin: '0px 0px -32px 0px' }
    );
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  // Active Nav Section Highlight
  const sections = ['hero', 'locations', 'membership', 'visit']
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  window.addEventListener(
    'scroll',
    () => {
      const y = window.scrollY + 140;
      let current = 'hero';
      sections.forEach((sec) => {
        if (sec.offsetTop <= y) current = sec.id;
      });
      navLinks.forEach((link) => {
        const isCurrent = link.dataset.navSection === current && link.textContent !== 'Experiences';
        link.classList.toggle('is-active', isCurrent);
      });
    },
    { passive: true }
  );
})();
