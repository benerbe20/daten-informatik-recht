/* ── Mobile nav ─────────────────────────────────────────────── */
const navToggle = document.getElementById('nav-toggle');
const navMobile = document.getElementById('nav-mobile');

if (navToggle && navMobile) {
  navToggle.addEventListener('click', () => {
    const open = navMobile.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(open));
    navMobile.setAttribute('aria-hidden', String(!open));
  });
  document.addEventListener('click', e => {
    if (!navToggle.contains(e.target) && !navMobile.contains(e.target)) {
      navMobile.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navMobile.setAttribute('aria-hidden', 'true');
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      navMobile.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navMobile.setAttribute('aria-hidden', 'true');
      navToggle.focus();
    }
  });
}

/* ── Highlight current page in nav ─────────────────────────── */
const currentFile = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__link[href], .nav__mobile a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentFile || (currentFile === '' && href === 'index.html')) {
    link.setAttribute('aria-current', 'page');
  }
});

/* ── Cookie banner ──────────────────────────────────────────── */
const banner = document.createElement('div');
banner.id = 'cookie-banner';
banner.className = 'cookie-banner';
banner.setAttribute('role', 'dialog');
banner.setAttribute('aria-modal', 'true');
banner.setAttribute('aria-labelledby', 'cookie-title');
banner.setAttribute('aria-describedby', 'cookie-desc');
banner.innerHTML = `
  <h3 id="cookie-title">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="display:inline;vertical-align:middle;margin-right:6px;" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
    Cookie Settings
  </h3>
  <p id="cookie-desc">We use cookies to analyze site usage and improve your experience. Analytics data is anonymized. See our <a href="privacy.html">Privacy Policy</a> for details.</p>
  <div class="cookie-actions">
    <button class="btn btn--primary btn--sm" id="cookie-accept">Accept all</button>
    <button class="btn btn--ghost btn--sm" id="cookie-reject">Reject optional</button>
  </div>`;
document.body.appendChild(banner);

const dismiss = choice => {
  localStorage.setItem('ds-cookie-consent', choice);
  banner.classList.remove('is-visible');
};
document.getElementById('cookie-accept').addEventListener('click', () => dismiss('accepted'));
document.getElementById('cookie-reject').addEventListener('click', () => dismiss('rejected'));

if (!localStorage.getItem('ds-cookie-consent')) {
  setTimeout(() => banner.classList.add('is-visible'), 800);
}

const cookieManage = document.getElementById('cookie-manage-link');
if (cookieManage) {
  cookieManage.addEventListener('click', e => {
    e.preventDefault();
    localStorage.removeItem('ds-cookie-consent');
    banner.classList.add('is-visible');
    banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

/* ── Mock contact form ──────────────────────────────────────── */
const contactForm  = document.getElementById('contact-form');
const formSuccess  = document.getElementById('form-success');

if (contactForm && formSuccess) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    contactForm.style.display = 'none';
    formSuccess.classList.add('is-visible');
    formSuccess.querySelector('h3')?.focus();
  });
}
