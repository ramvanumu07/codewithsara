# Terminal Hangman (Stickman) Game

An interactive terminal-based Hangman game built entirely in **pure JavaScript**. Guess the secret word letter by letter before the stickman is fully drawn — with categories, difficulty levels, hints, and persistent statistics — all from the terminal.

## Run

```bash
node index.js
```

No external dependencies required — uses only Node.js built-in modules.

## Features

- **Interactive CLI** — menu-driven game with real-time input via `readline`
- **ASCII Stickman Art** — 7-stage progressive drawing that builds with each wrong guess
- **6 Word Categories** — Animals, Countries, Foods, Science, Sports, Technology
- **3 Difficulty Levels** — Easy (≤6 letters, 3 hints), Medium (7 letters, 2 hints), Hard (8+ letters, 1 hint)
- **Letter-by-Letter Guessing** — guess single letters to reveal the word
- **Full Word Guessing** — take a risk and guess the entire word (costs 2 lives if wrong)
- **Hint System** — reveals a random unguessed letter and its positions
- **Visual Keyboard** — live keyboard display shows correct (green) and wrong (red) letters
- **Lives Display** — heart icons (♥/♡) show remaining lives at a glance
- **Progress Tracking** — shows how many unique letters you've found
- **Duplicate Guess Detection** — prevents guessing the same letter twice
- **Game Timer** — tracks how long each game takes
- **Persistent Statistics** — win rate, streaks, category/difficulty breakdowns saved to `stats.json`
- **Game History** — tracks last 50 games with date, word, category, and result
- **How to Play** — built-in tutorial accessible from the menu
- **150 Words** — 25 per category, carefully curated
- **Color-Coded Output** — ANSI-colored terminal UI throughout

## Menu

```
  1. New Game
  2. View Statistics
  3. How to Play
  0. Exit
```

## JS Topics Covered

| # | Topic | Where It's Used |
|---|---|---|
| 1 | **Console.log** | All game output, stickman rendering, statistics display |
| 2 | **Variables & Constants** | `const`/`let` throughout; ANSI constants, game state, stage arrays |
| 3 | **Numbers & Arithmetic** | Win rate calc, progress percentages, elapsed time, hint limits |
| 4 | **Math Utilities** | `Math.floor()`, `Math.random()`, `Math.max()`, `Math.round()`, `Math.min()` |
| 5 | **Undefined/Null** | Null hint returns, optional category, nullish coalescing `??` |
| 6 | **Strings & Operations** | Template literals, ANSI codes, `toUpperCase()`, `charAt()`, padding |
| 7 | **Type Coercion** | `Number(choice)` from readline, truthy/falsy checks on input |
| 8 | **Operators** | Comparison, logical AND/OR, ternary, nullish coalescing `??` |
| 9 | **Conditionals** | `if/else`, `switch` for menu, validation branching, difficulty gates |
| 10 | **Date/Time** | `Date.now()` for timer, `new Date().toISOString()`, `toLocaleDateString()` |
| 11 | **Loops** | `while` game loop, `for` in stickman stages |
| 12 | **Loop Control** | `break`, `continue` (hint turns), early `return` in handlers |
| 13 | **Nested Loops** | Keyboard rendering (rows × keys), stickman art (stages × lines) |
| 14 | **Arrays** | Word banks, stickman stages, wrong letters list, `Array.from()` |
| 15 | **Objects** | Game state, hint objects, category maps, stats data |
| 16 | **Destructuring** | `const { word, category } = ...`, `{ letter, correct }`, handler params |
| 17 | **Spread/Rest** | `[...Set]`, `{ ...categoryWins }`, `[...letters]`, `Object.values().flat()` |
| 18 | **JSON** | `JSON.parse()`, `JSON.stringify()` for stats persistence |
| 19 | **Functions** | `showBanner()`, `playGame()`, `pickCategory()`, handler functions |
| 20 | **Arrow Functions** | All callbacks, `ask()`, comparators, mappers, keyboard renderers |
| 21 | **Recursion** | Menu loop pattern, self-continuing async game flow |
| 22 | **Closures** | `createHintSystem()` captures revealed set + hints count in closure |
| 23 | **forEach** | Iterating stickman lines, keyboard rows, category list, history |
| 24 | **map** | `secret.split("").map()` for masked word, keyboard keys, positions |
| 25 | **filter** | `unrevealed.filter()` in hints, filtering by difficulty/category |
| 26 | **find / findIndex** | `CATEGORY_NAMES.find()` to resolve category for a word |
| 27 | **some / every** | `every()` to check all letters revealed, `some()` for category wins |
| 28 | **reduce** | `getTotalWordCount()`, max bar length in stats, accumulating wins |
| 29 | **String Manipulations** | `padEnd()`, `toUpperCase()`, `trim()`, `repeat()`, `charAt()` |
| 30 | **Split / Join** | `word.split("")`, `positions.join(", ")`, `keys.join("")`, category list |
| 31 | **Substring / Slice** | `history.slice(-5)`, `cat.slice(1)`, `history.slice(-50)` |
| 32 | **String Searching** | `includes()` for letter-in-word check, `Set.has()` for guessed letters |
| 33 | **Regex** | `/^[A-Z]$/` for single-letter validation, `/^[A-Z]+$/` for word validation |
| 34 | **Array Advanced Patterns** | Chained `.map().filter()`, `Object.values().flat()`, `Object.entries().sort()` |
| 35 | **Error Handling** | `try/catch` in game loop, file I/O, validation with thrown errors |
| 36 | **Classes Basics** | `Game`, `Stats` with private `#` fields, getters, and methods |
| 37 | **Classes Inheritance** | Composition patterns, `Set` usage for state, static-like helpers |
| 38 | **Modules** | `require`/`module.exports` across 3 files |
| 39 | **Async Basics** | Callback in `fs.writeFile`, event-driven readline |
| 40 | **Promises** | `new Promise()` wrapping `fs.writeFile`, `ask()` wrapper |
| 41 | **Async/Await** | `async playGame()`, `await ask()`, `await stats.save()` |

## File Structure

```
terminal-hangman-game/
├── index.js       # Interactive CLI (menus, game loop, display)
├── Game.js        # Core engine (stickman art, scoring, hints, stats)
├── words.js       # Word banks (150 words across 6 categories)
├── stats.json     # Auto-generated persistent statistics
├── package.json
└── README.md
```

## Sample Interaction

```
  ╔════════════════════════════════════════════════════╗
  ║                                                    ║
  ║    TERMINAL HANGMAN                                ║
  ║    Save the stickman — guess the word!             ║
  ║                                                    ║
  ╚════════════════════════════════════════════════════╝

  ┌──────────────────────────────────┐
  │         MAIN MENU                │
  ├──────────────────────────────────┤
  │   1.  New Game                   │
  │   2.  View Statistics            │
  │   3.  How to Play                │
  │   0.  Exit                       │
  └──────────────────────────────────┘

  TERMINAL HANGMAN — MEDIUM [animals]

    ┌───────┐
    │       │
    │       O
    │      /│\
    │
    │
  ══╧════════

     _  O  L  P  H  I  _

  Lives: ♥♥♥♡♡♡♡   Category: animals | Difficulty: medium
  Wrong: X Z Q

  ---- Keyboard ----
   Q  W  E  R  T  Y  U  I  O  P
    A  S  D  F  G  H  J  K  L
     Z  X  C  V  B  N  M

  [4 lives] > D

  You saved the stickman!
  The word was: DOLPHIN
  Wrong guesses: 3 | Time: 45s
```
