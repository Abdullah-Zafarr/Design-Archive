const header = document.getElementById('site-header');
const menuToggle = document.getElementById('menu-toggle');
const mobileDrawer = document.getElementById('mobile-drawer');

window.addEventListener('scroll', () => {
  header.classList.toggle('is-scrolled', window.scrollY > 20);
}, { passive: true });

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!open));
  mobileDrawer.hidden = open;
});

mobileDrawer?.querySelectorAll('a').forEach((a) => {
  a.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.hidden = true;
  });
});

// Leaderboard tabs
document.querySelectorAll('.tab-pill').forEach((btn) => {
  btn.addEventListener('click', () => {
    const board = btn.dataset.board;
    document.querySelectorAll('.tab-pill').forEach((b) => {
      const sel = b === btn;
      b.classList.toggle('is-active', sel);
      b.setAttribute('aria-selected', String(sel));
    });
    document.querySelectorAll('.ledger-row').forEach((row) => {
      row.hidden = board !== 'top' && row.dataset.group !== board;
    });
  });
});

// Wallet modal
const walletModal = document.getElementById('wallet-modal');
const connectBtn = document.getElementById('connect-wallet');
connectBtn?.addEventListener('click', () => { walletModal.hidden = false; });
document.getElementById('close-wallet')?.addEventListener('click', () => { walletModal.hidden = true; });
walletModal?.addEventListener('click', (e) => { if (e.target === walletModal) walletModal.hidden = true; });

document.querySelectorAll('.wallet-opt').forEach((opt) => {
  opt.addEventListener('click', () => {
    connectBtn.textContent = `0x71C...9A4 (${opt.dataset.provider})`;
    walletModal.hidden = true;
  });
});

// Airdrop check simulation
document.getElementById('airdrop-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const handle = document.getElementById('ens-input').value.trim();
  const res = document.getElementById('airdrop-result');
  res.textContent = `Preview simulation: ${handle} qualifies for 4,200 Season 02 points.`;
});

// Reveals
const obs = new IntersectionObserver(
  (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-visible'); obs.unobserve(e.target); } }),
  { threshold: 0.08 }
);
document.querySelectorAll('.reveal').forEach((el) => obs.observe(el));
