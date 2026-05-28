const ACHIEVEMENTS_KEY = 'miniFinanceAchievements';

const ACHIEVEMENTS_LIST = [
  {
    id: 'first_movement',
    title: 'Primeros Pasos',
    description: 'Registraste tu primer movimiento.',
    icon: '📋',
    condition: () => getMovements().length >= 1
  },
  {
    id: 'first_income',
    title: 'Entrada de Capital',
    description: 'Registraste tu primer ingreso.',
    icon: '💰',
    condition: () => getMovements().filter(m => m.type === 'income').length >= 1
  },
  {
    id: 'first_expense',
    title: 'Control de Gastos',
    description: 'Registraste tu primer gasto.',
    icon: '📝',
    condition: () => getMovements().filter(m => m.type === 'expense').length >= 1
  },
  {
    id: 'first_savings_goal',
    title: 'Visionario',
    description: 'Estableciste tu primera meta de ahorro.',
    icon: '🎯',
    condition: () => {
      const goal = getSavingsGoal();
      return goal > 0 && goal !== 1000;
    }
  },
  {
    id: 'five_movements',
    title: 'Constancia',
    description: 'Registraste 5 movimientos.',
    icon: '5️⃣',
    condition: () => getMovements().length >= 5
  },
  {
    id: 'ten_movements',
    title: 'Hábito Financiero',
    description: 'Registraste 10 movimientos.',
    icon: '🔟',
    condition: () => getMovements().length >= 10
  },
  {
    id: 'big_income',
    title: 'Gran Ingreso',
    description: 'Registraste un ingreso mayor a $100.000.',
    icon: '💵',
    condition: () => getMovements().some(m => m.type === 'income' && m.amount >= 100000)
  },
  {
    id: 'big_expense',
    title: 'Gran Gasto',
    description: 'Registraste un gasto mayor a $50.000.',
    icon: '💸',
    condition: () => getMovements().some(m => m.type === 'expense' && m.amount >= 50000)
  },
  {
    id: 'positive_balance',
    title: 'En Positivo',
    description: 'Tu saldo disponible es positivo.',
    icon: '📈',
    condition: () => getBalance() > 0
  },
  {
    id: 'savings_50_percent',
    title: 'Ahorrador Natto',
    description: 'Ahorraste más del 50% de tus ingresos.',
    icon: '🐷',
    condition: () => {
      const income = getTotalIncome();
      const balance = getBalance();
      return income > 0 && (balance / income) > 0.5;
    }
  },
  {
    id: 'three_categories',
    title: 'Organizado',
    description: 'Usaste 3 categorías distintas.',
    icon: '🗂️',
    condition: () => {
      const categories = new Set(getMovements().map(m => m.category));
      return categories.size >= 3;
    }
  },
  {
    id: 'night_owl',
    title: 'Nocturno',
    description: 'Registraste un movimiento después de las 22:00.',
    hint: '¿Qué pasa si registrás algo de madrugada?',
    icon: '🦉',
    secret: true,
    condition: () => {
      return getMovements().some(m => {
        const hour = new Date(m.createdAt).getHours();
        return hour >= 22 || hour < 5;
      });
    }
  }
];

function getUnlockedAchievements() {
  try {
    const data = localStorage.getItem(ACHIEVEMENTS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

function saveUnlockedAchievements(ids) {
  localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(ids));
}

function isAchievementUnlocked(id) {
  return getUnlockedAchievements().includes(id);
}

function playUnlockSound() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;

    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(523.25, ctx.currentTime);
    oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);

    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  } catch {
    // Silencioso si el navegador bloquea audio
  }
}

function showAchievementToast(achievement) {
  let container = document.querySelector('.achievement-toast-container');

  if (!container) {
    container = document.createElement('div');
    container.className = 'achievement-toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'achievement-toast';

  toast.innerHTML = `
    <div class="achievement-toast__badge">🏆</div>
    <div class="achievement-toast__content">
      <p class="achievement-toast__label">Logro Desbloqueado</p>
      <p class="achievement-toast__title">${achievement.icon} ${achievement.title}</p>
      <p class="achievement-toast__desc">${achievement.description}</p>
    </div>
  `;

  container.appendChild(toast);
  playUnlockSound();

  setTimeout(() => {
    toast.classList.add('achievement-toast--exit');
    toast.addEventListener('animationend', () => toast.remove());
  }, 4500);
}

function checkAchievements() {
  const unlocked = getUnlockedAchievements();
  let newUnlock = false;

  ACHIEVEMENTS_LIST.forEach(achievement => {
    if (!unlocked.includes(achievement.id) && achievement.condition()) {
      unlocked.push(achievement.id);
      newUnlock = true;
      showAchievementToast(achievement);
    }
  });

  if (newUnlock) {
    saveUnlockedAchievements(unlocked);
    renderAchievementsPanel();
  }

  return newUnlock;
}

function renderAchievementsPanel() {
  if (!dom.achievementsPanel) return;

  const unlocked = getUnlockedAchievements();
  const total = ACHIEVEMENTS_LIST.length;
  const percentage = Math.round((unlocked.length / total) * 100);

  const unlockedAchievements = ACHIEVEMENTS_LIST.filter(a => unlocked.includes(a.id));

  dom.achievementsPanel.innerHTML = `
    <div class="achievements-header-row">
      <h2 id="achievements-title" class="achievements-panel__title">Tus Logros</h2>
      <div class="achievements-progress-inline">
        <div class="achievements-progress__track-inline">
          <div class="achievements-progress__fill-inline" style="width: ${percentage}%"></div>
        </div>
        <span class="achievements-progress__text-inline">${unlocked.length} / ${total}</span>
      </div>
    </div>
    <div class="achievements-grid">
      ${unlockedAchievements.length > 0
        ? unlockedAchievements.map(a => `
          <article class="achievement-card achievement-card--unlocked" aria-label="${a.title}: Desbloqueado">
            <span class="achievement-card__icon" aria-hidden="true">${a.icon}</span>
            <h3 class="achievement-card__title">${a.title}</h3>
            <p class="achievement-card__desc">${a.description}</p>
          </article>
        `).join('')
        : `<div class="achievements-empty-inline">
            <span aria-hidden="true">🏆</span>
            <p>Registrá tus primeros movimientos para desbloquear logros.</p>
          </div>`
      }
    </div>
  `;
}

/* ══════════════════════════════════════════
   Modal de Todos los Logros
══════════════════════════════════════════ */

function renderAchievementsModal() {
  const unlocked = getUnlockedAchievements();
  const total = ACHIEVEMENTS_LIST.length;
  const percentage = Math.round((unlocked.length / total) * 100);

  const modal = document.createElement('div');
  modal.className = 'achievements-modal-overlay';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.setAttribute('aria-label', 'Centro de Logros');

  modal.innerHTML = `
    <div class="achievements-modal">
      <header class="achievements-modal__header">
        <h2>🏆 Centro de Logros</h2>
        <div class="achievements-modal__progress">
          <div class="achievements-progress__track-inline">
            <div class="achievements-progress__fill-inline" style="width: ${percentage}%"></div>
          </div>
          <span>${unlocked.length} de ${total}</span>
        </div>
        <button type="button" class="achievements-modal__close" aria-label="Cerrar">
          <span aria-hidden="true">✕</span>
        </button>
      </header>
      <div class="achievements-modal__body">
        <div class="achievements-grid-modal">
          ${ACHIEVEMENTS_LIST.map(a => {
            const isUnlocked = unlocked.includes(a.id);
            const desc = isUnlocked
                          ? a.description
                          : (a.secret ? a.hint || '???' : a.description);
            return `
              <article class="achievement-card ${isUnlocked ? 'achievement-card--unlocked' : 'achievement-card--locked'}" aria-label="${a.title}: ${isUnlocked ? 'Desbloqueado' : 'Bloqueado'}">
                <span class="achievement-card__icon" aria-hidden="true">${isUnlocked ? a.icon : '🔒'}</span>
                <h3 class="achievement-card__title">${a.title}</h3>
                <p class="achievement-card__desc ${!isUnlocked && !a.secret ? 'achievement-card__desc--hint' : ''}">${desc}</p>
              </article>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;

  document.body.appendChild(modal);
  document.body.style.overflow = 'hidden';

  const closeBtn = modal.querySelector('.achievements-modal__close');
  closeBtn.addEventListener('click', () => closeAchievementsModal(modal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAchievementsModal(modal);
  });

  document.addEventListener('keydown', function escHandler(e) {
    if (e.key === 'Escape') {
      closeAchievementsModal(modal);
      document.removeEventListener('keydown', escHandler);
    }
  });
}

function closeAchievementsModal(modal) {
  modal.classList.add('achievements-modal-overlay--exit');
  modal.addEventListener('animationend', () => {
    modal.remove();
    document.body.style.overflow = '';
  });
}

function initAchievementButton() {
  const btn = document.getElementById('achievements-toggle');
  if (!btn) return;

  btn.addEventListener('click', renderAchievementsModal);
}

