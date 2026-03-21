// ── Topics: Classes, Inheritance, Closures, Async/Await, Promises,
//    JSON, Arrays, Objects, Destructuring, Spread/Rest, Map, Filter,
//    Reduce, Find/FindIndex, Some/Every, forEach, Arrow Functions,
//    Functions, Loops, Loop Control, Nested Loops, Conditionals,
//    Operators, Regex, String Manipulation, Split/Join, Substring/Slice,
//    String Searching, Error Handling, Numbers, Math, Undefined/Null,
//    Type Coercion, Date/Time, Modules, Async Basics ──

const fs = require("fs");
const path = require("path");
const { Task, PRIORITIES, PRIORITY_NAMES, STATUSES } = require("./Task");
const PriorityQueue = require("./PriorityQueue");

const DATA_FILE = path.join(__dirname, "tasks.json");

const BOLD = "\u001b[1m";
const DIM = "\u001b[2m";
const RESET = "\u001b[0m";
const CYAN = "\u001b[36m";
const GREEN = "\u001b[32m";
const RED = "\u001b[31m";
const YELLOW = "\u001b[33m";
const MAGENTA = "\u001b[35m";

// ── Undo history (Closures) ────────────────────────────────────

const createUndoStack = (maxSize = 20) => {
  const stack = [];

  return {
    push(action) {
      stack.push(action);
      if (stack.length > maxSize) stack.shift();
    },
    pop() {
      return stack.length > 0 ? stack.pop() : null;
    },
    get length() { return stack.length; },
    clear() { stack.length = 0; },
  };
};

class TaskManager {
  #tasks = new Map();
  #queue = new PriorityQueue();
  #undo = createUndoStack();

  constructor() {
    this.#loadState();
  }

  // ── Persistence (Promises + Async/Await) ──────────────────

  #loadState() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, "utf-8");
        const items = JSON.parse(raw);

        if (items.length > 0) {
          const maxId = items.reduce((max, t) => Math.max(max, t.id), 0);
          Task.resetIdCounter(maxId + 1);
        }

        items.forEach((item) => {
          const task = Task.fromJSON(item);
          this.#tasks.set(task.id, task);
        });

        this.#rebuildQueue();
        console.log(`${CYAN}  Loaded ${items.length} tasks from disk.${RESET}`);
      }
    } catch {
      console.log("  Warning: Could not load saved data — starting fresh.");
    }
  }

  async save() {
    const data = [...this.#tasks.values()].map((t) => t.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf-8", (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  #rebuildQueue() {
    const active = [...this.#tasks.values()].filter(
      (t) => t.status === "pending" || t.status === "in-progress"
    );
    this.#queue.rebuild(active);
  }

  // ── CRUD ──────────────────────────────────────────────────

  addTask({ title, description, priority, deadline, tags }) {
    const task = new Task({ title, description, priority, deadline, tags });
    this.#tasks.set(task.id, task);

    if (task.status === "pending") {
      this.#queue.enqueue(task);
    }

    this.#undo.push({ type: "add", taskId: task.id });
    return task;
  }

  deleteTask(id) {
    const task = this.#getOrThrow(id);
    const snapshot = task.toJSON();

    this.#tasks.delete(id);
    this.#queue.remove(id);
    this.#undo.push({ type: "delete", snapshot });

    return task;
  }

  startTask(id) {
    const task = this.#getOrThrow(id);
    const prevStatus = task.status;
    task.markInProgress();
    this.#undo.push({ type: "status", taskId: id, prevStatus });
    return task;
  }

  completeTask(id) {
    const task = this.#getOrThrow(id);
    const prevStatus = task.status;
    task.markComplete();
    this.#queue.remove(id);
    this.#undo.push({ type: "status", taskId: id, prevStatus });
    return task;
  }

  cancelTask(id) {
    const task = this.#getOrThrow(id);
    const prevStatus = task.status;
    task.cancel();
    this.#queue.remove(id);
    this.#undo.push({ type: "status", taskId: id, prevStatus });
    return task;
  }

  reopenTask(id) {
    const task = this.#getOrThrow(id);
    const prevStatus = task.status;
    task.reopen();
    this.#queue.enqueue(task);
    this.#undo.push({ type: "status", taskId: id, prevStatus });
    return task;
  }

  editTask(id, { title, priority, deadline }) {
    const task = this.#getOrThrow(id);
    const prev = { title: task.title, priority: task.priority, deadline: task.deadline };

    if (title !== undefined) task.updateTitle(title);
    if (priority !== undefined) task.updatePriority(priority);
    if (deadline !== undefined) task.updateDeadline(deadline || null);

    this.#rebuildQueue();
    this.#undo.push({ type: "edit", taskId: id, prev });
    return task;
  }

  #getOrThrow(id) {
    const task = this.#tasks.get(id);
    if (!task) throw new Error(`Task #${id} not found.`);
    return task;
  }

  getTask(id) {
    return this.#tasks.get(id) ?? null;
  }

  // ── Undo ──────────────────────────────────────────────────

  undo() {
    const action = this.#undo.pop();
    if (!action) return null;

    switch (action.type) {
      case "add": {
        const task = this.#tasks.get(action.taskId);
        this.#tasks.delete(action.taskId);
        this.#queue.remove(action.taskId);
        return { undone: "add", task };
      }
      case "delete": {
        const task = Task.fromJSON(action.snapshot);
        this.#tasks.set(task.id, task);
        if (task.status === "pending" || task.status === "in-progress") {
          this.#queue.enqueue(task);
        }
        return { undone: "delete", task };
      }
      case "status": {
        const task = this.#tasks.get(action.taskId);
        if (task) {
          task.reopen();
          if (action.prevStatus === "in-progress") task.markInProgress();
          this.#rebuildQueue();
        }
        return { undone: "status", task };
      }
      case "edit": {
        const task = this.#tasks.get(action.taskId);
        if (task) {
          const { title, priority, deadline } = action.prev;
          task.updateTitle(title);
          task.updatePriority(priority);
          task.updateDeadline(deadline);
          this.#rebuildQueue();
        }
        return { undone: "edit", task };
      }
      default:
        return null;
    }
  }

  get undoCount() {
    return this.#undo.length;
  }

  // ── Queries ───────────────────────────────────────────────

  getAllTasks() {
    return [...this.#tasks.values()];
  }

  getNextTask() {
    return this.#queue.peek();
  }

  filterByStatus(status) {
    if (!STATUSES.includes(status)) {
      throw new Error(`Invalid status. Use: ${STATUSES.join(", ")}`);
    }
    return this.getAllTasks().filter((t) => t.status === status);
  }

  filterByPriority(priority) {
    if (!PRIORITY_NAMES.includes(priority)) {
      throw new Error(`Invalid priority. Use: ${PRIORITY_NAMES.join(", ")}`);
    }
    return this.getAllTasks().filter((t) => t.priority === priority);
  }

  getOverdueTasks() {
    return this.getAllTasks().filter((t) => t.isOverdue);
  }

  searchTasks(query) {
    const pattern = new RegExp(query, "i");
    return this.getAllTasks().filter(
      (t) => pattern.test(t.title) || pattern.test(t.description) || t.tags.some((tag) => pattern.test(tag))
    );
  }

  sortByUrgency() {
    return this.#queue.toSortedArray();
  }

  // ── Statistics ────────────────────────────────────────────

  getStatistics() {
    const all = this.getAllTasks();

    const byStatus = STATUSES.reduce((acc, s) => {
      acc[s] = all.filter((t) => t.status === s).length;
      return acc;
    }, {});

    const byPriority = PRIORITY_NAMES.reduce((acc, p) => {
      acc[p] = all.filter((t) => t.priority === p).length;
      return acc;
    }, {});

    const overdue = all.filter((t) => t.isOverdue).length;
    const completionRate = all.length > 0
      ? Math.round((byStatus.completed / all.length) * 10000) / 100
      : 0;

    const avgCompletionDays = (() => {
      const completed = all.filter((t) => t.completedAt !== null);
      if (completed.length === 0) return null;

      const totalDays = completed.reduce((sum, t) => {
        const diff = new Date(t.completedAt).getTime() - new Date(t.createdAt).getTime();
        return sum + diff / (1000 * 60 * 60 * 24);
      }, 0);

      return Math.round((totalDays / completed.length) * 10) / 10;
    })();

    return {
      total: all.length,
      ...byStatus,
      byPriority,
      overdue,
      completionRate,
      avgCompletionDays,
    };
  }

  // ── Display: Kanban Board ─────────────────────────────────

  printKanbanBoard() {
    const pending = this.filterByStatus("pending");
    const inProgress = this.filterByStatus("in-progress");
    const completed = this.filterByStatus("completed");

    const colWidth = 28;
    const line = "─".repeat(colWidth);

    console.log(`\n${BOLD}${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
    console.log(`${BOLD}${CYAN}   KANBAN BOARD${RESET}`);
    console.log(`${BOLD}${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);

    const col1 = `PENDING (${pending.length})`.padEnd(colWidth + 2);
    const col2 = `IN PROGRESS (${inProgress.length})`.padEnd(colWidth + 2);
    const col3 = `DONE (${completed.length})`;

    const header = `  ${YELLOW}${col1}${RESET}${CYAN}${col2}${RESET}${GREEN}${col3}${RESET}`;

    console.log(header);
    console.log(`  ${DIM}${line}  ${line}  ${line}${RESET}`);

    const maxRows = Math.max(pending.length, inProgress.length, completed.length, 1);

    for (let i = 0; i < maxRows; i++) {
      const cols = [pending[i], inProgress[i], completed[i]];
      const row = cols.map((task) => {
        if (!task) return " ".repeat(colWidth);
        return this.#formatKanbanCard(task, colWidth);
      }).join("  ");

      console.log(`  ${row}`);
    }

    console.log(`  ${DIM}${line}  ${line}  ${line}${RESET}\n`);
  }

  #formatKanbanCard(task, width) {
    const pColor = task.priorityColor;
    const overdue = task.isOverdue ? `${RED}!${RESET}` : " ";
    const id = `#${task.id}`;
    const title = task.title.length > width - 10
      ? task.title.substring(0, width - 13) + "..."
      : task.title;
    const pLabel = task.priority.slice(0, 4).toUpperCase();

    return `${overdue}${DIM}${id.padEnd(4)}${RESET} ${pColor}${pLabel}${RESET} ${title.padEnd(width - 11)}`;
  }

  // ── Display: Task List ────────────────────────────────────

  printTaskList(tasks = null, heading = "All Tasks") {
    const list = tasks || this.getAllTasks();

    console.log(`\n${BOLD}${CYAN}  ${heading} (${list.length})${RESET}`);
    console.log(`  ${DIM}${"─".repeat(88)}${RESET}`);

    if (list.length === 0) {
      console.log("  No tasks found.");
    } else {
      console.log(`  ${DIM}${"ID".padEnd(5)} ${"Title".padEnd(30)} ${"Priority".padEnd(10)} ${"Status".padEnd(13)} ${"Deadline".padEnd(14)} Days${RESET}`);
      console.log(`  ${DIM}${"─".repeat(88)}${RESET}`);

      list.forEach((t) => {
        const pColor = t.priorityColor;
        const overdue = t.isOverdue ? ` ${RED}OVERDUE${RESET}` : "";
        const days = t.daysUntilDeadline !== null ? String(t.daysUntilDeadline) + "d" : "";
        const statusColor = t.status === "completed" ? GREEN
          : t.status === "in-progress" ? CYAN
          : t.status === "cancelled" ? DIM
          : "";

        console.log(
          `  ${DIM}#${String(t.id).padEnd(4)}${RESET} ${t.title.padEnd(30).substring(0, 30)} ${pColor}${t.priority.padEnd(10)}${RESET} ${statusColor}${t.status.padEnd(13)}${RESET} ${t.formattedDeadline.padEnd(14)} ${days}${overdue}`
        );
      });
    }

    console.log(`  ${DIM}${"─".repeat(88)}${RESET}\n`);
  }

  // ── Display: Task Detail ──────────────────────────────────

  printTaskDetail(id) {
    const task = this.#getOrThrow(id);
    const pColor = task.priorityColor;

    console.log(`\n${BOLD}${CYAN}  ── TASK #${task.id} ──────────────────────────${RESET}`);
    console.log(`  ${BOLD}Title:${RESET}       ${task.title}`);
    console.log(`  ${BOLD}Description:${RESET} ${task.description || `${DIM}(none)${RESET}`}`);
    console.log(`  ${BOLD}Priority:${RESET}    ${pColor}${task.priority.toUpperCase()}${RESET}`);
    console.log(`  ${BOLD}Status:${RESET}      ${task.status}`);
    console.log(`  ${BOLD}Deadline:${RESET}    ${task.formattedDeadline}${task.isOverdue ? ` ${RED}(OVERDUE)${RESET}` : ""}`);
    if (task.daysUntilDeadline !== null) {
      console.log(`  ${BOLD}Days Left:${RESET}   ${task.daysUntilDeadline}`);
    }
    console.log(`  ${BOLD}Tags:${RESET}        ${task.tags.length > 0 ? task.tags.join(", ") : `${DIM}(none)${RESET}`}`);
    console.log(`  ${BOLD}Created:${RESET}     ${task.age}`);
    if (task.completedAt) {
      console.log(`  ${BOLD}Completed:${RESET}   ${new Date(task.completedAt).toLocaleDateString("en-IN")}`);
    }
    console.log();
  }

  // ── Display: Statistics ───────────────────────────────────

  printStatistics() {
    const s = this.getStatistics();

    console.log(`\n${BOLD}${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);
    console.log(`${BOLD}${CYAN}   TASK STATISTICS${RESET}`);
    console.log(`${BOLD}${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}`);

    console.log(`  Total Tasks    : ${BOLD}${s.total}${RESET}`);
    console.log(`  ${YELLOW}Pending${RESET}        : ${s.pending}`);
    console.log(`  ${CYAN}In Progress${RESET}    : ${s["in-progress"]}`);
    console.log(`  ${GREEN}Completed${RESET}      : ${s.completed}`);
    console.log(`  ${DIM}Cancelled${RESET}      : ${s.cancelled}`);
    console.log(`  ${RED}Overdue${RESET}        : ${s.overdue}`);
    console.log(`  Completion %   : ${GREEN}${s.completionRate}%${RESET}`);

    if (s.avgCompletionDays !== null) {
      console.log(`  Avg Completion : ${s.avgCompletionDays} days`);
    }

    console.log(`\n  ${BOLD}By Priority:${RESET}`);
    PRIORITY_NAMES.forEach((p) => {
      const count = s.byPriority[p];
      const maxBar = s.total > 0 ? Math.max(1, Math.round((count / s.total) * 20)) : 0;
      const barColor = p === "critical" ? RED : p === "high" ? YELLOW : p === "medium" ? CYAN : DIM;
      const bar = count > 0 ? barColor + "█".repeat(maxBar) + RESET : DIM + "░" + RESET;
      console.log(`  ${p.padEnd(10)} ${bar} ${count}`);
    });

    console.log(`${CYAN}  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n`);
  }

  // ── Danger Zone ───────────────────────────────────────────

  clearAll() {
    this.#tasks.clear();
    this.#queue.clear();
    this.#undo.clear();
    Task.resetIdCounter(1);
  }
}

module.exports = TaskManager;
