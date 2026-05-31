const toggle = document.getElementById('dark-mode-toggle');
const brandLogoImg = document.querySelector('.brand-logo img');

function updateLogoTheme(isDark) {
  if (!brandLogoImg) return;
  const isInPages = window.location.pathname.includes('/pages/');
  const basePath = isInPages ? '../assets/' : './assets/';
  brandLogoImg.src = isDark ? `${basePath}logo-mf-dark.svg` : `${basePath}logo-mf.svg`;
}

const savedMode = localStorage.getItem('dark-mode');
if (savedMode === 'enabled') {
  document.body.classList.add('dark-mode');
  if (toggle) toggle.textContent = '☀️';
  updateLogoTheme(true);
} else {
  updateLogoTheme(false);
}

if (toggle) {
  toggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');

    if (isDark) {
      localStorage.setItem('dark-mode', 'enabled');
      toggle.textContent = '☀️';
    } else {
      localStorage.setItem('dark-mode', 'disabled');
      toggle.textContent = '🌙';
    }
    
    updateLogoTheme(isDark);
  });
}

const dyslexicToggle = document.getElementById('dyslexic-toggle');
const colorblindToggle = document.getElementById('colorblind-toggle');

function initAccessibility() {
  const isDyslexic = localStorage.getItem('dyslexicMode') === 'true';
  const isColorblind = localStorage.getItem('colorblindMode') === 'true';

  if (isDyslexic) {
    document.body.classList.add('dyslexic-mode');
    if (dyslexicToggle) {
      dyslexicToggle.classList.add('active');
      dyslexicToggle.setAttribute('aria-pressed', 'true');
    }
  }

  if (isColorblind) {
    document.body.classList.add('colorblind-mode');
    if (colorblindToggle) {
      colorblindToggle.classList.add('active');
      colorblindToggle.setAttribute('aria-pressed', 'true');
    }
  }

  if (dyslexicToggle) {
    dyslexicToggle.addEventListener('click', () => {
      const nowActive = document.body.classList.toggle('dyslexic-mode');
      localStorage.setItem('dyslexicMode', String(nowActive));
      dyslexicToggle.classList.toggle('active', nowActive);
      dyslexicToggle.setAttribute('aria-pressed', String(nowActive));
    });
  }

  if (colorblindToggle) {
    colorblindToggle.addEventListener('click', () => {
      const nowActive = document.body.classList.toggle('colorblind-mode');
      localStorage.setItem('colorblindMode', String(nowActive));
      colorblindToggle.classList.toggle('active', nowActive);
      colorblindToggle.setAttribute('aria-pressed', String(nowActive));
    });
  }
}

initAccessibility();

const userMenuTrigger = document.querySelector('.user-menu__trigger');
const userMenuDropdown = document.querySelector('.user-menu__dropdown');

if (userMenuTrigger && userMenuDropdown) {
  userMenuTrigger.addEventListener('click', () => {
    const isOpen = !userMenuDropdown.hidden;
    userMenuDropdown.hidden = isOpen;
    userMenuTrigger.setAttribute('aria-expanded', String(!isOpen));
  });

  document.addEventListener('click', (event) => {
    if (!userMenuTrigger.contains(event.target) && !userMenuDropdown.contains(event.target)) {
      userMenuDropdown.hidden = true;
      userMenuTrigger.setAttribute('aria-expanded', 'false');
    }
  });
}

const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
  const isInPages = window.location.pathname.includes('/pages/');
  const loginPath = isInPages ? './login.html' : './pages/login.html';

  logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('miniFinanceSession');
    window.location.href = loginPath;
  });
}

const dailyTips = [
  'Evitá los gastos hormiga hoy para acercarte a tu meta de ahorro.',
  'Registrá cada ingreso, por pequeño que sea. La transparencia es el primer paso.',
  'Antes de comprar algo que no necesitás, esperá 24 horas.',
  'Separá tus gastos en categorías para detectar fugas de dinero.',
  'Automatizá una transferencia fija a tu cuenta de ahorro cada mes.',
  'Revisá tus suscripciones mensuales: ¿las usás todas?',
  'Un presupuesto realista es mejor que uno perfecto que no cumplís.',
  'Celebrá cada pequeño logro financiero: la constancia gana la carrera.'
];

const dailyTipElement = document.getElementById('daily-tip');
if (dailyTipElement) {
  const tipIndex = Math.floor(Math.random() * dailyTips.length);
  dailyTipElement.textContent = `💡 Tip: ${dailyTips[tipIndex]}`;
}

function initFinancialApp() {
  if (typeof getMovements !== 'function' || typeof dom === 'undefined') return;

  renderDashboard();
  renderAlerts();
  renderSavingsGoal();

  if (dom.recentMovementsList) {
    renderRecentMovements(3);
  }

  if (dom.expenseDistributionContainer) {
    renderExpenseDistribution();
  }

  if (dom.achievementsPanel) {
    renderAchievementsPanel();
    checkAchievements();
  }

  if (dom.movementsList) {
    renderMovements(
      dom.filterType ? dom.filterType.value : '',
      dom.filterCategory ? dom.filterCategory.value : ''
    );
  }

  if (dom.categorySelect) {
    renderCategoryOptions(dom.typeSelect ? dom.typeSelect.value : '');
  }

  if (dom.filterCategory) {
    renderFilterCategoryOptions();
  }

  if (dom.savingsGoalInput) {
    initRangeOutput();
    renderAdjustedAmount();
  }

  initFormEvents();
  initTypeChangeEvent();
  initFilterEvents();
  initDeleteEvents();
  initSavingsGoalEvent();
}

const cookieBanner = document.getElementById('cookie-banner');
const cookieAccept = document.getElementById('cookie-accept');

if (cookieBanner && cookieAccept) {
  const accepted = localStorage.getItem('cookiesAccepted') === 'true';
  if (!accepted) {
    cookieBanner.hidden = false;
  }
  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieBanner.hidden = true;
  });
}


function safeInit () {

    initFinancialApp() ;

    if ( typeof initAchievementButton === 'function' ) initAchievementButton() ;

}


if ( document.readyState === 'loading' ) {
    document.addEventListener( 'DOMContentLoaded', safeInit ) ;
}
else {
    safeInit() ;
}