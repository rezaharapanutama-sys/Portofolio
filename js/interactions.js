/* =============================================================
   FILE: js/interactions.js
   PURPOSE: Order modal, contact form, project filter, toast
   ============================================================= */
'use strict';

function showToast(message) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = message;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3800);
}
window.showToast = showToast;

window.openOrder = function (serviceName, servicePrice) {
  document.getElementById('modal-title').textContent = 'Order: ' + serviceName;
  document.getElementById('modal-price').textContent = servicePrice;
  document.getElementById('modalOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
};

window.closeOrder = function () {
  document.getElementById('modalOverlay').classList.remove('open');
  document.body.style.overflow = '';
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('modalOverlay')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) window.closeOrder();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') window.closeOrder();
  });
});

window.submitOrder = function () {
  const name  = document.getElementById('order-name').value.trim();
  const email = document.getElementById('order-email').value.trim();
  if (!name || !email) { showToast('Please fill in your name and email.'); return; }
  window.closeOrder();
  showToast('Order submitted! I will contact you within 24 hours.');
  ['order-name','order-email','order-phone','order-desc'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
};

window.submitForm = function () {
  const name  = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const msg   = document.getElementById('cf-message').value.trim();
  if (!name || !email || !msg) { showToast('Please fill in all required fields.'); return; }
  showToast('Message sent! I will reply within 24 hours.');
  ['cf-name','cf-email','cf-subject','cf-message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
};

window.filterProjects = function (category, clickedBtn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  clickedBtn.classList.add('active');
  document.querySelectorAll('.project-card').forEach(card => {
    card.style.display = (category === 'all' || card.dataset.category === category) ? '' : 'none';
  });
};
