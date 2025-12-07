document.addEventListener('DOMContentLoaded', () => {
    const expenseList = document.getElementById('expense-list');
    const monthlyList = document.getElementById('monthly-list');
    const addExpenseForm = document.getElementById('add-expense-form');
    const monthlySearchForm = document.getElementById('monthly-search-form');
    const currentTimeEl = document.getElementById('current-time');

    // Display and update the current time every second
    setInterval(() => {
        currentTimeEl.textContent = dayjs().format('HH:mm:ss');
    }, 1000);

    async function fetchExpenses() {
        const response = await fetch('/api/expenses');
        const expenses = await response.json();
        renderExpenses(expenses);
    }

    async function fetchMonthlyExpenses(month) {
        const response = await fetch(`/api/expenses/monthly/${month}`);
        const expenses = await response.json();
        renderMonthlyExpenses(expenses);
    }

    function renderExpenseTable(expenses, tableElement) {
        tableElement.innerHTML = '';
        let total = 0;
        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.id}</td>
                <td>${expense.description}</td>
                <td>${expense.amount}</td>
                <td>${expense.date}</td>
                <td>
                    <button onclick="editExpense(this, ${expense.id})">Edit</button>
                    <button onclick="deleteExpense(${expense.id})">Delete</button>
                </td>
            `;
            tableElement.appendChild(row);
            total += expense.amount;
        });

        const totalRow = document.createElement('tr');
        totalRow.className = 'total';
        totalRow.innerHTML = `
            <td colspan="2">Total</td>
            <td>${total.toFixed(2)}</td>
            <td colspan="2"></td>
        `;
        tableElement.appendChild(totalRow);
    }

    function renderExpenses(expenses) {
        renderExpenseTable(expenses, expenseList);
    }
    
    function renderMonthlyExpenses(expenses) {
        renderExpenseTable(expenses, monthlyList);
    }

    monthlySearchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const monthInput = document.getElementById('month-input');
        const month = monthInput.value;
        if (month) {
            await fetchMonthlyExpenses(month);
            monthInput.value = '';
        }
    });

    addExpenseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const description = document.getElementById('description').value;
        const amount = document.getElementById('amount').value;

        await fetch('/api/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description, amount: parseFloat(amount) }),
        });

        addExpenseForm.reset();
        fetchExpenses();
    });

    window.deleteExpense = async (id) => {
        await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
        });
        fetchExpenses();
    };

    window.editExpense = (button, id) => {
        const row = button.parentNode.parentNode;
        const descriptionCell = row.cells[1];
        const amountCell = row.cells[2];
    
        const description = descriptionCell.textContent;
        const amount = amountCell.textContent;
    
        descriptionCell.innerHTML = `<input type="text" value="${description}" />`;
        amountCell.innerHTML = `<input type="number" value="${amount}" />`;
    
        button.textContent = 'Save';
        button.onclick = () => saveExpense(id, row);
    };
    
    async function saveExpense(id, row) {
        const descriptionInput = row.cells[1].querySelector('input');
        const amountInput = row.cells[2].querySelector('input');
    
        const description = descriptionInput.value;
        const amount = parseFloat(amountInput.value);
    
        await fetch(`/api/expenses/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ description, amount }),
        });
    
        fetchExpenses();
    }

    fetchExpenses();
});
