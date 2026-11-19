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

/* Web Audio API + Timecode EP Player */
const TRACKS = [
  { title: 'The Conductor (Original Mix)', bpm: 122, duration: 342, baseHz: 110.0 },
  { title: 'The Conductor (Nora En Pure Remix)', bpm: 121, duration: 374, baseHz: 98.0 },
  { title: 'The Conductor (Croatia Squad Remix)', bpm: 123, duration: 328, baseHz: 116.54 },
  { title: 'The Conductor (Calippo Radio Edit)', bpm: 122, duration: 198, baseHz: 130.81 },
];

let activeTrackIndex = 1;
let isPlaying = false;
let elapsedSeconds = 0;
let timerId = null;
let audioCtx = null;
let pulseInterval = null;

const statusEl = document.getElementById('player-status');
const titleEl = document.getElementById('active-track-title');
const metaEl = document.getElementById('active-track-meta');
const elapsedEl = document.getElementById('time-elapsed');
const totalEl = document.getElementById('time-total');
const scrubberEl = document.getElementById('track-scrubber');
const playBtn = document.getElementById('play-toggle');
const engineNote = document.getElementById('audio-engine-note');
const trackRows = [...document.querySelectorAll('.track-row')];

function formatTime(secs) {
  const m = Math.floor(secs / 60);
  const s = Math.floor(secs % 60);
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

function triggerSynthBeat(freq) {
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const filter = audioCtx.createBiquadFilter();
    const gain = audioCtx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, now);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(520, now);
    filter.frequency.exponentialRampToValueAtTime(160, now + 0.36);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.06, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.45);
  } catch {
    /* Graceful silence when Web Audio blocked */
  }
}

function stopPlaybackTimers() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  if (pulseInterval) {
    clearInterval(pulseInterval);
    pulseInterval = null;
  }
}

function updatePlayerUI() {
  const track = TRACKS[activeTrackIndex];
  titleEl.textContent = track.title;
  metaEl.textContent = `${track.bpm} BPM · Deep House · Enormous Tunes`;
  totalEl.textContent = formatTime(track.duration);
  elapsedEl.textContent = formatTime(elapsedSeconds);
  scrubberEl.max = String(track.duration);
  scrubberEl.value = String(elapsedSeconds);
  statusEl.textContent = isPlaying ? 'PLAYING · STUDIO FEED' : 'READY · PAUSED';
  playBtn.textContent = isPlaying ? 'Pause Track' : 'Play Track';
  playBtn.setAttribute('aria-pressed', String(isPlaying));

  trackRows.forEach((row, idx) => {
    row.classList.toggle('is-active', idx === activeTrackIndex);
  });
}

function startPlayback() {
  stopPlaybackTimers();
  isPlaying = true;
  const track = TRACKS[activeTrackIndex];

  try {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (Ctx && !audioCtx) audioCtx = new Ctx();
    if (audioCtx?.state === 'suspended') audioCtx.resume();
    if (audioCtx) {
      triggerSynthBeat(track.baseHz);
      const beatMs = Math.round((60 / track.bpm) * 1000);
      pulseInterval = setInterval(() => {
        if (isPlaying) triggerSynthBeat(track.baseHz);
      }, beatMs);
      engineNote.textContent = 'Web Audio Live Synth';
    }
  } catch {
    engineNote.textContent = 'Timecode Sync Mode';
  }

  timerId = setInterval(() => {
    elapsedSeconds += 1;
    if (elapsedSeconds >= track.duration) {
      selectTrack((activeTrackIndex + 1) % TRACKS.length, true);
      return;
    }
    updatePlayerUI();
  }, 1000);

  updatePlayerUI();
}

function pausePlayback() {
  isPlaying = false;
  stopPlaybackTimers();
  updatePlayerUI();
}

function selectTrack(idx, autoPlay = false) {
  activeTrackIndex = (idx + TRACKS.length) % TRACKS.length;
  elapsedSeconds = 0;
  if (autoPlay || isPlaying) {
    startPlayback();
  } else {
    updatePlayerUI();
  }
}

playBtn?.addEventListener('click', () => {
  if (isPlaying) pausePlayback();
  else startPlayback();
});

document.getElementById('prev-track')?.addEventListener('click', () => {
  selectTrack(activeTrackIndex - 1, isPlaying);
});

document.getElementById('next-track')?.addEventListener('click', () => {
  selectTrack(activeTrackIndex + 1, isPlaying);
});

scrubberEl?.addEventListener('input', () => {
  elapsedSeconds = Number(scrubberEl.value) || 0;
  elapsedEl.textContent = formatTime(elapsedSeconds);
});

trackRows.forEach((row) => {
  row.addEventListener('click', () => {
    const idx = Number(row.dataset.track);
    selectTrack(idx, true);
  });
});

/* Guestlist Toggles (#tour) */
const guestlistCountEl = document.getElementById('guestlist-count');
const guestlistBtns = [...document.querySelectorAll('.guestlist-btn')];

guestlistBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    const next = btn.getAttribute('aria-pressed') !== 'true';
    btn.setAttribute('aria-pressed', String(next));
    btn.textContent = next ? 'Guestlist Requested' : 'Request guestlist';

    const totalRequested = guestlistBtns.filter((b) => b.getAttribute('aria-pressed') === 'true').length;
    guestlistCountEl.textContent = `${totalRequested} guestlist ${totalRequested === 1 ? 'pass' : 'passes'} requested`;
  });
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

updatePlayerUI();
