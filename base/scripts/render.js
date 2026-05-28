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
  const categories = type === 'income' ? CATEGORIES.income : CATEGORIES.expense;
  const found = categories.find(c => c.id === categoryId);
  return found ? found.label : categoryId;
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
