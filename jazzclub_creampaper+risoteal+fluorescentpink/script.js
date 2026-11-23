const SETS = {
  set1: {
    label: 'Set 1 · 21:30',
    time: '21:30 — 22:35',
    seats: '14 seats left',
    artist: 'Kaito Takahashi Tenor Quartet',
    notes: 'Post-bop originals and modal ballads recorded direct to quarter-inch reel-to-reel tape in the back booth.',
    price: '£22',
    lineup: [
      ['Tenor Sax', 'Kaito Takahashi'],
      ['Upright Piano', 'Maren Solberg'],
      ['Double Bass', 'Theo Okonkwo'],
      ['Drums', 'Jonas Lind'],
    ],
  },
  set2: {
    label: 'Set 2 · 23:00',
    time: '23:00 — 00:05',
    seats: '6 seats left',
    artist: 'Nadia Vance Quintet',
    notes: 'High-velocity Soho hard bop featuring dual horn harmonies and extended upright bass solos.',
    price: '£24',
    lineup: [
      ['Trumpet', 'Nadia Vance'],
      ['Alto Sax', 'Miles Corbin'],
      ['Piano', 'Claire Moreau'],
      ['Drums', 'Rashid Ali'],
    ],
  },
  set3: {
    label: 'Set 3 · 00:30',
    time: '00:30 — 01:45',
    seats: '19 seats left',
    artist: 'After-Hours Cellar Trio + Guests',
    notes: 'Unamplified midnight ballads and open horn blowing session until last order at 02:15.',
    price: '£18',
    lineup: [
      ['Tenor Sax', 'Tomasz Kowal'],
      ['Double Bass', 'Elena Morales'],
      ['Drums', 'Samir Haddad'],
      ['Guest Slot', 'Open stage after 01:05'],
    ],
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  // Header scroll state
  const syncHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 24);
  };
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  // Mobile drawer
  const setDrawer = (open) => {
    menuToggle.setAttribute('aria-expanded', String(open));
    mobileDrawer.hidden = !open;
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setDrawer(!isOpen);
  });

  mobileDrawer.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setDrawer(false));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !mobileDrawer.hidden) {
      setDrawer(false);
      menuToggle.focus();
    }
  });

  // Set switcher
  let activeSetKey = 'set1';
  let seatCount = 2;

  const setTabs = document.querySelectorAll('.set-tab');
  const activeTime = document.getElementById('active-set-time');
  const activeSeats = document.getElementById('active-set-seats');
  const activeArtist = document.getElementById('active-set-artist');
  const activeNotes = document.getElementById('active-set-notes');
  const activePrice = document.getElementById('active-set-price');
  const activeLineup = document.getElementById('active-set-lineup');
  const holdSetBtn = document.getElementById('hold-set-btn');

  const renderSet = (key) => {
    const data = SETS[key];
    if (!data) return;
    activeSetKey = key;
    activeTime.textContent = data.time;
    activeSeats.textContent = data.seats;
    activeArtist.textContent = data.artist;
    activeNotes.textContent = data.notes;
    activePrice.textContent = data.price;
    activeLineup.innerHTML = data.lineup
      .map(([role, name]) => `<div><dt>${role}</dt><dd>${name}</dd></div>`)
      .join('');
    holdSetBtn.textContent = `Hold seats for ${data.label.split(' · ')[0]}`;
  };

  setTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      setTabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      renderSet(tab.dataset.set);
    });
  });

  // Seat counter
  const qtyVal = document.getElementById('qty-val');
  document.getElementById('qty-dec').addEventListener('click', () => {
    if (seatCount > 1) {
      seatCount -= 1;
      qtyVal.textContent = String(seatCount);
    }
  });
  document.getElementById('qty-inc').addEventListener('click', () => {
    if (seatCount < 4) {
      seatCount += 1;
      qtyVal.textContent = String(seatCount);
    }
  });

  // Pre-fill booking form from Set Hold or Programme Row
  const bookingShow = document.getElementById('booking-show');
  const bookingSet = document.getElementById('booking-set');
  const bookingSeats = document.getElementById('booking-seats');

  holdSetBtn.addEventListener('click', () => {
    const data = SETS[activeSetKey];
    bookingShow.value = `TONIGHT — ${data.artist}`;
    bookingSet.value = data.label;
    bookingSeats.value = seatCount >= 3 ? '4' : String(seatCount);
    document.getElementById('tickets').scrollIntoView({ behavior: 'smooth' });
  });

  // Programme filter
  const filterTabs = document.querySelectorAll('.filter-tab');
  const rows = document.querySelectorAll('.ledger-row');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const genre = tab.dataset.genre;
      filterTabs.forEach((t) => {
        t.classList.remove('is-active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');

      rows.forEach((row) => {
        row.hidden = genre !== 'all' && row.dataset.genre !== genre;
      });
    });
  });

  document.querySelectorAll('.ledger-action').forEach((btn) => {
    btn.addEventListener('click', () => {
      bookingShow.value = btn.dataset.book;
      document.getElementById('tickets').scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Door list form
  const form = document.getElementById('ticket-form');
  const errorMsg = document.getElementById('ticket-error');
  const confirmBox = document.getElementById('ticket-confirmation');
  const confirmSummary = document.getElementById('confirm-summary');
  const confirmDetails = document.getElementById('confirm-details');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('booking-email').value.trim();
    if (!email || !email.includes('@')) {
      errorMsg.hidden = false;
      return;
    }
    errorMsg.hidden = true;
    const seats = bookingSeats.value;
    const set = bookingSet.value;
    const show = bookingShow.value.trim();
    confirmSummary.textContent = `${seats} ${Number(seats) === 1 ? 'seat' : 'seats'} held for ${set}`;
    confirmDetails.textContent = `${show}. Confirmation sent to ${email}. Check in 15 minutes before downbeat.`;
    form.hidden = true;
    confirmBox.hidden = false;
  });

  document.getElementById('reset-booking').addEventListener('click', () => {
    form.reset();
    confirmBox.hidden = true;
    form.hidden = false;
  });

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
    );
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }
});
