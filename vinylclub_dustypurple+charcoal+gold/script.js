(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const drawerClose = document.getElementById('drawer-close');
  const mobileNavLinks = Array.from(document.querySelectorAll('.mobile-nav-link'));

  const turntableBtn = document.getElementById('turntable-toggle');
  const turntableStatus = document.getElementById('turntable-status');
  const vinylSideText = document.getElementById('vinyl-side-text');
  const vinylTitleTop = document.getElementById('vinyl-title-top');
  const vinylTitleBot = document.getElementById('vinyl-title-bot');
  const vinylRpmText = document.getElementById('vinyl-rpm-text');

  const tabs = Array.from(document.querySelectorAll('[role="tab"]'));
  const albumCards = Array.from(document.querySelectorAll('.album-card'));
  const albumsCount = document.getElementById('albums-count');
  const spinButtons = Array.from(document.querySelectorAll('.spin-btn'));

  const reserveButtons = Array.from(document.querySelectorAll('.reserve-btn'));
  const eventsLive = document.getElementById('events-live');

  const joinForm = document.getElementById('join-form');
  const joinConfirmation = document.getElementById('join-confirmation');
  const confirmationSummary = document.getElementById('confirmation-summary');
  const joinReset = document.getElementById('join-reset');
  const nameInput = document.getElementById('member-name');
  const emailInput = document.getElementById('member-email');
  const roomSelect = document.getElementById('member-room');

  let activeCatalog = null;

  /* 1. Sticky Header Condensation */
  function syncHeaderState() {
    if (!header) return;
    header.classList.toggle('is-condensed', window.scrollY > 28);
  }
  syncHeaderState();
  window.addEventListener('scroll', syncHeaderState, { passive: true });

  /* 2. Mobile Drawer */
  function setDrawerOpen(open) {
    if (!mobileDrawer || !menuToggle) return;
    mobileDrawer.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
    if (open && drawerClose) {
      drawerClose.focus();
    } else if (!open) {
      menuToggle.focus();
    }
  }

  if (menuToggle && mobileDrawer) {
    menuToggle.addEventListener('click', () => setDrawerOpen(true));
  }
  if (drawerClose) {
    drawerClose.addEventListener('click', () => setDrawerOpen(false));
  }
  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (event) => {
      if (event.target === mobileDrawer) setDrawerOpen(false);
    });
  }
  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileDrawer && !mobileDrawer.hidden) setDrawerOpen(false);
    });
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && mobileDrawer && !mobileDrawer.hidden) {
      setDrawerOpen(false);
    }
  });

  /* 3. Interactive Turntable & Archive Integration */
  function syncArchiveButtons(isSpinning) {
    albumCards.forEach((card) => {
      const cat = card.dataset.cat;
      const btn = card.querySelector('.spin-btn');
      const isActiveCard = isSpinning && activeCatalog === cat;
      card.classList.toggle('is-playing', activeCatalog === cat && isSpinning);
      if (btn) {
        btn.setAttribute('aria-pressed', String(isActiveCard));
        btn.textContent = isActiveCard ? 'Now spinning' : 'Spin Side A';
      }
    });
  }

  function setTurntablePlaying(playing) {
    if (!turntableBtn) return;
    turntableBtn.setAttribute('aria-pressed', String(playing));
    const titleLabel = `${vinylTitleTop?.textContent || 'SIDE A'} ${vinylTitleBot?.textContent || 'SOCIETY'}`.trim();
    if (turntableStatus) {
      turntableStatus.textContent = playing
        ? `Spinning Side A: ${titleLabel}`
        : `Turntable paused on ${titleLabel}`;
    }
    syncArchiveButtons(playing);
  }

  if (turntableBtn) {
    turntableBtn.addEventListener('click', () => {
      const currentlyPlaying = turntableBtn.getAttribute('aria-pressed') === 'true';
      setTurntablePlaying(!currentlyPlaying);
    });
  }

  spinButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.album-card');
      if (!card) return;
      const { cat, titleTop, titleBot, rpm } = card.dataset;
      const isAlreadySpinning =
        activeCatalog === cat &&
        turntableBtn?.getAttribute('aria-pressed') === 'true';

      if (isAlreadySpinning) {
        setTurntablePlaying(false);
        return;
      }

      activeCatalog = cat || null;
      if (vinylSideText) vinylSideText.textContent = cat ? `${cat} · SIDE A` : 'SIDE A';
      if (vinylTitleTop) vinylTitleTop.textContent = titleTop || 'SIDE A';
      if (vinylTitleBot) vinylTitleBot.textContent = titleBot || 'SOCIETY';
      if (vinylRpmText) vinylRpmText.textContent = rpm || '33⅓ RPM';

      setTurntablePlaying(true);

      const heroEl = document.getElementById('top');
      if (heroEl) {
        heroEl.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  /* 4. Genre Filter Tabs */
  function selectGenreTab(selectedTab) {
    const genre = selectedTab.dataset.genre || 'all';
    tabs.forEach((tab) => {
      const isSelected = tab === selectedTab;
      tab.setAttribute('aria-selected', String(isSelected));
      tab.setAttribute('tabindex', isSelected ? '0' : '-1');
    });

    let visibleCount = 0;
    albumCards.forEach((card) => {
      const match = genre === 'all' || card.dataset.genre === genre;
      card.hidden = !match;
      if (match) {
        visibleCount += 1;
        card.classList.add('is-visible');
      }
    });

    if (albumsCount) {
      const label = visibleCount === 1 ? 'archival pressing' : 'archival pressings';
      albumsCount.textContent = `Showing ${visibleCount} ${label}`;
    }
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectGenreTab(tab));
    tab.addEventListener('keydown', (event) => {
      let nextIndex = null;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex !== null) {
        event.preventDefault();
        tabs[nextIndex].focus();
        selectGenreTab(tabs[nextIndex]);
      }
    });
  });

  /* 5. Live Seat Reservations */
  reserveButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const row = btn.closest('.event-row');
      const seatsEl = row?.querySelector('.event-seats');
      const roomName = row?.querySelector('.event-room')?.textContent || 'Listening room';
      if (!seatsEl) return;

      const baseSeats = Number.parseInt(seatsEl.dataset.seats || '0', 10);
      const willReserve = btn.getAttribute('aria-pressed') !== 'true';
      const remaining = willReserve ? Math.max(baseSeats - 1, 0) : baseSeats;

      btn.setAttribute('aria-pressed', String(willReserve));
      btn.textContent = willReserve ? 'Seat reserved' : 'Reserve seat';
      seatsEl.classList.toggle('is-held', willReserve);
      seatsEl.textContent = willReserve
        ? `Seat held · ${remaining} left`
        : `${baseSeats} seats left`;

      if (willReserve && roomSelect && !roomSelect.value && btn.dataset.roomSelect) {
        roomSelect.value = btn.dataset.roomSelect;
      }

      if (eventsLive) {
        eventsLive.textContent = willReserve
          ? `Held one seat for ${roomName}. ${remaining} seats left.`
          : `Released seat hold for ${roomName}. ${baseSeats} seats left.`;
      }
    });
  });

  /* 6. Membership Application Validation & Confirmation */
  function setFieldError(input, errorId, message) {
    const errorEl = document.getElementById(errorId);
    if (!input || !errorEl) return;
    const hasError = Boolean(message);
    input.setAttribute('aria-invalid', String(hasError));
    errorEl.hidden = !hasError;
    errorEl.textContent = message;
  }

  function validateJoinForm() {
    let firstInvalid = null;
    const nameVal = nameInput?.value.trim() || '';
    const emailVal = emailInput?.value.trim() || '';
    const roomVal = roomSelect?.value || '';

    if (nameVal.length < 2) {
      setFieldError(nameInput, 'name-error', 'Enter your full name to hold a monthly pass.');
      firstInvalid = firstInvalid || nameInput;
    } else {
      setFieldError(nameInput, 'name-error', '');
    }

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    if (!emailValid) {
      setFieldError(emailInput, 'email-error', 'Enter a valid email address for room confirmations.');
      firstInvalid = firstInvalid || emailInput;
    } else {
      setFieldError(emailInput, 'email-error', '');
    }

    if (!roomVal) {
      setFieldError(roomSelect, 'room-error', 'Choose your preferred Thursday listening room.');
      firstInvalid = firstInvalid || roomSelect;
    } else {
      setFieldError(roomSelect, 'room-error', '');
    }

    if (firstInvalid) {
      firstInvalid.focus();
      return false;
    }
    return true;
  }

  if (joinForm) {
    [nameInput, emailInput, roomSelect].forEach((field) => {
      field?.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') validateJoinForm();
      });
    });

    joinForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!validateJoinForm()) return;

      const memberName = nameInput.value.trim();
      const memberEmail = emailInput.value.trim();
      const memberRoom = roomSelect.value;

      if (confirmationSummary) {
        confirmationSummary.textContent =
          `${memberName} (${memberEmail}) is queued for £15/mo seating at ${memberRoom}. Doors open Thursday at 19:30 with two natural wine pours ready at the bar.`;
      }

      joinForm.hidden = true;
      if (joinConfirmation) {
        joinConfirmation.hidden = false;
        joinReset?.focus();
      }
    });
  }

  if (joinReset && joinForm && joinConfirmation) {
    joinReset.addEventListener('click', () => {
      joinForm.reset();
      setFieldError(nameInput, 'name-error', '');
      setFieldError(emailInput, 'email-error', '');
      setFieldError(roomSelect, 'room-error', '');
      joinConfirmation.hidden = true;
      joinForm.hidden = false;
      nameInput?.focus();
    });
  }

  /* 7. Scroll Reveal Choreography */
  const revealNodes = Array.from(document.querySelectorAll('.reveal'));
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealNodes.forEach((node) => node.classList.add('is-visible'));
  } else {
    requestAnimationFrame(() => {
      const viewportLimit = window.innerHeight * 0.94;
      revealNodes.forEach((node) => {
        if (node.getBoundingClientRect().top < viewportLimit) {
          node.classList.add('is-visible');
        }
      });
    });

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

    revealNodes.forEach((node) => observer.observe(node));
  }
})();
