/* =============================================================
   FILE: js/main.js
   PURPOSE: Core app — router, nav, hamburger, scroll reveal
   ============================================================= */

'use strict';

/* ─── CUSTOM CURSOR ─── */
(function initCursor() {
  const dot  = document.getElementById('cursor');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  document.addEventListener('mousemove', e => {
    dot.style.left  = e.clientX + 'px';
    dot.style.top   = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top  = e.clientY + 'px';
  });
  document.addEventListener('mousedown', () => {
    dot.style.transform  = 'translate(-50%,-50%) scale(1.8)';
    ring.style.transform = 'translate(-50%,-50%) scale(0.7)';
  });
  document.addEventListener('mouseup', () => {
    dot.style.transform  = 'translate(-50%,-50%) scale(1)';
    ring.style.transform = 'translate(-50%,-50%) scale(1)';
  });
})();

/* ─── NAV SCROLL SHADOW ─── */
window.addEventListener('scroll', () => {
  document.getElementById('navbar')
    .classList.toggle('scrolled', window.scrollY > 10);
});

/* ─── HAMBURGER ─── */
window.toggleMenu = function () {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileNav').classList.toggle('open');
};

/* ─── PAGE ROUTER ─── */
window.showPage = function (pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

  // Show target
  const target = document.getElementById(pageId);
  if (target) target.classList.add('active');

  // Sync ALL nav buttons (desktop + mobile)
  document.querySelectorAll('[data-page]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.page === pageId);
  });

  // Close mobile menu
  document.getElementById('mobileNav')?.classList.remove('open');
  document.getElementById('hamburger')?.classList.remove('open');

  // Scroll top smoothly
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Trigger scroll reveal after repaint
  requestAnimationFrame(() => setTimeout(initReveal, 80));
};

/* ─── SCROLL REVEAL ─── */
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll(
    '.page.active .reveal, .page.active .reveal-left, .page.active .reveal-right'
  ).forEach(el => obs.observe(el));

  // Skill bar fills
  const barObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('go');
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.page.active .skill-bar-fill')
    .forEach(b => barObs.observe(b));
}

/* ─── INIT on load ─── */
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initReveal, 200);
});
