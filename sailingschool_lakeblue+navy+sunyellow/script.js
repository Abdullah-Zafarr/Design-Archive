(() => {
  const COURSES = {
    beginner: {
      code: 'LEVEL 01 · MON–FRI',
      name: 'Beginner Dinghy',
      desc: 'Learn rigging, tacking, gybing, and capsize recovery aboard stable double-handed dinghies in steady afternoon Ora wind.',
      boat: 'Laser Bahia',
      wind: 'Ora 13:00–18:00',
      ratio: '4 boats : 1 coach',
      fee: '€420 / week',
      buttonLabel: 'Reserve Beginner Dinghy',
      syllabus: [
        { day: 'MON', title: 'Rig & Balance', text: 'On-shore rigging check, rudder control, and reach-to-reach turns inside the bay.' },
        { day: 'TUE', title: 'Upwind Tacks', text: 'Tell-tale trim, roll-tacking cadence, and clean beats into the southerly swell.' },
        { day: 'WED', title: 'Gybe & Recovery', text: 'Controlled boom crossings in 14 knots plus dry-bag capsize drill beside the RIB.' },
        { day: 'THU', title: 'Limone Crossing', text: '4.2 nm channel crossing along the western limestone cliffs with coach escort.' },
        { day: 'FRI', title: 'Triangle Course', text: 'Three short windward-leeward heats followed by video review on the terrace.' },
      ],
    },
    spinnaker: {
      code: 'LEVEL 02 · MON–FRI',
      name: 'Genaker & Spinnaker',
      desc: 'Master single-line asymmetric hoists, twin-wire trapeze balance, and high-speed downwind planing across the northern basin.',
      boat: 'RS Feva',
      wind: 'Ora 13:00–18:00',
      ratio: '3 boats : 1 coach',
      fee: '€490 / week',
      buttonLabel: 'Reserve Genaker & Spinnaker',
      syllabus: [
        { day: 'MON', title: 'Bowsprit Setup', text: 'Halyard tension, tack-line calibration, and smooth kite hoists on broad reaches.' },
        { day: 'TUE', title: 'Planing Angles', text: 'Surfing 16-knot Ora wave sets while keeping apparent wind forward of the beam.' },
        { day: 'WED', title: 'Hot Gybes', text: 'Synchronized helm-and-crew kite crossings with zero hull stall at the mark.' },
        { day: 'THU', title: 'Malcesine Run', text: '6.5 nm downwind sprint along the eastern escarpment and beat back to pier.' },
        { day: 'FRI', title: 'Gate Drops', text: 'High-speed leeward mark takedowns and clean roundings under boat-on-boat pressure.' },
      ],
    },
    regatta: {
      code: 'LEVEL 03 · MON–FRI',
      name: 'Regatta Clinic',
      desc: 'Train start-line time-on-distance, tactical wind shifts off the cliffs, and 45 m² spinnaker sets in morning Peler and afternoon Ora.',
      boat: 'J/70',
      wind: 'Peler 07:00–11:00 & Ora 13:00–18:00',
      ratio: '3 boats : 1 coach',
      fee: '€580 / week',
      buttonLabel: 'Reserve Regatta Clinic',
      syllabus: [
        { day: 'MON', title: 'Line Bias & Starts', text: 'Sighting transits, holding station in 18-knot Peler, and first-beat lane defense.' },
        { day: 'TUE', title: 'Cliff Lift Reading', text: 'Playing Ponale wall pressure bands versus mid-lake current on upwind legs.' },
        { day: 'WED', title: 'Spinnaker Sets', text: 'Bear-away and gybe sets in tight packs with onboard GPS speed telemetry.' },
        { day: 'THU', title: 'Fleet Rules', text: 'Zone-entry mark overlaps, luffing rights, and penalty turns cleanly executed.' },
        { day: 'FRI', title: 'Scored Series', text: 'Five back-to-back fleet races with stern-mounted GoPro tactical breakdown.' },
      ],
    },
  };

  // Header scroll state
  const header = document.getElementById('site-header');
  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Mobile & hamburger navigation drawer
  const menuToggle = document.getElementById('menu-toggle');
  const drawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerLinks = drawer ? [...drawer.querySelectorAll('[data-drawer-link]')] : [];
  const drawerBackdrop = drawer ? drawer.querySelector('[data-close-drawer]') : null;

  const setDrawerOpen = (open) => {
    if (!drawer || !menuToggle) return;
    drawer.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open && drawerClose) {
      drawerClose.focus();
    } else if (!open) {
      menuToggle.focus();
    }
  };

  menuToggle?.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    setDrawerOpen(!isExpanded);
  });
  drawerClose?.addEventListener('click', () => setDrawerOpen(false));
  drawerBackdrop?.addEventListener('click', () => setDrawerOpen(false));
  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => setDrawerOpen(false));
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && !drawer.hidden) {
      setDrawerOpen(false);
    }
  });

  // Course tabs
  const tabs = [...document.querySelectorAll('.course-tab')];
  const panel = document.getElementById('panel-course');
  const courseCode = document.getElementById('course-code');
  const courseName = document.getElementById('course-name');
  const courseDesc = document.getElementById('course-desc');
  const specBoat = document.getElementById('spec-boat');
  const specWind = document.getElementById('spec-wind');
  const specRatio = document.getElementById('spec-ratio');
  const specFee = document.getElementById('spec-fee');
  const syllabusGrid = document.getElementById('syllabus-grid');
  const courseSelectBtn = document.getElementById('course-select-btn');
  const bookingTierSelect = document.getElementById('booking-tier');

  const renderCourse = (key) => {
    const data = COURSES[key];
    if (!data || !panel) return;

    tabs.forEach((tab) => {
      const active = tab.dataset.course === key;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      if (active) panel.setAttribute('aria-labelledby', tab.id);
    });

    if (courseCode) courseCode.textContent = data.code;
    if (courseName) courseName.textContent = data.name;
    if (courseDesc) courseDesc.textContent = data.desc;
    if (specBoat) specBoat.textContent = data.boat;
    if (specWind) specWind.textContent = data.wind;
    if (specRatio) specRatio.textContent = data.ratio;
    if (specFee) specFee.textContent = data.fee;
    if (courseSelectBtn) {
      courseSelectBtn.dataset.selectTier = key;
      const svg = courseSelectBtn.querySelector('svg');
      courseSelectBtn.textContent = `${data.buttonLabel} `;
      if (svg) courseSelectBtn.appendChild(svg);
    }

    if (syllabusGrid) {
      syllabusGrid.replaceChildren(
        ...data.syllabus.map((item) => {
          const article = document.createElement('article');
          article.className = 'syllabus-cell';

          const day = document.createElement('span');
          day.className = 'syllabus-day mono-meta';
          day.textContent = item.day;

          const h4 = document.createElement('h4');
          h4.textContent = item.title;

          const p = document.createElement('p');
          p.textContent = item.text;

          article.append(day, h4, p);
          return article;
        })
      );
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      renderCourse(tab.dataset.course);
    });
  });

  courseSelectBtn?.addEventListener('click', () => {
    const tier = courseSelectBtn.dataset.selectTier || 'beginner';
    if (bookingTierSelect) bookingTierSelect.value = tier;
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
    document.getElementById('booking-email')?.focus({ preventScroll: true });
  });

  // Booking form validation & confirmation state
  const form = document.getElementById('booking-form');
  const emailInput = document.getElementById('booking-email');
  const mondaySelect = document.getElementById('booking-monday');
  const expSelect = document.getElementById('booking-exp');
  const errorEl = document.getElementById('booking-error');
  const confirmedBox = document.getElementById('booking-confirmed');
  const resetBtn = document.getElementById('booking-reset');

  const confirmedRef = document.getElementById('confirmed-ref');
  const confirmedEmail = document.getElementById('confirmed-email');
  const confirmedTier = document.getElementById('confirmed-tier');
  const confirmedMonday = document.getElementById('confirmed-monday');
  const confirmedExp = document.getElementById('confirmed-exp');
  const confirmedFee = document.getElementById('confirmed-fee');

  const showError = (msg) => {
    if (!errorEl) return;
    errorEl.textContent = msg;
    errorEl.hidden = false;
  };

  const clearError = () => {
    if (!errorEl) return;
    errorEl.textContent = '';
    errorEl.hidden = true;
  };

  emailInput?.addEventListener('input', clearError);

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = (emailInput?.value || '').trim();
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

    if (!emailValid) {
      showError('Enter a valid email address to receive your Monday rigging brief.');
      emailInput?.focus();
      return;
    }

    clearError();
    const tierKey = bookingTierSelect?.value || 'beginner';
    const tierData = COURSES[tierKey] || COURSES.beginner;
    const mondayText = mondaySelect?.options[mondaySelect.selectedIndex]?.text.split(' (')[0] || '';
    const expText = expSelect?.options[expSelect.selectedIndex]?.text || '';
    const refCode = `ORA-${String(Math.floor(100 + Math.random() * 899))}`;

    if (confirmedRef) confirmedRef.textContent = `BERTH HELD · ${refCode}`;
    if (confirmedEmail) confirmedEmail.textContent = email;
    if (confirmedTier) confirmedTier.textContent = tierData.name;
    if (confirmedMonday) confirmedMonday.textContent = mondayText;
    if (confirmedExp) confirmedExp.textContent = expText;
    if (confirmedFee) confirmedFee.textContent = tierData.fee;

    form.hidden = true;
    if (confirmedBox) confirmedBox.hidden = false;
  });

  resetBtn?.addEventListener('click', () => {
    if (confirmedBox) confirmedBox.hidden = true;
    if (form) {
      form.hidden = false;
      form.reset();
    }
    emailInput?.focus();
  });

  // Scroll reveals
  const revealTargets = [...document.querySelectorAll('.reveal')];
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
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
    revealTargets.forEach((el) => observer.observe(el));
  }
})();
