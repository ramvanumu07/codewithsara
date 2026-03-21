// ── Topics: Classes, Inheritance, Closures, Async/Await, Promises,
//    JSON, Arrays, Objects, Destructuring, Spread/Rest, Map, Filter,
//    Reduce, Find, Some/Every, forEach, Arrow Functions, Loops,
//    Loop Control, Regex, String Manipulation, Split/Join, Substring/Slice,
//    String Searching, Error Handling, Modules, Date/Time, Math,
//    Undefined/Null, Type Coercion, Conditionals, Operators ──

const fs = require("fs");
const path = require("path");
const { Transaction } = require("./Transaction");

const DATA_FILE = path.join(__dirname, "data.json");

const createBudgetChecker = (limit) => {
  let warned80 = false;
  let warned100 = false;

  return (spent) => {
    const pct = (spent / limit) * 100;
    const alerts = [];

    if (pct >= 100 && !warned100) {
      warned100 = true;
      alerts.push(`\u001b[31m  OVER BUDGET! Spent ${spent.toFixed(2)} of ${limit.toFixed(2)} (${pct.toFixed(1)}%)\u001b[0m`);
    } else if (pct >= 80 && !warned80) {
      warned80 = true;
      alerts.push(`\u001b[33m  Warning: Approaching limit! Spent ${spent.toFixed(2)} of ${limit.toFixed(2)} (${pct.toFixed(1)}%)\u001b[0m`);
    }

    return alerts;
  };
};

class FinanceTracker {
  #transactions = [];
  #budgets = {};
  #budgetCheckers = {};

  constructor() {
    this.#loadState();
  }

  // ── Persistence (Promises + Async/Await) ──────────────────────

  #loadState() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, "utf-8");
        const data = JSON.parse(raw);

        const { transactions = [], budgets = {} } = data;

        if (transactions.length > 0) {
          const maxId = transactions.reduce((max, t) => Math.max(max, t.id), 0);
          Transaction.resetIdCounter(maxId + 1);
        }

        this.#transactions = transactions.map((t) => Transaction.fromJSON(t));
        this.#budgets = { ...budgets };

        Object.entries(this.#budgets).forEach(([cat, limit]) => {
          this.#budgetCheckers[cat] = createBudgetChecker(limit);
        });

        console.log(`\u001b[36m  Loaded ${transactions.length} transactions from disk.\u001b[0m`);
      }
    } catch {
      console.log("  Could not load saved data — starting fresh.");
    }
  }

  async save() {
    const data = {
      transactions: this.#transactions.map((t) => t.toJSON()),
      budgets: { ...this.#budgets },
    };

    return new Promise((resolve, reject) => {
      fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8", (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  // ── Add Transactions ──────────────────────────────────────────

  addIncome(amount, category, description) {
    const t = new Transaction({ type: "income", amount, category, description });
    this.#transactions.push(t);
    return t;
  }

  addExpense(amount, category, description) {
    const t = new Transaction({ type: "expense", amount, category, description });
    this.#transactions.push(t);

    const alerts = this.#checkBudget(category);
    return { transaction: t, alerts };
  }

  // ── Delete Transaction ────────────────────────────────────────

  deleteTransaction(id) {
    const idx = this.#transactions.findIndex((t) => t.id === id);
    if (idx === -1) throw new Error(`Transaction #${id} not found.`);

    const [removed] = this.#transactions.splice(idx, 1);
    return removed;
  }

  // ── Budgets (Closures) ────────────────────────────────────────

  setBudget(category, limit) {
    if (!category || typeof category !== "string") {
      throw new Error("Category must be a non-empty string.");
    }
    if (isNaN(Number(limit)) || Number(limit) <= 0) {
      throw new Error("Budget limit must be a positive number.");
    }

    const cat = category.trim().toLowerCase();
    this.#budgets[cat] = Number(limit);
    this.#budgetCheckers[cat] = createBudgetChecker(Number(limit));
  }

  removeBudget(category) {
    const cat = category.trim().toLowerCase();
    if (!(cat in this.#budgets)) throw new Error(`No budget set for "${cat}".`);

    delete this.#budgets[cat];
    delete this.#budgetCheckers[cat];
  }

  #checkBudget(category) {
    const cat = category.trim().toLowerCase();
    const checker = this.#budgetCheckers[cat];
    if (!checker) return [];

    const spent = this.#transactions
      .filter((t) => t.type === "expense" && t.category === cat)
      .reduce((sum, t) => sum + t.amount, 0);

    return checker(spent);
  }

  // ── Queries ───────────────────────────────────────────────────

  get totalIncome() {
    return this.#transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get totalExpenses() {
    return this.#transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  }

  get balance() {
    return Math.round((this.totalIncome - this.totalExpenses) * 100) / 100;
  }

  get transactionCount() {
    return this.#transactions.length;
  }

  getRecentTransactions(n = 10) {
    return [...this.#transactions].reverse().slice(0, n);
  }

  searchTransactions(query) {
    const pattern = new RegExp(query, "i");
    return this.#transactions.filter(
      (t) => pattern.test(t.category) || pattern.test(t.description)
    );
  }

  filterByType(type) {
    return this.#transactions.filter((t) => t.type === type);
  }

  filterByCategory(category) {
    const cat = category.trim().toLowerCase();
    return this.#transactions.filter((t) => t.category === cat);
  }

  filterByDateRange(startStr, endStr) {
    const start = new Date(startStr).getTime();
    const end = new Date(endStr).getTime();

    if (isNaN(start) || isNaN(end)) throw new Error("Invalid date format.");

    return this.#transactions.filter((t) => {
      const d = new Date(t.date).getTime();
      return d >= start && d <= end;
    });
  }

  // ── Category Summary ──────────────────────────────────────────

  getCategorySummary() {
    const summary = {};

    this.#transactions.forEach((t) => {
      const cat = t.category;
      if (!summary[cat]) summary[cat] = { income: 0, expense: 0 };
      summary[cat][t.type] += t.amount;
    });

    return Object.entries(summary)
      .map(([category, data]) => ({
        category,
        ...data,
        net: Math.round((data.income - data.expense) * 100) / 100,
      }))
      .sort((a, b) => b.expense - a.expense);
  }

  // ── Monthly Summary ───────────────────────────────────────────

  getMonthlySummary() {
    const months = {};

    this.#transactions.forEach((t) => {
      const key = t.monthKey;
      if (!months[key]) months[key] = { income: 0, expense: 0 };
      months[key][t.type] += t.amount;
    });

    return Object.entries(months)
      .map(([month, data]) => ({
        month,
        ...data,
        savings: Math.round((data.income - data.expense) * 100) / 100,
        savingsRate: data.income > 0
          ? Math.round(((data.income - data.expense) / data.income) * 10000) / 100
          : 0,
      }))
      .sort((a, b) => a.month.localeCompare(b.month));
  }

  // ── Budget Status ─────────────────────────────────────────────

  getBudgetStatus() {
    return Object.entries(this.#budgets).map(([category, limit]) => {
      const spent = this.#transactions
        .filter((t) => t.type === "expense" && t.category === category)
        .reduce((sum, t) => sum + t.amount, 0);

      const remaining = Math.round((limit - spent) * 100) / 100;
      const pct = limit > 0 ? Math.round((spent / limit) * 10000) / 100 : 0;

      return { category, limit, spent, remaining, pct };
    });
  }

  // ── Top Spending Categories ───────────────────────────────────

  getTopSpendingCategories(n = 5) {
    const catSpend = {};

    this.#transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        catSpend[t.category] = (catSpend[t.category] || 0) + t.amount;
      });

    return Object.entries(catSpend)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, n);
  }

  // ── Print Helpers ─────────────────────────────────────────────

  printSummary() {
    const g = "\u001b[32m";
    const r = "\u001b[31m";
    const c = "\u001b[36m";
    const y = "\u001b[33m";
    const dim = "\u001b[2m";
    const reset = "\u001b[0m";
    const bold = "\u001b[1m";

    const bal = this.balance;
    const balColor = bal >= 0 ? g : r;
    const savingsRate = this.totalIncome > 0
      ? Math.round((bal / this.totalIncome) * 10000) / 100
      : 0;

    console.log(`\n${bold}${c}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}`);
    console.log(`${bold}${c}   FINANCIAL SUMMARY${reset}`);
    console.log(`${bold}${c}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}`);
    console.log(`${dim}  Transactions : ${this.transactionCount}${reset}`);
    console.log(`${g}  Income       : +₹${this.totalIncome.toFixed(2)}${reset}`);
    console.log(`${r}  Expenses     : -₹${this.totalExpenses.toFixed(2)}${reset}`);
    console.log(`  ${dim}─────────────────────────${reset}`);
    console.log(`${balColor}${bold}  Balance      :  ₹${bal.toFixed(2)}${reset}`);
    console.log(`${y}  Savings Rate : ${savingsRate}%${reset}`);
    console.log(`${c}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${reset}\n`);
  }

  printCategorySummary() {
    const data = this.getCategorySummary();
    const dim = "\u001b[2m";
    const bold = "\u001b[1m";
    const reset = "\u001b[0m";
    const cyan = "\u001b[36m";

    console.log(`\n${bold}${cyan}  CATEGORY BREAKDOWN${reset}`);
    console.log(`  ${"Category".padEnd(16)} ${"Income".padStart(12)} ${"Expense".padStart(12)} ${"Net".padStart(12)}`);
    console.log(`  ${dim}${"─".repeat(54)}${reset}`);

    data.forEach(({ category, income, expense, net }) => {
      const netColor = net >= 0 ? "\u001b[32m" : "\u001b[31m";
      console.log(
        `  ${category.padEnd(16)} ${("₹" + income.toFixed(2)).padStart(12)} ${("₹" + expense.toFixed(2)).padStart(12)} ${netColor}${("₹" + net.toFixed(2)).padStart(12)}${reset}`
      );
    });

    console.log();
  }

  printMonthlySummary() {
    const data = this.getMonthlySummary();
    const bold = "\u001b[1m";
    const reset = "\u001b[0m";
    const cyan = "\u001b[36m";
    const dim = "\u001b[2m";

    console.log(`\n${bold}${cyan}  MONTHLY SUMMARY${reset}`);
    console.log(`  ${"Month".padEnd(10)} ${"Income".padStart(12)} ${"Expense".padStart(12)} ${"Savings".padStart(12)} ${"Rate".padStart(8)}`);
    console.log(`  ${dim}${"─".repeat(56)}${reset}`);

    data.forEach(({ month, income, expense, savings, savingsRate }) => {
      const sColor = savings >= 0 ? "\u001b[32m" : "\u001b[31m";
      console.log(
        `  ${month.padEnd(10)} ${("₹" + income.toFixed(2)).padStart(12)} ${("₹" + expense.toFixed(2)).padStart(12)} ${sColor}${("₹" + savings.toFixed(2)).padStart(12)}${reset} ${(savingsRate + "%").padStart(8)}`
      );
    });

    console.log();
  }

  printRecentTransactions(n = 10) {
    const list = this.getRecentTransactions(n);
    const bold = "\u001b[1m";
    const reset = "\u001b[0m";
    const cyan = "\u001b[36m";
    const dim = "\u001b[2m";

    console.log(`\n${bold}${cyan}  RECENT TRANSACTIONS (last ${n})${reset}`);
    console.log(`  ${"#".padEnd(5)} ${"Date".padEnd(14)} ${"Type".padEnd(9)} ${"Amount".padStart(12)} ${"Category".padEnd(14)} Description`);
    console.log(`  ${dim}${"─".repeat(76)}${reset}`);

    if (list.length === 0) {
      console.log("  No transactions yet.");
    } else {
      list.forEach((t) => {
        const color = t.type === "income" ? "\u001b[32m" : "\u001b[31m";
        const sign = t.type === "income" ? "+" : "-";
        console.log(
          `  ${String(t.id).padEnd(5)} ${t.formattedDate.padEnd(14)} ${t.type.padEnd(9)} ${color}${(sign + "₹" + t.amount.toFixed(2)).padStart(12)}${reset} ${t.category.padEnd(14)} ${t.description}`
        );
      });
    }

    console.log();
  }

  printBudgetStatus() {
    const data = this.getBudgetStatus();
    const bold = "\u001b[1m";
    const reset = "\u001b[0m";
    const cyan = "\u001b[36m";
    const dim = "\u001b[2m";

    console.log(`\n${bold}${cyan}  BUDGET STATUS${reset}`);

    if (data.length === 0) {
      console.log("  No budgets set. Use the menu to set one.\n");
      return;
    }

    data.forEach(({ category, limit, spent, remaining, pct }) => {
      const barLen = 30;
      const filled = Math.min(Math.round((pct / 100) * barLen), barLen);
      const empty = barLen - filled;

      let barColor;
      if (pct >= 100) barColor = "\u001b[31m";
      else if (pct >= 80) barColor = "\u001b[33m";
      else barColor = "\u001b[32m";

      const bar = barColor + "█".repeat(filled) + dim + "░".repeat(empty) + reset;
      const status = remaining >= 0
        ? `₹${remaining.toFixed(2)} left`
        : `\u001b[31m₹${Math.abs(remaining).toFixed(2)} over!\u001b[0m`;

      console.log(`\n  ${bold}${category.toUpperCase()}${reset}  (₹${spent.toFixed(2)} / ₹${limit.toFixed(2)})`);
      console.log(`  [${bar}] ${pct.toFixed(1)}%  —  ${status}`);
    });

    console.log();
  }

  printTopSpending(n = 5) {
    const data = this.getTopSpendingCategories(n);
    const bold = "\u001b[1m";
    const reset = "\u001b[0m";
    const cyan = "\u001b[36m";
    const red = "\u001b[31m";

    console.log(`\n${bold}${cyan}  TOP ${n} SPENDING CATEGORIES${reset}`);

    if (data.length === 0) {
      console.log("  No expenses recorded yet.\n");
      return;
    }

    const maxAmount = data[0].amount;

    data.forEach(({ category, amount }, i) => {
      const barLen = Math.round((amount / maxAmount) * 25);
      console.log(
        `  ${String(i + 1).padStart(2)}. ${category.padEnd(14)} ${red}${"█".repeat(barLen)}${reset} ₹${amount.toFixed(2)}`
      );
    });

    console.log();
  }

  // ── Full Report ───────────────────────────────────────────────

  printFullReport() {
    this.printSummary();
    this.printCategorySummary();
    this.printMonthlySummary();
    this.printBudgetStatus();
    this.printTopSpending();
    this.printRecentTransactions();
  }

  // ── Danger Zone ───────────────────────────────────────────────

  clearAll() {
    this.#transactions = [];
    this.#budgets = {};
    this.#budgetCheckers = {};
    Transaction.resetIdCounter(1);
  }
}

module.exports = FinanceTracker;
