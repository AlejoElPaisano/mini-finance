function initFormEvents() {
  if (!dom.movementForm) return;

  dom.movementForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const type = dom.typeSelect.value;
    const category = dom.categorySelect.value;
    const description = dom.descriptionInput.value.trim();
    const date = dom.dateInput.value;
    const amount = Number(dom.amountInput.value);

    if (!type || !category || !description || !date || !amount || amount <= 0) {
      return;
    }

    const movement = {
      id: crypto.randomUUID(),
      type,
      description,
      amount,
      category,
      date
    };

    addMovement(movement);
    dom.movementForm.reset();

    if (dom.typeSelect) {
      renderCategoryOptions(dom.typeSelect.value);
    }

    refreshAll();
  });
}

function initTypeChangeEvent() {
  if (!dom.typeSelect) return;

  dom.typeSelect.addEventListener('change', () => {
    renderCategoryOptions(dom.typeSelect.value);
  });
}

function initFilterEvents() {
  if (dom.filterType) {
    dom.filterType.addEventListener('change', () => {
      renderMovements(dom.filterType.value, dom.filterCategory ? dom.filterCategory.value : '');
    });
  }

  if (dom.filterCategory) {
    dom.filterCategory.addEventListener('change', () => {
      renderMovements(dom.filterType ? dom.filterType.value : '', dom.filterCategory.value);
    });
  }
}

function initDeleteEvents() {
  if (!dom.movementsList) return;

  dom.movementsList.addEventListener('click', (event) => {
    const deleteBtn = event.target.closest('.movement-item__delete');
    if (!deleteBtn) return;

    const id = deleteBtn.dataset.id;
    if (!id) return;

    deleteMovement(id);
    refreshAll();
  });
}

function initSavingsGoalEvent() {
  if (!dom.savingsGoalInput) return;

  dom.savingsGoalInput.addEventListener('input', () => {
    renderSavingsOutput();
    setSavingsGoal(Number(dom.savingsGoalInput.value));
    renderAdjustedAmount();
    renderAlerts();
  });
}

function initRangeOutput() {
  if (!dom.savingsGoalInput || !dom.savingsGoalOutput) return;

  dom.savingsGoalInput.value = getSavingsGoal();
  renderSavingsOutput();
}

function refreshAll() {
  renderDashboard();
  renderMovements(
    dom.filterType ? dom.filterType.value : '',
    dom.filterCategory ? dom.filterCategory.value : ''
  );
  renderAdjustedAmount();
  renderAlerts();
}
