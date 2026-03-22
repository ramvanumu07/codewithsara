# Task Board with Priority Queue

An interactive CLI task management system built entirely in **pure JavaScript**. Add tasks with priorities and deadlines, manage them through a Kanban board, track urgency via a heap-based priority queue, undo actions, and get statistics — all from the terminal.

## Run

```bash
node index.js
```

No external dependencies required — uses only Node.js built-in modules.

## Features

- **Interactive CLI** — full menu-driven interface with real-time input via `readline`
- **Kanban Board** — visual 3-column board (Pending | In Progress | Done) in the terminal
- **Priority Queue** — min-heap implementation that always surfaces the most urgent task
- **Task Lifecycle** — pending -> in-progress -> completed (or cancelled), plus reopen
- **Priority Levels** — critical, high, medium, low with color coding
- **Deadline Tracking** — automatic overdue detection with days-remaining countdown
- **Tag System** — add comma-separated tags, searchable
- **Undo System** — undo last 20 actions (add, delete, status change, edit) via closure-based stack
- **Update Tasks** — change status, edit title, priority, or deadline from one submenu
- **Search & Filter** — regex search, filter by status/priority/overdue, urgency sort, list and detail view
- **Statistics Dashboard** — completion rate, overdue count, priority breakdown with bar chart, avg completion time
- **Auto-Save** — every action persists to `tasks.json` automatically
- **Data Persistence** — survives restarts; loads previous session on launch
- **Colored Output** — ANSI-colored terminal UI with priority color coding

## Menu

```
  1. Add Task
  2. Kanban Board
  3. Update Task          (start / complete / cancel / reopen / edit)
  4. Search / Filter      (keyword, status, priority, overdue, urgency, list, detail)
  5. Statistics
  6. Undo Last Action
  7. Delete Task
  0. Save & Exit
```

## JS Topics Covered

| # | Topic | Where It's Used |
|---|---|---|
| 1 | **Console.log** | All board rendering, reports, user feedback |
| 2 | **Variables & Constants** | `const`/`let` throughout; ANSI color constants, priority maps |
| 3 | **Numbers & Arithmetic** | Completion rates, day calculations, heap index math |
| 4 | **Math Utilities** | `Math.floor()`, `Math.max()`, `Math.round()`, `Math.ceil()` in heap, stats, bars |
| 5 | **Undefined/Null** | Optional deadlines, `completedAt` null checks, `?? null` patterns |
| 6 | **Strings & Operations** | Template literals, ANSI codes, `toUpperCase()`, padding |
| 7 | **Type Coercion** | `Number(idStr)` from readline, truthy/falsy checks on input |
| 8 | **Operators** | Comparison, logical AND/OR, ternary, nullish coalescing `??` |
| 9 | **Conditionals** | `if/else`, `switch` for menu routing and status transitions |
| 10 | **Date/Time** | `new Date()`, `toISOString()`, `toLocaleDateString()`, deadline diffs, task age |
| 11 | **Loops** | `while` main loop, `for` in Kanban rows, heap operations |
| 12 | **Loop Control** | `break` in switch/heap, early `return` in handlers and validators |
| 13 | **Nested Loops** | Kanban board (rows x columns), heap rebuild (parent -> children) |
| 14 | **Arrays** | Task lists, `push()`, `pop()`, `splice()`, `shift()`, `Array.from()` |
| 15 | **Objects** | Task data, statistics, undo actions, priority/status maps |
| 16 | **Destructuring** | `const { title, priority, deadline } = ...`, handler params |
| 17 | **Spread/Rest** | `[...this.#tasks.values()]`, `{ ...byStatus }`, `[...tags]`, heap copies |
| 18 | **JSON** | `JSON.parse()`, `JSON.stringify()` for task persistence |
| 19 | **Functions** | Handler functions, display helpers, utility functions |
| 20 | **Arrow Functions** | All callbacks, `ask()`, `autoSave()`, sort comparators, filters |
| 21 | **Recursion** | Menu loop pattern, self-continuing async flow |
| 22 | **Closures** | `createUndoStack()` captures stack array; undo push/pop via closure |
| 23 | **forEach** | Iterating tasks in lists, board, stats, priority bars |
| 24 | **map** | `tasks.map(t => t.toJSON())`, `tags.map()`, Kanban card formatting |
| 25 | **filter** | Filter by status, priority, overdue, active tasks for queue |
| 26 | **find / findIndex** | `findIndex()` in heap remove, task lookup |
| 27 | **some / every** | `tags.some()` in search, validation checks |
| 28 | **reduce** | Statistics aggregation, max ID calculation, avg completion days |
| 29 | **String Manipulations** | `padEnd()`, `padStart()`, `toUpperCase()`, `trim()`, `repeat()` |
| 30 | **Split / Join** | `tags.join(", ")`, `tagsInput.split(",")`, priority names |
| 31 | **Substring / Slice** | `title.substring(0, width)`, `priority.slice(0, 4)` for card labels |
| 32 | **String Searching** | `includes()` for tag deduplication, `test()` in regex search |
| 33 | **Regex** | `new RegExp(query, "i")` for task search across fields |
| 34 | **Array Advanced Patterns** | Chained `.filter().reduce()`, `.map().filter()`, heap rebuild loop |
| 35 | **Error Handling** | `try/catch` everywhere, state transition guards, input validation |
| 36 | **Classes Basics** | `Task`, `PriorityQueue`, `TaskManager` with private `#` fields |
| 37 | **Classes Inheritance** | `static` methods (`fromJSON`, `resetIdCounter`), class composition |
| 38 | **Modules** | `require`/`module.exports` across 4 files |
| 39 | **Async Basics** | Callback-based `fs.writeFile`, event-driven readline |
| 40 | **Promises** | `new Promise()` wrapping `fs.writeFile`, `ask()` wrapper |
| 41 | **Async/Await** | `async main()`, `await ask()`, `await manager.save()` |

## File Structure

```
task-manager-priority-queue/
├── index.js           # Interactive CLI (menus, handlers, Kanban display)
├── TaskManager.js     # Core engine (CRUD, undo, filters, stats, persistence)
├── PriorityQueue.js   # Heap-based priority queue (data structure)
├── Task.js            # Task model (lifecycle, validation, serialization)
├── tasks.json         # Auto-generated persistent data store
├── package.json
└── README.md
```

## Sample Interaction

```
  ╔════════════════════════════════════════════════════════╗
  ║    TASK BOARD — Priority Queue Manager                 ║
  ║    Manage tasks with priorities, deadlines             ║
  ║    and a live Kanban board                             ║
  ╚════════════════════════════════════════════════════════╝

  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   KANBAN BOARD
  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  PENDING (3)               IN PROGRESS (2)          DONE (1)
  ────────────────────────  ────────────────────────  ────────────────────────
   #1  CRIT Fix login bug    #5  HIGH DB migration     #2  MED  Update README
   #4  MED  Dark mode        #8  HIGH Code review
   #7  MED  Analytics
  ────────────────────────  ────────────────────────  ────────────────────────

  TASK STATISTICS
  Total Tasks    : 6
  Pending        : 3
  In Progress    : 2
  Completed      : 1
  Completion %   : 16.67%
```
