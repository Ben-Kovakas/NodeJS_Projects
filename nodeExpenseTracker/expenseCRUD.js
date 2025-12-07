const fs = require('fs');
const path = require('path');
const dayjs = require('dayjs');

const FILE_PATH = path.join(__dirname, 'expenses.json');

function loadExpenses() {
    if (!fs.existsSync(FILE_PATH)) {
      return [];
    }
    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    return JSON.parse(data || '[]');
  }
  
  function saveExpenses(expenses) {
    fs.writeFileSync(FILE_PATH, JSON.stringify(expenses, null, 2));
  }

  function createExpense(description, amount) {
    const expenseList = loadExpenses();
    const newId = expenseList.length === 0 ? 1 : expenseList[expenseList.length - 1].id + 1;
    expenseList.push({ id: newId, description, amount, date });
    saveExpenses(expenseList);
    console.log(`Expense created successfully (ID: ${newId})`);
}

function getExpense(id) {
    const expenseList = loadExpenses();
    const expense = expenseList.find(exp => exp.id === id);
    if (expense) {
        console.log(expense);
    } else {
        console.log(`Expense with ID ${id} not found.`);
    }
}

function removeExpense(id) {
    const expenseList = loadExpenses();
    const index = expenseList.findIndex(exp => exp.id === id);

    if (index === -1) {
        console.log(`Expense with ID ${id} not found.`);
        return;
    }

    // Remove the expense
    expenseList.splice(index, 1);

    // Decrement IDs for all subsequent expenses
    for (let i = index; i < expenseList.length; i++) {
        expenseList[i].id -= 1;
    }

    saveExpenses(expenseList);
    console.log(`Expense with ID ${id} removed successfully.`);
}

function updateExpense(id, description, amount){
    const expenseList = loadExpenses();
    const expenseIndex = expenseList.findIndex(exp => exp.id === id);
    if (expenseIndex === -1) {
        console.log(`Expense with ID ${id} not found.`);
        return;
    }
    
    // Only update fields that are provided (not undefined)
    const oldExpense = expenseList[expenseIndex];
    expenseList[expenseIndex] = { 
        ...oldExpense,
        description: description !== undefined ? description : oldExpense.description,
        amount: amount !== undefined ? amount : oldExpense.amount
    };

    saveExpenses(expenseList);
    console.log(`Expense with ID ${id} updated successfully.`);
}

function listExpenses() {
    const expenseList = loadExpenses();
    return expenseList;
}

function monthExpenses(month) {
    const expenseList = loadExpenses();
    const filteredList = expenseList.filter(expense => {
        const dateParts = expense.date.split('-');
        // Month is at index 1 in YYYY-MM-DD
        return parseInt(dateParts[1]) === parseInt(month);
    });

    if (filteredList.length === 0) {
        console.log(`No expenses found for month ${month}.`);
        return []; // Return an empty array instead of undefined
    }

    return filteredList;
}
module.exports = {
  createExpense,
  getExpense,
  removeExpense,
  updateExpense,
  listExpenses,
  monthExpenses
};
