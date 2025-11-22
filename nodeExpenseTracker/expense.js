const { Command } = require('commander');
const { createExpense, getExpense, removeExpense, updateExpense, listExpenses, monthExpenses } = require('./expenseCRUD');
const program = new Command();

program
  .version('1.0.0')
  .description('Expense Tracker App');



// CRUD COMMANDS  //

program
  .command('create')
  .description('Create a new expense')
  .requiredOption('--description <description>', 'Description of the expense')
  .requiredOption('--amount <amount>', 'Amount of the expense')
  .action((options) => {
    createExpense(options.description, Number(options.amount));
  });

program
  .command('list')
  .description('List all expenses')
  .action(() => {
    listExpenses();
  });


program
  .command('update <id>')
  .description('Update an expense')
  .option('--description <description>', 'New description')
  .option('--amount <amount>', 'New amount')
  .action((id, options) => {
    updateExpense(Number(id), options.description, options.amount ? Number(options.amount) : undefined);
  });

program
  .command('delete <id>')
  .description('Delete an expense by ID')
  .action((id) => {
    removeExpense(Number(id));
  });




// END CRUD COMMANDS //


// ADDITIONAL READING COMMANDS //
program
  .command('detail <id>')
  .description('Get details of a specific expense')
  .action((id) => {
    getExpense(Number(id));
  });

program
  .command('summary <month>')
  .description('List expenses for a specific month')
  .action((month) => {
    monthExpenses(month);
  });

// END ADDITIONAL READING COMMANDS //


program.parse(process.argv);


