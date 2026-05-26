const toggle = document.getElementById('dark-mode-toggle');

const savedMode = localStorage.getItem('dark-mode');
if (savedMode === 'enabled') {
  document.body.classList.add('dark-mode');
  toggle.textContent = '☀️';
}

toggle.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('dark-mode', 'enabled');
    toggle.textContent = '☀️';
  } else {
    localStorage.setItem('dark-mode', 'disabled');
    toggle.textContent = '🌙';
  }
});

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