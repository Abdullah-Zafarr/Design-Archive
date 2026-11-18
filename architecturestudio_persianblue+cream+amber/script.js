(() => {
  'use strict';

  const ATMOSPHERES = {
    dusk: {
      label: 'Dusk Amber · 2700K pass',
      prompt: 'Dusk, still water, natural textures',
    },
    cedar: {
      label: 'Warm Cedar · 3000K pass',
      prompt: 'Golden soffit warmth, clear cedar, still water',
    },
    mist: {
      label: 'Twilight Mist · 5200K pass',
      prompt: 'Blue hour mist, basalt plinth, soft reflection',
    },
  };

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const navSearchBtn = document.getElementById('nav-search-btn');
  const navBagBtn = document.getElementById('nav-bag-btn');
  const bagCountBadge = document.getElementById('bag-count');

  const hero = document.getElementById('hero');
  const promptForm = document.getElementById('hero-prompt-form');
  const promptInput = document.getElementById('prompt-input');
  const renderToast = document.getElementById('render-toast');
  const renderToastLabel = document.getElementById('render-toast-label');
  const renderToastClose = document.getElementById('render-toast-close');
  const presetButtons = Array.from(document.querySelectorAll('.preset-chip'));

  const filterTabs = Array.from(document.querySelectorAll('.filter-tab'));
  const gallerySearch = document.getElementById('gallery-search');
  const studyCards = Array.from(document.querySelectorAll('.study-card'));
  const galleryEmpty = document.getElementById('gallery-empty');
  const resetGalleryBtn = document.getElementById('reset-gallery-btn');
  const saveButtons = Array.from(document.querySelectorAll('.study-save-btn'));

  const tierSelectButtons = Array.from(document.querySelectorAll('.tier-select-btn'));
  const planSelect = document.getElementById('plan-select');
  const savedCountLabel = document.getElementById('saved-studies-count');
  const savedStudiesList = document.getElementById('saved-studies-list');
  const inquiryForm = document.getElementById('inquiry-form');
  const inquiryConfirmation = document.getElementById('inquiry-confirmation');
  const confirmRef = document.getElementById('confirm-ref');
  const confirmBody = document.getElementById('confirm-body');
  const resetBriefBtn = document.getElementById('reset-brief-btn');

  let activeCategory = 'all';
  let activeAtmosphere = 'dusk';
  const savedStudies = new Map();

  function updateHeaderState() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  }

  window.addEventListener('scroll', updateHeaderState, { passive: true });
  updateHeaderState();

  function setDrawerOpen(open) {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileDrawer.hidden = !open;
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      setDrawerOpen(!isOpen);
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setDrawerOpen(false);
      }
    });
  }

  if (navSearchBtn && gallerySearch) {
    navSearchBtn.addEventListener('click', () => {
      const gallerySection = document.getElementById('gallery');
      gallerySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => gallerySearch.focus(), 350);
    });
  }

  if (navBagBtn) {
    navBagBtn.addEventListener('click', () => {
      const inquirySection = document.getElementById('inquiry');
      inquirySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function applyAtmosphere(presetKey, updateInputText) {
    const preset = ATMOSPHERES[presetKey] || ATMOSPHERES.dusk;
    activeAtmosphere = presetKey in ATMOSPHERES ? presetKey : 'dusk';
    if (hero) {
      hero.setAttribute('data-atmosphere', activeAtmosphere);
    }
    if (renderToastLabel) {
      renderToastLabel.textContent = preset.label;
    }
    if (updateInputText && promptInput) {
      promptInput.value = preset.prompt;
    }
    presetButtons.forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.preset === activeAtmosphere);
    });
    if (renderToast) {
      renderToast.hidden = false;
    }
  }

  function inferAtmosphere(text) {
    const lower = (text || '').toLowerCase();
    if (lower.includes('mist') || lower.includes('fog') || lower.includes('blue') || lower.includes('cool')) {
      return 'mist';
    }
    if (lower.includes('cedar') || lower.includes('warm') || lower.includes('amber') || lower.includes('gold')) {
      return 'cedar';
    }
    const order = ['dusk', 'cedar', 'mist'];
    const nextIndex = (order.indexOf(activeAtmosphere) + 1) % order.length;
    return renderToast && !renderToast.hidden ? order[nextIndex] : 'dusk';
  }

  if (promptForm && promptInput) {
    promptForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const chosen = inferAtmosphere(promptInput.value);
      applyAtmosphere(chosen, false);
    });
  }

  presetButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      applyAtmosphere(btn.dataset.preset || 'dusk', true);
    });
  });

  if (renderToastClose && renderToast) {
    renderToastClose.addEventListener('click', () => {
      renderToast.hidden = true;
    });
  }

  function filterGallery() {
    const query = (gallerySearch?.value || '').trim().toLowerCase();
    let visibleCount = 0;

    studyCards.forEach((card) => {
      const category = card.dataset.category || '';
      const matchesCat = activeCategory === 'all' || category === activeCategory;
      const text = card.textContent?.toLowerCase() || '';
      const matchesQuery = !query || text.includes(query);
      const show = matchesCat && matchesQuery;
      card.hidden = !show;
      if (show) visibleCount += 1;
    });

    if (galleryEmpty) {
      galleryEmpty.hidden = visibleCount > 0;
    }
  }

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      activeCategory = tab.dataset.filter || 'all';
      filterTabs.forEach((t) => {
        const selected = t === tab;
        t.classList.toggle('is-active', selected);
        t.setAttribute('aria-selected', String(selected));
      });
      filterGallery();
    });
  });

  if (gallerySearch) {
    gallerySearch.addEventListener('input', filterGallery);
  }

  if (resetGalleryBtn) {
    resetGalleryBtn.addEventListener('click', () => {
      activeCategory = 'all';
      if (gallerySearch) gallerySearch.value = '';
      filterTabs.forEach((t) => {
        const isAll = t.dataset.filter === 'all';
        t.classList.toggle('is-active', isAll);
        t.setAttribute('aria-selected', String(isAll));
      });
      filterGallery();
    });
  }

  function syncSavedStudiesUI() {
    const count = savedStudies.size;
    if (bagCountBadge) {
      bagCountBadge.textContent = String(count);
      bagCountBadge.hidden = count === 0;
    }
    if (savedCountLabel) {
      savedCountLabel.textContent = `${count} selected`;
    }

    saveButtons.forEach((btn) => {
      const card = btn.closest('.study-card');
      const id = card?.dataset.studyId || '';
      const saved = savedStudies.has(id);
      btn.setAttribute('aria-pressed', String(saved));
      btn.textContent = saved ? 'Saved in brief' : 'Add to brief';
    });

    if (!savedStudiesList) return;
    savedStudiesList.innerHTML = '';

    if (count === 0) {
      const emptyItem = document.createElement('li');
      emptyItem.className = 'saved-studies-empty';
      emptyItem.textContent = 'Select studies in the Gallery to attach lighting notes';
      savedStudiesList.appendChild(emptyItem);
      return;
    }

    savedStudies.forEach((title, id) => {
      const item = document.createElement('li');
      item.className = 'saved-study-pill';

      const label = document.createElement('span');
      label.textContent = title;

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'saved-study-remove';
      removeBtn.setAttribute('aria-label', `Remove ${title} from brief`);
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', () => {
        savedStudies.delete(id);
        syncSavedStudiesUI();
      });

      item.append(label, removeBtn);
      savedStudiesList.appendChild(item);
    });
  }

  saveButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.study-card');
      const id = card?.dataset.studyId || '';
      const title = btn.dataset.studyTitle || '';
      if (!id || !title) return;

      if (savedStudies.has(id)) {
        savedStudies.delete(id);
      } else {
        savedStudies.set(id, title);
      }
      syncSavedStudiesUI();
    });
  });

  tierSelectButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const tier = btn.dataset.tier || 'Private Commission';
      if (planSelect) {
        planSelect.value = tier;
      }
      const inquirySection = document.getElementById('inquiry');
      inquirySection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      window.setTimeout(() => {
        document.getElementById('client-name')?.focus();
      }, 350);
    });
  });

  if (inquiryForm && inquiryConfirmation && confirmRef && confirmBody) {
    inquiryForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(inquiryForm);
      const clientName = String(formData.get('name') || '').trim() || 'Studio client';
      const tier = String(formData.get('tier') || 'Private Commission');
      const format = String(formData.get('format') || 'Rhino / 3dm');
      const codeNum = 1000 + Math.floor(Math.random() * 8999);

      confirmRef.textContent = `FRM-${codeNum}`;
      const refsNote = savedStudies.size > 0
        ? `${savedStudies.size} saved gallery ${savedStudies.size === 1 ? 'study' : 'studies'} attached.`
        : 'No reference plates attached.';

      confirmBody.textContent = `${clientName}, your ${tier} intake for ${format} geometry is logged. ${refsNote} Expect initial massing review within one business day.`;
      inquiryForm.hidden = true;
      inquiryConfirmation.hidden = false;
    });
  }

  if (resetBriefBtn && inquiryForm && inquiryConfirmation) {
    resetBriefBtn.addEventListener('click', () => {
      inquiryForm.reset();
      inquiryConfirmation.hidden = true;
      inquiryForm.hidden = false;
      document.getElementById('client-name')?.focus();
    });
  }

  syncSavedStudiesUI();
})();
