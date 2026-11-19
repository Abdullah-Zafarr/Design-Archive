(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const bagToggle = document.getElementById('bag-toggle');
  const bagPopover = document.getElementById('bag-popover');
  const bagCount = document.getElementById('bag-count');
  const bagList = document.getElementById('bag-list');
  const bagClear = document.getElementById('bag-clear');
  const bagBookLink = document.getElementById('bag-book-link');

  const filterTabs = [...document.querySelectorAll('.filter-tabs .tab-btn')];
  const frameCards = [...document.querySelectorAll('.catalog-grid .frame-card')];
  const catalogStatus = document.getElementById('catalog-status');
  const bagButtons = [...document.querySelectorAll('.btn-bag')];

  const fittingForm = document.getElementById('fitting-form');
  const guestName = document.getElementById('guest-name');
  const guestEmail = document.getElementById('guest-email');
  const guestFrame = document.getElementById('guest-frame');
  const formError = document.getElementById('form-error');
  const formSuccess = document.getElementById('form-success');
  const successCopy = document.getElementById('success-copy');
  const formReset = document.getElementById('form-reset');

  const bagItems = [];

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Mobile navigation drawer
  const setDrawerOpen = (open) => {
    if (!menuToggle || !mobileDrawer) return;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    mobileDrawer.hidden = !open;
  };

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      if (!open && bagPopover) {
        bagPopover.hidden = true;
        bagToggle?.setAttribute('aria-expanded', 'false');
      }
      setDrawerOpen(!open);
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });
  }

  // Bag popover toggle & updates
  const setBagOpen = (open) => {
    if (!bagToggle || !bagPopover) return;
    bagToggle.setAttribute('aria-expanded', String(open));
    bagPopover.hidden = !open;
  };

  const renderBag = () => {
    const totalCount = bagItems.reduce((sum, item) => sum + item.qty, 0);
    if (bagCount) {
      bagCount.textContent = String(totalCount);
      bagCount.classList.toggle('has-items', totalCount > 0);
    }
    if (bagToggle) {
      const noun = totalCount === 1 ? 'item' : 'items';
      bagToggle.setAttribute('aria-label', `Shopping bag, ${totalCount} ${noun}`);
    }
    if (!bagList) return;
    bagList.innerHTML = '';
    if (bagItems.length === 0) {
      const li = document.createElement('li');
      li.className = 'bag-empty';
      li.textContent = 'No frames selected yet.';
      bagList.appendChild(li);
      return;
    }
    bagItems.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'bag-item';
      const label = document.createElement('span');
      label.textContent = `${item.name} × ${item.qty}`;
      const price = document.createElement('span');
      price.textContent = `$${(item.price * item.qty).toLocaleString('en-US')}`;
      li.appendChild(label);
      li.appendChild(price);
      bagList.appendChild(li);
    });
  };

  if (bagToggle && bagPopover) {
    bagToggle.addEventListener('click', () => {
      const open = bagToggle.getAttribute('aria-expanded') === 'true';
      if (!open) setDrawerOpen(false);
      setBagOpen(!open);
    });

    bagBookLink?.addEventListener('click', () => setBagOpen(false));
  }

  bagClear?.addEventListener('click', () => {
    bagItems.length = 0;
    bagButtons.forEach((btn) => {
      btn.classList.remove('is-added');
      btn.textContent = 'ADD TO BAG';
    });
    renderBag();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (mobileDrawer && !mobileDrawer.hidden) {
      setDrawerOpen(false);
      menuToggle?.focus();
    }
    if (bagPopover && !bagPopover.hidden) {
      setBagOpen(false);
      bagToggle?.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (bagPopover && !bagPopover.hidden) {
      const inside = bagPopover.contains(event.target) || bagToggle?.contains(event.target);
      if (!inside) setBagOpen(false);
    }
  });

  // Add to bag buttons
  bagButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.frame || 'NOIR 01';
      const price = Number.parseInt(btn.dataset.price || '340', 10);
      const existing = bagItems.find((item) => item.name === name);
      if (existing) {
        existing.qty += 1;
      } else {
        bagItems.push({ name, price, qty: 1 });
      }
      btn.classList.add('is-added');
      btn.textContent = 'ADDED TO BAG';
      renderBag();
      if (catalogStatus) {
        const count = bagItems.reduce((sum, item) => sum + item.qty, 0);
        catalogStatus.textContent = `Added ${name} to bag. ${count} items selected.`;
      }
    });
  });

  // Catalog filter tabs
  const applyFilter = (key) => {
    let count = 0;
    filterTabs.forEach((tab) => {
      const active = tab.dataset.filter === key;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    frameCards.forEach((card) => {
      const match = key === 'all' || card.dataset.category === key;
      card.hidden = !match;
      if (match) {
        count += 1;
        card.classList.add('is-visible');
      }
    });
    if (catalogStatus) {
      const noun = count === 1 ? 'frame' : 'frames';
      catalogStatus.textContent = `Showing ${count} ${noun} in ${key} category`;
    }
  };

  filterTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => applyFilter(tab.dataset.filter || 'all'));
    tab.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const next = filterTabs[(index + delta + filterTabs.length) % filterTabs.length];
      next.focus();
      applyFilter(next.dataset.filter || 'all');
    });
  });

  // Fitting appointment form
  if (fittingForm) {
    fittingForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const nameVal = guestName?.value.trim() || '';
      const emailVal = guestEmail?.value.trim() || '';
      const frameVal = guestFrame?.value || 'NOIR 01';
      if (!nameVal) {
        if (formError) {
          formError.textContent = 'Enter your name to reserve a fitting tray.';
          formError.hidden = false;
        }
        guestName?.focus();
        return;
      }
      if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        if (formError) {
          formError.textContent = 'Enter a valid email address for appointment notes.';
          formError.hidden = false;
        }
        guestEmail?.focus();
        return;
      }
      if (formError) formError.hidden = true;
      fittingForm.hidden = true;
      if (successCopy) {
        successCopy.textContent = `${frameVal} queued for ${nameVal} (${emailVal}). Private tray held at Crosby Street.`;
      }
      if (formSuccess) formSuccess.hidden = false;
    });
  }

  formReset?.addEventListener('click', () => {
    if (fittingForm) {
      fittingForm.reset();
      fittingForm.hidden = false;
    }
    if (formSuccess) formSuccess.hidden = true;
    guestName?.focus();
  });

  // Scroll reveal observer
  const revealItems = [...document.querySelectorAll('.reveal')];
  const showImmediately = () => {
    const thresholdY = window.innerHeight * 0.92;
    revealItems.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= thresholdY) el.classList.add('is-visible');
    });
  };
  requestAnimationFrame(showImmediately);

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
    revealItems.forEach((el) => observer.observe(el));
  } else {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  }
})();
