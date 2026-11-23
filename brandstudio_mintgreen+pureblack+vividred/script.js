(() => {
  'use strict';

  const CASE_STUDIES = {
    identity: {
      index: '01 / BRAND IDENTITY',
      title: 'Distinct visual systems for enduring recall',
      summary: 'Architectural marks, bespoke wordmarks, and print-to-screen design languages engineered to hold form across hardware, packaging, and digital surfaces.',
      metrics: [
        { label: 'Systems shipped', value: '24' },
        { label: 'Avg sprint length', value: '4 wks' },
        { label: 'Brand recall lift', value: '+38%' },
        { label: 'Token parity', value: '100%' }
      ],
      deliverables: [
        'Primary mark geometry and optical size variants',
        'Three-role typographic hierarchy and tabular spec sheets',
        'Color architecture calibrated for print, OLED, and signage',
        'Component guidelines and production Figma libraries'
      ]
    },
    product: {
      index: '02 / PRODUCT DESIGN',
      title: 'Thoughtful interfaces built for daily precision',
      summary: 'End-to-end digital and hardware-companion interfaces grounded in direct manipulation, clear state transitions, and sub-second task completion.',
      metrics: [
        { label: 'Shipped products', value: '19' },
        { label: 'Task time drop', value: '-34%' },
        { label: 'Accessibility', value: 'WCAG AA' },
        { label: 'Design QA pass', value: '0 bugs' }
      ],
      deliverables: [
        'Workflow architecture and low-latency interaction specs',
        'Responsive design tokens and accessible state matrices',
        'Interactive prototypes tested with live domain operators',
        'Production handoff alongside frontend engineering'
      ]
    },
    creative: {
      index: '03 / MARKETING CREATIVE',
      title: 'Launch campaigns engineered for conversation',
      summary: 'High-contrast editorial direction, bespoke 3D motion sculptures, and flagship product launches designed to cut through feed noise without filler.',
      metrics: [
        { label: 'Launch reach', value: '14.2M' },
        { label: 'Direct conversion', value: '+46%' },
        { label: 'Film & 3D assets', value: '60+' },
        { label: 'Turnaround', value: '21 days' }
      ],
      deliverables: [
        'Campaign art direction and key-frame visual language',
        'Procedural 3D product sculptures and kinetic typography',
        'Flagship launch landing pages and interactive demos',
        'Out-of-home, print editorial, and social cutdowns'
      ]
    },
    kurogane: {
      index: '01 / KUROGANE OPTICS',
      title: 'Kurogane Optics Identity System',
      summary: 'Complete visual overhaul for a Tokyo precision lens manufacturer entering direct-to-creator retail.',
      metrics: [
        { label: 'Sell-through lift', value: '+42%' },
        { label: 'Retail doors', value: '38' },
        { label: 'Packaging SKUs', value: '16' },
        { label: 'Year', value: '2025' }
      ],
      deliverables: [
        'Laser-etched barrel typography and anodized spec rings',
        'Monochrome foil packaging system across 16 focal lengths',
        'Flagship lookbook and optical test chart microsite'
      ]
    },
    vektor: {
      index: '02 / VEKTOR AUDIO',
      title: 'Vektor Audio DSP Workspace',
      summary: 'Hardware-synced tactile interface for Berlin studio synthesizers and spatial routing processors.',
      metrics: [
        { label: 'Control latency', value: '1.8ms' },
        { label: 'Active studios', value: '6,200' },
        { label: 'Setup time', value: '-48%' },
        { label: 'Year', value: '2025' }
      ],
      deliverables: [
        'High-contrast darkroom OLED UI for stage legibility',
        'Tabular routing matrix and real-time FFT analyzer',
        'Cross-platform desktop companion application'
      ]
    },
    sora: {
      index: '03 / SORA MOBILITY',
      title: 'Sora Mobility Launch Campaign',
      summary: 'City-scale transit launch spanning Shibuya digital boards, print broadsheets, and commuter route tools.',
      metrics: [
        { label: 'Impressions', value: '3.4M' },
        { label: 'Waitlist signups', value: '94K' },
        { label: 'Cities', value: '04' },
        { label: 'Year', value: '2024' }
      ],
      deliverables: [
        '3D light-ribbon vehicle teasers and transit posters',
        'Interactive commuter range calculator and reservation flow',
        'Press kit and founder launch keynote visuals'
      ]
    },
    helios: {
      index: '04 / HELIOS FREIGHT',
      title: 'Helios Freight Fleet Identity',
      summary: 'Unified industrial livery, depot wayfinding, and dispatch portal for autonomous regional cargo corridors.',
      metrics: [
        { label: 'Depots unified', value: '18' },
        { label: 'Fleet vehicles', value: '420' },
        { label: 'Wayfinding time', value: '-29%' },
        { label: 'Year', value: '2024' }
      ],
      deliverables: [
        'High-visibility stencil system for automated bays',
        'Modular brand manual for regional engineering teams',
        'Live yard telemetry badge and safety signage suite'
      ]
    },
    tactile: {
      index: '05 / TACTILE OS',
      title: 'Tactile OS Industrial Controls',
      summary: 'Touch-safe supervisory interface engineered for gloved operators in high-noise manufacturing cells.',
      metrics: [
        { label: 'Error reduction', value: '-37%' },
        { label: 'Tap target floor', value: '56px' },
        { label: 'Lines deployed', value: '11' },
        { label: 'Year', value: '2024' }
      ],
      deliverables: [
        'Alert taxonomy eliminating decorative status color noise',
        'One-handed diagnostic drawer and shift handover log',
        'Zero-latency keyboard and rotary encoder bindings'
      ]
    },
    'monolith-press': {
      index: '06 / MONOLITH PRESS',
      title: 'Monolith Press Architecture Series',
      summary: 'Editorial art direction, variable spine grid, and global print launch for an independent architecture imprint.',
      metrics: [
        { label: 'First run sold', value: '12,400' },
        { label: 'Bookstores', value: '140' },
        { label: 'Editions', value: '04' },
        { label: 'Year', value: '2023' }
      ],
      deliverables: [
        'Four-volume Swiss grid monograph system',
        'Direct-to-reader archive storefront and reading room',
        'Exhibition posters and launch reading series'
      ]
    }
  };

  const SPRINT_WEEKS = [
    {
      num: '01',
      window: 'Days 01–05 · Discovery & Baseline',
      title: 'Structural audit and category teardown',
      desc: 'We strip existing brand, product, and conversion surfaces down to measurable friction before drawing a single frame.',
      deliverables: [
        ['01 Surface inventory', 'Full catalog of typography, grids, and tactile inconsistencies'],
        ['02 Competitive map', 'Visual positioning benchmark across 12 sector peers'],
        ['03 Exit gate', 'Signed brief locking scope, success metrics, and timeline']
      ]
    },
    {
      num: '02',
      window: 'Days 06–10 · Visual Thesis',
      title: 'Core direction and focal art craft',
      desc: 'We lock the palette triad, typographic hierarchy, and signature 3D or editorial focal moments on real viewport proportions.',
      deliverables: [
        ['01 Direction boards', 'Two distinct structural routes tested at full desktop and mobile scale'],
        ['02 Focal artifact', 'Custom 3D sculpture, motion study, or hero composition'],
        ['03 Exit gate', 'Single selected direction locked for system expansion']
      ]
    },
    {
      num: '03',
      window: 'Days 11–15 · Production System',
      title: 'Component rules and interactive states',
      desc: 'Every surface step, hover inversion, responsive breakpoint, and form state is built into a cohesive production library.',
      deliverables: [
        ['01 Token ledger', 'Verified WCAG AA color pairs, 4px spacing scale, and tabular numerals'],
        ['02 Interactive kit', 'Buttons, filters, drawers, and keyboard focus choreography'],
        ['03 Exit gate', 'Design QA walkthrough across desktop and 390px viewports']
      ]
    },
    {
      num: '04',
      window: 'Days 16–20 · Ship & Handover',
      title: 'Live deployment and clean documentation',
      desc: 'We finalize production assets, verify zero console or layout defects, and hand over clean code and source files.',
      deliverables: [
        ['01 Production build', 'Audited HTML, CSS, JS, or component package ready to deploy'],
        ['02 Asset vault', 'Exported marks, type specs, and procedural art generators'],
        ['03 Exit gate', 'Partner sign-off and post-launch optimization checklist']
      ]
    }
  ];

  // ================= CANVAS 3D VIVID RED ARTWORKS =================
  function drawSphereArt(canvas) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;
    const h = rect.height;
    const cx = w * 0.5;
    const cy = h * 0.49;
    const r = Math.min(w, h) * 0.44;

    ctx.clearRect(0, 0, w, h);

    // Subtle ambient outer glow strictly hugging the sphere
    const outerGlow = ctx.createRadialGradient(cx, cy, r * 0.72, cx, cy, r * 1.18);
    outerGlow.addColorStop(0, 'rgba(255, 0, 0, 0.24)');
    outerGlow.addColorStop(0.65, 'rgba(180, 0, 0, 0.06)');
    outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = outerGlow;
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.18, 0, Math.PI * 2);
    ctx.fill();

    // Clip to main sphere
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.clip();

    // Base dark obsidian sphere fill with subtle bottom-right crimson warmth
    const baseGrad = ctx.createRadialGradient(cx + r * 0.35, cy + r * 0.45, r * 0.1, cx, cy, r);
    baseGrad.addColorStop(0, '#5E0000');
    baseGrad.addColorStop(0.55, '#190000');
    baseGrad.addColorStop(1, '#020000');
    ctx.fillStyle = baseGrad;
    ctx.fillRect(cx - r, cy - r, r * 2, r * 2);

    // Fine radial concentric striations inside the sphere
    for (let i = 0; i < 42; i++) {
      const t = i / 42;
      ctx.strokeStyle = `rgba(255, 16, 16, ${0.03 + 0.04 * Math.sin(t * Math.PI)})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx - r * 0.1, cy - r * 0.05, r * (0.18 + t * 0.85), -0.4, Math.PI * 1.15);
      ctx.stroke();
    }

    // Upper-left sculpted luminous red quadrant lobe
    const topLeftGrad = ctx.createRadialGradient(cx - r * 0.22, cy - r * 0.18, r * 0.05, cx - r * 0.25, cy - r * 0.2, r * 0.92);
    topLeftGrad.addColorStop(0, '#FF1212');
    topLeftGrad.addColorStop(0.35, '#B80000');
    topLeftGrad.addColorStop(0.78, '#280000');
    topLeftGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = topLeftGrad;
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.06, cy + r * 0.06);
    ctx.lineTo(cx - r * 0.06, cy - r);
    ctx.arc(cx, cy, r, -Math.PI * 0.5, Math.PI * 0.92, true);
    ctx.closePath();
    ctx.fill();

    // Sweeping center-right folded glass wing
    const wingGrad = ctx.createRadialGradient(cx - r * 0.05, cy + r * 0.1, r * 0.04, cx + r * 0.22, cy + r * 0.2, r * 0.9);
    wingGrad.addColorStop(0, '#FF2020');
    wingGrad.addColorStop(0.28, '#D90000');
    wingGrad.addColorStop(0.65, '#3D0000');
    wingGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = wingGrad;
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.06, cy + r * 0.06);
    ctx.bezierCurveTo(cx + r * 0.25, cy - r * 0.15, cx + r * 0.72, cy + r * 0.12, cx + r * 0.88, cy + r * 0.56);
    ctx.arc(cx, cy, r, 0.58, Math.PI * 0.95);
    ctx.closePath();
    ctx.fill();

    // Core specular hot-spot at the fold vertex
    const coreGlow = ctx.createRadialGradient(cx - r * 0.06, cy + r * 0.06, 1, cx - r * 0.06, cy + r * 0.06, r * 0.34);
    coreGlow.addColorStop(0, 'rgba(255, 72, 72, 0.95)');
    coreGlow.addColorStop(0.35, 'rgba(255, 0, 0, 0.65)');
    coreGlow.addColorStop(1, 'rgba(255, 0, 0, 0)');
    ctx.fillStyle = coreGlow;
    ctx.beginPath();
    ctx.arc(cx - r * 0.06, cy + r * 0.06, r * 0.34, 0, Math.PI * 2);
    ctx.fill();

    // Razor-sharp inner fold edge highlight
    ctx.strokeStyle = 'rgba(255, 65, 65, 0.85)';
    ctx.lineWidth = 1.6;
    ctx.beginPath();
    ctx.moveTo(cx - r * 0.06, cy - r * 0.94);
    ctx.lineTo(cx - r * 0.06, cy + r * 0.06);
    ctx.bezierCurveTo(cx + r * 0.24, cy - r * 0.12, cx + r * 0.68, cy + r * 0.12, cx + r * 0.88, cy + r * 0.56);
    ctx.stroke();

    // Vivid Red Fresnel perimeter rim arcs (bottom-right & top-left)
    ctx.lineWidth = 3.2;
    const rimGrad = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
    rimGrad.addColorStop(0, '#FF1E1E');
    rimGrad.addColorStop(0.35, 'rgba(180, 0, 0, 0.15)');
    rimGrad.addColorStop(0.65, 'rgba(255, 0, 0, 0.55)');
    rimGrad.addColorStop(1, '#FF1A1A');
    ctx.strokeStyle = rimGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, r - 1.5, 0, Math.PI * 2);
    ctx.stroke();

    ctx.restore();
  }

  function drawRibsArt(canvas) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    // Subtle crimson base bloom behind the front-left ribs
    const bloom = ctx.createRadialGradient(w * 0.22, h * 0.34, 6, w * 0.28, h * 0.42, w * 0.62);
    bloom.addColorStop(0, 'rgba(255, 0, 0, 0.22)');
    bloom.addColorStop(0.6, 'rgba(120, 0, 0, 0.06)');
    bloom.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = bloom;
    ctx.fillRect(0, 0, w, h);

    // Draw 46 parametric 3D arched ribs sweeping back-to-front / right-to-left
    const total = 46;
    for (let i = total - 1; i >= 0; i--) {
      const t = i / (total - 1); // 0 = front-left brightest, 1 = back-right darkest
      const baseX = -w * 0.06 + t * w * 0.62;
      const startY = h * (0.28 - t * 0.16);
      const peakX = w * (0.16 + t * 0.52);
      const peakY = h * (0.04 + t * 0.16);
      const endX = w * (0.48 + t * 0.68);
      const endY = h * (0.96 - t * 0.24);
      const ribDepth = h * (0.68 - t * 0.28);

      // Rib fin polygon body
      const fillGrad = ctx.createLinearGradient(baseX, peakY, endX, endY);
      const alpha = Math.max(0.06, 1 - t * 0.9);
      const rCol = Math.round(255 * Math.pow(1 - t, 1.35));
      const gCol = 0;
      const bCol = 0;

      fillGrad.addColorStop(0, `rgba(${rCol}, ${gCol}, ${bCol}, ${0.85 * alpha})`);
      fillGrad.addColorStop(0.45, `rgba(${Math.round(rCol * 0.48)}, 0, 0, ${0.72 * alpha})`);
      fillGrad.addColorStop(1, 'rgba(6, 0, 0, 0.92)');

      ctx.beginPath();
      ctx.moveTo(baseX, startY);
      ctx.bezierCurveTo(peakX, peakY, endX * 0.78, h * (0.28 + t * 0.1), endX, endY);
      ctx.lineTo(endX - w * 0.08, endY + ribDepth * 0.32);
      ctx.bezierCurveTo(peakX - w * 0.1, peakY + ribDepth * 0.58, baseX - w * 0.04, startY + ribDepth, baseX, startY + ribDepth);
      ctx.closePath();
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Specular top crest rim on each rib
      const strokeGrad = ctx.createLinearGradient(baseX, startY, endX, endY);
      strokeGrad.addColorStop(0, `rgba(255, ${Math.round(45 * (1 - t))}, ${Math.round(45 * (1 - t))}, ${0.95 * alpha})`);
      strokeGrad.addColorStop(0.55, `rgba(195, 0, 0, ${0.55 * alpha})`);
      strokeGrad.addColorStop(1, `rgba(55, 0, 0, ${0.18 * alpha})`);

      ctx.strokeStyle = strokeGrad;
      ctx.lineWidth = t < 0.25 ? 1.5 : 1.05;
      ctx.beginPath();
      ctx.moveTo(baseX, startY);
      ctx.bezierCurveTo(peakX, peakY, endX * 0.78, h * (0.28 + t * 0.1), endX, endY);
      ctx.stroke();
    }
  }

  function drawPrismArt(canvas) {
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const w = rect.width;
    const h = rect.height;
    ctx.clearRect(0, 0, w, h);

    // Ambient center prism scatter glow
    const glow = ctx.createRadialGradient(w * 0.54, h * 0.52, 8, w * 0.54, h * 0.52, w * 0.58);
    glow.addColorStop(0, 'rgba(255, 0, 0, 0.26)');
    glow.addColorStop(0.55, 'rgba(130, 0, 0, 0.08)');
    glow.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Plane 1: Upper-left sweeping translucent red light wing
    const p1 = ctx.createLinearGradient(w * 0.06, h * 0.64, w * 0.76, h * 0.12);
    p1.addColorStop(0, 'rgba(90, 0, 0, 0.15)');
    p1.addColorStop(0.5, 'rgba(220, 0, 0, 0.78)');
    p1.addColorStop(1, 'rgba(255, 25, 25, 0.95)');
    ctx.fillStyle = p1;
    ctx.beginPath();
    ctx.moveTo(-w * 0.04, h * 0.56);
    ctx.lineTo(w * 0.56, h * 0.08);
    ctx.lineTo(w * 0.88, h * 0.34);
    ctx.lineTo(w * 0.24, h * 0.74);
    ctx.closePath();
    ctx.fill();

    // Plane 2: Deep shadow cut-out triangular prism cavity
    const p2 = ctx.createLinearGradient(w * 0.35, h * 0.28, w * 0.65, h * 0.54);
    p2.addColorStop(0, 'rgba(0, 0, 0, 0.94)');
    p2.addColorStop(1, 'rgba(38, 0, 0, 0.82)');
    ctx.fillStyle = p2;
    ctx.beginPath();
    ctx.moveTo(w * 0.36, h * 0.35);
    ctx.lineTo(w * 0.63, h * 0.29);
    ctx.lineTo(w * 0.49, h * 0.51);
    ctx.closePath();
    ctx.fill();

    // Plane 3: Diagonal razor-sharp bright ribbon slicing across lower half
    const p3 = ctx.createLinearGradient(w * 0.02, h * 0.76, w * 0.96, h * 0.38);
    p3.addColorStop(0, 'rgba(70, 0, 0, 0.12)');
    p3.addColorStop(0.42, 'rgba(255, 0, 0, 0.72)');
    p3.addColorStop(0.7, 'rgba(180, 0, 0, 0.45)');
    p3.addColorStop(1, 'rgba(255, 20, 20, 0.85)');
    ctx.fillStyle = p3;
    ctx.beginPath();
    ctx.moveTo(-w * 0.04, h * 0.78);
    ctx.lineTo(w * 0.62, h * 0.46);
    ctx.lineTo(w * 1.04, h * 0.68);
    ctx.lineTo(w * 0.42, h * 0.88);
    ctx.closePath();
    ctx.fill();

    // Glowing laser-sharp fold creases
    const creases = [
      [w * 0.02, h * 0.74, w * 0.88, h * 0.34, 2.4],
      [w * 0.56, h * 0.08, w * 0.88, h * 0.34, 1.8],
      [w * 0.56, h * 0.08, w * 0.14, h * 0.64, 1.5],
      [w * 0.36, h * 0.35, w * 0.98, h * 0.66, 2.0]
    ];

    creases.forEach(([x1, y1, x2, y2, lw]) => {
      // Soft halo pass
      ctx.strokeStyle = 'rgba(255, 0, 0, 0.35)';
      ctx.lineWidth = lw * 3.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();

      // Core hot filament
      const lineGrad = ctx.createLinearGradient(x1, y1, x2, y2);
      lineGrad.addColorStop(0, 'rgba(255, 30, 30, 0.3)');
      lineGrad.addColorStop(0.5, 'rgba(255, 110, 110, 0.98)');
      lineGrad.addColorStop(1, 'rgba(255, 20, 20, 0.45)');
      ctx.strokeStyle = lineGrad;
      ctx.lineWidth = lw;
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    });
  }

  function renderAllArt() {
    document.querySelectorAll('.art-canvas').forEach((canvas) => {
      const kind = canvas.dataset.art;
      if (kind === 'sphere') drawSphereArt(canvas);
      else if (kind === 'ribs') drawRibsArt(canvas);
      else if (kind === 'prism') drawPrismArt(canvas);
    });
  }

  // ================= HERO CAROUSEL & PROGRESS =================
  const cards = Array.from(document.querySelectorAll('.discipline-card'));
  const viewport = document.getElementById('showcase-viewport');
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  const progressCurrent = document.getElementById('progress-current');
  const progressTrack = document.getElementById('progress-track');
  const progressFill = document.getElementById('progress-fill');
  let activeSlide = 0;

  function updateSlide(index, scrollIntoView = false) {
    activeSlide = (index + cards.length) % cards.length;
    cards.forEach((card, i) => {
      card.classList.toggle('is-active', i === activeSlide);
    });

    const numStr = String(activeSlide + 1).padStart(2, '0');
    progressCurrent.textContent = numStr;
    progressTrack.setAttribute('aria-valuenow', String(activeSlide + 1));
    progressFill.style.transform = `scaleX(${(activeSlide + 1) / cards.length})`;

    if (scrollIntoView && window.innerWidth <= 900 && viewport) {
      const target = cards[activeSlide];
      viewport.scrollTo({
        left: target.offsetLeft - viewport.offsetLeft,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
      });
    }
  }

  prevBtn?.addEventListener('click', () => updateSlide(activeSlide - 1, true));
  nextBtn?.addEventListener('click', () => updateSlide(activeSlide + 1, true));

  document.addEventListener('keydown', (e) => {
    if (document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
    if (!caseDrawer.hidden || !mobileDrawer.hidden) return;
    if (e.key === 'ArrowLeft') updateSlide(activeSlide - 1, true);
    if (e.key === 'ArrowRight') updateSlide(activeSlide + 1, true);
  });

  // Sync mobile swipe scroll back to progress bar
  if (viewport) {
    let scrollTimer;
    viewport.addEventListener('scroll', () => {
      if (window.innerWidth > 900) return;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        const w = viewport.clientWidth;
        if (!w) return;
        const idx = Math.round(viewport.scrollLeft / w);
        if (idx !== activeSlide && idx >= 0 && idx < cards.length) {
          updateSlide(idx, false);
        }
      }, 60);
    }, { passive: true });
  }

  // ================= CASE STUDY DRAWER =================
  const caseDrawer = document.getElementById('case-drawer');
  const caseBackdrop = document.getElementById('case-backdrop');
  const caseCloseBtn = document.getElementById('case-drawer-close');
  const caseIndexEl = document.getElementById('case-drawer-index');
  const caseTitleEl = document.getElementById('case-drawer-title');
  const caseSummaryEl = document.getElementById('case-drawer-summary');
  const caseMetricsEl = document.getElementById('case-drawer-metrics');
  const caseListEl = document.getElementById('case-drawer-list');
  const caseCtaBtn = document.getElementById('case-drawer-cta');
  let lastTriggerEl = null;

  function openCaseDrawer(key, triggerEl) {
    const data = CASE_STUDIES[key];
    if (!data) return;
    lastTriggerEl = triggerEl || document.activeElement;

    caseIndexEl.textContent = data.index;
    caseTitleEl.textContent = data.title;
    caseSummaryEl.textContent = data.summary;

    caseMetricsEl.innerHTML = data.metrics
      .map((m) => `<div class="case-metric-cell"><dt>${m.label}</dt><dd class="tabular">${m.value}</dd></div>`)
      .join('');

    caseListEl.innerHTML = data.deliverables
      .map((item) => `<li>${item}</li>`)
      .join('');

    caseBackdrop.hidden = false;
    caseDrawer.hidden = false;
    document.body.style.overflow = 'hidden';
    caseCloseBtn.focus();
  }

  function closeCaseDrawer() {
    caseDrawer.hidden = true;
    caseBackdrop.hidden = true;
    document.body.style.overflow = '';
    if (lastTriggerEl && typeof lastTriggerEl.focus === 'function') {
      lastTriggerEl.focus();
    }
  }

  document.querySelectorAll('[data-open-case]').forEach((btn) => {
    btn.addEventListener('click', () => openCaseDrawer(btn.dataset.openCase, btn));
  });

  caseCloseBtn?.addEventListener('click', closeCaseDrawer);
  caseBackdrop?.addEventListener('click', closeCaseDrawer);
  caseCtaBtn?.addEventListener('click', closeCaseDrawer);

  // ================= MOBILE DRAWER =================
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileClose = document.getElementById('mobile-drawer-close');

  function openMobileDrawer() {
    mobileDrawer.hidden = false;
    mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    mobileClose.focus();
  }

  function closeMobileDrawer() {
    mobileDrawer.hidden = true;
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    mobileToggle.focus();
  }

  mobileToggle?.addEventListener('click', openMobileDrawer);
  mobileClose?.addEventListener('click', closeMobileDrawer);
  mobileDrawer?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileDrawer.hidden = true;
      mobileToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (!caseDrawer.hidden) closeCaseDrawer();
      else if (!mobileDrawer.hidden) closeMobileDrawer();
    }
  });

  // ================= SELECTED ARCHIVE FILTERING =================
  const filterTabs = document.querySelectorAll('.filter-tab');
  const ledgerRows = document.querySelectorAll('.ledger-row');

  filterTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.filter;
      filterTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });

      ledgerRows.forEach((row) => {
        const match = target === 'all' || row.dataset.category === target;
        row.hidden = !match;
        if (match) row.classList.add('is-visible');
      });
    });
  });

  // ================= FOUR-WEEK SPRINT SWITCHER =================
  const sprintTabs = document.querySelectorAll('.sprint-tab');
  const sprintNum = document.getElementById('sprint-week-num');
  const sprintWindow = document.getElementById('sprint-window');
  const sprintTitle = document.getElementById('sprint-phase-title');
  const sprintDesc = document.getElementById('sprint-phase-desc');
  const sprintDeliverables = document.getElementById('sprint-deliverables');

  sprintTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const week = SPRINT_WEEKS[Number(tab.dataset.week)];
      if (!week) return;

      sprintTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle('is-active', active);
        t.setAttribute('aria-selected', String(active));
      });

      sprintNum.textContent = week.num;
      sprintWindow.textContent = week.window;
      sprintTitle.textContent = week.title;
      sprintDesc.textContent = week.desc;
      sprintDeliverables.innerHTML = week.deliverables
        .map(([dt, dd]) => `<div class="deliverable-row"><dt>${dt}</dt><dd>${dd}</dd></div>`)
        .join('');
    });
  });

  // ================= PROJECT BRIEF FORM =================
  const briefForm = document.getElementById('brief-form');
  const emailInput = document.getElementById('work-email');
  const emailError = document.getElementById('email-error');
  const receiptState = document.getElementById('receipt-state');
  const receiptId = document.getElementById('receipt-id');
  const receiptDiscipline = document.getElementById('receipt-discipline');
  const receiptWindow = document.getElementById('receipt-window');
  const receiptEmail = document.getElementById('receipt-email');
  const resetFormBtn = document.getElementById('reset-form-btn');

  briefForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailVal = emailInput.value.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);

    if (!validEmail) {
      emailError.textContent = 'Enter a valid work email address to dispatch the brief.';
      emailError.hidden = false;
      emailInput.focus();
      return;
    }

    emailError.hidden = true;
    const selectedDiscipline = briefForm.querySelector('input[name="discipline"]:checked')?.value || 'Brand Identity';
    const selectedWindow = document.getElementById('launch-window').value;
    const code = String(Math.floor(1000 + Math.random() * 9000));

    receiptId.textContent = `REF-2026-${code}`;
    receiptDiscipline.textContent = selectedDiscipline;
    receiptWindow.textContent = selectedWindow;
    receiptEmail.textContent = emailVal;

    briefForm.hidden = true;
    receiptState.hidden = false;
  });

  resetFormBtn?.addEventListener('click', () => {
    briefForm.reset();
    emailError.hidden = true;
    receiptState.hidden = true;
    briefForm.hidden = false;
    emailInput.focus();
  });

  // ================= SCROLL REVEALS =================
  function initReveals() {
    const items = document.querySelectorAll('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((el) => el.classList.add('is-visible'));
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

    requestAnimationFrame(() => {
      items.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.92) {
          el.classList.add('is-visible');
        } else {
          observer.observe(el);
        }
      });
    });
  }

  // Initialize
  renderAllArt();
  updateSlide(0, false);
  initReveals();

  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(renderAllArt, 120);
  });
})();
