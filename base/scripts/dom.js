const dom = {
  alertsContainer: document.getElementById('alerts-container'),
  totalIncome: document.getElementById('total-income'),
  totalExpense: document.getElementById('total-expense'),
  balance: document.getElementById('balance'),
  movementsList: document.getElementById('movements-list'),

  movementForm: document.getElementById('movement-form'),
  typeSelect: document.getElementById('type'),
  categorySelect: document.getElementById('category'),
  descriptionInput: document.getElementById('description'),
  dateInput: document.getElementById('date'),
  amountInput: document.getElementById('amount'),
  submitBtn: document.getElementById('submit-btn'),

  savingsGoalInput: document.getElementById('savings-goal'),
  savingsGoalOutput: document.getElementById('savings-goal-output'),
  adjustedAmount: document.getElementById('adjusted-amount'),
  cardTotalAmount: document.querySelector('.card-total-amount'),

  filterType: document.getElementById('filter-type'),
  filterCategory: document.getElementById('filter-category'),
  filtersContainer: document.querySelector('.filters')
};
