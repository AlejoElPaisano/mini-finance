const STORAGE_KEY = 'miniFinanceUsers';

const authTitle = document.getElementById('auth-title');
const authSubtitle = document.getElementById('auth-subtitle');
const authMessage = document.getElementById('auth-message');
const views = document.querySelectorAll('.auth-view');

const viewConfig = {
  login: {
    title: 'Iniciar sesion',
    subtitle: 'Accedé a tu panel de finanzas personales'
  },
  register: {
    title: 'Crear cuenta',
    subtitle: 'Registrate para comenzar a gestionar tus finanzas'
  },
  recover: {
    title: 'Recuperar contraseña',
    subtitle: 'Ingresá tu usuario y definí una nueva contraseña'
  }
};

const darkModeToggle = document.getElementById('dark-mode-toggle');
const savedDarkMode = localStorage.getItem('dark-mode');

if (savedDarkMode === null || savedDarkMode === 'enabled') {
  document.body.classList.add('dark-mode');
  localStorage.setItem('dark-mode', 'enabled');
  if (darkModeToggle) darkModeToggle.textContent = '☀️';
} else {
  if (darkModeToggle) darkModeToggle.textContent = '🌙';
}

if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('dark-mode', 'enabled');
      darkModeToggle.textContent = '☀️';
    } else {
      localStorage.setItem('dark-mode', 'disabled');
      darkModeToggle.textContent = '🌙';
    }
  });
}

function showMessage(text, type) {
  authMessage.textContent = text;
  authMessage.className = `auth-message auth-message--${type}`;
  authMessage.hidden = false;
}

function hideMessage() {
  authMessage.hidden = true;
  authMessage.textContent = '';
  authMessage.className = 'auth-message';
}

function switchView(viewName) {
  hideMessage();

  views.forEach(view => {
    if (view.dataset.view === viewName) {
      view.hidden = false;
      view.querySelector('form')?.reset();
      view.querySelector('input')?.focus();
    } else {
      view.hidden = true;
    }
  });

  const config = viewConfig[viewName];
  if (config) {
    authTitle.textContent = config.title;
    authSubtitle.textContent = config.subtitle;
  }
}

function getUsers() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveUsers(users) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

function validateUsername(username) {
  return /^[a-zA-Z0-9\-]{3,}$/.test(username);
}

function validatePassword(password) {
  return password.length >= 4;
}

document.querySelectorAll('[data-goto]').forEach(link => {
  link.addEventListener('click', () => {
    switchView(link.dataset.goto);
  });
});

document.getElementById('form-login').addEventListener('submit', event => {
  event.preventDefault();
  hideMessage();

  const username = document.getElementById('login-user').value.trim();
  const password = document.getElementById('login-password').value;

  if (!validateUsername(username)) {
    showMessage('El usuario ingresado no es válido.', 'error');
    return;
  }

  const users = getUsers();

  if (!users[username]) {
    showMessage('El usuario no existe.', 'error');
    return;
  }

  if (users[username] !== password) {
    showMessage('La contraseña es incorrecta.', 'error');
    return;
  }

  showMessage('¡Bienvenido! Iniciando sesion...', 'success');

  localStorage.setItem('miniFinanceSession', username);

  setTimeout(() => {
    window.location.href = '../index.html';
  }, 1200);
});

document.getElementById('form-register').addEventListener('submit', event => {
  event.preventDefault();
  hideMessage();

  const username = document.getElementById('register-user').value.trim();
  const password = document.getElementById('register-password').value;
  const passwordConfirm = document.getElementById('register-password-confirm').value;

  if (!validateUsername(username)) {
    showMessage('El usuario debe tener al menos 3 caracteres, solo letras, numeros o guiones.', 'error');
    return;
  }

  if (!validatePassword(password)) {
    showMessage('La contraseña debe tener al menos 4 caracteres.', 'error');
    return;
  }

  if (password !== passwordConfirm) {
    showMessage('Las contraseñas no coinciden.', 'error');
    return;
  }

  const users = getUsers();

  if (users[username]) {
    showMessage('El usuario ya existe. Elegí otro nombre.', 'error');
    return;
  }

  users[username] = password;
  saveUsers(users);

  showMessage('¡Cuenta creada con exito! Redirigiendo...', 'success');

  setTimeout(() => {
    switchView('login');
  }, 1500);
});

document.getElementById('form-recover').addEventListener('submit', event => {
  event.preventDefault();
  hideMessage();

  const username = document.getElementById('recover-user').value.trim();
  const password = document.getElementById('recover-password').value;
  const passwordConfirm = document.getElementById('recover-password-confirm').value;

  if (!validateUsername(username)) {
    showMessage('El usuario ingresado no es válido.', 'error');
    return;
  }

  if (!validatePassword(password)) {
    showMessage('La nueva contraseña debe tener al menos 4 caracteres.', 'error');
    return;
  }

  if (password !== passwordConfirm) {
    showMessage('Las contraseñas no coinciden.', 'error');
    return;
  }

  const users = getUsers();

  if (!users[username]) {
    showMessage('El usuario no existe.', 'error');
    return;
  }

  users[username] = password;
  saveUsers(users);

  showMessage('¡Contraseña actualizada! Redirigiendo al inicio de sesion...', 'success');

  setTimeout(() => {
    switchView('login');
  }, 1500);
});
