(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  const cartToggle = document.getElementById('cart-toggle');
  const cartToggleMobile = document.getElementById('cart-toggle-mobile');
  const cartPopover = document.getElementById('cart-popover');
  const cartCount = document.getElementById('cart-count');
  const cartCountMobile = document.getElementById('cart-count-mobile');
  const cartItemsList = document.getElementById('cart-items');
  const cartClear = document.getElementById('cart-clear');
  const cartRsvpLink = document.getElementById('cart-rsvp-link');

  const dotBtns = [...document.querySelectorAll('.slide-dots .dot-btn')];
  const heroSlideLabel = document.getElementById('hero-slide-label');
  const heroSlideCaption = document.getElementById('hero-slide-caption');
  const lookbookLive = document.getElementById('lookbook-live');
  const lookCards = [...document.querySelectorAll('.lookbook-grid .look-card')];
  const cartButtons = [...document.querySelectorAll('.btn-cart')];

  const rsvpForm = document.getElementById('rsvp-form');
  const rsvpName = document.getElementById('rsvp-name');
  const rsvpEmail = document.getElementById('rsvp-email');
  const rsvpLook = document.getElementById('rsvp-look');
  const rsvpError = document.getElementById('rsvp-error');
  const rsvpSuccess = document.getElementById('rsvp-success');
  const rsvpSuccessMsg = document.getElementById('rsvp-success-msg');
  const rsvpReset = document.getElementById('rsvp-reset');

  const LOOK_HIGHLIGHTS = [
    { label: '01 / 06', caption: 'CHALK-STRIPE OVERCOAT & CAP' },
    { label: '02 / 06', caption: 'DOUBLE-PLEAT WORSTED TROUSER' },
    { label: '03 / 06', caption: 'SIX-BUTTON PEAK-LAPEL BLAZER' },
  ];

  const cart = [];

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  };
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

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
      if (!open) setCartOpen(false);
      setDrawerOpen(!open);
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setDrawerOpen(false));
    });
  }

  // Cart popover
  const setCartOpen = (open) => {
    if (!cartPopover) return;
    cartPopover.hidden = !open;
    cartToggle?.setAttribute('aria-expanded', String(open));
    cartToggleMobile?.setAttribute('aria-expanded', String(open));
  };

  const renderCart = () => {
    const qty = cart.reduce((sum, item) => sum + item.qty, 0);
    if (cartCount) cartCount.textContent = String(qty);
    if (cartCountMobile) cartCountMobile.textContent = String(qty);
    if (!cartItemsList) return;
    cartItemsList.innerHTML = '';
    if (cart.length === 0) {
      const li = document.createElement('li');
      li.className = 'cart-empty';
      li.textContent = 'No pieces queued in cart.';
      cartItemsList.appendChild(li);
      return;
    }
    cart.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'cart-item-row';
      const left = document.createElement('span');
      left.textContent = `${item.title} (${item.size}) × ${item.qty}`;
      const right = document.createElement('span');
      right.textContent = `$${(item.price * item.qty).toLocaleString('en-US')}`;
      li.appendChild(left);
      li.appendChild(right);
      cartItemsList.appendChild(li);
    });
  };

  [cartToggle, cartToggleMobile].forEach((btn) => {
    btn?.addEventListener('click', () => {
      const open = cartPopover ? cartPopover.hidden : false;
      if (open) setDrawerOpen(false);
      setCartOpen(open);
    });
  });

  cartRsvpLink?.addEventListener('click', () => setCartOpen(false));

  cartClear?.addEventListener('click', () => {
    cart.length = 0;
    cartButtons.forEach((btn) => {
      btn.classList.remove('is-added');
      btn.textContent = 'ADD TO CART';
    });
    renderCart();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    if (mobileDrawer && !mobileDrawer.hidden) {
      setDrawerOpen(false);
      menuToggle?.focus();
    }
    if (cartPopover && !cartPopover.hidden) {
      setCartOpen(false);
      cartToggle?.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (cartPopover && !cartPopover.hidden) {
      const inside =
        cartPopover.contains(event.target) ||
        cartToggle?.contains(event.target) ||
        cartToggleMobile?.contains(event.target);
      if (!inside) setCartOpen(false);
    }
  });

  // Hero pagination dots synced to lookbook grid
  const setActiveLook = (index) => {
    const safeIdx = Math.max(0, Math.min(2, index));
    const slide = LOOK_HIGHLIGHTS[safeIdx];
    dotBtns.forEach((btn, idx) => {
      const active = idx === safeIdx;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-selected', String(active));
    });
    if (heroSlideLabel) heroSlideLabel.textContent = slide.label;
    if (heroSlideCaption) heroSlideCaption.textContent = slide.caption;
    if (lookbookLive) lookbookLive.textContent = `Look ${slide.label.replace(/\s+/g, '')} anchored in hero frame`;
    lookCards.forEach((card) => {
      const cardIdx = Number.parseInt(card.dataset.lookIndex || '0', 10);
      card.classList.toggle('is-highlighted', cardIdx === safeIdx);
    });
  };

  dotBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => setActiveLook(idx));
    btn.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
      event.preventDefault();
      const delta = event.key === 'ArrowRight' ? 1 : -1;
      const nextIdx = (idx + delta + dotBtns.length) % dotBtns.length;
      dotBtns[nextIdx].focus();
      setActiveLook(nextIdx);
    });
  });

  // Size selectors + Add to cart
  lookCards.forEach((card) => {
    const sizeBtns = [...card.querySelectorAll('.size-btn')];
    sizeBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        sizeBtns.forEach((s) => s.classList.toggle('is-selected', s === btn));
      });
    });

    const addBtn = card.querySelector('.btn-cart');
    addBtn?.addEventListener('click', () => {
      const selectedSize = card.querySelector('.size-btn.is-selected')?.dataset.size || 'M';
      const title = addBtn.dataset.title || 'Look 01';
      const price = Number.parseInt(addBtn.dataset.price || '960', 10);
      const existing = cart.find((item) => item.title === title && item.size === selectedSize);
      if (existing) {
        existing.qty += 1;
      } else {
        cart.push({ title, size: selectedSize, price, qty: 1 });
      }
      addBtn.classList.add('is-added');
      addBtn.textContent = `ADDED (${selectedSize})`;
      renderCart();
      if (lookbookLive) {
        const count = cart.reduce((sum, item) => sum + item.qty, 0);
        lookbookLive.textContent = `${title} size ${selectedSize} added. Cart has ${count} pieces.`;
      }
    });
  });

  // RSVP form
  if (rsvpForm) {
    rsvpForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const nameVal = rsvpName?.value.trim() || '';
      const emailVal = rsvpEmail?.value.trim() || '';
      const lookVal = rsvpLook?.value || '01 / 06 Pinstripe Overcoat';

      if (!nameVal) {
        if (rsvpError) {
          rsvpError.textContent = 'Enter your name for the Mercer Street guest register.';
          rsvpError.hidden = false;
        }
        rsvpName?.focus();
        return;
      }
      if (!emailVal || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) {
        if (rsvpError) {
          rsvpError.textContent = 'Enter a valid email address to receive viewing slots.';
          rsvpError.hidden = false;
        }
        rsvpEmail?.focus();
        return;
      }
      if (rsvpError) rsvpError.hidden = true;
      rsvpForm.hidden = true;
      if (rsvpSuccessMsg) {
        rsvpSuccessMsg.textContent = `${lookVal} held for ${nameVal} (${emailVal}) at Mercer Street Loft 4B.`;
      }
      if (rsvpSuccess) rsvpSuccess.hidden = false;
    });
  }

  rsvpReset?.addEventListener('click', () => {
    if (rsvpForm) {
      rsvpForm.reset();
      rsvpForm.hidden = false;
    }
    if (rsvpSuccess) rsvpSuccess.hidden = true;
    rsvpName?.focus();
  });

  // Reveal observer
  const revealEls = [...document.querySelectorAll('.reveal')];
  const revealAboveFold = () => {
    const limit = window.innerHeight * 0.92;
    revealEls.forEach((el) => {
      if (el.getBoundingClientRect().top <= limit) el.classList.add('is-visible');
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
    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }
})();
