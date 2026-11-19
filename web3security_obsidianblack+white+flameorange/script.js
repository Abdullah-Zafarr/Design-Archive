const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');

window.addEventListener('scroll', () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 24);
}, { passive: true });

/* Mobile Navigation Drawer */
function closeDrawer() {
  if (!menuToggle || !mobileDrawer) return;
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileDrawer.hidden = true;
}

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  mobileDrawer.hidden = open;
});

mobileDrawer?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', closeDrawer);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileDrawer && !mobileDrawer.hidden) {
    closeDrawer();
    menuToggle?.focus();
  }
});

/* Network Chain Tabs (#product) */
const CHAIN_SPECS = {
  cosmos: {
    kicker: 'Tendermint BFT · Hub & Zones',
    title: 'Cosmos Validator & IBC Mesh',
    endpoint: 'rpc.cosmos.recognito.io',
    summary: 'Active set validation across Hub, Osmosis, and Neutron with dedicated Hermes relayer channels and hardware-isolated sentry nodes.',
    latency: '11 ms',
    finality: '5.8 s',
    channels: '184',
    stake: '$1.94B',
  },
  ethereum: {
    kicker: 'Proof of Stake · Execution & Beacon',
    title: 'Ethereum Distributed DVT Nodes',
    endpoint: 'eth-mainnet.recognito.io',
    summary: 'Multi-client Execution + Consensus pairs running DVT threshold clusters with MEV-Boost relay verification across six geographic regions.',
    latency: '13 ms',
    finality: '12.8 m',
    channels: '64',
    stake: '$1.62B',
  },
  celestia: {
    kicker: 'Modular DA · Blobspace Sampling',
    title: 'Celestia Data Availability Cluster',
    endpoint: 'da.celestia.recognito.io',
    summary: 'High-throughput bridge and light-sampling nodes engineered for sovereign rollups posting continuous 2 MB block data.',
    latency: '9 ms',
    finality: '12.0 s',
    channels: '92',
    stake: '$780M',
  },
  solana: {
    kicker: 'Tower BFT · Geyser Stream Edge',
    title: 'Solana Bare-Metal Vote & RPC',
    endpoint: 'sol-edge.recognito.io',
    summary: 'AMD EPYC bare-metal vote validators paired with Yellowstone gRPC streams for deterministic sub-slot transaction confirmation.',
    latency: '8 ms',
    finality: '0.4 s',
    channels: '42',
    stake: '$460M',
  },
};

function selectChain(chainKey) {
  const data = CHAIN_SPECS[chainKey];
  if (!data) return;

  document.querySelectorAll('.chain-tab').forEach((tab) => {
    const active = tab.dataset.chain === chainKey;
    tab.classList.toggle('is-active', active);
    tab.setAttribute('aria-selected', String(active));
  });

  document.getElementById('chain-kicker').textContent = data.kicker;
  document.getElementById('chain-title').textContent = data.title;
  document.getElementById('chain-endpoint').textContent = data.endpoint;
  document.getElementById('chain-summary').textContent = data.summary;
  document.getElementById('chain-latency').textContent = data.latency;
  document.getElementById('chain-finality').textContent = data.finality;
  document.getElementById('chain-channels').textContent = data.channels;
  document.getElementById('chain-stake').textContent = data.stake;
}

document.querySelectorAll('.chain-tab').forEach((tab) => {
  tab.addEventListener('click', () => selectChain(tab.dataset.chain));
});

/* Synced Telemetry Nodes (Hero Chips <-> #product Telemetry Inspector) */
const TELEMETRY_NODES = {
  secured: {
    code: 'NODE / SEC-01',
    title: 'Secured Hardware Enclave',
    desc: 'Remote KMS signing with threshold Shamir shards keeps validator consensus keys offline from public RPC ingress ports.',
    metricLabel: 'Double-sign guard',
    metricValue: '0.4 ms lock',
  },
  encrypted: {
    code: 'NODE / ENC-02',
    title: 'Encrypted WireGuard Mesh',
    desc: 'Every inter-sentry tunnel enforces ChaCha20-Poly1305 packet encryption with automatic 15-minute ephemeral key rotation.',
    metricLabel: 'Tunnel cipher',
    metricValue: '256-bit AEAD',
  },
  speed: {
    code: 'NODE / SPD-03',
    title: 'Light Speed Anycast Edge',
    desc: 'Geo-steered BGP routing delivers sub-14 ms JSON-RPC reads across Frankfurt, Singapore, and Ashburn pops.',
    metricLabel: 'Global p95 read',
    metricValue: '11.4 ms',
  },
  local: {
    code: 'NODE / HUB-04',
    title: 'Local HUB Peering',
    desc: 'Direct fiber cross-connects between core archive nodes and regional partner rollups eliminate public hop jitter.',
    metricLabel: 'Peer hops',
    metricValue: '1 direct hop',
  },
  creator: {
    code: 'NODE / DEV-05',
    title: 'Creator HUB Indexing',
    desc: 'Stream decoded contract logs, IBC packet receipts, and finality proofs over filtered WebSocket feeds without rate drops.',
    metricLabel: 'Stream backlog',
    metricValue: '0 dropped',
  },
  system: {
    code: 'NODE / SYS-06',
    title: 'System Snapshot Failover',
    desc: 'Continuous NVMe ZFS snapshots keep standby nodes within two blocks of tip height for deterministic zero-slash recovery.',
    metricLabel: 'Failover window',
    metricValue: '1.8 seconds',
  },
};

function selectTelemetryNode(nodeKey, scrollToSection = false) {
  const node = TELEMETRY_NODES[nodeKey];
  if (!node) return;

  document.querySelectorAll('[data-node]').forEach((el) => {
    el.classList.toggle('is-selected', el.dataset.node === nodeKey);
  });

  document.getElementById('node-code').textContent = node.code;
  document.getElementById('node-title').textContent = node.title;
  document.getElementById('node-desc').textContent = node.desc;
  document.getElementById('node-metric-label').textContent = node.metricLabel;
  document.getElementById('node-metric-value').textContent = node.metricValue;

  if (scrollToSection) {
    document.getElementById('product')?.scrollIntoView({ behavior: 'smooth' });
  }
}

document.querySelectorAll('.node-chip').forEach((chip) => {
  chip.addEventListener('click', () => selectTelemetryNode(chip.dataset.node, true));
});

document.querySelectorAll('.node-pill').forEach((pill) => {
  pill.addEventListener('click', () => selectTelemetryNode(pill.dataset.node, false));
});

/* Pricing Tier Selection -> Pre-fill Beta Form */
let selectedTier = 'Dedicated Validator';
const betaChainSelect = document.getElementById('beta-chain');
const betaForm = document.getElementById('beta-form');
const betaConfirmed = document.getElementById('beta-confirmed');
const betaConfirmedText = document.getElementById('beta-confirmed-text');
const betaEmail = document.getElementById('beta-email');

document.querySelectorAll('[data-tier]').forEach((btn) => {
  btn.addEventListener('click', () => {
    selectedTier = btn.dataset.tier || 'Dedicated Validator';
  });
});

betaForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = betaEmail?.value.trim() || '';
  const chain = betaChainSelect?.value || 'Cosmos';

  betaConfirmedText.textContent = `${selectedTier} beta access queued for ${email} on ${chain}. Credentials dispatch within 24 hours.`;
  betaForm.hidden = true;
  betaConfirmed.hidden = false;
});

document.getElementById('beta-reset')?.addEventListener('click', () => {
  betaForm?.reset();
  betaConfirmed.hidden = true;
  betaForm.hidden = false;
});

/* Scroll Reveals */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08, rootMargin: '0px 0px -36px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

requestAnimationFrame(() => {
  document.querySelectorAll('.reveal').forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      el.classList.add('is-visible');
      revealObserver.unobserve(el);
    }
  });
});
