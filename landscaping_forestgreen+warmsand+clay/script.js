(() => {
  'use strict';

  // Sticky header condensation
  const header = document.getElementById('site-header');
  const syncHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  // Mobile navigation drawer
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const drawerBackdrop = document.getElementById('drawer-backdrop');

  const setDrawerState = (open) => {
    if (!mobileDrawer || !menuToggle) return;
    mobileDrawer.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open && drawerClose) {
      drawerClose.focus();
    } else if (!open) {
      menuToggle.focus();
    }
  };

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      setDrawerState(!isExpanded);
    });
    drawerClose?.addEventListener('click', () => setDrawerState(false));
    drawerBackdrop?.addEventListener('click', () => setDrawerState(false));
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setDrawerState(false));
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !mobileDrawer.hidden) {
        setDrawerState(false);
      }
    });
  }

  // Reveal choreography
  const revealNodes = document.querySelectorAll('.reveal');
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
      { threshold: 0.08, rootMargin: '0px 0px -28px 0px' }
    );
    revealNodes.forEach((node) => observer.observe(node));
  } else {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  }

  // Chapter 1: Category filter tabs
  const filterTabs = document.querySelectorAll('.filter-tab');
  const projectCards = document.querySelectorAll('.project-card');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const selected = tab.dataset.filter || 'all';
      filterTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });
      projectCards.forEach((card) => {
        const matches = selected === 'all' || card.dataset.category === selected;
        card.classList.toggle('is-hidden', !matches);
        if (matches) {
          card.classList.add('is-visible');
        }
      });
    });
  });

  // Chapter 2: Seasonal planting phase switcher
  const SEASON_DATA = {
    spring: {
      window: 'MAR – MAY',
      cadence: 'Early foliage unfurl & bulb succession',
      title: 'Fresh emerald emergence under dappled canopy',
      summary:
        'Woodland bulbs push through leaf mould before deciduous canopies close overhead, establishing clean structural lines across damp limestone paths.',
      canopy: 'Amelanchier lamarckii, Betula pendula',
      perennial: 'Dryopteris filix-mas, Epimedium, Narcissus Thalia',
      ground: 'Asarum europaeum, woodland moss',
      temp: 'pH 6.5 – 7.2',
      masonryTitle: 'Dry-stone walling & permeable bedding',
      stone: 'Hand-dressed Cotswold oolitic limestone, lime-mortar coping',
      drainage: '150 mm Type 3 permeable aggregate, 1:60 fall away from thresholds',
      mulch: '60 mm composted bark fines applied post-frost',
      care: 'Light selective cutback of winter stems in early March',
      swatches: [
        { hex: '#385E45', name: 'Fern frond' },
        { hex: '#ECE2CF', name: 'Chalk bloom' },
        { hex: '#C2643F', name: 'Terracotta bud' },
      ],
      diagram: {
        canopy: 'M36 96V34M36 52C16 48 14 26 36 22C58 26 56 48 36 52Z',
        shrub: 'M134 96C134 62 178 62 178 96',
        perennial: 'M242 96V56M258 96V64M274 96V50M290 96V68',
        ground: 'M332 96C346 84 364 84 378 96M364 96C378 86 394 86 406 96',
      },
    },
    summer: {
      window: 'JUN – AUG',
      cadence: 'Peak herbaceous height & pollinator cover',
      title: 'Layered meadow grasses filtering midday heat',
      summary:
        'Deep-rooted perennials anchor exposed gravel terraces without supplementary watering once established, shading stone surfaces through July.',
      canopy: 'Ficus carica, Multi-stem Carpinus betulus',
      perennial: 'Salvia nemorosa, Stipa gigantea, Astrantia major',
      ground: 'Thymus serpyllum, Erigeron karvinskianus',
      temp: 'pH 6.8 – 7.5',
      masonryTitle: 'Thermal-mass paving & gravel swales',
      stone: 'Sawn Yorkstone flags laid on sharp grit sand with open thyme joints',
      drainage: 'Sub-surface soakaway crate beneath crushed limestone path',
      mulch: '40 mm washed Cotswold shingle around drought borders',
      care: 'Mid-July Chelsea chop on tall borders; deadhead repeat salvias',
      swatches: [
        { hex: '#284A38', name: 'Canopy shade' },
        { hex: '#DED1B9', name: 'Sunlit oat' },
        { hex: '#C2643F', name: 'Burnt clay' },
      ],
      diagram: {
        canopy: 'M36 96V28M36 54C8 48 10 18 36 16C62 18 64 48 36 54Z',
        shrub: 'M126 96C126 52 186 52 186 96',
        perennial: 'M236 96V36M252 96V42M268 96V30M284 96V44M300 96V38',
        ground: 'M330 96C346 80 364 80 380 96M364 96C380 80 398 80 412 96',
      },
    },
    autumn: {
      window: 'SEP – NOV',
      cadence: 'Seedhead architecture & bronze leaf turn',
      title: 'Warm russet tones holding into low November light',
      summary:
        'Late asters and ornamental grasses catch low-angle sunlight while copper beech hedges hold their bronzed foliage into winter.',
      canopy: 'Acer griseum, Fagus sylvatica hedge',
      perennial: 'Molinia Transparent, Aster divaricatus, Hylotelephium',
      ground: 'Geranium macrorrhizum, fern fronds',
      temp: 'pH 6.2 – 7.0',
      masonryTitle: 'Retaining steps & weathered ironwork',
      stone: 'Dry-stacked sandstone treads pinned with oak pegs',
      drainage: 'French gravel drain lined along retaining wall toe',
      mulch: '50 mm shredded autumn leaf mould banked over bulbs',
      care: 'Leave hollow grass stems standing for overwintering insects',
      swatches: [
        { hex: '#9E4B2B', name: 'Russet bark' },
        { hex: '#C2643F', name: 'Seedhead clay' },
        { hex: '#1F3B2C', name: 'Evergreen yew' },
      ],
      diagram: {
        canopy: 'M36 96V32M36 52L20 34M36 46L54 30',
        shrub: 'M130 96C136 58 176 58 182 96',
        perennial: 'M242 96V44M258 96V52M274 96V40M290 96V56M274 40C280 34 284 36 286 42',
        ground: 'M334 96C350 86 364 86 378 96M366 96C382 88 396 88 408 96',
      },
    },
    winter: {
      window: 'DEC – FEB',
      cadence: 'Evergreen bones & frost-rimmed seedheads',
      title: 'Architectural stonework & silver bark structure',
      summary:
        'When herbaceous borders rest, clipped boxwood domes, dry-stone walls, and white-stemmed birches carry the garden silhouette cleanly.',
      canopy: 'Betula utilis Jacquemontii, Taxus baccata',
      perennial: 'Helleborus orientalis, Polystichum setiferum',
      ground: 'Ophiopogon, winter-flowering Galanthus',
      temp: 'pH 6.4 – 7.2',
      masonryTitle: 'Frost-resistant lime pointing & oak joints',
      stone: 'Hydraulic lime NHL 3.5 mortar cured under hessian protection',
      drainage: 'Clean silt traps and leaf-guard channels across paved courts',
      mulch: '75 mm organic soil conditioner forked around bare-root trees',
      care: 'Bare-root tree planting and structural hedge winter trim',
      swatches: [
        { hex: '#13261C', name: 'Yew shadow' },
        { hex: '#ECE2CF', name: 'Birch bark' },
        { hex: '#5D7062', name: 'Lichen stone' },
      ],
      diagram: {
        canopy: 'M36 96V26M36 56L18 32M36 48L56 26M36 38L26 20',
        shrub: 'M132 96V70H180V96',
        perennial: 'M248 96V74M268 96V78M288 96V72',
        ground: 'M336 96C348 90 362 90 374 96M368 96C380 90 394 90 406 96',
      },
    },
  };

  const seasonTabs = document.querySelectorAll('.season-tab');
  const els = {
    window: document.getElementById('phase-window'),
    cadence: document.getElementById('phase-cadence'),
    title: document.getElementById('phase-title'),
    summary: document.getElementById('phase-summary'),
    canopy: document.getElementById('layer-canopy'),
    perennial: document.getElementById('layer-perennial'),
    ground: document.getElementById('layer-ground'),
    temp: document.getElementById('masonry-temp'),
    masonryTitle: document.getElementById('masonry-title'),
    stone: document.getElementById('spec-stone'),
    drainage: document.getElementById('spec-drainage'),
    mulch: document.getElementById('spec-mulch'),
    care: document.getElementById('spec-care'),
    swatchRow: document.getElementById('swatch-row'),
    svgCanopy: document.getElementById('svg-canopy'),
    svgShrub: document.getElementById('svg-shrub'),
    svgPerennial: document.getElementById('svg-perennial'),
    svgGround: document.getElementById('svg-ground'),
  };

  seasonTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.season;
      const data = SEASON_DATA[key];
      if (!data) return;

      seasonTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });

      els.window.textContent = data.window;
      els.cadence.textContent = data.cadence;
      els.title.textContent = data.title;
      els.summary.textContent = data.summary;
      els.canopy.textContent = data.canopy;
      els.perennial.textContent = data.perennial;
      els.ground.textContent = data.ground;
      els.temp.textContent = data.temp;
      els.masonryTitle.textContent = data.masonryTitle;
      els.stone.textContent = data.stone;
      els.drainage.textContent = data.drainage;
      els.mulch.textContent = data.mulch;
      els.care.textContent = data.care;

      if (data.diagram) {
        els.svgCanopy?.setAttribute('d', data.diagram.canopy);
        els.svgShrub?.setAttribute('d', data.diagram.shrub);
        els.svgPerennial?.setAttribute('d', data.diagram.perennial);
        els.svgGround?.setAttribute('d', data.diagram.ground);
      }

      if (els.swatchRow) {
        els.swatchRow.innerHTML = '';
        data.swatches.forEach((sw) => {
          const span = document.createElement('span');
          span.className = 'swatch';
          const dot = document.createElement('i');
          dot.style.backgroundColor = sw.hex;
          span.appendChild(dot);
          span.appendChild(document.createTextNode(sw.name));
          els.swatchRow.appendChild(span);
        });
      }
    });
  });

  // Chapter 3: Survey booking form
  const visitForm = document.getElementById('visit-form');
  const visitConfirmed = document.getElementById('visit-confirmed');
  const formError = document.getElementById('form-error');
  const resetBtn = document.getElementById('reset-visit-form');
  const heroBookingDate = document.getElementById('hero-booking-date');

  const formatShortDate = (isoDate) => {
    const parsed = new Date(`${isoDate}T12:00:00`);
    if (Number.isNaN(parsed.getTime())) return isoDate;
    return parsed.toLocaleDateString('en-GB', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  };

  visitForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!formError) return;

    const plotSize = document.getElementById('plot-size')?.value || '';
    const exposure = visitForm.querySelector('input[name="exposure"]:checked')?.value || '';
    const visitDate = document.getElementById('visit-date')?.value || '';
    const location = document.getElementById('visit-location')?.value.trim() || '';
    const email = document.getElementById('visit-email')?.value.trim() || '';

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!visitDate) {
      formError.textContent = 'Select a preferred date for the site survey.';
      formError.hidden = false;
      return;
    }
    if (!location) {
      formError.textContent = 'Enter your town or district so we assign the nearest studio.';
      formError.hidden = false;
      return;
    }
    if (!emailValid) {
      formError.textContent = 'Enter a valid email address for the survey summary.';
      formError.hidden = false;
      return;
    }

    formError.hidden = true;
    const formattedDate = formatShortDate(visitDate);
    const refDigits = visitDate.replace(/-/g, '').slice(4) || '1114';

    document.getElementById('confirmed-ref').textContent = `FH-2026-${refDigits}`;
    document.getElementById('confirmed-email-display').textContent = email;
    document.getElementById('confirmed-date').textContent = formattedDate;
    document.getElementById('confirmed-size').textContent = plotSize;
    document.getElementById('confirmed-exposure').textContent = exposure;
    document.getElementById('confirmed-location').textContent = location;

    if (heroBookingDate) {
      heroBookingDate.textContent = formattedDate;
    }

    visitForm.hidden = true;
    visitConfirmed.hidden = false;
  });

  resetBtn?.addEventListener('click', () => {
    visitConfirmed.hidden = true;
    visitForm.hidden = false;
  });
})();
