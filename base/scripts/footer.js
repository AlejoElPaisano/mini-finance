const FOOTER_STORAGE_KEY = 'footer-open-state';

function updateBodyPadding() {
  const footer = document.getElementById('app-footer');
  const drawer = document.getElementById('footer-drawer');
  if (!footer || !drawer) return;

  if (footer.classList.contains('open')) {
    document.body.style.paddingBottom = `${drawer.offsetHeight + 36}px`;
  } else {
    document.body.style.paddingBottom = '36px';
  }
}

function initFooter() {
  const footer = document.getElementById('app-footer');
  const toggle = document.getElementById('footer-toggle');
  if (!footer || !toggle) return;

  const savedState = localStorage.getItem(FOOTER_STORAGE_KEY);
  const isOpen = savedState === null ? true : savedState === 'true';

  const textEl = toggle.querySelector('.footer-toggle-text');

  if (isOpen) {
    footer.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    if (textEl) textEl.textContent = 'CERRAR';
  } else {
    footer.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    if (textEl) textEl.textContent = 'CRÉDITOS';
  }

  updateBodyPadding();

  toggle.addEventListener('click', () => {
    const nowOpen = footer.classList.toggle('open');
    localStorage.setItem(FOOTER_STORAGE_KEY, String(nowOpen));
    toggle.setAttribute('aria-expanded', String(nowOpen));
    if (textEl) textEl.textContent = nowOpen ? 'CERRAR' : 'CRÉDITOS';
    updateBodyPadding();
  });

  window.addEventListener('resize', updateBodyPadding);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFooter);
} else {
  initFooter();
}
