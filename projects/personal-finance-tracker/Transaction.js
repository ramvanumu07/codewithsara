class Transaction {
  static #idCounter = 1;

  static syncIdCounterAfterLoad(transactions) {
    if (!Array.isArray(transactions)) return;
    const maxId = transactions.reduce((max, t) => Math.max(max, Number(t.id) || 0), 0);
    Transaction.#idCounter = Math.max(Transaction.#idCounter, maxId + 1);
  }

  constructor({ type, amount, category, description = "" }) {
    if (!["income", "expense"].includes(type)) {
      throw new Error(`Invalid transaction type: "${type}". Must be "income" or "expense".`);
    }
    if (typeof amount !== "number" || amount <= 0 || !Number.isFinite(amount)) {
      throw new Error(`Invalid amount: ${amount}. Must be a positive number.`);
    }
    if (!category || typeof category !== "string" || category.trim() === "") {
      throw new Error("Category is required and must be a non-empty string.");
    }

    this.id = Transaction.#idCounter++;
    this.type = type;
    this.amount = Math.round(amount * 100) / 100;
    this.category = category.trim().toLowerCase();
    this.description = typeof description === "string" ? description.trim() : String(description ?? "");
    this.date = new Date().toISOString();
  }

  toJSON() {
    const { id, type, amount, category, description, date } = this;
    return { id, type, amount, category, description, date };
  }

  toString() {
    const sign = this.type === "income" ? "+" : "-";
    const dateStr = new Date(this.date).toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const desc = this.description ? ` — ${this.description}` : "";
    return `[#${this.id}] [${dateStr}] ${sign}₹${this.amount.toFixed(2)}  ${this.category}${desc}`;
  }
}

module.exports = Transaction;
