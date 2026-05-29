const CATEGORIES = {
  income: [
    { id: 'salary', label: 'Salario' },
    { id: 'freelance', label: 'Freelance' },
    { id: 'investment', label: 'Inversiones' },
    { id: 'gift', label: 'Regalos' },
    { id: 'other-income', label: 'Otros ingresos' }
  ],
  expense: [
    { id: 'food', label: 'Comida' },
    { id: 'transport', label: 'Transporte' },
    { id: 'services', label: 'Servicios' },
    { id: 'housing', label: 'Vivienda' },
    { id: 'entertainment', label: 'Entretenimiento' },
    { id: 'health', label: 'Salud' },
    { id: 'education', label: 'Educación' },
    { id: 'shopping', label: 'Compras' },
    { id: 'other-expense', label: 'Otros gastos' }
  ]
};

const MOVEMENT_TYPES = {
  income: 'income',
  expense: 'expense'
};

const ALERT_TYPES = {
  overspending: 'overspending',
  savingsGoal: 'savingsGoal'
};
