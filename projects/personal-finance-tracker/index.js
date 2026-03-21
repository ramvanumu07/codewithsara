const readline = require("readline");
const FinanceTracker = require("./FinanceTracker");

const sleep = (ms) => new Promise((resolve) => {
  setTimeout(resolve, ms);
});

const readPipedLines = () =>
  new Promise((resolve, reject) => {
    let data = "";
    process.stdin.setEncoding("utf8");
    process.stdin.on("data", (chunk) => {
      data += chunk;
    });
    process.stdin.on("end", () => {
      resolve(data.split(/\r?\n/));
    });
    process.stdin.on("error", reject);
    process.stdin.resume();
  });

const createRlPrompt = (rl) => (question) =>
  new Promise((resolve) => {
    rl.question(question, resolve);
  });

const createBufferedPrompt = (lines) => {
  let i = 0;
  return (question) =>
    new Promise((resolve) => {
      process.stdout.write(question);
      if (i >= lines.length) {
        process.stdout.write("(end of input)\n");
        resolve(null);
        return;
      }
      const line = lines[i];
      i += 1;
      process.stdout.write(`${line}\n`);
      resolve(line);
    });
};

const parsePositiveAmount = (raw) => {
  const trimmed = String(raw ?? "").trim();
  if (trimmed === "") {
    return { ok: false, message: "Amount cannot be empty." };
  }
  const n = Number(trimmed);
  if (Number.isNaN(n)) {
    return { ok: false, message: `"${trimmed}" is not a valid number.` };
  }
  if (!Number.isFinite(n) || n <= 0) {
    return { ok: false, message: "Amount must be a positive finite number." };
  }
  return { ok: true, value: n };
};

const normalizeWhitespace = (raw) =>
  String(raw ?? "")
    .trim()
    .split(/\s+/)
    .filter((part) => part.length > 0)
    .join(" ");

const showMenu = () => {
  console.log(`
╔══════════════════════════════════════════════╗
║       💰 PERSONAL FINANCE TRACKER            ║
╠══════════════════════════════════════════════╣
║  1. Add Income                               ║
║  2. Add Expense                              ║
║  3. Set Budget                               ║
║  4. View Balance Summary                     ║
║  5. View Category Breakdown                  ║
║  6. View Monthly Summary                     ║
║  7. View Recent Transactions                 ║
║  8. View Budget Status                       ║
║  9. Search Transactions                      ║
║  0. Exit                                     ║
╚══════════════════════════════════════════════╝
`);
};

const main = async () => {
  const tracker = new FinanceTracker();
  const isTTY = process.stdin.isTTY;
  let rl = null;
  let prompt;

  if (isTTY) {
    rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    prompt = createRlPrompt(rl);

    const shutdown = () => {
      console.log("\n\n👋 Goodbye — your data is saved in data.json.\n");
      rl.close();
      process.exit(0);
    };
    rl.on("SIGINT", shutdown);
  } else {
    const lines = await readPipedLines();
    prompt = createBufferedPrompt(lines);
  }

  menu: while (true) {
    showMenu();
    const rawChoice = await prompt("➤ Select an option: ");
    if (rawChoice === null) {
      console.log("\n👋 End of input — exiting.\n");
      break menu;
    }
    const choice = normalizeWhitespace(rawChoice);

    try {
      if (choice === "1") {
        const amountRaw = await prompt("  Income amount (₹): ");
        const parsed = parsePositiveAmount(amountRaw);
        if (!parsed.ok) {
          console.log(`\n❌ ${parsed.message}\n`);
        } else {
          const catRaw = await prompt("  Category: ");
          const category = normalizeWhitespace(catRaw);
          if (category === "") {
            console.log("\n❌ Category is required.\n");
          } else {
            const descRaw = await prompt("  Description (optional): ");
            const description = String(descRaw ?? "").trim();
            await tracker.addIncome(parsed.value, category, description);
          }
        }
      } else if (choice === "2") {
        const amountRaw = await prompt("  Expense amount (₹): ");
        const parsed = parsePositiveAmount(amountRaw);
        if (!parsed.ok) {
          console.log(`\n❌ ${parsed.message}\n`);
        } else {
          const catRaw = await prompt("  Category: ");
          const category = normalizeWhitespace(catRaw);
          if (category === "") {
            console.log("\n❌ Category is required.\n");
          } else {
            const descRaw = await prompt("  Description (optional): ");
            const description = String(descRaw ?? "").trim();
            await tracker.addExpense(parsed.value, category, description);
          }
        }
      } else if (choice === "3") {
        const catRaw = await prompt("  Budget category: ");
        const category = normalizeWhitespace(catRaw);
        if (category === "") {
          console.log("\n❌ Category is required.\n");
        } else {
          const limitRaw = await prompt("  Monthly limit (₹): ");
          const lim = parsePositiveAmount(limitRaw);
          if (!lim.ok) {
            console.log(`\n❌ ${lim.message}\n`);
          } else {
            await tracker.setBudget(category, lim.value);
          }
        }
      } else if (choice === "4") {
        tracker.printSummary();
      } else if (choice === "5") {
        tracker.printCategorySummary();
      } else if (choice === "6") {
        tracker.printMonthlySummary();
      } else if (choice === "7") {
        const nRaw = await prompt("  How many to show? (default 5): ");
        const nStr = String(nRaw ?? "").trim();
        const n = nStr === "" ? 5 : Number(nStr);
        if (!Number.isInteger(n) || n < 1) {
          console.log("\n❌ Enter a whole number ≥ 1, or leave blank for 5.\n");
        } else {
          tracker.printRecentTransactions(n);
        }
      } else if (choice === "8") {
        tracker.printBudgetStatus();
      } else if (choice === "9") {
        const pat = await prompt("  Regex pattern (description/category): ");
        const pattern = String(pat ?? "").trim();
        if (pattern === "") {
          console.log("\n❌ Pattern cannot be empty.\n");
        } else {
          try {
            tracker.printSearchResults(pattern);
          } catch (err) {
            console.log(`\n❌ ${err.message}\n`);
          }
        }
      } else if (choice === "0") {
        console.log("\n✅ Session ended.\n");
        if (rl) rl.close();
        break menu;
      } else if (choice === "") {
        console.log("\n⚠️  Please enter a number from the menu.\n");
      } else {
        console.log(`\n❌ Unknown option: "${choice}"\n`);
      }
    } catch (err) {
      console.log(`\n❌ ${err.message}\n`);
    }

    if (isTTY) {
      await sleep(750);
    }
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
