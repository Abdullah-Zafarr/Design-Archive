(() => {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');

  // Condense and frost header when scrolling past hero top
  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 28);
  }
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // Mobile navigation drawer
  if (menuToggle && mobileDrawer) {
    function setDrawer(open) {
      menuToggle.setAttribute('aria-expanded', String(open));
      mobileDrawer.hidden = !open;
    }

    menuToggle.addEventListener('click', () => {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      setDrawer(!isOpen);
    });

    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => setDrawer(false));
    });

    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape' && !mobileDrawer.hidden) {
        setDrawer(false);
        menuToggle.focus();
      }
    });
  }

  // Services phase tab switcher
  const PHASES = {
    strategy: {
      tabId: 'tab-strategy',
      tag: 'Phase 01 · Advisory & Feasibility',
      title: 'Data readiness, unit economics, and model selection',
      desc: 'We audit internal telemetry, quantify inference cost per workflow, and lock governance guardrails before committing engineering budget.',
      m1Val: '3 weeks',
      m1Lbl: 'Fixed-scope technical discovery',
      m2Val: '100%',
      m2Lbl: 'Source traceability on data pipelines',
      specs: [
        {
          title: 'Telemetry & Corpus Audit',
          desc: 'Schema profiling, PII redaction mapping, and retrieval benchmark scoring across existing warehouses.',
          meta: 'Deliverable: Readiness Ledger',
        },
        {
          title: 'Inference Cost Modeling',
          desc: 'Token budget forecasting comparing hosted foundation endpoints against quantized open-weight models.',
          meta: 'Deliverable: Unit Cost Model',
        },
        {
          title: 'Evaluation Harness Spec',
          desc: 'Golden dataset curation and pass/fail regression thresholds signed off by domain stakeholders.',
          meta: 'Deliverable: Eval Protocol',
        },
      ],
    },
    architecture: {
      tabId: 'tab-architecture',
      tag: 'Phase 02 · Systems Blueprint',
      title: 'Multi-model routing, hybrid retrieval, and schema enforcement',
      desc: 'We design deterministic orchestration pipelines across Azure, AWS, Google Cloud, and NVIDIA clusters with strict latency and citation contracts.',
      m1Val: '<180ms',
      m1Lbl: 'Target retrieval and routing overhead',
      m2Val: 'Zero',
      m2Lbl: 'Unvalidated schema payloads in transit',
      specs: [
        {
          title: 'Hybrid Retrieval Graph',
          desc: 'Dense vector plus BM25 lexical fusion with role-based access filtering enforced at chunk retrieval.',
          meta: 'Stack: Azure AI / Vertex / pgvector',
        },
        {
          title: 'Deterministic Tool Contracts',
          desc: 'Strict JSON schema validation and automatic retry boundaries around every external API execution.',
          meta: 'Guarantee: Typed I/O Envelopes',
        },
        {
          title: 'Cluster Inference Topology',
          desc: 'TensorRT-LLM serving layouts, batching profiles, and failover routing across multi-region endpoints.',
          meta: 'Stack: NVIDIA Triton / AWS Bedrock',
        },
      ],
    },
    deployment: {
      tabId: 'tab-deployment',
      tag: 'Phase 03 · Production Rollout',
      title: 'Shadow verification, observability, and team handover',
      desc: 'Models enter shadow traffic against live operational baselines before progressive cutover with full telemetry ownership transferred to your engineers.',
      m1Val: '99.8%',
      m1Lbl: 'Contracted production uptime SLA',
      m2Val: '4.2x',
      m2Lbl: 'Measured workflow throughput gain',
      specs: [
        {
          title: 'Shadow Canary Gating',
          desc: 'Parallel production mirroring comparing candidate model outputs against deterministic baseline assertions.',
          meta: 'Gate: Automated Drift Alerts',
        },
        {
          title: 'Trace & Citation Telemetry',
          desc: 'Per-request prompt lineage, latency histograms, and token spend dashboards tied to business units.',
          meta: 'Standard: OpenTelemetry Native',
        },
        {
          title: 'Full IP & Runbook Transfer',
          desc: 'Complete Terraform modules, model weights, and incident playbooks handed over with zero vendor lock-in.',
          meta: 'Outcome: Autonomous Ops',
        },
      ],
    },
  };

  const tabBtns = Array.from(document.querySelectorAll('.tab-btn'));
  const servicePanel = document.getElementById('service-panel');

  function activatePhase(phaseKey) {
    const data = PHASES[phaseKey];
    if (!data || !servicePanel) return;

    tabBtns.forEach((btn) => {
      const selected = btn.dataset.phase === phaseKey;
      btn.classList.toggle('is-active', selected);
      btn.setAttribute('aria-selected', String(selected));
    });

    servicePanel.setAttribute('aria-labelledby', data.tabId);
    document.getElementById('phase-tag').textContent = data.tag;
    document.getElementById('phase-title').textContent = data.title;
    document.getElementById('phase-desc').textContent = data.desc;
    document.getElementById('phase-m1-val').textContent = data.m1Val;
    document.getElementById('phase-m1-lbl').textContent = data.m1Lbl;
    document.getElementById('phase-m2-val').textContent = data.m2Val;
    document.getElementById('phase-m2-lbl').textContent = data.m2Lbl;

    data.specs.forEach((spec, idx) => {
      const n = idx + 1;
      document.getElementById(`spec-${n}-title`).textContent = spec.title;
      document.getElementById(`spec-${n}-desc`).textContent = spec.desc;
      document.getElementById(`spec-${n}-meta`).textContent = spec.meta;
    });
  }

  tabBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => activatePhase(btn.dataset.phase));
    btn.addEventListener('keydown', (ev) => {
      if (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') {
        ev.preventDefault();
        const dir = ev.key === 'ArrowRight' ? 1 : -1;
        const next = tabBtns[(idx + dir + tabBtns.length) % tabBtns.length];
        next.focus();
        activatePhase(next.dataset.phase);
      }
    });
  });

  // Consultation inline form confirmation + reset
  const consultForm = document.getElementById('consult-form');
  const consultDone = document.getElementById('consult-done');
  const consultDoneMsg = document.getElementById('consult-done-msg');
  const consultReset = document.getElementById('consult-reset');

  if (consultForm && consultDone && consultDoneMsg && consultReset) {
    consultForm.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const name = document.getElementById('c-name').value.trim();
      const email = document.getElementById('c-email').value.trim();
      const track = document.getElementById('c-track').value;

      consultDoneMsg.textContent = `Request logged for ${name} (${email}) under the ${track} track. A principal architect will send calendar slots within 48 hours.`;
      consultForm.hidden = true;
      consultDone.hidden = false;
    });

    consultReset.addEventListener('click', () => {
      consultForm.reset();
      consultDone.hidden = true;
      consultForm.hidden = false;
      document.getElementById('c-name').focus();
    });
  }

  // IntersectionObserver scroll reveal (immediate above-the-fold)
  const reveals = Array.from(document.querySelectorAll('.reveal'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reducedMotion || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-visible'));
  } else {
    requestAnimationFrame(() => {
      reveals.forEach((el) => {
        if (el.getBoundingClientRect().top <= window.innerHeight * 0.92) {
          el.classList.add('is-visible');
        }
      });
    });

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

    reveals.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        io.observe(el);
      }
    });
  }
})();
