/* ============================================================
   MAIN.JS
   Image injection, dark/light theme, smooth nav, scroll reveal, init
   ============================================================ */

// ════════════════════════════════════════
//  INJECT IMAGES INTO DOM
// ════════════════════════════════════════
function injectImages() {
  const set = (sel, key) => {
    const els = document.querySelectorAll(sel);
    els.forEach(el => { if (IMGS[key]) el.src = IMGS[key]; });
  };
  // Hero photos
  const heroPhotos = document.querySelectorAll('.hero-photo-card img');
  if (heroPhotos[0] && IMGS.photo1) heroPhotos[0].src = IMGS.photo1;
  if (heroPhotos[1] && IMGS.photo2) heroPhotos[1].src = IMGS.photo2;
  // Project cards & modals
  document.querySelectorAll('[src$="_PLACEHOLDER"]').forEach(el => {
    const key = el.src.split('/').pop().replace('_PLACEHOLDER','').toLowerCase();
    if (IMGS[key]) el.src = IMGS[key];
  });
  // Cert images
  ['c1','c2','c3'].forEach((k,i)=>{
    const ids = ['certImg-aws','certImg-ux','certImg-bot'];
    const el = document.getElementById(ids[i]);
    if (el && IMGS[k]) el.src = IMGS[k];
  });
}

// ════════════════════════════════════════
//  DARK / LIGHT MODE TOGGLE
// ════════════════════════════════════════
const toggle = document.getElementById('themeToggle');
const html   = document.documentElement;

function setTheme(theme) {
  html.setAttribute('data-theme', theme);
  toggle.textContent = theme === 'dark' ? '🌙' : '☀️';
  localStorage.setItem('theme', theme);
  // Update canvas opacity via CSS variable (already handled by :root rules)
  const canvas = document.getElementById('heroCanvas');
  if (canvas) canvas.style.opacity = theme === 'dark' ? '.28' : '.12';
}

toggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});

// Always start in dark mode; allow user to toggle
const saved = localStorage.getItem('theme') || 'dark';
setTheme(saved);

// ════════════════════════════════════════
//  NAVIGATION
// ════════════════════════════════════════
function go(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }

window.addEventListener('scroll', () => {
  document.getElementById('mainNav')?.classList.toggle('scrolled', window.scrollY > 60);
});

document.querySelectorAll('section[id], div[id]').forEach(sec => {
  new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      document.querySelectorAll('.nl[data-section]').forEach(l =>
        l.classList.toggle('active', l.dataset.section === e.target.id)
      );
    });
  }, { threshold: .3 }).observe(sec);
});

// ════════════════════════════════════════
//  SCROLL REVEAL
// ════════════════════════════════════════
const revealIO = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('vis'); }),
  { threshold: .1 }
);
document.querySelectorAll('.rv').forEach(el => revealIO.observe(el));

// ════════════════════════════════════════
//  INIT
// ════════════════════════════════════════
window.addEventListener('load', injectImages);
