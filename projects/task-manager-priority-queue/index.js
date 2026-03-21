// ── Topics: Async/Await, Promises, Closures, Arrow Functions, Functions,
//    Recursion, Conditionals, Loops, Loop Control, Nested Loops,
//    Spread/Rest, Destructuring, Strings, Split/Join, Substring/Slice,
//    Regex, String Searching, Arrays, Objects, JSON, Error Handling,
//    Modules, Console.log, Variables & Constants, Numbers, Math,
//    Undefined/Null, Type Coercion, Operators, Date/Time, Classes,
//    Map, Filter, Find, Some/Every, Reduce, forEach ──

const readline = require("readline");
const TaskManager = require("./TaskManager");

const manager = new TaskManager();

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

// ── Promisified input ───────────────────────────────────────────

const ask = (prompt) =>
  new Promise((resolve) => {
    rl.question(`${CYAN}  ${prompt}${RESET}`, (answer) => {
      resolve(answer.trim());
    });
  });

const pause = () => ask("\n  Press ENTER to continue...");

// ── Banner ──────────────────────────────────────────────────────

const showBanner = () => {
  console.clear();
  console.log(`
${CYAN}${BOLD}  ╔════════════════════════════════════════════════════════╗
  ║                                                        ║
  ║    TASK BOARD — Priority Queue Manager                 ║
  ║    ────────────────────────────────                    ║
  ║    Manage tasks with priorities, deadlines             ║
  ║    and a live Kanban board                             ║
  ║                                                        ║
  ╚════════════════════════════════════════════════════════╝${RESET}
  `);
};

// ── Main menu ───────────────────────────────────────────────────

const showMenu = () => {
  console.log(`${BOLD}${MAGENTA}  ┌──────────────────────────────────────┐${RESET}`);
  console.log(`${BOLD}${MAGENTA}  │           MAIN MENU                  │${RESET}`);
  console.log(`${BOLD}${MAGENTA}  ├──────────────────────────────────────┤${RESET}`);
  console.log(`${MAGENTA}  │                                      │${RESET}`);
  console.log(`${GREEN}  │   1.  Add Task                       │${RESET}`);
  console.log(`${CYAN}  │   2.  Kanban Board                   │${RESET}`);
  console.log(`${YELLOW}  │   3.  Update Task                    │${RESET}`);
  console.log(`${CYAN}  │   4.  Search / Filter                │${RESET}`);
  console.log(`${CYAN}  │   5.  Statistics                     │${RESET}`);
  console.log(`${YELLOW}  │   6.  Undo Last Action               │${RESET}`);
  console.log(`${RED}  │   7.  Delete Task                    │${RESET}`);
  console.log(`${DIM}  │   0.  Save & Exit                    │${RESET}`);
  console.log(`${MAGENTA}  │                                      │${RESET}`);
  console.log(`${BOLD}${MAGENTA}  └──────────────────────────────────────┘${RESET}\n`);
};

// ── Auto-save ───────────────────────────────────────────────────

const autoSave = async () => {
  try {
    await manager.save();
    console.log(`${DIM}  [saved]${RESET}`);
  } catch (err) {
    console.log(`${RED}  Warning: Could not save — ${err.message}${RESET}`);
  }
};

// ── Handlers ────────────────────────────────────────────────────

const handleAddTask = async () => {
  console.log(`\n${GREEN}${BOLD}  ── ADD TASK ───────────────────────────${RESET}\n`);

  const title = await ask("Title: ");
  if (!title) { console.log(`${RED}  Cancelled.${RESET}`); return; }

  const description = await ask("Description (optional): ");

  const priority = await ask("Priority (critical/high/medium/low, default medium): ");

  const deadline = await ask("Deadline (YYYY-MM-DD, or press ENTER for none): ");

  const tagsInput = await ask("Tags (comma separated, or press ENTER for none): ");
  const tags = tagsInput
    ? tagsInput.split(",").map((t) => t.trim()).filter((t) => t.length > 0)
    : [];

  try {
    const task = manager.addTask({
      title,
      description,
      priority: priority || "medium",
      deadline: deadline || null,
      tags,
    });

    console.log(`\n${GREEN}  Task #${task.id} added: "${task.title}" [${task.priority.toUpperCase()}]${RESET}`);
    await autoSave();
  } catch (err) {
    console.log(`\n${RED}  Error: ${err.message}${RESET}`);
  }
};

const handleUpdateTask = async () => {
  console.log(`\n${YELLOW}${BOLD}  ── UPDATE TASK ────────────────────────${RESET}\n`);

  manager.printKanbanBoard();

  console.log(`${YELLOW}  1. Start a task      (pending -> in-progress)${RESET}`);
  console.log(`${GREEN}  2. Complete a task   (any -> completed)${RESET}`);
  console.log(`${RED}  3. Cancel a task     (any -> cancelled)${RESET}`);
  console.log(`${CYAN}  4. Reopen a task     (any -> pending)${RESET}`);
  console.log(`${YELLOW}  5. Edit task details (title/priority/deadline)${RESET}`);
  console.log(`${DIM}  6. Back${RESET}\n`);

  const choice = await ask("Choose (1-6): ");

  if (choice === "6" || !choice) return;

  if (choice === "5") {
    await handleEditTask();
    return;
  }

  const idStr = await ask("Task ID: ");
  const id = Number(idStr);

  if (!id || isNaN(id)) {
    console.log(`${RED}  Invalid ID.${RESET}`);
    return;
  }

  try {
    let task;
    switch (choice) {
      case "1":
        task = manager.startTask(id);
        console.log(`\n${CYAN}  Started: "${task.title}"${RESET}`);
        break;
      case "2":
        task = manager.completeTask(id);
        console.log(`\n${GREEN}  Completed: "${task.title}"${RESET}`);
        break;
      case "3":
        task = manager.cancelTask(id);
        console.log(`\n${RED}  Cancelled: "${task.title}"${RESET}`);
        break;
      case "4":
        task = manager.reopenTask(id);
        console.log(`\n${YELLOW}  Reopened: "${task.title}"${RESET}`);
        break;
      default:
        console.log(`${RED}  Invalid choice.${RESET}`);
        return;
    }
    await autoSave();
  } catch (err) {
    console.log(`\n${RED}  Error: ${err.message}${RESET}`);
  }
};

const handleEditTask = async () => {
  const idStr = await ask("Task ID to edit: ");
  const id = Number(idStr);

  if (!id || isNaN(id)) {
    console.log(`${RED}  Invalid ID.${RESET}`);
    return;
  }

  const task = manager.getTask(id);
  if (!task) {
    console.log(`${RED}  Task #${id} not found.${RESET}`);
    return;
  }

  manager.printTaskDetail(id);

  console.log(`${DIM}  Leave blank to keep current value.${RESET}\n`);

  const title = await ask(`New title [${task.title}]: `);
  const priority = await ask(`New priority [${task.priority}]: `);
  const deadline = await ask(`New deadline [${task.deadline || "none"}] (type "clear" to remove): `);

  const updates = {};
  if (title) updates.title = title;
  if (priority) updates.priority = priority;
  if (deadline === "clear") updates.deadline = null;
  else if (deadline) updates.deadline = deadline;

  if (Object.keys(updates).length === 0) {
    console.log(`  No changes made.`);
    return;
  }

  try {
    const updated = manager.editTask(id, updates);
    console.log(`\n${GREEN}  Task #${updated.id} updated.${RESET}`);
    await autoSave();
  } catch (err) {
    console.log(`\n${RED}  Error: ${err.message}${RESET}`);
  }
};

const handleSearchFilter = async () => {
  console.log(`\n${CYAN}${BOLD}  ── SEARCH / FILTER ───────────────────${RESET}\n`);

  console.log(`${CYAN}  1. Search by keyword (regex supported)${RESET}`);
  console.log(`${CYAN}  2. Filter by status${RESET}`);
  console.log(`${CYAN}  3. Filter by priority${RESET}`);
  console.log(`${RED}  4. Overdue tasks${RESET}`);
  console.log(`${YELLOW}  5. Sorted by urgency (priority queue order)${RESET}`);
  console.log(`${CYAN}  6. View all tasks (list view)${RESET}`);
  console.log(`${CYAN}  7. View task detail${RESET}`);
  console.log(`${DIM}  8. Back${RESET}\n`);

  const choice = await ask("Choose (1-8): ");

  try {
    switch (choice) {
      case "1": {
        const query = await ask("Search (title, description or tags): ");
        if (!query) { console.log(`${RED}  Cancelled.${RESET}`); return; }
        const results = manager.searchTasks(query);
        manager.printTaskList(results, `Search: "${query}"`);
        break;
      }
      case "2": {
        const status = await ask("Status (pending/in-progress/completed/cancelled): ");
        const results = manager.filterByStatus(status);
        manager.printTaskList(results, `Status: ${status}`);
        break;
      }
      case "3": {
        const priority = await ask("Priority (critical/high/medium/low): ");
        const results = manager.filterByPriority(priority);
        manager.printTaskList(results, `Priority: ${priority}`);
        break;
      }
      case "4": {
        const results = manager.getOverdueTasks();
        manager.printTaskList(results, "Overdue Tasks");
        break;
      }
      case "5": {
        const results = manager.sortByUrgency();
        manager.printTaskList(results, "Sorted by Urgency (Priority Queue)");
        break;
      }
      case "6":
        manager.printTaskList();
        break;
      case "7": {
        const idStr = await ask("Task ID: ");
        const id = Number(idStr);
        if (!id || isNaN(id)) { console.log(`${RED}  Invalid ID.${RESET}`); return; }
        manager.printTaskDetail(id);
        break;
      }
      default:
        break;
    }
  } catch (err) {
    console.log(`\n${RED}  Error: ${err.message}${RESET}`);
  }
};

const handleUndo = async () => {
  if (manager.undoCount === 0) {
    console.log(`\n${YELLOW}  Nothing to undo.${RESET}`);
    return;
  }

  const result = manager.undo();

  if (!result) {
    console.log(`\n${RED}  Undo failed.${RESET}`);
    return;
  }

  const { undone, task } = result;
  const label = task ? `"${task.title}"` : "";

  switch (undone) {
    case "add":
      console.log(`\n${GREEN}  Undid task creation: ${label} removed.${RESET}`);
      break;
    case "delete":
      console.log(`\n${GREEN}  Undid deletion: ${label} restored.${RESET}`);
      break;
    case "status":
      console.log(`\n${GREEN}  Undid status change: ${label} reverted.${RESET}`);
      break;
    case "edit":
      console.log(`\n${GREEN}  Undid edit: ${label} reverted.${RESET}`);
      break;
    default:
      console.log(`\n${GREEN}  Action undone.${RESET}`);
  }

  await autoSave();
};

const handleDelete = async () => {
  console.log(`\n${RED}${BOLD}  ── DELETE TASK ────────────────────────${RESET}\n`);

  const idStr = await ask("Task ID to delete: ");
  const id = Number(idStr);

  if (!id || isNaN(id)) {
    console.log(`${RED}  Invalid ID.${RESET}`);
    return;
  }

  const task = manager.getTask(id);
  if (!task) {
    console.log(`${RED}  Task #${id} not found.${RESET}`);
    return;
  }

  const confirm = await ask(`Delete "${task.title}"? (y/n): `);

  if (confirm.toLowerCase() === "y") {
    try {
      manager.deleteTask(id);
      console.log(`\n${GREEN}  Task #${id} deleted. (Undo available)${RESET}`);
      await autoSave();
    } catch (err) {
      console.log(`\n${RED}  Error: ${err.message}${RESET}`);
    }
  } else {
    console.log(`  Cancelled.`);
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
        await handleAddTask();
        break;
      case "2":
        manager.printKanbanBoard();
        break;
      case "3":
        await handleUpdateTask();
        break;
      case "4":
        await handleSearchFilter();
        break;
      case "5":
        manager.printStatistics();
        break;
      case "6":
        await handleUndo();
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
      showBanner();
    }
  }

  try {
    await manager.save();
    console.log(`\n${GREEN}  Data saved. Goodbye!${RESET}\n`);
  } catch (err) {
    console.log(`\n${RED}  Warning: Could not save on exit — ${err.message}${RESET}\n`);
  }

  rl.close();
};

main();
