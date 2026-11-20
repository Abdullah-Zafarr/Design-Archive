(() => {
  'use strict';

  const COLORWAYS = {
    tangerine: { name: 'Tangerine', strap: '#FF8C2B', peg: '#C75D0A' },
    coral: { name: 'Coral Surf', strap: '#FF6B4A', peg: '#B83B1E' },
    sand: { name: 'Bali Sand', strap: '#CBB692', peg: '#8C7856' },
  };

  const root = document.documentElement;
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  const heroColorPills = [...document.querySelectorAll('.colorway-pill')];
  const editionCards = [...document.querySelectorAll('.edition-card')];
  const bagStatusLive = document.getElementById('bag-status-live');

  const shopPill = document.getElementById('shop-pill');
  const bagBackdrop = document.getElementById('bag-backdrop');
  const bagDrawer = document.getElementById('bag-drawer');
  const bagClose = document.getElementById('bag-close');
  const bagEmpty = document.getElementById('bag-empty');
  const bagList = document.getElementById('bag-list');
  const bagFooter = document.getElementById('bag-footer');
  const bagTotal = document.getElementById('bag-total');
  const bagCheckout = document.getElementById('bag-checkout');
  const bagClear = document.getElementById('bag-clear');
  const bagConfirm = document.getElementById('bag-confirm');
  const bagBrowseLink = document.getElementById('bag-browse-link');

  const restockForm = document.getElementById('restock-form');
  const restockEmail = document.getElementById('restock-email');
  const restockEdition = document.getElementById('restock-edition');
  const restockSize = document.getElementById('restock-size');
  const restockError = document.getElementById('restock-error');
  const restockSuccess = document.getElementById('restock-success');
  const restockConfirmText = document.getElementById('restock-confirm-text');
  const restockReset = document.getElementById('restock-reset');

  const bagItems = [];

  // Header scroll condensation
  const syncHeaderScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  window.addEventListener('scroll', syncHeaderScroll, { passive: true });
  syncHeaderScroll();

  // Mobile navigation drawer
  const setDrawerOpen = (open) => {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileDrawer.hidden = !open;
  };

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      setDrawerOpen(!isOpen);
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });
  }

  // Hero strap colorway sync
  const setHeroColorway = (key) => {
    const preset = COLORWAYS[key] || COLORWAYS.tangerine;
    root.setAttribute('data-colorway', key);
    heroColorPills.forEach((pill) => {
      const active = pill.dataset.colorway === key;
      pill.classList.toggle('is-active', active);
      pill.setAttribute('aria-pressed', String(active));
    });
    return preset;
  };

  heroColorPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      const key = pill.dataset.colorway || 'tangerine';
      setHeroColorway(key);
    });
  });

  // Bag rendering and controls
  const renderBag = () => {
    const totalCount = bagItems.reduce((sum, item) => sum + item.qty, 0);
    const totalAmount = bagItems.reduce((sum, item) => sum + item.price * item.qty, 0);

    if (shopPill) {
      shopPill.textContent = totalCount > 0 ? `Shop (${totalCount})` : 'Shop';
      shopPill.setAttribute('aria-label', `Shopping bag, ${totalCount} ${totalCount === 1 ? 'pair' : 'pairs'}`);
    }

    if (!bagList || !bagEmpty || !bagFooter || !bagTotal) return;

    if (bagItems.length === 0) {
      bagEmpty.hidden = false;
      bagList.hidden = true;
      bagFooter.hidden = true;
      bagList.innerHTML = '';
      bagTotal.textContent = '$0';
      if (bagConfirm) bagConfirm.hidden = true;
      return;
    }

    bagEmpty.hidden = true;
    bagList.hidden = false;
    bagFooter.hidden = false;
    bagTotal.textContent = `$${totalAmount}`;

    bagList.innerHTML = '';
    bagItems.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'bag-item';

      const info = document.createElement('div');
      const title = document.createElement('div');
      title.className = 'bag-item-title';
      title.textContent = item.edition;

      const meta = document.createElement('div');
      meta.className = 'bag-item-meta';
      meta.textContent = `${item.colorName} · EU ${item.size} · Qty ${item.qty}`;
      info.appendChild(title);
      info.appendChild(meta);

      const actions = document.createElement('div');
      actions.className = 'bag-item-actions';

      const price = document.createElement('span');
      price.className = 'bag-item-price';
      price.textContent = `$${item.price * item.qty}`;

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'bag-remove-btn';
      removeBtn.setAttribute('aria-label', `Remove ${item.edition} EU ${item.size}`);
      removeBtn.textContent = '×';
      removeBtn.addEventListener('click', () => {
        bagItems.splice(index, 1);
        renderBag();
      });

      actions.appendChild(price);
      actions.appendChild(removeBtn);
      li.appendChild(info);
      li.appendChild(actions);
      bagList.appendChild(li);
    });
  };

  const setBagOpen = (open) => {
    if (!bagDrawer || !bagBackdrop || !shopPill) return;
    if (open) setDrawerOpen(false);
    bagDrawer.hidden = !open;
    bagBackdrop.hidden = !open;
    shopPill.setAttribute('aria-expanded', String(open));
    if (open) {
      bagClose?.focus();
    } else {
      shopPill.focus();
    }
  };

  shopPill?.addEventListener('click', () => {
    const isOpen = bagDrawer ? !bagDrawer.hidden : false;
    setBagOpen(!isOpen);
  });

  bagClose?.addEventListener('click', () => setBagOpen(false));
  bagBackdrop?.addEventListener('click', () => setBagOpen(false));
  bagBrowseLink?.addEventListener('click', () => setBagOpen(false));

  bagClear?.addEventListener('click', () => {
    bagItems.length = 0;
    renderBag();
    if (bagStatusLive) bagStatusLive.textContent = 'Bag cleared';
  });

  bagCheckout?.addEventListener('click', () => {
    if (!bagConfirm) return;
    const totalCount = bagItems.reduce((sum, item) => sum + item.qty, 0);
    bagConfirm.textContent = `Pickup hold prepared for ${totalCount} ${totalCount === 1 ? 'pair' : 'pairs'} at coastal counters.`;
    bagConfirm.hidden = false;
  });

  // Edition cards: strap swatches, EU sizes, and Add to bag
  editionCards.forEach((card) => {
    const editionName = card.dataset.edition || 'BAREFOOT Sandal';
    const price = Number.parseInt(card.dataset.price || '48', 10);
    const swatchBtns = [...card.querySelectorAll('.swatch-btn')];
    const sizeBtns = [...card.querySelectorAll('.size-btn')];
    const colorLabel = card.querySelector('[data-color-label]');
    const strapPath = card.querySelector('.card-strap');
    const pegDot = card.querySelector('.card-peg');
    const addBtn = card.querySelector('.add-bag-btn');

    swatchBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const key = btn.dataset.setColor || 'tangerine';
        const preset = COLORWAYS[key] || COLORWAYS.tangerine;
        card.dataset.colorway = key;

        swatchBtns.forEach((s) => {
          const active = s === btn;
          s.classList.toggle('is-active', active);
          s.setAttribute('aria-pressed', String(active));
        });

        if (colorLabel) colorLabel.textContent = preset.name;
        if (strapPath) strapPath.setAttribute('stroke', preset.strap);
        if (pegDot) pegDot.setAttribute('fill', preset.peg);

        // Sync Hero SVG sandals live
        setHeroColorway(key);
      });
    });

    sizeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const size = btn.dataset.size || '41';
        card.dataset.size = size;
        sizeBtns.forEach((s) => {
          const active = s === btn;
          s.classList.toggle('is-active', active);
          s.setAttribute('aria-pressed', String(active));
        });
      });
    });

    addBtn?.addEventListener('click', () => {
      const colorKey = card.dataset.colorway || 'tangerine';
      const colorName = (COLORWAYS[colorKey] || COLORWAYS.tangerine).name;
      const size = card.dataset.size || '41';

      const existing = bagItems.find(
        (item) => item.edition === editionName && item.colorKey === colorKey && item.size === size
      );
      if (existing) {
        existing.qty += 1;
      } else {
        bagItems.push({ edition: editionName, colorKey, colorName, size, price, qty: 1 });
      }

      if (bagConfirm) bagConfirm.hidden = true;
      renderBag();

      if (bagStatusLive) {
        bagStatusLive.textContent = `Added ${editionName} (${colorName}, EU ${size}) to bag.`;
      }

      const originalText = 'Add to bag';
      addBtn.textContent = 'Added to bag';
      window.setTimeout(() => {
        addBtn.textContent = originalText;
      }, 1200);
    });
  });

  // Global Escape handler for drawer and bag
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (mobileDrawer && !mobileDrawer.hidden) {
      setDrawerOpen(false);
      menuToggle?.focus();
    }
    if (bagDrawer && !bagDrawer.hidden) {
      setBagOpen(false);
    }
  });

  // Restock notification form
  if (restockForm) {
    restockForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const email = restockEmail?.value.trim() || '';
      const edition = restockEdition?.value || 'Uluwatu Reef';
      const size = restockSize?.value || '41';

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (restockError) {
          restockError.textContent = 'Enter a valid email address for restock notice.';
          restockError.hidden = false;
        }
        restockEmail?.focus();
        return;
      }

      if (restockError) restockError.hidden = true;
      restockForm.hidden = true;

      if (restockConfirmText) {
        restockConfirmText.textContent = `Alert saved for ${edition} in EU ${size}. One batch email will go to ${email}.`;
      }
      if (restockSuccess) restockSuccess.hidden = false;
    });
  }

  restockReset?.addEventListener('click', () => {
    if (restockForm) {
      restockForm.reset();
      restockForm.hidden = false;
    }
    if (restockSuccess) restockSuccess.hidden = true;
    restockEmail?.focus();
  });

  // Scroll-reveal choreography
  const reveals = [...document.querySelectorAll('.reveal')];
  const revealAboveFold = () => {
    const cutoff = window.innerHeight * 0.92;
    reveals.forEach((el) => {
      if (el.getBoundingClientRect().top <= cutoff) {
        el.classList.add('is-visible');
      }
    });
  };
  requestAnimationFrame(revealAboveFold);

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
