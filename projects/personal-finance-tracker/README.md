# Personal Finance Tracker (Interactive CLI)

A **terminal-based** personal finance app built with **Node.js** only (no npm dependencies). It uses **`readline`** for live prompts when stdin is a TTY, and supports **piped input** for scripts by buffering all lines from stdin first, then replaying them as answers.

## Run

From this folder:

```bash
node index.js
```

Use the number keys to choose menu actions. Data is stored in `data.json` and is saved after every change.

**Tip:** Run in a real terminal (TTY). If you pipe a file into `node index.js`, the program reads the entire file as a list of lines and uses them in order as responses—useful for demos or automated checks.

## Features

| # | Feature |
|---|--------|
| 1 | Add **income** (amount, category, optional description) |
| 2 | Add **expense** (same fields; **budget warnings** at 80% and 100% of category limit) |
| 3 | **Set monthly budget** per category |
| 4 | **Balance summary** (total income, expenses, net) |
| 5 | **Category breakdown** (income vs expense per category) |
| 6 | **Monthly summary** (totals grouped by `YYYY-MM` from ISO dates) |
| 7 | **Recent transactions** (newest first; you choose how many) |
| 8 | **Budget status** with spent / limit / % used and a simple bar |
| 9 | **Search** descriptions and categories with a **case-insensitive regex** |
| 0 | Exit (Ctrl+C also exits gracefully when using a TTY) |

## File structure

```
personal-finance-tracker/
├── index.js           # Interactive CLI: menu, validation, readline / piped input
├── FinanceTracker.js  # Persistence, budgets, analytics, formatted reports
├── Transaction.js     # Transaction model (validation, id, toJSON, toString)
├── data.json          # Saved transactions + budgets (auto-updated)
├── package.json       # "type": "commonjs"
└── README.md
```

## JavaScript topics covered

| Topic | Where it's used |
|--------|-----------------|
| **ConsoleLog** | `index.js` (`main`, messages), `FinanceTracker.js` (reports, warnings), `Transaction` usage via `console.log` of instances |
| **VariablesAndConstants** | `const` / `let` throughout (e.g. `DATA_FILE`, `payload`, `choice`) |
| **NumbersAndBasicArithmetic** | Amounts, `income - expenses`, `%` for budget use, rounding in `Transaction` |
| **BuiltInMathUtilities** | `Math.max`, `Math.min`, `Math.round`, `Number.isFinite`, `Number.isNaN`, `Number.isInteger` |
| **UndefinedNullBasics** | Optional description; `limit == null`; `??` / `||` for defaults |
| **StringsAndBasicOperations** | `trim`, `toLowerCase`, `toFixed`, `padStart`, `padEnd`, `localeCompare` |
| **TypeCoercion** | `Number(trimmed)`, `String(raw)`, template literals with numbers |
| **OperatorsComparisonAndLogical** | Logical and / or, `===`, `!==`, ternary in `printSummary` note |
| **Conditionals** | `if` / `else` in CLI branches, validation, budget warnings |
| **DateTime** | `new Date().toISOString()` in `Transaction.js`; `toLocaleDateString` in reports |
| **Loops** | `menu: while (true)` in `index.js`; `forEach` on arrays in print helpers |
| **LoopControl** | `break menu` (labeled `break`) to exit the CLI loop |
| **Arrays** | `#transactions` list; `Object.entries` / `Object.keys` over derived data |
| **Objects** | `#budgets`, per-category summary objects, `getBalance()` return shape |
| **Destructuring** | `const { transactions, budgets } = JSON.parse(...)`; `toJSON` in `Transaction.js`; parameters in `reduce` callbacks |
| **SpreadRest** | `[...this.#transactions].reverse().slice(...)`; object spread in persistence payload |
| **Json** | `JSON.parse` / `JSON.stringify` in `FinanceTracker.js#load` / `#save`; `toJSON()` on `Transaction` |
| **Functions** | `parsePositiveAmount`, `normalizeWhitespace`, `showMenu`, `readPipedLines`, etc. |
| **ArrowFunctions** | Callbacks in `filter` / `map` / `reduce` / `forEach`, `createRlPrompt`, `sleep` |
| **Closures** | `createRlPrompt(rl)`, `createBufferedPrompt(lines)`, `ask` closing over `prompt`; `#checkBudgetWarning` closing over `getTransactions` / `getBudgets` in `FinanceTracker` constructor |
| **Foreach** | `printCategorySummary`, `printMonthlySummary`, `printRecentTransactions`, `printBudgetStatus` |
| **Map** | `rows = Object.entries(...).map(...)` in `printMonthlySummary` |
| **Filter** | Income/expense splits; `searchTransactions` matches |
| **FindFindindex** | `find` / `findIndex` in `searchTransactions` |
| **SomeEvery** | `hasIncome` / `hasExpense` / `onlyIncome` via `.some` / `.every` in `getBalance` |
| **Reduce** | `getCategorySummary`, `getMonthlySummary`, spent totals, `syncIdCounterAfterLoad` |
| **StringManipulations** | `slice` on ISO month keys; truncation with `slice` in tables |
| **SplitJoin** | `normalizeWhitespace` (`split(/\s+/)` + `join(" ")`); `readPipedLines` splits on `/\r?\n/` |
| **Regex** | User search pattern via `new RegExp(pattern, "i")` in `searchTransactions` |
| **ArrayAdvancedPatterns** | Chains like `filter` → `reduce`; spread + `reverse` + `slice` for recent items |
| **ErrorHandling** | `try` / `catch` in `#load`, menu actions, `searchTransactions` / CLI search; custom `Error` messages in `Transaction` / `setBudget` |
| **ClassesBasics** | `Transaction`, `FinanceTracker` with private fields `#...` |
| **Modules** | CommonJS `require` / `module.exports` across three `.js` files |
| **AsyncBasics** | Non-blocking file write path; async `main` |
| **Promises** | `new Promise` in `createRlPrompt`, `readPipedLines`, `#save` via `fsp.writeFile` |
| **AsyncAwait** | `main`, `addIncome` / `addExpense` / `setBudget` awaiting `#save`; `await ask(...)` in the menu |

## Requirements

- **Node.js** (recent LTS recommended; private class fields and `static #` require a modern runtime).
