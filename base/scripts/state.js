const STORAGE_KEYS = {
  movements: 'miniFinanceMovements',
  savingsGoal: 'miniFinanceSavingsGoal',
  spendingLimit: 'miniFinanceSpendingLimit'
};

const DEFAULTS = {
  savingsGoal: 1000,
  spendingLimit: 50000
};


export const TYPE_LABELS = {
    income: 'Ingreso',
    expense: 'Gasto',
    savings: 'Meta de ahorro',
}

export const CATEGORY_LABELS = {
    salary: 'Sueldo',
    sales: 'Ventas',
    food: 'Alimentos',
    transport: 'Transporte',
    services: 'Servicios',
    entertainment: 'Entretenimiento',
    amount: 'Reserva fija',
    percent: 'Reserva porcentual',
}


export const SIGN_BY_TYPE = {
    income:  '+',
    expense: '−',
    savings: '⊘',
}




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

function getSpendingLimit() {
  const saved = localStorage.getItem(STORAGE_KEYS.spendingLimit);
  return saved ? Number(saved) : DEFAULTS.spendingLimit;
}

function setSpendingLimit(value) {
  localStorage.setItem(STORAGE_KEYS.spendingLimit, String(value));
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
  const totalExpense = getTotalExpense();
  const limit = getSpendingLimit();
  const balance = getBalance();
  const goal = getSavingsGoal();

  if (totalExpense > limit) {
    alerts.push({
      type: 'danger',
      message: `Superaste tu limite de gasto ($${formatCurrency(limit)}). Gastos actuales: $${formatCurrency(totalExpense)}.`
    });
  }

  if (balance < goal && getMovements().length > 0) {
    alerts.push({
      type: 'warning',
      message: `No alcanzaste tu meta de ahorro ($${formatCurrency(goal)}). Saldo actual: $${formatCurrency(balance)}.`
    });
  }

  return alerts;
}

function formatCurrency(value) {
  return new Intl.NumberFormat('es-AR').format(value);
}
