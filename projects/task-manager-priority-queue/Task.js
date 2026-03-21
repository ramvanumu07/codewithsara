// ── Topics: Classes, Inheritance, Objects, Date/Time, Error Handling,
//    Strings, Type Coercion, Conditionals, Math, Destructuring,
//    Variables & Constants, Undefined/Null, Operators ──

let nextId = 1;

const PRIORITIES = { critical: 4, high: 3, medium: 2, low: 1 };
const PRIORITY_NAMES = Object.keys(PRIORITIES);
const STATUSES = ["pending", "in-progress", "completed", "cancelled"];

const PRIORITY_COLORS = {
  critical: "\u001b[31m",
  high: "\u001b[33m",
  medium: "\u001b[36m",
  low: "\u001b[2m",
};

class Task {
  #id;
  #title;
  #description;
  #priority;
  #status;
  #deadline;
  #createdAt;
  #completedAt;
  #tags;

  constructor({ title, description = "", priority = "medium", deadline = null, tags = [], _restore = null }) {
    if (_restore) {
      this.#id = _restore.id;
      this.#title = _restore.title;
      this.#description = _restore.description;
      this.#priority = _restore.priority;
      this.#status = _restore.status;
      this.#deadline = _restore.deadline;
      this.#createdAt = _restore.createdAt;
      this.#completedAt = _restore.completedAt || null;
      this.#tags = _restore.tags || [];
      return;
    }

    this.#validateTitle(title);
    this.#validatePriority(priority);
    if (deadline) this.#validateDeadline(deadline);

    this.#id = nextId++;
    this.#title = title.trim();
    this.#description = description.trim();
    this.#priority = priority.trim().toLowerCase();
    this.#status = "pending";
    this.#deadline = deadline;
    this.#createdAt = new Date().toISOString();
    this.#completedAt = null;
    this.#tags = tags.map((t) => t.trim().toLowerCase()).filter((t) => t.length > 0);
  }

  // ── Validation ──────────────────────────────────────────────

  #validateTitle(title) {
    if (!title || typeof title !== "string" || title.trim().length === 0) {
      throw new Error("Task title cannot be empty.");
    }
    if (title.trim().length > 80) {
      throw new Error("Task title must be 80 characters or less.");
    }
  }

  #validatePriority(priority) {
    const p = priority.trim().toLowerCase();
    if (!PRIORITY_NAMES.includes(p)) {
      throw new Error(`Priority must be one of: ${PRIORITY_NAMES.join(", ")}`);
    }
  }

  #validateDeadline(deadline) {
    const d = new Date(deadline);
    if (isNaN(d.getTime())) {
      throw new Error("Invalid deadline date format. Use YYYY-MM-DD.");
    }
  }

  // ── Getters ─────────────────────────────────────────────────

  get id() { return this.#id; }
  get title() { return this.#title; }
  get description() { return this.#description; }
  get priority() { return this.#priority; }
  get status() { return this.#status; }
  get deadline() { return this.#deadline; }
  get createdAt() { return this.#createdAt; }
  get completedAt() { return this.#completedAt; }
  get tags() { return [...this.#tags]; }

  get priorityValue() {
    return PRIORITIES[this.#priority] ?? 0;
  }

  get isOverdue() {
    if (!this.#deadline) return false;
    if (this.#status === "completed" || this.#status === "cancelled") return false;
    return new Date(this.#deadline).getTime() < Date.now();
  }

  get daysUntilDeadline() {
    if (!this.#deadline) return null;
    const diff = new Date(this.#deadline).getTime() - Date.now();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  }

  get formattedDeadline() {
    if (!this.#deadline) return "No deadline";
    const d = new Date(this.#deadline);
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  }

  get priorityColor() {
    return PRIORITY_COLORS[this.#priority] || "";
  }

  get age() {
    const diff = Date.now() - new Date(this.#createdAt).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "today";
    if (days === 1) return "1 day ago";
    return `${days} days ago`;
  }

  // ── State transitions ─────────────────────────────────────

  markInProgress() {
    if (this.#status !== "pending") {
      throw new Error(`Cannot start task #${this.#id}: status is "${this.#status}" (must be "pending").`);
    }
    this.#status = "in-progress";
  }

  markComplete() {
    if (this.#status === "completed") {
      throw new Error(`Task #${this.#id} is already completed.`);
    }
    if (this.#status === "cancelled") {
      throw new Error(`Cannot complete a cancelled task.`);
    }
    this.#status = "completed";
    this.#completedAt = new Date().toISOString();
  }

  cancel() {
    if (this.#status === "completed") {
      throw new Error(`Cannot cancel a completed task.`);
    }
    if (this.#status === "cancelled") {
      throw new Error(`Task #${this.#id} is already cancelled.`);
    }
    this.#status = "cancelled";
  }

  reopen() {
    if (this.#status === "pending") {
      throw new Error(`Task #${this.#id} is already pending.`);
    }
    this.#status = "pending";
    this.#completedAt = null;
  }

  // ── Edit ──────────────────────────────────────────────────

  updateTitle(newTitle) {
    this.#validateTitle(newTitle);
    this.#title = newTitle.trim();
  }

  updatePriority(newPriority) {
    this.#validatePriority(newPriority);
    this.#priority = newPriority.trim().toLowerCase();
  }

  updateDeadline(newDeadline) {
    if (newDeadline === null || newDeadline === "") {
      this.#deadline = null;
      return;
    }
    this.#validateDeadline(newDeadline);
    this.#deadline = newDeadline;
  }

  addTag(tag) {
    const cleaned = tag.trim().toLowerCase();
    if (cleaned.length === 0) throw new Error("Tag cannot be empty.");
    if (!this.#tags.includes(cleaned)) this.#tags.push(cleaned);
  }

  removeTag(tag) {
    const cleaned = tag.trim().toLowerCase();
    const idx = this.#tags.indexOf(cleaned);
    if (idx === -1) throw new Error(`Tag "${cleaned}" not found.`);
    this.#tags.splice(idx, 1);
  }

  // ── Serialization ─────────────────────────────────────────

  toJSON() {
    return {
      id: this.#id,
      title: this.#title,
      description: this.#description,
      priority: this.#priority,
      status: this.#status,
      deadline: this.#deadline,
      createdAt: this.#createdAt,
      completedAt: this.#completedAt,
      tags: [...this.#tags],
    };
  }

  static fromJSON(obj) {
    return new Task({ _restore: obj });
  }

  static resetIdCounter(startFrom) {
    nextId = startFrom;
  }
}

module.exports = { Task, PRIORITIES, PRIORITY_NAMES, STATUSES, PRIORITY_COLORS };
