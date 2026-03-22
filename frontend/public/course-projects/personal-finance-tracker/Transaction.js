// ── Topics: Classes, Objects, Date/Time, Error Handling, Strings,
//    Type Coercion, Conditionals, Math Utilities, Destructuring ──

let nextId = 1;

const VALID_TYPES = ["income", "expense"];

class Transaction {
  #id;
  #type;
  #amount;
  #category;
  #description;
  #date;

  constructor({ type, amount, category, description = "", _restore = null }) {
    if (_restore) {
      this.#id = _restore.id;
      this.#type = _restore.type;
      this.#amount = _restore.amount;
      this.#category = _restore.category;
      this.#description = _restore.description || "";
      this.#date = _restore.date;
      return;
    }

    this.#validate(type, amount, category);

    this.#id = nextId++;
    this.#type = type.trim().toLowerCase();
    this.#amount = Math.round(Number(amount) * 100) / 100;
    this.#category = category.trim().toLowerCase();
    this.#description = description.trim();
    this.#date = new Date().toISOString();
  }

  #validate(type, amount, category) {
    if (!type || !VALID_TYPES.includes(type.trim().toLowerCase())) {
      throw new Error(`Type must be one of: ${VALID_TYPES.join(", ")}`);
    }
    if (amount === undefined || amount === null || isNaN(Number(amount)) || Number(amount) <= 0) {
      throw new Error("Amount must be a positive number.");
    }
    if (!category || category.trim().length === 0) {
      throw new Error("Category cannot be empty.");
    }
  }

  get id() { return this.#id; }
  get type() { return this.#type; }
  get amount() { return this.#amount; }
  get category() { return this.#category; }
  get description() { return this.#description; }
  get date() { return this.#date; }

  get formattedDate() {
    const d = new Date(this.#date);
    return d.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  get monthKey() {
    const d = new Date(this.#date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    return `${year}-${month}`;
  }

  toJSON() {
    return {
      id: this.#id,
      type: this.#type,
      amount: this.#amount,
      category: this.#category,
      description: this.#description,
      date: this.#date,
    };
  }

  toString() {
    const sign = this.#type === "income" ? "+" : "-";
    const symbol = this.#type === "income" ? "\u001b[32m" : "\u001b[31m";
    const reset = "\u001b[0m";
    return `${symbol}${sign}₹${this.#amount.toFixed(2)}${reset}  ${this.#category.padEnd(14)} ${this.#description}`;
  }

  static fromJSON(obj) {
    return new Transaction({ _restore: obj });
  }

  static resetIdCounter(startFrom) {
    nextId = startFrom;
  }
}

module.exports = { Transaction, VALID_TYPES };
