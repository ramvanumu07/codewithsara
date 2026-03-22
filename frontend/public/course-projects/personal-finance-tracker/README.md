# Personal Finance Tracker

An interactive CLI personal finance manager built entirely in **pure JavaScript**. Add income and expenses in real-time, set category budgets with visual alerts, search transactions with regex, and get detailed financial reports — all from the terminal.

## Run

```bash
node index.js
```

No external dependencies required — uses only Node.js built-in modules.

## Features

- **Interactive CLI** — menu-driven interface with real-time user input via `readline`
- **Add Income & Expenses** — each transaction is categorized, described, and timestamped
- **Budget Manager** — set spending limits per category; get warnings at 80% and alerts when over budget
- **Visual Budget Bars** — colored progress bars show budget consumption at a glance
- **Financial Report** — total income, expenses, net balance, savings rate, category breakdown, monthly trends, and top spending — all in one view
- **Search** — find transactions by category or description using regex patterns
- **Delete with Confirmation** — safely remove transactions with a confirmation prompt
- **Auto-Save** — every change is persisted to `data.json` automatically
- **Data Persistence** — survives restarts; loads previous session on launch
- **Error Handling** — validates all inputs with helpful error messages
- **Colored Output** — ANSI-colored terminal UI for clarity and readability

## JS Topics Covered

| # | Topic | Where It's Used |
|---|---|---|
| 1 | **Console.log** | All report printing and user feedback |
| 2 | **Variables & Constants** | `const`/`let` throughout; ANSI color constants |
| 3 | **Numbers & Arithmetic** | Balance calculation, percentage math, rounding |
| 4 | **Math Utilities** | `Math.round()`, `Math.max()`, `Math.min()`, `Math.abs()` |
| 5 | **Undefined/Null** | Optional description defaults, null checks in filters |
| 6 | **Strings & Operations** | Template literals, ANSI codes, string concatenation |
| 7 | **Type Coercion** | `Number(amount)` from readline string input, truthy checks |
| 8 | **Operators** | Comparison, logical AND/OR, ternary, nullish patterns |
| 9 | **Conditionals** | `if/else`, `switch` for menu routing, validation guards |
| 10 | **Date/Time** | `new Date()`, `toISOString()`, `toLocaleDateString()`, month keys |
| 11 | **Loops** | `while` main loop, `forEach` iterations |
| 12 | **Loop Control** | `break` in switch cases, early returns in handlers |
| 13 | **Nested Loops** | Budget checker iterating categories within transaction loops |
| 14 | **Arrays** | Transaction storage, `push()`, `splice()`, `reverse()`, `slice()` |
| 15 | **Objects** | Summary objects, budget maps, category grouping |
| 16 | **Destructuring** | `const { transaction, alerts } = ...`, parameter destructuring |
| 17 | **Spread/Rest** | `[...this.#transactions]`, `{ ...budgets }`, `{ ...data }` |
| 18 | **JSON** | `JSON.parse()`, `JSON.stringify()`, file persistence |
| 19 | **Functions** | Handler functions, utility functions, helper functions |
| 20 | **Arrow Functions** | All callbacks, `ask()`, `autoSave()`, sort comparators |
| 21 | **Recursion** | Menu loop pattern (self-calling async flow) |
| 22 | **Closures** | `createBudgetChecker()` captures `warned80`/`warned100` state |
| 23 | **forEach** | Iterating transactions, categories, budget statuses |
| 24 | **map** | `transactions.map(t => t.toJSON())`, `Transaction.fromJSON` mapping |
| 25 | **filter** | Filter by type, category, date range, search results |
| 26 | **find / findIndex** | `findIndex()` for delete, `find()` in search |
| 27 | **some / every** | Budget threshold checks, validation patterns |
| 28 | **reduce** | Totals (income, expenses), max ID calculation, category sums |
| 29 | **String Manipulations** | `padEnd()`, `padStart()`, `toFixed()`, `toUpperCase()`, `trim()` |
| 30 | **Split / Join** | Month key construction, `VALID_TYPES.join()` |
| 31 | **Substring / Slice** | `slice(0, n)` for recent transactions, string truncation |
| 32 | **String Searching** | `includes()`, `test()` for regex search |
| 33 | **Regex** | `new RegExp(query, "i")` for transaction search |
| 34 | **Array Advanced Patterns** | Chained `.filter().reduce()`, `.map().sort().slice()` pipelines |
| 35 | **Error Handling** | `try/catch` everywhere, custom validation errors, file I/O errors |
| 36 | **Classes Basics** | `Transaction`, `FinanceTracker` with private `#` fields and getters |
| 37 | **Classes Inheritance** | `static` methods (`fromJSON`, `resetIdCounter`), prototype usage |
| 38 | **Modules** | `require`/`module.exports` across 3 files |
| 39 | **Async Basics** | Callback-based `fs.writeFile`, event-driven readline |
| 40 | **Promises** | `new Promise()` wrapping `fs.writeFile`, `ask()` wrapper |
| 41 | **Async/Await** | `async main()`, `await ask()`, `await tracker.save()` |

## File Structure

```
personal-finance-tracker/
├── index.js             # Interactive CLI (readline menus + async handlers)
├── FinanceTracker.js    # Core engine (CRUD, budgets, queries, reports)
├── Transaction.js       # Transaction model with validation
├── data.json            # Auto-generated persistent data store
├── package.json
└── README.md
```

## Sample Interaction

```
  +========================================================+
  |                                                        |
  |    PERSONAL FINANCE TRACKER                            |
  |    Track income, expenses & budgets from terminal      |
  |                                                        |
  +========================================================+

  +----------------------------------+
  |         MAIN MENU                |
  +----------------------------------+
  |   1.  Add Income                 |
  |   2.  Add Expense                |
  |   3.  View Report                |
  |   4.  Recent Transactions        |
  |   5.  Budget Manager             |
  |   6.  Search Transactions        |
  |   7.  Delete Transaction         |
  |   0.  Save & Exit                |
  +----------------------------------+

  Enter your choice (0-7): 2

  -- ADD EXPENSE --------------------

  Amount: 2500
  Category: food
  Description: Weekly groceries

  Expense added: -2500.00 [food]
  Warning: Approaching limit! Spent 4800.00 of 5000.00 (96.0%)
  [saved]
```
