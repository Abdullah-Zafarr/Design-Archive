'use strict';

const STUDIES = [
  {
    code: '01',
    eyebrow: 'LANDSCAPE STUDY 01',
    title: 'Study 01 · Steppe Monoliths',
    region: 'REYKJANES · AUTUMN EQUINOX',
    notes:
      'Four upright volcanic markers aligned along an abandoned coastal track. Shot across forty minutes of solar descent with locked exposure to trace how tall meadow grass absorbs remaining horizon warmth.',
    gps: '64.8012° N, 23.7194° W',
    stock: 'Vision3 500T 7219',
    plateStock: 'KODAK 500T',
    focal: '50 mm f/2.0',
    duration: '14m 28s',
    cropPos: '72% 55%',
    plateFilter: 'contrast(1.06) brightness(0.92)',
  },
  {
    code: '02',
    eyebrow: 'LANDSCAPE STUDY 02',
    title: 'Study 02 · Tidal Concrete',
    region: 'FIRTH OF FORTH · WINTER LOW TIDE',
    notes:
      'Submerged concrete groynes emerging at dawn ebb. Exposed at 24 frames per second with a neutral graduated filter so salt haze separates foreground pilings from the distant estuary shore.',
    gps: '56.0128° N, 3.3881° W',
    stock: 'Vision3 250D 7207',
    plateStock: 'KODAK 250D',
    focal: '35 mm f/2.8',
    duration: '18m 04s',
    cropPos: '44% 58%',
    plateFilter: 'contrast(1.12) brightness(0.86) saturate(0.88)',
  },
  {
    code: '03',
    eyebrow: 'LANDSCAPE STUDY 03',
    title: 'Study 03 · Quarry Light',
    region: 'LLANBERIS BASIN · SPRING EQUINOX',
    notes:
      'Terraced slate benches surveyed after rain, when indirect skylight turns wet stone surfaces specular against dark shadow shelves. Recorded with contact microphones buried in scree.',
    gps: '53.1194° N, 4.1157° W',
    stock: 'Double-X 7222',
    plateStock: 'EASTMAN 7222',
    focal: '75 mm f/2.0',
    duration: '11m 52s',
    cropPos: '72% 48%',
    plateFilter: 'contrast(1.18) brightness(0.88) sepia(0.24)',
  },
  {
    code: '04',
    eyebrow: 'LANDSCAPE STUDY 04',
    title: 'Study 04 · Timber Horizon',
    region: 'CAIRNGORMS RIDGE · SUMMER SOLSTICE',
    notes:
      'Windbreak pine rows bordering subalpine peatland at northern dusk. Long continuous takes follow residual amber reflection across shallow drainage channels until stars register on grain.',
    gps: '57.0924° N, 3.6582° W',
    stock: 'Vision3 500T 7219',
    plateStock: 'KODAK 500T',
    focal: '40 mm f/1.8',
    duration: '21m 16s',
    cropPos: '54% 62%',
    plateFilter: 'contrast(1.04) brightness(0.95) saturate(1.1)',
  },
];

let activeStudyIndex = 0;

function initHeaderCondense() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const update = () => {
    header.classList.toggle('is-condensed', window.scrollY > 28);
  };
  update();
  window.addEventListener('scroll', update, { passive: true });
}

function initMobileDrawer() {
  const toggleBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggleBtn || !closeBtn || !drawer) return;

  const links = drawer.querySelectorAll('a');

  const openDrawer = () => {
    drawer.hidden = false;
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  };

  const closeDrawer = () => {
    drawer.hidden = true;
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggleBtn.focus();
  };

  toggleBtn.addEventListener('click', openDrawer);
  closeBtn.addEventListener('click', closeDrawer);
  links.forEach((link) => {
    link.addEventListener('click', () => {
      drawer.hidden = true;
      toggleBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && !drawer.hidden) {
      closeDrawer();
    }
  });
}

function setActiveStudy(index) {
  const normalized = ((index % STUDIES.length) + STUDIES.length) % STUDIES.length;
  activeStudyIndex = normalized;
  const study = STUDIES[normalized];

  // Update Hero elements
  const eyebrow = document.getElementById('hero-eyebrow-text');
  const counterCurrent = document.getElementById('hero-counter-current');
  const numeral = document.getElementById('hero-numeral');
  const heroImg = document.getElementById('hero-image');

  if (eyebrow) eyebrow.textContent = study.eyebrow;
  if (counterCurrent) counterCurrent.textContent = study.code;
  if (numeral) numeral.textContent = study.code;
  if (heroImg) {
    heroImg.style.objectPosition = study.cropPos;
    heroImg.style.filter = study.plateFilter;
  }

  document.querySelectorAll('[data-study-trigger]').forEach((btn) => {
    const idx = Number(btn.getAttribute('data-study-trigger'));
    const isMatch = idx === normalized;
    btn.classList.toggle('is-active', isMatch);
    btn.setAttribute('aria-pressed', String(isMatch));
  });

  // Update Chapter 01 Monograph tabs and dossier panel
  document.querySelectorAll('[data-study-index]').forEach((tab) => {
    const idx = Number(tab.getAttribute('data-study-index'));
    const isMatch = idx === normalized;
    tab.classList.toggle('is-active', isMatch);
    tab.setAttribute('aria-selected', String(isMatch));
  });

  const panel = document.getElementById('monograph-panel');
  if (panel) {
    panel.setAttribute('aria-labelledby', `tab-study-${normalized}`);
  }

  const plateImg = document.getElementById('monograph-img');
  const plateIndex = document.getElementById('plate-index');
  const plateStock = document.getElementById('plate-stock');
  const studyRegion = document.getElementById('study-region');
  const studyTitle = document.getElementById('study-title');
  const studyNotes = document.getElementById('study-notes');
  const specGps = document.getElementById('spec-gps');
  const specStock = document.getElementById('spec-stock');
  const specFocal = document.getElementById('spec-focal');
  const specDuration = document.getElementById('spec-duration');

  if (plateImg) {
    plateImg.style.objectPosition = study.cropPos;
    plateImg.style.filter = study.plateFilter;
  }
  if (plateIndex) plateIndex.textContent = `PLATE ${study.code}`;
  if (plateStock) plateStock.textContent = study.plateStock;
  if (studyRegion) studyRegion.textContent = study.region;
  if (studyTitle) studyTitle.textContent = study.title;
  if (studyNotes) studyNotes.textContent = study.notes;
  if (specGps) specGps.textContent = study.gps;
  if (specStock) specStock.textContent = study.stock;
  if (specFocal) specFocal.textContent = study.focal;
  if (specDuration) specDuration.textContent = study.duration;
}

function initStudySwitchers() {
  document.querySelectorAll('[data-study-trigger]').forEach((btn) => {
    btn.addEventListener('click', () => {
      setActiveStudy(Number(btn.getAttribute('data-study-trigger')));
    });
  });

  const prevBtn = document.getElementById('hero-prev');
  const nextBtn = document.getElementById('hero-next');
  if (prevBtn) {
    prevBtn.addEventListener('click', () => setActiveStudy(activeStudyIndex - 1));
  }
  if (nextBtn) {
    nextBtn.addEventListener('click', () => setActiveStudy(activeStudyIndex + 1));
  }

  const tabs = Array.from(document.querySelectorAll('[data-study-index]'));
  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      setActiveStudy(Number(tab.getAttribute('data-study-index')));
    });

    tab.addEventListener('keydown', (ev) => {
      const idx = tabs.indexOf(tab);
      if (ev.key === 'ArrowDown' || ev.key === 'ArrowRight') {
        ev.preventDefault();
        const next = tabs[(idx + 1) % tabs.length];
        next.focus();
        setActiveStudy(Number(next.getAttribute('data-study-index')));
      } else if (ev.key === 'ArrowUp' || ev.key === 'ArrowLeft') {
        ev.preventDefault();
        const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
        prev.focus();
        setActiveStudy(Number(prev.getAttribute('data-study-index')));
      }
    });
  });
}

function initScrollReveals() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    elements.forEach((el) => el.classList.add('is-visible'));
    return;
  }

  requestAnimationFrame(() => {
    const thresholdY = window.innerHeight * 0.92;
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top <= thresholdY) {
        el.classList.add('is-visible');
      }
    });
  });

  if (!('IntersectionObserver' in window)) {
    elements.forEach((el) => el.classList.add('is-visible'));
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

  elements.forEach((el) => {
    if (!el.classList.contains('is-visible')) {
      observer.observe(el);
    }
  });
}

function initCommissionForm() {
  const form = document.getElementById('commission-form');
  const confirmation = document.getElementById('commission-confirmation');
  const resetBtn = document.getElementById('reset-form-btn');
  if (!form || !confirmation || !resetBtn) return;

  const orgInput = document.getElementById('org-input');
  const emailInput = document.getElementById('email-input');
  const terrainSelect = document.getElementById('terrain-select');
  const seasonSelect = document.getElementById('season-select');

  const orgError = document.getElementById('org-error');
  const emailError = document.getElementById('email-error');
  const terrainError = document.getElementById('terrain-error');
  const seasonError = document.getElementById('season-error');

  const clearErrors = () => {
    [orgInput, emailInput, terrainSelect, seasonSelect].forEach((el) => el?.classList.remove('is-invalid'));
    [orgError, emailError, terrainError, seasonError].forEach((el) => {
      if (el) el.textContent = '';
    });
  };

  form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    clearErrors();

    let valid = true;
    const orgVal = orgInput.value.trim();
    const emailVal = emailInput.value.trim();
    const terrainVal = terrainSelect.value.trim();
    const seasonVal = seasonSelect.value.trim();

    if (orgVal.length < 2) {
      orgInput.classList.add('is-invalid');
      orgError.textContent = 'Enter an organization or trust name.';
      valid = false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
      emailInput.classList.add('is-invalid');
      emailError.textContent = 'Enter a valid archival contact email.';
      valid = false;
    }

    if (!terrainVal) {
      terrainSelect.classList.add('is-invalid');
      terrainError.textContent = 'Select a terrain classification.';
      valid = false;
    }

    if (!seasonVal) {
      seasonSelect.classList.add('is-invalid');
      seasonError.textContent = 'Select a seasonal observation window.';
      valid = false;
    }

    if (!valid) return;

    const codeNum = String(400 + ((orgVal.length * 17 + terrainVal.length * 13) % 589)).padStart(4, '0');
    document.getElementById('dossier-id').textContent = `FF-2026-${codeNum}`;
    document.getElementById('confirm-org').textContent = orgVal;
    document.getElementById('confirm-terrain').textContent = terrainVal;
    document.getElementById('confirm-season').textContent = seasonVal;

    form.hidden = true;
    confirmation.hidden = false;
    resetBtn.focus();
  });

  resetBtn.addEventListener('click', () => {
    form.reset();
    clearErrors();
    confirmation.hidden = true;
    form.hidden = false;
    orgInput.focus();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initHeaderCondense();
  initMobileDrawer();
  initStudySwitchers();
  initScrollReveals();
  initCommissionForm();
  setActiveStudy(0);
});
