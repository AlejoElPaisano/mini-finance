const STORAGE_KEYS = {
  movements: 'miniFinanceMovements',
  savingsGoal: 'miniFinanceSavingsGoal'
};

const DEFAULTS = {
  savingsGoal: 0
};



function loadData(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getMovements() {
  return loadData(STORAGE_KEYS.movements, []);
}

function saveMovements(movements) {
  saveData(STORAGE_KEYS.movements, movements);
}

function addMovement(movement) {
  const movements = getMovements();
  movements.push(movement);
  saveMovements(movements);
  return movements;
}

function deleteMovement(id) {
  const movements = getMovements().filter(m => m.id !== id);
  saveMovements(movements);
  return movements;
}

function getSavingsGoal() {
  const saved = localStorage.getItem(STORAGE_KEYS.savingsGoal);
  return saved ? Number(saved) : DEFAULTS.savingsGoal;
}

function setSavingsGoal(value) {
  localStorage.setItem(STORAGE_KEYS.savingsGoal, String(value));
}

function getTotalIncome() {
  return getMovements()
    .filter(m => m.type === 'income')
    .reduce((sum, m) => sum + m.amount, 0);
}

function getTotalExpense() {
  return getMovements()
    .filter(m => m.type === 'expense')
    .reduce((sum, m) => sum + m.amount, 0);
}

function getBalance() {
  return getTotalIncome() - getTotalExpense();
}

function getCategoryTotals() {
  return getMovements().reduce((acc, m) => {
    if (!acc[m.category]) {
      acc[m.category] = { income: 0, expense: 0, total: 0 };
    }
    acc[m.category][m.type] += m.amount;
    acc[m.category].total = m.type === 'income'
      ? acc[m.category].total + m.amount
      : acc[m.category].total - m.amount;
    return acc;
  }, {});
}

function getSavingsProgress() {
  const goal = getSavingsGoal();
  const balance = getBalance();
  if (goal <= 0) return { percentage: 0, remaining: 0 };
  const percentage = Math.min((balance / goal) * 100, 100);
  const remaining = Math.max(goal - balance, 0);
  return { percentage, remaining };
}

function checkAlerts() {
  const alerts = [];
  const balance = getBalance();
  const goal = getSavingsGoal();
  const savingsMode = localStorage.getItem('savingsMode') || 'amount';
  const isPercent = savingsMode === 'percent';

  if (balance < goal && getMovements().length > 0) {
    const goalLabel = isPercent ? `%${goal}` : `$${formatCurrency(goal)}`;
    alerts.push({
      type: 'warning',
      message: `No alcanzaste tu meta de ahorro (${goalLabel}). Saldo actual: $${formatCurrency(balance)}.`
    });
  }

  return alerts;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('es-AR').format(value);
}
