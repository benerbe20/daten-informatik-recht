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
const cookieBanner  = document.getElementById('cookie-banner');
const cookieAccept  = document.getElementById('cookie-accept');
const cookieReject  = document.getElementById('cookie-reject');
const cookieManage  = document.getElementById('cookie-manage-link');

if (cookieBanner) {
  if (!localStorage.getItem('ds-cookie-consent')) {
    setTimeout(() => cookieBanner.classList.add('is-visible'), 800);
  }
  const dismiss = choice => {
    localStorage.setItem('ds-cookie-consent', choice);
    cookieBanner.classList.remove('is-visible');
  };
  cookieAccept?.addEventListener('click', () => dismiss('accepted'));
  cookieReject?.addEventListener('click', () => dismiss('rejected'));
}

if (cookieManage) {
  cookieManage.addEventListener('click', e => {
    e.preventDefault();
    localStorage.removeItem('ds-cookie-consent');
    if (cookieBanner) {
      cookieBanner.classList.add('is-visible');
      cookieBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
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
