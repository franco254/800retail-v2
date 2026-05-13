/* ── 800 Retail Solutions — Shared JS ── */

/* Nav scroll */
const nav = document.getElementById('nav');
const navH = () => parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h'));
window.addEventListener('scroll', () => {
  nav.classList.toggle('solid', window.scrollY > 40);
}, { passive: true });

/* Dropdown menus */
document.querySelectorAll('.nav-item').forEach(item => {
  const dd = item.querySelector('.nav-dropdown');
  if (!dd) return;
  item.addEventListener('mouseenter', () => item.classList.add('open'));
  item.addEventListener('mouseleave', () => item.classList.remove('open'));
  item.querySelector('[data-toggle]')?.addEventListener('click', e => {
    e.preventDefault();
    item.classList.toggle('open');
  });
});

/* Mobile burger */
const burger = document.getElementById('burger');
const drawer = document.getElementById('nav-drawer');
burger?.addEventListener('click', () => {
  const open = drawer.classList.toggle('open');
  burger.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});
document.querySelectorAll('.drawer-link, .drawer-cta').forEach(a => {
  a.addEventListener('click', () => {
    drawer.classList.remove('open');
    burger.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* Logo image error fallback */
document.querySelectorAll('.logo-img').forEach(img => {
  img.addEventListener('error', function () {
    this.classList.add('failed');
    this.style.display = 'none';
    const fb = this.parentElement.querySelector('.logo-fallback');
    if (fb) fb.style.display = 'block';
  });
});

/* Scroll reveal */
const rvObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); rvObs.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.rv').forEach(el => rvObs.observe(el));

/* Active nav link */
const path = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-item > a[href]').forEach(a => {
  const href = a.getAttribute('href').split('/').pop();
  if (href === path) a.classList.add('active');
});

/* Filter buttons (projects, services) */
document.querySelectorAll('[data-filter-group]').forEach(group => {
  const btns = group.querySelectorAll('[data-filter]');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('on'));
      btn.classList.add('on');
    });
  });
});

/* FAQ accordion */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

/* Tab switcher */
function switchTab(panelId, btn) {
  const container = btn.closest('[data-tabs]');
  container.querySelectorAll('[data-tab-btn]').forEach(b => b.classList.remove('on'));
  container.querySelectorAll('[data-tab-panel]').forEach(p => p.classList.remove('on'));
  btn.classList.add('on');
  const panel = container.querySelector(`[data-tab-panel="${panelId}"]`);
  if (panel) panel.classList.add('on');
}

/* Office tabs on contact page */
function showOffice(id, btn) {
  document.querySelectorAll('.o-tab').forEach(b => b.classList.remove('on'));
  document.querySelectorAll('.office-detail').forEach(d => d.classList.remove('on'));
  btn.classList.add('on');
  const el = document.getElementById('od-' + id);
  if (el) el.classList.add('on');
}

/* Form submit mock */
function handleSubmit(btn) {
  const orig = btn.textContent;
  btn.textContent = '✓  Sent — we\'ll be in touch within one business day';
  btn.style.background = 'var(--dark3)';
  btn.style.color = 'var(--red)';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
    btn.style.color = '';
    btn.disabled = false;
  }, 5000);
}

/* ── Theme toggle (light / dark mode) ── */
const themeToggle = document.getElementById('theme-toggle');
const THEME_KEY = '800retail-theme';

const SVG_SUN = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;
const SVG_MOON = `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

function applyTheme(theme) {
  if (theme === 'light') {
    document.body.classList.add('light');
    if (themeToggle) themeToggle.innerHTML = SVG_MOON;
  } else {
    document.body.classList.remove('light');
    if (themeToggle) themeToggle.innerHTML = SVG_SUN;
  }
}

// Apply theme immediately to avoid flash
const savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
if (savedTheme === 'light') document.body.classList.add('light');

// Set icon once DOM ready
applyTheme(savedTheme);

themeToggle?.addEventListener('click', () => {
  const isLight = document.body.classList.contains('light');
  const next = isLight ? 'dark' : 'light';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
});
