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
