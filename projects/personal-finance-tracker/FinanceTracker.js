const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");
const Transaction = require("./Transaction");

const DATA_FILE = path.join(__dirname, "data.json");

class FinanceTracker {
  #transactions = [];
  #budgets = {};
  #checkBudgetWarning;

  constructor() {
    this.#load();
    Transaction.syncIdCounterAfterLoad(this.#transactions);
    const getTransactions = () => this.#transactions;
    const getBudgets = () => this.#budgets;
    this.#checkBudgetWarning = (category) => {
      const key = category.trim().toLowerCase();
      const limit = getBudgets()[key];
      if (limit == null) return;

      const spent = getTransactions()
        .filter((t) => t.type === "expense" && t.category === key)
        .reduce((sum, t) => sum + t.amount, 0);

      const pct = Math.min(100, Math.max(0, (spent / limit) * 100));
      if (pct >= 100) {
        console.warn(
          `🚨 OVER BUDGET! "${key}" spent ₹${spent.toFixed(2)} / ₹${limit.toFixed(2)} (${pct.toFixed(0)}%)`
        );
      } else if (pct >= 80) {
        console.warn(
          `⚠️  Approaching budget for "${key}": ₹${spent.toFixed(2)} / ₹${limit.toFixed(2)} (${pct.toFixed(0)}%)`
        );
      }
    };
  }

  #load() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, "utf-8");
        const { transactions = [], budgets = {} } = JSON.parse(raw);
        this.#transactions = Array.isArray(transactions) ? transactions : [];
        this.#budgets = budgets && typeof budgets === "object" ? budgets : {};
      }
    } catch (err) {
      console.error("⚠ Could not load data — starting fresh.", err.message);
      this.#transactions = [];
      this.#budgets = {};
    }
  }

  async #save() {
    const payload = JSON.stringify(
      { transactions: this.#transactions, budgets: this.#budgets },
      null,
      2
    );
    await fsp.writeFile(DATA_FILE, payload, "utf-8");
  }

  async addIncome(amount, category, description = "") {
    const txn = new Transaction({ type: "income", amount, category, description });
    this.#transactions.push(txn.toJSON());
    await this.#save();
    console.log(`\n✅ Income recorded:\n   ${txn}\n`);
    return txn;
  }

  async addExpense(amount, category, description = "") {
    const txn = new Transaction({ type: "expense", amount, category, description });
    this.#transactions.push(txn.toJSON());
    await this.#save();
    this.#checkBudgetWarning(category);
    console.log(`\n✅ Expense recorded:\n   ${txn}\n`);
    return txn;
  }

  async setBudget(category, limit) {
    if (typeof limit !== "number" || !Number.isFinite(limit) || limit <= 0) {
      throw new Error("Budget limit must be a positive finite number.");
    }
    if (!category || String(category).trim() === "") {
      throw new Error("Category is required.");
    }
    const key = String(category).trim().toLowerCase();
    this.#budgets[key] = Math.round(limit * 100) / 100;
    await this.#save();
    console.log(`\n📌 Budget set: ${key} → ₹${limit.toFixed(2)}\n`);
  }

  getBalance() {
    const income = this.#transactions
      .filter((t) => t.type === "income")
      .reduce((s, t) => s + t.amount, 0);

    const expenses = this.#transactions
      .filter((t) => t.type === "expense")
      .reduce((s, t) => s + t.amount, 0);

    const savings = income - expenses;
    const hasIncome = this.#transactions.some((t) => t.type === "income");
    const hasExpense = this.#transactions.some((t) => t.type === "expense");
    const onlyIncome =
      this.#transactions.length > 0 && this.#transactions.every((t) => t.type === "income");

    return { income, expenses, savings, hasIncome, hasExpense, onlyIncome };
  }

  getCategorySummary() {
    return this.#transactions.reduce((acc, { type, category, amount }) => {
      if (!acc[category]) acc[category] = { income: 0, expense: 0 };
      acc[category][type] += amount;
      return acc;
    }, {});
  }

  getMonthlySummary() {
    return this.#transactions.reduce((acc, { type, amount, date }) => {
      const month = typeof date === "string" ? date.slice(0, 7) : "";
      if (!month) return acc;
      if (!acc[month]) acc[month] = { income: 0, expense: 0 };
      acc[month][type] += amount;
      return acc;
    }, {});
  }

  getRecentTransactions(n = 5) {
    const count = Math.max(0, Math.floor(Number(n)) || 0);
    return [...this.#transactions].reverse().slice(0, count);
  }

  searchTransactions(pattern) {
    let re;
    try {
      re = new RegExp(pattern, "i");
    } catch (e) {
      throw new Error(`Invalid regex: ${e.message}`);
    }
    const matches = this.#transactions.filter(
      (t) => re.test(t.category) || re.test(t.description || "")
    );
    const firstIndex = this.#transactions.findIndex(
      (t) => re.test(t.category) || re.test(t.description || "")
    );
    const first = this.#transactions.find(
      (t) => re.test(t.category) || re.test(t.description || "")
    );
    return { matches, first, firstIndex, re };
  }

  printSummary() {
    const { income, expenses, savings, hasIncome, hasExpense } = this.getBalance();
    const status = savings >= 0 ? "🟢" : "🔴";
    const note =
      !hasIncome && !hasExpense
        ? "No transactions yet."
        : !hasIncome
          ? "No income recorded."
          : !hasExpense
            ? "No expenses yet."
            : "";

    console.log("\n╔══════════════════════════════════════════════╗");
    console.log("║      💰 PERSONAL FINANCE SUMMARY             ║");
    console.log("╠══════════════════════════════════════════════╣");
    console.log(`║  Total Income   :  ₹${income.toFixed(2).padStart(14)}      ║`);
    console.log(`║  Total Expenses :  ₹${expenses.toFixed(2).padStart(14)}      ║`);
    console.log(`║  Net Balance    :  ₹${savings.toFixed(2).padStart(14)}  ${status}   ║`);
    if (note) {
      console.log("╠══════════════════════════════════════════════╣");
      console.log(`║  ${note.padEnd(44)}║`);
    }
    console.log("╚══════════════════════════════════════════════╝\n");
  }

  printCategorySummary() {
    const summary = this.getCategorySummary();
    const entries = Object.entries(summary).sort(([, a], [, b]) => {
      const netA = a.income - a.expense;
      const netB = b.income - b.expense;
      return netB - netA;
    });

    console.log("\n╔══════════════════════════════════════════════════════════╗");
    console.log("║           📊 CATEGORY BREAKDOWN                          ║");
    console.log("╠══════════════════════════════════════════════════════════╣");
    console.log(
      `║ ${"Category".padEnd(14)} ${"Income".padStart(12)} ${"Expense".padStart(12)} ${"Net".padStart(12)} ║`
    );
    console.log("╠══════════════════════════════════════════════════════════╣");

    if (entries.length === 0) {
      console.log("║  (no data)                                               ║");
    } else {
      entries.forEach(([cat, { income, expense }]) => {
        const net = income - expense;
        const line = `${cat.padEnd(14)} ${`₹${income.toFixed(2)}`.padStart(12)} ${`₹${expense.toFixed(2)}`.padStart(12)} ${`₹${net.toFixed(2)}`.padStart(12)}`;
        console.log(`║ ${line} ║`);
      });
    }
    console.log("╚══════════════════════════════════════════════════════════╝\n");
  }

  printMonthlySummary() {
    const summary = this.getMonthlySummary();
    const rows = Object.entries(summary)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, { income, expense }]) => {
        const sav = income - expense;
        return { month, income, expense, sav };
      });

    console.log("\n╔══════════════════════════════════════════════════════════╗");
    console.log("║           📅 MONTHLY SUMMARY                             ║");
    console.log("╠══════════════════════════════════════════════════════════╣");
    console.log(
      `║ ${"Month".padEnd(10)} ${"Income".padStart(12)} ${"Expense".padStart(12)} ${"Savings".padStart(12)} ║`
    );
    console.log("╠══════════════════════════════════════════════════════════╣");

    if (rows.length === 0) {
      console.log("║  (no data)                                               ║");
    } else {
      rows.forEach(({ month, income, expense, sav }) => {
        const line = `${month.padEnd(10)} ${`₹${income.toFixed(2)}`.padStart(12)} ${`₹${expense.toFixed(2)}`.padStart(12)} ${`₹${sav.toFixed(2)}`.padStart(12)}`;
        console.log(`║ ${line} ║`);
      });
    }
    console.log("╚══════════════════════════════════════════════════════════╝\n");
  }

  printRecentTransactions(n = 5) {
    const recent = this.getRecentTransactions(n);
    console.log("\n╔══════════════════════════════════════════════════════════╗");
    console.log("║           📋 RECENT TRANSACTIONS                         ║");
    const recentMeta = `  (newest first · limit ${n})`;
    console.log(`║${recentMeta.padEnd(58)}║`);
    console.log("╠══════════════════════════════════════════════════════════╣");

    if (recent.length === 0) {
      console.log("║  No transactions yet.                                  ║");
    } else {
      recent.forEach(({ type, amount, category, description, date, id }) => {
        const sign = type === "income" ? "+" : "-";
        const dateStr = new Date(date).toLocaleDateString("en-IN", { month: "short", day: "numeric" });
        const desc = description ? ` — ${description}` : "";
        const row = `#${id} [${dateStr}] ${sign}₹${amount.toFixed(2)}  ${category}${desc}`;
        const padded = row.length > 56 ? `${row.slice(0, 53)}...` : row.padEnd(56);
        console.log(`║  ${padded}  ║`);
      });
    }
    console.log("╚══════════════════════════════════════════════════════════╝\n");
  }

  printBudgetStatus() {
    const cats = Object.keys(this.#budgets);
    console.log("\n╔══════════════════════════════════════════════════════════════════╗");
    console.log("║                    📊 BUDGET STATUS                              ║");
    console.log("╠══════════════════════════════════════════════════════════════════╣");

    if (cats.length === 0) {
      console.log("║  No budgets set. Use menu option 3.                              ║");
      console.log("╚══════════════════════════════════════════════════════════════════╝\n");
      return;
    }

    console.log(
      `║ ${"Category".padEnd(12)} ${"Spent".padStart(10)} ${"Limit".padStart(10)} ${"%".padStart(6)} ${"Left".padStart(10)}  ║`
    );
    console.log("╠══════════════════════════════════════════════════════════════════╣");

    cats.forEach((cat) => {
      const limit = this.#budgets[cat];
      const spent = this.#transactions
        .filter((t) => t.type === "expense" && t.category === cat)
        .reduce((s, t) => s + t.amount, 0);
      const remaining = limit - spent;
      const pctUsed = limit > 0 ? Math.min(999, (spent / limit) * 100) : 0;
      const barLen = Math.round(Math.min(100, pctUsed) / 10);
      const bar = "█".repeat(barLen) + "░".repeat(Math.max(0, 10 - barLen));
      const flag = remaining < 0 ? "🚨" : remaining < limit * 0.2 ? "⚠️ " : "✅";
      const line = `${cat.padEnd(12)} ${`₹${spent.toFixed(0)}`.padStart(10)} ${`₹${limit.toFixed(0)}`.padStart(10)} ${`${pctUsed.toFixed(0)}%`.padStart(6)} ${`₹${remaining.toFixed(0)}`.padStart(10)}`;
      console.log(`║ ${line} ${flag} ║`);
      const barRow = `   [${bar}] ${pctUsed.toFixed(1)}% of limit`;
      console.log(`║${barRow.padEnd(64)}║`);
    });

    console.log("╚══════════════════════════════════════════════════════════════════╝\n");
  }

  printSearchResults(pattern) {
    const { matches, first, firstIndex, re } = this.searchTransactions(pattern);
    console.log("\n╔══════════════════════════════════════════════════════════╗");
    console.log("║           🔎 SEARCH RESULTS                            ║");
    console.log("╠══════════════════════════════════════════════════════════╣");
    const patLine = `  Pattern: /${re.source}/i`;
    console.log(`║${patLine.padEnd(58)}║`);

    if (firstIndex >= 0 && first) {
      const hit = `  First: #${first.id} @ index ${firstIndex} (${first.category})`;
      console.log(`║${hit.slice(0, 58).padEnd(58)}║`);
    }
    if (matches.length === 0) {
      console.log("║  No matches.                                             ║");
    } else {
      const lines = matches.map((t, i) => {
        const { id, type, amount, category, description } = t;
        const bits = [String(id), type, `₹${amount}`, category, description || "(no desc)"];
        return `${i + 1}. ${bits.join(" · ")}`;
      });
      console.log("╠══════════════════════════════════════════════════════════╣");
      lines.forEach((line) => {
        const row = line.length > 58 ? `${line.slice(0, 55)}...` : line;
        console.log(`║  ${row.padEnd(56)}  ║`);
      });
    }
    console.log("╚══════════════════════════════════════════════════════════╝\n");
  }
}

module.exports = FinanceTracker;
