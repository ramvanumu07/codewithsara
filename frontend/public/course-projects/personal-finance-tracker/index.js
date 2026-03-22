// ── Topics: Async/Await, Promises, Closures, Arrow Functions, Functions,
//    Recursion (menu loop), Conditionals, Loops, Loop Control, Spread/Rest,
//    Destructuring, Strings, Split/Join, Substring/Slice, Regex,
//    String Searching, Arrays, Objects, JSON, Error Handling, Modules,
//    Console.log, Variables & Constants, Numbers, Math, Undefined/Null,
//    Type Coercion, Operators, Date/Time, Classes ──

const readline = require("readline");
const FinanceTracker = require("./FinanceTracker");

const tracker = new FinanceTracker();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const BOLD = "\u001b[1m";
const DIM = "\u001b[2m";
const RESET = "\u001b[0m";
const CYAN = "\u001b[36m";
const GREEN = "\u001b[32m";
const RED = "\u001b[31m";
const YELLOW = "\u001b[33m";
const MAGENTA = "\u001b[35m";

// ── Promisified question (Promises + Closures) ─────────────────

const ask = (prompt) =>
  new Promise((resolve) => {
    rl.question(`${CYAN}  ${prompt}${RESET}`, (answer) => {
      resolve(answer.trim());
    });
  });

const pause = () => ask("\n  Press ENTER to continue...");

// ── Banner ─────────────────────────────────────────────────────

const showBanner = () => {
  console.clear();
  console.log(`
${CYAN}${BOLD}  ╔════════════════════════════════════════════════════════╗
  ║                                                        ║
  ║    PERSONAL FINANCE TRACKER                            ║
  ║    ─────────────────────────                           ║
  ║    Track income, expenses & budgets from terminal      ║
  ║                                                        ║
  ╚════════════════════════════════════════════════════════╝${RESET}
  `);
};

// ── Main menu ───────────────────────────────────────────────────

const showMenu = () => {
  console.log(`${BOLD}${MAGENTA}  ┌──────────────────────────────────┐${RESET}`);
  console.log(`${BOLD}${MAGENTA}  │         MAIN MENU                │${RESET}`);
  console.log(`${BOLD}${MAGENTA}  ├──────────────────────────────────┤${RESET}`);
  console.log(`${MAGENTA}  │                                  │${RESET}`);
  console.log(`${GREEN}  │   1.  Add Income                 │${RESET}`);
  console.log(`${RED}  │   2.  Add Expense                │${RESET}`);
  console.log(`${CYAN}  │   3.  View Report                │${RESET}`);
  console.log(`${CYAN}  │   4.  Recent Transactions        │${RESET}`);
  console.log(`${YELLOW}  │   5.  Budget Manager             │${RESET}`);
  console.log(`${CYAN}  │   6.  Search Transactions        │${RESET}`);
  console.log(`${RED}  │   7.  Delete Transaction         │${RESET}`);
  console.log(`${DIM}  │   0.  Save & Exit                │${RESET}`);
  console.log(`${MAGENTA}  │                                  │${RESET}`);
  console.log(`${BOLD}${MAGENTA}  └──────────────────────────────────┘${RESET}\n`);
};

// ── Handlers ────────────────────────────────────────────────────

const handleAddIncome = async () => {
  console.log(`\n${GREEN}${BOLD}  ── ADD INCOME ─────────────────────${RESET}\n`);

  const amount = await ask("Amount: ");
  if (!amount) { console.log(`${RED}  Cancelled.${RESET}`); return; }

  const category = await ask("Category (e.g. salary, freelance, interest): ");
  if (!category) { console.log(`${RED}  Cancelled.${RESET}`); return; }

  const description = await ask("Description (optional): ");

  try {
    const t = tracker.addIncome(Number(amount), category, description);
    console.log(`\n${GREEN}  Income added: +${t.amount.toFixed(2)} [${t.category}]${RESET}`);
    await autoSave();
  } catch (err) {
    console.log(`\n${RED}  Error: ${err.message}${RESET}`);
  }
};

const handleAddExpense = async () => {
  console.log(`\n${RED}${BOLD}  ── ADD EXPENSE ────────────────────${RESET}\n`);

  const amount = await ask("Amount: ");
  if (!amount) { console.log(`${RED}  Cancelled.${RESET}`); return; }

  const category = await ask("Category (e.g. food, rent, shopping, transport): ");
  if (!category) { console.log(`${RED}  Cancelled.${RESET}`); return; }

  const description = await ask("Description (optional): ");

  try {
    const { transaction: t, alerts } = tracker.addExpense(Number(amount), category, description);
    console.log(`\n${RED}  Expense added: -${t.amount.toFixed(2)} [${t.category}]${RESET}`);

    if (alerts.length > 0) {
      console.log();
      alerts.forEach((a) => console.log(a));
    }

    await autoSave();
  } catch (err) {
    console.log(`\n${RED}  Error: ${err.message}${RESET}`);
  }
};

const handleBudgetManager = async () => {
  console.log(`\n${YELLOW}${BOLD}  ── BUDGET MANAGER ─────────────────${RESET}\n`);

  tracker.printBudgetStatus();

  console.log(`${YELLOW}  1. Set / Update a budget${RESET}`);
  console.log(`${YELLOW}  2. Remove a budget${RESET}`);
  console.log(`${YELLOW}  3. Back to main menu${RESET}\n`);

  const choice = await ask("Choose (1-3): ");

  if (choice === "1") {
    const cat = await ask("Category: ");
    const limit = await ask("Monthly limit: ");

    try {
      tracker.setBudget(cat, Number(limit));
      console.log(`\n${GREEN}  Budget set: ${cat} -> ${Number(limit).toFixed(2)}/month${RESET}`);
      await autoSave();
    } catch (err) {
      console.log(`\n${RED}  Error: ${err.message}${RESET}`);
    }
  } else if (choice === "2") {
    const cat = await ask("Category to remove: ");

    try {
      tracker.removeBudget(cat);
      console.log(`\n${GREEN}  Budget removed for "${cat}".${RESET}`);
      await autoSave();
    } catch (err) {
      console.log(`\n${RED}  Error: ${err.message}${RESET}`);
    }
  }
};

const handleSearch = async () => {
  console.log(`\n${CYAN}${BOLD}  ── SEARCH TRANSACTIONS ────────────${RESET}\n`);

  const query = await ask("Search (category or description, supports regex): ");
  if (!query) { console.log(`${RED}  Cancelled.${RESET}`); return; }

  try {
    const results = tracker.searchTransactions(query);

    if (results.length === 0) {
      console.log(`\n  No transactions matching "${query}".`);
    } else {
      console.log(`\n  Found ${results.length} result(s):\n`);
      results.forEach((t) => {
        const color = t.type === "income" ? GREEN : RED;
        const sign = t.type === "income" ? "+" : "-";
        console.log(
          `  ${DIM}#${String(t.id).padEnd(4)}${RESET} ${t.formattedDate}  ${color}${sign}${t.amount.toFixed(2).padStart(10)}${RESET}  ${t.category.padEnd(14)} ${t.description}`
        );
      });
    }
  } catch (err) {
    console.log(`\n${RED}  Error: Invalid regex — ${err.message}${RESET}`);
  }
};

const handleDelete = async () => {
  console.log(`\n${RED}${BOLD}  ── DELETE TRANSACTION ─────────────${RESET}\n`);

  tracker.printRecentTransactions(5);

  const idStr = await ask("Enter transaction ID to delete: ");
  const id = Number(idStr);

  if (!id || isNaN(id)) {
    console.log(`${RED}  Invalid ID.${RESET}`);
    return;
  }

  const confirm = await ask(`Are you sure you want to delete #${id}? (y/n): `);

  if (confirm.toLowerCase() === "y") {
    try {
      const removed = tracker.deleteTransaction(id);
      console.log(`\n${GREEN}  Deleted: ${removed.type} ${removed.amount.toFixed(2)} [${removed.category}]${RESET}`);
      await autoSave();
    } catch (err) {
      console.log(`\n${RED}  Error: ${err.message}${RESET}`);
    }
  } else {
    console.log(`  Cancelled.`);
  }
};

// ── Auto-save (Async/Await) ─────────────────────────────────────

const autoSave = async () => {
  try {
    await tracker.save();
    console.log(`${DIM}  [saved]${RESET}`);
  } catch (err) {
    console.log(`${RED}  Warning: Could not save — ${err.message}${RESET}`);
  }
};

// ── Main loop ───────────────────────────────────────────────────

const main = async () => {
  showBanner();

  let running = true;

  while (running) {
    showMenu();
    const choice = await ask("Enter your choice (0-7): ");

    switch (choice) {
      case "1":
        await handleAddIncome();
        break;
      case "2":
        await handleAddExpense();
        break;
      case "3":
        tracker.printFullReport();
        break;
      case "4": {
        const nStr = await ask("How many recent transactions? (default 10): ");
        const n = Number(nStr) || 10;
        tracker.printRecentTransactions(n);
        break;
      }
      case "5":
        await handleBudgetManager();
        break;
      case "6":
        await handleSearch();
        break;
      case "7":
        await handleDelete();
        break;
      case "0":
        running = false;
        break;
      default:
        console.log(`\n${RED}  Invalid choice. Pick 0-7.${RESET}`);
    }

    if (running) {
      await pause();
      console.clear();
    }
  }

  try {
    await tracker.save();
    console.log(`\n${GREEN}  Data saved. Goodbye!${RESET}\n`);
  } catch (err) {
    console.log(`\n${RED}  Warning: Could not save on exit — ${err.message}${RESET}\n`);
  }

  rl.close();
};

main();
