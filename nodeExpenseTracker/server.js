const express = require('express');
const path = require('path');
const expenseCRUD = require('./expenseCRUD');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/expenses', (req, res) => {
    res.json(expenseCRUD.listExpenses());
});

app.get('/api/expenses/monthly/:month', (req, res) => {
    res.json(expenseCRUD.monthExpenses(req.params.month));
});

app.post('/api/expenses', (req, res) => {
    const { description, amount } = req.body;
    expenseCRUD.createExpense(description, amount);
    res.status(201).send();
});

app.delete('/api/expenses/:id', (req, res) => {
    expenseCRUD.removeExpense(parseInt(req.params.id));
    res.status(204).send();
});

app.put('/api/expenses/:id', (req, res) => {
    const { description, amount } = req.body;
    expenseCRUD.updateExpense(parseInt(req.params.id), description, amount);
    res.status(200).send();
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
