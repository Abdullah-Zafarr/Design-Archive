(() => {
  'use strict';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  const updateHeaderScroll = () => {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 36);
  };
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });
  updateHeaderScroll();

  if (menuToggle && mobileDrawer) {
    const closeDrawer = () => {
      mobileDrawer.hidden = true;
      menuToggle.setAttribute('aria-expanded', 'false');
    };

    menuToggle.addEventListener('click', () => {
      const open = mobileDrawer.hidden;
      mobileDrawer.hidden = !open;
      menuToggle.setAttribute('aria-expanded', String(open));
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !mobileDrawer.hidden) {
        closeDrawer();
        menuToggle.focus();
      }
    });
  }

  // Reveal observer
  const reveals = document.querySelectorAll('.reveal');
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
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // Chapter 01: Seven Pavilions Data & Switcher
  const ROOMS = {
    take: {
      code: 'PAVILION 01 OF 07',
      kanji: '竹 · Bamboo Wing',
      name: 'Take — East Gravel Veranda',
      description:
        'Positioned along the morning-lit eastern corridor with low shoji screens framing the wave-raked Shirakawa gravel and moss mound.',
      view: 'East karesansui wave field & moss berm',
      tatami: '10 mats · 46 m² (3.6 × 5.4 m main room)',
      bath: 'Kiso cypress tub · 1,400 × 800 mm · 41°C spring fill',
      material: 'Kitayama cedar posts & Juraku clay walls',
      rate: '¥68,000',
      guests: '2 adults',
      optionValue: 'Take — ¥68,000 / night',
      label: 'Take',
    },
    matsu: {
      code: 'PAVILION 02 OF 07',
      kanji: '松 · Pine Alcove',
      name: 'Matsu — Leaning Pine Pavilion',
      description:
        'Anchored beneath a century-old red pine whose boughs cross the deep-eaved engawa deck and stone water basin.',
      view: 'Akamatsu red pine & tsukubai stone basin',
      tatami: '12 mats · 54 m² (4.5 × 5.4 m main room)',
      bath: 'Deep hinoki soaking tub · 1,500 × 850 mm · 41°C',
      material: 'Smoked cedar ceiling & hand-troweled lime plaster',
      rate: '¥74,000',
      guests: '2 adults',
      optionValue: 'Matsu — ¥74,000 / night',
      label: 'Matsu',
    },
    kiri: {
      code: 'PAVILION 03 OF 07',
      kanji: '桐 · Paulownia Suite',
      name: 'Kiri — Quiet Study & Hearth',
      description:
        'Includes an adjoining two-mat writing alcove overlooking the northern moss border and pale granite stepping stones.',
      view: 'North moss border & Kurama stone path',
      tatami: '12 mats + 2-mat study · 58 m²',
      bath: 'Dual-depth cypress tub · 1,550 × 850 mm · 41°C',
      material: 'Unfinished paulownia cabinetry & Kurotani washi',
      rate: '¥78,000',
      guests: '2 adults',
      optionValue: 'Kiri — ¥78,000 / night',
      label: 'Kiri',
    },
    sugi: {
      code: 'PAVILION 04 OF 07',
      kanji: '杉 · Cedar Hall',
      name: 'Sugi — Corner Courtyard Suite',
      description:
        'Dual-aspect glass corner opening onto both the central raked gravel ocean and a private walled bamboo shadow garden.',
      view: 'Central gravel ocean & private west bamboo court',
      tatami: '14 mats · 64 m² (corner veranda)',
      bath: 'Semi-open hinoki bath · 1,600 × 900 mm · 42°C',
      material: 'Straight-grain Yoshino cedar & grey Kyoto mud',
      rate: '¥84,000',
      guests: '3 adults',
      optionValue: 'Sugi — ¥84,000 / night',
      label: 'Sugi',
    },
    ume: {
      code: 'PAVILION 05 OF 07',
      kanji: '梅 · Plum Blossom',
      name: 'Ume — South Lantern Pavilion',
      description:
        'Set back behind whitewashed earthen walls with an early-blooming white plum tree visible directly from the sunken tea table.',
      view: 'South plum grove & Oribe stone lantern',
      tatami: '15 mats · 68 m² (with sunken ro hearth)',
      bath: 'Garden-facing cypress bath · 1,650 × 900 mm · 41°C',
      material: 'Aged chestnut beams & indigo-dyed linen screens',
      rate: '¥92,000',
      guests: '3 adults',
      optionValue: 'Ume — ¥92,000 / night',
      label: 'Ume',
    },
    kaede: {
      code: 'PAVILION 06 OF 07',
      kanji: '楓 · Maple Pavilion',
      name: 'Kaede — West Canopy Residence',
      description:
        'Elevated slightly above the gravel bed to frame mountain maple foliage and long late-afternoon shadows across the courtyard.',
      view: 'Iroha maple canopy & central stone triad',
      tatami: '16 mats · 76 m² (separate sleeping quarters)',
      bath: 'Wide Kiso hinoki & Aji stone floor · 1,700 × 950 mm',
      material: 'Charred cedar exterior & warm grey Juraku plaster',
      rate: '¥98,000',
      guests: '3 adults',
      optionValue: 'Kaede — ¥98,000 / night',
      label: 'Kaede',
    },
    kiku: {
      code: 'PAVILION 07 OF 07',
      kanji: '菊 · Inner Sanctuary',
      name: 'Kiku — Detached Tea Residence',
      description:
        'The innermost detached pavilion featuring a private tokonoma tea room, wraparound veranda, and uninterrupted full-garden sightline.',
      view: 'Full panoramic karesansui garden & Higashiyama ridge',
      tatami: '18 mats · 88 m² (two-room suite + tea room)',
      bath: 'Private cedar bathhouse · 1,800 × 1,000 mm · 42°C',
      material: '200-year reclaimed hinoki & Echizen handmade paper',
      rate: '¥112,000',
      guests: '4 adults',
      optionValue: 'Kiku — ¥112,000 / night',
      label: 'Kiku',
    },
  };

  const roomTabs = Array.from(document.querySelectorAll('.room-tab'));
  const selectRoomBtn = document.getElementById('select-room-btn');
  const resRoomSelect = document.getElementById('res-room');
  let activeRoomKey = 'take';

  const renderRoom = (key) => {
    const room = ROOMS[key];
    if (!room) return;
    activeRoomKey = key;

    document.getElementById('room-code').textContent = room.code;
    document.getElementById('room-kanji').textContent = room.kanji;
    document.getElementById('room-name').textContent = room.name;
    document.getElementById('room-description').textContent = room.description;
    document.getElementById('spec-view').textContent = room.view;
    document.getElementById('spec-tatami').textContent = room.tatami;
    document.getElementById('spec-bath').textContent = room.bath;
    document.getElementById('spec-material').textContent = room.material;
    document.getElementById('room-rate').textContent = room.rate;
    document.getElementById('room-guests').textContent = room.guests;
    if (selectRoomBtn) {
      selectRoomBtn.textContent = `Select ${room.label} for inquiry`;
    }

    roomTabs.forEach((tab) => {
      const isActive = tab.dataset.room === key;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
  };

  roomTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => renderRoom(tab.dataset.room));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const nextIndex =
          e.key === 'ArrowRight'
            ? (index + 1) % roomTabs.length
            : (index - 1 + roomTabs.length) % roomTabs.length;
        roomTabs[nextIndex].focus();
        renderRoom(roomTabs[nextIndex].dataset.room);
      }
    });
  });

  if (selectRoomBtn && resRoomSelect) {
    selectRoomBtn.addEventListener('click', () => {
      const room = ROOMS[activeRoomKey];
      if (room) {
        resRoomSelect.value = room.optionValue;
      }
      document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' });
      document.getElementById('res-date')?.focus({ preventScroll: true });
    });
  }

  // Chapter 02: Seasonal Kaiseki Ledger
  const KAISEKI_MENUS = {
    autumn: [
      {
        course: '01 · SAKIZUKE',
        dish: 'Steamed Ginkgo & Sesame Tofu',
        notes: 'Freshly ground black sesame, warm Kyoto yuba, grated wasabi root',
        vessel: 'Shigaraki stone dish',
      },
      {
        course: '02 · OWAN',
        dish: 'Matsutake & Pike Conger Clear Broth',
        notes: 'Two-year Rishiri kombu dashi, Tamba pine mushroom, yuzu peel',
        vessel: 'Wajima black lacquer',
      },
      {
        course: '03 · TSUKURI',
        dish: 'Maizuru Sea Bream & Squid Sashimi',
        notes: 'Aged kombu-cured tai, aged tamari soy, chrysanthemum petals',
        vessel: 'Bizen unglazed plate',
      },
      {
        course: '04 · YAKIMONO',
        dish: 'Charcoal-Grilled Sweetfish & Chestnut',
        notes: 'Binchotan-seared Biwa ayu, roasted Tamba chestnut, sansho vinegar',
        vessel: 'Oribe glazed platter',
      },
      {
        course: '05 · SHOKUJI',
        dish: 'Donabe Smoked Duck & Maitake Rice',
        notes: 'Iga clay pot rice, red miso akadashi, house-pickled Kyoto turnip',
        vessel: 'Iga earthen pot',
      },
    ],
    winter: [
      {
        course: '01 · SAKIZUKE',
        dish: 'Steamed Snow Crab & Chrysanthemum Gelée',
        notes: 'Taiza crab leg, toasted white sesame, sudachi citrus zest',
        vessel: 'Karatsu ash bowl',
      },
      {
        course: '02 · OWAN',
        dish: 'Turnip Purée & Tilefish Broth',
        notes: 'Shogoin turnip, crisp-scaled Wakasa amadai, white miso base',
        vessel: 'Vermilion urushi bowl',
      },
      {
        course: '03 · TSUKURI',
        dish: 'Winter Yellowtail & Blowfish Thin Slice',
        notes: 'Himi kanburi, ponzu steeped with dried bitter orange',
        vessel: 'Kiyomizu celadon',
      },
      {
        course: '04 · TAKIAWASE',
        dish: 'Simmered Kyoto Taro & Braised Daikon',
        notes: 'Ebi-imo taro, roasted duck breast, ginger-infused glaze',
        vessel: 'Raku stoneware',
      },
      {
        course: '05 · SHOKUJI',
        dish: 'Oyster & Ginger Clay Pot Rice',
        notes: 'Hiroshima oysters, julienned young ginger, roasted green tea',
        vessel: 'Banko clay donabe',
      },
    ],
    tea: [
      {
        course: '01 · MIZUGASHI',
        dish: 'Chilled Persimmon & Walnut Paste',
        notes: 'Light palate cleanser served in the cedar tea alcove at 16:00',
        vessel: 'Hagi pale glaze',
      },
      {
        course: '02 · ICHIJŪ SANSAI',
        dish: 'Warm White Miso & Wheat Gluten Soup',
        notes: 'Kyoto Saikyo miso, mustard seed dot, toasted rice cake',
        vessel: 'Negoro red lacquer',
      },
      {
        course: '03 · NIMONO',
        dish: 'Braised Lotus Root & Mountain Yam',
        notes: 'Delicate kelp stock with grated yuzu rind and pine nut',
        vessel: 'Seto iron bowl',
      },
      {
        course: '04 · OMOGASHI',
        dish: 'Warm Chestnut Kinton Confection',
        notes: 'Hand-sieved Tamba chestnut over dark adzuki bean core',
        vessel: 'Kuromoji cedar pick',
      },
      {
        course: '05 · KOICHA',
        dish: 'Uji Stone-Milled Thick Matcha',
        notes: 'Single-estate Samidori cultivar whisked with spring well water',
        vessel: 'Kuro Raku chawan',
      },
    ],
  };

  const kaisekiList = document.getElementById('kaiseki-list');
  const filterTabs = Array.from(document.querySelectorAll('.filter-tab'));

  const renderKaiseki = (seasonKey) => {
    const items = KAISEKI_MENUS[seasonKey];
    if (!items || !kaisekiList) return;

    kaisekiList.innerHTML = items
      .map(
        (item) => `
      <li class="kaiseki-row">
        <span class="kaiseki-course">${item.course}</span>
        <span class="kaiseki-dish">${item.dish}</span>
        <span class="kaiseki-notes">${item.notes}</span>
        <span class="kaiseki-vessel">${item.vessel}</span>
      </li>
    `
      )
      .join('');

    filterTabs.forEach((tab) => {
      const isActive = tab.dataset.season === seasonKey;
      tab.classList.toggle('is-active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    });
  };

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => renderKaiseki(tab.dataset.season));
  });
  renderKaiseki('autumn');

  // Chapter 03: Reservation Inquiry Form
  const reserveForm = document.getElementById('reserve-form');
  const reserveError = document.getElementById('reserve-error');
  const reserveConfirmation = document.getElementById('reserve-confirmation');
  const confirmRef = document.getElementById('confirm-ref');
  const confirmSummary = document.getElementById('confirm-summary');
  const resetReserveBtn = document.getElementById('reset-reserve-btn');
  const resDateInput = document.getElementById('res-date');

  if (resDateInput) {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 14);
    const iso = defaultDate.toISOString().split('T')[0];
    resDateInput.min = new Date().toISOString().split('T')[0];
    resDateInput.value = iso;
  }

  if (reserveForm && reserveError && reserveConfirmation) {
    reserveForm.addEventListener('submit', (e) => {
      e.preventDefault();
      reserveError.hidden = true;

      const arrivalDate = document.getElementById('res-date').value.trim();
      const seating = document.getElementById('res-seating').value;
      const room = document.getElementById('res-room').value;
      const guestName = document.getElementById('res-name').value.trim();
      const guestEmail = document.getElementById('res-email').value.trim();

      if (!arrivalDate) {
        reserveError.textContent = 'Select an arrival date to proceed.';
        reserveError.hidden = false;
        document.getElementById('res-date').focus();
        return;
      }

      if (guestName.length < 2) {
        reserveError.textContent = 'Enter the primary guest name for the house ledger.';
        reserveError.hidden = false;
        document.getElementById('res-name').focus();
        return;
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) {
        reserveError.textContent = 'Enter a valid email address for pavilion confirmation.';
        reserveError.hidden = false;
        document.getElementById('res-email').focus();
        return;
      }

      const refNumber = `HNR-${arrivalDate.replace(/-/g, '').slice(2)}-${String(
        Math.floor(100 + Math.random() * 899)
      )}`;

      confirmRef.textContent = `Reference ${refNumber}`;
      confirmSummary.innerHTML = '';

      const rows = [
        ['Guest', guestName],
        ['Arrival', arrivalDate],
        ['Pavilion', room],
        ['Kaiseki', seating],
        ['Reply to', guestEmail],
      ];

      rows.forEach(([label, value]) => {
        const row = document.createElement('div');
        const dt = document.createElement('dt');
        const dd = document.createElement('dd');
        dt.textContent = label;
        dd.textContent = value;
        row.appendChild(dt);
        row.appendChild(dd);
        confirmSummary.appendChild(row);
      });

      reserveForm.hidden = true;
      reserveConfirmation.hidden = false;
    });
  }

  if (resetReserveBtn && reserveForm && reserveConfirmation) {
    resetReserveBtn.addEventListener('click', () => {
      reserveConfirmation.hidden = true;
      reserveForm.hidden = false;
      document.getElementById('res-date')?.focus();
    });
  }
})();
