document.addEventListener('DOMContentLoaded', () => {
    const expenseList = document.getElementById('expense-list');
    const addExpenseForm = document.getElementById('add-expense-form');

    async function fetchExpenses() {
        const response = await fetch('/api/expenses');
        const expenses = await response.json();
        renderExpenses(expenses);
    }

    function renderExpenses(expenses) {
        expenseList.innerHTML = '';
        let total = 0;
        expenses.forEach(expense => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${expense.id}</td>
                <td>${expense.description}</td>
                <td>${expense.amount}</td>
                <td>${expense.date}</td>
                <td>
                    <button onclick="deleteExpense(${expense.id})">Delete</button>
                </td>
            `;
            expenseList.appendChild(row);
            total += expense.amount;
        });

        const totalRow = document.createElement('tr');
        totalRow.className = 'total';
        totalRow.innerHTML = `
            <td colspan="2">Total</td>
            <td>${total.toFixed(2)}</td>
            <td colspan="2"></td>
        `;
        expenseList.appendChild(totalRow);
    }

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

    fetchExpenses();
});
