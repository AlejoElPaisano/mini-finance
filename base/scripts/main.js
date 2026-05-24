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