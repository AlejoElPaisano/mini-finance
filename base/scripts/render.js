function renderAlerts() {
  if (!dom.alertsContainer) return;

  const alerts = checkAlerts();
  dom.alertsContainer.innerHTML = '';

  if (alerts.length === 0) return;

  alerts.forEach(alert => {
    const div = document.createElement('div');
    div.className = `alert alert--${alert.type}`;
    div.textContent = alert.message;
    dom.alertsContainer.appendChild(div);
  });
}

function renderDashboard() {
  if (dom.totalIncome) {
    dom.totalIncome.textContent = `$${formatCurrency(getTotalIncome())}`;
  }
  if (dom.totalExpense) {
    dom.totalExpense.textContent = `$${formatCurrency(getTotalExpense())}`;
  }
  if (dom.balance) {
    dom.balance.textContent = `$${formatCurrency(getBalance())}`;
  }
}

function renderMovements(filterType, filterCategory) {
  if (!dom.movementsList) return;

  let movements = getMovements();

  if (filterType) {
    movements = movements.filter(m => m.type === filterType);
  }
  if (filterCategory) {
    movements = movements.filter(m => m.category === filterCategory);
  }

  movements = movements.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  if (movements.length === 0) {
    dom.movementsList.innerHTML = '<p class="empty-state">No hay movimientos registrados.</p>';
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'movements-list';

  movements.forEach(movement => {
    const li = document.createElement('li');
    li.className = `movement-item movement-item--${movement.type}`;
    li.dataset.id = movement.id;

    const categoryLabel = getCategoryLabel(movement.type, movement.category);
    const sign = movement.type === 'income' ? '+' : '-';

    li.innerHTML = `
      <div class="movement-item__info">
        <span class="movement-item__description">${escapeHtml(movement.description)}</span>
        <span class="movement-item__meta">${categoryLabel} · ${formatDate(movement.date)}</span>
      </div>
      <span class="movement-item__amount">${sign}$${formatCurrency(movement.amount)}</span>
      <button type="button" class="movement-item__delete" aria-label="Eliminar movimiento" data-id="${movement.id}">
        <span aria-hidden="true">×</span>
      </button>
    `;

    ul.appendChild(li);
  });

  dom.movementsList.innerHTML = '';
  dom.movementsList.appendChild(ul);
}

function renderCategoryOptions(type) {
  if (!dom.categorySelect) return;

  const categories = type === 'income' ? CATEGORIES.income : CATEGORIES.expense;
  dom.categorySelect.innerHTML = '<option value="">Seleccionar categoria</option>';

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.label;
    dom.categorySelect.appendChild(option);
  });
}

function renderFilterCategoryOptions() {
  if (!dom.filterCategory) return;

  const allCategories = [...CATEGORIES.income, ...CATEGORIES.expense];
  const currentSelection = dom.filterCategory.value;

  dom.filterCategory.innerHTML = '<option value="">Todas</option>';

  allCategories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.textContent = cat.label;
    dom.filterCategory.appendChild(option);
  });

  if (currentSelection) {
    dom.filterCategory.value = currentSelection;
  }
}

function renderSavingsOutput() {
  if (!dom.savingsGoalInput || !dom.savingsGoalOutput) return;

  const value = dom.savingsGoalInput.value;
  dom.savingsGoalOutput.textContent = `$${formatCurrency(Number(value))}`;
}

function renderAdjustedAmount() {
  if (!dom.adjustedAmount || !dom.cardTotalAmount) return;

  const balance = getBalance();
  const goal = getSavingsGoal();
  const adjusted = Math.max(balance - goal, 0);

  dom.adjustedAmount.textContent = `$${formatCurrency(adjusted)}`;
  dom.cardTotalAmount.textContent = `$${formatCurrency(balance)}`;
}

function getCategoryLabel(type, categoryId) {
  const allCategories = [...CATEGORIES.income, ...CATEGORIES.expense];
  const found = allCategories.find(c => c.id === categoryId);
  if (found) return found.label;

  const fallbackLabels = {
    services: 'Servicios',
    amount: 'Reserva fija',
    percent: 'Reserva porcentual'
  };

  return fallbackLabels[categoryId] || categoryId;
}

function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function renderSavingsGoal() {
  if (!dom.savingsGoalDisplay) return;

  const goal = getSavingsGoal();
  const savingsMode = localStorage.getItem('savingsMode') || 'amount';
  const isPercent = savingsMode === 'percent';
  const totalIncome = getTotalIncome();
  const balance = getBalance();

  let progressPercentage;
  if (isPercent) {
    const targetAmount = totalIncome * (goal / 100);
    progressPercentage = targetAmount > 0 ? Math.min((balance / targetAmount) * 100, 100) : 0;
    dom.savingsGoalDisplay.textContent = `${goal}%`;
    dom.savingsCurrent.textContent = `$${formatCurrency(balance)} acumulados · Meta: ${goal}% de $${formatCurrency(totalIncome)}`;
  } else {
    progressPercentage = goal > 0 ? Math.min((balance / goal) * 100, 100) : 0;
    dom.savingsGoalDisplay.textContent = `$${formatCurrency(goal)}`;
    dom.savingsCurrent.textContent = `$${formatCurrency(balance)} acumulados`;
  }

  if (dom.savingsProgressFill) {
    dom.savingsProgressFill.style.width = `${progressPercentage}%`;
  }

  if (dom.savingsPercent) {
    dom.savingsPercent.textContent = `${Math.round(progressPercentage)}%`;
  }
}

function renderRecentMovements(limit = 5) {
  if (!dom.recentMovementsList) return;

  let movements = getMovements();

  movements = movements.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  const recent = movements.slice(0, limit);

  dom.recentMovementsList.innerHTML = '';

  if (recent.length === 0) {
    const li = document.createElement('li');
    li.className = 'empty-state';
    li.textContent = 'No hay movimientos registrados.';
    dom.recentMovementsList.appendChild(li);
    return;
  }

  recent.forEach(movement => {
    const li = document.createElement('li');
    li.className = `movement-item movement-item--${movement.type}`;

    const categoryLabel = getCategoryLabel(movement.type, movement.category);
    const typeLabel = movement.type === 'income' ? 'Ingreso'
                    : movement.type === 'expense' ? 'Gasto'
                    : 'Meta de ahorro';
    const sign = movement.type === 'income' ? '+' : movement.type === 'expense' ? '−' : '';

    li.innerHTML = `
      <div class="movement-item__info">
        <span class="movement-item__description">${escapeHtml(movement.description)}</span>
        <span class="movement-item__meta">${typeLabel} · ${categoryLabel} · ${formatDate(movement.date)}</span>
      </div>
      <span class="movement-item__amount">${sign}$${formatCurrency(movement.amount)}</span>
    `;

    dom.recentMovementsList.appendChild(li);
  });
}

function renderExpenseDistribution() {
  if (!dom.expenseDistributionContainer) return;

  const totalExpense = getTotalExpense();

  if (totalExpense === 0) {
    dom.expenseDistributionContainer.innerHTML = `
      <div class="chart-empty">
        <p class="chart-empty__icon" aria-hidden="true">📊</p>
        <p>Aún no hay gastos registrados para analizar.</p>
      </div>`;
    return;
  }

  const categoryTotals = getCategoryTotals();
  const expenseCategories = Object.entries(categoryTotals)
    .filter(([_, data]) => data.expense > 0)
    .sort((a, b) => b[1].expense - a[1].expense);

  if (expenseCategories.length === 0) {
    dom.expenseDistributionContainer.innerHTML = `
      <div class="chart-empty">
        <p class="chart-empty__icon" aria-hidden="true">📊</p>
        <p>Aún no hay gastos registrados para analizar.</p>
      </div>`;
    return;
  }

  const [topId, topData] = expenseCategories[0];
  const topLabel = getCategoryLabel('expense', topId);
  const topPercent = Math.round((topData.expense / totalExpense) * 100);

  let html = `<p class="expense-insight">💡 Tu mayor gasto es en <strong>${topLabel}</strong> (${topPercent}% del total)</p>`;
  html += '<div class="expense-list">';

  expenseCategories.forEach(([categoryId, data]) => {
    const label = getCategoryLabel('expense', categoryId);
    const percent = ((data.expense / totalExpense) * 100).toFixed(1);
    const percentRounded = Math.round(percent);

    html += `
      <div class="expense-item">
        <div class="expense-item__header">
          <span class="expense-item__label">${label}</span>
          <div>
            <span class="expense-item__amount">$${formatCurrency(data.expense)}</span>
            <span class="expense-item__percent">(${percentRounded}%)</span>
          </div>
        </div>
        <div class="expense-item__track">
          <div class="expense-item__fill" style="width: ${percent}%;"></div>
        </div>
      </div>
    `;
  });

  html += '</div>';
  dom.expenseDistributionContainer.innerHTML = html;
}
