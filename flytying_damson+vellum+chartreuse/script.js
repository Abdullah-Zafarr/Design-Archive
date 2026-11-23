'use strict';

const PATTERN_PLATES = {
  'plate-08': {
    code: 'PLATE 08 / SALMON SINGLE',
    shortCode: 'PLATE 08',
    numeral: '08',
    year: 'c. 1865',
    name: 'Green Highlander',
    note: 'Grant of Spey spring pattern built for peat-stained pools when birch buds break along the upper beats.',
    river: 'Spey & Tweed',
    season: 'Feb – May',
    temp: '4°C – 9°C',
    clarity: 'Peat spate · 1.2m–2.0m visibility',
    hook: '1/0 – 3/0 Forged Limerick single iron',
    tag: 'Flat silver tinsel and canary yellow floss silk',
    tail: 'Golden pheasant crest with barred wood duck fiber',
    body: 'Chartreuse floss rear third, green seal fur forward two-thirds',
    rib: 'Flat 16ct gold tinsel over oval silver twist',
    hackle: 'Dyed chartreuse cock hackle palmered from third turn',
    wing: 'Matched bronze mallard, barred wood duck, and golden pheasant'
  },
  'plate-11': {
    code: 'PLATE 11 / SALMON SINGLE',
    shortCode: 'PLATE 11',
    numeral: '11',
    year: 'c. 1850',
    name: 'Jock Scott',
    note: 'Lord John Scott’s classic two-section body dressed for clearing spate water under bright northern skies.',
    river: 'Tweed & Tay',
    season: 'Mar – Oct',
    temp: '6°C – 12°C',
    clarity: 'Clearing water · 1.5m–2.5m visibility',
    hook: '1/0 – 4/0 Forged Limerick single iron',
    tag: 'Fine silver twist and golden yellow silk floss',
    tail: 'Golden pheasant crest and Indian crow feather',
    body: 'Yellow silk rear half veiled in toucan; black silk forward half',
    rib: 'Flat silver tinsel paired with broad black ostrich butt',
    hackle: 'Natural black cock hackle over forward thorax with guinea throat',
    wing: 'Black turkey base, bustard, golden pheasant tail, and blue macaw horns'
  },
  'plate-14': {
    code: 'PLATE 14 / SALMON SINGLE',
    shortCode: 'PLATE 14',
    numeral: '14',
    year: 'c. 1848',
    name: 'Black Doctor',
    note: 'James Wright’s Sprouston dressing for twilight pools and cold overcast days on wide gravel runs.',
    river: 'Tweed & Dee',
    season: 'Apr – Nov',
    temp: '3°C – 10°C',
    clarity: 'Clear twilight · 2.0m+ visibility',
    hook: '2 – 2/0 Forged Limerick single iron',
    tag: 'Silver tinsel and scarlet wool butt band',
    tail: 'Golden pheasant crest and chatterer slip',
    body: 'Black silk floss wound smoothly from butt to head',
    rib: 'Oval silver tinsel at five even turns',
    hackle: 'Claret cock hackle at shoulder over speckled guinea hen',
    wing: 'Dark mottled turkey, golden pheasant tippet, and teal strips'
  },
  'plate-19': {
    code: 'PLATE 19 / SALMON SINGLE',
    shortCode: 'PLATE 19',
    numeral: '19',
    year: 'c. 1872',
    name: 'Durham Ranger',
    note: 'James Scruton’s high-contrast orange and black dressing built to turn fresh summer fish in rocky streams.',
    river: 'Tyne & Aberdeenshire Dee',
    season: 'May – Sep',
    temp: '8°C – 14°C',
    clarity: 'Gin-clear run · 2.5m+ visibility',
    hook: '4 – 1/0 Forged Limerick single iron',
    tag: 'Flat silver tinsel and pale yellow silk',
    tail: 'Golden pheasant crest with Indian crow feather',
    body: 'Orange silk butt, fiery brown seal fur middle, black seal fur head',
    rib: 'Flat silver tinsel and silver lace twist',
    hackle: 'Natural badger cock hackle paired with light blue chatterer throat',
    wing: 'Double golden pheasant tippets back-to-back with jungle cock cheeks'
  }
};

const MATERIAL_KITS = {
  feathers: {
    summary: '3 graded feather lots · CITES-certified bench stock',
    items: [
      {
        sku: 'MAT-F01',
        grade: 'Grade A',
        title: 'Dyed Chartreuse Cock Hackle',
        desc: 'Long-barb dry-dyed neck hackles matched for throat and palmered Highlanders.',
        weight: '12 g packet',
        origin: 'Scottish Borders dye vat',
        riverNote: 'Spey spring spates'
      },
      {
        sku: 'MAT-F02',
        grade: 'Select',
        title: 'Barred Wood Duck Flank',
        desc: 'Broad crisp-barred flank feathers selected for matched married wing shoulders.',
        weight: '18 paired plumes',
        origin: 'Licensed domestic aviary',
        riverNote: 'Tweed & Tay bright pools'
      },
      {
        sku: 'MAT-F03',
        grade: 'Archive',
        title: 'Golden Pheasant Crest & Tippet',
        desc: 'Curved amber crests with deep sheen for high-arch salmon tails and toppings.',
        weight: '10 full crests',
        origin: 'Highland estate stock',
        riverNote: 'Dee & Tyne clear water'
      }
    ]
  },
  tinsel: {
    summary: '3 metal & silk lots · Wound on beechwood bobbins',
    items: [
      {
        sku: 'MAT-T01',
        grade: '16ct Plate',
        title: 'French Oval Gold Tinsel',
        desc: 'Tarnish-resistant gilt copper core that seats cleanly along tapered floss bodies.',
        weight: '18 m bobbin',
        origin: 'Lyon wire mill',
        riverNote: 'Peat-stained beats'
      },
      {
        sku: 'MAT-T02',
        grade: 'Fine Spun',
        title: 'Flat Silver & Twist Tinsel',
        desc: 'Double-wound flat silver ribbon paired with fine oval silver counter-rib.',
        weight: '22 m bobbin',
        origin: 'Birmingham wire works',
        riverNote: 'Overcast autumn pools'
      },
      {
        sku: 'MAT-T03',
        grade: 'Single Strand',
        title: 'Unwaxed Chartreuse Silk Floss',
        desc: 'Four-ply mulberry floss that lays flat without ridges under open-loop ribs.',
        weight: '25 m card',
        origin: 'Macclesfield silk mill',
        riverNote: 'Highland spring flats'
      }
    ]
  },
  hooks: {
    summary: '3 iron lots · Hand-tempered carbon steel',
    items: [
      {
        sku: 'MAT-H01',
        grade: 'Japan Black',
        title: 'Forged Limerick Single Irons',
        desc: 'Heavy-wire tapered loop-eye salmon irons sized 1/0 through 3/0 with long spear point.',
        weight: '25 irons / tin',
        origin: 'Redditch pattern spec',
        riverNote: 'Heavy spring flows'
      },
      {
        sku: 'MAT-H02',
        grade: 'Bronze',
        title: 'Blind-Eye Gut-Loop Irons',
        desc: 'Traditional tapered shank irons ready for twisted silkworm gut or monofilament loops.',
        weight: '15 irons / tin',
        origin: 'Bench small batch',
        riverNote: 'Archival specimen frames'
      },
      {
        sku: 'MAT-H03',
        grade: 'Low Water',
        title: 'Fine-Wire Summer Singles',
        desc: 'Light-gauge forged singles in sizes 4 and 6 for subtle surface swing in summer levels.',
        weight: '25 irons / tin',
        origin: 'Redditch pattern spec',
        riverNote: 'Aberdeenshire Dee July runs'
      }
    ]
  }
};

const FORMAT_PRICES = {
  plate: { label: 'Archival Letterpress Plate', price: 24 },
  'fly-plate': { label: 'Single Dressed Fly + Plate', price: 58 },
  'bench-kit': { label: 'Full Bench Dressing Kit', price: 112 }
};

document.addEventListener('DOMContentLoaded', () => {
  initScrollReveals();
  initMobileDrawer();
  initPlateSwitcher();
  initMaterialKits();
  initOrderWorkbench();
});

function initScrollReveals() {
  const targets = document.querySelectorAll('.reveal');
  if (!targets.length) return;

  const revealAboveFold = () => {
    const thresholdY = window.innerHeight * 0.94;
    targets.forEach((el) => {
      if (el.getBoundingClientRect().top <= thresholdY) {
        el.classList.add('is-visible');
      }
    });
  };

  requestAnimationFrame(revealAboveFold);

  if (!('IntersectionObserver' in window)) {
    targets.forEach((el) => el.classList.add('is-visible'));
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

  targets.forEach((el) => {
    if (!el.classList.contains('is-visible')) {
      observer.observe(el);
    }
  });
}

function initMobileDrawer() {
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const links = drawer ? drawer.querySelectorAll('.drawer-link') : [];

  if (!openBtn || !closeBtn || !drawer) return;

  const setOpen = (isOpen) => {
    drawer.hidden = !isOpen;
    drawer.setAttribute('aria-hidden', String(!isOpen));
    openBtn.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      closeBtn.focus();
    } else {
      openBtn.focus();
    }
  };

  openBtn.addEventListener('click', () => setOpen(true));
  closeBtn.addEventListener('click', () => setOpen(false));
  drawer.addEventListener('click', (event) => {
    if (event.target === drawer) setOpen(false);
  });
  links.forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !drawer.hidden) {
      setOpen(false);
    }
  });
}

function initPlateSwitcher() {
  const tabs = document.querySelectorAll('.plate-tab');
  const panel = document.getElementById('plate-panel');
  const loadOrderBtn = document.getElementById('load-plate-order');

  if (!tabs.length || !panel) return;

  let activePlateKey = 'plate-08';

  const renderPlate = (key) => {
    const plate = PATTERN_PLATES[key];
    if (!plate) return;
    activePlateKey = key;

    document.getElementById('spec-code').textContent = plate.code;
    document.getElementById('spec-year').textContent = plate.year;
    document.getElementById('spec-numeral').textContent = plate.numeral;
    document.getElementById('spec-name').textContent = plate.name;
    document.getElementById('spec-note').textContent = plate.note;
    document.getElementById('spec-river').textContent = plate.river;
    document.getElementById('spec-season').textContent = plate.season;
    document.getElementById('spec-temp').textContent = plate.temp;
    document.getElementById('spec-clarity').textContent = plate.clarity;
    document.getElementById('spec-hook').textContent = plate.hook;
    document.getElementById('spec-tag').textContent = plate.tag;
    document.getElementById('spec-tail').textContent = plate.tail;
    document.getElementById('spec-body').textContent = plate.body;
    document.getElementById('spec-rib').textContent = plate.rib;
    document.getElementById('spec-hackle').textContent = plate.hackle;
    document.getElementById('spec-wing').textContent = plate.wing;
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((item) => {
        item.classList.remove('is-active');
        item.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      panel.setAttribute('aria-labelledby', tab.id);
      renderPlate(tab.dataset.plate);
    });
  });

  if (loadOrderBtn) {
    loadOrderBtn.addEventListener('click', () => {
      const radio = document.querySelector(`input[name="pattern"][value="${activePlateKey}"]`);
      if (radio) {
        radio.checked = true;
        radio.dispatchEvent(new Event('change', { bubbles: true }));
      }
      const orderSection = document.getElementById('order');
      if (orderSection) {
        orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

function initMaterialKits() {
  const tabs = document.querySelectorAll('.kit-tab');
  const grid = document.getElementById('materials-grid');
  const summaryEl = document.getElementById('kit-summary');

  if (!tabs.length || !grid) return;

  const kitAddonMap = {
    feathers: 'hackle',
    tinsel: 'tinsel',
    hooks: 'irons'
  };

  const renderKit = (kitKey) => {
    const kit = MATERIAL_KITS[kitKey];
    if (!kit) return;

    if (summaryEl) {
      summaryEl.textContent = kit.summary;
    }

    grid.innerHTML = '';
    kit.items.forEach((item) => {
      const cell = document.createElement('article');
      cell.className = 'material-cell';
      cell.innerHTML = `
        <div>
          <div class="material-meta-row">
            <span class="material-sku tabular">${item.sku}</span>
            <span class="material-grade">${item.grade}</span>
          </div>
          <h3 class="material-title">${item.title}</h3>
          <p class="material-desc">${item.desc}</p>
        </div>
        <dl class="material-specs">
          <div class="material-spec-row">
            <dt>Batch weight</dt>
            <dd class="tabular">${item.weight}</dd>
          </div>
          <div class="material-spec-row">
            <dt>Source</dt>
            <dd>${item.origin}</dd>
          </div>
          <div class="material-spec-row">
            <dt>River note</dt>
            <dd>${item.riverNote}</dd>
          </div>
        </dl>
        <button type="button" class="material-btn" data-addon="${kitAddonMap[kitKey] || 'hackle'}">
          <span>Reserve in bench order</span>
          <span aria-hidden="true">→</span>
        </button>
      `;
      grid.appendChild(cell);
    });

    grid.querySelectorAll('.material-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const addonBox = document.querySelector(`input[name="addon"][value="${btn.dataset.addon}"]`);
        if (addonBox) {
          addonBox.checked = true;
          addonBox.dispatchEvent(new Event('change', { bubbles: true }));
        }
        const orderSection = document.getElementById('order');
        if (orderSection) {
          orderSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  };

  renderKit('feathers');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((item) => {
        item.classList.remove('is-active');
        item.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected', 'true');
      grid.setAttribute('aria-labelledby', tab.id);
      renderKit(tab.dataset.kit);
    });
  });
}

function initOrderWorkbench() {
  const form = document.getElementById('order-form');
  if (!form) return;

  const formatSelect = document.getElementById('order-format');
  const decBtn = document.getElementById('qty-dec');
  const incBtn = document.getElementById('qty-inc');
  const qtyValEl = document.getElementById('qty-val');
  const addonBoxes = form.querySelectorAll('input[name="addon"]');
  const patternRadios = form.querySelectorAll('input[name="pattern"]');

  const sumPattern = document.getElementById('sum-pattern');
  const sumFormatLabel = document.getElementById('sum-format-label');
  const sumFormatPrice = document.getElementById('sum-format-price');
  const sumQty = document.getElementById('sum-qty');
  const sumAddonsPrice = document.getElementById('sum-addons-price');
  const sumAddonList = document.getElementById('sum-addon-list');
  const sumTotal = document.getElementById('sum-total');

  const errorEl = document.getElementById('form-error');
  const ledgerLive = document.getElementById('ledger-live');
  const ledgerReceipt = document.getElementById('ledger-receipt');
  const receiptRef = document.getElementById('receipt-ref');
  const receiptCopy = document.getElementById('receipt-copy');
  const receiptDetails = document.getElementById('receipt-details');
  const receiptReset = document.getElementById('receipt-reset');

  let qty = 1;

  const updateSummary = () => {
    const selectedPatternInput = form.querySelector('input[name="pattern"]:checked');
    const plateKey = selectedPatternInput ? selectedPatternInput.value : 'plate-08';
    const plate = PATTERN_PLATES[plateKey];
    const fmt = FORMAT_PRICES[formatSelect.value] || FORMAT_PRICES['fly-plate'];

    let addonsTotal = 0;
    const addonLabels = [];
    addonBoxes.forEach((box) => {
      if (box.checked) {
        addonsTotal += Number(box.dataset.price || 0);
        addonLabels.push(box.dataset.label);
      }
    });

    const subtotal = fmt.price * qty + addonsTotal;

    sumPattern.textContent = `${plate.shortCode} · ${plate.name}`;
    sumFormatLabel.textContent = fmt.label;
    sumFormatPrice.textContent = `£${fmt.price}`;
    sumQty.textContent = String(qty);
    sumAddonsPrice.textContent = `£${addonsTotal}`;
    sumTotal.textContent = `£${subtotal}`;

    sumAddonList.innerHTML = '';
    addonLabels.forEach((label) => {
      const li = document.createElement('li');
      li.textContent = `· ${label}`;
      sumAddonList.appendChild(li);
    });

    return { plate, fmt, qty, addonsTotal, addonLabels, subtotal };
  };

  decBtn.addEventListener('click', () => {
    if (qty > 1) {
      qty -= 1;
      qtyValEl.textContent = String(qty);
      updateSummary();
    }
  });

  incBtn.addEventListener('click', () => {
    if (qty < 10) {
      qty += 1;
      qtyValEl.textContent = String(qty);
      updateSummary();
    }
  });

  formatSelect.addEventListener('change', updateSummary);
  addonBoxes.forEach((box) => box.addEventListener('change', updateSummary));
  patternRadios.forEach((radio) => radio.addEventListener('change', updateSummary));

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const tyerName = document.getElementById('tyer-name').value.trim();
    const tyerEmail = document.getElementById('tyer-email').value.trim();
    const riverNote = document.getElementById('river-note').value.trim();

    if (!tyerName || !tyerEmail || !tyerEmail.includes('@')) {
      errorEl.textContent = 'Enter a tyer name and valid dispatch email to log a bench order.';
      errorEl.hidden = false;
      return;
    }

    errorEl.hidden = true;
    const summary = updateSummary();
    const refDigits = String(Math.floor(1000 + Math.random() * 8999));

    receiptRef.textContent = `HS-EDN-${refDigits}`;
    receiptCopy.textContent = `Logged for ${tyerName} (${tyerEmail}). Your bench packet is scheduled for hand inspection and wax-sealed dispatch.`;

    receiptDetails.innerHTML = `
      <div class="ledger-line">
        <dt>Pattern</dt>
        <dd>${summary.plate.shortCode} · ${summary.plate.name}</dd>
      </div>
      <div class="ledger-line">
        <dt>Format</dt>
        <dd>${summary.fmt.label} × ${summary.qty}</dd>
      </div>
      <div class="ledger-line">
        <dt>Material add-ons</dt>
        <dd>${summary.addonLabels.length ? `${summary.addonLabels.length} lot(s)` : 'None'}</dd>
      </div>
      ${riverNote ? `<div class="ledger-line"><dt>Bench note</dt><dd>${riverNote}</dd></div>` : ''}
      <div class="ledger-line">
        <dt>Total due on dispatch</dt>
        <dd class="tabular">£${summary.subtotal}</dd>
      </div>
    `;

    ledgerLive.hidden = true;
    ledgerReceipt.hidden = false;
  });

  receiptReset.addEventListener('click', () => {
    form.reset();
    qty = 1;
    qtyValEl.textContent = '1';
    errorEl.hidden = true;
    ledgerReceipt.hidden = true;
    ledgerLive.hidden = false;
    updateSummary();
  });

  updateSummary();
}
